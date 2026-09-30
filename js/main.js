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

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.style.boxShadow = "0 4px 16px rgba(28,28,27,0.06)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }

  const navToggle = document.getElementById("navToggle");
  const navClose = document.getElementById("navClose");
  const mainNav = document.getElementById("mainNav");
  const navOverlay = document.getElementById("navOverlay");

  function openNav() {
    mainNav.classList.add("open");
    navOverlay.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    mainNav.classList.remove("open");
    navOverlay.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle) {
    navToggle.addEventListener("click", openNav);
  }

  if (navClose) {
    navClose.addEventListener("click", closeNav);
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", closeNav);
  }

  if (mainNav) {
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeNav);
    });
  }

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const status = document.getElementById("contactFormStatus");
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "contact-form-status";
      status.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const data = Object.fromEntries(new FormData(contactForm));
        const res = await fetch(contactForm.action, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        });
        const json = await res.json();

        if (res.ok && json.success) {
          contactForm.reset();
          status.textContent = "Thank you. Your enquiry has been sent and we will be in touch shortly.";
          status.classList.add("success");
        } else {
          throw new Error(json.message || "Submission failed");
        }
      } catch (err) {
        status.textContent = "Sorry, something went wrong. Please email villas@debosch.co.za or call +27 73 528 2352.";
        status.classList.add("error");
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
