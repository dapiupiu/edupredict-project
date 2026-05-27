import React from 'react';
import HomePage from './pages/HomePage';
import LoginGuruPage from './pages/LoginGuruPage';
import LoginSiswaPage from './pages/LoginSiswaPage';
import Navbar from './compenents/Navbar';
import Footer from './compenents/Footer';

import RegistrasiPage from './pages/RegistrasiPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import LupaPasswordPage from './pages/LupaPasswordPage';
import DashboardGuruPage from './pages/DashboardGuruPage';
import DaftarSiswaPage from './pages/DaftarSiswaPage';
import TambahSiswaPage from './pages/TambahSiswaPage';
import MonitoringPage from './pages/MonitoringPage';
import ProfilGuruPage from './pages/ProfilGuruPage';
import DashboardSiswaPage from './pages/DashboardSiswaPage';


function App() {
  const location = useLocation();
  const hideLayout = ['/login-guru', '/login-siswa', '/registrasi', '/lupa-password', '/dashboardGuru', '/daftarSiswa', '/tambahSiswa', '/monitoringSiswa', '/profilGuru', '/dashboardSiswa'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
     {!hideLayout && <Navbar />}
     
      <div className="flex-1 bg-blue-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login-guru" element={<LoginGuruPage />} />
          <Route path="/login-siswa" element={<LoginSiswaPage />} />
          <Route path="/registrasi" element={<RegistrasiPage />} />
          <Route path="/lupa-password" element={<LupaPasswordPage />} />
          <Route path="/dashboardGuru" element={<DashboardGuruPage />} />
          <Route path="/daftarSiswa" element={<DaftarSiswaPage />} />
          <Route path="/tambahSiswa" element={<TambahSiswaPage />} />
          <Route path="/monitoringSiswa" element={<MonitoringPage />} />
          <Route path="/profilGuru" element={<ProfilGuruPage/>}/>
          <Route path="/dashboardSiswa" element={<DashboardSiswaPage/>}/>
        </Routes>
      </div>

     {!hideLayout && <Footer />}
    </div>
  );
}

export default App;