import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoEdupredict from '../assets/logo-edupredict.png';

function LoginSiswaInput({ NISN, errors, apiError, apiSuccess, isLoading, onNISNChange, onSubmit }) {
    return (
        <div className="mx-auto w-full max-w-xl my-10 px-6 py-10 sm:px-8 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
            <div className="flex items-center gap-3">
                <img src={logoEdupredict} alt="logo" className="w-16 h-16 object-contain flex-shrink-0" />
                <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
            </div>
            <div className="mt-4 flex p-2 font-medium text-blue-800 bg-blue-100 w-fit px-4 rounded-3xl gap-2">
            <i className="ri-user-line"></i>
            <h3>Portal Siswa</h3>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold mt-4">Cek progres belajarmu</h1>
            <p className="text-base sm:text-lg mt-4 opacity-75">Masukkan NISN untuk melihat progres belajar, prediksi risiko dan rekomendasi dari AI</p>
            
            {/* error dari api */}
            {apiError && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-2">
                    <i className="ri-error-warning-line"></i>
                    <p className="text-sm">{apiError}</p>
                </div>
            )}
            {/* success dari api */}
            {apiSuccess && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl flex items-center gap-2">
                    <i className="ri-check-line"></i>
                    <p className="text-sm">{apiSuccess}</p>
                </div>
            )}

            <form onSubmit ={onSubmit}>
            <div className="mt-8">
                <label className="text-base sm:text-lg font-medium">NISN (Nomor Induk Siswa Nasional)</label>
                <input 
                    type="text" 
                    value={NISN} 
                    onChange={onNISNChange} 
                    className={`w-full border-2 ${errors.NISN ? 'border-red-500' : 'border-sky-600'} shadow-md rounded-xl p-4 mt-1 bg-transparent outline-none transition-colors`} 
                    placeholder="Masukkan NISN anda"
                    maxLength="10"
                />
                {errors.NISN && <p className="mt-1 text-sm text-red-500">{errors.NISN}</p>}
            </div>
            
            <div className="mt-8 flex flex-col gap-y-4">
                <button type="submit" disabled={isLoading} className={`cursor-pointer bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900 transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    <i className={isLoading ? "ri-loader-4-line animate-spin" : "ri-search-line"}></i> {isLoading ? 'Mencari...' : 'Lihat Progres Belajar'}
                </button>
                 {/* atau */}
                <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm"> atau </span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                 {/* atau */}
                <NavLink to="/login-guru" className="text-center border-2 border-blue-900 text-blue-900 py-3 rounded-xl hover:bg-blue-50">Masuk sebagai Guru</NavLink>
            </div>
            </form>
        </div>
    )
}

LoginSiswaInput.propTypes = {
    NISN: PropTypes.string.isRequired,
    onNISNChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    apiError: PropTypes.string,
    apiSuccess: PropTypes.string,
    isLoading: PropTypes.bool,
}

export default LoginSiswaInput;
