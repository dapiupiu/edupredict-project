# EduPredict AI

<p align="center">
  <img src="./frontend/src/assets/logo-edupredict.png" alt="EduPredict Logo" width="180"/>
</p>

<h3 align="center">Academic Risk Prediction System for Early Student Intervention</h3>

<p align="center">
<img src="https://img.shields.io/badge/Frontend-React-blue" />
<img src="https://img.shields.io/badge/Backend-Node.js-green" />
<img src="https://img.shields.io/badge/Database-MySQL-orange" />
<img src="https://img.shields.io/badge/AI-FastAPI-red" />
<img src="https://img.shields.io/badge/ML-TensorFlow-ff6f00" />
</p>

<p align="center">
  Capstone Project Coding Camp 2026 powered by DBS Foundation<br/>
  Team ID: <strong>CC26-PSU080</strong>
</p>

<p align="center">
<a href="https://edupredict-dashboard-cc26psu080.streamlit.app">Dashboard</a> •
<a href="https://your-frontend.vercel.app">Web Application</a> •
<a href="https://edupredictaimlproduction.up.railway.app/docs">Swagger</a> •
<a href="https://edupredictaimlproduction.up.railway.app/openapi.json">OpenAPI</a> •
<a href="https://drive.google.com/drive/folders/1AHwpqqGlxZEDhhTH8b1munbLXpte0DWc?usp=sharing">Model Files</a>
</p>

---

## Table of Contents

- [Deskripsi Singkat Proyek](#deskripsi-singkat-proyek)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [System Flow](#system-flow)
- [Petunjuk Setup Environment](#petunjuk-setup-environment)
- [Setup Database](#setup-database)
- [Cara Menjalankan Aplikasi](#cara-menjalankan-aplikasi)
- [Tautan Model ML / AI Service](#tautan-model-ml--ai-service)
- [Format Response AI](#format-response-ai)
- [Validasi Input Akademik](#validasi-input-akademik)
- [Dokumentasi API](#dokumentasi-api)
- [Supporting Documents](#supporting-documents)
- [Deployment](#deployment)
- [Catatan Keamanan](#catatan-keamanan)
- [Saran Pengembangan](#saran-pengembangan)
- [Submission Requirements](#submission-requirements)

---

## Deskripsi Singkat Proyek

**EduPredict AI** adalah aplikasi web full-stack yang membantu guru melakukan deteksi dini risiko akademik siswa berbasis Artificial Intelligence. Sistem ini mengelola data siswa, mencatat data akademik dan perilaku belajar, mengirimkan data ke layanan AI, lalu menampilkan hasil prediksi risiko dalam kategori **Low**, **Medium**, atau **High**.

Selain menampilkan status risiko, aplikasi juga menyediakan **analisis faktor dominan** dan **rekomendasi intervensi AI** agar guru dapat mengambil keputusan lebih cepat, terarah, dan berbasis data.

---

## Fitur Utama

- Registrasi dan login guru.
- Profil guru lengkap, termasuk data sekolah, wali kelas, dan foto profil.
- Manajemen data siswa: tambah, lihat, edit, dan hapus.
- Input data akademik dan perilaku belajar siswa.
- Prediksi risiko akademik berbasis AI.
- Analisis faktor dominan dengan status `good`, `warning`, dan `danger`.
- Rekomendasi AI dengan format `title`, `description`, dan `action`.
- Dashboard guru untuk monitoring performa kelas.
- Portal siswa untuk melihat hasil prediksi berdasarkan NISN.
- Monitoring siswa dan export laporan.
- Reset password sederhana untuk kebutuhan demo aplikasi.
- Validasi input akademik pada frontend dan backend.
- Export informasi daftar siswa oleh guru atau berdasarkan NISN sebagai bahan laporan.

---

## Tech Stack

## Architecture Overview

```text
Frontend (React + Vite)
          │
          ▼
Backend API (Node.js + Express)
          │
          ▼
AI Service (FastAPI)
          │
          ▼
TensorFlow Model
          │
          ▼
Risk Prediction + Recommendations
```

---

### Web Application

| Area | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MySQL / MariaDB |
| Authentication | JWT, bcrypt |
| File Upload | Multer |
| API Communication | Fetch API, Axios |
| Deployment | Vercel, Railway |
| Development Tools | Visual Studio Code, Postman, GitHub, TablePlus |

### Artificial Intelligence

| Area | Technology |
|---|---|
| AI API Framework | FastAPI |
| Deployment | Railway |
| Programming Language | Python |
| Deep Learning / Machine Learning | TensorFlow |
| AI Recommendation Service | Groq / Generative AI |
| API Documentation | Swagger / OpenAPI |

### Data Science

| Area | Technology |
|---|---|
| Notebook Environment | Google Colab |
| Programming Language | Python |
| Data Processing | Pandas, NumPy |
| Data Visualization | Matplotlib, Seaborn, Plotly |
| Exploration / Experiment | Google Colab Notebook |
| Dashboard Deployment | Streamlit |

---

## Struktur Proyek

```txt
edupredict-main/
├── backend/
│   ├── config/                 # Konfigurasi database dan batas input AI
│   ├── controllers/            # Logic utama API
│   ├── middleware/             # Middleware autentikasi dan upload
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
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Logo dan asset aplikasi
│   │   ├── components/         # Komponen reusable
│   │   ├── pages/              # Halaman aplikasi
│   │   └── utils/              # Konfigurasi API frontend
│   ├── .env.example            # Template environment frontend
│   ├── package.json            # Dependensi frontend
│   ├── vercel.json             # Konfigurasi deploy Vercel
│   └── vite.config.js          # Konfigurasi Vite
│
├── edupredict_schema.sql       # Schema database MySQL/MariaDB
├── README.md                   # Dokumentasi utama proyek
└── SUBMISSION_CHECKLIST.md     # Checklist kelengkapan submission
```

---

## System Flow

```txt
Guru login
↓
Guru mengisi atau mengelola data siswa
↓
Guru menginput data akademik siswa
↓
Backend melakukan validasi data
↓
Backend mengirim data ke AI Service
↓
AI menghasilkan prediksi risiko akademik
↓
AI menghasilkan analisis faktor dominan dan rekomendasi
↓
Frontend menampilkan hasil prediksi, analisis, dan rekomendasi kepada guru/siswa
```

---

## Petunjuk Setup Environment

### Backend Environment

Buat file `.env` di dalam folder `backend/` berdasarkan file `backend/.env.example`.

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

### Frontend Environment

Buat file `.env` di dalam folder `frontend/` berdasarkan file `frontend/.env.example`.

```env
VITE_API_URL=http://localhost:5000
```

Untuk production, arahkan `VITE_API_URL` ke URL backend Railway.

---

## Setup Database

1. Buat database baru bernama `edupredict`.

```sql
CREATE DATABASE edupredict;
```

2. Import schema database.

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

### 1. Menjalankan Backend

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

Untuk menjalankan backend tanpa mode development:

```bash
npm run start
```

### 2. Menjalankan Frontend

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

## Tautan Model ML / AI Service

EduPredict menggunakan AI Service eksternal yang dideploy secara terpisah.

- Swagger Documentation: [Open Swagger Docs](https://edupredictaimlproduction.up.railway.app/docs)
- OpenAPI JSON: https://edupredictaimlproduction.up.railway.app/openapi.json
- Google Drive (.keras, .pkl): https://drive.google.com/drive/folders/1AHwpqqGlxZEDhhTH8b1munbLXpte0DWc?usp=sharing

Endpoint AI yang digunakan backend:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/predict` | Predict student academic risk |
| POST | `/api/v1/analyze/dominant-factors` | Generate dominant factor analysis |
| POST | `/api/v1/analyze/recommendations` | Generate AI intervention recommendations |

Catatan:

- Model ML tidak disimpan langsung di repository web app.
- Backend mengakses model melalui AI Service eksternal menggunakan `AI_SERVICE_URL`.
- Untuk detail implementasi model dan eksperimen data science, lihat dokumen pendukung pada bagian **Supporting Documents**.

---

## Format Response AI

### Dominant Factors

```json
{
  "factor": "Kehadiran",
  "value": "78%",
  "status": "warning",
  "note": "Kehadiran masih perlu perhatian."
}
```

Status digunakan untuk menentukan warna tampilan pada frontend:

| Status | UI Color |
|---|---|
| `good` | Green |
| `warning` | Orange |
| `danger` | Red |

### Recommendations

```json
{
  "title": "Tingkatkan Kehadiran",
  "description": "Pantau absensi siswa secara berkala.",
  "action": "Hubungi orang tua dan buat target kehadiran mingguan."
}
```

Frontend sudah mendukung schema rekomendasi terbaru dengan field `title`, `description`, dan `action`.

---

## Validasi Input Akademik

Validasi dilakukan pada frontend dan backend agar data yang dikirim ke AI tetap aman dan konsisten.

| Field | Valid Range |
|---|---|
| `hours_studied` | 0 - 36 |
| `attendance` | 0 - 100 |
| `previous_scores` | 0 - 100 |
| `sleep_hours` | 0 - 10 |
| `tutoring_sessions` | 0 - 7 |
| `physical_activity` | 0 - 6 |

Backend tetap menjaga input agar tidak merusak proses prediksi model. Untuk menjaga akurasi model, logic clamping dapat digunakan pada proses prediksi, sedangkan analisis faktor dan rekomendasi dapat menyesuaikan input asli pengguna agar hasil saran tetap sinkron dengan tampilan data.

---

## Dokumentasi API

Dokumentasi endpoint backend tersedia pada file:

```txt
backend/ENDPOINTS.md
```

Base URL lokal:

```txt
http://localhost:5000
```

Base URL production mengikuti deployment backend di Railway.

---

## Supporting Documents

Dokumen pendukung project dapat diakses melalui link berikut.

| Document | Access |
|----------|----------|
| Jobdesk Team | [Open Document](https://docs.google.com/spreadsheets/d/1LfxJzDSZo-KgMOR8QWNe5e8gSqJ5g1H-Cd8L2UvsEiA/edit?pli=1&gid=0#gid=0) |
| AI Documentation | [Open Repository](https://github.com/raelkertiaa/edupredict/tree/ai-engineer) |
| Data Science Documentation | [Open Repository](https://github.com/raelkertiaa/edupredict/tree/data-science) |
| Capstone Playbook | [Open Document](https://docs.google.com/document/d/12y12GzyuqR9LWbym_Zx2GKJaBAv2gh-LHZBwHN8nCDk/edit?pli=1&tab=t.0#heading=h.kfx0o3hg27op) |

---

## Deployment

### Frontend

Frontend dideploy menggunakan Vercel.

Pastikan environment variable berikut sudah diset di Vercel:

```env
VITE_API_URL=https://your-backend-url.up.railway.app
```

### Backend

Backend dideploy menggunakan Railway.

Pastikan environment variable backend sudah diset di Railway:

```env
PORT=5000
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=8h
AI_SERVICE_URL=https://edupredictaimlproduction.up.railway.app
```

---

## Catatan Keamanan

- File `.env` asli tidak disertakan dalam repository.
- Gunakan `.env.example` sebagai template environment.
- Jangan menyimpan credential database asli atau JWT secret asli di GitHub.
- Folder `uploads/` digunakan untuk menyimpan foto profil dan tidak perlu diikutsertakan jika berisi file user.
- Password user disimpan dalam bentuk hash menggunakan bcrypt.

---

## Saran Pengembangan

Beberapa pengembangan yang dapat dilakukan pada versi berikutnya:

1. **Import Data Siswa melalui Excel**  
   Menambahkan fitur import data siswa menggunakan file Excel. Jika file hanya berisi data dasar seperti nama, NISN, gender, dan pendidikan orang tua, sistem dapat menyimpan data sebagai draft/belum lengkap. Jika file berisi data akademik lengkap, sistem dapat dikembangkan untuk langsung memproses prediksi AI.

2. **Integrasi Database dengan Sistem Informasi Akademik (SIAKAD)**  
   Menghubungkan dashboard EduPredict dengan Sistem Informasi Akademik agar data siswa dan nilai akademik dapat diperbarui secara real-time.

3. **Model Advanced**  
   Mengembangkan eksperimen model lanjutan menggunakan Deep Learning atau Ensemble Methods seperti XGBoost dan LightGBM untuk meningkatkan presisi, terutama pada kelas minoritas seperti High Risk.

4. **Sistem Notifikasi Otomatis**  
   Mengintegrasikan sistem dengan Email atau WhatsApp Gateway untuk mengirim peringatan otomatis kepada wali kelas, guru BK, atau orang tua.

5. **Prediksi Nilai Ujian**  
   Menambahkan fitur prediksi nilai ujian untuk memberikan gambaran performa akademik siswa secara lebih informatif.

6. **Multilingual Support**  
   Menambahkan dukungan bahasa tambahan agar dashboard dan rekomendasi AI dapat digunakan oleh pengguna yang lebih luas.

7. **Export Laporan Per Siswa**  
   Menambahkan fitur export laporan individual untuk setiap siswa dalam format PDF.

8. **Reset Password Berbasis Email Token**  
   Mengembangkan fitur reset password yang lebih aman menggunakan token email dan masa kedaluwarsa.

9. **Validasi Perpindahan Kelas Guru**  
   Menambahkan aturan validasi jika wali kelas berpindah kelas tetapi masih memiliki siswa aktif pada kelas sebelumnya.

10. **Batch Prediction**  
    Mengembangkan fitur prediksi massal untuk mendukung proses analisis banyak siswa sekaligus.

---

## Submission Requirements

Project ZIP sebaiknya mencakup item berikut:

### 1. Source Code

Berkas kode aplikasi dan kode yang digunakan untuk pelatihan model Machine Learning jika ada.

Dalam repository ini tersedia:

- `backend/` — source code backend Node.js + Express.js.
- `frontend/` — source code frontend React + Vite.
- `edupredict_schema.sql` — schema database MySQL/MariaDB.

Catatan: kode model Machine Learning berada pada repository/dokumentasi AI terpisah dan diakses melalui AI Service eksternal.

### 2. Template Environment

Jika aplikasi menggunakan berkas environment untuk kredensial, sertakan template environment tanpa nilai sensitif.

File yang disertakan:

- `backend/.env.example`
- `frontend/.env.example`

File `.env` asli tidak disertakan karena dapat berisi credential dan secret key.

### 3. Dependensi

Daftar atau berkas dependensi project disertakan melalui:

- `backend/package.json`
- `backend/package-lock.json`
- `frontend/package.json`
- `frontend/package-lock.json`

### 4. Konfigurasi Pendukung

Berkas konfigurasi lain yang relevan disertakan, seperti:

- `.gitignore`
- `frontend/vite.config.js`
- `frontend/vercel.json`
- `frontend/eslint.config.js`
- `backend/config/db.js`
- `backend/config/trainingBounds.js`

### 5. README

README ini telah memuat informasi berikut:

- Deskripsi singkat proyek.
- Petunjuk setup environment.
- Tautan model ML / AI Service.
- Cara menjalankan aplikasi.
- Tech stack.
- Dokumentasi endpoint pendukung.
- Saran pengembangan.

Detail checklist tambahan tersedia pada file:

```txt
SUBMISSION_CHECKLIST.md
```
---

## Deliverables

| Component | Status |
|------------|------------|
| Frontend Application | Available |
| Backend API | Available |
| AI Service | Available |
| Database Schema | Available |
| Technical Documentation | Available |
| Deployment Configuration | Available |
| Submission Checklist | Available |

---

<p align="center">
Developed by Team CC26-PSU080<br/>
<b>Capstone Project Coding Camp 2026 powered by DBS Foundation</b>
</p>
