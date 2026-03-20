i18n.register('en', {
  meta: { name: 'English', flag: '🇬🇧' },

  header: {
    subtitle: 'Calculate the calories burned during your activity',
  },

  weight: {
    title: 'Your weight',
    suffix: 'kg',
    save: 'Save weight',
    statusSaved: 'Weight saved successfully',
    statusLoaded: 'Previously saved weight',
    statusError: 'Enter a valid weight (20-300 kg)',
  },

  activity: {
    title: 'Activity',
    distance: 'Distance',
    distanceSuffix: 'km',
    time: 'Time',
    minutes: 'Minutes',
    minutesSuffix: 'min',
    hhmm: 'HH:MM',
    hhmmSuffix: 'h:min',
    calculate: 'Calculate calories',
    simulateMode: 'Simulate only (doesn\'t count towards progress)',
  },

  results: {
    title: 'Results',
    unit: 'kcal',
    speed: 'Average speed',
    pace: 'Pace',
    paceUnit: '/km',
    met: 'Estimated MET',
    activityType: 'Activity type',
  },

  history: {
    title: 'Recent history',
    clear: 'Clear history',
  },

  footer: {
    formula: 'Formula: Calories = Time(min) × (MET × 3.5 × Weight) / 200',
  },

  warnings: {
    speed: '⚠️ Speed of {speed} km/h — calculation is only reliable up to ~25 km/h (human running limit)',
  },

  theme: {
    toggle: 'Toggle theme',
  },

  lang: {
    select: 'Language',
  },

  activityLabels: [
    { maxSpeed: 3.5, label: 'Slow walk' },
    { maxSpeed: 4.5, label: 'Walk' },
    { maxSpeed: 5.5, label: 'Light walk' },
    { maxSpeed: 6.3, label: 'Moderate walk' },
    { maxSpeed: 7.0, label: 'Brisk walk' },
    { maxSpeed: 8.0, label: 'Power walk / light jog' },
    { maxSpeed: 9.0, label: 'Jog' },
    { maxSpeed: 10.5, label: 'Run' },
    { maxSpeed: 13.0, label: 'Fast run' },
    { maxSpeed: Infinity, label: 'Sprint' },
  ],

  motivational: {
    low: [
      'Every step counts! Keep moving 💪',
      'Great start! Consistency is key 🔑',
      'Every kilometre makes you stronger! 🚶',
      'Small efforts create big changes ✨',
    ],
    medium: [
      'Great job! You\'re on fire 🔥',
      'That\'s dedication! Keep it up 💥',
      'Your body thanks you! 🏆',
      'Impressive effort! Don\'t stop 🚀',
    ],
    high: [
      'Machine! That was brutal 🏅',
      'You\'re on another level! Incredible 💎',
      'Epic session! You\'re unstoppable 🦾',
      'Born athlete! What a beast 🐺',
    ],
    extreme: [
      'ABSOLUTE BEAST! You crushed that session 🔥🔥🔥',
      'God tier! Who can stop you? ⚡',
      'That\'s not human! You\'re a legend 👑',
      'Infernal! You burned the pavement 🌋',
    ],
  },

  food: {
    template: 'Equivalent to {amount} {name}',
    items: [
      { emoji: '🍕', name: 'pizza slices', kcal: 270 },
      { emoji: '🍫', name: 'chocolate bars', kcal: 230 },
      { emoji: '🍩', name: 'doughnuts', kcal: 250 },
      { emoji: '🍌', name: 'bananas', kcal: 105 },
      { emoji: '🥤', name: 'cans of Coca-Cola', kcal: 140 },
      { emoji: '🍺', name: 'beers', kcal: 150 },
      { emoji: '🍪', name: 'cookies', kcal: 75 },
      { emoji: '🥑', name: 'avocados', kcal: 240 },
      { emoji: '🌮', name: 'tacos', kcal: 210 },
      { emoji: '🍦', name: 'scoops of ice cream', kcal: 200 },
    ],
  },

  progress: {
    title: 'Global Progress',
    totalDistance: 'Total distance covered',
    level: 'Level',
    nextGoal: 'Next goal',
    remaining: '{km} km remaining',
    completed: 'Completed',
    legendary: 'LEGENDARY',
    legendaryDesc: 'From the Earth to the Moon',
    maxReached: 'You\'ve reached the Moon! There are no limits for you.',
    levelUp: 'Level {level} reached!',
    openProgress: 'View progress',
    levels: [
      'A classic 10K race',
      'Crossing Manhattan island end to end',
      'A full marathon!',
      'The Strait of Gibraltar (round trip)',
      'From Amsterdam to Brussels',
      'From Seville to Madrid',
      'From Madrid to Barcelona (straight line)',
      'From Berlin to Prague',
      'From Paris to Barcelona',
      'From London to Rome',
      'From Moscow to Berlin',
      'From New York to Miami',
      'From Tokyo to Beijing (round trip)',
      'From Dubai to Istanbul',
      'Across the United States (NY → LA)',
      'From London to New York (crossing the Atlantic)',
      'From São Paulo to Lisbon',
      'From Tokyo to Istanbul',
      'From Sydney to Tokyo',
      'From London to Tokyo',
      'From New York to Sydney',
      'From Cape Town to Tokyo',
      'Half the Earth\'s circumference',
      'From Lima to Singapore (crossing the Pacific)',
      'From Buenos Aires to Beijing',
      'Three quarters of the Earth\'s circumference',
      'From Auckland to London (round trip)',
      'The distance of a geostationary orbit laid flat',
      'Almost a full trip around the Earth',
      'The full circumference of the Earth at the equator!',
    ],
  },
});
