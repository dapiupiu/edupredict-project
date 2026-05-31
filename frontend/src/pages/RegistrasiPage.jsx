import React, { useState } from 'react';
import BASE_URL from '../utils/api';
import { useNavigate } from 'react-router-dom';
import RegistrasiInput from '../components/RegistrasiInput';
import Swal from 'sweetalert2';

function RegistrasiPage() {
    const [registrasiData, setRegistrasiData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        namaLengkap: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const navigate = useNavigate();

    // Destructuring agar variabel bisa langsung digunakan tanpa registrasiData.xxx
    const {
        email, password, confirmPassword, namaLengkap
    } = registrasiData;

    // Fungsi handler input yang lebih ringkas
    const handleInputChange = (field) => (e) => {
        setRegistrasiData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!namaLengkap.trim()) newErrors.namaLengkap = 'Nama lengkap tidak boleh kosong';
        if (!email.trim()) newErrors.email = 'Email tidak boleh kosong';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) newErrors.email = 'Format email tidak valid';
        if (!password) newErrors.password = 'Password tidak boleh kosong';
        else if (password.length < 8) newErrors.password = 'Password minimal 8 karakter';
        if (!confirmPassword) newErrors.confirmPassword = 'Konfirmasi password tidak boleh kosong';
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Password tidak cocok';
        return newErrors;
    };

    const handleRegistrasi = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setApiError('');
        setIsLoading(true);

        try {
            const API_URL = `${BASE_URL}/api/auth/register`;
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, namaLengkap }),
            });
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409 || data.message === "Email sudah terdaftar.") {
                    setErrors(prev => ({ ...prev, email: 'Email tersebut sudah terdaftar. gunakan email lain' }));
                    setApiError(''); // Pastikan apiError kosong jika error spesifik
                } else {
                    setApiError(data.message || 'Registrasi gagal. Silakan coba lagi.');
                }
                return;
            }
            
            // Tampilkan Pop-up sukses sebelum navigasi
            Swal.fire({
                title: 'Registrasi Berhasil! 🎉',
                text: 'Akun Anda berhasil dibuat.Terima kasih telah bergabung. Kini Anda dapat mengakses fitur pemantauan dan deteksi dini risiko akademik siswa melalui EduPredict.',
                icon: 'success',
                confirmButtonText: 'Masuk Sekarang',
                confirmButtonColor: '#1e3a8a', // Sesuai warna blue-900 di aplikasi
                timer: 5000,
                timerProgressBar: true
            }).then(() => {
                navigate('/login-guru'); 
            });
        } catch (error) {
            setApiError('Terjadi kesalahan jaringan. Silakan coba lagi.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-blue-100 flex items-center justify-center p-4">
            <RegistrasiInput
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                namaLengkap={namaLengkap}
                errors={errors}
                apiError={apiError}
                isLoading={isLoading}
                onEmailChange={handleInputChange('email')}
                onPasswordChange={handleInputChange('password')}
                onConfirmPasswordChange={handleInputChange('confirmPassword')}
                onNamaLengkapChange={handleInputChange('namaLengkap')}
                onSubmit={handleRegistrasi}
            />
        </div>
    );
}

export default RegistrasiPage;