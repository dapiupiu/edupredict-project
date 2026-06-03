# 🎓 EduPredict AI - Student Academic Risk Prediction System

## 📌 Deskripsi Proyek

EduPredict AI merupakan proyek Data Science end-to-end yang bertujuan membantu institusi pendidikan dalam mengidentifikasi siswa yang berisiko mengalami penurunan performa akademik sejak dini. Proyek ini menggabungkan proses Data Wrangling, Exploratory Data Analysis (EDA), Machine Learning, Dashboard Interaktif, serta A/B Testing untuk menghasilkan insight yang dapat mendukung pengambilan keputusan berbasis data.

Sistem memanfaatkan dataset **Student Performance Factors** yang berisi berbagai faktor akademik dan non-akademik siswa, seperti kehadiran, jam belajar, kualitas guru, keterlibatan orang tua, kondisi ekonomi keluarga, dan faktor lainnya.

---

# 🎯 Problem Discovery

## Latar Belakang

Penurunan performa akademik siswa sering kali tidak terdeteksi sejak dini karena belum adanya sistem pemantauan yang mampu mengintegrasikan berbagai faktor yang memengaruhi keberhasilan belajar siswa.

Akibatnya, intervensi yang diberikan oleh pihak sekolah cenderung bersifat reaktif dan dilakukan ketika kondisi siswa sudah mengalami penurunan yang signifikan.

## Solusi

EduPredict AI dikembangkan untuk:

* Mengidentifikasi faktor-faktor yang memengaruhi performa akademik siswa.
* Menghasilkan insight berbasis data melalui analisis eksploratif.
* Memprediksi tingkat risiko akademik siswa.
* Menyediakan dashboard interaktif yang mudah digunakan oleh stakeholder pendidikan.
* Mendukung pengambilan keputusan berbasis data untuk tindakan preventif.

---

# 👨‍💻 Jobdesk dan Implementasi Proyek

## 1. Problem Discovery & Solution Framing

### Aktivitas

* Mengumpulkan berbagai permasalahan yang terjadi dalam dunia pendidikan.
* Melakukan analisis terhadap beberapa alternatif solusi.
* Menentukan satu solusi utama yang memiliki dampak terbesar dan dapat diimplementasikan menggunakan pendekatan data science.

### Hasil

* Teridentifikasi kebutuhan sistem prediksi risiko akademik siswa.
* Dirancang solusi EduPredict AI sebagai platform prediksi dan monitoring performa siswa.

---

## 2. Data Wrangling

### Data Gathering

Melakukan pengumpulan data dari sumber publik.

Aktivitas:

* Mencari dataset yang relevan dengan permasalahan pendidikan.
* Mengambil dataset Student Performance Factors.
* Memuat dataset ke dalam environment analisis.

### Data Assessing

Melakukan evaluasi kualitas data.

Aktivitas:

* Pemeriksaan struktur dataset.
* Pemeriksaan tipe data.
* Analisis statistik deskriptif.
* Identifikasi missing values.
* Identifikasi data duplikat.
* Identifikasi nilai tidak valid.
* Deteksi outlier.

### Data Cleaning

Melakukan pembersihan data agar siap digunakan.

Aktivitas:

* Menangani missing values.
* Memperbaiki data tidak valid.
* Menangani outlier menggunakan teknik yang sesuai.
* Menstandarkan format data.
* Validasi hasil pembersihan data.

---

## 3. Data Dictionary

Menyusun dokumentasi setiap atribut dataset yang digunakan.

Tujuan:

* Mempermudah pemahaman dataset.
* Menjaga konsistensi interpretasi data.
* Menjadi referensi pada tahap analisis dan pemodelan.

---

## 4. Business Understanding

Mendefinisikan pertanyaan bisnis yang terukur dan dapat dijawab menggunakan data.

Contoh pertanyaan bisnis:

1. Faktor apa yang paling memengaruhi performa akademik siswa?
2. Bagaimana hubungan kehadiran terhadap nilai ujian siswa?
3. Apakah jam belajar memiliki pengaruh terhadap performa akademik?
4. Faktor sosial dan ekonomi apa yang berkontribusi terhadap risiko akademik siswa?
5. Bagaimana karakteristik siswa dengan risiko akademik tinggi?

---

## 5. Exploratory Data Analysis (EDA)

Melakukan eksplorasi data untuk memahami pola dan hubungan antar variabel.

Aktivitas:

* Analisis distribusi data.
* Analisis korelasi variabel numerik.
* Analisis variabel kategorikal.
* Analisis hubungan fitur terhadap performa akademik.
* Identifikasi pola dan anomali.

Output:

* Insight awal mengenai faktor-faktor yang memengaruhi performa siswa.

---

## 6. Data Visualization & Explanatory Analysis

Membuat visualisasi untuk menjawab pertanyaan bisnis.

Aktivitas:

* Univariate Analysis.
* Bivariate Analysis.
* Multivariate Analysis.
* Visualisasi tren dan pola data.

Output:

* Insight yang mudah dipahami stakeholder.
* Kesimpulan berbasis data untuk mendukung pengambilan keputusan.

---

## 7. Feature Engineering

Membuat fitur baru yang lebih informatif untuk model machine learning.

Aktivitas:

* Encoding variabel kategorikal.
* Feature transformation.
* Feature selection.
* Pembuatan fitur turunan berdasarkan kebutuhan model.

Tujuan:

* Meningkatkan kemampuan model dalam mengenali pola data.
* Meningkatkan performa prediksi.

---

## 8. Data Preparation

Menyiapkan dataset sebelum proses training model.

Aktivitas:

* Train-Test Split.
* Feature Scaling.
* Encoding.
* Validasi dataset akhir.

Output:

* Dataset siap digunakan untuk proses machine learning.

---

## 9. Machine Learning Modeling

Mengembangkan model prediksi risiko akademik siswa.

Aktivitas:

* Training model.
* Evaluasi model.
* Perbandingan performa model.
* Analisis hasil prediksi.

Output:

* Model yang mampu mengklasifikasikan risiko akademik siswa ke dalam kategori tertentu.

---

## 10. Dashboard Development

Mengembangkan dashboard interaktif menggunakan Streamlit.

Fitur Dashboard:

* Prediksi risiko akademik siswa.
* Visualisasi data.
* Insight hasil EDA.
* Monitoring faktor-faktor performa akademik.
* Rekomendasi berdasarkan hasil prediksi.

Teknologi:

* Python
* Streamlit
* Plotly
* Pandas
* Scikit-Learn

---

## 11. Deployment

Melakukan deployment dashboard ke Streamlit Cloud.

Tujuan:

* Dashboard dapat diakses secara publik.
* Mempermudah stakeholder dalam menggunakan sistem.

Output:

* Dashboard online yang dapat diakses melalui browser.

---

## 12. A/B Testing

Mengimplementasikan A/B Testing menggunakan Python.

Tujuan:

* Mengukur efektivitas perubahan atau rekomendasi yang diberikan sistem.
* Membandingkan performa dua kelompok eksperimen.

Aktivitas:

* Menentukan hipotesis.
* Menentukan metrik evaluasi.
* Melakukan uji statistik.
* Menarik kesimpulan berdasarkan hasil pengujian.

---

## 13. Technical Report

Menyusun laporan komprehensif dalam format PDF.

Isi laporan:

1. Problem Discovery
2. Business Understanding
3. Data Wrangling
4. Data Dictionary
5. Exploratory Data Analysis
6. Data Visualization
7. Feature Engineering
8. Data Preparation
9. Modeling
10. Evaluation
11. Dashboard Development
12. Deployment
13. A/B Testing
14. Conclusion & Recommendation

---

# 🛠️ Tech Stack

* Python
* Pandas
* NumPy
* Matplotlib
* Seaborn
* Scikit-Learn
* TensorFlow / Keras
* Streamlit
* Plotly
* SciPy

---

# 📂 Struktur Proyek

```text
edupredict-data-science/
│
├── [EduPredict AI] - DS Workflow & Quest.ipynb
├── edupredict-streamlit-dashboard/
├── Laporan Komprehensif DS.pdf
│
└── README.md
```

---

# 📈 Output Proyek

* Dataset yang telah dibersihkan dan siap digunakan.
* Data Dictionary.
* Hasil EDA dan visualisasi data.
* Insight bisnis yang dapat ditindaklanjuti.
* Model prediksi risiko akademik siswa.
* Dashboard Streamlit interaktif.
* Hasil A/B Testing.
* Laporan teknis komprehensif.

---

# 👥 Target Pengguna

* Guru
* Wali Kelas
* Konselor Pendidikan
* Manajemen Sekolah
* Peneliti Pendidikan

---

# ✅ Kesimpulan

EduPredict AI merupakan implementasi proyek Data Science end-to-end yang mencakup seluruh tahapan mulai dari identifikasi masalah, pengumpulan dan pengolahan data, analisis eksploratif, pengembangan model machine learning, visualisasi insight, pembangunan dashboard interaktif, deployment, hingga evaluasi melalui A/B Testing. Proyek ini diharapkan mampu membantu institusi pendidikan melakukan deteksi dini terhadap risiko akademik siswa sehingga intervensi dapat dilakukan lebih cepat dan lebih tepat sasaran.
