const db = require("../config/db");

// POST /api/student/check
const checkNISN = async (req, res) => {
  const { nisn } = req.body;

  if (!nisn) {
    return res.status(400).json({
      success: false,
      message: "NISN wajib diisi.",
    });
  }

  try {
    // Ambil data siswa + record akademik + prediksi terbaru (lengkap)
    const [rows] = await db.query(
      `SELECT
         s.id,
         s.nisn,
         s.nama_siswa,
         s.kelas,
         s.gender,
         s.parental_education_level,
         ar.hours_studied,
         ar.attendance,
         ar.previous_scores,
         ar.sleep_hours,
         ar.physical_activity,
         ar.motivation_level,
         ar.internet_access,
         ar.access_to_resources,
         ar.tutoring_sessions,
         ar.peer_influence,
         ar.family_income,
         ar.teacher_quality,
         ar.parental_involvement,
         ar.recorded_at,
         p.risk_category,
         p.confidence,
         p.probabilities,
         p.risk_factors,
         p.recommendations
       FROM students s
       LEFT JOIN academic_records ar ON ar.student_id = s.id
         AND ar.recorded_at = (
           SELECT MAX(ar2.recorded_at) FROM academic_records ar2
           WHERE ar2.student_id = s.id
         )
       LEFT JOIN predictions p ON p.academic_record_id = ar.id
       WHERE s.nisn = ?
       LIMIT 1`,
      [nisn],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "NISN tersebut tidak ditemukan. Hubungi Guru",
      });
    }

    const siswa = rows[0];

    // Histori tren 5 record terakhir untuk grafik
    const [histori] = await db.query(
      `SELECT
         ar.hours_studied,
         ar.attendance,
         ar.previous_scores,
         ar.sleep_hours,
         ar.physical_activity,
         ar.motivation_level,
         ar.internet_access,
         ar.access_to_resources,
         ar.tutoring_sessions,
         ar.peer_influence,
         ar.recorded_at,
         p.risk_category,
         p.confidence,
         p.probabilities,
         p.risk_factors,
         p.recommendations
       FROM academic_records ar
       LEFT JOIN predictions p ON p.academic_record_id = ar.id
       WHERE ar.student_id = ?
       ORDER BY ar.recorded_at DESC
       LIMIT 5`,
      [siswa.id],
    );

    res.status(200).json({
      success: true,
      data: {
        siswa: {
          id: siswa.id,
          nisn: siswa.nisn,
          nama: siswa.nama_siswa,
          nama_siswa: siswa.nama_siswa,
          kelas: siswa.kelas,
          gender: siswa.gender,
          parental_education_level: siswa.parental_education_level,
        },
        // Record terbaru lengkap — dipakai DashboardSiswaPage untuk Ringkasan
        prediksi_terbaru: siswa.risk_category
          ? {
              hours_studied: siswa.hours_studied,
              attendance: siswa.attendance,
              previous_scores: siswa.previous_scores,
              sleep_hours: siswa.sleep_hours,
              physical_activity: siswa.physical_activity,
              motivation_level: siswa.motivation_level,
              internet_access: siswa.internet_access,
              access_to_resources: siswa.access_to_resources,
              tutoring_sessions: siswa.tutoring_sessions,
              peer_influence: siswa.peer_influence,
              family_income: siswa.family_income,
              teacher_quality: siswa.teacher_quality,
              parental_involvement: siswa.parental_involvement,
              recorded_at: siswa.recorded_at,
              risk_category: siswa.risk_category,
              confidence: siswa.confidence,
              probabilities: siswa.probabilities,
              risk_factors: siswa.risk_factors,
              recommendations: siswa.recommendations,
            }
          : null,
        histori: histori.reverse(), // ascending untuk grafik
      },
    });
  } catch (err) {
    console.error("Error checking NISN:", err);
    res.status(500).json({
      success: false,
      message:
        "Terjadi kesalahan saat memeriksa NISN. Silakan coba lagi nanti.",
    });
  }
};

module.exports = { checkNISN };
