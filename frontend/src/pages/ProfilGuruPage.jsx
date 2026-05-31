import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BASE_URL from '../utils/api';
import Sidebar from '../components/Sidebar';
import TabRingkasan from '../components/TabRingkasan';
import TabEditProfil from '../components/TabEditProfil';
import Swal from 'sweetalert2';
import TopBar from '../components/TopBar';
function ProfilGuruPage() {
    const location = useLocation();
    const [open, setOpen] = useState(() => {
        const saved = localStorage.getItem('sidebarOpen');
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [activeTab, setActiveTab] = useState('ringkasan');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [siswaBerisiko, setSiswaBerisiko] = useState([]);
    const [notifikasi, setNotifikasi] = useState([]);
    const [dataSiswa, setDataSiswa] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(open));
    }, [open]);

    const [profileData, setProfileData] = useState({
        nama: '', nip: '', nuptk: '', ttl: '',
        pendidikan_terakhir: '', email: '', role: '', 
        status: '', created_at: '', no_hp: '', alamat: '',
        nama_sekolah: '', school_type: '', kelas: '', jenjang: ''
    });

    const [formData, setFormData] = useState({
        nama: '', email: '', nip: '', nuptk: '', no_hp:'', ttl: '',
        pendidikan_terakhir: '', alamat:'', 
        nama_sekolah: '', school_type: '', kelas: '', jenjang: '',
        password_lama: '', 
        password_baru: '', 
        confirm_password: '',
        foto_profil: ''
    });

    useEffect(() => {
        fetchProfile();
        fetchDashboardData();
        fetchStudents();
    }, []);

    // Handle navigasi internal dari TopBar (klik notifikasi)
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
            
            if (location.state?.scrollTo) {
                setTimeout(() => {
                    const idMap = {
                        notifikasi: 'section-notifikasi',
                        password: 'section-password'
                    };
                    const targetId = idMap[location.state.scrollTo];
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }, 300); // Beri jeda sedikit agar komponen dipastikan sudah render
            }
        }
    }, [location.state]);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token tidak ditemukan');

            const response = await fetch(`${BASE_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();

            if (result.success) {
                setProfileData(result.data);
                
                // Update localStorage agar TopBar dan komponen lain sinkron
                localStorage.setItem('user', JSON.stringify(result.data));
                // Memicu event agar TopBar (di tab yang sama) mendeteksi perubahan
                window.dispatchEvent(new Event('storage'));

                setFormData({
                    nama: result.data.nama || '',
                    email: result.data.email || '',
                    nip: result.data.nip || '',
                    nuptk: result.data.nuptk || '',
                    ttl: result.data.ttl || '',
                    no_hp: result.data.no_hp || '',
                    alamat: result.data.alamat || '',
                    pendidikan_terakhir: result.data.pendidikan_terakhir || '',
                    nama_sekolah: result.data.nama_sekolah || '',
                    school_type: result.data.school_type || '',
                    kelas: result.data.kelas || '',
                    jenjang: result.data.jenjang || '',
                    password_lama: '',
                    password_baru: '',
                    confirm_password: '',
                    foto_profil: result.data.foto_profil ? `${BASE_URL}/${result.data.foto_profil}` : ''
                });
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Gagal mengambil data profil.');
        } finally {
            setLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BASE_URL}/api/guru/students`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.success) setDataSiswa(result.data);
        } catch (err) { console.error(err); }
    };

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch(`${BASE_URL}/api/guru/dashboard`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.success) {
                // Deduplikasi siswa berisiko agar tidak ada nama ganda (ambil data terbaru)
                const uniqueSiswaMap = new Map();
                (result.data.siswa_berisiko || []).forEach(s => {
                    const currentRecordedAt = new Date(s.last_recorded);
                    if (!uniqueSiswaMap.has(s.id)) {
                        uniqueSiswaMap.set(s.id, s);
                    } else {
                        const existingRecordedAt = new Date(uniqueSiswaMap.get(s.id).last_recorded);
                        if (currentRecordedAt > existingRecordedAt) {
                            uniqueSiswaMap.set(s.id, s);
                        }
                    }
                });
                setSiswaBerisiko(Array.from(uniqueSiswaMap.values()));

                // Deduplikasi notifikasi/aktivitas berdasarkan konten (judul & pesan) 
                // untuk menghindari pesan yang sama muncul berulang
                const uniqueNotifMap = new Map();
                (result.data.notifikasi?.terbaru || []).forEach(n => {
                    const key = `${n.title}-${n.message}`;
                    if (!uniqueNotifMap.has(key)) {
                        uniqueNotifMap.set(key, n);
                    }
                });
                setNotifikasi(Array.from(uniqueNotifMap.values()));

                setUnreadCount(result.data.notifikasi?.unread || 0);
            }
        } catch (err) {
            console.error('Gagal mengambil data dashboard untuk profil:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setError('');
            setSuccess('');

            // Validasi Format (JPG atau PNG)
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                setError('Format foto harus JPG atau PNG.');
                e.target.value = ''; // Reset input agar tidak terpilih file yang salah
                return;
            }

            // Validasi Ukuran (Maksimal 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setError('Ukuran file maksimal 2MB.');
                e.target.value = ''; // Reset input
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validasi field wajib
        if (!formData.nama.trim() || !formData.email.trim()) {
            setError('Nama dan Email wajib diisi.');
            Swal.fire({
                icon: 'error',
                title: 'Validasi Gagal',
                text: 'Nama dan Email tidak boleh kosong!',
            });
            return;
        }

        if (formData.password_baru && formData.password_baru !== formData.confirm_password) {
            setError('Konfirmasi password baru tidak cocok.');
            Swal.fire({
                icon: 'warning',
                title: 'Periksa Kembali',
                text: 'Konfirmasi password baru tidak cocok.',
            });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();
            formDataToSend.append('nama', formData.nama);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('nip', formData.nip);
            formDataToSend.append('nuptk', formData.nuptk);
            formDataToSend.append('ttl', formData.ttl);
            formDataToSend.append('pendidikan_terakhir', formData.pendidikan_terakhir);
            formDataToSend.append('no_hp', formData.no_hp);
            formDataToSend.append('alamat', formData.alamat);
            formDataToSend.append('nama_sekolah', formData.nama_sekolah);
            formDataToSend.append('school_type', formData.school_type);
            formDataToSend.append('kelas', formData.kelas);
            formDataToSend.append('jenjang', formData.jenjang);
            formDataToSend.append('password_lama', formData.password_lama);
            formDataToSend.append('password_baru', formData.password_baru);
            
            if (selectedFile) {
                formDataToSend.append('foto_profil', selectedFile);
            }

            const response = await fetch(`${BASE_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formDataToSend
            });

            const result = await response.json();
            if (result.success) {
                // Feedback Pop-up Interaktif
                Swal.fire({
                    icon: 'success',
                    title: 'Profil Diperbarui!',
                    text: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    background: '#ffffff',
                });

                setSuccess(result.message);
                setFormData(prev => ({ ...prev, password_lama: '', password_baru: '', confirm_password: '' }));
                setSelectedFile(null);
                setPreviewUrl(null);
                fetchProfile();
            } else {
                setError(result.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Pembaruan Gagal',
                    text: result.message,
                });
            }
        } catch (err) {
            setError('Terjadi kesalahan saat memperbarui profil.');
            Swal.fire({
                icon: 'error',
                title: 'Error Jaringan',
                text: 'Gagal terhubung ke server. Silakan coba lagi nanti.',
            });
        }
    };

    const tabs = [
        { id: 'ringkasan', label: 'Ringkasan', icon: 'ri-layout-grid-line', badge: siswaBerisiko.length > 0 ? siswaBerisiko.length : null, badgeColor: 'bg-red-100 text-red-600' },
        { id: 'edit', label: 'Edit Profil', icon: 'ri-edit-line' },
    ];

    return (
        <div className="flex min-h-screen bg-blue-50">
            <Sidebar open={open} setOpen={setOpen} />
            <div className={`flex-1 transition-all duration-500 ${open ? 'md:ml-64' : 'md:ml-16'} ml-16 min-h-screen flex flex-col`}>
                <TopBar />
                <div className="p-4 sm:p-6 md:p-8">
                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-900">Profil Guru</h1>
                <p className="mt-1 text-sm text-gray-500">Kelola informasi akun, data wali kelas, dan pengaturan sistem</p>

                {/* Tabs */}
                <div className="mt-5 flex items-center gap-1 border-b border-gray-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setError(''); setSuccess(''); }}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px
                                ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <i className={`${tab.icon} text-base`}></i>
                            {tab.label}
                            {tab.badge && (
                                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${tab.badgeColor}`}>
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="mt-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64 text-blue-600 font-medium">
                            <i className="ri-loader-4-line animate-spin mr-2 text-2xl"></i> Memuat profil...
                        </div>
                    ) : (
                        <>
                            {activeTab === 'ringkasan' && (
                                <TabRingkasan 
                                    profileData={profileData} 
                                    siswaBerisiko={siswaBerisiko} 
                                    notifikasi={notifikasi} 
                                    onEditClick={() => setActiveTab('edit')}
                                />
                            )}
                            {activeTab === 'edit' && (
                                <TabEditProfil
                                    profileData={profileData}
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleUpdateProfile={handleUpdateProfile}
                                    handleFileChange={handleFileChange}
                                    previewUrl={previewUrl}
                                    error={error}
                                    success={success}
                                />
                            )}
                        </>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilGuruPage;