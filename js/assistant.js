/**
 * SUGARCANE360 — AI Farmer Assistant Controller
 * Predefined Multilingual Farmer-Friendly Agronomic Reasoning
 */

let selectedLang = "en";

document.addEventListener("DOMContentLoaded", () => {
  initAssistantChat();
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  }
});

function initAssistantChat() {
  const sendBtn = document.getElementById("sendChatBtn");
  const chatInput = document.getElementById("chatInput");
  const langSelect = document.getElementById("assistantLangSelector");

  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      selectedLang = e.target.value;
      renderWelcomeMessage();
    });
  }

  if (sendBtn && chatInput) {
    sendBtn.addEventListener("click", () => processUserInput());
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") processUserInput();
    });
  }

  renderWelcomeMessage();
}

function renderWelcomeMessage() {
  const container = document.getElementById("assistantChatMessages");
  if (!container) return;

  const data = SUGARCANE_DATA.assistant[selectedLang] || SUGARCANE_DATA.assistant.en;

  container.innerHTML = `
    <div class="chat-msg bot">
      ${data.greeting}
    </div>
  `;
}

function askQuestion(text) {
  const input = document.getElementById("chatInput");
  if (input) {
    input.value = text;
    processUserInput();
  }
}

function processUserInput() {
  const input = document.getElementById("chatInput");
  const userText = input ? input.value.trim() : "";
  if (!userText) return;

  appendChat("user", userText);
  if (input) input.value = "";

  // Answer lookup with slight delay for realistic assistant feel
  setTimeout(() => {
    const answer = getAnswerForQuery(userText);
    appendChat("bot", answer);
  }, 350);
}

function appendChat(role, message) {
  const container = document.getElementById("assistantChatMessages");
  if (!container) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-msg ${role}`;
  bubble.innerHTML = message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function getAnswerForQuery(query) {
  const lower = query.toLowerCase();
  const langData = SUGARCANE_DATA.assistant[selectedLang] || SUGARCANE_DATA.assistant.en;

  // 1. Check exact or partial trigger in current language
  for (const item of langData.qa) {
    const trig = item.trigger.toLowerCase();
    if (lower.includes(trig) || trig.includes(lower)) {
      return item.answer;
    }
  }

  // 2. Cross-check keywords against english triggers
  const enMap = {
    "plot a": "when should i irrigate plot a",
    "irrigate": "when should i irrigate plot a",
    "why": "why is irrigation recommended tomorrow",
    "rain": "is rain expected in kolhapur this week",
    "kolhapur": "is rain expected in kolhapur this week",
    "lowest": "which plot has the lowest moisture",
    "plot c": "which plot has the lowest moisture",
    "fertigation": "what fertigation is scheduled for plot a",
    "fertilizer": "what fertigation is scheduled for plot a"
  };

  for (const [kw, trig] of Object.entries(enMap)) {
    if (lower.includes(kw)) {
      const matched = langData.qa.find(q => q.trigger.toLowerCase() === trig);
      if (matched) return matched.answer;
    }
  }

  return langData.fallback;
}
