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
