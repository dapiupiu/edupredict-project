# EduPredict AI

EduPredict AI adalah aplikasi web full-stack untuk membantu guru melakukan deteksi dini risiko akademik siswa. Sistem mengelola data siswa, mencatat data akademik dan perilaku belajar, mengirim data ke layanan AI, lalu menampilkan hasil prediksi risiko dalam kategori **Low**, **Medium**, atau **High** beserta faktor dominan dan rekomendasi intervensi.

Proyek ini dibuat untuk Capstone Project Coding Camp 2026 powered by DBS Foundation.

---

## Ringkasan Fitur

- Registrasi dan login guru berbasis JWT.
- Profil guru lengkap, termasuk data sekolah, wali kelas, dan foto profil.
- Manajemen data siswa: tambah, lihat, edit, hapus.
- Input data akademik dan perilaku belajar siswa.
- Prediksi risiko akademik menggunakan layanan AI eksternal.
- Analisis faktor dominan dari AI dengan status `good`, `warning`, dan `danger`.
- Rekomendasi AI dengan format `title`, `description`, dan `action`.
- Dashboard guru dengan statistik kelas dan notifikasi siswa berisiko.
- Portal siswa untuk mengecek perkembangan melalui NISN.
- Monitoring siswa dan export laporan monitoring.
- Reset password sederhana untuk kebutuhan demo aplikasi.

---

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MySQL / MariaDB |
| Autentikasi | JWT, bcrypt |
| Upload file | Multer |
| AI Service | FastAPI AI Service di Railway |
| Deployment | Vercel dan Railway |

---

## Struktur Folder

```txt
edupredict-main/
├── backend/
│   ├── config/                 # Konfigurasi database dan batas input AI
│   ├── controllers/            # Logic utama API
│   ├── middleware/             # Middleware auth dan upload
│   ├── routes/                 # Definisi endpoint Express
│   ├── services/               # Integrasi ke AI service
│   ├── utils/                  # Utility validasi input
│   ├── .env.example            # Template environment backend
│   ├── ENDPOINTS.md            # Dokumentasi API backend
│   ├── README.md               # Dokumentasi khusus backend
│   ├── package.json            # Dependensi backend
│   └── server.js               # Entry point backend
│
├── frontend/
│   ├── public/                 # Asset publik
│   ├── src/
│   │   ├── assets/             # Logo dan gambar UI
│   │   ├── components/         # Komponen reusable
│   │   ├── pages/              # Halaman aplikasi
│   │   └── utils/              # Konfigurasi base URL API
│   ├── .env.example            # Template environment frontend
│   ├── .env.production         # Environment production frontend
│   ├── package.json            # Dependensi frontend
│   ├── vercel.json             # Konfigurasi deploy Vercel
│   └── vite.config.js          # Konfigurasi Vite
│
├── edupredict_schema.sql       # Schema database MySQL/MariaDB
├── README.md                   # Dokumentasi utama proyek
└── SUBMISSION_CHECKLIST.md     # Checklist berkas submission
```

---

## Environment Variables

### Backend

Buat file `.env` di folder `backend/` berdasarkan `backend/.env.example`.

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=edupredict
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=8h
AI_SERVICE_URL=https://edupredictaimlproduction.up.railway.app
```

### Frontend

Buat file `.env` di folder `frontend/` berdasarkan `frontend/.env.example`.

```env
VITE_API_URL=http://localhost:5000
```

Untuk production, arahkan `VITE_API_URL` ke URL backend Railway.

---

## Setup Database

1. Buat database baru bernama `edupredict`.
2. Import schema:

```bash
mysql -u root -p edupredict < edupredict_schema.sql
```

Atau import file `edupredict_schema.sql` melalui phpMyAdmin/MySQL Workbench.

Tabel utama yang digunakan:

- `users`
- `students`
- `academic_records`
- `predictions`
- `notifications`

---

## Cara Menjalankan Aplikasi

### 1. Jalankan Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend berjalan di:

```txt
http://localhost:5000
```

Untuk mode production/local tanpa nodemon:

```bash
npm run start
```

### 2. Jalankan Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend berjalan di:

```txt
http://localhost:5173
```

---

## Layanan AI / Model ML

Aplikasi ini menggunakan AI Service eksternal yang dikelola terpisah dari repository web app.

- Swagger AI Service: `https://edupredictaimlproduction.up.railway.app/docs`
- OpenAPI JSON: `https://edupredictaimlproduction.up.railway.app/openapi.json`

Endpoint AI yang digunakan backend:

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/v1/predict` | Prediksi risiko siswa |
| POST | `/api/v1/analyze/dominant-factors` | Analisis faktor dominan |
| POST | `/api/v1/analyze/recommendations` | Rekomendasi intervensi |

Catatan: Model ML tidak disertakan langsung di repository ini karena dipanggil melalui AI Service eksternal.

---

## Format Output AI yang Dipakai Aplikasi

### Faktor Dominan

```json
{
  "factor": "Kehadiran",
  "value": "78%",
  "status": "warning",
  "note": "Kehadiran masih perlu perhatian."
}
```

Status digunakan untuk warna UI:

| Status | Warna |
|---|---|
| `good` | Hijau |
| `warning` | Oranye |
| `danger` | Merah |

### Rekomendasi AI

```json
{
  "title": "Tingkatkan Kehadiran",
  "description": "Pantau absensi siswa secara berkala.",
  "action": "Hubungi orang tua dan buat target kehadiran mingguan."
}
```

Frontend sudah menampilkan schema rekomendasi baru berupa `title`, `description`, dan `action`.

---

## Validasi Input AI

Rentang validasi yang digunakan aplikasi:

| Field | Rentang |
|---|---|
| `hours_studied` | 0 - 36 |
| `attendance` | 0 - 100 |
| `previous_scores` | 0 - 100 |
| `sleep_hours` | 0 - 10 |
| `tutoring_sessions` | 0 - 7 |
| `physical_activity` | 0 - 6 |

Validasi dilakukan di frontend dan backend agar data invalid tidak masuk ke database atau AI service.

---

## Dokumentasi API

Dokumentasi endpoint backend tersedia di:

```txt
backend/ENDPOINTS.md
```

Base URL lokal:

```txt
http://localhost:5000
```

Base URL production disesuaikan dengan URL Railway backend.

---

## Catatan Keamanan

- File `.env` tidak disertakan dalam repository.
- Gunakan `.env.example` sebagai template environment.
- Jangan menyimpan kredensial database asli atau secret JWT asli di GitHub.
- Folder `uploads/` dibuat otomatis saat fitur upload foto profil digunakan.

---

## Saran Pengembangan

- Import data siswa melalui Excel.
- Export PDF per siswa.
- Reset password berbasis email token dan masa kedaluwarsa.
- Validasi perpindahan kelas guru jika sudah memiliki siswa aktif.
- Batch prediction untuk import data akademik banyak siswa.

---

## Author / Team

Capstone Project Coding Camp 2026 powered by DBS Foundation  
Team: CC26-PSU080  
Project: EduPredict AI
