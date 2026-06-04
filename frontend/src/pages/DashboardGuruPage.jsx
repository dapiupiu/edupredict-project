import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BASE_URL from '../utils/api';
import Sidebar from '../components/Sidebar';
import StatCard from "../components/StatCard";
import InsightAI from "../components/InsightAI";
import DaftarSiswa from "../components/DaftarSiswa";
import GrafikRisiko from "../components/GrafikRisiko";
import BottomNav from '../components/BottomNav';
import Swal from 'sweetalert2';
import TopBar from '../components/TopBar';

function DashboardGuruPage() {
    const location = useLocation();
    const [open, setOpen] = useState(() => {
        const saved = localStorage.getItem('sidebarOpen');
        return saved !== null ? JSON.parse(saved) : true;
    });

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
        localStorage.setItem('sidebarOpen', JSON.stringify(open));
    }, [open]);

    useEffect(() => {
        // Hanya tampilkan pop-up jika datang dari halaman login
        if (!location.state?.fromLogin) return;

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
    }, [location.state]);

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
                    // Menggunakan risk_category dan confidence langsung
                    // Probabilities tidak lagi diperlukan untuk grafik ini
                    // karena hanya menampilkan 1 balok per siswa

                    
                    return {
                        nama: (s.nama_siswa || 'Siswa').split(' ')[0],
                        risk_category: s.risk_category, // Kategori risiko ('High', 'Medium', 'Low')
                        value: s.confidence // Nilai confidence sebagai tinggi balok
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
            <div className={`flex-1 transition-all duration-500 ${open ? 'md:ml-64' : 'md:ml-16'} min-h-screen flex flex-col bg-blue-50`}>
                <TopBar />
                <div className="p-3 sm:p-6 md:p-8 pb-20 md:pb-8">
                <h1 className="md:block text-3xl font-bold">Dashboard Guru</h1>
                <p className="md:block mt-2">Selamat datang di dashboard guru</p>

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
                <div className="mt-8 space-y-8">
                    <InsightAI 
                        ringkasan={data.ringkasan} 
                        siswaBerisiko={data.siswa_berisiko} 
                    />
                    <GrafikRisiko data={data.tren || []} />
                    <DaftarSiswa 
                        isDashboard={true} 
                        dataSiswa={data.siswa_berisiko} 
                    />
                </div>
                    </>
                )}
                </div>
            </div>
            <BottomNav />
        </div>
    )
}

export default DashboardGuruPage;