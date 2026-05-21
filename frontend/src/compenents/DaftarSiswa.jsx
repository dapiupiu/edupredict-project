import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DaftarSiswa({ className, isDashboard, isDaftarSiswa = false, dataSiswa = [], onDelete, startIndex = 0 }) {
    const navigate = useNavigate();
    const noDataMessage = "Tidak terdapat data siswa."; // Default message, bisa di-override dari props
    return (

        <div className={`bg-white p-6 rounded-xl shadow ${className}`}>
            {!isDaftarSiswa && (
                <h1 className="font-bold text-xl mb-4">
                    Daftar Siswa Berisiko
                </h1>
            )}

            <div className="overflow-x-auto"> {/* Tambahkan ini untuk scroll horizontal di layar kecil */}
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {!isDashboard && (
                                <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    No
                                </th>
                            )}
                            <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nama Lengkap
                            </th>
                            {!isDashboard && (
                                <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    NISN
                                </th>
                            )}
                            <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kelas
                            </th>
                            {!isDashboard && (
                                <>
                                    <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pendidikan Ortu
                                    </th>
                                    <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Internet
                                    </th>
                                    <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status Risiko
                                    </th>
                                </>
                            )}
                            <th scope="col" className=" text-center border border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {dataSiswa.length > 0 ? (
                            dataSiswa.map((item, index) => (
                                <tr key={item.id || index}>
                                    {!isDashboard && (
                                        <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {startIndex + index + 1}
                                        </td>
                                    )}
                                    <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <div className="flex items-center gap-2">
                                            {isDashboard && (
                                                <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                                    (item.risk_category || item.statusRisiko) === 'High' ? 'bg-red-500 shadow-sm shadow-red-200' :
                                                    (item.risk_category || item.statusRisiko) === 'Medium' || (item.risk_category || item.statusRisiko) === 'Sedang' ? 'bg-orange-500 shadow-sm shadow-orange-200' :
                                                    'bg-green-500 shadow-sm shadow-green-200'
                                                }`}></span>
                                            )}
                                            <span>{item.nama_siswa || item.nama}</span>
                                        </div>
                                    </td>
                                    {!isDashboard && (
                                        <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.nisn || item.Nisn}
                                        </td>
                                    )}
                                    <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.kelas}
                                    </td>
                                    {!isDashboard && (
                                        <>
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.parental_education_level === 'High School' ? 'SMA/SMK' : 
                                                 item.parental_education_level === 'College' ? 'Diploma/S1' : 
                                                 item.parental_education_level === 'Postgraduate' ? 'S2/S3' : 
                                                 (item.parental_education_level || item.pendidikanOrtu)}
                                            </td>
                                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {(item.internet_access === 'Yes' || item.internet === 'Yes') ? 'Ya' : 
                                                 (item.internet_access === 'No' || item.internet === 'No') ? 'Tidak' : 
                                                 (item.internet_access || item.internet)}
                                            </td>
                                            <td className={`border border-gray-200 px-6 py-4 whitespace-nowrap text-sm font-bold ${
                                                (item.risk_category || item.statusRisiko) === 'High' ? 'text-red-600' :
                                                (item.risk_category || item.statusRisiko) === 'Medium' || (item.risk_category || item.statusRisiko) === 'Sedang' ? 'text-orange-500' :
                                                'text-green-600'
                                            }`}>
                                                {(item.risk_category || item.statusRisiko) === 'High' ? 'Tinggi' : 
                                                 (item.risk_category || item.statusRisiko) === 'Medium' || (item.risk_category || item.statusRisiko) === 'Sedang' ? 'Sedang' : 
                                                 (item.risk_category || item.statusRisiko) === 'Low' || (item.risk_category || item.statusRisiko) === 'Rendah' ? 'Rendah' : 
                                                 (item.risk_category || item.statusRisiko)}
                                            </td>
                                        </>
                                    )}
                                    <td className="border border-gray-200 px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                                        <button 
                                            onClick={() => navigate('/monitoringSiswa', { state: { studentId: item.id } })}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 transition-colors duration-200"
                                        >
                                            Detail
                                        </button>
                                        {!isDashboard && (
                                            <button 
                                                onClick={() => onDelete && onDelete(item.id, item.nama_siswa || item.nama)}
                                                className="bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100 transition-colors duration-200 flex items-center gap-1"
                                                title="Hapus Data"
                                            >
                                                <i className="ri-delete-bin-line"></i>
                                                <span>Hapus</span>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={isDashboard ? 4 : 8} className="border border-gray-200 px-6 py-4 text-center text-gray-500">
                                    {noDataMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
            {!isDaftarSiswa && (
                <Link to="/daftarSiswa" className=" text-blue-800 flex justify-end mt-10 px-3 py-1 rounded hover:underline transition-colors duration-200 ">
                    Lihat Semua
                </Link>
            )}

        </div>

    )

}

export default DaftarSiswa