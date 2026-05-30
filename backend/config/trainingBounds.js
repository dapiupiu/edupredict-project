/**
 * Batas distribusi data training model EduPredict AI.
 * Dikonfirmasi dari dataset aktual (6.607 baris).
 * Input di luar batas ini bersifat Out-of-Distribution (OOD).
 */
const TRAINING_BOUNDS = {
  Attendance:        { min: 60.0,  max: 100.0 },
  Hours_Studied:     { min: 4.0,   max: 36.0  },
  Previous_Scores:   { min: 50.0,  max: 100.0 },
  Sleep_Hours:       { min: 4.0,   max: 10.0  },
  Tutoring_Sessions: { min: 0.0,   max: 7.0   },
  Physical_Activity: { min: 0.0,   max: 6.0   },
};

const FEATURE_LABELS_ID = {
  Attendance:        'Persentase Kehadiran',
  Hours_Studied:     'Jam Belajar Per Minggu',
  Previous_Scores:   'Nilai Ujian Sebelumnya',
  Sleep_Hours:       'Rata-rata Jam Tidur',
  Tutoring_Sessions: 'Jumlah Sesi Bimbingan',
  Physical_Activity: 'Frekuensi Olahraga',
};

module.exports = { TRAINING_BOUNDS, FEATURE_LABELS_ID };