import React from 'react';
import { PiStudent } from "react-icons/pi";
import { VscGraphLine } from "react-icons/vsc";
import { MdMenuOpen } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ open, setOpen }) {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        const yakin = window.confirm("Apakah Anda yakin ingin keluar?");
        if (yakin) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
        }
    };

    return (
        <div className={`bg-blue-100 shadow-md h-screen fixed left-0 top-0 duration-500 overflow-hidden ${open ? 'w-64' : 'w-16'}`}>
            {/* header sidebar */}
            <div className={`flex items-center mt-8 ${open ? 'justify-between px-5' : 'justify-center'}`}>
                <div className={`flex items-center gap-2 transition-all duration-300 ${!open && 'hidden'}`}>
                    <i className="ri-brain-fill ri-2x leading-none text-blue-800"></i>
                    <h1 className="text-2xl font-bold text-blue-900">EduPredict</h1>
                </div>
                <MdMenuOpen size={30} className={`cursor-pointer transition-transform duration-300 ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)}/>
            </div>
            {/* header sidebar */}
            <nav className="p-5">
                <ul className="space-y-2">
                    <li>
                        <Link to="/dashboardGuru" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${open ? 'gap-3' : 'justify-center'}`}>
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <i className="ri-home-line text-2xl"></i>
                            </div>
                            <span className={`${!open && 'hidden'}`}>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/daftarSiswa" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${open ? 'gap-3' : 'justify-center'}`}>
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <PiStudent size={24} />
                            </div>
                            <span className={`${!open && 'hidden'}`}>Siswa</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/monitoringSiswa" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${open ? 'gap-3' : 'justify-center'}`}>
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <VscGraphLine size={24} />
                            </div>
                            <span className={`${!open && 'hidden'}`}>Monitoring</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profilGuru" className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${open ? 'gap-3' : 'justify-center'}`}>
                            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <i className="ri-user-line text-2xl"></i>
                            </div>
                            <span className={`${!open && 'hidden'}`}>Profil</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* Logout button at the bottom */}
            <div className="absolute bottom-0 left-0 w-full p-5">
                <a 
                    href="#" 
                    onClick={handleLogout}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${open ? 'gap-3' : 'justify-center'}`}
                >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <i className="ri-logout-box-r-line text-2xl"></i>
                    </div>
                    <span className={`${!open && 'hidden'}`}>Logout</span>
                </a>
            </div>
        </div>
    );
}

export default Sidebar;