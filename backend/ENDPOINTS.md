# EduPredict Backend API Endpoints

Dokumentasi ini menjelaskan endpoint utama backend EduPredict AI.

Base URL lokal:

```txt
http://localhost:5000
```

Untuk production, base URL disesuaikan dengan URL backend Railway.

---

## Auth Endpoints

Base path:

```txt
/api/auth
```

### Register Guru

```http
POST /api/auth/register
```

Request body:

```json
{
  "namaLengkap": "Budi Santoso",
  "email": "budi@example.com",
  "password": "password123",
  "kelas": "12 IPA 2"
}
```

Response sukses:

```json
{
  "success": true,
  "message": "Registrasi berhasil. Silakan login.",
  "data": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com",
    "role": "guru",
    "kelas": "12 IPA 2"
  }
}
```

Catatan:

- Password minimal 8 karakter.
- Password wajib mengandung kombinasi huruf dan angka.
- `kelas` digunakan sebagai data wali kelas guru.

---

### Login Guru

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "budi@example.com",
  "password": "password123"
}
```

Response sukses:

```json
{
  "success": true,
  "message": "Login berhasil.",
  "token": "jwt_token",
  "user": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com",
    "role": "guru"
  }
}
```

---

### Profil Guru Login

```http
GET /api/auth/me
```

Headers:

```txt
Authorization: Bearer <token>
```

Response sukses:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com",
    "role": "guru",
    "nip": "123456",
    "nuptk": "987654",
    "ttl": "Jakarta, 1 Januari 1990",
    "pendidikan_terakhir": "S1",
    "no_hp": "08123456789",
    "alamat": "Jakarta",
    "nama_sekolah": "SMA Contoh",
    "school_type": "Public",
    "kelas": "12 IPA 2",
    "jenjang": "SMA",
    "foto_profil": "foto_1_123456789.png"
  }
}
```

---

### Update Profil Guru

```http
PUT /api/auth/profile
```

Headers:

```txt
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

Form data yang dapat dikirim:

```txt
nama
nip
nuptk
ttl
pendidikan_terakhir
no_hp
alamat
nama_sekolah
school_type
kelas
jenjang
foto_profil
password_lama
password_baru
```

Catatan:

- `foto_profil` dikirim sebagai file.
- Jika mengganti password, `password_lama` wajib diisi.
- Password baru wajib minimal 8 karakter dan mengandung huruf serta angka.

---

### Forgot Password

```http
POST /api/auth/forgot-password
```

Request body:

```json
{
  "email": "budi@example.com",
  "password_baru": "password123",
  "confirm_password": "password123"
}
```

Response sukses:

```json
{
  "success": true,
  "message": "Password berhasil direset. Silakan login menggunakan password baru."
}
```

Catatan:

- Endpoint ini adalah reset password sederhana untuk kebutuhan demo.
- Belum menggunakan email token.

---

### Logout

```http
POST /api/auth/logout
```

Headers:

```txt
Authorization: Bearer <token>
```

Response sukses:

```json
{
  "success": true,
  "message": "Logout berhasil."
}
```

---

## Guru Endpoints

Base path:

```txt
/api/guru
```

Semua endpoint guru membutuhkan header:

```txt
Authorization: Bearer <token>
```

---

### Ambil Semua Siswa Guru

```http
GET /api/guru/students
```

Response sukses:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama_siswa": "Andi Saputra",
      "nisn": "1234567890",
      "kelas": "12 IPA 2",
      "gender": "Male",
      "risk_category": "Medium",
      "confidence": 99.2
    }
  ]
}
```

---

### Laporan Semua Siswa

```http
GET /api/guru/students/report
```

Digunakan untuk export/print laporan monitoring semua siswa.

Response sukses:

```json
{
  "success": true,
  "data": [
    {
      "nama_siswa": "Andi Saputra",
      "nisn": "1234567890",
      "kelas": "12 IPA 2",
      "risk_category": "Medium",
      "confidence": 99.2
    }
  ]
}
```

Catatan penting:

Route `/students/report` harus didefinisikan sebelum `/students/:id` pada file route Express agar tidak terbaca sebagai parameter `id`.

---

### Detail Siswa

```http
GET /api/guru/students/:id
```

Response sukses:

```json
{
  "success": true,
  "data": {
    "siswa": {
      "id": 1,
      "nama_siswa": "Andi Saputra",
      "nisn": "1234567890",
      "kelas": "12 IPA 2",
      "gender": "Male",
      "parental_education_level": "High School"
    },
    "histori": [
      {
        "record_id": 1,
        "hours_studied": 14,
        "attendance": 78,
        "previous_scores": 72,
        "sleep_hours": 7,
        "risk_category": "Medium",
        "confidence": 99.2,
        "risk_factors": [],
        "recommendations": []
      }
    ]
  }
}
```

---

### Tambah Siswa

```http
POST /api/guru/students
```

Request body:

```json
{
  "nama_siswa": "Andi Saputra",
  "nisn": "1234567890",
  "kelas": "12 IPA 2",
  "gender": "Male",
  "parental_education_level": "High School",
  "school_type": "Public",
  "distance_from_home": "Moderate",
  "learning_disabilities": "No"
}
```

Response sukses:

```json
{
  "success": true,
  "message": "Siswa berhasil ditambahkan.",
  "data": {
    "id": 1
  }
}
```

---

### Update Siswa

```http
PUT /api/guru/students/:id
```

Request body:

```json
{
  "nama_siswa": "Andi Saputra",
  "nisn": "1234567890",
  "kelas": "12 IPA 2",
  "gender": "Male",
  "parental_education_level": "College"
}
```

---

### Hapus Siswa

```http
DELETE /api/guru/students/:id
```

Response sukses:

```json
{
  "success": true,
  "message": "Siswa berhasil dihapus."
}
```

---

## Academic Endpoints

Base path:

```txt
/api/guru
```

---

### Input Data Akademik dan Prediksi AI

```http
POST /api/guru/academic/:studentId
```

Request body:

```json
{
  "hours_studied": 14,
  "attendance": 78,
  "sleep_hours": 7,
  "previous_scores": 72,
  "tutoring_sessions": 1,
  "physical_activity": 2,
  "parental_involvement": "Medium",
  "access_to_resources": "Medium",
  "motivation_level": "Medium",
  "internet_access": "Yes",
  "family_income": "Medium",
  "teacher_quality": "Medium",
  "peer_influence": "Neutral"
}
```

Response sukses:

```json
{
  "success": true,
  "message": "Data akademik berhasil disimpan dan prediksi telah dilakukan.",
  "data": {
    "academic_record_id": 1,
    "prediction_id": 1,
    "siswa": "Andi Saputra",
    "prediksi": {
      "risk_category": "Medium",
      "confidence": 99.2,
      "probabilities": {
        "Low": 0.5,
        "Medium": 99.2,
        "High": 0.3
      },
      "risk_factors": [
        {
          "factor": "Kehadiran",
          "value": "78%",
          "status": "warning",
          "note": "Kehadiran masih perlu perhatian."
        }
      ],
      "recommendations": [
        {
          "title": "Tingkatkan Kehadiran",
          "description": "Pantau absensi siswa secara rutin.",
          "action": "Hubungi orang tua dan buat target kehadiran mingguan."
        }
      ],
      "source": "ai"
    },
    "ood_warnings": [],
    "is_ood": false,
    "input_used": {}
  }
}
```

Validasi angka:

| Field | Rentang |
|---|---|
| `hours_studied` | 0 - 36 |
| `attendance` | 0 - 100 |
| `previous_scores` | 0 - 100 |
| `sleep_hours` | 0 - 10 |
| `tutoring_sessions` | 0 - 7 |
| `physical_activity` | 0 - 6 |

---

### Ambil Histori Akademik Siswa

```http
GET /api/guru/academic/:studentId
```

Response sukses:

```json
{
  "success": true,
  "data": {
    "siswa": {
      "id": 1,
      "nama_siswa": "Andi Saputra",
      "nisn": "1234567890",
      "kelas": "12 IPA 2"
    },
    "total": 1,
    "histori": [
      {
        "record_id": 1,
        "hours_studied": 14,
        "attendance": 78,
        "sleep_hours": 7,
        "previous_scores": 72,
        "risk_category": "Medium",
        "confidence": 99.2,
        "probabilities": {},
        "risk_factors": []
      }
    ]
  }
}
```

---

## Student Endpoints

Base path:

```txt
/api/student
```

Endpoint ini digunakan siswa untuk melihat hasil prediksi menggunakan NISN.

---

### Cek Siswa Berdasarkan NISN

```http
POST /api/student/check
```

Request body:

```json
{
  "nisn": "1234567890"
}
```

Response sukses:

```json
{
  "success": true,
  "data": {
    "siswa": {
      "nama_siswa": "Andi Saputra",
      "nisn": "1234567890",
      "kelas": "12 IPA 2"
    },
    "prediksi_terbaru": {
      "attendance": 78,
      "hours_studied": 14,
      "previous_scores": 72,
      "risk_category": "Medium",
      "confidence": 99.2,
      "probabilities": {},
      "risk_factors": [],
      "recommendations": []
    },
    "histori": []
  }
}
```

---

## Error Response Umum

### Unauthorized

```json
{
  "success": false,
  "message": "Token tidak valid atau tidak tersedia."
}
```

### Validation Error

```json
{
  "success": false,
  "message": "Data akademik tidak valid.",
  "errors": {
    "sleep_hours": "Jam tidur harus berada pada rentang 0 - 10."
  }
}
```

### Server Error

```json
{
  "success": false,
  "message": "Terjadi kesalahan pada server."
}
```
