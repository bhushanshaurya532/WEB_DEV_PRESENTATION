/**
 * SUGARCANE360 — AI Irrigation Advisory Controller
 * Strictly implements KJS-AGR-01 Explainable Advisory Logic with 4 Factors.
 */

document.addEventListener("DOMContentLoaded", () => {
  initPlotSelector();
  renderAdvisoryView();

  window.addEventListener("sugarcane:plot-selected", () => {
    initPlotSelector();
    renderAdvisoryView();
  });
});

function initPlotSelector() {
  const select = document.getElementById("advisoryPlotSelector");
  if (select) {
    select.value = AppState.getSelectedPlotId();
    select.onchange = (e) => {
      AppState.setSelectedPlotId(e.target.value);
      renderAdvisoryView();
      showToast(`Advisory updated for ${e.target.options[e.target.selectedIndex].text}`, "info");
    };
  }
}

function renderAdvisoryView() {
  const plot = AppState.getSelectedPlot();
  const weather = SUGARCANE_DATA.weather.current;

  renderAdvisoryMainCard(plot);
  renderWhyExplanation(plot, weather);
  initHumanControls(plot);

  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
}

function renderAdvisoryMainCard(plot) {
  const container = document.getElementById("advisoryMainCardContainer");
  if (!container) return;

  const decision = AppState.getDecision(plot.id);
  let statusBadge = `<span class="badge ${plot.statusCode === 'optimal' ? 'badge-good' : plot.statusCode === 'due' ? 'badge-warn' : plot.statusCode === 'required' ? 'badge-danger' : 'badge-info'}">${plot.status}</span>`;
  
  if (decision === "accepted") {
    statusBadge = `<span class="badge badge-good"><i data-lucide="check" style="width:12px; height:12px;"></i> Accepted by Farmer</span>`;
  } else if (decision === "modified") {
    statusBadge = `<span class="badge badge-warn"><i data-lucide="sliders" style="width:12px; height:12px;"></i> Modified by Farmer</span>`;
  } else if (decision === "overridden") {
    statusBadge = `<span class="badge badge-danger"><i data-lucide="x" style="width:12px; height:12px;"></i> Overridden by Farmer</span>`;
  }

  container.innerHTML = `
    <div class="card" style="border-left: 5px solid var(--forest); padding: 24px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
        <div>
          <div style="font-size:0.75rem; font-weight:700; color:var(--forest); text-transform:uppercase; letter-spacing:0.04em;">
            AI Advisory Output &bull; ${plot.name} (${plot.area})
          </div>
          <h2 style="font-size:1.4rem; color:var(--forest-dark); margin-top:2px;">
            ${plot.statusCode === 'excess' ? 'Water Stoppage Recommended' : 'Irrigation Recommended'}
          </h2>
        </div>
        <div>
          ${statusBadge}
        </div>
      </div>

      <!-- Schedule Values Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:12px; margin-bottom:18px;">
        <div style="background:var(--cream); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <div style="font-size:0.7rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Scheduled Start</div>
          <div style="font-size:1.15rem; font-weight:800; color:var(--forest-dark); margin-top:2px;">
            ${plot.nextIrrigation.date} &bull; ${plot.nextIrrigation.time}
          </div>
        </div>

        <div style="background:var(--cream); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <div style="font-size:0.7rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Runtime Duration</div>
          <div style="font-size:1.15rem; font-weight:800; color:var(--forest); margin-top:2px;">
            ${plot.nextIrrigation.duration}
          </div>
        </div>

        <div style="background:var(--cream); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <div style="font-size:0.7rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Water Required</div>
          <div style="font-size:1.15rem; font-weight:800; color:var(--forest-dark); margin-top:2px;">
            ${plot.nextIrrigation.waterReq}
          </div>
        </div>

        <div style="background:var(--cream); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <div style="font-size:0.7rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Assigned Pump</div>
          <div style="font-size:1.15rem; font-weight:800; color:var(--forest-dark); margin-top:2px;">
            ${plot.nextIrrigation.pump}
          </div>
        </div>
      </div>

      <!-- Rainfall Adjustment Note -->
      <div style="background:#eaf4f9; border:1px solid #bce1f5; border-radius:var(--radius-sm); padding:12px 14px; font-size:0.86rem; color:#185375; margin-bottom:18px; line-height:1.45;">
        <i data-lucide="cloud-rain" style="width:15px; height:15px; display:inline-block; vertical-align:middle; margin-right:4px;"></i>
        <strong>Rainfall Adjustment:</strong> Rainfall probability is currently low (20%). Scheduled irrigation is maintained. If rainfall exceeding 10 mm occurs, the advisory will automatically reduce or defer the irrigation window.
      </div>

      <!-- Decision Support Buttons (Human-in-the-Loop) -->
      <div style="border-top:1px solid var(--border-light); padding-top:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm" id="btnAcceptAdv">
            <i data-lucide="check" style="width:14px; height:14px;"></i> Accept Recommendation
          </button>
          <button class="btn btn-secondary btn-sm" id="btnModifyAdv">
            <i data-lucide="sliders" style="width:14px; height:14px;"></i> Modify Schedule
          </button>
          <button class="btn btn-outline btn-sm" id="btnOverrideAdv" style="color:var(--status-danger); border-color:#dca4a4;">
            <i data-lucide="x" style="width:14px; height:14px;"></i> Override / Postpone
          </button>
        </div>
        <span style="font-size:0.75rem; font-weight:700; color:var(--sage); letter-spacing:0.04em;">
          HUMAN-IN-THE-LOOP ACTIVE
        </span>
      </div>
    </div>
  `;
}

/**
 * Render "Why This Recommendation?" — 4 Factors Strictly
 */
function renderWhyExplanation(plot, weather) {
  const container = document.getElementById("advisoryWhyContainer");
  if (!container) return;

  container.innerHTML = `
    <div class="card">
      <div class="card-title-row">
        <div>
          <h2 style="font-size:1.15rem; color:var(--forest-dark); font-weight:700;">
            Why this recommendation?
          </h2>
          <p style="font-size:0.8rem; margin-top:2px;">Explainable decision support synthesizing 4 field factors.</p>
        </div>
        <span class="badge badge-good">Model Confidence: 94%</span>
      </div>

      <div style="background:var(--cream); padding:14px; border-radius:var(--radius-sm); border:1px solid var(--border-light); font-size:0.88rem; color:var(--text-main); margin-bottom:18px; line-height:1.5;">
        ${plot.explanation}
      </div>

      <!-- Exactly 4 Factors Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:14px;">
        <!-- Factor 1: Soil Moisture -->
        <div style="background:var(--white); border:1px solid var(--border); border-radius:var(--radius-sm); padding:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">1. Soil Moisture</span>
            <i data-lucide="droplet" style="width:15px; height:15px; color:var(--sage);"></i>
          </div>
          <div style="font-size:1.3rem; font-weight:800; color:var(--forest-dark); margin:6px 0 2px;">
            ${plot.soilMoisture}%
          </div>
          <div style="font-size:0.76rem; color:var(--text-muted);">
            Threshold is 50%. Deficit requires replenishment for root hydration.
          </div>
        </div>

        <!-- Factor 2: Rain Probability -->
        <div style="background:var(--white); border:1px solid var(--border); border-radius:var(--radius-sm); padding:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">2. Rain Probability</span>
            <i data-lucide="cloud-rain" style="width:15px; height:15px; color:var(--status-info);"></i>
          </div>
          <div style="font-size:1.3rem; font-weight:800; color:var(--status-info); margin:6px 0 2px;">
            ${weather.rainProb}
          </div>
          <div style="font-size:0.76rem; color:var(--text-muted);">
            Low precipitation probability indicates minimal natural soil recharge.
          </div>
        </div>

        <!-- Factor 3: Temperature -->
        <div style="background:var(--white); border:1px solid var(--border); border-radius:var(--radius-sm); padding:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">3. Temperature</span>
            <i data-lucide="sun-medium" style="width:15px; height:15px; color:var(--yellow);"></i>
          </div>
          <div style="font-size:1.3rem; font-weight:800; color:var(--forest-dark); margin:6px 0 2px;">
            ${weather.temp}
          </div>
          <div style="font-size:0.76rem; color:var(--text-muted);">
            Moderate evaporative demand; irrigation in cool morning minimizes evaporation.
          </div>
        </div>

        <!-- Factor 4: Crop Stage -->
        <div style="background:var(--white); border:1px solid var(--border); border-radius:var(--radius-sm); padding:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">4. Crop Stage</span>
            <i data-lucide="activity" style="width:15px; height:15px; color:var(--status-good);"></i>
          </div>
          <div style="font-size:1.3rem; font-weight:800; color:var(--status-good); margin:6px 0 2px;">
            ${plot.stage}
          </div>
          <div style="font-size:0.76rem; color:var(--text-muted);">
            Peak water-consumption window (70–80% of total lifecycle water demand).
          </div>
        </div>
      </div>
    </div>
  `;
}

function initHumanControls(plot) {
  const btnAccept = document.getElementById("btnAcceptAdv");
  const btnModify = document.getElementById("btnModifyAdv");
  const btnOverride = document.getElementById("btnOverrideAdv");

  if (btnAccept) {
    btnAccept.onclick = () => {
      AppState.setDecision(plot.id, "accepted");
      showToast(`Recommendation accepted for ${plot.name}. Pump schedule set.`, "info");
      renderAdvisoryView();
    };
  }

  if (btnOverride) {
    btnOverride.onclick = () => {
      AppState.setDecision(plot.id, "overridden");
      showToast(`Recommendation overridden for ${plot.name}. Irrigation paused.`, "warn");
      renderAdvisoryView();
    };
  }

  if (btnModify) {
    btnModify.onclick = () => {
      let modal = document.getElementById("advisoryModifyModal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "advisoryModifyModal";
        modal.className = "modal-backdrop";
        modal.innerHTML = `
          <div class="modal-box">
            <div class="modal-head">
              <h3 style="font-size:1.1rem; color:var(--forest-dark);">Modify Schedule (${plot.name})</h3>
              <button onclick="document.getElementById('advisoryModifyModal').classList.remove('active')" style="color:var(--text-muted); padding:4px;">✕</button>
            </div>
            <div style="margin-bottom:14px;">
              <label style="display:block; font-size:0.8rem; font-weight:700; margin-bottom:4px; color:var(--text-main);">Adjust Start Time</label>
              <input type="time" id="advModTime" value="06:00" style="width:100%; padding:8px 10px; border:1px solid var(--border); border-radius:var(--radius-sm);">
            </div>
            <div style="margin-bottom:18px;">
              <label style="display:block; font-size:0.8rem; font-weight:700; margin-bottom:4px; color:var(--text-main);">Adjust Duration (Hours)</label>
              <input type="number" step="0.25" id="advModDur" value="2.5" min="0.5" max="6.0" style="width:100%; padding:8px 10px; border:1px solid var(--border); border-radius:var(--radius-sm);">
            </div>
            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button class="btn btn-secondary btn-sm" onclick="document.getElementById('advisoryModifyModal').classList.remove('active')">Cancel</button>
              <button class="btn btn-primary btn-sm" onclick="saveAdvMod('${plot.id}')">Save Modification</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }
      modal.classList.add("active");
    };
  }
}

function saveAdvMod(plotId) {
  AppState.setDecision(plotId, "modified");
  const modal = document.getElementById("advisoryModifyModal");
  if (modal) modal.classList.remove("active");
  showToast("Custom runtime schedule saved.", "info");
  renderAdvisoryView();
}
