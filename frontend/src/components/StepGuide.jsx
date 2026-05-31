import React from 'react';

import {
  UserPlus,
  Database,
  BarChart3,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Buat Akun",
    desc: "Daftar dan login ke sistem menggunakan akun sekolah atau institusi Anda.",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Input Data Siswa",
    desc: "Masukkan data akademik dan informasi siswa ke dalam sistem.",
    icon: Database,
  },
  {
    id: 3,
    title: "Analisis Risiko",
    desc: "Sistem akan menganalisis data dan mendeteksi potensi risiko akademik siswa.",
    icon: BarChart3,
  },
  {
    id: 4,
    title: "Lihat Rekomendasi",
    desc: "Dapatkan rekomendasi intervensi dan tindak lanjut untuk setiap siswa yang terdeteksi.",
    icon: CheckCircle,
  },
];

function StepGuide() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Garis dashed */}
        <div className="absolute top-5 left-0 w-full border-t border-dashed border-blue-300 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                {/* Nomor */}
                <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-semibold mb-6">
                  {step.id}
                </div>

                {/* Icon Circle */}
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center shadow-sm mb-4">
                  <Icon className="w-9 h-9 text-blue-700" />
                </div>

                {/* Text */}
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StepGuide;