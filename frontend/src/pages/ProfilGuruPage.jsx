import React, { useState, useEffect } from 'react';
import BASE_URL from '../utils/api';
import Sidebar from '../compenents/Sidebar';

function ProfilGuruPage() {
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // State untuk data profil
    const [profileData, setProfileData] = useState({
        nama: '',
        email: '',
        role: '',
        created_at: ''
    });

    // State untuk form update
    const [formData, setFormData] = useState({
        nama: '',
        password_lama: '',
        password_baru: '',
        confirm_password: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("Token tidak ditemukan");

            const response = await fetch('http://localhost:5000/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();

            if (result.success) {
                setProfileData(result.data);
                setFormData(prev => ({ ...prev, nama: result.data.nama }));
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Gagal mengambil data profil.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password_baru && formData.password_baru !== formData.confirm_password) {
            setError("Konfirmasi password baru tidak cocok.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nama: formData.nama,
                    password_lama: formData.password_lama,
                    password_baru: formData.password_baru
                })
            });

            const result = await response.json();
            if (result.success) {
                setSuccess(result.message);
                setFormData(prev => ({ ...prev, password_lama: '', password_baru: '', confirm_password: '' }));
                fetchProfile(); // Refresh data
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Terjadi kesalahan saat memperbarui profil.");
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            <Sidebar open={open} setOpen={setOpen} />
            <div className={`flex-1 p-3 sm:p-6 md:p-8 transition-all duration-500 ${open ? 'md:ml-64' : 'md:ml-16'} ml-16 min-h-screen`}>
                <h1 className="text-3xl font-bold">Profil Guru</h1>
                <p className="mt-2 text-gray-600">Kelola informasi akun dan pengaturan keamanan Anda</p>

                {loading ? (
                    <div className="flex justify-center items-center h-64 text-blue-600 font-medium">
                        <i className="ri-loader-4-line animate-spin mr-2 text-2xl"></i> Memuat profil...
                    </div>
                ) : (
                    <div className="mt-8 max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Kartu Informasi Akun */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                    <i className="ri-user-fill text-5xl"></i>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">{profileData.nama}</h2>
                                <p className="text-gray-500 text-sm mb-4">{profileData.email}</p>
                                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                    {profileData.role}
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-50 text-left space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <i className="ri-calendar-line text-blue-500"></i>
                                        <span>Bergabung: {new Date(profileData.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Pengaturan Profil */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <i className="ri-settings-3-line text-blue-500"></i>
                                    Pengaturan Akun
                                </h3>

                                {error && <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm flex items-center gap-2">
                                    <i className="ri-error-warning-line"></i> {error}
                                </div>}
                                {success && <div className="mb-4 p-3 bg-green-50 text-green-600 border border-green-100 rounded-lg text-sm flex items-center gap-2">
                                    <i className="ri-check-line"></i> {success}
                                </div>}

                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                        <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                                    </div>

                                    <div className="pt-4 border-t border-gray-50">
                                        <h4 className="text-sm font-bold text-gray-800 mb-4">Ganti Password (Opsional)</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Password Lama</label>
                                                <input type="password" name="password_lama" value={formData.password_lama} onChange={handleInputChange} placeholder="Masukkan password saat ini" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Password Baru</label>
                                                    <input type="password" name="password_baru" value={formData.password_baru} onChange={handleInputChange} placeholder="Minimal 8 karakter" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Konfirmasi Password Baru</label>
                                                    <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleInputChange} placeholder="Ulangi password baru" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                                            <i className="ri-save-line"></i> Simpan Perubahan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}



export default ProfilGuruPage;