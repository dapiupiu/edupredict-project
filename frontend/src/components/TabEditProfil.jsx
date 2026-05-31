import React from 'react';

function TabEditProfil({ profileData, formData, handleInputChange, handleUpdateProfile, handleFileChange, previewUrl, error, success }) {
    const initials = formData.nama
        ? formData.nama.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
        : '?';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Kolom Kiri — Informasi Profil Ringkas */}
            <div className="lg:col-span-1 lg:sticky lg:top-6 z-10">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4 group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 bg-gray-100 flex items-center justify-center text-gray-400 shadow-inner">
                            {previewUrl || formData.foto_profil ? (
                                <img src={previewUrl || formData.foto_profil} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-3xl font-bold text-blue-600">{initials}</div>
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors border-2 border-white group-hover:scale-110">
                            <input type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
                            <i className="ri-camera-switch-line text-sm"></i>
                        </label>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 truncate px-2">{formData.nama || '-'}</h2>
                    <p className="text-sm text-gray-500 mb-2 truncate px-2">{profileData.email || '-'}</p>
                    <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        {profileData.role || 'Guru'}
                    </span>
                    <div className="mt-6 pt-4 border-t border-gray-50 text-[10px] text-gray-400 font-medium leading-relaxed">
                        Ukuran foto maksimal 2MB dengan format JPG atau PNG.
                    </div>
                </div>
                {/* Card 2: Panduan Pengisian */}
                <div className="bg-white mt-6 rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <i className="ri-information-line text-blue-500 text-lg"></i>
                        Panduan Pengisian
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <i className="ri-checkbox-circle-fill text-blue-400 text-xs mt-1"></i>
                            <p className="text-xs text-gray-500 leading-relaxed"><span className="font-semibold text-gray-700">NIP:</span> Opsional jika status adalah guru Honorer.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="ri-checkbox-circle-fill text-blue-400 text-xs mt-1"></i>
                            <p className="text-xs text-gray-500 leading-relaxed"><span className="font-semibold text-gray-700">NUPTK:</span> Wajib diisi untuk guru berstatus PNS atau PPPK.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="ri-checkbox-circle-fill text-blue-400 text-xs mt-1"></i>
                            <p className="text-xs text-gray-500 leading-relaxed"><span className="font-semibold text-gray-700">Wali Kelas:</span> Menentukan lingkup siswa yang muncul di dashboard.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <i className="ri-checkbox-circle-fill text-blue-400 text-xs mt-1"></i>
                            <p className="text-xs text-gray-500 leading-relaxed"><span className="font-semibold text-gray-700">Keamanan:</span> Password minimal 8 karakter (huruf & angka).</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Kolom Kanan — Form informasi pribadi */}
            <div className="lg:col-span-2">
                <form onSubmit={handleUpdateProfile} className="space-y-4 sm:space-y-6">
                    {/* Card 1: Informasi Pribadi */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                        <h3 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <i className="ri-user-settings-line text-blue-500"></i>
                            Informasi Pribadi
                        </h3>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm flex items-center gap-2">
                                <i className="ri-error-warning-line"></i> {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 p-3 bg-green-50 text-green-600 border border-green-100 rounded-xl text-sm flex items-center gap-2">
                                <i className="ri-check-line"></i> {success}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text" name="nama" value={formData.nama}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email" name="email" value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">NIP</label>
                                <input
                                    type="text" name="nip" value={formData.nip}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">NUPTK</label>
                                <input
                                    type="text" name="nuptk" value={formData.nuptk}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                                <input
                                    type="text" name="noHp" value={formData.noHp}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tempat, Tanggal Lahir</label>
                                <input
                                    type="text" name="ttl" value={formData.ttl}
                                    onChange={handleInputChange}
                                    placeholder="cth: Malang, 15 Januari 1992"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan Terakhir</label>
                                <input
                                    type="text" name="pendidikanTerakhir" value={formData.pendidikanTerakhir}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                                <input
                                    type="text" name="alamat" value={formData.alamat}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>
                        {/* data mengajar */}
                        <div className="pt-6 border-t border-gray-100 mt-6">
                            <h3 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <i className="ri-book-read-line text-blue-500"></i>
                                Data mengajar
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                                <input
                                    type="text" name="namaSekolah" value={formData.namaSekolah}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Sekolah</label>
                                <select 
                                    name="school_type"
                                    value={formData.school_type}
                                    onChange={handleInputChange}
                                    className={"w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none "}>
                                    <option value="">Pilih Tipe Sekolah</option>
                                    <option value="Negeri">Negeri</option>
                                    <option value="Swasta">Swasta</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Wali Kelas</label>
                                <input
                                    type="text" name="kelas" value={formData.kelas}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jenjang</label>
                                <select 
                                    name="jenjang"
                                    value={formData.jenjang}
                                    onChange={handleInputChange}
                                    className={"w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none "}>
                                    <option value="">Pilih Jenjang</option>
                                    <option value="SMP">SMP</option>
                                    <option value="SMA/MA">SMA/MA</option>
                                    <option value="SMK">SMK</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-gray-100 mt-6 flex flex-col sm:flex-row items-center gap-3 sm:justify-end">
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="w-full sm:w-auto bg-white px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all shadow-md text-sm"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 text-sm"
                            >
                                <i className="ri-save-line"></i> Simpan Informasi
                            </button>
                        </div>

                    </div>

                    {/* Card 2: Ganti Password */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                        <h3 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <i className="ri-lock-password-line text-blue-500"></i>
                            Ganti Password <span className="text-xs font-normal text-gray-400 ml-1">(opsional)</span>
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Password Lama</label>
                                <input
                                    type="password" name="password_lama" value={formData.password_lama}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan password saat ini"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Password Baru</label>
                                    <input
                                        type="password" name="password_baru" value={formData.password_baru}
                                        onChange={handleInputChange}
                                        placeholder="Minimal 8 karakter"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Konfirmasi Password Baru</label>
                                    <input
                                        type="password" name="confirm_password" value={formData.confirm_password}
                                        onChange={handleInputChange}
                                        placeholder="Ulangi password baru"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 mt-6 flex flex-col sm:flex-row items-center gap-3 sm:justify-end">
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="w-full sm:w-auto bg-white px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all shadow-md text-sm"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 text-sm"
                            >
                                <i className="ri-save-line"></i> Simpan Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TabEditProfil;