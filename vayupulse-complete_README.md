# VayuPulse India

Hyperlocal Urban Air Quality Intelligence & Health Assistant built around India's **CPCB National Air Quality Index (NAQI)** standards, 24-hour boundary-layer dispersion trends, CAQM GRAP alerts, commute $\text{PM}_{2.5}$ dose estimation, and a Gemini-powered **VayuMitra** health advisor.

## Key Features
- **Multi-Station & PIN Code Lookup:** Switch across Indian monitoring stations (defaulting to Greater Noida Knowledge Park III, plus Delhi Anand Vihar, Mumbai BKC, and Bengaluru Silk Board) or look up by 6-digit PIN code.
- **CPCB NAQI & GRAP Alerts:** Maps AQI across all six official CPCB bands (*Good* to *Severe*), estimates passive cigarette equivalence, and flags active CAQM GRAP stages for Delhi-NCR.
- **Commute Dose & Persona Guidance:** Calculates inhaled $\text{PM}_{2.5}$ mass based on duration and N95 filtration, paired with sensitivity guidance for General Adults, Asthma/Respiratory, Children & Seniors, and Runners/Cyclists.
- **Accessible & Keyboard-Friendly UI:** Includes skip-to-content navigation, semantic landmarks (`<header>`, `<main>`, `<section>`), ARIA labels, and `Escape`-key modal dismissal.

## Running Automated Tests
```bash
npm test
```
