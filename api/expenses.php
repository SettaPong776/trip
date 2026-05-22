<?php
// api/expenses.php

require_once __DIR__ . '/bootstrap.php';

$ctx = checkTripAccess($db);
$trip_id = $ctx['trip_id'];
$user_id = $ctx['user_id'];

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'list') {
        try {
            // 1. Fetch all members of the trip (excluding declined ones)
            $stmtMembers = $db->prepare("
                SELECT u.id, u.name FROM trip_members tm
                JOIN users u ON tm.user_id = u.id
                WHERE tm.trip_id = :trip_id AND tm.invite_status != 'declined' ORDER BY u.id ASC
            ");
            $stmtMembers->execute(['trip_id' => $trip_id]);
            $members = $stmtMembers->fetchAll();
            
            $member_names = [];
            foreach ($members as $m) {
                $member_names[(int)$m['id']] = $m['name'];
            }
            
            // 2. Fetch expenses
            $stmtExpenses = $db->prepare("
                SELECT e.*, u.name as payer_name 
                FROM expenses e
                JOIN users u ON e.payer_id = u.id
                WHERE e.trip_id = :trip_id
                ORDER BY e.expense_date DESC, e.id DESC
            ");
            $stmtExpenses->execute(['trip_id' => $trip_id]);
            $expenses = $stmtExpenses->fetchAll();
            
            // 3. For each expense, fetch splits
            foreach ($expenses as &$expense) {
                $stmtSplits = $db->prepare("
                    SELECT es.user_id, es.amount, u.name as user_name 
                    FROM expense_splits es
                    JOIN users u ON es.user_id = u.id
                    WHERE es.expense_id = :expense_id
                ");
                $stmtSplits->execute(['expense_id' => $expense['id']]);
                $expense['splits'] = $stmtSplits->fetchAll();
            }
            unset($expense);
            
            // 4. Calculate Net Balances
            $balances = [];
            foreach ($member_names as $id => $name) {
                $balances[$id] = 0.0;
            }
            
            foreach ($expenses as $e) {
                $payer_id = (int)$e['payer_id'];
                $amount = (float)$e['amount'];
                
                if (isset($balances[$payer_id])) {
                    $balances[$payer_id] += $amount;
                }
                
                foreach ($e['splits'] as $split) {
                    $m_id = (int)$split['user_id'];
                    $split_amount = (float)$split['amount'];
                    if (isset($balances[$m_id])) {
                        $balances[$m_id] -= $split_amount;
                    }
                }
            }
            
            $balances_res = [];
            foreach ($balances as $id => $bal) {
                $balances_res[] = [
                    'user_id' => $id,
                    'name' => $member_names[$id],
                    'balance' => round($bal, 2)
                ];
            }
            
            // 5. Debt Minimization Algorithm
            $debtors = [];
            $creditors = [];
            
            foreach ($balances as $id => $bal) {
                $bal = round($bal, 2);
                if ($bal < -0.01) {
                    $debtors[] = ['id' => $id, 'name' => $member_names[$id], 'amount' => -$bal];
                } elseif ($bal > 0.01) {
                    $creditors[] = ['id' => $id, 'name' => $member_names[$id], 'amount' => $bal];
                }
            }
            
            $settlements = [];
            
            while (count($debtors) > 0 && count($creditors) > 0) {
                usort($debtors, function($a, $b) { return $b['amount'] <=> $a['amount']; });
                usort($creditors, function($a, $b) { return $b['amount'] <=> $a['amount']; });
                
                $debtor = &$debtors[0];
                $creditor = &$creditors[0];
                
                $settle_amount = min($debtor['amount'], $creditor['amount']);
                
                $settlements[] = [
                    'from_id' => $debtor['id'],
                    'from_name' => $debtor['name'],
                    'to_id' => $creditor['id'],
                    'to_name' => $creditor['name'],
                    'amount' => round($settle_amount, 2)
                ];
                
                $debtor['amount'] -= $settle_amount;
                $creditor['amount'] -= $settle_amount;
                
                if ($debtor['amount'] < 0.01) {
                    array_shift($debtors);
                }
                if ($creditor['amount'] < 0.01) {
                    array_shift($creditors);
                }
            }
            
            sendResponse([
                'expenses' => $expenses,
                'balances' => $balances_res,
                'settlements' => $settlements
            ]);
            
        } catch (Exception $e) {
            sendResponse(['error' => 'ดึงข้อมูลค่าใช้จ่ายล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'add') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $description = trim($input['description'] ?? '');
        $amount = floatval($input['amount'] ?? 0);
        $payer_id = intval($input['payer_id'] ?? 0);
        $category = trim($input['category'] ?? 'general');
        $expense_date = $input['expense_date'] ?? date('Y-m-d');
        $split_type = $input['split_type'] ?? 'equal';
        $raw_splits = $input['splits'] ?? [];
        
        if (empty($description) || $amount <= 0 || $payer_id <= 0 || empty($raw_splits)) {
            sendResponse(['error' => 'กรุณากรอกข้อมูลและเลือกสัดส่วนผู้หารให้ถูกต้อง'], 400);
        }
        
        try {
            $db->beginTransaction();
            
            $stmt = $db->prepare("
                INSERT INTO expenses (trip_id, payer_id, amount, description, category, expense_date) 
                VALUES (:trip_id, :payer_id, :amount, :description, :category, :expense_date)
            ");
            $stmt->execute([
                'trip_id' => $trip_id,
                'payer_id' => $payer_id,
                'amount' => $amount,
                'description' => $description,
                'category' => $category,
                'expense_date' => $expense_date
            ]);
            $expense_id = $db->lastInsertId();
            
            $splits_to_insert = [];
            
            if ($split_type === 'equal') {
                $count = count($raw_splits);
                $split_amount = round($amount / $count, 2);
                $remainder = round($amount - ($split_amount * $count), 2);
                
                foreach ($raw_splits as $index => $m_id) {
                    $m_amount = $split_amount;
                    if ($index === 0) {
                        $m_amount += $remainder;
                    }
                    $splits_to_insert[] = [
                        'user_id' => intval($m_id),
                        'amount' => $m_amount
                    ];
                }
            } else {
                $total_split_sum = 0.0;
                foreach ($raw_splits as $split) {
                    $total_split_sum += floatval($split['amount']);
                }
                
                if (abs($total_split_sum - $amount) > 0.05) {
                    throw new Exception("ยอดรวมของผู้หารไม่ตรงกับค่าใช้จ่ายรวม (ต่างกัน " . abs($total_split_sum - $amount) . " บาท)");
                }
                
                foreach ($raw_splits as $split) {
                    $splits_to_insert[] = [
                        'user_id' => intval($split['user_id']),
                        'amount' => floatval($split['amount'])
                    ];
                }
            }
            
            $stmtSplit = $db->prepare("
                INSERT INTO expense_splits (expense_id, user_id, amount) 
                VALUES (:expense_id, :user_id, :amount)
            ");
            
            foreach ($splits_to_insert as $split) {
                $stmtSplit->execute([
                    'expense_id' => $expense_id,
                    'user_id' => $split['user_id'],
                    'amount' => $split['amount']
                ]);
            }
            
            $db->commit();
            sendResponse(['success' => true, 'message' => 'บันทึกค่าใช้จ่ายสำเร็จ']);
            
        } catch (Exception $e) {
            $db->rollBack();
            sendResponse(['error' => 'บันทึกค่าใช้จ่ายล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
    
    if ($action === 'delete') {
        $input = json_decode(file_get_contents('php://input'), true);
        $expense_id = intval($input['expense_id'] ?? 0);
        
        if ($expense_id <= 0) {
            sendResponse(['error' => 'ID ค่าใช้จ่ายไม่ถูกต้อง'], 400);
        }
        
        try {
            $stmtCheck = $db->prepare("SELECT payer_id, category FROM expenses WHERE id = :id AND trip_id = :trip_id");
            $stmtCheck->execute(['id' => $expense_id, 'trip_id' => $trip_id]);
            $expense = $stmtCheck->fetch();
            
            if (!$expense) {
                sendResponse(['error' => 'ไม่พบข้อมูลค่าใช้จ่ายนี้'], 404);
            }
            
            if ($expense['category'] === 'settlement') {
                $stmtCreditor = $db->prepare("SELECT user_id FROM expense_splits WHERE expense_id = :id");
                $stmtCreditor->execute(['id' => $expense_id]);
                $creditor = $stmtCreditor->fetch();
                $creditor_id = $creditor ? (int)$creditor['user_id'] : 0;
                
                if ($ctx['role'] !== 'admin' && $user_id !== $creditor_id) {
                    sendResponse(['error' => 'เฉพาะเจ้าหนี้ (ผู้รับเงิน) หรือผู้ดูแลระบบเท่านั้นที่สามารถลบรายการเคลียร์เงินนี้ได้'], 403);
                }
            } else {
                if ($ctx['role'] !== 'admin' && (int)$expense['payer_id'] !== $user_id) {
                    sendResponse(['error' => 'คุณไม่มีสิทธิ์ลบค่าใช้จ่ายนี้'], 403);
                }
            }
            
            $stmt = $db->prepare("DELETE FROM expenses WHERE id = :id");
            $stmt->execute(['id' => $expense_id]);
            
            sendResponse(['success' => true, 'message' => 'ลบรายการสำเร็จ']);
        } catch (Exception $e) {
            sendResponse(['error' => 'ลบค่าใช้จ่ายล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
    
    if ($action === 'settle') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $from_id = intval($input['from_id'] ?? 0);
        $to_id = intval($input['to_id'] ?? 0);
        $amount = floatval($input['amount'] ?? 0);
        
        if ($from_id <= 0 || $to_id <= 0 || $amount <= 0) {
            sendResponse(['error' => 'ข้อมูลการเคลียร์เงินไม่ถูกต้อง'], 400);
        }
        
        if ($ctx['role'] !== 'admin' && $user_id !== $to_id) {
            sendResponse(['error' => 'คุณไม่มีสิทธิ์ยืนยันการเคลียร์เงินนี้ (เฉพาะผู้รับเงินหรือแอดมินเท่านั้น)'], 403);
        }
        
        $stmtNames = $db->prepare("SELECT id, name FROM users WHERE id IN (:from_id, :to_id)");
        $stmtNames->execute(['from_id' => $from_id, 'to_id' => $to_id]);
        $users = $stmtNames->fetchAll();
        
        $names = [];
        foreach ($users as $u) {
            $names[(int)$u['id']] = $u['name'];
        }
        
        $from_name = $names[$from_id] ?? 'สมาชิก';
        $to_name = $names[$to_id] ?? 'สมาชิก';
        
        $description = "เคลียร์เงิน: " . $from_name . " ชำระให้ " . $to_name;
        
        try {
            $db->beginTransaction();
            
            $stmt = $db->prepare("
                INSERT INTO expenses (trip_id, payer_id, amount, description, category, expense_date) 
                VALUES (:trip_id, :payer_id, :amount, :description, 'settlement', :expense_date)
            ");
            $stmt->execute([
                'trip_id' => $trip_id,
                'payer_id' => $from_id,
                'amount' => $amount,
                'description' => $description,
                'expense_date' => date('Y-m-d')
            ]);
            $expense_id = $db->lastInsertId();
            
            $stmtSplit = $db->prepare("
                INSERT INTO expense_splits (expense_id, user_id, amount) 
                VALUES (:expense_id, :user_id, :amount)
            ");
            $stmtSplit->execute([
                'expense_id' => $expense_id,
                'user_id' => $to_id,
                'amount' => $amount
            ]);
            
            $db->commit();
            sendResponse(['success' => true, 'message' => 'บันทึกการเคลียร์เงินสำเร็จ']);
        } catch (Exception $e) {
            $db->rollBack();
            sendResponse(['error' => 'บันทึกการเคลียร์เงินล้มเหลว: ' . $e->getMessage()], 500);
        }
    }
}

sendResponse(['error' => 'Invalid action or request method.'], 400);
