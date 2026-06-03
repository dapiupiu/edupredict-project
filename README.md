# EduPredict AI

EduPredict AI is a Deep Learning-based API designed to predict academic risk levels and provide actionable recommendations for student interventions.

## Features

- Predict student academic risk levels
- Batch prediction for multiple students
- Analyze dominant factors affecting predictions
- Generate personalized recommendations
- Model information endpoint
- Health monitoring endpoint
- Groq-powered recommendation and analysis support

## Tech Stack

- Python
- FastAPI
- TensorFlow / Keras
- Scikit-learn
- Groq API
- Uvicorn

## API Endpoints

### Prediction
| Method | Endpoint | Description |
|----------|------------|------------|
| POST | `/api/v1/predict` | Predict academic risk for a student |
| POST | `/api/v1/predict/batch` | Predict academic risk for multiple students |

### Analysis
| Method | Endpoint | Description |
|----------|------------|------------|
| POST | `/api/v1/analyze/dominant-factors` | Analyze dominant factors influencing prediction |
| POST | `/api/v1/analyze/recommendations` | Generate intervention recommendations |
| GET | `/api/v1/analyze/groq-test` | Test Groq integration |

### System
| Method | Endpoint | Description |
|----------|------------|------------|
| GET | `/` | API root endpoint |
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/model/info` | Model information |

## Running Locally

### Clone Repository

```bash
git clone <repository-url>
cd EduPredictAI
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Application

```bash
uvicorn app.main:app --reload
```

API will be available at:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

## Sample Prediction Request

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

## Project Objective

EduPredict AI helps educational institutions identify at-risk students earlier, enabling proactive interventions that improve retention, academic performance, and student success.

## License

This project is intended for educational and research purposes.
