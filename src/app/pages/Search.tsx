import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import {
  Search as SearchIcon, X, ArrowRight, Clock, Flame,
  Wheat, Droplet, Candy, Soup, Coffee, CupSoda, Warehouse, Store, Newspaper,
  ClipboardList, TrendingDown, Brain, Sparkles, ShoppingCart, FileText, Users,
  type LucideIcon,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface SearchResult {
  id: string;
  type: 'produk' | 'supplier' | 'berita' | 'fitur';
  icon: LucideIcon;
  iconBg: string;
  title: string;
  subtitle: string;
  path: string;
  badge?: string;
  badgeColor?: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const allResults: SearchResult[] = [
  // Produk
  { id: 'r1', type: 'produk', icon: Wheat, iconBg: 'rgba(16,185,129,0.15)', title: 'Beras Premium 5kg', subtitle: 'Stok: 12 pcs · Harga: Rp 55.000', path: '/dashboard/produk', badge: 'Stok Rendah', badgeColor: '#1A1A1B' },
  { id: 'r2', type: 'produk', icon: Droplet, iconBg: 'rgba(245,158,11,0.15)', title: 'Minyak Goreng 2L', subtitle: 'Stok: 5 pcs · Harga: Rp 45.000', path: '/dashboard/produk', badge: 'Stok Rendah', badgeColor: '#1A1A1B' },
  { id: 'r3', type: 'produk', icon: Candy, iconBg: 'rgba(79,70,229,0.15)', title: 'Gula Pasir 1kg', subtitle: 'Stok: 48 pcs · Harga: Rp 14.000', path: '/dashboard/produk' },
  { id: 'r4', type: 'produk', icon: Soup, iconBg: 'rgba(236,72,153,0.15)', title: 'Indomie Goreng', subtitle: 'Stok: 120 pcs · Harga: Rp 4.500', path: '/dashboard/produk' },
  { id: 'r5', type: 'produk', icon: Coffee, iconBg: 'rgba(152, 226, 253,0.15)', title: 'Kopi Sachet 10x', subtitle: 'Stok: 34 pcs · Harga: Rp 20.000', path: '/dashboard/produk' },
  { id: 'r6', type: 'produk', icon: CupSoda, iconBg: 'rgba(79,70,229,0.15)', title: 'Teh Celup 25s', subtitle: 'Stok: 22 pcs · Harga: Rp 12.000', path: '/dashboard/produk' },
  // Supplier
  { id: 's1', type: 'supplier', icon: Warehouse, iconBg: 'rgba(255, 225, 111,0.3)', title: 'GudangAda', subtitle: 'Jakarta · 4.8 · 2.3 km', path: '/dashboard/supplier', badge: 'Terbaik', badgeColor: '#1A1A1B' },
  { id: 's2', type: 'supplier', icon: Store, iconBg: 'rgba(245,200,150,0.2)', title: 'Mitra Toko', subtitle: 'Jakarta · 4.6 · 3.8 km', path: '/dashboard/supplier' },
  { id: 's3', type: 'supplier', icon: Warehouse, iconBg: 'rgba(0,191,191,0.15)', title: 'GrosirSatu', subtitle: 'Jakarta · 4.3 · 5.1 km', path: '/dashboard/supplier' },
  // Berita
  { id: 'n1', type: 'berita', icon: TrendingDown, iconBg: 'rgba(255,68,68,0.12)', title: 'Harga Beras Naik 8% Menjelang Hari Raya', subtitle: 'Bisnis Indonesia · 2 jam lalu', path: '/dashboard/berita' },
  { id: 'n2', type: 'berita', icon: ClipboardList, iconBg: 'rgba(79,70,229,0.15)', title: 'Program KUR UMKM 2024 — Bunga 3%', subtitle: 'Detik Finance · 6 jam lalu', path: '/dashboard/berita' },
  { id: 'n3', type: 'berita', icon: Newspaper, iconBg: 'rgba(245,158,11,0.15)', title: 'Tips Manajemen Stok Musim Lebaran', subtitle: 'SWA · Kemarin', path: '/dashboard/berita' },
  // Fitur
  { id: 'f1', type: 'fitur', icon: Brain, iconBg: 'rgba(79,70,229,0.15)', title: 'Prediksi Restock', subtitle: 'Prediksi kebutuhan stok berbasis AI', path: '/dashboard/prediksi' },
  { id: 'f2', type: 'fitur', icon: Sparkles, iconBg: 'rgba(245,158,11,0.15)', title: 'Restock Intelligence', subtitle: 'Saran cerdas untuk bisnis Anda', path: '/dashboard/rekomendasi' },
  { id: 'f3', type: 'fitur', icon: ShoppingCart, iconBg: 'rgba(152, 226, 253,0.15)', title: 'Purchase Order', subtitle: 'Buat & kelola PO ke supplier', path: '/dashboard/pembelian' },
  { id: 'f4', type: 'fitur', icon: FileText, iconBg: 'rgba(0,255,127,0.1)', title: 'Laporan', subtitle: 'Analisis penjualan & keuangan', path: '/dashboard/laporan' },
  { id: 'f5', type: 'fitur', icon: Users, iconBg: 'rgba(255, 225, 111,0.2)', title: 'Komunitas', subtitle: 'Forum & grup UMKM Indonesia', path: '/dashboard/komunitas' },
];

const typeLabels: Record<string, string> = {
  produk: 'Produk',
  supplier: 'Supplier',
  berita: 'Berita',
  fitur: 'Fitur',
};

const typeOrder = ['produk', 'supplier', 'berita', 'fitur'];

const recentSearches = ['Beras Premium', 'GudangAda', 'Harga minyak', 'Prediksi stok'];
const trendingSearches = ['KUR UMKM 2024', 'Supplier sembako', 'Manajemen stok', 'Harga beras naik'];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<string>('semua');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 120);
  }, []);

  const filtered = query.trim().length === 0
    ? []
    : allResults.filter((r) => {
        const matchQuery = r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(query.toLowerCase());
        const matchType = activeType === 'semua' || r.type === activeType;
        return matchQuery && matchType;
      });

  const grouped = typeOrder.reduce<Record<string, SearchResult[]>>((acc, type) => {
    const items = filtered.filter((r) => r.type === type);
    if (items.length > 0) acc[type] = items;
    return acc;
  }, {});

  const hasResults = filtered.length > 0;
  const isEmpty = query.trim().length === 0;

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: '#f8fafc' }}
    >
      <Sidebar activePage="search" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 40px' }}>

        {/* ── Search Box ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
          style={{ maxWidth: 680, margin: '0 auto' }}
        >
          <SearchIcon
            size={20}
            color="#8A8A8A"
            style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari produk, supplier, berita, atau fitur..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-[#1A1A1B] placeholder:text-[#8A8A8A]"
            style={{
              height: 56,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(0,255,255,0.35)',
              borderRadius: 16,
              paddingLeft: 52,
              paddingRight: query ? 48 : 20,
              fontSize: 15,
              outline: 'none',
              boxShadow: '0 0 0 3px rgba(0,255,255,0.08)',
              transition: 'all 0.2s',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.05)', border: 'none', borderRadius: '50%',
                width: 24, height: 24, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={13} color="#8A8A8A" />
            </button>
          )}
        </motion.div>

        {/* ── Type Filter chips ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center flex-wrap"
          style={{ gap: 8, marginTop: 16 }}
        >
          {['semua', ...typeOrder].map((type) => {
            const isActive = activeType === type;
            const label = type === 'semua' ? 'Semua' : typeLabels[type];
            return (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                style={{
                  height: 34,
                  padding: '0 16px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  background: isActive ? 'linear-gradient(135deg, #FFE16F, #98E2FD)' : 'rgba(0, 0, 0, 0.03)',
                  border: isActive ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
                  color: '#1A1A1B',
                  boxShadow: isActive ? '0 4px 12px rgba(255, 225, 111,0.3)' : 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(0,255,255,0.4)'; e.currentTarget.style.color = '#1A1A1B'; }}}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)'; e.currentTarget.style.color = '#8A8A8A'; }}}
              >
                {label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Content Area ── */}
        <div style={{ maxWidth: 680, margin: '28px auto 0' }}>

          {/* Empty state: show recent + trending */}
          <AnimatePresence mode="wait">
            {isEmpty && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Recent searches */}
                <div style={{ marginBottom: 28 }}>
                  <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 13, marginBottom: 12 }}>
                    Pencarian Terakhir
                  </p>
                  <div className="flex flex-wrap" style={{ gap: 8 }}>
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        style={{
                          height: 34,
                          padding: '0 14px',
                          borderRadius: 20,
                          fontSize: 12,
                          color: '#1A1A1B',
                          background: '#f8fafc',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,255,0.35)'; e.currentTarget.style.color = '#1A1A1B'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)'; e.currentTarget.style.color = '#C8C8C8'; }}
                      >
                        <Clock size={12} />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div>
                  <p className="flex items-center gap-1.5 font-bold text-[#1A1A1B]" style={{ fontSize: 13, marginBottom: 12 }}>
                    <Flame size={14} />
                    Trending
                  </p>
                  <div className="flex flex-col" style={{ gap: 2 }}>
                    {trendingSearches.map((s, i) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="flex items-center text-left"
                        style={{
                          gap: 12,
                          padding: '11px 14px',
                          borderRadius: 12,
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                          width: '100%',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span style={{ fontSize: 12, color: '#1A1A1B', width: 16, textAlign: 'right', flexShrink: 0 }}>
                          {i + 1}
                        </span>
                        <SearchIcon size={13} color="#8A8A8A" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: '#1A1A1B', flex: 1 }}>{s}</span>
                        <ArrowRight size={13} color="#8A8A8A" style={{ flexShrink: 0 }} />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* No results */}
            {!isEmpty && !hasResults && (
              <motion.div
                key="noresult"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
                style={{ paddingTop: 48, gap: 12 }}
              >
                <SearchIcon size={40} color="#8A8A8A" />
                <p className="font-bold text-[#1A1A1B]" style={{ fontSize: 15 }}>
                  Tidak ada hasil untuk "{query}"
                </p>
                <p style={{ fontSize: 13, color: '#1A1A1B' }}>
                  Coba kata kunci lain atau periksa ejaan Anda
                </p>
              </motion.div>
            )}

            {/* Results */}
            {hasResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Result count */}
                <p style={{ fontSize: 12, color: '#1A1A1B', marginBottom: 16 }}>
                  {filtered.length} hasil untuk{''}
                  <span style={{ color: '#1A1A1B', fontWeight: 600 }}>"{query}"</span>
                </p>

                <div className="flex flex-col" style={{ gap: 24 }}>
                  {Object.entries(grouped).map(([type, items]) => (
                    <div key={type}>
                      {/* Section label */}
                      <p
                        className="font-bold uppercase"
                        style={{
                          fontSize: 10,
                          color: '#1A1A1B',
                          letterSpacing: '0.06em',
                          marginBottom: 8,
                        }}
                      >
                        {typeLabels[type]}
                      </p>

                      {/* Result cards */}
                      <div
                        className="overflow-hidden"
                        style={{
                          background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                          backdropFilter: 'blur(12px)',
                          borderRadius: 12,
                        }}
                      >
                        {items.map((result, idx) => (
                          <motion.button
                            key={result.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.04 }}
                            onClick={() => navigate(result.path)}
                            className="w-full flex items-center text-left border-b"
                            style={{
                              gap: 14,
                              padding: '13px 16px',
                              borderColor: 'rgba(0, 0, 0, 0.03)',
                              background: 'transparent',
                              border: idx < items.length - 1 ? '0 0 1px 0' : 'none',
                              borderBottom: idx < items.length - 1 ? '1px solid rgba(0, 0, 0, 0.03)' : 'none',
                              cursor: 'pointer',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                          >
                            <div
                              className="flex items-center justify-center flex-shrink-0"
                              style={{
                                width: 38, height: 38, borderRadius: 12,
                                background: result.iconBg,
                              }}
                            >
                              <result.icon size={18} color="#1A1A1B" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="flex items-center" style={{ gap: 8 }}>
                                <span className="font-bold text-[#1A1A1B]" style={{ fontSize: 13 }}>
                                  {result.title}
                                </span>
                                {result.badge && (
                                  <span
                                    className="font-bold flex-shrink-0"
                                    style={{
                                      fontSize: 9,
                                      color: '#1A1A1B',
                                      background: `${result.badgeColor}22`,
                                      borderRadius: 20,
                                      padding: '2px 8px',
                                    }}
                                  >
                                    {result.badge}
                                  </span>
                                )}
                              </div>
                              <p style={{ fontSize: 11, color: '#1A1A1B', marginTop: 2 }}>
                                {result.subtitle}
                              </p>
                            </div>
                            <ArrowRight size={14} color="#8A8A8A" style={{ flexShrink: 0 }} />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ height: 40 }} />
      </main>
    </div>
  );
}
