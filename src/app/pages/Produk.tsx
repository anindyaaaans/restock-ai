import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { Search, Filter, Download, Plus, Edit2, Trash2, X, ChevronLeft, ChevronRight, Upload, AlertTriangle } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  subcat: string;
  sku: string;
  category: string;
  hargaBeli: string;
  hargaJual: string;
  margin: string;
  marginColor: string;
  status: 'active' | 'lowstock';
  image: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Beras Premium 5kg',  subcat: 'Sembako',  sku: 'BRS-001', category: 'Sembako', hargaBeli: 'Rp 45.000', hargaJual: 'Rp 55.000', margin: '18.2%', marginColor: '#10b981', status: 'active',   image: '/products/Beras Premium 5kg.jpg' },
  { id: 'p2', name: 'Minyak Goreng 2L',   subcat: 'Sembako',  sku: 'MGR-002', category: 'Sembako', hargaBeli: 'Rp 38.000', hargaJual: 'Rp 45.000', margin: '15.6%', marginColor: '#10b981', status: 'active',   image: '/products/Minyak Goreng 2L.jpeg' },
  { id: 'p3', name: 'Gula Pasir 1kg',     subcat: 'Sembako',  sku: 'GUL-003', category: 'Sembako', hargaBeli: 'Rp 11.200', hargaJual: 'Rp 14.000', margin: '20.0%', marginColor: '#10b981', status: 'active',   image: '/products/Gula Pasir 1kg.jpeg' },
  { id: 'p4', name: 'Teh Celup 25s',      subcat: 'Minuman',  sku: 'TEH-004', category: 'Minuman', hargaBeli: 'Rp 8.500',  hargaJual: 'Rp 12.000', margin: '29.2%', marginColor: '#10b981', status: 'active',   image: '/products/Teh Celup 25s.jpeg' },
  { id: 'p5', name: 'Kopi Sachet 10x',    subcat: 'Minuman',  sku: 'KOP-005', category: 'Minuman', hargaBeli: 'Rp 15.000', hargaJual: 'Rp 20.000', margin: '25.0%', marginColor: '#10b981', status: 'active',   image: '/products/Kopi ABC Susu.jpeg' },
  { id: 'p6', name: 'Indomie Goreng',     subcat: 'Sembako',  sku: 'NDM-006', category: 'Sembako', hargaBeli: 'Rp 3.200',  hargaJual: 'Rp 4.500',  margin: '28.9%', marginColor: '#10b981', status: 'active',   image: '/products/Indomie Goreng.jpeg' },
  { id: 'p7', name: 'Aqua 600ml',         subcat: 'Minuman',  sku: 'AQU-007', category: 'Minuman', hargaBeli: 'Rp 2.500',  hargaJual: 'Rp 4.000',  margin: '37.5%', marginColor: '#10b981', status: 'active',   image: '/products/Aqua 600ml.jpeg' },
  { id: 'p8', name: 'Rinso 900g',         subcat: 'Lainnya',  sku: 'RNS-008', category: 'Lainnya', hargaBeli: 'Rp 22.000', hargaJual: 'Rp 28.000', margin: '21.4%', marginColor: '#f59e0b', status: 'lowstock', image: '/products/Rinso 900g.jpeg' },
];

const CATEGORIES = [
  { label: 'Semua', count: 248 },
  { label: 'Sembako', count: 86 },
  { label: 'Minuman', count: 54 },
  { label: 'Snack', count: 48 },
  { label: 'Fashion', count: 32 },
  { label: 'Lainnya', count: 28 },
];

const FORM_CATEGORIES = ['Sembako', 'Minuman', 'Snack', 'Fashion', 'Lainnya'];

// ─── Modal ────────────────────────────────────────────────────────────────────

function TambahProdukModal({ onClose }: { onClose: () => void }) {
  const [nama, setNama] = useState('');
  const [sku, setSku] = useState('');
  const [kategori, setKategori] = useState('');
  const [hargaBeli, setHargaBeli] = useState('');
  const [hargaJual, setHargaJual] = useState('');
  const [dragging, setDragging] = useState(false);

  const margin = (() => {
    const b = parseInt(hargaBeli.replace(/\D/g, ''));
    const j = parseInt(hargaJual.replace(/\D/g, ''));
    if (b > 0 && j > b) return (((j - b) / j) * 100).toFixed(1) + '%';
    return null;
  })();

  const autoSKU = () => setSku('PRD-' + Math.floor(Math.random() * 900 + 100));

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: 42,
    background: 'rgba(15,23,42,0.06)',
    border: '1px solid rgba(15,23,42,0.15)',
    borderRadius: 10,
    color: '#0f172a',
    fontSize: 13,
    padding: '0 14px',
    outline: 'none',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.22 }}
        className="relative border rounded-2xl"
        style={{
          width: 520,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#f8fafc',
          borderColor: 'rgba(15,23,42,0.15)',
          padding: 32,
          scrollbarWidth: 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0f172a]">Tambah Produk Baru</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0f172a] transition-colors hover:text-gray-400"
            style={{ background: 'rgba(15,23,42,0.08)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Nama Produk */}
          <div>
            <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Nama Produk</label>
            <input
              style={inputStyle}
              placeholder="Contoh: Beras Premium 5kg"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.15)'; }}
            />
          </div>

          {/* SKU */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-[#475569]">SKU</label>
              <button onClick={autoSKU} className="text-xs font-semibold" style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}>
                Auto-generate
              </button>
            </div>
            <input
              style={inputStyle}
              placeholder="Contoh: BRS-001"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.15)'; }}
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              style={{ ...inputStyle, paddingRight: 36, appearance: 'none', cursor: 'pointer' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.15)'; }}
            >
              <option value="" style={{ background: '#f8fafc' }}>Pilih kategori...</option>
              {FORM_CATEGORIES.map((c) => (
                <option key={c} value={c} style={{ background: '#f8fafc' }}>{c}</option>
              ))}
            </select>
          </div>

          {/* Harga row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Harga Beli</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#475569]">Rp</span>
                <input
                  style={{ ...inputStyle, paddingLeft: 32 }}
                  placeholder="0"
                  value={hargaBeli}
                  onChange={(e) => setHargaBeli(e.target.value)}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.15)'; }}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Harga Jual</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#475569]">Rp</span>
                <input
                  style={{ ...inputStyle, paddingLeft: 32 }}
                  placeholder="0"
                  value={hargaJual}
                  onChange={(e) => setHargaJual(e.target.value)}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#4f46e5'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.15)'; }}
                />
              </div>
              {margin && (
                <p className="text-[11px] font-bold mt-1" style={{ color: '#10b981' }}>
                  Margin: {margin}
                </p>
              )}
            </div>
          </div>

          {/* Upload Foto */}
          <div>
            <label className="text-xs font-semibold text-[#475569] mb-1.5 block">Foto Produk</label>
            <div
              onDragEnter={() => setDragging(true)}
              onDragLeave={() => setDragging(false)}
              onDrop={() => setDragging(false)}
              className="w-full flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed transition-colors"
              style={{
                height: 88,
                borderColor: dragging ? '#4f46e5' : 'rgba(15,23,42,0.2)',
                background: dragging ? 'rgba(0,255,255,0.05)' : 'rgba(15,23,42,0.03)',
                cursor: 'pointer',
              }}
            >
              <Upload size={20} className="text-gray-400" />
              <p className="text-xs text-gray-400">Klik untuk upload atau drag & drop</p>
              <p className="text-[10px]" style={{ color: '#64748b' }}>PNG, JPG, WEBP max 2MB</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <motion.button
            whileHover={{ borderColor: 'rgba(15,23,42,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="px-5 h-10 rounded-xl text-sm font-semibold text-[#0f172a] border"
            style={{ background: 'transparent', borderColor: 'rgba(15,23,42,0.2)', cursor: 'pointer' }}
          >
            Batal
          </motion.button>
          <motion.button
            whileHover={{ boxShadow: '0 0 20px rgba(74,16,99,0.7)', scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="px-5 h-10 rounded-xl text-sm font-bold text-[#1A1A1B]"
            style={{ background: '#FFE16F', cursor: 'pointer', border: 'none' }}
          >
            Simpan Produk
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Produk() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selected, setSelected] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 31;

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Semua' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const toggleSelect = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((p) => p.id));

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
      <Sidebar activePage="produk" />
      <Navbar />

      {/* Modal */}
      <AnimatePresence>
        {showModal && <TambahProdukModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <main className="ml-60" style={{ padding: '96px 40px 32px' }}>

        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#1A1A1B]">Produk</h1>
            <span
              className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(0,255,127,0.15)', color: '#1A1A1B' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
              Disinkron dari Moka
            </span>
          </div>
          <p className="text-[13px] mt-1" style={{ color: '#1A1A1B' }}>Kelola master data semua produk toko Anda</p>
        </div>

        {/* Bulk Action Bar */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex items-center justify-between rounded-full mt-5 sticky top-20 z-30"
              style={{
                padding: '0 20px',
                height: 52,
                background: '#FFE16F',
                boxShadow: '0 8px 24px rgba(245,224,74,0.35)',
              }}
            >
              <span className="text-sm font-bold" style={{ color: '#1A1A1B' }}>{selected.length} produk dipilih</span>
              <div className="flex items-center gap-2">
                <button className="px-4 h-9 rounded-lg text-sm font-bold border" style={{ background: 'transparent', borderColor: '#8B1A10', color: '#1A1A1B', cursor: 'pointer' }}>
                  Hapus
                </button>
                <button className="px-4 h-9 rounded-lg text-sm font-bold" style={{ background: 'rgba(0,0,0,0.15)', color: '#1A1A1B', border: 'none', cursor: 'pointer' }}>
                  Export
                </button>
                <button className="px-4 h-9 rounded-lg text-sm font-bold" style={{ background: 'rgba(0,0,0,0.15)', color: '#1A1A1B', border: 'none', cursor: 'pointer' }}>
                  Ubah Kategori
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bar */}
        <div className="flex items-center justify-between mt-5">
          {/* Search */}
          <div className="relative" style={{ width: 300 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama produk atau SKU..."
              className="w-full text-sm text-[#1A1A1B] placeholder-[#8A8A8A] rounded-[10px] border pr-4 transition-all focus:outline-none"
              style={{
                height: 40,
                paddingLeft: 38,
                background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(0, 0, 0, 0.08)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#98E2FD'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
            />
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]" />
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Filter size={15} />, label: 'Filter' },
              { icon: <Download size={15} />, label: 'Export' },
            ].map(({ icon, label }) => (
              <motion.button
                key={label}
                whileHover={{ borderColor: '#1A1A1B', color: '#1A1A1B' }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-4 text-sm text-[#1A1A1B] border rounded-[10px] transition-colors"
                style={{
                  height: 40,
                  background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  cursor: 'pointer',
                }}
              >
                {icon} {label}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ boxShadow: '0 0 20px rgba(74,16,99,0.6)', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 text-sm font-bold text-[#1A1A1B] rounded-[10px] border-0"
              style={{
                height: 40,
                background: '#FFE16F',
                cursor: 'pointer',
              }}
            >
              <Plus size={15} /> Tambah Produk
            </motion.button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <motion.button
                key={cat.label}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat.label)}
                className="px-4 text-xs font-semibold rounded-2xl border transition-all"
                style={{
                  height: 32,
                  background: isActive ? '#FFE16F' : 'transparent',
                  borderColor: isActive ? 'transparent' : 'rgba(0, 0, 0, 0.05)',
                  color: isActive ? '#1A1A1B' : '#8A8A8A',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = '#98E2FD'; e.currentTarget.style.color = '#1A1A1B'; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)'; e.currentTarget.style.color = '#8A8A8A'; } }}
              >
                {cat.label} ({cat.count})
              </motion.button>
            );
          })}
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-4 rounded-2xl border overflow-hidden"
          style={{
            background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Table Header */}
          <div
            className="grid items-center"
            style={{
              gridTemplateColumns: '44px 2fr 100px 110px 110px 110px 80px 110px 80px',
              padding: '14px 20px',
              background: '#f8fafc',
            }}
          >
            <input
              type="checkbox"
              checked={selected.length === filtered.length && filtered.length > 0}
              onChange={toggleAll}
              className="w-4 h-4 rounded cursor-pointer accent-purple-600"
            />
            {['PRODUK', 'SKU', 'KATEGORI', 'HARGA BELI', 'HARGA JUAL', 'MARGIN', 'STATUS', 'AKSI'].map((h) => (
              <span key={h} className="text-[11px] font-bold uppercase" style={{ color: '#1A1A1B', letterSpacing: '0.06em' }}>
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {filtered.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 + idx * 0.04 }}
              className="grid items-center border-t transition-colors"
              style={{
                gridTemplateColumns: '44px 2fr 100px 110px 110px 110px 80px 110px 80px',
                padding: '16px 20px',
                borderColor: 'rgba(0, 0, 0, 0.03)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selected.includes(p.id)}
                onChange={() => toggleSelect(p.id)}
                className="w-4 h-4 rounded cursor-pointer accent-purple-600"
              />

              {/* Product */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden"
                  style={{ background: 'rgba(0, 0, 0, 0.04)' }}
                >
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1A1A1B] leading-snug">{p.name}</p>
                  <p className="text-[11px]" style={{ color: '#1A1A1B' }}>{p.subcat}</p>
                </div>
              </div>

              {/* SKU */}
              <span className="text-[12px] font-mono" style={{ color: '#1A1A1B' }}>{p.sku}</span>

              {/* Category */}
              <span>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-2xl border"
                  style={{ borderColor: 'rgba(0,255,255,0.4)', color: '#1A1A1B', background: 'rgba(0,255,255,0.08)' }}
                >
                  {p.category}
                </span>
              </span>

              {/* Harga Beli */}
              <span className="text-[12px] text-[#1A1A1B]">{p.hargaBeli}</span>

              {/* Harga Jual */}
              <span className="text-[12px] text-[#1A1A1B]">{p.hargaJual}</span>

              {/* Margin */}
              <span className="text-[12px] font-bold" style={{ color: '#1A1A1B' }}>{p.margin}</span>

              {/* Status */}
              <span>
                {p.status === 'active' ? (
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(0,255,127,0.15)', color: '#1A1A1B' }}
                  >
                    Aktif
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,0,255,0.15)', color: '#1A1A1B' }}
                  >
                    <AlertTriangle size={10} />
                    Low Stock
                  </span>
                )}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ borderColor: '#1A1A1B', color: '#1A1A1B' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border text-[#1A1A1B] transition-colors"
                  style={{ background: '#f8fafc', borderColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer' }}
                >
                  <Edit2 size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ borderColor: '#E63220', color: '#1A1A1B' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border text-[#1A1A1B] transition-colors"
                  style={{ background: '#f8fafc', borderColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}

          {/* Pagination */}
          <div
            className="flex items-center justify-between border-t"
            style={{ padding: '14px 20px', borderColor: 'rgba(0, 0, 0, 0.03)' }}
          >
            <span className="text-[12px]" style={{ color: '#1A1A1B' }}>
              Menampilkan 1–8 dari 248 produk
            </span>

            <div className="flex items-center gap-1.5">
              <motion.button
                whileHover={{ borderColor: '#1A1A1B', color: '#1A1A1B' }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center border text-[#1A1A1B] text-xs transition-colors"
                style={{ background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)', borderColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer' }}
              >
                <ChevronLeft size={14} />
              </motion.button>

              {[1, 2, 3].map((n) => (
                <motion.button
                  key={n}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setCurrentPage(n)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-all"
                  style={{
                    background: currentPage === n ? 'linear-gradient(135deg, #FFE16F, #98E2FD)' : 'rgba(0, 0, 0, 0.03)',
                    borderColor: currentPage === n ? 'transparent' : 'rgba(0, 0, 0, 0.08)',
                    color: '#1A1A1B',
                    cursor: 'pointer',
                  }}
                >
                  {n}
                </motion.button>
              ))}

              <span className="text-xs px-1" style={{ color: '#1A1A1B' }}>...</span>

              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => setCurrentPage(totalPages)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border"
                style={{
                  background: currentPage === totalPages ? 'linear-gradient(135deg, #FFE16F, #98E2FD)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: currentPage === totalPages ? 'transparent' : 'rgba(0, 0, 0, 0.08)',
                  color: '#1A1A1B',
                  cursor: 'pointer',
                }}
              >
                {totalPages}
              </motion.button>

              <motion.button
                whileHover={{ borderColor: '#1A1A1B', color: '#1A1A1B' }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center border text-[#1A1A1B] text-xs transition-colors"
                style={{ background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)', borderColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer' }}
              >
                <ChevronRight size={14} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="h-10" />
      </main>
    </div>
  );
}
