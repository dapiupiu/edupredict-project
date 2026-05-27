import React, { useState, useEffect } from 'react';
import BASE_URL from '../utils/api';
import Sidebar from '../compenents/Sidebar';
import DaftarSiswa from "../compenents/DaftarSiswa";
import SearchFilter from "../compenents/SearchFilter";
import PageNavigation from "../compenents/PageNavigation";

function DaftarSiswaPage() {
    const [open, setOpen] = useState(true);
    const [dataSiswa, setDataSiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [riskFilter, setRiskFilter] = useState("semua");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Ambil data siswa
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`${BASE_URL}/api/guru/students`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (result.success) {
                    // Deduplikasi data berdasarkan ID siswa di frontend, ambil yang terbaru
                    const uniqueStudentsMap = new Map();
                    result.data.forEach(student => {
                        // Pastikan last_recorded adalah objek Date untuk perbandingan
                        const currentRecordedAt = new Date(student.last_recorded);

                        if (!uniqueStudentsMap.has(student.id)) {
                            // Jika siswa belum ada di map, tambahkan
                            uniqueStudentsMap.set(student.id, student);
                        } else {
                            // Jika siswa sudah ada di map, bandingkan timestamp
                            const existingStudent = uniqueStudentsMap.get(student.id);
                            const existingRecordedAt = new Date(existingStudent.last_recorded);

                            if (currentRecordedAt > existingRecordedAt) {
                                // Jika catatan siswa saat ini lebih baru, ganti yang sudah ada
                                uniqueStudentsMap.set(student.id, student);
                            }
                        }
                    });
                    setDataSiswa(Array.from(uniqueStudentsMap.values()));

                    // cek data dari backend
                    console.log(result.data);
                } else {
                    setError(
                        result.message ||
                        "Gagal mengambil data siswa"
                    );
                }
            } catch (err) {
                console.error("Fetch Error:", err);

                setError(
                    "Terjadi kesalahan saat menghubungkan ke server"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Filter data
    const filteredStudents = dataSiswa.filter((student) => {

        // Nama
        const nama = String(
            student.nama_siswa ||
            student.nama ||
            ""
        )
            .trim()
            .toLowerCase();

        // NISN
        const nisn = String(
            student.nisn ||
            student.Nisn ||
            ""
        )
            .trim();

        // Input search
        const query = searchQuery
            .trim()
            .toLowerCase();

        // Filter pencarian
        const matchesSearch =
            query === "" ||
            nama.includes(query) ||
            nisn.includes(query);

        // Filter risiko
        const studentRisk = String(
            student.risk_category || ""
        )
            .trim()
            .toLowerCase();

        const matchesRisk =
            riskFilter === "semua" ||
            studentRisk === riskFilter.toLowerCase();

        return matchesSearch && matchesRisk;
    });

    // Reset halaman ketika search/filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, riskFilter]);

    // Hitung total halaman
    const totalPages = Math.ceil(
        filteredStudents.length / itemsPerPage
    );

    // Ambil data sesuai halaman
    const indexOfLastItem =
        currentPage * itemsPerPage;

    const indexOfFirstItem =
        indexOfLastItem - itemsPerPage;

    const currentStudents =
        filteredStudents.slice(
            indexOfFirstItem,
            indexOfLastItem
        );

    // Pindah halaman
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Hapus siswa
    const handleDeleteSiswa = async (id, name) => {

        const confirmDelete = window.confirm(
            `Apakah Anda yakin ingin menghapus data siswa ${name}?`
        );

        if (!confirmDelete) return;

        try {
            const token =
                localStorage.getItem("token");

            const response = await fetch(`${BASE_URL}/api/guru/students/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

        } catch (err) {

            console.error(
                "Delete Error:",
                err
            );

            alert(
                err.message ||
                "Gagal menghapus siswa"
            );
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50">

            <Sidebar
                open={open}
                setOpen={setOpen}
            />

            <div
                className={`
                    flex-1
                    p-3 sm:p-6 md:p-8
                    transition-all
                    duration-500
                    ${open ? "md:ml-64" : "md:ml-16"}
                    ml-16
                `}
            >

                <h1 className="text-3xl font-bold">
                    Daftar Siswa
                </h1>

                <p className="mt-2">
                    Lihat Informasi Siswa Secara Lengkap
                </p>

                {error && (
                    <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-600">
                        {error}
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
                        startIndex={indexOfFirstItem}
                        noDataMessage={
                            searchQuery ||
                                riskFilter !== "semua"
                                ? "Tidak ditemukan data siswa sesuai pencarian"
                                : "Belum ada siswa"
                        }
                    />
                </div>

                {totalPages > 1 && (
                    <div className="mt-8">
                        <PageNavigation
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}

            </div>

        </div>
    );
}

export default DaftarSiswaPage;