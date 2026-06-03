# EduPredict Backend

Backend EduPredict AI adalah REST API berbasis Node.js dan Express.js yang menangani autentikasi guru, manajemen data siswa, input data akademik, integrasi AI service, notifikasi risiko, profil guru, upload foto profil, dan reset password.

---

## Tech Stack

- Node.js
- Express.js
- MySQL / MariaDB
- mysql2
- JWT
- bcrypt
- Multer
- Axios
- dotenv
- cors

---

## Struktur Folder Backend

```txt
backend/
├── config/
│   ├── db.js
│   └── trainingBounds.js
├── controllers/
│   ├── academicController.js
│   ├── authController.js
│   ├── guruController.js
│   └── studentController.js
├── middleware/
│   ├── auth.js
│   └── upload.js
├── routes/
│   ├── auth.js
│   ├── guru.js
│   └── student.js
├── services/
│   └── aiService.js
├── utils/
│   └── validateInput.js
├── .env.example
├── ENDPOINTS.md
├── package.json
└── server.js
```

---

## Environment Setup

Buat file `.env` di folder `backend/` berdasarkan `.env.example`.

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

---

## Instalasi

```bash
cd backend
npm install
```

---

## Menjalankan Backend

Mode development:

```bash
npm run dev
```

Mode production/local biasa:

```bash
npm run start
```

Default backend berjalan di:

```txt
http://localhost:5000
```

---

## Setup Database

1. Pastikan MySQL/MariaDB sudah berjalan.
2. Buat database:

```sql
CREATE DATABASE edupredict;
```

3. Import schema:

```bash
mysql -u root -p edupredict < ../edupredict_schema.sql
```

Atau import file `edupredict_schema.sql` melalui phpMyAdmin/MySQL Workbench.

---

## Tabel Database

Tabel utama:

- `users`
- `students`
- `academic_records`
- `predictions`
- `notifications`

---

## Integrasi AI Service

Backend mengakses AI Service eksternal melalui environment variable:

```env
AI_SERVICE_URL=https://edupredictaimlproduction.up.railway.app
```

Endpoint AI yang digunakan:

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/v1/predict` | Prediksi risiko siswa |
| POST | `/api/v1/analyze/dominant-factors` | Analisis faktor dominan |
| POST | `/api/v1/analyze/recommendations` | Rekomendasi intervensi |

Dokumentasi AI:

```txt
https://edupredictaimlproduction.up.railway.app/docs
```

---

## Validasi Input Akademik

Backend melakukan validasi sebelum data masuk ke database dan AI service.

| Field | Rentang |
|---|---|
| `hours_studied` | 0 - 36 |
| `attendance` | 0 - 100 |
| `previous_scores` | 0 - 100 |
| `sleep_hours` | 0 - 10 |
| `tutoring_sessions` | 0 - 7 |
| `physical_activity` | 0 - 6 |

Jika data tidak valid, backend mengembalikan status `400`.

---

## Fallback AI

Jika AI service tidak dapat diakses, backend memiliki fallback sederhana melalui fungsi `getHardcodedPrediction()` agar aplikasi tetap dapat berjalan untuk kebutuhan demo.

Response fallback akan memiliki source:

```json
{
  "source": "hardcode_fallback"
}
```

---

## Upload Foto Profil

Upload foto profil guru menggunakan Multer.

- File disimpan ke folder `uploads/`.
- Folder `uploads/` dibuat otomatis jika belum tersedia.
- File statis disajikan melalui Express static middleware.

---

## Reset Password

Endpoint reset password sederhana tersedia untuk kebutuhan demo aplikasi.

Catatan:

- Reset password belum menggunakan token email.
- User memasukkan email, password baru, dan konfirmasi password.
- Password wajib minimal 8 karakter dan mengandung kombinasi huruf serta angka.

---

## Dokumentasi Endpoint

Lihat file:

```txt
backend/ENDPOINTS.md
```

---

## Catatan Keamanan

- Jangan commit file `.env`.
- Gunakan `.env.example` sebagai template.
- Ganti `JWT_SECRET` dengan value aman pada environment production.
- Pastikan credential database production tidak disimpan di repository.
