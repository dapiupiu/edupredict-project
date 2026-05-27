import React, { useState, useEffect } from 'react';
import BASE_URL from '../utils/api';
import Sidebar from '../compenents/Sidebar';
import StatCard from "../compenents/StatCard";
import InsightAI from "../compenents/InsightAI";
import DaftarSiswa from "../compenents/DaftarSiswa";
import GrafikRisiko from "../compenents/GrafikRisiko";
import Swal from 'sweetalert2';

function DashboardGuruPage() {
    const [open, setOpen] = useState(true);

    // Untuk desain: isi initial state dengan data dummy
    const [data, setData] = useState({
        ringkasan: {
            total_siswa: 0,
            risiko_tinggi: 0,
            risiko_sedang: 0,
            risiko_rendah: 0,
            belum_diprediksi: 0
        },
        siswa_berisiko: [],
        tren: [],
        notifikasi: {
            unread: 0,
            terbaru: []
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDashboard();
    }, []);
    useEffect(() => {
        const userData = localStorage.getItem('user');
        let userName = '';
        if (userData) {
            try {
                const user = JSON.parse(userData);
                userName = user.nama || '';
            } catch (e) {
                console.error("Failed to parse user data from localStorage", e);
            }
        }

        Swal.fire({
            title: `👋 Selamat Datang, ${userName}!`,
            text: "Selamat datang di Dashboard Guru. Mari pantau perkembangan siswa hari ini.",
            icon: "success",
            confirmButtonText: "Mulai",
            timer: 3000,
            timerProgressBar: true
        });
    }, []);
    async function getDashboard() {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Silakan login kembali.");

            const response = await fetch(
                `${BASE_URL}/api/guru/dashboard`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Gagal mengambil data dari server.");
            }

            const resultDash = await response.json();

            if (resultDash.success){
                // Ambil data langsung dari response backend
                const { ringkasan, siswa_berisiko, notifikasi } = resultDash.data;

                // Transformasi data untuk grafik tren menggunakan data siswa_berisiko
                const trenData = (siswa_berisiko || []).map(s => {
                    let probs = {};
                    try {
                        // Gunakan probabilities jika ada, jika tidak gunakan confidence sebagai fallback
                        probs = typeof s.probabilities === 'string' 
                            ? JSON.parse(s.probabilities) 
                            : (s.probabilities || {});
                    } catch(e) {
                        probs = {};
                    }
                    
                    return {
                        nama: (s.nama_siswa || 'Siswa').split(' ')[0],
                        tinggi: probs.High || (s.risk_category === 'High' ? s.confidence : 0),
                        sedang: probs.Medium || (s.risk_category === 'Medium' ? s.confidence : 0),
                        rendah: probs.Low || (s.risk_category === 'Low' ? s.confidence : 0),
                    };
                });

                setData({
                    ringkasan,
                    siswa_berisiko,
                    notifikasi,
                    tren: trenData
                });
            } else {
                setError("Gagal memproses data dashboard.");
            }
        } catch (error) {
            console.error("Dashboard Fetch Error:", error);
            setError(error.message || "Terjadi kesalahan saat menghubungkan ke server.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen bg-blue-50">
            <Sidebar open={open} setOpen={setOpen} />
            <div className={`flex-1 p-3 sm:p-6 md:p-8 transition-all duration-500 ${open ? 'md:ml-64' : 'md:ml-16'} ml-16 min-h-screen`}>
                <h1 className="text-3xl font-bold">Dashboard Guru</h1>
                <p className="mt-2">Selamat datang di dashboard guru</p>

                {loading && (
                    <div className="flex justify-center items-center h-64 text-blue-600 font-medium">
                        <i className="ri-loader-4-line animate-spin mr-2 text-2xl"></i> Memuat data...
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                        <i className="ri-error-warning-line text-xl"></i>
                        <p>{error}</p>
                    </div>
                )}

                {data && !loading && (
                    <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
                    <StatCard
                        title="Total Siswa"
                        total={data.ringkasan.total_siswa}
                        type="total"
                    />
                    <StatCard
                        title="Risiko Rendah"
                        total={data.ringkasan.risiko_rendah}
                        type="rendah"
                    />
                    <StatCard
                        title="Risiko Sedang"
                        total={data.ringkasan.risiko_sedang}
                        type="sedang"
                    />
                    <StatCard
                        title="Risiko Tinggi"
                        total={data.ringkasan.risiko_tinggi}
                        type="tinggi"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
                    <div className="lg:col-span-2 space-y-5">
                         <InsightAI 
                            ringkasan={data.ringkasan} 
                            siswaBerisiko={data.siswa_berisiko} 
                        />
                        <GrafikRisiko data={data.tren || []} />
                    </div>
                    <div className="lg:col-span-1">
                        <DaftarSiswa 
                            className="h-full" 
                            isDashboard={true} 
                            dataSiswa={data.siswa_berisiko} 
                        />
                    </div>
                </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default DashboardGuruPage;