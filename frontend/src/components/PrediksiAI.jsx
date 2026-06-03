import React from "react";

function PrediksiAI({
  predictionResult,
  hideHeader = false,
  hideDistribusi = false,
  fullWidth = false,
  isSiswa = false,
  showNisn = true,
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
      ? (() => {
          try {
            return JSON.parse(prediksi.risk_factors);
          } catch {
            return [];
          }
        })()
      : prediksi.risk_factors || [];

  const probabilities =
    typeof prediksi.probabilities === "string"
      ? (() => {
          try {
            return JSON.parse(prediksi.probabilities);
          } catch {
            return {};
          }
        })()
      : prediksi.probabilities || {};

  // Recommendations dari AI: [{text}] atau array of string
  const recommendations =
    typeof prediksi.recommendations === "string"
      ? (() => {
          try {
            return JSON.parse(prediksi.recommendations);
          } catch {
            return [];
          }
        })()
      : prediksi.recommendations || [];

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

  const riskLabel =
    risk_category === "High"
      ? "Tinggi"
      : risk_category === "Medium"
        ? "Sedang"
        : "Rendah";

  // Determine colors based on risk_category
  let headerBgColor = "bg-gray-100";
  let headerTextColor = "text-gray-800";
  let headerConfidenceColor = "text-gray-700";
  let riskStatusText = "";

  if (risk_category === "High") {
    headerBgColor = "bg-red-100";
    headerTextColor = "text-red-800";
    headerConfidenceColor = "text-red-700";
    riskStatusText = isSiswa
      ? "Ayo tingkatkan semangat belajarmu!"
      : "Memerlukan perhatian segera";
  } else if (risk_category === "Medium") {
    headerBgColor = "bg-orange-100";
    headerTextColor = "text-orange-800";
    headerConfidenceColor = "text-orange-700";
    riskStatusText = isSiswa
      ? "Ada beberapa hal yang bisa diperbaiki"
      : "Perlu dipantau lebih lanjut";
  } else {
    // Low
    headerBgColor = "bg-green-100";
    headerTextColor = "text-green-800";
    headerConfidenceColor = "text-green-700";
    riskStatusText = isSiswa
      ? "Wah, performa belajarmu keren!"
      : "Terpantau stabil";
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

  // Ambil nilai numerik/kategorik dari data prediksi berdasarkan key faktor
  const getRawValue = (factorKey) => {
    // Reverse translation: Indonesia → DB key (untuk data lama yang tersimpan dalam bahasa Indonesia)
    const idToKey = {
      Kehadiran: "attendance",
      "Jam Belajar": "hours_studied",
      "Jam tidur": "sleep_hours",
      "Nilai akademik": "previous_scores",
      "Nilai Rapor Sebelumnya": "previous_scores",
      "Sesi Bimbingan Belajar": "tutoring_sessions",
      "Aktivitas Fisik": "physical_activity",
      "Tingkat Motivasi": "motivation_level",
      "Motivasi belajar": "motivation_level",
      "Akses Internet": "internet_access",
      "Akses Sumber Belajar": "access_to_resources",
      "Pengaruh Teman": "peer_influence",
      "Pendapatan Keluarga": "family_income",
      "Kualitas Pengajaran Guru": "teacher_quality",
      "Keterlibatan Orang Tua": "parental_involvement",
      "Pendidikan Orang Tua": "parental_education_level",
    };
    const keyMap = {
      Attendance: "attendance",
      Hours_Studied: "hours_studied",
      Sleep_Hours: "sleep_hours",
      Previous_Scores: "previous_scores",
      Tutoring_Sessions: "tutoring_sessions",
      Physical_Activity: "physical_activity",
      Motivation_Level: "motivation_level",
      Parental_Involvement: "parental_involvement",
      Access_to_Resources: "access_to_resources",
      Internet_Access: "internet_access",
      Family_Income: "family_income",
      Teacher_Quality: "teacher_quality",
      Peer_Influence: "peer_influence",
      Parental_Education_Level: "parental_education_level",
    };
    const dbKey =
      idToKey[factorKey] || keyMap[factorKey] || factorKey.toLowerCase();
    return prediksi[dbKey] ?? prediksi[factorKey] ?? null;
  };

  // Buat deskripsi kontekstual berdasarkan faktor + nilai aktual + status risiko
  const getFactorDescription = (factorKeyRaw, isLow) => {
    // Normalize: kalau key Indonesia, konversi ke key Inggris
    const idToEnKey = {
      Kehadiran: "Attendance",
      "Jam Belajar": "Hours_Studied",
      "Jam tidur": "Sleep_Hours",
      "Nilai akademik": "Previous_Scores",
      "Nilai Rapor Sebelumnya": "Previous_Scores",
      "Sesi Bimbingan Belajar": "Tutoring_Sessions",
      "Aktivitas Fisik": "Physical_Activity",
      "Tingkat Motivasi": "Motivation_Level",
      "Motivasi belajar": "Motivation_Level",
      "Akses Internet": "Internet_Access",
      "Akses Sumber Belajar": "Access_to_Resources",
      "Pengaruh Teman": "Peer_Influence",
      "Pendapatan Keluarga": "Family_Income",
      "Kualitas Pengajaran Guru": "Teacher_Quality",
      "Keterlibatan Orang Tua": "Parental_Involvement",
      "Pendidikan Orang Tua": "Parental_Education_Level",
    };
    const factorKey = idToEnKey[factorKeyRaw] || factorKeyRaw;
    const val = getRawValue(factorKey);
    const n = parseFloat(val);

    // Helper label kategori
    const catLabel = { High: "tinggi", Medium: "sedang", Low: "rendah" };
    const invCat = {
      High: "kurang optimal",
      Medium: "cukup baik",
      Low: "sangat baik",
    };
    const posCat = {
      Positive: "positif",
      Neutral: "netral",
      Negative: "negatif",
    };

    if (isLow) {
      // Faktor PENDUKUNG (risiko rendah) — jelaskan kenapa bagus
      const goodDesc = {
        Attendance: `Kehadiran ${n}% — sangat konsisten hadir di kelas.`,
        Hours_Studied: `Belajar ${n} jam/minggu — durasi belajar yang solid.`,
        Sleep_Hours: `Tidur ${n} jam/malam — istirahat yang cukup dan berkualitas.`,
        Previous_Scores: `Nilai rapor ${n} — akademik yang kuat dan stabil.`,
        Tutoring_Sessions:
          n > 0
            ? `Mengikuti ${n} sesi bimbel — upaya ekstra yang positif.`
            : `Mampu belajar mandiri tanpa bimbel tambahan.`,
        Physical_Activity:
          n > 0
            ? `Aktif ${n} jam/minggu — keseimbangan fisik yang baik.`
            : null,
        Motivation_Level: val
          ? `Motivasi belajar ${catLabel[val] || val} — dorongan belajar yang kuat.`
          : null,
        Parental_Involvement: val
          ? `Keterlibatan orang tua ${catLabel[val] || val} — dukungan keluarga yang baik.`
          : null,
        Access_to_Resources:
          val === "High"
            ? `Akses sumber belajar lengkap — sangat mendukung proses belajar mandiri.`
            : val === "Medium"
              ? `Akses sumber belajar cukup — masih mendukung proses belajar, tetapi bisa ditingkatkan.`
              : val === "Low"
                ? `Akses sumber belajar terbatas — perlu dukungan tambahan agar proses belajar lebih optimal.`
                : null,
        Internet_Access:
          val === "Yes"
            ? `Memiliki akses internet — memudahkan eksplorasi belajar.`
            : null,
        Family_Income: val
          ? `Kondisi ekonomi keluarga ${catLabel[val] || val} — mendukung kebutuhan belajar.`
          : null,
        Teacher_Quality: val
          ? `Kualitas pengajaran guru dinilai ${catLabel[val] || val}.`
          : null,
        Peer_Influence: val
          ? `Pengaruh teman sebaya ${posCat[val] || val} — lingkungan sosial yang mendukung.`
          : null,
      };
      return (
        goodDesc[factorKey] || `Aspek ini mendukung kestabilan performa siswa.`
      );
    }

    // Faktor RISIKO — jelaskan nilai aktual + konteksnya
    const riskDesc = {
      Attendance: !isNaN(n)
        ? n < 75
          ? `Kehadiran ${n}% — di bawah ambang wajar (75%). Ketidakhadiran yang sering berpotensi memengaruhi pemahaman materi.`
          : `Kehadiran ${n}% — cukup, namun AI mendeteksi pola yang perlu dipantau bersama faktor lain.`
        : `Tingkat kehadiran perlu ditingkatkan.`,

      Hours_Studied: !isNaN(n)
        ? n < 10
          ? `Belajar ${n} jam/minggu — tergolong kurang. Disarankan minimal 15–20 jam/minggu untuk hasil optimal.`
          : `Belajar ${n} jam/minggu — AI mendeteksi durasi ini kurang optimal dikombinasikan dengan faktor lain.`
        : `Durasi belajar perlu ditingkatkan.`,

      Sleep_Hours: !isNaN(n)
        ? n < 6
          ? `Tidur ${n} jam/malam — kurang dari kebutuhan ideal (7–9 jam). Kurang tidur berdampak pada konsentrasi dan daya ingat.`
          : n > 9
            ? `Tidur ${n} jam/malam — terlalu lama, bisa menyebabkan kurang produktif di siang hari.`
            : `Jam tidur ${n} jam/malam — AI mendeteksi pola tidur ini berpengaruh pada performa keseluruhan.`
        : `Pola tidur perlu diperhatikan.`,

      Previous_Scores: !isNaN(n)
        ? n < 65
          ? `Nilai rapor ${n} — di bawah rata-rata. Perlu evaluasi strategi belajar yang lebih efektif.`
          : n < 80
            ? `Nilai rapor ${n} — cukup, namun masih ada ruang untuk peningkatan signifikan.`
            : `Nilai rapor ${n} — tergolong baik, namun AI mendeteksi ada faktor lain yang bisa memengaruhi tren ke depan.`
        : `Nilai akademik sebelumnya perlu dievaluasi.`,

      Tutoring_Sessions: !isNaN(n)
        ? n === 0
          ? `Belum mengikuti sesi bimbel. Bimbingan tambahan dapat membantu memahami materi yang sulit.`
          : `${n} sesi bimbel — AI menyarankan intensitas bimbingan ditingkatkan.`
        : `Pertimbangkan menambah sesi bimbingan belajar.`,

      Physical_Activity: !isNaN(n)
        ? n === 0
          ? `Tidak ada aktivitas fisik tercatat. Olahraga rutin terbukti meningkatkan fokus dan kesehatan mental.`
          : `Aktivitas fisik ${n} jam/minggu — kurang dari rekomendasi ideal (2–3 jam/minggu).`
        : `Aktivitas fisik perlu ditingkatkan.`,

      Motivation_Level: val
        ? val === "Low"
          ? `Motivasi belajar rendah — kondisi ini secara langsung memengaruhi konsistensi dan hasil belajar.`
          : `Motivasi belajar ${catLabel[val] || val} — masih bisa ditingkatkan dengan pendekatan yang tepat.`
        : `Tingkat motivasi perlu diperhatikan.`,

      Parental_Involvement: val
        ? val === "Low"
          ? `Keterlibatan orang tua rendah — dukungan keluarga yang lebih aktif dapat meningkatkan motivasi siswa.`
          : `Keterlibatan orang tua ${catLabel[val] || val} — perlu ditingkatkan secara konsisten.`
        : `Keterlibatan orang tua perlu ditingkatkan.`,

      Access_to_Resources:
        val === "Low"
          ? `Akses sumber belajar terbatas — keterbatasan ini dapat menyulitkan proses belajar mandiri.`
          : val === "Medium"
            ? `Akses sumber belajar cukup — perlu dioptimalkan agar hasil belajar lebih stabil.`
            : val === "High"
              ? `Akses sumber belajar lengkap — namun AI tetap mendeteksi faktor ini perlu dipantau bersama faktor lain.`
              : `Pemanfaatan sumber belajar perlu dioptimalkan.`,
      Internet_Access:
        val === "No"
          ? `Tidak memiliki akses internet di rumah — membatasi eksplorasi materi dan referensi belajar.`
          : `Akses internet ada, namun perlu dipastikan digunakan untuk kegiatan belajar.`,

      Family_Income: val
        ? val === "Low"
          ? `Pendapatan keluarga rendah — dapat memengaruhi ketersediaan fasilitas dan sumber belajar.`
          : `Kondisi ekonomi keluarga ${catLabel[val] || val} — perlu dipantau dampaknya terhadap fasilitas belajar.`
        : `Kondisi ekonomi keluarga perlu diperhatikan.`,

      Teacher_Quality: val
        ? val === "Low"
          ? `Kualitas pengajaran dinilai kurang — dapat memengaruhi pemahaman materi siswa secara signifikan.`
          : `Kualitas pengajaran ${catLabel[val] || val} — ada ruang perbaikan dalam metode pengajaran.`
        : `Kualitas pengajaran perlu dievaluasi.`,

      Peer_Influence: val
        ? val === "Negative"
          ? `Pengaruh teman sebaya negatif — lingkungan sosial yang kurang kondusif dapat menurunkan fokus belajar.`
          : `Pengaruh teman ${posCat[val] || val} — perlu dipantau agar tidak memengaruhi motivasi belajar.`
        : `Pengaruh lingkungan sosial perlu diperhatikan.`,
    };

    return (
      riskDesc[factorKey] ||
      `Faktor ini berkontribusi pada prediksi risiko dan perlu mendapat perhatian lebih.`
    );
  };

  const statusStyles = {
    good: {
      color: "text-green-700",
      dot: "bg-green-500",
      border: "border-green-200",
      bg: "bg-green-50",
    },
    warning: {
      color: "text-orange-700",
      dot: "bg-orange-500",
      border: "border-orange-200",
      bg: "bg-orange-50",
    },
    danger: {
      color: "text-red-700",
      dot: "bg-red-500",
      border: "border-red-200",
      bg: "bg-red-50",
    },
  };

  const normalizeFactorStatus = (status) => {
    const value = String(status || "")
      .trim()
      .toLowerCase();

    if (["good", "baik", "aman", "positive", "positif"].includes(value)) {
      return "good";
    }

    if (
      [
        "warning",
        "warn",
        "cukup",
        "sedang",
        "medium",
        "moderate",
        "average",
        "neutral",
        "netral",
      ].includes(value)
    ) {
      return "warning";
    }

    if (
      [
        "danger",
        "bad",
        "poor",
        "rendah",
        "low",
        "negative",
        "negatif",
        "buruk",
      ].includes(value)
    ) {
      return "danger";
    }

    return null;
  };

  const normalizeFactorKey = (keyRaw) => {
    const idToEnKey = {
      Kehadiran: "Attendance",
      "Jam Belajar": "Hours_Studied",
      "Jam Tidur": "Sleep_Hours",
      "Jam tidur": "Sleep_Hours",
      "Nilai akademik": "Previous_Scores",
      "Nilai Rapor Sebelumnya": "Previous_Scores",
      "Sesi Bimbingan Belajar": "Tutoring_Sessions",
      "Aktivitas Fisik": "Physical_Activity",
      "Tingkat Motivasi": "Motivation_Level",
      "Motivasi belajar": "Motivation_Level",
      "Akses Internet": "Internet_Access",
      "Akses Sumber Belajar": "Access_to_Resources",
      "Pengaruh Teman": "Peer_Influence",
      "Pendapatan Keluarga": "Family_Income",
      "Kualitas Pengajaran Guru": "Teacher_Quality",
      "Keterlibatan Orang Tua": "Parental_Involvement",
      "Pendidikan Orang Tua": "Parental_Education_Level",
    };

    return idToEnKey[keyRaw] || keyRaw;
  };

  const getColorFromValue = (keyRaw) => {
    const key = normalizeFactorKey(keyRaw);
    const val = getRawValue(key);
    const n = parseFloat(val);

    if (!Number.isNaN(n)) {
      if (key === "Attendance") {
        if (n < 75) return statusStyles.danger;
        if (n < 85) return statusStyles.warning;
        return statusStyles.good;
      }

      if (key === "Hours_Studied") {
        if (n < 10) return statusStyles.danger;
        if (n < 20) return statusStyles.warning;
        return statusStyles.good;
      }

      if (key === "Previous_Scores") {
        if (n < 65) return statusStyles.danger;
        if (n < 80) return statusStyles.warning;
        return statusStyles.good;
      }

      if (key === "Sleep_Hours") {
        if (n < 6 || n > 10) return statusStyles.danger;
        if (n < 7 || n > 9) return statusStyles.warning;
        return statusStyles.good;
      }

      if (key === "Tutoring_Sessions") {
        if (n === 0) return statusStyles.danger;
        if (n < 2) return statusStyles.warning;
        return statusStyles.good;
      }

      if (key === "Physical_Activity") {
        if (n < 1) return statusStyles.danger;
        if (n < 3) return statusStyles.warning;
        return statusStyles.good;
      }
    }

    const normalizedVal = String(val || "")
      .trim()
      .toLowerCase();

    if (
      ["low", "no", "negative", "rendah", "tidak", "negatif"].includes(
        normalizedVal,
      )
    ) {
      return statusStyles.danger;
    }

    if (
      ["medium", "neutral", "sedang", "cukup", "netral"].includes(normalizedVal)
    ) {
      return statusStyles.warning;
    }

    if (
      ["high", "yes", "positive", "tinggi", "ya", "positif"].includes(
        normalizedVal,
      )
    ) {
      return statusStyles.good;
    }

    if (risk_category === "High") return statusStyles.danger;
    if (risk_category === "Medium") return statusStyles.warning;
    return statusStyles.good;
  };

  // Format risk_factors dari AI: [{factor, value, status, note}]
  const formattedFactors =
    risk_factors && risk_factors.length > 0
      ? risk_factors.map((factor) => {
          const isObject = typeof factor === "object" && factor !== null;
          const factorKey = isObject ? factor.factor || "" : factor;

          const title =
            factorTranslation[factorKey] || factorKey.replace(/_/g, " ") || "";

          // Prioritas warna:
          // 1. status dari AI: good / warning / danger
          // 2. fallback dari nilai aktual siswa
          // 3. fallback dari risk_category global
          const statusKey = isObject
            ? normalizeFactorStatus(factor.status)
            : null;

          const style = statusKey
            ? statusStyles[statusKey]
            : getColorFromValue(factorKey);

          const description =
            isObject && factor.note
              ? factor.note
              : getFactorDescription(factorKey, risk_category === "Low");

          const valueLabel =
            isObject &&
            factor.value !== undefined &&
            factor.value !== null &&
            String(factor.value).trim() !== ""
              ? `Nilai: ${factor.value}`
              : null;

          return {
            title,
            description,
            valueLabel,
            color: style.color,
            dot: style.dot,
            border: style.border,
            bg: style.bg,
          };
        })
      : [
          {
            title: "Tidak ada faktor risiko dominan terdeteksi.",
            description: isSiswa
              ? "Wah hebat! Kamu menunjukkan pola belajar yang sangat positif di semua aspek."
              : "Siswa menunjukkan pola belajar yang sangat positif di semua aspek.",
            color: "text-green-700",
            dot: "bg-green-600",
            border: "border-green-200",
            bg: "bg-green-50",
          },
        ];

  // Generate recommendations based on risk category
  let generatedRecommendation = "";
  const topFactors = risk_factors
    .slice(0, 2)
    .map((f) =>
      typeof f === "string"
        ? (factorTranslation[f] || f).toLowerCase()
        : (f.factor || "").toLowerCase(),
    )
    .join(" dan juga ");

  if (isSiswa) {
    if (risk_category === "High") {
      generatedRecommendation = `Halo ${siswa}, tetap semangat ya! 🤗 Sistem melihat kamu sedang menghadapi beberapa tantangan dalam belajar. Jangan berkecil hati, jadikan ini pengingat untuk fokus pada aspek ${topFactors}. Kamu punya potensi besar, ayo perbaiki bersama Bapak/Ibu guru!`;
    } else if (risk_category === "Medium") {
      generatedRecommendation = `Halo ${siswa}, progres belajarmu sudah cukup baik. Namun, ada hal kecil di bagian ${topFactors} yang perlu kamu perhatikan lagi. Yuk, tingkatkan sedikit lagi usahanya!`;
    } else {
      generatedRecommendation = `Wah, luar biasa sekali, ${siswa}! 🌟 Performa belajarmu saat ini sangat stabil. Tetap pertahankan konsistensi dan semangatmu ya, teruslah jadi inspirasi buat teman-temanmu!`;
    }
  } else {
    if (risk_category === "High") {
      generatedRecommendation = `Siswa atas nama ${siswa} memerlukan pendampingan intensif segera. Prioritas intervensi sebaiknya difokuskan pada aspek ${topFactors}. Disarankan melakukan diskusi personal untuk identifikasi hambatan belajar.`;
    } else if (risk_category === "Medium") {
      generatedRecommendation = `Lakukan pemantauan berkala pada ${siswa} terutama pada area ${topFactors}. Motivasi tambahan dapat membantu siswa kembali ke jalur akademik yang stabil.`;
    } else {
      generatedRecommendation = `Performa akademik ${siswa} saat ini terpantau sangat stabil. Teruskan pemantauan rutin dan berikan apresiasi positif guna mempertahankan konsistensi belajar siswa.`;
    }
  }

  return (
    <div
      className={`${fullWidth ? "w-full" : "max-w-4xl mx-auto"} px-6 pb-6 pt-2`}
    >
      {/* HEADER RESULT */}
      {!hideHeader && (
        <div
          className={`${headerBgColor} rounded-2xl p-6 flex justify-between items-center mb-6 shadow-sm`}
        >
          <div>
            <h1 className={`text-3xl font-bold ${headerTextColor}`}>
              {siswa} - Risiko {riskLabel}
            </h1>

            {showNisn && (
              <p
                className={`text-base font-bold ${headerConfidenceColor} mt-1 opacity-90`}
              >
                NISN: {prediksi.nisn || "-"}
              </p>
            )}

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* FAKTOR */}
        <div className="bg-white rounded-2xl p-6 shadow h-full flex flex-col">
          <h2 className="font-bold text-xl mb-4">
            {risk_category === "Low"
              ? "✅ Faktor Pendukung"
              : risk_category === "Medium"
                ? "🔍 Analisis Faktor"
                : "⚠️ Faktor Dominan"}
          </h2>

          <div className="space-y-4">
            {formattedFactors.map((factor, index) => (
              <div
                key={index}
                className={`${factor.bg || "bg-gray-50"} border ${
                  factor.border || "border-gray-100"
                } rounded-xl p-4`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${factor.dot}`}
                  ></div>
                  <h3 className={`font-semibold ${factor.color}`}>
                    {factor.title}
                  </h3>
                  {factor.valueLabel && (
                    <span className="ml-auto text-xs font-bold text-gray-400">
                      {factor.valueLabel}
                    </span>
                  )}
                </div>
                {factor.description && (
                  <p className="ml-6 text-gray-600 text-sm">
                    {factor.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* REKOMENDASI */}
        <div className="bg-white rounded-2xl p-6 shadow h-full flex flex-col">
          <h2 className="font-bold text-xl mb-4">✨ Rekomendasi AI</h2>
          <div className="space-y-3">
            {recommendations && recommendations.length > 0 ? (
              recommendations.map((rec, index) => {
                const isObject =
                  rec && typeof rec === "object" && !Array.isArray(rec);

                if (isObject && (rec.title || rec.description || rec.action)) {
                  return (
                    <div
                      key={index}
                      className="bg-blue-50 rounded-xl p-4 flex gap-3"
                    >
                      <span className="flex-shrink-0">💡</span>

                      <div className="text-sm text-gray-700">
                        {rec.title && (
                          <h3 className="font-bold text-blue-900 mb-1">
                            {rec.title}
                          </h3>
                        )}

                        {rec.description && (
                          <p className="leading-relaxed">{rec.description}</p>
                        )}

                        {rec.action && (
                          <p className="mt-2 leading-relaxed">
                            <span className="font-semibold">Aksi:</span>{" "}
                            {rec.action}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }

                const text = getRecommendationText(rec);

                return (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-xl p-4 flex gap-3"
                  >
                    <span className="flex-shrink-0">💡</span>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {text}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
                <span>💡</span>
                <p className="text-gray-700 text-sm">
                  {generatedRecommendation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end gap-4 mt-8"></div>
    </div>
  );
}

export default PrediksiAI;
