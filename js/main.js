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

  function setupToggleBar(barId, panelId, arrowId) {
    const bar = document.getElementById(barId);
    const panel = document.getElementById(panelId);
    const arrow = arrowId ? document.getElementById(arrowId) : null;

    if (!bar || !panel) {
      console.warn(`Toggle bar setup failed: missing #${barId} or #${panelId} in the DOM.`);
      return null;
    }

    function toggle(e) {
      if (e) e.preventDefault();
      const isOpen = panel.classList.toggle("open");
      if (arrow) arrow.classList.toggle("open", isOpen);
      bar.setAttribute("aria-expanded", String(isOpen));
      return isOpen;
    }

    function open() {
      if (!panel.classList.contains("open")) {
        panel.classList.add("open");
        if (arrow) arrow.classList.add("open");
        bar.setAttribute("aria-expanded", "true");
      }
    }

    bar.addEventListener("click", toggle);
    bar.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    return { toggle, open };
  }

  setupToggleBar("galleryToggleBar", "imageGallery", "galleryArrow");
  setupToggleBar("policiesToggleBar", "policiesList", "policiesArrow");

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
});
