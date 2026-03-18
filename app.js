// ── MET reference points (speed in km/h → MET) ──────────────
const MET_TABLE = [
  { speed: 3.0, met: 2.5 },
  { speed: 4.0, met: 3.0 },
  { speed: 5.0, met: 3.5 },
  { speed: 6.0, met: 4.3 },
  { speed: 6.5, met: 5.0 },
  { speed: 7.5, met: 6.5 },
  { speed: 8.0, met: 8.0 },
  { speed: 9.5, met: 9.5 },
  { speed: 10.0, met: 10.0 },
  { speed: 12.0, met: 12.5 },
  { speed: 14.0, met: 15.0 },
  { speed: 16.0, met: 17.0 },
];

// ── Interpolate MET from speed ───────────────────────────────
function calculateMET(speedKmh) {
  if (speedKmh <= MET_TABLE[0].speed) return MET_TABLE[0].met;
  if (speedKmh >= MET_TABLE[MET_TABLE.length - 1].speed) return MET_TABLE[MET_TABLE.length - 1].met;

  for (let i = 0; i < MET_TABLE.length - 1; i++) {
    const low = MET_TABLE[i];
    const high = MET_TABLE[i + 1];
    if (speedKmh >= low.speed && speedKmh <= high.speed) {
      const ratio = (speedKmh - low.speed) / (high.speed - low.speed);
      return low.met + ratio * (high.met - low.met);
    }
  }
  return MET_TABLE[MET_TABLE.length - 1].met;
}

// ── i18n-powered helpers ─────────────────────────────────────
function getActivityLabel(speed) {
  const labels = i18n.t('activityLabels');
  if (!Array.isArray(labels)) return '';
  for (const entry of labels) {
    if (speed < entry.maxSpeed) return entry.label;
  }
  return labels[labels.length - 1].label;
}

function getMotivationalMessage(calories) {
  let tier;
  if (calories < 100) tier = 'low';
  else if (calories < 300) tier = 'medium';
  else if (calories < 600) tier = 'high';
  else tier = 'extreme';
  const msgs = i18n.t(`motivational.${tier}`);
  if (!Array.isArray(msgs)) return '';
  return msgs[Math.floor(Math.random() * msgs.length)];
}

function getFoodEquivalence(calories) {
  const items = i18n.t('food.items');
  const template = i18n.t('food.template');
  if (!Array.isArray(items)) return '';
  const food = items[Math.floor(Math.random() * items.length)];
  const amount = (calories / food.kcal).toFixed(1);
  const text = template.replace('{amount}', amount).replace('{name}', food.name);
  return `<span class="eq-emoji">${food.emoji}</span> ${text}`;
}

// ── Locale helper for dates ──────────────────────────────────
function getDateLocale() {
  const map = { es: 'es-ES', en: 'en-GB', pt: 'pt-BR', ja: 'ja-JP' };
  return map[i18n.lang] || 'es-ES';
}

// ── Theme management ─────────────────────────────────────────
function getPreferredTheme() {
  const saved = localStorage.getItem('embr_theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('embr_theme', theme);
}

applyTheme(getPreferredTheme());

// ── History management ───────────────────────────────────────
const MAX_HISTORY = 5;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem('embr_history') || '[]');
  } catch { return []; }
}

function saveToHistory(entry) {
  const history = loadHistory();
  history.unshift(entry);
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
  localStorage.setItem('embr_history', JSON.stringify(history));
  renderHistory();
}

function clearHistory() {
  localStorage.removeItem('embr_history');
  renderHistory();
}

function renderHistory() {
  const list = document.querySelector('#history-list');
  const section = document.querySelector('#history-section');
  const history = loadHistory();

  if (history.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  list.innerHTML = history.map((h, idx) => `
    <div class="history-item" style="animation-delay: ${idx * 0.05}s">
      <div class="history-item-left">
        <span class="history-item-cal">${h.calories} kcal</span>
        <span class="history-item-info">${h.distance} km · ${h.time} min · ${h.speed} km/h · ${h.activity}</span>
      </div>
      <span class="history-item-date">${h.date}</span>
    </div>
  `).join('');
}

// ── DOM Elements ─────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);

const weightInput = $('#weight');
const saveWeightBtn = $('#save-weight');
const weightStatus = $('#weight-status');
const distanceInput = $('#distance');
const timeMinutesInput = $('#time-minutes');
const timeHhmmInput = $('#time-hhmm');
const timeMinutesWrapper = $('#time-minutes-wrapper');
const timeHhmmWrapper = $('#time-hhmm-wrapper');
const btnMinutes = $('#btn-minutes');
const btnHhmm = $('#btn-hhmm');
const calculateBtn = $('#calculate');
const resultsSection = $('#results-section');
const themeToggle = $('#theme-toggle');
const clearHistoryBtn = $('#clear-history');
const langSelect = $('#lang-select');

// ── i18n: Initialize & populate selector ─────────────────────
function populateLangSelector() {
  const langs = i18n.getLanguages();
  langSelect.innerHTML = langs.map((l) =>
    `<option value="${l.code}" ${l.code === i18n.lang ? 'selected' : ''}>${l.flag} ${l.name}</option>`
  ).join('');
}

populateLangSelector();
i18n.init();

langSelect.addEventListener('change', (e) => {
  i18n.setLanguage(e.target.value);
});

// Update selector value when i18n.init() resolves the actual language
langSelect.value = i18n.lang;

// Re-apply dynamic text when language changes
i18n.onChange(() => {
  langSelect.value = i18n.lang;
  const saved = localStorage.getItem('embr_weight');
  if (saved && weightInput.value) {
    weightStatus.textContent = i18n.t('weight.statusLoaded');
    weightStatus.className = 'weight-status info';
  }
});

// ── Theme Toggle ─────────────────────────────────────────────
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

// ── History: Clear ───────────────────────────────────────────
clearHistoryBtn.addEventListener('click', clearHistory);

// ── History: Initial render ──────────────────────────────────
renderHistory();

// ── Time Mode Toggle ─────────────────────────────────────────
let timeMode = 'minutes';

btnMinutes.addEventListener('click', () => {
  timeMode = 'minutes';
  btnMinutes.classList.add('active');
  btnHhmm.classList.remove('active');
  timeMinutesWrapper.classList.remove('hidden');
  timeHhmmWrapper.classList.add('hidden');
});

btnHhmm.addEventListener('click', () => {
  timeMode = 'hhmm';
  btnHhmm.classList.add('active');
  btnMinutes.classList.remove('active');
  timeHhmmWrapper.classList.remove('hidden');
  timeMinutesWrapper.classList.add('hidden');
});

// ── HH:MM Input Formatting ──────────────────────────────────
timeHhmmInput.addEventListener('input', (e) => {
  let val = e.target.value.replace(/[^0-9:]/g, '');
  if (val.length === 2 && !val.includes(':') && e.inputType !== 'deleteContentBackward') {
    val += ':';
  }
  e.target.value = val;
});

// ── Parse time to minutes ────────────────────────────────────
function getTimeMinutes() {
  if (timeMode === 'minutes') {
    return parseFloat(timeMinutesInput.value);
  }
  const val = timeHhmmInput.value.trim();
  const match = val.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return NaN;
  const hours = parseInt(match[1], 10);
  const mins = parseInt(match[2], 10);
  if (mins >= 60) return NaN;
  return hours * 60 + mins;
}

// ── Weight: Load from localStorage ───────────────────────────
function loadWeight() {
  const saved = localStorage.getItem('embr_weight');
  if (saved) {
    weightInput.value = saved;
    weightStatus.textContent = i18n.t('weight.statusLoaded');
    weightStatus.className = 'weight-status info';
  }
}

loadWeight();

// ── Weight: Save ─────────────────────────────────────────────
saveWeightBtn.addEventListener('click', () => {
  const w = parseFloat(weightInput.value);
  if (!w || w < 20 || w > 300) {
    flashError(weightInput);
    weightStatus.textContent = i18n.t('weight.statusError');
    weightStatus.className = 'weight-status';
    weightStatus.style.color = 'var(--error)';
    return;
  }
  localStorage.setItem('embr_weight', w);
  saveWeightBtn.classList.add('saved');
  weightStatus.textContent = i18n.t('weight.statusSaved');
  weightStatus.className = 'weight-status saved';
  setTimeout(() => saveWeightBtn.classList.remove('saved'), 1500);
});

// ── Error flash ──────────────────────────────────────────────
function flashError(input) {
  input.classList.add('input-error', 'shake');
  setTimeout(() => input.classList.remove('input-error', 'shake'), 600);
}

// ── Calculate ────────────────────────────────────────────────
calculateBtn.addEventListener('click', () => {
  const weight = parseFloat(weightInput.value);
  const distance = parseFloat(distanceInput.value);
  const timeMin = getTimeMinutes();

  // Validate
  let hasError = false;

  if (!weight || weight < 20 || weight > 300) {
    flashError(weightInput);
    hasError = true;
  }
  if (!distance || distance <= 0) {
    flashError(distanceInput);
    hasError = true;
  }
  if (!timeMin || timeMin <= 0) {
    const activeInput = timeMode === 'minutes' ? timeMinutesInput : timeHhmmInput;
    flashError(activeInput);
    hasError = true;
  }

  if (hasError) return;

  // Check for unrealistic speed
  const previewSpeed = (distance / timeMin) * 60;
  if (previewSpeed > 25) {
    const speedWarn = document.getElementById('speed-warning');
    if (speedWarn) speedWarn.remove();
    const warn = document.createElement('p');
    warn.id = 'speed-warning';
    warn.className = 'speed-warning';
    warn.textContent = i18n.tf('warnings.speed', { speed: previewSpeed.toFixed(1) });
    resultsSection.parentNode.insertBefore(warn, resultsSection);
    setTimeout(() => warn.remove(), 8000);
  } else {
    const existing = document.getElementById('speed-warning');
    if (existing) existing.remove();
  }

  // Auto-save weight
  localStorage.setItem('embr_weight', weight);

  // Calculate
  const speedKmh = (distance / timeMin) * 60;
  const met = calculateMET(speedKmh);
  const calories = timeMin * (met * 3.5 * weight) / 200;

  // Pace (min/km)
  const paceTotal = timeMin / distance;
  const paceMin = Math.floor(paceTotal);
  const paceSec = Math.round((paceTotal - paceMin) * 60);

  const activityLabel = getActivityLabel(speedKmh);
  const roundedCal = Math.round(calories);
  const paceUnit = i18n.t('results.paceUnit');

  // Display results
  $('#result-calories').textContent = roundedCal;
  $('#result-speed').textContent = speedKmh.toFixed(1) + ' km/h';
  $('#result-pace').textContent = paceMin + ':' + String(paceSec).padStart(2, '0') + ' ' + paceUnit;
  $('#result-met').textContent = met.toFixed(1);
  $('#result-activity').textContent = activityLabel;

  // Motivational message
  $('#motivational-msg').textContent = getMotivationalMessage(roundedCal);

  // Food equivalence
  $('#result-equivalence').innerHTML = getFoodEquivalence(roundedCal);

  resultsSection.classList.remove('hidden');

  // Save to history
  const now = new Date();
  saveToHistory({
    calories: roundedCal,
    distance: distance.toFixed(2),
    time: Math.round(timeMin),
    speed: speedKmh.toFixed(1),
    activity: activityLabel,
    date: now.toLocaleDateString(getDateLocale(), { day: 'numeric', month: 'short' }),
  });

  // Animate the number
  animateNumber($('#result-calories'), roundedCal);

  // Scroll to results
  setTimeout(() => {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
});

// ── Animate number from 0 ────────────────────────────────────
function animateNumber(el, target) {
  const duration = 600;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// ── Enter key triggers calculation ───────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
    calculateBtn.click();
  }
});
