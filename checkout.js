document.addEventListener('DOMContentLoaded', () => {
// Handle Nav Bar Opening And Closing
const logo = document.querySelector('.logo');
const sidebar = document.getElementById('mobileSidebar');
const overlay = document.getElementById('overlay');

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

// Toggle active class
searchIcon.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  searchContainer.classList.toggle('active');
});

// Close on clicking outside
document.addEventListener('click', (e) => {
  if (searchContainer.classList.contains('active') && !searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
    searchContainer.classList.remove('active');
  }
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
    searchContainer.classList.remove('active');
  }
});

// Handle Payment Option Selection
const cardBtn = document.getElementById("card-btn");
const cashBtn = document.getElementById("cash-btn");
const applePayBtn = document.getElementById("applepay-btn");
const cardForm = document.getElementById("card-form");

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
  cardForm.style.display = "none"; // Hide card form
});

applePayBtn.addEventListener("click", () => {
  applePayBtn.classList.add("selected");
  cardBtn.classList.remove("selected");
  cashBtn.classList.remove("selected");
  cardForm.style.display = "none"; // Hide card form
});

// Handle Checkout Modal
const checkoutBtn = document.querySelector(".checkout-btn");
const modal = document.getElementById("orderModal");

checkoutBtn.addEventListener("click", function () {
  modal.style.display = "flex"; // Show 
});

// Handle Track Order Button
const trackBtn = document.querySelector(".track-btn");
trackBtn.addEventListener("click", function () {
  window.location.href = "track-order.html"; // link page
});

// Logo Click to Landing Page 
logo.addEventListener('click', () => {
  if (window.innerWidth > 768) {
    window.location.href = 'https://iharu0122.github.io/Paula-Website/index.html'; 
  }
});
});
