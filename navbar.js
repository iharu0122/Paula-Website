document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('overlay');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.getElementById('searchContainer');
  
    // Sidebar Toggle
    logo.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
      } else {
        window.location.href = 'https://iharu0122.github.io/Paula-Website/index.html';
      }
    });
  
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  
    // Search Toggle
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
  });
  