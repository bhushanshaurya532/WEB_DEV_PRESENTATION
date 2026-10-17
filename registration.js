/**
 * SUGARCANE360 — Farmer Registration Controller
 * Validates farmer details, farm metrics, soil parameters, and registers the farm profile.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("farmerRegisterForm");
  const successBanner = document.getElementById("registrationSuccessBanner");
  const photoInput = document.getElementById("photo");
  const photoPreview = document.getElementById("photoPreview");

  if (!form) return;

  // Photo live preview
  if (photoInput && photoPreview) {
    photoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          photoPreview.src = evt.target.result;
          photoPreview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Live input error clear
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach(input => {
    input.addEventListener("input", () => clearError(input));
    input.addEventListener("change", () => clearError(input));
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateRegistrationForm()) {
      processRegistration();
    }
  });

  // Reset form
  form.addEventListener("reset", () => {
    resetAllErrors();
    if (successBanner) successBanner.style.display = "none";
    if (photoPreview) photoPreview.style.display = "none";
  });
});

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}Error`);
  if (input) {
    input.style.borderColor = "var(--status-danger)";
    input.classList.add("input-error");
  }
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = "block";
    errorEl.style.color = "var(--status-danger)";
    errorEl.style.fontSize = "0.78rem";
    errorEl.style.marginTop = "4px";
  }
}

function clearError(input) {
  if (typeof input === "string") {
    input = document.getElementById(input);
  }
  if (input) {
    input.style.borderColor = "var(--border)";
    input.classList.remove("input-error");
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.style.display = "none";
    }
  }
}

function resetAllErrors() {
  const form = document.getElementById("farmerRegisterForm");
  if (!form) return;
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach(input => clearError(input));
}

function validateRegistrationForm() {
  resetAllErrors();
  let isValid = true;
  let firstInvalid = null;

  // 1. Farmer Name
  const name = document.getElementById("username")?.value.trim() || "";
  if (!name) {
    showError("username", "Farmer name is required.");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("username");
  } else if (!/^[A-Za-z\s.]{2,50}$/.test(name)) {
    showError("username", "Please enter a valid alphabetic name (2-50 characters).");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("username");
  }

  // 2. Mobile Number (10 digits)
  const mobile = document.getElementById("mobile")?.value.trim() || "";
  if (!mobile) {
    showError("mobile", "10-digit mobile number is required.");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("mobile");
  } else if (!/^[6-9]\d{9}$/.test(mobile)) {
    showError("mobile", "Enter a valid 10-digit Indian mobile number (starts with 6-9).");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("mobile");
  }

  // 3. Email Address
  const email = document.getElementById("email")?.value.trim() || "";
  if (!email) {
    showError("email", "Email address is required.");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("email");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("email", "Enter a valid email address (e.g. farmer@example.com).");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("email");
  }

  // 4. Village / Location
  const village = document.getElementById("village")?.value.trim() || "";
  if (!village) {
    showError("village", "Village / Taluka location is required.");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("village");
  }

  // 5. Land Area
  const area = document.getElementById("landarea")?.value.trim() || "";
  if (!area || isNaN(area) || Number(area) <= 0) {
    showError("landarea", "Please enter a valid farm land area in Acres (> 0).");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("landarea");
  }

  // 6. Crop Stage
  const cropstage = document.getElementById("cropstage")?.value || "";
  if (!cropstage) {
    showError("cropstage", "Please select your sugarcane crop growth stage.");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("cropstage");
  }

  // 7. Soil Type
  const soiltype = document.getElementById("soiltype")?.value || "";
  if (!soiltype) {
    showError("soiltype", "Please select your farm soil classification.");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("soiltype");
  }

  // 8. Irrigation Method
  const method = document.getElementById("method")?.value || "";
  if (!method) {
    showError("method", "Please select primary irrigation system method.");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("method");
  }

  // 9. Current Soil Moisture %
  const moisture = document.getElementById("moisture")?.value.trim() || "";
  if (!moisture || isNaN(moisture) || Number(moisture) < 0 || Number(moisture) > 100) {
    showError("moisture", "Soil moisture % must be a number between 0 and 100.");
    isValid = false;
    if (!firstInvalid) firstInvalid = document.getElementById("moisture");
  }

  // Focus on first invalid
  if (firstInvalid) {
    firstInvalid.focus();
    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return isValid;
}

function processRegistration() {
  const name = document.getElementById("username").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();
  const village = document.getElementById("village").value.trim();
  const district = document.getElementById("district")?.value || "Kolhapur";
  const landarea = document.getElementById("landarea").value.trim();
  const cropstage = document.getElementById("cropstage").value;
  const soiltype = document.getElementById("soiltype").value;
  const method = document.getElementById("method").value;
  const moisture = Number(document.getElementById("moisture").value.trim());

  // Agronomic calculations for registration output
  const requiredMoisture = 55; // % optimal for sugarcane
  const deficit = Math.max(0, requiredMoisture - moisture);
  
  // Water requirement per acre per day in Liters based on stage & soil
  let baseReqPerAcre = 3500;
  if (cropstage === "Grand Growth") baseReqPerAcre = 5000;
  if (cropstage === "Tillering") baseReqPerAcre = 4200;
  if (soiltype.includes("Sandy")) baseReqPerAcre *= 1.15; // higher percolation

  const totalDailyWaterReq = Math.round(baseReqPerAcre * Number(landarea));

  const registrationRecord = {
    name,
    mobile,
    email,
    village,
    district,
    landArea: `${landarea} Acres`,
    cropStage: cropstage,
    soilType: soiltype,
    method,
    moisture,
    deficit,
    estDailyWaterLiters: totalDailyWaterReq.toLocaleString("en-IN") + " L",
    registeredAt: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })
  };

  // Persist into localStorage
  localStorage.setItem("sugarcane_registered_user", JSON.stringify(registrationRecord));

  // Update live demo state in SUGARCANE_DATA if loaded
  if (typeof SUGARCANE_DATA !== "undefined") {
    SUGARCANE_DATA.farmer.name = name;
    SUGARCANE_DATA.farmer.totalLand = `${landarea} Acres`;
    SUGARCANE_DATA.farmer.location = `${village}, ${district}`;
  }

  // Display rich success banner
  const banner = document.getElementById("registrationSuccessBanner");
  if (banner) {
    banner.innerHTML = `
      <div style="background: var(--status-good-bg); border: 1.5px solid var(--status-good); border-radius: var(--radius-md); padding: 22px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
          <div style="width:36px; height:36px; border-radius:50%; background:var(--status-good); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.2rem;">✓</div>
          <div>
            <h3 style="font-size:1.15rem; color:var(--forest-dark); margin:0;">Registration Successfully Complete!</h3>
            <div style="font-size:0.82rem; color:var(--forest);">Farm ID: <strong>KJS-REG-${Math.floor(1000 + Math.random() * 9000)}</strong> &bull; Location: ${village}, ${district}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin:16px 0; background:#fff; padding:14px; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
          <div>
            <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Registered Farmer</div>
            <div style="font-size:1rem; font-weight:800; color:var(--forest-dark);">${name}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${mobile} &bull; ${email}</div>
          </div>
          <div>
            <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Farm &amp; Telemetry</div>
            <div style="font-size:1rem; font-weight:800; color:var(--forest-dark);">${landarea} Acres (${cropstage})</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${soiltype} &bull; ${method}</div>
          </div>
          <div>
            <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Moisture Deficit &amp; Water Budget</div>
            <div style="font-size:1rem; font-weight:800; color:var(--status-warn);">${moisture}% (Deficit: ${deficit}%)</div>
            <div style="font-size:0.8rem; color:var(--forest); font-weight:700;">Est. Daily Water: ${totalDailyWaterReq.toLocaleString("en-IN")} Litres</div>
          </div>
        </div>

        <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:flex-end;">
          <button type="button" onclick="document.getElementById('farmerRegisterForm').reset()" class="btn btn-secondary btn-sm">Register Another Farm</button>
          <a href="dashboard.html" class="btn btn-primary btn-sm">Enter Dashboard as ${name.split(' ')[0]} &rarr;</a>
        </div>
      </div>
    `;
    banner.style.display = "block";
    banner.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (typeof showToast === "function") {
    showToast(`Welcome ${name}! Farm registered successfully.`, "good");
  }
}
