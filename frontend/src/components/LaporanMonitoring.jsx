import React, { useState } from 'react';
import BASE_URL from '../utils/api';

// ─── Helper ──────────────────────────────────────────────────────────────────

function risikoLabel(r) {
    const v = String(r || '').toLowerCase();
    if (v === 'high')   return { text: 'Tinggi',  cls: 'risk-high'   };
    if (v === 'medium') return { text: 'Sedang',  cls: 'risk-medium' };
    return                     { text: 'Rendah',  cls: 'risk-low'    };
}

function parseRiskFactors(raw) {
    try {
        const arr = typeof raw === 'string' ? JSON.parse(raw) : (raw || []);
        return Array.isArray(arr) ? arr : [];
    } catch {
        return [];
    }
}

// ─── Komponen utama ───────────────────────────────────────────────────────────

function LaporanMonitoring({ profileData }) {
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState('');

    const handleExport = async () => {
        setError('');
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res   = await fetch(`${BASE_URL}/api/guru/students/report`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await res.json();
            if (!result.success) throw new Error(result.message);

            printLaporan(profileData, result.data);
        } catch (err) {
            setError('Gagal memuat data laporan. Coba lagi.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {error && <span className="text-xs text-red-500">{error}</span>}
            <button
                onClick={handleExport}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
            >
                <i className={loading ? 'ri-loader-4-line animate-spin' : 'ri-file-download-line'}></i>
                {loading ? 'Menyiapkan...' : 'Export PDF'}
            </button>
        </div>
    );
}

// ─── Print engine ─────────────────────────────────────────────────────────────

function printLaporan(guru, siswaList) {
    const tanggal = new Date().toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
    });

    // Pisahkan: semua siswa untuk tabel, hanya high/medium untuk detail
    const berisiko = siswaList.filter(s =>
        ['high', 'medium'].includes(String(s.risk_category || '').toLowerCase())
    );

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<title>Laporan Monitoring Siswa</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; color: #1e293b; background: #fff; }

  /* ── Layout ── */
  .page { padding: 32px 36px; max-width: 900px; margin: 0 auto; }

  /* ── Header ── */
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1d4ed8; padding-bottom: 14px; margin-bottom: 20px; }
  .header-left h1 { font-size: 18px; font-weight: 800; color: #1e3a8a; letter-spacing: -0.3px; }
  .header-left p  { font-size: 10px; color: #64748b; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
  .header-right   { text-align: right; font-size: 10px; color: #64748b; line-height: 1.6; }

  /* ── Info guru ── */
  .info-box { background: #f0f7ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px 24px; }
  .info-row { display: flex; gap: 6px; font-size: 10.5px; }
  .info-label { color: #64748b; min-width: 110px; }
  .info-value { color: #0f172a; font-weight: 600; }

  /* ── Section title ── */
  .section-title { font-size: 12px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0; }

  /* ── Tabel ringkas ── */
  table { width: 100%; border-collapse: collapse; margin-bottom: 28px; font-size: 10.5px; }
  th { background: #1d4ed8; color: #fff; font-weight: 700; padding: 7px 10px; text-align: left; }
  th.center, td.center { text-align: center; }
  td { padding: 6px 10px; border-bottom: 1px solid #e2e8f0; }
  tr:nth-child(even) td { background: #f8fafc; }
  tr:last-child td { border-bottom: none; }

  /* ── Badge risiko ── */
  .risk-high   { background: #fef2f2; color: #b91c1c; font-weight: 700; padding: 2px 8px; border-radius: 999px; font-size: 10px; white-space: nowrap; }
  .risk-medium { background: #fff7ed; color: #c2410c; font-weight: 700; padding: 2px 8px; border-radius: 999px; font-size: 10px; white-space: nowrap; }
  .risk-low    { background: #f0fdf4; color: #15803d; font-weight: 700; padding: 2px 8px; border-radius: 999px; font-size: 10px; white-space: nowrap; }

  /* ── Kartu detail ── */
  .detail-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-bottom: 12px; page-break-inside: avoid; }
  .detail-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .detail-card-name { font-size: 12px; font-weight: 700; color: #0f172a; }
  .detail-card-sub  { font-size: 10px; color: #64748b; margin-top: 1px; }
  .detail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 10px; }
  .stat-box { background: #f8fafc; border-radius: 6px; padding: 8px 10px; }
  .stat-label { font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 2px; }
  .stat-value { font-size: 14px; font-weight: 800; color: #0f172a; }
  .factors-title { font-size: 10px; font-weight: 700; color: #475569; margin-bottom: 5px; }
  .factor-tag { display: inline-block; background: #fff1f2; color: #9f1239; border: 1px solid #fecdd3; border-radius: 4px; padding: 2px 7px; font-size: 9.5px; font-weight: 600; margin: 2px; }

  /* ── Footer ── */
  .footer { margin-top: 32px; padding-top: 10px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 9.5px; color: #94a3b8; }

  /* ── No-data ── */
  .no-data { text-align: center; padding: 20px; color: #94a3b8; font-style: italic; }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { padding: 20px 24px; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div class="header-left">
      <h1>Laporan Monitoring Siswa</h1>
      <p>Sistem Deteksi Dini EduPredict</p>
    </div>
    <div class="header-right">
      <div>Tanggal cetak: <strong>${tanggal}</strong></div>
      <div>Total siswa: <strong>${siswaList.length} siswa</strong></div>
    </div>
  </div>

  <!-- Info Guru -->
  <div class="info-box">
    <div class="info-row"><span class="info-label">Nama Guru</span><span class="info-value">${guru?.nama || '-'}</span></div>
    <div class="info-row"><span class="info-label">Nama Sekolah</span><span class="info-value">${guru?.nama_sekolah || '-'}</span></div>
    <div class="info-row"><span class="info-label">Wali Kelas</span><span class="info-value">${guru?.kelas || '-'}</span></div>
    <div class="info-row"><span class="info-label">Jenjang</span><span class="info-value">${guru?.jenjang || '-'}</span></div>
    <div class="info-row"><span class="info-label">NIP</span><span class="info-value">${guru?.nip || '-'}</span></div>
    <div class="info-row"><span class="info-label">Jenis Sekolah</span><span class="info-value">${guru?.school_type === 'Public' ? 'Negeri' : guru?.school_type === 'Private' ? 'Swasta' : '-'}</span></div>
  </div>

  <!-- Tabel ringkas semua siswa -->
  <div class="section-title">Ringkasan Seluruh Siswa</div>
  <table>
    <thead>
      <tr>
        <th style="width:30px">#</th>
        <th>Nama Siswa</th>
        <th>Kelas</th>
        <th class="center">Kehadiran</th>
        <th class="center">Jam Belajar</th>
        <th class="center">Nilai Rapor</th>
        <th class="center">Status Risiko</th>
        <th class="center">Kepercayaan AI</th>
      </tr>
    </thead>
    <tbody>
      ${siswaList.length === 0
        ? `<tr><td colspan="8" class="no-data">Belum ada data siswa.</td></tr>`
        : siswaList.map((s, i) => {
            const { text, cls } = risikoLabel(s.risk_category);
            return `
            <tr>
              <td class="center">${i + 1}</td>
              <td><strong>${s.nama_siswa || '-'}</strong></td>
              <td class="center">${s.kelas || '-'}</td>
              <td class="center">${s.attendance != null ? s.attendance + '%' : '-'}</td>
              <td class="center">${s.hours_studied != null ? s.hours_studied + ' j/mgg' : '-'}</td>
              <td class="center">${s.previous_scores != null ? s.previous_scores : '-'}</td>
              <td class="center"><span class="${cls}">${text}</span></td>
              <td class="center">${s.confidence != null ? s.confidence + '%' : '-'}</td>
            </tr>`;
          }).join('')}
    </tbody>
  </table>

  <!-- Kartu detail: hanya high/medium -->
  ${berisiko.length > 0 ? `
  <div class="section-title">Detail Siswa Berisiko Tinggi &amp; Sedang</div>
  ${berisiko.map(s => {
      const { text, cls } = risikoLabel(s.risk_category);
      const factors = parseRiskFactors(s.risk_factors);
      return `
      <div class="detail-card">
        <div class="detail-card-header">
          <div>
            <div class="detail-card-name">${s.nama_siswa || '-'}</div>
            <div class="detail-card-sub">Kelas ${s.kelas || '-'} · NISN ${s.nisn || '-'}</div>
          </div>
          <span class="${cls}">${text}</span>
        </div>
        <div class="detail-grid">
          <div class="stat-box">
            <div class="stat-label">Kehadiran</div>
            <div class="stat-value">${s.attendance != null ? s.attendance + '%' : '-'}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Jam Belajar</div>
            <div class="stat-value">${s.hours_studied != null ? s.hours_studied + ' j/mgg' : '-'}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Nilai Rapor</div>
            <div class="stat-value">${s.previous_scores != null ? s.previous_scores : '-'}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Kepercayaan AI</div>
            <div class="stat-value">${s.confidence != null ? s.confidence + '%' : '-'}</div>
          </div>
        </div>
        ${factors.length > 0 ? `
        <div class="factors-title">Faktor Risiko yang Terdeteksi</div>
        <div>${factors.map(f => {
            const label = typeof f === 'string' ? f : (f?.factor ?? f?.name ?? f?.key ?? JSON.stringify(f));
            return `<span class="factor-tag">${label}</span>`;
          }).join('')}</div>
        ` : ''}
      </div>`;
    }).join('')}
  ` : `<p class="no-data" style="margin-bottom:20px">Tidak ada siswa dengan risiko tinggi atau sedang.</p>`}

  <!-- Footer -->
  <div class="footer">
    <span>EduPredict — Sistem Deteksi Dini Risiko Akademik</span>
    <span>Dicetak oleh: ${guru?.nama || '-'}</span>
  </div>

</div>
</body>
</html>`;

    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    win.onload = () => win.print();
}

export default LaporanMonitoring;