import React, { useState } from 'react';
import BASE_URL from '../utils/api';
import { useNavigate } from 'react-router-dom';
import RegistrasiInput from '../compenents/RegistrasiInput';

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
                setApiError(data.message || 'Registrasi gagal. Silakan coba lagi.');
                return;
            }
            
            console.log('Registrasi berhasil:', data);
            navigate('/login-guru'); 
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