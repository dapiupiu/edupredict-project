import heroImg from '../assets/hero.png';
import guruPreview from '../assets/dashboard-guru.png';
import siswaPreview from '../assets/dashboard-siswa.png';
import { Link } from 'react-router-dom';
import profilKdavi from '../assets/profil-kdavi.png';
import profilKsandi from '../assets/profil-ksandi.png';
import profilKdika from '../assets/profil-kdika.png';
import profilKgita from '../assets/profil-kgita.png';
import profilKarin from '../assets/profil-karin.png';
import profilAyu from '../assets/profil-ayu.png';


function HomePage() {
    return (
        <div className="homepage pt-24" id="beranda">
            {/* hero section */}
            <div className="container mx-auto px-8">
                <div className="hero grid md:grid-cols-2 items-center grid-cols-1 lg:pt-0 pt-16 pb-32">
                    <div className="text-center md:text-left lg:pb-0 pb-16">
                        <div className="xl:mt-4 mb-4 inline-flex items-center gap-2 px-4 py-2 font-medium text-blue-700 bg-white rounded-full text-sm">
                            <i className="ri-bard-line"></i>
                            <span>Sistem Deteksi Dini Berbasis AI</span>
                        </div>
                        <h1 className="font-bold mb-4 lg:text-6xl text-5xl leading-tight">Deteksi Dini <br /><span className="text-blue-800 font-extrabold">Masa Depan Pasti</span></h1>
                        <p className="text-base leading-relaxed text-slate-500 max-w-md mx-auto md:mx-0">Sistem yang dirancang untuk membantu tenaga pendidik dalam mendeteksi risiko akademik siswa secara proaktif berdasarkan data dan analisis yang akurat.</p>
                        <div className="mt-8">
                            <Link to="/login-guru" className="bg-amber-400 text-blue-900 px-8 py-4 rounded-xl text-lg font-black hover:bg-amber-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-200/50 inline-flex items-center gap-2 border-2 border-amber-500/20">Mulai Deteksi <i className="ri-search-ai-line"></i></Link>
                        </div>
                    </div>
                    <img src={heroImg} alt="hero" className="md:block hidden w-full" />
                </div>
            </div>

            {/* fitur */}
            <div className="bg-white" id="fitur">
                <div className="container mx-auto px-8 py-20">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-blue-800 font-semibold text-sm uppercase tracking-widest">Fitur Unggulan</span>
                        <h2 className="text-4xl font-bold mt-2 mb-4">Apa yang Bisa Dilakukan?</h2>
                        <p className="text-slate-500">Berikut adalah beberapa fitur utama dari Edu Predict yang akan membantu proses deteksi dini akademik siswa.</p>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center text-center md:items-start md:text-left">
                            <div className="bg-blue-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                                <i className="ri-search-ai-line text-2xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Deteksi Dini</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Mendeteksi potensi keberhasilan akademik siswa sejak dini dengan menganalisis data historis dan faktor risiko.</p>
                        </div>
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center text-center md:items-start md:text-left">
                            <div className="bg-blue-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                                <i className="ri-bar-chart-2-line text-2xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Analisis Data</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Menganalisis data akademik siswa secara mendalam untuk mengidentifikasi pola dan tren dengan klasifikasi risiko: rendah, sedang, dan tinggi.</p>
                        </div>
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center text-center md:items-start md:text-left">
                            <div className="bg-blue-900 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                                <i className="ri-lightbulb-line text-2xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Rekomendasi Intervensi</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Integrasi Generative AI untuk menghasilkan rekomendasi intervensi berbasis faktor risiko dominan.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div className="bg-blue-50 py-20 border-t border-blue-50" id="antarmuka">
                <div className="container mx-auto px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-blue-800 font-semibold text-sm uppercase tracking-widest">Antarmuka Sistem</span>
                        <h2 className="text-4xl font-bold mt-2 mb-4">Halaman Utama Dashboard Sistem</h2>
                        <p className="text-slate-500">Pantau performa akademik dengan antarmuka yang bersih dan mudah dipahami baik oleh guru maupun siswa.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Guru Preview */}
                        <div className="group">
                            <div className="relative rounded-2xl overflow-hidden border-[8px] border-slate-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] bg-slate-900">
                                {/* Browser/Laptop Top Bar */}
                                <div className="h-6 bg-slate-800 flex items-center px-4 gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <img src={guruPreview} alt="Dashboard Guru" className="w-full aspect-video object-contain object-center block cursor-pointer" />
                            </div>
                            <div className="mt-8 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-blue-900">Dashboard Guru</h3>
                                <p className="text-slate-600 mt-2">Kelola data kelas secara terpusat, monitoring kategori risiko secara real-time, dan dapatkan insight mendalam dari AI.</p>
                            </div>
                        </div>

                        {/* Siswa Preview */}
                        <div className="group">
                            <div className="relative rounded-2xl overflow-hidden border-[8px] border-slate-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] bg-slate-900">
                                {/* Browser/Laptop Top Bar */}
                                <div className="h-6 bg-slate-800 flex items-center px-4 gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <img src={siswaPreview} alt="Portal Siswa" className="w-full aspect-video object-cover object-top block cursor-pointer" />
                            </div>
                            <div className="mt-8 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-blue-900">Portal Siswa</h3>
                                <p className="text-slate-600 mt-2">Siswa dapat memantau progres belajar mereka sendiri, melihat faktor pendukung keberhasilan, dan menerima saran motivasi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* panduan */}
            <div className="bg-white py-20" id="panduan">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-5">
                        <span className="text-blue-800 font-semibold text-sm uppercase tracking-widest">Cara Penggunaan</span>
                        <h2 className="text-4xl font-bold mt-2 mb-4">Alur Penggunaan Sistem</h2>
                        <p className="mt-5 text-slate-500">Empat langkah mudah untuk mulai menggunakan sistem Edu Predict.</p>
                    </div>
                    <div className="w-full max-w-6xl mx-auto py-10">
                        {/* Menggunakan grid: 1 kolom di mobile (default), 4 kolom di desktop (md) */}
                        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                            {/* Garis dashed hanya muncul di desktop/tablet, disesuaikan posisinya ke tengah icon container (100px) */}
                            <div className="hidden md:block absolute top-[100px] left-[12%] right-[12%] border-t-2 border-dashed border-blue-200 z-0"></div>
                            {[
                                { num: 1, icon: 'ri-user-add-line', title: 'Buat Akun', desc: 'Daftar dan login ke sistem menggunakan akun guru.' },
                                { num: 2, icon: 'ri-database-2-line', title: 'Input Data Siswa', desc: 'Masukkan data akademik dan informasi siswa.' },
                                { num: 3, icon: 'ri-bar-chart-line', title: 'Analisis Risiko', desc: 'Sistem menganalisis data dan mendeteksi potensi risiko akademik siswa.' },
                                { num: 4, icon: 'ri-checkbox-circle-line', title: 'Selesai', desc: 'Dapatkan rekomendasi tindak lanjut untuk setiap siswa.' },
                            ].map((step) => (
                                <div key={step.num} className="group relative z-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                                    {/* Angka terpisah - Muncul di Desktop & Tablet (md ke atas) */}
                                    <div className="hidden md:flex w-10 h-10 rounded-full bg-blue-900 text-white items-center justify-center font-bold mb-5 shadow-sm">
                                        {step.num}
                                    </div>

                                    {/* Ikon Container dengan Badge Angka */}
                                    <div className="relative w-20 h-20 rounded-full bg-blue-50 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mb-2">
                                        {/* Badge Angka - Hanya muncul di Mobile (hidden di md ke atas) */}
                                        <div className="md:hidden absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm z-20">
                                            {step.num}
                                        </div>
                                        <i className={`${step.icon} text-4xl text-blue-900`}></i>
                                    </div>
                                    <h3 className="mt-4 font-bold">{step.title}</h3>
                                    <p className="text-sm text-slate-500 mt-2">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* tim */}
            <div className="bg-blue-50" id="tim">
                <div className="container mx-auto px-8 py-20">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-blue-800 font-semibold text-sm uppercase tracking-widest">CC26-PSU080</span>
                        <h2 className="text-4xl font-bold mt-2 mb-4">Tim Pengembang </h2>
                        <p className="text-slate-500">Berikut ini merupakan tim pengembang sistem Edu Predict.</p>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-8 items-center">
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center text-center">
                            <div className="bg-blue-100 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border-2 border-blue-200 shadow-sm">
                                <img src={profilKdavi} alt="profil-Kdavi" className="w-full h-full object-cover object-center" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Kaka Davi Dharmawan</h3>
                            <p className="text-slate-500 text-sm font-medium mb-2">Data Scientist</p>
                            <div className="mb-4">
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 shadow-sm">CDCC221D6Y1015</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <a href="https://www.linkedin.com/in/kakadavidharmawan/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-linkedin-box-fill text-xl"></i>
                                </a>
                                <a href="https://github.com/dapiupiu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-github-fill text-xl"></i>
                                </a>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center text-center">
                            <div className="bg-blue-100 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border-2 border-blue-200 shadow-sm">
                                <img src={profilKsandi} alt="profil-ksandi" className="w-full h-full object-cover object-center" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Sandi Maulana</h3>
                            <p className="text-slate-500 text-sm font-medium mb-2">AI Engineer</p>
                            <div className="mb-4">
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 shadow-sm">CACC277D6Y0059</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <a href="https://www.linkedin.com/in/sndimlanaa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-linkedin-box-fill text-xl"></i>
                                </a>
                                <a href="https://github.com/bluemorphomenelaus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-github-fill text-xl"></i>
                                </a>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center text-center">
                            <div className="bg-blue-100 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border-2 border-blue-200 shadow-sm">
                                <img src={profilKdika} alt="profil-kdhika" className="w-full h-full object-cover object-top" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Andhika Firmansyah</h3>
                            <p className="text-slate-500 text-sm font-medium mb-2">Full-Stack Web</p>
                            <div className="mb-4">
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 shadow-sm">CFCC255D6Y1408</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <a href="https://www.linkedin.com/in/andhika-firmansyah-b63530235/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-linkedin-box-fill text-xl"></i>
                                </a>
                                <a href="https://github.com/raelkertiaa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-github-fill text-xl"></i>
                                </a>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center text-center">
                            <div className="bg-blue-100 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border-2 border-blue-200 shadow-sm">
                                <img src={profilKgita} alt="profil-kgita" className="w-full h-full object-cover object-top" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Dwi Shugita Syaka Dewi</h3>
                            <p className="text-slate-500 text-sm font-medium mb-2">Data Scientist</p>
                            <div className="mb-4">
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 shadow-sm">CDCC006D6X2523</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <a href="https://www.linkedin.com/in/dwi-shugita-syaka-dewi-a11a17291/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-linkedin-box-fill text-xl"></i>
                                </a>
                                <a href="https://github.com/syakadewii" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-github-fill text-xl"></i>
                                </a>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center text-center">
                            <div className="bg-blue-100 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border-2 border-blue-200 shadow-sm">
                                <img src={profilKarin} alt="profil-karin" className="w-full h-full object-cover object-top" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Rintami Salsabila</h3>
                            <p className="text-slate-500 text-sm font-medium mb-2">AI Engineer</p>
                            <div className="mb-4">
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 shadow-sm">CACC255D6X0703</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <a href="https://www.linkedin.com/in/rintami-salsabila/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-linkedin-box-fill text-xl"></i>
                                </a>
                                <a href="https://github.com/rintami" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-github-fill text-xl"></i>
                                </a>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col items-center text-center">
                                <div className="bg-blue-100 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border-2 border-blue-200 shadow-sm">
                                    <img src={profilAyu} alt="profil-ayu" className="w-full h-full object-cover object-top" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Nur Ayu Aini Amalia</h3>
                            <p className="text-slate-500 text-sm font-medium mb-2">Full-Stack Web</p>
                            <div className="mb-4">
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 shadow-sm">CFCC155D6X2028</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <a href="https://www.linkedin.com/in/nur-ayu-aini-amalia-517a702a6/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-linkedin-box-fill text-xl"></i>
                                </a>
                                <a href="https://github.com/Ayni2605" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                                    <i className="ri-github-fill text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;