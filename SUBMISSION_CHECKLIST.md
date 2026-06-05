# Submission Checklist — EduPredict AI

Dokumen ini dibuat untuk memastikan ZIP project sudah memenuhi kebutuhan submission.

## 1. Source Code

Sudah tersedia:

- `backend/` — source code backend Node.js + Express.js.
- `frontend/` — source code frontend React + Vite.
- `edupredict_schema.sql` — schema database MySQL/MariaDB.

## 2. Template Environment

Sudah tersedia:

- `backend/.env.example`
- `frontend/.env.example`

Catatan:

- File `.env` asli tidak disertakan karena berisi kredensial/sensitive value.
- Gunakan `.env.example` sebagai acuan membuat `.env` lokal.

## 3. Dependensi

Sudah tersedia:

- `backend/package.json`
- `backend/package-lock.json`
- `frontend/package.json`
- `frontend/package-lock.json`

## 4. Konfigurasi Pendukung

Sudah tersedia:

- `.gitignore`
- `frontend/vite.config.js`
- `frontend/vercel.json`
- `frontend/eslint.config.js`
- `backend/config/db.js`
- `backend/config/trainingBounds.js`

## 5. README dan Dokumentasi

Sudah tersedia:

- `README.md` — dokumentasi utama project.
- `backend/README.md` — dokumentasi backend.
- `frontend/README.md` — dokumentasi frontend.
- `backend/ENDPOINTS.md` — dokumentasi API endpoint.
- `SUBMISSION_CHECKLIST.md` — checklist kelengkapan submission.

## 6. Tautan Model ML

Model ML tidak disimpan di repository ini karena digunakan melalui AI Service eksternal.

Dokumentasi layanan AI:

- Swagger: `https://edupredictaiprod.up.railway.app`
- OpenAPI JSON: `https://edupredictaiprod.up.railway.app`

Endpoint AI yang digunakan:

- `POST /api/v1/predict`
- `POST /api/v1/analyze/dominant-factors`
- `POST /api/v1/analyze/recommendations`

## 7. Cara Menjalankan Singkat

Backend:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Database:

```bash
mysql -u root -p edupredict < edupredict_schema.sql
```

## 8. Catatan Tambahan

- Folder `uploads/` akan dibuat otomatis oleh middleware upload ketika aplikasi berjalan.
- Pastikan MySQL/MariaDB berjalan sebelum backend dijalankan.
- Pastikan `AI_SERVICE_URL` mengarah ke AI Service yang aktif.
