/**
 * SUGARCANE360 — Weather Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  renderWeatherDetails();
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
});

function renderWeatherDetails() {
  const container = document.getElementById("weatherForecastTable");
  if (!container) return;

  const forecast = SUGARCANE_DATA.weather.forecast;
  container.innerHTML = forecast.map((f, idx) => `
    <div style="padding:14px; margin-bottom:8px; border-radius:var(--radius-sm); border:1px solid ${idx === 0 ? 'var(--forest)' : 'var(--border)'}; background:${idx === 0 ? 'var(--forest-subtle)' : 'var(--white)'}; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
      <div style="min-width:110px;">
        <strong style="color:var(--forest-dark); font-size:1rem;">${f.day}</strong>
        <div style="font-size:0.75rem; color:var(--text-muted);">${idx === 0 ? 'Today (Active)' : 'Forecast'}</div>
      </div>

      <div style="display:flex; gap:18px; font-size:0.86rem; flex-wrap:wrap;">
        <div>Temp: <strong style="color:var(--forest-dark);">${f.temp}</strong></div>
        <div>Rain Prob: <strong style="color:${parseInt(f.rainProb) > 40 ? 'var(--status-danger)' : 'var(--status-info)'};">${f.rainProb}</strong></div>
        <div>Rain: <strong>${f.expectedRain}</strong></div>
        <div>Humidity: <strong>${f.humidity}</strong></div>
      </div>

      <div style="font-size:0.82rem; font-weight:700; color:${parseInt(f.rainProb) > 40 ? 'var(--status-warn)' : 'var(--forest)'}; background:${parseInt(f.rainProb) > 40 ? '#fef3e2' : 'var(--cream)'}; padding:4px 10px; border-radius:var(--radius-full); border:1px solid var(--border-light);">
        ${f.impact}
      </div>
    </div>
  `).join("");
}
