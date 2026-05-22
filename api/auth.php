<?php
// api/auth.php

require_once __DIR__ . '/bootstrap.php';

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'login') {
        $input = json_decode(file_get_contents('php://input'), true);
        $passcode = $input['passcode'] ?? '';
        
        if (strlen($passcode) !== 6 || !ctype_digit($passcode)) {
            sendResponse(['error' => 'รหัสผ่านต้องเป็นตัวเลข 6 หลัก'], 400);
        }
        
        $stmt = $db->prepare("SELECT * FROM users WHERE passcode = :passcode");
        $stmt->execute(['passcode' => $passcode]);
        $user = $stmt->fetch();
        
        if ($user) {
            $_SESSION['user'] = [
                'id' => (int)$user['id'],
                'name' => $user['name'],
                'is_super_admin' => (int)$user['is_super_admin'],
                'role' => $user['role']
            ];
            
            // Fetch trips based on global role
            if ($user['role'] === 'admin') {
                $stmtTrips = $db->prepare("
                    SELECT t.*, 'admin' AS role, 'accepted' AS invite_status,
                        (SELECT COUNT(*) FROM trip_members WHERE trip_id = t.id AND invite_status = 'accepted') as member_count
                    FROM trips t
                    ORDER BY t.start_date ASC
                ");
                $stmtTrips->execute();
            } else {
                $stmtTrips = $db->prepare("
                    SELECT t.*, 'member' AS role, tm.invite_status,
                        (SELECT COUNT(*) FROM trip_members WHERE trip_id = t.id AND invite_status = 'accepted') as member_count
                    FROM trip_members tm
                    JOIN trips t ON tm.trip_id = t.id
                    WHERE tm.user_id = :user_id
                    ORDER BY t.start_date ASC
                ");
                $stmtTrips->execute(['user_id' => $user['id']]);
            }
            $trips = $stmtTrips->fetchAll();
            
            sendResponse([
                'success' => true, 
                'message' => 'เข้าสู่ระบบสำเร็จ', 
                'user' => $_SESSION['user'],
                'trips' => $trips
            ]);
        } else {
            sendResponse(['error' => 'ไม่พบรหัสผ่านนี้ หรือรหัสผ่านไม่ถูกต้อง'], 401);
        }
    }
    
    if ($action === 'select_trip') {
        $user = checkAuth();
        $input = json_decode(file_get_contents('php://input'), true);
        $trip_id = isset($input['trip_id']) ? intval($input['trip_id']) : -1;
        
        if ($trip_id === 0) {
            unset($_SESSION['active_trip_id']);
            sendResponse(['success' => true, 'message' => 'Cleared active trip']);
        }
        
        if ($trip_id < 0) {
            sendResponse(['error' => 'Trip ID is required'], 400);
        }
        
        // Fetch user role from DB
        $stmtUser = $db->prepare("SELECT role, name FROM users WHERE id = :id");
        $stmtUser->execute(['id' => $user['id']]);
        $dbUser = $stmtUser->fetch();
        $globalRole = $dbUser ? $dbUser['role'] : 'member';
        
        // Fetch trip title
        $stmtTrip = $db->prepare("SELECT title FROM trips WHERE id = :trip_id");
        $stmtTrip->execute(['trip_id' => $trip_id]);
        $trip = $stmtTrip->fetch();
        if (!$trip) {
            sendResponse(['error' => 'ไม่พบทริปนี้'], 404);
        }
        
        if ($globalRole === 'admin') {
            $_SESSION['active_trip_id'] = $trip_id;
            sendResponse([
                'success' => true,
                'trip_id' => $trip_id,
                'role' => 'admin',
                'invite_status' => 'accepted',
                'trip_title' => $trip['title']
            ]);
        } else {
            // Verify membership
            $stmt = $db->prepare("
                SELECT tm.invite_status 
                FROM trip_members tm 
                WHERE tm.trip_id = :trip_id AND tm.user_id = :user_id
            ");
            $stmt->execute(['trip_id' => $trip_id, 'user_id' => $user['id']]);
            $membership = $stmt->fetch();
            
            if (!$membership) {
                sendResponse(['error' => 'คุณไม่ได้เป็นสมาชิกของทริปนี้'], 403);
            }
            
            $_SESSION['active_trip_id'] = $trip_id;
            
            sendResponse([
                'success' => true,
                'trip_id' => $trip_id,
                'role' => 'member',
                'invite_status' => $membership['invite_status'],
                'trip_title' => $trip['title']
            ]);
        }
    }
    
    if ($action === 'logout') {
        session_destroy();
        sendResponse(['success' => true, 'message' => 'ออกจากระบบสำเร็จ']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'check') {
        if (isset($_SESSION['user'])) {
            // Refresh user info
            $stmt = $db->prepare("SELECT * FROM users WHERE id = :id");
            $stmt->execute(['id' => $_SESSION['user']['id']]);
            $user = $stmt->fetch();
            
            if (!$user) {
                session_destroy();
                sendResponse(['loggedIn' => false]);
            }
            
            $_SESSION['user'] = [
                'id' => (int)$user['id'],
                'name' => $user['name'],
                'is_super_admin' => (int)$user['is_super_admin'],
                'role' => $user['role']
            ];
            
            // Fetch trips based on global role
            if ($user['role'] === 'admin') {
                $stmtTrips = $db->prepare("
                    SELECT t.*, 'admin' AS role, 'accepted' AS invite_status,
                        (SELECT COUNT(*) FROM trip_members WHERE trip_id = t.id AND invite_status = 'accepted') as member_count
                    FROM trips t
                    ORDER BY t.start_date ASC
                ");
                $stmtTrips->execute();
            } else {
                $stmtTrips = $db->prepare("
                    SELECT t.*, 'member' AS role, tm.invite_status,
                        (SELECT COUNT(*) FROM trip_members WHERE trip_id = t.id AND invite_status = 'accepted') as member_count
                    FROM trip_members tm
                    JOIN trips t ON tm.trip_id = t.id
                    WHERE tm.user_id = :user_id
                    ORDER BY t.start_date ASC
                ");
                $stmtTrips->execute(['user_id' => $user['id']]);
            }
            $trips = $stmtTrips->fetchAll();
            
            $activeTripId = $_SESSION['active_trip_id'] ?? null;
            
            sendResponse([
                'loggedIn' => true, 
                'user' => $_SESSION['user'],
                'trips' => $trips,
                'active_trip_id' => $activeTripId
            ]);
        } else {
            sendResponse(['loggedIn' => false]);
        }
    }
}

sendResponse(['error' => 'Invalid action or request method.'], 400);
