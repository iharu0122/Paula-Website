// productpage2.js
document.addEventListener('DOMContentLoaded', () => {
    const product = {
      id: "product-002",
      name: "Explore Exfoliation Mini Kit",
      desc: "Get smoother, clearer skin with this 3-piece mini kit featuring our bestselling exfoliants. Ideal for discovering your perfect match.",
      size: "Kit",
      price: 90,
      image: "images/explorekit.png"
    };
  
    const addToCartButton = document.querySelector('.add-to-cart');
  
    addToCartButton.addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      const existingProduct = cart.find(item => item.id === product.id);
  
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
  
      showToast('Product added to cart!');
      updateCartCount();
    });
  });
  