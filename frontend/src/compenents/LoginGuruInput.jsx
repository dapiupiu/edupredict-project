import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function LoginGuruInput({ username, password, errors, apiError, isLoading, rememberMe, onUsernameChange, onPasswordChange, onRememberMeChange, onSubmit }) {
    return (
        <div className="mx-auto w-full max-w-xl my-10 px-6 py-10 sm:px-8 bg-white rounded-3xl border-2 border-gray-100 shadow-lg">
            {/* logo edupredict */}
            <div className="flex items-center gap-3">
                <i className="ri-brain-fill ri-2x leading-none text-sky-600"></i>
                <h1 className="text-3xl font-semibold text-blue-800">EduPredict</h1>
            </div>
            {/* logo edupredict */}

            {/* informasi portal */}
            <div className="mt-4 flex p-2 font-medium text-blue-800 bg-blue-100 w-fit px-4 rounded-3xl gap-2">
                <i className="ri-computer-line"></i>
                <h3>Portal Guru</h3>
            </div>
            {/* informasi portal */}

            <h1 className="text-3xl sm:text-4xl font-semibold mt-4">Selamat datang kembali</h1>
            <p className="text-base sm:text-lg mt-4 opacity-75">Masuk untuk mengakses dashboard dan prediksi risiko siswa</p>
            
            {/* error dari api */}
            {apiError && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-2">
                    <i className="ri-error-warning-line"></i>
                    <p className="text-sm">{apiError}</p>
                </div>
            )}
            {/* error dari api */}

            {/* form user */}
            <form onSubmit={onSubmit}>
                <div className="mt-8">
                    <label className="text-base sm:text-lg font-medium">Username</label>
                    <input
                        type="text"
                        placeholder="masukkan username anda"
                        value={username}
                        onChange={onUsernameChange}
                        className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent"
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                </div>
                <div className="mt-4">
                    <label className="text-base sm:text-lg font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="masukkan password anda"
                        value={password}
                        onChange={onPasswordChange}
                        className="w-full border-2 border-gray-100 shadow-md rounded-xl p-4 mt-1 bg-transparent"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="mt-8 flex flex-wrap justify-between items-center gap-2">
                    <div>
                        <input 
                            type="checkbox" 
                            id="remember" 
                            checked={rememberMe} 
                            onChange={onRememberMeChange} 
                        />
                        <label className="ml-2 font-medium text-base" htmlFor="remember">Ingat saya</label>
                    </div>
                    <Link to="/lupa-password" className="font-medium text-base text-blue-500">Lupa password?</Link>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    {/* loding state */}
                    <button disabled={isLoading} className={`bg-blue-900 text-white py-3 rounded-xl hover:bg-stone-900 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        <i className={isLoading ? "ri-loader-4-line animate-spin" : "ri-login-box-line"}></i> {isLoading ? 'Mohon tunggu...' : 'Masuk sebagai Guru'}</button>
                    {/* loding state */} 
                    
                    <div className="flex-1 h-px bg-gray-900"></div>
                    {/* atau */}
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-gray-500 text-sm"> atau </span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    {/* atau */}
                    <Link to="/login-siswa" className="text-center border-2 border-blue-900 text-blue-900 py-3 rounded-xl hover:bg-blue-50"><i className="ri-user-line"></i> Masuk sebagai Siswa</Link>
                    <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
                        <p className="font-medium text-base">Belum punya akun?</p>
                        <Link to="/registrasi" className="font-medium text-base text-blue-500">Daftar sekarang</Link>
                    </div>
                </div>
            </form>
            {/* form user */}
        </div>
    );
}

LoginGuruInput.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    apiError: PropTypes.string,
    isLoading: PropTypes.bool,
    rememberMe: PropTypes.bool.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onRememberMeChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default LoginGuruInput;
