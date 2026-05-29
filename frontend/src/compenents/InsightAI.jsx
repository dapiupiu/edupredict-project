import React from 'react';

function InsightAI({ ringkasan, siswaBerisiko }) {
    // Pemetaan terjemahan faktor risiko dari backend ke Bahasa Indonesia
    const factorTranslation = {
        'Attendance': 'Kehadiran',
        'Hours_Studied': 'Jam Belajar',
        'Previous_Scores': 'Nilai Ujian',
        'Sleep_Hours': 'Jam Tidur',
        'Tutoring_Sessions': 'Sesi Bimbel',
        'Physical_Activity': 'Aktivitas Fisik',
        'Parental_Involvement': 'Keterlibatan Orang Tua',
        'Access_to_Resources': 'Akses Sumber Belajar',
        'Motivation_Level': 'Tingkat Motivasi',
        'Internet_Access': 'Akses Internet',
        'Family_Income': 'Pendapatan Keluarga',
        'Peer_Influence': 'Pengaruh Teman',
        'Teacher_Quality': 'Kualitas Pengajaran',
        'Parental_Education_Level': 'Pendidikan Orang Tua',
        'School_Type': 'Tipe Sekolah',
        'Distance_From_Home': 'Jarak Rumah',
        'Learning_Disabilities': 'Kesulitan Belajar'
    };

    // Hitung faktor risiko dominan dari data siswa yang masuk radar
    const factorCounts = {};
    siswaBerisiko?.forEach(s => {
        try {
            const factors = typeof s.risk_factors === 'string' 
                ? JSON.parse(s.risk_factors) 
                : s.risk_factors;
                
            factors?.forEach(f => {
                factorCounts[f] = (factorCounts[f] || 0) + 1;
            });
        } catch (e) {
            console.error("Gagal memproses faktor risiko:", e);
        }
    });

    const dominantFactor = Object.entries(factorCounts)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || "Belum terdeteksi";

    const translatedFactor = factorTranslation[dominantFactor] || dominantFactor.replace(/_/g, ' ');

    const totalAtRisk = (ringkasan?.risiko_tinggi || 0) + (ringkasan?.risiko_sedang || 0);

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-4">
                <i className="ri-bard-fill text-sky-600 text-2xl"></i>
                <h1 className="font-bold text-2xl">Analisis Risiko Akademik</h1>
            </div>
            <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <p className="text-gray-700">
                        {totalAtRisk > 0 
                            ? `${totalAtRisk} siswa memiliki risiko akademik yang memerlukan perhatian segera.`
                            : "Berdasarkan data terbaru, semua siswa terpantau stabil."}
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <p className="text-gray-700">
                        Faktor risiko dominan: <span className="font-semibold text-blue-800">{translatedFactor}</span>
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <p className="text-gray-700 italic">
                        Saran AI: {totalAtRisk > 0 ? "Segera tinjau histori akademik siswa terkait dan lakukan intervensi pada aspek " + translatedFactor : "Lanjutkan monitoring rutin untuk menjaga performa siswa."}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InsightAI