document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('overlay');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.getElementById('searchContainer');
  
    // Side Bar Functions
    logo.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        // Mobile
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
      } else {
        // Desktop
        window.location.href = 'https://iharu0122.github.io/Paula-Website/index.html';
      }
    });
  
    // Overlay Click Closes Sidebar
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  
    // Search Bar Toggle
    searchIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchContainer.classList.toggle('active');
    });
  
    // Close Search Bar on Outside Click
    document.addEventListener('click', (e) => {
      if (
        searchContainer.classList.contains('active') &&
        !searchContainer.contains(e.target) &&
        !searchIcon.contains(e.target)
      ) {
        searchContainer.classList.remove('active');
      }
    });
  
    // Close Search Bar on ESC Key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
        searchContainer.classList.remove('active');
      }
    });
  });
  