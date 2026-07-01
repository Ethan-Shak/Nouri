import { useState, useEffect } from 'react'
import { PERSONAS, PERSONA_LIST, AUTONOMY_LEVELS } from './data.js'
import { IOSDevice } from './ios-frame.jsx'
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakButton } from './tweaks-panel.jsx'
import {
  Icon, BrandMark, Pill,
  TodayScreen, BrainScreen, LogScreen, SettingsScreen,
  MealSheet, AllergiesScreen, SpendDetailScreen,
} from './screens.jsx'
import { OnboardingFlow } from './onboarding.jsx'

const PHONE_W = 402
const PHONE_H = 874

const TWEAK_DEFAULTS = {
  persona: 'quarantined',
  autonomy: 3,
  hour: 12,
  theme: 'light',
  welcomeStyle: 'features',
  otpStyle: 'boxed',
  verifyChannel: 'choice',
}

const TopBar = ({ autonomy }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '4px 22px 12px',
  }}>
    <BrandMark size={20}/>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Pill tone="ghost">
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: autonomy >= 2 ? 'var(--sage)' : 'var(--clay)',
        }}/>
        <span>{AUTONOMY_LEVELS[autonomy].name}</span>
      </Pill>
    </div>
  </div>
)

const BottomNav = ({ tab, setTab }) => {
  const tabs = [
    { id: 'today',    label: 'Today', icon: 'home' },
    { id: 'brain',    label: 'Brain', icon: 'brain' },
    { id: 'log',      label: 'Log',   icon: 'plate' },
    { id: 'settings', label: 'You',   icon: 'gear' },
  ]
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, bottom: 34,
      borderRadius: 22, padding: 6,
      background: 'var(--surface)',
      border: '0.5px solid var(--hairline)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05)',
      display: 'flex', justifyContent: 'space-around',
      zIndex: 50,
      backdropFilter: 'blur(12px) saturate(180%)',
    }}>
      {tabs.map(t => {
        const active = t.id === tab
        return (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '8px 0 6px', border: 'none', cursor: 'pointer',
            background: active ? 'var(--surface-2)' : 'transparent',
            borderRadius: 16, color: active ? 'var(--ink)' : 'var(--muted)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            fontFamily: 'inherit',
          }}>
            <Icon k={t.icon} size={20} stroke={active ? 'var(--ink)' : 'var(--muted)'}/>
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 500, letterSpacing: 0.2 }}>
              {t.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS)

  const [tab, setTab] = useState('today')
  const [sheet, setSheet] = useState(null)
  const [subpage, setSubpage] = useState(null)

  const [view, setView] = useState('onboarding')
  const [obKey, setObKey] = useState(0)
  const [userName, setUserName] = useState('')

  const finishOnboarding = ({ personaId, autonomy, profile }) => {
    if (personaId) {
      setTweak('persona', personaId)
      setTweak('autonomy', autonomy)
    }
    if (profile?.name) setUserName(profile.name)
    setTab('today')
    setView('app')
  }
  const replayOnboarding = () => { setObKey(k => k + 1); setView('onboarding') }

  const persona = PERSONAS[t.persona] || PERSONAS.quarantined
  const autonomy = t.autonomy

  const openMeal = (meal) => setSheet({ meal, initialStage: 'review' })
  const approveMeal = (meal) => setSheet({ meal, initialStage: 'placing' })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme)
    document.body.setAttribute('data-stage-dark', t.theme === 'dark' ? '1' : '0')
  }, [t.theme])

  const [scale, setScale] = useState(1)
  useEffect(() => {
    const recalc = () => {
      const padX = 60, padY = 60
      const sx = (window.innerWidth - padX) / PHONE_W
      const sy = (window.innerHeight - padY) / PHONE_H
      setScale(Math.min(1, sx, sy))
    }
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [])

  const dark = t.theme === 'dark'

  return (
    <>
      <div style={{
        width: PHONE_W * scale,
        height: PHONE_H * scale,
        position: 'relative',
      }}>
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: PHONE_W, height: PHONE_H,
        }}>
          <IOSDevice width={PHONE_W} height={PHONE_H} dark={dark}>
            {view === 'onboarding' ? (
              <div style={{
                background: 'var(--bg)', color: 'var(--ink)',
                height: '100%', width: '100%', position: 'relative', overflow: 'hidden',
              }}>
                <OnboardingFlow
                  key={obKey}
                  welcomeStyle={t.welcomeStyle}
                  otpStyle={t.otpStyle}
                  channelMode={t.verifyChannel}
                  onComplete={finishOnboarding}
                />
              </div>
            ) : (
              <div style={{
                background: 'var(--bg)', color: 'var(--ink)',
                height: '100%', width: '100%', position: 'relative',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
              }}>
                <div style={{ paddingTop: 58, flex: '0 0 auto' }}>
                  <TopBar autonomy={autonomy}/>
                </div>

                <div className="scroll" style={{
                  flex: 1, overflowY: 'auto', overflowX: 'hidden',
                  paddingTop: 2, paddingBottom: 110,
                }}>
                  {tab === 'today'    && <TodayScreen persona={persona} autonomy={autonomy} hour={t.hour} userName={userName} onOpenMeal={openMeal} onApproveMeal={approveMeal}/>}
                  {tab === 'brain'    && <BrainScreen persona={persona}/>}
                  {tab === 'log'      && <LogScreen persona={persona} onOpenSpend={() => setSubpage('spend')}/>}
                  {tab === 'settings' && <SettingsScreen persona={persona} autonomy={autonomy} setAutonomy={v => setTweak('autonomy', v)} onOpenAllergies={() => setSubpage('allergies')}/>}
                </div>

                <BottomNav tab={tab} setTab={setTab}/>
                {sheet && <MealSheet meal={sheet.meal} persona={persona} initialStage={sheet.initialStage} onClose={() => setSheet(null)}/>}
                {subpage === 'allergies' && <AllergiesScreen onBack={() => setSubpage(null)}/>}
                {subpage === 'spend' && <SpendDetailScreen onBack={() => setSubpage(null)}/>}
              </div>
            )}
          </IOSDevice>
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Onboarding">
          <TweakButton label={view === 'onboarding' ? 'Restart onboarding' : 'Replay onboarding'} onClick={replayOnboarding}/>
          <TweakRadio
            label="Welcome style"
            value={t.welcomeStyle}
            options={[{ value: 'features', label: 'Features' }, { value: 'editorial', label: 'Editorial' }]}
            onChange={v => { setTweak('welcomeStyle', v); replayOnboarding() }}
          />
          <TweakRadio
            label="OTP style"
            value={t.otpStyle}
            options={[{ value: 'boxed', label: 'Boxed' }, { value: 'underline', label: 'Underline' }]}
            onChange={v => setTweak('otpStyle', v)}
          />
          <TweakSelect
            label="Verify by"
            value={t.verifyChannel}
            options={[
              { value: 'choice', label: 'User picks' },
              { value: 'phone', label: 'Phone only' },
              { value: 'email', label: 'Email only' },
            ]}
            onChange={v => { setTweak('verifyChannel', v); replayOnboarding() }}
          />
        </TweakSection>

        <TweakSection label="Persona">
          <TweakSelect
            label="Active"
            value={t.persona}
            options={PERSONA_LIST.map(id => ({ value: id, label: PERSONAS[id].name }))}
            onChange={v => { setTweak('persona', v); setTweak('autonomy', PERSONAS[v].autonomyDefault) }}
          />
        </TweakSection>

        <TweakSection label="Agent autonomy">
          <TweakSelect
            label="Level"
            value={String(autonomy)}
            options={AUTONOMY_LEVELS.map(a => ({ value: String(a.id), label: `${a.icon}  ${a.name}` }))}
            onChange={v => setTweak('autonomy', Number(v))}
          />
        </TweakSection>

        <TweakSection label="Theme">
          <TweakRadio
            label="Mode"
            value={t.theme}
            options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
            onChange={v => setTweak('theme', v)}
          />
        </TweakSection>

        <TweakSection label="Screen">
          <TweakSelect
            label="Tab"
            value={tab}
            options={[
              { value: 'today',    label: 'Today' },
              { value: 'brain',    label: 'Brain' },
              { value: 'log',      label: 'Log' },
              { value: 'settings', label: 'You' },
            ]}
            onChange={setTab}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  )
}
