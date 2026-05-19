import React from 'react';

function Footer() {
    return (
        <div className='bg-blue-900 text-white px-8 pt-12 pb-6'>
            <div className='container mx-auto'>
                <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-10'>

                    {/* Section 1 - Brand */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xs">
                        <div className='flex items-center gap-2 mb-3'>
                            <i className="ri-brain-fill text-2xl text-white"></i>
                            <h2 className='text-xl font-bold'>Edu Predict</h2>
                        </div>
                        <p className='text-sm text-blue-200 leading-relaxed'>Sistem yang dirancang untuk membantu tenaga pendidik dalam mendeteksi risiko akademik siswa secara proaktif.</p>
                        <div className="mt-4 text-xl flex gap-4">
                            <i className="ri-youtube-line cursor-pointer hover:text-blue-300 transition-colors"></i>
                            <i className="ri-linkedin-box-line cursor-pointer hover:text-blue-300 transition-colors"></i>
                            <i className="ri-instagram-line cursor-pointer hover:text-blue-300 transition-colors"></i>
                        </div>
                    </div>

                    <div className="hidden md:block w-px self-stretch bg-blue-700"></div>

                    {/* Section 2 - Fitur */}
                    <div className="hidden md:flex flex-col items-start gap-2">
                        <h3 className='text-base font-bold mb-1'>Fitur</h3>
                        <p className='text-sm text-blue-200 hover:text-white cursor-pointer transition-colors'>Deteksi Dini</p>
                        <p className='text-sm text-blue-200 hover:text-white cursor-pointer transition-colors'>Analisis Data</p>
                        <p className='text-sm text-blue-200 hover:text-white cursor-pointer transition-colors'>Rekomendasi Intervensi</p>
                    </div>

                    <div className="hidden md:block w-px self-stretch bg-blue-700"></div>

                    {/* Section 3 - Panduan */}
                    <div className="hidden md:flex flex-col items-start gap-2">
                        <h3 className='text-base font-bold mb-1'>Panduan</h3>
                        <p className='text-sm text-blue-200 hover:text-white cursor-pointer transition-colors'>Alur Penggunaan</p>
                        <p className='text-sm text-blue-200 hover:text-white cursor-pointer transition-colors'>FAQ</p>
                        <p className='text-sm text-blue-200 hover:text-white cursor-pointer transition-colors'>Kebijakan Privasi</p>
                    </div>

                    <div className="hidden md:block w-px self-stretch bg-blue-700"></div>

                    {/* Section 4 - Tentang */}
                    <div className="hidden md:flex flex-col items-start gap-2">
                        <h3 className='text-base font-bold mb-1'>Tentang</h3>
                        <p className='text-sm text-blue-200 hover:text-white cursor-pointer transition-colors'>Tentang Kami</p>
                        <p className='text-sm text-blue-200 hover:text-white cursor-pointer transition-colors'>Tim Pengembang</p>
                        <p className='text-sm text-blue-200 hover:text-white cursor-pointer transition-colors'>Kontak</p>
                    </div>

                </div>

                <div className="mt-10 h-px bg-blue-700"></div>
                <div className='mt-4 text-center text-sm text-blue-300'>
                    &copy; {new Date().getFullYear()} Edu Predict.
                </div>
            </div>
        </div>
    );
}

export default Footer;
