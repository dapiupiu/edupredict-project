# EduPredict API — Dokumentasi Endpoint

**Base URL:** `https://edupredict-production-429f.up.railway.app`

Semua endpoint yang memerlukan autentikasi harus menyertakan header:
```
Authorization: Bearer <token>
```

---

## Auth

### POST /api/auth/register
Registrasi akun guru baru.

**Request Body:**
```json
{
  "namaLengkap": "Budi Santoso",
  "email": "budi@sekolah.com",
  "password": "password123"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Registrasi berhasil. Silakan login.",
  "data": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@sekolah.com",
    "role": "guru"
  }
}
```

---

### POST /api/auth/login
Login guru.

**Request Body:**
```json
{
  "email": "budi@sekolah.com",
  "password": "password123"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "nama": "Budi Santoso",
      "email": "budi@sekolah.com",
      "role": "guru"
    }
  }
}
```

---

### GET /api/auth/me
Ambil profil guru yang sedang login. *(Perlu token)*

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@sekolah.com",
    "role": "guru"
  }
}
```

---

### PUT /api/auth/profile
Update profil guru. *(Perlu token)*

**Request Body:**
```json
{
  "nama": "Budi S.",
  "password_lama": "password123",
  "password_baru": "newpassword456"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Profil berhasil diperbarui."
}
```

---

### POST /api/auth/logout
Logout guru. *(Perlu token)*

**Response 200:**
```json
{
  "success": true,
  "message": "Logout berhasil."
}
```

---

### POST /api/auth/forgot-password
Request reset password. *(Placeholder — belum kirim email)*

**Request Body:**
```json
{
  "email": "budi@sekolah.com"
}
```

---

## Portal Siswa

### POST /api/student/check
Cek status risiko siswa via NISN. **Tidak perlu token.**

**Request Body:**
```json
{
  "nisn": "12345678"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "nama_siswa": "Ahmad Fauzi",
    "kelas": "X IPA 1",
    "risk_category": "Medium",
    "confidence": 86.34,
    "last_recorded": "2026-05-28T10:00:00.000Z"
  }
}
```

---

## Guru — Siswa

### GET /api/guru/students
Ambil semua siswa milik guru yang login beserta prediksi terbaru. *(Perlu token)*

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nisn": "12345678",
      "nama_siswa": "Ahmad Fauzi",
      "kelas": "X IPA 1",
      "gender": "Male",
      "parental_education_level": "College",
      "risk_category": "Medium",
      "confidence": "86.34",
      "last_recorded": "2026-05-28T10:00:00.000Z"
    }
  ]
}
```

---

### GET /api/guru/students/:id
Ambil detail siswa beserta histori prediksi. *(Perlu token)*

**Response 200:**
```json
{
  "success": true,
  "data": {
    "siswa": {
      "id": 1,
      "nisn": "12345678",
      "nama_siswa": "Ahmad Fauzi",
      "kelas": "X IPA 1",
      "gender": "Male",
      "school_type": "Public",
      "distance_from_home": "Moderate",
      "parental_education_level": "College",
      "learning_disabilities": "No"
    },
    "histori": [
      {
        "record_id": 1,
        "hours_studied": 20,
        "attendance": 80,
        "previous_scores": 70,
        "risk_category": "Medium",
        "confidence": "86.34",
        "probabilities": "{\"Low\":5,\"Medium\":86,\"High\":9}",
        "risk_factors": "[...]",
        "recorded_at": "2026-05-28T10:00:00.000Z"
      }
    ]
  }
}
```

---

### POST /api/guru/students
Tambah siswa baru. *(Perlu token)*

**Request Body:**
```json
{
  "nisn": "12345678",
  "nama_siswa": "Ahmad Fauzi",
  "kelas": "X IPA 1",
  "gender": "Male",
  "school_type": "Public",
  "distance_from_home": "Moderate",
  "parental_education_level": "College",
  "learning_disabilities": "No"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Siswa berhasil ditambahkan.",
  "data": { "id": 1 }
}
```

---

### PUT /api/guru/students/:id
Update data siswa. *(Perlu token)*

**Request Body:** sama dengan POST students.

**Response 200:**
```json
{
  "success": true,
  "message": "Data siswa berhasil diperbarui."
}
```

---

### DELETE /api/guru/students/:id
Hapus siswa beserta semua data akademik dan prediksinya. *(Perlu token)*

**Response 200:**
```json
{
  "success": true,
  "message": "Siswa berhasil dihapus."
}
```

---

## Guru — Akademik

### POST /api/guru/academic/:studentId
Input data akademik siswa dan jalankan prediksi AI. *(Perlu token)*

**Request Body (13 fitur — `parental_education_level` diambil dari data siswa):**
```json
{
  "hours_studied": 20,
  "attendance": 80,
  "sleep_hours": 7,
  "previous_scores": 70,
  "tutoring_sessions": 2,
  "physical_activity": 3,
  "parental_involvement": "Medium",
  "access_to_resources": "High",
  "motivation_level": "Medium",
  "internet_access": "Yes",
  "family_income": "Medium",
  "teacher_quality": "High",
  "peer_influence": "Positive"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Data akademik berhasil disimpan dan prediksi telah dilakukan.",
  "data": {
    "academic_record_id": 5,
    "prediction_id": 3,
    "siswa": "Ahmad Fauzi",
    "prediksi": {
      "risk_category": "Medium",
      "confidence": 86.34,
      "probabilities": {
        "Low": 5.0,
        "Medium": 86.34,
        "High": 8.66
      },
      "risk_factors": [
        { "factor": "Attendance", "value": "80", "status": "warning", "note": "..." }
      ],
      "recommendations": [
        { "text": "Tingkatkan frekuensi monitoring mingguan." }
      ],
      "source": "ai"
    },
    "ood_warnings": [],
    "is_ood": false,
    "input_used": { "Hours_Studied": 20, "Attendance": 80, "..." : "..." }
  }
}
```

> **Catatan OOD:** Jika ada nilai numerik di luar batas data training, nilai tersebut otomatis di-clamp dan `is_ood` akan `true` dengan detail di `ood_warnings`.

---

### GET /api/guru/academic/:studentId
Ambil histori akademik dan prediksi siswa. *(Perlu token)*

**Response 200:** sama dengan struktur `histori` di `GET /api/guru/students/:id`.

---

## Guru — Dashboard

### GET /api/guru/dashboard
Ambil data ringkasan dashboard guru. *(Perlu token)*

**Response 200:**
```json
{
  "success": true,
  "data": {
    "ringkasan": {
      "total_siswa": 30,
      "risiko_tinggi": 3,
      "risiko_sedang": 8,
      "risiko_rendah": 15,
      "belum_diprediksi": 4
    },
    "siswa_berisiko": [
      {
        "id": 1,
        "nama_siswa": "Ahmad Fauzi",
        "kelas": "X IPA 1",
        "risk_category": "High",
        "confidence": "99.51",
        "last_recorded": "2026-05-28T10:00:00.000Z"
      }
    ],
    "notifikasi": {
      "unread": 2,
      "terbaru": [
        {
          "id": 1,
          "message": "Ahmad Fauzi terdeteksi berisiko tinggi.",
          "is_read": false,
          "created_at": "2026-05-28T10:00:00.000Z"
        }
      ]
    }
  }
}
```

---

### PUT /api/guru/notifications/:id/read
Tandai notifikasi sebagai sudah dibaca. *(Perlu token)*

**Response 200:**
```json
{
  "success": true,
  "message": "Notifikasi ditandai sudah dibaca."
}
```

---

## Training Bounds (OOD Protection)

Input numerik di luar batas berikut akan otomatis di-clamp sebelum dikirim ke model AI:

| Fitur | Minimum | Maksimum |
|-------|---------|----------|
| Attendance | 60 | 100 |
| Hours_Studied | 4 | 36 |
| Previous_Scores | 50 | 100 |
| Sleep_Hours | 4 | 10 |
| Tutoring_Sessions | 0 | 7 |
| Physical_Activity | 0 | 6 |

---

**CC26-PSU080 · EduPredict AI · Capstone 2026**
