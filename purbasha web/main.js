/**
 * SUGARCANE360 — Shared Main Controller
 * Handles Top Navigation, Active Page Highlighting, Mobile Toggle, and Notifications
 * Strictly Vanilla JS (No Frameworks)
 */

document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initTopNavbar();
  initActiveNav();
  initToastBox();
});

function initIcons() {
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
}

/**
 * Top Navigation & Mobile Hamburger Menu
 */
function initTopNavbar() {
  const toggleBtn = document.getElementById("navToggleBtn");
  const navMenu = document.getElementById("navLinksMenu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("open");
    });

    // Close when clicking any nav link
    navMenu.querySelectorAll(".nav-item-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && e.target !== toggleBtn) {
        navMenu.classList.remove("open");
      }
    });
  }
}

/**
 * Highlight Current Active Page in Top Navigation
 */
function initActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-item-link");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Toast Notification System
 */
function initToastBox() {
  if (!document.getElementById("toastContainer")) {
    const box = document.createElement("div");
    box.id = "toastContainer";
    box.className = "toast-container";
    document.body.appendChild(box);
  }
}

function showToast(text, type = "info") {
  const container = document.getElementById("toastContainer") || document.body;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${text}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}
