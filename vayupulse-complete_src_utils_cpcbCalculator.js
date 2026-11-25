/**
 * CPCB National Air Quality Index (NAQI) & Exposure Utilities
 */

/**
 * Maps an AQI value to its official CPCB NAQI severity band.
 * @param {number} aqi
 * @returns {{ label: string, impact: string, color: string }}
 */
export function getCpcbCategory(aqi) {
  const safeAqi = Number.isFinite(aqi) ? Math.max(0, aqi) : 0;
  if (safeAqi <= 50) return { label: "Good", impact: "Minimal impact", color: "#10b981" };
  if (safeAqi <= 100) return { label: "Satisfactory", impact: "Minor breathing discomfort to sensitive people", color: "#84cc16" };
  if (safeAqi <= 200) return { label: "Moderate", impact: "Breathing discomfort to people with lungs, asthma and heart diseases", color: "#eab308" };
  if (safeAqi <= 300) return { label: "Poor", impact: "Breathing discomfort to most people on prolonged exposure", color: "#f97316" };
  if (safeAqi <= 400) return { label: "Very Poor", impact: "Respiratory illness on prolonged exposure", color: "#ef4444" };
  return { label: "Severe", impact: "Affects healthy people and seriously impacts those with existing diseases", color: "#991b1b" };
}

/**
 * Identifies the prominent pollutant based on CPCB NAAQS safe limits.
 * @param {Record<string, number>} pollutants
 * @returns {{ pollutant: string, safeLimitMultiple: number }}
 */
export function getProminentPollutant(pollutants = {}) {
  const limits = { pm25: 60, pm10: 100, no2: 80, so2: 80, co: 2.0, o3: 100 };
  let topPollutant = "pm25";
  let highestRatio = -1;

  for (const [key, value] of Object.entries(pollutants)) {
    if (limits[key] && Number.isFinite(value)) {
      const ratio = Math.max(0, value) / limits[key];
      if (ratio > highestRatio) {
        highestRatio = ratio;
        topPollutant = key;
      }
    }
  }

  return {
    pollutant: topPollutant.toUpperCase(),
    safeLimitMultiple: highestRatio < 0 ? 0 : Number(highestRatio.toFixed(2))
  };
}

/**
 * Determines active CAQM GRAP stage for Delhi-NCR stations.
 * @param {number} aqi
 * @param {boolean} isNcrCity
 * @returns {{ stage: string, active: boolean }}
 */
export function getGrapStage(aqi, isNcrCity = true) {
  const safeAqi = Number.isFinite(aqi) ? Math.max(0, aqi) : 0;
  if (!isNcrCity || safeAqi <= 200) return { stage: "None", active: false };
  if (safeAqi <= 300) return { stage: "Stage I (Poor)", active: true };
  if (safeAqi <= 400) return { stage: "Stage II (Very Poor)", active: true };
  if (safeAqi <= 450) return { stage: "Stage III (Severe)", active: true };
  return { stage: "Stage IV (Severe+)", active: true };
}

/**
 * Calculates commute PM2.5 inhaled mass and passive cigarette equivalence.
 * @param {{ pm25: number, minutes: number, modeFactor?: number, hasN95?: boolean }} params
 * @returns {{ inhaledUg: number, cigaretteEquivalent: number }}
 */
export function calculateCommuteDose({ pm25, minutes, modeFactor = 1.0, hasN95 = false }) {
  const safePm25 = Number.isFinite(pm25) ? Math.max(0, pm25) : 0;
  const safeMins = Number.isFinite(minutes) ? Math.max(0, minutes) : 0;
  const safeFactor = Number.isFinite(modeFactor) ? Math.max(0, modeFactor) : 1.0;
  const inhalationRateM3PerMin = 0.015;
  const maskRetention = hasN95 ? 0.05 : 1.0;
  const inhaledUg = safePm25 * safeFactor * inhalationRateM3PerMin * safeMins * maskRetention;
  const cigaretteEquivalent = safePm25 / 22;

  return {
    inhaledUg: Number(inhaledUg.toFixed(1)),
    cigaretteEquivalent: Number(cigaretteEquivalent.toFixed(1))
  };
}
