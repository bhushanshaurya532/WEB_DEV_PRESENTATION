/**
 * SUGARCANE360 — Shared Main Controller (Portal Sharp Spec)
 * Handles Top Navigation, Active Page Highlighting, Mobile Toggle, and Notifications
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
    toast.remove();
  }, 2500);
}
