<?php
// api/bootstrap.php

session_start();

require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json');

$db = getDBConnection();

// Response helper
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Check if user is logged in (global auth)
function checkAuth() {
    if (!isset($_SESSION['user'])) {
        sendResponse(['error' => 'Unauthorized. Please login.'], 401);
    }
    return $_SESSION['user'];
}

// Check if user has access to the active trip and return their role
function checkTripAccess($db, $trip_id = null) {
    $user = checkAuth();
    $tid = $trip_id ?? ($_SESSION['active_trip_id'] ?? null);
    
    if (!$tid) {
        sendResponse(['error' => 'ไม่ได้เลือกทริป กรุณาเลือกทริปก่อน'], 400);
    }
    
    // Check global user info first (to get their global role)
    $stmtUser = $db->prepare("SELECT role, is_super_admin FROM users WHERE id = :id");
    $stmtUser->execute(['id' => $user['id']]);
    $dbUser = $stmtUser->fetch();
    $globalRole = $dbUser ? $dbUser['role'] : 'member';
    $isSuperAdmin = $dbUser ? $dbUser['is_super_admin'] : 0;
    
    if ($globalRole === 'admin') {
        // Admins can access any trip
        return [
            'user_id' => $user['id'],
            'name' => $user['name'],
            'is_super_admin' => $isSuperAdmin,
            'trip_id' => (int)$tid,
            'role' => 'admin',
            'invite_status' => 'accepted'
        ];
    }
    
    // Members must be in trip_members
    $stmt = $db->prepare("
        SELECT invite_status 
        FROM trip_members 
        WHERE trip_id = :trip_id AND user_id = :user_id
    ");
    $stmt->execute(['trip_id' => $tid, 'user_id' => $user['id']]);
    $membership = $stmt->fetch();
    
    if (!$membership) {
        sendResponse(['error' => 'คุณไม่ได้เป็นสมาชิกของทริปนี้'], 403);
    }
    
    return [
        'user_id' => $user['id'],
        'name' => $user['name'],
        'is_super_admin' => $isSuperAdmin,
        'trip_id' => (int)$tid,
        'role' => 'member',
        'invite_status' => $membership['invite_status']
    ];
}

// Generate a random unique 6-digit passcode
function generateUniquePasscode($db) {
    $stmt = $db->prepare("SELECT COUNT(*) FROM users WHERE passcode = :passcode");
    
    do {
        $passcode = sprintf("%06d", mt_rand(0, 999999));
        $stmt->execute(['passcode' => $passcode]);
        $count = $stmt->fetchColumn();
    } while ($count > 0);
    
    return $passcode;
}
