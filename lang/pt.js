i18n.register('pt', {
  meta: { name: 'Português', flag: '🇧🇷' },

  header: {
    subtitle: 'Calcule as calorias queimadas na sua atividade',
  },

  weight: {
    title: 'Seu peso',
    suffix: 'kg',
    save: 'Salvar peso',
    statusSaved: 'Peso salvo com sucesso',
    statusLoaded: 'Peso salvo anteriormente',
    statusError: 'Insira um peso válido (20-300 kg)',
  },

  activity: {
    title: 'Atividade',
    distance: 'Distância',
    distanceSuffix: 'km',
    time: 'Tempo',
    minutes: 'Minutos',
    minutesSuffix: 'min',
    hhmm: 'HH:MM',
    hhmmSuffix: 'h:min',
    calculate: 'Calcular calorias',
  },

  results: {
    title: 'Resultados',
    unit: 'kcal',
    speed: 'Velocidade média',
    pace: 'Ritmo',
    paceUnit: '/km',
    met: 'MET estimado',
    activityType: 'Tipo de atividade',
  },

  history: {
    title: 'Histórico recente',
    clear: 'Limpar histórico',
  },

  footer: {
    formula: 'Fórmula: Calorias = Tempo(min) × (MET × 3.5 × Peso) / 200',
  },

  warnings: {
    speed: '⚠️ Velocidade de {speed} km/h — o cálculo só é confiável até ~25 km/h (limite humano de corrida)',
  },

  theme: {
    toggle: 'Alternar tema',
  },

  lang: {
    select: 'Idioma',
  },

  activityLabels: [
    { maxSpeed: 3.5, label: 'Caminhada lenta' },
    { maxSpeed: 4.5, label: 'Caminhada' },
    { maxSpeed: 5.5, label: 'Caminhada leve' },
    { maxSpeed: 6.3, label: 'Caminhada moderada' },
    { maxSpeed: 7.0, label: 'Caminhada rápida' },
    { maxSpeed: 8.0, label: 'Marcha / trote leve' },
    { maxSpeed: 9.0, label: 'Trote' },
    { maxSpeed: 10.5, label: 'Corrida' },
    { maxSpeed: 13.0, label: 'Corrida rápida' },
    { maxSpeed: Infinity, label: 'Sprint' },
  ],

  motivational: {
    low: [
      'Cada passo conta! Continue se movendo 💪',
      'Bom começo! A constância é a chave 🔑',
      'Cada quilômetro te torna mais forte! 🚶',
      'Pequenos esforços criam grandes mudanças ✨',
    ],
    medium: [
      'Ótimo trabalho! Você está em alta 🔥',
      'Isso é dedicação! Continue assim 💥',
      'Seu corpo agradece! 🏆',
      'Esforço impressionante! Não pare 🚀',
    ],
    high: [
      'Máquina! Isso foi brutal 🏅',
      'Você está em outro nível! Incrível 💎',
      'Sessão épica! Você é imparável 🦾',
      'Atleta nato! Que fera 🐺',
    ],
    extreme: [
      'FERA ABSOLUTA! Você destruiu essa sessão 🔥🔥🔥',
      'Nível deus! Quem te para? ⚡',
      'Isso não é humano! Você é uma lenda 👑',
      'Infernal! Queimou até o asfalto 🌋',
    ],
  },

  food: {
    template: 'Equivale a {amount} {name}',
    items: [
      { emoji: '🍕', name: 'fatias de pizza', kcal: 270 },
      { emoji: '🍫', name: 'barras de chocolate', kcal: 230 },
      { emoji: '🍩', name: 'donuts', kcal: 250 },
      { emoji: '🍌', name: 'bananas', kcal: 105 },
      { emoji: '🥤', name: 'latas de Coca-Cola', kcal: 140 },
      { emoji: '🍺', name: 'cervejas', kcal: 150 },
      { emoji: '🍪', name: 'biscoitos', kcal: 75 },
      { emoji: '🥑', name: 'abacates', kcal: 240 },
      { emoji: '🌮', name: 'tacos', kcal: 210 },
      { emoji: '🍦', name: 'bolas de sorvete', kcal: 200 },
    ],
  },
});
