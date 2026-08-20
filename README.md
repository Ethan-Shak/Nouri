# NOURI — autonomous food agent

A mobile app prototype for an AI agent that senses your context (calendar,
location, health, budget), decides what you should eat, and places the
delivery order for you. Rendered inside a simulated iOS device frame with a
floating Tweaks panel for switching design variants live.

## Run it

```
cd app
npm install
npm run dev
```

Opens at http://localhost:5173.

## Repo layout

| Path | What it is |
|---|---|
| **`app/`** | **Canonical source.** React 18 + Vite app. Edit here. |
| `project/nouri/` | The original standalone prototype (global React, no modules, loaded by `NOURI.html` via script tags). Kept for reference — do not edit. |
| `project/NOURI Product Docs.html` | Product documentation page. |
| `project/screenshots/` | Design iteration screenshots. |

## App structure (`app/src/`)

| File | Role |
|---|---|
| `App.jsx` | Entry: view switching (onboarding ↔ app), tabs, tweaks wiring, device scaling |
| `data.js` | All domain data: 6 personas, 4 autonomy levels, decision-loop steps, connectors |
| `onboarding.jsx` | 7-step onboarding flow (welcome → verify → OTP → situation → profile → connect → payment → ready) |
| `screens.jsx` | The four tabs (Today / Brain / Log / You), meal sheet, subpages |
| `ob-kit.jsx` | Onboarding UI primitives |
| `foodart.jsx` | Procedural SVG food illustrations |
| `ios-frame.jsx` | Simulated iOS device chrome |
| `tweaks-panel.jsx` | Floating dev panel + `useTweaks` hook (persisted to localStorage) |

## Notes

- This is a **design prototype**: all meals/orders are hardcoded in `data.js`,
  the OTP accepts any 6 digits, and there is no backend.
- Onboarding completion, profile name, and tweak settings persist in
  localStorage. Use the Tweaks panel → "Replay onboarding" to reset.
