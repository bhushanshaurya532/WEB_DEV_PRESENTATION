# SUGARCANE360 — Irrigation Advisory System for Sugarcane Crop
> **Tagline:** “Smarter Irrigation. Healthier Sugarcane.”  
> **Official Case Study Reference:** KJS-AGR-01 — *Irrigation Advisory System for Sugarcane Crop using AI and Sensor-based Technology*  
> **Context:** SY Computer Engineering &bull; Web Development Lab Mini Project (Clean Frontend Prototype)

---

## 1. Project Title
**SUGARCANE360: Plot-Specific AI &amp; Sensor-Based Irrigation Advisory Prototype**

---

## 2. Problem Statement (Strictly from KJS-AGR-01)
Sugarcane requires large quantities of water (1,500 mm – 2,500 mm), but irrigation decisions are often based on farmer experience and rigid schedules rather than scientific field recommendations.

This traditional approach leads to:
- **Over-irrigation:** Water wastage, high electricity bills, and nitrogen leaching beyond the root zone.
- **Under-irrigation:** Soil moisture stress during critical growth stages (stunting tillering and stalk elongation).
- **Yield Loss:** Reduced cane tonnage and impaired sucrose recovery.
- **Labor Inefficiency:** Inability to effectively prioritize among spatially distributed plots.

---

## 3. Project Objectives
1. **Combine Agricultural Telemetry:** Integrate field sensor data, soil characteristics, 7-day weather forecasts, crop growth stages, and geospatial plot records into an intuitive decision support system.
2. **Minimal &amp; Farmer-Friendly Dashboard:** A calm, 4-section dashboard focusing on essential daily operational needs with plenty of whitespace.
3. **Plot-Specific Precision:** Tailor irrigation start time, duration, and water liters for each plot individually.
4. **Explainable Decision Support:** Justify recommendations using 4 core factors (Soil Moisture, Rain Probability, Temperature, Crop Stage).
5. **Human-in-the-Loop Validation:** Empower the farmer to Accept, Modify runtime, or Override recommendations.
6. **Multilingual Access:** Provide native-language assistant guidance in English, Marathi, Hindi, and Kannada.

---

## 4. Architecture & Navigation Mandate
- **Clean Horizontal Top Navigation:** Eliminated the bulky desktop sidebar in favor of an elegant, responsive top navigation bar (`.site-header`) with a mobile hamburger toggle.
- **Strict Separation of Concerns:** The dashboard is kept minimal (only 4 primary sections); specialized agronomic analytics, fertigation logs, sensor diagnostics, and pump controls live on their own dedicated pages.

---

## 5. Website Structure (13 Dedicated Pages)

| Page | File | Description |
| :--- | :--- | :--- |
| **1. Landing Page** | [`index.html`](index.html) | Minimal landing overview, problem summary, 3-step workflow (`Field Data ↓ AI Analysis ↓ Advisory`), 3 core pillars, and prototype launcher. |
| **2. Demo Access** | [`login.html`](login.html) | One-click demo login displaying profile for farmer Ramesh Patil (Kolhapur, 9.3 Acres). |
| **3. Farmer Dashboard** | [`dashboard.html`](dashboard.html) | Minimal 4-section dashboard: (1) Interactive SVG Plot Map, (2) Today's Irrigation Advisory main card, (3) Exactly 3 basic farm status cards, and (4) 2 active alerts. |
| **4. My Plots** | [`plots.html`](plots.html) | Plot management for Plots A, B, C, and D with soil textures, growth stages, moisture %, and detail panel. |
| **5. AI Advisory** | [`advisory.html`](advisory.html) | Main advisory output with explainable 4-factor breakdown, rainfall adjustment notice, and Accept/Modify/Override buttons. |
| **6. Weather** | [`weather.html`](weather.html) | Kolhapur weather snapshot, 7-day forecast grid, and explanation of how upcoming rainfall adjusts pumping. |
| **7. Soil & Sensors** | [`sensors.html`](sensors.html) | Telemetry readings, simulated sensor notice, 24h soil moisture depletion line chart, and sensor fleet status. |
| **8. Crop Health** | [`crop-health.html`](crop-health.html) | 4-stage phenological timeline with Grand Growth highlighted (70–80% lifecycle water demand) and NDVI canopy indicators. |
| **9. Fertigation** | [`fertigation.html`](fertigation.html) | Compact fertigation guidance with timing strictly aligned with the next irrigation cycle to maximize nutrient absorption. |
| **10. Yield Analytics** | [`analytics.html`](analytics.html) | 58.4 MT/Acre yield prediction, 8%–12% delay-loss risk indicator, cumulative water conservation chart (22% saved), and historical yields. |
| **11. Pump Scheduling** | [`pump.html`](pump.html) | Pump 01 &amp; Pump 02 operational status, runtime durations, water liters, and Kolhapur rural 3-phase power grid mapping. |
| **12. Alerts Center** | [`alerts.html`](alerts.html) | Filterable agronomic alert feed (Soil Moisture Deficit, Rainfall, Advisory, Fertigation) with Read/Unread toggles and Mark All Read. |

---

## 6. The 4 Minimal Dashboard Sections

1. **Section 1: Farm / Plot Overview**
   - Clean, lightweight SVG map representing Plots A, B, C, and D.
   - Shows Plot Name, Cultivated Area, Soil Type, and Live Status. Clicking any plot dynamically switches active inspection.
2. **Section 2: Today's Irrigation Advisory**
   - Dedicated card for the selected plot: Scheduled Time (e.g. *Tomorrow 6:00 AM*), Duration (*2.5 hours*), Water Requirement (*7,500 L*), and Assigned Pump.
   - Includes "View Advisory & Decision Support" link.
3. **Section 3: Basic Farm Status (Strictly 3 Cards)**
   - **Soil Moisture:** 42% (Plot A Sandy Loam, Target 50%–70%).
   - **Weather:** 29°C (Rain Prob: 20%, Humidity: 68%).
   - **Crop Health:** Good (Grand Growth stage, low moisture stress).
4. **Section 4: Active Alerts**
   - 2 concise, actionable alert items:
     - *Rainfall expected tomorrow (Saturday 14mm) — advisory updated.*
     - *Plot C soil moisture is low (31%) — immediate irrigation required.*
   - Link to full Alerts Center.

---

## 7. The 4 Explainable Advisory Factors
Under **"Why this recommendation?"** on [`advisory.html`](advisory.html):
1. **Soil Moisture (42%):** Below 50% optimal threshold; root-zone hydration required.
2. **Rain Probability (20%):** Low chance of natural precipitation; no soil recharge expected.
3. **Temperature (29°C):** Moderate evaporative demand; morning watering recommended to minimize evaporation loss.
4. **Crop Stage (Grand Growth):** Peak water-consumption phase (70–80% of total lifecycle demand).

---

## 8. The 5 AI Assistant Questions (4 Languages)
On [`assistant.html`](assistant.html), farmers can click any of the 5 case study questions or type in their native tongue (**English, Marathi, Hindi, Kannada**):
1. *"When should I irrigate Plot A?"* &rarr; Recommends tomorrow morning 6:00 AM – 8:30 AM (2.5 hrs, 7,500 L).
2. *"Why is irrigation recommended tomorrow?"* &rarr; Explains 42% moisture, 20% rain prob, and Grand Growth stage.
3. *"Is rain expected in Kolhapur this week?"* &rarr; Details the 65% chance of ~14mm rain on Saturday.
4. *"Which plot has the lowest moisture?"* &rarr; Alerts that Plot C is at 31% deficit and needs immediate watering.
5. *"What fertigation is scheduled for Plot A?"* &rarr; Outlines NPK 19:19:19 + Potassium aligned with tomorrow's run.

---

## 9. Technology Stack
- **HTML5:** Semantic, accessible layout.
- **CSS3:** Custom agricultural color palette (Forest Green `#1b4332`, Sage `#40916c`, Cream `#faf8f5`, White `#ffffff`, Muted Yellow `#d4a373`), CSS Grid, Flexbox, responsive navbar rules.
- **Vanilla JavaScript (ES6+):** Centralized mock state ([`js/data.js`](js/data.js)), shared navbar/toast handlers ([`js/main.js`](js/main.js)), modular page controllers.
- **Chart.js (CDN):** Lightweight data visualization for moisture trends, water savings, and yield progression.
- **Lucide Icons (CDN):** Modern, clean agricultural SVG icons.
- **Zero Frameworks / Zero External Backend:** 100% runnable in any modern web browser.

---

## 10. How to Run
Simply open any of the HTML files in a web browser, or launch using Python's built-in static server:
```bash
# In the SUGARCANE360 directory
python -m http.server 8000
```
Then navigate to:
```
http://localhost:8000/
```
or open `index.html` directly.
