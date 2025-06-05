document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  const sidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('overlay');

  // Unified logo click
  logo.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    } else {
      window.location.href = 'https://iharu0122.github.io/Paula-Website/index.html';
    }
  });

  overlay.addEventListener('click', function () {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Search Bar
  const searchIcon = document.querySelector('.search-icon');
  const searchContainer = document.getElementById('searchContainer');

  searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    searchContainer.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (searchContainer.classList.contains('active') &&
      !searchContainer.contains(e.target) &&
      !searchIcon.contains(e.target)) {
      searchContainer.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
      searchContainer.classList.remove('active');
    }
  });

  // === Cart Functionality ===
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartItemsContainer = document.querySelector('.cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const progressBar = document.getElementById('progress');

  renderCart();

  // Handle quantity and remove buttons
  cartItemsContainer.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    const action = event.target.dataset.action;

    if (event.target.classList.contains('quantity-btn')) {
      const product = cart.find(item => item.id === id);

      if (action === 'increase') {
        product.quantity++;
      } else if (action === 'decrease') {
        if (product.quantity > 1) {
          product.quantity--;
        } else {
          cart = cart.filter(item => item.id !== id);
        }
      }
      updateCart();
    }

    if (event.target.classList.contains('remove-btn')) {
      cart = cart.filter(item => item.id !== id);
      updateCart();
    }
  });

  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartContainer = document.querySelector('.cart-page');

    cartItemsContainer.innerHTML = ''; // Clear old items

    if (cart.length === 0) {
      cartContainer.style.display = 'block';
      emptyCartMessage.style.display = 'block'; // Show empty cart message
      document.querySelector('.cart-summary').style.display = 'none';
      document.querySelector('.related-products').style.display = 'none';
      return;
    } else {
      cartContainer.style.display = 'block';
      emptyCartMessage.style.display = 'none';
      document.querySelector('.cart-summary').style.display = 'block';
      document.querySelector('.related-products').style.display = 'block';
    }

    let subtotal = 0;

    cart.forEach(product => {
      const itemTotal = product.price * product.quantity;
      subtotal += itemTotal;

      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="item-details">
          <h2>${product.name}</h2>
          <p>${product.desc}</p>
          <p><strong>Size:</strong> ${product.size}</p>
          <div class="quantity-control">
            <button class="quantity-btn" data-id="${product.id}" data-action="decrease">-</button>
            <span>${product.quantity}</span>
            <button class="quantity-btn" data-id="${product.id}" data-action="increase">+</button>
          </div>
          <button class="remove-btn" data-id="${product.id}">Remove</button>
        </div>
        <div class="item-price">
          <p>A$${product.price}</p>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
    });

    subtotalElement.textContent = `A$${subtotal}`;

    let progress = Math.min((subtotal / 100) * 100, 100);
    progressBar.style.width = `${progress}%`;

    const freeShippingMsg = document.getElementById('free-shipping-msg');
    if (subtotal >= 100) {
      freeShippingMsg.textContent = 'You are eligible for free shipping!';
    } else {
      freeShippingMsg.textContent = `Spend extra A$${100 - subtotal} to be eligible for free shipping!`;
    }
  }
});
