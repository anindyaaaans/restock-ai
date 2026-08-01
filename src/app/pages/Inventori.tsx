import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import CategorySidebar from '../components/inventory/CategorySidebar';
import ProductCard from '../components/inventory/ProductCard';
import { Grid3x3, List, Search, Filter, Download, Edit2, Trash2, ChevronDown, ChevronUp, AlertTriangle, Zap } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  status: 'safe' | 'warning' | 'critical';
  category: string;
  expiryDate?: string;   // ISO: 'YYYY-MM-DD'
  image?: string;
}

// Today anchor: 2026-05-17
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Beras Premium 5kg',
    sku: 'BRS-001',
    stock: 12,
    status: 'warning',
    category: 'beras',
    expiryDate: '2026-05-21',   // 4 hari lagi — KRITIS
    image: '/products/Beras Premium 5kg.jpg'
  },
  {
    id: '2',
    name: 'Minyak Goreng 2L',
    sku: 'MYK-002',
    stock: 5,
    status: 'critical',
    category: 'minyak',
    expiryDate: '2026-06-04',   // 18 hari — PERHATIAN
    image: '/products/Minyak Goreng 2L.jpeg'
  },
  {
    id: '3',
    name: 'Gula Pasir 1kg',
    sku: 'GUL-003',
    stock: 48,
    status: 'safe',
    category: 'gula',
    expiryDate: '2026-07-16',   // 60 hari — AMAN
    image: '/products/Gula Pasir 1kg.jpeg'
  },
  {
    id: '4',
    name: 'Teh Kotak 250ml',
    sku: 'TEH-004',
    stock: 120,
    status: 'safe',
    category: 'minuman',
    image: '/products/Teh Kotak 250ml.jpeg'
  },
  {
    id: '5',
    name: 'Indomie Goreng',
    sku: 'MIE-005',
    stock: 85,
    status: 'safe',
    category: 'sembako',
    expiryDate: '2026-07-01',   // 45 hari — AMAN
    image: '/products/Indomie Goreng.jpeg'
  },
  {
    id: '6',
    name: 'Aqua 600ml',
    sku: 'AQU-006',
    stock: 200,
    status: 'safe',
    category: 'minuman',
    image: '/products/Aqua 600ml.jpeg'
  },
  {
    id: '7',
    name: 'Kopi ABC Susu',
    sku: 'KOP-007',
    stock: 32,
    status: 'safe',
    category: 'minuman',
    expiryDate: '2026-06-11',   // 25 hari — PERHATIAN
    image: '/products/Kopi ABC Susu.jpeg'
  },
  {
    id: '8',
    name: 'Chitato Rasa Sapi',
    sku: 'SNK-008',
    stock: 8,
    status: 'warning',
    category: 'snack',
    expiryDate: '2026-05-23',   // 6 hari — KRITIS
    image: '/products/Chitato Rasa Sapi.jpeg'
  }
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TODAY = new Date('2026-05-17');

function daysUntil(isoDate: string): number {
  const diff = new Date(isoDate).getTime() - TODAY.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatExpiry(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

type ExpiryLevel = 'kritis' | 'perhatian' | 'aman';

function expiryLevel(days: number): ExpiryLevel {
  if (days <= 7) return 'kritis';
  if (days <= 30) return 'perhatian';
  return 'aman';
}

const LEVEL_META: Record<ExpiryLevel, { label: string; color: string; bg: string; borderColor: string }> = {
  kritis:    { label: 'Kritis',    color: '#ef4444', bg: 'rgba(255,68,68,0.12)',    borderColor: 'rgba(255,68,68,0.35)' },
  perhatian: { label: 'Perhatian', color: '#f59e0b', bg: 'rgba(255,215,0,0.12)',   borderColor: 'rgba(255,215,0,0.35)' },
  aman:      { label: 'Aman',      color: '#10b981', bg: 'rgba(0,255,127,0.12)',   borderColor: 'rgba(0,255,127,0.3)' },
};

// ─── Expiry Widget ────────────────────────────────────────────────────────────

function ExpiryWidget() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [dismissed, setDismissed] = useState<string[]>([]);

  const expiringProducts = mockProducts
    .filter((p) => p.expiryDate)
    .map((p) => ({ ...p, days: daysUntil(p.expiryDate!), level: expiryLevel(daysUntil(p.expiryDate!)) }))
    .filter((p) => !dismissed.includes(p.id))
    .sort((a, b) => a.days - b.days);

  const kritisCount    = expiringProducts.filter((p) => p.level === 'kritis').length;
  const perhatianCount = expiringProducts.filter((p) => p.level === 'perhatian').length;
  const amanCount      = expiringProducts.filter((p) => p.level === 'aman').length;

  // estimated value at risk from kritis items
  const valueSaved = kritisCount * 48 * 12000; // avg 48pcs × Rp12k

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden mb-6"
      style={{
        background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
        backdropFilter: 'blur(12px)',
        border: kritisCount > 0
          ? '1px solid rgba(255,68,68,0.3)'
          : '1px solid rgba(255,215,0,0.2)',
      }}
    >
      {/* ── Header bar ── */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{
          background: kritisCount > 0
            ? 'linear-gradient(90deg, rgba(255,68,68,0.1), rgba(255,68,68,0.03))'
            : 'linear-gradient(90deg, rgba(255,215,0,0.08), rgba(255,215,0,0.02))',
          borderBottom: expanded ? '1px solid rgba(0, 0, 0, 0.07)' : 'none',
        }}
      >
        {/* Left: icon + title + pills */}
        <div className="flex items-center flex-wrap" style={{ gap: 12 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <AlertTriangle
              size={16}
              color={kritisCount > 0 ? '#FF4444' : '#FFD700'}
            />
            <span className="font-bold text-[#1A1A1B]" style={{ fontSize: 13 }}>
              Pemantauan Kadaluwarsa
            </span>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap" style={{ gap: 6 }}>
            {kritisCount > 0 && (
              <span className="font-bold" style={{ fontSize: 11, background: LEVEL_META.kritis.bg, color: '#1A1A1B', borderRadius: 20, padding: '3px 10px', border: `1px solid ${LEVEL_META.kritis.borderColor}` }}>
                {kritisCount} Kritis &lt;7 hari
              </span>
            )}
            {perhatianCount > 0 && (
              <span className="flex items-center gap-1.5 font-bold" style={{ fontSize: 11, background: LEVEL_META.perhatian.bg, color: '#1A1A1B', borderRadius: 20, padding: '3px 10px', border: `1px solid ${LEVEL_META.perhatian.borderColor}` }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EAB308' }} />
                {perhatianCount} Perhatian
              </span>
            )}
            {amanCount > 0 && (
              <span className="flex items-center gap-1.5 font-bold" style={{ fontSize: 11, background: LEVEL_META.aman.bg, color: '#1A1A1B', borderRadius: 20, padding: '3px 10px', border: `1px solid ${LEVEL_META.aman.borderColor}` }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
                {amanCount} Aman
              </span>
            )}
          </div>

          {/* AI note */}
          {kritisCount > 0 && (
            <span style={{ fontSize: 11, color: '#1A1A1B' }}>
              · AI menyarankan tindakan segera untuk menghindari kerugian{' '}
              <span style={{ color: '#1A1A1B', fontWeight: 700 }}>
                ~Rp {(valueSaved / 1000000).toFixed(1)}M
              </span>
            </span>
          )}
        </div>

        {/* Right: collapse toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1B', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}
        >
          {expanded ? (
            <><ChevronUp size={14} /> Sembunyikan</>
          ) : (
            <><ChevronDown size={14} /> Tampilkan {expiringProducts.length} produk</>
          )}
        </button>
      </div>

      {/* ── Collapsible detail table ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="table"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {/* Table header */}
            <div
              className="grid uppercase font-bold"
              style={{
                gridTemplateColumns: '36px 1fr 80px 120px 180px 140px 160px',
                padding: '10px 20px',
                fontSize: 10,
                color: '#1A1A1B',
                letterSpacing: '0.06em',
                background: '#f8fafc',
                borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
              }}
            >
              <span />
              <span>Produk</span>
              <span>Stok</span>
              <span>Kadaluwarsa</span>
              <span>Sisa Waktu</span>
              <span>Status</span>
              <span>Aksi Cepat</span>
            </div>

            {/* Rows */}
            {expiringProducts.map((p, idx) => {
              const meta = LEVEL_META[p.level];
              const barPct = Math.max(0, Math.min(100, (p.days / 90) * 100));

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="grid items-center border-b"
                  style={{
                    gridTemplateColumns: '36px 1fr 80px 120px 180px 140px 160px',
                    padding: '13px 20px',
                    borderColor: 'rgba(0, 0, 0, 0.03)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {/* Thumbnail */}
                  <div style={{ width: 28, height: 28, borderRadius: 6, overflow: 'hidden', background: '#ffffff', flexShrink: 0 }}>
                    {p.image && <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>

                  {/* Name + SKU */}
                  <div>
                    <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 12 }}>{p.name}</p>
                    <p style={{ fontSize: 10, color: '#1A1A1B' }}>{p.sku}</p>
                  </div>

                  {/* Stock */}
                  <span
                    className="font-bold"
                    style={{ fontSize: 12, color: '#1A1A1B' }}
                  >
                    {p.stock} pcs
                  </span>

                  {/* Expiry date */}
                  <span style={{ fontSize: 12, color: '#1A1A1B' }}>{formatExpiry(p.expiryDate!)}</span>

                  {/* Countdown bar */}
                  <div>
                    <div className="flex items-center justify-between" style={{ marginBottom: 5 }}>
                      <span className="font-bold" style={{ fontSize: 12, color: '#1A1A1B' }}>
                        {p.days <= 0 ? 'Sudah kadaluwarsa!' : `${p.days} hari lagi`}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: 5, background: 'rgba(0, 0, 0, 0.04)', borderRadius: 4 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barPct}%` }}
                        transition={{ delay: 0.1 + idx * 0.05, duration: 0.6, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: meta.color,
                          borderRadius: 4,
                          boxShadow: `0 0 6px ${meta.color}66`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Status pill */}
                  <span>
                    <span
                      className="inline-flex items-center gap-1.5 font-bold"
                      style={{
                        fontSize: 10,
                        background: meta.bg,
                        color: '#1A1A1B',
                        border: `1px solid ${meta.borderColor}`,
                        borderRadius: 20,
                        padding: '3px 10px',
                      }}
                    >
                      {p.level !== 'kritis' && (
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.level === 'perhatian' ? '#EAB308' : '#22C55E' }} />
                      )}
                      {meta.label}
                    </span>
                  </span>

                  {/* Quick actions */}
                  <div className="flex" style={{ gap: 6 }}>
                    {p.level === 'kritis' && (
                      <motion.button
                        whileHover={{ boxShadow: '0 0 12px rgba(255,0,255,0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/dashboard/penjualan')}
                        style={{
                          height: 28,
                          padding: '0 10px',
                          background: 'rgba(255,0,255,0.15)',
                          border: '1px solid rgba(255,0,255,0.35)',
                          borderRadius: 7,
                          fontSize: 10,
                          color: '#1A1A1B',
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Zap size={11} />
                        Flash Sale
                      </motion.button>
                    )}
                    {(p.level === 'kritis' || p.level === 'perhatian') && (
                      <motion.button
                        whileHover={{ boxShadow: '0 0 12px rgba(255,215,0,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          height: 28,
                          padding: '0 10px',
                          background: 'rgba(255,215,0,0.1)',
                          border: '1px solid rgba(255,215,0,0.3)',
                          borderRadius: 7,
                          fontSize: 10,
                          color: '#1A1A1B',
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Diskon
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ borderColor: 'rgba(0,255,255,0.4)', color: '#1A1A1B' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDismissed((prev) => [...prev, p.id])}
                      style={{
                        height: 28,
                        padding: '0 10px',
                        background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: 7,
                        fontSize: 10,
                        color: '#1A1A1B',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s',
                      }}
                    >
                      Abaikan
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}

            {/* ── Footer: ESG note + bulk action ── */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderTop: '1px solid #e2e8f0' }}
            >
              {/* ESG note */}
              <div className="flex items-center" style={{ gap: 8 }}>
                <span style={{ fontSize: 11, color: '#1A1A1B' }}>
                  Pemantauan kadaluwarsa Restock AI membantu mencegah pemborosan produk.{' '}
                  <span style={{ color: '#1A1A1B', fontWeight: 600 }}>Bulan ini: 0 produk terbuang sia-sia.</span>
                </span>
              </div>

              {/* Bulk action */}
              <motion.button
                whileHover={{ boxShadow: '0 0 16px rgba(255, 225, 111,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/dashboard/penjualan')}
                style={{
                  height: 34,
                  padding: '0 16px',
                  background: '#FFE16F',
                  border: 'none',
                  borderRadius: 9,
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#1A1A1B',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                Kelola Semua Produk Hampir Expired
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Inventori() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const handleEdit = (id: string) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete product:', id);
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}
    >
      <Sidebar activePage="inventori" />
      <Navbar />

      {/* Main Content */}
      <main className="ml-60" style={{ padding: "96px 40px 32px" }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#1A1A1B]">MANAJEMEN INVENTORI</h1>
            <span
              className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(0,255,127,0.15)', color: '#1A1A1B' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
              Disinkron dari Moka
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex gap-2">
              <motion.button
                onClick={() => setViewMode('grid')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-2xl border flex items-center justify-center transition-all"
                style={{
                  background: viewMode === 'grid'
                    ? 'linear-gradient(135deg, #FFE16F, #98E2FD)'
                    : 'rgba(0, 0, 0, 0.03)',
                  borderColor: viewMode === 'grid' ? '#98E2FD' : 'rgba(0, 0, 0, 0.1)'
                }}
              >
                <Grid3x3 size={18} className="text-[#1A1A1B]" />
              </motion.button>

              <motion.button
                onClick={() => setViewMode('list')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-2xl border flex items-center justify-center transition-all"
                style={{
                  background: viewMode === 'list'
                    ? 'linear-gradient(135deg, #FFE16F, #98E2FD)'
                    : 'rgba(0, 0, 0, 0.03)',
                  borderColor: viewMode === 'list' ? '#98E2FD' : 'rgba(0, 0, 0, 0.1)'
                }}
              >
                <List size={18} className="text-[#1A1A1B]" />
              </motion.button>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..."
                className="w-60 h-10 pl-10 pr-4 rounded-2xl border text-sm text-[#4B5563] placeholder-[#8A8A8A] transition-all focus:outline-none focus:border-cyan-400"
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }}
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]" />
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-2xl border flex items-center justify-center transition-all hover:border-cyan-400"
              style={{
                background: 'rgba(0, 0, 0, 0.03)',
                borderColor: 'rgba(0, 0, 0, 0.1)'
              }}
            >
              <Filter size={18} className="text-[#1A1A1B]" />
            </motion.button>
          </div>
        </div>

        {/* Expiry Widget */}
        <ExpiryWidget />

        {/* Bulk Action Bar */}
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 flex justify-between items-center mb-4 sticky top-20 z-30"
            style={{
              background: '#FFE16F',
              boxShadow: '0 8px 24px rgba(245, 224, 74, 0.4)'
            }}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedProducts.length === filteredProducts.length}
                onChange={handleSelectAll}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <span className="text-sm font-bold text-[#1A1A1B]">
                {selectedProducts.length} items selected
              </span>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 h-10 rounded-lg border font-bold text-sm flex items-center gap-2 transition-all"
                style={{
                  background: 'transparent',
                  borderColor: '#8B1A10',
                  color: '#1A1A1B'
                }}
              >
                <Trash2 size={16} />
                Delete Selected
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 h-10 rounded-lg font-bold text-sm flex items-center gap-2"
                style={{
                  background: '#ffffff',
                  color: '#1A1A1B'
                }}
              >
                <Edit2 size={16} />
                Bulk Edit
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 h-10 rounded-lg font-bold text-sm flex items-center gap-2"
                style={{
                  background: '#ffffff',
                  color: '#1A1A1B'
                }}
              >
                <Download size={16} />
                Export
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Main Content with Sidebar */}
        <div className="flex gap-5">
          {/* Category Sidebar */}
          <CategorySidebar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProducts.includes(product.id)}
                    onSelect={handleSelectProduct}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-[#1A1A1B] text-center py-20">
                List view coming soon...
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
