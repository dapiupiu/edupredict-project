import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../compenents/Sidebar';

function DashboardGuruPage(){
    return(
        <div className="p-8">
            <h1 className="text-3xl font-bold">Dashboard Guru</h1>
            <Sidebar />
            <p className="mt-2">Selamat datang di dashboard guru</p>
            <Link to="/prediksi" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">Lihat Prediksi</Link>
        </div>
    )
}

export default DashboardGuruPage;