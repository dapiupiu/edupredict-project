import React from 'react';
import { Link } from 'react-router-dom';

function SearchFilter({ searchQuery, setSearchQuery, riskFilter, setRiskFilter }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-blue-100 gap-4">
            
            {/* Input Search */}
            <input
                type="text"
                placeholder="Cari nama atau NISN ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[350px] px-4 py-2 rounded-md bg-blue-50/50 border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            <div className="flex items-center gap-4">
                {/* Dropdown */}
                <select 
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="px-4 py-2 rounded-md bg-blue-50/50 border border-blue-200 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                >
                    <option value="semua">Semua Risiko</option>
                    <option value="low">Risiko Rendah</option>
                    <option value="medium">Risiko Sedang</option>
                    <option value="high">Risiko Tinggi</option>
                </select>

                {/* tambah siswa button */}
                <Link to="/tambahSiswa" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    + Tambah Siswa
                </Link>
            </div>

        </div>
    )
}

export default SearchFilter;