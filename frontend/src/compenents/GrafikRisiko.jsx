import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function GrafikRisiko({ data = [] }) {

    return (

        <div className="bg-white p-4 md:p-6 rounded-xl shadow overflow-hidden">

            <h1 className="font-bold text-xl">

                Peta Risiko per Siswa

            </h1>

            <div className="w-full h-[250px] md:h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="nama" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar name="Rendah" dataKey="rendah" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        <Bar name="Sedang" dataKey="sedang" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        <Bar name="Tinggi" dataKey="tinggi" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        <Legend verticalAlign="bottom" height={36} iconType="square" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>

    )

}

export default GrafikRisiko