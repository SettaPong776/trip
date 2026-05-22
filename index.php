<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRIPMATE — ระบบบริหารจัดทริปท่องเที่ยวพรีเมียม</title>
    <meta name="description" content="ระบบจัดการทริปท่องเที่ยวระดับพรีเมียม จัดการหลายทริป คำนวณหารเงิน วางแผนการเดินทาง และเช็ควันหยุดไทย">
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>

    <!-- ==========================================
         1. AUTH SECTION — PIN ONLY LOGIN
         ========================================== -->
    <section id="authSection" class="auth-wrapper" style="display: none;">
        <div class="auth-card glass-panel">
            <h1 class="auth-logo">TRIPMATE</h1>
            <p class="auth-subtitle">เพื่อนร่วมทาง วางแผน และคุมค่าใช้จ่ายกลุ่ม</p>
            
            <form id="loginForm" autocomplete="off">
                <div class="form-group" style="position: relative; z-index: 1;">
                    <label class="form-label" style="text-align: center; display: block; color: var(--text-secondary);">กรอกรหัส 6 หลักเพื่อเข้าสู่ระบบ</label>
                    <div class="pin-container">
                        <input type="text" class="pin-input" maxlength="1" pattern="[0-9]*" inputmode="numeric" required>
                        <input type="text" class="pin-input" maxlength="1" pattern="[0-9]*" inputmode="numeric" required>
                        <input type="text" class="pin-input" maxlength="1" pattern="[0-9]*" inputmode="numeric" required>
                        <input type="text" class="pin-input" maxlength="1" pattern="[0-9]*" inputmode="numeric" required>
                        <input type="text" class="pin-input" maxlength="1" pattern="[0-9]*" inputmode="numeric" required>
                        <input type="text" class="pin-input" maxlength="1" pattern="[0-9]*" inputmode="numeric" required>
                    </div>
                </div>
                <button type="submit" id="loginBtn" class="btn btn-primary" style="width: 100%; position: relative; z-index: 1;">เข้าสู่ระบบ</button>
            </form>
            
            <p style="margin-top: 28px; font-size: 0.78rem; color: var(--text-muted); position: relative; z-index: 1;">รหัสเริ่มต้น Admin: 000000</p>
        </div>
    </section>

    <!-- ==========================================
         2. TRIP SELECTOR PAGE (Landing Page)
         ========================================== -->
    <section id="tripSelectorPage" class="app-container trip-selector-page" style="display: none;">
        <div class="trip-selector-header">
            <div>
                <h1>ทริปของฉัน</h1>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;" id="tripSelectorGreeting">สวัสดี, ผู้ใช้</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button type="button" id="showCreateTripModalBtn" class="btn btn-primary btn-sm" style="display: none;">✈️ สร้างทริปใหม่</button>
                <button type="button" id="tripSelectorLogoutBtn" class="btn btn-secondary btn-sm">ออกจากระบบ</button>
            </div>
        </div>
        
        <!-- Global Sub-navigation Bar -->
        <div class="global-nav-tabs-container" style="margin-bottom: 24px;">
            <nav class="global-nav-tabs">
                <button type="button" class="global-nav-tab-btn active" data-tab="trips-tab">
                    <span>📅 โครงการทั้งหมด</span>
                </button>
                <button type="button" class="global-nav-tab-btn" data-tab="holidays-tab" id="global-holidays-tab-btn">
                    <span>🔴 ปฏิทินวันหยุด</span>
                </button>
                <button type="button" class="global-nav-tab-btn" data-tab="members-tab" id="global-members-tab-btn" style="display: none;">
                    <span>👥 จัดการสมาชิก</span>
                </button>
            </nav>
        </div>

        <!-- A. Trips Tab Content -->
        <div id="tripsTabContent" class="global-tab-content">
            <!-- Upcoming Trip Banner (injected by JS) -->
            <div id="upcomingBannerContainer"></div>
            
            <!-- Trips Grid -->
            <div class="trips-grid stagger-children" id="tripsGridContainer">
                <!-- Trip cards injected by JS -->
            </div>
        </div>

        <!-- B. Holidays Tab Content (Global Holiday View) -->
        <div id="holidaysTabContent" class="global-tab-content" style="display: none;">
            <div class="itinerary-layout">
                <div class="glass-panel" style="padding: 28px;">
                    <div class="calendar-header">
                        <h2 class="section-title" id="holidaysCalendarTitle">ปฏิทินวันหยุดไทย</h2>
                        <div class="calendar-nav">
                            <button type="button" class="calendar-nav-btn" id="holidaysPrevMonth">◀</button>
                            <span id="holidaysMonthLabel" style="font-weight: 700; font-size: 0.95rem; min-width: 120px; text-align: center;"></span>
                            <button type="button" class="calendar-nav-btn" id="holidaysNextMonth">▶</button>
                        </div>
                    </div>
                    <div class="calendar-grid">
                        <div class="calendar-day-header">อา.</div>
                        <div class="calendar-day-header">จ.</div>
                        <div class="calendar-day-header">อ.</div>
                        <div class="calendar-day-header">พ.</div>
                        <div class="calendar-day-header">พฤ.</div>
                        <div class="calendar-day-header">ศ.</div>
                        <div class="calendar-day-header">ส.</div>
                    </div>
                    <div class="calendar-grid" id="holidaysCalendarGrid"></div>
                    
                    <h3 class="section-title" style="font-size: 0.95rem; margin-top: 24px; margin-bottom: 12px;" id="holidaysListTitle">วันหยุดในเดือนนี้</h3>
                    <div class="holiday-list-scroller" id="holidaysMonthList" style="max-height: 300px;"></div>
                </div>
                
                <div>
                    <div class="glass-panel leave-suggestions-panel">
                        <h2 class="section-title" style="color: var(--accent-cyan); margin-bottom: 6px;">💡 แนะนำวันลาพักร้อน</h2>
                        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px;">คำนวณวันลาเพิ่มเชื่อมวันหยุดยาว</p>
                        <div id="smartLeaveSuggestionsList"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- C. Members Tab Content (Global Members Dashboard) -->
        <div id="globalMembersTabContent" class="global-tab-content" style="display: none;">
            <div class="glass-panel" style="padding: 24px;">
                <div class="section-header" style="margin-bottom: 20px;">
                    <h2 class="section-title">👥 จัดการสมาชิกในระบบ</h2>
                    <button type="button" id="showAddGlobalUserModalBtn" class="btn btn-primary btn-sm">+ เพิ่มสมาชิก</button>
                </div>
                <div id="globalUserManagementContainer"></div>
            </div>
        </div>
    </section>

    <!-- ==========================================
         3. APP HEADER (Inside Trip)
         ========================================== -->
    <header id="appHeader" class="app-header" style="display: none;">
        <div class="logo-container">
            <span class="logo-text" id="backToTripsBtn">TRIPMATE</span>
        </div>
        
        <div class="nav-tabs-container" id="navTabsContainer" style="display: none;">
            <nav class="nav-tabs" aria-label="เมนูหลัก">
                <button type="button" class="nav-tab-btn active" data-tab="dashboard" id="tab-dashboard-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
                    <span>แดชบอร์ด</span>
                </button>
                <button type="button" class="nav-tab-btn" data-tab="itinerary" id="tab-itinerary-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>แผนเที่ยว</span>
                </button>
                <button type="button" class="nav-tab-btn" data-tab="expenses" id="tab-expenses-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    <span>หารเงิน</span>
                </button>
                <button type="button" class="nav-tab-btn" data-tab="checklist" id="tab-checklist-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                    <span>จัดของ</span>
                </button>
                <button type="button" class="nav-tab-btn" data-tab="status" id="tab-status-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                    <span>สถานะ</span>
                </button>
            </nav>
        </div>

        <div class="user-profile">
            <div class="user-info">
                <div class="user-name" id="headerUserName">ผู้ใช้</div>
                <div class="user-role" id="headerUserRole">บทบาท</div>
            </div>
            <button type="button" id="logoutBtn" class="btn btn-secondary btn-sm">ออกจากระบบ</button>
        </div>
    </header>

    <!-- ==========================================
         4. MAIN APP CONTENT — TRIP TABS
         ========================================== -->
    <main id="appContent" class="app-container" style="display: none;">
        
        <!-- A. DASHBOARD TAB -->
        <section id="dashboardTab" class="tab-content active">
            <div class="welcome-banner glass-panel">
                <div class="welcome-title" id="welcomeTripTitle">ชื่อทริป</div>
                <div class="welcome-subtitle" id="welcomeTripDates">ช่วงวันที่</div>
                <div id="tripCountdownText" style="font-weight: 600; color: var(--primary); font-size: 1rem; margin-top: 8px; position: relative; z-index: 1;"></div>
            </div>
            
            <div class="dashboard-grid">
                <div>
                    <div class="glass-panel" style="padding: 24px; margin-bottom: 20px;">
                        <h2 class="section-title" style="margin-bottom: 16px;">งบประมาณ</h2>
                        <div class="stats-row">
                            <div class="stat-card">
                                <div class="stat-label">งบประมาณรวม</div>
                                <div class="stat-val warning" id="statTotalBudget">0 ฿</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">ใช้จ่ายแล้ว</div>
                                <div class="stat-val accent" id="statSpentTotal">0 ฿</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">คงเหลือ</div>
                                <div class="stat-val success" id="statRemainingBudget">0 ฿</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="glass-panel members-list-panel">
                        <div class="section-header">
                            <h2 class="section-title">👥 สมาชิกในทริป</h2>
                        </div>
                        <div class="members-scroller" id="dashboardMembersList"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- B. ITINERARY TAB -->
        <section id="itineraryTab" class="tab-content">
            <div class="itinerary-layout">
                <div class="glass-panel timeline-container">
                    <div class="timeline-header">
                        <h2 class="section-title">📍 แผนการเดินทาง</h2>
                        <button type="button" id="showAddItineraryModal" class="btn btn-primary btn-sm">+ เพิ่มกำหนดการ</button>
                    </div>
                    <div class="day-filters" id="itineraryDayFilters"></div>
                    <div id="timelineEventsContainer" style="position: relative;"></div>
                </div>
                
                <div>
                    <div class="glass-panel calendar-panel">
                        <div class="calendar-header">
                            <h2 class="section-title" id="calendarMonthTitle">ปฏิทิน</h2>
                        </div>
                        <div class="calendar-grid">
                            <div class="calendar-day-header">อา.</div>
                            <div class="calendar-day-header">จ.</div>
                            <div class="calendar-day-header">อ.</div>
                            <div class="calendar-day-header">พ.</div>
                            <div class="calendar-day-header">พฤ.</div>
                            <div class="calendar-day-header">ศ.</div>
                            <div class="calendar-day-header">ส.</div>
                        </div>
                        <div class="calendar-grid" id="calendarGridDays"></div>
                        
                        <h3 class="section-title" style="font-size: 0.95rem; margin-top: 20px; margin-bottom: 10px;">🔴 วันหยุดในช่วงทริป</h3>
                        <div class="holiday-list-scroller" id="tripHolidaysScroller"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- C. EXPENSES TAB -->
        <section id="expensesTab" class="tab-content">
            <div class="expense-layout">
                <div class="glass-panel expense-card">
                    <div class="section-header" style="margin-bottom: 16px;">
                        <h2 class="section-title">💸 รายการใช้จ่าย</h2>
                        <button type="button" id="showAddExpenseModal" class="btn btn-primary btn-sm">+ เพิ่มค่าใช้จ่าย</button>
                    </div>
                    <div id="expensesListContainer"></div>
                </div>
                
                <div>
                    <div class="glass-panel settlement-panel" style="margin-bottom: 20px;">
                        <h2 class="section-title" style="margin-bottom: 14px;">📊 ยอดสะสมรายคน</h2>
                        <div id="memberBalancesContainer"></div>
                    </div>
                    
                    <div class="glass-panel settlement-panel">
                        <h2 class="section-title" style="margin-bottom: 4px;">🤝 สรุปเคลียร์เงิน</h2>
                        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px;">หักล้างหนี้ให้เหลือครั้งโอนน้อยที่สุด</p>
                        <div class="settlement-list" id="optimizedSettlementsContainer"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- D. CHECKLIST TAB -->
        <section id="checklistTab" class="tab-content">
            <div class="checklist-layout">
                <div class="glass-panel checklist-container">
                    <div class="section-header" style="margin-bottom: 16px;">
                        <h2 class="section-title">🎒 รายการเตรียมของ</h2>
                        <button type="button" id="showAddChecklistModal" class="btn btn-primary btn-sm">+ เพิ่มของ</button>
                    </div>
                    
                    <div class="checklist-progress-wrapper">
                        <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                            <span>ความพร้อมสัมภาระ</span>
                            <span id="checklistProgressText" style="font-weight: 600;">0/0 (0%)</span>
                        </div>
                        <div class="checklist-progress-bar">
                            <div class="checklist-progress-fill" id="checklistProgressBarFill"></div>
                        </div>
                    </div>
                    
                    <div class="checklist-items-list" id="checklistItemsContainer"></div>
                </div>
                
                <div>
                    <div class="glass-panel" style="padding: 24px;">
                        <h2 class="section-title" style="margin-bottom: 14px;">💡 คำแนะนำ</h2>
                        <ul style="color: var(--text-muted); font-size: 0.85rem; padding-left: 18px; line-height: 1.7;">
                            <li style="margin-bottom: 6px;">แยกเอกสารสำคัญไว้ที่หยิบง่าย</li>
                            <li style="margin-bottom: 6px;">เตรียมปลั๊กไฟ Universal Adapter</li>
                            <li style="margin-bottom: 6px;">ยาประจำตัวและยาสามัญ</li>
                            <li>ตรวจสอบน้ำหนักกระเป๋าก่อนเดินทาง</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- E. INVITATION STATUS TAB -->
        <section id="statusTab" class="tab-content">
            <h2 class="section-title" style="margin-bottom: 20px;">📋 สถานะการเข้าร่วม</h2>
            <div class="kanban-board" id="kanbanBoardContainer"></div>
        </section>

    </main>

    <!-- ==========================================
         5. MODAL DIALOGS
         ========================================== -->
    
    <!-- A. CREATE TRIP MODAL -->
    <div id="createTripModal" class="modal-overlay">
        <div class="modal-card glass-panel">
            <h2 class="section-title" style="margin-bottom: 20px;">✈️ สร้างทริปใหม่</h2>
            <form id="createTripForm">
                <div class="form-group">
                    <label class="form-label" for="tripTitle">ชื่อทริป *</label>
                    <input type="text" id="tripTitle" class="form-input" placeholder="เช่น เที่ยวญี่ปุ่น 2026" required>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div class="form-group">
                        <label class="form-label" for="tripStartDate">วันเริ่ม *</label>
                        <input type="date" id="tripStartDate" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="tripEndDate">วันสิ้นสุด *</label>
                        <input type="date" id="tripEndDate" class="form-input" required>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1.5fr 0.5fr; gap: 10px;">
                    <div class="form-group">
                        <label class="form-label" for="tripBudget">งบประมาณรวม (บาท)</label>
                        <input type="number" id="tripBudget" class="form-input" placeholder="0" value="0">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="tripEmoji">ไอคอน</label>
                        <input type="text" id="tripEmoji" class="form-input" value="✈️" style="text-align: center; font-size: 1.3rem;">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">เลือกผู้เข้าร่วมทริป</label>
                    <div id="createTripMembersList" class="global-members-checklist" style="max-height: 180px; overflow-y: auto; background: var(--surface-1); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                        <!-- Checkboxes injected by JS -->
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button type="button" id="closeCreateTripModal" class="btn btn-secondary">ยกเลิก</button>
                    <button type="submit" class="btn btn-primary">สร้างทริป</button>
                </div>
            </form>
        </div>
    </div>

    <!-- B. EDIT TRIP MODAL -->
    <div id="editTripModal" class="modal-overlay">
        <div class="modal-card glass-panel">
            <h2 class="section-title" style="margin-bottom: 20px;">✏️ แก้ไขโครงการท่องเที่ยว</h2>
            <form id="editTripForm">
                <input type="hidden" id="editTripId">
                <div class="form-group">
                    <label class="form-label" for="editTripTitle">ชื่อทริป *</label>
                    <input type="text" id="editTripTitle" class="form-input" placeholder="เช่น เที่ยวญี่ปุ่น 2026" required>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div class="form-group">
                        <label class="form-label" for="editTripStartDate">วันเริ่ม *</label>
                        <input type="date" id="editTripStartDate" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="editTripEndDate">วันสิ้นสุด *</label>
                        <input type="date" id="editTripEndDate" class="form-input" required>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1.5fr 0.5fr; gap: 10px;">
                    <div class="form-group">
                        <label class="form-label" for="editTripBudget">งบประมาณรวม (บาท)</label>
                        <input type="number" id="editTripBudget" class="form-input" placeholder="0" value="0">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="editTripEmoji">ไอคอน</label>
                        <input type="text" id="editTripEmoji" class="form-input" value="✈️" style="text-align: center; font-size: 1.3rem;">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">เลือกผู้เข้าร่วมทริป</label>
                    <div id="editTripMembersList" class="global-members-checklist" style="max-height: 180px; overflow-y: auto; background: var(--surface-1); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                        <!-- Checkboxes injected by JS -->
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button type="button" id="closeEditTripModal" class="btn btn-secondary">ยกเลิก</button>
                    <button type="submit" class="btn btn-primary">บันทึกการแก้ไข</button>
                </div>
            </form>
        </div>
    </div>

    <!-- C. ADD EXPENSE MODAL -->
    <div id="addExpenseModal" class="modal-overlay">
        <div class="modal-card glass-panel">
            <h2 class="section-title" style="margin-bottom: 18px;">💸 เพิ่มค่าใช้จ่าย</h2>
            <form id="addExpenseForm">
                <div class="form-group">
                    <label class="form-label" for="expenseDescription">รายละเอียด *</label>
                    <input type="text" id="expenseDescription" class="form-input" placeholder="เช่น ค่าอาหารมื้อเย็น" required>
                </div>
                
                <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px;">
                    <div class="form-group">
                        <label class="form-label" for="expenseAmount">จำนวนเงิน (฿) *</label>
                        <input type="number" step="0.01" id="expenseAmount" class="form-input" placeholder="0.00" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="expenseCategory">หมวดหมู่</label>
                        <select id="expenseCategory" class="form-select">
                            <option value="general">ทั่วไป</option>
                            <option value="food">อาหาร</option>
                            <option value="travel">เดินทาง</option>
                            <option value="hotel">ที่พัก</option>
                            <option value="shopping">ช้อปปิ้ง</option>
                        </select>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div class="form-group">
                        <label class="form-label" for="expensePayer">ผู้จ่ายเงิน *</label>
                        <select id="expensePayer" class="form-select" required></select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="expenseDate">วันที่ *</label>
                        <input type="date" id="expenseDate" class="form-input" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="expenseSplitType">รูปแบบหาร</label>
                    <select id="expenseSplitType" class="form-select">
                        <option value="equal">หารเท่ากัน</option>
                        <option value="custom">ระบุยอดรายคน</option>
                    </select>
                </div>
                
                <div class="form-group" style="background: var(--surface-1); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                    <label class="form-label" style="margin-bottom: 10px;">ผู้ร่วมหาร</label>
                    <div id="expenseSplitList" style="max-height: 180px; overflow-y: auto;"></div>
                </div>
                
                <div class="modal-actions">
                    <button type="button" id="closeAddExpenseModal" class="btn btn-secondary">ยกเลิก</button>
                    <button type="submit" class="btn btn-primary">บันทึก</button>
                </div>
            </form>
        </div>
    </div>

    <!-- D. ADD ITINERARY MODAL -->
    <div id="addItineraryModal" class="modal-overlay">
        <div class="modal-card glass-panel">
            <h2 class="section-title" style="margin-bottom: 18px;">📍 เพิ่มแผนเที่ยว</h2>
            <form id="addItineraryForm">
                <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 10px;">
                    <div class="form-group">
                        <label class="form-label" for="itineraryDate">วันที่ *</label>
                        <select id="itineraryDate" class="form-select" required></select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="itineraryTime">เวลา</label>
                        <input type="text" id="itineraryTime" class="form-input" placeholder="เช่น 09:30">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="itineraryTitle">สถานที่/กิจกรรม *</label>
                    <input type="text" id="itineraryTitle" class="form-input" placeholder="เช่น วัดพระแก้ว" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="itineraryMapUrl">ลิงก์ Google Maps</label>
                    <input type="url" id="itineraryMapUrl" class="form-input" placeholder="https://maps.google.com/...">
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="itineraryNotes">หมายเหตุ</label>
                    <textarea id="itineraryNotes" class="form-textarea" placeholder="รายละเอียดเพิ่มเติม"></textarea>
                </div>
                
                <div class="modal-actions">
                    <button type="button" id="closeAddItineraryModal" class="btn btn-secondary">ยกเลิก</button>
                    <button type="submit" class="btn btn-primary">บันทึก</button>
                </div>
            </form>
        </div>
    </div>

    <!-- E. ADD CHECKLIST MODAL -->
    <div id="addChecklistModal" class="modal-overlay">
        <div class="modal-card glass-panel">
            <h2 class="section-title" style="margin-bottom: 18px;">🎒 เพิ่มของเตรียม</h2>
            <form id="addChecklistForm">
                <div class="form-group">
                    <label class="form-label" for="checklistItemName">ชื่อสิ่งของ *</label>
                    <input type="text" id="checklistItemName" class="form-input" placeholder="เช่น ครีมกันแดด" required>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div class="form-group">
                        <label class="form-label" for="checklistCategory">หมวดหมู่</label>
                        <select id="checklistCategory" class="form-select">
                            <option value="general">ทั่วไป</option>
                            <option value="documents">เอกสาร</option>
                            <option value="clothes">เสื้อผ้า</option>
                            <option value="gadget">อุปกรณ์ไอที</option>
                            <option value="food">ของกิน</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="checklistAssignMember">ผู้รับผิดชอบ</label>
                        <select id="checklistAssignMember" class="form-select"></select>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button type="button" id="closeAddChecklistModal" class="btn btn-secondary">ยกเลิก</button>
                    <button type="submit" class="btn btn-primary">เพิ่ม</button>
                </div>
            </form>
        </div>
    </div>

    <!-- F. GLOBAL USER MODAL -->
    <div id="globalUserModal" class="modal-overlay">
        <div class="modal-card glass-panel">
            <h2 class="section-title" id="globalUserModalTitle" style="margin-bottom: 20px;">👥 เพิ่มผู้ใช้งานใหม่</h2>
            <form id="globalUserForm">
                <input type="hidden" id="globalUserId">
                <div class="form-group">
                    <label class="form-label" for="globalUserName">ชื่อผู้ใช้ *</label>
                    <input type="text" id="globalUserName" class="form-input" placeholder="กรอกชื่อ เช่น สมชาย" required>
                </div>
                <div class="form-group">
                    <label class="form-label" for="globalUserPasscode">รหัสผ่าน 6 หลัก (ไม่กรอกเพื่อสุ่มรหัสเมื่อสร้างใหม่)</label>
                    <input type="text" id="globalUserPasscode" class="form-input" placeholder="เช่น 123456" maxlength="6" pattern="[0-9]*" inputmode="numeric">
                </div>
                <div class="form-group">
                    <label class="form-label" for="globalUserRole">บทบาท (Role) *</label>
                    <select id="globalUserRole" class="form-select" required>
                        <option value="member">Member (สมาชิกทั่วไป)</option>
                        <option value="admin">Admin (ผู้ดูแลระบบ)</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button type="button" id="closeGlobalUserModal" class="btn btn-secondary">ยกเลิก</button>
                    <button type="submit" class="btn btn-primary" id="globalUserSubmitBtn">บันทึก</button>
                </div>
            </form>
        </div>
    </div>

    <!-- JS Files -->
    <script src="assets/js/holidays.js"></script>
    <script src="assets/js/app.js"></script>
</body>
</html>
