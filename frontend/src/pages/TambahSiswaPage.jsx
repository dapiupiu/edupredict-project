import React, { useState } from 'react';
import BASE_URL from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import DataSiswaInput from '../compenents/DataSiswaInput';
import StepTambahSiswa from '../compenents/StepTambahSiswa';
import PrediksiAI from '../compenents/PrediksiAI';

function TambahSiswaPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        nama_siswa: '',
        nisn: '',
        kelas: '',
        gender: '',
        parental_education_level: '',
        hours_studied: '',
        attendance: '',
        previous_scores: '',
        sleep_hours: '',
        tutoring_sessions: '',
        physical_activity: '',
        parental_involvement: '',
        access_to_resources: '',
        motivation_level: '',
        internet_access: '',
        family_income: '',
        peer_influence: '',
        teacher_quality: '',
        // Default values for hidden requirements
        school_type: 'Public',
        distance_from_home: 'Moderate',
        learning_disabilities: 'No'
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [existingStudents, setExistingStudents] = useState([]);
    const [predictionResult, setPredictionResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const response = await fetch('http://localhost:5000/api/guru/students', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = await response.json();
                if (result.success) setExistingStudents(result.data);
            } catch (err) {
                console.error("Gagal memuat data siswa untuk validasi:", err);
            }
        };
        fetchStudents();
    }, []);

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'nama_siswa', 'nisn', 'kelas', 'gender', 'parental_education_level',
            'hours_studied', 'attendance', 'previous_scores', 'sleep_hours',
            'tutoring_sessions', 'physical_activity', 'parental_involvement',
            'access_to_resources', 'motivation_level', 'internet_access',
            'family_income', 'peer_influence', 'teacher_quality'
        ];

        requiredFields.forEach(field => {
            if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
                newErrors[field] = 'Bagian ini harus diisi';
            }
        });

        // Cek Duplikasi Nama & NISN di frontend
        const isDuplicateNisn = existingStudents.some(s => String(s.nisn) === String(formData.nisn));
        const isDuplicateNama = existingStudents.some(s => s.nama_siswa.toLowerCase().trim() === formData.nama_siswa.toLowerCase().trim());

        if (isDuplicateNisn) {
            newErrors.nisn = 'NISN tersebut sudah terdapat di daftar siswa';
        }
        if (isDuplicateNama) {
            newErrors.nama_siswa = 'Nama tersebut sudah terdapat di daftar siswa';
        }

        if (formData.nisn && !/^\d+$/.test(formData.nisn)) {
            newErrors.nisn = 'NISN harus berupa angka';
        }  else if (!/^[0-9]{8}$/.test(formData.nisn)) { 
            newErrors.nisn = 'NISN harus terdiri dari 8 digit angka';
        }

        // Validasi Rentang Nilai Numerik
        if (formData.hours_studied && (formData.hours_studied < 4 || formData.hours_studied > 36)) {
            newErrors.hours_studied = 'Rentang: 4 - 36 jam';
        }
        if (formData.attendance && (formData.attendance < 60 || formData.attendance > 100)) {
            newErrors.attendance = 'Rentang: 60 - 100%';
        }
        if (formData.previous_scores && (formData.previous_scores < 0 || formData.previous_scores > 100)) {
            newErrors.previous_scores = 'Skala: 0 - 100';
        }
        if (formData.sleep_hours && (formData.sleep_hours < 4 || formData.sleep_hours > 10)) {
            newErrors.sleep_hours = 'Rentang: 4 - 10 jam';
        }
        if (formData.tutoring_sessions && (formData.tutoring_sessions < 0 || formData.tutoring_sessions > 4)) {
            newErrors.tutoring_sessions = 'Maksimal 4 sesi';
        }
        if (formData.physical_activity && (formData.physical_activity < 0 || formData.physical_activity > 6)) {
            newErrors.physical_activity = 'Maksimal 6';
        }

        return newErrors;
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const firstError = document.querySelector('.text-red-500');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Sesi berakhir. Silakan login kembali.");

            const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

            // Tahap 1: Simpan Siswa
            const resSiswa = await fetch(`${BASE_URL}/api/guru/students`, {
                method: 'POST',
                headers,
                body: JSON.stringify(formData)
            });
            const dataSiswa = await resSiswa.json();
            
            if (!resSiswa.ok) {
                if (resSiswa.status === 409 && dataSiswa.errors) {
                    setErrors(prev => ({ ...prev, ...dataSiswa.errors }));
                    setTimeout(() => {
                        const firstError = document.querySelector('.text-red-500');
                        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                    return;
                }
                throw new Error(dataSiswa.message);
            }

            // Tahap 2: Input Akademik & Prediksi
            const resPredict = await fetch(`${BASE_URL}/api/guru/academic/${dataSiswa.data.id}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(formData)
            });
            const dataPredict = await resPredict.json();
            if (!resPredict.ok) throw new Error(dataPredict.message);

            setPredictionResult(dataPredict.data);
            setStep(2);
            window.scrollTo(0, 0);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFinalSubmit = () => {
        setStep(3); // Set ke step 3 (Simpan Data) agar indikator menyala
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-blue-50">
            {/* Header dengan Logo Terpusat */}
            <div className="sticky top-0 flex items-center border-b border-blue-200 bg-blue-100 p-4 px-4 sm:px-12">
                <Link to="/daftarSiswa" className="z-20 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2">
                    <i className="ri-arrow-left-long-line"> </i>
                    <span className="hidden sm:inline">Daftar Siswa</span>
                </Link>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="flex items-center gap-3">
                        <i className="ri-brain-fill ri-2x leading-none text-blue-800"></i>
                        <h1 className="text-2xl font-bold text-blue-900">EduPredict</h1>
                    </div>
                </div>
            </div>

            <div className="px-4 pb-12">
                <StepTambahSiswa currentStep={step} />

                {step === 1 && (
                    <DataSiswaInput 
                        formData={formData}
                        errors={errors}
                        isLoading={isLoading}
                        onChange={handleInputChange}
                        onSubmit={handlePredict}
                        onCancel={() => navigate('/daftarSiswa')}
                    />
                )}

                {step === 2 && predictionResult && (
                    <div className="bg-white mt-8 p-6 sm:p-8 rounded-xl shadow w-full max-w-5xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <i className="ri-robot-line text-blue-500"></i>
                            Hasil Analisis AI
                        </h2>
                        
                        <PrediksiAI predictionResult={predictionResult} />

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
                            <button
                                onClick={() => setStep(1)}
                                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
                            >
                                Edit Data
                            </button>
                            <button
                                onClick={handleFinalSubmit}
                                className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 font-bold shadow-md shadow-blue-200"
                            >
                                Simpan & Selesai
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && predictionResult && (
                    <div className="bg-white mt-8 p-6 sm:p-8 rounded-xl shadow w-full max-w-2xl mx-auto text-center border-t-4 border-green-500">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="ri-checkbox-circle-fill text-5xl text-green-500"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {formData.nama_siswa} berhasil ditambahkan!
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Siswa telah terdaftar dan hasil analisis AI telah disimpan ke dalam sistem.
                        </p>

                        <div className="bg-blue-50 rounded-xl p-6 text-left border border-blue-100 mb-8">
                            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2 border-b border-blue-200 pb-2">
                                <i className="ri-file-list-3-line"></i> Ringkasan Data Tersimpan
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Nama Lengkap</p>
                                    <p className="font-bold text-gray-800">{formData.nama_siswa}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">NISN</p>
                                    <p className="font-bold text-gray-800">{formData.nisn}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Kelas</p>
                                    <p className="font-bold text-gray-800">{formData.kelas}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Kehadiran</p>
                                    <p className="font-bold text-gray-800">{formData.attendance}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Nilai Ujian Sebelumnya</p>
                                    <p className="font-bold text-gray-800">{formData.previous_scores}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Status Risiko</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-black ${
                                            predictionResult.prediksi.risk_category === 'High' ? 'text-red-600' :
                                            predictionResult.prediksi.risk_category === 'Medium' ? 'text-orange-500' : 'text-green-600'
                                        }`}>
                                            Risiko {predictionResult.prediksi.risk_category === 'High' ? 'Tinggi' : predictionResult.prediksi.risk_category === 'Medium' ? 'Sedang' : 'Rendah'}
                                        </span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-sm font-medium italic text-gray-600">
                                            {predictionResult.prediksi.risk_category === 'Low' ? 'Aman' : 'Perlu dipantau'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/daftarSiswa')}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                        >
                            <i className="ri-arrow-left-line"></i> Kembali ke Daftar Siswa
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TambahSiswaPage;