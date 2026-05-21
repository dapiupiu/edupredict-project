import React from 'react';

function PilihSiswa({ dataSiswa = [], selectedId, onSelect }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-blue-100 gap-4">
                {/* Dropdown */}
                <select
                    value={selectedId || ''}
                    onChange={(e) => onSelect(e.target.value)}
                    className="w-full md:w-[400px] px-4 py-2 rounded-md bg-blue-50/50 border border-blue-200 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih Siswa</option>
                    {dataSiswa.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.nama_siswa || student.nama} - {student.nisn || student.Nisn} ({student.kelas})
                        </option>
                    ))}
                </select>
            </div>
    )
}

export default PilihSiswa;