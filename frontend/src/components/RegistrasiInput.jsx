import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoEdupredict from '../assets/logo-edupredict.png';

function RegistrasiInput({
    email,
    password,
    confirmPassword,
    namaLengkap,
    errors,
    apiError,
    isLoading,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onNamaLengkapChange,
    onSubmit,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="mx-auto w-full max-w-2xl my-10 px-6 py-10 sm:px-8 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
            <div className="flex items-center gap-3">
                <img src={logoEdupredict} alt="logo" className="w-16 h-16 object-contain flex-shrink-0" />
                <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
            </div>
            <div className="mt-4 inline-flex p-2 font-medium text-blue-800 bg-blue-100 px-4 rounded-3xl gap-2">
                <i className="ri-computer-line"></i>
                <h3>Registrasi Guru</h3>
            </div>

            {apiError && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-2">
                    <i className="ri-error-warning-line"></i>
                    <p className="text-sm">{apiError}</p>
                </div>
            )}

            <form onSubmit={onSubmit}>
                <h1 className="text-3xl sm:text-4xl font-semibold mt-6">Buat akun baru</h1>
                <p className="text-base sm:text-lg mt-2 opacity-75">Daftar untuk mengakses sistem deteksi dini</p>

                <div className="mt-6">
                    <label className="text-base sm:text-lg font-medium">Nama Lengkap</label>
                    <input type="text" value={namaLengkap} onChange={onNamaLengkapChange} placeholder="masukkan nama lengkap" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                    {errors.namaLengkap && <p className="mt-1 text-sm text-red-500">{errors.namaLengkap}</p>}
                </div>
                <div className="mt-4">
                    <label className="text-base sm:text-lg font-medium">Email</label>
                    <input type="email" value={email} onChange={onEmailChange} placeholder="masukkan email anda" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="mt-4 relative">
                    <label className="text-base sm:text-lg font-medium">Password</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} value={password} onChange={onPasswordChange} placeholder="masukkan password anda" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent pr-12" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 mt-0.5 text-gray-500">
                            <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                        </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="mt-4 relative">
                    <label className="text-base sm:text-lg font-medium">Konfirmasi Password</label>
                    <div className="relative">
                        <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={onConfirmPasswordChange} placeholder="konfirmasi password anda" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent pr-12" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 mt-0.5 text-gray-500">
                            <i className={showConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="mt-8 flex flex-col gap-y-4">
                    <button type="submit" disabled={isLoading} className={`bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        <i className={isLoading ? "ri-loader-4-line animate-spin" : "ri-check-line"}></i> {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
                    </button>
                    <div className="mt-2 flex justify-between items-center">
                        <p className="font-medium text-base">Sudah punya akun?</p>
                        <NavLink to="/login-guru" className="font-medium text-base text-blue-500">Masuk</NavLink>
                    </div>
                </div>
            </form>
        </div>
    );
}

RegistrasiInput.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    namaLengkap: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    apiError: PropTypes.string,
    isLoading: PropTypes.bool,
    onEmailChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onConfirmPasswordChange: PropTypes.func.isRequired,
    onNamaLengkapChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default RegistrasiInput;
