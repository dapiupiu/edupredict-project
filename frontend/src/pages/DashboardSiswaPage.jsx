import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import PrediksiAI from "../components/PrediksiAI";
import Swal from "sweetalert2";

function DashboardSiswaPage() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Mengambil data dari state navigasi (dikirim dari LoginSiswaPage)
    const studentData = location.state?.studentData;

    if (!studentData) {
        return (
            <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md">
                    <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                        <i className="ri-error-warning-line"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Sesi Berakhir</h2>
                    <p className="text-gray-500 mt-2 mb-8">Silakan masuk kembali menggunakan NISN Anda untuk melihat dashboard.</p>
                    <Link to="/login-siswa" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                        Kembali ke Login
                    </Link>
                </div>
            </div>
        );
    }

    const { siswa, histori } = studentData;
    // Ambil record terbaru (bisa index 0 atau index terakhir tergantung urutan backend)
    // Kita cari yang memiliki tanggal terbaru jika ada recorded_at
    const sortedHistori = histori && Array.isArray(histori) 
        ? [...histori].sort((a, b) => new Date(b.recorded_at) - new Date(a.recorded_at)) 
        : [];
    
    // Ambil record terbaru dan parse data JSON-nya agar siap digunakan
    const rawLatest = sortedHistori.length > 0 ? sortedHistori[0] : {};
    
    const rawProbabilities = typeof rawLatest.probabilities === 'string' 
        ? JSON.parse(rawLatest.probabilities) 
        : (rawLatest.probabilities || {});

    // Normalisasi kunci probabilitas agar sesuai dengan standar komponen PrediksiAI (Capitalized)
    const probabilities = {
        High: rawProbabilities.High ?? rawProbabilities.high ?? 0,
        Medium: rawProbabilities.Medium ?? rawProbabilities.medium ?? 0,
        Low: rawProbabilities.Low ?? rawProbabilities.low ?? 0
    };

    const risk_factors = typeof rawLatest.risk_factors === 'string'
        ? JSON.parse(rawLatest.risk_factors)
        : (rawLatest.risk_factors || []);

    const latestRecord = {
        ...rawLatest,
        probabilities,
        risk_factors
    };

    // Gabungkan data untuk kemudahan akses dengan dukungan alias (key mapping)
    const data = { 
        ...siswa, 
        ...latestRecord,
        nama_siswa: siswa?.nama_siswa || siswa?.nama || latestRecord?.nama_siswa,
        nisn: siswa?.nisn || siswa?.Nisn || latestRecord?.nisn,
        parental_education_level: siswa?.parental_education_level || siswa?.pendidikan_ortu || latestRecord?.parental_education_level,
        risk_category: latestRecord?.risk_category || latestRecord?.status_risiko || latestRecord?.statusRisiko
    };

    // Pop-up selamat datang saat siswa masuk
    useEffect(() => {
        if (data.nama_siswa) {
            Swal.fire({
                title: `👋 Selamat Datang, ${data.nama_siswa}!`,
                text: "Senang melihatmu kembali. Yuk, cek progres belajarmu hari ini dan lihat sejauh mana kamu telah berkembang! 🚀",
                icon: "success",
                confirmButtonText: "Siap!",
                confirmButtonColor: "#2563eb", // Warna biru-600 menyesuaikan tema
                timer: 5000,
                timerProgressBar: true
            });
        }
    }, []); // Hanya dijalankan sekali saat komponen di-mount

    const translateMap = {
        'High': 'Tinggi', 'Medium': 'Sedang', 'Low': 'Rendah',
        'High School': 'SMA/SMK', 'College': 'Diploma/S1', 'Postgraduate': 'S2/S3',
        'Positive': 'Baik', 'Neutral': 'Biasa saja', 'Negative': 'Buruk',
        'Yes': 'Ada', 'No': 'Tidak',
        'Public': 'Negeri', 'Private': 'Swasta'
    };

    const translate = (val, field = "") => {
        if (!val) return '-';
        
        const specificTranslations = {
            income: { 'Medium': 'Menengah', 'Low': 'Rendah', 'High': 'Tinggi' },
            motivation: { 'Low': 'Kurang termotivasi', 'Medium': 'Cukup termotivasi', 'High': 'Sangat termotivasi' },
            teacher: { 'Low': 'Kurang baik', 'Medium': 'Cukup baik', 'High': 'Sangat baik' },
            involvement: { 'Low': 'Jarang terlibat', 'Medium': 'Cukup terlibat', 'High': 'Sangat terlibat' },
            resources: { 'Low': 'Terbatas', 'Medium': 'Cukup', 'High': 'Lengkap' }
        };

        if (field && specificTranslations[field] && specificTranslations[field][val]) {
            return specificTranslations[field][val];
        }

        return translateMap[val] || val;
    };

    const handleLogout = () => {
        if (window.confirm("Apakah Anda yakin ingin keluar?")) {
            navigate('/login-siswa');
        }
    };

    // Logika tema warna dinamis berdasarkan kategori risiko
    const riskThemes = {
        High: { gradient: "from-red-600 to-red-700 shadow-red-200", subText: "text-red-100", detail: "text-red-50" },
        Medium: { gradient: "from-orange-500 to-orange-600 shadow-orange-200", subText: "text-orange-100", detail: "text-orange-50" },
        Low: { gradient: "from-green-600 to-green-700 shadow-green-200", subText: "text-green-100", detail: "text-green-50" }
    };

    const currentTheme = riskThemes[data.risk_category] || 
        { gradient: "from-blue-600 to-indigo-700 shadow-blue-200", subText: "text-blue-200", detail: "text-blue-100" };

    return (
        <div className="min-h-screen bg-blue-50">
            {/* Header Navbar untuk Siswa */}
            <nav className="bg-white border-b border-blue-100 p-4 px-6 sm:px-12 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <i className="ri-brain-fill text-3xl text-blue-600"></i>
                    <h1 className="text-2xl font-black text-blue-900 tracking-tight">EduPredict</h1>
                </div>
                <button 
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-all flex items-center gap-2 text-sm"
                >
                    <i className="ri-logout-box-r-line"></i> 
                    <span className="hidden sm:inline">Keluar</span>
                </button>
            </nav>

            <div className="max-w-6xl mx-auto p-4 sm:p-8">
                {/* 1. Card Selamat Datang & Ringkasan Risiko */}
                <div className={`bg-gradient-to-br ${currentTheme.gradient} rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden transition-all duration-500`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                <i className="ri-user-line"></i> Portal Siswa
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black mb-2">Hallo, {data.nama_siswa || data.nama || 'Siswa'}! 👋</h1>
                            <p className={`${currentTheme.detail} text-lg`}>NISN: {data.nisn || '-'} | Kelas: {data.kelas || '-'}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex items-center gap-4 sm:gap-6">
                            <div className="text-right">
                                <p className={`text-xs font-bold ${currentTheme.subText} uppercase mb-1`}>Status Risiko</p>
                                <p className="text-2xl font-black">
                                    {translate(data.risk_category || 'Low')}
                                </p>
                            </div>
                            <div className="h-12 w-px bg-white/20"></div>
                            <div className="text-center">
                                <p className={`text-[10px] font-bold ${currentTheme.subText} uppercase mb-1`}>Kepercayaan AI</p>
                                <p className="text-3xl font-black">{data.confidence || 0}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Grid Statistik Utama */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatBox title="Kehadiran" value={`${data.attendance || 0}%`} icon="ri-calendar-check-line" color="blue" />
                    <StatBox title="Nilai Rapor Sebelumnya" value={data.previous_scores || 0} icon="ri-award-line" color="amber" />
                    <StatBox title="Jam Belajar" value={`${data.hours_studied || 0} jam/mgg`} icon="ri-book-open-line" color="emerald" />
                    <StatBox title="Sesi Bimbel" value={`${data.tutoring_sessions || 0} sesi/bln`} icon="ri-presentation-line" color="indigo" />
                </div>

                <div className="space-y-8">
                    {/* 3. Analisis AI (Faktor & Rekomendasi) */}
                    <PrediksiAI 
                        predictionResult={{ 
                            siswa: data.nama_siswa || data.nama || 'Siswa',
                            prediksi: data 
                        }}
                        isSiswa={true}
                        hideHeader={true}
                        fullWidth={true} 
                    />

                    {/* 4. Detail Data Input Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-2 text-gray-800 border-b border-gray-50 pb-4">
                            <i className="ri-file-list-3-line text-blue-500"></i>
                            Ringkasan data belajar
                        </h2>
                        <div className="space-y-5">
                            <DetailItem label="Jam Tidur/malam" value={`${data.sleep_hours || 0} j/mlm`} />
                            <DetailItem label="Aktivitas Fisik/minggu" value={`${data.physical_activity || 0} j/mgg`} />
                            <DetailItem label="Tingkat Motivasi Belajar" value={translate(data.motivation_level, 'motivation')} />
                            <DetailItem label="Akses Internet di rumah" value={translate(data.internet_access)} />
                            <DetailItem label="Akses Sumber Belajar" value={translate(data.access_to_resources, 'resources')} />
                            <DetailItem label="Pengaruh Teman" value={translate(data.peer_influence)} />
                        </div>
                        <div className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                            <p className="text-xs text-blue-700 leading-relaxed font-medium">
                                <i className="ri-information-line mr-1"></i>
                                Data di atas adalah ringkasan yang digunakan oleh sistem EduPredict untuk menganalisis performa akademikmu.
                            </p>
                        </div>
                    </div>
                    
                    <div className="p-2 flex items-center justify-end">
                        <span className="text-xs font-bold text-gray-400 italic">Update Terakhir: {data.recorded_at ? new Date(data.recorded_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatBox({ title, value, icon, color }) {
    // Mapping warna statis untuk Tailwind agar tidak terkena purge
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600",
        amber: "bg-amber-50 text-amber-600",
        emerald: "bg-emerald-50 text-emerald-600",
        indigo: "bg-indigo-50 text-indigo-600"
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-5 transition-all hover:shadow-md">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${colorClasses[color] || "bg-gray-50 text-gray-600"}`}>
                <i className={icon}></i>
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
                <p className="text-2xl font-black text-gray-800">{value}</p>
            </div>
        </div>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="flex justify-between items-center group">
            <span className="text-sm text-gray-500 font-medium">{label}</span>
            <span className="text-sm text-gray-800 font-bold bg-gray-50 px-3 py-1 rounded-lg group-hover:bg-blue-50 transition-colors">{value}</span>
        </div>
    );
}

export default DashboardSiswaPage;