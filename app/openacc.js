// openacc.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-register");
  const steps = document.querySelectorAll("#form-total > section");
  const stepHeaders = document.querySelectorAll("#form-total > h2");
  let currentStep = 0;

  // Inject styles
  const style = document.createElement("style");
  style.innerHTML = `
    /* Progress bar wrapper */
    .progress-wrapper {
      width: 100%;
      position: relative;
      margin: 30px 0 40px;
    }
    .progress-labels {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 500;
      color: #555;
      margin-bottom: 10px;
    }
    .progress-labels span {
      flex: 1;
      text-align: center;
      transition: color 0.3s ease;
    }
    .progress-labels span.active {
      color: #0047ab;
      font-weight: 600;
    }
    .progress-bar-bg {
      width: 100%;
      height: 10px;
      background-color: #e6e6e6;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }
    .progress-bar-fill {
      position: absolute;
      height: 100%;
      width: 0%;
      background-color: #000080;
      transition: width 0.6s ease;
      border-radius: 10px;
    }

    /* Step transitions */
    .fade {
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .fade.show {
      opacity: 1;
    }

    /* Navigation buttons */
    .form-navigation {
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
    }
    .form-navigation button {
      background-color: #0047ab;
      border: none;
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
    }
    .form-navigation button:hover {
      background-color: #000080;
    }

    /* Validation feedback */
    input:invalid, select:invalid, textarea:invalid {
      border-color: red;
    }
    .error-message {
      color: red;
      font-size: 13px;
      margin-top: 4px;
    }

    #form-total > h2 {
      display: none; /* hide original titles */
    }
  `;
  document.head.appendChild(style);

  // Create progress bar
  const progressWrapper = document.createElement("div");
  progressWrapper.className = "progress-wrapper";

  const progressLabels = document.createElement("div");
  progressLabels.className = "progress-labels";

  stepHeaders.forEach((h) => {
    const label = document.createElement("span");
    label.textContent = h.textContent;
    progressLabels.appendChild(label);
  });

  const progressBarBg = document.createElement("div");
  progressBarBg.className = "progress-bar-bg";
  const progressBarFill = document.createElement("div");
  progressBarFill.className = "progress-bar-fill";
  progressBarBg.appendChild(progressBarFill);
  progressWrapper.appendChild(progressLabels);
  progressWrapper.appendChild(progressBarBg);
  form.prepend(progressWrapper);

  const labels = progressLabels.querySelectorAll("span");

  // Initialize steps
  steps.forEach((s, i) => {
    s.classList.add("fade");
    if (i === 0) s.classList.add("show");
    else s.style.display = "none";
  });
  updateProgress();

  // Create nav buttons
  steps.forEach((step, i) => {
    const navDiv = document.createElement("div");
    navDiv.className = "form-navigation";

    if (i > 0) {
      const prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.textContent = "Previous";
      prevBtn.className = "btn-prev";
      prevBtn.addEventListener("click", () => changeStep(-1));
      navDiv.appendChild(prevBtn);
    }

    if (i < steps.length - 1) {
      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.textContent = "Next";
      nextBtn.className = "btn-next";
      nextBtn.addEventListener("click", () => validateStep(step, i));
      navDiv.appendChild(nextBtn);
    } else {
      const submitBtn = document.createElement("button");
      submitBtn.type = "submit";
      submitBtn.textContent = "Submit";
      submitBtn.className = "btn-submit";
      navDiv.appendChild(submitBtn);
    }

    step.appendChild(navDiv);
  });

  // Validate current step
  function validateStep(step, index) {
    const inputs = step.querySelectorAll("input, select, textarea");
    let isValid = true;

    // Remove old error messages
    step.querySelectorAll(".error-message").forEach((e) => e.remove());

    inputs.forEach((input) => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        isValid = false;
        showError(input, "This field is required.");
      } else if (input.type === "email" && input.value.trim()) {
        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailPattern.test(input.value.trim())) {
          isValid = false;
          showError(input, "Please enter a valid email address.");
        }
      }
    });

    if (isValid) {
      changeStep(1);
    }
  }

  // Show validation error message
  function showError(input, message) {
    input.style.borderColor = "red";
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    input.insertAdjacentElement("afterend", error);
  }

  // Change step function
  function changeStep(direction) {
    const oldStep = steps[currentStep];
    oldStep.classList.remove("show");

    setTimeout(() => {
      oldStep.style.display = "none";
      currentStep += direction;
      if (currentStep < 0) currentStep = 0;
      if (currentStep >= steps.length) currentStep = steps.length - 1;

      const newStep = steps[currentStep];
      newStep.style.display = "block";
      setTimeout(() => newStep.classList.add("show"), 10);

      updateProgress();
      if (currentStep === steps.length - 1) fillConfirmation();
    }, 400);
  }

  // Update progress bar
  function updateProgress() {
    const totalSteps = steps.length;
    const progress = (currentStep / (totalSteps - 1)) * 100;
    progressBarFill.style.width = progress + "%";

    labels.forEach((lbl, i) => {
      lbl.classList.toggle("active", i === currentStep);
    });
  }

  // Fill confirmation summary
  function fillConfirmation() {
    const fullName =
      document.getElementById("first_name").value +
      " " +
      document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const gender = document.querySelector('input[name="gender"]:checked')
      ? document.querySelector('input[name="gender"]:checked').value
      : "";
    const accountName = document.getElementById("account_name").value;
    const accountNumber = document.getElementById("account_number").value;

    document.getElementById("fullname-val").textContent = fullName;
    document.getElementById("email-val").textContent = email;
    document.getElementById("phone-val").textContent = phone;
    document.getElementById("address-val").textContent = address;
    document.getElementById("gender-val").textContent = gender;
    document.getElementById("account-name-val").textContent = accountName;
    document.getElementById("account-number-val").textContent = accountNumber;
  }

  // Prevent submission for demo
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("✅ Form submitted successfully!");
  });
});
