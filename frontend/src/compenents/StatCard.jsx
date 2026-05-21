import React from 'react';

function StatCard({ title, total, type }) {
    // warna bg card dan icon berdasarkan tipe risiko
    const styles = {
        total: {
            bg: "bg-white",
            text: "text-gray-900",
            sub: "text-gray-500",
            icon: "ri-group-line",
            iconColor: "text-blue-600",
            iconBg: "bg-blue-50"
        },
        rendah: {
            bg: "bg-green-500",
            text: "text-white",
            sub: "text-white/90",
            icon: "ri-checkbox-circle-line",
            iconColor: "text-white",
            iconBg: "bg-white/20"
        },
        sedang: {
            bg: "bg-orange-500",
            text: "text-white",
            sub: "text-white/90",
            icon: "ri-error-warning-line",
            iconColor: "text-white",
            iconBg: "bg-white/20"
        },
        tinggi: {
            bg: "bg-red-500",
            text: "text-white",
            sub: "text-white/90",
            icon: "ri-alert-line",
            iconColor: "text-white",
            iconBg: "bg-white/20"
        }
    };

    const style = styles[type] || styles.total;

    return (
        <div className={`${style.bg} rounded-xl shadow p-5 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]`}>
            {/* Bagian Icon di sebelah kiri */}
            <div className={`${style.iconBg} w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0`}>
                <i className={`${style.icon} ${style.iconColor} text-2xl`}></i>
            </div>
            
            {/* Bagian Konten */}
            <div>
                <h2 className={`${style.sub} text-sm font-medium`}>{title}</h2>
                <p className={`${style.text} text-3xl font-bold`}>{total}</p>
            </div>
        </div>
    );
}

export default StatCard