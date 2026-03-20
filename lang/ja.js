i18n.register('ja', {
  meta: { name: '日本語', flag: '🇯🇵' },

  header: {
    subtitle: 'アクティビティの消費カロリーを計算',
  },

  weight: {
    title: '体重',
    suffix: 'kg',
    save: '体重を保存',
    statusSaved: '体重を保存しました',
    statusLoaded: '保存済みの体重',
    statusError: '有効な体重を入力してください（20〜300 kg）',
  },

  activity: {
    title: 'アクティビティ',
    distance: '距離',
    distanceSuffix: 'km',
    time: '時間',
    minutes: '分',
    minutesSuffix: '分',
    hhmm: 'HH:MM',
    hhmmSuffix: '時:分',
    calculate: 'カロリーを計算',
    simulateMode: 'シミュレーションのみ（進捗に含めない）',
  },

  results: {
    title: '結果',
    unit: 'kcal',
    speed: '平均速度',
    pace: 'ペース',
    paceUnit: '/km',
    met: '推定MET',
    activityType: 'アクティビティの種類',
  },

  history: {
    title: '最近の履歴',
    clear: '履歴を削除',
  },

  footer: {
    formula: '計算式: カロリー = 時間(分) × (MET × 3.5 × 体重) / 200',
  },

  warnings: {
    speed: '⚠️ 速度 {speed} km/h — 計算は最大約25 km/h（人間の限界）まで正確です',
  },

  theme: {
    toggle: 'テーマ切替',
  },

  lang: {
    select: '言語',
  },

  activityLabels: [
    { maxSpeed: 3.5, label: 'ゆっくり散歩' },
    { maxSpeed: 4.5, label: '散歩' },
    { maxSpeed: 5.5, label: '軽いウォーキング' },
    { maxSpeed: 6.3, label: '普通のウォーキング' },
    { maxSpeed: 7.0, label: '速歩き' },
    { maxSpeed: 8.0, label: '早歩き・軽いジョグ' },
    { maxSpeed: 9.0, label: 'ジョギング' },
    { maxSpeed: 10.5, label: 'ランニング' },
    { maxSpeed: 13.0, label: '高速ランニング' },
    { maxSpeed: Infinity, label: 'スプリント' },
  ],

  motivational: {
    low: [
      '一歩一歩が大切！動き続けよう 💪',
      'いいスタート！継続は力なり 🔑',
      '1キロごとに強くなる！ 🚶',
      '小さな努力が大きな変化を生む ✨',
    ],
    medium: [
      'すごい！絶好調だ 🔥',
      'その努力、素晴らしい！続けよう 💥',
      '体が喜んでいる！ 🏆',
      '見事な努力！止まるな 🚀',
    ],
    high: [
      'マシーン！凄まじいセッション 🏅',
      '別次元のレベル！すごい 💎',
      'エピックなセッション！止められない 🦾',
      '生まれながらのアスリート！ 🐺',
    ],
    extreme: [
      '絶対的な猛獣！セッションを破壊した 🔥🔥🔥',
      '神レベル！誰が止められる？ ⚡',
      '人間じゃない！伝説だ 👑',
      '地獄級！アスファルトまで燃やした 🌋',
    ],
  },

  food: {
    template: '{name}{amount}個分に相当',
    items: [
      { emoji: '🍕', name: 'ピザ', kcal: 270 },
      { emoji: '🍫', name: 'チョコレートバー', kcal: 230 },
      { emoji: '🍩', name: 'ドーナツ', kcal: 250 },
      { emoji: '🍌', name: 'バナナ', kcal: 105 },
      { emoji: '🥤', name: 'コーラ', kcal: 140 },
      { emoji: '🍺', name: 'ビール', kcal: 150 },
      { emoji: '🍪', name: 'クッキー', kcal: 75 },
      { emoji: '🥑', name: 'アボカド', kcal: 240 },
      { emoji: '🌮', name: 'タコス', kcal: 210 },
      { emoji: '🍦', name: 'アイスクリーム', kcal: 200 },
    ],
  },

  progress: {
    title: 'グローバル進捗',
    totalDistance: '総走行距離',
    level: 'レベル',
    nextGoal: '次の目標',
    remaining: '残り {km} km',
    completed: '達成',
    legendary: '伝説',
    legendaryDesc: '地球から月まで',
    maxReached: '月に到達しました！あなたに限界はありません。',
    levelUp: 'レベル{level}達成！',
    openProgress: '進捗を見る',
    levels: [
      'クラシックな10Kレース',
      'マンハッタン島を端から端まで',
      'フルマラソン達成！',
      'ジブラルタル海峡（往復）',
      'アムステルダムからブリュッセルまで',
      'セビリアからマドリードまで',
      'マドリードからバルセロナまで（直線距離）',
      'ベルリンからプラハまで',
      'パリからバルセロナまで',
      'ロンドンからローマまで',
      'モスクワからベルリンまで',
      'ニューヨークからマイアミまで',
      '東京から北京まで（往復）',
      'ドバイからイスタンブールまで',
      'アメリカ横断（NY → LA）',
      'ロンドンからニューヨークまで（大西洋横断）',
      'サンパウロからリスボンまで',
      '東京からイスタンブールまで',
      'シドニーから東京まで',
      'ロンドンから東京まで',
      'ニューヨークからシドニーまで',
      'ケープタウンから東京まで',
      '地球の赤道の半分',
      'リマからシンガポールまで（太平洋横断）',
      'ブエノスアイレスから北京まで',
      '地球の赤道の4分の3',
      'オークランドからロンドンまで（往復）',
      '静止軌道の距離を水平に',
      'もうすぐ地球一周',
      '赤道での地球一周達成！',
    ],
  },
});
