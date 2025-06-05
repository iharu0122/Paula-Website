document.addEventListener('DOMContentLoaded', () => {
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
    cardForm.style.display = "none";
  });

  applePayBtn.addEventListener("click", () => {
    applePayBtn.classList.add("selected");
    cardBtn.classList.remove("selected");
    cashBtn.classList.remove("selected");
    cardForm.style.display = "none";
  });

  // Handle Checkout Modal
  const checkoutBtn = document.querySelector(".checkout-btn");
  const modal = document.getElementById("orderModal");

  checkoutBtn.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  // Handle Track Order Button
  const trackBtn = document.querySelector(".track-btn");
  trackBtn.addEventListener("click", function () {
    window.location.href = "track-order.html";
  });
});
