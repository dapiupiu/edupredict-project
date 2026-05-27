const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

const normalizeRiskCategory = (value) => {
  const risk = String(value || '').toLowerCase();
  if (risk === 'low' || risk === 'rendah') return 'Low';
  if (risk === 'medium' || risk === 'sedang') return 'Medium';
  if (risk === 'high' || risk === 'tinggi') return 'High';
  return 'Medium';
};

const predictRiskWithAI = async (payload) => {
  if (!AI_SERVICE_URL) {
    throw new Error('AI_SERVICE_URL belum diatur di .env');
  }

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

  const response = await axios.post(
    `${AI_SERVICE_URL}/api/v1/predict`,
    aiPayload,
    {
      timeout: 15000,
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!response.data?.results?.[0]?.prediction?.risk_category) {
    throw new Error('Response AI tidak valid');
  }

  const result = response.data.results[0];

  return {
    risk_category: normalizeRiskCategory(result.prediction.risk_category),
    confidence: result.prediction.confidence || 0,
    probabilities: {
      Low: result.probabilities?.Low || 0,
      Medium: result.probabilities?.Medium || 0,
      High: result.probabilities?.High || 0,
    },
    risk_factors: [],
    source: 'ai',
  };
};

module.exports = { predictRiskWithAI };