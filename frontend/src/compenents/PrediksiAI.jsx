import React from "react";

function PrediksiAI({
  predictionResult,
  hideHeader = false,
  hideDistribusi = false,
}) {
  if (!predictionResult || !predictionResult.prediksi) {
    return (
      <div className="text-center py-10 text-gray-500">
        Tidak ada data prediksi untuk ditampilkan.
      </div>
    );
  }

  const { siswa, prediksi } = predictionResult;
  const { risk_category, confidence } = prediksi;

  // Handle potential stringified JSON from backend
  const risk_factors =
    typeof prediksi.risk_factors === "string"
      ? JSON.parse(prediksi.risk_factors)
      : prediksi.risk_factors || [];
  const probabilities =
    typeof prediksi.probabilities === "string"
      ? JSON.parse(prediksi.probabilities)
      : prediksi.probabilities || {};

  const factorTranslation = {
    Attendance: "Kehadiran",
    Hours_Studied: "Jam Belajar",
    Parental_Involvement: "Keterlibatan Orang Tua",
    Access_to_Resources: "Akses Sumber Belajar",
    Sleep_Hours: "Jam Tidur",
    Previous_Scores: "Nilai Rapor Sebelumnya",
    Motivation_Level: "Tingkat Motivasi",
    Internet_Access: "Akses Internet",
    Tutoring_Sessions: "Sesi Bimbingan Belajar",
    Family_Income: "Pendapatan Keluarga",
    Teacher_Quality: "Kualitas Pengajaran Guru",
    Peer_Influence: "Pengaruh Teman",
    Physical_Activity: "Aktivitas Fisik",
    Parental_Education_Level: "Pendidikan Orang Tua",
  };

  // Determine colors based on risk_category
  let headerBgColor = "bg-gray-100";
  let headerTextColor = "text-gray-800";
  let headerConfidenceColor = "text-gray-700";
  let riskStatusText = "";

  if (risk_category === "High") {
    headerBgColor = "bg-red-100";
    headerTextColor = "text-red-800";
    headerConfidenceColor = "text-red-700";
    riskStatusText = "Memerlukan perhatian segera";
  } else if (risk_category === "Medium") {
    headerBgColor = "bg-orange-100";
    headerTextColor = "text-orange-800";
    headerConfidenceColor = "text-orange-700";
    riskStatusText = "Perlu dipantau lebih lanjut";
  } else {
    // Low
    headerBgColor = "bg-green-100";
    headerTextColor = "text-green-800";
    headerConfidenceColor = "text-green-700";
    riskStatusText = "Terpantau stabil";
  }

  // Format probabilities for display
  const formattedProbabilities = Object.entries(probabilities || {})
    .map(([key, value]) => {
      let color = "bg-gray-500";
      let translatedKey = "";
      if (key === "High") {
        color = "bg-red-700";
        translatedKey = "Tinggi";
      } else if (key === "Medium") {
        color = "bg-orange-600";
        translatedKey = "Sedang";
      } else if (key === "Low") {
        color = "bg-green-700";
        translatedKey = "Rendah";
      }
      return { label: `Risiko ${translatedKey}`, value: value, color: color };
    })
    .sort((a, b) => b.value - a.value); // Sort by value descending

  // Format risk factors for display
  const formattedFactors =
    risk_factors && risk_factors.length > 0
      ? risk_factors.map((factor) => {
          let factorColor = "text-gray-700";
          let factorDot = "bg-gray-500";
          if (risk_category === "High") {
            factorColor = "text-red-700";
            factorDot = "bg-red-600";
          } else if (risk_category === "Medium") {
            factorColor = "text-orange-700";
            factorDot = "bg-orange-600";
          } else {
            factorColor = "text-green-700";
            factorDot = "bg-green-600";
          }
          return {
            title:
              typeof factor === "string"
                ? factorTranslation[factor] || factor.replace(/_/g, " ")
                : factor.factor || factor.note || "", // Translate factor name
            value:
              risk_category === "Low" ? "Faktor pendukung" : "Perlu perhatian",
            color: factorColor,
            dot: factorDot,
          };
        })
      : [
          {
            title: "Tidak ada faktor risiko dominan terdeteksi.",
            value: "",
            color: "text-green-700",
            dot: "bg-green-600",
          },
        ];

  // Generate recommendations based on risk category
  let generatedRecommendation = "";
  if (risk_category === "High") {
    const translatedRiskFactors = risk_factors
      .map((f) =>
        typeof f === "string"
          ? factorTranslation[f] || f.replace(/_/g, " ")
          : f.factor || "",
      )
      .join(" dan ");
    generatedRecommendation = `Siswa atas nama ${siswa} memerlukan pendampingan intensif segera. Disarankan untuk memprioritaskan perbaikan pada aspek ${translatedRiskFactors}.`;
  } else if (risk_category === "Medium") {
    generatedRecommendation = `Lakukan pemantauan berkala pada ${siswa}. Tingkatkan motivasi dan berikan bimbingan tambahan pada area yang menjadi faktor risiko agar kondisi tidak memburuk.`;
  } else {
    // Low
    generatedRecommendation = `Performa ${siswa} saat ini sangat stabil. Teruskan pemantauan rutin dan berikan apresiasi positif untuk menjaga konsistensi belajarnya.`;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* HEADER RESULT */}
      {!hideHeader && (
        <div
          className={`${headerBgColor} rounded-2xl p-6 flex justify-between items-center mb-6 shadow-sm`}
        >
          <div>
            <h1 className={`text-3xl font-bold ${headerTextColor}`}>
              {siswa} - Risiko{" "}
              {risk_category === "High"
                ? "Tinggi"
                : risk_category === "Medium"
                  ? "Sedang"
                  : risk_category === "Low"
                    ? "Rendah"
                    : risk_category}
            </h1>

            <p className={`text-xl ${headerConfidenceColor} mt-2`}>
              {riskStatusText}
            </p>
          </div>

          <div className="text-right">
            <h1 className={`text-5xl font-bold ${headerConfidenceColor}`}>
              {confidence}%
            </h1>

            <p className={`text-xl ${headerConfidenceColor}`}>
              kepercayaan model
            </p>
          </div>
        </div>
      )}

      {/* DISTRIBUSI */}
      {!hideDistribusi && formattedProbabilities.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow mb-6">
          <h2 className="font-bold text-xl mb-6">
            📊 Distribusi Probabilitas Prediksi
          </h2>

          <div className="space-y-4">
            {formattedProbabilities.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.label}</span>

                  <span>{item.value.toFixed(1)}%</span>
                </div>

                <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full`}
                    style={{ width: `${item.value.toFixed(1)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FAKTOR */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="font-bold text-xl mb-4">⚠️ Faktor Dominan</h2>

          <div className="space-y-4">
            {formattedFactors.map((factor, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${factor.dot}`}></div>

                  <h3 className={`font-semibold ${factor.color}`}>
                    {factor.title}
                  </h3>
                </div>

                {factor.value && (
                  <p className="ml-6 text-gray-700">{factor.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* REKOMENDASI */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="font-bold text-xl mb-4">✨ Rekomendasi AI</h2>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
              <span>💡</span>
              <p className="text-gray-700">{generatedRecommendation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end gap-4 mt-8"></div>
    </div>
  );
}

export default PrediksiAI;
