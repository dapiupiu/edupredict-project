import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

function GrafikRisiko({ data = [] }) {

    // Fungsi untuk mendapatkan warna berdasarkan kategori risiko
    const getRiskColor = (category) => {
        switch (category) {
            case 'High':
                return '#ef4444'; // Merah
            case 'Medium':
                return '#f97316'; // Oranye
            case 'Low':
                return '#22c55e'; // Hijau
            default:
                return '#9ca3af'; // Abu-abu untuk kategori tidak dikenal
        }
    };



    // Custom Tooltip untuk menampilkan kategori risiko dan confidence
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload; // Mengakses item data asli
            
            const getRiskLabel = (category) => {
                switch (category) {
                    case 'High': return 'Tinggi';
                    case 'Medium': return 'Sedang';
                    case 'Low': return 'Rendah';
                    default: return category;
                }
            };

            return (
                <div className="bg-white p-2 border border-gray-300 rounded shadow-md text-sm">
                    <p className="font-bold">{label}</p>
                    <p style={{ color: getRiskColor(dataPoint.risk_category) }}>
                        Risiko: <span className="font-bold">{getRiskLabel(dataPoint.risk_category)}</span>
                    </p>
                    <p className="text-gray-600">Kepercayaan AI: {dataPoint.value}%</p>
                </div>
            );
        }
        return null;
    };

    return (

        <div className="bg-white p-4 md:p-6 rounded-xl shadow overflow-hidden">

            <h1 className="font-bold text-xl">

                Peta Risiko per Siswa

            </h1>

            <div className="w-full h-[250px] md:h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="nama" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                        <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} /> {/* Y-axis untuk persentase confidence */}
                        <Tooltip content={<CustomTooltip />} />
                        {/* Hanya satu Bar yang ditampilkan, warnanya dinamis berdasarkan kategori risiko */}
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk_category)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend / Keterangan Warna Risiko */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#ef4444]"></div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Risiko Tinggi</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#f97316]"></div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Risiko Sedang</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#22c55e]"></div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Risiko Rendah</span>
                </div>
            </div>

        </div>
    );

}

export default GrafikRisiko;