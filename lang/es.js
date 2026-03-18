i18n.register('es', {
  meta: { name: 'Español', flag: '🇪🇸' },

  header: {
    subtitle: 'Calcula las calorías quemadas en tu actividad',
  },

  weight: {
    title: 'Tu peso',
    suffix: 'kg',
    save: 'Guardar peso',
    statusSaved: 'Peso guardado correctamente',
    statusLoaded: 'Peso guardado anteriormente',
    statusError: 'Introduce un peso válido (20-300 kg)',
  },

  activity: {
    title: 'Actividad',
    distance: 'Distancia',
    distanceSuffix: 'km',
    time: 'Tiempo',
    minutes: 'Minutos',
    minutesSuffix: 'min',
    hhmm: 'HH:MM',
    hhmmSuffix: 'h:min',
    calculate: 'Calcular calorías',
  },

  results: {
    title: 'Resultados',
    unit: 'kcal',
    speed: 'Velocidad media',
    pace: 'Ritmo',
    paceUnit: '/km',
    met: 'MET estimado',
    activityType: 'Tipo de actividad',
  },

  history: {
    title: 'Historial reciente',
    clear: 'Borrar historial',
  },

  footer: {
    formula: 'Fórmula: Calorías = Tiempo(min) × (MET × 3.5 × Peso) / 200',
  },

  warnings: {
    speed: '⚠️ Velocidad de {speed} km/h — el cálculo solo es fiable hasta ~25 km/h (límite humano en carrera)',
  },

  theme: {
    toggle: 'Cambiar tema',
  },

  lang: {
    select: 'Idioma',
  },

  activityLabels: [
    { maxSpeed: 3.5, label: 'Paseo lento' },
    { maxSpeed: 4.5, label: 'Paseo' },
    { maxSpeed: 5.5, label: 'Caminar ligero' },
    { maxSpeed: 6.3, label: 'Caminar moderado' },
    { maxSpeed: 7.0, label: 'Caminar rápido' },
    { maxSpeed: 8.0, label: 'Marcha / trote suave' },
    { maxSpeed: 9.0, label: 'Trote' },
    { maxSpeed: 10.5, label: 'Correr' },
    { maxSpeed: 13.0, label: 'Correr rápido' },
    { maxSpeed: Infinity, label: 'Sprint' },
  ],

  motivational: {
    low: [
      '¡Todo paso cuenta! Sigue moviéndote 💪',
      '¡Buen comienzo! La constancia es la clave 🔑',
      '¡Cada kilómetro te hace más fuerte! 🚶',
      'Los pequeños esfuerzos crean grandes cambios ✨',
    ],
    medium: [
      '¡Gran trabajo! Estás en racha 🔥',
      '¡Eso es dedicación! Sigue así 💥',
      '¡Tu cuerpo te lo agradece! 🏆',
      '¡Impresionante esfuerzo! No pares 🚀',
    ],
    high: [
      '¡Máquina! Eso ha sido brutal 🏅',
      '¡Estás en otro nivel! Tremendo 💎',
      '¡Sesión épica! Eres imparable 🦾',
      '¡Atleta nato! Qué monstruo 🐺',
    ],
    extreme: [
      '¡BESTIA ABSOLUTA! Has destruido esa sesión 🔥🔥🔥',
      '¡Nivel dios! ¿Quién te para? ⚡',
      '¡Eso no es humano! Eres una leyenda 👑',
      '¡Infernal! Has quemado hasta el asfalto 🌋',
    ],
  },

  food: {
    template: 'Equivale a {amount} {name}',
    items: [
      { emoji: '🍕', name: 'porciones de pizza', kcal: 270 },
      { emoji: '🍫', name: 'barritas de chocolate', kcal: 230 },
      { emoji: '🍩', name: 'donuts', kcal: 250 },
      { emoji: '🍌', name: 'plátanos', kcal: 105 },
      { emoji: '🥤', name: 'latas de Coca-Cola', kcal: 140 },
      { emoji: '🍺', name: 'cervezas', kcal: 150 },
      { emoji: '🍪', name: 'galletas', kcal: 75 },
      { emoji: '🥑', name: 'aguacates', kcal: 240 },
      { emoji: '🌮', name: 'tacos', kcal: 210 },
      { emoji: '🍦', name: 'bolas de helado', kcal: 200 },
    ],
  },
});
