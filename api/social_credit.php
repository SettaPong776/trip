<?php
// api/social_credit.php

require_once __DIR__ . '/bootstrap.php';

$action = $_GET['action'] ?? '';

// ==========================================
// LIST — Get all users with credit & level
// ==========================================
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'list') {
    $user = checkAuth();
    
    $stmt = $db->prepare("
        SELECT id, name, role, social_credit 
        FROM users 
        ORDER BY social_credit DESC, name ASC
    ");
    $stmt->execute();
    $users = $stmt->fetchAll();
    
    sendResponse(['users' => $users]);
}

// ==========================================
// ADJUST — Admin adjusts credit manually
// ==========================================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'adjust') {
    $user = checkAuth();
    
    // Check admin role
    $stmtUser = $db->prepare("SELECT role FROM users WHERE id = :id");
    $stmtUser->execute(['id' => $user['id']]);
    $dbUser = $stmtUser->fetch();
    if (!$dbUser || $dbUser['role'] !== 'admin') {
        sendResponse(['error' => 'เฉพาะแอดมินเท่านั้นที่สามารถปรับคะแนนได้'], 403);
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    $target_user_id = intval($input['user_id'] ?? 0);
    $change_amount = intval($input['change_amount'] ?? 0);
    $reason = trim($input['reason'] ?? '');
    
    if ($target_user_id <= 0) {
        sendResponse(['error' => 'User ID ไม่ถูกต้อง'], 400);
    }
    
    if (!in_array($change_amount, [5, 10, -5, -10])) {
        sendResponse(['error' => 'จำนวนคะแนนไม่ถูกต้อง (ต้องเป็น +5, +10, -5, -10)'], 400);
    }
    
    if (empty($reason)) {
        sendResponse(['error' => 'กรุณาระบุเหตุผล'], 400);
    }
    
    try {
        $db->beginTransaction();
        
        // Get current credit
        $stmtCurrent = $db->prepare("SELECT social_credit FROM users WHERE id = :id");
        $stmtCurrent->execute(['id' => $target_user_id]);
        $currentCredit = $stmtCurrent->fetchColumn();
        
        if ($currentCredit === false) {
            $db->rollBack();
            sendResponse(['error' => 'ไม่พบผู้ใช้งาน'], 404);
        }
        
        // Clamp to 0-100
        $newCredit = max(0, min(100, intval($currentCredit) + $change_amount));
        
        // Update credit
        $stmtUpdate = $db->prepare("UPDATE users SET social_credit = :credit WHERE id = :id");
        $stmtUpdate->execute(['credit' => $newCredit, 'id' => $target_user_id]);
        
        // Log the change
        $stmtLog = $db->prepare("INSERT INTO social_credit_logs (user_id, change_amount, reason, changed_by) VALUES (:user_id, :change_amount, :reason, :changed_by)");
        $stmtLog->execute([
            'user_id' => $target_user_id,
            'change_amount' => $change_amount,
            'reason' => $reason,
            'changed_by' => $user['id']
        ]);
        
        $db->commit();
        
        sendResponse([
            'success' => true,
            'message' => 'ปรับคะแนน Social Credit สำเร็จ',
            'new_credit' => $newCredit
        ]);
    } catch (Exception $e) {
        $db->rollBack();
        sendResponse(['error' => 'ปรับคะแนนล้มเหลว: ' . $e->getMessage()], 500);
    }
}

// ==========================================
// LOGS — Get credit change history
// ==========================================
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'logs') {
    $user = checkAuth();
    
    $target_user_id = intval($_GET['user_id'] ?? 0);
    
    if ($target_user_id <= 0) {
        sendResponse(['error' => 'User ID ไม่ถูกต้อง'], 400);
    }
    
    $stmt = $db->prepare("
        SELECT scl.*, u.name AS changed_by_name
        FROM social_credit_logs scl
        LEFT JOIN users u ON scl.changed_by = u.id
        WHERE scl.user_id = :user_id
        ORDER BY scl.created_at DESC
        LIMIT 50
    ");
    $stmt->execute(['user_id' => $target_user_id]);
    $logs = $stmt->fetchAll();
    
    sendResponse(['logs' => $logs]);
}

sendResponse(['error' => 'Invalid action or request method.'], 400);
