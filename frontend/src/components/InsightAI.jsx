import React from "react";

function InsightAI({ ringkasan, siswaBerisiko }) {
  const factorTranslation = {
    Attendance: "Kehadiran",
    Hours_Studied: "Jam Belajar",
    Previous_Scores: "Nilai Ujian",
    Sleep_Hours: "Jam Tidur",
    Tutoring_Sessions: "Sesi Bimbel",
    Physical_Activity: "Aktivitas Fisik",
    Parental_Involvement: "Keterlibatan Orang Tua",
    Access_to_Resources: "Akses Sumber Belajar",
    Motivation_Level: "Tingkat Motivasi",
    Internet_Access: "Akses Internet",
    Family_Income: "Pendapatan Keluarga",
    Peer_Influence: "Pengaruh Teman",
    Teacher_Quality: "Kualitas Pengajaran",
    Parental_Education_Level: "Pendidikan Orang Tua",
  };

  const factorCounts = {};
  siswaBerisiko?.forEach((s) => {
    try {
      const factors =
        typeof s.risk_factors === "string"
          ? JSON.parse(s.risk_factors)
          : s.risk_factors;

      factors?.forEach((f) => {
        // ✅ Tangani string atau object
        const key =
          typeof f === "string"
            ? f
            : f?.factor ?? f?.name ?? f?.key ?? null;

        if (key && typeof key === "string") {
          factorCounts[key] = (factorCounts[key] || 0) + 1;
        }
      });
    } catch (e) {
      console.error("Gagal memproses faktor risiko:", e);
    }
  });

  const dominantFactorKey =
    Object.entries(factorCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null;

  const translatedFactor = dominantFactorKey
    ? factorTranslation[dominantFactorKey] ??
      dominantFactorKey.replace(/_/g, " ")
    : "Belum terdeteksi";

  const totalAtRisk =
    (ringkasan?.risiko_tinggi || 0) + (ringkasan?.risiko_sedang || 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center gap-2 mb-4">
        <i className="ri-bard-fill text-sky-600 text-2xl"></i>
        <h1 className="font-bold text-2xl">Analisis Risiko Akademik</h1>
      </div>
      <div className="mt-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></div>
          <p className="text-gray-700">
            {totalAtRisk > 0
              ? `${totalAtRisk} siswa memiliki risiko akademik yang memerlukan perhatian segera.`
              : "Berdasarkan data terbaru, semua siswa terpantau stabil."}
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0"></div>
          <p className="text-gray-700 leading-relaxed">
            Faktor risiko dominan:{" "}
            <span className="font-semibold text-blue-800">
              {translatedFactor}
            </span>
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></div>
          <p className="text-gray-700 italic leading-relaxed">
            Saran AI:{" "}
            {totalAtRisk > 0
              ? `Kami merekomendasikan peninjauan lebih lanjut pada aspek ${translatedFactor} melalui pendekatan personal atau bimbingan konseling bagi siswa yang terdampak.`
              : "Pertahankan pola pengajaran saat ini dan teruskan pemantauan rutin untuk menjaga stabilitas performa siswa."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InsightAI;