const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principal");

if (menuButton && menu) {
  document.documentElement.classList.add("menu-ready");

  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", event => {
    if (!event.target.closest(".nav")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion && revealItems.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px 30px 0px" });

  revealItems.forEach(item => observer.observe(item));
  document.documentElement.classList.add("has-motion");
}
