/**
 * SUGARCANE360 — Plots Controller (Portal Sharp Spec)
 */

document.addEventListener("DOMContentLoaded", () => {
  renderPlotsView();

  window.addEventListener("sugarcane:plot-selected", () => {
    renderPlotsView();
  });
});

function renderPlotsView() {
  const selectedId = AppState.getSelectedPlotId();
  renderPlotsList(selectedId);
  renderPlotDetail(selectedId);
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
}

function renderPlotsList(selectedId) {
  const container = document.getElementById("plotsListContainer");
  if (!container) return;

  const plots = SUGARCANE_DATA.plots;
  container.innerHTML = plots.map(p => {
    const isSelected = p.id === selectedId;
    return `
      <div class="card" onclick="selectPlotView('${p.id}')" 
           style="cursor:pointer; border-width:${isSelected ? '3px' : '1px'}; border-color:${isSelected ? '#003366' : '#cccccc'}; background:${isSelected ? '#e6f0fa' : '#ffffff'}; margin-bottom:12px; padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <h3 style="font-size:1.15rem; color:#003366; font-weight:bold;">${p.name.toUpperCase()} (${p.area})</h3>
          <span class="badge ${p.statusCode === 'optimal' ? 'badge-good' : p.statusCode === 'due' ? 'badge-warn' : p.statusCode === 'required' ? 'badge-danger' : 'badge-info'}">
            ${p.status}
          </span>
        </div>
        <div style="font-size:0.95rem; color:#333333; margin-bottom:8px;">
          Soil: <strong>${p.soilType}</strong> &bull; Stage: <strong>${p.stage}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.95rem; align-items:center;">
          <span>Moisture: <strong style="color:${p.soilMoisture < 35 ? '#d9534f' : '#003366'};">${p.soilMoisture}%</strong></span>
          <span style="color:#0056b3; font-weight:bold;">Next: ${p.nextIrrigation.date} &rarr;</span>
        </div>
      </div>
    `;
  }).join("");
}

function selectPlotView(id) {
  AppState.setSelectedPlotId(id);
  renderPlotsView();
  if (typeof showToast === 'function') showToast(`INSPECTING ${id.toUpperCase().replace('-', ' ')}`, "info");
}

function renderPlotDetail(selectedId) {
  const container = document.getElementById("plotDetailContainer");
  if (!container) return;

  const p = SUGARCANE_DATA.plots.find(item => item.id === selectedId) || SUGARCANE_DATA.plots[0];

  container.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; border-bottom:2px solid #0056b3; padding-bottom:8px;">
        <div>
          <h2 style="font-size:1.4rem; color:#003366;">${p.name.toUpperCase()} DETAILED PROFILE</h2>
          <div style="font-size:0.9rem; color:#555555; margin-top:2px;">
            PLOT ID: ${p.id.toUpperCase()} &bull; AREA: ${p.area} &bull; CROP: ${p.crop}
          </div>
        </div>
        <a href="advisory.html?plot=${p.id}" class="btn btn-primary btn-sm">
          VIEW AI ADVISORY &rarr;
        </a>
      </div>

      <!-- 4 Quick Stats Grid -->
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-bottom:16px;">
        <div style="background:#f8f9fa; padding:12px; border:1px solid #cccccc;">
          <div style="font-size:0.82rem; color:#003366; font-weight:bold; text-transform:uppercase;">Crop &amp; Growth Stage</div>
          <div style="font-size:1.1rem; font-weight:bold; color:#003366; margin-top:2px;">${p.stage}</div>
        </div>
        <div style="background:#f8f9fa; padding:12px; border:1px solid #cccccc;">
          <div style="font-size:0.82rem; color:#003366; font-weight:bold; text-transform:uppercase;">Soil Texture &amp; Moisture</div>
          <div style="font-size:1.1rem; font-weight:bold; color:#003366; margin-top:2px;">${p.soilType} &bull; ${p.soilMoisture}%</div>
        </div>
        <div style="background:#f8f9fa; padding:12px; border:1px solid #cccccc;">
          <div style="font-size:0.82rem; color:#003366; font-weight:bold; text-transform:uppercase;">Next Irrigation Window</div>
          <div style="font-size:1.1rem; font-weight:bold; color:#0056b3; margin-top:2px;">${p.nextIrrigation.date} &bull; ${p.nextIrrigation.time}</div>
        </div>
        <div style="background:#f8f9fa; padding:12px; border:1px solid #cccccc;">
          <div style="font-size:0.82rem; color:#003366; font-weight:bold; text-transform:uppercase;">Water Requirement</div>
          <div style="font-size:1.1rem; font-weight:bold; color:#003366; margin-top:2px;">${p.nextIrrigation.waterReq} (${p.nextIrrigation.duration})</div>
        </div>
      </div>

      <!-- Advisory Note Box -->
      <div style="background:#e6f0fa; border-left:5px solid #0056b3; padding:14px; font-size:0.95rem; color:#111111; margin-bottom:16px; line-height:1.5;">
        <strong>Agronomic Assessment:</strong><br>
        ${p.explanation}
      </div>

      <!-- History & Fertigation -->
      <div style="font-size:0.9rem; color:#333333; border-top:1px solid #cccccc; padding-top:12px; display:flex; flex-direction:column; gap:6px;">
        <div><strong>Historical Irrigation:</strong> ${p.lastIrrigation} &bull; <strong>Pump Assigned:</strong> ${p.nextIrrigation.pump}</div>
        <div><strong>Fertigation Status:</strong> ${p.fertigation}</div>
      </div>
    </div>
  `;
}
