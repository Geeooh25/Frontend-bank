
// Toast notification system
function showToast(message, type, duration) {
    type = type || 'info';
    duration = duration || 3000;
    var toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 10000;';
        document.body.appendChild(toastContainer);
    }
    
    var toast = document.createElement('div');
    var borderColor = type === 'success' ? '#28a745' : (type === 'error' ? '#dc3545' : '#17a2b8');
    var icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
    
    toast.style.cssText = 'background: white; border-radius: 12px; padding: 14px 20px; margin-bottom: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px; border-left: 4px solid ' + borderColor + '; animation: slideInRight 0.3s ease;';
    toast.innerHTML = '<i class="fas ' + icon + '" style="color: ' + borderColor + ';"></i><div style="flex: 1; font-size: 14px;">' + message + '</div><button style="background: none; border: none; cursor: pointer; font-size: 18px;">&times;</button>';
    
    toastContainer.appendChild(toast);
    toast.querySelector('button').onclick = function() { toast.remove(); };
    setTimeout(function() { if(toast.parentNode) toast.remove(); }, duration);
}

// Check authentication on all pages
document.addEventListener('DOMContentLoaded', function() {
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');
    var userDataStr = sessionStorage.getItem('userData');
    
    if (!isLoggedIn || !userDataStr) {
        showToast('Please login to continue', 'error', 2000);
        setTimeout(function() { window.location.href = '../index.html'; }, 2000);
        return;
    }
    
    var userData = JSON.parse(userDataStr);
    var fullName = userData.fullName || (userData.firstName ? userData.firstName + ' ' + (userData.lastName || '') : 'Client Name');
    
    // Update user name everywhere
    var userNameSpans = document.querySelectorAll('.user-profile span:first-child, .mobile-user-info strong');
    for (var i = 0; i < userNameSpans.length; i++) {
        userNameSpans[i].textContent = fullName;
    }
    
    // User dropdown toggle
    var userProfileBtn = document.getElementById('userProfileBtn');
    var userDropdown = document.getElementById('userDropdown');
    if (userProfileBtn && userDropdown) {
        userProfileBtn.onclick = function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        };
        document.onclick = function() { 
            if (userDropdown) userDropdown.classList.remove('show');
        };
    }
    
    // Mobile menu
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    var closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = function() {
            if (mobileMenu) mobileMenu.classList.add('open');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('open');
        };
    }
    
    var closeMobile = function() {
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('open');
    };
    
    if (closeMobileMenu) closeMobileMenu.onclick = closeMobile;
    if (mobileMenuOverlay) mobileMenuOverlay.onclick = closeMobile;
    
    // Logout
    var logoutLinks = document.querySelectorAll('.user-dropdown a:last-child, .mobile-nav a:last-child');
    for (var i = 0; i < logoutLinks.length; i++) {
        logoutLinks[i].onclick = function(e) {
            e.preventDefault();
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userData');
            showToast('Logged out successfully!', 'success', 1500);
            setTimeout(function() { window.location.href = '../index.html'; }, 1500);
        };
    }
});
