/* NOURI — Food image (top-down SVG composition, palette inferred from dish)
   and Platform card (mock delivery-app info: rating, ETA, distance). */

const { useMemo: _useMemo } = React;

/* Tiny deterministic PRNG so the same dish always looks identical. */
function _hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h;
}
function _rng(seed) {
  let x = seed || 1;
  return () => {
    x = (x * 1664525 + 1013904223) >>> 0;
    return (x >>> 8) / 0xffffff;
  };
}

/* Map a dish name → composition + colour palette.
   Composition determines geometry; palette colours individual elements. */
function dishArt(item = '') {
  const n = item.toLowerCase();
  const has = (...k) => k.some(x => n.includes(x));

  // bowl-shaped dishes
  if (has('congee', 'porridge')) return {
    type: 'bowl', table: '#D8C7A1', bowl: '#F7F0DD', rim: '#E5D8B3',
    base: '#F8EAB7', proteins: ['#FFDC6E'], greens: ['#7DA85A'], dots: 0,
  };
  if (has('yogurt', 'oat')) return {
    type: 'bowl', table: '#E7DABE', bowl: '#FBF6EB', rim: '#E8DEC4',
    base: '#FAF5E8', proteins: ['#D7B274', '#B6863F'], greens: [],
    dots: 14, dotColor: '#3A2E1E',
  };
  if (has('pho', 'broth')) return {
    type: 'bowl', table: '#C5A476', bowl: '#3C2A1B', rim: '#1F1610',
    base: '#A66734', proteins: ['#E9C078', '#C68A4E'], greens: ['#5B8A40', '#9BBB6B'],
    dots: 8, dotColor: '#2A1B0F',
  };
  if (has('don', 'chirashi', 'rice bowl', 'donburi')) return {
    type: 'bowl', table: '#3D2B1F', bowl: '#1F1610', rim: '#0E0908',
    base: '#F4E8C9', proteins: ['#E04B4B', '#D87A4E', '#FFB46B'], greens: ['#5B8C49'],
    dots: 18, dotColor: '#1A1208',
  };
  if (has('soup')) return {
    type: 'bowl', table: '#C9B289', bowl: '#F0E4C8', rim: '#D9C698',
    base: '#E8C779', proteins: ['#D87A4E'], greens: ['#7DA85A'], dots: 0,
  };

  // plate-shaped
  if (has('cod', 'salmon', 'fish')) return {
    type: 'plate', table: '#D8C5A0', plate: '#FBF6EC', rim: '#EBDCB6',
    base: '#F4ECD2', proteins: ['#F1E8D4', '#E8DBBE'], greens: ['#6FA56A'],
    accents: ['#E8A858'], dots: 0,
  };
  if (has('cobb', 'salad')) return {
    type: 'plate', table: '#D8C5A0', plate: '#FBF6EC', rim: '#EBDCB6',
    base: '#8FB36A', proteins: ['#D9A66A', '#F5C04D'], greens: ['#4B7A36', '#5C9143'],
    accents: ['#D63E3E'], dots: 10, dotColor: '#2D1B0F',
  };
  if (has('chicken') && (has('grilled', 'steamed') || has('rice'))) return {
    type: 'plate', table: '#D2BC8A', plate: '#FBF6EC', rim: '#E3D2A8',
    base: '#F0E4BE', proteins: ['#C99359', '#E0AC6D'], greens: ['#6A9943'],
    accents: ['#D9663D'], dots: 0,
  };
  if (has('beef', 'wagyu', 'steak')) return {
    type: 'plate', table: '#2C1F15', plate: '#F4ECD8', rim: '#D5BE8C',
    base: '#F0E4BE', proteins: ['#8B3A2A', '#A04B36', '#5C2E22'], greens: ['#5C9143'],
    accents: ['#C68A4E'], dots: 0,
  };

  // wrap / sandwich style
  if (has('wrap', 'burrito', 'sandwich', 'toast', 'burger')) return {
    type: 'wrap', table: '#D8C5A0', bread: '#D8A865', crust: '#9C6E32',
    proteins: ['#C99359', '#F5C04D'], greens: ['#5C9143'], accents: ['#D63E3E'],
  };

  // pad thai / noodles
  if (has('pad', 'noodle', 'krapow')) return {
    type: 'plate', table: '#D2BC8A', plate: '#FBF6EC', rim: '#E3D2A8',
    base: '#E0A24E', proteins: ['#C68A4E', '#FFD56A'], greens: ['#7DA85A'],
    accents: ['#D63E3E'], dots: 12, dotColor: '#5C3618',
  };

  // poke
  if (has('poke')) return {
    type: 'bowl', table: '#D8C5A0', bowl: '#3C2A1B', rim: '#1F1610',
    base: '#F4E8C9', proteins: ['#E04B4B', '#9C4B3A'], greens: ['#5B8C49', '#A4C490'],
    accents: ['#5B3A1F'], dots: 14, dotColor: '#1A1208',
  };

  // shake / drink
  if (has('shake', 'brew', 'coffee', 'smoothie')) return {
    type: 'glass', table: '#D2BC8A', liquid: '#C8A26D', foam: '#F4ECD8', cup: '#FFFFFF',
  };

  // mash / soft
  if (has('mash', 'sweet potato')) return {
    type: 'plate', table: '#D8C5A0', plate: '#FBF6EC', rim: '#EBDCB6',
    base: '#E8A858', proteins: ['#C99359'], greens: ['#6FA56A'], dots: 0,
  };

  // banana + nut butter / fruit
  if (has('banana', 'peanut butter')) return {
    type: 'plate', table: '#D8C5A0', plate: '#FBF6EC', rim: '#EBDCB6',
    base: '#F0E4BE', proteins: ['#E8D070', '#C99359'], greens: [], accents: [], dots: 0,
  };

  // pizza
  if (has('pizza')) return {
    type: 'plate', table: '#D8C5A0', plate: '#F0DC8E', rim: '#A0792E',
    base: '#E04B4B', proteins: ['#F5EBD2'], greens: ['#5B8C49'], accents: [], dots: 6, dotColor: '#A04030',
  };

  // generic fallback
  return {
    type: 'plate', table: '#D8C5A0', plate: '#FBF6EC', rim: '#EBDCB6',
    base: '#F0E4BE', proteins: ['#D9A66A'], greens: ['#7DA85A'], dots: 0,
  };
}

/* Pick a delivery platform from restaurant name (deterministic). */
function dishPlatform(meal) {
  const seed = _hash((meal?.from || '') + (meal?.item || ''));
  const list = [
    { id: 'foodpanda', name: 'Foodpanda', accent: '#D70F64' },
    { id: 'grab',      name: 'GrabFood',  accent: '#00B14F' },
    { id: 'deliveroo', name: 'Deliveroo', accent: '#00CCBC' },
  ];
  // fixed associations for known restaurants for narrative continuity
  const known = {
    'Tiong Bahru Bak Kut Teh': 'foodpanda',
    'Soup Spoon': 'grab',
    'SaladStop!': 'grab',
    'Joe & Dough': 'foodpanda',
    'Yoshinoya': 'grab',
    'Toast Box': 'foodpanda',
    'Sushi Tei': 'deliveroo',
    'Crystal Jade': 'grab',
    'The Daily Cut': 'foodpanda',
    'GRAIN': 'deliveroo',
  };
  const matchedId = known[meal?.from] || list[seed % list.length].id;
  return list.find(p => p.id === matchedId) || list[0];
}

function dishStats(meal) {
  const r = _rng(_hash((meal?.from || '') + (meal?.item || '')));
  const rating = (4.2 + r() * 0.8).toFixed(1);
  const reviews = Math.round(200 + r() * 4800);
  const distance = (0.4 + r() * 2.4).toFixed(1);
  const prepMin = Math.round(8 + r() * 14);
  const deliverMin = Math.round(12 + r() * 18);
  const orderId = ('FD' + Math.floor(10000 + r() * 89999)).toUpperCase();
  return { rating, reviews, distance, prepMin, deliverMin, total: prepMin + deliverMin, orderId };
}

/* ────────────────────────── FoodImage ────────────────────────── */
function FoodImage({ meal, height = 200, overlay }) {
  const art = _useMemo(() => dishArt(meal?.item), [meal?.item]);
  const seed = _useMemo(() => _hash((meal?.item || '') + (meal?.from || '')), [meal]);
  const rng = _useMemo(() => _rng(seed), [seed]);

  // pre-compute blob positions (deterministic)
  const W = 360, H = 200;
  const cx = W / 2, cy = H / 2 + 4;

  const blobs = _useMemo(() => {
    if (art.type !== 'plate' && art.type !== 'bowl') return [];
    const r = _rng(seed);
    const items = [
      ...(art.proteins || []).map(c => ({ color: c, kind: 'protein' })),
      ...(art.greens || []).map(c => ({ color: c, kind: 'green' })),
      ...(art.accents || []).map(c => ({ color: c, kind: 'accent' })),
    ];
    return items.flatMap((it, i) => {
      const count = it.kind === 'protein' ? 3 + Math.floor(r() * 2)
                  : it.kind === 'green' ? 4 + Math.floor(r() * 3)
                  : 2 + Math.floor(r() * 2);
      return Array.from({ length: count }).map((_, j) => {
        const angle = r() * Math.PI * 2;
        const dist = r() * 38;
        const rad = it.kind === 'protein' ? 12 + r() * 8
                  : it.kind === 'green'   ? 5 + r() * 4
                  :                          7 + r() * 3;
        return {
          color: it.color,
          cx: cx + Math.cos(angle) * dist,
          cy: cy + Math.sin(angle) * dist * 0.85,
          rx: rad * (0.85 + r() * 0.3),
          ry: rad * (0.85 + r() * 0.3),
          rot: r() * 360,
        };
      });
    });
  }, [art, seed]);

  const dots = _useMemo(() => {
    if (!art.dots) return [];
    const r = _rng(seed + 7);
    return Array.from({ length: art.dots }).map(() => {
      const angle = r() * Math.PI * 2;
      const dist = r() * 50;
      return { cx: cx + Math.cos(angle) * dist, cy: cy + Math.sin(angle) * dist * 0.85, color: art.dotColor };
    });
  }, [art, seed]);

  return (
    <div style={{
      width: '100%', height, borderRadius: 18,
      background: art.table,
      position: 'relative', overflow: 'hidden',
      boxShadow: 'inset 0 -40px 80px rgba(0,0,0,0.08)',
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
           style={{ display: 'block' }}>
        <defs>
          <radialGradient id={`plate-${seed}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5"/>
            <stop offset="60%" stopColor="#fff" stopOpacity="0"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0.1"/>
          </radialGradient>
          <radialGradient id={`table-${seed}`}>
            <stop offset="0%" stopColor="#fff" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="#000" stopOpacity="0.0"/>
          </radialGradient>
          <clipPath id={`food-${seed}`}>
            <ellipse cx={cx} cy={cy} rx="72" ry="58"/>
          </clipPath>
        </defs>

        {/* Table vignette */}
        <rect x="0" y="0" width={W} height={H} fill={`url(#table-${seed})`}/>

        {/* Soft scattered crumbs/garnish around plate for realism */}
        {Array.from({ length: 8 }).map((_, i) => {
          const r = _rng(seed + i + 100);
          const a = r() * Math.PI * 2;
          const d = 100 + r() * 60;
          const x = cx + Math.cos(a) * d;
          const y = cy + Math.sin(a) * d * 0.6;
          if (x < 5 || x > W - 5 || y < 5 || y > H - 5) return null;
          return <circle key={i} cx={x} cy={y} r={1 + r() * 1.5} fill={art.greens?.[0] || '#7a8'} opacity="0.5"/>;
        })}

        {/* Plate / bowl rim */}
        {(art.type === 'plate' || art.type === 'bowl') && (
          <>
            <ellipse cx={cx} cy={cy + 4} rx="92" ry="68" fill="rgba(0,0,0,0.15)" filter="blur(2px)"/>
            <ellipse cx={cx} cy={cy} rx="86" ry="64" fill={art.rim}/>
            <ellipse cx={cx} cy={cy} rx="78" ry="58" fill={art.bowl || art.plate}/>
            <ellipse cx={cx} cy={cy} rx="78" ry="58" fill={`url(#plate-${seed})`}/>
          </>
        )}

        {/* Food base (clipped to inner plate) */}
        <g clipPath={`url(#food-${seed})`}>
          <ellipse cx={cx} cy={cy} rx="72" ry="56" fill={art.base}/>
          {/* organic blobs */}
          {blobs.map((b, i) => (
            <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
                     fill={b.color} transform={`rotate(${b.rot} ${b.cx} ${b.cy})`}
                     opacity="0.95"/>
          ))}
          {/* highlight on each blob (subtle) */}
          {blobs.map((b, i) => (
            <ellipse key={`hl-${i}`} cx={b.cx - b.rx * 0.3} cy={b.cy - b.ry * 0.35}
                     rx={b.rx * 0.45} ry={b.ry * 0.35}
                     fill="#fff" opacity="0.12"/>
          ))}
          {/* dots: sesame / herbs / spice */}
          {dots.map((d, i) => (
            <circle key={`d-${i}`} cx={d.cx} cy={d.cy} r="1.4" fill={d.color} opacity="0.9"/>
          ))}
        </g>

        {/* Wrap composition */}
        {art.type === 'wrap' && (() => {
          const wx = cx - 80, wy = cy - 28, ww = 160, wh = 56;
          return (
            <g>
              <rect x={wx} y={wy + 5} width={ww} height={wh} rx={28} fill="rgba(0,0,0,0.15)" filter="blur(2px)"/>
              <rect x={wx} y={wy} width={ww} height={wh} rx={28} fill={art.bread}/>
              <rect x={wx + 6} y={wy + 6} width={ww - 12} height={wh - 12} rx={22} fill={art.crust} opacity="0.4"/>
              {/* fillings poking out */}
              <ellipse cx={cx - 50} cy={cy} rx="14" ry="6" fill={art.greens[0]}/>
              <ellipse cx={cx - 10} cy={cy + 1} rx="14" ry="6" fill={art.proteins[0]}/>
              <ellipse cx={cx + 30} cy={cy} rx="14" ry="6" fill={art.accents?.[0] || art.proteins[1] || art.proteins[0]}/>
            </g>
          );
        })()}

        {/* Glass composition */}
        {art.type === 'glass' && (() => {
          const gx = cx - 30, gy = cy - 55;
          return (
            <g>
              <rect x={gx + 4} y={gy + 5} width="60" height="110" rx="14" fill="rgba(0,0,0,0.15)" filter="blur(2px)"/>
              <rect x={gx} y={gy} width="60" height="110" rx="12" fill={art.cup} stroke="#cbb98c" strokeWidth="1"/>
              <rect x={gx + 4} y={gy + 30} width="52" height="76" rx="8" fill={art.liquid}/>
              <ellipse cx={cx} cy={gy + 30} rx="26" ry="6" fill={art.foam}/>
              {/* highlight stripe */}
              <rect x={gx + 8} y={gy + 8} width="4" height="90" rx="2" fill="#fff" opacity="0.4"/>
            </g>
          );
        })()}
      </svg>

      {overlay}
    </div>
  );
}

/* ────────────────────────── Platform card ────────────────────────── */
function PlatformCard({ meal }) {
  const platform = dishPlatform(meal);
  const stats = dishStats(meal);
  const initial = (meal.from || '?').replace(/[^A-Za-z]/g, '').slice(0, 1).toUpperCase();
  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 16,
      border: '0.5px solid var(--hairline)', overflow: 'hidden',
    }}>
      {/* Platform header strip */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 14px',
        background: 'var(--surface-2)',
        borderBottom: '0.5px solid var(--hairline)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 16, height: 16, borderRadius: 4,
            background: platform.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 10, fontWeight: 700,
          }}>{platform.name[0]}</div>
          <span className="mono" style={{
            fontSize: 10.5, letterSpacing: 0.8,
            color: 'var(--ink-2)', textTransform: 'uppercase', fontWeight: 600,
          }}>{platform.name}</span>
        </div>
        <span className="mono" style={{
          fontSize: 10, color: 'var(--muted)', letterSpacing: 0.6,
        }}>{stats.orderId}</span>
      </div>

      {/* Restaurant row */}
      <div style={{
        display: 'flex', gap: 12, alignItems: 'center',
        padding: '12px 14px',
      }}>
        <div style={{
          flex: '0 0 38px', height: 38, borderRadius: 10,
          background: `linear-gradient(135deg, ${platform.accent}33, ${platform.accent}11)`,
          color: platform.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 17, fontWeight: 700, fontFamily: 'Geist, sans-serif',
        }}>{initial}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
            {meal.from}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 11, color: 'var(--muted)', marginTop: 3,
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <span style={{ color: 'var(--ink-2)', fontWeight: 600 }}>★ {stats.rating}</span>
              <span>({stats.reviews.toLocaleString()})</span>
            </span>
            <span>·</span>
            <span className="tnum">{stats.distance} km</span>
          </div>
        </div>
      </div>

      {/* ETA grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '0.5px solid var(--hairline-2)',
      }}>
        {[
          { l: 'prep', v: `${stats.prepMin}m` },
          { l: 'deliver', v: `${stats.deliverMin}m` },
          { l: 'total', v: `${stats.total}m` },
        ].map((s, i) => (
          <div key={s.l} style={{
            padding: '10px 12px', textAlign: 'center',
            borderLeft: i > 0 ? '0.5px solid var(--hairline-2)' : 'none',
          }}>
            <div className="serif tnum" style={{ fontSize: 18, color: 'var(--ink)', lineHeight: 1 }}>{s.v}</div>
            <div className="mono" style={{
              fontSize: 9, color: 'var(--muted)',
              textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 2,
            }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Agent footnote */}
      <div style={{
        padding: '9px 14px',
        borderTop: '0.5px solid var(--hairline-2)',
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--surface-2)',
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--sage)' }}/>
        <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>
          Placed by NOURI · via browser agent
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { FoodImage, PlatformCard, dishArt, dishPlatform, dishStats });
