/**
 * SUGARCANE360 — Centralized Mock Data & Prototype Logic
 * Strictly based on Case Study: KJS-AGR-01
 * Location: Kolhapur, Maharashtra (Farmer: Ramesh Patil)
 */

const SUGARCANE_DATA = {
  farmer: {
    name: "Ramesh ",
    location: "Kolhapur, Maharashtra",
    id: "FMR-1024",
    totalLand: "9.3 Acres",
    crop: "Sugarcane"
  },

  // 4 Plots with exact case study attributes
  plots: [
    {
      id: "plot-a",
      name: "Plot A",
      area: "2.4 Acres",
      crop: "Sugarcane",
      stage: "Grand Growth",
      soilType: "Sandy Loam",
      soilMoisture: 42, // %
      waterStress: "Low",
      status: "Recommended",
      statusCode: "due",
      nextIrrigation: {
        date: "Tomorrow",
        time: "6:00 AM",
        timeWindow: "6:00 AM – 8:30 AM",
        duration: "2.5 hours",
        waterReq: "7,500 L",
        pump: "Pump 01"
      },
      lastIrrigation: "2 days ago (6,200 L)",
      fertigation: "Fertigation recommended with the next irrigation window.",
      fertigationTiming: "Aligned with tomorrow 6:00 AM irrigation",
      explanation: "Plot A currently has moderate soil moisture (42%). Rainfall probability is low (20%) and the crop is in the Grand Growth stage with high transpiration. Based on these demo conditions, irrigation is recommended tomorrow morning."
    },
    {
      id: "plot-b",
      name: "Plot B",
      area: "1.8 Acres",
      crop: "Sugarcane",
      stage: "Grand Growth",
      soilType: "Clay Loam",
      soilMoisture: 61,
      waterStress: "Low",
      status: "Optimal",
      statusCode: "optimal",
      nextIrrigation: {
        date: "In 3 days",
        time: "6:30 AM",
        timeWindow: "6:30 AM – 8:00 AM",
        duration: "1.5 hours",
        waterReq: "4,500 L",
        pump: "Pump 01"
      },
      lastIrrigation: "Yesterday (4,800 L)",
      fertigation: "Nutrient levels stable. Next cycle in 10 days.",
      fertigationTiming: "Standby",
      explanation: "Plot B soil moisture is optimal at 61% following recent watering. Clay loam retains moisture well. No irrigation needed for 3 days."
    },
    {
      id: "plot-c",
      name: "Plot C",
      area: "3.1 Acres",
      crop: "Sugarcane",
      stage: "Tillering",
      soilType: "Medium Black",
      soilMoisture: 31,
      waterStress: "High Deficit",
      status: "Irrigation Required",
      statusCode: "required",
      nextIrrigation: {
        date: "Today",
        time: "4:30 PM",
        timeWindow: "4:30 PM – 7:45 PM",
        duration: "3.25 hours",
        waterReq: "9,800 L",
        pump: "Pump 02"
      },
      lastIrrigation: "4 days ago (7,900 L)",
      fertigation: "Foliar booster suggested post-watering.",
      fertigationTiming: "After moisture replenishment",
      explanation: "Plot C soil moisture has dropped to 31% (deficit threshold). Tillering stage is sensitive to shoot drying. Immediate irrigation required to avoid yield loss."
    },
    {
      id: "plot-d",
      name: "Plot D",
      area: "2.0 Acres",
      crop: "Sugarcane",
      stage: "Maturity",
      soilType: "Heavy Deep Black",
      soilMoisture: 70,
      waterStress: "None (High Moisture)",
      status: "High Moisture",
      statusCode: "excess",
      nextIrrigation: {
        date: "Not Required",
        time: "Monitoring",
        timeWindow: "Water Stoppage",
        duration: "0 hours",
        waterReq: "0 L",
        pump: "None"
      },
      lastIrrigation: "5 days ago",
      fertigation: "No nitrogen — ripening phase sugar accumulation.",
      fertigationTiming: "Withheld for maturity",
      explanation: "Plot D has high soil moisture (70%) and is in the Maturity stage. Controlled water stoppage is required to encourage sucrose synthesis."
    }
  ],

  // Weather Information
  weather: {
    current: {
      temp: "29°C",
      rainProb: "20%",
      expectedRain: "0 mm",
      humidity: "68%",
      condition: "Partly Cloudy",
      irrigationEffect: "Rainfall probability is low (20%) — scheduled irrigation is maintained without adjustment."
    },
    forecast: [
      { day: "Today", temp: "29°C", rainProb: "20%", expectedRain: "0 mm", humidity: "68%", impact: "Normal irrigation" },
      { day: "Tomorrow", temp: "31°C", rainProb: "20%", expectedRain: "0 mm", humidity: "64%", impact: "Morning irrigation recommended" },
      { day: "Sat", temp: "28°C", rainProb: "65%", expectedRain: "14 mm", humidity: "82%", impact: "Rainfall expected (~14mm) → irrigation reduced/skipped" },
      { day: "Sun", temp: "27°C", rainProb: "45%", expectedRain: "4 mm", humidity: "78%", impact: "Post-rain monitoring" },
      { day: "Mon", temp: "30°C", rainProb: "25%", expectedRain: "0 mm", humidity: "70%", impact: "Normal schedule resumes" },
      { day: "Tue", temp: "32°C", rainProb: "10%", expectedRain: "0 mm", humidity: "58%", impact: "Standard irrigation" },
      { day: "Wed", temp: "31°C", rainProb: "15%", expectedRain: "0 mm", humidity: "60%", impact: "Standard irrigation" }
    ]
  },

  // Soil & Sensor Status (Simulated Data)
  sensors: {
    lastUpdated: "10 minutes ago (Simulated)",
    isSimulated: true,
    readings: {
      soilMoisture: "42%",
      temperature: "26.5°C",
      humidity: "68%",
      waterFlow: "0.0 L/min (Pump Off)"
    },
    fleet: [
      { name: "Soil Moisture Sensor (Plot A)", type: "FDR Probe (30cm)", value: "42%", status: "Online" },
      { name: "Temperature Sensor", type: "Digital Ambient", value: "29°C", status: "Online" },
      { name: "Humidity Sensor", type: "Relative Humidity", value: "68%", status: "Online" },
      { name: "Water Flow Sensor", type: "Pipe In-line", value: "0.0 L/min", status: "Online" },
      { name: "Soil Moisture Sensor (Plot C)", type: "FDR Probe", value: "31%", status: "Warning" }
    ]
  },

  // Crop Health
  cropHealth: {
    stage: "Grand Growth",
    health: "Good",
    waterStress: "Low",
    diseaseRisk: "Low",
    note: "Grand Growth stage represents peak sugarcane biomass formation and water consumption."
  },

  // Water Summary
  waterSummary: {
    waterUsed: "18,450 L",
    recommendedWater: "17,900 L",
    historyDates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    historyLitres: [0, 6200, 4800, 0, 7450, 0, 0]
  },

  // Yield Prediction
  yieldPrediction: {
    estimatedYield: "58.4 MT / Acre",
    benchmarkAverage: "46.2 MT / Acre",
    statusText: "DEMO PREDICTION",
    yieldLossRisk: "Potential 8%–12% yield loss risk in Plot C if moisture deficit remains unaddressed for >48 hours."
  },

  // Pump Scheduling
  pumps: [
    {
      id: "Pump 01",
      status: "Available",
      statusCode: "available",
      associatedPlot: "Plot A",
      recommendedTime: "Tomorrow, 6:00 AM – 8:30 AM",
      duration: "2.5 hours",
      waterRequirement: "7,500 L"
    },
    {
      id: "Pump 02",
      status: "Scheduled",
      statusCode: "scheduled",
      associatedPlot: "Plot C",
      recommendedTime: "Today, 4:30 PM – 7:45 PM",
      duration: "3.25 hours",
      waterRequirement: "9,800 L"
    }
  ],

  // Case Study Relevant Alerts
  alerts: [
    {
      id: "alt-1",
      category: "Soil Moisture",
      title: "Plot C soil moisture is low",
      message: "Soil moisture in Plot C is 31% (below recommended threshold). Immediate irrigation suggested.",
      read: false,
      date: "Today, 11:15 AM",
      link: "advisory.html?plot=plot-c"
    },
    {
      id: "alt-2",
      category: "Weather",
      title: "Rainfall expected on Saturday",
      message: "65% rain probability (~14mm). Irrigation schedule will be automatically reduced if received.",
      read: false,
      date: "Today, 08:30 AM",
      link: "weather.html"
    },
    {
      id: "alt-3",
      category: "Sensor",
      title: "Sensor connection requires attention",
      message: "Plot C sensor reported weak signal. Simulated battery at 62%.",
      read: true,
      date: "Yesterday",
      link: "sensors.html"
    },
    {
      id: "alt-4",
      category: "Irrigation",
      title: "Irrigation due tomorrow for Plot A",
      message: "Recommended cycle: 6:00 AM – 8:30 AM (2.5 hours, 7,500 L).",
      read: true,
      date: "Yesterday",
      link: "advisory.html?plot=plot-a"
    }
  ],

  // AI Farmer Assistant (Multilingual)
  assistant: {
    en: {
      greeting: "Hello Ramesh Patil ji! I am your SUGARCANE360 AI Assistant. Ask me about irrigation, weather, soil, or your plots.",
      fallback: "I can assist you with your 4 sugarcane plots. For example, click one of the suggested questions above.",
      qa: [
        {
          trigger: "when should i irrigate plot a",
          answer: "Tomorrow morning (**6:00 AM – 8:30 AM**), irrigation is recommended for **Plot A** (2.5 hours runtime, 7,500 L water requirement via Pump 01)."
        },
        {
          trigger: "why is irrigation recommended tomorrow",
          answer: "Plot A soil moisture is **42%** (below the 50% optimal threshold), rain probability is low (**20%**), and the crop is in **Grand Growth** with high evapotranspiration demand."
        },
        {
          trigger: "is rain expected in kolhapur this week",
          answer: "Today and tomorrow have low rain probability (20%, 0 mm). However, **Saturday brings a 65% chance of ~14 mm rainfall**, which will automatically adjust the weekend irrigation schedule."
        },
        {
          trigger: "which plot has the lowest moisture",
          answer: "**Plot C** has the lowest moisture at **31%** (severe deficit threshold). Immediate irrigation is scheduled for today at **4:30 PM** (3.25 hours, 9,800 L)."
        },
        {
          trigger: "what fertigation is scheduled for plot a",
          answer: "Fertigation for **Plot A** is scheduled **tomorrow at 6:00 AM**, aligned with the irrigation run. Water-soluble NPK 19:19:19 + Potassium will be injected into the drip line."
        }
      ]
    },
    mr: {
      greeting: "नमस्कार रमेश पाटील जी! मी आपला SUGARCANE360 AI सहाय्यक आहे. मला पाणी, हवामान किंवा उसाच्या प्लॉटबद्दल विचारा.",
      fallback: "मी आपल्या ४ उसाच्या प्लॉटबद्दल अचूक सल्ला देऊ शकतो. कृपया वरील प्रश्नांवर क्लिक करा.",
      qa: [
        {
          trigger: "when should i irrigate plot a",
          answer: "उद्या सकाळी (**६:०० ते ८:३०**), **प्लॉट A** ला पाणी देण्याची शिफारस आहे (२.५ तास, ७,५०० लिटर, पंप ०१)."
        },
        {
          trigger: "why is irrigation recommended tomorrow",
          answer: "प्लॉट A मधील ओलावा **४२%** वर आला आहे, पावसाची शक्यता कमी (२०%) आहे आणि ऊस **जोमदार वाढीच्या (Grand Growth)** टप्प्यात आहे."
        },
        {
          trigger: "is rain expected in kolhapur this week",
          answer: "आज व उद्या पाऊस नाही (२०%). मात्र **शनिवारी अंदाजे १४ मिमी पाऊस (६५% शक्यता)** अपेक्षित असल्याने वीकेंडचे पाणी थांबवले जाईल."
        },
        {
          trigger: "which plot has the lowest moisture",
          answer: "**प्लॉट C** मध्ये सर्वात कमी ओलावा (**३१%**) आहे. फुटवे सुकू नयेत म्हणून आज दुपारी **४:३० वाजता** तातडीने पाणी देणे आवश्यक आहे."
        },
        {
          trigger: "what fertigation is scheduled for plot a",
          answer: "**प्लॉट A** साठी खताचा डोस **उद्या सकाळी ६:०० वाजता** पाण्याच्या पाळीसोबत जोडण्यात आला आहे (NPK १९:१९:१९ व पोटॅश)."
        }
      ]
    },
    hi: {
      greeting: "नमस्ते रमेश पाटिल जी! मैं आपका SUGARCANE360 AI सहायक हूँ। सिंचाई, मौसम, मिट्टी या गन्ने के बारे में पूछें।",
      fallback: "मैं आपके ४ खेतों के बारे में सटीक सलाह दे सकता हूँ। ऊपर दिए गए प्रश्नों में से चुनें।",
      qa: [
        {
          trigger: "when should i irrigate plot a",
          answer: "कल सुबह (**६:०० से ८:३० बजे**), **प्लॉट A** में सिंचाई की सिफारिश है (२.५ घंटे, ७,५०० लीटर, पंप ०१)।"
        },
        {
          trigger: "why is irrigation recommended tomorrow",
          answer: "प्लॉट A में नमी **४२%** रह गई है, बारिश की संभावना कम (२०%) है और फसल **ग्रैंड ग्रोथ** अवस्था में अत्यधिक पानी मांगती है।"
        },
        {
          trigger: "is rain expected in kolhapur this week",
          answer: "आज और कल बारिश नहीं होगी। लेकिन **शनिवार को ६५% संभावना के साथ लगभग १४ मिमी बारिश** का अनुमान है, जिससे सिंचाई स्वतः स्थगित होगी।"
        },
        {
          trigger: "which plot has the lowest moisture",
          answer: "**प्लॉट C** में सबसे कम नमी (**३१%**) है। गन्ने के फुटाव को बचाने के लिए आज शाम **४:३० बजे** तुरंत सिंचाई आवश्यक है।"
        },
        {
          trigger: "what fertigation is scheduled for plot a",
          answer: "**प्लॉट A** के लिए फर्टिगेशन **कल सुबह ६:०० बजे** सिंचाई चक्र के साथ निर्धारित है (घुलनशील NPK १९:१९:१९ + पोटाश)।"
        }
      ]
    },
    kn: {
      greeting: "ನಮಸ್ಕಾರ ರಮೇಶ್ ಪಾಟೀಲ್ ಅವರೇ! ನಾನು ನಿಮ್ಮ SUGARCANE360 AI ಸಹಾಯಕ. ಕಬ್ಬಿನ ನೀರಾವರಿ, ಹವಾಮಾನ ಮತ್ತು ಮಣ್ಣಿನ ಬಗ್ಗೆ ವಿಚಾರಿಸಿ.",
      fallback: "ಕಬ್ಬಿನ ೪ ಪ್ಲಾಟ್‌ಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಬಲ್ಲೆ. ದಯವಿಟ್ಟು ಮೇಲಿನ ಪ್ರಶ್ನೆಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
      qa: [
        {
          trigger: "when should i irrigate plot a",
          answer: "ನಾಳೆ ಬೆಳಗ್ಗೆ (**೬:೦೦ ರಿಂದ ೮:೩೦**), **ಪ್ಲಾಟ್ A** ಗೆ ನೀರು ಹರಿಸಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ (೨.೫ ಗಂಟೆ, ೭,೫೦೦ ಲೀಟರ್, ಪಂಪ್ ೦೧)."
        },
        {
          trigger: "why is irrigation recommended tomorrow",
          answer: "ಪ್ಲಾಟ್ A ನಲ್ಲಿ ತೇವಾಂಶ **೪೨%** ಕ್ಕೆ ಇಳಿದಿದೆ, ಮಳೆ ಸಾಧ್ಯತೆ ಕಡಿಮೆ (೨೦%) ಮತ್ತು ಕಬ್ಬು **ಗ್ರ್ಯಾಂಡ್ ಗ್ರೋತ್** ಹಂತದಲ್ಲಿದೆ."
        },
        {
          trigger: "is rain expected in kolhapur this week",
          answer: "ಶನಿವಾರ ಸುಮಾರು **೧೪ mm ಮಳೆ ಸಾಧ್ಯತೆ ಇದೆ (೬೫%)**, ಇದರಿಂದ ವಾರಾಂತ್ಯದ ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ ಬದಲಾಗಲಿದೆ."
        },
        {
          trigger: "which plot has the lowest moisture",
          answer: "**ಪ್ಲಾಟ್ C** ನಲ್ಲಿ ತೇವಾಂಶ ಅತ್ಯಂತ ಕಡಿಮೆ (**೩೧%**) ಇದ್ದು, ಇಂದು ಸಂಜೆ **೪:೩೦ ಕ್ಕೆ** ತಕ್ಷಣ ನೀರು ಹರಿಸಬೇಕು."
        },
        {
          trigger: "what fertigation is scheduled for plot a",
          answer: "**ಪ್ಲಾಟ್ A** ಗೆ ನಾಳೆ ಬೆಳಗ್ಗೆ **೬:೦೦ ಗಂಟೆಗೆ** ನೀರಾವರಿಯೊಂದಿಗೆ ರಸಗೊಬ್ಬರ (NPK 19:19:19) ನೀಡಲು ಸೂಚಿಸಲಾಗಿದೆ."
        }
      ]
    }
  }
};

/**
 * State Management for Selected Plot & Decisions
 */
const AppState = {
  getSelectedPlotId() {
    const urlParams = new URLSearchParams(window.location.search);
    const plotParam = urlParams.get("plot");
    if (plotParam && SUGARCANE_DATA.plots.some(p => p.id === plotParam)) {
      localStorage.setItem("sugarcane_selected_plot", plotParam);
      return plotParam;
    }
    return localStorage.getItem("sugarcane_selected_plot") || "plot-a";
  },

  setSelectedPlotId(id) {
    if (SUGARCANE_DATA.plots.some(p => p.id === id)) {
      localStorage.setItem("sugarcane_selected_plot", id);
      window.dispatchEvent(new CustomEvent("sugarcane:plot-selected", { detail: { plotId: id } }));
      return true;
    }
    return false;
  },

  getSelectedPlot() {
    const id = this.getSelectedPlotId();
    return SUGARCANE_DATA.plots.find(p => p.id === id) || SUGARCANE_DATA.plots[0];
  },

  getDecision(plotId) {
    return localStorage.getItem(`decision_${plotId}`) || "pending";
  },

  setDecision(plotId, decision) {
    localStorage.setItem(`decision_${plotId}`, decision); // 'accepted', 'modified', 'overridden'
  },

  getAlerts() {
    const saved = localStorage.getItem("sugarcane_alerts");
    return saved ? JSON.parse(saved) : SUGARCANE_DATA.alerts;
  },

  saveAlerts(alerts) {
    localStorage.setItem("sugarcane_alerts", JSON.stringify(alerts));
  }
};
