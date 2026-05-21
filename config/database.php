<?php
// config/database.php

define('DB_DIR', __DIR__ . '/../database');
define('DB_PATH', DB_DIR . '/travel.db');

function getDBConnection() {
    if (!file_exists(DB_DIR)) {
        mkdir(DB_DIR, 0777, true);
    }

    try {
        $pdo = new PDO("sqlite:" . DB_PATH);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->exec("PRAGMA foreign_keys = ON;");
        
        initializeDatabase($pdo);
        
        return $pdo;
    } catch (PDOException $e) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit;
    }
}

function initializeDatabase($pdo) {
    // 1. Users table (global — one passcode per person across all trips)
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        passcode TEXT UNIQUE NOT NULL,
        is_super_admin INTEGER DEFAULT 0,
        role TEXT CHECK(role IN ('admin','member')) DEFAULT 'member',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );");

    // 2. Trips table
    $pdo->exec("CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_budget REAL DEFAULT 0,
        cover_emoji TEXT DEFAULT '✈️',
        created_by INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(created_by) REFERENCES users(id) ON DELETE SET NULL
    );");

    // 3. Trip members (join table: user ↔ trip, with invite status)
    $pdo->exec("CREATE TABLE IF NOT EXISTS trip_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        invite_status TEXT CHECK(invite_status IN ('accepted','pending','declined')) DEFAULT 'pending',
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(trip_id, user_id)
    );");

    // 4. Expenses table
    $pdo->exec("CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER NOT NULL,
        payer_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        description TEXT NOT NULL,
        category TEXT DEFAULT 'general',
        expense_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        FOREIGN KEY(payer_id) REFERENCES users(id) ON DELETE CASCADE
    );");

    // 5. Expense splits table
    $pdo->exec("CREATE TABLE IF NOT EXISTS expense_splits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        expense_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        FOREIGN KEY(expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );");

    // 6. Itineraries table
    $pdo->exec("CREATE TABLE IF NOT EXISTS itineraries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER NOT NULL,
        visit_date DATE NOT NULL,
        visit_time TEXT,
        title TEXT NOT NULL,
        notes TEXT,
        location_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(trip_id) REFERENCES trips(id) ON DELETE CASCADE
    );");

    // 7. Checklists table
    $pdo->exec("CREATE TABLE IF NOT EXISTS checklists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER NOT NULL,
        item_name TEXT NOT NULL,
        category TEXT DEFAULT 'general',
        assigned_user_id INTEGER,
        is_completed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        FOREIGN KEY(assigned_user_id) REFERENCES users(id) ON DELETE SET NULL
    );");

    // Seed super admin user (passcode: 000000)
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE passcode = '000000'");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("INSERT INTO users (name, passcode, is_super_admin, role) VALUES ('Admin', '000000', 1, 'admin')");
    }
}
