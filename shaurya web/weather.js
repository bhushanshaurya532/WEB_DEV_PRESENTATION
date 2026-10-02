/**
 * SUGARCANE360 — Weather Controller (Portal Sharp Spec)
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
  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Day &amp; Status</th>
          <th>Temp (High/Low)</th>
          <th>Rain Probability</th>
          <th>Expected Rain</th>
          <th>Humidity</th>
          <th>Agronomic Impact</th>
        </tr>
      </thead>
      <tbody>
        ${forecast.map((f, idx) => `
          <tr style="${idx === 0 ? 'background:#e6f0fa; font-weight:bold;' : ''}">
            <td><strong>${f.day.toUpperCase()}</strong> ${idx === 0 ? '<span class="badge badge-good">TODAY</span>' : ''}</td>
            <td><strong>${f.temp}</strong></td>
            <td style="color:${parseInt(f.rainProb) > 40 ? '#d9534f' : '#0056b3'}; font-weight:bold;">${f.rainProb}</td>
            <td><strong>${f.expectedRain}</strong></td>
            <td>${f.humidity}</td>
            <td><span class="badge ${parseInt(f.rainProb) > 40 ? 'badge-warn' : 'badge-good'}">${f.impact}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}
