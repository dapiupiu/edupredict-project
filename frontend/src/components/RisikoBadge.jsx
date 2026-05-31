import React from 'react';

function RisikoBadge({ risiko }) {
    const r = String(risiko || '').toLowerCase();
    if (r === 'high' || r === 'tinggi') {
        return (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-700">
                Tinggi
            </span>
        );
    }
    if (r === 'medium' || r === 'sedang') {
        return (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700">
                Sedang
            </span>
        );
    }
    return (
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700">
            Rendah
        </span>
    );
}

export default RisikoBadge;