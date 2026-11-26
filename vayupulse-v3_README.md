# VayuPulse India

Hyperlocal Urban Air Quality Intelligence & Health Assistant built around India's **CPCB National Air Quality Index (NAQI)** standards, CAQM GRAP alerts, commute $\text{PM}_{2.5}$ dose estimation, and the Gemini-powered **VayuMitra** health advisor.

## Architecture & Engineering Highlights
- **Performance & Memoization:** Uses React `useMemo` hooks for derived CPCB severity bands, GRAP alerts, and inhaled dose calculations, plus `AbortController` request timeouts for resilient API calls.
- **Accessibility (WCAG 2.1 AA):** Includes skip-to-content navigation, semantic landmarks (`<header>`, `<main>`, `<section>`, `<dl>`), ARIA live regions, focus restoration on modal dismissal, and high-contrast slate tokens.
- **Security & Validation:** Strict PIN code sanitization, bounded AQI clamping (`0–500`), session-only API key handling, and zero `eval` or unsafe HTML injection.

## Local Verification
```bash
npm run lint
npm test
```
