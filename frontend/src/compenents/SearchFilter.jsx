import React from "react";
import { Link } from "react-router-dom";

function SearchFilter({
    searchQuery,
    setSearchQuery,
    riskFilter,
    setRiskFilter
}) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-blue-100">

            {/* Search Input */}
            <input
                type="text"
                placeholder="Cari nama atau NISN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                    w-full md:w-[350px]
                    px-4 py-2
                    rounded-lg
                    bg-blue-50
                    border border-blue-200
                    outline-none
                    focus:ring-2 focus:ring-blue-500
                    transition-all
                "
            />

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">

                {/* Filter Risiko */}
                <select
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="
                        w-full sm:w-auto
                        px-4 py-2
                        rounded-lg
                        bg-blue-50
                        border border-blue-200
                        outline-none
                        cursor-pointer
                        focus:ring-2 focus:ring-blue-500
                    "
                >
                    <option value="semua">
                        Semua Risiko
                    </option>

                    <option value="low">
                        Risiko Rendah
                    </option>

                    <option value="medium">
                        Risiko Sedang
                    </option>

                    <option value="high">
                        Risiko Tinggi
                    </option>
                </select>

                {/* Button Tambah */}
                <Link
                    to="/tambahSiswa"
                    className="
                        w-full sm:w-auto
                        text-center
                        bg-blue-500
                        text-white
                        px-4 py-2
                        rounded-lg
                        hover:bg-blue-600
                        transition-colors
                    "
                >
                    + Tambah Siswa
                </Link>

            </div>

        </div>
    );
}

export default SearchFilter;