import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

function LupaPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState(''); // Tambahkan state untuk notifikasi sukses
    const [errors, setErrors] = useState({});
    
    const validate = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'Email tidak boleh kosong';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email)) {
            newErrors.email = 'Format email tidak valid';
        }
      return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setApiError('');
            setApiSuccess('');
            return;
        }

        setErrors({});
        setApiError('');
        setApiSuccess('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                setApiError(data.message || 'Terjadi kesalahan saat mengirim permintaan reset password.');
                setApiSuccess('');
                return;
            }

            setApiSuccess('Kami sudah mengirimkan surel yang berisi tautan untuk mereset kata sandi anda.');
            setApiError('');
            console.log('Permintaan reset password berhasil:', data);
        } catch (error) {
            setApiError('Terjadi kesalahan jaringan. Silakan coba lagi.');
            setApiSuccess('');
            console.error('Error forgot password:', error);
        } finally {
            setIsLoading(false);
        }
    };

        return (
            <div className="mx-auto w-full max-w-xl my-10 px-6 py-10 sm:px-8 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
                <div className="flex items-center gap-3">
                    <i className="ri-brain-fill ri-2x leading-none text-sky-600"></i>
                    <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold mt-4">Lupa Password?</h1>
                <p className="text-base sm:text-lg mt-4 opacity-75">Masukkan email yang terdaftar untuk reset password</p>

                {apiError && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-2">
                        <i className="ri-error-warning-line"></i>
                        <p className="text-sm">{apiError}</p>
                    </div>
                )}
                {apiSuccess && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl flex items-center gap-2">
                        <i className="ri-check-line"></i>
                        <p className="text-sm">{apiSuccess}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mt-8">
                        <label className="text-base sm:text-lg font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full border-2 ${errors.email ? 'border-red-500' : 'border-gray-100'} shadow-md rounded-xl p-4 mt-1 bg-transparent outline-none transition-colors`}
                            placeholder="masukkan email anda"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="mt-8 flex flex-col gap-y-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <i className={isLoading ? "ri-loader-4-line animate-spin" : "ri-mail-line"}></i> {isLoading ? 'Mengirim...' : 'Kirim'}
                        </button>
                        <div className="mt-4 text-center flex items-center justify-center gap-2">
                            <i className="ri-arrow-left-long-line"></i>
                            <NavLink to="/login-guru" className="font-medium text-base text-blue-500"> Kembali ke login</NavLink>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    export default LupaPasswordPage;