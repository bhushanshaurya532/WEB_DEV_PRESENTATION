/**
 * SUGARCANE360 — Plots Controller
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
           style="cursor:pointer; border-width:${isSelected ? '2px' : '1px'}; border-color:${isSelected ? 'var(--forest)' : 'var(--border)'}; background:${isSelected ? 'var(--forest-subtle)' : 'var(--white)'}; margin-bottom:12px; padding:16px; transition:all 0.15s ease;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <h3 style="font-size:1rem; color:var(--forest-dark); font-weight:700;">${p.name} (${p.area})</h3>
          <span class="badge ${p.statusCode === 'optimal' ? 'badge-good' : p.statusCode === 'due' ? 'badge-warn' : p.statusCode === 'required' ? 'badge-danger' : 'badge-info'}">
            ${p.status}
          </span>
        </div>
        <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:8px;">
          Soil: <strong>${p.soilType}</strong> &bull; Stage: <strong>${p.stage}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.8rem; align-items:center;">
          <span>Moisture: <strong style="color:${p.soilMoisture < 35 ? 'var(--status-danger)' : 'var(--forest-dark)'};">${p.soilMoisture}%</strong></span>
          <span style="color:var(--forest); font-weight:600;">Next: ${p.nextIrrigation.date} &rarr;</span>
        </div>
      </div>
    `;
  }).join("");
}

function selectPlotView(id) {
  AppState.setSelectedPlotId(id);
  renderPlotsView();
  showToast(`Inspecting ${id.toUpperCase().replace('-', ' ')}`, "info");
}

function renderPlotDetail(selectedId) {
  const container = document.getElementById("plotDetailContainer");
  if (!container) return;

  const p = SUGARCANE_DATA.plots.find(item => item.id === selectedId) || SUGARCANE_DATA.plots[0];

  container.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; border-bottom:1px solid var(--border-light); padding-bottom:12px;">
        <div>
          <h2 style="font-size:1.25rem; color:var(--forest-dark); font-weight:800;">${p.name} Detailed Profile</h2>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">
            Plot ID: ${p.id.toUpperCase()} &bull; Area: ${p.area} &bull; Crop: ${p.crop}
          </div>
        </div>
        <a href="advisory.html?plot=${p.id}" class="btn btn-primary btn-sm">
          <i data-lucide="sparkles" style="width:13px; height:13px;"></i> View AI Advisory
        </a>
      </div>

      <!-- 4 Quick Stats Grid -->
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-bottom:16px;">
        <div style="background:var(--cream); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Crop &amp; Growth Stage</div>
          <div style="font-size:0.95rem; font-weight:800; color:var(--forest-dark); margin-top:2px;">${p.stage}</div>
        </div>
        <div style="background:var(--cream); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Soil Texture &amp; Moisture</div>
          <div style="font-size:0.95rem; font-weight:800; color:var(--forest-dark); margin-top:2px;">${p.soilType} &bull; ${p.soilMoisture}%</div>
        </div>
        <div style="background:var(--cream); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Next Irrigation Window</div>
          <div style="font-size:0.95rem; font-weight:800; color:var(--forest); margin-top:2px;">${p.nextIrrigation.date} &bull; ${p.nextIrrigation.time}</div>
        </div>
        <div style="background:var(--cream); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Water Requirement</div>
          <div style="font-size:0.95rem; font-weight:800; color:var(--forest-dark); margin-top:2px;">${p.nextIrrigation.waterReq} (${p.nextIrrigation.duration})</div>
        </div>
      </div>

      <!-- Advisory Note Box -->
      <div style="background:var(--forest-subtle); border:1px solid #c8e0d1; border-radius:var(--radius-sm); padding:14px; font-size:0.86rem; color:var(--forest-dark); margin-bottom:16px; line-height:1.5;">
        <strong>Agronomic Assessment:</strong><br>
        ${p.explanation}
      </div>

      <!-- History & Fertigation -->
      <div style="font-size:0.82rem; color:var(--text-muted); border-top:1px solid var(--border-light); padding-top:12px; display:flex; flex-direction:column; gap:6px;">
        <div><strong>Historical Irrigation:</strong> ${p.lastIrrigation} &bull; <strong>Pump Assigned:</strong> ${p.nextIrrigation.pump}</div>
        <div><strong>Fertigation Status:</strong> ${p.fertigation}</div>
      </div>
    </div>
  `;
}
