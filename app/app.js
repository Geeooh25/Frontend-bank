 // Complete functionality for all toggles including forgot password
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
        const forgotPasswordForm = document.getElementById('forgot-password-form');
        const backToLoginFromReset = document.getElementById('back-to-login-from-reset');
        const supportButtons = document.querySelectorAll('.contact-btn');
        
        // Forgot password elements
        const sendResetCode = document.getElementById('send-reset-code');
        const verifyCode = document.getElementById('verify-code');
        const resetPassword = document.getElementById('reset-password');
        const resendCode = document.getElementById('resend-code');
        const resetSuccess = document.getElementById('reset-success');
        
        // Step elements
        const step1Content = document.getElementById('step-1-content');
        const step2Content = document.getElementById('step-2-content');
        const step3Content = document.getElementById('step-3-content');
        
        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');
        const step3 = document.getElementById('step-3');
        
        const stepLabel1 = document.getElementById('step-label-1');
        const stepLabel2 = document.getElementById('step-label-2');
        const stepLabel3 = document.getElementById('step-label-3');
        
        // Verification code inputs
        const verificationInputs = document.querySelectorAll('.verification-input');
        
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
            forgotPasswordForm.classList.remove('show');
            loginBtn.classList.add('active');
            signupBtn.classList.remove('active');
        });
        
        signupBtn.addEventListener('click', function() {
            signupForm.classList.add('show');
            loginForm.classList.remove('show');
            forgotPasswordForm.classList.remove('show');
            signupBtn.classList.add('active');
            loginBtn.classList.remove('active');
        });
        
        // Navigation between login and signup forms
        goSignup.addEventListener('click', function(e) {
            e.preventDefault();
            signupForm.classList.add('show');
            loginForm.classList.remove('show');
            forgotPasswordForm.classList.remove('show');
            signupBtn.classList.add('active');
            loginBtn.classList.remove('active');
        });
        
        goLogin.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.add('show');
            signupForm.classList.remove('show');
            forgotPasswordForm.classList.remove('show');
            loginBtn.classList.add('active');
            signupBtn.classList.remove('active');
        });
        
        // Forgot password functionality
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('show');
            signupForm.classList.remove('show');
            forgotPasswordForm.classList.add('show');
            resetForgotPasswordForm();
        });
        
        // Back to login from reset form
        backToLoginFromReset.addEventListener('click', function(e) {
            e.preventDefault();
            forgotPasswordForm.classList.remove('show');
            loginForm.classList.add('show');
            resetForgotPasswordForm();
        });
        
        // Send reset code
        sendResetCode.addEventListener('click', function() {
            const email = document.getElementById('reset-email').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Simulate sending reset code
            console.log('Sending reset code to:', email);
            
            // Move to step 2
            step1Content.classList.add('hidden');
            step2Content.classList.remove('hidden');
            
            // Update step indicators
            step1.classList.remove('active');
            step1.classList.add('completed');
            step2.classList.add('active');
            
            stepLabel1.classList.remove('active');
            stepLabel2.classList.add('active');
            
            // Focus first verification input
            verificationInputs[0].focus();
        });
        
        // Handle verification code input
        verificationInputs.forEach((input, index) => {
            input.addEventListener('input', function() {
                if (this.value.length === 1 && index < verificationInputs.length - 1) {
                    verificationInputs[index + 1].focus();
                }
            });
            
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                    verificationInputs[index - 1].focus();
                }
            });
        });
        
        // Verify code
        verifyCode.addEventListener('click', function() {
            let code = '';
            verificationInputs.forEach(input => {
                code += input.value;
            });
            
            if (code.length !== 6) {
                alert('Please enter the complete 6-digit code');
                return;
            }
            
            // Simulate code verification
            console.log('Verifying code:', code);
            
            // Move to step 3
            step2Content.classList.add('hidden');
            step3Content.classList.remove('hidden');
            
            // Update step indicators
            step2.classList.remove('active');
            step2.classList.add('completed');
            step3.classList.add('active');
            
            stepLabel2.classList.remove('active');
            stepLabel3.classList.add('active');
        });
        
        // Resend code
        resendCode.addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.getElementById('reset-email').value;
            
            // Simulate resending code
            console.log('Resending code to:', email);
            
            alert('A new verification code has been sent to your email');
            
            // Clear verification inputs
            verificationInputs.forEach(input => {
                input.value = '';
            });
            
            // Focus first input
            verificationInputs[0].focus();
        });
        
        // Reset password
        resetPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-new-password').value;
            
            if (!newPassword || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Simulate password reset
            console.log('Resetting password to:', newPassword);
            
            // Show success message
            step3Content.classList.add('hidden');
            resetSuccess.style.display = 'block';
            
            // Update step indicators
            step3.classList.remove('active');
            step3.classList.add('completed');
            
            stepLabel3.classList.remove('active');
        });
        
        // Reset forgot password form to initial state
        function resetForgotPasswordForm() {
            step1Content.classList.remove('hidden');
            step2Content.classList.add('hidden');
            step3Content.classList.add('hidden');
            resetSuccess.style.display = 'none';
            
            step1.classList.add('active');
            step1.classList.remove('completed');
            step2.classList.remove('active', 'completed');
            step3.classList.remove('active', 'completed');
            
            stepLabel1.classList.add('active');
            stepLabel2.classList.remove('active');
            stepLabel3.classList.remove('active');
            
            document.getElementById('reset-email').value = '';
            verificationInputs.forEach(input => {
                input.value = '';
            });
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-new-password').value = '';
        }
        
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
            forgotPasswordForm.style.display = 'none';
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
    //admin ends


     // Airtime Amounts Configuration 
    const AIRTIME_AMOUNTS = [
      { id: "1", amount: "₦50", value: 50.0 },
      { id: "2", amount: "₦100", value: 100.0 },
      { id: "3", amount: "₦200", value: 200.0 },
      { id: "4", amount: "₦500", value: 500.0 },
      { id: "5", amount: "₦1000", value: 1000.0 },
      { id: "6", amount: "₦2000", value: 2000.0 },
      { id: "7", amount: "₦5000", value: 5000.0 }
    ];

    // Beneficiaries Management
    let beneficiaries = JSON.parse(localStorage.getItem('airtimeTopUpBeneficiaries')) || [
      { id: 1, name: "My Number", network: "MTN", phone: "08012345678" },
      { id: 2, name: "Family", network: "AIRTEL", phone: "08087654321" }
    ];

    // Hamburger Menu and User Profile Functionality
    document.addEventListener('DOMContentLoaded', function() {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const closeMobileMenu = document.getElementById('closeMobileMenu');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
      const userProfileBtn = document.getElementById('userProfileBtn');
      const userDropdown = document.getElementById('userDropdown');

      // Load beneficiaries on page load
      loadBeneficiaries();

      // Initialize airtime amount selection
      initializeAirtimeAmounts();

      // Mobile menu functionality
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.add('show');
          mobileMenuOverlay.classList.add('show');
          document.body.classList.add('menu-open');
        });

        closeMobileMenu.addEventListener('click', function() {
          closeMobileMenuFunc();
        });

        mobileMenuOverlay.addEventListener('click', function() {
          closeMobileMenuFunc();
        });

        function closeMobileMenuFunc() {
          mobileMenu.classList.remove('show');
          mobileMenuOverlay.classList.remove('show');
          document.body.classList.remove('menu-open');
        }

        // Close on escape key
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            closeMobileMenuFunc();
            userDropdown.classList.remove('show');
            closeAddBeneficiaryModal();
          }
        });

        // Close when clicking on mobile nav links
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
          link.addEventListener('click', function() {
            closeMobileMenuFunc();
          });
        });
      }

      // User profile dropdown functionality
      if (userProfileBtn && userDropdown) {
        userProfileBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          userDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.app-header-actions')) {
            userDropdown.classList.remove('show');
          }
        });

        // Close dropdown when clicking on dropdown items
        userDropdown.addEventListener('click', function(e) {
          if (e.target.tagName === 'A') {
            userDropdown.classList.remove('show');
          }
        });
      }

      // Airtime Form Functionality
      const form = document.getElementById("topupForm");
      const submitBtn = document.getElementById("submitBtn");
      const phoneInput = document.getElementById("phone");
      const phoneError = document.getElementById("phoneError");
      const modal = document.getElementById("successModal");
      const errorModal = document.getElementById("errorModal");
      const successText = document.getElementById("successText");
      const errorText = document.getElementById("errorText");
      const amountInput = document.getElementById("amount");

      // Add Beneficiary Form
      const addBeneficiaryForm = document.getElementById("addBeneficiaryForm");
      addBeneficiaryForm.addEventListener("submit", function(e) {
        e.preventDefault();
        saveBeneficiary();
      });

      // Nigerian phone number validation (11 digits starting with 0)
      phoneInput.addEventListener("input", () => {
        const value = phoneInput.value.replace(/\D/g, ""); // allow only digits
        phoneInput.value = value;
        if (value.length !== 11 || !value.startsWith('0')) {
          phoneError.textContent = "Phone number must be 11 digits starting with 0 (e.g., 08012345678).";
        } else {
          phoneError.textContent = "";
        }
      });

      // Custom amount input
      amountInput.addEventListener('input', function() {
        // Remove selected class from all amount options when custom amount is entered
        document.querySelectorAll('.airtime-amount').forEach(amount => {
          amount.classList.remove('selected');
        });
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const phone = phoneInput.value;
        const carrier = document.getElementById("network").value;
        const paymentMethod = document.getElementById("paymentMethod").value;
        const amount = amountInput.value;

        if (phone.length !== 11 || !phone.startsWith('0')) {
          phoneError.textContent = "Please enter a valid 11-digit Nigerian phone number starting with 0.";
          phoneInput.focus();
          return;
        }

        if (!amount || amount < 50) {
          showError("Please enter an amount of ₦50 or more.");
          return;
        }

        if (!carrier) {
          showError("Please select a network provider.");
          return;
        }

        if (!paymentMethod) {
          showError("Please select a payment method.");
          return;
        }

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;

        // Simulate API call with random success/failure
        setTimeout(() => {
          // 90% success rate for demo
          const isSuccess = Math.random() > 0.1;
          
          if (isSuccess) {
            // Format phone number for display
            const formattedPhone = `${phone.slice(0,4)} ${phone.slice(4,7)} ${phone.slice(7)}`;
            const paymentMethodText = {
              'balance': 'Account Balance',
              'card': 'Credit/Debit Card'
            }[paymentMethod];

            successText.textContent = `₦${amount} airtime has been successfully sent to ${formattedPhone} (${carrier}). Payment method: ${paymentMethodText}.`;
            modal.classList.add("active");
          } else {
            showError("Payment processing failed. Please check your payment method and try again.");
          }

          // reset form
          form.reset();
          document.querySelectorAll('.airtime-amount').forEach(a => a.classList.remove('selected'));
          submitBtn.innerHTML = '<i class="fas fa-bolt"></i> Top Up Now';
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
        }, 2000);
      });

      console.log('Airtime top-up system initialized successfully');
    });

    // Initialize airtime amount selection
    function initializeAirtimeAmounts() {
      const airtimeAmounts = document.querySelectorAll('.airtime-amount');
      
      airtimeAmounts.forEach(amount => {
        amount.addEventListener('click', function() {
          // Remove selected class from all amounts
          document.querySelectorAll('.airtime-amount').forEach(a => a.classList.remove('selected'));
          // Add selected class to clicked amount
          this.classList.add('selected');
          // Set the amount input value
          document.getElementById('amount').value = this.getAttribute('data-amount');
        });
        
        // Add keyboard support for amounts
        amount.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
      });
    }

    // Beneficiary Management Functions
    function loadBeneficiaries() {
      const beneficiaryList = document.getElementById('beneficiaryList');
      beneficiaryList.innerHTML = '';

      if (beneficiaries.length === 0) {
        beneficiaryList.innerHTML = '<div class="no-beneficiaries">No beneficiaries saved yet. Click "Add New" to create one.</div>';
        return;
      }

      beneficiaries.forEach(beneficiary => {
        const beneficiaryItem = document.createElement('div');
        beneficiaryItem.className = 'beneficiary-item';
        beneficiaryItem.setAttribute('data-id', beneficiary.id);
        
        beneficiaryItem.innerHTML = `
          <div class="beneficiary-info">
            <div class="beneficiary-name">${beneficiary.name}</div>
            <div class="beneficiary-details">${beneficiary.phone} • ${beneficiary.network}</div>
          </div>
          <div class="beneficiary-actions">
            <button class="beneficiary-action" onclick="editBeneficiary(${beneficiary.id})">
              <i class="fas fa-edit"></i>
            </button>
            <button class="beneficiary-action" onclick="deleteBeneficiary(${beneficiary.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;

        beneficiaryItem.addEventListener('click', function(e) {
          if (!e.target.closest('.beneficiary-actions')) {
            selectBeneficiary(beneficiary);
          }
        });

        beneficiaryList.appendChild(beneficiaryItem);
      });
    }

    function selectBeneficiary(beneficiary) {
      // Remove selected class from all beneficiaries
      document.querySelectorAll('.beneficiary-item').forEach(item => {
        item.classList.remove('selected');
      });

      // Add selected class to clicked beneficiary
      const selectedItem = document.querySelector(`.beneficiary-item[data-id="${beneficiary.id}"]`);
      if (selectedItem) {
        selectedItem.classList.add('selected');
      }

      // Update form fields
      document.getElementById('phone').value = beneficiary.phone;
      document.getElementById('network').value = beneficiary.network;
      
      // Trigger input event for validation
      document.getElementById('phone').dispatchEvent(new Event('input'));
    }

    function openAddBeneficiaryModal() {
      document.getElementById('addBeneficiaryModal').classList.add('active');
    }

    function closeAddBeneficiaryModal() {
      document.getElementById('addBeneficiaryModal').classList.remove('active');
      document.getElementById('addBeneficiaryForm').reset();
      
      // Reset the save button
      const saveBtn = document.getElementById('saveBeneficiaryBtn');
      saveBtn.textContent = 'Save Beneficiary';
      saveBtn.onclick = null;
    }

    function saveBeneficiary() {
      const name = document.getElementById('beneficiaryName').value;
      const network = document.getElementById('beneficiaryNetwork').value;
      const phone = document.getElementById('beneficiaryPhone').value;

      if (!name || !network || !phone) {
        alert('Please fill all fields');
        return;
      }

      // Validate phone number
      if (phone.length !== 11 || !phone.startsWith('0')) {
        alert('Please enter a valid 11-digit Nigerian phone number starting with 0');
        return;
      }

      const newBeneficiary = {
        id: Date.now(), // Simple ID generation
        name,
        network,
        phone
      };

      beneficiaries.push(newBeneficiary);
      localStorage.setItem('airtimeTopUpBeneficiaries', JSON.stringify(beneficiaries));
      
      loadBeneficiaries();
      closeAddBeneficiaryModal();
      
      // Select the newly added beneficiary
      selectBeneficiary(newBeneficiary);
    }

    function editBeneficiary(id) {
      const beneficiary = beneficiaries.find(b => b.id === id);
      if (beneficiary) {
        document.getElementById('beneficiaryName').value = beneficiary.name;
        document.getElementById('beneficiaryNetwork').value = beneficiary.network;
        document.getElementById('beneficiaryPhone').value = beneficiary.phone;
        
        openAddBeneficiaryModal();
        
        // Change the form to update mode
        const saveBtn = document.getElementById('saveBeneficiaryBtn');
        saveBtn.textContent = 'Update Beneficiary';
        saveBtn.onclick = function() {
          updateBeneficiary(id);
        };
      }
    }

    function updateBeneficiary(id) {
      const name = document.getElementById('beneficiaryName').value;
      const network = document.getElementById('beneficiaryNetwork').value;
      const phone = document.getElementById('beneficiaryPhone').value;

      if (!name || !network || !phone) {
        alert('Please fill all fields');
        return;
      }

      // Validate phone number
      if (phone.length !== 11 || !phone.startsWith('0')) {
        alert('Please enter a valid 11-digit Nigerian phone number starting with 0');
        return;
      }

      const index = beneficiaries.findIndex(b => b.id === id);
      if (index !== -1) {
        beneficiaries[index] = { id, name, network, phone };
        localStorage.setItem('airtimeTopUpBeneficiaries', JSON.stringify(beneficiaries));
        loadBeneficiaries();
        closeAddBeneficiaryModal();
        
        // Reset the save button
        const saveBtn = document.getElementById('saveBeneficiaryBtn');
        saveBtn.textContent = 'Save Beneficiary';
        saveBtn.onclick = null;
      }
    }

    function deleteBeneficiary(id) {
      if (confirm('Are you sure you want to delete this beneficiary?')) {
        beneficiaries = beneficiaries.filter(b => b.id !== id);
        localStorage.setItem('airtimeTopUpBeneficiaries', JSON.stringify(beneficiaries));
        loadBeneficiaries();
      }
    }

    // Quick airtime functions
    function quickAirtime(type) {
      const quickActions = document.querySelectorAll('.quick-action');
      const phoneInput = document.getElementById('phone');
      const networkSelect = document.getElementById('network');
      const amountInput = document.getElementById('amount');
      
      // Add loading state to clicked button
      quickActions.forEach(action => {
        if (action.querySelector('i').classList.contains('fa-users') && type === 'family' ||
            action.querySelector('i').classList.contains('fa-mobile-alt') && type === 'self') {
          action.classList.add('loading');
          action.querySelector('i').className = 'fas fa-spinner fa-spin';
        }
      });
      
      setTimeout(() => {
        if (type === 'self') {
          // Pre-fill with user's own number
          phoneInput.value = '08012345678';
          networkSelect.value = 'MTN';
          amountInput.value = '500';
          // Select the ₦500 amount
          document.querySelector('.airtime-amount[data-amount="500"]').classList.add('selected');
        } else if (type === 'family') {
          // Pre-fill with family number
          phoneInput.value = '08087654321';
          networkSelect.value = 'AIRTEL';
          amountInput.value = '1000';
          // Select the ₦1000 amount
          document.querySelector('.airtime-amount[data-amount="1000"]').classList.add('selected');
        }
        
        // Remove loading state
        quickActions.forEach(action => {
          action.classList.remove('loading');
          if (action.querySelector('i').classList.contains('fa-spinner')) {
            if (type === 'self') {
              action.querySelector('i').className = 'fas fa-mobile-alt';
            } else {
              action.querySelector('i').className = 'fas fa-users';
            }
          }
        });
        
        // Scroll to phone input for better UX
        phoneInput.focus();
      }, 800);
    }

    // Modal functions
    function closeModal() {
      const modal = document.getElementById('successModal');
      modal.classList.remove('active');
    }

    function closeErrorModal() {
      const modal = document.getElementById('errorModal');
      modal.classList.remove('active');
    }

    function showError(message) {
      errorText.textContent = message;
      errorModal.classList.add('active');
    }

    // Close modal on outside click
    document.addEventListener('click', function(e) {
      const modal = document.getElementById('successModal');
      const errorModal = document.getElementById('errorModal');
      const addBeneficiaryModal = document.getElementById('addBeneficiaryModal');
      
      if (e.target === modal) {
        closeModal();
      }
      if (e.target === errorModal) {
        closeErrorModal();
      }
      if (e.target === addBeneficiaryModal) {
        closeAddBeneficiaryModal();
      }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
        closeErrorModal();
        closeAddBeneficiaryModal();
      }
    });

    // Add some visual feedback for quick actions
    document.querySelectorAll('.quick-action').forEach(action => {
      action.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      });
    });




      //otp


      document.addEventListener('DOMContentLoaded', function() {
      // Mobile menu and user dropdown functionality
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const closeMobileMenu = document.getElementById('closeMobileMenu');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
      const userProfileBtn = document.getElementById('userProfileBtn');
      const userDropdown = document.getElementById('userDropdown');

      // Mobile menu functionality
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.add('show');
          mobileMenuOverlay.classList.add('show');
          document.body.classList.add('menu-open');
        });

        closeMobileMenu.addEventListener('click', function() {
          closeMobileMenuFunc();
        });

        mobileMenuOverlay.addEventListener('click', function() {
          closeMobileMenuFunc();
        });

        function closeMobileMenuFunc() {
          mobileMenu.classList.remove('show');
          mobileMenuOverlay.classList.remove('show');
          document.body.classList.remove('menu-open');
        }

        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            closeMobileMenuFunc();
            userDropdown.classList.remove('show');
          }
        });

        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
          link.addEventListener('click', function() {
            closeMobileMenuFunc();
          });
        });
      }

      // User profile dropdown functionality
      if (userProfileBtn && userDropdown) {
        userProfileBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          userDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function(e) {
          if (!e.target.closest('.app-header-actions')) {
            userDropdown.classList.remove('show');
          }
        });

        userDropdown.addEventListener('click', function(e) {
          if (e.target.tagName === 'A') {
            userDropdown.classList.remove('show');
          }
        });
      }

      // OTP Verification Functionality
      const otpInputs = document.querySelectorAll('.otp-input');
      
      otpInputs.forEach((input, index) => {
        // Auto-tab to next input
        input.addEventListener('input', (e) => {
          if (e.target.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
          validateOTP();
        });

        // Handle backspace
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !e.target.value && index > 0) {
            otpInputs[index - 1].focus();
          }
        });

        // Handle paste
        input.addEventListener('paste', (e) => {
          e.preventDefault();
          const pasteData = e.clipboardData.getData('text').slice(0, 6);
          pasteData.split('').forEach((char, i) => {
            if (otpInputs[i]) {
              otpInputs[i].value = char;
            }
          });
          validateOTP();
          if (otpInputs[5]) {
            otpInputs[5].focus();
          }
        });
      });

      // Validate OTP function
      function validateOTP() {
        const submitBtn = document.getElementById('submitBtn');
        const otp = getOTP();
        submitBtn.disabled = otp.length !== 6;
      }

      // Get complete OTP
      function getOTP() {
        return Array.from(otpInputs).map(input => input.value).join('');
      }

      // Display message function
      function displayMessage(message, type = 'error') {
        const messageContainer = document.getElementById('message-container');
        messageContainer.innerHTML = `<div class="${type}-message">${message}</div>`;
        
        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
          setTimeout(() => {
            messageContainer.innerHTML = '';
          }, 3000);
        }
      }

      // Form submission handler
      document.getElementById('otpForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const otp = getOTP();
        const submitBtn = document.getElementById('submitBtn');
        
        if (otp.length !== 6) {
          displayMessage('Please enter all 6 digits of the OTP.');
          return;
        }

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verifying...';

        // Simulate OTP verification (replace with actual API call)
        setTimeout(() => {
          // This is a simulation - replace with actual verification logic
          if (otp === '123456') { // Default test OTP
            displayMessage('OTP verified successfully! Redirecting...', 'success');
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 2000);
          } else {
            displayMessage('Invalid OTP. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Verify OTP';
            
            // Clear OTP fields
            otpInputs.forEach(input => input.value = '');
            otpInputs[0].focus();
          }
        }, 1500);
      });

      // Resend OTP functionality
      let countdown = 60;
      let countdownInterval;

      function startTimer() {
        const timerElement = document.getElementById('countdown');
        const resendLink = document.getElementById('resendLink');
        const timerContainer = document.getElementById('timer');
        
        countdown = 60;
        timerContainer.style.display = 'block';
        resendLink.style.display = 'none';
        
        countdownInterval = setInterval(() => {
          countdown--;
          timerElement.textContent = countdown;
          
          if (countdown <= 0) {
            clearInterval(countdownInterval);
            timerContainer.style.display = 'none';
            resendLink.style.display = 'block';
          }
        }, 1000);
      }

      function resendOTP() {
        // Simulate resending OTP (replace with actual API call)
        displayMessage('New OTP has been sent to your email.', 'success');
        startTimer();
        
        // Clear existing OTP
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
        document.getElementById('submitBtn').disabled = true;
      }

      // Initialize OTP functionality
      startTimer();
      validateOTP();
      
      // Check for URL parameters for error messages
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get('error');
      if (error) {
        displayMessage(decodeURIComponent(error));
      }
    });



     // History Page Functionality
      document.addEventListener('DOMContentLoaded', function() {
        // Sample transaction data
        const transactions = [
          {
            id: 'TRX001',
            type: 'transfer',
            title: 'Transfer to John Doe',
            description: 'Internal transfer to savings account',
            amount: 50000,
            currency: 'NGN',
            fee: 0,
            status: 'completed',
            date: '2024-01-15T10:30:00',
            account: 'ngn',
            from: 'NGN Account - 00133867509',
            to: 'John Doe - 0234567890',
            reference: 'MSB202400001',
            receiptNo: 'RCP001234'
          },
          {
            id: 'TRX002',
            type: 'deposit',
            title: 'Salary Deposit',
            description: 'Monthly salary from Company Inc.',
            amount: 120000,
            currency: 'NGN',
            fee: 0,
            status: 'completed',
            date: '2024-01-10T09:15:00',
            account: 'ngn',
            from: 'Company Inc.',
            to: 'NGN Account - 00133867509',
            reference: 'SAL202401',
            receiptNo: 'RCP001235'
          },
          {
            id: 'TRX003',
            type: 'payment',
            title: 'Electricity Bill',
            description: 'Ikeja Electric payment',
            amount: -15000,
            currency: 'NGN',
            fee: 100,
            status: 'completed',
            date: '2024-01-08T14:20:00',
            account: 'ngn',
            from: 'NGN Account - 00133867509',
            to: 'Ikeja Electric',
            reference: 'IKJ2024001',
            receiptNo: 'RCP001236'
          },
          {
            id: 'TRX004',
            type: 'transfer',
            title: 'USD Transfer',
            description: 'Conversion and transfer to USD account',
            amount: 200,
            currency: 'USD',
            fee: 5,
            status: 'completed',
            date: '2024-01-05T11:45:00',
            account: 'usd',
            from: 'NGN Account - 00133867509',
            to: 'USD Account - 0017865309',
            reference: 'MSB202400002',
            receiptNo: 'RCP001237'
          },
          {
            id: 'TRX005',
            type: 'withdrawal',
            title: 'ATM Withdrawal',
            description: 'Cash withdrawal from GTBank ATM',
            amount: -20000,
            currency: 'NGN',
            fee: 35,
            status: 'completed',
            date: '2024-01-03T16:10:00',
            account: 'ngn',
            from: 'NGN Account - 00133867509',
            to: 'GTBank ATM - Ikeja',
            reference: 'ATM2024001',
            receiptNo: 'RCP001238'
          },
          {
            id: 'TRX006',
            type: 'deposit',
            title: 'Mobile Money Deposit',
            description: 'Funds from MTN Mobile Money',
            amount: 5000,
            currency: 'NGN',
            fee: 50,
            status: 'pending',
            date: '2024-01-02T13:25:00',
            account: 'ngn',
            from: 'MTN Mobile Money',
            to: 'NGN Account - 00133867509',
            reference: 'MM2024001'
          },
          {
            id: 'TRX007',
            type: 'payment',
            title: 'Netflix Subscription',
            description: 'Monthly entertainment subscription',
            amount: -3600,
            currency: 'NGN',
            fee: 0,
            status: 'completed',
            date: '2024-01-01T00:05:00',
            account: 'ngn',
            from: 'NGN Account - 00133867509',
            to: 'Netflix Inc.',
            reference: 'NFT2024001',
            receiptNo: 'RCP001239'
          },
          {
            id: 'TRX008',
            type: 'transfer',
            title: 'Failed Transfer',
            description: 'Transfer to unknown account',
            amount: -10000,
            currency: 'NGN',
            fee: 0,
            status: 'failed',
            date: '2023-12-28T15:40:00',
            account: 'ngn',
            from: 'NGN Account - 00133867509',
            to: 'Unknown Account',
            reference: 'MSB202300045'
          }
        ];

        // Elements
        const transactionList = document.getElementById('transactionList');
        const pagination = document.getElementById('pagination');
        const totalTransactions = document.getElementById('totalTransactions');
        const totalIncome = document.getElementById('totalIncome');
        const totalExpenses = document.getElementById('totalExpenses');
        const netFlow = document.getElementById('netFlow');
        
        // Filter elements
        const accountFilter = document.getElementById('accountFilter');
        const typeFilter = document.getElementById('typeFilter');
        const statusFilter = document.getElementById('statusFilter');
        const dateFrom = document.getElementById('dateFrom');
        const dateTo = document.getElementById('dateTo');
        const searchInput = document.getElementById('searchInput');
        const applyFilters = document.getElementById('applyFilters');
        const clearFilters = document.getElementById('clearFilters');
        
        // Modal elements
        const transactionModal = document.getElementById('transactionModal');
        const closeTransactionModal = document.getElementById('closeTransactionModal');
        const closeDetailsModal = document.getElementById('closeDetailsModal');
        const exportModal = document.getElementById('exportModal');
        const closeExportModal = document.getElementById('closeExportModal');
        const closeExport = document.getElementById('closeExport');
        const exportBtn = document.getElementById('exportBtn');
        const refreshBtn = document.getElementById('refreshBtn');
        
        // Transaction detail elements
        const detailId = document.getElementById('detailId');
        const detailReference = document.getElementById('detailReference');
        const detailDate = document.getElementById('detailDate');
        const detailStatus = document.getElementById('detailStatus');
        const detailType = document.getElementById('detailType');
        const detailAccount = document.getElementById('detailAccount');
        const detailAmount = document.getElementById('detailAmount');
        const detailFee = document.getElementById('detailFee');
        const detailTotal = document.getElementById('detailTotal');
        const detailCurrency = document.getElementById('detailCurrency');
        const detailFrom = document.getElementById('detailFrom');
        const detailTo = document.getElementById('detailTo');
        const detailDescription = document.getElementById('detailDescription');
        const transactionReceipt = document.getElementById('transactionReceipt');
        const detailReceiptNo = document.getElementById('detailReceiptNo');
        const detailAuthCode = document.getElementById('detailAuthCode');
        const printReceiptBtn = document.getElementById('printReceiptBtn');

        // Pagination
        let currentPage = 1;
        const transactionsPerPage = 5;
        let filteredTransactions = [...transactions];

        // Initialize the page
        function initializePage() {
          updateStatistics();
          renderTransactions();
          setupEventListeners();
          
          // Set default date range (last 30 days)
          const today = new Date();
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(today.getDate() - 30);
          
          dateFrom.valueAsDate = thirtyDaysAgo;
          dateTo.valueAsDate = today;
        }

        // Update statistics
        function updateStatistics() {
          const completedTransactions = transactions.filter(t => t.status === 'completed');
          const income = completedTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
          const expenses = completedTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
          const net = income - expenses;
          
          totalTransactions.textContent = transactions.length;
          totalIncome.textContent = formatCurrency('NGN', income);
          totalExpenses.textContent = formatCurrency('NGN', expenses);
          netFlow.textContent = formatCurrency('NGN', net);
        }

        // Render transactions
        function renderTransactions() {
          transactionList.innerHTML = '';
          
          if (filteredTransactions.length === 0) {
            transactionList.innerHTML = `
              <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <h3>No transactions found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            `;
            return;
          }
          
          // Calculate pagination
          const startIndex = (currentPage - 1) * transactionsPerPage;
          const endIndex = startIndex + transactionsPerPage;
          const pageTransactions = filteredTransactions.slice(startIndex, endIndex);
          
          pageTransactions.forEach(transaction => {
            const transactionElement = createTransactionElement(transaction);
            transactionList.appendChild(transactionElement);
          });
          
          renderPagination();
        }

        // Create transaction element
        function createTransactionElement(transaction) {
          const div = document.createElement('div');
          div.className = 'transaction-item';
          
          const isCredit = transaction.amount > 0;
          const amountClass = isCredit ? 'credit' : 'debit';
          const amountSign = isCredit ? '+' : '';
          const iconClass = getTransactionIcon(transaction.type);
          const statusClass = `status-${transaction.status}`;
          
          div.innerHTML = `
            <div class="transaction-icon ${iconClass}">
              <i class="${getTransactionIconClass(transaction.type)}"></i>
            </div>
            <div class="transaction-details">
              <div class="transaction-title">${transaction.title}</div>
              <div class="transaction-meta">
                ${transaction.description}
                <span class="transaction-status ${statusClass}">${transaction.status}</span>
              </div>
            </div>
            <div class="transaction-amount">
              <div class="amount ${amountClass}">
                ${amountSign}${formatCurrency(transaction.currency, Math.abs(transaction.amount))}
              </div>
              <div class="transaction-date">
                ${formatDate(transaction.date)}
              </div>
            </div>
          `;
          
          div.addEventListener('click', () => showTransactionDetails(transaction));
          return div;
        }

        // Render pagination
        function renderPagination() {
          const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
          
          if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
          }
          
          let paginationHTML = '';
          
          // Previous button
          paginationHTML += `
            <button class="pagination-prev" ${currentPage === 1 ? 'disabled' : ''}>
              <i class="fas fa-chevron-left"></i>
            </button>
          `;
          
          // Page numbers
          for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
              paginationHTML += `
                <button class="pagination-page ${i === currentPage ? 'active' : ''}">
                  ${i}
                </button>
              `;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
              paginationHTML += `<span>...</span>`;
            }
          }
          
          // Next button
          paginationHTML += `
            <button class="pagination-next" ${currentPage === totalPages ? 'disabled' : ''}>
              <i class="fas fa-chevron-right"></i>
            </button>
          `;
          
          pagination.innerHTML = paginationHTML;
          
          // Add event listeners
          pagination.querySelector('.pagination-prev').addEventListener('click', () => {
            if (currentPage > 1) {
              currentPage--;
              renderTransactions();
            }
          });
          
          pagination.querySelector('.pagination-next').addEventListener('click', () => {
            if (currentPage < totalPages) {
              currentPage++;
              renderTransactions();
            }
          });
          
          pagination.querySelectorAll('.pagination-page').forEach((button, index) => {
            button.addEventListener('click', () => {
              currentPage = index + 1;
              renderTransactions();
            });
          });
        }

        // Show transaction details
        function showTransactionDetails(transaction) {
          const isCredit = transaction.amount > 0;
          const amountSign = isCredit ? '+' : '';
          const totalAmount = Math.abs(transaction.amount) + transaction.fee;
          
          detailId.textContent = transaction.id;
          detailReference.textContent = transaction.reference;
          detailDate.textContent = formatDateTime(transaction.date);
          detailStatus.textContent = transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1);
          detailType.textContent = getTransactionTypeName(transaction.type);
          detailAccount.textContent = transaction.account.toUpperCase() + ' Account';
          detailAmount.textContent = `${amountSign}${formatCurrency(transaction.currency, Math.abs(transaction.amount))}`;
          detailFee.textContent = formatCurrency(transaction.currency, transaction.fee);
          detailTotal.textContent = formatCurrency(transaction.currency, isCredit ? Math.abs(transaction.amount) : totalAmount);
          detailCurrency.textContent = transaction.currency;
          detailFrom.textContent = transaction.from;
          detailTo.textContent = transaction.to;
          detailDescription.textContent = transaction.description;
          
          // Show receipt section only for completed transactions with receipt
          if (transaction.status === 'completed' && transaction.receiptNo) {
            transactionReceipt.style.display = 'block';
            detailReceiptNo.textContent = transaction.receiptNo;
            detailAuthCode.textContent = transaction.reference;
          } else {
            transactionReceipt.style.display = 'none';
          }
          
          transactionModal.classList.add('active');
        }

        // Apply filters
        function applyTransactionFilters() {
          filteredTransactions = transactions.filter(transaction => {
            // Account filter
            if (accountFilter.value !== 'all' && transaction.account !== accountFilter.value) {
              return false;
            }
            
            // Type filter
            if (typeFilter.value !== 'all' && transaction.type !== typeFilter.value) {
              return false;
            }
            
            // Status filter
            if (statusFilter.value !== 'all' && transaction.status !== statusFilter.value) {
              return false;
            }
            
            // Date filter
            const transactionDate = new Date(transaction.date);
            if (dateFrom.value && transactionDate < new Date(dateFrom.value)) {
              return false;
            }
            if (dateTo.value && transactionDate > new Date(dateTo.value + 'T23:59:59')) {
              return false;
            }
            
            // Search filter
            if (searchInput.value) {
              const searchTerm = searchInput.value.toLowerCase();
              const searchableText = `
                ${transaction.title} 
                ${transaction.description} 
                ${transaction.reference}
                ${transaction.from}
                ${transaction.to}
              `.toLowerCase();
              
              if (!searchableText.includes(searchTerm)) {
                return false;
              }
            }
            
            return true;
          });
          
          currentPage = 1;
          renderTransactions();
        }

        // Clear filters
        function clearTransactionFilters() {
          accountFilter.value = 'all';
          typeFilter.value = 'all';
          statusFilter.value = 'all';
          searchInput.value = '';
          
          // Reset to default date range (last 30 days)
          const today = new Date();
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(today.getDate() - 30);
          
          dateFrom.valueAsDate = thirtyDaysAgo;
          dateTo.valueAsDate = today;
          
          applyTransactionFilters();
        }

        // Setup event listeners
        function setupEventListeners() {
          // Filter events
          applyFilters.addEventListener('click', applyTransactionFilters);
          clearFilters.addEventListener('click', clearTransactionFilters);
          
          // Modal events
          closeTransactionModal.addEventListener('click', () => transactionModal.classList.remove('active'));
          closeDetailsModal.addEventListener('click', () => transactionModal.classList.remove('active'));
          closeExportModal.addEventListener('click', () => exportModal.classList.remove('active'));
          closeExport.addEventListener('click', () => exportModal.classList.remove('active'));
          
          // Action events
          exportBtn.addEventListener('click', () => exportModal.classList.add('active'));
          refreshBtn.addEventListener('click', () => {
            applyTransactionFilters();
            // Show refresh animation
            refreshBtn.querySelector('i').classList.add('fa-spin');
            setTimeout(() => {
              refreshBtn.querySelector('i').classList.remove('fa-spin');
            }, 1000);
          });
          
          printReceiptBtn.addEventListener('click', () => {
            window.print();
          });
          
          // Close modals when clicking outside
          document.addEventListener('click', function(e) {
            if (e.target === transactionModal) transactionModal.classList.remove('active');
            if (e.target === exportModal) exportModal.classList.remove('active');
          });
          
          // Export functionality
          document.getElementById('exportCSV').addEventListener('click', exportToCSV);
          document.getElementById('exportPDF').addEventListener('click', exportToPDF);
        }

        // Utility functions
        function formatCurrency(currency, amount) {
          const symbol = currency === 'USD' ? '$' : '₦';
          return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        }

        function formatDate(dateString) {
          const date = new Date(dateString);
          return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          });
        }

        function formatDateTime(dateString) {
          const date = new Date(dateString);
          return date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        }

        function getTransactionIcon(type) {
          const icons = {
            'transfer': 'transfer',
            'deposit': 'credit',
            'withdrawal': 'debit',
            'payment': 'bill'
          };
          return icons[type] || 'transfer';
        }

        function getTransactionIconClass(type) {
          const icons = {
            'transfer': 'fas fa-exchange-alt',
            'deposit': 'fas fa-arrow-down',
            'withdrawal': 'fas fa-arrow-up',
            'payment': 'fas fa-receipt'
          };
          return icons[type] || 'fas fa-exchange-alt';
        }

        function getTransactionTypeName(type) {
          const names = {
            'transfer': 'Transfer',
            'deposit': 'Deposit',
            'withdrawal': 'Withdrawal',
            'payment': 'Bill Payment'
          };
          return names[type] || 'Transaction';
        }

        function exportToCSV() {
          // In a real app, this would generate and download a CSV file
          alert('CSV export functionality would be implemented here');
          exportModal.classList.remove('active');
        }

        function exportToPDF() {
          // In a real app, this would generate and download a PDF file
          alert('PDF export functionality would be implemented here');
          exportModal.classList.remove('active');
        }

        // Initialize the page
        initializePage();

        // Existing header functionality
        const userProfileBtn = document.getElementById('userProfileBtn');
        const userDropdown = document.getElementById('userDropdown');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        // Desktop dropdown
        if (userProfileBtn && userDropdown) {
          userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
          });

          document.addEventListener('click', function(e) {
            if (!e.target.closest('.app-header-actions')) {
              userDropdown.classList.remove('show');
            }
          });

          userDropdown.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
              userDropdown.classList.remove('show');
            }
          });

          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              userDropdown.classList.remove('show');
            }
          });
        }

        // Mobile menu functionality
        if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('show');
            mobileMenuOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
          });

          closeMobileMenu.addEventListener('click', function() {
            closeMobileMenuFunc();
          });

          mobileMenuOverlay.addEventListener('click', function() {
            closeMobileMenuFunc();
          });

          function closeMobileMenuFunc() {
            mobileMenu.classList.remove('show');
            mobileMenuOverlay.classList.remove('show');
            document.body.style.overflow = '';
          }

          // Close on escape key
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              closeMobileMenuFunc();
            }
          });

          // Close when clicking on mobile nav links
          const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav a');
          mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
              closeMobileMenuFunc();
            });
          });
        }

        console.log('History page initialized successfully');
      });





      // Add Money Page Functionality
      document.addEventListener('DOMContentLoaded', function() {
        // Account data
        const accounts = {
          ngn: {
            accountNumber: '00133867509',
            balance: 125000.75,
            currency: 'NGN'
          },
          usd: {
            accountNumber: '0017865309',
            balance: 150.75,
            currency: 'USD'
          }
        };

        // Processing fees by payment method
        const processingFees = {
          card: { ngn: 100, usd: 0.5 },
          bank: { ngn: 0, usd: 0 },
          mobile: { ngn: 50, usd: 0.2 },
          ussd: { ngn: 10, usd: 0.1 }
        };

        // Elements
        const toAccountSelect = document.getElementById('toAccount');
        const amountInput = document.getElementById('amount');
        const amountCurrency = document.getElementById('amountCurrency');
        const toAccountBalance = document.getElementById('toAccountBalance');
        const summaryAmount = document.getElementById('summaryAmount');
        const summaryFee = document.getElementById('summaryFee');
        const summaryTotal = document.getElementById('summaryTotal');
        const addMoneyBtn = document.getElementById('addMoneyBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const viewHistoryBtn = document.getElementById('viewHistoryBtn');
        
        // Payment method elements
        const paymentMethods = document.querySelectorAll('.payment-method');
        const cardDetails = document.getElementById('cardDetails');
        const bankTransferInfo = document.getElementById('bankTransferInfo');
        const mobileMoneyDetails = document.getElementById('mobileMoneyDetails');
        const ussdDetails = document.getElementById('ussdDetails');
        
        // Card elements
        const savedCards = document.querySelectorAll('.saved-card');
        const cardNumberInput = document.getElementById('cardNumber');
        const expiryDateInput = document.getElementById('expiryDate');
        const cvvInput = document.getElementById('cvv');
        const cardNameInput = document.getElementById('cardName');
        
        // Bank transfer elements
        const bankAccountNumber = document.getElementById('bankAccountNumber');
        const bankReference = document.getElementById('bankReference');
        const copyButtons = document.querySelectorAll('.copy-button');
        
        // Mobile money elements
        const mobileMoneyProviders = document.querySelectorAll('.mobile-money-provider');
        const mobileNumberInput = document.getElementById('mobileNumber');
        const mobileProviderSelect = document.getElementById('mobileProvider');
        
        // Success modal elements
        const successModal = document.getElementById('successModal');
        const closeSuccessModal = document.getElementById('closeSuccessModal');
        const printReceiptBtn = document.getElementById('printReceiptBtn');
        const receiptReference = document.getElementById('receiptReference');
        const receiptDate = document.getElementById('receiptDate');
        const receiptToAccount = document.getElementById('receiptToAccount');
        const receiptMethod = document.getElementById('receiptMethod');
        const receiptAmount = document.getElementById('receiptAmount');
        const receiptFee = document.getElementById('receiptFee');
        const receiptTotal = document.getElementById('receiptTotal');
        const receiptNewBalance = document.getElementById('receiptNewBalance');

        let currentPaymentMethod = 'card';
        let currentToAccount = 'ngn';

        // Initialize the page
        function initializePage() {
          updateAccountBalances();
          updateTransactionSummary();
          setupEventListeners();
        }

        // Update account balance displays
        function updateAccountBalances() {
          const toAccount = toAccountSelect.value || 'ngn';
          currentToAccount = toAccount;
          
          if (accounts[toAccount]) {
            const account = accounts[toAccount];
            const symbol = account.currency === 'USD' ? '$' : '₦';
            toAccountBalance.textContent = `Current Balance: ${symbol}${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            amountCurrency.textContent = toAccount.toUpperCase();
            
            // Update bank account number for transfers
            bankAccountNumber.textContent = account.accountNumber;
          }
        }

        // Update transaction summary
        function updateTransactionSummary() {
          const amount = parseFloat(amountInput.value) || 0;
          const symbol = currentToAccount === 'usd' ? '$' : '₦';
          
          // Calculate fee based on payment method and currency
          const fee = processingFees[currentPaymentMethod][currentToAccount];
          const total = amount + fee;
          
          summaryAmount.textContent = `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          summaryFee.textContent = `${symbol}${fee.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          summaryTotal.textContent = `${symbol}${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        }

        // Setup event listeners
        function setupEventListeners() {
          // Account selection
          toAccountSelect.addEventListener('change', function() {
            updateAccountBalances();
            updateTransactionSummary();
          });

          // Amount input
          amountInput.addEventListener('input', updateTransactionSummary);

          // Payment method selection
          paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
              paymentMethods.forEach(m => m.classList.remove('active'));
              this.classList.add('active');
              currentPaymentMethod = this.dataset.method;
              showPaymentMethodDetails(currentPaymentMethod);
              updateTransactionSummary();
            });
          });

          // Saved card selection
          savedCards.forEach(card => {
            card.addEventListener('click', function() {
              savedCards.forEach(c => c.classList.remove('active'));
              this.classList.add('active');
            });
          });

          // Mobile money provider selection
          mobileMoneyProviders.forEach(provider => {
            provider.addEventListener('click', function() {
              mobileMoneyProviders.forEach(p => p.classList.remove('active'));
              this.classList.add('active');
              
              // Update the select dropdown to match
              const providerName = this.querySelector('span').textContent;
              mobileProviderSelect.value = getProviderValue(providerName);
            });
          });

          // Copy buttons
          copyButtons.forEach(button => {
            button.addEventListener('click', function() {
              const text = this.dataset.text;
              copyToClipboard(text);
              
              // Show feedback
              const originalHTML = this.innerHTML;
              this.innerHTML = '<i class="fas fa-check"></i>';
              this.style.color = '#28a745';
              
              setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.color = '';
              }, 2000);
            });
          });

          // Form submission
          addMoneyBtn.addEventListener('click', handleAddMoney);
          cancelBtn.addEventListener('click', resetForm);
          viewHistoryBtn.addEventListener('click', () => window.location.href = 'history.html');

          // Modal controls
          closeSuccessModal.addEventListener('click', () => successModal.classList.remove('active'));
          printReceiptBtn.addEventListener('click', printReceipt);

          // Format card number input
          cardNumberInput.addEventListener('input', function() {
            this.value = formatCardNumber(this.value);
          });

          // Format expiry date input
          expiryDateInput.addEventListener('input', function() {
            this.value = formatExpiryDate(this.value);
          });

          // Close modals when clicking outside
          document.addEventListener('click', function(e) {
            if (e.target === successModal) successModal.classList.remove('active');
          });
        }

        // Show payment method details based on selection
        function showPaymentMethodDetails(method) {
          // Hide all payment method details
          cardDetails.style.display = 'none';
          bankTransferInfo.style.display = 'none';
          mobileMoneyDetails.style.display = 'none';
          ussdDetails.style.display = 'none';
          
          // Show selected payment method details
          switch(method) {
            case 'card':
              cardDetails.style.display = 'block';
              break;
            case 'bank':
              bankTransferInfo.style.display = 'block';
              break;
            case 'mobile':
              mobileMoneyDetails.style.display = 'block';
              break;
            case 'ussd':
              ussdDetails.style.display = 'block';
              break;
          }
        }

        // Handle add money submission
        function handleAddMoney() {
          // Form validation
          let isValid = true;
          let errorMessage = '';
          
          const toAccount = toAccountSelect.value;
          const amount = parseFloat(amountInput.value);
          
          if (!toAccount) {
            isValid = false;
            errorMessage = 'Please select destination account.';
          } else if (!amount || amount <= 0) {
            isValid = false;
            errorMessage = 'Please enter a valid amount.';
          }
          
          // Additional validation based on payment method
          switch(currentPaymentMethod) {
            case 'card':
              const isUsingSavedCard = document.querySelector('.saved-card.active') !== null;
              if (!isUsingSavedCard) {
                if (!cardNumberInput.value || cardNumberInput.value.replace(/\s/g, '').length !== 16) {
                  isValid = false;
                  errorMessage = 'Please enter a valid 16-digit card number.';
                } else if (!expiryDateInput.value || !isValidExpiryDate(expiryDateInput.value)) {
                  isValid = false;
                  errorMessage = 'Please enter a valid expiry date (MM/YY).';
                } else if (!cvvInput.value || cvvInput.value.length !== 3) {
                  isValid = false;
                  errorMessage = 'Please enter a valid 3-digit CVV.';
                } else if (!cardNameInput.value) {
                  isValid = false;
                  errorMessage = 'Please enter the name on card.';
                }
              }
              break;
              
            case 'mobile':
              if (!mobileNumberInput.value || mobileNumberInput.value.length < 10) {
                isValid = false;
                errorMessage = 'Please enter a valid mobile number.';
              }
              break;
          }
          
          if (!isValid) {
            alert(errorMessage);
            return;
          }
          
          // Process payment
          processPayment(toAccount, amount);
        }

        // Process the payment
        function processPayment(toAccount, amount) {
          // Calculate fee and total
          const fee = processingFees[currentPaymentMethod][toAccount];
          const totalAmount = amount + fee;
          
          // Simulate API call delay
          setTimeout(() => {
            // Update account balance
            accounts[toAccount].balance += amount;
            
            // Show success modal with receipt
            showSuccessModal(toAccount, amount, fee);
          }, 1500);
        }

        // Show success modal with receipt
        function showSuccessModal(toAccount, amount, fee) {
          const symbol = toAccount === 'usd' ? '$' : '₦';
          const reference = 'MSB' + Date.now().toString().slice(-8);
          const date = new Date().toLocaleString();
          const total = amount + fee;
          const newBalance = accounts[toAccount].balance;
          
          // Update receipt details
          receiptReference.textContent = reference;
          receiptDate.textContent = date;
          receiptToAccount.textContent = `${toAccount.toUpperCase()} Account - ${accounts[toAccount].accountNumber}`;
          receiptMethod.textContent = getPaymentMethodName(currentPaymentMethod);
          receiptAmount.textContent = `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          receiptFee.textContent = `${symbol}${fee.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          receiptTotal.textContent = `${symbol}${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          receiptNewBalance.textContent = `${symbol}${newBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          
          successModal.classList.add('active');
        }

        // Utility functions
        function formatCardNumber(value) {
          const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
          const matches = v.match(/\d{4,16}/g);
          const match = matches && matches[0] || '';
          const parts = [];
          
          for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
          }
          
          if (parts.length) {
            return parts.join(' ');
          } else {
            return value;
          }
        }

        function formatExpiryDate(value) {
          const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
          if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
          }
          return value;
        }

        function isValidExpiryDate(value) {
          if (!value || value.length !== 5) return false;
          
          const [month, year] = value.split('/');
          if (!month || !year || month.length !== 2 || year.length !== 2) return false;
          
          const monthNum = parseInt(month, 10);
          const yearNum = parseInt('20' + year, 10);
          
          if (monthNum < 1 || monthNum > 12) return false;
          
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1;
          
          if (yearNum < currentYear) return false;
          if (yearNum === currentYear && monthNum < currentMonth) return false;
          
          return true;
        }

        function getProviderValue(providerName) {
          const providers = {
            'MTN Mobile Money': 'mtn',
            'Airtel Money': 'airtel',
            '9Mobile Cash': '9mobile',
            'Glo Money': 'glo'
          };
          return providers[providerName] || 'mtn';
        }

        function getPaymentMethodName(method) {
          const methods = {
            'card': 'Debit Card',
            'bank': 'Bank Transfer',
            'mobile': 'Mobile Money',
            'ussd': 'USSD'
          };
          return methods[method] || 'Unknown';
        }

        function copyToClipboard(text) {
          navigator.clipboard.writeText(text).catch(err => {
            console.error('Failed to copy: ', err);
          });
        }

        // Print receipt
        function printReceipt() {
          const receiptContent = document.querySelector('.receipt').innerHTML;
          const originalContent = document.body.innerHTML;
          
          document.body.innerHTML = receiptContent;
          window.print();
          document.body.innerHTML = originalContent;
          
          // Re-initialize event listeners after printing
          setupEventListeners();
        }

        // Reset form
        function resetForm() {
          toAccountSelect.value = 'ngn';
          amountInput.value = '';
          updateAccountBalances();
          updateTransactionSummary();
          
          // Reset payment method to card
          paymentMethods.forEach(m => m.classList.remove('active'));
          paymentMethods[0].classList.add('active');
          currentPaymentMethod = 'card';
          showPaymentMethodDetails('card');
          
          // Reset card selection
          savedCards.forEach(c => c.classList.remove('active'));
          savedCards[0].classList.add('active');
          
          // Reset form inputs
          cardNumberInput.value = '';
          expiryDateInput.value = '';
          cvvInput.value = '';
          cardNameInput.value = '';
          mobileNumberInput.value = '';
          mobileProviderSelect.value = 'mtn';
        }

        // Initialize the page
        initializePage();

        // Existing header functionality
        const userProfileBtn = document.getElementById('userProfileBtn');
        const userDropdown = document.getElementById('userDropdown');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        // Desktop dropdown
        if (userProfileBtn && userDropdown) {
          userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
          });

          document.addEventListener('click', function(e) {
            if (!e.target.closest('.app-header-actions')) {
              userDropdown.classList.remove('show');
            }
          });

          userDropdown.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
              userDropdown.classList.remove('show');
            }
          });

          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              userDropdown.classList.remove('show');
            }
          });
        }

        // Mobile menu functionality
        if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('show');
            mobileMenuOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
          });

          closeMobileMenu.addEventListener('click', function() {
            closeMobileMenuFunc();
          });

          mobileMenuOverlay.addEventListener('click', function() {
            closeMobileMenuFunc();
          });

          function closeMobileMenuFunc() {
            mobileMenu.classList.remove('show');
            mobileMenuOverlay.classList.remove('show');
            document.body.style.overflow = '';
          }

          // Close on escape key
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              closeMobileMenuFunc();
            }
          });

          // Close when clicking on mobile nav links
          const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav a');
          mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
              closeMobileMenuFunc();
            });
          });
        }

        console.log('Add Money page initialized successfully');
      });




      // Transfer Page Functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Account data
    const accounts = {
      ngn: {
        accountNumber: '00133867509',
        balance: 125000.75,
        currency: 'NGN'
      },
      usd: {
        accountNumber: '0017865309',
        balance: 1500.75,
        currency: 'USD'
      }
    };

    // Transfer fees in respective currencies
    const transferFees = {
      internal: { ngn: 0, usd: 0 },
      domestic: { ngn: 0, usd: 0 },
      international: { ngn: 2500, usd: 5 },
      mobile: { ngn: 0, usd: 0 }
    };

    // Elements
    const transferOptions = document.querySelectorAll('.transfer-option');
    const fromAccountSelect = document.getElementById('fromAccount');
    const toAccountSelect = document.getElementById('toAccount');
    const amountInput = document.getElementById('amount');
    const currencySelect = document.getElementById('currency');
    const descriptionInput = document.getElementById('description');
    const destinationField = document.getElementById('destinationField');
    const fromAccountBalance = document.getElementById('fromAccountBalance');
    const amountCurrency = document.getElementById('amountCurrency');
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryFee = document.getElementById('summaryFee');
    const summaryTotal = document.getElementById('summaryTotal');
    const transferForm = document.getElementById('transferForm');
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const printReceiptBtn = document.getElementById('printReceiptBtn');
    const downloadReceiptBtn = document.getElementById('downloadReceiptBtn'); // ADDED THIS
    const cancelBtn = document.getElementById('cancelBtn');
    const viewHistoryBtn = document.getElementById('viewHistoryBtn');
    const transferBtn = document.getElementById('transferBtn');
    const statusMessage = document.getElementById('statusMessage');
    
    // Receipt elements
    const receiptReference = document.getElementById('receiptReference');
    const receiptTransactionNo = document.getElementById('receiptTransactionNo');
    const receiptDate = document.getElementById('receiptDate');
    const receiptFromAccount = document.getElementById('receiptFromAccount');
    const receiptToAccount = document.getElementById('receiptToAccount');
    const receiptBankDetails = document.getElementById('receiptBankDetails');
    const receiptAmount = document.getElementById('receiptAmount');
    const receiptFee = document.getElementById('receiptFee');
    const receiptTotal = document.getElementById('receiptTotal');
    const receiptDescription = document.getElementById('receiptDescription');
    
    // Other banks elements
    const otherBanksFields = document.getElementById('otherBanksFields');
    const bankNameSelect = document.getElementById('bankName');
    const accountNumberInput = document.getElementById('accountNumber');
    const accountNameInput = document.getElementById('accountName');
    
    // International transfer elements
    const internationalFields = document.getElementById('internationalFields');
    const recipientCountrySelect = document.getElementById('recipientCountry');
    const recipientBankInput = document.getElementById('recipientBank');
    const swiftCodeInput = document.getElementById('swiftCode');
    const ibanInput = document.getElementById('iban');
    const recipientNameInput = document.getElementById('recipientName');
    const recipientAddressInput = document.getElementById('recipientAddress');
    
    // Miles Bank transfer elements
    const milesBankFields = document.getElementById('milesBankFields');
    const milesAccountNumberInput = document.getElementById('milesAccountNumber');
    const milesAccountNameInput = document.getElementById('milesAccountName');
    
    // Beneficiary elements
    const beneficiarySection = document.getElementById('beneficiarySection');
    const beneficiaryToggle = document.getElementById('beneficiaryToggle');
    const beneficiaryList = document.getElementById('beneficiaryList');
    const beneficiaryItems = document.querySelectorAll('.beneficiary-item');
    const saveBeneficiarySection = document.getElementById('saveBeneficiarySection');
    const saveAsBeneficiaryCheckbox = document.getElementById('saveAsBeneficiary');
    const beneficiaryNicknameGroup = document.getElementById('beneficiaryNicknameGroup');
    const beneficiaryNicknameInput = document.getElementById('beneficiaryNickname');

    let currentTransferType = 'internal';
    let exchangeRate = 1500;
    let isUsingBeneficiary = false;
    let isProcessing = false;

    // Initialize the page
    function initializePage() {
      updateAccountBalances();
      updateTransferSummary();
      setupEventListeners();
      updateToAccountOptions();
    }

    // Update account balance displays
    function updateAccountBalances() {
      const fromAccount = fromAccountSelect.value;
      if (fromAccount && accounts[fromAccount]) {
        const account = accounts[fromAccount];
        const symbol = account.currency === 'USD' ? '$' : '₦';
        fromAccountBalance.textContent = `Available: ${symbol}${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        
        currencySelect.value = fromAccount;
        amountCurrency.textContent = fromAccount.toUpperCase();
      }
    }

    // Update transfer summary
    function updateTransferSummary() {
      const amount = parseFloat(amountInput.value) || 0;
      const fromAccount = fromAccountSelect.value;
      const currency = fromAccount || 'ngn';
      const symbol = currency === 'usd' ? '$' : '₦';
      
      const fee = transferFees[currentTransferType][currency] || 0;
      const total = amount + fee;
      
      summaryAmount.textContent = `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      summaryFee.textContent = `${symbol}${fee.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      summaryTotal.textContent = `${symbol}${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }

    // Setup event listeners
    function setupEventListeners() {
      // Transfer type selection
      transferOptions.forEach(option => {
        option.addEventListener('click', function() {
          transferOptions.forEach(opt => opt.classList.remove('active'));
          this.classList.add('active');
          currentTransferType = this.dataset.type;
          updateDestinationField();
          updateTransferSummary();
          clearAllErrors();
        });
      });

      // Form inputs
      fromAccountSelect.addEventListener('change', function() {
        updateAccountBalances();
        updateToAccountOptions();
        updateTransferSummary();
        clearError('fromAccountGroup');
      });

      amountInput.addEventListener('input', function() {
        updateTransferSummary();
        clearError('amountGroup');
      });

      // Account number validation for manual input
      accountNumberInput.addEventListener('input', function() {
        clearError('accountNumberGroup');
        if (this.value.length === 10) {
          accountNameInput.value = 'John Doe';
        } else {
          accountNameInput.value = '';
        }
      });

      // Miles Bank account number validation
      milesAccountNumberInput.addEventListener('input', function() {
        clearError('milesAccountNumberGroup');
        if (this.value.length === 10) {
          milesAccountNameInput.value = 'Sarah Johnson';
        } else {
          milesAccountNameInput.value = '';
        }
      });

      // Beneficiary toggle
      beneficiaryToggle.addEventListener('click', function() {
        beneficiaryToggle.classList.toggle('active');
        beneficiaryList.classList.toggle('active');
      });

      // Beneficiary selection
      beneficiaryItems.forEach(item => {
        item.addEventListener('click', function() {
          beneficiaryItems.forEach(ben => ben.classList.remove('active'));
          this.classList.add('active');
          
          const accountNumber = this.dataset.account;
          const bankName = this.dataset.bank;
          const accountName = this.dataset.name;
          
          accountNumberInput.value = accountNumber;
          accountNameInput.value = accountName;
          bankNameSelect.value = bankName.toLowerCase().replace(' ', '');
          
          isUsingBeneficiary = true;
          saveBeneficiarySection.style.display = 'none';
        });
      });

      // Save beneficiary checkbox
      saveAsBeneficiaryCheckbox.addEventListener('change', function() {
        beneficiaryNicknameGroup.style.display = this.checked ? 'block' : 'none';
      });

      // Form submission - FIXED: Use both click and submit handlers
      transferBtn.addEventListener('click', handleTransfer);
      transferForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleTransfer(e);
      });

      // Modal controls - FIXED: Added missing event listeners
      closeSuccessModal.addEventListener('click', () => {
        successModal.classList.remove('active');
        resetForm();
      });
      
      printReceiptBtn.addEventListener('click', printReceipt);
      downloadReceiptBtn.addEventListener('click', downloadReceiptAsPDF); // ADDED THIS
      cancelBtn.addEventListener('click', resetForm);
      viewHistoryBtn.addEventListener('click', () => window.location.href = 'history.html');

      // Close modals when clicking outside
      document.addEventListener('click', function(e) {
        if (e.target === successModal) {
          successModal.classList.remove('active');
          resetForm();
        }
      });
    }

    // Update destination field based on transfer type
    function updateDestinationField() {
      const label = destinationField.querySelector('label');
      const select = destinationField.querySelector('select');
      
      // Reset all special fields
      otherBanksFields.style.display = 'none';
      internationalFields.style.display = 'none';
      milesBankFields.style.display = 'none';
      beneficiarySection.style.display = 'none';
      saveBeneficiarySection.style.display = 'none';
      beneficiaryList.classList.remove('active');
      beneficiaryToggle.classList.remove('active');
      beneficiaryItems.forEach(item => item.classList.remove('active'));
      saveAsBeneficiaryCheckbox.checked = false;
      beneficiaryNicknameGroup.style.display = 'none';
      isUsingBeneficiary = false;
      
      switch(currentTransferType) {
        case 'internal':
          label.textContent = 'To Account';
          select.innerHTML = `
            <option value="">Select account</option>
            <option value="ngn">NGN Account - 00133867509</option>
            <option value="usd">USD Account - 0017865309</option>
          `;
          destinationField.style.display = 'block';
          break;
          
        case 'domestic':
          destinationField.style.display = 'none';
          otherBanksFields.style.display = 'block';
          beneficiarySection.style.display = 'block';
          saveBeneficiarySection.style.display = 'block';
          break;
          
        case 'international':
          destinationField.style.display = 'none';
          internationalFields.style.display = 'block';
          saveBeneficiarySection.style.display = 'block';
          break;
          
        case 'mobile':
          destinationField.style.display = 'none';
          milesBankFields.style.display = 'block';
          saveBeneficiarySection.style.display = 'block';
          break;
      }
      
      updateToAccountOptions();
    }

    // Update to account options based on from account selection
    function updateToAccountOptions() {
      const fromAccount = fromAccountSelect.value;
      if (fromAccount) {
        const options = toAccountSelect.querySelectorAll('option');
        options.forEach(option => {
          if (option.value === fromAccount) {
            option.disabled = true;
            option.style.display = 'none';
          } else {
            option.disabled = false;
            option.style.display = 'block';
          }
        });
      }
    }

    // Handle transfer submission
    function handleTransfer(e) {
      e.preventDefault();
      
      if (isProcessing) {
        console.log('Transfer already in progress');
        return;
      }
      
      console.log('Transfer initiated, type:', currentTransferType);
      
      // Form validation
      let isValid = true;
      
      const fromAccount = fromAccountSelect.value;
      const amount = parseFloat(amountInput.value);
      
      // Basic validation
      if (!fromAccount) {
        showError('fromAccountGroup', 'Please select source account.');
        isValid = false;
      } else if (!amount || amount <= 0) {
        showError('amountGroup', 'Please enter a valid amount.');
        isValid = false;
      } else if (amount > accounts[fromAccount].balance) {
        showError('amountGroup', 'Insufficient balance in selected account.');
        isValid = false;
      }
      
      // Additional validation based on transfer type
      switch(currentTransferType) {
        case 'internal':
          const toAccount = toAccountSelect.value;
          if (!toAccount) {
            showError('destinationField', 'Please select destination account.');
            isValid = false;
          } else if (toAccount === fromAccount) {
            showError('destinationField', 'Cannot transfer to the same account.');
            isValid = false;
          }
          break;
          
        case 'domestic':
          if (!bankNameSelect.value) {
            showError('bankNameGroup', 'Please select a bank.');
            isValid = false;
          }
          if (!accountNumberInput.value || accountNumberInput.value.length !== 10) {
            showError('accountNumberGroup', 'Please enter a valid 10-digit account number.');
            isValid = false;
          }
          break;
          
        case 'international':
          if (!recipientCountrySelect.value) {
            showError('recipientCountryGroup', 'Please select a country.');
            isValid = false;
          }
          if (!recipientBankInput.value) {
            showError('recipientBankGroup', 'Please enter recipient bank name.');
            isValid = false;
          }
          if (!swiftCodeInput.value) {
            showError('swiftCodeGroup', 'Please enter SWIFT code.');
            isValid = false;
          }
          if (!ibanInput.value) {
            showError('ibanGroup', 'Please enter IBAN or account number.');
            isValid = false;
          }
          if (!recipientNameInput.value) {
            showError('recipientNameGroup', 'Please enter recipient name.');
            isValid = false;
          }
          break;
          
        case 'mobile':
          if (!milesAccountNumberInput.value || milesAccountNumberInput.value.length !== 10) {
            showError('milesAccountNumberGroup', 'Please enter a valid 10-digit account number.');
            isValid = false;
          }
          break;
      }
      
      if (!isValid) {
        console.log('Form validation failed');
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      console.log('Form validation passed, processing transfer...');
      processTransfer(fromAccount, amount);
    }

    // Process the transfer
    function processTransfer(fromAccount, amount) {
      const fee = transferFees[currentTransferType][fromAccount] || 0;
      const totalAmount = amount + fee;
      
      console.log('Processing transfer:', { fromAccount, amount, fee, totalAmount });
      
      if (totalAmount > accounts[fromAccount].balance) {
        showError('amountGroup', 'Insufficient balance to cover transfer amount and fee.');
        return;
      }
      
      setLoadingState(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Transfer simulation completed');
        
        // Update balances
        accounts[fromAccount].balance -= totalAmount;
        updateAccountBalances(); // Update the displayed balance
        
        showStatusMessage('success', 'Transfer completed successfully!');
        showSuccessModal(fromAccount, amount, fee);
        setLoadingState(false);
        
      }, 1500);
    }

    // Show status message
    function showStatusMessage(type, message) {
      statusMessage.textContent = message;
      statusMessage.className = `status-message ${type}`;
      
      if (type === 'success') {
        setTimeout(() => {
          statusMessage.className = 'status-message';
        }, 5000);
      }
    }

    // Show success modal with receipt - FIXED THIS FUNCTION
    function showSuccessModal(fromAccount, amount, fee) {
      const symbol = fromAccount === 'usd' ? '$' : '₦';
      const reference = 'MSB' + Date.now().toString().slice(-8);
      const transactionNo = 'TRX' + Math.floor(100000000 + Math.random() * 900000000);
      const date = new Date().toLocaleString();
      
      console.log('Showing success modal with receipt');
      
      // Update receipt details
      receiptReference.textContent = reference;
      receiptTransactionNo.textContent = transactionNo;
      receiptDate.textContent = date;
      receiptFromAccount.textContent = `${fromAccount.toUpperCase()} Account - ${accounts[fromAccount].accountNumber}`;
      
      // Set recipient details based on transfer type
      let toAccountDetails = '';
      let bankDetails = '';
      
      switch(currentTransferType) {
        case 'internal':
          const toAccount = toAccountSelect.value;
          toAccountDetails = `${toAccount.toUpperCase()} Account - ${accounts[toAccount].accountNumber}`;
          bankDetails = 'Miles SmartBank';
          break;
        case 'domestic':
          toAccountDetails = `${accountNameInput.value} - ${accountNumberInput.value}`;
          bankDetails = `${bankNameSelect.options[bankNameSelect.selectedIndex].text}`;
          break;
        case 'international':
          toAccountDetails = `${recipientNameInput.value} - ${ibanInput.value}`;
          bankDetails = `${recipientBankInput.value} (${swiftCodeInput.value})`;
          break;
        case 'mobile':
          toAccountDetails = `${milesAccountNameInput.value} - ${milesAccountNumberInput.value}`;
          bankDetails = 'Miles SmartBank';
          break;
      }
      
      receiptToAccount.textContent = toAccountDetails;
      receiptBankDetails.textContent = bankDetails;
      receiptAmount.textContent = `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      receiptFee.textContent = `${symbol}${fee.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      receiptTotal.textContent = `${symbol}${(amount + fee).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      receiptDescription.textContent = descriptionInput.value || '-';
      
      // Show the modal
      successModal.classList.add('active');
      console.log('Success modal should be visible now');
    }

    // Print receipt
    function printReceipt() {
      const receipt = document.getElementById('printableReceipt');
      const receiptClone = receipt.cloneNode(true);
      
      const printWindow = window.open('', '_blank');
      const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Transaction Receipt - Miles SmartBank</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
            }
            .receipt {
              max-width: 400px;
              margin: 0 auto;
              border: 2px solid #000080;
              border-radius: 8px;
              padding: 20px;
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 2px solid #000080;
            }
            .receipt-header h3 {
              color: #000080;
              margin: 0 0 5px 0;
              font-size: 24px;
            }
            .receipt-header p {
              margin: 0;
              color: #666;
            }
            .receipt-details {
              margin-bottom: 20px;
            }
            .receipt-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              padding-bottom: 8px;
              border-bottom: 1px solid #eee;
            }
            .receipt-item.total {
              font-weight: bold;
              font-size: 16px;
              border-top: 2px solid #000080;
              padding-top: 12px;
              margin-top: 12px;
              color: #000080;
            }
            .receipt-footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 15px;
              border-top: 1px solid #eee;
              font-size: 12px;
              color: #666;
            }
            @media print {
              body {
                padding: 0;
              }
              .receipt {
                border: none;
                box-shadow: none;
                margin: 0;
                max-width: none;
              }
            }
          </style>
        </head>
        <body>
          ${receipt.outerHTML}
        </body>
        </html>
      `;
      
      printWindow.document.write(receiptHTML);
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }

    // Download receipt as PDF
    function downloadReceiptAsPDF() {
      const receipt = document.getElementById('printableReceipt');
      
      const printWindow = window.open('', '_blank');
      const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Transaction Receipt - ${receiptReference.textContent}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 40px;
              color: #333;
              background: white;
            }
            .receipt {
              max-width: 500px;
              margin: 0 auto;
              border: 2px solid #000080;
              border-radius: 12px;
              padding: 30px;
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 25px;
              padding-bottom: 20px;
              border-bottom: 2px solid #000080;
            }
            .receipt-header h3 {
              color: #000080;
              margin: 0 0 8px 0;
              font-size: 28px;
            }
            .receipt-header p {
              margin: 0;
              color: #666;
              font-size: 16px;
            }
            .receipt-details {
              margin-bottom: 25px;
            }
            .receipt-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding-bottom: 12px;
              border-bottom: 1px solid #eee;
              font-size: 14px;
            }
            .receipt-item.total {
              font-weight: bold;
              font-size: 18px;
              border-top: 2px solid #000080;
              padding-top: 15px;
              margin-top: 15px;
              color: #000080;
            }
            .receipt-footer {
              text-align: center;
              margin-top: 25px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          ${receipt.outerHTML}
        </body>
        </html>
      `;
      
      printWindow.document.write(receiptHTML);
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }

    // Reset form
    function resetForm() {
      transferForm.reset();
      updateAccountBalances();
      updateTransferSummary();
      beneficiaryList.classList.remove('active');
      beneficiaryToggle.classList.remove('active');
      beneficiaryItems.forEach(item => item.classList.remove('active'));
      saveAsBeneficiaryCheckbox.checked = false;
      beneficiaryNicknameGroup.style.display = 'none';
      isUsingBeneficiary = false;
      clearAllErrors();
      statusMessage.className = 'status-message';
    }

    // Error handling functions
    function showError(elementId, message) {
      const element = document.getElementById(elementId);
      element.classList.add('error');
      const errorMessage = element.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.textContent = message;
      }
    }

    function clearError(elementId) {
      const element = document.getElementById(elementId);
      element.classList.remove('error');
    }

    function clearAllErrors() {
      const errorElements = document.querySelectorAll('.form-group.error');
      errorElements.forEach(element => {
        element.classList.remove('error');
      });
    }

    // Loading state management
    function setLoadingState(loading) {
      isProcessing = loading;
      transferBtn.disabled = loading;
      
      if (loading) {
        transferBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        transferBtn.classList.add('loading');
      } else {
        transferBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Proceed with Transfer';
        transferBtn.classList.remove('loading');
      }
    }

    // Initialize the page
    initializePage();

    // Existing header functionality
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userDropdown = document.getElementById('userDropdown');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    // Desktop dropdown
    if (userProfileBtn && userDropdown) {
      userProfileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
      });

      document.addEventListener('click', function(e) {
        if (!e.target.closest('.app-header-actions')) {
          userDropdown.classList.remove('show');
        }
      });
    }

    // Mobile menu functionality
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('show');
        mobileMenuOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      });

      closeMobileMenu.addEventListener('click', function() {
        closeMobileMenuFunc();
      });

      mobileMenuOverlay.addEventListener('click', function() {
        closeMobileMenuFunc();
      });

      function closeMobileMenuFunc() {
        mobileMenu.classList.remove('show');
        mobileMenuOverlay.classList.remove('show');
        document.body.style.overflow = '';
      }
    }

    console.log('Transfer page initialized successfully');
  });


   // Profile Page Functionality
      document.addEventListener('DOMContentLoaded', function() {
        // Elements
        const editProfileBtn = document.getElementById('editProfileBtn');
        const downloadProfileBtn = document.getElementById('downloadProfileBtn');
        const avatarEditBtn = document.querySelector('.avatar-edit');
        
        // Modal elements
        const editProfileModal = document.getElementById('editProfileModal');
        const closeEditModal = document.getElementById('closeEditModal');
        const cancelEdit = document.getElementById('cancelEdit');
        const saveProfile = document.getElementById('saveProfile');
        
        const changePasswordModal = document.getElementById('changePasswordModal');
        const closePasswordModal = document.getElementById('closePasswordModal');
        const cancelPassword = document.getElementById('cancelPassword');
        const savePassword = document.getElementById('savePassword');

        // Edit buttons throughout the page
        const editButtons = document.querySelectorAll('.detail-actions .btn');

        // Initialize the page
        function initializePage() {
          setupEventListeners();
          setupToggleSwitches();
        }

        // Setup event listeners
        function setupEventListeners() {
          // Main action buttons
          editProfileBtn.addEventListener('click', () => editProfileModal.classList.add('active'));
          downloadProfileBtn.addEventListener('click', downloadProfileData);
          avatarEditBtn.addEventListener('click', changeProfilePhoto);
          
          // Modal close events
          closeEditModal.addEventListener('click', () => editProfileModal.classList.remove('active'));
          cancelEdit.addEventListener('click', () => editProfileModal.classList.remove('active'));
          
          closePasswordModal.addEventListener('click', () => changePasswordModal.classList.remove('active'));
          cancelPassword.addEventListener('click', () => changePasswordModal.classList.remove('active'));
          
          // Form submissions
          saveProfile.addEventListener('click', handleProfileSave);
          savePassword.addEventListener('click', handlePasswordChange);
          
          // Dynamic edit buttons
          editButtons.forEach(button => {
            button.addEventListener('click', function(e) {
              e.preventDefault();
              const field = this.closest('.detail-group').querySelector('.detail-label').textContent;
              handleFieldEdit(field, this);
            });
          });
          
          // Security action buttons
          document.querySelectorAll('.security-actions .btn').forEach(button => {
            button.addEventListener('click', function() {
              const action = this.textContent.trim();
              const securityItem = this.closest('.security-item');
              const title = securityItem.querySelector('.security-title').textContent;
              handleSecurityAction(action, title);
            });
          });
          
          // Close modals when clicking outside
          document.addEventListener('click', function(e) {
            if (e.target === editProfileModal) editProfileModal.classList.remove('active');
            if (e.target === changePasswordModal) changePasswordModal.classList.remove('active');
          });
        }

        // Setup toggle switches
        function setupToggleSwitches() {
          const toggleSwitches = document.querySelectorAll('.toggle-switch input');
          toggleSwitches.forEach(toggle => {
            toggle.addEventListener('change', function() {
              const notificationTitle = this.closest('.notification-item').querySelector('.notification-title').textContent;
              const isEnabled = this.checked;
              
              // Simulate API call to save preference
              setTimeout(() => {
                console.log(`Notification "${notificationTitle}" ${isEnabled ? 'enabled' : 'disabled'}`);
              }, 300);
            });
          });
        }

        // Handle profile save
        function handleProfileSave() {
          const fullName = document.getElementById('fullName').value;
          const email = document.getElementById('email').value;
          const phone = document.getElementById('phone').value;
          const dob = document.getElementById('dob').value;
          const gender = document.getElementById('gender').value;
          const address = document.getElementById('address').value;
          
          // Validate form
          if (!fullName || !email || !phone) {
            alert('Please fill in all required fields');
            return;
          }
          
          // Simulate API call
          setTimeout(() => {
            alert('Profile information updated successfully!');
            editProfileModal.classList.remove('active');
            
            // Update the profile display (in a real app, this would refresh from server)
            document.querySelector('.avatar').textContent = getInitials(fullName);
            document.querySelector('.profile-avatar h3').textContent = fullName;
          }, 1000);
        }

        // Handle password change
        function handlePasswordChange() {
          const currentPassword = document.getElementById('currentPassword').value;
          const newPassword = document.getElementById('newPassword').value;
          const confirmPassword = document.getElementById('confirmPassword').value;
          
          if (!currentPassword || !newPassword || !confirmPassword) {
            alert('Please fill in all password fields');
            return;
          }
          
          if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
          }
          
          if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
          }
          
          // Simulate API call
          setTimeout(() => {
            alert('Password updated successfully!');
            changePasswordModal.classList.remove('active');
            
            // Clear form
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
          }, 1000);
        }

        // Handle field-specific edits
        function handleFieldEdit(field, button) {
          switch(field) {
            case 'Email Address':
              if (button.textContent.includes('Verify')) {
                verifyEmail();
              } else {
                editEmail();
              }
              break;
            case 'Phone Number':
              if (button.textContent.includes('Verify')) {
                verifyPhone();
              } else {
                editPhone();
              }
              break;
            case 'Password':
              changePasswordModal.classList.add('active');
              break;
            default:
              editProfileModal.classList.add('active');
          }
        }

        // Handle security actions
        function handleSecurityAction(action, title) {
          switch(action) {
            case 'Manage':
              if (title === 'Two-Factor Authentication') {
                manageTwoFactorAuth();
              } else if (title === 'Login Alerts') {
                manageLoginAlerts();
              } else if (title === 'Active Sessions') {
                manageActiveSessions();
              }
              break;
            case 'Enable':
              if (title === 'Biometric Login') {
                enableBiometricLogin();
              }
              break;
            case 'Change':
              if (title === 'Password') {
                changePasswordModal.classList.add('active');
              }
              break;
          }
        }

        // Utility functions
        function getInitials(name) {
          return name.split(' ').map(word => word[0]).join('').toUpperCase();
        }

        function downloadProfileData() {
          // In a real app, this would generate and download a PDF or CSV
          alert('Profile data export functionality would be implemented here. This would download your personal information in your preferred format.');
        }

        function changeProfilePhoto() {
          // In a real app, this would open a file picker
          alert('Profile photo change functionality would be implemented here. You would be able to upload a new photo from your device.');
        }

        function verifyEmail() {
          alert('Email verification process would be initiated here. A verification code would be sent to your email address.');
        }

        function verifyPhone() {
          alert('Phone verification process would be initiated here. A verification code would be sent to your phone via SMS.');
        }

        function editEmail() {
          alert('Email editing functionality would be implemented here with proper validation and verification.');
        }

        function editPhone() {
          alert('Phone number editing functionality would be implemented here with proper validation and verification.');
        }

        function manageTwoFactorAuth() {
          alert('Two-factor authentication management would open here, allowing you to configure authentication methods.');
        }

        function manageLoginAlerts() {
          alert('Login alerts management would open here, allowing you to configure notification preferences.');
        }

        function manageActiveSessions() {
          alert('Active sessions management would open here, showing all logged-in devices and allowing you to log out remotely.');
        }

        function enableBiometricLogin() {
          alert('Biometric login setup would be initiated here, guiding you through the enrollment process.');
        }

        // Initialize the page
        initializePage();

        // Existing header functionality
        const userProfileBtn = document.getElementById('userProfileBtn');
        const userDropdown = document.getElementById('userDropdown');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        // Desktop dropdown
        if (userProfileBtn && userDropdown) {
          userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
          });

          document.addEventListener('click', function(e) {
            if (!e.target.closest('.app-header-actions')) {
              userDropdown.classList.remove('show');
            }
          });

          userDropdown.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
              userDropdown.classList.remove('show');
            }
          });

          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              userDropdown.classList.remove('show');
            }
          });
        }

        // Mobile menu functionality
        if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('show');
            mobileMenuOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
          });

          closeMobileMenu.addEventListener('click', function() {
            closeMobileMenuFunc();
          });

          mobileMenuOverlay.addEventListener('click', function() {
            closeMobileMenuFunc();
          });

          function closeMobileMenuFunc() {
            mobileMenu.classList.remove('show');
            mobileMenuOverlay.classList.remove('show');
            document.body.style.overflow = '';
          }

          // Close on escape key
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              closeMobileMenuFunc();
            }
          });

          // Close when clicking on mobile nav links
          const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav a');
          mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
              closeMobileMenuFunc();
            });
          });
        }

        console.log('Profile page initialized successfully');
      });



       // TV Plans Configuration 
    const TV_PROVIDER_PLANS = {
        "DSTV": [
            { id: "1", name: "DStv Premium", price: 21000.0 },
            { id: "2", name: "DStv Compact Plus", price: 12500.0 },
            { id: "3", name: "DStv Compact", price: 8100.0 },
            { id: "4", name: "DStv Confam", price: 5300.0 },
            { id: "5", name: "DStv Yanga", price: 2500.0 },
            { id: "6", name: "DStv Padi", price: 1900.0 }
        ],
        "GOTV": [
            { id: "1", name: "GOtv Max", price: 3700.0 },
            { id: "2", name: "GOtv Jolli", price: 2600.0 },
            { id: "3", name: "GOtv Jinja", price: 1800.0 },
            { id: "4", name: "GOtv Smallie", price: 900.0 },
            { id: "5", name: "GOtv Supa", price: 5400.0 }
        ],
        "STARTIMES": [
            { id: "1", name: "Nova", price: 1300.0 },
            { id: "2", name: "Basic", price: 2300.0 },
            { id: "3", name: "Smart", price: 3300.0 },
            { id: "4", name: "Classic", price: 4300.0 },
            { id: "5", name: "Super", price: 6300.0 }
        ]
    };

    // Hamburger Menu and User Profile Functionality
    document.addEventListener('DOMContentLoaded', function() {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const closeMobileMenu = document.getElementById('closeMobileMenu');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
      const userProfileBtn = document.getElementById('userProfileBtn');
      const userDropdown = document.getElementById('userDropdown');

      // Mobile menu functionality
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.add('show');
          mobileMenuOverlay.classList.add('show');
          document.body.classList.add('menu-open');
        });

        closeMobileMenu.addEventListener('click', function() {
          closeMobileMenuFunc();
        });

        mobileMenuOverlay.addEventListener('click', function() {
          closeMobileMenuFunc();
        });

        function closeMobileMenuFunc() {
          mobileMenu.classList.remove('show');
          mobileMenuOverlay.classList.remove('show');
          document.body.classList.remove('menu-open');
        }

        // Close on escape key
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            closeMobileMenuFunc();
            userDropdown.classList.remove('show');
          }
        });

        // Close when clicking on mobile nav links
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
          link.addEventListener('click', function() {
            closeMobileMenuFunc();
          });
        });
      }

      // User profile dropdown functionality
      if (userProfileBtn && userDropdown) {
        userProfileBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          userDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.app-header-actions')) {
            userDropdown.classList.remove('show');
          }
        });

        // Close dropdown when clicking on dropdown items
        userDropdown.addEventListener('click', function(e) {
          if (e.target.tagName === 'A') {
            userDropdown.classList.remove('show');
          }
        });
      }

      // TV Form Functionality
      const providerSelect = document.getElementById("provider");
      const smartcardInput = document.getElementById("smartcard");
      const smartcardError = document.getElementById("smartcardError");
      const subscriptionPlansContainer = document.getElementById("subscriptionPlans");
      const form = document.getElementById("tvForm");
      const submitBtn = document.getElementById("submitBtn");
      const modal = document.getElementById("successModal");
      const successText = document.getElementById("successText");
      const selectedPlanIdInput = document.getElementById('selectedPlanId');
      const selectedPlanNameInput = document.getElementById('selectedPlanName');
      const selectedPlanPriceInput = document.getElementById('selectedPlanPrice');

      // Validate smartcard number (10-11 digits)
      smartcardInput.addEventListener("input", () => {
        const value = smartcardInput.value.replace(/\D/g, "");
        smartcardInput.value = value;
        if (value.length < 10 || value.length > 11) {
          smartcardError.textContent = "Smartcard number must be between 10 and 11 digits.";
        } else {
          smartcardError.textContent = "";
        }
      });

      // Load subscription plans when provider changes
      providerSelect.addEventListener("change", () => {
        const provider = providerSelect.value;
        if (!provider) {
          subscriptionPlansContainer.innerHTML = "";
          return;
        }

        const plans = TV_PROVIDER_PLANS[provider];
        if (!plans) return;

        subscriptionPlansContainer.innerHTML = "";
        plans.forEach(plan => {
          const planElement = document.createElement('div');
          planElement.className = 'subscription-plan';
          planElement.setAttribute('data-plan-id', plan.id);
          planElement.innerHTML = `
            <div class="plan-info">
              <div class="plan-name">${plan.name}</div>
              <div class="plan-price">₦${plan.price.toLocaleString()}</div>
            </div>
          `;
          
          planElement.addEventListener('click', function() {
            // Remove selected class from all plans
            document.querySelectorAll('.subscription-plan').forEach(p => p.classList.remove('selected'));
            // Add selected class to clicked plan
            this.classList.add('selected');
            // Set the selected plan values
            selectedPlanIdInput.value = plan.id;
            selectedPlanNameInput.value = plan.name;
            selectedPlanPriceInput.value = plan.price;
          });
          
          subscriptionPlansContainer.appendChild(planElement);
        });
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const provider = providerSelect.value;
        const smartcard = smartcardInput.value;
        const planId = selectedPlanIdInput.value;
        const planName = selectedPlanNameInput.value;
        const planPrice = selectedPlanPriceInput.value;
        const paymentMethod = document.getElementById("paymentMethod").value;

        if (smartcard.length < 10 || smartcard.length > 11) {
          smartcardError.textContent = "Please enter a valid smartcard number.";
          return;
        }

        if (!provider) {
          alert("Please select a service provider.");
          return;
        }

        if (!planId) {
          alert("Please select a subscription plan.");
          return;
        }

        if (!paymentMethod) {
          alert("Please select a payment method.");
          return;
        }

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;

        setTimeout(() => {
          const paymentMethodText = {
            'wallet': 'Miles Wallet',
            'card': 'Credit/Debit Card',
            'bank': 'Bank Transfer',
            'auto': 'Auto Renewal'
          }[paymentMethod];

          successText.textContent = `Your ${planName} subscription (₦${parseFloat(planPrice).toLocaleString()}) for ${provider} (Smartcard: ${smartcard}) was successful. Payment method: ${paymentMethodText}.`;
          modal.classList.add("active");

          // reset form
          form.reset();
          subscriptionPlansContainer.innerHTML = "";
          selectedPlanIdInput.value = '';
          selectedPlanNameInput.value = '';
          selectedPlanPriceInput.value = '';
          submitBtn.innerHTML = '<i class="fas fa-tv"></i> Pay Subscription';
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
        }, 2000);
      });

      console.log('TV subscription payment system initialized successfully');
    });

    // Quick payment functions
    function quickPayment(type) {
      const providerSelect = document.getElementById("provider");
      
      if (type === 'dstv') {
        providerSelect.value = 'DSTV';
        providerSelect.dispatchEvent(new Event('change'));
      } else if (type === 'gotv') {
        providerSelect.value = 'GOTV';
        providerSelect.dispatchEvent(new Event('change'));
      }
      
      // Scroll to provider for better UX
      providerSelect.focus();
    }

    // Modal functions
    function closeModal() {
      const modal = document.getElementById('successModal');
      modal.classList.remove('active');
    }

    // Close modal on outside click
    document.addEventListener('click', function(e) {
      const modal = document.getElementById('successModal');
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Add some visual feedback for quick actions
    document.querySelectorAll('.quick-action').forEach(action => {
      action.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      });
    });




     //electricity
 // Hamburger Menu and User Profile Functionality
    document.addEventListener('DOMContentLoaded', function() {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const closeMobileMenu = document.getElementById('closeMobileMenu');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
      const userProfileBtn = document.getElementById('userProfileBtn');
      const userDropdown = document.getElementById('userDropdown');

      // Mobile menu functionality
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.add('show');
          mobileMenuOverlay.classList.add('show');
          document.body.classList.add('menu-open');
        });

        closeMobileMenu.addEventListener('click', function() {
          closeMobileMenuFunc();
        });

        mobileMenuOverlay.addEventListener('click', function() {
          closeMobileMenuFunc();
        });

        function closeMobileMenuFunc() {
          mobileMenu.classList.remove('show');
          mobileMenuOverlay.classList.remove('show');
          document.body.classList.remove('menu-open');
        }

        // Close on escape key
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            closeMobileMenuFunc();
            userDropdown.classList.remove('show');
          }
        });

        // Close when clicking on mobile nav links
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
          link.addEventListener('click', function() {
            closeMobileMenuFunc();
          });
        });
      }

      // User profile dropdown functionality
      if (userProfileBtn && userDropdown) {
        userProfileBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          userDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.app-header-actions')) {
            userDropdown.classList.remove('show');
          }
        });

        // Close dropdown when clicking on dropdown items
        userDropdown.addEventListener('click', function(e) {
          if (e.target.tagName === 'A') {
            userDropdown.classList.remove('show');
          }
        });
      }

      // Electricity Form Functionality
      const form = document.getElementById("electricForm");
      const submitBtn = document.getElementById("submitBtn");
      const meterInput = document.getElementById("meter");
      const meterError = document.getElementById("meterError");
      const modal = document.getElementById("successModal");
      const successText = document.getElementById("successText");
      const amountPresets = document.querySelectorAll('.amount-preset');
      const amountInput = document.getElementById('amount');

      // Amount preset selection
      amountPresets.forEach(preset => {
        preset.addEventListener('click', function() {
          // Remove selected class from all presets
          amountPresets.forEach(p => p.classList.remove('selected'));
          // Add selected class to clicked preset
          this.classList.add('selected');
          // Set the amount value
          const amount = this.getAttribute('data-amount');
          amountInput.value = amount;
        });
      });

      // Validate meter number (10-11 digits for Nigerian meters)
      meterInput.addEventListener("input", () => {
        const value = meterInput.value.replace(/\D/g, "");
        meterInput.value = value;
        if (value.length < 10 || value.length > 11) {
          meterError.textContent = "Meter number must be between 10 and 11 digits.";
        } else {
          meterError.textContent = "";
        }
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const meter = meterInput.value;
        const amount = amountInput.value;
        const company = document.getElementById("company").value;
        const paymentMethod = document.getElementById("paymentMethod").value;

        if (meter.length < 10 || meter.length > 11) {
          meterError.textContent = "Please enter a valid meter number.";
          return;
        }

        if (!company) {
          alert("Please select a power distribution company.");
          return;
        }

        if (!paymentMethod) {
          alert("Please select a payment method.");
          return;
        }

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;

        setTimeout(() => {
          const paymentMethodText = {
            'wallet': 'Miles Wallet',
            'card': 'Credit/Debit Card',
            'bank': 'Bank Transfer',
            'auto': 'Auto Pay Setup'
          }[paymentMethod];

          successText.textContent = `Your payment of ₦${amount} to ${company} (Meter No: ${meter}) was successful. Payment method: ${paymentMethodText}.`;
          modal.classList.add("active");

          // reset form
          form.reset();
          amountPresets.forEach(p => p.classList.remove('selected'));
          submitBtn.innerHTML = '<i class="fas fa-bolt"></i> Pay Electricity Bill';
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
        }, 2000);
      });

      console.log('Electricity payment system initialized successfully');
    });

    // Quick payment functions
    function quickPayment(type) {
      const amountInput = document.getElementById('amount');
      
      if (type === 'current') {
        amountInput.value = '5000';
        // Auto-select standard amount preset
        const standardPreset = document.querySelector('.amount-preset[data-amount="5000"]');
        if (standardPreset) {
          standardPreset.click();
        }
      } else if (type === 'auto') {
        amountInput.value = '';
        // Set payment method to auto pay
        document.getElementById('paymentMethod').value = 'auto';
        alert('Auto Pay setup will be configured for future bills.');
      }
      
      // Scroll to amount input for better UX
      amountInput.focus();
    }

    // Modal functions
    function closeModal() {
      const modal = document.getElementById('successModal');
      modal.classList.remove('active');
    }

    // Close modal on outside click
    document.addEventListener('click', function(e) {
      const modal = document.getElementById('successModal');
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Add some visual feedback for quick actions
    document.querySelectorAll('.quick-action').forEach(action => {
      action.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      });
    });
