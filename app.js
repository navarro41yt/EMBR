// ── MET reference points (speed in km/h → MET) ──────────────
const MET_TABLE = [
  { speed: 3.0, met: 2.5 },   // Paseo lento
  { speed: 4.0, met: 3.0 },   // Paseo normal
  { speed: 5.0, met: 3.5 },   // Caminar ligero
  { speed: 6.0, met: 4.3 },   // Caminar moderado
  { speed: 6.5, met: 5.0 },   // Caminar rápido
  { speed: 7.5, met: 6.5 },   // Marcha rápida / trote suave
  { speed: 8.0, met: 8.0 },   // Trote
  { speed: 9.5, met: 9.5 },   // Correr moderado
  { speed: 10.0, met: 10.0 }, // Correr
  { speed: 12.0, met: 12.5 }, // Correr rápido
  { speed: 14.0, met: 15.0 }, // Sprint moderado
  { speed: 16.0, met: 17.0 }, // Sprint
];

// ── Activity labels based on speed ───────────────────────────
function getActivityLabel(speed) {
  if (speed < 3.5) return 'Paseo lento';
  if (speed < 4.5) return 'Paseo';
  if (speed < 5.5) return 'Caminar ligero';
  if (speed < 6.3) return 'Caminar moderado';
  if (speed < 7.0) return 'Caminar rápido';
  if (speed < 8.0) return 'Marcha / trote suave';
  if (speed < 9.0) return 'Trote';
  if (speed < 10.5) return 'Correr';
  if (speed < 13.0) return 'Correr rápido';
  return 'Sprint';
}

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
  // Auto-insert colon after hours digits
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
    weightStatus.textContent = 'Peso guardado anteriormente';
    weightStatus.className = 'weight-status info';
  }
}

loadWeight();

// ── Weight: Save ─────────────────────────────────────────────
saveWeightBtn.addEventListener('click', () => {
  const w = parseFloat(weightInput.value);
  if (!w || w < 20 || w > 300) {
    flashError(weightInput);
    weightStatus.textContent = 'Introduce un peso válido (20-300 kg)';
    weightStatus.className = 'weight-status';
    weightStatus.style.color = 'var(--error)';
    return;
  }
  localStorage.setItem('embr_weight', w);
  saveWeightBtn.classList.add('saved');
  weightStatus.textContent = 'Peso guardado correctamente';
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

  // Display results
  $('#result-calories').textContent = Math.round(calories);
  $('#result-speed').textContent = speedKmh.toFixed(1) + ' km/h';
  $('#result-pace').textContent = paceMin + ':' + String(paceSec).padStart(2, '0') + ' /km';
  $('#result-met').textContent = met.toFixed(1);
  $('#result-activity').textContent = getActivityLabel(speedKmh);

  resultsSection.classList.remove('hidden');

  // Animate the number
  animateNumber($('#result-calories'), Math.round(calories));

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
    // Ease out cubic
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
