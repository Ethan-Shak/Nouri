/* NOURI — domain data: personas, autonomy levels, loop steps, scheduled meals */

const PERSONAS = {
  quarantined: {
    id: 'quarantined',
    name: 'Quarantined',
    full: 'Quarantined patient',
    blurb: "Can't leave home. Three meals, zero decisions.",
    autonomyDefault: 3, // full silent
    accent: 'sage',
    connectors: ['medical', 'dietary', 'location', 'budget'],
    constraint: 'Medical compliance above all',
    dailyTarget: { kcal: 1800, p: 95, c: 220, f: 60 },
    meals: [
      { time: '07:30', slot: 'Breakfast', item: 'Congee with poached egg', from: 'Tiong Bahru Bak Kut Teh', kcal: 410, price: 8.40, status: 'delivered',
        why: 'Soft, hydrating, low-sodium congee meets recovery diet. Egg adds 7g protein toward 95g target.' },
      { time: '12:15', slot: 'Lunch', item: 'Steamed cod + brown rice', from: 'Soup Spoon', kcal: 540, price: 13.90, status: 'enroute', eta: '12:42',
        why: 'Lean white fish, no fried oils. Brown rice keeps GI in mid range. Within $14 lunch cap.' },
      { time: '18:30', slot: 'Dinner', item: null, from: null, status: 'scheduled', decideAt: '17:55',
        why: 'Will rebalance against day macros at 17:55 and place order.' },
    ],
  },
  diabetic: {
    id: 'diabetic',
    name: 'Diabetic',
    full: 'Type 2 diabetic',
    blurb: 'Approves each order. Strict GI ceiling, glucose-aware.',
    autonomyDefault: 1, // approve
    accent: 'clay',
    connectors: ['medical', 'cgm', 'dietary', 'budget'],
    constraint: 'GI ≤ 55, sugars ≤ 8g/meal',
    dailyTarget: { kcal: 1900, p: 110, c: 180, f: 65 },
    meals: [
      { time: '08:00', slot: 'Breakfast', item: 'Greek yogurt + chia + almonds', from: 'Pantry', kcal: 320, price: 0, status: 'delivered',
        why: 'CGM showed dawn rise. Low-GI breakfast (35) blunts spike.' },
      { time: '13:00', slot: 'Lunch', item: 'Grilled chicken cobb (no croutons)', from: 'SaladStop!', kcal: 510, price: 15.20, status: 'awaiting',
        why: 'GI 38. Sugars 6g. 42g protein. Lunch window is open until 14:00.' },
      { time: '19:00', slot: 'Dinner', item: null, from: null, status: 'scheduled', decideAt: '18:25',
        why: 'Will check CGM trend at 18:25 before deciding.' },
    ],
  },
  athlete: {
    id: 'athlete',
    name: 'Athlete',
    full: 'Endurance athlete',
    blurb: 'Macros first. Auto-orders around training blocks.',
    autonomyDefault: 2, // silent w/ grace
    accent: 'sage',
    connectors: ['wearables', 'calendar', 'dietary', 'budget'],
    constraint: 'Hit 180g P / 320g C / 80g F daily',
    dailyTarget: { kcal: 2800, p: 180, c: 320, f: 80 },
    meals: [
      { time: '06:30', slot: 'Pre-run', item: 'Banana + peanut butter toast', from: 'Pantry', kcal: 380, price: 0, status: 'delivered',
        why: 'Quick carbs 60min before zone 2 run. 50g carbs hits pre-fuel target.' },
      { time: '09:00', slot: 'Post-run', item: 'Egg white wrap + protein shake', from: 'Joe & Dough', kcal: 620, price: 16.80, status: 'enroute', eta: '09:18',
        why: 'Ran 12km. 38g protein within 30min recovery window. Ordered while still on cooldown.' },
      { time: '13:30', slot: 'Lunch', item: 'Beef rice bowl, double protein', from: 'Yoshinoya', kcal: 880, price: 14.50, status: 'scheduled', decideAt: '12:55',
        why: 'Heavy-leg day. High-carb, high-iron target. Will reorder if Garmin shows extra spend.' },
    ],
  },
  busy_exec: {
    id: 'busy_exec',
    name: 'Busy exec',
    full: 'Time-starved professional',
    blurb: 'Calendar-aware. Eats in the cracks between meetings.',
    autonomyDefault: 2,
    accent: 'sage',
    connectors: ['calendar', 'location', 'dietary', 'budget'],
    constraint: 'Land food in a free calendar window',
    dailyTarget: { kcal: 2100, p: 120, c: 230, f: 70 },
    meals: [
      { time: '08:15', slot: 'Breakfast', item: 'Cold brew + breakfast burrito', from: 'Toast Box', kcal: 480, price: 9.20, status: 'delivered',
        why: 'Calendar showed 8:15→9:00 free. Ordered to lobby at 8:10.' },
      { time: '12:30', slot: 'Lunch', item: 'Chirashi don', from: 'Sushi Tei', kcal: 620, price: 18.90, status: 'enroute', eta: '12:36',
        why: 'Only 35min free between board meeting and 1:1. Picked a low-prep, eat-at-desk option.' },
      { time: '19:15', slot: 'Dinner', item: null, from: null, status: 'scheduled', decideAt: '18:50',
        why: 'Dinner with vendor possibly. Will check calendar at 18:50.' },
    ],
  },
  caregiver: {
    id: 'caregiver',
    name: 'Caregiver',
    full: 'Managing parent\'s diet',
    blurb: 'Two profiles. Approves orders for someone else.',
    autonomyDefault: 1,
    accent: 'clay',
    connectors: ['medical', 'dietary', 'location', 'budget'],
    constraint: 'Soft textures, low sodium, mom\'s preferences',
    dailyTarget: { kcal: 1500, p: 75, c: 180, f: 50 },
    meals: [
      { time: '08:00', slot: 'Breakfast', item: 'Soft-boiled egg + porridge', from: 'Soup Spoon', kcal: 340, price: 7.60, status: 'delivered',
        why: 'Soft texture, easy to chew. Delivered to mom\'s home address.' },
      { time: '12:30', slot: 'Lunch', item: 'Steamed fish with ginger', from: 'Crystal Jade', kcal: 460, price: 12.80, status: 'awaiting',
        why: 'Mom approved last similar order. Low sodium variant requested.' },
      { time: '18:00', slot: 'Dinner', item: null, from: null, status: 'scheduled', decideAt: '17:30',
        why: 'Caregiver shift ends 17:00. Will send mom the approval request directly.' },
    ],
  },
  post_surgery: {
    id: 'post_surgery',
    name: 'Post-surgery',
    full: 'Recovery diet',
    blurb: 'Soft, anti-inflammatory. Tracks healing macros.',
    autonomyDefault: 1,
    accent: 'clay',
    connectors: ['medical', 'dietary', 'budget'],
    constraint: 'Day 9 of post-op diet. No raw, no spice.',
    dailyTarget: { kcal: 1700, p: 100, c: 200, f: 55 },
    meals: [
      { time: '08:00', slot: 'Breakfast', item: 'Oat porridge + bone broth', from: 'The Daily Cut', kcal: 380, price: 8.90, status: 'delivered',
        why: 'Collagen-forward. Soft texture. Aligned with surgeon\'s day-9 plan.' },
      { time: '12:30', slot: 'Lunch', item: 'Steamed chicken + sweet potato mash', from: 'GRAIN', kcal: 520, price: 14.40, status: 'awaiting',
        why: '32g lean protein for tissue repair. No raw vegetables per protocol.' },
      { time: '18:30', slot: 'Dinner', item: null, from: null, status: 'scheduled', decideAt: '17:45',
        why: 'Will check with you at 17:45 before placing.' },
    ],
  },
};

const PERSONA_LIST = ['quarantined', 'diabetic', 'athlete', 'busy_exec', 'caregiver', 'post_surgery'];

const AUTONOMY_LEVELS = [
  { id: 0, name: 'Suggest', tag: 'You decide', desc: 'NOURI proposes options. You tap to order yourself.', icon: '○' },
  { id: 1, name: 'Approve', tag: 'Confirm each', desc: 'NOURI picks one meal. You approve before it places.', icon: '◐' },
  { id: 2, name: 'Silent',  tag: '90s grace',   desc: 'NOURI orders quietly. 90 seconds to cancel.', icon: '◑' },
  { id: 3, name: 'Full silent', tag: 'No interrupts', desc: 'NOURI orders without notifying. Daily digest at 9pm.', icon: '●' },
];

const LOOP_STEPS = [
  { id: 'sense',   label: 'Sense',   sub: 'context signals',  duration: 1400 },
  { id: 'reason',  label: 'Reason',  sub: 'nutritional need', duration: 1600 },
  { id: 'search',  label: 'Search',  sub: 'scan platforms',   duration: 2200 },
  { id: 'select',  label: 'Select',  sub: 'rank candidates',  duration: 1500 },
  { id: 'execute', label: 'Execute', sub: 'place order',      duration: 1100 },
  { id: 'learn',   label: 'Learn',   sub: 'log + refine',     duration: 1300 },
];

const LOOP_NARRATION = {
  sense: [
    'Reading calendar · location · weather',
    'Pulled today\'s macros so far: {kcalSoFar} kcal',
    'Last meal logged at {lastMeal}',
  ],
  reason: [
    'Need ~{kcalNeed} kcal · {pNeed}g protein remaining',
    'Window opens in ~25 min',
    'Comfort factor: dry weather, baseline mood',
  ],
  search: [
    'Scanning GrabFood · Foodpanda · Deliveroo',
    'Found 47 candidates within 15 min ETA',
    'Filtering for {constraint}',
  ],
  select: [
    'Scoring on nutrition × price × ETA',
    'Top candidate: {topPick} (94%)',
    'Holding for 30s — final check',
  ],
  execute: [
    'Authorising payment · $14.20',
    'Placing order on Foodpanda',
    'Order confirmed · ETA 12:42',
  ],
  learn: [
    'Logged macros to nutrition history',
    'Updated preference: +1 for poke bowls',
    'Idle until 17:55 dinner decision',
  ],
};

const CONNECTORS = [
  { id: 'location',  group: 'context', name: 'Location',     sub: 'Home · Work · Transit', icon: 'pin' },
  { id: 'calendar',  group: 'context', name: 'Calendar',     sub: '14 meetings · 3 free windows', icon: 'cal' },
  { id: 'weather',   group: 'context', name: 'Time & weather', sub: '27°C · clear · lunch window', icon: 'sun' },
  { id: 'wearables', group: 'health',  name: 'Wearables',    sub: 'Garmin · 612 kcal burned', icon: 'pulse' },
  { id: 'dietary',   group: 'health',  name: 'Dietary profile', sub: 'No shellfish · halal · low sodium', icon: 'leaf' },
  { id: 'medical',   group: 'health',  name: 'Medical profile', sub: '2 conditions · 3 medications', icon: 'rx' },
  { id: 'cgm',       group: 'health',  name: 'CGM',          sub: 'Glucose 6.4 mmol/L · stable', icon: 'wave' },
  { id: 'past',      group: 'history', name: 'Past orders',  sub: '142 orders · 38 favourites', icon: 'archive' },
  { id: 'budget',    group: 'history', name: 'Budget',       sub: '$50/day · $36 spent today', icon: 'wallet' },
];

const PLATFORMS = [
  { id: 'grab', name: 'GrabFood', status: 'browser-agent', latency: 1.2 },
  { id: 'foodpanda', name: 'Foodpanda', status: 'browser-agent', latency: 0.9 },
  { id: 'deliveroo', name: 'Deliveroo', status: 'unofficial API', latency: 0.4 },
];

Object.assign(window, {
  PERSONAS, PERSONA_LIST, AUTONOMY_LEVELS, LOOP_STEPS, LOOP_NARRATION,
  CONNECTORS, PLATFORMS,
});
