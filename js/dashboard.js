/**
 * SUGARCANE360 — Dashboard Controller (Portal Sharp Spec)
 * Handles SVG Plot Selection, Today's Advisory Card, 3 Status Cards, and Alerts List
 */

document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();

  window.addEventListener("sugarcane:plot-selected", () => {
    renderDashboard();
  });
});

function switchPlot(plotId) {
  AppState.setSelectedPlotId(plotId);
  renderDashboard();
  if (typeof showToast === "function") {
    showToast(`INSPECTING ${plotId.toUpperCase().replace('-', ' ')}`, "info");
  }
}

function renderDashboard() {
  const selectedId = AppState.getSelectedPlotId();
  updateFarmSvgHighlight(selectedId);
  renderTodayAdvisory(selectedId);
  renderStatusCards(selectedId);
  renderDashAlerts();

  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
}

function updateFarmSvgHighlight(selectedId) {
  const plots = ["plot-a", "plot-b", "plot-c", "plot-d"];
  plots.forEach(id => {
    const el = document.getElementById(`svg-${id}`);
    if (el) {
      const rect = el.querySelector("rect");
      if (rect) {
        if (id === selectedId) {
          rect.setAttribute("stroke", "#003366");
          rect.setAttribute("stroke-width", "3");
          rect.setAttribute("fill", "#e6f0fa");
        } else {
          rect.setAttribute("stroke", "#cccccc");
          rect.setAttribute("stroke-width", "2");
          rect.setAttribute("fill", "#ffffff");
        }
      }
    }
  });
}

function renderTodayAdvisory(selectedId) {
  const container = document.getElementById("dashAdvisoryContainer");
  if (!container) return;

  const plot = SUGARCANE_DATA.plots.find(p => p.id === selectedId) || SUGARCANE_DATA.plots[0];
  const decision = AppState.getDecision(plot.id);

  let statusBadge = "";
  if (decision === "accepted") {
    statusBadge = `<span class="badge badge-good">Accepted by Farmer</span>`;
  } else if (decision === "modified") {
    statusBadge = `<span class="badge badge-warn">Customized by Farmer</span>`;
  } else {
    statusBadge = `<span class="badge ${plot.statusCode === 'optimal' ? 'badge-good' : plot.statusCode === 'due' ? 'badge-warn' : plot.statusCode === 'required' ? 'badge-danger' : 'badge-info'}">${plot.status}</span>`;
  }

  container.innerHTML = `
    <div class="today-irrigation-card">
      <div class="today-card-top">
        <div class="today-plot-name">
          ${plot.name} (${plot.area}) &bull; Stage: ${plot.stage}
        </div>
        ${statusBadge}
      </div>

      <div class="today-main-action">
        ${plot.statusCode === 'excess' ? 'WATER STOPPAGE RECOMMENDED' : plot.statusCode === 'optimal' ? 'MOISTURE OPTIMAL — STANDBY' : `IRRIGATE ${plot.nextIrrigation.date.toUpperCase()} (${plot.nextIrrigation.timeWindow})`}
      </div>

      <div class="today-metrics-row">
        <div class="today-metric-item">
          <span class="today-metric-label">Soil Moisture</span>
          <span class="today-metric-value" style="color:${plot.soilMoisture < 35 ? '#d9534f' : '#003366'};">
            ${plot.soilMoisture}%
          </span>
        </div>
        <div class="today-metric-item">
          <span class="today-metric-label">Recommended Duration</span>
          <span class="today-metric-value">${plot.nextIrrigation.duration}</span>
        </div>
        <div class="today-metric-item">
          <span class="today-metric-label">Est. Water Volume</span>
          <span class="today-metric-value" style="color:#0056b3;">${plot.nextIrrigation.waterReq}</span>
        </div>
        <div class="today-metric-item">
          <span class="today-metric-label">Assigned Pump</span>
          <span class="today-metric-value">${plot.nextIrrigation.pump}</span>
        </div>
      </div>

      <div class="today-card-bottom" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="font-size:0.95rem; color:#333333; font-weight:bold;">
          Soil Type: <strong style="color:#003366;">${plot.soilType}</strong> &bull; Water Stress: <strong style="color:#003366;">${plot.waterStress}</strong>
        </div>
        <a href="advisory.html?plot=${plot.id}" class="view-full-advisory-btn">
          INSPECT ADVISORY &amp; PUMP &rarr;
        </a>
      </div>
    </div>
  `;
}

function renderStatusCards(selectedId) {
  const container = document.getElementById("dashStatusContainer");
  if (!container) return;

  const plot = SUGARCANE_DATA.plots.find(p => p.id === selectedId) || SUGARCANE_DATA.plots[0];
  const weather = SUGARCANE_DATA.weather.current;

  container.innerHTML = `
    <div class="status-3-grid">
      <!-- Card 1: Soil Telemetry -->
      <div class="card card-sm">
        <div class="status-card-header">
          <span class="status-card-label">Telemetry Status</span>
        </div>
        <div class="status-stat-val">${plot.soilMoisture}%</div>
        <div class="status-stat-sub">Soil Moisture (${plot.soilType})</div>
      </div>

      <!-- Card 2: Weekly Water Consumption -->
      <div class="card card-sm">
        <div class="status-card-header">
          <span class="status-card-label">Weekly Usage</span>
        </div>
        <div class="status-stat-val">${SUGARCANE_DATA.waterSummary.waterUsed}</div>
        <div class="status-stat-sub">Target Budget: ${SUGARCANE_DATA.waterSummary.recommendedWater}</div>
      </div>

      <!-- Card 3: Weather Alert -->
      <div class="card card-sm">
        <div class="status-card-header">
          <span class="status-card-label">Local Forecast</span>
        </div>
        <div class="status-stat-val">${weather.temp} &bull; ${weather.rainProb} Rain</div>
        <div class="status-stat-sub">${weather.condition} &bull; Kolhapur</div>
      </div>
    </div>
  `;
}

function renderDashAlerts() {
  const container = document.getElementById("dashAlertsList");
  if (!container) return;

  const alerts = AppState.getAlerts().slice(0, 3);
  container.innerHTML = alerts.map(a => `
    <div class="alert-row-item">
      <div>
        <div style="font-weight:bold; color:#003366; font-size:1rem;">${a.title.toUpperCase()}</div>
        <div style="font-size:0.9rem; color:#333333;">${a.message}</div>
      </div>
      <a href="${a.link}" class="btn btn-secondary btn-sm">Inspect Alert</a>
    </div>
  `).join("");
}
