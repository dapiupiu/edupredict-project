const { TRAINING_BOUNDS, FEATURE_LABELS_ID } = require('../config/trainingBounds');

/**
 * Clamp nilai fitur numerik ke batas distribusi training.
 * @param {Object} inputData - Object input (rawInput dari academicController)
 * @returns {{ clampedInput: Object, oodWarnings: string[] }}
 */
function validateAndClamp(inputData) {
  const clampedInput = { ...inputData }; // shallow copy, tidak mutate original
  const oodWarnings = [];

  for (const [feature, { min, max }] of Object.entries(TRAINING_BOUNDS)) {
    if (!(feature in clampedInput)) continue;

    const val = parseFloat(clampedInput[feature]);
    if (isNaN(val)) continue;

    const label = FEATURE_LABELS_ID[feature] || feature;

    if (val < min) {
      clampedInput[feature] = min;
      oodWarnings.push(
        `${label}: nilai ${val} di bawah batas data pelatihan (minimum ${min}). ` +
        `Prediksi menggunakan nilai ${min}.`
      );
    } else if (val > max) {
      clampedInput[feature] = max;
      oodWarnings.push(
        `${label}: nilai ${val} di atas batas data pelatihan (maksimum ${max}). ` +
        `Prediksi menggunakan nilai ${max}.`
      );
    }
  }

  return { clampedInput, oodWarnings };
}

module.exports = { validateAndClamp };