// === Checkout Page JavaScript ===
document.addEventListener('DOMContentLoaded', () => {
  const cardBtn = document.getElementById("card-btn");
  const cashBtn = document.getElementById("cash-btn");
  const applePayBtn = document.getElementById("applepay-btn");
  const cardForm = document.getElementById("card-form");

  const checkoutBtn = document.querySelector(".checkout-btn");
  const saveAddressBtn = document.querySelector(".save-address");
  const savedAddressDisplay = document.getElementById('saved-address');
  const requiredFields = document.querySelectorAll('.address-form input[required]');

  const cardNumberInput = document.getElementById('card-number');
  const expiryInput = document.getElementById('expiry');
  const cvvInput = document.getElementById('cvv');

  const cardNumberError = document.getElementById('card-number-error');
  const expiryError = document.getElementById('expiry-error');
  const cvvError = document.getElementById('cvv-error');

  const changeLink = document.querySelector('.change-link');

  let addressSaved = false;

  // Order Summary Based on Cart ===
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const subtotalElement = document.querySelector('.summary-line span:nth-child(2)');
  const totalElement = document.querySelector('.summary-total strong:nth-child(2)');

  if (subtotalElement) {
    subtotalElement.textContent = `A$${subtotal}`;
  }
  if (totalElement) {
    totalElement.textContent = `A$${subtotal}`;
  }

  // --- Payment Method Selection ---
  cardBtn.addEventListener("click", () => {
    cardBtn.classList.add("selected");
    cashBtn.classList.remove("selected");
    applePayBtn.classList.remove("selected");
    cardForm.style.display = "block";
  });

  cashBtn.addEventListener("click", () => {
    cashBtn.classList.add("selected");
    cardBtn.classList.remove("selected");
    applePayBtn.classList.remove("selected");
    cardForm.style.display = "none";
  });

  applePayBtn.addEventListener("click", () => {
    applePayBtn.classList.add("selected");
    cardBtn.classList.remove("selected");
    cashBtn.classList.remove("selected");
    cardForm.style.display = "none";
  });

  // --- Validate Address Form ---
  function validateAddressForm() {
    let allValid = true;

    requiredFields.forEach(field => {
      const value = field.value.trim();

      if (value === "") {
        field.style.borderColor = 'red';
        allValid = false;
      } else {
        field.style.borderColor = '#ddd';
      }
    });

    return allValid;
  }

  // --- Validate Card Form ---
  function validateCardForm() {
    let valid = true;

    if (cardNumberInput.value.trim() === "") {
      cardNumberInput.style.borderColor = "red";
      cardNumberError.textContent = "Card number required";
      valid = false;
    } else {
      cardNumberInput.style.borderColor = "#ccc";
      cardNumberError.textContent = "";
    }

    if (expiryInput.value.trim() === "") {
      expiryInput.style.borderColor = "red";
      expiryError.textContent = "Expiry date required";
      valid = false;
    } else {
      expiryInput.style.borderColor = "#ccc";
      expiryError.textContent = "";
    }

    if (cvvInput.value.trim() === "") {
      cvvInput.style.borderColor = "red";
      cvvError.textContent = "CVV required";
      valid = false;
    } else {
      cvvInput.style.borderColor = "#ccc";
      cvvError.textContent = "";
    }

    return valid;
  }

  function updateCheckoutButton() {
    if (addressSaved && cardNumberInput.value.trim() !== "" && expiryInput.value.trim() !== "" && cvvInput.value.trim() !== "") {
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove('disabled-checkout-btn');
      checkoutBtn.classList.add('enabled');
    } else {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add('disabled-checkout-btn');
      checkoutBtn.classList.remove('enabled');
    }
  }
  
  const orderModal = document.getElementById('orderModal');

  checkoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Show the modal
    orderModal.style.display = 'flex';
  });
  
  saveAddressBtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    const formIsValid = validateAddressForm();
  
    if (formIsValid) {
      const formValues = {
        fullName: document.getElementById('full-name').value.trim(),
        address1: document.getElementById('address-line-1').value.trim(),
        address2: document.getElementById('address-line-2').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        zip: document.getElementById('zip').value.trim(),
        country: document.getElementById('country').value.trim()
      };
  
      // Build the address without empty fields
      let addressHTML = '';
      if (formValues.fullName) addressHTML += `${formValues.fullName}<br>`;
      if (formValues.address1) addressHTML += `${formValues.address1}<br>`;
      if (formValues.address2) addressHTML += `${formValues.address2}<br>`;
      if (formValues.city || formValues.state || formValues.zip) {
        addressHTML += `${formValues.city}${formValues.city && formValues.state ? ', ' : ''}${formValues.state} ${formValues.zip}<br>`;
      }
      if (formValues.country) addressHTML += `${formValues.country}`;
  
      savedAddressDisplay.innerHTML = addressHTML;
  
      requiredFields.forEach(field => {
        field.disabled = true;
        field.classList.add('locked-field');
      });
  
      saveAddressBtn.disabled = true;
      saveAddressBtn.classList.add('locked-save-btn');
  
      addressSaved = true;
  
      // Show save message
      const saveMessage = document.getElementById('save-message');
      saveMessage.classList.add('show');
  
      updateCheckoutButton();
    }
  });
  

  // Listen to card input changes to update checkout button
  [cardNumberInput, expiryInput, cvvInput].forEach(input => {
    input.addEventListener('input', updateCheckoutButton);
  });

  // --- Unlock Address Form on "Change" Click ---
  changeLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Unlock the address fields
    requiredFields.forEach(field => {
      field.disabled = false;
      field.classList.remove('locked-field');
    });

    // Enable the Save Address button again
    saveAddressBtn.disabled = false;
    saveAddressBtn.classList.remove('locked-save-btn');

    // Hide save message
    const saveMessage = document.getElementById('save-message');
    saveMessage.classList.remove('show');

    // Update addressSaved flag
    addressSaved = false;

    // Update checkout button state
    updateCheckoutButton();
  });

  document.getElementById('trackOrderBtn').addEventListener('click', function() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('thankyouModal').style.display = 'flex';
  });

});

// Easter Egg
  function closeThankYou() {
    const thankyouModalContent = document.querySelector('#thankyouModal .modal-content');
    thankyouModalContent.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = 'https://iharu0122.github.io/Paula-Website/index.html';
    }, 200);
  }
  

