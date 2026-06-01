import React from 'react';
import { PiStudent } from "react-icons/pi";
import { VscGraphLine } from "react-icons/vsc";
import { MdMenuOpen } from "react-icons/md";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoEdupredict from '../assets/logo-edupredict.png';

function Sidebar({ open, setOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        const yakin = window.confirm("Apakah Anda yakin ingin keluar?");
        if (yakin) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
        }
    };

    // Fungsi helper untuk mengecek apakah path sedang aktif
    const isActive = (path) => {
        // Khusus untuk menu Siswa, kita anggap aktif juga jika sedang di halaman Tambah Siswa
        if (path === '/daftarSiswa' && location.pathname === '/tambahSiswa') {
            return true;
        }
        return location.pathname === path;
    };

    const activeClass = "bg-blue-600 text-white shadow-lg shadow-blue-200";
    const inactiveClass = "text-gray-600 hover:bg-white hover:text-blue-700";

    return (
        <div className={`bg-blue-100 shadow-md h-screen fixed left-0 top-0 duration-500 z-50 ${open ? 'w-64' : 'w-16'}`}>
            {/* header sidebar */}
            <div className={`flex items-center mt-8 ${open ? 'justify-between px-5' : 'justify-center'}`}>
                <div className={`flex items-center gap-2 transition-all duration-300 ${!open && 'hidden'}`}>
                    <img src={logoEdupredict} alt="logo" className="w-12 h-12 object-contain flex-shrink-0" />
                    <h1 className="text-2xl font-bold text-blue-900">EduPredict</h1>
                </div>
                <MdMenuOpen size={30} className={`cursor-pointer transition-transform duration-300 ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)}/>
            </div>
            {/* header sidebar */}
            <nav className="p-5">
                <ul className="space-y-2">
                    <li className="relative group">
                        <Link to="/dashboardGuru" className={`flex items-center p-2 rounded-lg transition-all duration-300 ${isActive('/dashboardGuru') ? activeClass : inactiveClass} ${open ? 'gap-3' : 'justify-center'}`}>
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <i className="ri-home-line text-2xl"></i>
                            </div>
                            <span className={`${!open && 'hidden'}`}>Dashboard</span>
                        </Link>
                        {!open && (
                            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 group-hover:left-16 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap">
                                Dashboard
                            </span>
                        )}
                    </li>
                    <li className="relative group">
                        <Link to="/daftarSiswa" className={`flex items-center p-2 rounded-lg transition-all duration-300 ${isActive('/daftarSiswa') ? activeClass : inactiveClass} ${open ? 'gap-3' : 'justify-center'}`}>
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <PiStudent size={24} />
                            </div>
                            <span className={`${!open && 'hidden'}`}>Siswa</span>
                        </Link>
                        {!open && (
                            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 group-hover:left-16 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap">
                                Daftar Siswa
                            </span>
                        )}
                    </li>
                    <li className="relative group">
                        <Link to="/monitoringSiswa" className={`flex items-center p-2 rounded-lg transition-all duration-300 ${isActive('/monitoringSiswa') ? activeClass : inactiveClass} ${open ? 'gap-3' : 'justify-center'}`}>
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <VscGraphLine size={24} />
                            </div>
                            <span className={`${!open && 'hidden'}`}>Monitoring</span>
                        </Link>
                        {!open && (
                            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 group-hover:left-16 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap">
                                Monitoring
                            </span>
                        )}
                    </li>
                    <li className="relative group">
                        <Link to="/profilGuru" className={`flex items-center p-2 rounded-lg transition-all duration-300 ${isActive('/profilGuru') ? activeClass : inactiveClass} ${open ? 'gap-3' : 'justify-center'}`}>
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <i className="ri-user-line text-2xl"></i>
                            </div>
                            <span className={`${!open && 'hidden'}`}>Profil</span>
                        </Link>
                        {!open && (
                            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 group-hover:left-16 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap">
                                Profil Guru
                            </span>
                        )}
                    </li>
                </ul>
            </nav>
            {/* Logout button at the bottom */}
            <div className="absolute bottom-0 left-0 w-full p-5 group">
                <a 
                    href="#" 
                    onClick={handleLogout}
                    className={`flex items-center p-2 rounded-lg hover:bg-red-100 ${open ? 'gap-3' : 'justify-center'}`}
                >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <i className="ri-logout-box-r-line text-2xl"></i>
                    </div>
                    <span className={`${!open && 'hidden'}`}>Logout</span>
                </a>
                {!open && (
                    <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 group-hover:left-16 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap">
                        Keluar
                    </span>
                )}
            </div>
        </div>
    );
}

export default Sidebar;