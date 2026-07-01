import { useState as _obUseState, useEffect as _obUseEffect, useRef as _obUseRef } from 'react'
import { Icon, Pill } from './screens.jsx'

/* ───────────── shared styles ───────────── */
export const obPrimaryBtn = {
  width: '100%', padding: '15px', borderRadius: 14, border: 'none',
  background: 'var(--ink)', color: 'var(--bg)',
  fontFamily: 'inherit', fontSize: 15.5, fontWeight: 600, letterSpacing: 0.2,
  cursor: 'pointer', transition: 'opacity 0.18s, transform 0.1s',
}
export const obTextBtn = {
  background: 'transparent', border: 'none', color: 'var(--muted)',
  fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
  padding: '8px 4px',
}
export const obEyebrow = {
  fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: 1.6,
  textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500,
}
export const obTitle = {
  fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 33,
  lineHeight: 1.08, color: 'var(--ink)', letterSpacing: 0.2, margin: '12px 0 0',
  whiteSpace: 'nowrap',
}
export const obBody = {
  fontSize: 14.5, lineHeight: 1.5, color: 'var(--ink-2)', margin: '10px 0 0',
  textWrap: 'pretty',
}
export const obSectionH = {
  fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: 1.2,
  color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 500,
  margin: '24px 0 10px',
}

/* ───────────── Progress bar ───────────── */
export function ObProgress({ step, total }) {
  return (
    <div style={{ flex: 1, display: 'flex', gap: 5, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 100,
          background: i < step ? 'var(--ink)' : i === step ? 'var(--sage)' : 'var(--hairline)',
          transition: 'background 0.3s ease',
        }}/>
      ))}
    </div>
  )
}

/* ───────────── Frame: header (back + progress) · scroll body · pinned footer ───────────── */
export function ObFrame({ progress, total, onBack, children, footer, animKey }) {
  return (
    <div style={{
      height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
      background: 'var(--bg)', position: 'relative',
    }}>
      <div style={{
        flex: '0 0 auto', padding: '60px 20px 6px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        {onBack ? (
          <button onClick={onBack} aria-label="Back" style={{
            flex: '0 0 auto', width: 34, height: 34, borderRadius: '50%',
            border: '0.5px solid var(--hairline)', background: 'var(--surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--ink)',
          }}><Icon k="chev-l" size={17} stroke="var(--ink)"/></button>
        ) : <div style={{ flex: '0 0 auto', width: 34, height: 34 }}/>}
        {progress != null
          ? <ObProgress step={progress} total={total}/>
          : <div style={{ flex: 1 }}/>}
        <div style={{ flex: '0 0 auto', width: 34 }}/>
      </div>

      <div className="scroll" key={animKey} style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        padding: '14px 24px 16px',
        animation: 'ob-push 0.32s cubic-bezier(0.2,0.8,0.2,1)',
      }}>
        {children}
      </div>

      {footer && (
        <div style={{
          flex: '0 0 auto', padding: '12px 24px 30px',
          background: 'linear-gradient(180deg, transparent, var(--bg) 32%)',
        }}>
          {footer}
        </div>
      )}
    </div>
  )
}

/* ───────────── Hero glyph tile (centered, soft-tinted) ───────────── */
export function ObHero({ icon, tone = 'sage', size = 76, children }) {
  const tint = tone === 'clay' ? 'var(--clay-soft)' : 'var(--sage-soft)'
  const fg = tone === 'clay' ? 'var(--clay)' : 'var(--sage)'
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: tint, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: 'inset 0 0 0 0.5px var(--hairline)',
    }}>
      {children || <Icon k={icon} size={size * 0.42} stroke={fg}/>}
    </div>
  )
}

/* ───────────── Feature row (icon · title · desc) ───────────── */
export function ObFeature({ icon, title, desc, tone = 'sage' }) {
  const tint = tone === 'clay' ? 'var(--clay-soft)' : 'var(--sage-soft)'
  const fg = tone === 'clay' ? 'var(--clay)' : 'var(--sage)'
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{
        flex: '0 0 auto', width: 40, height: 40, borderRadius: 11,
        background: tint, color: fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon k={icon} size={20} stroke={fg}/></div>
      <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3, lineHeight: 1.4 }}>{desc}</div>
      </div>
    </div>
  )
}

/* ───────────── Text field ───────────── */
export function ObField({ value, onChange, placeholder, type = 'text', inputMode, maxLength,
                   prefix, autoFocus, align = 'left', size = 'md', onEnter }) {
  const [focus, setFocus] = _obUseState(false)
  const fs = size === 'lg' ? 19 : 15.5
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 14px', minHeight: 54, borderRadius: 14,
      background: 'var(--surface)',
      border: `1px solid ${focus ? 'var(--ink)' : 'var(--hairline)'}`,
      boxShadow: focus ? '0 0 0 3px var(--sage-soft)' : 'none',
      transition: 'border-color 0.15s, box-shadow 0.15s',
    }}>
      {prefix && <span style={{ flex: '0 0 auto', fontSize: fs, color: 'var(--ink-2)', fontWeight: 500 }}>{prefix}</span>}
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={e => { if (e.key === 'Enter' && onEnter) onEnter() }}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        autoFocus={autoFocus}
        style={{
          flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'inherit', fontSize: fs, color: 'var(--ink)',
          textAlign: align, letterSpacing: align === 'center' ? 0.5 : 0,
          padding: '15px 0',
        }}
      />
    </div>
  )
}

/* ───────────── Segmented control ───────────── */
export function ObSegment({ value, options, onChange }) {
  return (
    <div style={{
      display: 'flex', padding: 4, borderRadius: 13, gap: 4,
      background: 'var(--surface-2)', border: '0.5px solid var(--hairline)',
    }}>
      {options.map(o => {
        const active = o.value === value
        return (
          <button key={o.value} onClick={() => onChange(o.value)} style={{
            flex: 1, padding: '10px 0', borderRadius: 9, border: 'none', cursor: 'pointer',
            background: active ? 'var(--surface)' : 'transparent',
            color: active ? 'var(--ink)' : 'var(--muted)',
            fontFamily: 'inherit', fontSize: 13.5, fontWeight: active ? 600 : 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.15s',
          }}>
            {o.icon && <Icon k={o.icon} size={15} stroke={active ? 'var(--ink)' : 'var(--muted)'}/>}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/* ───────────── OTP code input ───────────── */
export function ObOtp({ length = 6, value, onChange, variant = 'boxed', autoFocus, status }) {
  const refs = _obUseRef([])
  _obUseEffect(() => { if (autoFocus && refs.current[0]) refs.current[0].focus() }, [autoFocus])

  const setChar = (i, ch) => {
    const arr = value.split('')
    arr[i] = ch
    const next = arr.join('').slice(0, length)
    onChange(next)
  }

  const handleChange = (i, raw) => {
    const digits = raw.replace(/\D/g, '')
    if (!digits) { setChar(i, ''); return }
    if (digits.length > 1) {
      const next = (value.slice(0, i) + digits).replace(/\D/g, '').slice(0, length)
      onChange(next)
      const focusIdx = Math.min(next.length, length - 1)
      refs.current[focusIdx]?.focus()
      return
    }
    setChar(i, digits)
    if (i < length - 1) refs.current[i + 1]?.focus()
  }

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      refs.current[i - 1]?.focus()
      setChar(i - 1, '')
      e.preventDefault()
    }
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus()
  }

  const ok = status === 'ok'
  const err = status === 'error'
  const ring = ok ? 'var(--sage)' : err ? 'var(--danger)' : 'var(--ink)'

  return (
    <div style={{ display: 'flex', gap: variant === 'boxed' ? 9 : 12, justifyContent: 'center' }}>
      {Array.from({ length }).map((_, i) => {
        const ch = value[i] || ''
        const filled = !!ch
        const isFocusCell = i === Math.min(value.length, length - 1)
        if (variant === 'underline') {
          return (
            <div key={i} style={{ flex: 1, maxWidth: 46, position: 'relative' }}>
              <input
                ref={el => refs.current[i] = el}
                value={ch}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKey(i, e)}
                inputMode="numeric" maxLength={1}
                style={{
                  width: '100%', border: 'none', outline: 'none', background: 'transparent',
                  textAlign: 'center', fontFamily: 'Geist Mono, monospace',
                  fontSize: 28, color: ok ? 'var(--sage)' : err ? 'var(--danger)' : 'var(--ink)',
                  padding: '6px 0 10px',
                }}
              />
              <div style={{
                height: 2, borderRadius: 100,
                background: filled ? ring : 'var(--hairline)',
                transition: 'background 0.15s',
              }}/>
            </div>
          )
        }
        return (
          <input
            key={i}
            ref={el => refs.current[i] = el}
            value={ch}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKey(i, e)}
            inputMode="numeric" maxLength={1}
            style={{
              flex: 1, maxWidth: 48, height: 56, minWidth: 0,
              borderRadius: 13, textAlign: 'center',
              fontFamily: 'Geist Mono, monospace', fontSize: 24,
              color: ok ? 'var(--sage)' : err ? 'var(--danger)' : 'var(--ink)',
              background: 'var(--surface)',
              border: `1px solid ${filled ? ring : 'var(--hairline)'}`,
              boxShadow: (filled || isFocusCell) ? `0 0 0 3px ${ok ? 'var(--sage-soft)' : err ? 'rgba(200,60,40,0.12)' : 'var(--sage-soft)'}` : 'none',
              outline: 'none', transition: 'all 0.15s',
            }}
          />
        )
      })}
    </div>
  )
}

/* ───────────── Stepper (− value +) ───────────── */
export function ObStepper({ label, value, unit = '', min = 0, max = 9999, step = 1, onChange }) {
  const btn = (dir) => (
    <button onClick={() => onChange(Math.max(min, Math.min(max, value + dir * step)))} style={{
      flex: '0 0 auto', width: 34, height: 34, borderRadius: 9, cursor: 'pointer',
      border: '0.5px solid var(--hairline)', background: 'var(--surface-2)',
      color: 'var(--ink)', fontSize: 18, fontWeight: 500, lineHeight: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'inherit',
    }}>{dir < 0 ? '−' : '+'}</button>
  )
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
      padding: '10px 12px', borderRadius: 13,
      background: 'var(--surface)', border: '0.5px solid var(--hairline)',
    }}>
      <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {btn(-1)}
        <span className="mono tnum" style={{
          minWidth: 58, textAlign: 'center', fontSize: 15, fontWeight: 600, color: 'var(--ink)',
        }}>{value}{unit}</span>
        {btn(1)}
      </div>
    </div>
  )
}

/* ───────────── Switch ───────────── */
export function ObSwitch({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} role="switch" aria-checked={on} style={{
      flex: '0 0 auto', position: 'relative', width: 44, height: 26, borderRadius: 100,
      border: 'none', cursor: 'pointer', padding: 0,
      background: on ? 'var(--sage)' : 'var(--hairline)',
      transition: 'background 0.2s',
    }}>
      <span style={{
        position: 'absolute', top: 2, left: on ? 20 : 2, width: 22, height: 22,
        borderRadius: '50%', background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'left 0.2s cubic-bezier(0.3,0.7,0.4,1)',
      }}/>
    </button>
  )
}

/* ───────────── Selectable card (persona / option) ───────────── */
export function ObSelectCard({ selected, onClick, icon, tone = 'sage', title, sub, tag }) {
  const tint = tone === 'clay' ? 'var(--clay-soft)' : 'var(--sage-soft)'
  const fg = tone === 'clay' ? 'var(--clay)' : 'var(--sage)'
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
      display: 'flex', gap: 13, alignItems: 'center',
      padding: '13px 14px', borderRadius: 16,
      background: 'var(--surface)',
      border: `1px solid ${selected ? 'var(--ink)' : 'var(--hairline)'}`,
      boxShadow: selected ? '0 0 0 3px var(--sage-soft)' : 'var(--shadow)',
      transition: 'all 0.15s',
    }}>
      <div style={{
        flex: '0 0 auto', width: 44, height: 44, borderRadius: 12,
        background: tint, color: fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon k={icon} size={22} stroke={fg}/></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{title}</span>
          {tag && <Pill tone="ghost">{tag}</Pill>}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2, lineHeight: 1.35 }}>{sub}</div>
      </div>
      <div style={{
        flex: '0 0 auto', width: 22, height: 22, borderRadius: '50%',
        border: selected ? 'none' : '1.5px solid var(--hairline)',
        background: selected ? 'var(--ink)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.15s',
      }}>{selected && <Icon k="check" size={13} stroke="var(--bg)"/>}</div>
    </button>
  )
}

export const OB_ALLERGENS = [
  { id: 'shellfish', label: 'Shellfish', icon: 'shell' },
  { id: 'fish',      label: 'Fish',      icon: 'fish' },
  { id: 'peanut',    label: 'Peanut',    icon: 'peanut' },
  { id: 'treenut',   label: 'Tree nuts', icon: 'nut' },
  { id: 'milk',      label: 'Dairy',     icon: 'milk' },
  { id: 'egg',       label: 'Eggs',      icon: 'egg' },
  { id: 'gluten',    label: 'Gluten',    icon: 'wheat' },
  { id: 'soy',       label: 'Soy',       icon: 'soy' },
  { id: 'sesame',    label: 'Sesame',    icon: 'sesame' },
]

export const OB_PERSONA_META = {
  quarantined:  { icon: 'leaf',  tone: 'sage' },
  diabetic:     { icon: 'wave',  tone: 'clay' },
  athlete:      { icon: 'pulse', tone: 'sage' },
  busy_exec:    { icon: 'cal',   tone: 'sage' },
  caregiver:    { icon: 'rx',    tone: 'clay' },
  post_surgery: { icon: 'rx',    tone: 'clay' },
}
