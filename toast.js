let toastTimeout1;
let toastTimeout2;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  clearTimeout(toastTimeout1);
  clearTimeout(toastTimeout2);

  toast.innerHTML = `✅ ${message}`;
  toast.className = 'toast show';

  toastTimeout1 = setTimeout(() => {
    toast.classList.add('hide');
  }, 2500);

  toastTimeout2 = setTimeout(() => {
    toast.className = 'toast';
    toast.innerHTML = '';
  }, 3000);
}
