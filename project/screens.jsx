/* NOURI — UI primitives, hooks, and the four screens. */

const { useState, useEffect, useRef, useMemo, Fragment } = React;

/* ───────────────────────── Icons ───────────────────────── */
const Icon = ({ k, size = 18, stroke = 'currentColor' }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (k) {
    case 'pin':return <svg {...p}><path d="M12 21s-7-6.5-7-12a7 7 0 1114 0c0 5.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.4" /></svg>;
    case 'cal':return <svg {...p}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9.5h16M9 3v4M15 3v4" /></svg>;
    case 'sun':return <svg {...p}><circle cx="12" cy="12" r="3.5" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5" /></svg>;
    case 'pulse':return <svg {...p}><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>;
    case 'leaf':return <svg {...p}><path d="M5 19c0-7 5-12 14-13-1 9-6 14-13 14a4 4 0 01-1-1zM5 19l8-8" /></svg>;
    case 'rx':return <svg {...p}><path d="M7 4h5a3 3 0 010 6H7zM7 10v10M7 4v6M11 12l8 8M19 12l-8 8" /></svg>;
    case 'wave':return <svg {...p}><path d="M3 12c2 0 2-5 4-5s2 10 4 10 2-10 4-10 2 5 4 5" /></svg>;
    case 'archive':return <svg {...p}><rect x="3" y="5" width="18" height="4" rx="1" /><path d="M5 9v9a2 2 0 002 2h10a2 2 0 002-2V9M10 13h4" /></svg>;
    case 'wallet':return <svg {...p}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M16 12h2M3 10h18" /></svg>;
    case 'chev-r':return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    case 'chev-d':return <svg {...p}><path d="M6 9l6 6 6-6" /></svg>;
    case 'check':return <svg {...p}><path d="M5 12l4 4 10-10" /></svg>;
    case 'x':return <svg {...p}><path d="M6 6l12 12M18 6l-6 12" /></svg>;
    case 'home':return <svg {...p}><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z" /></svg>;
    case 'brain':return <svg {...p}><path d="M9 5a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 005 1 3 3 0 005-1 3 3 0 002-5 3 3 0 00-2-5 3 3 0 00-3-3 3 3 0 00-2 1 3 3 0 00-2-1z" /><path d="M9 9v6M15 9v6M9 12h6" /></svg>;
    case 'plate':return <svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /></svg>;
    case 'gear':return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
    case 'flame':return <svg {...p}><path d="M12 21c-4 0-6-3-6-6 0-3 2-5 3-7 0 2 2 3 3 3 0-3-1-4-1-6 0-2 2-3 3-3 0 4 5 6 5 11 0 5-3 8-7 8z" /></svg>;
    case 'dot':return <svg {...p}><circle cx="12" cy="12" r="4" fill={stroke} stroke="none" /></svg>;
    default:return null;
  }
};

/* ─────────────────────── Brand mark ─────────────────────── */
const BrandMark = ({ size = 22, color = 'var(--ink)' }) =>
<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <span style={{
    width: size, height: size, borderRadius: '50%',
    background: 'var(--ink)', position: 'relative', display: 'inline-block'
  }} data-comment-anchor="7f25b2b8b4-span-36-5">
      <span style={{
      position: 'absolute', inset: 3, borderRadius: '50%',
      border: '1px dashed var(--bg)'
    }} />
    </span>
    <span className="serif" style={{ fontSize: size * 1.4, letterSpacing: 1.2, fontStyle: 'italic', color, textTransform: 'uppercase' }}>NOURI</span>
  </span>;


/* ─────────────────────── Pill ─────────────────────── */
const Pill = ({ children, tone = 'neutral', size = 'sm', style = {} }) => {
  const palette = {
    neutral: { bg: 'var(--surface-2)', fg: 'var(--ink-2)', bd: 'var(--hairline)' },
    sage: { bg: 'var(--sage-soft)', fg: 'var(--sage)', bd: 'transparent' },
    clay: { bg: 'var(--clay-soft)', fg: 'var(--clay)', bd: 'transparent' },
    ink: { bg: 'var(--ink)', fg: 'var(--bg)', bd: 'transparent' },
    ghost: { bg: 'transparent', fg: 'var(--muted)', bd: 'var(--hairline)' }
  }[tone];
  const sz = size === 'lg' ? { px: 12, py: 6, fs: 13 } : { px: 8, py: 3, fs: 11.5 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: `${sz.py}px ${sz.px}px`, borderRadius: 100,
      background: palette.bg, color: palette.fg,
      border: `0.5px solid ${palette.bd}`,
      fontSize: sz.fs, fontWeight: 500, letterSpacing: 0.1,
      lineHeight: 1, ...style
    }}>{children}</span>);

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
      setPhrase((p) => (p + 1) % 3);
    }, step.duration);
    return () => clearTimeout(t);
  }, [stepIdx, active]);
  return { stepIdx, step: LOOP_STEPS[stepIdx], phrase };
}

/* ─────────────────────── Loop indicator ─────────────────────── */
const LoopRibbon = ({ stepIdx, compact = false }) =>
<div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
    {LOOP_STEPS.map((s, i) => {
    const active = i === stepIdx;
    const done = i < stepIdx;
    return (
      <Fragment key={s.id}>
          <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          flex: 1, minWidth: 0
        }}>
            <div style={{
            width: active ? 9 : 6, height: active ? 9 : 6, borderRadius: '50%',
            background: active ? 'var(--sage)' : done ? 'var(--ink)' : 'var(--hairline)',
            animation: active ? 'pulse-dot 1.4s ease-in-out infinite' : 'none',
            transition: 'all 0.3s'
          }} />
            {!compact &&
          <span className="mono" style={{
            fontSize: 9.5, color: active ? 'var(--ink)' : 'var(--muted)',
            letterSpacing: 0.3, textTransform: 'uppercase',
            fontWeight: active ? 600 : 400
          }}>{s.label}</span>
          }
          </div>
          {i < LOOP_STEPS.length - 1 &&
        <div style={{
          flex: '0 0 8px', height: 1,
          background: i < stepIdx ? 'var(--ink)' : 'var(--hairline)',
          marginBottom: compact ? 0 : 12
        }} />
        }
        </Fragment>);

  })}
  </div>;


/* ───────────────────── NOW panel (the hero) ───────────────────── */
const NowPanel = ({ persona, autonomy, hour, onTap }) => {
  // determine current activity from hour + meals
  const activity = useMemo(() => {
    // find next meal awaiting/enroute/scheduled
    const next = persona.meals.find((m) => m.status === 'enroute' || m.status === 'awaiting');
    const scheduled = persona.meals.find((m) => m.status === 'scheduled');
    if (next?.status === 'enroute') return { mode: 'tracking', meal: next };
    if (next?.status === 'awaiting') return { mode: 'awaiting', meal: next };
    if (scheduled) return { mode: 'thinking', meal: scheduled };
    return { mode: 'idle' };
  }, [persona, hour]);

  const { stepIdx, step, phrase } = useLoop(activity.mode === 'thinking');

  const narration = useMemo(() => {
    if (activity.mode !== 'thinking') return null;
    const tmpl = LOOP_NARRATION[step.id][phrase];
    return tmpl.
    replace('{kcalSoFar}', '950').
    replace('{lastMeal}', '12:42').
    replace('{kcalNeed}', '850').
    replace('{pNeed}', '42').
    replace('{constraint}', persona.constraint.toLowerCase()).
    replace('{topPick}', activity.meal?.item || 'a balanced plate');
  }, [step, phrase, activity, persona]);

  // ── tracking (en route) ──
  if (activity.mode === 'tracking') {
    const m = activity.meal;
    return (
      <div onClick={() => onTap(m)} style={{
        background: 'var(--ink)', color: 'var(--bg)', borderRadius: 22,
        padding: '18px 18px 16px', cursor: 'pointer',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.2, opacity: 0.6, textTransform: 'uppercase' }}>
            On the way · ETA {m.eta}
          </span>
          <span className="mono" style={{ fontSize: 10.5, opacity: 0.6 }}>
            {AUTONOMY_LEVELS[autonomy].name.toUpperCase()}
          </span>
        </div>
        <div className="serif" style={{ fontSize: 26, lineHeight: 1.15, marginTop: 8, letterSpacing: 0.1 }}>
          {m.item}
        </div>
        <div style={{ fontSize: 12.5, opacity: 0.65, marginTop: 4 }}>
          {m.from} · ${m.price.toFixed(2)} · {m.kcal} kcal
        </div>
        {/* progress bar */}
        <div style={{ marginTop: 16, height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 100, overflow: 'hidden' }}>
          <div style={{
            width: '62%', height: '100%',
            background: 'linear-gradient(90deg, transparent, var(--sage), var(--sage))',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.2s linear infinite'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10.5, opacity: 0.55 }}>
          <span className="mono">PREPARING</span>
          <span className="mono">PICKED UP</span>
          <span className="mono">DELIVERED</span>
        </div>
      </div>);

  }

  // ── thinking (live loop running) ──
  if (activity.mode === 'thinking') {
    return (
      <div style={{
        background: 'var(--surface)', borderRadius: 22, padding: '18px 18px 14px',
        border: '0.5px solid var(--hairline)', boxShadow: 'var(--shadow)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)',
              animation: 'pulse-dot 1.4s ease-in-out infinite'
            }} />
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.2, color: 'var(--ink-2)', textTransform: 'uppercase' }}>
              Thinking · {step.label}
            </span>
          </div>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
            decision in 14m
          </span>
        </div>
        <div style={{ marginTop: 14, marginBottom: 12 }}>
          <LoopRibbon stepIdx={stepIdx} />
        </div>
        <div style={{
          minHeight: 38, padding: '10px 12px',
          background: 'var(--surface-2)', borderRadius: 12,
          fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.4,
          animation: 'fade-in 0.4s ease'
        }} key={`${step.id}-${phrase}`}>
          {narration}
        </div>
      </div>);

  }

  // ── awaiting approval ──
  if (activity.mode === 'awaiting') {
    const m = activity.meal;
    return (
      <div style={{
        background: 'var(--surface)', borderRadius: 22, padding: '18px',
        border: '0.5px solid var(--clay)', boxShadow: 'var(--shadow)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Pill tone="clay">Waiting on you</Pill>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
            {AUTONOMY_LEVELS[autonomy].name.toUpperCase()}
          </span>
        </div>
        <div className="serif" style={{ fontSize: 26, lineHeight: 1.15, marginTop: 12, color: 'var(--ink)' }}>
          {m.item}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>
          {m.from} · ${m.price.toFixed(2)} · {m.kcal} kcal
        </div>
        <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 12, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.4 }}>
          {m.why}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button style={btnPrimary} onClick={() => onTap(m)}>Approve & order</button>
          <button style={btnGhost}>Swap</button>
        </div>
      </div>);

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
    </div>);

};

const btnPrimary = {
  flex: 1, padding: '12px', borderRadius: 12, border: 'none',
  background: 'var(--ink)', color: 'var(--bg)',
  fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer'
};
const btnGhost = {
  padding: '12px 16px', borderRadius: 12, border: '0.5px solid var(--hairline)',
  background: 'transparent', color: 'var(--ink)',
  fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer'
};

/* ───────────────────── Timeline row ───────────────────── */
const TimelineRow = ({ meal, onTap }) => {
  const tone = meal.status === 'delivered' ? 'sage' :
  meal.status === 'enroute' ? 'ink' :
  meal.status === 'awaiting' ? 'clay' :
  'ghost';
  const tag = meal.status === 'delivered' ? 'Delivered' :
  meal.status === 'enroute' ? `ETA ${meal.eta}` :
  meal.status === 'awaiting' ? 'Awaiting you' :
  `Decides ${meal.decideAt}`;
  return (
    <div onClick={() => meal.item && onTap(meal)} style={{
      display: 'flex', gap: 14, padding: '14px 4px',
      borderBottom: '0.5px solid var(--hairline-2)',
      cursor: meal.item ? 'pointer' : 'default'
    }}>
      <div style={{ flex: '0 0 46px' }}>
        <div className="mono tnum" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{meal.time}</div>
        <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 2 }}>
          {meal.slot}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 500, color: meal.item ? 'var(--ink)' : 'var(--muted)', lineHeight: 1.3 }}>
          {meal.item || 'To be decided'}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2, display: 'flex', gap: 6, alignItems: 'center' }}>
          {meal.from && <span>{meal.from}</span>}
          {meal.price > 0 && <><span>·</span><span className="tnum">${meal.price.toFixed(2)}</span></>}
          {meal.kcal && <><span>·</span><span className="tnum">{meal.kcal} kcal</span></>}
        </div>
      </div>
      <div style={{ flex: '0 0 auto', alignSelf: 'center' }}>
        <Pill tone={tone}>{tag}</Pill>
      </div>
    </div>);

};

/* ───────────────────── Meal detail sheet ───────────────────── */
const MealSheet = ({ meal, persona, onClose }) => {
  if (!meal) return null;
  const macros = {
    p: Math.round(meal.kcal * 0.25 / 4),
    c: Math.round(meal.kcal * 0.55 / 4),
    f: Math.round(meal.kcal * 0.20 / 9)
  };
  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
        animation: 'scrim 0.25s ease forwards', zIndex: 80
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        maxHeight: '85%', overflow: 'auto',
        background: 'var(--bg)', borderRadius: '24px 24px 0 0',
        padding: '12px 22px 100px',
        animation: 'slide-up 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        zIndex: 81
      }} className="scroll">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0 14px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 100, background: 'var(--hairline)' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.2, color: 'var(--muted)', textTransform: 'uppercase' }}>
              {meal.slot} · {meal.time}
            </span>
            <div className="serif" style={{ fontSize: 28, lineHeight: 1.15, marginTop: 6, color: 'var(--ink)' }}>
              {meal.item}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{meal.from}</div>
          </div>
          <button onClick={onClose} style={{
            border: 'none', background: 'var(--surface-2)', borderRadius: '50%',
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--ink-2)'
          }}><Icon k="x" size={16} /></button>
        </div>

        {/* Macro mini-card */}
        <div style={{
          marginTop: 16, padding: 14, background: 'var(--surface)', borderRadius: 16,
          border: '0.5px solid var(--hairline)',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12
        }}>
          {[
          { l: 'kcal', v: meal.kcal },
          { l: 'protein', v: macros.p + 'g' },
          { l: 'carbs', v: macros.c + 'g' },
          { l: 'fat', v: macros.f + 'g' }].
          map((x) =>
          <div key={x.l}>
              <div className="serif tnum" style={{ fontSize: 22, color: 'var(--ink)' }}>{x.v}</div>
              <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 1 }}>{x.l}</div>
            </div>
          )}
        </div>

        {/* Why this — the reasoning chain */}
        <h3 style={sectionH}>Why this order</h3>
        <ReasoningChain meal={meal} persona={persona} />

        {/* Considered & rejected */}
        <h3 style={sectionH}>Also considered</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
          { name: 'Grilled chicken salad', from: 'SaladStop!', price: 14.90, reason: 'Lower protein density · 28g vs 38g' },
          { name: 'Wagyu donburi', from: 'Sushi Tei', price: 19.50, reason: '$5.30 over lunch cap' },
          { name: 'Pad krapow chicken', from: 'Thai Tantric', price: 12.40, reason: 'Spice level conflicts with profile' }].
          map((c, i) =>
          <div key={i} style={{
            padding: '10px 12px', background: 'var(--surface)', borderRadius: 12,
            border: '0.5px solid var(--hairline)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
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
          )}
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
            { l: 'Past preference signal', v: 91 }].
            map((b) =>
            <div key={b.l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flex: '0 0 130px', fontSize: 11.5, color: 'var(--ink-2)' }}>{b.l}</span>
                <div style={{ flex: 1, height: 3, background: 'var(--hairline-2)', borderRadius: 100, overflow: 'hidden' }}>
                  <div style={{ width: `${b.v}%`, height: '100%', background: 'var(--sage)' }} />
                </div>
                <span className="mono tnum" style={{ flex: '0 0 28px', fontSize: 11, color: 'var(--ink-2)', textAlign: 'right' }}>{b.v}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <button style={{ ...btnGhost, flex: 1 }}>Train: less like this</button>
          <button style={{ ...btnGhost, flex: 1 }}>Block restaurant</button>
        </div>
      </div>
    </>);

};

const sectionH = {
  fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: 1.2,
  color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 500,
  margin: '24px 0 10px'
};

const ReasoningChain = ({ meal, persona }) => {
  const rows = [
  { step: 'Sensed', text: `Lunch window 12:00–14:00 · location: home · weather clear` },
  { step: 'Reasoned', text: `Target ${persona.dailyTarget.kcal} kcal/day, ${meal.kcal} kcal left for lunch · ${persona.constraint}` },
  { step: 'Searched', text: `47 candidates on GrabFood, Foodpanda, Deliveroo within 15min` },
  { step: 'Selected', text: meal.why },
  { step: 'Executed', text: meal.status === 'scheduled' ? 'Pending — will place at decision time' :
    `Placed on Foodpanda at ${meal.time} · $${meal.price.toFixed(2)}` }];

  return (
    <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '6px 14px', border: '0.5px solid var(--hairline)' }}>
      {rows.map((r, i) =>
      <div key={i} style={{
        display: 'flex', gap: 12, padding: '12px 0',
        borderBottom: i < rows.length - 1 ? '0.5px solid var(--hairline-2)' : 'none'
      }}>
          <div style={{ flex: '0 0 70px' }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>
              {r.step}
            </span>
          </div>
          <div style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.45 }}>{r.text}</div>
        </div>
      )}
    </div>);

};

/* ─────────────────── Today screen ─────────────────── */
const TodayScreen = ({ persona, autonomy, hour, onOpenMeal }) => {
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
            Good afternoon
          </div>
        </div>
        <PersonaPill persona={persona} />
      </div>

      <NowPanel persona={persona} autonomy={autonomy} hour={hour} onTap={onOpenMeal} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '24px 0 4px' }}>
        <h3 style={{ ...sectionH, margin: 0 }}>Today's meals</h3>
        <span className="mono tnum" style={{ fontSize: 10.5, color: 'var(--muted)' }}>
          ${spent.toFixed(2)} spent
        </span>
      </div>
      <div>
        {persona.meals.map((m, i) =>
        <TimelineRow key={i} meal={m} onTap={onOpenMeal} />
        )}
      </div>

      <h3 style={sectionH}>Tomorrow</h3>
      <div style={{
        background: 'var(--surface)', borderRadius: 16, padding: 14,
        border: '0.5px solid var(--hairline)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>Wed · 27 May</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>3 meals scheduled · agent will decide each</div>
        </div>
        <Icon k="chev-r" size={18} stroke="var(--muted)" />
      </div>
    </div>);

};

const PersonaPill = ({ persona }) =>
<div style={{
  display: 'flex', alignItems: 'center', gap: 6, padding: '6px 4px 6px 10px',
  background: 'var(--surface)', borderRadius: 100,
  border: '0.5px solid var(--hairline)'
}}>
    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)' }} />
    <span style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 500 }}>{persona.name}</span>
    <Icon k="chev-d" size={14} stroke="var(--muted)" />
  </div>;


/* ─────────────────── Brain screen ─────────────────── */
const BrainScreen = ({ persona }) => {
  const groups = { context: 'Context', health: 'Health', history: 'History' };
  const { stepIdx, step, phrase } = useLoop(true);
  const narration = LOOP_NARRATION[step.id][phrase].
  replace('{kcalSoFar}', '950').replace('{lastMeal}', '12:42').
  replace('{kcalNeed}', '850').replace('{pNeed}', '42').
  replace('{constraint}', persona.constraint.toLowerCase()).
  replace('{topPick}', 'a balanced plate');
  return (
    <div style={{ padding: '0 18px 100px' }}>
      <h3 style={sectionH}>Decision loop · live</h3>
      <div style={{ background: 'var(--surface)', borderRadius: 18, padding: 16, border: '0.5px solid var(--hairline)' }}>
        <LoopRibbon stepIdx={stepIdx} />
        <div style={{
          marginTop: 14, padding: '10px 12px',
          background: 'var(--surface-2)', borderRadius: 12,
          fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.4, minHeight: 32
        }} key={`${step.id}-${phrase}`}>{narration}</div>
      </div>

      <h3 style={sectionH}>Connectors</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(groups).map(([gid, gname]) =>
        <div key={gid}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6, paddingLeft: 4 }}>
              {gname}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CONNECTORS.filter((c) => c.group === gid).map((c) => {
              const used = persona.connectors.includes(c.id);
              return (
                <div key={c.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 14px', borderRadius: 12,
                  background: 'var(--surface)', border: '0.5px solid var(--hairline)',
                  opacity: used ? 1 : 0.55
                }}>
                    <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: used ? 'var(--sage-soft)' : 'var(--surface-2)',
                    color: used ? 'var(--sage)' : 'var(--muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                      <Icon k={c.icon} size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1 }}>{c.sub}</div>
                    </div>
                    {used ?
                  <span className="mono" style={{ fontSize: 10, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: 0.6 }}>Linked</span> :
                  <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>Off</span>}
                  </div>);

            })}
            </div>
          </div>
        )}
      </div>

      <h3 style={sectionH}>Delivery platforms</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {PLATFORMS.map((p) =>
        <div key={p.id} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 14px', borderRadius: 12,
          background: 'var(--surface)', border: '0.5px solid var(--hairline)'
        }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1 }}>{p.status} · {p.latency}s avg</div>
            </div>
            <Icon k="chev-r" size={16} stroke="var(--muted)" />
          </div>
        )}
      </div>
    </div>);

};

/* ─────────────────── Log screen ─────────────────── */
const LogScreen = ({ persona }) => {
  const consumed = persona.meals.filter((m) => m.status === 'delivered' || m.status === 'enroute');
  const kcal = consumed.reduce((s, m) => s + (m.kcal || 0), 0);
  const t = persona.dailyTarget;
  const p = Math.round(kcal * 0.25 / 4);
  const c = Math.round(kcal * 0.55 / 4);
  const f = Math.round(kcal * 0.20 / 9);
  const macroBars = [
  { l: 'Protein', v: p, t: t.p, color: 'var(--sage)' },
  { l: 'Carbs', v: c, t: t.c, color: 'var(--clay)' },
  { l: 'Fat', v: f, t: t.f, color: 'var(--ink)' }];

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
          <div style={{ width: `${Math.min(100, kcal / t.kcal * 100)}%`, height: '100%', background: 'var(--ink)' }} />
        </div>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {macroBars.map((m) =>
          <div key={m.l}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-2)', marginBottom: 4 }}>
                <span>{m.l}</span>
                <span className="mono tnum"><span style={{ color: 'var(--ink)', fontWeight: 600 }}>{m.v}</span><span style={{ color: 'var(--muted)' }}> / {m.t}g</span></span>
              </div>
              <div style={{ height: 6, background: 'var(--hairline-2)', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, m.v / m.t * 100)}%`, height: '100%', background: m.color }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <h3 style={sectionH}>Spend · this week</h3>
      <div style={{ background: 'var(--surface)', borderRadius: 18, padding: 16, border: '0.5px solid var(--hairline)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="serif tnum" style={{ fontSize: 28, color: 'var(--ink)' }}>$184.20</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>of $350 budget</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginTop: 14, height: 64 }}>
          {[42, 38, 28, 0, 36, 22, 18].map((v, i) => {
            const today = i === 6;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: '100%', height: `${v / 50 * 100}%`, borderRadius: 3,
                  background: today ? 'var(--ink)' : 'var(--sage)',
                  opacity: v === 0 ? 0.25 : 1,
                  minHeight: v > 0 ? 2 : 6
                }} />
                <span className="mono" style={{ fontSize: 9, color: today ? 'var(--ink)' : 'var(--muted)', letterSpacing: 0.4 }}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>);

          })}
        </div>
      </div>

      <h3 style={sectionH}>Agent decisions · 7d</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
        { v: 21, l: 'meals decided' },
        { v: 19, l: 'autoplaced' },
        { v: 2, l: 'you swapped' }].
        map((s) =>
        <div key={s.l} style={{ padding: 14, borderRadius: 14, background: 'var(--surface)', border: '0.5px solid var(--hairline)' }}>
            <div className="serif tnum" style={{ fontSize: 28, color: 'var(--ink)' }}>{s.v}</div>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 2 }}>{s.l}</div>
          </div>
        )}
      </div>
    </div>);

};

/* ─────────────────── Settings screen ─────────────────── */
const SettingsScreen = ({ persona, autonomy, setAutonomy }) => {
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
        <AutonomyDial value={autonomy} onChange={setAutonomy} />
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
        { l: 'fat', v: persona.dailyTarget.f + 'g' }].
        map((x) =>
        <div key={x.l} style={{ padding: 12, borderRadius: 12, background: 'var(--surface)', border: '0.5px solid var(--hairline)' }}>
            <div className="serif tnum" style={{ fontSize: 20, color: 'var(--ink)' }}>{x.v}</div>
            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 1 }}>{x.l}</div>
          </div>
        )}
      </div>

      <h3 style={sectionH}>Payment & restrictions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
        { l: 'Payment', v: 'DBS Visa ••4419' },
        { l: 'Daily spend cap', v: '$50.00' },
        { l: 'Allergies', v: 'Shellfish' },
        { l: 'Avoid restaurants', v: '3 blocked' }].
        map((r) =>
        <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'var(--surface)', borderRadius: 12, border: '0.5px solid var(--hairline)' }}>
            <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>{r.l}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{r.v}</span>
              <Icon k="chev-r" size={14} stroke="var(--muted)" />
            </span>
          </div>
        )}
      </div>
    </div>);

};

const AutonomyDial = ({ value, onChange }) =>
<div>
    <div style={{ display: 'flex', gap: 4 }}>
      {AUTONOMY_LEVELS.map((a) => {
      const active = a.id === value;
      return (
        <button key={a.id} onClick={() => onChange(a.id)} style={{
          flex: 1, padding: '12px 4px', border: 'none', cursor: 'pointer',
          borderRadius: 10,
          background: active ? 'var(--ink)' : 'var(--surface-2)',
          color: active ? 'var(--bg)' : 'var(--ink-2)',
          fontFamily: 'inherit',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          transition: 'background 0.18s'
        }}>
            <span style={{ fontSize: 14 }}>{a.icon}</span>
            <span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: 0.2 }}>{a.name}</span>
          </button>);

    })}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, padding: '0 4px' }}>
      <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>more control</span>
      <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6 }}>more autonomy</span>
    </div>
  </div>;


Object.assign(window, {
  Icon, BrandMark, Pill, NowPanel, TimelineRow, MealSheet,
  TodayScreen, BrainScreen, LogScreen, SettingsScreen, AutonomyDial,
  PersonaPill, LoopRibbon, useLoop
});