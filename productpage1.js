// productpage1.js
document.addEventListener('DOMContentLoaded', () => {
  const product = {
    id: "product-001",
    name: "BHA Kit for Face & Body",
    desc: "Get smooth, glowing skin from head to toe with two potent BHA exfoliants formulated for your face and body.",
    size: "Kit",
    price: 80,
    image: "images/BHAKIT.png"
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
