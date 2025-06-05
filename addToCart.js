document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
  
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-to-cart')) {
        const button = event.target;
        
        const product = {
          id: button.getAttribute('data-id'),
          name: button.getAttribute('data-name'),
          desc: button.getAttribute('data-desc'),
          size: button.getAttribute('data-size'),
          price: parseFloat(button.getAttribute('data-price')),
          image: button.getAttribute('data-image')
        };
  
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
        const existingProduct = cart.find(item => item.id === product.id);
  
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
  
        localStorage.setItem('cart', JSON.stringify(cart));
  
        if (typeof showToast === "function") {
          showToast('Product added to cart!');
        }
        updateCartCount();
  
        if (document.querySelector('.cart-items')) {
          renderCart();
        }
      }
    });

    
  });
  