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

// Click on overlay closes sidebar
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

// Logo Click to Landing Page 
  logo.addEventListener('click', () => {
    if (window.innerWidth > 768) {
      window.location.href = 'https://iharu0122.github.io/Paula-Website/index.html'; 
    }
  });
});