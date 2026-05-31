# 🎓 EduPredict AI: Early Warning Detection System for Student Academic Performance

![Node.js](https://img.shields.io/badge/Node.js-v22-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-v5-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

**EduPredict AI** adalah platform analitik cerdas berbasis web yang dirancang untuk mendeteksi dini risiko performa akademik siswa. Dengan mengintegrasikan data historis dan teknik *Machine Learning*, sistem ini memberikan wawasan mendalam bagi pendidik untuk melakukan intervensi tepat waktu sebelum siswa mengalami kegagalan akademik seperti penurunan nilai, prestasi rendah, tidak naik kelas, hingga putus sekolah.

---

## 📌 Deskripsi Proyek

Proyek ini berfokus pada analisis faktor-faktor yang mempengaruhi keberhasilan akademik siswa, mulai dari aspek internal (seperti motivasi dan jam belajar) hingga aspek eksternal (seperti keterlibatan orang tua dan latar belakang ekonomi). Sistem mengkategorikan siswa ke dalam tiga tingkat risiko: **Low**, **Medium**, dan **High Risk**.

Tujuan utama dari proyek ini adalah:
- **Identifikasi Dini:** Menemukan siswa yang membutuhkan perhatian khusus berdasarkan profil data mereka.
- **Analisis Prediktif:** Memahami variabel kunci yang mendorong risiko kegagalan akademik.
- **Intervensi Cerdas:** Memberikan rekomendasi tindakan yang personal menggunakan teknologi AI.
- **Pengambilan Keputusan:** Menyajikan data berbasis bukti bagi guru dan pihak sekolah.

---

## 🚀 Fitur Utama

- **Registrasi & Login Guru** — autentikasi aman berbasis JWT
- **Manajemen Data Siswa** — tambah, edit, hapus data siswa (CRUD)
- **Input 14 Parameter Akademik Siswa** — data akademik, perilaku, dan lingkungan siswa
- **Prediksi Risiko AI** — klasifikasi Low / Medium / High dengan confidence score menggunakan Neural Network
- **Prediksi Nilai Ujian** — menambahkan prediksi nilai ujian kemudian mengelompokkan jenis risikonya agar sistem lebih informatif dan mendukung pengambilan keputusan yang lebih akurat
- **Faktor Dominan & Rekomendasi** — analisis faktor risiko dan saran intervensi otomatis
- **Dashboard Guru** — ringkasan risiko, notifikasi siswa berisiko, dan statistik kelas
- **Portal Siswa** — cek status risiko via NISN tanpa perlu login
- **Notifikasi Otomatis** — alert untuk siswa berisiko High / Medium

---

## 🏗️ Arsitektur Sistem

```
Browser (React + Vite)
        ↓
  Vercel (Frontend)
        ↓
Express.js API (Railway)
        ↓  ↓
  MySQL     FastAPI ML Service (Railway)
  Database       ↓
            TensorFlow Keras Model
            (Multioutput: Risk Class + Exam Score)
```

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Node.js v22, Express.js v5 |
| Database | MySQL / MariaDB |
| Auth | JWT + bcrypt |
| AI Model | Python, FastAPI, TensorFlow Keras |
| Deploy | Vercel (Frontend), Railway (Backend + AI) |

---

## 🌐 Live Demo

| Layanan | URL |
|---------|-----|
| Frontend | https://edupredict-ashy.vercel.app |
| Backend API | https://edupredict-production-429f.up.railway.app |
| AI Service (Swagger) | https://edupredictaimlproduction.up.railway.app/docs |

---

## 📂 Struktur Proyek

```
edupredict/
├── backend/                        # Kode utama REST API server
│   ├── config/                     # Konfigurasi koneksi database dan konstanta
│   │   ├── db.js                   
│   │   └── trainingBounds.js     
│   ├── controllers/                # Logic handler untuk setiap fitur
│   │   ├── authController.js       
│   │   ├── guruController.js       
│   │   ├── academicController.js   
│   │   ├── dashboardController.js  
│   │   └── studentController.js    
│   ├── middleware/                 # Middleware autentikasi
│   │   └── auth.js                 
│   ├── routes/                     # Definisi endpoint API
│   │   ├── auth.js                 
│   │   ├── guru.js                 
│   │   └── student.js              
│   ├── services/                   # Integrasi layanan eksternal (AI/ML service)
│   │   └── aiService.js           
│   ├── utils/                      # Fungsi utilitas (OOD input clamping logic)
│   │   └── validateInput.js       
│   ├── .env.example                # Template virtual environment
│   ├── package.json                # Dependensi dan script Node.js
│   └── server.js                   # Entry point aplikasi
│
├── frontend/                       # Kode utama aplikasi React
│   ├── src/
│   │   ├── compenents/             # Komponen UI yang dapat digunakan ulang
│   │   ├── pages/                  # Halaman utama aplikasi
│   │   └── utils/
│   │       └── api.js              # Konfigurasi base URL API
│   ├── .env.production             # Variabel environment untuk production
│   ├── vercel.json                 # Konfigurasi deploy Vercel (SPA routing)
│   └── vite.config.js              # Konfigurasi bundler Vite
│
├── README.md                       # Dokumentasi proyek
├── ENDPOINTS.md                    # Dokumentasi lengkap API endpoint
└── edupredict_schema.sql           # Schema database MySQ
```

### Penjelasan Per Folder

#### `backend/`
Berisi seluruh kode server-side berbasis Node.js + Express.js yang melayani request dari frontend dan berkomunikasi dengan database serta layanan AI.

| Folder / File | Fungsi |
|---|---|
| `config/` | Konfigurasi koneksi database MySQL dan konstanta sistem |
| `config/db.js` | Setup pool koneksi ke database MySQL/MariaDB |
| `config/trainingBounds.js` | Menyimpan batas min/max distribusi data training untuk validasi input OOD |
| `controllers/` | Berisi logic bisnis untuk setiap fitur; memproses request dan mengembalikan response |
| `controllers/authController.js` | Registrasi guru baru dan login dengan hashing bcrypt + penerbitan JWT |
| `controllers/guruController.js` | Manajemen profil dan data guru |
| `controllers/academicController.js` | Pengelolaan input dan penyimpanan data akademik siswa |
| `controllers/dashboardController.js` | Mengagregasi statistik kelas, distribusi risiko, dan notifikasi untuk dashboard |
| `controllers/studentController.js` | CRUD lengkap data siswa, memanggil AI service, dan menyimpan hasil prediksi |
| `middleware/auth.js` | Interceptor yang memverifikasi token JWT sebelum request mencapai controller |
| `routes/` | Mendefinisikan mapping URL endpoint ke controller yang sesuai |
| `services/aiService.js` | Modul komunikasi HTTP ke FastAPI ML Service untuk prediksi risiko dan nilai ujian |
| `utils/validateInput.js` | Fungsi clamping input OOD agar nilai fitur berada dalam rentang data training |
| `server.js` | Entry point: inisialisasi Express, middleware global, dan registrasi semua routes |

#### `frontend/`
Berisi seluruh kode client-side berbasis React 18 + Vite yang diakses pengguna melalui browser.

| Folder / File | Fungsi |
|---|---|
| `src/components/` | Komponen UI reusable seperti card risiko, tabel siswa, form input, navbar, dan badge |
| `src/pages/` | Halaman lengkap: Login, Dashboard Guru, Manajemen Siswa, Hasil Prediksi, Portal Siswa |
| `src/utils/api.js` | Konfigurasi Axios/fetch dengan base URL API dan helper untuk request HTTP |
| `.env.production` | Menyimpan `VITE_API_URL` yang mengarah ke backend Railway saat production |
| `vercel.json` | Mengatur rewrite rule agar semua path di-redirect ke `index.html` (SPA routing) |
| `vite.config.js` | Konfigurasi build tool: alias path, proxy dev server, dan target output |

---

## ⚙️ Cara Menjalankan Lokal

### Prasyarat
- Node.js v22+
- MySQL / MariaDB
- npm

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Isi .env dengan kredensial database dan konfigurasi lainnya
npm run dev
```

Variabel `.env` yang dibutuhkan:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=edupredict
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=8h
AI_SERVICE_URL=https://edupredictaimlproduction.up.railway.app
```

### Frontend

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:5000" > .env
npm run dev
```

### Database

```bash
mysql -u root -p edupredict < edupredict_schema.sql
```

---

## 🤖 14 Fitur Model AI

| Fitur | Tipe | Rentang |
|-------|------|---------|
| Hours_Studied | Numerik | 4 – 36 jam/minggu |
| Attendance | Numerik | 60 – 100% |
| Previous_Scores | Numerik | 50 – 100 |
| Sleep_Hours | Numerik | 4 – 10 jam/malam |
| Tutoring_Sessions | Numerik | 0 – 7 sesi/bulan |
| Physical_Activity | Numerik | 0 – 6 kali/minggu |
| Parental_Involvement | Kategorikal | Low / Medium / High |
| Access_to_Resources | Kategorikal | Low / Medium / High |
| Motivation_Level | Kategorikal | Low / Medium / High |
| Internet_Access | Kategorikal | Yes / No |
| Family_Income | Kategorikal | Low / Medium / High |
| Teacher_Quality | Kategorikal | Low / Medium / High |
| Peer_Influence | Kategorikal | Negative / Neutral / Positive |
| Parental_Education_Level | Kategorikal | High School / College / Postgraduate |

---

## 📈 Saran Pengembangan ke Depan

- **Integrasi SIAKAD:** Menghubungkan sistem langsung ke Sistem Informasi Akademik sekolah untuk data real-time
- **Sistem Notifikasi Eksternal:** Integrasi dengan Email atau WhatsApp Gateway untuk peringatan otomatis ke wali kelas dan orang tua
- **Fitur Prediksi Nilai Ujian:** Menambahkan prediksi nilai ujian kemudian mengelompokkan jenis risikonya agar sistem lebih informatif dan mendukung pengambilan keputusan yang lebih akurat
- **Multilingual Support:** Dukungan bahasa tambahan untuk dashboard dan intervensi AI
- **Model Lanjutan:** Eksperimen dengan algoritma Ensemble Methods untuk meningkatkan presisi pada kelas High Risk
- **Multi-Sekolah:** Dukungan manajemen multi-institusi dalam satu platform
- **Laporan PDF:** Export hasil analisis risiko kelas dalam format laporan

---

## 📝 API Documentation

Lihat [ENDPOINTS.md](./ENDPOINTS.md) untuk dokumentasi lengkap semua endpoint.

---

**© 2026 EduPredict AI Project | CC26-PSU080 | Coding Camp 2026 powered by DBS Foundation**
