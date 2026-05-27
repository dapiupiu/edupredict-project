const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

const normalizeRiskCategory = (value) => {
  const risk = String(value || '').toLowerCase();

  if (risk === 'low' || risk === 'rendah') return 'Low';
  if (risk === 'medium' || risk === 'sedang') return 'Medium';
  if (risk === 'high' || risk === 'tinggi') return 'High';

  return 'Medium';
};

const normalizeConfidence = (value) => {
  const numberValue = Number(value || 0);

  if (numberValue >= 0 && numberValue <= 1) {
    return Number((numberValue * 100).toFixed(2));
  }

  return Number(numberValue.toFixed(2));
};

const normalizeProbabilities = (probabilities = {}) => {
  const entries = Object.entries(probabilities);

  if (entries.length === 0) {
    return {
      Low: 0,
      Medium: 0,
      High: 0,
    };
  }

  const values = entries.map(([, value]) => Number(value));
  const isRawProbability = values.every((value) => value >= 0 && value <= 1);

  const normalized = {};

  for (const [key, value] of entries) {
    const normalizedKey = normalizeRiskCategory(key);
    const numberValue = Number(value || 0);

    normalized[normalizedKey] = isRawProbability
      ? Number((numberValue * 100).toFixed(2))
      : Number(numberValue.toFixed(2));
  }

  return {
    Low: normalized.Low || 0,
    Medium: normalized.Medium || 0,
    High: normalized.High || 0,
  };
};

const mapAIResponseToPrediction = (aiResponse) => {
  return {
    risk_category: normalizeRiskCategory(aiResponse.predicted_class),
    confidence: normalizeConfidence(aiResponse.confidence),
    probabilities: normalizeProbabilities(aiResponse.probabilities || {}),
    risk_factors: [],
    source: 'ai',
  };
};

const predictRiskWithAI = async (payload) => {
  if (!AI_SERVICE_URL) {
    throw new Error('AI_SERVICE_URL belum diatur di .env');
  }

const response = await axios.post(`${AI_SERVICE_URL}/api/v1/predict`, payload, {
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.data) {
    throw new Error('AI service tidak mengembalikan response');
  }

  if (response.data.status && response.data.status !== 'success') {
    throw new Error('AI service mengembalikan status gagal');
  }

  if (!response.data.predicted_class) {
    throw new Error('Response AI tidak memiliki predicted_class');
  }

  return mapAIResponseToPrediction(response.data);
};

module.exports = {
  predictRiskWithAI,
};