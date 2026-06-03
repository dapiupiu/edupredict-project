# EduPredict AI

EduPredict AI adalah API berbasis Deep Learning yang dirancang untuk memprediksi tingkat risiko akademik siswa serta memberikan rekomendasi intervensi yang dapat membantu meningkatkan performa dan retensi siswa.

## Fitur Utama

* Prediksi risiko akademik siswa
* Batch prediction untuk banyak siswa sekaligus
* Analisis faktor dominan yang memengaruhi hasil prediksi
* Generate rekomendasi intervensi secara otomatis
* Informasi model dan performa sistem
* Health check endpoint
* Integrasi Groq untuk analisis dan rekomendasi berbasis AI

## Tech Stack

* Python
* FastAPI
* TensorFlow / Keras
* Scikit-learn
* Groq API
* Uvicorn

## API Endpoints

### Prediction

| Method | Endpoint                | Deskripsi                                       |
| ------ | ----------------------- | ----------------------------------------------- |
| POST   | `/api/v1/predict`       | Melakukan prediksi risiko akademik siswa        |
| POST   | `/api/v1/predict/batch` | Melakukan prediksi untuk banyak siswa sekaligus |

### Analysis

| Method | Endpoint                           | Deskripsi                                             |
| ------ | ---------------------------------- | ----------------------------------------------------- |
| POST   | `/api/v1/analyze/dominant-factors` | Menganalisis faktor dominan yang memengaruhi prediksi |
| POST   | `/api/v1/analyze/recommendations`  | Menghasilkan rekomendasi intervensi                   |
| GET    | `/api/v1/analyze/groq-test`        | Menguji koneksi dan integrasi Groq                    |

### System

| Method | Endpoint             | Deskripsi                                  |
| ------ | -------------------- | ------------------------------------------ |
| GET    | `/`                  | Root endpoint                              |
| GET    | `/api/v1/health`     | Health check API                           |
| GET    | `/api/v1/model/info` | Menampilkan informasi model yang digunakan |

## Menjalankan Project Secara Lokal

### Clone Repository

```bash
git clone <repository-url>
cd EduPredictAI
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Menjalankan API

```bash
uvicorn app.main:app --reload
```

API akan berjalan pada:

```text
http://localhost:8000
```

## Dokumentasi API

Dokumentasi API interaktif tersedia melalui Swagger UI dan dapat digunakan untuk melihat seluruh endpoint, request body, response schema, serta melakukan pengujian API secara langsung.

```text
http://localhost:8000/docs
```

Spesifikasi OpenAPI JSON juga tersedia pada:

```text
http://localhost:8000/openapi.json
```

## Contoh Request Prediksi

```json
{
  "student_meta": {
    "student_id": "S001"
  },
  "student_features": {
    "attendance_rate": 85,
    "assignment_score": 78,
    "exam_score": 80
  }
}
```

## Tujuan Project

EduPredict AI membantu institusi pendidikan dalam mengidentifikasi siswa yang berisiko mengalami penurunan performa akademik sejak dini sehingga tindakan pencegahan dan intervensi dapat dilakukan lebih cepat dan tepat sasaran.

## License

Project ini dikembangkan untuk kebutuhan edukasi, penelitian, dan pengembangan solusi berbasis Artificial Intelligence di bidang pendidikan.
