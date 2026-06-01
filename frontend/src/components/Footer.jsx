import React from 'react';

function Footer() {
    return (
        <div className='bg-blue-900 text-white p-8'>
            <div className='container mx-auto'>
                <div className='flex flex-col md:flex-row justify-between md:items-center items-start gap-8'>
                    <div className="section1">
                        <div className='mb-4 md:mb-0 flex gap-2'>
                            <i className="ri-brain-fill ri-2x leading-none text-white"></i>
                            <h2 className='text-xl font-bold'>Edu Predict</h2>
                        </div>
                        <p className='text-sm max-w-xs'>Sistem yang dirancang untuk membantu tenaga pendidik dalam mendeteksi risiko akademik siswa secara proaktif</p>
                        <div className="logo mt-2 text-2xl flex gap-3">
                            <i className="ri-youtube-line"></i>
                            <i className="ri-linkedin-box-line"></i>
                            <i className="ri-instagram-line"></i>
                        </div>
                    </div>
                    {/* line */}
                    <div className="hidden md:block w-px bg-blue-800 self-stretch"></div>
                    {/* line */}
                    <div className="hidden md:block section2">
                        <h2 className='text-xl font-bold'>Fitur</h2>
                        <p className='text-sm max-w-xs'>Deteksi Dini</p>
                        <p className='text-sm max-w-xs'>Analisis Data</p>
                        <p className='text-sm max-w-xs'>Rekomendasi Intervensi</p>
                    </div>
                    {/* line */}
                    <div className="hidden md:block w-px bg-blue-800 self-stretch"></div>
                    {/* line */}
                    <div className="hidden md:block section3">
                        <h2 className='text-xl font-bold'>Panduan</h2>
                        <p className='text-sm max-w-xs'>Alur Penggunaan</p>
                        <p className='text-sm max-w-xs'>FAQ</p>
                        <p className='text-sm max-w-xs'>Kebijakan privasi</p>
                    </div>
                    {/* line */}
                    <div className="hidden md:block w-px bg-blue-800 self-stretch"></div>
                    {/* line */}
                    <div className="hidden md:block section4">
                        <h2 className='text-xl font-bold'>Tentang</h2>
                        <a href="#" className='text-sm hover:text-blue-300'>Tentang Kami</a>
                        <p className='text-sm max-w-xs'>Tim pengembang</p>
                        <p className='text-sm max-w-xs'>Kontak</p>
                    </div>
                </div>
                <div className="mt-10 h-px bg-blue-800"></div>
                <div className='mt-6 text-sm text-blue-300'>
                    &copy; {new Date().getFullYear()} Edu Predict CC26-PSU080 · Capstone Project
                </div>
            </div>
        </div>
    );
}

export default Footer;
