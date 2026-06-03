import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PiStudent } from 'react-icons/pi';
import { VscGraphLine } from 'react-icons/vsc';

function BottomNav() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/daftarSiswa' && location.pathname === '/tambahSiswa') return true;
        return location.pathname === path;
    };

    const activeIcon = 'text-blue-600';
    const inactiveIcon = 'text-gray-400';
    const activeLabel = 'text-blue-600 font-semibold';
    const inactiveLabel = 'text-gray-400';

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex md:hidden">
            {/* Dashboard */}
            <Link
                to="/dashboardGuru"
                className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
            >
                <i className={`ri-home-line text-2xl ${isActive('/dashboardGuru') ? activeIcon : inactiveIcon}`}></i>
                <span className={`text-[10px] ${isActive('/dashboardGuru') ? activeLabel : inactiveLabel}`}>Dashboard</span>
            </Link>

            {/* Siswa */}
            <Link
                to="/daftarSiswa"
                className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
            >
                <PiStudent size={24} className={isActive('/daftarSiswa') ? activeIcon : inactiveIcon} />
                <span className={`text-[10px] ${isActive('/daftarSiswa') ? activeLabel : inactiveLabel}`}>Siswa</span>
            </Link>


            {/* Monitoring */}
            <Link
                to="/monitoringSiswa"
                className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
            >
                <VscGraphLine size={24} className={isActive('/monitoringSiswa') ? activeIcon : inactiveIcon} />
                <span className={`text-[10px] ${isActive('/monitoringSiswa') ? activeLabel : inactiveLabel}`}>Monitor</span>
            </Link>

            {/* Profil */}
            <Link
                to="/profilGuru"
                className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
            >
                <i className={`ri-user-line text-2xl ${isActive('/profilGuru') ? activeIcon : inactiveIcon}`}></i>
                <span className={`text-[10px] ${isActive('/profilGuru') ? activeLabel : inactiveLabel}`}>Profil</span>
            </Link>
        </nav>
    );
}

export default BottomNav;