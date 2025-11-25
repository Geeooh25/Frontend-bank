 document.addEventListener("DOMContentLoaded", () => {
      // DOM Elements
      const mainLogin = document.getElementById("auth-section");
      const supportPage = document.getElementById("support-page");
      const supportLink = document.getElementById("support-link");
      const backToLogin = document.getElementById("back-to-login");
      
      const loginForm = document.getElementById("login-form");
      const signupForm = document.getElementById("signup-form");
      const loginBtn = document.getElementById("login-btn");
      const signupBtn = document.getElementById("signup-btn");
      const goSignup = document.getElementById("go-signup");
      const goLogin = document.getElementById("go-login");
      const passwordStrengthBar = document.getElementById("password-strength-bar");
      const signupPassword = document.getElementById("signup-password");
      const biometricLogin = document.getElementById("biometric-login");
      const useBiometric = document.getElementById("use-biometric");
      const mobileInput = document.getElementById("mobile");
      const genderSelect = document.getElementById("gender");

      // Mobile Number Formatting
      function formatMobileNumber(input) {
        let numbers = input.value.replace(/\D/g, '');
        
        if (numbers.length > 0) {
          if (numbers.length <= 3) {
            input.value = '(' + numbers;
          } else if (numbers.length <= 6) {
            input.value = '(' + numbers.substring(0, 3) + ') ' + numbers.substring(3);
          } else {
            input.value = '(' + numbers.substring(0, 3) + ') ' + numbers.substring(3, 6) + '-' + numbers.substring(6, 10);
          }
        }
      }

      // Mobile input event listeners
      mobileInput.addEventListener('input', function() {
        formatMobileNumber(this);
      });

      mobileInput.addEventListener('keydown', function(e) {
        if ([46, 8, 9, 27, 13].includes(e.keyCode) ||
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
          return;
        }
        
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
        }
      });

      // Gender Select Validation
      genderSelect.addEventListener('change', function() {
        if (this.value) {
          this.classList.add('valid');
          this.classList.remove('error');
        } else {
          this.classList.remove('valid');
        }
      });

      // Check Biometric Support
      function checkBiometricSupport() {
        if (window.PublicKeyCredential) {
          const hasBiometric = localStorage.getItem('biometricEnabled');
          if (hasBiometric === 'true') {
            biometricLogin.style.display = 'block';
          }
        }
      }

      // Page Navigation
      function showSupportPage() {
        mainLogin.style.display = 'none';
        supportPage.style.display = 'block';
      }

      function showLoginPage() {
        supportPage.style.display = 'none';
        mainLogin.style.display = 'flex';
      }

      // Event Listeners for Page Navigation
      supportLink.addEventListener("click", (e) => {
        e.preventDefault();
        showSupportPage();
      });

      backToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        showLoginPage();
      });

      // Form Toggle Functions
      function showLogin() {
        signupForm.classList.remove("show");
        loginForm.classList.add("show");
        loginBtn.classList.add("active");
        signupBtn.classList.remove("active");
      }

      function showSignup() {
        loginForm.classList.remove("show");
        signupForm.classList.add("show");
        signupBtn.classList.add("active");
        loginBtn.classList.remove("active");
      }

      // Event Listeners for Form Toggle
      loginBtn.addEventListener("click", showLogin);
      signupBtn.addEventListener("click", showSignup);
      goSignup.addEventListener("click", (e) => { e.preventDefault(); showSignup(); });
      goLogin.addEventListener("click", (e) => { e.preventDefault(); showLogin(); });

      // Biometric Authentication
      useBiometric.addEventListener("click", () => {
        handleBiometricLogin();
      });

      document.getElementById("enable-biometric").addEventListener("change", function() {
        if (this.checked) {
          enrollBiometric();
        } else {
          localStorage.removeItem('biometricEnabled');
        }
      });

      function handleBiometricLogin() {
        setLoadingState(true);
        
        setTimeout(() => {
          setLoadingState(false);
          alert("✅ Biometric authentication successful! Welcome back.");
          loginForm.reset();
        }, 2000);
      }

      function enrollBiometric() {
        setLoadingState(true);
        
        setTimeout(() => {
          setLoadingState(false);
          localStorage.setItem('biometricEnabled', 'true');
          alert("✅ Biometric authentication enrolled successfully!");
        }, 2500);
      }

      function setLoadingState(loading) {
        const buttons = document.querySelectorAll('.btn-submit');
        buttons.forEach(btn => {
          if (loading) {
            btn.disabled = true;
            btn.classList.add('btn-loading');
          } else {
            btn.disabled = false;
            btn.classList.remove('btn-loading');
          }
        });
      }

      // Password Strength Meter
      signupPassword.addEventListener("input", function() {
        const password = this.value;
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 10;
        if (/[a-z]/.test(password)) strength += 15;
        if (/[A-Z]/.test(password)) strength += 15;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        
        strength = Math.min(strength, 100);
        passwordStrengthBar.style.width = strength + "%";
        
        if (strength < 40) {
          passwordStrengthBar.style.backgroundColor = "#ef4444";
        } else if (strength < 70) {
          passwordStrengthBar.style.backgroundColor = "#f59e0b";
        } else {
          passwordStrengthBar.style.backgroundColor = "#10b981";
        }
      });

      // Password Toggle
      document.querySelectorAll(".toggle-password").forEach((toggle) => {
        toggle.addEventListener("click", () => {
          const targetId = toggle.getAttribute("data-target");
          const input = document.getElementById(targetId);
          const icon = toggle.querySelector("i");
          
          if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
          } else {
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
          }
        });
      });

      // Mobile Number Validation
      mobileInput.addEventListener("blur", function() {
        const numbers = this.value.replace(/\D/g, '');
        if (numbers.length === 10) {
          document.getElementById("mobile-success").style.display = "flex";
          this.classList.add("valid");
          this.classList.remove("error");
        } else if (this.value) {
          this.classList.add("error");
          this.classList.remove("valid");
          document.getElementById("mobile-success").style.display = "none";
        }
      });

      // BVN Validation
      document.getElementById("bvn").addEventListener("blur", function() {
        if (this.value && /^[0-9]{11}$/.test(this.value)) {
          document.getElementById("bvn-success").style.display = "flex";
          this.classList.add("valid");
          this.classList.remove("error");
        } else if (this.value) {
          this.classList.add("error");
          this.classList.remove("valid");
          document.getElementById("bvn-success").style.display = "none";
        }
      });

      // Support Page Button Handlers
      document.querySelectorAll('.support-card .contact-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const card = this.closest('.support-card');
          const service = card.querySelector('h3').textContent;
          alert(`🚀 Connecting you to ${service}...`);
        });
      });

      // Forgot Password
      document.getElementById("forgot-password").addEventListener("click", (e) => {
        e.preventDefault();
        alert("📧 Password reset instructions will be sent to your email.");
      });

      // Form Submission Handlers
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email");
        const password = document.getElementById("login-password");

        if (email.value && password.value) {
          setLoadingState(true);
          await new Promise(resolve => setTimeout(resolve, 1500));
          setLoadingState(false);
          alert("✅ Welcome back to Miles SmartBank!");
          loginForm.reset();
        }
      });

      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const email = document.getElementById("signup-email");
        const gender = document.getElementById("gender");
        const mobile = document.getElementById("mobile");
        const password = document.getElementById("signup-password");
        const agreeTerms = document.getElementById("agree-terms");

        if (!firstName.value || !lastName.value || !email.value || !gender.value || !mobile.value || !password.value || !agreeTerms.checked) {
          alert("❌ Please fill all required fields marked with *");
          return;
        }

        const mobileClean = mobile.value.replace(/\D/g, '');
        if (mobileClean.length !== 10) {
          alert("❌ Please enter a valid 10-digit US mobile number");
          mobile.focus();
          return;
        }

        setLoadingState(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoadingState(false);
        
        const enableBiometric = document.getElementById("enable-biometric").checked;
        if (enableBiometric) {
          localStorage.setItem('biometricEnabled', 'true');
        }
        
        alert("🎉 Account created successfully! Welcome to Miles SmartBank.");
        signupForm.reset();
        passwordStrengthBar.style.width = "0%";
        showLogin();
      });

      // Initialize biometric check
      checkBiometricSupport();

      console.log("🚀 Miles SmartBank - Enhanced Banking Experience Loaded!");
    });



//exchange

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

      // Exchange functionality
      const rates = {
        USD: { NGN: 1550, EUR: 0.92, GBP: 0.78, JPY: 148.5, CAD: 1.35 },
        NGN: { USD: 0.00065, EUR: 0.00059, GBP: 0.00050, JPY: 0.096, CAD: 0.00087 },
        EUR: { USD: 1.08, NGN: 1700, GBP: 0.85, JPY: 161.5, CAD: 1.47 },
        GBP: { USD: 1.28, NGN: 2000, EUR: 1.18, JPY: 190.5, CAD: 1.73 },
        JPY: { USD: 0.0067, NGN: 10.42, EUR: 0.0062, GBP: 0.0053, CAD: 0.0091 },
        CAD: { USD: 0.74, NGN: 1148, EUR: 0.68, GBP: 0.58, JPY: 110.2 }
      };

      const amountEl = document.getElementById("amount");
      const fromEl = document.getElementById("fromCurrency");
      const toEl = document.getElementById("toCurrency");
      const resultDisplay = document.getElementById("resultDisplay");
      const rateDisplay = document.getElementById("rateDisplay");
      const historyList = document.getElementById("historyList");

      let history = JSON.parse(localStorage.getItem("exchangeHistory") || "[]");

      // Initialize history display
      renderHistory();

      document.getElementById("swapBtn").addEventListener("click", () => {
        const temp = fromEl.value;
        fromEl.value = toEl.value;
        toEl.value = temp;
        updateRateDisplay();
      });

      document.getElementById("convertBtn").addEventListener("click", () => {
        const amount = parseFloat(amountEl.value);
        const from = fromEl.value;
        const to = toEl.value;

        if (!amount || amount <= 0) {
          resultDisplay.innerHTML = "Please enter a valid amount.";
          rateDisplay.textContent = "";
          return;
        }

        if (from === to) {
          resultDisplay.innerHTML = "Cannot convert the same currency.";
          rateDisplay.textContent = "";
          return;
        }

        const rate = rates[from]?.[to] || 1;
        const converted = (amount * rate).toFixed(2);
        
        // Format numbers with commas
        const formattedAmount = new Intl.NumberFormat().format(amount);
        const formattedConverted = new Intl.NumberFormat().format(converted);
        
        resultDisplay.innerHTML = `${formattedAmount} ${from} = <strong>${formattedConverted} ${to}</strong>`;
        rateDisplay.textContent = `Exchange rate: 1 ${from} = ${rate} ${to}`;

        const now = new Date().toLocaleString();
        const record = { from, to, amount, converted, rate, date: now };

        history.unshift(record);
        if (history.length > 5) history.pop();
        localStorage.setItem("exchangeHistory", JSON.stringify(history));

        renderHistory();
      });

      // Update rate display when currencies change
      fromEl.addEventListener('change', updateRateDisplay);
      toEl.addEventListener('change', updateRateDisplay);

      function updateRateDisplay() {
        const from = fromEl.value;
        const to = toEl.value;
        const rate = rates[from]?.[to];
        
        if (rate && from !== to) {
          rateDisplay.textContent = `Current rate: 1 ${from} = ${rate} ${to}`;
        } else {
          rateDisplay.textContent = "";
        }
      }

      function renderHistory() {
        if (history.length === 0) {
          historyList.innerHTML = '<div class="no-history">No conversion history yet</div>';
          return;
        }
        
        historyList.innerHTML = history
          .map(
            (h) => `
            <div class="history-item">
              <div class="history-amount">${h.amount} ${h.from} → ${h.converted} ${h.to}</div>
              <div class="history-details">
                <div class="history-rate">Rate: ${h.rate}</div>
                <div class="history-date">${h.date}</div>
              </div>
            </div>
          `
          )
          .join("");
      }

      // Initialize rate display
      updateRateDisplay();
    });

    // Quick conversion functions
    function setQuickConversion(from, to) {
      document.getElementById('fromCurrency').value = from;
      document.getElementById('toCurrency').value = to;
      document.getElementById('amount').focus();
      
      // Update rate display
      const rates = {
        USD: { NGN: 1550, EUR: 0.92, GBP: 0.78, JPY: 148.5, CAD: 1.35 },
        NGN: { USD: 0.00065, EUR: 0.00059, GBP: 0.00050, JPY: 0.096, CAD: 0.00087 },
        EUR: { USD: 1.08, NGN: 1700, GBP: 0.85, JPY: 161.5, CAD: 1.47 },
        GBP: { USD: 1.28, NGN: 2000, EUR: 1.18, JPY: 190.5, CAD: 1.73 }
      };
      
      const rate = rates[from]?.[to];
      const rateDisplay = document.getElementById("rateDisplay");
      if (rate) {
        rateDisplay.textContent = `Current rate: 1 ${from} = ${rate} ${to}`;
      }
    }
    