# 🎨 EduPredict AI: Frontend Application

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=recharts&logoColor=white)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF3E00?style=for-the-badge&logo=sweetalert2&logoColor=white)

**Frontend EduPredict** adalah antarmuka pengguna berbasis web yang responsif, dirancang khusus untuk membantu tenaga pendidik memantau performa akademik siswa secara visual. Aplikasi ini dibangun sebagai *Single Page Application* (SPA) yang cepat, interaktif, dan mudah digunakan untuk manajemen data serta interpretasi hasil prediksi AI.

---

## 📌 Deskripsi Proyek

Layer frontend ini bertanggung jawab untuk menangani seluruh interaksi pengguna, mulai dari manajemen autentikasi guru, penginputan parameter siswa, hingga visualisasi hasil klasifikasi risiko (**Low**, **Medium**, **High**) menggunakan grafik yang informatif.

Fokus utama pengembangan frontend:
- **Data Visualization:** Mengubah data numerik kompleks dari model AI menjadi grafik bar dan statistik yang mudah dipahami.
- **Responsive Design:** Memastikan dashboard dapat diakses dengan nyaman melalui perangkat mobile maupun desktop.
- **User Experience (UX):** Memberikan *feedback* instan melalui notifikasi dan pop-up interaktif untuk setiap aksi pengguna.
- **Client-side Validation:** Mencegah kesalahan input data sebelum dikirim ke server.

---

## 🚀 Fitur Utama (UI/UX)

- **Dashboard Interaktif** — Ringkasan statistik siswa dalam bentuk kartu skor (StatCard) dan grafik tren risiko.
- **Form Input Akademik** — Validasi input 14 parameter secara real-time dengan alur *step-by-step*.
- **Visualisasi Prediksi AI** — Penampilan skor kepercayaan (*confidence score*), faktor risiko dominan, dan rekomendasi intervensi otomatis.
- **Manajemen Profil & Foto** — Pengaturan data diri guru, ganti password, serta fitur upload dan hapus foto profil.
- **Monitoring Siswa** — Fitur pencarian dan filter cepat berdasarkan nama, NISN, atau kategori risiko.
- **Portal Siswa (Public)** — Halaman pengecekan progres belajar mandiri bagi siswa hanya dengan memasukkan NISN.
- **Laporan Cetak** — Optimalisasi tampilan cetak (print-friendly) untuk laporan dashboard siswa.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Core Framework | React 18 (Hooks) |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Icons | Remix Icon, Lucide React, React Icons |
| Charts | Recharts |
| Notifications | SweetAlert2 (Swal) |
| Routing | React Router DOM v6 |
| API Client | Fetch API (dengan konfigurasi base URL) |

---

## 📂 Struktur Proyek Frontend

```
frontend/
├── public/                 # Aset publik statis
├── src/
│   ├── assets/             # Gambar, logo, dan file ilustrasi
│   ├── components/         # Komponen UI yang reusable
│   │   ├── Sidebar.jsx     # Navigasi utama samping
│   │   ├── TopBar.jsx      # Header bar dengan info user & notif
│   │   ├── PrediksiAI.jsx  # Komponen utama penampilan hasil AI
│   │   └── ...             # Komponen pendukung lainnya (Badge, Table, Form)
│   ├── pages/              # Halaman utama (Views)
│   │   ├── LoginGuruPage.jsx
│   │   ├── DashboardGuruPage.jsx
│   │   ├── ProfilGuruPage.jsx
│   │   ├── TambahSiswaPage.jsx
│   │   └── DashboardSiswaPage.jsx
│   ├── utils/              # Konfigurasi dan helper fungsi
│   │   └── api.js          # Pengaturan endpoint koneksi backend
│   ├── App.jsx             # Root component dan konfigurasi routing
│   └── main.jsx            # Entry point aplikasi
├── .env                    # Konfigurasi variabel lingkungan (local)
├── tailwind.config.js      # Konfigurasi kustomisasi Tailwind CSS
└── vite.config.js          # Konfigurasi bundler Vite
```

---

## ⚙️ Cara Menjalankan Lokal

### Prasyarat
- Node.js v18 atau v22+
- npm atau yarn

### Langkah Instalasi

1. **Masuk ke direktori frontend:**
   ```bash
   cd frontend
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Buat file `.env` di root folder frontend dan tentukan URL API backend:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Jalankan aplikasi dalam mode pengembangan:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173` secara default.

---

**© 2026 EduPredict AI Project | CC26-PSU080 | Coding Camp 2026 powered by DBS Foundation**