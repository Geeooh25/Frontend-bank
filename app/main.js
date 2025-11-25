// Account Management and Transfer Functionality
      document.addEventListener('DOMContentLoaded', function() {
        // Account data with separate account numbers and balances
        const accounts = {
          ngn: {
            accountNumber: '00133867509',
            balance: 125000.75,
            isActive: true
          },
          usd: {
            accountNumber: '5517865309',
            balance: 0,
            isActive: false
          }
        };
        
        // Transfer amounts in both currencies
        const transfers = {
          ngn: {
            transfer1: 55000,
            transfer2: 12000,
            transfer3: 7000
          },
          usd: {
            transfer1: 0,
            transfer2: 0,
            transfer3: 0
          }
        };
        
        // Payment amounts in both currencies
        const payments = {
          ngn: {
            payment1: 2110,
            payment2: 5621,
            payment3: 3473
          },
          usd: {
            payment1: 0,
            payment2: 0,
            payment3: 0
          }
        };
        
        let currentAccount = 'ngn';
        let exchangeRate = 1600; // 1 USD = 1600 NGN (example rate)
        
        // Elements
        const balanceAmount = document.getElementById('serviceBalanceAmount');
        const accountNumberElement = document.getElementById('accountNumber');
        const copyButton = document.getElementById('copyAccountNumber');
        const filterText = document.getElementById('filterText');
        const transferBetweenAccountsBtn = document.getElementById('transferBetweenAccounts');
        
        // Account management elements
        const ngnAccountBtn = document.getElementById('ngnAccountBtn');
        const usdAccountBtn = document.getElementById('usdAccountBtn');
        const openAccountBtn = document.getElementById('openAccountBtn');
        
        // Hide toggle elements
        const hideAccountToggle = document.getElementById('hideAccountToggle');
        const hideBalanceToggle = document.getElementById('hideBalanceToggle');
        
        // Transfer modal elements
        const transferModal = document.getElementById('transferModal');
        const closeTransferModal = document.getElementById('closeTransferModal');
        const cancelTransfer = document.getElementById('cancelTransfer');
        const transferForm = document.getElementById('transferForm');
        const fromAccountSelect = document.getElementById('fromAccount');
        const toAccountSelect = document.getElementById('toAccount');
        const amountInput = document.getElementById('amount');
        const currencySelect = document.getElementById('currency');
        const convertedAmountInput = document.getElementById('convertedAmount');
        
        // Hide toggle state
        let isAccountHidden = false;
        let isBalanceHidden = false;
        
        // Copy account number functionality
        function copyToClipboard(text) {
          navigator.clipboard.writeText(text).then(() => {
            // Show feedback
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.style.color = '#28a745';
            
            setTimeout(() => {
              copyButton.innerHTML = originalText;
              copyButton.style.color = '';
            }, 2000);
          }).catch(err => {
            console.error('Failed to copy: ', err);
          });
        }
        
        // Function to fetch current exchange rate
        async function fetchExchangeRate() {
          try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            exchangeRate = data.rates.NGN;
            console.log('Current USD/NGN rate:', exchangeRate);
          } catch (error) {
            console.error('Failed to fetch exchange rate, using fallback:', error);
            // Fallback rate if the API fails
            exchangeRate = 1500;
          }
        }
        
        // Function to update balance display
        function updateBalanceDisplay() {
          const account = accounts[currentAccount];
          const amount = account.balance;
          const symbol = currentAccount === 'usd' ? '$' : '₦';
          const formattedAmount = currentAccount === 'usd' 
            ? amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          
          // Apply hide state if needed
          if (isBalanceHidden) {
            balanceAmount.textContent = '****';
          } else {
            balanceAmount.textContent = `${symbol}${formattedAmount}`;
          }
          
          // Update account number
          if (isAccountHidden) {
            accountNumberElement.textContent = '**********';
          } else {
            accountNumberElement.textContent = account.accountNumber;
          }
          
          // Update filter text
          const filterSymbol = currentAccount === 'usd' ? '$' : '₦';
          filterText.textContent = `Filter selected: more than 100 ${filterSymbol}`;
          
          // Update transfer amounts
          const transferSymbol = currentAccount === 'usd' ? '$' : '₦';
          const transfer1 = document.getElementById('transfer1');
          const transfer2 = document.getElementById('transfer2');
          const transfer3 = document.getElementById('transfer3');
          
          if (transfer1) {
            const amount1 = currentAccount === 'usd' 
              ? transfers.usd.transfer1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : transfers.ngn.transfer1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            transfer1.textContent = `- ${transferSymbol} ${amount1}`;
          }
          
          if (transfer2) {
            const amount2 = currentAccount === 'usd' 
              ? transfers.usd.transfer2.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : transfers.ngn.transfer2.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            transfer2.textContent = `- ${transferSymbol} ${amount2}`;
          }
          
          if (transfer3) {
            const amount3 = currentAccount === 'usd' 
              ? transfers.usd.transfer3.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : transfers.ngn.transfer3.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            transfer3.textContent = `- ${transferSymbol} ${amount3}`;
          }
          
          // Update payment amounts
          const paymentSymbol = currentAccount === 'usd' ? '$' : '₦';
          const payment1 = document.getElementById('payment1');
          const payment2 = document.getElementById('payment2');
          const payment3 = document.getElementById('payment3');
          
          if (payment1) {
            const amount1 = currentAccount === 'usd' 
              ? payments.usd.payment1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : payments.ngn.payment1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            payment1.textContent = `${paymentSymbol} ${amount1}`;
          }
          
          if (payment2) {
            const amount2 = currentAccount === 'usd' 
              ? payments.usd.payment2.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : payments.ngn.payment2.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            payment2.textContent = `${paymentSymbol} ${amount2}`;
          }
          
          if (payment3) {
            const amount3 = currentAccount === 'usd' 
              ? payments.usd.payment3.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : payments.ngn.payment3.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            payment3.textContent = `${paymentSymbol} ${amount3}`;
          }
          
          // Update account buttons state
          updateAccountButtons();
        }
        
        // Update account buttons based on account status
        function updateAccountButtons() {
          // NGN account is always active
          ngnAccountBtn.disabled = false;
          
          // USD account button state
          if (accounts.usd.isActive) {
            usdAccountBtn.disabled = false;
            openAccountBtn.textContent = 'USD Account Active';
            openAccountBtn.style.background = '#6c757d';
            openAccountBtn.disabled = true;
          } else {
            usdAccountBtn.disabled = true;
            openAccountBtn.textContent = 'Activate USD Account';
            openAccountBtn.style.background = '#28a745';
            openAccountBtn.disabled = false;
          }
          
          // Active button styling
          ngnAccountBtn.classList.toggle('active', currentAccount === 'ngn');
          usdAccountBtn.classList.toggle('active', currentAccount === 'usd');
        }
        
        // Switch to NGN account
        function switchToNgnAccount() {
          if (accounts.ngn.isActive) {
            currentAccount = 'ngn';
            updateBalanceDisplay();
          }
        }
        
        // Switch to USD account
        function switchToUsdAccount() {
          if (accounts.usd.isActive) {
            currentAccount = 'usd';
            updateBalanceDisplay();
          }
        }
        
        // Open USD account
        function openUsdAccount() {
          if (!accounts.usd.isActive) {
            accounts.usd.isActive = true;
            accounts.usd.balance = 0;
            updateAccountButtons();
            
            // Show success message
            alert('USD account activated successfully!');
          }
        }
        
        // Toggle hide state for account number
        function toggleAccountHide() {
          isAccountHidden = !isAccountHidden;
          hideAccountToggle.classList.toggle('active', isAccountHidden);
          updateBalanceDisplay();
          
          // Update label text
          const label = hideAccountToggle.previousElementSibling;
          label.textContent = isAccountHidden ? 'Show account number' : 'Hide account number';
        }
        
        // Toggle hide state for balance
        function toggleBalanceHide() {
          isBalanceHidden = !isBalanceHidden;
          hideBalanceToggle.classList.toggle('active', isBalanceHidden);
          updateBalanceDisplay();
          
          // Update label text
          const label = hideBalanceToggle.previousElementSibling;
          label.textContent = isBalanceHidden ? 'Show balance' : 'Hide balance';
        }
        
        // Transfer between accounts functionality
        function openTransferModal() {
          if (!accounts.usd.isActive) {
            alert('Please open a USD account first to transfer between accounts.');
            return;
          }
          
          // Reset form
          transferForm.reset();
          convertedAmountInput.value = '';
          
          // Populate account options
          fromAccountSelect.innerHTML = '';
          toAccountSelect.innerHTML = '';
          
          // Add options based on active accounts
          if (accounts.ngn.isActive) {
            fromAccountSelect.innerHTML += '<option value="ngn">NGN Account</option>';
            toAccountSelect.innerHTML += '<option value="ngn">NGN Account</option>';
          }
          
          if (accounts.usd.isActive) {
            fromAccountSelect.innerHTML += '<option value="usd">USD Account</option>';
            toAccountSelect.innerHTML += '<option value="usd">USD Account</option>';
          }
          
          // Show modal
          transferModal.classList.add('active');
        }
        
        function closeTransferModalFunc() {
          transferModal.classList.remove('active');
        }
        
        function calculateConvertedAmount() {
          const amount = parseFloat(amountInput.value) || 0;
          const fromCurrency = currencySelect.value;
          const toCurrency = fromCurrency === 'ngn' ? 'usd' : 'ngn';
          
          if (amount > 0) {
            if (fromCurrency === 'ngn') {
              // Convert NGN to USD
              const converted = amount / exchangeRate;
              convertedAmountInput.value = `$${converted.toFixed(2)}`;
            } else {
              // Convert USD to NGN
              const converted = amount * exchangeRate;
              convertedAmountInput.value = `₦${converted.toFixed(2)}`;
            }
          } else {
            convertedAmountInput.value = '';
          }
        }
        
        function handleTransfer(e) {
          e.preventDefault();
          
          const fromAccount = fromAccountSelect.value;
          const toAccount = toAccountSelect.value;
          const amount = parseFloat(amountInput.value);
          const currency = currencySelect.value;
          
          // Validation
          if (fromAccount === toAccount) {
            alert('Cannot transfer to the same account.');
            return;
          }
          
          if (amount <= 0) {
            alert('Please enter a valid amount.');
            return;
          }
          
          // Check if sufficient balance
          if (currency === 'ngn') {
            if (fromAccount === 'ngn' && amount > accounts.ngn.balance) {
              alert('Insufficient balance in NGN account.');
              return;
            }
            
            if (fromAccount === 'usd') {
              const usdAmount = amount / exchangeRate;
              if (usdAmount > accounts.usd.balance) {
                alert('Insufficient balance in USD account.');
                return;
              }
            }
          } else { // USD
            if (fromAccount === 'usd' && amount > accounts.usd.balance) {
              alert('Insufficient balance in USD account.');
              return;
            }
            
            if (fromAccount === 'ngn') {
              const ngnAmount = amount * exchangeRate;
              if (ngnAmount > accounts.ngn.balance) {
                alert('Insufficient balance in NGN account.');
                return;
              }
            }
          }
          
          // Perform transfer
          if (currency === 'ngn') {
            if (fromAccount === 'ngn') {
              // NGN to USD
              accounts.ngn.balance -= amount;
              accounts.usd.balance += amount / exchangeRate;
            } else {
              // USD to NGN
              accounts.usd.balance -= amount / exchangeRate;
              accounts.ngn.balance += amount;
            }
          } else { // USD
            if (fromAccount === 'usd') {
              // USD to NGN
              accounts.usd.balance -= amount;
              accounts.ngn.balance += amount * exchangeRate;
            } else {
              // NGN to USD
              accounts.ngn.balance -= amount * exchangeRate;
              accounts.usd.balance += amount;
            }
          }
          
          // Update display
          updateBalanceDisplay();
          
          // Close modal
          closeTransferModalFunc();
          
          // Show success message
          alert('Transfer completed successfully!');
        }
        
        // Event listeners
        if (ngnAccountBtn) {
          ngnAccountBtn.addEventListener('click', switchToNgnAccount);
        }
        
        if (usdAccountBtn) {
          usdAccountBtn.addEventListener('click', switchToUsdAccount);
        }
        
        if (openAccountBtn) {
          openAccountBtn.addEventListener('click', openUsdAccount);
        }
        
        if (copyButton) {
          copyButton.addEventListener('click', function() {
            // If account number is hidden, copy the actual value, not the asterisks
            const actualAccountNumber = isAccountHidden ? accounts[currentAccount].accountNumber : accountNumberElement.textContent;
            copyToClipboard(actualAccountNumber);
          });
        }
        
        if (hideAccountToggle) {
          hideAccountToggle.addEventListener('click', toggleAccountHide);
        }
        
        if (hideBalanceToggle) {
          hideBalanceToggle.addEventListener('click', toggleBalanceHide);
        }
        
        if (transferBetweenAccountsBtn) {
          transferBetweenAccountsBtn.addEventListener('click', openTransferModal);
        }
        
        if (closeTransferModal) {
          closeTransferModal.addEventListener('click', closeTransferModalFunc);
        }
        
        if (cancelTransfer) {
          cancelTransfer.addEventListener('click', closeTransferModalFunc);
        }
        
        if (transferForm) {
          transferForm.addEventListener('submit', handleTransfer);
        }
        
        if (amountInput && currencySelect) {
          amountInput.addEventListener('input', calculateConvertedAmount);
          currencySelect.addEventListener('change', calculateConvertedAmount);
        }
        
        // Close modal when clicking outside
        transferModal.addEventListener('click', function(e) {
          if (e.target === transferModal) {
            closeTransferModalFunc();
          }
        });
        
        // Initialize
        fetchExchangeRate().then(() => {
          updateBalanceDisplay();
        });

        // Your existing dropdown functionality
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

        console.log('Multi-currency banking features initialized successfully');
      });


      // Nigerian Data Plans Configuration
    const NETWORK_DATA_PLANS = {
      "MTN": [
        { id: "1", name: "100MB", price: 100.0, validityDays: 1 },
        { id: "2", name: "350MB", price: 200.0, validityDays: 7 },
        { id: "3", name: "1GB", price: 500.0, validityDays: 30 },
        { id: "4", name: "2GB", price: 1000.0, validityDays: 30 },
        { id: "5", name: "3GB", price: 1500.0, validityDays: 30 },
        { id: "6", name: "5GB", price: 2500.0, validityDays: 30 },
        { id: "7", name: "10GB", price: 5000.0, validityDays: 30 }
      ],
      "GLO": [
        { id: "1", name: "100MB", price: 100.0, validityDays: 1 },
        { id: "2", name: "350MB", price: 200.0, validityDays: 7 },
        { id: "3", name: "1.5GB", price: 500.0, validityDays: 30 },
        { id: "4", name: "3GB", price: 1000.0, validityDays: 30 },
        { id: "5", name: "5GB", price: 2000.0, validityDays: 30 },
        { id: "6", name: "7GB", price: 2500.0, validityDays: 30 },
        { id: "7", name: "10GB", price: 3000.0, validityDays: 30 }
      ],
      "AIRTEL": [
        { id: "1", name: "100MB", price: 100.0, validityDays: 1 },
        { id: "2", name: "300MB", price: 200.0, validityDays: 7 },
        { id: "3", name: "1GB", price: 500.0, validityDays: 30 },
        { id: "4", name: "2GB", price: 1000.0, validityDays: 30 },
        { id: "5", name: "3GB", price: 1500.0, validityDays: 30 },
        { id: "6", name: "5GB", price: 2000.0, validityDays: 30 },
        { id: "7", name: "10GB", price: 4000.0, validityDays: 30 }
      ],
      "9MOBILE": [
        { id: "1", name: "100MB", price: 100.0, validityDays: 1 },
        { id: "2", name: "400MB", price: 200.0, validityDays: 7 },
        { id: "3", name: "1.5GB", price: 500.0, validityDays: 30 },
        { id: "4", name: "2GB", price: 1000.0, validityDays: 30 },
        { id: "5", name: "3GB", price: 1200.0, validityDays: 30 },
        { id: "6", name: "4GB", price: 1500.0, validityDays: 30 },
        { id: "7", name: "11GB", price: 4000.0, validityDays: 30 }
      ]
    };

    // Beneficiaries Management
    let beneficiaries = JSON.parse(localStorage.getItem('dataTopUpBeneficiaries')) || [
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

      // Data Form Functionality
      const form = document.getElementById("topupForm");
      const submitBtn = document.getElementById("submitBtn");
      const phoneInput = document.getElementById("phone");
      const phoneError = document.getElementById("phoneError");
      const modal = document.getElementById("successModal");
      const errorModal = document.getElementById("errorModal");
      const successText = document.getElementById("successText");
      const errorText = document.getElementById("errorText");
      const selectedPlanInput = document.getElementById('selectedPlan');

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

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const phone = phoneInput.value;
        const carrier = document.getElementById("network").value;
        const paymentMethod = document.getElementById("paymentMethod").value;
        const selectedPlan = selectedPlanInput.value;

        if (phone.length !== 11 || !phone.startsWith('0')) {
          phoneError.textContent = "Please enter a valid 11-digit Nigerian phone number starting with 0.";
          phoneInput.focus();
          return;
        }

        if (!selectedPlan) {
          showError("Please select a data plan.");
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

            // Get selected plan details
            const selectedPlanElement = document.querySelector('.data-plan.selected');
            const planSize = selectedPlanElement.getAttribute('data-size');
            const planPrice = selectedPlanElement.getAttribute('data-price');
            const planValidity = selectedPlanElement.getAttribute('data-validity');

            successText.textContent = `${planSize} data plan (₦${planPrice}) has been successfully activated for ${formattedPhone} (${carrier}). Valid for ${planValidity}. Payment method: ${paymentMethodText}.`;
            modal.classList.add("active");
          } else {
            showError("Payment processing failed. Please check your payment method and try again.");
          }

          // reset form
          form.reset();
          document.querySelectorAll('.data-plan').forEach(p => p.classList.remove('selected'));
          selectedPlanInput.value = '';
          submitBtn.innerHTML = '<i class="fas fa-wifi"></i> Buy Data Now';
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
        }, 2000);
      });

      console.log('Data top-up system initialized successfully');
    });

    // Update data plans based on selected network
    function updateDataPlans() {
      const network = document.getElementById('network').value;
      const container = document.getElementById('dataPlansContainer');
      
      // Clear previous plans
      container.innerHTML = '';
      
      if (!network) {
        container.innerHTML = '<div class="no-plans">Please select a network provider to view available data plans</div>';
        return;
      }
      
      const plans = NETWORK_DATA_PLANS[network];
      
      if (plans && plans.length > 0) {
        plans.forEach(plan => {
          const planElement = document.createElement('div');
          planElement.className = 'data-plan';
          planElement.setAttribute('data-size', plan.name);
          planElement.setAttribute('data-price', plan.price);
          planElement.setAttribute('data-validity', `${plan.validityDays} day${plan.validityDays !== 1 ? 's' : ''}`);
          planElement.setAttribute('tabindex', '0');
          planElement.setAttribute('role', 'button');
          
          planElement.innerHTML = `
            <div class="plan-size">${plan.name}</div>
            <div class="plan-price">₦${plan.price}</div>
            <div class="plan-validity">${plan.validityDays} day${plan.validityDays !== 1 ? 's' : ''}</div>
          `;
          
          planElement.addEventListener('click', function() {
            // Remove selected class from all plans
            document.querySelectorAll('.data-plan').forEach(p => p.classList.remove('selected'));
            // Add selected class to clicked plan
            this.classList.add('selected');
            // Set the selected plan value
            document.getElementById('selectedPlan').value = this.getAttribute('data-size');
          });
          
          // Add keyboard support for data plans
          planElement.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.click();
            }
          });
          
          container.appendChild(planElement);
        });
      } else {
        container.innerHTML = '<div class="no-plans">No data plans available for this network</div>';
      }
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
      
      // Update data plans based on network
      updateDataPlans();
      
      // Trigger input event for validation
      document.getElementById('phone').dispatchEvent(new Event('input'));
    }

    function openAddBeneficiaryModal() {
      document.getElementById('addBeneficiaryModal').classList.add('active');
    }

    function closeAddBeneficiaryModal() {
      document.getElementById('addBeneficiaryModal').classList.remove('active');
      document.getElementById('addBeneficiaryForm').reset();
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
      localStorage.setItem('dataTopUpBeneficiaries', JSON.stringify(beneficiaries));
      
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
        localStorage.setItem('dataTopUpBeneficiaries', JSON.stringify(beneficiaries));
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
        localStorage.setItem('dataTopUpBeneficiaries', JSON.stringify(beneficiaries));
        loadBeneficiaries();
      }
    }

    // Quick data functions
    function quickData(type) {
      const quickActions = document.querySelectorAll('.quick-action');
      const phoneInput = document.getElementById('phone');
      const networkSelect = document.getElementById('network');
      
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
        } else if (type === 'family') {
          // Pre-fill with family number
          phoneInput.value = '08087654321';
          networkSelect.value = 'AIRTEL';
        }
        
        // Update data plans based on network
        updateDataPlans();
        
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

    //settings 


     // User dropdown functionality
      document.getElementById('userProfileBtn').addEventListener('click', function() {
        const dropdown = document.getElementById('userDropdown');
        dropdown.classList.toggle('show');
      });

      // Close dropdown when clicking outside
      window.addEventListener('click', function(e) {
        if (!e.target.matches('#userProfileBtn') && !e.target.closest('#userProfileBtn')) {
          const dropdown = document.getElementById('userDropdown');
          if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
          }
        }
      });

      // Mobile menu functionality
      document.getElementById('mobileMenuBtn').addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.add('show');
        document.getElementById('mobileMenuOverlay').classList.add('show');
      });

      document.getElementById('closeMobileMenu').addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.remove('show');
        document.getElementById('mobileMenuOverlay').classList.remove('show');
      });

      document.getElementById('mobileMenuOverlay').addEventListener('click', function() {
        document.getElementById('mobileMenu').classList.remove('show');
        this.classList.remove('show');
      });

      // Settings navigation
      const navItems = document.querySelectorAll('.settings-nav-item');
      const sections = document.querySelectorAll('.settings-section');

      navItems.forEach(item => {
        item.addEventListener('click', function() {
          // Remove active class from all items
          navItems.forEach(nav => nav.classList.remove('active'));
          // Add active class to clicked item
          this.classList.add('active');
          
          // Hide all sections
          sections.forEach(section => section.style.display = 'none');
          
          // Show the selected section
          const sectionId = this.getAttribute('data-section') + '-section';
          document.getElementById(sectionId).style.display = 'block';
        });
      });

      // Modal functionality
      const changePasswordBtn = document.getElementById('changePasswordBtn');
      const changePinBtn = document.getElementById('changePinBtn');
      const changePasswordModal = document.getElementById('changePasswordModal');
      const changePinModal = document.getElementById('changePinModal');

      if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
          changePasswordModal.classList.add('active');
        });
      }

      if (changePinBtn) {
        changePinBtn.addEventListener('click', function() {
          changePinModal.classList.add('active');
        });
      }

      // Close modals
      document.getElementById('closePasswordModal').addEventListener('click', function() {
        changePasswordModal.classList.remove('active');
      });

      document.getElementById('closePinModal').addEventListener('click', function() {
        changePinModal.classList.remove('active');
      });

      document.getElementById('cancelPasswordChange').addEventListener('click', function() {
        changePasswordModal.classList.remove('active');
      });

      document.getElementById('cancelPinChange').addEventListener('click', function() {
        changePinModal.classList.remove('active');
      });

      // Close modals when clicking outside
      window.addEventListener('click', function(e) {
        if (e.target === changePasswordModal) {
          changePasswordModal.classList.remove('active');
        }
        if (e.target === changePinModal) {
          changePinModal.classList.remove('active');
        }
      });

      // Form submissions
      document.getElementById('passwordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add password change logic here
        alert('Password changed successfully!');
        changePasswordModal.classList.remove('active');
        this.reset();
      });

      document.getElementById('pinForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add PIN change logic here
        alert('Transaction PIN changed successfully!');
        changePinModal.classList.remove('active');
        this.reset();
      });

      // Quick actions
      document.getElementById('backupSettings').addEventListener('click', function() {
        alert('Settings backup initiated!');
      });

      document.getElementById('importSettings').addEventListener('click', function() {
        alert('Please select a backup file to import.');
      });

      document.getElementById('helpCenter').addEventListener('click', function() {
        alert('Redirecting to help center...');
      });

      document.getElementById('contactSupport').addEventListener('click', function() {
        alert('Opening support chat...');
      });

      // Export and Reset buttons
      document.getElementById('exportSettingsBtn').addEventListener('click', function() {
        alert('Settings exported successfully!');
      });

      document.getElementById('resetSettingsBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
          alert('Settings have been reset to default values.');
        }
      });

      // Danger zone buttons
      document.getElementById('resetAllBtn').addEventListener('click', function() {
        if (confirm('This will reset ALL settings to their default values. This action cannot be undone. Are you sure?')) {
          alert('All settings have been reset.');
        }
      });

      document.getElementById('deleteAccountBtn').addEventListener('click', function() {
        if (confirm('WARNING: This will permanently delete your account and all associated data. This action cannot be undone. Are you absolutely sure?')) {
          alert('Account deletion process initiated. You will receive a confirmation email.');
        }
      });

