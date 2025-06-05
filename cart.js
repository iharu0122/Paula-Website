document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');

  if (cartCountElement) {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalCount > 0) {
      cartCountElement.style.display = 'flex';
      cartCountElement.textContent = totalCount;

      cartCountElement.classList.remove('bump');
      void cartCountElement.offsetWidth;
      cartCountElement.classList.add('bump');
    } else {
      cartCountElement.style.display = 'none';
    }
  }
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartItemsContainer = document.querySelector('.cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const progressBar = document.getElementById('progress');
  const emptyCartMessage = document.querySelector('.empty-cart-message');
  const cartSummary = document.querySelector('.cart-summary');
  const relatedProducts = document.querySelector('.related-products');

  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    emptyCartMessage.style.display = 'block';
    cartSummary.style.display = 'none';
    relatedProducts.style.display = 'none';
    return;
  } else {
    emptyCartMessage.style.display = 'none';
    cartSummary.style.display = 'block';
    relatedProducts.style.display = 'block';
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

  // Event delegation for quantity and remove buttons
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
          cart.splice(cart.indexOf(product), 1);
        }
      }
      updateCart(cart);
    }

    if (event.target.classList.contains('remove-btn')) {
      cart.splice(cart.findIndex(item => item.id === id), 1);
      updateCart(cart);
    }
  });
}

// Helper function to update cart in localStorage
function updateCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}
