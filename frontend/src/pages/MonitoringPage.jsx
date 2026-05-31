import React, { useState, useEffect } from "react";
import BASE_URL from "../utils/api";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import PilihSiswa from "../components/PilihSiswa";
import PrediksiAI from "../components/PrediksiAI";

function MonitoringPage() {
  const [open, setOpen] = useState(true);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Sesi tidak valid. Silakan login kembali.");

        const response = await fetch(`${BASE_URL}/api/guru/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (result.success) {
          // Deduplikasi data berdasarkan ID siswa di frontend, ambil yang terbaru
          const uniqueStudentsMap = new Map();
          result.data.forEach((student) => {
            // Pastikan last_recorded adalah objek Date untuk perbandingan
            const currentRecordedAt = new Date(student.last_recorded);

            if (!uniqueStudentsMap.has(student.id)) {
              // Jika siswa belum ada di map, tambahkan
              uniqueStudentsMap.set(student.id, student);
            } else {
              // Jika siswa sudah ada di map, bandingkan timestamp
              const existingStudent = uniqueStudentsMap.get(student.id);
              const existingRecordedAt = new Date(
                existingStudent.last_recorded,
              );

              if (currentRecordedAt > existingRecordedAt) {
                // Jika catatan siswa saat ini lebih baru, ganti yang sudah ada
                uniqueStudentsMap.set(student.id, student);
              }
            }
          });

          // Urutkan siswa berdasarkan nama secara alfabet (A-Z)
          const sortedStudents = Array.from(uniqueStudentsMap.values()).sort((a, b) => {
            const nameA = (a.nama_siswa || a.nama || "").toLowerCase();
            const nameB = (b.nama_siswa || b.nama || "").toLowerCase();
            return nameA.localeCompare(nameB);
          });
          setDataSiswa(sortedStudents);
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
      handleSelectStudent(location.state.studentId);
    }
  }, [dataSiswa, location.state]);

  const handleSelectStudent = async (id) => {
    if (!id) {
      setSelectedStudent(null);
      return;
    }

    // Ambil info dasar dari dataSiswa yang sudah ada
    const basicInfo = dataSiswa.find((s) => s.id.toString() === id.toString());

    try {
      const token = localStorage.getItem("token");
      // Ambil data lengkap dari endpoint detail siswa (sudah ada di backend)
      const response = await fetch(`${BASE_URL}/api/guru/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();

      if (result.success) {
        const { siswa, histori } = result.data;
        // Ambil catatan akademik terbaru (indeks terakhir karena histori di-reverse di backend)
        const latestRecord =
          histori && histori.length > 0 ? histori[histori.length - 1] : {};
        // Gabungkan data profil dengan data akademik & prediksi terbaru
        setSelectedStudent({ ...siswa, ...latestRecord });
      } else {
        setSelectedStudent(basicInfo);
      }
    } catch (err) {
      console.error("Gagal memuat detail siswa:", err);
      setSelectedStudent(basicInfo);
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar open={open} setOpen={setOpen} />
      <div
        className={`flex-1 p-3 sm:p-6 md:p-8 transition-all duration-500 ${open ? "md:ml-64" : "md:ml-16"} ml-16 min-h-screen bg-blue-50`}
      >
        <h1 className="text-3xl font-bold">Monitoring Siswa</h1>
        <p className="mt-2">
          Pantau perkembangan siswa dan identifikasi potensi risiko sejak dini
        </p>

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
                  <p className="text-gray-400 font-semibold uppercase text-[10px]">
                    Identitas Siswa
                  </p>
                  <p className="font-medium text-gray-800">
                    NISN: {selectedStudent.nisn}
                  </p>
                  <p className="font-medium text-gray-800">
                    Kelas: {selectedStudent.kelas}
                  </p>
                  <p className="font-medium text-gray-800">
                    Jenis Kelamin:{" "}
                    {selectedStudent.gender === "Male"
                      ? "Laki-laki"
                      : "Perempuan"}
                  </p>
                  <p className="font-medium text-gray-800">
                    Pendidikan Ortu:{" "}
                    {selectedStudent.parental_education_level === "High School"
                      ? "SMA/SMK"
                      : selectedStudent.parental_education_level === "College"
                        ? "Diploma/S1"
                        : selectedStudent.parental_education_level ===
                            "Postgraduate"
                          ? "S2/S3"
                          : selectedStudent.parental_education_level || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-semibold uppercase text-[10px]">
                    Data Akademik
                  </p>
                  <p className="font-medium text-gray-800">
                    Kehadiran: {selectedStudent.attendance || "0"}%
                  </p>
                  <p className="font-medium text-gray-800">
                    Jam Belajar: {selectedStudent.hours_studied || "0"} j/mgg
                  </p>
                  <p className="font-medium text-gray-800">
                    Nilai Rapor Sebelumnya:{" "}
                    {selectedStudent.previous_scores || "0"}
                  </p>
                  <p className="font-medium text-gray-800">
                    Aktivitas Fisik: {selectedStudent.physical_activity || "0"}{" "}
                    j/mgg
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-semibold uppercase text-[10px]">
                    Perilaku Belajar
                  </p>
                  <p className="font-medium text-gray-800">
                    Jam Tidur: {selectedStudent.sleep_hours || "0"} j/mlm
                  </p>
                  <p className="font-medium text-gray-800">
                    Motivasi:{" "}
                    {selectedStudent.motivation_level === "High"
                      ? "Sangat Termotivasi"
                      : selectedStudent.motivation_level === "Medium"
                        ? "Cukup Termotivasi"
                        : selectedStudent.motivation_level === "Low"
                          ? "Kurang Termotivasi"
                          : "-"}
                  </p>
                  <p className="font-medium text-gray-800">
                    Sesi Bimbel: {selectedStudent.tutoring_sessions || "0"} sesi
                  </p>
                  <p className="font-medium text-gray-800">
                    Pengaruh Teman:{" "}
                    {selectedStudent.peer_influence === "Positive"
                      ? "Baik"
                      : selectedStudent.peer_influence === "Neutral"
                        ? "Biasa saja"
                        : selectedStudent.peer_influence === "Negative"
                          ? "Buruk"
                          : "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 font-semibold uppercase text-[10px]">
                    Faktor Sosial dan Lingkungan
                  </p>
                  <p className="font-medium text-gray-800">
                    Internet:{" "}
                    {selectedStudent.internet_access === "Yes"
                      ? "Ada"
                      : "Tidak"}
                  </p>
                  <p className="font-medium text-gray-800">
                    Pendapatan Ortu:{" "}
                    {selectedStudent.family_income === "High"
                      ? "Tinggi"
                      : selectedStudent.family_income === "Medium"
                        ? "Menengah"
                        : selectedStudent.family_income === "Low"
                          ? "Rendah"
                          : "-"}
                  </p>
                  <p className="font-medium text-gray-800">
                    Sekolah:{" "}
                    {selectedStudent.school_type === "Public"
                      ? "Negeri"
                      : "Swasta"}
                  </p>
                  <p className="font-medium text-gray-800">
                    Kualitas Guru:{" "}
                    {selectedStudent.teacher_quality === "High"
                      ? "Sangat baik"
                      : selectedStudent.teacher_quality === "Medium"
                        ? "Cukup baik"
                        : selectedStudent.teacher_quality === "Low"
                          ? "Kurang baik"
                          : "-"}
                  </p>
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
                  prediksi: selectedStudent,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonitoringPage;
