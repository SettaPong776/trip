<?php
// api/checklist.php

require_once __DIR__ . '/bootstrap.php';

$ctx = checkTripAccess($db);
$trip_id = $ctx['trip_id'];

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'list') {
        try {
            $stmt = $db->prepare("
                SELECT c.*, u.name as assigned_user_name 
                FROM checklists c
                LEFT JOIN users u ON c.assigned_user_id = u.id
                WHERE c.trip_id = :trip_id
                ORDER BY c.is_completed ASC, c.category ASC, c.id DESC
            ");
            $stmt->execute(['trip_id' => $trip_id]);
            $checklist = $stmt->fetchAll();
            
            foreach ($checklist as &$item) {
                $item['id'] = (int)$item['id'];
                $item['trip_id'] = (int)$item['trip_id'];
                $item['assigned_user_id'] = $item['assigned_user_id'] !== null ? (int)$item['assigned_user_id'] : null;
                $item['is_completed'] = (int)$item['is_completed'];
            }
            unset($item);
            
            sendResponse($checklist);
        } catch (Exception $e) {
            sendResponse(['error' => 'ดึงข้อมูลเช็กลิสต์ล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'add') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $item_name = trim($input['item_name'] ?? '');
        $category = trim($input['category'] ?? 'general');
        $assigned_user_id = !empty($input['assigned_user_id']) ? intval($input['assigned_user_id']) : null;
        
        if (empty($item_name)) {
            sendResponse(['error' => 'กรุณากรอกชื่อสิ่งของ'], 400);
        }
        
        if ($assigned_user_id !== null) {
            $stmtCheck = $db->prepare("SELECT tm.user_id FROM trip_members tm WHERE tm.user_id = :uid AND tm.trip_id = :trip_id");
            $stmtCheck->execute(['uid' => $assigned_user_id, 'trip_id' => $trip_id]);
            if (!$stmtCheck->fetch()) {
                sendResponse(['error' => 'ไม่พบสมาชิกที่เลือกในทริปนี้'], 400);
            }
        }
        
        try {
            $stmt = $db->prepare("
                INSERT INTO checklists (trip_id, item_name, category, assigned_user_id, is_completed) 
                VALUES (:trip_id, :item_name, :category, :assigned_user_id, 0)
            ");
            $stmt->execute([
                'trip_id' => $trip_id,
                'item_name' => $item_name,
                'category' => $category,
                'assigned_user_id' => $assigned_user_id
            ]);
            
            sendResponse(['success' => true, 'message' => 'เพิ่มเช็กลิสต์สำเร็จ', 'id' => (int)$db->lastInsertId()]);
        } catch (Exception $e) {
            sendResponse(['error' => 'เพิ่มเช็กลิสต์ล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
    
    if ($action === 'toggle') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = intval($input['id'] ?? 0);
        $is_completed = intval($input['is_completed'] ?? 0);
        
        if ($id <= 0) {
            sendResponse(['error' => 'ID ไม่ถูกต้อง'], 400);
        }
        
        try {
            $stmtCheck = $db->prepare("SELECT id FROM checklists WHERE id = :id AND trip_id = :trip_id");
            $stmtCheck->execute(['id' => $id, 'trip_id' => $trip_id]);
            if (!$stmtCheck->fetch()) {
                sendResponse(['error' => 'ไม่พบรายการเช็กลิสต์นี้ในทริปของคุณ'], 404);
            }
            
            $stmt = $db->prepare("UPDATE checklists SET is_completed = :is_completed WHERE id = :id AND trip_id = :trip_id");
            $stmt->execute([
                'is_completed' => $is_completed ? 1 : 0,
                'id' => $id,
                'trip_id' => $trip_id
            ]);
            
            sendResponse(['success' => true, 'message' => 'อัปเดตสถานะเช็กลิสต์สำเร็จ']);
        } catch (Exception $e) {
            sendResponse(['error' => 'อัปเดตเช็กลิสต์ล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
    
    if ($action === 'delete') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = intval($input['id'] ?? 0);
        
        if ($id <= 0) {
            sendResponse(['error' => 'ID ไม่ถูกต้อง'], 400);
        }
        
        try {
            $stmt = $db->prepare("DELETE FROM checklists WHERE id = :id AND trip_id = :trip_id");
            $stmt->execute([
                'id' => $id,
                'trip_id' => $trip_id
            ]);
            
            sendResponse(['success' => true, 'message' => 'ลบเช็กลิสต์สำเร็จ']);
        } catch (Exception $e) {
            sendResponse(['error' => 'ลบเช็กลิสต์ล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
}

sendResponse(['error' => 'Invalid action or request method.'], 400);
