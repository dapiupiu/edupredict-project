import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DaftarSiswa({ className, isDashboard, isDaftarSiswa = false, dataSiswa = [], onDelete, startIndex = 0, noDataMessage }) {
    const navigate = useNavigate();
    const displayMessage = noDataMessage || "Tidak terdapat data siswa.";

    const getRiskLabel = (item) => {
        const risk = item.risk_category || item.statusRisiko;
        if (risk === 'High') return 'Tinggi';
        if (risk === 'Medium' || risk === 'Sedang') return 'Sedang';
        if (risk === 'Low' || risk === 'Rendah') return 'Rendah';
        return risk || '-';
    };

    const getRiskColor = (item) => {
        const risk = item.risk_category || item.statusRisiko;
        if (risk === 'High') return 'text-red-600 bg-red-50 border-red-200';
        if (risk === 'Medium' || risk === 'Sedang') return 'text-orange-500 bg-orange-50 border-orange-200';
        return 'text-green-600 bg-green-50 border-green-200';
    };

    const getRiskDot = (item) => {
        const risk = item.risk_category || item.statusRisiko;
        if (risk === 'High') return 'bg-red-500';
        if (risk === 'Medium' || risk === 'Sedang') return 'bg-yellow-500';
        if (risk === 'Low' || risk === 'Rendah') return 'bg-green-500';
        return 'bg-gray-300';
    };

    return (
        <div className={`bg-white rounded-xl shadow ${className}`}>
            {!isDaftarSiswa && (
                <h1 className="font-bold text-xl p-6 pb-0">
                    Siswa yang Perlu Dipantau
                </h1>
            )}

            {dataSiswa.length === 0 ? (
                <div className="p-6 text-center text-gray-500">{displayMessage}</div>
            ) : (
                <>
                    {/* ===== MOBILE CARD VIEW (< md) ===== */}
                    <div className="md:hidden divide-y divide-gray-100">
                        {dataSiswa.map((item, index) => (
                            <div key={item.id || index} className="p-4">
                                <div className="flex items-start justify-between gap-3">
                                    {/* Kiri: info siswa */}
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {/* Avatar inisial */}
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm flex-shrink-0">
                                            {(item.nama_siswa || item.nama || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                {isDashboard && (
                                                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getRiskDot(item)}`}></span>
                                                )}
                                                <p className="font-semibold text-sm text-gray-900 truncate">
                                                    {item.nama_siswa || item.nama}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
                                                {!isDaftarSiswa && (
                                                    <p className="text-xs text-gray-400">NISN: {item.nisn || item.Nisn}</p>
                                                )}
                                                <p className="text-xs text-gray-400">{item.kelas}</p>
                                                {!isDashboard && (
                                                    <p className="text-xs text-gray-400">
                                                        {(item.gender || item.jenisKelamin) === 'Male' ? 'Laki-laki' :
                                                         (item.gender || item.jenisKelamin) === 'Female' ? 'Perempuan' : '-'}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kanan: badge risiko */}
                                    {!isDashboard && (
                                        <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${getRiskColor(item)}`}>
                                            {getRiskLabel(item)}
                                        </span>
                                    )}
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => navigate('/monitoringSiswa', { state: { studentId: item.id } })}
                                        className="flex-1 bg-blue-50 text-blue-700 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors text-center"
                                    >
                                        <i className="ri-bar-chart-2-line mr-1"></i>Detail
                                    </button>
                                    {!isDashboard && (
                                        <>
                                            <button
                                                onClick={() => navigate('/tambahSiswa', { state: { studentId: item.id } })}
                                                className="flex-1 bg-green-50 text-green-700 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors text-center"
                                            >
                                                <i className="ri-edit-line mr-1"></i>Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete && onDelete(item.id, item.nama_siswa || item.nama)}
                                                className="flex-1 bg-red-50 text-red-600 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors text-center"
                                            >
                                                <i className="ri-delete-bin-line mr-1"></i>Hapus
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ===== DESKTOP TABLE VIEW (>= md) ===== */}
                    <div className="hidden md:block overflow-x-auto p-6">
                        <table className="min-w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {!isDashboard && (
                                        <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    )}
                                    <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                    <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NISN</th>
                                    <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                    {!isDashboard && (
                                        <>
                                            <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                                            <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Risiko</th>
                                        </>
                                    )}
                                    <th className="print:hidden text-center border border-gray-200 px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {dataSiswa.map((item, index) => (
                                    <tr key={item.id || index}>
                                        {!isDashboard && (
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {startIndex + index + 1}
                                            </td>
                                        )}
                                        <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <div className="flex items-center gap-2">
                                                {isDashboard && (
                                                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${getRiskDot(item)}`}></span>
                                                )}
                                                <span>{item.nama_siswa || item.nama}</span>
                                            </div>
                                        </td>
                                        <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.nisn || item.Nisn}
                                        </td>
                                        <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.kelas}
                                        </td>
                                        {!isDashboard && (
                                            <>
                                                <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {(item.gender || item.jenisKelamin) === 'Male' ? 'Laki-laki' :
                                                     (item.gender || item.jenisKelamin) === 'Female' ? 'Perempuan' : '-'}
                                                </td>
                                                <td className={`border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-bold ${
                                                    (item.risk_category || item.statusRisiko) === 'High' ? 'text-red-600' :
                                                    (item.risk_category || item.statusRisiko) === 'Medium' || (item.risk_category || item.statusRisiko) === 'Sedang' ? 'text-orange-500' :
                                                    'text-green-600'
                                                }`}>
                                                    {getRiskLabel(item)}
                                                </td>
                                            </>
                                        )}
                                        <td className="print:hidden border border-gray-200 px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    onClick={() => navigate('/monitoringSiswa', { state: { studentId: item.id } })}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded hover:bg-blue-200 transition-colors cursor-pointer"
                                                >
                                                    Detail
                                                </button>
                                                {!isDashboard && (
                                                    <button
                                                        onClick={() => navigate('/tambahSiswa', { state: { studentId: item.id } })}
                                                        className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded hover:bg-green-200 transition-colors cursor-pointer"
                                                    >
                                                        <i className="ri-edit-line"></i> Edit
                                                    </button>
                                                )}
                                                {!isDashboard && (
                                                    <button
                                                        onClick={() => onDelete && onDelete(item.id, item.nama_siswa || item.nama)}
                                                        className="bg-red-50 text-red-600 px-2 py-1 text-xs rounded hover:bg-red-100 transition-colors flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <i className="ri-delete-bin-line"></i> Hapus
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {!isDaftarSiswa && (
                <div className="flex justify-end px-6 pb-6">
                    <Link
                        to="/daftarSiswa"
                        className="relative text-blue-800 font-light transition-all duration-300 cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-800 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Lihat Semua
                    </Link>
                </div>
            )}
        </div>
    );
}

export default DaftarSiswa;