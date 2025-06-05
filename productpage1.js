document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  const sidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('overlay');

  // Open sidebar and overlay
  logo.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  });

  overlay.addEventListener('click', function() {
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

  // Logo Click to Landing Page 
  logo.addEventListener('click', () => {
    if (window.innerWidth > 768) {
      window.location.href = 'https://iharu0122.github.io/Paula-Website/index.html'; 
    }
  });

  // ============================================================================ Add to Cart Script ==================================================

  // Define the product data for this page
  const product = {
    id: "product-001",
    name: "BHA Kit for Face & Body",
    desc: "Get smooth, glowing skin from head to toe with two potent BHA exfoliants formulated for your face and body.",
    size: "Kit",
    price: 80,
    image: "images/BHAKIT.png"
  };

  // Toast function
  function showToast(message) {
    const toast = document.getElementById('toast');
    
    toast.innerHTML = `✅ ${message}`;
    
    toast.className = 'toast show';
  
    setTimeout(() => {
      toast.classList.add('hide');
    }, 2500);
  
    setTimeout(() => {
      toast.className = 'toast';
    }, 3000);
  }

  // Add to Cart Button
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

    // Show toast with icon
    showToast('Product added to cart!');

    // Update the cart count badge
    updateCartCount();
  });

  // Update Cart Count in Badge
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalCount > 0) {
        cartCountElement.style.display = 'flex';
        cartCountElement.textContent = totalCount;

        // Bounce effect
        cartCountElement.classList.remove('bump');
        void cartCountElement.offsetWidth;
        cartCountElement.classList.add('bump');
    } else {
        cartCountElement.style.display = 'none';
    }
}
  // Call on page load to show existing cart count
  updateCartCount();
});
