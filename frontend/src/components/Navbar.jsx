import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoEdupredict from '../assets/logo-edupredict.png';


function Navbar() {
    const [menuActive, setMenuActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('beranda');
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effects: Navbar shadow and ScrollSpy manual reset for top
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            // Jika user scroll kembali ke paling atas (Hero), pastikan menu 'Beranda' aktif
            if (location.pathname === '/' && window.scrollY < 150) {
                setActiveSection('beranda');
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [location.pathname]);

    // Logic ScrollSpy: Mendeteksi section yang sedang aktif saat scroll
    useEffect(() => {
        if (location.pathname !== '/') return;

        const sections = ['beranda', 'fitur', 'antarmuka', 'panduan', 'tim'];
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px', // Lebih responsif saat berpindah section
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [location.pathname]);

    const scrollTo = (id) => {
        setActiveSection(id);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuActive(false); // Tutup menu mobile setelah klik
    };

    const getNavClass = (id) => {
        let isActive = location.pathname === '/' && activeSection === id;

        // Logika khusus: menu 'Fitur' tetap aktif saat berada di section 'Antarmuka Sistem'
        if (id === 'fitur' && activeSection === 'antarmuka') {
            isActive = true;
        }

        return `relative transition-all duration-300 cursor-pointer font-medium ${isActive ? 'text-blue-900 after:w-full' : 'text-slate-600 after:w-0'} after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-900 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-900`;
    };

    return (
        <div className={`navbar fixed w-full transition-all py-4 bg-blue-100 z-50 ${scrolled ? "border-b-2 border-stone-100" : ""}`}>
            <div className="container mx-auto px-4">
                <div className="navbar-box flex items-center justify-between py-0">
                    <div className="logo-box flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('beranda')}>
                        <img src={logoEdupredict} alt="logo" className="w-16 h-16 object-contain flex-shrink-0" />
                        <h1 className="text-2xl font-bold text-blue-900">Edu Predict</h1>
                    </div>
                    <div className={`Nav-items flex lg:gap-12 gap-8 absolute md:static left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-0 flex-col md:flex-row w-full text-center ${menuActive ? "top-16 opacity-100" : "-top-72 opacity-0"} md:w-auto py-10 md:py-0 transition-all md:transition-none bg-blue-100 md:opacity-100 items-center`}>
                        <button onClick={() => scrollTo('beranda')} className={getNavClass('beranda')}>Beranda</button>
                        <button onClick={() => scrollTo('fitur')} className={getNavClass('fitur')}>Fitur</button>
                        <button onClick={() => scrollTo('panduan')} className={getNavClass('panduan')}>Panduan Penggunaan</button>
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="bg-blue-900 text-white px-5 py-1 rounded-lg text-sm hover:bg-stone-900 transition-all shadow-md cursor-pointer">
                                Login <i className="ri-arrow-right-up-line"></i>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                                    <NavLink to="/login-guru" onClick={() => setDropdownOpen(false)} className="block px-6 py-2 hover:bg-blue-50 text-slate-800 whitespace-nowrap">Masuk sebagai Guru</NavLink>
                                    <NavLink to="/login-siswa" onClick={() => setDropdownOpen(false)} className="block px-6 py-2 hover:bg-blue-50 text-slate-800 whitespace-nowrap">Masuk sebagai Siswa</NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="menu-btn md:hidden block" onClick={() => setMenuActive(!menuActive)}>
                        <i className="ri-menu-3-line ri-2x"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;