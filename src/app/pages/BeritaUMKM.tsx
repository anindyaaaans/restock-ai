import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { Search, ChevronDown } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface NewsCard {
  id: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  gradientBg: string;
  imageUrl: string;
  readTime: string;
  title: string;
  snippet: string;
  source: string;
  time: string;
}

interface Commodity {
  name: string;
  today: string;
  yesterday: string;
  change: string;
  changeColor: string;
  direction: 'up' | 'down' | 'flat';
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const categories = ['Semua', 'Harga Pasar', 'Regulasi', 'Tips Bisnis', 'Ekonomi', 'Supplier'];

const newsCards: NewsCard[] = [
  {
    id: 'n1',
    category: '💰 Harga Pasar',
    categoryColor: '#00FF7F',
    categoryBg: 'rgba(0,255,127,0.2)',
    gradientBg: 'linear-gradient(135deg, #1a0f2ecc, #2a1040cc)',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
    readTime: '4 menit',
    title: 'Harga Minyak Goreng Turun 5% Akhir Bulan — Waktu Tepat untuk Restok Besar?',
    snippet: 'Penurunan harga minyak goreng dipicu melimpahnya pasokan CPO dan kebijakan DMO yang mulai efektif.',
    source: 'Detik Finance',
    time: '3 jam lalu',
  },
  {
    id: 'n2',
    category: '📋 Regulasi',
    categoryColor: '#00FFFF',
    categoryBg: 'rgba(0,255,255,0.2)',
    gradientBg: 'linear-gradient(135deg, #0f1a2ecc, #0f2a1acc)',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&fit=crop',
    readTime: '6 menit',
    title: 'Kemenkop UKM Luncurkan Program KUR UMKM 2024 — Bunga 3% per Tahun',
    snippet: 'Program kredit usaha rakyat dengan bunga kompetitif kini tersedia bagi UMKM beromzet hingga Rp 500 juta per tahun.',
    source: 'Bisnis Indonesia',
    time: '6 jam lalu',
  },
  {
    id: 'n3',
    category: '💡 Tips Bisnis',
    categoryColor: '#FFD700',
    categoryBg: 'rgba(255,215,0,0.2)',
    gradientBg: 'linear-gradient(135deg, #1a1a0fcc, #2a2a0fcc)',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80&fit=crop',
    readTime: '5 menit',
    title: '5 Cara UMKM Retail Bertahan di Musim Lebaran: Manajemen Stok yang Tepat',
    snippet: 'Pakar manajemen ritel berbagi strategi menjaga ketersediaan produk tanpa mengorbankan arus kas di musim puncak.',
    source: 'SWA',
    time: 'Kemarin',
  },
  {
    id: 'n4',
    category: '📈 Ekonomi',
    categoryColor: '#C084FC',
    categoryBg: 'rgba(139,75,190,0.3)',
    gradientBg: 'linear-gradient(135deg, #0f0f2acc, #1a0f2ecc)',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80&fit=crop',
    readTime: '3 menit',
    title: 'Inflasi Mei 2024 Terkendali di 2.7% — Daya Beli Konsumen Tetap Stabil',
    snippet: 'BPS mencatat inflasi bulanan sebesar 0.25%, didorong kenaikan harga bahan pangan namun diimbangi penurunan harga energi.',
    source: 'Tempo',
    time: '8 jam lalu',
  },
  {
    id: 'n5',
    category: '🏭 Supplier',
    categoryColor: '#00FF7F',
    categoryBg: 'rgba(0,255,127,0.2)',
    gradientBg: 'linear-gradient(135deg, #1a2a0fcc, #0f2a0fcc)',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&fit=crop',
    readTime: '4 menit',
    title: 'GudangAda Ekspansi ke 15 Kota Baru — Harga Lebih Kompetitif untuk UMKM Daerah',
    snippet: 'Platform B2B tersebut mengumumkan ekspansi ke Jawa Tengah, Jawa Timur, dan Sumatra dengan jaringan gudang baru.',
    source: 'Kontan',
    time: 'Kemarin',
  },
  {
    id: 'n6',
    category: '💡 Tips Bisnis',
    categoryColor: '#FFD700',
    categoryBg: 'rgba(255,215,0,0.2)',
    gradientBg: 'linear-gradient(135deg, #2a0f0fcc, #1a0f1acc)',
    imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80&fit=crop',
    readTime: '7 menit',
    title: 'Tren F&B 2024: Minuman Kekinian Makin Diminati, Ini Peluang untuk Toko Kelontong',
    snippet: 'Riset Nielsen menunjukkan pertumbuhan kategori minuman siap minum 34% YoY, membuka peluang bagi warung dan toko kelontong.',
    source: 'Marketeers',
    time: '2 hari lalu',
  },
];

const commodities: Commodity[] = [
  {
    name: 'Beras Medium',
    today: 'Rp 13.500/kg',
    yesterday: 'Rp 12.500/kg',
    change: '↑ +Rp 1.000 (+8%)',
    changeColor: '#FF4444',
    direction: 'up',
  },
  {
    name: 'Minyak Goreng',
    today: 'Rp 15.200/L',
    yesterday: 'Rp 16.000/L',
    change: '↓ -Rp 800 (-5%)',
    changeColor: '#00FF7F',
    direction: 'down',
  },
  {
    name: 'Gula Pasir',
    today: 'Rp 17.500/kg',
    yesterday: 'Rp 17.400/kg',
    change: '→ +Rp 100 (+0.6%)',
    changeColor: '#8A8A8A',
    direction: 'flat',
  },
  {
    name: 'Tepung Terigu',
    today: 'Rp 12.000/kg',
    yesterday: 'Rp 12.000/kg',
    change: '→ Stabil',
    changeColor: '#8A8A8A',
    direction: 'flat',
  },
  {
    name: 'Telur Ayam',
    today: 'Rp 28.000/kg',
    yesterday: 'Rp 27.500/kg',
    change: '↑ +Rp 500 (+1.8%)',
    changeColor: '#FF8A8A',
    direction: 'up',
  },
];

// ─── Sparkline SVG ─────────────────────────────────────────────────────────────

function Sparkline({ direction }: { direction: 'up' | 'down' | 'flat' }) {
  const color =
    direction === 'up' ? '#FF4444' : direction === 'down' ? '#00FF7F' : '#8A8A8A';

  const points =
    direction === 'up'
      ? '0,20 12,18 24,14 36,10 48,6 60,2'
      : direction === 'down'
      ? '0,2 12,6 24,10 36,14 48,18 60,20'
      : '0,12 12,11 24,13 36,12 48,11 60,12';

  return (
    <svg width={60} height={24} viewBox="0 0 60 24" style={{ display: 'block' }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </svg>
  );
}

// ─── News Card ─────────────────────────────────────────────────────────────────

function NewsCardComp({ card, delay }: { card: NewsCard; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? 'rgba(0,255,255,0.35)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 12,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
      {/* Image area */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ height: 140 }}
      >
        {/* Photo */}
        <img
          src={card.imageUrl}
          alt={card.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s ease',
            transform: 'scale(1)',
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
          onMouseOut={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
        />
        {/* Dark gradient overlay for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: card.gradientBg,
          }}
        />
        {/* Read time top-right */}
        <span
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontSize: 9,
            color: '#E8E8E8',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
            borderRadius: 20,
            padding: '2px 8px',
          }}
        >
          {card.readTime}
        </span>
        {/* Category badge bottom-left */}
        <span
          className="font-bold"
          style={{
            position: 'absolute',
            bottom: 10,
            left: 12,
            fontSize: 10,
            background: card.categoryBg,
            color: card.categoryColor,
            backdropFilter: 'blur(6px)',
            borderRadius: 20,
            padding: '3px 10px',
          }}
        >
          {card.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1" style={{ padding: 16 }}>
        <p
          className="font-bold text-white"
          style={{ fontSize: 13, lineHeight: 1.5 }}
        >
          {card.title}
        </p>
        <p
          style={{
            fontSize: 11,
            color: '#8A8A8A',
            lineHeight: 1.5,
            marginTop: 6,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {card.snippet}
        </p>
        <div
          className="flex items-center justify-between"
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span style={{ fontSize: 10, color: '#8A8A8A' }}>{card.source}</span>
          <span style={{ fontSize: 10, color: '#8A8A8A' }}>{card.time}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BeritaUMKM() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchValue, setSearchValue] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: 'linear-gradient(180deg, #0F0F0F 0%, #1a0f2e 100%)' }}
    >
      <Sidebar activePage="berita" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 40px' }}>

        {/* ── Page Header ── */}
        <div>
          <h1 className="font-bold text-white" style={{ fontSize: 20 }}>Berita UMKM</h1>
          <p style={{ fontSize: 13, color: '#8A8A8A', marginTop: 4 }}>
            Informasi terkini yang relevan untuk bisnis Anda
          </p>
        </div>

        {/* ── Search & Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center flex-wrap"
          style={{ marginTop: 24, gap: 12 }}
        >
          {/* Search */}
          <div className="relative flex-shrink-0" style={{ width: 320 }}>
            <Search
              size={15}
              color="#8A8A8A"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              className="w-full text-white placeholder:text-[#8A8A8A]"
              style={{
                height: 44,
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${searchFocus ? '#00FFFF' : 'rgba(255,255,255,0.12)'}`,
                borderRadius: 12,
                paddingLeft: 40,
                paddingRight: 14,
                fontSize: 13,
                outline: 'none',
                boxShadow: searchFocus ? '0 0 0 3px rgba(0,255,255,0.08)' : 'none',
                transition: 'all 0.2s',
              }}
            />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{ scale: 0.96 }}
                  className="font-medium"
                  style={{
                    height: 36,
                    padding: '0 16px',
                    borderRadius: 20,
                    fontSize: 12,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: isActive
                      ? 'linear-gradient(135deg, #4A1063, #8B4BBE)'
                      : 'rgba(255,255,255,0.05)',
                    border: isActive
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.1)',
                    color: isActive ? '#fff' : '#8A8A8A',
                    fontWeight: isActive ? 700 : 500,
                    boxShadow: isActive ? '0 4px 12px rgba(74,16,99,0.3)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(0,255,255,0.4)';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#8A8A8A';
                    }
                  }}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Section 1: Featured News ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex overflow-hidden"
          style={{
            marginTop: 24,
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            minHeight: 260,
          }}
        >
          {/* Left — Article */}
          <div
            className="flex flex-col"
            style={{
              flex: '0 0 60%',
              background: 'linear-gradient(135deg, #1a0f2e, #0f0f1a)',
              padding: 24,
              position: 'relative',
            }}
          >
            {/* Top row: badge + timestamp */}
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <span
                className="font-bold"
                style={{
                  fontSize: 10,
                  background: 'rgba(255,68,68,0.2)',
                  color: '#FF4444',
                  border: '1px solid rgba(255,68,68,0.3)',
                  borderRadius: 20,
                  padding: '4px 12px',
                  letterSpacing: '0.04em',
                }}
              >
                🔴 TERKINI
              </span>
              <span style={{ fontSize: 10, color: '#8A8A8A' }}>2 jam lalu</span>
            </div>

            {/* Title */}
            <h2
              className="font-bold text-white"
              style={{ fontSize: 22, lineHeight: 1.4 }}
            >
              Harga Beras Medium Naik 8% Menjelang Hari Raya — Ini Dampaknya untuk UMKM Sembako
            </h2>

            {/* Sub */}
            <p
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
                marginTop: 12,
                flex: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              Kementerian Perdagangan mencatat kenaikan harga beras medium nasional dari Rp 12.500 menjadi Rp 13.500/kg. UMKM retail perlu menyesuaikan harga jual atau mencari supplier alternatif untuk menjaga margin tetap sehat.
            </p>

            {/* Footer */}
            <div
              className="flex items-center justify-between"
              style={{ marginTop: 20 }}
            >
              <span style={{ fontSize: 11, color: '#8A8A8A' }}>Bisnis Indonesia · 28 Mei 2024</span>
              <button
                className="font-medium"
                style={{
                  fontSize: 12,
                  color: '#00FFFF',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                Baca Selengkapnya →
              </button>
            </div>
          </div>

          {/* Right — AI Analysis */}
          <div
            className="flex flex-col"
            style={{
              flex: '0 0 40%',
              background: 'rgba(0,255,255,0.06)',
              borderLeft: '1px solid rgba(0,255,255,0.2)',
              padding: 24,
            }}
          >
            <span
              className="font-bold uppercase self-start"
              style={{
                fontSize: 9,
                background: 'rgba(0,255,255,0.15)',
                color: '#00FFFF',
                border: '1px solid rgba(0,255,255,0.3)',
                borderRadius: 20,
                padding: '4px 12px',
                letterSpacing: '0.05em',
              }}
            >
              🧠 ANALISIS AI UNTUK TOKO ANDA
            </span>

            <h3 className="font-bold text-white" style={{ fontSize: 14, marginTop: 10, marginBottom: 12 }}>
              Dampak ke Bisnis Anda
            </h3>

            <div className="flex flex-col" style={{ gap: 12, flex: 1 }}>
              {[
                {
                  icon: '⬆️',
                  iconBg: 'rgba(255,0,255,0.15)',
                  title: 'Harga beli Beras naik ~8%',
                  sub: 'Stok saat ini: 12 pcs — cukup 3 hari',
                  titleColor: '#fff',
                },
                {
                  icon: '💡',
                  iconBg: 'rgba(0,255,127,0.15)',
                  title: 'Restock sekarang sebelum harga naik lagi',
                  sub: 'GudangAda masih di harga lama hingga besok',
                  titleColor: '#00FF7F',
                },
                {
                  icon: '📊',
                  iconBg: 'rgba(255,215,0,0.15)',
                  title: 'Sesuaikan harga jual +Rp 1.000/kg',
                  sub: 'Margin tetap terjaga di 18%',
                  titleColor: '#FFD700',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start" style={{ gap: 10 }}>
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: item.iconBg,
                      fontSize: 14,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold" style={{ fontSize: 12, color: item.titleColor }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: 11, color: '#8A8A8A', marginTop: 2 }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ boxShadow: '0 0 20px rgba(74,16,99,0.6)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard/prediksi')}
              className="w-full font-bold text-white"
              style={{
                height: 40,
                background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                border: 'none',
                borderRadius: 10,
                fontSize: 12,
                cursor: 'pointer',
                marginTop: 'auto',
              }}
            >
              Lihat Prediksi Stok Beras
            </motion.button>
          </div>
        </motion.div>

        {/* ── Section 2: News Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ marginTop: 28 }}
        >
          <h2 className="font-bold text-white" style={{ fontSize: 14, marginBottom: 16 }}>
            Berita Terbaru
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {newsCards.map((card, i) => (
              <NewsCardComp key={card.id} card={card} delay={0.25 + i * 0.07} />
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center" style={{ marginTop: 20 }}>
            <motion.button
              whileHover={{ borderColor: '#00FFFF', color: '#00FFFF' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center font-medium text-white"
              style={{
                height: 40,
                padding: '0 24px',
                gap: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10,
                fontSize: 12,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Tampilkan Lebih Banyak Berita
              <ChevronDown size={14} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Section 3: Commodity Prices ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{ marginTop: 32 }}
        >
          <div className="flex items-baseline" style={{ gap: 8, marginBottom: 16 }}>
            <h2 className="font-bold text-white" style={{ fontSize: 14 }}>
              Harga Komoditas Hari Ini
            </h2>
            <span style={{ fontSize: 11, color: '#8A8A8A' }}>
              Sumber: PIHPS · Diperbarui pukul 08.00
            </span>
          </div>

          <div
            className="overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
            }}
          >
            {/* Table header */}
            <div
              className="grid uppercase font-bold"
              style={{
                gridTemplateColumns: '180px 1fr 1fr 180px 80px',
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.06)',
                fontSize: 11,
                color: '#8A8A8A',
                letterSpacing: '0.05em',
              }}
            >
              <span>Komoditas</span>
              <span>Harga Hari Ini</span>
              <span>Kemarin</span>
              <span>Perubahan</span>
              <span>Trend</span>
            </div>

            {/* Rows */}
            {commodities.map((row, idx) => (
              <motion.div
                key={row.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 + idx * 0.06 }}
                className="grid items-center border-t transition-colors"
                style={{
                  gridTemplateColumns: '180px 1fr 1fr 180px 80px',
                  padding: '14px 20px',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="font-medium text-white" style={{ fontSize: 13 }}>{row.name}</span>
                <span className="font-bold text-white" style={{ fontSize: 13 }}>{row.today}</span>
                <span style={{ fontSize: 13, color: '#8A8A8A' }}>{row.yesterday}</span>
                <span className="font-bold" style={{ fontSize: 12, color: row.changeColor }}>{row.change}</span>
                <Sparkline direction={row.direction} />
              </motion.div>
            ))}

            {/* Alert row */}
            <div
              className="flex items-center justify-between border-t"
              style={{
                padding: '12px 20px',
                background: 'rgba(255,0,255,0.06)',
                borderColor: 'rgba(255,0,255,0.2)',
              }}
            >
              <span style={{ fontSize: 12, color: '#fff' }}>
                ⚠️ Beras naik 8% — RestockAI merekomendasikan restock sebelum harga naik lebih tinggi.
              </span>
              <button
                className="font-bold flex-shrink-0"
                onClick={() => navigate('/dashboard/pembelian')}
                style={{
                  fontSize: 12,
                  color: '#FF00FF',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: 16,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                Restock Sekarang →
              </button>
            </div>
          </div>
        </motion.div>

        <div style={{ height: 40 }} />
      </main>
    </div>
  );
}
