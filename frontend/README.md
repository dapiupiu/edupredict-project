# EduPredict Frontend

Frontend EduPredict AI adalah aplikasi web berbasis React dan Vite yang digunakan oleh guru dan siswa untuk mengakses fitur prediksi risiko akademik, monitoring siswa, dashboard, profil guru, serta hasil rekomendasi AI.

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- Remix Icon
- Fetch API

---

## Struktur Folder Frontend

```txt
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .env.production
├── package.json
├── vercel.json
└── vite.config.js
```

---

## Environment Setup

Buat file `.env` di folder `frontend/` berdasarkan `.env.example`.

```env
VITE_API_URL=http://localhost:5000
```

Untuk production, arahkan ke URL backend Railway:

```env
VITE_API_URL=https://your-backend-url.up.railway.app
```

---

## Instalasi

```bash
cd frontend
npm install
```

---

## Menjalankan Frontend

```bash
npm run dev
```

Default frontend berjalan di:

```txt
http://localhost:5173
```

---

## Build Production

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

---

## Halaman Utama

### Public

- Landing Page
- Login Guru
- Register Guru
- Lupa Password
- Login Siswa

### Guru

- Dashboard Guru
- Daftar Siswa
- Tambah Siswa
- Monitoring Siswa
- Profil Guru
- Progress Siswa

### Siswa

- Dashboard Siswa berdasarkan NISN

---

## Komponen Penting

- `PrediksiAI.jsx`  
  Menampilkan hasil prediksi, probabilitas, faktor dominan, dan rekomendasi AI.

- `DataSiswaInput.jsx`  
  Form input data siswa dan data akademik.

- `LaporanMonitoring.jsx`  
  Komponen export/print laporan monitoring siswa.

- `RisikoBadge.jsx`  
  Badge status risiko siswa.

- `Sidebar.jsx`  
  Navigasi dashboard guru.

- `TabRingkasan.jsx` dan `TabEditProfil.jsx`  
  Komponen halaman profil guru.

---

## Integrasi Backend

Konfigurasi base URL API berada di:

```txt
src/utils/api.js
```

File tersebut membaca environment variable:

```env
VITE_API_URL
```

---

## Format Rekomendasi AI

Frontend mendukung format rekomendasi AI terbaru:

```json
{
  "title": "Tingkatkan Kehadiran",
  "description": "Pantau absensi siswa secara berkala.",
  "action": "Hubungi orang tua dan buat target kehadiran mingguan."
}
```

Frontend juga tetap mendukung format lama:

```json
{
  "text": "Tingkatkan konsistensi belajar siswa."
}
```

---

## Warna Faktor Dominan

Warna faktor dominan mengikuti field `status` dari AI.

| Status | Warna |
|---|---|
| `good` | Hijau |
| `warning` | Oranye |
| `danger` | Merah |

---

## Validasi Input Akademik

Validasi dilakukan pada form tambah siswa:

| Field | Rentang |
|---|---|
| Jam belajar/minggu | 0 - 36 |
| Kehadiran | 0 - 100 |
| Nilai rapor sebelumnya | 0 - 100 |
| Jam tidur/malam | 0 - 10 |
| Sesi bimbingan belajar/bulan | 0 - 7 |
| Aktivitas fisik/minggu | 0 - 6 |

---

## Deployment

Frontend dapat dideploy ke Vercel.

Pastikan environment variable berikut sudah diset di Vercel:

```env
VITE_API_URL=https://your-backend-url.up.railway.app
```

File konfigurasi Vercel:

```txt
vercel.json
```

---

## Catatan

- Pastikan backend aktif sebelum menjalankan frontend.
- Pastikan `VITE_API_URL` sudah mengarah ke backend yang benar.
- Jangan menyimpan credential sensitif di frontend.
