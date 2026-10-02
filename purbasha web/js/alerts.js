/**
 * SUGARCANE360 — Alerts Controller
 */

let activeAlertFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  renderAlertsFeed();
  initFilterButtons();
  initMarkAllRead();
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
});

function initFilterButtons() {
  const btns = document.querySelectorAll(".alert-pill-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => {
        b.classList.remove("active");
        b.style.background = "var(--cream)";
        b.style.color = "var(--forest-dark)";
      });
      btn.classList.add("active");
      btn.style.background = "var(--forest)";
      btn.style.color = "#ffffff";
      activeAlertFilter = btn.getAttribute("data-category");
      renderAlertsFeed();
    });
  });
}

function initMarkAllRead() {
  const btn = document.getElementById("btnMarkAllRead");
  if (btn) {
    btn.onclick = () => {
      const alerts = AppState.getAlerts();
      alerts.forEach(a => a.read = true);
      AppState.saveAlerts(alerts);
      renderAlertsFeed();
      showToast("All alerts marked as read.", "info");
    };
  }
}

function renderAlertsFeed() {
  const container = document.getElementById("alertsFeedList");
  if (!container) return;

  const alerts = AppState.getAlerts();
  let filtered = alerts;

  if (activeAlertFilter === "unread") {
    filtered = alerts.filter(a => !a.read);
  } else if (activeAlertFilter !== "all") {
    filtered = alerts.filter(a => a.category.toLowerCase().includes(activeAlertFilter.toLowerCase()));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align:center; padding:32px; color:var(--text-muted);">
        <i data-lucide="bell-off" style="width:32px; height:32px; margin-bottom:8px; opacity:0.5;"></i>
        <div>No alerts in this view.</div>
      </div>
    `;
    if (typeof lucide !== "undefined" && lucide.createIcons) lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(a => `
    <div class="card" style="padding:16px; margin-bottom:12px; border-left:4px solid ${a.read ? 'var(--border)' : 'var(--forest)'}; background:${a.read ? 'var(--white)' : 'var(--forest-subtle)'};">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
        <div style="flex:1; min-width:260px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span class="badge ${a.type === 'danger' ? 'badge-danger' : a.type === 'info' ? 'badge-info' : 'badge-warn'}">
              ${a.category}
            </span>
            <strong style="color:var(--forest-dark); font-size:0.95rem;">${a.title}</strong>
            ${!a.read ? '<span style="width:8px; height:8px; background:var(--status-warn); border-radius:50%; display:inline-block;" title="Unread"></span>' : ''}
          </div>
          <p style="font-size:0.86rem; color:var(--text-main); margin-bottom:6px; line-height:1.45;">
            ${a.message}
          </p>
          <div style="font-size:0.75rem; color:var(--text-muted);">${a.date || a.time}</div>
        </div>

        <div style="display:flex; gap:8px; align-items:center;">
          <button class="btn btn-secondary btn-sm" onclick="toggleAlertRead('${a.id}')">
            ${a.read ? 'Mark Unread' : 'Mark Read'}
          </button>
          <a href="${a.link || 'advisory.html'}" class="btn btn-primary btn-sm">
            Inspect &rarr;
          </a>
        </div>
      </div>
    </div>
  `).join("");

  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
}

function toggleAlertRead(id) {
  const alerts = AppState.getAlerts();
  const alert = alerts.find(a => a.id === id);
  if (alert) {
    alert.read = !alert.read;
    AppState.saveAlerts(alerts);
    renderAlertsFeed();
  }
}
