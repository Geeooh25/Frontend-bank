
// Complete functionality for all toggles and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const supportLink = document.getElementById('support-link');
    const supportPage = document.getElementById('support-page');
    const authSection = document.getElementById('auth-section');
    const backToLogin = document.getElementById('back-to-login');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const goSignup = document.getElementById('go-signup');
    const goLogin = document.getElementById('go-login');
    const forgotPassword = document.getElementById('forgot-password');
    const supportButtons = document.querySelectorAll('.contact-btn');
    
    // Support page navigation
    supportLink.addEventListener('click', function(e) {
        e.preventDefault();
        supportPage.style.display = 'block';
        authSection.style.display = 'none';
    });
    
    // Back to login from support page
    backToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        supportPage.style.display = 'none';
        authSection.style.display = 'block';
    });
    
    // Form toggle functionality
    loginBtn.addEventListener('click', function() {
        loginForm.classList.add('show');
        signupForm.classList.remove('show');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    });
    
    signupBtn.addEventListener('click', function() {
        signupForm.classList.add('show');
        loginForm.classList.remove('show');
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
    });
    
    // Navigation between login and signup forms
    goSignup.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.classList.add('show');
        loginForm.classList.remove('show');
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
    });
    
    goLogin.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.add('show');
        signupForm.classList.remove('show');
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    });
    
    // Forgot password functionality
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Forgot password functionality would be implemented here. A password reset email would be sent to your registered email address.');
        // In a real application, you would:
        // 1. Show a password reset form
        // 2. Send a reset link to the user's email
        // 3. Handle the password reset process
    });
    
    // Support buttons functionality
    supportButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            switch(index) {
                case 0: // Call Now
                    alert('Calling customer support at +1-800-MILES-BANK...');
                    break;
                case 1: // Start Chat
                    alert('Opening live chat with support agent...');
                    break;
                case 2: // Send Email
                    alert('Opening email client to send message to support@milessmartbank.com...');
                    break;
                case 3: // Browse FAQs
                    alert('Redirecting to FAQ section...');
                    break;
            }
        });
    });
    
    // Password toggle functionality for all forms
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const passwordInput = document.getElementById(target);
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    });
    
    // Form submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        console.log('Login attempt:', { email, password });
        alert('Login successful! Redirecting to dashboard...');
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;
        
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        console.log('Signup attempt:', { firstName, lastName, email });
        alert('Account created successfully! Please check your email for verification.');
    });
    
    // Biometric toggle functionality
    const enableBiometric = document.getElementById('enable-biometric');
    if (enableBiometric) {
        enableBiometric.addEventListener('change', function() {
            if (this.checked) {
                alert('Biometric authentication enabled. You can now use fingerprint or face recognition for login.');
            } else {
                alert('Biometric authentication disabled.');
            }
        });
    }
    
    // Use Biometric button
    const useBiometric = document.getElementById('use-biometric');
    if (useBiometric) {
        useBiometric.addEventListener('click', function() {
            alert('Biometric authentication would be initiated here. Please use your fingerprint or face recognition.');
        });
    }
    
    // Admin Login Functionality (your existing code)
    const showAdminLogin = document.getElementById('show-admin-login');
    const adminLoginSection = document.getElementById('admin-login-section');
    const adminBackBtn = document.getElementById('admin-back-btn');
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminTogglePassword = document.getElementById('admin-toggle-password');
    const adminPasswordInput = document.getElementById('admin-password');
    const adminLoginSubmit = document.getElementById('admin-login-submit');
    const adminAttemptsCount = document.getElementById('admin-attempts-count');
    const adminMessageContainer = document.getElementById('admin-message-container');
    const formToggle = document.querySelector('.form-toggle');

    let adminLoginAttempts = 3;
    let isAdminLocked = false;

    // Show admin login section
    showAdminLogin.addEventListener('click', function() {
        adminLoginSection.style.display = 'block';
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        formToggle.style.display = 'none';
        document.querySelector('.security-banner').style.display = 'none';
    });

    // Back to user login
    adminBackBtn.addEventListener('click', function() {
        adminLoginSection.style.display = 'none';
        loginForm.style.display = 'block';
        formToggle.style.display = 'flex';
        document.querySelector('.security-banner').style.display = 'flex';
        resetAdminForm();
    });

    // Toggle password visibility
    adminTogglePassword.addEventListener('click', function() {
        const type = adminPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        adminPasswordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // Display admin message
    function showAdminMessage(message, type = 'error') {
        adminMessageContainer.innerHTML = `<div class="admin-message admin-${type}">${message}</div>`;
        
        if (type === 'success') {
            setTimeout(() => {
                adminMessageContainer.innerHTML = '';
            }, 3000);
        }
    }

    // Reset admin form
    function resetAdminForm() {
        adminLoginForm.reset();
        adminLoginAttempts = 3;
        adminAttemptsCount.textContent = adminLoginAttempts;
        isAdminLocked = false;
        adminLoginSubmit.disabled = false;
        adminLoginSubmit.textContent = 'Login as Administrator';
        adminMessageContainer.innerHTML = '';
    }

    // Admin form submission
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (isAdminLocked) {
            showAdminMessage('Account is temporarily locked. Please try again later.');
            return;
        }

        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        const twoFA = document.getElementById('admin-2fa').value;

        if (!username || !password) {
            showAdminMessage('Please enter both username and password.');
            return;
        }

        // Show loading state
        adminLoginSubmit.disabled = true;
        adminLoginSubmit.textContent = 'Verifying...';

        // Simulate admin authentication
        setTimeout(() => {
            // Demo credentials
            const validCredentials = (
                (username === 'admin' && password === 'Admin123!' && twoFA === '123456') ||
                (username === 'bankadmin' && password === 'SecureBank2024!' && twoFA === '654321')
            );

            if (validCredentials) {
                showAdminMessage('Login successful! Redirecting to admin dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 2000);
            } else {
                adminLoginAttempts--;
                adminAttemptsCount.textContent = adminLoginAttempts;

                if (adminLoginAttempts <= 0) {
                    isAdminLocked = true;
                    adminLoginSubmit.disabled = true;
                    adminLoginSubmit.textContent = 'Account Locked';
                    showAdminMessage('Too many failed attempts. Account locked for 30 minutes.');
                } else {
                    showAdminMessage(`Invalid credentials. ${adminLoginAttempts} attempt(s) remaining.`);
                    adminLoginSubmit.disabled = false;
                    adminLoginSubmit.textContent = 'Login as Administrator';
                    document.getElementById('admin-password').value = '';
                    document.getElementById('admin-2fa').value = '';
                }
            }
        }, 1500);
    });
});
