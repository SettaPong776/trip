<?php
// api/trip.php

require_once __DIR__ . '/bootstrap.php';

$action = $_GET['action'] ?? '';

// ==========================================
// ACTIONS THAT REQUIRE LOGIN BUT NOT TRIP SELECTION
// ==========================================

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'create') {
    $user = checkAuth();
    $input = json_decode(file_get_contents('php://input'), true);
    
    $title = trim($input['title'] ?? '');
    $start_date = $input['start_date'] ?? '';
    $end_date = $input['end_date'] ?? '';
    $total_budget = floatval($input['total_budget'] ?? 0);
    $cover_emoji = trim($input['cover_emoji'] ?? '✈️');
    $member_ids = array_map('intval', $input['member_ids'] ?? []); // array of global user IDs
    
    if (empty($title) || empty($start_date) || empty($end_date)) {
        sendResponse(['error' => 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน'], 400);
    }
    
    try {
        $db->beginTransaction();
        
        // 1. Insert Trip
        $stmt = $db->prepare("INSERT INTO trips (title, start_date, end_date, total_budget, cover_emoji, created_by) VALUES (:title, :start_date, :end_date, :total_budget, :cover_emoji, :created_by)");
        $stmt->execute([
            'title' => $title,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'total_budget' => $total_budget,
            'cover_emoji' => $cover_emoji,
            'created_by' => $user['id']
        ]);
        $trip_id = $db->lastInsertId();
        
        // Query all global user IDs
        $stmtUsers = $db->query("SELECT id FROM users");
        $all_user_ids = $stmtUsers->fetchAll(PDO::FETCH_COLUMN);

        // 2. Add creator to trip_members with 'accepted' status
        $stmtTM = $db->prepare("INSERT INTO trip_members (trip_id, user_id, invite_status) VALUES (:trip_id, :user_id, 'accepted')");
        $stmtTM->execute([
            'trip_id' => $trip_id,
            'user_id' => $user['id']
        ]);
        
        // 3. Add other members to trip_members with 'pending' status automatically
        $other_user_ids = array_diff($all_user_ids, [$user['id']]);
        if (!empty($other_user_ids)) {
            $stmtTMOther = $db->prepare("INSERT INTO trip_members (trip_id, user_id, invite_status) VALUES (:trip_id, :user_id, 'pending')");
            foreach ($other_user_ids as $m_id) {
                $stmtTMOther->execute([
                    'trip_id' => $trip_id,
                    'user_id' => $m_id
                ]);
            }
        }
        
        $db->commit();
        
        sendResponse([
            'success' => true,
            'trip_id' => (int)$trip_id,
            'message' => 'สร้างทริปสำเร็จ'
        ]);
        
    } catch (Exception $e) {
        $db->rollBack();
        sendResponse(['error' => 'สร้างทริปล้มเหลว: ' . $e->getMessage()], 500);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'list') {
    $user = checkAuth();
    
    // Fetch global role of this user
    $stmtUser = $db->prepare("SELECT role FROM users WHERE id = :id");
    $stmtUser->execute(['id' => $user['id']]);
    $dbUser = $stmtUser->fetch();
    $globalRole = $dbUser ? $dbUser['role'] : 'member';
    
    if ($globalRole === 'admin') {
        // Admins see all trips
        $stmt = $db->prepare("
            SELECT t.*, 'admin' AS role, 'accepted' AS invite_status,
                (SELECT COUNT(*) FROM trip_members WHERE trip_id = t.id) as member_count
            FROM trips t
            ORDER BY t.start_date DESC
        ");
        $stmt->execute();
    } else {
        // Members see only trips they belong to
        $stmt = $db->prepare("
            SELECT t.*, 'member' AS role, tm.invite_status,
                (SELECT COUNT(*) FROM trip_members WHERE trip_id = t.id) as member_count
            FROM trip_members tm
            JOIN trips t ON tm.trip_id = t.id
            WHERE tm.user_id = :user_id
            ORDER BY t.start_date DESC
        ");
        $stmt->execute(['user_id' => $user['id']]);
    }
    $trips = $stmt->fetchAll();
    
    sendResponse(['trips' => $trips]);
}

// ==========================================
// ACTIONS THAT REQUIRE ACTIVE TRIP SELECTION
// ==========================================

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'details') {
        $ctx = checkTripAccess($db);
        $trip_id = $ctx['trip_id'];
        
        // Fetch Trip
        $stmt = $db->prepare("SELECT * FROM trips WHERE id = :id");
        $stmt->execute(['id' => $trip_id]);
        $trip = $stmt->fetch();
        
        if (!$trip) {
            sendResponse(['error' => 'ไม่พบข้อมูลทริป'], 404);
        }
        
        // Fetch Members with global user info and role
        $stmtMembers = $db->prepare("
            SELECT u.id, u.name, u.passcode, u.role, tm.invite_status
            FROM trip_members tm
            JOIN users u ON tm.user_id = u.id
            WHERE tm.trip_id = :trip_id
            ORDER BY u.role DESC, u.id ASC
        ");
        $stmtMembers->execute(['trip_id' => $trip_id]);
        $members = $stmtMembers->fetchAll();
        
        sendResponse([
            'trip' => $trip,
            'members' => $members,
            'my_role' => $ctx['role']
        ]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'update') {
        $ctx = checkTripAccess($db);
        if ($ctx['role'] !== 'admin') {
            sendResponse(['error' => 'เฉพาะแอดมินเท่านั้นที่แก้ไขโครงการได้'], 403);
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        $title = trim($input['title'] ?? '');
        $start_date = $input['start_date'] ?? '';
        $end_date = $input['end_date'] ?? '';
        $total_budget = floatval($input['total_budget'] ?? 0);
        $cover_emoji = trim($input['cover_emoji'] ?? '✈️');
        $new_member_ids = array_map('intval', $input['member_ids'] ?? []);
        
        if (empty($title) || empty($start_date) || empty($end_date)) {
            sendResponse(['error' => 'กรุณากรอกข้อมูลให้ครบถ้วน'], 400);
        }
        
        try {
            $db->beginTransaction();
            
            // 1. Update trip details
            $stmt = $db->prepare("UPDATE trips SET title = :title, start_date = :start_date, end_date = :end_date, total_budget = :total_budget, cover_emoji = :cover_emoji WHERE id = :id");
            $stmt->execute([
                'title' => $title,
                'start_date' => $start_date,
                'end_date' => $end_date,
                'total_budget' => $total_budget,
                'cover_emoji' => $cover_emoji,
                'id' => $ctx['trip_id']
            ]);
            
            // 2. Synchronize trip members list with all global users
            $stmtUsers = $db->query("SELECT id FROM users");
            $all_user_ids = $stmtUsers->fetchAll(PDO::FETCH_COLUMN);

            $stmtExisting = $db->prepare("SELECT user_id FROM trip_members WHERE trip_id = :trip_id");
            $stmtExisting->execute(['trip_id' => $ctx['trip_id']]);
            $existingIDs = $stmtExisting->fetchAll(PDO::FETCH_COLUMN);
            
            // Insert missing users
            $to_insert = array_diff($all_user_ids, $existingIDs);
            if (!empty($to_insert)) {
                $stmtIns = $db->prepare("INSERT INTO trip_members (trip_id, user_id, invite_status) VALUES (:trip_id, :user_id, :invite_status)");
                foreach ($to_insert as $uid) {
                    $status = ($uid === $ctx['user_id']) ? 'accepted' : 'pending';
                    $stmtIns->execute([
                        'trip_id' => $ctx['trip_id'],
                        'user_id' => $uid,
                        'invite_status' => $status
                    ]);
                }
            }
            
            $db->commit();
            sendResponse(['success' => true, 'message' => 'อัปเดตโครงการและสมาชิกสำเร็จ']);
        } catch (Exception $e) {
            $db->rollBack();
            sendResponse(['error' => 'อัปเดตโครงการล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
    
    if ($action === 'delete') {
        $input = json_decode(file_get_contents('php://input'), true);
        $trip_id = intval($input['trip_id'] ?? ($_SESSION['active_trip_id'] ?? 0));
        $force = isset($input['force']) && $input['force'] === true;
        
        if ($trip_id <= 0) {
            sendResponse(['error' => 'Trip ID ไม่ถูกต้อง'], 400);
        }
        
        $ctx = checkTripAccess($db, $trip_id);
        if ($ctx['role'] !== 'admin') {
            sendResponse(['error' => 'เฉพาะแอดมินเท่านั้นที่สามารถยกเลิก/ลบโครงการได้'], 403);
        }
        
        if ($force) {
            $stmt = $db->prepare("DELETE FROM trips WHERE id = :id");
            $stmt->execute(['id' => $trip_id]);
            if (isset($_SESSION['active_trip_id']) && (int)$_SESSION['active_trip_id'] === $trip_id) {
                unset($_SESSION['active_trip_id']);
            }
            sendResponse(['success' => true, 'message' => 'ลบโครงการท่องเที่ยวถาวรสำเร็จ']);
        } else {
            $stmt = $db->prepare("UPDATE trips SET is_canceled = 1 WHERE id = :id");
            $stmt->execute(['id' => $trip_id]);
            sendResponse(['success' => true, 'message' => 'ยกเลิกโครงการท่องเที่ยวสำเร็จ']);
        }
    }
    
    if ($action === 'restore') {
        $input = json_decode(file_get_contents('php://input'), true);
        $trip_id = intval($input['trip_id'] ?? ($_SESSION['active_trip_id'] ?? 0));
        
        if ($trip_id <= 0) {
            sendResponse(['error' => 'Trip ID ไม่ถูกต้อง'], 400);
        }
        
        $ctx = checkTripAccess($db, $trip_id);
        if ($ctx['role'] !== 'admin') {
            sendResponse(['error' => 'เฉพาะแอดมินเท่านั้นที่สามารถกู้คืนโครงการได้'], 403);
        }
        
        $stmt = $db->prepare("UPDATE trips SET is_canceled = 0 WHERE id = :id");
        $stmt->execute(['id' => $trip_id]);
        
        sendResponse(['success' => true, 'message' => 'กู้คืนโครงการท่องเที่ยวสำเร็จ']);
    }
    
    if ($action === 'update_invite_status') {
        $ctx = checkTripAccess($db);
        $input = json_decode(file_get_contents('php://input'), true);
        $user_id = intval($input['user_id'] ?? 0);
        $status = $input['status'] ?? '';
        
        if (!in_array($status, ['accepted', 'pending', 'declined'])) {
            sendResponse(['error' => 'สถานะไม่ถูกต้อง'], 400);
        }
        
        // Users can update their own status, admins can update anyone's
        if ($user_id !== $ctx['user_id'] && $ctx['role'] !== 'admin') {
            sendResponse(['error' => 'คุณสามารถเปลี่ยนสถานะได้เฉพาะตัวเองเท่านั้น'], 403);
        }
        
        $stmt = $db->prepare("UPDATE trip_members SET invite_status = :status WHERE trip_id = :trip_id AND user_id = :user_id");
        $stmt->execute([
            'status' => $status,
            'trip_id' => $ctx['trip_id'],
            'user_id' => $user_id
        ]);
        
        sendResponse(['success' => true, 'message' => 'อัปเดตสถานะคำเชิญสำเร็จ']);
    }
}

sendResponse(['error' => 'Invalid action or request method.'], 400);
