// assets/js/app.js

// ==========================================
// SVG ICONS & CONSTANTS
// ==========================================
const iconEditSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
const iconDeleteSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
const iconCancelSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line></svg>`;
const iconRestoreSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>`;
const iconCopySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const iconMapSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

// Category Icons (Expenses)
const svgFood = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v8c0 1.1.9 2 2 2h3Z"/><path d="M21 17v5"/></svg>`;
const svgTravel = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>`;
const svgHotel = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16M2 8h20v8H2M22 8v12M6 12h4"></path></svg>`;
const svgShopping = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`;
const svgGeneral = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`;

// Checklist Icons
const svgChecklistDocuments = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`;
const svgChecklistClothes = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 7.83V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7.83L3.62 3.46a2 2 0 0 1 1.64-3.46h13.5a2 2 0 0 1 1.62 3.46z"></path></svg>`;
const svgChecklistGadget = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
const svgChecklistFood = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v8c0 1.1.9 2 2 2h3Z"/></svg>`;
const svgChecklistGeneral = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="M9 10V6a3 3 0 0 1 6 0v4"></path></svg>`;

// ==========================================
// GLOBAL STATE
// ==========================================
let currentUser = null;
let currentTrips = [];
let activeTripId = null;
let tripDetails = null;
let tripMembers = [];
let myTripRole = 'member';
let globalUsers = [];
let activeExpenseFilter = 'general'; // 'general' or 'settlement'

// Holidays calendar state
let holidaysCalYear, holidaysCalMonth;

// Date helpers for timezone-safe local operations
function parseLocalDate(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
    const d = new Date(dateStr);
    d.setHours(0,0,0,0);
    return d;
}

function formatLocalDate(date) {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    checkSession();
    setupEventListeners();
    setupPinInputs();
});

// ==========================================
// PIN INPUT SETUP
// ==========================================
function setupPinInputs() {
    const inputs = document.querySelectorAll(".pin-input");
    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            const val = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = val;
            if (val.length > 0 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            // Auto-submit when all 6 digits entered
            if (index === inputs.length - 1 && val.length > 0) {
                const full = getPinValue();
                if (full.length === 6) handleLogin();
            }
        });
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
                inputs[index - 1].focus();
            }
        });
        input.addEventListener("paste", (e) => {
            e.preventDefault();
            const pasted = (e.clipboardData.getData('text') || '').replace(/[^0-9]/g, '').slice(0, 6);
            pasted.split('').forEach((ch, i) => {
                if (inputs[i]) inputs[i].value = ch;
            });
            if (pasted.length === 6) handleLogin();
        });
    });
}

function getPinValue() {
    let pin = "";
    document.querySelectorAll(".pin-input").forEach(input => pin += input.value);
    return pin;
}

function clearPinInputs() {
    document.querySelectorAll(".pin-input").forEach(input => input.value = "");
    document.querySelector(".pin-input")?.focus();
}

// ==========================================
// SESSION & AUTH
// ==========================================
async function checkSession() {
    try {
        const res = await fetch("api/auth.php?action=check");
        const data = await res.json();
        if (data.loggedIn) {
            currentUser = data.user;
            currentTrips = data.trips || [];
            if (data.active_trip_id) {
                activeTripId = data.active_trip_id;
                showTripApp();
            } else {
                showTripSelector();
            }
        } else {
            showLoginScreen();
        }
    } catch (err) {
        console.error("Session check failed", err);
        showLoginScreen();
    }
}

function showLoginScreen() {
    document.getElementById("authSection").style.display = "flex";
    const appLayout = document.getElementById("appLayout");
    if (appLayout) appLayout.style.display = "none";
}

function showTripSelector() {
    document.getElementById("authSection").style.display = "none";
    const appLayout = document.getElementById("appLayout");
    if (appLayout) appLayout.style.display = "flex";
    
    document.getElementById("tripSelectorPage").style.display = "block";
    document.getElementById("appContent").style.display = "none";
    
    const greetingEl = document.getElementById("tripSelectorGreeting");
    if (greetingEl) {
        greetingEl.textContent = `สวัสดี, ${currentUser.name}`;
    }
    
    // Update user profile card in sidebar footer
    document.getElementById("headerUserName").textContent = currentUser.name;
    document.getElementById("headerUserRole").textContent = currentUser.role === 'admin' ? 'Admin' : 'Member';
    const avatarEl = document.getElementById("sidebarAvatar");
    if (avatarEl) {
        avatarEl.textContent = currentUser.name.substring(0, 2).toUpperCase();
    }
    
    // Role-based visibility
    const isAdmin = currentUser.role === 'admin';
    document.getElementById("showCreateTripModalBtn").style.display = isAdmin ? "inline-flex" : "none";
    document.getElementById("global-members-tab-btn").style.display = isAdmin ? "inline-flex" : "none";
    
    // Switch to trips-tab by default
    switchGlobalTab("trips-tab");
}

function showTripApp() {
    document.getElementById("authSection").style.display = "none";
    const appLayout = document.getElementById("appLayout");
    if (appLayout) appLayout.style.display = "flex";
    
    document.getElementById("tripSelectorPage").style.display = "none";
    document.getElementById("appContent").style.display = "block";
    
    document.getElementById("headerUserName").textContent = currentUser.name;
    document.getElementById("headerUserRole").textContent = myTripRole === 'admin' ? 'Admin' : 'Member';
    const avatarEl = document.getElementById("sidebarAvatar");
    if (avatarEl) {
        avatarEl.textContent = currentUser.name.substring(0, 2).toUpperCase();
    }
    
    // Show trip section in sidebar
    const sidebarTripSection = document.getElementById("sidebarTripSection");
    if (sidebarTripSection) {
        sidebarTripSection.style.display = "block";
    }
    
    // In trip app, hide global creator buttons
    document.getElementById("showCreateTripModalBtn").style.display = "none";
    document.getElementById("showAddGlobalUserModalBtn").style.display = "none";
    
    loadTripDetails();
    switchTab("dashboard");
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Login
    document.getElementById("loginForm").addEventListener("submit", (e) => { e.preventDefault(); handleLogin(); });
    
    // Global Sub-navigation Tabs
    document.querySelectorAll(".global-nav-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => switchGlobalTab(btn.dataset.tab));
    });
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", toggleSidebar);
    }
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }
    // Close sidebar when clicking links inside the sidebar
    document.querySelectorAll(".sidebar-nav-item").forEach(item => {
        item.addEventListener("click", closeSidebar);
    });
    
    // Trip Selector / Create Trip Checklist Setup
    document.getElementById("showCreateTripModalBtn").addEventListener("click", () => {
        loadGlobalUsersChecklist("createTripMembersList");
        openModal("createTripModal");
    });
    document.getElementById("tripSelectorLogoutBtn").addEventListener("click", handleLogout);
    
    // Create Trip
    document.getElementById("closeCreateTripModal").addEventListener("click", () => closeModal("createTripModal"));
    document.getElementById("createTripForm").addEventListener("submit", handleCreateTrip);
    
    // Edit Trip
    document.getElementById("closeEditTripModal").addEventListener("click", closeEditTrip);
    document.getElementById("editTripForm").addEventListener("submit", handleEditTrip);
    
    // Global Users Management (Members)
    document.getElementById("showAddGlobalUserModalBtn").addEventListener("click", openAddGlobalUserModal);
    document.getElementById("closeGlobalUserModal").addEventListener("click", () => closeModal("globalUserModal"));
    document.getElementById("globalUserForm").addEventListener("submit", handleGlobalUserSubmit);
    
    // Back to trips
    document.getElementById("backToTripsBtn").addEventListener("click", backToTripSelector);
    
    // Logout
    document.getElementById("logoutBtn").addEventListener("click", handleLogout);
    
    // Tabs (inside trip)
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });
    
    // Expenses
    document.getElementById("showAddExpenseModal").addEventListener("click", openAddExpenseModal);
    document.getElementById("closeAddExpenseModal").addEventListener("click", () => closeModal("addExpenseModal"));
    document.getElementById("expenseSplitType").addEventListener("change", generateSplitCheckboxList);
    document.getElementById("addExpenseForm").addEventListener("submit", handleAddExpenseSubmit);
    
    // Itinerary
    document.getElementById("showAddItineraryModal").addEventListener("click", openAddItineraryModal);
    document.getElementById("closeAddItineraryModal").addEventListener("click", () => closeModal("addItineraryModal"));
    document.getElementById("addItineraryForm").addEventListener("submit", handleAddItinerarySubmit);
    
    // Checklist
    document.getElementById("showAddChecklistModal").addEventListener("click", openAddChecklistModal);
    document.getElementById("closeAddChecklistModal").addEventListener("click", () => closeModal("addChecklistModal"));
    document.getElementById("addChecklistForm").addEventListener("submit", handleAddChecklistSubmit);
    
    // Holidays calendar navigation
    document.getElementById("holidaysPrevMonth").addEventListener("click", () => { holidaysCalMonth--; if (holidaysCalMonth < 0) { holidaysCalMonth = 11; holidaysCalYear--; } renderHolidaysCalendar(); });
    document.getElementById("holidaysNextMonth").addEventListener("click", () => { holidaysCalMonth++; if (holidaysCalMonth > 11) { holidaysCalMonth = 0; holidaysCalYear++; } renderHolidaysCalendar(); });
    
    // Toggle between Trip Expenses vs Settlement Payments
    const btnToggleAllExpenses = document.getElementById("btnToggleAllExpenses");
    const btnToggleSettlements = document.getElementById("btnToggleSettlements");
    if (btnToggleAllExpenses && btnToggleSettlements) {
        btnToggleAllExpenses.addEventListener("click", () => {
            activeExpenseFilter = 'general';
            btnToggleAllExpenses.classList.add("active");
            btnToggleSettlements.classList.remove("active");
            loadExpenses();
        });
        btnToggleSettlements.addEventListener("click", () => {
            activeExpenseFilter = 'settlement';
            btnToggleSettlements.classList.add("active");
            btnToggleAllExpenses.classList.remove("active");
            loadExpenses();
        });
    }

    // Bind currency formatting to inputs
    bindCommaFormatting(document.getElementById("tripBudget"));
    bindCommaFormatting(document.getElementById("editTripBudget"));
    bindCommaFormatting(document.getElementById("expenseAmount"));
}

// ==========================================
// MODAL HELPERS
// ==========================================
function openModal(id) { document.getElementById(id).classList.add("active"); }
function closeModal(id) { document.getElementById(id).classList.remove("active"); }

// ==========================================
// TOAST / CONFIRM / ALERT POPUPS
// ==========================================
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    };
    toast.innerHTML = `<span class="toast-icon-wrapper" style="display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">${icons[type] || icons.info}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('transitionend', () => { toast.remove(); if (container.children.length === 0) container.remove(); }, { once: true });
    }, 3000);
}

function showConfirm(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay active';
        overlay.innerHTML = `<div class="modal-card glass-panel" style="max-width:400px;text-align:center;padding:32px 24px;">
            <div style="margin-bottom:18px;display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;background:rgba(0,113,227,0.08);color:var(--apple-blue);margin-left:auto;margin-right:auto;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <h3 class="section-title" style="margin-bottom:10px;font-size:1.2rem;">ยืนยันการทำรายการ</h3>
            <p style="color:var(--text-muted);margin-bottom:24px;font-size:0.9rem;line-height:1.5;">${message}</p>
            <div class="modal-actions" style="justify-content:center;gap:12px;margin-top:0;">
                <button type="button" class="btn btn-primary" id="cfmOk" style="flex:1;">ตกลง</button>
                <button type="button" class="btn btn-secondary" id="cfmCancel" style="flex:1;">ยกเลิก</button>
            </div></div>`;
        document.body.appendChild(overlay);
        const dismiss = (v) => { overlay.classList.remove('active'); setTimeout(() => { overlay.remove(); resolve(v); }, 250); };
        overlay.querySelector('#cfmCancel').onclick = () => dismiss(false);
        overlay.querySelector('#cfmOk').onclick = () => dismiss(true);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) dismiss(false); });
    });
}

function showAlert(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay active';
        overlay.innerHTML = `<div class="modal-card glass-panel" style="max-width:400px;text-align:center;padding:32px 24px;">
            <div style="margin-bottom:18px;display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;background:rgba(255,149,0,0.08);color:var(--apple-orange);margin-left:auto;margin-right:auto;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <h3 class="section-title" style="margin-bottom:10px;font-size:1.2rem;">แจ้งเตือน</h3>
            <p style="color:var(--text-muted);margin-bottom:24px;font-size:0.9rem;line-height:1.5;">${message}</p>
            <div class="modal-actions" style="justify-content:center;margin-top:0;">
                <button type="button" class="btn btn-primary" id="alertOk" style="min-width:120px;">ตกลง</button>
            </div></div>`;
        document.body.appendChild(overlay);
        const dismiss = () => { overlay.classList.remove('active'); setTimeout(() => { overlay.remove(); resolve(); }, 250); };
        overlay.querySelector('#alertOk').onclick = dismiss;
        overlay.addEventListener('click', (e) => { if (e.target === overlay) dismiss(); });
    });
}

window.showToast = showToast;
window.showAlert = showAlert;
window.showConfirm = showConfirm;

// ==========================================
// LOGIN
// ==========================================
async function handleLogin() {
    const passcode = getPinValue();
    if (passcode.length !== 6) { showErrorShake(); return; }
    
    try {
        const res = await fetch("api/auth.php?action=login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ passcode })
        });
        const data = await res.json();
        if (data.success) {
            currentUser = data.user;
            currentTrips = data.trips || [];
            showTripSelector();
        } else {
            showToast(data.error || "รหัสไม่ถูกต้อง", "error");
            showErrorShake();
            clearPinInputs();
        }
    } catch (err) {
        console.error(err);
        showToast("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้", "error");
    }
}

function showErrorShake() {
    const c = document.querySelector(".pin-container");
    c.classList.add("shake");
    setTimeout(() => c.classList.remove("shake"), 400);
}

async function handleLogout() {
    if (!await showConfirm("ออกจากระบบ?")) return;
    try {
        await fetch("api/auth.php?action=logout", { method: "POST" });
        currentUser = null; currentTrips = []; activeTripId = null; tripDetails = null; tripMembers = [];
        clearPinInputs();
        showLoginScreen();
    } catch (err) { console.error(err); }
}

// ==========================================
// TRIP SELECTOR PAGE
// ==========================================
function renderTripSelector() {
    const bannerContainer = document.getElementById("upcomingBannerContainer");
    const gridContainer = document.getElementById("tripsGridContainer");
    
    bannerContainer.innerHTML = "";
    gridContainer.innerHTML = "";
    
    if (currentTrips.length === 0) {
        gridContainer.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon" style="margin-bottom:16px;display:inline-flex;align-items:center;justify-content:center;color:var(--apple-gray-4);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                </div>
                <div class="empty-state-text">ยังไม่มีโครงการท่องเที่ยว</div>
                ${currentUser.role === 'admin' ? '<p style="color:var(--text-muted);margin-bottom:20px;">เริ่มสร้างโครงการแรกของคุณโดยคลิกปุ่มด้านบน</p>' : '<p style="color:var(--text-muted);">รอผู้ดูแลระบบสร้างโครงการและเชิญคุณเข้าร่วม</p>'}
            </div>`;
        return;
    }
    
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Find active trip or closest upcoming trip
    let upcoming = null;
    let minDiff = Infinity;
    
    const activeTrip = currentTrips.find(t => {
        if (t.is_canceled == 1) return false;
        const start = parseLocalDate(t.start_date);
        const end = parseLocalDate(t.end_date);
        return today >= start && today <= end;
    });
    
    if (activeTrip) {
        upcoming = activeTrip;
    } else {
        currentTrips.forEach(t => {
            if (t.is_canceled == 1) return;
            const start = parseLocalDate(t.start_date);
            if (start > today) {
                const diff = start - today;
                if (diff < minDiff) {
                    minDiff = diff;
                    upcoming = t;
                }
            }
        });
        
        // Fallback to first trip if no active or upcoming uncanceled trip
        if (!upcoming && currentTrips.length > 0) {
            upcoming = currentTrips[0];
        }
    }
    
    // Render upcoming banner
    if (upcoming) {
        const start = parseLocalDate(upcoming.start_date);
        const end = parseLocalDate(upcoming.end_date);
        let countdownText = '';
        let badgeStyle = '';
        
        if (upcoming.is_canceled == 1) {
            countdownText = 'ยกเลิกแล้ว';
            badgeStyle = 'background:rgba(255, 59, 48, 0.15);color:var(--apple-red);border:1px solid rgba(255,59,48,0.25);box-shadow:none;';
        } else if (today < start) {
            const diff = Math.ceil((start - today) / (1000*60*60*24));
            countdownText = `อีก ${diff} วัน`;
            badgeStyle = '';
        } else if (today >= start && today <= end) {
            countdownText = `เริ่มทริป`;
            badgeStyle = 'background:var(--apple-green);color:white;box-shadow:0 4px 12px rgba(52,199,89,0.3);border:none;';
        } else {
            countdownText = `จบทริป`;
            badgeStyle = 'background:rgba(255, 59, 48, 0.15);color:var(--apple-red);border:1px solid rgba(255,59,48,0.25);box-shadow:none;';
        }
        
        let actionButtonsHtml = '';
        if (currentUser.role === 'admin') {
            if (upcoming.is_canceled == 1) {
                actionButtonsHtml = `
                    <div class="trip-card-actions" style="top: 20px; right: 20px;">
                        <button type="button" class="btn-icon card-restore-btn" title="กู้คืนโครงการ" style="display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconRestoreSvg}</button>
                        <button type="button" class="btn-icon card-force-delete-btn" title="ลบถาวร" style="color:var(--danger);display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconDeleteSvg}</button>
                    </div>
                `;
            } else {
                actionButtonsHtml = `
                    <div class="trip-card-actions" style="top: 20px; right: 20px;">
                        <button type="button" class="btn-icon card-edit-btn" title="แก้ไข" style="display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconEditSvg}</button>
                        <button type="button" class="btn-icon card-cancel-btn" title="ยกเลิกโครงการ" style="color:var(--apple-orange);display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconCancelSvg}</button>
                    </div>
                `;
            }
        }
        
        bannerContainer.innerHTML = `
            <div class="upcoming-banner" onclick="selectTrip(${upcoming.id})">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;position:relative;z-index:1;">
                    <div class="upcoming-emoji" style="margin-bottom:0;">${upcoming.cover_emoji || '✈️'}</div>
                    <div class="upcoming-label" style="margin-bottom:0;">ทริปถัดไป</div>
                </div>
                <div class="upcoming-title">${upcoming.title}</div>
                <div class="upcoming-dates">${ThaiHolidays.formatThaiDate(upcoming.start_date)} — ${ThaiHolidays.formatThaiDate(upcoming.end_date)}</div>
                <div class="upcoming-meta">
                    <div class="upcoming-meta-item" style="display:inline-flex;align-items:center;gap:4px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:rgba(255,255,255,0.6);"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <strong>${upcoming.member_count || 0}</strong> คน
                    </div>
                    <div class="upcoming-meta-item" style="display:inline-flex;align-items:center;gap:4px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:rgba(255,255,255,0.6);"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="12"></line><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                        <strong>${formatCurrency(upcoming.total_budget)}</strong> ฿
                    </div>
                </div>
                ${countdownText ? `<div class="countdown-badge" style="${badgeStyle}">${countdownText}</div>` : ''}
                ${actionButtonsHtml}
            </div>`;
            
        if (currentUser.role === 'admin') {
            const banner = bannerContainer.querySelector('.upcoming-banner');
            if (upcoming.is_canceled == 1) {
                banner.querySelector('.card-restore-btn').onclick = (e) => {
                    e.stopPropagation();
                    restoreTrip(upcoming.id, upcoming.title);
                };
                banner.querySelector('.card-force-delete-btn').onclick = (e) => {
                    e.stopPropagation();
                    forceDeleteTrip(upcoming.id, upcoming.title);
                };
            } else {
                banner.querySelector('.card-edit-btn').onclick = (e) => {
                    e.stopPropagation();
                    openEditTrip(upcoming.id);
                };
                banner.querySelector('.card-cancel-btn').onclick = (e) => {
                    e.stopPropagation();
                    cancelTrip(upcoming.id, upcoming.title);
                };
            }
        }
    }
    
    // Render trip cards
    currentTrips.forEach(t => {
        const start = parseLocalDate(t.start_date);
        const end = parseLocalDate(t.end_date);
        let statusClass = '', statusText = '';
        
        if (t.is_canceled == 1) {
            statusClass = 'trip-status-canceled';
            statusText = 'ยกเลิกแล้ว';
        } else if (today < start) {
            statusClass = 'trip-status-upcoming';
            statusText = 'กำลังมาถึง';
        } else if (today >= start && today <= end) {
            statusClass = 'trip-status-active';
            statusText = 'เริ่มทริป';
        } else {
            statusClass = 'trip-status-completed';
            statusText = 'จบทริป';
        }
        
        let actionButtonsHtml = '';
        if (currentUser.role === 'admin') {
            if (t.is_canceled == 1) {
                actionButtonsHtml = `
                    <div class="trip-card-actions">
                        <button type="button" class="btn-icon card-restore-btn" title="กู้คืนโครงการ" style="display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconRestoreSvg}</button>
                        <button type="button" class="btn-icon card-force-delete-btn" title="ลบถาวร" style="color:var(--danger);display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconDeleteSvg}</button>
                    </div>
                `;
            } else {
                actionButtonsHtml = `
                    <div class="trip-card-actions">
                        <button type="button" class="btn-icon card-edit-btn" title="แก้ไข" style="display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconEditSvg}</button>
                        <button type="button" class="btn-icon card-cancel-btn" title="ยกเลิกโครงการ" style="color:var(--apple-orange);display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconCancelSvg}</button>
                    </div>
                `;
            }
        }
        
        const card = document.createElement("div");
        card.className = "trip-card";
        card.onclick = () => selectTrip(t.id);
        card.innerHTML = `
            <div class="trip-card-emoji">${t.cover_emoji || '✈️'}</div>
            <div class="trip-card-title">${t.title}</div>
            <div class="trip-card-dates">${ThaiHolidays.formatThaiDate(t.start_date)} — ${ThaiHolidays.formatThaiDate(t.end_date)}</div>
            <div class="trip-card-footer">
                <div class="trip-card-members" style="display:inline-flex;align-items:center;gap:4px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--apple-gray-4);"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>${t.member_count || 0} คน</span>
                </div>
                <span class="trip-status-pill ${statusClass}">${statusText}</span>
            </div>
            ${actionButtonsHtml}`;
            
        if (currentUser.role === 'admin') {
            if (t.is_canceled == 1) {
                card.querySelector('.card-restore-btn').onclick = (e) => {
                    e.stopPropagation();
                    restoreTrip(t.id, t.title);
                };
                card.querySelector('.card-force-delete-btn').onclick = (e) => {
                    e.stopPropagation();
                    forceDeleteTrip(t.id, t.title);
                };
            } else {
                card.querySelector('.card-edit-btn').onclick = (e) => {
                    e.stopPropagation();
                    openEditTrip(t.id);
                };
                card.querySelector('.card-cancel-btn').onclick = (e) => {
                    e.stopPropagation();
                    cancelTrip(t.id, t.title);
                };
            }
        }
        gridContainer.appendChild(card);
    });
}

async function selectTrip(tripId) {
    try {
        const res = await fetch("api/auth.php?action=select_trip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip_id: tripId })
        });
        const data = await res.json();
        if (data.success) {
            activeTripId = tripId;
            myTripRole = data.role;
            showTripApp();
        } else {
            showToast(data.error, "error");
        }
    } catch (err) { console.error(err); }
}

async function backToTripSelector() {
    activeTripId = null;
    try {
        await fetch("api/auth.php?action=select_trip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip_id: 0 })
        });
    } catch (err) {
        console.error("Failed to clear active trip session", err);
    }
    await refreshTripsAndShow();
}

async function refreshTripsAndShow() {
    try {
        const res = await fetch("api/auth.php?action=check");
        const data = await res.json();
        if (data.loggedIn) {
            currentUser = data.user;
            currentTrips = data.trips || [];
            showTripSelector();
        }
    } catch (err) { console.error(err); }
}

async function handleCreateTrip(e) {
    e.preventDefault();
    const title = document.getElementById("tripTitle").value.trim();
    const start_date = document.getElementById("tripStartDate").value;
    const end_date = document.getElementById("tripEndDate").value;
    const total_budget = parseFloat(document.getElementById("tripBudget").value.replace(/,/g, '')) || 0;
    const cover_emoji = document.getElementById("tripEmoji").value.trim() || '✈️';
    
    // Collect selected member IDs
    const member_ids = [];
    document.querySelectorAll("#createTripMembersList input.trip-member-cb:checked").forEach(cb => {
        member_ids.push(parseInt(cb.value));
    });
    
    if (!title || !start_date || !end_date) {
        showToast("กรุณากรอกข้อมูลให้ครบ", "warning");
        return;
    }
    
    try {
        const res = await fetch("api/trip.php?action=create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, start_date, end_date, total_budget, cover_emoji, member_ids })
        });
        const data = await res.json();
        if (data.success) {
            closeModal("createTripModal");
            document.getElementById("createTripForm").reset();
            document.getElementById("tripEmoji").value = "✈️";
            showToast("สร้างโครงการท่องเที่ยวสำเร็จ", "success");
            await refreshTripsAndShow();
        } else {
            showToast(data.error || "สร้างทริปล้มเหลว", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("เกิดข้อผิดพลาด", "error");
    }
}// ==========================================
// TAB SWITCHING
// ==========================================
function switchTab(tabName) {
    // Inside a trip tabs
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    // Remove active class from global tab buttons when showing inside-trip content
    document.querySelectorAll(".global-nav-tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.toggle("active", tab.id === `${tabName}Tab`);
    });
    
    // Update Topbar Title
    const tabLabels = {
        dashboard: "แดชบอร์ด",
        itinerary: "แผนเที่ยว",
        expenses: "หารเงิน",
        checklist: "จัดของ",
        status: "สถานะเชิญ"
    };
    const titleText = tripDetails ? `${tripDetails.title} / ${tabLabels[tabName] || tabName}` : (tabLabels[tabName] || tabName);
    const topTitle = document.getElementById("topbarTitle");
    if (topTitle) topTitle.textContent = titleText;
    
    // Hide global action buttons inside a trip
    document.getElementById("showCreateTripModalBtn").style.display = "none";
    document.getElementById("showAddGlobalUserModalBtn").style.display = "none";
    
    if (tabName === "dashboard") loadTripDetails();
    else if (tabName === "expenses") loadExpenses();
    else if (tabName === "itinerary") loadItinerary();
    else if (tabName === "checklist") loadChecklist();
    else if (tabName === "members") loadMembersTab();
    else if (tabName === "status") loadStatusTab();
    else if (tabName === "holidays") loadHolidaysTab();
}

// ==========================================
// DASHBOARD
// ==========================================
async function loadTripDetails() {
    try {
        const res = await fetch("api/trip.php?action=details");
        const data = await res.json();
        if (data.error) { showToast(data.error, "error"); backToTripSelector(); return; }
        
        tripDetails = data.trip;
        tripMembers = data.members;
        myTripRole = data.my_role;
        
        renderDashboard();
    } catch (err) { console.error(err); }
}

function renderDashboard() {
    document.getElementById("welcomeTripTitle").textContent = tripDetails.title;
    document.getElementById("welcomeTripDates").textContent = `${ThaiHolidays.formatThaiDate(tripDetails.start_date)} — ${ThaiHolidays.formatThaiDate(tripDetails.end_date)}`;
    
    const today = new Date(); today.setHours(0,0,0,0);
    const start = parseLocalDate(tripDetails.start_date);
    const end = parseLocalDate(tripDetails.end_date);
    
    const countdownEl = document.getElementById("tripCountdownText");
    if (today < start) {
        const diff = Math.ceil(Math.abs(start - today) / (1000*60*60*24));
        countdownEl.textContent = `อีก ${diff} วันจะออกเดินทาง`;
        countdownEl.style.color = 'var(--apple-blue)';
    } else if (today >= start && today <= end) {
        countdownEl.textContent = `เริ่มทริป`;
        countdownEl.style.color = 'var(--apple-green)';
    } else {
        countdownEl.textContent = `จบทริป`;
        countdownEl.style.color = 'var(--apple-red)';
    }
    
    document.getElementById("statTotalBudget").textContent = `${formatCurrency(tripDetails.total_budget)} ฿`;
    
    // Update header role
    document.getElementById("headerUserRole").textContent = myTripRole === 'admin' ? 'Admin' : 'Member';
    
    // Update topbar title with full trip name and current tab
    const activeTabBtn = document.querySelector(".nav-tab-btn.active");
    const activeTabName = activeTabBtn ? activeTabBtn.dataset.tab : "dashboard";
    const tabLabels = {
        dashboard: "แดชบอร์ด",
        itinerary: "แผนเที่ยว",
        expenses: "หารเงิน",
        checklist: "จัดของ",
        status: "สถานะเชิญ"
    };
    const topTitle = document.getElementById("topbarTitle");
    if (topTitle && tripDetails) {
        topTitle.textContent = `${tripDetails.title} / ${tabLabels[activeTabName] || activeTabName}`;
    }
    
    // Members
    const container = document.getElementById("dashboardMembersList");
    container.innerHTML = "";
    
    // Show add member button for admin
    const addBtns = [document.getElementById("showAddMemberModal"), document.getElementById("showAddMemberModal2")];
    addBtns.forEach(b => { if (b) b.style.display = myTripRole === 'admin' ? 'inline-flex' : 'none'; });
    
    tripMembers.forEach(m => {
        if (m.invite_status === 'declined') return;
        const isSelf = m.id == currentUser.id;
        const card = document.createElement("div");
        card.className = "member-row-card";
        
        let passcodeHtml = '';
        if (myTripRole === 'admin' || isSelf) {
            passcodeHtml = `<div class="passcode-container">
                <span class="passcode-text">${m.passcode}</span>
                <button type="button" class="btn-icon" onclick="navigator.clipboard.writeText('${m.passcode}');showToast('คัดลอกแล้ว','success');" style="display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconCopySvg}</button>
            </div>`;
        }
        
        const statusDot = m.invite_status === 'accepted' ? 'status-dot-accepted' : (m.invite_status === 'declined' ? 'status-dot-declined' : 'status-dot-pending');
        
        card.innerHTML = `
            <div class="member-meta">
                <div class="member-avatar">${m.name.substring(0, 2).toUpperCase()}</div>
                <div class="member-info-text">
                    <div class="name">${m.name} ${isSelf ? '<span style="color:var(--primary);font-size:0.8rem;">(คุณ)</span>' : ''}</div>
                    <span class="badge ${m.role === 'admin' ? 'badge-admin' : 'badge-member'}">${m.role === 'admin' ? 'Admin' : 'Member'}</span>
                    <span class="status-dot ${statusDot}" style="display:inline-block;margin-left:6px;"></span>
                </div>
            </div>
            ${passcodeHtml}`;
        container.appendChild(card);
    });
}

// ==========================================
// GLOBAL TABS & MEMBERS & TRIP EDIT/DELETE MANAGEMENT
// ==========================================
function switchGlobalTab(tabName) {
    // Global tabs (Trips, Holidays, Members, Credit)
    document.querySelectorAll(".global-nav-tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    // Remove active class from inside-trip tab buttons when showing global content
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    
    // Hide inside-trip content and show global content wrapper
    document.getElementById("tripSelectorPage").style.display = "block";
    document.getElementById("appContent").style.display = "none";
    
    // Hide all global content sub-sections
    document.getElementById("tripsTabContent").style.display = "none";
    document.getElementById("holidaysTabContent").style.display = "none";
    document.getElementById("globalMembersTabContent").style.display = "none";
    document.getElementById("socialCreditTabContent").style.display = "none";
    
    // Hide inside-trip sidebar section
    const sidebarTripSection = document.getElementById("sidebarTripSection");
    if (sidebarTripSection) {
        sidebarTripSection.style.display = "none";
    }
    
    // Show active global tab, update topbar title & buttons
    const isAdmin = currentUser.role === 'admin';
    const topbarTitle = document.getElementById("topbarTitle");
    const createBtn = document.getElementById("showCreateTripModalBtn");
    const addMemberBtn = document.getElementById("showAddGlobalUserModalBtn");
    
    if (tabName === "trips-tab") {
        document.getElementById("tripsTabContent").style.display = "block";
        if (topbarTitle) topbarTitle.textContent = "โครงการทั้งหมด";
        if (createBtn) createBtn.style.display = isAdmin ? "inline-flex" : "none";
        if (addMemberBtn) addMemberBtn.style.display = "none";
        renderTripSelector();
    } else if (tabName === "holidays-tab") {
        document.getElementById("holidaysTabContent").style.display = "block";
        if (topbarTitle) topbarTitle.textContent = "ปฏิทินวันหยุด";
        if (createBtn) createBtn.style.display = "none";
        if (addMemberBtn) addMemberBtn.style.display = "none";
        loadHolidaysTab();
    } else if (tabName === "members-tab") {
        document.getElementById("globalMembersTabContent").style.display = "block";
        if (topbarTitle) topbarTitle.textContent = "จัดการสมาชิก";
        if (createBtn) createBtn.style.display = "none";
        if (addMemberBtn) addMemberBtn.style.display = isAdmin ? "inline-flex" : "none";
        loadGlobalUsers();
    } else if (tabName === "credit-tab") {
        document.getElementById("socialCreditTabContent").style.display = "block";
        if (topbarTitle) topbarTitle.textContent = "Social Credit Levels";
        if (createBtn) createBtn.style.display = "none";
        if (addMemberBtn) addMemberBtn.style.display = "none";
        loadSocialCredit();
    }
}

async function loadGlobalUsers() {
    const container = document.getElementById("globalUserManagementContainer");
    if (!container) return;
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted);">กำลังโหลดข้อมูลสมาชิก...</div>`;
    
    try {
        const res = await fetch("api/users.php?action=list");
        const data = await res.json();
        globalUsers = data.users || [];
        renderGlobalUsers();
    } catch (err) {
        console.error("Failed to load global users", err);
        container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--danger);">เกิดข้อผิดพลาดในการโหลดข้อมูล</div>`;
    }
}

function renderGlobalUsers() {
    const container = document.getElementById("globalUserManagementContainer");
    if (!container) return;
    container.innerHTML = "";
    
    if (globalUsers.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <div class="empty-state-icon" style="margin-bottom:16px;display:inline-flex;align-items:center;justify-content:center;color:var(--apple-gray-4);">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="empty-state-text">ยังไม่มีสมาชิกในระบบ</div>
        </div>`;
        return;
    }
    
    globalUsers.forEach(u => {
        const card = document.createElement("div");
        card.className = "member-row-card";
        card.style.marginBottom = "12px";
        
        const isSelf = u.id == currentUser.id;
        const isSuper = u.is_super_admin === 1;
        
        let actionsHtml = `
            <div style="display:flex;gap:8px;align-items:center;">
                <div class="passcode-container" style="display:inline-flex;align-items:center;background:var(--surface-2);border:1px solid var(--border-subtle);border-radius:var(--radius-xs);padding:4px 8px;gap:6px;">
                    <span class="passcode-text" style="font-family:monospace;font-weight:bold;letter-spacing:1px;color:var(--primary);">${u.passcode}</span>
                    <button type="button" class="btn-icon" onclick="navigator.clipboard.writeText('${u.passcode}');showToast('คัดลอกรหัสผ่านแล้ว','success');" title="คัดลอกรหัสผ่าน" style="background:transparent;border:none;cursor:pointer;color:var(--text-muted);display:inline-flex;align-items:center;justify-content:center;padding:0;">${iconCopySvg}</button>
                </div>
                <button type="button" class="btn btn-secondary btn-xs" onclick="openEditGlobalUserModal(${u.id}, '${u.name}', '${u.passcode}', '${u.role}')" style="display:inline-flex;align-items:center;gap:4px;">${iconEditSvg} <span>แก้ไข</span></button>
                ${!isSelf && !isSuper ? `<button type="button" class="btn btn-xs" style="background:var(--danger);color:white;" onclick="deleteGlobalUser(${u.id},'${u.name}')">ลบ</button>` : ''}
            </div>`;
            
        card.innerHTML = `
            <div class="member-meta">
                <div class="member-avatar">${u.name.substring(0, 2).toUpperCase()}</div>
                <div class="member-info-text">
                    <div class="name">${u.name} ${isSelf ? '<span style="color:var(--primary);font-size:0.8rem;">(คุณ)</span>' : ''}</div>
                    <span class="badge ${u.role === 'admin' ? 'badge-admin' : 'badge-member'}" style="margin-top:4px;display:inline-block;">${u.role === 'admin' ? 'Admin' : 'Member'}</span>
                </div>
            </div>
            ${actionsHtml}`;
        container.appendChild(card);
    });
}

function openAddGlobalUserModal() {
    document.getElementById("globalUserId").value = "";
    document.getElementById("globalUserModalTitle").textContent = "เพิ่มผู้ใช้งานใหม่";
    document.getElementById("globalUserName").value = "";
    document.getElementById("globalUserPasscode").value = "";
    document.getElementById("globalUserRole").value = "member";
    openModal("globalUserModal");
}

function openEditGlobalUserModal(id, name, passcode, role) {
    document.getElementById("globalUserId").value = id;
    document.getElementById("globalUserModalTitle").textContent = "แก้ไขผู้ใช้งาน";
    document.getElementById("globalUserName").value = name;
    document.getElementById("globalUserPasscode").value = passcode;
    document.getElementById("globalUserRole").value = role;
    openModal("globalUserModal");
}

async function handleGlobalUserSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("globalUserId").value;
    const name = document.getElementById("globalUserName").value.trim();
    const passcode = document.getElementById("globalUserPasscode").value.trim();
    const role = document.getElementById("globalUserRole").value;
    
    if (!name) {
        showToast("กรุณากรอกชื่อผู้ใช้", "warning");
        return;
    }
    
    const isEdit = id !== "";
    const action = isEdit ? "update" : "add";
    const payload = { name, role };
    if (isEdit) payload.id = parseInt(id);
    if (passcode) payload.passcode = passcode;
    
    try {
        const res = await fetch(`api/users.php?action=${action}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            closeModal("globalUserModal");
            showToast(data.message || "บันทึกสำเร็จ", "success");
            loadGlobalUsers();
            
            // If we just added a user and they generated a passcode, alert it
            if (!isEdit && data.user) {
                await showAlert(`เพิ่มผู้ใช้งานสำเร็จ\nชื่อ: ${data.user.name}\nรหัสผ่านเข้าใช้งาน: ${data.user.passcode}`);
            }
        } else {
            showToast(data.error || "ทำรายการไม่สำเร็จ", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
    }
}

async function deleteGlobalUser(id, name) {
    if (!await showConfirm(`ต้องการลบผู้ใช้ "${name}" ออกจากระบบทั้งหมด?`)) return;
    try {
        const res = await fetch("api/users.php?action=delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        if (data.success) {
            showToast(data.message, "success");
            loadGlobalUsers();
        } else {
            showToast(data.error, "error");
        }
    } catch (err) {
        console.error(err);
        showToast("เกิดข้อผิดพลาดในการลบผู้ใช้งาน", "error");
    }
}

async function loadGlobalUsersChecklist(containerId, checkedIds = []) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `<div style="color:var(--text-muted);font-size:0.85rem;padding:10px;">กำลังโหลดสมาชิก...</div>`;
    
    try {
        const res = await fetch("api/users.php?action=list");
        const data = await res.json();
        const users = data.users || [];
        
        container.innerHTML = "";
        if (users.length === 0) {
            container.innerHTML = `<div style="color:var(--text-muted);font-size:0.85rem;padding:10px;">ไม่มีสมาชิกในระบบ</div>`;
            return;
        }
        
        users.forEach(u => {
            const isChecked = checkedIds.includes(u.id) || (u.id === currentUser.id && containerId === 'createTripMembersList');
            const isDisabled = (u.id === currentUser.id) ? 'disabled checked' : '';
            
            const div = document.createElement("div");
            div.className = "checklist-checkbox-item";
            div.innerHTML = `
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer; width:100%; margin:0;">
                    <input type="checkbox" class="trip-member-cb" value="${u.id}" ${isChecked ? 'checked' : ''} ${isDisabled}>
                    <span class="checklist-checkbox-name">${u.name}</span>
                    <span class="checklist-checkbox-role" style="background: ${u.role === 'admin' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)'}; color: ${u.role === 'admin' ? 'var(--primary)' : 'var(--text-secondary)'};">${u.role === 'admin' ? 'Admin' : 'Member'}</span>
                </label>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Failed to load users checklist", err);
        container.innerHTML = `<div style="color:var(--danger);font-size:0.85rem;padding:10px;">โหลดสมาชิกล้มเหลว</div>`;
    }
}

async function openEditTrip(tripId) {
    try {
        // Select the trip first to populate $_SESSION['active_trip_id']
        const selRes = await fetch("api/auth.php?action=select_trip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip_id: tripId })
        });
        const selData = await selRes.json();
        if (!selData.success) {
            showToast(selData.error, "error");
            return;
        }
        
        // Fetch details of this selected trip
        const res = await fetch("api/trip.php?action=details");
        const data = await res.json();
        if (data.error) {
            showToast(data.error, "error");
            return;
        }
        
        const trip = data.trip;
        const members = data.members || [];
        
        // Populate edit modal
        document.getElementById("editTripId").value = trip.id;
        document.getElementById("editTripTitle").value = trip.title;
        document.getElementById("editTripStartDate").value = trip.start_date;
        document.getElementById("editTripEndDate").value = trip.end_date;
        document.getElementById("editTripBudget").value = formatCurrency(trip.total_budget);
        document.getElementById("editTripEmoji").value = trip.cover_emoji || '✈️';
        
        const currentMemberIds = members.map(m => m.id);
        await loadGlobalUsersChecklist('editTripMembersList', currentMemberIds);
        
        openModal("editTripModal");
    } catch (err) {
        console.error(err);
        showToast("ไม่สามารถเปิดแก้ไขโครงการได้", "error");
    }
}

async function handleEditTrip(e) {
    e.preventDefault();
    const title = document.getElementById("editTripTitle").value.trim();
    const start_date = document.getElementById("editTripStartDate").value;
    const end_date = document.getElementById("editTripEndDate").value;
    const total_budget = parseFloat(document.getElementById("editTripBudget").value.replace(/,/g, '')) || 0;
    const cover_emoji = document.getElementById("editTripEmoji").value.trim() || '✈️';
    
    // Collect selected member IDs
    const member_ids = [];
    document.querySelectorAll("#editTripMembersList input.trip-member-cb:checked").forEach(cb => {
        member_ids.push(parseInt(cb.value));
    });
    
    if (!title || !start_date || !end_date) {
        showToast("กรุณากรอกข้อมูลให้ครบ", "warning");
        return;
    }
    
    try {
        const res = await fetch("api/trip.php?action=update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, start_date, end_date, total_budget, cover_emoji, member_ids })
        });
        const data = await res.json();
        if (data.success) {
            closeModal("editTripModal");
            showToast("แก้ไขข้อมูลโครงการท่องเที่ยวสำเร็จ", "success");
            await backToTripSelector();
        } else {
            showToast(data.error || "แก้ไขทริปล้มเหลว", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("เกิดข้อผิดพลาดในการแก้ไขโครงการ", "error");
    }
}

async function closeEditTrip() {
    closeModal("editTripModal");
    await backToTripSelector();
}

async function cancelTrip(tripId, title) {
    if (!await showConfirm(`ต้องการยกเลิกโครงการ "${title}"? โครงการที่ยกเลิกแล้วจะยังไม่ถูกลบถาวร`)) return;
    try {
        const res = await fetch("api/trip.php?action=delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip_id: tripId, force: false })
        });
        const data = await res.json();
        if (data.success) {
            showToast(data.message || "ยกเลิกโครงการสำเร็จ", "success");
            await refreshTripsAndShow();
        } else {
            showToast(data.error, "error");
        }
    } catch (err) {
        console.error(err);
        showToast("เกิดข้อผิดพลาดในการยกเลิกโครงการ", "error");
    }
}

async function restoreTrip(tripId, title) {
    if (!await showConfirm(`ต้องการกู้คืนโครงการ "${title}" กลับมาใช้งานหรือไม่?`)) return;
    try {
        const res = await fetch("api/trip.php?action=restore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip_id: tripId })
        });
        const data = await res.json();
        if (data.success) {
            showToast(data.message || "กู้คืนโครงการสำเร็จ", "success");
            await refreshTripsAndShow();
        } else {
            showToast(data.error, "error");
        }
    } catch (err) {
        console.error(err);
        showToast("เกิดข้อผิดพลาดในการกู้คืนโครงการ", "error");
    }
}

async function forceDeleteTrip(tripId, title) {
    if (!await showConfirm(`ต้องการลบโครงการ "${title}" ถาวรหรือไม่?\nการลบนี้รวมถึงแผนงานและค่าใช้จ่ายทั้งหมดในโครงการและจะไม่สามารถกู้คืนได้!`)) return;
    try {
        const res = await fetch("api/trip.php?action=delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trip_id: tripId, force: true })
        });
        const data = await res.json();
        if (data.success) {
            showToast(data.message || "ลบโครงการถาวรสำเร็จ", "success");
            await refreshTripsAndShow();
        } else {
            showToast(data.error, "error");
        }
    } catch (err) {
        console.error(err);
        showToast("เกิดข้อผิดพลาดในการลบโครงการถาวร", "error");
    }
}

// ==========================================// INVITATION STATUS TAB (KANBAN)
// ==========================================
function loadStatusTab() {
    if (!tripMembers.length) { loadTripDetails().then(renderKanbanBoard); return; }
    renderKanbanBoard();
}

function renderKanbanBoard() {
    const container = document.getElementById("kanbanBoardContainer");
    container.innerHTML = "";
    
    const columns = [
        { key: 'accepted', label: 'ตกลงเข้าร่วม', dotClass: 'status-dot-accepted' },
        { key: 'pending', label: 'อยู่ระหว่างการเชิญ', dotClass: 'status-dot-pending' },
        { key: 'declined', label: 'ปฏิเสธคำเชิญ', dotClass: 'status-dot-declined' }
    ];
    
    columns.forEach(col => {
        const members = tripMembers.filter(m => m.invite_status === col.key);
        const column = document.createElement("div");
        column.className = "kanban-column";
        column.innerHTML = `
            <div class="kanban-header">
                <span class="status-dot ${col.dotClass}" style="width:10px;height:10px;margin-right:2px;box-shadow:none;"></span>
                <span class="kanban-header-title">${col.label}</span>
                <span class="kanban-count">${members.length}</span>
            </div>`;
        
        if (members.length === 0) {
            column.innerHTML += `<div class="empty-state" style="padding:24px;"><div class="empty-state-text" style="font-size:0.82rem;">ไม่มีสมาชิก</div></div>`;
        }
        
        members.forEach(m => {
            const isSelf = m.id == currentUser.id;
            const card = document.createElement("div");
            card.className = "kanban-card";
            
            let btnHtml = '';
            if (isSelf || myTripRole === 'admin') {
                const targetId = m.id;
                const options = ['accepted', 'pending', 'declined'].filter(s => s !== col.key);
                const btnLabels = { accepted: 'ตกลง', pending: 'รอ', declined: 'ปฏิเสธ' };
                btnHtml = `<div style="display:flex;gap:4px;margin-left:auto;">`;
                options.forEach(opt => {
                    btnHtml += `<button class="btn btn-xs btn-status-${opt}" onclick="updateInviteStatus(${targetId},'${opt}')">${btnLabels[opt]}</button>`;
                });
                btnHtml += `</div>`;
            }
            
            card.innerHTML = `
                <span class="status-dot ${col.dotClass}"></span>
                <span class="kanban-card-name">${m.name}${isSelf ? ' (คุณ)' : ''}</span>
                ${btnHtml}`;
            column.appendChild(card);
        });
        
        container.appendChild(column);
    });
}

async function updateInviteStatus(userId, status) {
    // If declining from accepted status, show a warning about credit penalty
    if (status === 'declined') {
        // Check if user is currently accepted
        const member = tripMembers.find(m => m.id == userId);
        if (member && member.invite_status === 'accepted') {
            const confirmed = await showConfirm(
                `⚠️ คำเตือน! หากปฏิเสธหลังจากตอบรับแล้ว จะถือว่า "เททริป/บิด"\n\nSocial Credit ของคุณจะถูกหัก -10 คะแนนทันที\n\nยืนยันจะปฏิเสธหรือไม่?`
            );
            if (!confirmed) return;
        }
    }
    
    try {
        const res = await fetch("api/trip.php?action=update_invite_status", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, status })
        });
        const data = await res.json();
        if (data.success) {
            // Show credit change notification
            if (data.credit_change && data.credit_change !== 0) {
                const changeText = data.credit_change > 0 ? `+${data.credit_change}` : `${data.credit_change}`;
                const changeType = data.credit_change > 0 ? 'success' : 'warning';
                showToast(`อัปเดตสถานะสำเร็จ | Social Credit ${changeText} คะแนน`, changeType);
            } else {
                showToast("อัปเดตสถานะสำเร็จ", "success");
            }
            // Refresh members data
            const detailsRes = await fetch("api/trip.php?action=details");
            const detailsData = await detailsRes.json();
            if (!detailsData.error) {
                tripMembers = detailsData.members;
                renderKanbanBoard();
                
                // Update local member_count in global trips array and refresh dashboard
                const newCount = tripMembers.filter(m => m.invite_status === 'accepted').length;
                const tripInGlobal = currentTrips.find(t => t.id === activeTripId);
                if (tripInGlobal) {
                    tripInGlobal.member_count = newCount;
                }
                renderDashboard();
            }
        } else showToast(data.error, "error");
    } catch (err) { console.error(err); }
}

// ==========================================
// EXPENSES
// ==========================================
async function loadExpenses() {
    try {
        const res = await fetch("api/expenses.php?action=list");
        const data = await res.json();
        if (data.error) { showToast(data.error, "error"); return; }
        
        const filteredExpenses = data.expenses.filter(e => {
            if (activeExpenseFilter === 'settlement') {
                return e.category === 'settlement';
            } else {
                return e.category !== 'settlement';
            }
        });
        renderExpensesList(filteredExpenses);
        renderBalancesAndSettlements(data.balances, data.settlements);
        
        let totalSpent = 0;
        data.expenses.forEach(e => {
            if (e.category !== 'settlement') {
                totalSpent += parseFloat(e.amount);
            }
        });
        document.getElementById("statSpentTotal").textContent = `${formatCurrency(totalSpent)} ฿`;
        
        const remaining = tripDetails.total_budget - totalSpent;
        const el = document.getElementById("statRemainingBudget");
        el.textContent = `${formatCurrency(remaining)} ฿`;
        el.className = remaining < 0 ? "stat-val accent" : "stat-val success";
        
        const remainingCard = el.closest(".stat-card");
        if (remainingCard) {
            if (remaining < 0) {
                remainingCard.classList.remove("green");
                remainingCard.classList.add("red");
            } else {
                remainingCard.classList.remove("red");
                remainingCard.classList.add("green");
            }
        }
    } catch (err) { console.error(err); }
}

function renderExpensesList(expenses) {
    const container = document.getElementById("expensesListContainer");
    container.innerHTML = "";
    
    if (expenses.length === 0) {
        const emptyText = activeExpenseFilter === 'settlement' ? "ยังไม่มีรายการเคลียร์เงิน" : "ยังไม่มีค่าใช้จ่าย";
        container.innerHTML = `<div class="empty-state">
            <div class="empty-state-icon" style="margin-bottom:16px;display:inline-flex;align-items:center;justify-content:center;color:var(--apple-gray-4);">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="12"></line><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            </div>
            <div class="empty-state-text">${emptyText}</div>
        </div>`;
        return;
    }
    
    const svgSettlement = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line><polyline points="12 14 14 16 18 12"></polyline></svg>`;
    const catIcons = { food: svgFood, travel: svgTravel, hotel: svgHotel, shopping: svgShopping, general: svgGeneral, settlement: svgSettlement };
    const catNames = { food:"ค่าอาหาร", travel:"ค่าเดินทาง", hotel:"ค่าที่พัก", shopping:"ช้อปปิ้ง", general:"ทั่วไป", settlement:"เคลียร์เงิน" };
    
    expenses.forEach(e => {
        const splitsNames = e.splits.map(s => s.user_name).join(", ");
        
        let canDelete = false;
        if (e.category === 'settlement') {
            const creditorId = e.splits && e.splits.length > 0 ? e.splits[0].user_id : null;
            canDelete = myTripRole === 'admin' || creditorId == currentUser.id;
        } else {
            canDelete = myTripRole === 'admin' || e.payer_id == currentUser.id;
        }
        
        const deleteBtn = canDelete ? `<button class="btn-icon" onclick="deleteExpense(${e.id})" style="color:var(--danger);display:inline-flex;align-items:center;justify-content:center;padding:6px;" title="ลบ">${iconDeleteSvg}</button>` : "";
        
        const card = document.createElement("div");
        card.className = "expense-item" + (e.category === 'settlement' ? " is-settlement-item" : "");
        card.innerHTML = `
            <div class="expense-left">
                <div class="expense-icon-box cat-${e.category}" style="display:inline-flex;align-items:center;justify-content:center;">${catIcons[e.category] || svgGeneral}</div>
                <div class="expense-title-desc">
                    <span class="title">${e.description}</span>
                    <span class="meta">จ่ายโดย <b>${e.payer_name}</b> | หาร: ${splitsNames}</span>
                </div>
            </div>
            <div class="expense-right">
                <span class="expense-price">${formatCurrency(e.amount)} ฿</span>
                <span class="expense-splits-pill">${catNames[e.category] || "ทั่วไป"}</span>
                ${deleteBtn}
            </div>`;
        container.appendChild(card);
    });
}

function renderBalancesAndSettlements(balances, settlements) {
    const bc = document.getElementById("memberBalancesContainer");
    bc.innerHTML = "";
    balances.forEach(b => {
        const sign = b.balance > 0 ? "+" : "";
        const color = b.balance > 0 ? "var(--success)" : (b.balance < 0 ? "var(--danger)" : "var(--text-muted)");
        const item = document.createElement("div");
        item.className = "member-row-card";
        item.style.marginBottom = "8px";
        item.innerHTML = `
            <div class="member-meta">
                <div class="member-avatar" style="background:var(--surface-3);color:var(--text-primary);border:1px solid var(--border-subtle);">${b.name.substring(0, 2).toUpperCase()}</div>
                <div class="member-info-text"><div class="name">${b.name}</div></div>
            </div>
            <div style="font-weight:700;color:${color};font-size:1rem;">${sign}${formatCurrency(b.balance)} ฿</div>`;
        bc.appendChild(item);
    });
    
    const sc = document.getElementById("optimizedSettlementsContainer");
    sc.innerHTML = "";
    if (settlements.length === 0) {
        sc.innerHTML = `<div style="text-align:center;color:var(--success);font-weight:600;padding:20px;">ไม่มีใครติดค้างกัน</div>`;
        return;
    }
    
    settlements.forEach(s => {
        const isCreditor = currentUser.id == s.to_id;
        const isAdmin = myTripRole === 'admin';
        let confirmBtnHtml = "";
        if (isCreditor || isAdmin) {
            confirmBtnHtml = `<button type="button" class="btn btn-xs btn-settle-confirm" onclick="confirmSettlement(${s.from_id}, ${s.to_id}, ${s.amount})">ยืนยันได้รับเงิน</button>`;
        }
        
        const row = document.createElement("div");
        row.className = "settlement-row";
        row.innerHTML = `
            <div class="settle-people">
                <span style="color:var(--danger);font-weight:bold;">${s.from_name}</span>
                <span class="settle-arrow">➔</span>
                <span style="color:var(--primary);font-weight:bold;">${s.to_name}</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
                <span class="settle-amount">${formatCurrency(s.amount)} ฿</span>
                <button type="button" class="btn-icon" onclick="navigator.clipboard.writeText('โอนเงินค่าทริปให้ ${s.to_name} จำนวน ${formatCurrency(s.amount)} บาท');showToast('คัดลอกแล้ว','success');" style="display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconCopySvg}</button>
                ${confirmBtnHtml}
            </div>`;
        sc.appendChild(row);
    });
}

function openAddExpenseModal() {
    const payerSelect = document.getElementById("expensePayer");
    payerSelect.innerHTML = "";
    tripMembers.forEach(m => {
        if (m.invite_status === 'declined') return;
        const opt = document.createElement("option");
        opt.value = m.id;
        opt.textContent = m.name;
        if (m.id == currentUser.id) opt.selected = true;
        payerSelect.appendChild(opt);
    });
    document.getElementById("expenseDate").value = formatLocalDate(new Date());
    generateSplitCheckboxList();
    openModal("addExpenseModal");
}

function generateSplitCheckboxList() {
    const list = document.getElementById("expenseSplitList");
    list.innerHTML = "";
    const type = document.getElementById("expenseSplitType").value;
    
    tripMembers.forEach(m => {
        if (m.invite_status === 'declined') return;
        const div = document.createElement("div");
        div.className = "custom-split-item";
        if (type === "equal") {
            div.innerHTML = `<label class="checkbox-label" style="margin:0;"><input type="checkbox" class="expense-split-checkbox" value="${m.id}" checked><span class="checkbox-custom"></span><span>${m.name}</span></label>`;
        } else {
            div.innerHTML = `<div style="font-weight:500;">${m.name}</div><div style="display:flex;align-items:center;gap:4px;"><input type="text" inputmode="decimal" class="form-input custom-split-amount" data-user-id="${m.id}" placeholder="0.00" style="width:100px;padding:6px 10px;"><span style="font-size:0.85rem;color:var(--text-muted);">฿</span></div>`;
        }
        list.appendChild(div);
    });
    
    if (type !== "equal") {
        list.querySelectorAll(".custom-split-amount").forEach(input => {
            bindCommaFormatting(input);
        });
    }
}

async function handleAddExpenseSubmit(e) {
    e.preventDefault();
    const description = document.getElementById("expenseDescription").value.trim();
    const amountVal = document.getElementById("expenseAmount").value.replace(/,/g, '');
    const amount = parseFloat(amountVal);
    const payer_id = parseInt(document.getElementById("expensePayer").value);
    const category = document.getElementById("expenseCategory").value;
    const expense_date = document.getElementById("expenseDate").value;
    const split_type = document.getElementById("expenseSplitType").value;
    
    if (!description || isNaN(amount) || amount <= 0 || !expense_date) { showToast("กรอกข้อมูลให้ครบ", "warning"); return; }
    
    let splits = [];
    if (split_type === "equal") {
        const cbs = document.querySelectorAll(".expense-split-checkbox:checked");
        if (cbs.length === 0) { showToast("เลือกอย่างน้อยหนึ่งคน", "warning"); return; }
        cbs.forEach(cb => splits.push(parseInt(cb.value)));
    } else {
        let sum = 0;
        document.querySelectorAll(".custom-split-amount").forEach(input => {
            const amt = parseFloat(input.value.replace(/,/g, '')) || 0;
            if (amt > 0) { splits.push({ user_id: parseInt(input.dataset.userId), amount: amt }); sum += amt; }
        });
        if (Math.abs(sum - amount) > 0.05) { showToast(`ยอดรวม (${sum.toFixed(2)}) ไม่ตรงกับค่าใช้จ่าย (${amount.toFixed(2)})`, "warning"); return; }
    }
    
    try {
        const res = await fetch("api/expenses.php?action=add", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description, amount, payer_id, category, expense_date, split_type, splits })
        });
        const data = await res.json();
        if (data.success) {
            closeModal("addExpenseModal");
            document.getElementById("addExpenseForm").reset();
            activeExpenseFilter = 'general';
            const btnAll = document.getElementById("btnToggleAllExpenses");
            const btnSettle = document.getElementById("btnToggleSettlements");
            if (btnAll && btnSettle) {
                btnAll.classList.add("active");
                btnSettle.classList.remove("active");
            }
            loadExpenses();
            showToast("บันทึกสำเร็จ", "success");
        }
        else showToast(data.error, "error");
    } catch (err) { console.error(err); }
}

async function deleteExpense(id) {
    if (!await showConfirm("ลบค่าใช้จ่ายนี้?")) return;
    try {
        const res = await fetch("api/expenses.php?action=delete", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expense_id: id })
        });
        const data = await res.json();
        if (data.success) { loadExpenses(); showToast("ลบสำเร็จ", "success"); }
        else showToast(data.error, "error");
    } catch (err) { console.error(err); }
}

// ==========================================
// ITINERARY
// ==========================================
let currentItineraryFilterDay = "all";
let tripDatesList = [];

async function loadItinerary() {
    try {
        const res = await fetch("api/itinerary.php?action=list");
        const itineraries = await res.json();
        if (itineraries.error) { showToast(itineraries.error, "error"); return; }
        generateTripDates();
        renderDayFilters();
        renderItineraryTimeline(itineraries);
        renderCalendarView(itineraries);
    } catch (err) { console.error(err); }
}

function generateTripDates() {
    tripDatesList = [];
    const start = parseLocalDate(tripDetails.start_date);
    const end = parseLocalDate(tripDetails.end_date);
    const cur = new Date(start.getTime());
    while (cur <= end) { 
        tripDatesList.push(formatLocalDate(cur)); 
        cur.setDate(cur.getDate() + 1); 
    }
}

function renderDayFilters() {
    const container = document.getElementById("itineraryDayFilters");
    container.innerHTML = "";
    
    const btnAll = document.createElement("button");
    btnAll.className = `day-filter-btn ${currentItineraryFilterDay === 'all' ? 'active' : ''}`;
    btnAll.textContent = "ทั้งหมด";
    btnAll.onclick = () => { currentItineraryFilterDay = "all"; loadItinerary(); };
    container.appendChild(btnAll);
    
    tripDatesList.forEach((d, idx) => {
        const btn = document.createElement("button");
        btn.className = `day-filter-btn ${currentItineraryFilterDay === d ? 'active' : ''}`;
        const holiday = ThaiHolidays.getHoliday(d);
        btn.innerHTML = `วัน ${idx + 1} (${formatShortDate(d)})${holiday ? ' <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--apple-red);vertical-align:middle;margin-left:2px;"></span>' : ''}`;
        btn.onclick = () => { currentItineraryFilterDay = d; loadItinerary(); };
        container.appendChild(btn);
    });
}

function renderItineraryTimeline(itineraries) {
    const container = document.getElementById("timelineEventsContainer");
    container.innerHTML = "";
    
    const filtered = currentItineraryFilterDay === "all" ? itineraries : itineraries.filter(i => i.visit_date === currentItineraryFilterDay);
    
    if (filtered.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <div class="empty-state-icon" style="margin-bottom:16px;display:inline-flex;align-items:center;justify-content:center;color:var(--apple-gray-4);">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="empty-state-text">ยังไม่มีกำหนดการ</div>
        </div>`;
        return;
    }
    
    const line = document.createElement("div");
    line.className = "timeline-line";
    container.appendChild(line);
    
    filtered.forEach(item => {
        const deleteBtn = myTripRole === 'admin' ? `<button class="btn-icon" onclick="deleteItinerary(${item.id})" style="color:var(--danger);display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconDeleteSvg}</button>` : "";
        const mapLink = item.location_url ? `<a href="${item.location_url}" target="_blank" class="location-link" style="display:inline-flex;align-items:center;gap:4px;">${iconMapSvg} <span>Google Maps</span></a>` : "";
        const holidayName = ThaiHolidays.getHoliday(item.visit_date);
        const holidayBadge = holidayName ? `<div class="holiday-item-row" style="margin-top:8px;width:fit-content;display:inline-flex;"><span class="date">วันหยุด</span> <span>${holidayName}</span></div>` : "";
        
        const row = document.createElement("div");
        row.className = "timeline-item";
        row.innerHTML = `
            <div class="timeline-time-col"><div>${item.visit_time || "--:--"}</div><div style="font-size:0.72rem;color:var(--text-muted);margin-top:3px;">${formatShortDate(item.visit_date)}</div></div>
            <div class="timeline-marker"></div>
            <div class="timeline-body">
                <div class="timeline-body-title"><span>${item.title}</span>${deleteBtn}</div>
                ${item.notes ? `<div class="timeline-body-notes">${item.notes}</div>` : ""}
                ${mapLink}${holidayBadge}
            </div>`;
        container.appendChild(row);
    });
}

function openAddItineraryModal() {
    const sel = document.getElementById("itineraryDate");
    sel.innerHTML = "";
    tripDatesList.forEach((d, idx) => {
        const opt = document.createElement("option");
        opt.value = d;
        const h = ThaiHolidays.getHoliday(d);
        opt.textContent = `วัน ${idx + 1} (${ThaiHolidays.formatThaiDate(d)})${h ? ` (${h})` : ''}`;
        sel.appendChild(opt);
    });
    openModal("addItineraryModal");
}

async function handleAddItinerarySubmit(e) {
    e.preventDefault();
    const visit_date = document.getElementById("itineraryDate").value;
    const visit_time = document.getElementById("itineraryTime").value;
    const title = document.getElementById("itineraryTitle").value.trim();
    const notes = document.getElementById("itineraryNotes").value.trim();
    const location_url = document.getElementById("itineraryMapUrl").value.trim();
    
    if (!visit_date || !title) { showToast("กรอกวันที่และสถานที่", "warning"); return; }
    
    try {
        const res = await fetch("api/itinerary.php?action=add", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ visit_date, visit_time, title, notes, location_url })
        });
        const data = await res.json();
        if (data.success) { closeModal("addItineraryModal"); document.getElementById("addItineraryForm").reset(); loadItinerary(); showToast("บันทึกสำเร็จ", "success"); }
        else showToast(data.error, "error");
    } catch (err) { console.error(err); }
}

async function deleteItinerary(id) {
    if (!await showConfirm("ลบกำหนดการนี้?")) return;
    try {
        const res = await fetch("api/itinerary.php?action=delete", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        if (data.success) { loadItinerary(); showToast("ลบสำเร็จ", "success"); }
        else showToast(data.error, "error");
    } catch (err) { console.error(err); }
}

// Calendar view (trip itinerary tab)
function renderCalendarView(itineraries) {
    const grid = document.getElementById("calendarGridDays");
    grid.innerHTML = "";
    
    const baseDate = parseLocalDate(tripDetails.start_date);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    
    const monthNames = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
    document.getElementById("calendarMonthTitle").textContent = `${monthNames[month]} ${year + 543}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const todayStr = formatLocalDate(new Date());
    
    for (let i = firstDay - 1; i >= 0; i--) {
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell inactive";
        cell.textContent = prevDays - i;
        grid.appendChild(cell);
    }
    
    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell";
        cell.textContent = day;
        
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        
        if (dateStr === todayStr) cell.classList.add("today");
        if (tripDatesList.includes(dateStr)) cell.classList.add("trip-date");
        
        const holiday = ThaiHolidays.getHoliday(dateStr);
        if (holiday) { cell.classList.add("holiday"); cell.title = holiday; }
        
        if (itineraries.some(i => i.visit_date === dateStr)) cell.classList.add("has-events");
        
        cell.onclick = () => {
            if (tripDatesList.includes(dateStr)) {
                currentItineraryFilterDay = dateStr;
                renderDayFilters();
                renderItineraryTimeline(itineraries);
            }
        };
        
        grid.appendChild(cell);
    }
    
    // Holidays in trip range
    const holidayList = document.getElementById("tripHolidaysScroller");
    holidayList.innerHTML = "";
    const holidays = ThaiHolidays.getHolidaysInRange(tripDetails.start_date, tripDetails.end_date);
    if (holidays.length === 0) {
        holidayList.innerHTML = `<div style="font-size:0.82rem;color:var(--text-muted);">ไม่มีวันหยุดในช่วงทริป</div>`;
    } else {
        holidays.forEach(h => {
            const row = document.createElement("div");
            row.className = "holiday-item-row";
            row.innerHTML = `<span class="date">${formatShortDate(h.date)}</span><span>${h.name}</span>`;
            holidayList.appendChild(row);
        });
    }
}

// ==========================================
// CHECKLIST
// ==========================================
async function loadChecklist() {
    try {
        const res = await fetch("api/checklist.php?action=list");
        const items = await res.json();
        if (items.error) { showToast(items.error, "error"); return; }
        renderChecklist(items);
        updateChecklistProgress(items);
    } catch (err) { console.error(err); }
}

function renderChecklist(items) {
    const container = document.getElementById("checklistItemsContainer");
    container.innerHTML = "";
    
    if (items.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <div class="empty-state-icon" style="margin-bottom:16px;display:inline-flex;align-items:center;justify-content:center;color:var(--apple-gray-4);">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            </div>
            <div class="empty-state-text">ไม่มีรายการสัมภาระ</div>
        </div>`;
        return;
    }
    
    const catIcons = {
        documents: svgChecklistDocuments,
        clothes: svgChecklistClothes,
        gadget: svgChecklistGadget,
        food: svgChecklistFood,
        general: svgChecklistGeneral
    };
    const catNames = { documents:"เอกสาร", clothes:"เสื้อผ้า", gadget:"ไอที", food:"ของกิน", general:"ทั่วไป" };
    
    items.forEach(item => {
        const row = document.createElement("div");
        row.className = `checklist-item-row ${item.is_completed ? 'completed' : ''}`;
        const assignPill = item.assigned_user_name ? `<span class="item-assigned-pill" style="display:inline-flex;align-items:center;gap:4px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>${item.assigned_user_name}</span>
        </span>` : "";
        
        row.innerHTML = `
            <label class="checkbox-label">
                <input type="checkbox" onchange="toggleChecklistItem(${item.id},this.checked)" ${item.is_completed ? 'checked' : ''}>
                <span class="checkbox-custom"></span>
                <span class="item-name-text" style="display:inline-flex;align-items:center;gap:6px;">
                    <span style="display:inline-flex;color:var(--apple-gray-3);">${catIcons[item.category] || svgChecklistGeneral}</span>
                    <span>${item.item_name}</span>
                    ${assignPill}
                </span>
            </label>
            <div style="display:flex;align-items:center;gap:6px;">
                <span style="font-size:0.7rem;color:var(--text-muted);background:var(--surface-2);padding:2px 8px;border-radius:99px;">${catNames[item.category] || "ทั่วไป"}</span>
                <button type="button" class="btn-icon" onclick="deleteChecklistItem(${item.id})" style="color:var(--danger);display:inline-flex;align-items:center;justify-content:center;padding:6px;">${iconDeleteSvg}</button>
            </div>`;
        container.appendChild(row);
    });
}

function updateChecklistProgress(items) {
    if (items.length === 0) {
        document.getElementById("checklistProgressBarFill").style.width = "0%";
        document.getElementById("checklistProgressText").textContent = "0/0 (0%)";
        return;
    }
    const completed = items.filter(i => i.is_completed === 1).length;
    const pct = Math.round((completed / items.length) * 100);
    document.getElementById("checklistProgressBarFill").style.width = `${pct}%`;
    document.getElementById("checklistProgressText").textContent = `${completed}/${items.length} (${pct}%)`;
}

async function toggleChecklistItem(id, isCompleted) {
    try {
        const res = await fetch("api/checklist.php?action=toggle", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, is_completed: isCompleted ? 1 : 0 })
        });
        const data = await res.json();
        if (data.success) loadChecklist();
        else showToast(data.error, "error");
    } catch (err) { console.error(err); }
}

function openAddChecklistModal() {
    const sel = document.getElementById("checklistAssignMember");
    sel.innerHTML = `<option value="">-- ใครก็ได้ --</option>`;
    tripMembers.forEach(m => {
        if (m.invite_status === 'declined') return;
        const opt = document.createElement("option");
        opt.value = m.id;
        opt.textContent = m.name;
        sel.appendChild(opt);
    });
    openModal("addChecklistModal");
}

async function handleAddChecklistSubmit(e) {
    e.preventDefault();
    const item_name = document.getElementById("checklistItemName").value.trim();
    const category = document.getElementById("checklistCategory").value;
    const assigned_user_id = document.getElementById("checklistAssignMember").value;
    
    if (!item_name) { showToast("กรอกชื่อสิ่งของ", "warning"); return; }
    
    try {
        const res = await fetch("api/checklist.php?action=add", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item_name, category, assigned_user_id: assigned_user_id || null })
        });
        const data = await res.json();
        if (data.success) { closeModal("addChecklistModal"); document.getElementById("addChecklistForm").reset(); loadChecklist(); showToast("เพิ่มสำเร็จ", "success"); }
        else showToast(data.error, "error");
    } catch (err) { console.error(err); }
}

async function deleteChecklistItem(id) {
    if (!await showConfirm("ลบรายการนี้?")) return;
    try {
        const res = await fetch("api/checklist.php?action=delete", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        if (data.success) { loadChecklist(); showToast("ลบสำเร็จ", "success"); }
        else showToast(data.error, "error");
    } catch (err) { console.error(err); }
}

// ==========================================
// HOLIDAYS TAB — INTERACTIVE CALENDAR
// ==========================================
function loadHolidaysTab() {
    const now = new Date();
    if (!holidaysCalYear) { holidaysCalYear = now.getFullYear(); holidaysCalMonth = now.getMonth(); }
    renderHolidaysCalendar();
    renderLeaveSuggestions();
}

function renderHolidaysCalendar() {
    const grid = document.getElementById("holidaysCalendarGrid");
    grid.innerHTML = "";
    
    const year = holidaysCalYear;
    const month = holidaysCalMonth;
    
    const monthNames = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
    document.getElementById("holidaysMonthLabel").textContent = `${monthNames[month]} ${year + 543}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const todayStr = formatLocalDate(new Date());
    
    for (let i = firstDay - 1; i >= 0; i--) {
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell inactive";
        cell.textContent = prevDays - i;
        grid.appendChild(cell);
    }
    
    const monthHolidays = [];
    
    for (let day = 1; day <= totalDays; day++) {
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell";
        cell.textContent = day;
        
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        
        if (dateStr === todayStr) cell.classList.add("today");
        
        const holiday = ThaiHolidays.getHoliday(dateStr);
        if (holiday) {
            cell.classList.add("holiday");
            cell.title = holiday;
            monthHolidays.push({ date: dateStr, name: holiday });
        }
        
        // Weekend indicator
        const dow = new Date(year, month, day).getDay();
        if (dow === 0 || dow === 6) cell.style.color = "var(--danger)";
        
        grid.appendChild(cell);
    }
    
    // Render month's holiday list
    const listContainer = document.getElementById("holidaysMonthList");
    listContainer.innerHTML = "";
    document.getElementById("holidaysListTitle").textContent = `วันหยุดในเดือน${monthNames[month]}`;
    
    if (monthHolidays.length === 0) {
        listContainer.innerHTML = `<div style="font-size:0.82rem;color:var(--text-muted);padding:12px;">ไม่มีวันหยุดในเดือนนี้</div>`;
    } else {
        monthHolidays.forEach(h => {
            const row = document.createElement("div");
            row.className = "holiday-item-row";
            row.innerHTML = `<span class="date">${ThaiHolidays.formatThaiDate(h.date)}</span><span>${h.name}</span>`;
            listContainer.appendChild(row);
        });
    }
}

function renderLeaveSuggestions() {
    const container = document.getElementById("smartLeaveSuggestionsList");
    container.innerHTML = "";
    
    const year = holidaysCalYear;
    const suggestions = ThaiHolidays.suggestVacationDays(year);
    
    if (suggestions.length === 0) {
        container.innerHTML = `<div style="color:var(--text-muted);font-size:0.85rem;">ไม่มีคำแนะนำสำหรับปีนี้</div>`;
        return;
    }
    
    suggestions.forEach(s => {
        const card = document.createElement("div");
        card.className = "suggestion-card";
        card.innerHTML = `
            <div style="font-weight:700;font-size:0.88rem;margin-bottom:4px;display:inline-flex;align-items:center;gap:4px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--apple-orange);"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5.5 5.5 0 0 0 12 3a5.5 5.5 0 0 0-6 5.5c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
                <span>${s.holidayName}</span>
                <span style="color:var(--warning);font-weight:500;">(${s.holidayDay})</span>
            </div>
            <div style="color:var(--text-muted);margin-bottom:4px;">แนะนำลา: <b style="color:var(--accent-cyan);">${s.suggestedLeaveDate} (${s.suggestedLeaveDay})</b></div>
            <div style="font-size:0.8rem;color:var(--success);font-weight:500;">${s.reason}</div>`;
        container.appendChild(card);
    });
}

// ==========================================
// SOCIAL CREDIT LEVELS
// ==========================================
// ==========================================
// SOCIAL CREDIT LEVELS
// ==========================================
const CREDIT_LEVELS = [
    { name: 'Trusted',    grade: 'AAA', min: 91, max: 100, thaiName: 'เชื่อถือได้สูงสุด', colorClass: 'credit-trusted', behavior: 'มีส่วนร่วมดีเด่น ช่วยเหลือเพื่อนร่วมทริป จ่ายค่าใช้จ่ายตรงเวลา มีความเป็นผู้นำสูง' },
    { name: 'Admired',    grade: 'AA',  min: 80, max: 90,  thaiName: 'เป็นที่ชื่นชม', colorClass: 'credit-admired', behavior: 'ร่วมกิจกรรมกลุ่มสม่ำเสมอ ตอบแชทยืนยันรวดเร็ว ช่วยหาสถานที่และร่วมเสนอไอเดียที่เป็นประโยชน์' },
    { name: 'Respected',  grade: 'A',   min: 61, max: 79,  thaiName: 'เป็นที่ยอมรับ', colorClass: 'credit-respected', behavior: 'ตอบรับหรือปฏิเสธทริปชัดเจน ตรงต่อเวลานัดหมาย ให้ความร่วมมือที่ดีในกิจกรรม' },
    { name: 'Neutral',    grade: 'B',   min: 41, max: 60,  thaiName: 'ปกติ (เริ่มต้น)', colorClass: 'credit-neutral', behavior: 'เกณฑ์เริ่มต้นสำหรับสมาชิกใหม่ มีส่วนร่วมทั่วไปในระดับปกติ ไม่มีประวัติการละเลยหน้าที่' },
    { name: 'Distrusted', grade: 'C',   min: 21, max: 40,  thaiName: 'ไม่น่าเชื่อถือ', colorClass: 'credit-distrusted', behavior: 'ตอบแชทกำกวมหรือไม่ชัดเจน อ่านแชทสำคัญแต่ไม่ยอมโหวต/ตอบ ทำงานช้าหรืออ่านไม่ตอบบ่อยครั้ง' },
    { name: 'Unpopular',  grade: 'D',   min: 0,  max: 20,  thaiName: 'ไม่ได้รับความไว้วางใจ/บิดบ่อย', colorClass: 'credit-unpopular', behavior: 'มีประวัติยกเลิกทริปกระทันหัน (เททริป/บิด) ขาดการติดต่อรุนแรง ไม่รับผิดชอบต่อส่วนรวม' }
];

const CREDIT_ACTIONS = [
    { key: 'largeup',   label: '+10', amount: 10,  desc: 'เลี้ยง จ่ายค่าต่างๆ เข้าร่วมกิจกรรม มีส่วนร่วม ช่วยเหลือ', btnClass: 'credit-btn-largeup' },
    { key: 'up',        label: '+5',  amount: 5,   desc: 'ตอบแชทยืนยันชัดเจน ตรงเวลา ช่วยหาสถานที่ เสนอไอเดีย', btnClass: 'credit-btn-up' },
    { key: 'down',      label: '-5',  amount: -5,  desc: 'ตอบกำกวม ไม่ยอมโหวต/ตอบ ทำอะไรช้า อ่านไม่ตอบ', btnClass: 'credit-btn-down' },
    { key: 'largedown', label: '-10', amount: -10, desc: 'เททริป/บิด ขาดการติดต่อ ไม่ชัดเจน กวนตีน', btnClass: 'credit-btn-largedown' }
];

function getCreditLevelIcon(levelName) {
    const baseSvg = (innerContent, className) => {
        return `<svg class="credit-level-icon ${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fill-opacity="0.05"/>
            ${innerContent}
        </svg>`;
    };

    switch (levelName) {
        case 'Trusted': // Tier AAA: Shield with double ring/verified checkmark + small crown/star shape inside
            return baseSvg(`
                <path d="m8 11.5 2.5 2.5 5.5 -5.5" stroke-width="2.5"/>
                <path d="M12 4.5l1 2 2.2 .3-1.6 1.6 .4 2.2-2-1-2 1 .4-2.2-1.6-1.6 2.2-.3z" fill="currentColor" stroke="none"/>
            `, 'icon-trusted');
        case 'Admired': // Tier AA: Shield with star inside
            return baseSvg(`
                <polygon points="12 7 13.5 10 17 10.5 14.5 13 15.5 16.5 12 14.5 8.5 16.5 9.5 13 7 10.5 10.5 10"/>
            `, 'icon-admired');
        case 'Respected': // Tier A: Shield with checkmark
            return baseSvg(`
                <path d="m8 11 2.5 2.5 5.5 -5.5" stroke-width="2.5"/>
            `, 'icon-respected');
        case 'Neutral': // Tier B: Shield with horizontal balance bar
            return baseSvg(`
                <line x1="8" y1="12" x2="16" y2="12" stroke-width="2.5"/>
            `, 'icon-neutral');
        case 'Distrusted': // Tier C: Shield with warning exclamation mark
            return baseSvg(`
                <line x1="12" y1="7.5" x2="12" y2="13" stroke-width="2.5"/>
                <line x1="12" y1="16.5" x2="12.01" y2="16.5" stroke-width="3" stroke-linecap="round"/>
            `, 'icon-distrusted');
        case 'Unpopular': // Tier D: Shield with block X
            return baseSvg(`
                <line x1="9" y1="9" x2="15" y2="15" stroke-width="2.5"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke-width="2.5"/>
            `, 'icon-unpopular');
        default:
            return '';
    }
}

function getCreditLevel(score) {
    for (const level of CREDIT_LEVELS) {
        if (score >= level.min && score <= level.max) return level;
    }
    return CREDIT_LEVELS[CREDIT_LEVELS.length - 1];
}

async function loadSocialCredit() {
    const container = document.getElementById('socialCreditContainer');
    if (!container) return;
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted);">กำลังเรียกดูรายงานประเมินเครดิตสังคม...</div>`;
    
    try {
        const res = await fetch('api/social_credit.php?action=list');
        const data = await res.json();
        if (data.error) { showToast(data.error, 'error'); return; }
        renderSocialCredit(data.users || []);
    } catch (err) {
        console.error('Failed to load social credit', err);
        container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--danger);">เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ระบบเครดิต</div>`;
    }
}

function renderSocialCredit(users) {
    const container = document.getElementById('socialCreditContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const isAdmin = currentUser.role === 'admin';
    
    // Calculations for Stats
    const totalScore = users.reduce((sum, u) => sum + (u.social_credit ?? 50), 0);
    const avgScore = users.length > 0 ? Math.round(totalScore / users.length) : 50;
    const avgLevel = getCreditLevel(avgScore);
    
    const selfUser = users.find(u => u.id == currentUser.id);
    const selfScore = selfUser ? (selfUser.social_credit ?? 50) : 50;
    const selfLevel = getCreditLevel(selfScore);
    const selfRank = users.findIndex(u => u.id == currentUser.id) + 1;
    
    // Good Standing rate (score >= 61 / Respected)
    const goodCreditUsers = users.filter(u => (u.social_credit ?? 50) >= 61).length;
    const goodCreditPct = users.length > 0 ? Math.round((goodCreditUsers / users.length) * 100) : 100;
    
    // Stats Summary Row
    const statsRow = document.createElement('div');
    statsRow.className = 'credit-stats-row';
    statsRow.innerHTML = `
        <div class="glass-panel credit-stats-card stats-card-avg">
            <div class="credit-stats-icon stats-group">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="credit-stats-info">
                <span class="credit-stats-label">คะแนนเฉลี่ยกลุ่ม</span>
                <div class="credit-stats-value-row">
                    <span class="credit-stats-value">${avgScore}</span>
                    <span class="credit-stats-unit">/100</span>
                </div>
                <span class="credit-stats-subtext ${avgLevel.colorClass}">ระดับ: ${avgLevel.thaiName}</span>
            </div>
        </div>
        
        <div class="glass-panel credit-stats-card stats-card-user">
            <div class="credit-stats-icon stats-user">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div class="credit-stats-info">
                <span class="credit-stats-label">คะแนนความน่าเชื่อถือของคุณ</span>
                <div class="credit-stats-value-row">
                    <span class="credit-stats-value">${selfScore}</span>
                    <span class="credit-stats-unit">/100</span>
                </div>
                <span class="credit-stats-subtext ${selfLevel.colorClass}">ระดับ: ${selfLevel.thaiName} (อันดับ #${selfRank > 0 ? selfRank : '-'})</span>
            </div>
        </div>

        <div class="glass-panel credit-stats-card stats-card-index">
            <div class="credit-stats-icon stats-index">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div class="credit-stats-info">
                <span class="credit-stats-label">ดัชนีวินัยสมาชิก (Good Standing)</span>
                <div class="credit-stats-value-row">
                    <span class="credit-stats-value">${goodCreditPct}</span>
                    <span class="credit-stats-unit">%</span>
                </div>
                <span class="credit-stats-subtext credit-respected">ระดับดีขึ้นไป ${goodCreditUsers} จากทั้งหมด ${users.length} คน</span>
            </div>
        </div>
    `;
    container.appendChild(statsRow);
    
    // Level Legend Panel (Official scales in grid format)
    const legendPanel = document.createElement('div');
    legendPanel.className = 'glass-panel credit-legend-panel';
    legendPanel.innerHTML = `
        <div class="credit-legend-header">
            <div class="credit-legend-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--apple-blue);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/></svg>
                <h2 class="section-title">มาตรฐานเกณฑ์คะแนนเครดิต (Official Social Credit Rating Scale)</h2>
            </div>
            <p class="credit-legend-subtitle">เกณฑ์การจัดอันดับความน่าเชื่อถือและการร่วมกิจกรรมในกลุ่มเพื่อนเพื่อการประเมินผลเชิงพฤติกรรมอย่างมีมาตรฐาน</p>
        </div>
        <div class="credit-levels-scale">
            ${CREDIT_LEVELS.map(l => `
                <div class="credit-level-scale-item ${l.colorClass}">
                    <div class="scale-item-header">
                        <div class="scale-item-badge-group">
                            <span class="scale-status-icon">${getCreditLevelIcon(l.name)}</span>
                            <span class="scale-status-text">${l.thaiName}</span>
                        </div>
                        <span class="scale-range-pill">${l.min} - ${l.max} คะแนน</span>
                    </div>
                    <div class="scale-item-body">
                        <p class="scale-cell-behavior">${l.behavior}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    container.appendChild(legendPanel);
    
    // Members Credit List (Leaderboard Table)
    const membersPanel = document.createElement('div');
    membersPanel.className = 'glass-panel credit-members-panel';
    membersPanel.innerHTML = `
        <div class="section-header" style="margin-bottom: 20px;">
            <div style="display:flex;align-items:center;gap:8px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--apple-indigo);"><path d="M12 20h9"/><path d="M3 20v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8"/><path d="M11 20v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/></svg>
                <h2 class="section-title">ตารางการจัดอันดับสมาชิกกลุ่ม (Leaderboard)</h2>
            </div>
            <span class="credit-member-count">สมาชิกทั้งหมด ${users.length} คน</span>
        </div>
        <div class="credit-table-responsive">
            <table class="credit-leaderboard-table">
                <thead>
                    <tr>
                        <th class="col-rank" style="width: 75px; text-align: center;">อันดับ</th>
                        <th class="col-member">รายชื่อสมาชิก</th>
                        <th class="col-rating" style="width: 175px;">สถานะประเมิน</th>
                        <th class="col-progress">คะแนน & ดัชนีความก้าวหน้า</th>
                        <th class="col-actions" style="width: 240px; text-align: right;">การจัดการเครดิต</th>
                    </tr>
                </thead>
                <tbody id="creditMembersTableBody"></tbody>
            </table>
        </div>
    `;
    container.appendChild(membersPanel);
    
    const tbody = membersPanel.querySelector('#creditMembersTableBody');
    
    if (users.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-state" style="text-align:center;padding:40px;color:var(--text-muted);">ยังไม่มีสมาชิกในระบบ</td></tr>`;
        return;
    }
    
    users.forEach((u, index) => {
        const credit = u.social_credit ?? 50;
        const level = getCreditLevel(credit);
        const isSelf = u.id == currentUser.id;
        const rankNum = index + 1;
        
        let rankBadge = '';
        if (rankNum === 1) rankBadge = `<span class="badge-rank badge-rank-1">01</span>`;
        else if (rankNum === 2) rankBadge = `<span class="badge-rank badge-rank-2">02</span>`;
        else if (rankNum === 3) rankBadge = `<span class="badge-rank badge-rank-3">03</span>`;
        else rankBadge = `<span class="badge-rank badge-rank-other">${rankNum < 10 ? '0' + rankNum : rankNum}</span>`;
        
        const tr = document.createElement('tr');
        tr.className = `credit-member-row ${level.colorClass} ${isSelf ? 'is-self' : ''}`;
        tr.style.animationDelay = `${index * 0.05}s`;
        
        // Actions
        let actionButtons = '';
        if (isAdmin) {
            actionButtons = `
                <div class="credit-actions-cell">
                    <button type="button" class="btn-table-action btn-history" onclick="showCreditHistoryModal(${u.id}, '${u.name}')" title="ตรวจสอบรายงานตรวจสอบประวัติเครดิต">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        <span>ประวัติ</span>
                    </button>
                    <div class="credit-quick-adjust-group">
                        ${CREDIT_ACTIONS.map(a => `
                            <button type="button" class="credit-mini-adjust-btn ${a.btnClass}" 
                                onclick="adjustSocialCredit(${u.id}, ${a.amount}, '${a.desc.substring(0, 30)}')" 
                                title="${a.desc}">
                                ${a.label}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            actionButtons = `
                <div class="credit-actions-cell">
                    <button type="button" class="btn-table-action btn-history" onclick="showCreditHistoryModal(${u.id}, '${u.name}')" title="ตรวจสอบรายงานตรวจสอบประวัติเครดิต">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        <span>ประวัติ</span>
                    </button>
                </div>
            `;
        }
        
        tr.innerHTML = `
            <td class="col-rank" style="text-align: center;">${rankBadge}</td>
            <td class="col-member">
                <div class="credit-member-info">
                    <div class="credit-member-avatar">${u.name.substring(0, 2).toUpperCase()}</div>
                    <div class="credit-member-names">
                        <div class="credit-member-name">
                            ${u.name}
                            ${isSelf ? ' <span class="credit-self-tag">คุณ</span>' : ''}
                        </div>
                        <div class="credit-member-role">${u.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : 'สมาชิกทั่วไป (Member)'}</div>
                    </div>
                </div>
            </td>
            <td class="col-rating">
                <div class="credit-level-rating-badge ${level.colorClass}">
                    ${getCreditLevelIcon(level.name)}
                    <span class="rating-name-tag">${level.thaiName}</span>
                </div>
            </td>
            <td class="col-progress">
                <div class="credit-progress-cell">
                    <div class="credit-score-num-display">
                        <span class="credit-score-num">${credit}</span>
                        <span class="credit-score-slash">/100 คะแนน</span>
                    </div>
                    <div class="credit-table-progress-bar">
                        <div class="credit-table-progress-fill ${level.colorClass}" style="width: ${credit}%"></div>
                    </div>
                </div>
            </td>
            <td class="col-actions">${actionButtons}</td>
        `;
        
        tbody.appendChild(tr);
    });
}

async function adjustSocialCredit(userId, amount, desc) {
    // Show reason input prompt
    const reasonOptions = {
        10: ['เลี้ยงสมาชิก/เพื่อนร่วมทริป', 'ช่วยออกค่าใช้จ่ายทริปเพิ่มเติม', 'เข้าร่วมกิจกรรมกลุ่มอย่างเต็มที่', 'ช่วยเหลือเพื่อนร่วมทริปในสถานการณ์สำคัญ', 'มีบทบาทสำคัญในการขับเคลื่อนทริป'],
        5: ['ตอบแชทยืนยันชัดเจนทันที', 'ตรงต่อเวลานัดหมาย', 'ช่วยหาสถานที่หรือร้านอาหาร', 'เสนอไอเดียและแผนงานที่เป็นประโยชน์', 'ช่วยบริหารจัดการและประสานงาน'],
        '-5': ['ตอบแชทกำกวมหรือไม่ชัดเจน', 'อ่านแชทสำคัญแต่ไม่ร่วมโหวตหรือตอบกลับ', 'ทำงานหรือมีส่วนร่วมล่าช้าผิดปกติ', 'ละเลยการทำหน้าที่ที่ได้รับมอบหมาย', 'อ่านไม่ตอบเป็นเวลานาน'],
        '-10': ['ยกเลิกการร่วมทริปกระทันหัน (เททริป/บิด)', 'ขาดการติดต่อหรือหายตัวไปโดยไม่แจ้งล่วงหน้า', 'ไม่รับผิดชอบต่อภาระค่าใช้จ่ายที่เกิดขึ้นจริง', 'มีพฤติกรรมขัดแย้งเชิงลบต่อส่วนรวม']
    };
    const reasons = reasonOptions[amount] || [desc];
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `
        <div class="modal-card glass-panel" style="max-width:440px;padding:28px;">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;border-bottom:1px solid var(--border-subtle);padding-bottom:14px;">
                <div style="width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;
                    background:${amount > 0 ? 'rgba(52,199,89,0.08)' : 'rgba(255,59,48,0.08)'};
                    color:${amount > 0 ? 'var(--apple-green)' : 'var(--apple-red)'};
                    border: 1px solid ${amount > 0 ? 'rgba(52,199,89,0.15)' : 'rgba(255,59,48,0.15)'};
                    font-weight:700;">${amount > 0 ? '+' + amount : amount}</div>
                <div>
                    <h3 class="section-title" style="font-size:1.1rem;margin-bottom:2px;">ปรับเปลี่ยนคะแนนเครดิต</h3>
                    <p style="font-size:0.8rem;color:var(--text-muted);">บันทึกเหตุผลประกอบรายการให้เป็นทางการ</p>
                </div>
            </div>
            <div class="credit-reason-list" id="creditReasonList">
                ${reasons.map((r, i) => `
                    <label class="credit-reason-option">
                        <input type="radio" name="creditReason" value="${r}" ${i === 0 ? 'checked' : ''}>
                        <span class="credit-reason-text">${r}</span>
                    </label>
                `).join('')}
                <div style="margin-top:12px;">
                    <input type="text" id="creditCustomReason" class="form-input" placeholder="พิมพ์เหตุผลอ้างอิงกรณีอื่นๆ..." style="font-size:0.85rem; width:100%;">
                </div>
            </div>
            <div class="modal-actions" style="margin-top:24px; display:flex; justify-content:flex-end; gap:10px;">
                <button type="button" class="btn btn-secondary" id="creditAdjustCancel" style="padding: 9px 18px;">ยกเลิก</button>
                <button type="button" class="btn btn-primary" id="creditAdjustConfirm" style="padding: 9px 18px; background:${amount > 0 ? 'var(--apple-green)' : 'var(--apple-red)'}; border-color:${amount > 0 ? 'var(--apple-green)' : 'var(--apple-red)'};">ยืนยันรายการ</button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    
    return new Promise((resolve) => {
        const dismiss = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 250);
        };
        
        overlay.querySelector('#creditAdjustCancel').onclick = () => { dismiss(); resolve(); };
        overlay.addEventListener('click', (e) => { if (e.target === overlay) { dismiss(); resolve(); } });
        
        overlay.querySelector('#creditAdjustConfirm').onclick = async () => {
            const customReason = document.getElementById('creditCustomReason').value.trim();
            const selectedRadio = overlay.querySelector('input[name="creditReason"]:checked');
            const reason = customReason || (selectedRadio ? selectedRadio.value : desc);
            
            dismiss();
            
            try {
                const res = await fetch('api/social_credit.php?action=adjust', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id: userId, change_amount: amount, reason })
                });
                const data = await res.json();
                if (data.success) {
                    const changeText = amount > 0 ? `+${amount}` : `${amount}`;
                    showToast(`บันทึกการปรับเครดิตสำเร็จ (${changeText})`, amount > 0 ? 'success' : 'warning');
                    loadSocialCredit();
                } else {
                    showToast(data.error || 'บันทึกรายการปรับเครดิตล้มเหลว', 'error');
                }
            } catch (err) {
                console.error(err);
                showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย', 'error');
            }
            resolve();
        };
    });
}

async function showCreditHistoryModal(userId, userName) {
    // Show loading indicator
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `
        <div class="modal-card glass-panel" style="max-width:520px;padding:28px;max-height:85vh;display:flex;flex-direction:column;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;border-bottom:1px solid var(--border-subtle);padding-bottom:14px;">
                <h3 class="section-title" style="font-size:1.1rem;display:flex;align-items:center;gap:10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--apple-blue);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    รายงานตรวจสอบเครดิต: ${userName}
                </h3>
                <button type="button" class="btn-close-modal" id="creditHistoryClose" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:1.35rem;line-height:1;padding:4px;">&times;</button>
            </div>
            <div id="creditHistoryLogsList" style="flex:1;overflow-y:auto;padding-right:4px;">
                <div style="text-align:center;padding:20px;color:var(--text-muted);">กำลังค้นหารายงานธุรกรรมเครดิต...</div>
            </div>
        </div>`;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('#creditHistoryClose');
    const dismiss = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 250);
    };
    closeBtn.onclick = dismiss;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) dismiss(); });

    try {
        const res = await fetch(`api/social_credit.php?action=logs&user_id=${userId}`);
        const data = await res.json();
        const logsList = overlay.querySelector('#creditHistoryLogsList');
        
        if (data.error) {
            logsList.innerHTML = `<div style="text-align:center;padding:20px;color:var(--danger);">${data.error}</div>`;
            return;
        }

        const logs = data.logs || [];
        if (logs.length === 0) {
            logsList.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted);font-size:0.88rem;">ไม่มีรายการเคลื่อนไหวเครดิตประวัติ</div>`;
            return;
        }

        logsList.innerHTML = `
            <div class="credit-timeline">
                ${logs.map(log => {
                    const amt = parseInt(log.change_amount);
                    const isPositive = amt > 0;
                    const changeClass = isPositive ? 'log-positive' : 'log-negative';
                    const changeText = isPositive ? `+${amt}` : `${amt}`;
                    
                    // Format SQLite datetime (UTC to Local)
                    let dateStr = log.created_at;
                    try {
                        const utcStr = log.created_at.replace(' ', 'T') + 'Z';
                        const date = new Date(utcStr);
                        dateStr = date.toLocaleString('th-TH', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    } catch (e) {
                        console.error(e);
                    }

                    const updater = log.changed_by_name ? `ผู้บันทึก: ${log.changed_by_name}` : 'ระบบควบคุมอัตโนมัติ';
                    const refCode = `TXN-${String(log.id).padStart(5, '0')}`;

                    return `
                        <div class="credit-timeline-item">
                            <div class="credit-timeline-badge-wrapper">
                                <div class="credit-timeline-badge ${changeClass}">${changeText}</div>
                            </div>
                            <div class="credit-timeline-content">
                                <div class="credit-timeline-reason">${log.reason}</div>
                                <div class="credit-timeline-meta">
                                    <span>${dateStr}</span> &bull; 
                                    <span style="font-weight:600;color:var(--text-primary);">${updater}</span>
                                </div>
                                <div class="credit-timeline-txn-id">${refCode}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    } catch (err) {
        console.error(err);
        const logsList = overlay.querySelector('#creditHistoryLogsList');
        logsList.innerHTML = `<div style="text-align:center;padding:20px;color:var(--danger);">ไม่สามารถเรียกดูรายงานธุรกรรมได้</div>`;
    }
}

// ==========================================
// HELPERS
// ==========================================
function formatCurrency(val) {
    return parseFloat(val || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function bindCommaFormatting(input) {
    if (!input) return;
    
    let selectAllOnFocus = true;
    
    input.addEventListener('focus', function() {
        let val = input.value.replace(/,/g, '');
        if (val === '0.00' || val === '0' || parseFloat(val) === 0 || val === '') {
            input.value = '';
        } else if (selectAllOnFocus) {
            setTimeout(() => { input.select(); }, 50);
        }
    });
    
    input.addEventListener('mousedown', function() {
        selectAllOnFocus = (document.activeElement !== input);
    });
    
    input.addEventListener('input', function(e) {
        let value = input.value;
        let selectionStart = input.selectionStart;
        let digitsBefore = (value.substring(0, selectionStart).replace(/,/g, '')).length;
        
        let cleanValue = value.replace(/[^0-9.]/g, '');
        let dotIdx = cleanValue.indexOf('.');
        if (dotIdx !== -1) {
            let integerPart = cleanValue.substring(0, dotIdx);
            let decimalPart = cleanValue.substring(dotIdx + 1).replace(/\./g, '').substring(0, 2);
            cleanValue = integerPart + '.' + decimalPart;
        }
        
        let parts = cleanValue.split('.');
        let integerPart = parts[0];
        
        if (integerPart) {
            if (integerPart.length > 1 && integerPart.startsWith('0')) {
                integerPart = integerPart.replace(/^0+/, '');
                if (integerPart === '') integerPart = '0';
            }
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else if (cleanValue.startsWith('.')) {
            integerPart = '0';
        }
        
        let formattedValue = integerPart;
        if (parts.length > 1) {
            formattedValue += '.' + parts[1];
        }
        
        input.value = formattedValue;
        
        let newSelectionStart = 0;
        let formattedDigitsCount = 0;
        while (newSelectionStart < formattedValue.length && formattedDigitsCount < digitsBefore) {
            if (formattedValue[newSelectionStart] !== ',') {
                formattedDigitsCount++;
            }
            newSelectionStart++;
        }
        
        input.setSelectionRange(newSelectionStart, newSelectionStart);
    });
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace') {
            let start = input.selectionStart;
            let end = input.selectionEnd;
            if (start === end && start > 0 && input.value[start - 1] === ',') {
                e.preventDefault();
                let val = input.value;
                let newVal = val.substring(0, start - 2) + val.substring(start);
                input.value = newVal;
                input.setSelectionRange(start - 2, start - 2);
                input.dispatchEvent(new Event('input'));
            }
        }
    });
    
    input.addEventListener('blur', function() {
        let value = input.value.replace(/,/g, '');
        if (value === '' || isNaN(parseFloat(value))) {
            input.value = '0.00';
            return;
        }
        input.value = parseFloat(value).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
}

async function confirmSettlement(fromId, toId, amount) {
    if (!await showConfirm("คุณได้รับเงินจำนวนนี้เรียบร้อยแล้วใช่หรือไม่? การยืนยันจะเคลียร์หนี้สินในระบบ")) return;
    try {
        const res = await fetch("api/expenses.php?action=settle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ from_id: fromId, to_id: toId, amount: amount })
        });
        const data = await res.json();
        if (data.success) {
            showToast("ยืนยันการเคลียร์เงินสำเร็จ", "success");
            activeExpenseFilter = 'settlement';
            const btnAll = document.getElementById("btnToggleAllExpenses");
            const btnSettle = document.getElementById("btnToggleSettlements");
            if (btnAll && btnSettle) {
                btnSettle.classList.add("active");
                btnAll.classList.remove("active");
            }
            loadExpenses();
        } else {
            showToast(data.error || "บันทึกการเคลียร์เงินล้มเหลว", "error");
        }
    } catch (err) {
        console.error(err);
        showToast("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์", "error");
    }
}

function formatShortDate(dateStr) {
    const d = parseLocalDate(dateStr);
    if (!d || isNaN(d.getTime())) return dateStr;
    const months = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
    return `${d.getDate()} ${months[d.getMonth()]}`;
}

// Expose for inline onclick
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("sidebarOverlay").classList.toggle("active");
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById("sidebarOverlay").classList.remove("active");
}

window.selectTrip = selectTrip;
window.cancelTrip = cancelTrip;
window.restoreTrip = restoreTrip;
window.forceDeleteTrip = forceDeleteTrip;
window.openEditGlobalUserModal = openEditGlobalUserModal;
window.deleteGlobalUser = deleteGlobalUser;
window.deleteExpense = deleteExpense;
window.deleteItinerary = deleteItinerary;
window.toggleChecklistItem = toggleChecklistItem;
window.deleteChecklistItem = deleteChecklistItem;
window.updateInviteStatus = updateInviteStatus;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.adjustSocialCredit = adjustSocialCredit;
window.showCreditHistoryModal = showCreditHistoryModal;
