import React from 'react';

function Sidebar() {
    return (
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
            <div className="p-5 border-b">
                <h1 className="text-2xl font-bold text-blue-800">EduPredict</h1>
            </div>
            <nav className="p-5">
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                            <i className="ri-home-line"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                            <i className="ri-file-list-line"></i>
                            <span>Prediksi Risiko</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                            <i className="ri-user-line"></i>
                            <span>Profil</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;