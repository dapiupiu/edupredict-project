import React, { useState, useEffect } from 'react';
import BASE_URL from '../utils/api';
import { useLocation } from 'react-router-dom';
import Sidebar from '../compenents/Sidebar';

import PilihSiswa from '../compenents/PilihSiswa';
import PrediksiAI from '../compenents/PrediksiAI';

function MonitoringPage() {
    const [open, setOpen] = useState(true);
    const [dataSiswa, setDataSiswa] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error("Sesi tidak valid. Silakan login kembali.");

                const response = await fetch(`${BASE_URL}/api/guru/students`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await response.json();

                if (result.success) {
                    setDataSiswa(result.data);
                }
            } catch (err) {
                console.error("Fetch Students Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    // Auto-select siswa jika diarahkan dari halaman daftar/dashboard
    useEffect(() => {
        if (dataSiswa.length > 0 && location.state?.studentId) {
            const studentId = location.state.studentId;
            const student = dataSiswa.find(s => s.id.toString() === studentId.toString());
            if (student) setSelectedStudent(student);
        }
    }, [dataSiswa, location.state]);

    const handleSelectStudent = (id) => {
        if (!id) {
            setSelectedStudent(null);
            return;
        }
        const student = dataSiswa.find(s => s.id.toString() === id.toString());
        setSelectedStudent(student);
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            <Sidebar open={open} setOpen={setOpen} />
            <div className={`flex-1 p-3 sm:p-6 md:p-8 transition-all duration-500 ${open ? 'md:ml-64' : 'md:ml-16'} ml-16 min-h-screen bg-blue-50`}>
                <h1 className="text-3xl font-bold">Monitoring Siswa</h1>
                <p className="mt-2">Pantau perkembangan siswa dan identifikasi potensi risiko sejak dini</p>

                <div className="mt-8">
                    <PilihSiswa 
                        dataSiswa={dataSiswa} 
                        selectedId={selectedStudent?.id}
                        onSelect={handleSelectStudent}
                    />
                </div>

                {selectedStudent && (
                    <div className="mt-8 space-y-6 animate-fadeIn">
                        {/* Card Informasi Data Lengkap Sesuai Input */}
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow border-t-4 border-blue-500">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-900">
                                <i className="ri-file-list-3-line"></i>
                                Informasi Detail Siswa
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                                <div className="space-y-1">
                                    <p className="text-gray-400 font-semibold uppercase text-[10px]">Identitas</p>
                                    <p className="font-medium text-gray-800">NISN: {selectedStudent.nisn || selectedStudent.Nisn}</p>
                                    <p className="font-medium text-gray-800">Kelas: {selectedStudent.kelas}</p>
                                    <p className="font-medium text-gray-800">Gender: {selectedStudent.gender === 'Male' ? 'Laki-laki' : 'Perempuan'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-400 font-semibold uppercase text-[10px]">Akademik</p>
                                    <p className="font-medium text-gray-800">Kehadiran: {selectedStudent.attendance || '0'}%</p>
                                    <p className="font-medium text-gray-800">Jam Belajar: {selectedStudent.hours_studied || '0'} j/mgg</p>
                                    <p className="font-medium text-gray-800">Rata-rata: {selectedStudent.previous_scores || '0'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-400 font-semibold uppercase text-[10px]">Perilaku</p>
                                    <p className="font-medium text-gray-800">Jam Tidur: {selectedStudent.sleep_hours || '0'} j/mlm</p>
                                    <p className="font-medium text-gray-800">Motivasi: {
                                        selectedStudent.motivation_level === 'High' ? 'Tinggi' :
                                        selectedStudent.motivation_level === 'Medium' ? 'Sedang' :
                                        selectedStudent.motivation_level === 'Low' ? 'Rendah' : '-'
                                    }</p>
                                    <p className="font-medium text-gray-800">Bimbel: {selectedStudent.tutoring_sessions || '0'} sesi</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-400 font-semibold uppercase text-[10px]">Lingkungan</p>
                                    <p className="font-medium text-gray-800">Internet: {selectedStudent.internet_access === 'Yes' ? 'Ada' : 'Tidak'}</p>
                                    <p className="font-medium text-gray-800">Pendapatan: {
                                        selectedStudent.family_income === 'High' ? 'Tinggi' :
                                        selectedStudent.family_income === 'Medium' ? 'Menengah' :
                                        selectedStudent.family_income === 'Low' ? 'Rendah' : '-'
                                    }</p>
                                    <p className="font-medium text-gray-800">Sekolah: {selectedStudent.school_type === 'Public' ? 'Negeri' : 'Swasta'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bagian Analisis AI menggunakan komponen PrediksiAI */}
                        <div className="bg-white rounded-xl shadow overflow-hidden">
                            <div className="p-6 sm:p-8 pb-0">
                                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                                    <i className="ri-robot-line text-blue-500"></i>
                                    Hasil Analisis AI
                                </h2>
                            </div>
                            <PrediksiAI 
                                predictionResult={{ 
                                    siswa: selectedStudent.nama_siswa || selectedStudent.nama, 
                                    prediksi: selectedStudent 
                                }} 
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default MonitoringPage;