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
  if (entries.length === 0) return { Low: 0, Medium: 0, High: 0 };

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
  // AI bisa return di root atau di dalam .result
  const result = aiResponse.result || aiResponse;

  return {
    risk_category: normalizeRiskCategory(result.predicted_class || result.risk_category),
    confidence: normalizeConfidence(result.confidence),
    probabilities: normalizeProbabilities(result.probabilities || {}),
    risk_factors: [],
    source: 'ai',
  };
};

const predictRiskWithAI = async (payload) => {
  if (!AI_SERVICE_URL) {
    throw new Error('AI_SERVICE_URL belum diatur di .env');
  }

  // Wrap payload sesuai format yang diminta AI: { student: { student_id, features: {...} } }
  const aiPayload = {
    student: {
      student_id: `STU-${Date.now()}`,
      features: {
        Hours_Studied: payload.Hours_Studied,
        Attendance: payload.Attendance,
        Parental_Involvement: payload.Parental_Involvement,
        Access_to_Resources: payload.Access_to_Resources,
        Sleep_Hours: payload.Sleep_Hours,
        Previous_Scores: payload.Previous_Scores,
        Motivation_Level: payload.Motivation_Level,
        Internet_Access: payload.Internet_Access,
        Tutoring_Sessions: payload.Tutoring_Sessions,
        Family_Income: payload.Family_Income,
        Teacher_Quality: payload.Teacher_Quality,
        Peer_Influence: payload.Peer_Influence,
        Physical_Activity: payload.Physical_Activity,
        Parental_Education_Level: payload.Parental_Education_Level,
      }
    }
  };

  const response = await axios.post(`${AI_SERVICE_URL}/api/v1/predict`, aiPayload, {
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
  });

  console.log('AI RAW RESPONSE:', JSON.stringify(response.data, null, 2));

  if (!response.data) {
    throw new Error('AI service tidak mengembalikan response');
  }

  // Cek status error
  if (response.data.status && response.data.status !== 'success') {
    throw new Error(`AI service error: ${response.data.message || 'status gagal'}`);
  }

  // Validasi ada hasil prediksi
  const result = response.data.result || response.data;
  // if (!result.predicted_class && !result.risk_category) {
  //   throw new Error('Response AI tidak memiliki predicted_class');
  // }

  return mapAIResponseToPrediction(response.data);
};

module.exports = { predictRiskWithAI };