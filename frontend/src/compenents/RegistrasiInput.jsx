import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function RegistrasiInput({
    currentStep,
    email,
    password,
    confirmPassword,
    namaLengkap,
    nip,
    noHp,
    jabatan,
    namaSekolah,
    errors,
    apiError,
    isLoading,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onNamaLengkapChange,
    onNipChange,
    onNoHpChange,
    onJabatanChange,
    onNamaSekolahChange,
    onNextStep,
    onPrevStep,
    onSubmit,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const renderStepIndicator = () => {
        const steps = ['Akun', 'Data Diri', 'Selesai'];
        return (
            <div className="flex items-center w-full mt-8">
                {steps.map((label, i) => (
                    <React.Fragment key={i}>
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep > i + 1 ? 'bg-green-500 text-white' : currentStep === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-black'}`}>
                                {currentStep > i + 1 ? <i className="ri-check-line"></i> : i + 1}
                            </div>
                            <span className="ml-2 font-semibold text-sm">{label}</span>
                        </div>
                        {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-300 mx-4"></div>}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div className="mx-auto w-full max-w-2xl my-10 px-6 py-10 sm:px-8 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
            <div className="flex items-center gap-3">
                <i className="ri-brain-fill ri-2x leading-none text-sky-600"></i>
                <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
            </div>
            <div className="mt-4 inline-flex p-2 font-medium text-blue-800 bg-blue-100 px-4 rounded-3xl gap-2">
                <i className="ri-computer-line"></i>
                <h3>Registrasi Guru</h3>
            </div>

            {renderStepIndicator()}

            {apiError && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-2">
                    <i className="ri-error-warning-line"></i>
                    <p className="text-sm">{apiError}</p>
                </div>
            )}

                {/* Step 1 - Buat Akun */}
                {currentStep === 1 && (
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-semibold mt-6">Buat akun baru</h1>
                        <p className="text-base sm:text-lg mt-2 opacity-75">Lengkapi data akun untuk melanjutkan</p>
                        
                        <div className="mt-6">
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
                                <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={onConfirmPasswordChange} 
                                    onKeyDown={(e) => e.key === 'Enter' && onNextStep()}
                                    placeholder="konfirmasi password anda" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent pr-12" />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 mt-0.5 text-gray-500">
                                    <i className={showConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button type="button" onClick={onNextStep} className="bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900">Lanjut <i className="ri-arrow-right-long-line"></i></button>
                            <div className="mt-2 flex justify-between items-center">
                                <p className="font-medium text-base">Sudah punya akun?</p>
                                <NavLink to="/login-guru" className="font-medium text-base text-blue-500">Masuk</NavLink>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2 - Data Diri */}
                {currentStep === 2 && (
                    <form onSubmit={onSubmit}>
                        <h1 className="text-3xl sm:text-4xl font-semibold mt-6">Data Diri</h1>
                        <p className="text-base sm:text-lg mt-2 opacity-75">Lengkapi data diri untuk mengakses sistem deteksi dini</p>
                            <div className="mt-4">
                                <label className="text-base sm:text-lg font-medium">Nama Lengkap</label>
                                <input type="text" value={namaLengkap} onChange={onNamaLengkapChange} placeholder="masukkan nama lengkap" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.namaLengkap && <p className="mt-1 text-sm text-red-500">{errors.namaLengkap}</p>}
                            </div>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-base sm:text-lg font-medium">NIP</label>
                                <input type="text" value={nip} onChange={onNipChange} placeholder="masukkan NIP" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.nip && <p className="mt-1 text-sm text-red-500">{errors.nip}</p>}
                            </div>
                            <div>
                                <label className="text-base sm:text-lg font-medium">No HP</label>
                                <input type="text" value={noHp} onChange={onNoHpChange} placeholder="masukkan no HP" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.noHp && <p className="mt-1 text-sm text-red-500">{errors.noHp}</p>}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-base sm:text-lg font-medium">Jabatan</label>
                                <input type="text" value={jabatan} onChange={onJabatanChange} placeholder="masukkan jabatan" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.jabatan && <p className="mt-1 text-sm text-red-500">{errors.jabatan}</p>}
                            </div>
                            <div>
                                <label className="text-base sm:text-lg font-medium">Nama Sekolah</label>
                                <input type="text" value={namaSekolah} onChange={onNamaSekolahChange} placeholder="masukkan nama sekolah" className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent" />
                                {errors.namaSekolah && <p className="mt-1 text-sm text-red-500">{errors.namaSekolah}</p>}
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col gap-y-4">
                            <button type="submit" disabled={isLoading} className={`bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                <i className={isLoading ? "ri-loader-4-line animate-spin" : "ri-check-line"}></i> {isLoading ? 'Mendaftar...' : 'Daftar'}
                            </button>
                            <button type="button" onClick={onPrevStep} className="border-2 border-blue-900 text-blue-900 py-3 rounded-xl hover:bg-blue-50"><i className="ri-arrow-left-long-line"></i> Kembali</button>
                        </div>
                    </form>
                )}

                {/* Step 3 - Selesai */}
                {currentStep === 3 && (
                    <div className="flex flex-col items-center text-center py-10">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                            <i className="ri-checkbox-circle-line text-5xl text-green-500"></i>
                        </div>
                        <h1 className="text-3xl font-bold mb-3">Registrasi Berhasil!</h1>
                        <p className="text-lg opacity-75 mb-6">Berikut ringkasan pendaftaran akun kamu.</p>
                        <div className="w-full bg-blue-50 rounded-2xl p-6 text-left border border-blue-100 mb-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500">Nama Lengkap</p>
                                    <p className="font-semibold">{namaLengkap}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">NIP</p>
                                    <p className="font-semibold">{nip}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Email</p>
                                    <p className="font-semibold">{email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">No HP</p>
                                    <p className="font-semibold">{noHp}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Jabatan</p>
                                    <p className="font-semibold">{jabatan}</p>
                                </div>
                            </div>
                        </div>
                        <NavLink to="/login-guru" className="bg-blue-900 text-white px-8 py-3 rounded-xl hover:bg-stone-900">Kembali ke halaman login</NavLink>
                    </div>
                )}
        </div>
    );
}

RegistrasiInput.propTypes = {
    currentStep: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    namaLengkap: PropTypes.string.isRequired,
    nip: PropTypes.string.isRequired,
    noHp: PropTypes.string.isRequired,
    jabatan: PropTypes.string.isRequired,
    namaSekolah: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    apiError: PropTypes.string,
    isLoading: PropTypes.bool,
    onEmailChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onConfirmPasswordChange: PropTypes.func.isRequired,
    onNamaLengkapChange: PropTypes.func.isRequired,
    onNipChange: PropTypes.func.isRequired,
    onNoHpChange: PropTypes.func.isRequired,
    onJabatanChange: PropTypes.func.isRequired,
    onNamaSekolahChange: PropTypes.func.isRequired,
    onNextStep: PropTypes.func.isRequired,
    onPrevStep: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default RegistrasiInput;
