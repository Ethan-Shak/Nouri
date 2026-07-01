/* NOURI — UI primitives, hooks, and the four screens. */

const { useState, useEffect, useRef, useMemo, Fragment } = React;

/* ───────────────────────── Icons ───────────────────────── */
const Icon = ({ k, size = 18, stroke = 'currentColor' }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
              stroke, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (k) {
    case 'pin':     return (<svg {...p}><path d="M12 21s-7-6.5-7-12a7 7 0 1114 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>);
    case 'cal':     return (<svg {...p}><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.5h16M9 3v4M15 3v4"/></svg>);
    case 'sun':     return (<svg {...p}><circle cx="12" cy="12" r="3.5"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5"/></svg>);
    case 'pulse':   return (<svg {...p}><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>);
    case 'leaf':    return (<svg {...p}><path d="M5 19c0-7 5-12 14-13-1 9-6 14-13 14a4 4 0 01-1-1zM5 19l8-8"/></svg>);
    case 'rx':      return (<svg {...p}><path d="M7 4h5a3 3 0 010 6H7zM7 10v10M7 4v6M11 12l8 8M19 12l-8 8"/></svg>);
    case 'wave':    return (<svg {...p}><path d="M3 12c2 0 2-5 4-5s2 10 4 10 2-10 4-10 2 5 4 5"/></svg>);
    case 'archive': return (<svg {...p}><rect x="3" y="5" width="18" height="4" rx="1"/><path d="M5 9v9a2 2 0 002 2h10a2 2 0 002-2V9M10 13h4"/></svg>);
    case 'wallet':  return (<svg {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h2M3 10h18"/></svg>);
    case 'chev-r':  return (<svg {...p}><path d="M9 6l6 6-6 6"/></svg>);
    case 'chev-d':  return (<svg {...p}><path d="M6 9l6 6 6-6"/></svg>);
    case 'check':   return (<svg {...p}><path d="M5 12l4 4 10-10"/></svg>);
    case 'x':       return (<svg {...p}><path d="M6 6l12 12M18 6l-6 12"/></svg>);
    case 'chev-l':  return (<svg {...p}><path d="M15 18l-6-6 6-6"/></svg>);
    case 'home':    return (<svg {...p}><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z"/></svg>);
    case 'brain':   return (<svg {...p}><path d="M12 5a2.8 2.8 0 00-2.8 2.5 2.3 2.3 0 00-1.9 2.3c0 .7.3 1.3.7 1.7-.7.5-1.2 1.3-1.2 2.2a2.3 2.3 0 001.9 2.3 2.8 2.8 0 002.8 2.8 2 2 0 002-1.3"/><path d="M12 5a2.8 2.8 0 012.8 2.5 2.3 2.3 0 011.9 2.3c0 .7-.3 1.3-.7 1.7.7.5 1.2 1.3 1.2 2.2a2.3 2.3 0 01-1.9 2.3 2.8 2.8 0 01-2.8 2.8 2 2 0 01-2-1.3"/></svg>);
    case 'plate':   return (<svg {...p}><path d="M5 3v6a2 2 0 104 0V3"/><path d="M7 9v8"/><path d="M19 3c-2 0-3 3-3 6s1 3 3 3V3z"/><path d="M17.5 12v5"/><ellipse cx="12" cy="20" rx="9" ry="1.4"/></svg>);
    case 'gear':    return (<svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>);
    case 'flame':   return (<svg {...p}><path d="M12 21c-4 0-6-3-6-6 0-3 2-5 3-7 0 2 2 3 3 3 0-3-1-4-1-6 0-2 2-3 3-3 0 4 5 6 5 11 0 5-3 8-7 8z"/></svg>);
    case 'dot':     return (<svg {...p}><circle cx="12" cy="12" r="4" fill={stroke} stroke="none"/></svg>);
    /* Allergens */
    case 'wheat':   return (<svg {...p}><path d="M12 22V8"/><path d="M12 8c-3 0-5 2-5 5M12 8c3 0 5 2 5 5M12 13c-3 0-5 2-5 5M12 13c3 0 5 2 5 5M12 18c-3 0-5 2-5 5M12 18c3 0 5 2 5 5"/><path d="M12 8c0-3-1-5-3-6M12 8c0-3 1-5 3-6"/></svg>);
    case 'milk':    return (<svg {...p}><path d="M9 2h6v3l2 3v12a2 2 0 01-2 2H9a2 2 0 01-2-2V8l2-3z"/><path d="M7 9h10M11 14h2"/></svg>);
    case 'peanut':  return (<svg {...p}><path d="M14 3c-2 0-3 2-3 4s2 2 2 5-2 3-2 5 1 4 3 4 4-2 4-5-2-3-2-5 2-2 2-4-2-4-4-4z"/><path d="M6 4c-1.5 0-2.5 1.5-2.5 3.5S5 9 5 11.5 3.5 13 3.5 15.5 4.5 19 6 19" opacity=".5"/></svg>);
    case 'fish':    return (<svg {...p}><path d="M3 12s3-5 9-5 9 5 9 5-3 5-9 5-9-5-9-5z"/><path d="M21 12c0-2 1-3 0-5-2 1-3 2-3 5s1 4 3 5c1-2 0-3 0-5z"/><circle cx="10" cy="11" r=".8" fill={stroke} stroke="none"/></svg>);
    case 'egg':     return (<svg {...p}><path d="M12 3c-4 0-7 6-7 11s3 7 7 7 7-2 7-7-3-11-7-11z"/></svg>);
    case 'soy':     return (<svg {...p}><ellipse cx="9" cy="9" rx="3" ry="4" transform="rotate(-30 9 9)"/><ellipse cx="15" cy="15" rx="3" ry="4" transform="rotate(-30 15 15)"/><path d="M7 5c0 1 1 2 2 2M17 19c0-1-1-2-2-2"/></svg>);
    case 'sesame':  return (<svg {...p}><ellipse cx="8" cy="9" rx="2" ry="3" transform="rotate(-20 8 9)"/><ellipse cx="15" cy="11" rx="2" ry="3" transform="rotate(15 15 11)"/><ellipse cx="10" cy="16" rx="2" ry="3" transform="rotate(40 10 16)"/></svg>);
    case 'nut':     return (<svg {...p}><path d="M12 3c-4 0-7 3-7 7s3 11 7 11 7-7 7-11-3-7-7-7z"/><path d="M12 3v18M8 8c1.5 1 2.5 2.5 3 5M16 8c-1.5 1-2.5 2.5-3 5"/></svg>);
    case 'shell':   return (<svg {...p}><path d="M12 4c-5 0-8 4-8 9 0 4 3 7 8 7s8-3 8-7c0-5-3-9-8-9z"/><path d="M12 4v16M8 6l-2 12M16 6l2 12M5 10l-1 8M19 10l1 8"/></svg>);
    case 'spice':   return (<svg {...p}><path d="M12 21c-4 0-6-3-6-6 0-3 2-5 3-7 0 2 2 3 3 3 0-3-1-4-1-6 0-2 2-3 3-3 0 4 5 6 5 11 0 5-3 8-7 8z"/></svg>);
    case 'sugar':   return (<svg {...p}><rect x="5" y="9" width="14" height="9" rx="1"/><path d="M8 9V6M12 9V6M16 9V6"/></svg>);
    default:        return null;
  }
};

/* ─────────────────────── Brand mark ─────────────────────── */
// A minimal mark: a filled "decision" disk cradled in an open bowl arc.
// Reads as: thought/meal above, capacity/nourishment below. Aligned to a
// 24-unit grid; scales cleanly with the wordmark.
const BrandMark = ({ size = 22, color = 'var(--ink)', mono = false }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.42 }}>
    <svg
      width={size * 1.15}
      height={size * 1.15}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: 'block', flex: '0 0 auto' }}
      aria-label="NOURI"
    >
      {/* upper disk — the agent's decision / a meal as an idea */}
      <circle cx="12" cy="7" r="2.6" fill={color} />
      {/* bowl arc — open, asymmetric tail suggests continuous learning */}
      <path
        d="M3.4 13 C 3.4 21.2, 20.6 21.2, 20.6 13"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
    {!mono && (
      <span
        className="serif"
        style={{
          fontSize: size * 1.45,
          letterSpacing: size * 0.05,
          fontStyle: 'italic',
          color,
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        NOURI
      </span>
    )}
  </span>
);

/* ─────────────────────── Pill ─────────────────────── */
const Pill = ({ children, tone = 'neutral', size = 'sm', style = {} }) => {
  const palette = {
    neutral: { bg: 'var(--surface-2)', fg: 'var(--ink-2)', bd: 'var(--hairline)' },
    sage:    { bg: 'var(--sage-soft)', fg: 'var(--sage)', bd: 'transparent' },
    clay:    { bg: 'var(--clay-soft)', fg: 'var(--clay)', bd: 'transparent' },
    ink:     { bg: 'var(--ink)', fg: 'var(--bg)', bd: 'transparent' },
    ghost:   { bg: 'transparent', fg: 'var(--muted)', bd: 'var(--hairline)' },
  }[tone];
  const sz = size === 'lg' ? { px: 12, py: 6, fs: 13 } : { px: 8, py: 3, fs: 11.5 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: `${sz.py}px ${sz.px}px`, borderRadius: 100,
      background: palette.bg, color: palette.fg,
      border: `0.5px solid ${palette.bd}`,
      fontSize: sz.fs, fontWeight: 500, letterSpacing: 0.1,
      lineHeight: 1, ...style,
    }}>{children}</span>
  );
};

/* ─────────────────────── Live loop hook ─────────────────────── */
function useLoop(active) {
  const [stepIdx, setStepIdx] = useState(0);
  const [phrase, setPhrase] = useState(0);
  useEffect(() => {
    if (!active) return;
    const step = LOOP_STEPS[stepIdx];
    const t = setTimeout(() => {
      setStepIdx((stepIdx + 1) % LOOP_STEPS.length);
      setPhrase(p => (p + 1) % 3);
    }, step.duration);
    return () => clearTimeout(t);
  }, [stepIdx, active]);
  return { stepIdx, step: LOOP_STEPS[stepIdx], phrase };
}

/* ─────────────────────── Loop indicator ─────────────────────── */
const LoopRibbon = ({ stepIdx, compact = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
    {LOOP_STEPS.map((s, i) => {
      const active = i === stepIdx;
      const done = i < stepIdx;
      return (
        <Fragment key={s.id}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            flex: 1, minWidth: 0,
          }}>
            <div style={{
              width: active ? 9 : 6, height: active ? 9 : 6, borderRadius: '50%',
              background: active ? 'var(--sage)' : done ? 'var(--ink)' : 'var(--hairline)',
              animation: active ? 'pulse-dot 1.4s ease-in-out infinite' : 'none',
              transition: 'all 0.3s',
            }}/>
            {!compact && (
              <span className="mono" style={{
                fontSize: 9.5, color: active ? 'var(--ink)' : 'var(--muted)',
                letterSpacing: 0.3, textTransform: 'uppercase',
                fontWeight: active ? 600 : 400,
              }}>{s.label}</span>
            )}
          </div>
          {i < LOOP_STEPS.length - 1 && (
            <div style={{
              flex: '0 0 8px', height: 1,
              background: i < stepIdx ? 'var(--ink)' : 'var(--hairline)',
              marginBottom: compact ? 0 : 12,
            }}/>
          )}
        </Fragment>
      );
    })}
  </div>
);

/* ───────────────────── NOW panel (the hero) ───────────────────── */
const NowPanel = ({ persona, autonomy, hour, onTap, onApprove }) => {
  // determine current activity from hour + meals
  const activity = useMemo(() => {
    // find next meal awaiting/enroute/scheduled
    const next = persona.meals.find(m => m.status === 'enroute' || m.status === 'awaiting');
    const scheduled = persona.meals.find(m => m.status === 'scheduled');
    if (next?.status === 'enroute') return { mode: 'tracking', meal: next };
    if (next?.status === 'awaiting') return { mode: 'awaiting', meal: next };
    if (scheduled) return { mode: 'thinking', meal: scheduled };
    return { mode: 'idle' };
  }, [persona, hour]);

  const { stepIdx, step, phrase } = useLoop(activity.mode === 'thinking');

  const narration = useMemo(() => {
    if (activity.mode !== 'thinking') return null;
    const tmpl = LOOP_NARRATION[step.id][phrase];
    return tmpl
      .replace('{kcalSoFar}', '950')
      .replace('{lastMeal}', '12:42')
      .replace('{kcalNeed}', '850')
      .replace('{pNeed}', '42')
      .replace('{constraint}', persona.constraint.toLowerCase())
      .replace('{topPick}', activity.meal?.item || 'a balanced plate');
  }, [step, phrase, activity, persona]);

  // ── tracking (en route) ──
  if (activity.mode === 'tracking') {
    const m = activity.meal;
    return (
      <div onClick={() => onTap(m)} style={{
        background: 'var(--ink)', color: 'var(--bg)', borderRadius: 22,
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
      }}>
        {/* food image as hero */}
        <div style={{ position: 'relative' }}>
          <FoodImage meal={m} height={150}/>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent 30%, rgba(20,19,15,0.85) 100%)',
          }}/>
          <div style={{
            position: 'absolute', top: 12, left: 14, right: 14,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span className="mono" style={{
              fontSize: 10, letterSpacing: 1.2, color: '#fff', textTransform: 'uppercase',
              padding: '5px 9px', borderRadius: 100,
              background: 'rgba(20,19,15,0.55)', backdropFilter: 'blur(8px)',
            }}>On the way · ETA {m.eta}</span>
            <span className="mono" style={{
              fontSize: 10, color: 'rgba(255,255,255,0.85)',
              padding: '5px 9px', borderRadius: 100,
              background: 'rgba(20,19,15,0.55)', backdropFilter: 'blur(8px)',
            }}>{AUTONOMY_LEVELS[autonomy].name.toUpperCase()}</span>
          </div>
        </div>
        <div style={{ padding: '0 18px 16px', marginTop: -34, position: 'relative' }}>
          <div className="serif" style={{ fontSize: 24, lineHeight: 1.15, letterSpacing: 0.1, color: '#fff' }}>
            {m.item}
          </div>
          <div style={{ fontSize: 12.5, opacity: 0.7, marginTop: 4, color: '#fff' }}>
            {m.from} · ${m.price.toFixed(2)} · {m.kcal} kcal
          </div>
          {/* progress bar */}
          <div style={{ marginTop: 14, height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 100, overflow: 'hidden' }}>
            <div style={{
              width: '62%', height: '100%',
              background: 'linear-gradient(90deg, transparent, var(--sage), var(--sage))',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2.2s linear infinite',
            }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, opacity: 0.55, color: '#fff' }}>
            <span className="mono">PREPARING</span>
            <span className="mono">PICKED UP</span>
            <span className="mono">DELIVERED</span>
          </div>
        </div>
      </div>
    );
  }

  // ── thinking (live loop running) ──
  if (activity.mode === 'thinking') {
    return (
      <div style={{
        background: 'var(--surface)', borderRadius: 22, padding: '18px 18px 14px',
        border: '0.5px solid var(--hairline)', boxShadow: 'var(--shadow)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)',
              animation: 'pulse-dot 1.4s ease-in-out infinite',
            }}/>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.2, color: 'var(--ink-2)', textTransform: 'uppercase' }}>
              Thinking · {step.label}
            </span>
          </div>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
            decision in 14m
          </span>
        </div>
        <div style={{ marginTop: 14, marginBottom: 12 }}>
          <LoopRibbon stepIdx={stepIdx}/>
        </div>
        <div style={{
          minHeight: 38, padding: '10px 12px',
          background: 'var(--surface-2)', borderRadius: 12,
          fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4,
          animation: 'fade-in 0.4s ease',
        }} key={`${step.id}-${phrase}`}>
          {narration}
        </div>
      </div>
    );
  }

  // ── awaiting approval ──
  if (activity.mode === 'awaiting') {
    const m = activity.meal;
    return (
      <div style={{
        background: 'var(--surface)', borderRadius: 22,
        border: '0.5px solid var(--clay)', boxShadow: 'var(--shadow)',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', gap: 12, padding: '14px 16px' }}>
          <div style={{ flex: '0 0 84px', height: 84, borderRadius: 12, overflow: 'hidden' }}>
            <FoodImage meal={m} height={84}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <Pill tone="clay">Waiting on you</Pill>
              <span className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
                {AUTONOMY_LEVELS[autonomy].name}
              </span>
            </div>
            <div className="serif" style={{ fontSize: 18, lineHeight: 1.2, marginTop: 6, color: 'var(--ink)' }}>
              {m.item}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
              {m.from} · ${m.price.toFixed(2)} · {m.kcal} kcal
            </div>
          </div>
        </div>
        <div style={{ padding: '0 16px 14px' }}>
          <div style={{ padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 12, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.4 }}>
            {m.why}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button style={btnPrimary} onClick={(e) => { e.stopPropagation(); onApprove(m); }}>Approve & order</button>
            <button style={btnGhost} onClick={(e) => { e.stopPropagation(); onTap(m); }}>Review</button>
          </div>
        </div>
      </div>
    );
  }

  // ── idle ──
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 22, padding: '20px', border: '0.5px solid var(--hairline)' }}>
      <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.2, color: 'var(--muted)', textTransform: 'uppercase' }}>
        Idle
      </span>
      <div className="serif" style={{ fontSize: 22, marginTop: 6 }}>
        Nothing to decide right now.
      </div>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
        Next agent activity: dinner check at 17:55.
      </div>
    </div>
  );
};

const btnPrimary = {
  flex: 1, padding: '12px', borderRadius: 12, border: 'none',
  background: 'var(--ink)', color: 'var(--bg)',
  fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer',
};
const btnGhost = {
  padding: '12px 16px', borderRadius: 12, border: '0.5px solid var(--hairline)',
  background: 'transparent', color: 'var(--ink)',
  fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer',
};

/* ───────────────────── Timeline row ───────────────────── */
const TimelineRow = ({ meal, onTap }) => {
  const tone = meal.status === 'delivered' ? 'sage'
    : meal.status === 'enroute' ? 'ink'
    : meal.status === 'awaiting' ? 'clay'
    : 'ghost';
  const tag = meal.status === 'delivered' ? 'Delivered'
    : meal.status === 'enroute' ? `ETA ${meal.eta}`
    : meal.status === 'awaiting' ? 'Awaiting you'
    : `Decides ${meal.decideAt}`;
  const hasImage = !!meal.item;
  return (
    <div onClick={() => meal.item && onTap(meal)} style={{
      display: 'flex', gap: 12, padding: '12px 4px', alignItems: 'center',
      borderBottom: '0.5px solid var(--hairline-2)',
      cursor: meal.item ? 'pointer' : 'default',
    }}>
      <div style={{ flex: '0 0 40px' }}>
        <div className="mono tnum" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{meal.time}</div>
        <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 2 }}>
          {meal.slot}
        </div>
      </div>
      {/* thumbnail */}
      <div style={{
        flex: '0 0 44px', width: 44, height: 44, borderRadius: 10,
        overflow: 'hidden',
        background: hasImage ? 'transparent' : 'var(--surface-2)',
        border: '0.5px solid var(--hairline)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {hasImage
          ? <FoodImage meal={meal} height={44}/>
          : <span style={{ color: 'var(--muted)', fontSize: 14 }}>?</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: meal.item ? 'var(--ink)' : 'var(--muted)', lineHeight: 1.3 }}>
          {meal.item || 'To be decided'}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2, display: 'flex', gap: 5, alignItems: 'center', flexWrap: 'wrap' }}>
          {meal.from && <span>{meal.from}</span>}
          {meal.price > 0 && <><span>·</span><span className="tnum">${meal.price.toFixed(2)}</span></>}
          {meal.kcal && <><span>·</span><span className="tnum">{meal.kcal} kcal</span></>}
        </div>
      </div>
      <div style={{ flex: '0 0 auto', alignSelf: 'center' }}>
        <Pill tone={tone}>{tag}</Pill>
      </div>
    </div>
  );
};

/* ───────────────────── Meal detail sheet (with order flow) ───────────────────── */
const MealSheet = ({ meal, persona, onClose, initialStage = 'review' }) => {
  if (!meal) return null;
  const [stage, setStage] = useState(initialStage);

  // Auto-advance placing → confirmed
  useEffect(() => {
    if (stage === 'placing') {
      const t = setTimeout(() => setStage('confirmed'), 2200);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
        animation: 'scrim 0.25s ease forwards', zIndex: 80,
      }}/>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        maxHeight: stage === 'review' ? '85%' : 'auto',
        overflow: 'auto',
        background: 'var(--bg)', borderRadius: '24px 24px 0 0',
        padding: stage === 'review' ? '12px 22px 100px' : '12px 22px 40px',
        animation: 'slide-up 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        zIndex: 81,
      }} className="scroll">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 14px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 100, background: 'var(--hairline)' }}/>
        </div>

        {stage === 'placing' && <OrderPlacing meal={meal}/>}
        {stage === 'confirmed' && <OrderConfirmed meal={meal} onClose={onClose}/>}
        {stage === 'review' && (
          <MealReview
            meal={meal}
            persona={persona}
            onClose={onClose}
            onApprove={() => setStage('placing')}
          />
        )}
      </div>
    </>
  );
};

const MealReview = ({ meal, persona, onClose, onApprove }) => {
  const macros = {
    p: Math.round(meal.kcal * 0.25 / 4),
    c: Math.round(meal.kcal * 0.55 / 4),
    f: Math.round(meal.kcal * 0.20 / 9),
  };
  return (
    <>
        {/* Hero food image */}
        <div style={{ position: 'relative', margin: '0 -22px 14px' }}>
          <FoodImage meal={meal} height={210} />
          <button onClick={onClose} style={{
            position: 'absolute', top: 12, right: 16,
            border: 'none', background: 'rgba(20,19,15,0.55)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50%',
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
          }}><Icon k="x" size={16} stroke="#fff"/></button>
          <div style={{
            position: 'absolute', top: 12, left: 16,
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 9px', borderRadius: 100,
            background: 'rgba(20,19,15,0.55)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
          }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: 0.9, textTransform: 'uppercase' }}>
              {meal.slot} · {meal.time}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="serif" style={{ fontSize: 26, lineHeight: 1.15, color: 'var(--ink)' }}>
              {meal.item}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{meal.from}</div>
          </div>
        </div>

        {/* Delivery platform info */}
        <div style={{ marginTop: 14 }}>
          <PlatformCard meal={meal}/>
        </div>

        {/* Macro mini-card */}
        <div style={{
          marginTop: 10, padding: 14, background: 'var(--surface)', borderRadius: 16,
          border: '0.5px solid var(--hairline)',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
        }}>
          {[
            { l: 'kcal', v: meal.kcal },
            { l: 'protein', v: macros.p + 'g' },
            { l: 'carbs', v: macros.c + 'g' },
            { l: 'fat', v: macros.f + 'g' },
          ].map(x => (
            <div key={x.l}>
              <div className="serif tnum" style={{ fontSize: 22, color: 'var(--ink)' }}>{x.v}</div>
              <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 1 }}>{x.l}</div>
            </div>
          ))}
        </div>

        {/* Why this — the reasoning chain */}
        <h3 style={sectionH}>Why this order</h3>
        <ReasoningChain meal={meal} persona={persona}/>

        {/* Considered & rejected */}
        <h3 style={sectionH}>Also considered</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { name: 'Grilled chicken salad', from: 'SaladStop!', price: 14.90, reason: 'Lower protein density · 28g vs 38g' },
            { name: 'Wagyu donburi', from: 'Sushi Tei', price: 19.50, reason: '$5.30 over lunch cap' },
            { name: 'Pad krapow chicken', from: 'Thai Tantric', price: 12.40, reason: 'Spice level conflicts with profile' },
          ].map((c, i) => (
            <div key={i} style={{
              padding: '10px 12px', background: 'var(--surface)', borderRadius: 12,
              border: '0.5px solid var(--hairline)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1 }}>{c.from} · ${c.price.toFixed(2)}</div>
              </div>
              <div style={{ flex: '0 0 auto', textAlign: 'right' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Skipped</div>
                <div style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 2 }}>{c.reason}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Confidence */}
        <h3 style={sectionH}>Confidence</h3>
        <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 14, border: '0.5px solid var(--hairline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="serif tnum" style={{ fontSize: 32, color: 'var(--ink)' }}>94<span style={{ fontSize: 18, color: 'var(--muted)' }}>%</span></span>
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>Match score</span>
          </div>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr', gap: 6 }}>
            {[
              { l: 'Nutrition fit', v: 96 },
              { l: 'Constraint compliance', v: 100 },
              { l: 'Price within budget', v: 88 },
              { l: 'Past preference signal', v: 91 },
            ].map(b => (
              <div key={b.l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flex: '0 0 130px', fontSize: 11.5, color: 'var(--ink-2)' }}>{b.l}</span>
                <div style={{ flex: 1, height: 3, background: 'var(--hairline-2)', borderRadius: 100, overflow: 'hidden' }}>
                  <div style={{ width: `${b.v}%`, height: '100%', background: 'var(--sage)' }}/>
                </div>
                <span className="mono tnum" style={{ flex: '0 0 28px', fontSize: 11, color: 'var(--ink-2)', textAlign: 'right' }}>{b.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <button style={{ ...btnGhost, flex: 1 }}>Train: less like this</button>
          <button style={{ ...btnGhost, flex: 1 }}>Block restaurant</button>
        </div>

        {meal.status === 'awaiting' && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button style={{ ...btnPrimary, flex: 1 }} onClick={onApprove}>Approve & order</button>
          </div>
        )}
    </>
  );
};

/* Order flow: placing */
const OrderPlacing = ({ meal }) => {
  const [step, setStep] = useState(0);
  const steps = [
    `Authorising payment · $${(meal.price || 0).toFixed(2)}`,
    'Placing on Foodpanda…',
    'Confirming with restaurant…',
  ];
  useEffect(() => {
    if (step < steps.length - 1) {
      const t = setTimeout(() => setStep(step + 1), 650);
      return () => clearTimeout(t);
    }
  }, [step]);
  return (
    <div style={{ padding: '24px 4px 8px', textAlign: 'center' }}>
      <div style={{
        width: 56, height: 56, margin: '0 auto 18px',
        borderRadius: '50%', border: '2.5px solid var(--hairline)',
        borderTopColor: 'var(--ink)',
        animation: 'ring-spin 0.9s linear infinite',
      }}/>
      <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.2, color: 'var(--muted)', textTransform: 'uppercase' }}>
        Ordering
      </span>
      <div className="serif" style={{ fontSize: 26, lineHeight: 1.2, marginTop: 6, color: 'var(--ink)' }}>
        {meal.item}
      </div>
      <div style={{ marginTop: 22, padding: 14, background: 'var(--surface)', borderRadius: 14, border: '0.5px solid var(--hairline)', textAlign: 'left' }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '6px 0',
            opacity: i > step ? 0.35 : 1,
            transition: 'opacity 0.3s',
          }}>
            <div style={{
              width: 16, height: 16, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: i < step ? 'var(--sage-soft)' : i === step ? 'var(--surface-2)' : 'transparent',
              color: i < step ? 'var(--sage)' : 'var(--muted)',
              border: i === step ? '1px dashed var(--muted)' : 'none',
            }}>
              {i < step && <Icon k="check" size={11}/>}
              {i === step && <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ink)', animation: 'pulse-dot 1s ease-in-out infinite' }}/>}
            </div>
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Order flow: confirmed */
const OrderConfirmed = ({ meal, onClose }) => (
  <div style={{ padding: '24px 4px 8px', textAlign: 'center' }}>
    <div style={{
      width: 64, height: 64, margin: '0 auto 18px',
      borderRadius: '50%', background: 'var(--sage-soft)', color: 'var(--sage)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fade-in 0.4s ease',
    }}>
      <Icon k="check" size={32}/>
    </div>
    <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.2, color: 'var(--sage)', textTransform: 'uppercase' }}>
      Order placed
    </span>
    <div className="serif" style={{ fontSize: 28, lineHeight: 1.15, marginTop: 6, color: 'var(--ink)' }}>
      {meal.item}
    </div>
    <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
      {meal.from} · ${(meal.price || 0).toFixed(2)}
    </div>
    <div style={{ marginTop: 22, padding: 16, background: 'var(--surface)', borderRadius: 14, border: '0.5px solid var(--hairline)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: 1, color: 'var(--muted)', textTransform: 'uppercase' }}>Estimated arrival</span>
        <span className="serif tnum" style={{ fontSize: 24, color: 'var(--ink)' }}>{meal.eta || '12:42'}</span>
      </div>
      <div style={{ marginTop: 12, height: 3, background: 'var(--hairline-2)', borderRadius: 100, overflow: 'hidden' }}>
        <div style={{
          width: '8%', height: '100%',
          background: 'linear-gradient(90deg, transparent, var(--sage), var(--sage))',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2.2s linear infinite',
        }}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span className="mono" style={{ fontSize: 9.5, color: 'var(--ink)', letterSpacing: 0.6 }}>CONFIRMED</span>
        <span className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: 0.6 }}>PREPARING</span>
        <span className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: 0.6 }}>ON THE WAY</span>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
      <button style={{ ...btnGhost, flex: 1 }}>Track order</button>
      <button style={{ ...btnPrimary, flex: 1 }} onClick={onClose}>Done</button>
    </div>
  </div>
);

const sectionH = {
  fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: 1.2,
  color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 500,
  margin: '24px 0 10px',
};

const ReasoningChain = ({ meal, persona }) => {
  const rows = [
    { step: 'Sensed', text: `Lunch window 12:00–14:00 · location: home · weather clear` },
    { step: 'Reasoned', text: `Target ${persona.dailyTarget.kcal} kcal/day, ${meal.kcal} kcal left for lunch · ${persona.constraint}` },
    { step: 'Searched', text: `47 candidates on GrabFood, Foodpanda, Deliveroo within 15min` },
    { step: 'Selected', text: meal.why },
    { step: 'Executed', text: meal.status === 'scheduled' ? 'Pending — will place at decision time'
                              : `Placed on Foodpanda at ${meal.time} · $${meal.price.toFixed(2)}` },
  ];
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '6px 14px', border: '0.5px solid var(--hairline)' }}>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: 'flex', gap: 12, padding: '12px 0',
          borderBottom: i < rows.length - 1 ? '0.5px solid var(--hairline-2)' : 'none',
        }}>
          <div style={{ flex: '0 0 70px' }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>
              {r.step}
            </span>
          </div>
          <div style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.45 }}>{r.text}</div>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────── Today screen ─────────────────── */
const TodayScreen = ({ persona, autonomy, hour, userName, onOpenMeal, onApproveMeal }) => {
  const date = 'Tue · 26 May';
  const spent = persona.meals.reduce((s, m) => s + (m.price || 0), 0);
  return (
    <div style={{ padding: '0 18px 100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, padding: '4px 0 18px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.2, color: 'var(--muted)', textTransform: 'uppercase' }}>
            {date}
          </span>
          <div className="serif" style={{ fontSize: 28, color: 'var(--ink)', marginTop: 4, lineHeight: 1.1, whiteSpace: 'nowrap' }}>
            Good afternoon{userName ? `, ${userName.split(' ')[0]}` : ''}
          </div>
        </div>
        <PersonaPill persona={persona}/>
      </div>

      <NowPanel persona={persona} autonomy={autonomy} hour={hour} onTap={onOpenMeal} onApprove={onApproveMeal}/>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '24px 0 4px' }}>
        <h3 style={{ ...sectionH, margin: 0 }}>Today's meals</h3>
        <span className="mono tnum" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
          ${spent.toFixed(2)} spent
        </span>
      </div>
      <div>
        {persona.meals.map((m, i) => (
          <TimelineRow key={i} meal={m} onTap={onOpenMeal}/>
        ))}
      </div>

      <h3 style={sectionH}>Tomorrow</h3>
      <div style={{
        background: 'var(--surface)', borderRadius: 16, padding: 14,
        border: '0.5px solid var(--hairline)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>Wed · 27 May</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>3 meals scheduled · agent will decide each</div>
        </div>
        <Icon k="chev-r" size={18} stroke="var(--muted)"/>
      </div>
    </div>
  );
};

const PersonaPill = ({ persona }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 4px 6px 10px',
    background: 'var(--surface)', borderRadius: 100,
    border: '0.5px solid var(--hairline)',
  }}>
    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)' }}/>
    <span style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 500 }}>{persona.name}</span>
    <Icon k="chev-d" size={14} stroke="var(--muted)"/>
  </div>
);

/* ─────────────────── Brain screen ─────────────────── */
const BrainScreen = ({ persona }) => {
  const groups = { context: 'Context', health: 'Health', history: 'History' };
  const { stepIdx, step, phrase } = useLoop(true);
  const narration = LOOP_NARRATION[step.id][phrase]
    .replace('{kcalSoFar}', '950').replace('{lastMeal}', '12:42')
    .replace('{kcalNeed}', '850').replace('{pNeed}', '42')
    .replace('{constraint}', persona.constraint.toLowerCase())
    .replace('{topPick}', 'a balanced plate');
  return (
    <div style={{ padding: '0 18px 100px' }}>
      <h3 style={sectionH}>Decision loop · live</h3>
      <div style={{ background: 'var(--surface)', borderRadius: 18, padding: 16, border: '0.5px solid var(--hairline)' }}>
        <LoopRibbon stepIdx={stepIdx}/>
        <div style={{
          marginTop: 14, padding: '10px 12px',
          background: 'var(--surface-2)', borderRadius: 12,
          fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.4, minHeight: 32,
        }} key={`${step.id}-${phrase}`}>{narration}</div>
      </div>

      <h3 style={sectionH}>Connectors</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(groups).map(([gid, gname]) => (
          <div key={gid}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6, paddingLeft: 4 }}>
              {gname}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CONNECTORS.filter(c => c.group === gid).map(c => {
                const used = persona.connectors.includes(c.id);
                return (
                  <div key={c.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 14px', borderRadius: 12,
                    background: 'var(--surface)', border: '0.5px solid var(--hairline)',
                    opacity: used ? 1 : 0.55,
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: used ? 'var(--sage-soft)' : 'var(--surface-2)',
                      color: used ? 'var(--sage)' : 'var(--muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon k={c.icon} size={16}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1 }}>{c.sub}</div>
                    </div>
                    {used
                      ? <span className="mono" style={{ fontSize: 10, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: 0.6 }}>Linked</span>
                      : <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>Off</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <h3 style={sectionH}>Delivery platforms</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {PLATFORMS.map(p => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 14px', borderRadius: 12,
            background: 'var(--surface)', border: '0.5px solid var(--hairline)',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)' }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1 }}>{p.status} · {p.latency}s avg</div>
            </div>
            <Icon k="chev-r" size={16} stroke="var(--muted)"/>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────── Log screen ─────────────────── */
const LogScreen = ({ persona, onOpenSpend }) => {
  const consumed = persona.meals.filter(m => m.status === 'delivered' || m.status === 'enroute');
  const kcal = consumed.reduce((s, m) => s + (m.kcal || 0), 0);
  const t = persona.dailyTarget;
  const p = Math.round(kcal * 0.25 / 4);
  const c = Math.round(kcal * 0.55 / 4);
  const f = Math.round(kcal * 0.20 / 9);
  const macroBars = [
    { l: 'Protein', v: p, t: t.p, color: 'var(--sage)' },
    { l: 'Carbs',   v: c, t: t.c, color: 'var(--clay)' },
    { l: 'Fat',     v: f, t: t.f, color: 'var(--ink)' },
  ];
  return (
    <div style={{ padding: '0 18px 100px' }}>
      <h3 style={sectionH}>Today's nutrition</h3>
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 18, border: '0.5px solid var(--hairline)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <span className="serif tnum" style={{ fontSize: 44, color: 'var(--ink)' }}>{kcal}</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 6 }}>/ {t.kcal} kcal</span>
          </div>
          <Pill tone="sage">on target</Pill>
        </div>
        <div style={{ marginTop: 8, height: 4, background: 'var(--hairline-2)', borderRadius: 100, overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, kcal/t.kcal*100)}%`, height: '100%', background: 'var(--ink)' }}/>
        </div>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {macroBars.map(m => (
            <div key={m.l}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-2)', marginBottom: 4 }}>
                <span>{m.l}</span>
                <span className="mono tnum"><span style={{ color: 'var(--ink)', fontWeight: 600 }}>{m.v}</span><span style={{ color: 'var(--muted)' }}> / {m.t}g</span></span>
              </div>
              <div style={{ height: 6, background: 'var(--hairline-2)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, m.v/m.t*100)}%`, height: '100%', background: m.color }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 style={sectionH}>Spend · this week</h3>
      <div onClick={onOpenSpend} style={{
        background: 'var(--surface)', borderRadius: 18, padding: 16,
        border: '0.5px solid var(--hairline)', cursor: 'pointer',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="serif tnum" style={{ fontSize: 28, color: 'var(--ink)' }}>$184.20</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>of $350</span>
            <Icon k="chev-r" size={14} stroke="var(--muted)"/>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginTop: 14, height: 64 }}>
          {[42, 38, 28, 0, 36, 22, 18].map((v, i) => {
            const today = i === 6;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: '100%', height: `${(v/50)*100}%`, borderRadius: 3,
                  background: today ? 'var(--ink)' : 'var(--sage)',
                  opacity: v === 0 ? 0.25 : 1,
                  minHeight: v > 0 ? 2 : 6,
                }}/>
                <span className="mono" style={{ fontSize: 9, color: today ? 'var(--ink)' : 'var(--muted)', letterSpacing: 0.4 }}>
                  {['M','T','W','T','F','S','S'][i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <h3 style={sectionH}>Agent decisions · 7d</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { v: 21, l: 'meals decided' },
          { v: 19, l: 'autoplaced' },
          { v: 2, l: 'you swapped' },
        ].map(s => (
          <div key={s.l} style={{ padding: 14, borderRadius: 14, background: 'var(--surface)', border: '0.5px solid var(--hairline)' }}>
            <div className="serif tnum" style={{ fontSize: 28, color: 'var(--ink)' }}>{s.v}</div>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────── Settings screen ─────────────────── */
const SettingsScreen = ({ persona, autonomy, setAutonomy, onOpenAllergies }) => {
  return (
    <div style={{ padding: '0 18px 100px' }}>
      <h3 style={sectionH}>Persona</h3>
      <div style={{ padding: '14px 16px', borderRadius: 16, background: 'var(--surface)', border: '0.5px solid var(--hairline)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="serif" style={{ fontSize: 22, color: 'var(--ink)' }}>{persona.full}</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4, maxWidth: 260 }}>{persona.blurb}</div>
          </div>
          <Pill tone={persona.accent}>active</Pill>
        </div>
        <div style={{ marginTop: 12, padding: 10, background: 'var(--surface-2)', borderRadius: 10 }}>
          <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>Key constraint</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 3 }}>{persona.constraint}</div>
        </div>
      </div>

      <h3 style={sectionH}>Autonomy level</h3>
      <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 14, border: '0.5px solid var(--hairline)' }}>
        <AutonomyDial value={autonomy} onChange={setAutonomy}/>
        <div style={{ marginTop: 16, padding: 12, background: 'var(--surface-2)', borderRadius: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{AUTONOMY_LEVELS[autonomy].name}</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>{AUTONOMY_LEVELS[autonomy].tag}</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 4, lineHeight: 1.4 }}>{AUTONOMY_LEVELS[autonomy].desc}</div>
        </div>
      </div>

      <h3 style={sectionH}>Daily targets</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[
          { l: 'kcal', v: persona.dailyTarget.kcal },
          { l: 'protein', v: persona.dailyTarget.p + 'g' },
          { l: 'carbs', v: persona.dailyTarget.c + 'g' },
          { l: 'fat', v: persona.dailyTarget.f + 'g' },
        ].map(x => (
          <div key={x.l} style={{ padding: 12, borderRadius: 12, background: 'var(--surface)', border: '0.5px solid var(--hairline)' }}>
            <div className="serif tnum" style={{ fontSize: 20, color: 'var(--ink)' }}>{x.v}</div>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 1 }}>{x.l}</div>
          </div>
        ))}
      </div>

      <h3 style={sectionH}>Payment & restrictions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { l: 'Payment', v: 'DBS Visa ••4419' },
          { l: 'Daily spend cap', v: '$50.00' },
          { l: 'Allergies', v: 'Shellfish', onClick: onOpenAllergies },
          { l: 'Avoid restaurants', v: '3 blocked' },
        ].map(r => (
          <div key={r.l} onClick={r.onClick} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 16px', background: 'var(--surface)',
            borderRadius: 12, border: '0.5px solid var(--hairline)',
            cursor: r.onClick ? 'pointer' : 'default',
          }}>
            <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>{r.l}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{r.v}</span>
              <Icon k="chev-r" size={14} stroke="var(--muted)"/>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AutonomyDial = ({ value, onChange }) => (
  <div>
    <div style={{ display: 'flex', gap: 4 }}>
      {AUTONOMY_LEVELS.map(a => {
        const active = a.id === value;
        return (
          <button key={a.id} onClick={() => onChange(a.id)} style={{
            flex: 1, padding: '12px 4px', border: 'none', cursor: 'pointer',
            borderRadius: 10,
            background: active ? 'var(--ink)' : 'var(--surface-2)',
            color: active ? 'var(--bg)' : 'var(--ink-2)',
            fontFamily: 'inherit',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            transition: 'background 0.18s',
          }}>
            <span style={{ fontSize: 14 }}>{a.icon}</span>
            <span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: 0.2 }}>{a.name}</span>
          </button>
        );
      })}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, padding: '0 4px' }}>
      <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>more control</span>
      <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>more autonomy</span>
    </div>
  </div>
);

/* ────────────── Sub-page shell ────────────── */
const SubPage = ({ title, onBack, children, rightSlot }) => (
  <div style={{
    position: 'absolute', inset: 0,
    background: 'var(--bg)', color: 'var(--ink)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    animation: 'subpage-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
    zIndex: 60,
  }}>
    <div style={{ paddingTop: 58, flex: '0 0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '4px 14px 14px',
      }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: '50%',
          border: 'none', background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--ink)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}>
          <Icon k="chev-l" size={18}/>
        </button>
        <h1 className="serif" style={{
          margin: 0, fontSize: 22, fontWeight: 400, color: 'var(--ink)',
          flex: 1, paddingLeft: 6,
        }}>{title}</h1>
        {rightSlot}
      </div>
    </div>
    <div className="scroll" style={{
      flex: 1, overflowY: 'auto', overflowX: 'hidden',
      padding: '0 18px 110px',
    }}>{children}</div>
  </div>
);

/* ────────────── Allergies ────────────── */
const ALLERGENS = [
  { id: 'shellfish', label: 'Shellfish', icon: 'shell' },
  { id: 'fish',      label: 'Fish',      icon: 'fish' },
  { id: 'peanut',    label: 'Peanut',    icon: 'peanut' },
  { id: 'treenut',   label: 'Tree nuts', icon: 'nut' },
  { id: 'milk',      label: 'Dairy',     icon: 'milk' },
  { id: 'egg',       label: 'Eggs',      icon: 'egg' },
  { id: 'gluten',    label: 'Gluten',    icon: 'wheat' },
  { id: 'soy',       label: 'Soy',       icon: 'soy' },
  { id: 'sesame',    label: 'Sesame',    icon: 'sesame' },
];
const PREFERENCES = [
  { id: 'spice',  label: 'Spicy food', icon: 'spice' },
  { id: 'sugar',  label: 'Added sugar', icon: 'sugar' },
  { id: 'pork',   label: 'Pork',       icon: 'plate' },
];

const AllergiesScreen = ({ onBack }) => {
  // Curated default state — could be wired to tweaks later
  const [selected, setSelected] = useState({ shellfish: true });
  const toggle = (id) => setSelected(s => ({ ...s, [id]: !s[id] }));
  const count = Object.values(selected).filter(Boolean).length;

  return (
    <SubPage title="Allergies" onBack={onBack}
      rightSlot={<Pill tone={count > 0 ? 'clay' : 'ghost'}>{count} active</Pill>}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.45, margin: '4px 4px 18px' }}>
        NOURI hard-blocks orders containing anything you mark. Tap to toggle.
      </p>

      <h3 style={sectionH}>Allergens</h3>
      <AllergenGrid items={ALLERGENS} selected={selected} onToggle={toggle}/>

      <h3 style={sectionH}>Avoid</h3>
      <AllergenGrid items={PREFERENCES} selected={selected} onToggle={toggle}/>

      <h3 style={sectionH}>Custom</h3>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 16px', borderRadius: 12,
        background: 'var(--surface)', border: '0.5px dashed var(--hairline)',
        color: 'var(--muted)', fontSize: 13.5,
      }}>
        <span style={{ fontSize: 18, fontWeight: 300 }}>+</span>
        <span>Add a custom ingredient or restriction</span>
      </div>
    </SubPage>
  );
};

const AllergenGrid = ({ items, selected, onToggle }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
    {items.map(a => {
      const on = !!selected[a.id];
      return (
        <button key={a.id} onClick={() => onToggle(a.id)} style={{
          padding: '14px 8px',
          borderRadius: 14,
          border: `1px solid ${on ? 'var(--ink)' : 'var(--hairline)'}`,
          background: on ? 'var(--ink)' : 'var(--surface)',
          color: on ? 'var(--bg)' : 'var(--ink)',
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          transition: 'all 0.18s',
          position: 'relative',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: on ? 'rgba(255,255,255,0.1)' : 'var(--surface-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: on ? 'var(--bg)' : 'var(--ink-2)',
          }}>
            <Icon k={a.icon} size={20}/>
          </div>
          <span style={{ fontSize: 12, fontWeight: 500 }}>{a.label}</span>
          {on && (
            <div style={{
              position: 'absolute', top: 8, right: 8,
              width: 16, height: 16, borderRadius: '50%',
              background: 'var(--sage)', color: 'var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon k="check" size={11} stroke="var(--ink)"/>
            </div>
          )}
        </button>
      );
    })}
  </div>
);

/* ────────────── Spend detail ────────────── */
const SPEND_HISTORY = [
  { day: 'Today · Tue', date: '26 May', meals: [
    { time: '07:30', slot: 'Breakfast', item: 'Congee + poached egg', from: 'Tiong Bahru BKT', amount: 8.40, platform: 'Foodpanda' },
    { time: '12:15', slot: 'Lunch', item: 'Steamed cod + brown rice', from: 'Soup Spoon', amount: 13.90, platform: 'GrabFood' },
  ]},
  { day: 'Mon', date: '25 May', meals: [
    { time: '07:45', slot: 'Breakfast', item: 'Avocado toast', from: 'Toast Box', amount: 8.20, platform: 'Foodpanda' },
    { time: '12:30', slot: 'Lunch', item: 'Poke bowl', from: 'A Poke Theory', amount: 16.80, platform: 'Deliveroo' },
    { time: '19:00', slot: 'Dinner', item: 'Pad thai', from: 'Nakhon Kitchen', amount: 13.00, platform: 'GrabFood' },
  ]},
  { day: 'Sun', date: '24 May', meals: [
    { time: '09:00', slot: 'Brunch', item: 'Eggs benedict', from: 'PS.Cafe', amount: 22.00, platform: 'Direct' },
    { time: '19:30', slot: 'Dinner', item: 'Beef pho', from: 'NamNam', amount: 16.50, platform: 'GrabFood' },
  ]},
  { day: 'Sat', date: '23 May', meals: [
    { time: '12:30', slot: 'Lunch', item: 'Chicken rice', from: 'Boon Tong Kee', amount: 7.50, platform: 'Foodpanda' },
    { time: '18:00', slot: 'Dinner', item: 'Pizza margherita', from: 'Pizza Hut', amount: 21.00, platform: 'GrabFood' },
  ]},
];

const SpendDetailScreen = ({ onBack }) => {
  const total = SPEND_HISTORY.flatMap(d => d.meals).reduce((s, m) => s + m.amount, 0);
  const orderCount = SPEND_HISTORY.flatMap(d => d.meals).length;
  const avg = total / orderCount;

  return (
    <SubPage title="Spending" onBack={onBack}>
      {/* Big number */}
      <div style={{ padding: '6px 4px 18px' }}>
        <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.2, color: 'var(--muted)', textTransform: 'uppercase' }}>
          Last 7 days
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
          <span className="serif tnum" style={{ fontSize: 48, color: 'var(--ink)', lineHeight: 1 }}>
            ${total.toFixed(2)}
          </span>
          <Pill tone="sage">−12% vs last week</Pill>
        </div>
      </div>

      {/* Stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { l: 'orders', v: orderCount },
          { l: 'avg / meal', v: `$${avg.toFixed(2)}` },
          { l: 'cheapest', v: '$7.50' },
        ].map(s => (
          <div key={s.l} style={{
            padding: 12, borderRadius: 12,
            background: 'var(--surface)', border: '0.5px solid var(--hairline)',
          }}>
            <div className="serif tnum" style={{ fontSize: 20, color: 'var(--ink)' }}>{s.v}</div>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 1 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Bar chart with daily totals */}
      <h3 style={sectionH}>Daily total</h3>
      <div style={{ padding: 16, borderRadius: 14, background: 'var(--surface)', border: '0.5px solid var(--hairline)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 96 }}>
          {[42, 38, 28, 0, 36, 22, 22.30].map((v, i) => {
            const today = i === 6;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span className="mono tnum" style={{ fontSize: 9, color: 'var(--muted)' }}>
                  {v > 0 ? `$${Math.round(v)}` : ''}
                </span>
                <div style={{
                  width: '100%', height: `${(v/50)*100}%`, borderRadius: 4,
                  background: today ? 'var(--ink)' : 'var(--sage)',
                  opacity: v === 0 ? 0.18 : 1,
                  minHeight: v > 0 ? 4 : 8,
                }}/>
                <span className="mono" style={{ fontSize: 9.5, color: today ? 'var(--ink)' : 'var(--muted)', letterSpacing: 0.4 }}>
                  {['M','T','W','T','F','S','S'][i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-meal log */}
      <h3 style={sectionH}>Every meal</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {SPEND_HISTORY.map(day => {
          const dayTotal = day.meals.reduce((s, m) => s + m.amount, 0);
          return (
            <div key={day.day}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                padding: '0 4px 8px',
              }}>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--ink-2)', letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 600 }}>
                  {day.day} · {day.date}
                </span>
                <span className="mono tnum" style={{ fontSize: 11, color: 'var(--muted)' }}>
                  ${dayTotal.toFixed(2)}
                </span>
              </div>
              <div style={{
                background: 'var(--surface)', borderRadius: 14,
                border: '0.5px solid var(--hairline)', overflow: 'hidden',
              }}>
                {day.meals.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 12, padding: '12px 14px',
                    borderBottom: i < day.meals.length - 1 ? '0.5px solid var(--hairline-2)' : 'none',
                  }}>
                    <div style={{ flex: '0 0 46px' }}>
                      <div className="mono tnum" style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 600 }}>{m.time}</div>
                      <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 1 }}>
                        {m.slot}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.25 }}>{m.item}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>
                        {m.from} · <span className="mono" style={{ fontSize: 10 }}>{m.platform}</span>
                      </div>
                    </div>
                    <div style={{ flex: '0 0 auto', alignSelf: 'flex-start' }}>
                      <span className="serif tnum" style={{ fontSize: 18, color: 'var(--ink)' }}>
                        ${m.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SubPage>
  );
};

Object.assign(window, {
  Icon, BrandMark, Pill, NowPanel, TimelineRow, MealSheet,
  SubPage, AllergiesScreen, SpendDetailScreen,
  TodayScreen, BrainScreen, LogScreen, SettingsScreen, AutonomyDial,
  PersonaPill, LoopRibbon, useLoop,
});
