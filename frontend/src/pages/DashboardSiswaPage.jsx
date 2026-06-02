import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import PrediksiAI from "../components/PrediksiAI";
import Swal from "sweetalert2";
import logoEdupredict from "../assets/logo-edupredict.png";

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

    // FIX NO. 5: Baca dari prediksi_terbaru yang sudah disiapkan backend,
    // bukan sort histori manual yang rawan error kalau histori kosong/null.
    const { siswa, prediksi_terbaru } = studentData;

    // Parse probabilities & risk_factors dari prediksi_terbaru (bisa string JSON dari DB)
    const rawProbabilities = prediksi_terbaru
        ? typeof prediksi_terbaru.probabilities === "string"
            ? (() => { try { return JSON.parse(prediksi_terbaru.probabilities); } catch { return {}; } })()
            : (prediksi_terbaru.probabilities || {})
        : {};

    const probabilities = {
        High: rawProbabilities.High ?? rawProbabilities.high ?? 0,
        Medium: rawProbabilities.Medium ?? rawProbabilities.medium ?? 0,
        Low: rawProbabilities.Low ?? rawProbabilities.low ?? 0,
    };

    const risk_factors = prediksi_terbaru
        ? typeof prediksi_terbaru.risk_factors === "string"
            ? (() => { try { return JSON.parse(prediksi_terbaru.risk_factors); } catch { return []; } })()
            : (prediksi_terbaru.risk_factors || [])
        : [];

    // Gabungkan data siswa + prediksi terbaru menjadi satu objek untuk PrediksiAI dan card info
    const data = {
        ...siswa,
        ...(prediksi_terbaru || {}),
        probabilities,
        risk_factors,
        nama_siswa: siswa?.nama_siswa || siswa?.nama,
        nisn: siswa?.nisn,
    };

    // Pop-up selamat datang
    useEffect(() => {
        if (data.nama_siswa) {
            Swal.fire({
                title: `👋 Selamat Datang, ${data.nama_siswa}!`,
                text: "Senang melihatmu kembali. Yuk, cek progres belajarmu hari ini dan lihat sejauh mana kamu telah berkembang! 🚀",
                icon: "success",
                confirmButtonText: "Siap!",
                confirmButtonColor: "#2563eb",
                timer: 5000,
                timerProgressBar: true,
            });
        }
    }, []);

    const translateMap = {
        High: "Tinggi", Medium: "Sedang", Low: "Rendah",
        Positive: "Baik", Neutral: "Biasa saja", Negative: "Buruk",
        Yes: "Ada", No: "Tidak",
        Male: "Laki-laki", Female: "Perempuan",
    };

    const translate = (val, field = "") => {
        if (!val) return "-";
        const specificTranslations = {
            motivation: { Low: "Kurang termotivasi", Medium: "Cukup termotivasi", High: "Sangat termotivasi" },
            resources: { Low: "Terbatas", Medium: "Cukup", High: "Lengkap" },
        };
        if (field && specificTranslations[field]?.[val]) return specificTranslations[field][val];
        return translateMap[val] || val;
    };

    const handleLogout = () => {
        if (window.confirm("Apakah Anda yakin ingin keluar?")) {
            navigate("/login-siswa");
        }
    };

    const handlePrint = () => {
        const originalTitle = document.title;
        document.title = `Laporan_Prediksi_${data.nama_siswa || "Siswa"}_${data.nisn || ""}`;
        window.print();
        document.title = originalTitle;
    };

    const riskThemes = {
        High: { gradient: "from-red-600 to-red-700 shadow-red-200", subText: "text-red-100", detail: "text-red-50" },
        Medium: { gradient: "from-orange-500 to-orange-600 shadow-orange-200", subText: "text-orange-100", detail: "text-orange-50" },
        Low: { gradient: "from-green-600 to-green-700 shadow-green-200", subText: "text-green-100", detail: "text-green-50" },
    };

    const currentTheme = riskThemes[data.risk_category] ||
        { gradient: "from-blue-600 to-indigo-700 shadow-blue-200", subText: "text-blue-200", detail: "text-blue-100" };

    // Jika belum ada prediksi sama sekali
    const hasPrediksi = !!data.risk_category;

    return (
        <div className="min-h-screen bg-blue-50">
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    body { background-color: white !important; }
                    .print\\:hidden { display: none !important; }
                    .min-h-screen { background-color: white !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
            `}} />

            {/* Header Navbar */}
            <nav className="bg-white border-b border-blue-100 p-4 px-6 sm:px-12 flex justify-between items-center sticky top-0 z-50 print:hidden">
                <div className="flex items-center gap-3">
                    <img src={logoEdupredict} alt="logo" className="w-16 h-16 object-contain flex-shrink-0" />
                    <h1 className="text-2xl font-black text-blue-900 tracking-tight">EduPredict</h1>
                </div>
                <div className="flex items-center gap-3">
                    {hasPrediksi && (
                        <button
                            onClick={handlePrint}
                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition-all flex items-center gap-2 text-sm"
                        >
                            <i className="ri-printer-line"></i>
                            <span className="hidden sm:inline">Cetak Laporan</span>
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-all flex items-center gap-2 text-sm"
                    >
                        <i className="ri-logout-box-r-line"></i>
                        <span className="hidden sm:inline">Keluar</span>
                    </button>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto p-4 sm:p-8 print:p-0 print:max-w-full">
                {/* Header cetak */}
                <div className="hidden print:block mb-8 text-center border-b-2 border-blue-900 pb-4">
                    <h1 className="text-3xl font-black text-blue-900">LAPORAN PREDIKSI AKADEMIK SISWA</h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest mt-1">Sistem Deteksi Dini EduPredict</p>
                </div>

                {/* 1. Card Selamat Datang & Ringkasan Risiko */}
                <div className={`bg-gradient-to-br ${currentTheme.gradient} rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden transition-all duration-500`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                <i className="ri-user-line"></i> Portal Siswa
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black mb-2">Hallo, {data.nama_siswa || "Siswa"}! 👋</h1>
                            <p className={`${currentTheme.detail} text-lg`}>NISN: {data.nisn || "-"} | Kelas: {data.kelas || "-"}</p>
                        </div>
                        {hasPrediksi ? (
                            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex items-center gap-4 sm:gap-6">
                                <div className="text-right">
                                    <p className={`text-xs font-bold ${currentTheme.subText} uppercase mb-1`}>Status Risiko</p>
                                    <p className="text-2xl font-black">{translate(data.risk_category)}</p>
                                </div>
                                <div className="h-12 w-px bg-white/20"></div>
                                <div className="text-center">
                                    <p className={`text-[10px] font-bold ${currentTheme.subText} uppercase mb-1`}>Kepercayaan AI</p>
                                    <p className="text-3xl font-black">{data.confidence || 0}%</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
                                <p className="text-white/80 text-sm font-medium">Belum ada data prediksi.</p>
                                <p className="text-white/60 text-xs mt-1">Hubungi guru untuk input data akademik.</p>
                            </div>
                        )}
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
                    {/* 3. Analisis AI */}
                    {hasPrediksi ? (
                        <PrediksiAI
                            predictionResult={{
                                siswa: data.nama_siswa || "Siswa",
                                prediksi: data,
                            }}
                            isSiswa={true}
                            hideHeader={true}
                            fullWidth={true}
                        />
                    ) : (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                            <i className="ri-robot-line text-5xl text-gray-300 mb-4 block"></i>
                            <h3 className="text-lg font-bold text-gray-500">Analisis AI Belum Tersedia</h3>
                            <p className="text-gray-400 text-sm mt-2">
                                Data akademikmu belum diinput oleh guru. Hubungi wali kelas untuk mendapatkan analisis prediksi.
                            </p>
                        </div>
                    )}

                    {/* 4. Detail Data Input Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-2 text-gray-800 border-b border-gray-50 pb-4">
                            <i className="ri-file-list-3-line text-blue-500"></i>
                            Ringkasan data belajar
                        </h2>
                        <div className="space-y-5">
                            <DetailItem label="Jenis Kelamin" value={translate(data.gender)} />
                            <DetailItem label="Jam Tidur/malam" value={`${data.sleep_hours || 0} j/mlm`} />
                            <DetailItem label="Aktivitas Fisik/minggu" value={`${data.physical_activity || 0} j/mgg`} />
                            <DetailItem label="Tingkat Motivasi Belajar" value={translate(data.motivation_level, "motivation")} />
                            <DetailItem label="Akses Internet di rumah" value={translate(data.internet_access)} />
                            <DetailItem label="Akses Sumber Belajar" value={translate(data.access_to_resources, "resources")} />
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
                        <span className="text-xs font-bold text-gray-400 italic">
                            Update Terakhir:{" "}
                            {data.recorded_at
                                ? new Date(data.recorded_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
                                : "-"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatBox({ title, value, icon, color }) {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600",
        amber: "bg-amber-50 text-amber-600",
        emerald: "bg-emerald-50 text-emerald-600",
        indigo: "bg-indigo-50 text-indigo-600",
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