function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
  
    toast.innerHTML = `✅ ${message}`;
    toast.className = 'toast show';
  
    setTimeout(() => {
      toast.classList.add('hide');
    }, 2500);
  
    setTimeout(() => {
      toast.className = 'toast';
    }, 3000);
  }
  