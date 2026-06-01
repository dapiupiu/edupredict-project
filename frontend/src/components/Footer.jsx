import React from 'react';
import { Link } from 'react-router-dom';
import logoEdupredict from '../assets/logo-edupredict.png';

function Footer() {
    return (
        <footer className='bg-blue-900 text-white pt-16 pb-8'>
            <div className='container mx-auto'>
                <div className='flex flex-col md:flex-row justify-start items-start gap-12 md:gap-24 lg:gap-32 px-6'>
                    <div className="flex-1 max-w-sm">
                        <div className='mb-2 flex items-center gap-3'>
                            <img src={logoEdupredict} alt="logo" className="w-12 h-12 object-contain" />
                            <h2 className='text-2xl font-bold tracking-tight'>EduPredict</h2>
                        </div>
                        <p className='text-sm max-w-xs text-blue-100 leading-relaxed'>
                            Sistem cerdas berbasis AI yang dirancang untuk membantu tenaga pendidik dalam mendeteksi risiko akademik siswa secara proaktif dan akurat.
                        </p>
                        <div className="logo mt-4 text-2xl flex gap-4">
                            <a href="#" className="hover:text-blue-300 transition-colors"><i className="ri-youtube-line"></i></a>
                            <a href="#" className="hover:text-blue-300 transition-colors"><i className="ri-linkedin-box-fill"></i></a>
                            <a href="#" className="hover:text-blue-300 transition-colors"><i className="ri-instagram-line"></i></a>
                            <a href="#" className="hover:text-blue-300 transition-colors"><i className="ri-github-fill"></i></a>
                        </div>
                    </div>
                 
                    <div className="hidden md:block">
                        <h2 className='text-lg font-bold mb-4 pb-1 inline-block'>Navigasi</h2>
                        <ul className="flex flex-col gap-2">
                            <li><Link to="/" className='text-sm text-blue-100 hover:text-blue-300 transition-colors'>Beranda</Link></li>
                            <li><a href="/#fitur" className='text-sm text-blue-100 hover:text-blue-300 transition-colors'>Fitur Unggulan</a></li>
                            <li><a href="/#panduan" className='text-sm text-blue-100 hover:text-blue-300 transition-colors'>Panduan Penggunaan</a></li>
                            <li><a href="/#tim" className='text-sm text-blue-100 hover:text-blue-300 transition-colors'>Tim Pengembang</a></li>
                        </ul>
                    </div>

                    <div className="hidden md:block">
                        <h2 className='text-lg font-bold mb-4 pb-1 inline-block'>Akses Sistem</h2>
                        <ul className="flex flex-col gap-2">
                            <li><Link to="/login-guru" className='text-sm text-blue-100 hover:text-blue-300 transition-colors'>Portal Guru</Link></li>
                            <li><Link to="/login-siswa" className='text-sm text-blue-100 hover:text-blue-300 transition-colors'>Portal Siswa</Link></li>
                            <li><Link to="/registrasi" className='text-sm text-blue-100 hover:text-blue-300 transition-colors'>Daftar Akun Baru</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 h-px bg-blue-800"></div>
                <div className='mt-6 px-6 text-sm text-blue-300 flex flex-col md:flex-row justify-between items-center gap-4'>
                    <p className="text-center md:text-left">&copy; {new Date().getFullYear()} EduPredict AI. CC26-PSU080. Coding Camp 2026 powered by DBS Foundation</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
