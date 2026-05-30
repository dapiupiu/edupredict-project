const db = require("../config/db");
const {
  predictRiskWithAI,
  analyzeDominantFactors,
  analyzeRecommendations,
} = require("../services/aiService");
const { validateAndClamp } = require("../utils/validateInput");

// ─────────────────────────────────────────────────────────
//  HARDCODE AI RESPONSE / FALLBACK
//  Dipakai jika AI service error/down
// ─────────────────────────────────────────────────────────
const getHardcodedPrediction = (data) => {
  const attendance = Number(data.Attendance);
  const hours = Number(data.Hours_Studied);
  const previousScores = Number(data.Previous_Scores);

  if (attendance >= 75 && hours >= 15 && previousScores >= 75) {
    return {
      risk_category: "Low",
      confidence: 89,
      probabilities: { Low: 89, Medium: 8, High: 3 },
      risk_factors: [],
      source: "hardcode_fallback",
    };
  }

  if (attendance >= 55 && hours >= 8 && previousScores >= 60) {
    return {
      risk_category: "Medium",
      confidence: 76,
      probabilities: { Low: 13, Medium: 76, High: 11 },
      risk_factors: ["Attendance", "Hours_Studied", "Previous_Scores"],
      source: "hardcode_fallback",
    };
  }

  return {
    risk_category: "High",
    confidence: 84,
    probabilities: { Low: 5, Medium: 11, High: 84 },
    risk_factors: [
      "Attendance",
      "Hours_Studied",
      "Previous_Scores",
      "Motivation_Level",
    ],
    source: "hardcode_fallback",
  };
};

// ─────────────────────────────────────────────────────────
//  POST /api/guru/academic/:studentId
//  Input data akademik siswa + jalankan prediksi AI
// ─────────────────────────────────────────────────────────
const inputAcademic = async (req, res) => {
  const { studentId } = req.params;

  const {
    hours_studied,
    attendance,
    sleep_hours,
    previous_scores,
    tutoring_sessions,
    physical_activity,
    parental_involvement,
    access_to_resources,
    motivation_level,
    internet_access,
    family_income,
    teacher_quality,
    peer_influence,
  } = req.body;

  const requiredFields = {
    hours_studied,
    attendance,
    sleep_hours,
    previous_scores,
    tutoring_sessions,
    physical_activity,
    parental_involvement,
    access_to_resources,
    motivation_level,
    internet_access,
    family_income,
    teacher_quality,
    peer_influence,
  };

  const missingFields = Object.keys(requiredFields).filter(
    (key) =>
      requiredFields[key] === undefined ||
      requiredFields[key] === null ||
      requiredFields[key] === "",
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Field berikut wajib diisi.",
      missing: missingFields,
    });
  }

  try {
    // ── STEP 1: Cek siswa ───────────────────────────────
    const [studentRows] = await db.query(
      `SELECT id, nama_siswa, parental_education_level
       FROM students
       WHERE id = ?
       LIMIT 1`,
      [studentId],
    );

    if (studentRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Siswa tidak ditemukan.",
      });
    }

    const siswa = studentRows[0];

    // ── STEP 2: Simpan data akademik ────────────────────
    const [insertResult] = await db.query(
      `INSERT INTO academic_records
        (student_id, hours_studied, attendance, sleep_hours, previous_scores,
         tutoring_sessions, physical_activity, parental_involvement,
         access_to_resources, motivation_level, internet_access,
         family_income, teacher_quality, peer_influence, parental_education_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentId,
        Number(hours_studied),
        Number(attendance),
        Number(sleep_hours),
        Number(previous_scores),
        Number(tutoring_sessions),
        Number(physical_activity),
        parental_involvement,
        access_to_resources,
        motivation_level,
        internet_access,
        family_income,
        teacher_quality,
        peer_influence,
        siswa.parental_education_level,
      ],
    );

    const academicRecordId = insertResult.insertId;

    // ── STEP 3: Susun payload 14 fitur untuk AI service ──
    const rawInput = {
      Hours_Studied: Number(hours_studied),
      Attendance: Number(attendance),
      Parental_Involvement: parental_involvement,
      Access_to_Resources: access_to_resources,
      Sleep_Hours: Number(sleep_hours),
      Previous_Scores: Number(previous_scores),
      Motivation_Level: motivation_level,
      Internet_Access: internet_access,
      Tutoring_Sessions: Number(tutoring_sessions),
      Family_Income: family_income,
      Teacher_Quality: teacher_quality,
      Peer_Influence: peer_influence,
      Physical_Activity: Number(physical_activity),
      Parental_Education_Level: siswa.parental_education_level,
    };

    // ── STEP 4a: Clamp input ke training bounds (OOD protection) ──
    const { clampedInput, oodWarnings } = validateAndClamp(rawInput);

    if (oodWarnings.length > 0) {
      console.log("OOD warnings untuk siswa", studentId, ":", oodWarnings);
    }

    // ── STEP 4b: Prediksi via AI service + fallback hardcode ──
    let prediksi;

    try {
      prediksi = await predictRiskWithAI(clampedInput);
    } catch (aiError) {
      console.error(
        "AI service error, fallback to hardcoded prediction:",
        aiError.message,
      );

      prediksi = getHardcodedPrediction(clampedInput);
    }

    // ── STEP 4c: Ambil dominant factors & recommendations dari AI ──
    const analyzePayload = {
      student_id: `STU-${studentId}`,
      features: clampedInput,
      prediction: {
        risk_category: prediksi.risk_category,
        confidence: prediksi.confidence,
        predicted_exam_score: 0,
      },
    };

    const [dominantFactors, recommendations] = await Promise.all([
      analyzeDominantFactors(analyzePayload),
      analyzeRecommendations(analyzePayload),
    ]);

    // ── STEP 5: Simpan hasil prediksi ───────────────────
    const [predictionResult] = await db.query(
      `INSERT INTO predictions
    (student_id, academic_record_id, risk_category, confidence,
     probabilities, risk_factors, raw_input)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        studentId,
        academicRecordId,
        prediksi.risk_category,
        prediksi.confidence,
        JSON.stringify(prediksi.probabilities || {}),
        JSON.stringify(dominantFactors), // ← dari AI langsung
        JSON.stringify(clampedInput),
      ],
    );

    const predictionId = predictionResult.insertId;

    // ── STEP 6: Buat notifikasi jika Medium / High ──────
    if (prediksi.risk_category === "High") {
      await db.query(
        `INSERT INTO notifications
          (user_id, student_id, prediction_id, title, message, type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          req.user.id,
          studentId,
          predictionId,
          "Peringatan Risiko Tinggi",
          `${siswa.nama_siswa} terdeteksi berisiko TINGGI — segera lakukan intervensi!`,
          "High",
        ],
      );
    } else if (prediksi.risk_category === "Medium") {
      await db.query(
        `INSERT INTO notifications
          (user_id, student_id, prediction_id, title, message, type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          req.user.id,
          studentId,
          predictionId,
          "Peringatan Risiko Sedang",
          `${siswa.nama_siswa} berisiko SEDANG — pantau perkembangannya.`,
          "Medium",
        ],
      );
    }

    return res.status(201).json({
      success: true,
      message: "Data akademik berhasil disimpan dan prediksi telah dilakukan.",
      data: {
        academic_record_id: academicRecordId,
        prediction_id: predictionId,
        siswa: siswa.nama_siswa,
        prediksi: {
          risk_category: prediksi.risk_category,
          confidence: prediksi.confidence,
          probabilities: prediksi.probabilities || {},
          risk_factors: dominantFactors,
          recommendations: recommendations,
          source: prediksi.source || "ai",
        },
        ood_warnings: oodWarnings,
        is_ood: oodWarnings.length > 0,
        input_used: clampedInput,
      },
    });
  } catch (err) {
    console.error("inputAcademic error:", err);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

// ─────────────────────────────────────────────────────────
//  GET /api/guru/academic/:studentId
//  Ambil histori akademik + prediksi siswa
// ─────────────────────────────────────────────────────────
const getAcademicHistory = async (req, res) => {
  const { studentId } = req.params;

  try {
    const [studentRows] = await db.query(
      `SELECT id, nama_siswa, nisn, kelas
       FROM students
       WHERE id = ?
       LIMIT 1`,
      [studentId],
    );

    if (studentRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Siswa tidak ditemukan.",
      });
    }

    const [histori] = await db.query(
      `SELECT
         ar.id AS record_id,
         ar.hours_studied,
         ar.attendance,
         ar.sleep_hours,
         ar.previous_scores,
         ar.tutoring_sessions,
         ar.physical_activity,
         ar.parental_involvement,
         ar.access_to_resources,
         ar.motivation_level,
         ar.internet_access,
         ar.family_income,
         ar.teacher_quality,
         ar.peer_influence,
         ar.parental_education_level,
         ar.recorded_at,
         p.risk_category,
         p.confidence,
         p.probabilities,
         p.risk_factors
       FROM academic_records ar
       LEFT JOIN predictions p ON p.academic_record_id = ar.id
       WHERE ar.student_id = ?
       ORDER BY ar.recorded_at ASC`,
      [studentId],
    );

    return res.status(200).json({
      success: true,
      data: {
        siswa: studentRows[0],
        total: histori.length,
        histori,
      },
    });
  } catch (err) {
    console.error("getAcademicHistory error:", err);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

module.exports = {
  inputAcademic,
  getAcademicHistory,
};
