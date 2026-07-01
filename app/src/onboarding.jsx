import { useState as _useState, useEffect as _useEffect, useRef as _useRef } from 'react'
import { PERSONAS, PERSONA_LIST, AUTONOMY_LEVELS, CONNECTORS } from './data.js'
import { Icon, BrandMark, LoopRibbon, useLoop } from './screens.jsx'
import {
  obPrimaryBtn, obTextBtn, obEyebrow, obTitle, obBody, obSectionH,
  ObFrame, ObHero, ObFeature, ObField, ObSegment, ObOtp,
  ObStepper, ObSwitch, ObSelectCard, OB_ALLERGENS, OB_PERSONA_META,
} from './ob-kit.jsx'

const OB_CORE = ['verify', 'situation', 'profile', 'connect', 'payment']

/* ════════════════════ 0 · WELCOME ════════════════════ */
function WelcomeStep({ variant, onNext }) {
  if (variant === 'editorial') {
    return (
      <ObFrame footer={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button style={obPrimaryBtn} onClick={onNext}>Get started</button>
          <div style={{ textAlign: 'center' }}>
            <button style={obTextBtn} onClick={onNext}>I already have an account</button>
          </div>
        </div>
      }>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', paddingTop: 8 }}>
          <BrandMark size={24}/>
          <div style={{ flex: 1 }}/>
          <div style={obEyebrow}>Autonomous food agent</div>
          <h1 className="serif" style={{
            fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 52, lineHeight: 1.02,
            color: 'var(--ink)', letterSpacing: 0.2, margin: '14px 0 0', textWrap: 'balance',
          }}>
            Eat well<br/>without<br/><span style={{ fontStyle: 'italic', color: 'var(--sage)' }}>deciding.</span>
          </h1>
          <p style={{ ...obBody, fontSize: 16, maxWidth: 300, marginTop: 18 }}>
            NOURI senses your day, picks the right meal, and orders it — so the
            decision is handled before you feel the hunger.
          </p>
          <div style={{ flex: 1 }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24, color: 'var(--muted)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)', animation: 'pulse-dot 1.4s ease-in-out infinite' }}/>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase' }}>
              Sense · Decide · Deliver
            </span>
          </div>
        </div>
      </ObFrame>
    )
  }
  return (
    <ObFrame footer={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button style={obPrimaryBtn} onClick={onNext}>Get started</button>
        <div style={{ textAlign: 'center' }}>
          <button style={obTextBtn} onClick={onNext}>I already have an account</button>
        </div>
      </div>
    }>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 14 }}>
        <ObHero size={84}>
          <BrandMark size={30} mono/>
        </ObHero>
        <div style={{ ...obEyebrow, marginTop: 22 }}>Welcome to</div>
        <h1 className="serif" style={{
          fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 44, lineHeight: 1,
          color: 'var(--ink)', letterSpacing: 0.3, margin: '6px 0 0', fontStyle: 'italic',
          textTransform: 'uppercase',
        }}>NOURI</h1>
        <p style={{ ...obBody, maxWidth: 280, marginTop: 12 }}>
          Your autonomous food agent. Here's what it does for you, every day.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 32, paddingBottom: 8 }}>
        <ObFeature icon="brain" tone="sage" title="Senses your context"
          desc="Calendar, location, health and budget — read in real time."/>
        <ObFeature icon="wave" tone="clay" title="Decides the right meal"
          desc="Scores hundreds of options against your needs and constraints."/>
        <ObFeature icon="plate" tone="sage" title="Orders & tracks it"
          desc="Places the order on your delivery apps and follows it to your door."/>
      </div>
    </ObFrame>
  )
}

/* ════════════════════ 1 · VERIFY (channel + entry) ════════════════════ */
const COUNTRIES = [
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+1',  flag: '🇺🇸', name: 'United States' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
]
function VerifyStep({ channelMode, channel, setChannel, phone, setPhone, email, setEmail,
                      cc, setCc, onBack, onContinue }) {
  const [ccOpen, setCcOpen] = _useState(false)
  const phoneDigits = phone.replace(/\D/g, '')
  const valid = channel === 'phone'
    ? phoneDigits.length >= 7
    : /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())

  return (
    <ObFrame progress={0} total={OB_CORE.length} onBack={onBack} footer={
      <button style={{ ...obPrimaryBtn, opacity: valid ? 1 : 0.4, cursor: valid ? 'pointer' : 'default' }}
              disabled={!valid} onClick={onContinue}>Send code</button>
    }>
      <ObHero icon="rx" tone="sage" size={64}/>
      <h1 style={obTitle}>Verify it's you</h1>
      <p style={obBody}>
        We'll send a one-time code to confirm your account. NOURI handles payments,
        so this keeps your agent secure.
      </p>

      {channelMode === 'choice' && (
        <div style={{ marginTop: 22 }}>
          <ObSegment value={channel} onChange={setChannel} options={[
            { value: 'phone', label: 'Phone', icon: 'pin' },
            { value: 'email', label: 'Email', icon: 'archive' },
          ]}/>
        </div>
      )}

      <div style={{ marginTop: 14 }}>
        {channel === 'phone' ? (
          <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
            <button onClick={() => setCcOpen(o => !o)} style={{
              flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 6,
              padding: '0 14px', minHeight: 54, borderRadius: 14, cursor: 'pointer',
              background: 'var(--surface)', border: '1px solid var(--hairline)',
              fontFamily: 'inherit', fontSize: 15.5, color: 'var(--ink)', fontWeight: 500,
            }}>
              <span style={{ fontSize: 18 }}>{COUNTRIES.find(c => c.code === cc)?.flag}</span>
              {cc}
              <Icon k="chev-d" size={14} stroke="var(--muted)"/>
            </button>
            <div style={{ flex: 1 }}>
              <ObField value={phone} onChange={v => setPhone(v.replace(/[^\d\s]/g, ''))}
                placeholder="9123 4567" inputMode="tel" autoFocus
                onEnter={() => valid && onContinue()}/>
            </div>
            {ccOpen && (
              <div style={{
                position: 'absolute', top: 60, left: 0, zIndex: 30, width: 220,
                background: 'var(--surface)', borderRadius: 14, padding: 6,
                border: '0.5px solid var(--hairline)', boxShadow: 'var(--shadow)',
              }}>
                {COUNTRIES.map(c => (
                  <button key={c.code} onClick={() => { setCc(c.code); setCcOpen(false) }} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 10px', borderRadius: 9, border: 'none', cursor: 'pointer',
                    background: c.code === cc ? 'var(--surface-2)' : 'transparent',
                    fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)', textAlign: 'left',
                  }}>
                    <span style={{ fontSize: 18 }}>{c.flag}</span>
                    <span style={{ flex: 1 }}>{c.name}</span>
                    <span className="mono" style={{ color: 'var(--muted)', fontSize: 12.5 }}>{c.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <ObField value={email} onChange={setEmail} placeholder="you@email.com"
            type="email" inputMode="email" autoFocus onEnter={() => valid && onContinue()}/>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, color: 'var(--muted)' }}>
        <Icon k="check" size={14} stroke="var(--sage)"/>
        <span style={{ fontSize: 12, lineHeight: 1.4 }}>
          Standard rates may apply. We never share your contact details.
        </span>
      </div>
    </ObFrame>
  )
}

/* ════════════════════ 1b · OTP ════════════════════ */
function OtpStep({ destination, otpStyle, onBack, onVerified, onChangeDest }) {
  const [code, setCode] = _useState('')
  const [status, setStatus] = _useState('idle')
  const [secs, setSecs] = _useState(30)
  const startedRef = _useRef(false)

  _useEffect(() => {
    if (secs <= 0) return
    const t = setTimeout(() => setSecs(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secs])

  const runVerify = () => {
    if (startedRef.current || code.length !== 6) return
    startedRef.current = true
    setStatus('verifying')
    setTimeout(() => {
      setStatus('ok')
      setTimeout(onVerified, 700)
    }, 950)
  }

  _useEffect(() => {
    if (code.length === 6 && !startedRef.current) runVerify()
  }, [code])

  return (
    <ObFrame progress={0} total={OB_CORE.length} onBack={onBack} footer={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button style={{ ...obPrimaryBtn, opacity: code.length === 6 ? 1 : 0.4, cursor: code.length === 6 ? 'pointer' : 'default' }}
                disabled={code.length !== 6 || status !== 'idle'}
                onClick={runVerify}>
          {status === 'verifying' ? 'Verifying…' : status === 'ok' ? 'Verified' : 'Verify'}
        </button>
        <div style={{ textAlign: 'center' }}>
          <button style={{ ...obTextBtn, color: secs > 0 ? 'var(--muted)' : 'var(--ink)' }}
                  disabled={secs > 0}
                  onClick={() => { setSecs(30); setCode(''); setStatus('idle'); startedRef.current = false }}>
            {secs > 0 ? `Resend code in 0:${String(secs).padStart(2, '0')}` : 'Resend code'}
          </button>
        </div>
      </div>
    }>
      <ObHero icon={status === 'ok' ? 'check' : 'wave'} tone={status === 'error' ? 'clay' : 'sage'} size={64}/>
      <h1 style={obTitle}>Enter the code</h1>
      <p style={obBody}>
        We sent a 6-digit code to <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{destination}</span>.
      </p>

      <div style={{ marginTop: 26 }}>
        <ObOtp value={code} onChange={c => { setCode(c); if (status === 'error') setStatus('idle') }}
               variant={otpStyle} autoFocus status={status === 'ok' ? 'ok' : status === 'error' ? 'error' : undefined}/>
      </div>

      <div style={{ height: 22, marginTop: 14, textAlign: 'center' }}>
        {status === 'verifying' && (
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 0.8, textTransform: 'uppercase' }}>
            Checking code…
          </span>
        )}
        {status === 'ok' && (
          <span className="mono" style={{ fontSize: 11, color: 'var(--sage)', letterSpacing: 0.8, textTransform: 'uppercase' }}>
            ✓ Account verified
          </span>
        )}
        {status === 'idle' && (
          <button onClick={onChangeDest} style={obTextBtn}>Wrong details? Change</button>
        )}
      </div>

      <div style={{
        marginTop: 16, padding: '10px 12px', borderRadius: 12, background: 'var(--surface-2)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span className="mono" style={{
          flex: '0 0 auto', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase',
          color: 'var(--muted)', border: '0.5px solid var(--hairline)', borderRadius: 5, padding: '3px 6px',
        }}>Demo</span>
        <span style={{ fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.4 }}>
          Enter any 6 digits to continue.
        </span>
      </div>
    </ObFrame>
  )
}

/* ════════════════════ 2 · SITUATION (persona template) ════════════════════ */
function SituationStep({ selected, onSelect, onBack, onContinue }) {
  return (
    <ObFrame progress={1} total={OB_CORE.length} onBack={onBack} footer={
      <button style={{ ...obPrimaryBtn, opacity: selected ? 1 : 0.4, cursor: selected ? 'pointer' : 'default' }}
              disabled={!selected} onClick={onContinue}>Use this as my template</button>
    }>
      <h1 style={obTitle}>Your starting point</h1>
      <p style={obBody}>
        Choose the situation closest to you. NOURI loads it as a template — diet,
        targets and data sources — then you'll fine-tune everything next.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 22 }}>
        {PERSONA_LIST.map(id => {
          const p = PERSONAS[id]
          const meta = OB_PERSONA_META[id]
          return (
            <ObSelectCard key={id} selected={selected === id} onClick={() => onSelect(id)}
              icon={meta.icon} tone={meta.tone} title={p.full} sub={p.blurb}/>
          )
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '18px 2px 4px', color: 'var(--muted)' }}>
        <Icon k="leaf" size={14} stroke="var(--muted)"/>
        <span style={{ fontSize: 12, lineHeight: 1.4 }}>
          Not sure? Pick the closest — nothing here is locked in.
        </span>
      </div>
    </ObFrame>
  )
}

/* ════════════════════ 3 · PROFILE (name · allergies · targets) ════════════════════ */
function ProfileStep({ persona, profile, setProfile, onBack, onContinue }) {
  const toggleAllergen = (id) => setProfile(p => ({
    ...p, allergens: { ...p.allergens, [id]: !p.allergens[id] },
  }))
  const setTarget = (k, v) => setProfile(p => ({ ...p, targets: { ...p.targets, [k]: v } }))
  const activeCount = Object.values(profile.allergens).filter(Boolean).length

  return (
    <ObFrame progress={2} total={OB_CORE.length} onBack={onBack} footer={
      <button style={obPrimaryBtn} onClick={onContinue}>Continue</button>
    }>
      <h1 style={obTitle}>Build your profile</h1>
      <p style={obBody}>
        Prefilled from <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{persona.full}</span>. Adjust
        anything — you can change it later, too.
      </p>

      <h3 style={obSectionH}>Your name</h3>
      <ObField value={profile.name} onChange={v => setProfile(p => ({ ...p, name: v }))}
        placeholder="What should NOURI call you?"/>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={obSectionH}>Allergies & avoids</h3>
        <span className="mono" style={{ fontSize: 10.5, color: activeCount ? 'var(--clay)' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 24 }}>
          {activeCount} blocked
        </span>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '-2px 2px 12px', lineHeight: 1.4 }}>
        NOURI hard-blocks orders containing anything you mark.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {OB_ALLERGENS.map(a => {
          const on = !!profile.allergens[a.id]
          return (
            <button key={a.id} onClick={() => toggleAllergen(a.id)} style={{
              padding: '14px 6px', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
              border: `1px solid ${on ? 'var(--ink)' : 'var(--hairline)'}`,
              background: on ? 'var(--ink)' : 'var(--surface)',
              color: on ? 'var(--bg)' : 'var(--ink)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
              position: 'relative', transition: 'all 0.16s',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: on ? 'rgba(255,255,255,0.12)' : 'var(--surface-2)',
                color: on ? 'var(--bg)' : 'var(--ink-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon k={a.icon} size={19} stroke={on ? 'var(--bg)' : 'var(--ink-2)'}/></div>
              <span style={{ fontSize: 11.5, fontWeight: 500 }}>{a.label}</span>
              {on && (
                <div style={{
                  position: 'absolute', top: 7, right: 7, width: 15, height: 15, borderRadius: '50%',
                  background: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon k="check" size={10} stroke="var(--ink)"/></div>
              )}
            </button>
          )
        })}
      </div>

      <h3 style={obSectionH}>Daily targets</h3>
      <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '-2px 2px 12px', lineHeight: 1.4 }}>
        Set from your situation. NOURI balances every order against these.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ObStepper label="Calories"  value={profile.targets.kcal} unit=" kcal" min={800} max={4000} step={50} onChange={v => setTarget('kcal', v)}/>
        <ObStepper label="Protein"   value={profile.targets.p} unit="g" min={20} max={300} step={5} onChange={v => setTarget('p', v)}/>
        <ObStepper label="Carbs"     value={profile.targets.c} unit="g" min={20} max={500} step={5} onChange={v => setTarget('c', v)}/>
        <ObStepper label="Fat"       value={profile.targets.f} unit="g" min={10} max={200} step={5} onChange={v => setTarget('f', v)}/>
      </div>
    </ObFrame>
  )
}

/* ════════════════════ 4 · CONNECT ════════════════════ */
function ConnectStep({ persona, enabled, setEnabled, onBack, onContinue }) {
  const groups = { context: 'Context', health: 'Health', history: 'History' }
  const toggle = (id) => setEnabled(e => ({ ...e, [id]: !e[id] }))
  const count = Object.values(enabled).filter(Boolean).length

  return (
    <ObFrame progress={3} total={OB_CORE.length} onBack={onBack} footer={
      <button style={obPrimaryBtn} onClick={onContinue}>
        {count > 0 ? `Connect ${count} source${count > 1 ? 's' : ''}` : 'Continue without sources'}
      </button>
    }>
      <h1 style={obTitle}>Connect your world</h1>
      <p style={obBody}>
        These let NOURI sense context and decide better. We've switched on the ones
        recommended for <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{persona.full}</span>.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22 }}>
        {Object.entries(groups).map(([gid, gname]) => (
          <div key={gid}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 7, paddingLeft: 2 }}>
              {gname}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {CONNECTORS.filter(c => c.group === gid).map(c => {
                const on = !!enabled[c.id]
                return (
                  <div key={c.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 14px', borderRadius: 13,
                    background: 'var(--surface)',
                    border: `1px solid ${on ? 'var(--sage)' : 'var(--hairline)'}`,
                    transition: 'border-color 0.18s',
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 9,
                      background: on ? 'var(--sage-soft)' : 'var(--surface-2)',
                      color: on ? 'var(--sage)' : 'var(--muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}><Icon k={c.icon} size={17} stroke={on ? 'var(--sage)' : 'var(--muted)'}/></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 1 }}>{c.sub}</div>
                    </div>
                    <ObSwitch on={on} onChange={() => toggle(c.id)}/>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </ObFrame>
  )
}

/* ════════════════════ 5 · PAYMENT ════════════════════ */
function PaymentStep({ payment, setPayment, onBack, onContinue }) {
  const fmtCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const fmtExp = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }
  const cardDigits = payment.card.replace(/\D/g, '')
  const valid = cardDigits.length >= 15 && payment.exp.length === 5 && payment.cvc.length >= 3

  return (
    <ObFrame progress={4} total={OB_CORE.length} onBack={onBack} footer={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button style={{ ...obPrimaryBtn, opacity: valid ? 1 : 0.4, cursor: valid ? 'pointer' : 'default' }}
                disabled={!valid} onClick={onContinue}>Add card & finish</button>
        <div style={{ textAlign: 'center' }}>
          <button style={obTextBtn} onClick={onContinue}>I'll add this later</button>
        </div>
      </div>
    }>
      <ObHero icon="wallet" tone="sage" size={64}/>
      <h1 style={obTitle}>Add a payment method</h1>
      <p style={obBody}>
        NOURI orders on your behalf — never above your daily cap. You approve the
        autonomy level inside the app.
      </p>

      <div style={{
        marginTop: 22, borderRadius: 18, padding: '18px 20px',
        background: 'var(--ink)', color: 'var(--bg)', position: 'relative', overflow: 'hidden',
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.7 }}>NOURI · linked card</span>
          <div style={{ width: 30, height: 20, borderRadius: 4, background: 'var(--sage)', opacity: 0.9 }}/>
        </div>
        <div className="mono tnum" style={{ fontSize: 19, letterSpacing: 2, marginTop: 22 }}>
          {fmtCard(payment.card) || '•••• •••• •••• ••••'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 12, opacity: 0.8 }}>
          <span className="mono">{payment.name || 'CARDHOLDER'}</span>
          <span className="mono">{payment.exp || 'MM/YY'}</span>
        </div>
      </div>

      <h3 style={obSectionH}>Card details</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ObField value={fmtCard(payment.card)} onChange={v => setPayment(p => ({ ...p, card: v }))}
          placeholder="Card number" inputMode="numeric"/>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <ObField value={payment.exp} onChange={v => setPayment(p => ({ ...p, exp: fmtExp(v) }))}
              placeholder="MM/YY" inputMode="numeric"/>
          </div>
          <div style={{ flex: 1 }}>
            <ObField value={payment.cvc} onChange={v => setPayment(p => ({ ...p, cvc: v.replace(/\D/g, '').slice(0, 4) }))}
              placeholder="CVC" inputMode="numeric"/>
          </div>
        </div>
        <ObField value={payment.name} onChange={v => setPayment(p => ({ ...p, name: v }))}
          placeholder="Name on card"/>
      </div>

      <h3 style={obSectionH}>Daily spend cap</h3>
      <ObStepper label="NOURI won't spend more than" value={payment.cap} unit="" min={10} max={200} step={5}
        onChange={v => setPayment(p => ({ ...p, cap: v }))}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: 'var(--muted)' }}>
        <Icon k="check" size={14} stroke="var(--sage)"/>
        <span style={{ fontSize: 11.5, lineHeight: 1.4 }}>Encrypted & tokenised. NOURI never stores your full card number.</span>
      </div>
    </ObFrame>
  )
}

/* ════════════════════ 6 · READY ════════════════════ */
function ReadyStep({ persona, profile, payment, autonomy, onEnter }) {
  const [phase, setPhase] = _useState('calibrating')
  const { stepIdx } = useLoop(phase === 'calibrating')

  _useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 2600)
    return () => clearTimeout(t)
  }, [])

  const lvl = AUTONOMY_LEVELS[autonomy]

  return (
    <ObFrame footer={phase === 'ready' ? (
      <button style={obPrimaryBtn} onClick={onEnter}>
        {profile.name ? `Enter NOURI, ${profile.name.split(' ')[0]}` : 'Enter NOURI'}
      </button>
    ) : null}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '100%' }}>
        <div style={{ flex: '0 0 18px' }}/>
        <ObHero tone="sage" size={88}>
          {phase === 'ready'
            ? <Icon k="check" size={40} stroke="var(--sage)"/>
            : <div style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '3px solid var(--hairline)', borderTopColor: 'var(--sage)',
                animation: 'ring-spin 0.9s linear infinite',
              }}/>}
        </ObHero>

        <div style={{ ...obEyebrow, marginTop: 24, color: phase === 'ready' ? 'var(--sage)' : 'var(--muted)' }}>
          {phase === 'ready' ? 'Setup complete' : 'Building your food brain'}
        </div>
        <h1 className="serif" style={{
          fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 36, lineHeight: 1.05,
          color: 'var(--ink)', margin: '8px 0 0', whiteSpace: 'nowrap',
        }}>
          {phase === 'ready' ? 'NOURI is ready.' : 'Calibrating your agent…'}
        </h1>

        {phase === 'calibrating' && (
          <div style={{ width: '100%', marginTop: 30 }}>
            <LoopRibbon stepIdx={stepIdx}/>
          </div>
        )}

        {phase === 'ready' && (
          <>
            <p style={{ ...obBody, maxWidth: 290 }}>
              Your agent is live. It will sense your day and decide your next meal —
              you stay in control of how much it does on its own.
            </p>
            <div style={{ width: '100%', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <ObSummaryRow icon="leaf"   label="Situation" value={persona.name}/>
              <ObSummaryRow icon="flame"  label="Daily target" value={`${profile.targets.kcal} kcal`}/>
              <ObSummaryRow icon={lvl.id >= 2 ? 'check' : 'dot'} label="Autonomy" value={lvl.name}/>
              <ObSummaryRow icon="wallet" label="Spend cap" value={`$${payment.cap}.00 / day`}/>
            </div>
          </>
        )}
        <div style={{ flex: 1 }}/>
      </div>
    </ObFrame>
  )
}

function ObSummaryRow({ icon, label, value }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
      borderRadius: 13, background: 'var(--surface)', border: '0.5px solid var(--hairline)',
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8, background: 'var(--sage-soft)', color: 'var(--sage)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon k={icon} size={16} stroke="var(--sage)"/></div>
      <span style={{ flex: 1, textAlign: 'left', fontSize: 13.5, color: 'var(--muted)' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{value}</span>
    </div>
  )
}

/* ════════════════════ FLOW CONTROLLER ════════════════════ */
export function OnboardingFlow({ welcomeStyle = 'features', otpStyle = 'boxed', channelMode = 'choice',
                          onComplete }) {
  const [stage, setStage] = _useState('welcome')
  const [channel, setChannel] = _useState(channelMode === 'email' ? 'email' : 'phone')
  const [cc, setCc] = _useState('+65')
  const [phone, setPhone] = _useState('')
  const [email, setEmail] = _useState('')
  const [personaId, setPersonaId] = _useState(null)
  const [profile, setProfile] = _useState({
    name: '', allergens: {}, targets: { kcal: 2000, p: 110, c: 230, f: 65 },
  })
  const [connectors, setConnectors] = _useState({})
  const [payment, setPayment] = _useState({ card: '', exp: '', cvc: '', name: '', cap: 50 })

  _useEffect(() => {
    if (channelMode === 'phone') setChannel('phone')
    if (channelMode === 'email') setChannel('email')
  }, [channelMode])

  const destination = channel === 'phone'
    ? `${cc} ${'•'.repeat(Math.max(0, phone.replace(/\D/g, '').length - 4)).replace(/(.{4})/g, '$1 ').trim()} ${phone.replace(/\D/g, '').slice(-4)}`.replace(/\s+/g, ' ').trim()
    : (() => { const [u, d] = email.split('@'); return u ? `${u[0]}${'•'.repeat(Math.max(1, u.length - 1))}@${d || ''}` : email })()

  const applyPersona = (id) => {
    setPersonaId(id)
    const p = PERSONAS[id]
    setProfile(prev => ({
      ...prev,
      targets: { ...p.dailyTarget },
      allergens: id === 'caregiver' || id === 'quarantined' ? { shellfish: true } : prev.allergens,
    }))
    const seed = {}
    p.connectors.forEach(c => { seed[c] = true })
    setConnectors(seed)
  }

  const persona = personaId ? PERSONAS[personaId] : null
  const autonomy = persona ? persona.autonomyDefault : 1

  const finish = () => onComplete({ personaId, autonomy, profile, connectors, payment })

  switch (stage) {
    case 'welcome':
      return <WelcomeStep variant={welcomeStyle} onNext={() => setStage('verify')}/>
    case 'verify':
      return <VerifyStep channelMode={channelMode} channel={channel} setChannel={setChannel}
        phone={phone} setPhone={setPhone} email={email} setEmail={setEmail} cc={cc} setCc={setCc}
        onBack={() => setStage('welcome')} onContinue={() => setStage('otp')}/>
    case 'otp':
      return <OtpStep destination={destination} otpStyle={otpStyle}
        onBack={() => setStage('verify')} onChangeDest={() => setStage('verify')}
        onVerified={() => setStage('situation')}/>
    case 'situation':
      return <SituationStep selected={personaId} onSelect={applyPersona}
        onBack={() => setStage('otp')} onContinue={() => setStage('profile')}/>
    case 'profile':
      return <ProfileStep persona={persona} profile={profile} setProfile={setProfile}
        onBack={() => setStage('situation')} onContinue={() => setStage('connect')}/>
    case 'connect':
      return <ConnectStep persona={persona} enabled={connectors} setEnabled={setConnectors}
        onBack={() => setStage('profile')} onContinue={() => setStage('payment')}/>
    case 'payment':
      return <PaymentStep payment={payment} setPayment={setPayment}
        onBack={() => setStage('connect')} onContinue={() => setStage('ready')}/>
    case 'ready':
      return <ReadyStep persona={persona} profile={profile} payment={payment}
        autonomy={autonomy} onEnter={finish}/>
    default:
      return null
  }
}
