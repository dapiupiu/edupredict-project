import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrasiInput from '../compenents/RegistrasiInput';

function RegistrasiPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [registrasiData, setRegistrasiData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        namaLengkap: '',
        nip: '',
        noHp: '',
        jabatan: '',
        namaSekolah: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const navigate = useNavigate();

    // Destructuring agar variabel bisa langsung digunakan tanpa registrasiData.xxx
    const {
        username, email, password, confirmPassword,
        namaLengkap, nip, noHp, jabatan, namaSekolah
    } = registrasiData;

    // Fungsi handler input yang lebih ringkas
    const handleInputChange = (field) => (e) => {
        setRegistrasiData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = 'Username tidak boleh kosong';
        else if (!/^[a-z.]+$/.test(username)) newErrors.username = 'Username tidak boleh spasi dan menggunakan huruf kecil';
        if (!email.trim()) newErrors.email = 'Email tidak boleh kosong';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) newErrors.email = 'Format email tidak valid';
        if (!password) newErrors.password = 'Password tidak boleh kosong';
        else if (password.length < 8) newErrors.password = 'Password minimal 8 karakter';
        if (!confirmPassword) newErrors.confirmPassword = 'Konfirmasi password tidak boleh kosong';
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Password tidak cocok';
        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!namaLengkap.trim()) newErrors.namaLengkap = 'Nama lengkap tidak boleh kosong';
        if (!nip.trim()) newErrors.nip = 'NIP tidak boleh kosong';
        else if (!/^[0-9]+$/.test(nip)) newErrors.nip = 'NIP hanya boleh berisi angka';
        if (!noHp.trim()) newErrors.noHp = 'No HP tidak boleh kosong';
        else if (!/^[0-9]{10,13}$/.test(noHp)) newErrors.noHp = 'No HP tidak valid';
        if (!jabatan.trim()) newErrors.jabatan = 'Jabatan tidak boleh kosong';
        else if (!/^[a-zA-Z\s]+$/.test(jabatan)) newErrors.jabatan = 'Jabatan hanya boleh berisi huruf';
        if (!namaSekolah.trim()) newErrors.namaSekolah = 'Nama sekolah tidak boleh kosong';
        return newErrors;
    };

    const handleNextStep = () => {
        const validationErrors = validateStep1();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setCurrentStep(2);
        window.scrollTo(0, 0);
    };

    const handlePrevStep = () => {
        setCurrentStep(1);
        setErrors({});
        setApiError('');
        window.scrollTo(0, 0);
    };

    const handleRegistrasi = async (event) => {
        event.preventDefault();
        const validationErrors = validateStep2();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setApiError('');
        setIsLoading(true);

        try {
            const API_URL = 'http://localhost:5000/api/auth/register';
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, namaLengkap, nip, noHp, jabatan, namaSekolah }),
            });
            const data = await response.json();

            if (!response.ok) {
                setApiError(data.message || 'Registrasi gagal. Silakan coba lagi.');
                return;
            }
            
            console.log('Registrasi berhasil:', data);
            setCurrentStep(3); // Move to success step
            navigate('/login-guru'); // Or navigate directly to login page
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
                currentStep={currentStep}
                username={username}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                namaLengkap={namaLengkap}
                nip={nip}
                noHp={noHp}
                jabatan={jabatan}
                namaSekolah={namaSekolah}
                errors={errors}
                apiError={apiError}
                isLoading={isLoading}
                onUsernameChange={handleInputChange('username')}
                onEmailChange={handleInputChange('email')}
                onPasswordChange={handleInputChange('password')}
                onConfirmPasswordChange={handleInputChange('confirmPassword')}
                onNamaLengkapChange={handleInputChange('namaLengkap')}
                onNipChange={handleInputChange('nip')}
                onNoHpChange={handleInputChange('noHp')}
                onJabatanChange={handleInputChange('jabatan')}
                onNamaSekolahChange={handleInputChange('namaSekolah')}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
                onSubmit={handleRegistrasi}
            />
        </div>
    );
}

export default RegistrasiPage;