import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Trophy, Star } from 'lucide-react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { Search, ChevronDown } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductRow {
  id: string;
  name: string;
  image: string;
  urgency: string;
  supplierCode: string;
  supplierName: string;
  supplierRating: string;
  supplierBg: string;
  hargaTermurah: string;
  hargaBiasamu: string;
  selisih: string;
  selisihPct: string;
  stok: string;
}

interface SupplierCard {
  id: string;
  code: string;
  name: string;
  location: string;
  distance: string;
  rating: string;
  logoBg: string;
  logoText: string;
  produkCount: string;
  ontime: string;
  pengiriman: string;
  minOrder: string;
  tags: string[];
  benefits: string[];
  borderColor: string;
  isTop?: boolean;
}

interface HistoryRow {
  date: string;
  supplier: string;
  produk: string;
  total: string;
  status: string;
  statusBg: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const productRows: ProductRow[] = [
  {
    id: 'p1',
    name: 'Beras Premium 5kg',
    image: '/products/Beras Premium 5kg.jpg',
    urgency: 'Butuh 50 pcs',
    supplierCode: 'GA',
    supplierName: 'GudangAda',
    supplierRating: '4.8',
    supplierBg: 'linear-gradient(135deg, #FFE16F, #98E2FD)',
    hargaTermurah: 'Rp 44.500/kg',
    hargaBiasamu: 'Rp 52.000/kg',
    selisih: '-Rp 7.500',
    selisihPct: '-14.4%',
    stok: '2.400 kg tersedia',
  },
  {
    id: 'p2',
    name: 'Minyak Goreng 2L',
    image: '/products/Minyak Goreng 2L.jpeg',
    urgency: 'Butuh 30 pcs',
    supplierCode: 'MT',
    supplierName: 'Mitra Toko',
    supplierRating: '4.6',
    supplierBg: 'linear-gradient(135deg, #F5C897, #FFE5B4)',
    hargaTermurah: 'Rp 38.200/L',
    hargaBiasamu: 'Rp 41.000/L',
    selisih: '-Rp 2.800',
    selisihPct: '-6.8%',
    stok: '580 L tersedia',
  },
  {
    id: 'p3',
    name: 'Gula Pasir 1kg',
    image: '/products/Gula Pasir 1kg.jpeg',
    urgency: 'Butuh 20 pcs',
    supplierCode: 'GrS',
    supplierName: 'GrosirSatu',
    supplierRating: '4.3',
    supplierBg: 'linear-gradient(135deg, #00BFBF, #98E2FD)',
    hargaTermurah: 'Rp 11.200/kg',
    hargaBiasamu: 'Rp 12.500/kg',
    selisih: '-Rp 1.300',
    selisihPct: '-10.4%',
    stok: '1.200 kg tersedia',
  },
  {
    id: 'p4',
    name: 'Teh Celup 25s',
    image: '/products/Teh Celup 25s.jpeg',
    urgency: 'Butuh 15 pcs',
    supplierCode: 'GA',
    supplierName: 'GudangAda',
    supplierRating: '4.8',
    supplierBg: 'linear-gradient(135deg, #FFE16F, #98E2FD)',
    hargaTermurah: 'Rp 8.500/box',
    hargaBiasamu: 'Rp 9.800/box',
    selisih: '-Rp 1.300',
    selisihPct: '-13.3%',
    stok: '3.600 box tersedia',
  },
  {
    id: 'p5',
    name: 'Kopi Sachet 10x',
    image: '/products/Kopi ABC Susu.jpeg',
    urgency: 'Butuh 25 pcs',
    supplierCode: 'MT',
    supplierName: 'Mitra Toko',
    supplierRating: '4.6',
    supplierBg: 'linear-gradient(135deg, #F5C897, #FFE5B4)',
    hargaTermurah: 'Rp 15.000/pack',
    hargaBiasamu: 'Rp 17.500/pack',
    selisih: '-Rp 2.500',
    selisihPct: '-14.3%',
    stok: '920 pack tersedia',
  },
];

const suppliers: SupplierCard[] = [
  {
    id: 's1',
    code: 'GA',
    name: 'GudangAda',
    location: 'Jakarta',
    distance: '2.3 km dari toko Anda',
    rating: '4.8',
    logoBg: 'linear-gradient(135deg, #FFE16F, #98E2FD)',
    logoText: 'GA',
    produkCount: '1.248',
    ontime: '98%',
    pengiriman: '2-4 jam',
    minOrder: 'Rp 150K',
    tags: ['Sembako', 'Minuman', 'Snack', 'Frozen'],
    benefits: [
      'Harga grosir real-time',
      'Cicilan 30 hari (bekerjasama dengan Modalku)',
      'One-click restock dari Restock AI',
    ],
    borderColor: 'rgba(0,255,127,0.3)',
    isTop: true,
  },
  {
    id: 's2',
    code: 'MT',
    name: 'Mitra Toko',
    location: 'Jakarta',
    distance: '3.8 km dari toko Anda',
    rating: '4.6',
    logoBg: 'linear-gradient(135deg, #F5C897, #FFE5B4)',
    logoText: 'MT',
    produkCount: '840',
    ontime: '95%',
    pengiriman: '3-6 jam',
    minOrder: 'Rp 100K',
    tags: ['Sembako', 'Minuman', 'Peralatan'],
    benefits: [
      'Harga spesial untuk member',
      'Pengiriman gratis min. Rp 500K',
      'Integrasi dengan Restock AI',
    ],
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  {
    id: 's3',
    code: 'GrS',
    name: 'GrosirSatu',
    location: 'Jakarta',
    distance: '5.1 km dari toko Anda',
    rating: '4.3',
    logoBg: 'linear-gradient(135deg, #00BFBF, #98E2FD)',
    logoText: 'GrS',
    produkCount: '620',
    ontime: '91%',
    pengiriman: '4-8 jam',
    minOrder: 'Rp 200K',
    tags: ['Sembako', 'Grosir'],
    benefits: [
      'Harga kompetitif di kelas grosir',
      'Bisa pickup langsung',
    ],
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
];

const historyRows: HistoryRow[] = [
  {
    date: '28 Mei',
    supplier: 'GudangAda',
    produk: 'Beras 50pcs + 3 lagi',
    total: 'Rp 2.2M',
    status: 'Diterima',
    statusBg: 'rgba(0,255,127,0.15)',
  },
  {
    date: '24 Mei',
    supplier: 'Mitra Toko',
    produk: 'Minyak 30pcs',
    total: 'Rp 1.1M',
    status: 'Diterima',
    statusBg: 'rgba(0,255,127,0.15)',
  },
  {
    date: '20 Mei',
    supplier: 'GudangAda',
    produk: 'Gula 20pcs + 2 lagi',
    total: 'Rp 890K',
    status: 'Dikirim',
    statusBg: 'rgba(255,215,0,0.15)',
  },
  {
    date: '15 Mei',
    supplier: 'GrosirSatu',
    produk: 'Teh 15pcs',
    total: 'Rp 180K',
    status: 'Diterima',
    statusBg: 'rgba(0,255,127,0.15)',
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function FilterDropdown({ label, value, options }: { label: string; value: string; options: string[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  return (
    <div className="flex flex-col" style={{ gap: 4, minWidth: 160 }}>
      <span style={{ fontSize: 9, color: '#1A1A1B', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
        {label}
      </span>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between text-[#1A1A1B]"
          style={{
            width: 160,
            height: 40,
            background: 'rgba(0, 0, 0, 0.03)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 12,
            padding: '0 12px',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          <span>{selected}</span>
          <ChevronDown size={14} color="#4B5563" />
        </button>
        {open && (
          <div
            className="absolute z-50 w-full mt-1"
            style={{
              background: '#ffffff',
              boxShadow: '0 8px 24px -4px rgba(0,0,0,0.12)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { setSelected(opt); setOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm text-[#1A1A1B] transition-colors"
                style={{ fontSize: 12 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SupplierCardComp({ card, delay }: { card: SupplierCard; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col"
      style={{
        background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? (card.isTop ? 'rgba(0,255,127,0.5)' : 'rgba(152, 226, 253,0.4)') : card.borderColor}`,
        borderRadius: 14,
        padding: 20,
        transition: 'all 0.25s ease',
      }}
    >
      {/* TOP PICK badge */}
      {card.isTop && (
        <div
          className="absolute flex items-center gap-1 font-bold uppercase"
          style={{
            top: -8,
            right: -8,
            background: 'linear-gradient(135deg, #FFD700, #F5E04A)',
            color: '#1A1A1B',
            fontSize: 9,
            borderRadius: 20,
            padding: '4px 10px',
            letterSpacing: '0.06em',
          }}
        >
          <Trophy size={11} />
          TERBAIK
        </div>
      )}

      {/* Header */}
      <div className="flex items-center" style={{ gap: 12 }}>
        <div
          className="flex items-center justify-center font-bold flex-shrink-0"
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: card.logoBg,
            color: '#1A1A1B',
            fontSize: 16,
          }}
        >
          {card.logoText}
        </div>
        <div>
          <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 15 }}>{card.name}</p>
          <p style={{ fontSize: 11, color: '#1A1A1B', marginTop: 2 }}>{card.location} · {card.distance}</p>
          <p className="flex items-center gap-1" style={{ fontSize: 11, color: '#1A1A1B' }}>
            <Star size={11} fill="#1A1A1B" />
            {card.rating}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div
        className="flex items-center"
        style={{
          gap: 0,
          marginTop: 14,
          paddingTop: 14,
          borderTop: '1px solid #e2e8f0',
        }}
      >
        {[
          { value: card.produkCount, label: 'Produk' },
          { value: card.ontime, label: 'On-time' },
          { value: card.pengiriman, label: 'Pengiriman' },
          { value: card.minOrder, label: 'Min. Order' },
        ].map((stat, i) => (
          <div key={i} className="flex" style={{ flex: 1, alignItems: 'stretch' }}>
            {i > 0 && <div style={{ width: 1, background: 'rgba(0, 0, 0, 0.05)', marginRight: 12 }} />}
            <div style={{ flex: 1 }}>
              <p className="font-bold" style={{ fontSize: 14, color: '#1A1A1B' }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: '#1A1A1B', marginTop: 2 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap" style={{ gap: 6, marginTop: 12 }}>
        {card.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: 'rgba(0, 0, 0, 0.04)',
              color: '#1A1A1B',
              fontSize: 10,
              borderRadius: 20,
              padding: '3px 10px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Benefits */}
      <div className="flex flex-col" style={{ gap: 4, marginTop: 12 }}>
        {card.benefits.map((b) => (
          <p key={b} style={{ fontSize: 11, color: '#1A1A1B' }}>{b}</p>
        ))}
      </div>

      {/* Actions */}
      <div className="flex" style={{ gap: 8, marginTop: 16 }}>
        <motion.button
          whileHover={{ borderColor: '#1A1A1B' }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 text-[#1A1A1B] font-medium"
          style={{
            height: 40,
            background: '#f8fafc',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: 12,
            fontSize: 12,
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
        >
          Lihat Katalog
        </motion.button>
        <motion.button
          whileHover={{ boxShadow: '0 0 20px rgba(255, 225, 111,0.6)' }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 text-[#1A1A1B] font-bold"
          style={{
            height: 40,
            background: '#FFE16F',
            border: 'none',
            borderRadius: 12,
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Hubungi
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SupplierTerbaik() {
  const navigate = useNavigate();
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: '#f8fafc' }}
    >
      <Sidebar activePage="supplier" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 40px' }}>

        {/* ── Page Header ── */}
        <div>
          <h1 className="font-bold text-[#1A1A1B]" style={{ fontSize: 20 }}>Supplier Terbaik</h1>
          <p style={{ fontSize: 13, color: '#1A1A1B', marginTop: 4 }}>
            Temukan harga stok terbaik dari supplier terpercaya di sekitar Anda
          </p>
        </div>

        {/* ── AI Recommendation Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
          style={{
            marginTop: 24,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #FFE16F, #98E2FD)',
            padding: '20px 24px',
            border: '1px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          <div className="flex flex-col" style={{ gap: 6 }}>
            <span
              className="font-bold uppercase self-start"
              style={{
                fontSize: 10,
                background: 'rgba(0,255,255,0.15)',
                color: '#1A1A1B',
                border: '1px solid rgba(0,255,255,0.3)',
                borderRadius: 20,
                padding: '4px 12px',
                letterSpacing: '0.05em',
              }}
            >
              AI REKOMENDASI HARI INI
            </span>
            <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 16, marginTop: 4 }}>
              GudangAda lebih murah 18% untuk Beras Premium bulan ini
            </p>
            <p style={{ fontSize: 12, color: '#1A1A1B' }}>
              Berdasarkan analisis 1.248 produk Anda dan harga pasar real-time · Diperbarui 1 jam lalu
            </p>
          </div>

          <motion.button
            whileHover={{ background: 'rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard/pembelian')}
            className="text-[#1A1A1B] font-bold flex-shrink-0"
            style={{
              height: 44,
              padding: '0 20px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 12,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Lihat Detail
          </motion.button>
        </motion.div>

        {/* ── Filter & Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-end flex-wrap"
          style={{
            marginTop: 24,
            background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
            borderRadius: 12,
            padding: '16px 20px',
            gap: 16,
          }}
        >
          {/* Search */}
          <div className="relative" style={{ width: 280 }}>
            <Search
              size={14}
              color="#8A8A8A"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Cari produk atau supplier..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              className="w-full text-[#1A1A1B] placeholder:text-[#8A8A8A]"
              style={{
                height: 40,
                background: 'rgba(0, 0, 0, 0.03)',
                border: `1px solid ${searchFocus ? '#98E2FD' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: 12,
                paddingLeft: 36,
                paddingRight: 12,
                fontSize: 12,
                outline: 'none',
                boxShadow: searchFocus ? '0 0 0 3px rgba(0,255,255,0.08)' : 'none',
                transition: 'all 0.2s',
              }}
            />
          </div>

          <FilterDropdown
            label="Kategori Produk"
            value="Semua"
            options={['Semua', 'Sembako', 'Minuman', 'Snack', 'Lainnya']}
          />
          <FilterDropdown
            label="Lokasi"
            value="Jakarta Selatan"
            options={['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Timur']}
          />
          <FilterDropdown
            label="Urutkan"
            value="Harga Termurah ↑"
            options={['Harga Termurah ↑', 'Harga Tertinggi ↓', 'Rating Tertinggi', 'Jarak Terdekat']}
          />

          {/* Verified toggle */}
          <div className="flex items-center ml-auto" style={{ gap: 10 }}>
            <span className="text-[#1A1A1B]" style={{ fontSize: 12 }}>Hanya Supplier Terverifikasi</span>
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className="relative flex-shrink-0"
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: verifiedOnly ? '#D1F07B' : 'rgba(0, 0, 0, 0.08)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.25s',
                boxShadow: verifiedOnly ? '0 0 10px rgba(0,255,127,0.4)' : 'none',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 3,
                  left: verifiedOnly ? 21 : 3,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#ffffff',
                  transition: 'left 0.25s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                }}
              />
            </button>
          </div>
        </motion.div>

        {/* ── Section 1: Product Comparison Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{ marginTop: 24 }}
        >
          <div className="flex items-baseline" style={{ gap: 8, marginBottom: 12 }}>
            <h2 className="font-bold text-[#1A1A1B]" style={{ fontSize: 14 }}>
              Produk yang Butuh Restock — Bandingkan Harga
            </h2>
            <span style={{ fontSize: 12, color: '#1A1A1B' }}>
              Berdasarkan prediksi AI, produk ini perlu direstock minggu ini
            </span>
          </div>

          <div
            className="overflow-hidden"
            style={{
              background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(12px)',
              borderRadius: 12,
            }}
          >
            {/* Table Header */}
            <div
              className="grid uppercase font-bold"
              style={{
                gridTemplateColumns: '220px 160px 130px 130px 110px 150px 100px',
                padding: '14px 20px',
                background: '#f8fafc',
                fontSize: 11,
                color: '#1A1A1B',
                letterSpacing: '0.05em',
              }}
            >
              <span>Produk</span>
              <span>Supplier Terbaik</span>
              <span>Harga Termurah</span>
              <span>Harga Biasamu</span>
              <span>Selisih</span>
              <span>Stok Tersedia</span>
              <span>Aksi</span>
            </div>

            {/* Table Rows */}
            {productRows.map((row, idx) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.06 }}
                className="grid items-center border-t transition-colors"
                style={{
                  gridTemplateColumns: '220px 160px 130px 130px 110px 150px 100px',
                  padding: '16px 20px',
                  borderColor: 'rgba(0, 0, 0, 0.03)',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Produk */}
                <div className="flex items-center" style={{ gap: 10 }}>
                  <img
                    src={row.image}
                    alt={row.name}
                    style={{ width: 36, height: 36, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 13 }}>{row.name}</p>
                    <p className="font-bold" style={{ fontSize: 10, color: '#1A1A1B' }}>{row.urgency}</p>
                  </div>
                </div>

                {/* Supplier */}
                <div className="flex items-center" style={{ gap: 8 }}>
                  <div
                    className="flex items-center justify-center font-bold flex-shrink-0"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: row.supplierBg,
                      color: '#1A1A1B',
                      fontSize: 10,
                    }}
                  >
                    {row.supplierCode}
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 12 }}>{row.supplierName}</p>
                    <p className="flex items-center gap-1" style={{ fontSize: 10, color: '#1A1A1B' }}>
                      <Star size={10} fill="#1A1A1B" />
                      {row.supplierRating}
                    </p>
                  </div>
                </div>

                {/* Harga Termurah */}
                <p className="font-bold" style={{ fontSize: 13, color: '#1A1A1B' }}>{row.hargaTermurah}</p>

                {/* Harga Biasamu */}
                <p style={{ fontSize: 12, color: '#1A1A1B', textDecoration: 'line-through' }}>{row.hargaBiasamu}</p>

                {/* Selisih */}
                <div>
                  <p className="font-bold" style={{ fontSize: 12, color: '#1A1A1B' }}>{row.selisih}</p>
                  <p style={{ fontSize: 10, color: '#1A1A1B' }}>({row.selisihPct})</p>
                </div>

                {/* Stok */}
                <div className="flex items-center" style={{ gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#D1F07B', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#1A1A1B' }}>{row.stok}</span>
                </div>

                {/* Aksi */}
                <motion.button
                  whileHover={{ boxShadow: '0 0 16px rgba(255, 225, 111,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/dashboard/pembelian')}
                  className="font-bold text-[#1A1A1B]"
                  style={{
                    height: 36,
                    padding: '0 14px',
                    background: '#FFE16F',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: 11,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Buat PO
                </motion.button>
              </motion.div>
            ))}

            {/* Table Footer */}
            <div
              className="flex items-center justify-between border-t"
              style={{
                padding: '14px 20px',
                borderColor: 'rgba(0, 0, 0, 0.03)',
              }}
            >
              <div className="flex items-center" style={{ gap: 8 }}>
                <span style={{ fontSize: 12, color: '#1A1A1B' }}>Total potensi hemat bulan ini:</span>
                <span className="font-bold" style={{ fontSize: 14, color: '#1A1A1B' }}>Rp 2.34M</span>
              </div>
              <motion.button
                whileHover={{ boxShadow: '0 0 20px rgba(255, 225, 111,0.6)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/dashboard/pembelian')}
                className="font-bold text-[#1A1A1B]"
                style={{
                  height: 40,
                  padding: '0 20px',
                  background: '#FFE16F',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                Buat PO Semua Produk
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ── Section 2: Supplier Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{ marginTop: 32 }}
        >
          <h2 className="font-bold text-[#1A1A1B]" style={{ fontSize: 14, marginBottom: 16 }}>
            Supplier Terpercaya di Sekitar Anda
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {suppliers.map((s, i) => (
              <SupplierCardComp key={s.id} card={s} delay={0.35 + i * 0.08} />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 16 }}>
            <button
              className="font-semibold"
              style={{
                fontSize: 12,
                color: '#1A1A1B',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
            >
              Lihat Lebih Banyak Supplier →
            </button>
          </div>
        </motion.div>

        {/* ── Section 3: Savings + History ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex"
          style={{
            marginTop: 32,
            background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: 12,
            padding: 24,
            gap: 40,
          }}
        >
          {/* Left — Savings */}
          <div style={{ flex: 1 }}>
            <h3 className="font-bold text-[#1A1A1B]" style={{ fontSize: 14, marginBottom: 16 }}>
              Penghematan Bulan Ini
            </h3>
            <p
              className="font-bold"
              style={{
                fontSize: 36,
                color: '#1A1A1B',
              }}
            >
              Rp 2.34M
            </p>
            <p style={{ fontSize: 12, color: '#1A1A1B', marginTop: 4 }}>
              Hemat vs harga pembelian sebelumnya
            </p>

            <div className="flex flex-col" style={{ gap: 12, marginTop: 20 }}>
              {[
                { name: 'GudangAda', pct: 70, amount: 'Rp 1.64M hemat', color: '#10B981' },
                { name: 'Mitra Toko', pct: 20, amount: 'Rp 470K hemat', color: '#4F46E5' },
                { name: 'GrosirSatu', pct: 10, amount: 'Rp 230K hemat', color: '#FFD700' },
              ].map((bar) => (
                <div key={bar.name}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#1A1A1B' }}>{bar.name}</span>
                    <span style={{ fontSize: 12, color: '#1A1A1B' }}>{bar.amount}</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: 6,
                      background: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: 4,
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.pct}%` }}
                      transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: bar.color,
                        borderRadius: 4,
                        boxShadow: `0 0 8px ${bar.color}55`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — History */}
          <div
            style={{
              flex: 1,
              borderLeft: '1px solid rgba(0, 0, 0, 0.04)',
              paddingLeft: 40,
            }}
          >
            <h3 className="font-bold text-[#1A1A1B]" style={{ fontSize: 14, marginBottom: 16 }}>
              Riwayat Pembelian via Restock AI
            </h3>

            {/* Mini table header */}
            <div
              className="grid uppercase font-bold"
              style={{
                gridTemplateColumns: '60px 100px 1fr 80px 90px',
                fontSize: 10,
                color: '#1A1A1B',
                letterSpacing: '0.05em',
                paddingBottom: 8,
                borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
              }}
            >
              <span>Tgl</span>
              <span>Supplier</span>
              <span>Produk</span>
              <span>Total</span>
              <span>Status</span>
            </div>

            {historyRows.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 + idx * 0.06 }}
                className="grid items-center border-b transition-colors"
                style={{
                  gridTemplateColumns: '60px 100px 1fr 80px 90px',
                  padding: '10px 0',
                  borderColor: 'rgba(0, 0, 0, 0.03)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: 11, color: '#1A1A1B' }}>{row.date}</span>
                <span className="font-medium text-[#1A1A1B]" style={{ fontSize: 11 }}>{row.supplier}</span>
                <span style={{ fontSize: 11, color: '#1A1A1B' }}>{row.produk}</span>
                <span className="font-bold text-[#1A1A1B]" style={{ fontSize: 11 }}>{row.total}</span>
                <span>
                  <span
                    className="font-bold"
                    style={{
                      fontSize: 10,
                      background: row.statusBg,
                      color: '#1A1A1B',
                      borderRadius: 20,
                      padding: '3px 8px',
                    }}
                  >
                    {row.status}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div style={{ height: 40 }} />
      </main>
    </div>
  );
}
