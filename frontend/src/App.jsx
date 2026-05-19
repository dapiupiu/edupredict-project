import React from 'react';
import HomePage from './pages/HomePage';
import LoginGuruPage from './pages/LoginGuruPage';
import LoginSiswaPage from './pages/LoginSiswaPage';
import Navbar from './compenents/Navbar';
import Footer from './compenents/Footer';

import RegistrasiPage from './pages/RegistrasiPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import LupaPasswordPage from './pages/LupaPasswordPage';

function App() {
  const location = useLocation();
  const hideLayout = ['/login-guru', '/login-siswa', '/registrasi', '/lupa-password'].includes(location.pathname);

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
        </Routes>
      </div>

     {!hideLayout && <Footer />}
    </div>
  );
}

export default App;