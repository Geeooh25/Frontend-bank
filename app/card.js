
        // Cards Page Functionality
      document.addEventListener('DOMContentLoaded', function() {
        // Card data storage
        const cardData = {
          visa: { 
            pin: '1234', 
            pinSet: true, 
            frozen: false, 
            cvv: '123',
            number: '4012 3456 7890 1234'
          },
          mastercard: { 
            pin: '5678', 
            pinSet: true, 
            frozen: false, 
            cvv: '456',
            number: '5678 9012 3456 7890'
          },
          virtual: { 
            pin: '9012', 
            pinSet: true, 
            frozen: false, 
            cvv: '789',
            number: '9012 3456 7890 1234'
          },
          amex: { 
            pin: null, 
            pinSet: false, 
            frozen: false, 
            cid: '1234',
            number: '3456 7890 1234 5678'
          },
          discover: { 
            pin: null, 
            pinSet: false, 
            frozen: false, 
            cvv: '567',
            number: '7890 1234 5678 9012'
          }
        };

        // Elements
        const orderCardBtn = document.getElementById('orderCardBtn');
        const manageCardsBtn = document.getElementById('manageCardsBtn');
        const freezeCardBtn = document.getElementById('freezeCardBtn');
        const setLimitsBtn = document.getElementById('setLimitsBtn');
        const replaceCardBtn = document.getElementById('replaceCardBtn');
        const pinManagementBtn = document.getElementById('pinManagementBtn');
        
        // Modal elements
        const orderCardModal = document.getElementById('orderCardModal');
        const closeOrderModal = document.getElementById('closeOrderModal');
        const cancelOrder = document.getElementById('cancelOrder');
        const confirmOrder = document.getElementById('confirmOrder');
        
        const freezeCardModal = document.getElementById('freezeCardModal');
        const closeFreezeModal = document.getElementById('closeFreezeModal');
        const cancelFreeze = document.getElementById('cancelFreeze');
        const confirmFreeze = document.getElementById('confirmFreeze');
        
        const setLimitsModal = document.getElementById('setLimitsModal');
        const closeLimitsModal = document.getElementById('closeLimitsModal');
        const cancelLimits = document.getElementById('cancelLimits');
        const confirmLimits = document.getElementById('confirmLimits');

        const pinModal = document.getElementById('pinModal');
        const closePinModal = document.getElementById('closePinModal');
        const cancelPin = document.getElementById('cancelPin');
        const confirmPin = document.getElementById('confirmPin');
        const pinModalTitle = document.getElementById('pinModalTitle');
        const pinCardName = document.getElementById('pinCardName');

        const pinVerifyModal = document.getElementById('pinVerifyModal');
        const closePinVerifyModal = document.getElementById('closePinVerifyModal');
        const cancelPinVerify = document.getElementById('cancelPinVerify');
        const confirmPinVerify = document.getElementById('confirmPinVerify');
        const pinVerifyTitle = document.getElementById('pinVerifyTitle');
        const pinVerifyCardName = document.getElementById('pinVerifyCardName');

        // Card action buttons
        const viewButtons = document.querySelectorAll('.card-control-btn.view');
        const freezeButtons = document.querySelectorAll('.card-control-btn.freeze');
        const closeDetailsButtons = document.querySelectorAll('.close-details');
        const cardDetailsPanels = document.querySelectorAll('.card-details-panel');
        const toggleSensitiveButtons = document.querySelectorAll('.toggle-sensitive');

        // PIN management buttons
        const setPinAmex = document.getElementById('setPinAmex');
        const setPinDiscover = document.getElementById('setPinDiscover');
        const changePinVisa = document.getElementById('changePinVisa');
        const changePinMastercard = document.getElementById('changePinMastercard');
        const changePinVirtual = document.getElementById('changePinVirtual');

        // Current card being processed
        let currentCard = null;

        // Initialize the page
        function initializePage() {
          setupEventListeners();
          setupCardInteractions();
          setupPINManagement();
          updateCardStatus();
        }

        // Setup event listeners
        function setupEventListeners() {
          // Main action buttons
          orderCardBtn.addEventListener('click', () => orderCardModal.classList.add('active'));
          manageCardsBtn.addEventListener('click', showManageCardsOptions);
          
          // Management items
          freezeCardBtn.addEventListener('click', () => freezeCardModal.classList.add('active'));
          setLimitsBtn.addEventListener('click', () => setLimitsModal.classList.add('active'));
          replaceCardBtn.addEventListener('click', showReplaceCardOptions);
          pinManagementBtn.addEventListener('click', showPinManagement);
          
          // Modal close events
          closeOrderModal.addEventListener('click', () => orderCardModal.classList.remove('active'));
          cancelOrder.addEventListener('click', () => orderCardModal.classList.remove('active'));
          
          closeFreezeModal.addEventListener('click', () => freezeCardModal.classList.remove('active'));
          cancelFreeze.addEventListener('click', () => freezeCardModal.classList.remove('active'));
          
          closeLimitsModal.addEventListener('click', () => setLimitsModal.classList.remove('active'));
          cancelLimits.addEventListener('click', () => setLimitsModal.classList.remove('active'));
          
          closePinModal.addEventListener('click', () => pinModal.classList.remove('active'));
          cancelPin.addEventListener('click', () => pinModal.classList.remove('active'));
          
          closePinVerifyModal.addEventListener('click', () => pinVerifyModal.classList.remove('active'));
          cancelPinVerify.addEventListener('click', () => pinVerifyModal.classList.remove('active'));
          
          // Form submissions
          confirmOrder.addEventListener('click', handleCardOrder);
          confirmFreeze.addEventListener('click', handleFreezeCard);
          confirmLimits.addEventListener('click', handleSetLimits);
          confirmPin.addEventListener('click', handlePinChange);
          confirmPinVerify.addEventListener('click', handlePinVerify);
          
          // Dynamic form updates
          document.getElementById('deliveryMethod').addEventListener('change', updateDeliveryFee);
          document.getElementById('cardDesign').addEventListener('change', updateCardDesignFee);
          
          // PIN input handling
          setupPINInputs();
          
          // Close modals when clicking outside
          document.addEventListener('click', function(e) {
            if (e.target === orderCardModal) orderCardModal.classList.remove('active');
            if (e.target === freezeCardModal) freezeCardModal.classList.remove('active');
            if (e.target === setLimitsModal) setLimitsModal.classList.remove('active');
            if (e.target === pinModal) pinModal.classList.remove('active');
            if (e.target === pinVerifyModal) pinVerifyModal.classList.remove('active');
          });
        }

        // Setup card interactions
        function setupCardInteractions() {
          // View details functionality
          viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
              e.stopPropagation();
              const cardType = this.getAttribute('data-card');
              currentCard = cardType;
              
              // Check if PIN is set
              if (!cardData[cardType].pinSet) {
                alert('Please set a PIN first to view card details');
                openPinModal('set', getCardDisplayName(cardType));
                return;
              }
              
              // If PIN is set, verify it
              openPinVerifyModal(cardType);
            });
          });

          // Freeze card functionality
          freezeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
              e.stopPropagation();
              const cardType = this.getAttribute('data-card');
              currentCard = cardType;
              
              toggleFreezeCard(cardType);
            });
          });

          // Close details functionality
          closeDetailsButtons.forEach(button => {
            button.addEventListener('click', function(e) {
              e.stopPropagation();
              const cardType = this.getAttribute('data-card');
              const detailsPanel = document.getElementById(`${cardType}-details`);
              detailsPanel.classList.remove('active');
            });
          });

          // Toggle sensitive info functionality
          toggleSensitiveButtons.forEach(button => {
            button.addEventListener('click', function(e) {
              e.stopPropagation();
              const sensitiveType = this.getAttribute('data-sensitive');
              const cardType = this.getAttribute('data-card');
              const sensitiveValue = this.previousElementSibling;
              
              if (sensitiveValue.textContent === '•••' || sensitiveValue.textContent === '••••') {
                // Show the actual value
                if (sensitiveType === 'cvv') {
                  sensitiveValue.textContent = cardData[cardType].cvv;
                } else if (sensitiveType === 'cid') {
                  sensitiveValue.textContent = cardData[cardType].cid;
                }
                this.innerHTML = '<i class="fas fa-eye-slash"></i> Hide';
              } else {
                // Hide the value
                sensitiveValue.textContent = sensitiveType === 'cvv' ? '•••' : '••••';
                this.innerHTML = '<i class="fas fa-eye"></i> Show';
              }
            });
          });
        }

        // Setup PIN management
        function setupPINManagement() {
          // Set PIN buttons for cards without PIN
          setPinAmex.addEventListener('click', () => {
            currentCard = 'amex';
            openPinModal('set', getCardDisplayName('amex'));
          });
          
          setPinDiscover.addEventListener('click', () => {
            currentCard = 'discover';
            openPinModal('set', getCardDisplayName('discover'));
          });
          
          // Change PIN buttons for cards with PIN
          changePinVisa.addEventListener('click', () => {
            currentCard = 'visa';
            openPinModal('change', getCardDisplayName('visa'));
          });
          
          changePinMastercard.addEventListener('click', () => {
            currentCard = 'mastercard';
            openPinModal('change', getCardDisplayName('mastercard'));
          });
          
          changePinVirtual.addEventListener('click', () => {
            currentCard = 'virtual';
            openPinModal('change', getCardDisplayName('virtual'));
          });
        }

        // Setup PIN inputs
        function setupPINInputs() {
          const pinInputs = document.querySelectorAll('.pin-input');
          
          pinInputs.forEach(input => {
            input.addEventListener('input', function() {
              const index = parseInt(this.getAttribute('data-index'));
              const value = this.value;
              
              // Only allow numbers
              if (!/^\d*$/.test(value)) {
                this.value = '';
                return;
              }
              
              // Move to next input if value is entered
              if (value.length === 1 && index < 3) {
                const nextInput = document.querySelector(`.pin-input[data-index="${index + 1}"]`);
                nextInput.focus();
              }
              
              // Check if all PIN inputs are filled
              checkPINCompletion();
            });
            
            input.addEventListener('keydown', function(e) {
              const index = parseInt(this.getAttribute('data-index'));
              
              // Move to previous input on backspace if current input is empty
              if (e.key === 'Backspace' && this.value === '' && index > 0) {
                const prevInput = document.querySelector(`.pin-input[data-index="${index - 1}"]`);
                prevInput.focus();
              }
            });
          });
        }

        // Check if PIN inputs are completed
        function checkPINCompletion() {
          const pinInputs = document.querySelectorAll('.pin-input:not(.confirm):not(.verify)');
          const confirmPinInputs = document.querySelectorAll('.pin-input.confirm');
          const verifyPinInputs = document.querySelectorAll('.pin-input.verify');
          
          let allFilled = true;
          
          // Check main PIN inputs
          pinInputs.forEach(input => {
            if (input.value === '') {
              allFilled = false;
            } else {
              input.classList.add('filled');
            }
          });
          
          // If in set PIN mode, check confirm PIN inputs
          if (pinModal.classList.contains('active')) {
            let confirmFilled = true;
            confirmPinInputs.forEach(input => {
              if (input.value === '') {
                confirmFilled = false;
              } else {
                input.classList.add('filled');
              }
            });
            allFilled = allFilled && confirmFilled;
          }
          
          // If in verify mode, check verify PIN inputs
          if (pinVerifyModal.classList.contains('active')) {
            let verifyFilled = true;
            verifyPinInputs.forEach(input => {
              if (input.value === '') {
                verifyFilled = false;
              } else {
                input.classList.add('filled');
              }
            });
            allFilled = verifyFilled;
          }
          
          // Enable/disable confirm button
          if (pinModal.classList.contains('active')) {
            confirmPin.disabled = !allFilled;
          } else if (pinVerifyModal.classList.contains('active')) {
            confirmPinVerify.disabled = !allFilled;
          }
        }

        // Open PIN verification modal
        function openPinVerifyModal(cardType) {
          // Reset PIN inputs
          const pinInputs = document.querySelectorAll('.pin-input.verify');
          pinInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled');
          });
          
          pinVerifyTitle.textContent = 'Verify PIN';
          pinVerifyCardName.textContent = getCardDisplayName(cardType);
          confirmPinVerify.disabled = true;
          pinVerifyModal.classList.add('active');
        }

        // Open PIN modal
        function openPinModal(mode, cardName) {
          // Reset PIN inputs
          const pinInputs = document.querySelectorAll('.pin-input:not(.verify)');
          pinInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled');
          });
          
          // Set modal title and content based on mode
          if (mode === 'set') {
            pinModalTitle.textContent = 'Set PIN';
          } else {
            pinModalTitle.textContent = 'Change PIN';
          }
          
          pinCardName.textContent = cardName;
          confirmPin.disabled = true;
          pinModal.classList.add('active');
        }

        // Handle PIN verification
        function handlePinVerify() {
          // Get PIN values
          const pinInputs = document.querySelectorAll('.pin-input.verify');
          let pin = '';
          pinInputs.forEach(input => {
            pin += input.value;
          });
          
          // Verify PIN
          if (pin === cardData[currentCard].pin) {
            // PIN is correct, show card details
            const detailsPanel = document.getElementById(`${currentCard}-details`);
            
            // Close all other panels first
            cardDetailsPanels.forEach(panel => panel.classList.remove('active'));
            
            // Open this panel
            detailsPanel.classList.add('active');
            
            // Scroll to the details panel
            detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Close modal
            pinVerifyModal.classList.remove('active');
          } else {
            alert('Incorrect PIN. Please try again.');
            // Clear PIN inputs
            pinInputs.forEach(input => {
              input.value = '';
              input.classList.remove('filled');
            });
            confirmPinVerify.disabled = true;
            
            // Focus on first input
            document.querySelector('.pin-input.verify[data-index="0"]').focus();
          }
        }

        // Handle PIN change
        function handlePinChange() {
          // Get PIN values
          const pinInputs = document.querySelectorAll('.pin-input:not(.confirm):not(.verify)');
          const confirmPinInputs = document.querySelectorAll('.pin-input.confirm');
          
          let pin = '';
          pinInputs.forEach(input => {
            pin += input.value;
          });
          
          let confirmPin = '';
          confirmPinInputs.forEach(input => {
            confirmPin += input.value;
          });
          
          // Check if PINs match
          if (pin !== confirmPin) {
            alert('PINs do not match. Please try again.');
            return;
          }
          
          // Update card data
          cardData[currentCard].pin = pin;
          cardData[currentCard].pinSet = true;
          
          // Update UI
          updateCardStatus();
          
          // Show success message
          alert('PIN has been set successfully!');
          pinModal.classList.remove('active');
        }

        // Toggle freeze card
        function toggleFreezeCard(cardType) {
          cardData[cardType].frozen = !cardData[cardType].frozen;
          
          // Update UI
          updateCardStatus();
          
          // Show message
          const status = cardData[cardType].frozen ? 'frozen' : 'unfrozen';
          alert(`Card has been ${status} successfully!`);
        }

        // Update card status in UI
        function updateCardStatus() {
          // Update each card's status
          Object.keys(cardData).forEach(cardType => {
            const cardElement = document.querySelector(`.card-item[data-card="${cardType}"]`);
            const statusElement = cardElement.querySelector('.card-status');
            const freezeButton = document.querySelector(`.card-control-btn.freeze[data-card="${cardType}"]`);
            
            if (cardData[cardType].frozen) {
              cardElement.classList.add('frozen');
              statusElement.textContent = 'Frozen';
              statusElement.classList.add('frozen');
              freezeButton.textContent = 'Unfreeze Card';
              freezeButton.classList.add('frozen');
            } else {
              cardElement.classList.remove('frozen');
              statusElement.textContent = '';
              statusElement.classList.remove('frozen');
              freezeButton.textContent = 'Freeze Card';
              freezeButton.classList.remove('frozen');
            }
            
            // Update PIN status in details panels
            const pinStatusBadge = document.querySelector(`#${cardType}-details .pin-status-badge`);
            if (pinStatusBadge) {
              if (cardData[cardType].pinSet) {
                pinStatusBadge.textContent = 'SET';
                pinStatusBadge.className = 'pin-status-badge pin-set';
              } else {
                pinStatusBadge.textContent = 'NOT SET';
                pinStatusBadge.className = 'pin-status-badge pin-not-set';
              }
            }
          });
        }

        // Get card display name
        function getCardDisplayName(cardType) {
          const names = {
            visa: 'Visa Debit •••• 4012',
            mastercard: 'MasterCard •••• 5678',
            virtual: 'Virtual Card •••• 9012',
            amex: 'American Express •••• 3456',
            discover: 'Discover •••• 7890'
          };
          return names[cardType];
        }

        // Handle card order
        function handleCardOrder() {
          const cardType = document.getElementById('cardType').value;
          const accountType = document.getElementById('accountType').value;
          const deliveryMethod = document.getElementById('deliveryMethod').value;
          const cardDesign = document.getElementById('cardDesign').value;
          const agreeTerms = document.getElementById('agreeTerms').checked;
          
          if (!agreeTerms) {
            alert('Please agree to the terms and conditions');
            return;
          }
          
          // Simulate API call
          setTimeout(() => {
            alert(`Your ${cardType} card has been ordered successfully! You will receive it within the selected delivery timeframe.`);
            orderCardModal.classList.remove('active');
          }, 1000);
        }

        // Handle freeze card
        function handleFreezeCard() {
          const selectedCard = document.getElementById('selectCard').value;
          const duration = document.getElementById('freezeDuration').value;
          const reason = document.getElementById('freezeReason').value;
          
          // Simulate API call
          setTimeout(() => {
            alert(`Card has been frozen successfully. It will remain frozen ${getDurationText(duration)}.`);
            freezeCardModal.classList.remove('active');
          }, 1000);
        }

        // Handle set limits
        function handleSetLimits() {
          const selectedCard = document.getElementById('limitCard').value;
          const dailyLimit = document.getElementById('dailyLimit').value;
          const weeklyLimit = document.getElementById('weeklyLimit').value;
          const monthlyLimit = document.getElementById('monthlyLimit').value;
          const posLimit = document.getElementById('posLimit').value;
          const onlineLimit = document.getElementById('onlineLimit').value;
          
          // Simulate API call
          setTimeout(() => {
            alert('Spending limits have been updated successfully!');
            setLimitsModal.classList.remove('active');
          }, 1000);
        }

        // Utility functions
        function updateDeliveryFee() {
          const method = document.getElementById('deliveryMethod').value;
          const fee = method === 'express' ? '₦2,500' : '₦0';
          document.getElementById('deliveryFee').value = fee;
          document.getElementById('summaryDeliveryFee').textContent = fee;
          updateOrderSummary();
        }

        function updateCardDesignFee() {
          const design = document.getElementById('cardDesign').value;
          const fee = design === 'custom' ? '₦2,000' : '₦0';
          document.getElementById('designFee').textContent = fee;
          updateOrderSummary();
        }

        function updateOrderSummary() {
          const cardFee = 1000; // ₦1,000 card fee
          const deliveryFee = document.getElementById('deliveryMethod').value === 'express' ? 2500 : 0;
          const designFee = document.getElementById('cardDesign').value === 'custom' ? 2000 : 0;
          const total = cardFee + deliveryFee + designFee;
          
          document.getElementById('totalFee').textContent = `₦${total.toLocaleString()}`;
        }

        function getDurationText(duration) {
          const durations = {
            '24': 'for 24 hours',
            '48': 'for 48 hours',
            '168': 'for 1 week',
            'indefinite': 'until you manually unfreeze it'
          };
          return durations[duration] || 'temporarily';
        }

        function showManageCardsOptions() {
          alert('Manage Cards options would be displayed here');
        }

        function showReplaceCardOptions() {
          alert('Replace Card functionality would be implemented here');
        }

        function showPinManagement() {
          alert('PIN Management functionality would be implemented here');
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

        console.log('Cards page initialized successfully');
      });
      