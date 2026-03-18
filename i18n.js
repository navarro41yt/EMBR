// ── i18n Engine ──────────────────────────────────────────────
// Lightweight internationalization system.
// Each language registers itself via i18n.register(code, data).
// Translations use dot-notation keys resolved at runtime.

const i18n = {
  _langs: {},
  _current: 'es',
  _listeners: [],

  register(code, data) {
    this._langs[code] = data;
  },

  get lang() {
    return this._current;
  },

  setLanguage(code) {
    if (!this._langs[code]) return;
    this._current = code;
    localStorage.setItem('embr_lang', code);
    document.documentElement.lang = code;
    this._applyDOM();
    this._listeners.forEach((fn) => fn(code));
  },

  // Resolve a dot-notation key like "results.speed"
  t(key) {
    const keys = key.split('.');
    let val = this._langs[this._current];
    for (const k of keys) {
      if (val == null) return key;
      val = val[k];
    }
    return val != null ? val : key;
  },

  // Get a translated string with {placeholder} replacements
  tf(key, replacements) {
    let str = this.t(key);
    if (typeof str !== 'string') return key;
    for (const [k, v] of Object.entries(replacements)) {
      str = str.replace(`{${k}}`, v);
    }
    return str;
  },

  // Apply translations to all data-i18n annotated DOM elements
  _applyDOM() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const val = this.t(el.getAttribute('data-i18n'));
      if (typeof val === 'string') el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const val = this.t(el.getAttribute('data-i18n-placeholder'));
      if (typeof val === 'string') el.placeholder = val;
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const val = this.t(el.getAttribute('data-i18n-title'));
      if (typeof val === 'string') el.title = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const val = this.t(el.getAttribute('data-i18n-html'));
      if (typeof val === 'string') el.innerHTML = val;
    });
  },

  // Subscribe to language changes
  onChange(fn) {
    this._listeners.push(fn);
  },

  // List available languages for the selector
  getLanguages() {
    return Object.keys(this._langs).map((code) => ({
      code,
      name: this._langs[code].meta.name,
      flag: this._langs[code].meta.flag,
    }));
  },

  // Initialize: load saved preference or detect from browser
  init() {
    const saved = localStorage.getItem('embr_lang');
    if (saved && this._langs[saved]) {
      this._current = saved;
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (this._langs[browserLang]) this._current = browserLang;
    }
    document.documentElement.lang = this._current;
    this._applyDOM();
  },
};
