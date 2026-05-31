import React from 'react';
import RisikoBadge from './RisikoBadge';
import BASE_URL from '../utils/api';

function TabRingkasan({ profileData, siswaBerisiko, notifikasi }) {
    const initials = profileData.nama
        ? profileData.nama.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
        : '?';

    const bergabung = profileData.created_at
        ? new Date(profileData.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
        : '-';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
            {/* Kolom Kiri — Info Profil */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                    <div className="relative w-16 h-16 mx-auto mb-3">
                        {profileData.foto_profil ? (
                            <img src={`${BASE_URL}/${profileData.foto_profil}`} alt="Profil" className="w-16 h-16 rounded-full object-cover border-2 border-blue-50" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                {initials}
                            </div>
                        )}
                        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <h2 className="text-base font-bold text-gray-900">{profileData.nama || '-'}</h2>
                    <p className="text-xs text-gray-400 mb-3">{profileData.email || '-'}</p>
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                            <i className="ri-school-line text-sm"></i>{profileData.role || 'Wali Kelas'}
                        </span>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 flex items-center gap-1">
                            <i className="ri-checkbox-circle-line text-sm"></i>
                            {profileData.status || 'Aktif'}
                        </span>
                    </div>
                    <div className="border-t border-gray-50 pt-4 text-left space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-id-card-line text-blue-400 text-base w-4 text-center"></i>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400">NIP</p>
                                <p className="font-medium text-gray-800 truncate">{profileData.nip || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-numbers-line text-blue-400 text-base w-4 text-center"></i>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400">NUPTK</p>
                                <p className="font-medium text-gray-800 truncate">{profileData.nuptk || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-map-pin-time-line text-blue-400 text-base w-4 text-center"></i>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400">TTL</p>
                                <p className="font-medium text-gray-800 truncate">{profileData.ttl || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-graduation-cap-line text-blue-400 text-base w-4 text-center"></i>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400">Pendidikan Terakhir</p>
                                <p className="font-medium text-gray-800 truncate">
                                    {profileData.pendidikan_terakhir || profileData.pendidikanTerakhir || '-'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-calendar-line text-blue-400 text-base w-4 text-center"></i>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400">Bergabung</p>
                                <p className="font-medium text-gray-800">{bergabung}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kolom Kanan */}
            <div className="lg:col-span-2 space-y-6">
                {/* Perlu Perhatian */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                        <i className="ri-alert-line text-orange-400 text-sm"></i>
                        Perlu Perhatian — Prediksi AI Terbaru
                    </h3>
                    <div className="space-y-0 divide-y divide-gray-50">
                        {siswaBerisiko && siswaBerisiko.length > 0 ? (
                            siswaBerisiko.map(s => (
                                <div key={s.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{s.nama_siswa}</p>
                                        <p className="text-xs text-gray-400">
                                            Kelas {s.kelas} · Kepercayaan AI {s.confidence}%
                                        </p>
                                    </div>
                                    <RisikoBadge risiko={s.risk_category} />
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 py-4 italic text-center">Tidak ada siswa dengan risiko tinggi/sedang.</p>
                        )}
                    </div>
                </div>

                {/* Aktivitas Terbaru */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                        <i className="ri-time-line text-sm"></i>
                        Notifikasi dan Aktivitas 
                    </h3>
                    <div className="space-y-0 divide-y divide-gray-50">
                        {notifikasi && notifikasi.length > 0 ? (
                            notifikasi.map(a => (
                                <div key={a.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                                    <div className={`mt-0.5 w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                                        a.type === 'High' ? 'bg-red-50 text-red-500' :
                                        a.type === 'Medium' ? 'bg-orange-50 text-orange-500' :
                                        a.title?.toLowerCase().includes('siswa') ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'
                                    }`}>
                                        <i className={`${
                                            a.type === 'High' ? 'ri-error-warning-line' :
                                            a.type === 'Medium' ? 'ri-alert-line' :
                                            a.title?.toLowerCase().includes('siswa') ? 'ri-user-add-line' : 'ri-notification-3-line'
                                        } text-base`}></i>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-800">
                                            <strong>{a.title}:</strong> {a.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {new Date(a.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 py-4 italic text-center">Belum ada aktivitas terbaru.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabRingkasan;