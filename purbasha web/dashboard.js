/**
 * SUGARCANE360 — Dashboard Controller
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
    showToast(`Switched to inspecting ${plotId.toUpperCase().replace('-', ' ')}`, "info");
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
          rect.setAttribute("stroke", "#1b4332");
          rect.setAttribute("stroke-width", "2.5");
          rect.setAttribute("fill", "#d8f3dc");
        } else {
          rect.setAttribute("stroke", "#cadbce");
          rect.setAttribute("stroke-width", "1.5");
          rect.setAttribute("fill", "#edf3ee");
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
    statusBadge = `<span class="badge badge-good"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> Accepted by Farmer</span>`;
  } else if (decision === "modified") {
    statusBadge = `<span class="badge badge-warn"><i data-lucide="edit-3" style="width:12px;height:12px;"></i> Customized by Farmer</span>`;
  } else {
    statusBadge = `<span class="badge ${plot.statusCode === 'optimal' ? 'badge-good' : plot.statusCode === 'due' ? 'badge-warn' : plot.statusCode === 'required' ? 'badge-danger' : 'badge-info'}">${plot.status}</span>`;
  }

  container.innerHTML = `
    <div class="today-irrigation-card">
      <div class="today-card-top">
        <div class="today-plot-name">
          <i data-lucide="sprout" style="width:18px; height:18px;"></i>
          ${plot.name} (${plot.area}) &bull; ${plot.stage}
        </div>
        ${statusBadge}
      </div>

      <div class="today-main-action">
        ${plot.statusCode === 'excess' ? 'Water Stoppage Recommended' : plot.statusCode === 'optimal' ? 'Moisture Optimal — Standby' : `Irrigate ${plot.nextIrrigation.date} (${plot.nextIrrigation.timeWindow})`}
      </div>

      <div class="today-metrics-row">
        <div class="today-metric-item">
          <span class="today-metric-label">Soil Moisture</span>
          <span class="today-metric-value" style="color:${plot.soilMoisture < 35 ? 'var(--status-danger)' : 'var(--forest-dark)'};">
            ${plot.soilMoisture}%
          </span>
        </div>
        <div class="today-metric-item">
          <span class="today-metric-label">Recommended Duration</span>
          <span class="today-metric-value">${plot.nextIrrigation.duration}</span>
        </div>
        <div class="today-metric-item">
          <span class="today-metric-label">Est. Water Volume</span>
          <span class="today-metric-value" style="color:var(--forest);">${plot.nextIrrigation.waterReq}</span>
        </div>
        <div class="today-metric-item">
          <span class="today-metric-label">Assigned Pump</span>
          <span class="today-metric-value">${plot.nextIrrigation.pump}</span>
        </div>
      </div>

      <div class="today-card-bottom" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="font-size:0.82rem; color:var(--text-muted);">
          Soil Type: <strong>${plot.soilType}</strong> &bull; Water Stress: <strong>${plot.waterStress}</strong>
        </div>
        <a href="advisory.html?plot=${plot.id}" class="view-full-advisory-btn">
          Inspect Full Advisory &amp; Control &rarr;
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
      <!-- Card 1: Soil & Moisture Status -->
      <div class="card card-sm">
        <div class="status-card-header">
          <span class="status-card-label">Telemetry Status</span>
          <i data-lucide="activity" style="width:16px; height:16px; color:var(--forest);"></i>
        </div>
        <div class="status-stat-val">${plot.soilMoisture}%</div>
        <div class="status-stat-sub">Current Soil Moisture (${plot.soilType})</div>
      </div>

      <!-- Card 2: Weekly Water Consumption -->
      <div class="card card-sm">
        <div class="status-card-header">
          <span class="status-card-label">Weekly Usage</span>
          <i data-lucide="droplets" style="width:16px; height:16px; color:var(--forest);"></i>
        </div>
        <div class="status-stat-val">${SUGARCANE_DATA.waterSummary.waterUsed}</div>
        <div class="status-stat-sub">Target Budget: ${SUGARCANE_DATA.waterSummary.recommendedWater}</div>
      </div>

      <!-- Card 3: Weather Forecast Alert -->
      <div class="card card-sm">
        <div class="status-card-header">
          <span class="status-card-label">Local Forecast</span>
          <i data-lucide="cloud-rain" style="width:16px; height:16px; color:var(--forest);"></i>
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
      <div style="display:flex; align-items:center; gap:10px;">
        <i data-lucide="${a.category === 'Soil Moisture' ? 'alert-circle' : a.category === 'Weather' ? 'cloud-rain' : 'bell'}" 
           style="width:16px; height:16px; color:${a.category === 'Soil Moisture' ? 'var(--status-warn)' : 'var(--forest)'}; flex-shrink:0;"></i>
        <div>
          <div style="font-weight:700; color:var(--forest-dark); font-size:0.86rem;">${a.title}</div>
          <div style="font-size:0.78rem; color:var(--text-muted);">${a.message}</div>
        </div>
      </div>
      <a href="${a.link}" class="btn btn-secondary btn-sm" style="font-size:0.75rem; padding:4px 8px;">Inspect</a>
    </div>
  `).join("");
}
