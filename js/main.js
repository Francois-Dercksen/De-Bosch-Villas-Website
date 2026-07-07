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
  const formError = document.getElementById("form-error");
  const formErrorText = formError ? formError.querySelector(".form-error-text") : null;
  const formErrorClose = formError ? formError.querySelector(".form-error-close") : null;

  function showFormError(message) {
    if (!formError || !formErrorText) return;
    formErrorText.textContent = message;
    formError.classList.add("visible");
  }

  function hideFormError() {
    if (!formError) return;
    formError.classList.remove("visible");
  }

  if (formErrorClose) {
    formErrorClose.addEventListener("click", hideFormError);
  }

  if (availabilityForm) {
    availabilityForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideFormError();

      const checkinValue = checkinInput.value;
      const checkoutValue = checkoutInput.value;

      if (!checkinValue || !checkoutValue) {
        showFormError("Please select both a check-in and check-out date.");
        return;
      }

      const checkin = new Date(checkinValue + "T00:00:00");
      const checkout = new Date(checkoutValue + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkin < today) {
        showFormError("Check-in date cannot be in the past. Please choose a valid date.");
        return;
      }

      if (checkout <= checkin) {
        showFormError("Check-out date must be after your check-in date.");
        return;
      }

      const nights = (checkout - checkin) / (1000 * 60 * 60 * 24);

      if (nights < 2) {
        showFormError("A minimum stay of 2 nights is required. Please adjust your dates.");
        return;
      }

      showFormError("Availability checking will be enabled once the booking engine is connected.");
    });

    checkinInput.addEventListener("change", hideFormError);
    checkoutInput.addEventListener("change", hideFormError);
  }

  const galleryToggleBar = document.getElementById("galleryToggleBar");
  const imageGallery = document.getElementById("imageGallery");
  const galleryArrow = document.getElementById("galleryArrow");

  function toggleGallery() {
    const isOpen = imageGallery.classList.toggle("open");
    galleryArrow.classList.toggle("open", isOpen);
    galleryToggleBar.setAttribute("aria-expanded", isOpen);
  }

  if (galleryToggleBar) {
    galleryToggleBar.addEventListener("click", toggleGallery);
    galleryToggleBar.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleGallery();
      }
    });
  }
});
