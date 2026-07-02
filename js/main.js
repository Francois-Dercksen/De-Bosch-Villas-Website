document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = "0 4px 16px rgba(28,28,27,0.06)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const availabilityForm = document.querySelector(".availability-form");

  if (availabilityForm) {
    availabilityForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const checkin = new Date(checkinInput.value);
      const checkout = new Date(checkoutInput.value);
      const nights = (checkout - checkin) / (1000 * 60 * 60 * 24);

      if (!checkinInput.value || !checkoutInput.value) {
        alert("Please select both check-in and check-out dates.");
        return;
      }

      if (nights < 2) {
        alert("A minimum stay of 2 nights is required.");
        return;
      }

      alert("Availability checking will be enabled once the booking engine is connected.");
    });
  }
});