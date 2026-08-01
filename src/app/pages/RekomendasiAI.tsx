import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { RefreshCw, Package, DollarSign, Truck, TrendingUp, Tag, Clock, Brain } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RekoCard {
  id: string;
  badge: string;
  badgeBg: string;
  borderColor: string;
  iconBg: string;
  icon: React.ReactNode;
  timestamp: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  cta: string;
}

interface HistoryRow {
  date: string;
  reko: string;
  category: string;
  categoryColor: string;
  status: string;
  statusBg: string;
  impact: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const cards: RekoCard[] = [
  {
    id: 'r1',
    badge: 'URGENT',
    badgeBg: 'rgba(255,0,255,0.15)',
    borderColor: '#1A1A1B',
    iconBg: 'rgba(236,72,153,0.15)',
    icon: <Package size={24} />,
    timestamp: '2 jam lagi kehabisan',
    title: 'Restock Beras Premium 5kg',
    description: 'Stok tersisa 3 pcs. Prediksi habis dalam 2 jam berdasarkan rata-rata penjualan harian 15 pcs.',
    metrics: [
      { label: 'Stok', value: '3 pcs' },
      { label: 'Rekomendasi', value: '50 pcs' },
      { label: 'Est. biaya', value: 'Rp 9.25M' },
    ],
    cta: 'Buat PO Sekarang',
  },
  {
    id: 'r2',
    badge: 'PELUANG',
    badgeBg: 'rgba(255,215,0,0.15)',
    borderColor: '#1A1A1B',
    iconBg: 'rgba(255,215,0,0.1)',
    icon: <DollarSign size={24} />,
    timestamp: 'Berlaku 3 hari lagi',
    title: 'Diskon Minyak Goreng 2L — Overstock',
    description: 'Stok menumpuk 240 pcs (3x normal). Rekomendasikan diskon 15% untuk percepat perputaran dan bebaskan modal.',
    metrics: [
      { label: 'Overstock', value: '240 pcs' },
      { label: 'Diskon saran', value: '15%' },
      { label: 'Est. modal bebas', value: 'Rp 5.4M' },
    ],
    cta: 'Terapkan Diskon',
  },
  {
    id: 'r3',
    badge: 'OPTIMASI',
    badgeBg: 'rgba(0,255,127,0.15)',
    borderColor: '#1A1A1B',
    iconBg: 'rgba(0,255,127,0.1)',
    icon: <Truck size={24} />,
    timestamp: 'Potensi hemat minggu ini',
    title: 'Supplier Alternatif Gula Pasir Lebih Murah',
    description: 'Ditemukan supplier GudangAda menawarkan harga Rp 11.200/kg vs supplier saat ini Rp 12.500/kg. Potensi hemat Rp 1.3M/bulan.',
    metrics: [
      { label: 'Harga saat ini', value: 'Rp 12.5K/kg' },
      { label: 'Harga baru', value: 'Rp 11.2K/kg' },
      { label: 'Hemat/bulan', value: 'Rp 1.3M' },
    ],
    cta: 'Lihat Detail Supplier',
  },
  {
    id: 'r4',
    badge: 'TRENDING',
    badgeBg: 'rgba(0,255,255,0.15)',
    borderColor: '#1A1A1B',
    iconBg: 'rgba(0,255,255,0.1)',
    icon: <TrendingUp size={24} />,
    timestamp: 'Tren 7 hari terakhir',
    title: 'Tambah Produk Teh Botol Sosro',
    description: 'Permintaan Teh Botol meningkat 45% di area Anda minggu ini. Produk belum ada di katalog. Estimasi pendapatan tambahan Rp 850K/minggu.',
    metrics: [
      { label: 'Kenaikan demand', value: '+45%' },
      { label: 'Modal awal est.', value: 'Rp 1.2M' },
      { label: 'ROI est.', value: '70%/bulan' },
    ],
    cta: 'Tambah ke Katalog',
  },
  {
    id: 'r5',
    badge: 'HARGA',
    badgeBg: 'rgba(255,215,0,0.15)',
    borderColor: '#1A1A1B',
    iconBg: 'rgba(255,215,0,0.1)',
    icon: <Tag size={24} />,
    timestamp: 'Kompetitor update kemarin',
    title: 'Perbarui Harga Jual Indomie Goreng',
    description: 'Harga jual Anda Rp 3.800 sementara kompetitor rata-rata Rp 4.100. Ada ruang naik harga 7% tanpa risiko kehilangan pembeli.',
    metrics: [
      { label: 'Harga Anda', value: 'Rp 3.800' },
      { label: 'Harga kompetitor', value: 'Rp 4.100' },
      { label: 'Tambahan margin', value: '+Rp 1.8M/bln' },
    ],
    cta: 'Update Harga Sekarang',
  },
  {
    id: 'r6',
    badge: 'KADALUARSA',
    badgeBg: 'rgba(230,50,32,0.15)',
    borderColor: '#1A1A1B',
    iconBg: 'rgba(230,50,32,0.1)',
    icon: <Clock size={24} />,
    timestamp: 'Kadaluarsa dalam 4 hari',
    title: 'Produk Gula Pasir Mendekati Kadaluarsa',
    description: '48 pcs Gula Pasir 1kg kadaluarsa 20 Mei 2024. Jalankan flash sale atau bundling untuk habiskan stok sebelum expired.',
    metrics: [
      { label: 'Stok at risk', value: '48 pcs' },
      { label: 'Diskon saran', value: '20%' },
      { label: 'Potensi selamat', value: 'Rp 720K' },
    ],
    cta: 'Buat Flash Sale',
  },
];

const history: HistoryRow[] = [
  {
    date: '12 Mei 2024',
    reko: 'Restock Beras 50 pcs',
    category: 'Restok',
    categoryColor: '#1A1A1B',
    status: 'Selesai',
    statusBg: 'rgba(0,255,127,0.15)',
    impact: '+Rp 2.1M pendapatan',
  },
  {
    date: '10 Mei 2024',
    reko: 'Diskon Minyak 10%',
    category: 'Diskon',
    categoryColor: '#1A1A1B',
    status: 'Selesai',
    statusBg: 'rgba(0,255,127,0.15)',
    impact: 'Stok -80 pcs dalam 3 hari',
  },
  {
    date: '8 Mei 2024',
    reko: 'Ganti Supplier Gula',
    category: 'Optimasi',
    categoryColor: '#98E2FD',
    status: 'Proses',
    statusBg: 'rgba(255,215,0,0.15)',
    impact: 'Hemat est. Rp 1.3M/bln',
  },
  {
    date: '5 Mei 2024',
    reko: 'Tambah SKU Teh Botol',
    category: 'Ekspansi',
    categoryColor: '#4A90D9',
    status: 'Selesai',
    statusBg: 'rgba(0,255,127,0.15)',
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
      className="flex flex-col rounded-2xl border-l-[3px]"
      style={{
        background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? card.borderColor + '55' : 'rgba(0, 0, 0, 0.05)'}`,
        borderLeft: `3px solid ${card.borderColor}`,
        padding: 20,
        transition: 'all 0.25s ease',
      }}
    >
      {/* Badge + timestamp row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
          style={{ background: card.badgeBg, color: '#1A1A1B' }}
        >
          {card.badge}
        </span>
        <span className="text-[10px] text-[#8A8A8A]">{card.timestamp}</span>
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
        style={{ background: card.iconBg }}
      >
        {card.icon}
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-[#1A1A1B] mt-3 leading-snug">{card.title}</h3>

      {/* Description */}
      <p className="text-xs text-[#8A8A8A] mt-2 flex-1" style={{ lineHeight: 1.6 }}>
        {card.description}
      </p>

      {/* Metrics */}
      <div className="flex gap-4 mt-3 flex-wrap">
        {card.metrics.map((m) => (
          <div key={m.label}>
            <p className="text-[10px] text-[#8A8A8A]">{m.label}</p>
            <p className="text-xs font-bold" style={{ color: '#1A1A1B' }}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ boxShadow: '0 0 20px rgba(255, 225, 111,0.6)', scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleCTA}
        className="w-full h-10 rounded-[10px] text-sm font-bold text-[#1A1A1B] mt-4"
        style={{ background: '#FFE16F', border: 'none', cursor: 'pointer' }}
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
      style={{ background: '#f8fafc' }}
    >
      <Sidebar activePage="rekomendasi" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 32px' }}>

        {/* ── Page Header ── */}
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1B]">Restock Intelligence</h1>
          <p className="text-[13px] mt-1" style={{ color: '#1A1A1B' }}>
            Saran cerdas dari AI untuk optimasi bisnis Anda hari ini
          </p>
        </div>

        {/* ── Section 1: AI Summary Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between rounded-2xl border mt-6"
          style={{
            padding: '16px 20px',
            background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Left */}
          <div className="flex items-start gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,225,111,0.25)' }}
            >
              <Brain size={22} color="#1A1A1B" />
            </div>
            <div>
              <p className="text-[13px] text-[#1A1A1B] font-medium">
                AI menganalisis <span className="text-[#1A1A1B] font-bold">1.248 produk</span> dari{' '}
                <span className="text-[#1A1A1B] font-bold">847 transaksi</span> bulan ini
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: '#1A1A1B' }}>
                Diperbarui 5 menit lalu
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(0,255,127,0.15)', color: '#1A1A1B' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
              Aktif
            </span>
            <motion.button
              whileHover={{ borderColor: '#1A1A1B', color: '#1A1A1B' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 rounded-lg text-[12px] text-[#1A1A1B] border transition-colors"
              style={{
                height: 32,
                background: 'transparent',
                borderColor: 'rgba(0, 0, 0, 0.1)',
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
              <h2 className="text-sm font-bold text-[#1A1A1B]">Riwayat Rekomendasi</h2>
              <span className="text-xs" style={{ color: '#1A1A1B' }}>Rekomendasi yang sudah dieksekusi</span>
            </div>
            <button className="text-xs font-semibold" style={{ color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer' }}>
              Lihat Semua →
            </button>
          </div>

          {/* Table */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Header */}
            <div
              className="grid text-[11px] font-bold uppercase"
              style={{
                gridTemplateColumns: '120px 1fr 110px 120px 1fr',
                padding: '12px 16px',
                background: '#ffffff',
                color: '#1A1A1B',
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
                  borderColor: 'rgba(0, 0, 0, 0.03)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="text-[12px]" style={{ color: '#1A1A1B' }}>{row.date}</span>
                <span className="text-[12px] font-medium text-[#1A1A1B]">{row.reko}</span>
                <span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${row.categoryColor}22`, color: '#1A1A1B' }}
                  >
                    {row.category}
                  </span>
                </span>
                <span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: row.statusBg, color: '#1A1A1B' }}
                  >
                    {row.status}
                  </span>
                </span>
                <span className="text-[12px] text-[#1A1A1B]">{row.impact}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="h-10" />
      </main>
    </div>
  );
}
