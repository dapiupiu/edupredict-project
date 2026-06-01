import React from 'react';

function DataSiswaInput({ formData, errors, isLoading, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit}>
      {/* identitas siswa */}
      <div className='bg-white mt-8 p-6 sm:p-8 rounded-xl shadow w-full max-w-5xl mx-auto'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6'><i className="ri-user-line"> </i>Identitas Siswa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Nama Lengkap <span className="text-red-500">*</span></label>
            <input type="text" value={formData.nama_siswa} onChange={onChange('nama_siswa')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.nama_siswa ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.nama_siswa && <p className="text-red-500 text-xs mt-1">{errors.nama_siswa}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">NISN <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              maxLength="10"
              inputMode="numeric"
              placeholder="Masukkan 10 digit angka"
              value={formData.nisn} 
              onChange={onChange('nisn')} 
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.nisn ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.nisn && <p className="text-red-500 text-xs mt-1">{errors.nisn}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Kelas <span className="text-red-500">*</span></label>
            <input type="text" value={formData.kelas} onChange={onChange('kelas')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.kelas ? 'border-red-500' : 'border-gray-300'}`} disabled/>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Jenis Kelamin <span className="text-red-500">*</span></label>
            <select value={formData.gender} onChange={onChange('gender')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}>
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Male">Laki-laki</option>
              <option value="Female">Perempuan</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
        </div>
      </div>

      {/* data akademik */}
      <div className='bg-white mt-8 p-6 sm:p-8 rounded-xl shadow w-full max-w-5xl mx-auto'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6'><i className="ri-bar-chart-box-line"> </i>Data Akademik & Perilaku Belajar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Jam belajar/minggu (0-36)<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Contoh: 10" min="0" value={formData.hours_studied} onChange={onChange('hours_studied')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.hours_studied ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.hours_studied && <p className="text-red-500 text-xs mt-1">{errors.hours_studied}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Kehadiran (%) (0-100) <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Contoh: 70" min="0" max="100" value={formData.attendance} onChange={onChange('attendance')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.attendance ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.attendance && <p className="text-red-500 text-xs mt-1">{errors.attendance}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Nilai Rapor Sebelumnya (0-100)<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Contoh: 80" min="0" max="100" value={formData.previous_scores} onChange={onChange('previous_scores')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.previous_scores ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.previous_scores && <p className="text-red-500 text-xs mt-1">{errors.previous_scores}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Jam tidur/malam (0-24) <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Contoh: 8" min="0" max="10" value={formData.sleep_hours} onChange={onChange('sleep_hours')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.sleep_hours ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.sleep_hours && <p className="text-red-500 text-xs mt-1">{errors.sleep_hours}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Sesi bimbingan belajar/bulan (0-4)<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Contoh: 2" min="0" value={formData.tutoring_sessions} onChange={onChange('tutoring_sessions')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.tutoring_sessions ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.tutoring_sessions && <p className="text-red-500 text-xs mt-1">{errors.tutoring_sessions}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Aktivitas fisik/minggu (0-6)<span className="text-red-500">*</span></label>
            <input type="text" min="0" placeholder="Contoh: 3" value={formData.physical_activity} onChange={onChange('physical_activity')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.physical_activity ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.physical_activity && <p className="text-red-500 text-xs mt-1">{errors.physical_activity}</p>}
          </div>
        </div>
      </div>

      {/* faktor sosial & lingkungan */}
      <div className='bg-white mt-8 p-6 sm:p-8 rounded-xl shadow w-full max-w-5xl mx-auto'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6'><i className="ri-user-community-line"> </i>Faktor Sosial & Lingkungan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Keterlibatan orang tua <span className="text-red-500">*</span></label>
            <select value={formData.parental_involvement} onChange={onChange('parental_involvement')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.parental_involvement ? 'border-red-500' : 'border-gray-300'}`}>
              <option value=""></option>
              <option value="Low">jarang terlibat</option>
              <option value="Medium">cukup terlibat</option>
              <option value="High">sangat terlibat</option>
            </select>
            {errors.parental_involvement && <p className="text-red-500 text-xs mt-1">{errors.parental_involvement}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Akses sumber belajar <span className="text-red-500">*</span></label>
            <select value={formData.access_to_resources} onChange={onChange('access_to_resources')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.access_to_resources ? 'border-red-500' : 'border-gray-300'}`}>
              <option value=""></option>
              <option value="Low">terbatas</option>
              <option value="Medium">cukup</option>
              <option value="High">lengkap</option>
            </select>
            {errors.access_to_resources && <p className="text-red-500 text-xs mt-1">{errors.access_to_resources}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Tingkat Motivasi <span className="text-red-500">*</span></label>
            <select value={formData.motivation_level} onChange={onChange('motivation_level')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.motivation_level ? 'border-red-500' : 'border-gray-300'}`}>
              <option value=""></option>
              <option value="Low">Kurang termotivasi</option>
              <option value="Medium">cukup termotivasi</option>
              <option value="High">sangat termotivasi</option>
            </select>
            {errors.motivation_level && <p className="text-red-500 text-xs mt-1">{errors.motivation_level}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Akses internet di rumah <span className="text-red-500">*</span></label>
            <select value={formData.internet_access} onChange={onChange('internet_access')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.internet_access ? 'border-red-500' : 'border-gray-300'}`}>
              <option value=""></option>
              <option value="Yes">ada</option>
              <option value="No">tidak</option>
            </select>
            {errors.internet_access && <p className="text-red-500 text-xs mt-1">{errors.internet_access}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Pendapatan keluarga <span className="text-red-500">*</span></label>
            <select value={formData.family_income} onChange={onChange('family_income')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.family_income ? 'border-red-500' : 'border-gray-300'}`}>
              <option value=""></option>
              <option value="Low">rendah</option>
              <option value="Medium">menengah</option>
              <option value="High">tinggi</option>
            </select>
            {errors.family_income && <p className="text-red-500 text-xs mt-1">{errors.family_income}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Pengaruh teman <span className="text-red-500">*</span></label>
            <select value={formData.peer_influence} onChange={onChange('peer_influence')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.peer_influence ? 'border-red-500' : 'border-gray-300'}`}>
              <option value=""></option>
              <option value="Negative">buruk</option>
              <option value="Neutral">biasa saja</option>
              <option value="Positive">baik</option>
            </select>
            {errors.peer_influence && <p className="text-red-500 text-xs mt-1">{errors.peer_influence}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Pendidikan Terakhir Orang Tua <span className="text-red-500">*</span></label>
            <select value={formData.parental_education_level} onChange={onChange('parental_education_level')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.parental_education_level ? 'border-red-500' : 'border-gray-300'}`}>
              <option value="">Pilih Pendidikan</option>
              <option value="High School">SMA/SMK</option>
              <option value="College">Diploma/S1</option>
              <option value="Postgraduate">S2/S3</option>
            </select>
            {errors.parental_education_level && <p className="text-red-500 text-xs mt-1">{errors.parental_education_level}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Kualitas Pengajaran Guru <span className="text-red-500">*</span></label>
            <select value={formData.teacher_quality} onChange={onChange('teacher_quality')} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.teacher_quality ? 'border-red-500' : 'border-gray-300'}`}>
              <option value=""></option>
              <option value="Low">Kurang baik</option>
              <option value="Medium">Cukup baik</option>
              <option value="High">Sangat baik</option>
            </select>
            {errors.teacher_quality && <p className="text-red-500 text-xs mt-1">{errors.teacher_quality}</p>}
          </div> 
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-8 mb-12 flex flex-col sm:flex-row gap-4 justify-end px-4 sm:px-0">
        <button type="button" onClick={onCancel} className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-300 border border-gray-300 transition-colors order-2 sm:order-1">Batal</button>
        <button type="submit" disabled={isLoading} className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors order-1 sm:order-2 font-semibold flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isLoading ? <><i className="ri-loader-4-line animate-spin"></i> Memproses...</> : 'Jalankan Prediksi AI'}
        </button>
      </div>
    </form>

  )
}

export default DataSiswaInput;