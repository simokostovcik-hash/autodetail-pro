(() => {
  "use strict";
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");
  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");

  if (toggle && menu) {
    const setMenuOpen = (open) => {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    };
    toggle.addEventListener("click", () => setMenuOpen(!menu.classList.contains("is-open")));
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        setMenuOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (menu.classList.contains("is-open") && !menu.contains(event.target) && !toggle.contains(event.target)) setMenuOpen(false);
    });
    const desktop = window.matchMedia("(min-width: 901px)");
    desktop.addEventListener("change", (event) => { if (event.matches) setMenuOpen(false); });
  }

  if (form && status) {
    form.addEventListener("input", () => { status.textContent = ""; });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = "Please complete all fields with valid sample information.";
        form.reportValidity();
        return;
      }
      form.reset();
      status.textContent = "Demo complete! Nothing was sent or saved. This form has no backend.";
    });
  }
})();
