import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../utils/api';
import Swal from 'sweetalert2';

function TopBar() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ nama: '', foto_profil: '' });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const loadUserData = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUserData(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Failed to parse user data", e);
                }
            }
        };

        loadUserData();
        
        // Dengarkan perubahan pada localStorage untuk sinkronisasi antar komponen
        window.addEventListener('storage', loadUserData);
        return () => window.removeEventListener('storage', loadUserData);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const initials = userData.nama
        ? userData.nama.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
        : '?';

    const handleLogout = () => {
        setDropdownOpen(false);
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda akan keluar dari dashboard dan kembali ke halaman utama.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal',
            background: '#ffffff',
            borderRadius: '1.25rem'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Anda telah keluar.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/');
                });
            }
        });
    };

    return (
        <div className="bg-white border-b border-gray-100 h-12 flex items-center justify-end px-4 md:px-6 sticky top-0 z-40">
            {/* Judul halaman - tampil di mobile */}
            <div className="flex items-center gap-5">
                {/* Notifikasi */}
                <button 
                    onClick={() => navigate('/profilGuru', { state: { activeTab: 'ringkasan', scrollTo: 'notifikasi' } })}
                    className="relative text-gray-400 hover:text-blue-600 transition-colors outline-none cursor-pointer"
                >
                    <i className="ri-notification-3-line text-lg"></i>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Profil */}
                <div className="relative" ref={dropdownRef}>
                    <div 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 py-1 px-2 rounded-lg transition-all"
                    >
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-gray-700 leading-none">{userData.nama || 'Guru'}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-100 bg-blue-50 flex items-center justify-center text-blue-600 font-bold shadow-sm">
                        {userData.foto_profil ? (
                            <img 
                                src={userData.foto_profil.startsWith('http') ? userData.foto_profil : `${BASE_URL}/${userData.foto_profil}`} 
                                alt="Profil" 
                                className="w-full h-full object-cover" 
                            />
                        ) : (
                            <span className="text-xs">{initials}</span>
                        )}
                    </div>
                        <i className={`ri-arrow-down-s-line text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                            <button 
                                onClick={() => { navigate('/profilGuru'); setDropdownOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                                <i className="ri-user-line text-blue-500 text-lg"></i>
                                <span>Profil Saya</span>
                            </button>
                            <button 
                                onClick={() => { navigate('/profilGuru', { state: { activeTab: 'edit', scrollTo: 'password' } }); setDropdownOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                                <i className="ri-lock-password-line text-blue-500 text-lg"></i>
                                <span>Ganti Password</span>
                            </button>
                            <div className="h-px bg-gray-100 my-1 mx-2"></div>
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                                <i className="ri-logout-box-r-line text-lg"></i>
                                <span>Keluar</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TopBar;