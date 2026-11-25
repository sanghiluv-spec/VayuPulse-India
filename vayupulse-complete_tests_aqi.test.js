import test from "node:test";
import assert from "node:assert/strict";
import {
  getCpcbCategory,
  getProminentPollutant,
  getGrapStage,
  calculateCommuteDose
} from "../src/utils/cpcbCalculator.js";

test("CPCB NAQI category classification across all 6 severity bands", () => {
  assert.equal(getCpcbCategory(42).label, "Good");
  assert.equal(getCpcbCategory(88).label, "Satisfactory");
  assert.equal(getCpcbCategory(165).label, "Moderate");
  assert.equal(getCpcbCategory(255).label, "Poor");
  assert.equal(getCpcbCategory(348).label, "Very Poor");
  assert.equal(getCpcbCategory(460).label, "Severe");
});

test("Handles boundary and invalid AQI inputs safely", () => {
  assert.equal(getCpcbCategory(0).label, "Good");
  assert.equal(getCpcbCategory(-25).label, "Good");
  assert.equal(getCpcbCategory(500).label, "Severe");
  assert.equal(getCpcbCategory(Number.NaN).label, "Good");
});

test("Identifies prominent pollutant based on CPCB NAAQS safe limits", () => {
  const sample = { pm25: 180, pm10: 210, no2: 65, so2: 20, co: 1.4, o3: 45 };
  const result = getProminentPollutant(sample);
  assert.equal(result.pollutant, "PM25");
  assert.equal(result.safeLimitMultiple, 3.0);
  assert.deepEqual(getProminentPollutant({}), { pollutant: "PM25", safeLimitMultiple: 0 });
});

test("Triggers CAQM GRAP stages accurately for Delhi-NCR vs non-NCR cities", () => {
  assert.equal(getGrapStage(320, true).stage, "Stage II (Very Poor)");
  assert.equal(getGrapStage(470, true).stage, "Stage IV (Severe+)");
  assert.equal(getGrapStage(320, false).active, false);
});

test("Calculates commute PM2.5 inhaled dose and N95 filtration reduction", () => {
  const withoutMask = calculateCommuteDose({ pm25: 220, minutes: 60, modeFactor: 1.2, hasN95: false });
  const withMask = calculateCommuteDose({ pm25: 220, minutes: 60, modeFactor: 1.2, hasN95: true });
  const zeroTime = calculateCommuteDose({ pm25: 220, minutes: 0, modeFactor: 1.2, hasN95: false });

  assert.equal(withoutMask.inhaledUg, 237.6);
  assert.equal(withoutMask.cigaretteEquivalent, 10.0);
  assert.ok(withMask.inhaledUg < withoutMask.inhaledUg * 0.1);
  assert.equal(zeroTime.inhaledUg, 0);
});
