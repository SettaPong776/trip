<?php
// api/itinerary.php

require_once __DIR__ . '/bootstrap.php';

$ctx = checkTripAccess($db);
$trip_id = $ctx['trip_id'];

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'list') {
        try {
            $stmt = $db->prepare("
                SELECT * FROM itineraries 
                WHERE trip_id = :trip_id 
                ORDER BY visit_date ASC, visit_time ASC, id ASC
            ");
            $stmt->execute(['trip_id' => $trip_id]);
            $itineraries = $stmt->fetchAll();
            
            sendResponse($itineraries);
        } catch (Exception $e) {
            sendResponse(['error' => 'ดึงข้อมูลแผนการเดินทางล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'add') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $visit_date = $input['visit_date'] ?? '';
        $visit_time = trim($input['visit_time'] ?? '');
        $title = trim($input['title'] ?? '');
        $notes = trim($input['notes'] ?? '');
        $location_url = trim($input['location_url'] ?? '');
        
        if (empty($visit_date) || empty($title)) {
            sendResponse(['error' => 'กรุณาระบุวันที่และสถานที่/กิจกรรม'], 400);
        }
        
        try {
            $stmt = $db->prepare("
                INSERT INTO itineraries (trip_id, visit_date, visit_time, title, notes, location_url) 
                VALUES (:trip_id, :visit_date, :visit_time, :title, :notes, :location_url)
            ");
            $stmt->execute([
                'trip_id' => $trip_id,
                'visit_date' => $visit_date,
                'visit_time' => $visit_time ?: null,
                'title' => $title,
                'notes' => $notes ?: null,
                'location_url' => $location_url ?: null
            ]);
            
            sendResponse(['success' => true, 'message' => 'เพิ่มกำหนดการเดินทางสำเร็จ', 'id' => (int)$db->lastInsertId()]);
        } catch (Exception $e) {
            sendResponse(['error' => 'เพิ่มกำหนดการเดินทางล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
    
    if ($action === 'update') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = intval($input['id'] ?? 0);
        $visit_date = $input['visit_date'] ?? '';
        $visit_time = trim($input['visit_time'] ?? '');
        $title = trim($input['title'] ?? '');
        $notes = trim($input['notes'] ?? '');
        $location_url = trim($input['location_url'] ?? '');
        
        if ($id <= 0 || empty($visit_date) || empty($title)) {
            sendResponse(['error' => 'กรุณากรอกข้อมูลที่จำเป็นให้ถูกต้อง'], 400);
        }
        
        try {
            $stmtCheck = $db->prepare("SELECT id FROM itineraries WHERE id = :id AND trip_id = :trip_id");
            $stmtCheck->execute(['id' => $id, 'trip_id' => $trip_id]);
            if (!$stmtCheck->fetch()) {
                sendResponse(['error' => 'ไม่พบข้อมูลกำหนดการท่องเที่ยวนี้'], 404);
            }
            
            $stmt = $db->prepare("
                UPDATE itineraries 
                SET visit_date = :visit_date, visit_time = :visit_time, title = :title, notes = :notes, location_url = :location_url 
                WHERE id = :id AND trip_id = :trip_id
            ");
            $stmt->execute([
                'visit_date' => $visit_date,
                'visit_time' => $visit_time ?: null,
                'title' => $title,
                'notes' => $notes ?: null,
                'location_url' => $location_url ?: null,
                'id' => $id,
                'trip_id' => $trip_id
            ]);
            
            sendResponse(['success' => true, 'message' => 'แก้ไขกำหนดการเดินทางสำเร็จ']);
        } catch (Exception $e) {
            sendResponse(['error' => 'แก้ไขกำหนดการเดินทางล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
    
    if ($action === 'delete') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = intval($input['id'] ?? 0);
        
        if ($id <= 0) {
            sendResponse(['error' => 'ID ไม่ถูกต้อง'], 400);
        }
        
        try {
            $stmt = $db->prepare("DELETE FROM itineraries WHERE id = :id AND trip_id = :trip_id");
            $stmt->execute([
                'id' => $id,
                'trip_id' => $trip_id
            ]);
            
            sendResponse(['success' => true, 'message' => 'ลบกำหนดการเดินทางสำเร็จ']);
        } catch (Exception $e) {
            sendResponse(['error' => 'ลบกำหนดการเดินทางล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
}

sendResponse(['error' => 'Invalid action or request method.'], 400);
