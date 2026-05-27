import React, { useState, useEffect } from 'react';
import BASE_URL from '../utils/api';
import Sidebar from '../compenents/Sidebar';
import DaftarSiswa from "../compenents/DaftarSiswa";
import SearchFilter from '../compenents/SearchFilter';
import PageNavigation from '../compenents/PageNavigation';

function DaftarSiswaPage() {
    const [open, setOpen] = useState(true);
    const [dataSiswa, setDataSiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [riskFilter, setRiskFilter] = useState('semua'); // 'semua', 'rendah', 'sedang', 'tinggi'
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Jumlah item per halaman

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error("Silakan login kembali.");

                const response = await fetch(`${BASE_URL}/api/guru/students`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await response.json();

                if (result.success) {
                    setDataSiswa(result.data);
                } else {
                    setError(result.message || "Gagal mengambil data siswa.");
                }
            } catch (err) {
                console.error("Fetch Students Error:", err);
                setError("Terjadi kesalahan saat menghubungkan ke server.");
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []); // Dependency array kosong agar hanya dijalankan sekali saat komponen mount

    // Filter dan paginasi data siswa
    const filteredStudents = dataSiswa.filter(student => {
        const matchesSearch = student.nama_siswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              student.nisn.includes(searchQuery);

        const matchesRisk = riskFilter === 'semua' ||
                            (student.risk_category && student.risk_category.toLowerCase() === riskFilter);

        return matchesSearch && matchesRisk;
    });

    // Hitung total halaman
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    // Dapatkan siswa untuk halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    // Reset halaman ke 1 jika filter atau search berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, riskFilter]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteSiswa = async (id, name) => {
        if (!window.confirm(`Apakah Anda yakin ingin menghapus data siswa ${name} secara permanen?`)) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Sesi berakhir. Silakan login kembali.");

            const response = await fetch(`${BASE_URL}/api/guru/students/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            // Update state local
            setDataSiswa(prev => prev.filter(s => s.id !== id));
            alert("Data siswa berhasil dihapus.");
        } catch (err) {
            console.error("Delete Error:", err);
            alert(err.message || "Gagal menghapus data siswa.");
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            <Sidebar open={open} setOpen={setOpen} />
            <div className={`flex-1 p-3 sm:p-6 md:p-8 transition-all duration-500 ${open ? 'md:ml-64' : 'md:ml-16'} ml-16 min-h-screen bg-blue-50`}>
                <h1 className="text-3xl font-bold">Daftar Siswa</h1>
                <p className="mt-2">Lihat Informasi Siswa Secara Lengkap</p>

                {error && (
                    <div className="mt-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                        <i className="ri-error-warning-line text-xl"></i>
                        <p>{error}</p>
                    </div>
                )}
                <div className="mt-8">
                    <SearchFilter
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        riskFilter={riskFilter}
                        setRiskFilter={setRiskFilter}
                    />
                </div>

                <div className="mt-8">
                    <DaftarSiswa
                        isDaftarSiswa={true}
                        dataSiswa={currentStudents}
                        isLoading={loading}
                        onDelete={handleDeleteSiswa}
                        noDataMessage={searchQuery || riskFilter !== 'semua' ? "Tidak ditemukan data siswa sesuai kriteria." : "Belum ada siswa yang terdaftar."}
                    />
                </div>

                <div className="mt-8">
                    <PageNavigation
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>

            </div>
        </div>
    )
}

export default DaftarSiswaPage;