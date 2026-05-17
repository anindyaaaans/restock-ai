import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { RefreshCw } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RekoCard {
  id: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  borderColor: string;
  iconBg: string;
  icon: string;
  timestamp: string;
  title: string;
  description: string;
  metrics: { label: string; value: string; valueColor?: string }[];
  cta: string;
}

interface HistoryRow {
  date: string;
  reko: string;
  category: string;
  categoryColor: string;
  status: string;
  statusBg: string;
  statusColor: string;
  impact: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const cards: RekoCard[] = [
  {
    id: 'r1',
    badge: '🔴 URGENT',
    badgeBg: 'rgba(255,0,255,0.15)',
    badgeColor: '#FF00FF',
    borderColor: '#FF00FF',
    iconBg: 'rgba(255,0,255,0.1)',
    icon: '📦',
    timestamp: '2 jam lagi kehabisan',
    title: 'Restock Beras Premium 5kg',
    description: 'Stok tersisa 3 pcs. Prediksi habis dalam 2 jam berdasarkan rata-rata penjualan harian 15 pcs.',
    metrics: [
      { label: 'Stok', value: '3 pcs', valueColor: '#FF00FF' },
      { label: 'Rekomendasi', value: '50 pcs' },
      { label: 'Est. biaya', value: 'Rp 9.25M' },
    ],
    cta: 'Buat PO Sekarang',
  },
  {
    id: 'r2',
    badge: '💡 PELUANG',
    badgeBg: 'rgba(255,215,0,0.15)',
    badgeColor: '#FFD700',
    borderColor: '#FFD700',
    iconBg: 'rgba(255,215,0,0.1)',
    icon: '💰',
    timestamp: 'Berlaku 3 hari lagi',
    title: 'Diskon Minyak Goreng 2L — Overstock',
    description: 'Stok menumpuk 240 pcs (3x normal). Rekomendasikan diskon 15% untuk percepat perputaran dan bebaskan modal.',
    metrics: [
      { label: 'Overstock', value: '240 pcs', valueColor: '#FFD700' },
      { label: 'Diskon saran', value: '15%' },
      { label: 'Est. modal bebas', value: 'Rp 5.4M' },
    ],
    cta: 'Terapkan Diskon',
  },
  {
    id: 'r3',
    badge: '🔄 OPTIMASI',
    badgeBg: 'rgba(0,255,127,0.15)',
    badgeColor: '#00FF7F',
    borderColor: '#00FF7F',
    iconBg: 'rgba(0,255,127,0.1)',
    icon: '🏭',
    timestamp: 'Potensi hemat minggu ini',
    title: 'Supplier Alternatif Gula Pasir Lebih Murah',
    description: 'Ditemukan supplier GudangAda menawarkan harga Rp 11.200/kg vs supplier saat ini Rp 12.500/kg. Potensi hemat Rp 1.3M/bulan.',
    metrics: [
      { label: 'Harga saat ini', value: 'Rp 12.5K/kg' },
      { label: 'Harga baru', value: 'Rp 11.2K/kg', valueColor: '#00FF7F' },
      { label: 'Hemat/bulan', value: 'Rp 1.3M', valueColor: '#00FF7F' },
    ],
    cta: 'Lihat Detail Supplier',
  },
  {
    id: 'r4',
    badge: '📈 TRENDING',
    badgeBg: 'rgba(0,255,255,0.15)',
    badgeColor: '#00FFFF',
    borderColor: '#00FFFF',
    iconBg: 'rgba(0,255,255,0.1)',
    icon: '🚀',
    timestamp: 'Tren 7 hari terakhir',
    title: 'Tambah Produk Teh Botol Sosro',
    description: 'Permintaan Teh Botol meningkat 45% di area Anda minggu ini. Produk belum ada di katalog. Estimasi pendapatan tambahan Rp 850K/minggu.',
    metrics: [
      { label: 'Kenaikan demand', value: '+45%', valueColor: '#00FFFF' },
      { label: 'Modal awal est.', value: 'Rp 1.2M' },
      { label: 'ROI est.', value: '70%/bulan', valueColor: '#00FFFF' },
    ],
    cta: 'Tambah ke Katalog',
  },
  {
    id: 'r5',
    badge: '💲 HARGA',
    badgeBg: 'rgba(255,215,0,0.15)',
    badgeColor: '#FFD700',
    borderColor: '#FFD700',
    iconBg: 'rgba(255,215,0,0.1)',
    icon: '🏷️',
    timestamp: 'Kompetitor update kemarin',
    title: 'Perbarui Harga Jual Indomie Goreng',
    description: 'Harga jual Anda Rp 3.800 sementara kompetitor rata-rata Rp 4.100. Ada ruang naik harga 7% tanpa risiko kehilangan pembeli.',
    metrics: [
      { label: 'Harga Anda', value: 'Rp 3.800' },
      { label: 'Harga kompetitor', value: 'Rp 4.100', valueColor: '#FFD700' },
      { label: 'Tambahan margin', value: '+Rp 1.8M/bln', valueColor: '#FFD700' },
    ],
    cta: 'Update Harga Sekarang',
  },
  {
    id: 'r6',
    badge: '⚠️ KADALUARSA',
    badgeBg: 'rgba(230,50,32,0.15)',
    badgeColor: '#E63220',
    borderColor: '#E63220',
    iconBg: 'rgba(230,50,32,0.1)',
    icon: '⏰',
    timestamp: 'Kadaluarsa dalam 4 hari',
    title: 'Produk Gula Pasir Mendekati Kadaluarsa',
    description: '48 pcs Gula Pasir 1kg kadaluarsa 20 Mei 2024. Jalankan flash sale atau bundling untuk habiskan stok sebelum expired.',
    metrics: [
      { label: 'Stok at risk', value: '48 pcs', valueColor: '#E63220' },
      { label: 'Diskon saran', value: '20%' },
      { label: 'Potensi selamat', value: 'Rp 720K', valueColor: '#00FF7F' },
    ],
    cta: 'Buat Flash Sale',
  },
];

const history: HistoryRow[] = [
  {
    date: '12 Mei 2024',
    reko: 'Restock Beras 50 pcs',
    category: 'Restok',
    categoryColor: '#00FFFF',
    status: '✓ Selesai',
    statusBg: 'rgba(0,255,127,0.15)',
    statusColor: '#00FF7F',
    impact: '+Rp 2.1M pendapatan',
  },
  {
    date: '10 Mei 2024',
    reko: 'Diskon Minyak 10%',
    category: 'Diskon',
    categoryColor: '#FFD700',
    status: '✓ Selesai',
    statusBg: 'rgba(0,255,127,0.15)',
    statusColor: '#00FF7F',
    impact: 'Stok -80 pcs dalam 3 hari',
  },
  {
    date: '8 Mei 2024',
    reko: 'Ganti Supplier Gula',
    category: 'Optimasi',
    categoryColor: '#8B4BBE',
    status: '⏳ Proses',
    statusBg: 'rgba(255,215,0,0.15)',
    statusColor: '#FFD700',
    impact: 'Hemat est. Rp 1.3M/bln',
  },
  {
    date: '5 Mei 2024',
    reko: 'Tambah SKU Teh Botol',
    category: 'Ekspansi',
    categoryColor: '#4A90D9',
    status: '✓ Selesai',
    statusBg: 'rgba(0,255,127,0.15)',
    statusColor: '#00FF7F',
    impact: '+Rp 850K/minggu',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function RekoCard({ card, delay }: { card: RekoCard; delay: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleCTA = () => {
    if (card.cta === 'Buat PO Sekarang') navigate('/dashboard/pembelian');
    else if (card.cta === 'Lihat Detail Supplier') navigate('/dashboard/integrasi');
    else if (card.cta === 'Buat Flash Sale') navigate('/dashboard/inventori');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col rounded-xl border-l-[3px]"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? card.borderColor + '55' : 'rgba(255,255,255,0.1)'}`,
        borderLeft: `3px solid ${card.borderColor}`,
        boxShadow: hovered ? `0 8px 28px ${card.borderColor}22` : 'none',
        padding: 20,
        transition: 'all 0.25s ease',
      }}
    >
      {/* Badge + timestamp row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
          style={{ background: card.badgeBg, color: card.badgeColor }}
        >
          {card.badge}
        </span>
        <span className="text-[10px] text-[#8A8A8A]">{card.timestamp}</span>
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: card.iconBg }}
      >
        {card.icon}
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-white mt-3 leading-snug">{card.title}</h3>

      {/* Description */}
      <p className="text-xs text-[#8A8A8A] mt-2 flex-1" style={{ lineHeight: 1.6 }}>
        {card.description}
      </p>

      {/* Metrics */}
      <div className="flex gap-4 mt-3 flex-wrap">
        {card.metrics.map((m) => (
          <div key={m.label}>
            <p className="text-[10px] text-[#8A8A8A]">{m.label}</p>
            <p
              className="text-xs font-bold"
              style={{ color: m.valueColor ?? '#fff' }}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ boxShadow: '0 0 20px rgba(74,16,99,0.6)', scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleCTA}
        className="w-full h-10 rounded-[10px] text-sm font-bold text-white mt-4"
        style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', border: 'none', cursor: 'pointer' }}
      >
        {card.cta}
      </motion.button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RekomendasiAI() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setRefreshing(false);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: 'linear-gradient(180deg, #0F0F0F 0%, #1a0f2e 100%)' }}
    >
      <Sidebar activePage="rekomendasi" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 32px' }}>

        {/* ── Page Header ── */}
        <div>
          <h1 className="text-xl font-bold text-white">Rekomendasi AI</h1>
          <p className="text-[13px] mt-1" style={{ color: '#8A8A8A' }}>
            Saran cerdas dari AI untuk optimasi bisnis Anda hari ini
          </p>
        </div>

        {/* ── Section 1: AI Summary Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between rounded-xl border mt-6"
          style={{
            padding: '16px 20px',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          {/* Left */}
          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none">🧠</span>
            <div>
              <p className="text-[13px] text-white font-medium">
                AI menganalisis <span className="text-white font-bold">1.248 produk</span> dari{' '}
                <span className="text-white font-bold">847 transaksi</span> bulan ini
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: '#8A8A8A' }}>
                Diperbarui 5 menit lalu
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              className="text-[11px] font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(0,255,127,0.15)', color: '#00FF7F' }}
            >
              🟢 Aktif
            </span>
            <motion.button
              whileHover={{ borderColor: '#00FFFF', color: '#00FFFF' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 rounded-lg text-[12px] text-white border transition-colors"
              style={{
                height: 32,
                background: 'transparent',
                borderColor: 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
              }}
            >
              <motion.span
                animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={refreshing ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : {}}
              >
                <RefreshCw size={13} />
              </motion.span>
              {refreshing ? 'Memperbarui...' : 'Refresh Analisis'}
            </motion.button>
          </div>
        </motion.div>

        {/* ── Section 2: Recommendation Cards ── */}
        <div
          className="grid mt-6"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
        >
          {cards.map((card, i) => (
            <RekoCard key={card.id} card={card} delay={0.05 + i * 0.07} />
          ))}
        </div>

        {/* ── Section 3: History Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-8"
        >
          {/* Section header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Riwayat Rekomendasi</h2>
              <span className="text-xs" style={{ color: '#8A8A8A' }}>Rekomendasi yang sudah dieksekusi</span>
            </div>
            <button className="text-xs font-semibold" style={{ color: '#00FFFF', background: 'none', border: 'none', cursor: 'pointer' }}>
              Lihat Semua →
            </button>
          </div>

          {/* Table */}
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          >
            {/* Header */}
            <div
              className="grid text-[11px] font-bold uppercase"
              style={{
                gridTemplateColumns: '120px 1fr 110px 120px 1fr',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                color: '#8A8A8A',
                letterSpacing: '0.06em',
              }}
            >
              <span>Tanggal</span>
              <span>Rekomendasi</span>
              <span>Kategori</span>
              <span>Status</span>
              <span>Dampak</span>
            </div>

            {/* Rows */}
            {history.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 + idx * 0.06 }}
                className="grid items-center border-t transition-colors"
                style={{
                  gridTemplateColumns: '120px 1fr 110px 120px 1fr',
                  padding: '13px 16px',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="text-[12px]" style={{ color: '#8A8A8A' }}>{row.date}</span>
                <span className="text-[12px] font-medium text-white">{row.reko}</span>
                <span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${row.categoryColor}22`, color: row.categoryColor }}
                  >
                    {row.category}
                  </span>
                </span>
                <span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: row.statusBg, color: row.statusColor }}
                  >
                    {row.status}
                  </span>
                </span>
                <span className="text-[12px] text-white">{row.impact}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="h-10" />
      </main>
    </div>
  );
}
