<?php
// api/users.php

require_once __DIR__ . '/bootstrap.php';

// Only logged in users
$user = checkAuth();

// Get the DB connection and verify the user is a global admin
$stmtUser = $db->prepare("SELECT role FROM users WHERE id = :id");
$stmtUser->execute(['id' => $user['id']]);
$dbUser = $stmtUser->fetch();
$globalRole = $dbUser ? $dbUser['role'] : 'member';

if ($globalRole !== 'admin') {
    sendResponse(['error' => 'เฉพาะแอดมินระดับส่วนกลางเท่านั้นที่มีสิทธิ์จัดการสมาชิก'], 403);
}

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'list') {
        // List all users
        $stmt = $db->prepare("SELECT id, name, passcode, role, is_super_admin, created_at FROM users ORDER BY role ASC, id ASC");
        $stmt->execute();
        $usersList = $stmt->fetchAll();
        sendResponse(['users' => $usersList]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'add') {
        $input = json_decode(file_get_contents('php://input'), true);
        $name = trim($input['name'] ?? '');
        $passcode = trim($input['passcode'] ?? '');
        $role = $input['role'] ?? 'member';
        
        if (empty($name)) {
            sendResponse(['error' => 'กรุณากรอกชื่อสมาชิก'], 400);
        }
        
        if (!in_array($role, ['admin', 'member'])) {
            sendResponse(['error' => 'บทบาทไม่ถูกต้อง'], 400);
        }
        
        if (!empty($passcode)) {
            if (strlen($passcode) !== 6 || !ctype_digit($passcode)) {
                sendResponse(['error' => 'รหัสต้องเป็นตัวเลข 6 หลัก'], 400);
            }
            // Check if passcode is unique
            $stmtCheck = $db->prepare("SELECT id FROM users WHERE passcode = :passcode");
            $stmtCheck->execute(['passcode' => $passcode]);
            if ($stmtCheck->fetch()) {
                sendResponse(['error' => 'รหัสผ่านนี้มีผู้ใช้อื่นใช้งานอยู่แล้ว'], 400);
            }
        } else {
            $passcode = generateUniquePasscode($db);
        }
        
        $stmt = $db->prepare("INSERT INTO users (name, passcode, role) VALUES (:name, :passcode, :role)");
        $stmt->execute([
            'name' => $name,
            'passcode' => $passcode,
            'role' => $role
        ]);
        
        $new_user_id = $db->lastInsertId();
        
        // Automatically add this new user to all existing trips as 'pending'
        $stmtTrips = $db->query("SELECT id FROM trips");
        $trip_ids = $stmtTrips->fetchAll(PDO::FETCH_COLUMN);
        if (!empty($trip_ids)) {
            $stmtTM = $db->prepare("INSERT OR IGNORE INTO trip_members (trip_id, user_id, invite_status) VALUES (:trip_id, :user_id, 'pending')");
            foreach ($trip_ids as $tid) {
                $stmtTM->execute(['trip_id' => $tid, 'user_id' => $new_user_id]);
            }
        }
        
        sendResponse([
            'success' => true,
            'message' => 'เพิ่มสมาชิกสำเร็จ',
            'user' => [
                'id' => $new_user_id,
                'name' => $name,
                'passcode' => $passcode,
                'role' => $role
            ]
        ]);
    }
    
    if ($action === 'update') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = intval($input['id'] ?? 0);
        $name = trim($input['name'] ?? '');
        $passcode = trim($input['passcode'] ?? '');
        $role = $input['role'] ?? 'member';
        
        if ($id <= 0 || empty($name) || empty($passcode)) {
            sendResponse(['error' => 'ข้อมูลไม่ครบถ้วน'], 400);
        }
        
        if (strlen($passcode) !== 6 || !ctype_digit($passcode)) {
            sendResponse(['error' => 'รหัสต้องเป็นตัวเลข 6 หลัก'], 400);
        }
        
        if (!in_array($role, ['admin', 'member'])) {
            sendResponse(['error' => 'บทบาทไม่ถูกต้อง'], 400);
        }
        
        // Check passcode uniqueness excluding this user
        $stmtCheck = $db->prepare("SELECT id FROM users WHERE passcode = :passcode AND id != :id");
        $stmtCheck->execute(['passcode' => $passcode, 'id' => $id]);
        if ($stmtCheck->fetch()) {
            sendResponse(['error' => 'รหัสผ่านนี้มีผู้ใช้อื่นใช้งานอยู่แล้ว'], 400);
        }
        
        // Prevent demoting self from admin to member
        if ($id === $user['id'] && $role !== 'admin') {
            sendResponse(['error' => 'คุณไม่สามารถเปลี่ยนบทบาทของตัวเองเป็น Member ได้'], 400);
        }
        
        $stmt = $db->prepare("UPDATE users SET name = :name, passcode = :passcode, role = :role WHERE id = :id");
        $stmt->execute([
            'name' => $name,
            'passcode' => $passcode,
            'role' => $role,
            'id' => $id
        ]);
        
        sendResponse(['success' => true, 'message' => 'อัปเดตสมาชิกสำเร็จ']);
    }
    
    if ($action === 'delete') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = intval($input['id'] ?? 0);
        
        if ($id <= 0) {
            sendResponse(['error' => 'ID ไม่ถูกต้อง'], 400);
        }
        
        if ($id === $user['id']) {
            sendResponse(['error' => 'คุณไม่สามารถลบตัวเองออกจากระบบได้'], 400);
        }
        
        // Prevent deleting super admin
        $stmtCheck = $db->prepare("SELECT is_super_admin FROM users WHERE id = :id");
        $stmtCheck->execute(['id' => $id]);
        $is_super = $stmtCheck->fetchColumn();
        if ($is_super) {
            sendResponse(['error' => 'ไม่สามารถลบแอดมินสูงสุดของระบบได้'], 400);
        }
        
        $stmt = $db->prepare("DELETE FROM users WHERE id = :id");
        $stmt->execute(['id' => $id]);
        
        sendResponse(['success' => true, 'message' => 'ลบสมาชิกออกจากระบบสำเร็จ']);
    }
}

sendResponse(['error' => 'Invalid action or request method.'], 400);
