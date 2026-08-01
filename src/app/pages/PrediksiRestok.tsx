import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { Search, FolderOpen, RotateCcw } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  stockPercent: number;
  prediction: string;
  recommendation: string;
  supplier: string;
  price: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

const products: Product[] = [
  {
    id: '1',
    name: 'Beras Premium 5kg',
    sku: 'BRS-001',
    stock: 12,
    stockPercent: 20,
    prediction: '3 hari lagi',
    recommendation: '50 pcs',
    supplier: 'GudangAda',
    price: 'Rp 185K',
    category: 'Sembako',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Minyak Goreng 2L',
    sku: 'MYK-002',
    stock: 5,
    stockPercent: 10,
    prediction: '2 hari lagi',
    recommendation: '30 pcs',
    supplier: 'Mitra Toko',
    price: 'Rp 42K',
    category: 'Sembako',
    priority: 'high'
  },
  {
    id: '3',
    name: 'Gula Pasir 1kg',
    sku: 'GUL-003',
    stock: 3,
    stockPercent: 5,
    prediction: '1 hari lagi',
    recommendation: '20 pcs',
    supplier: 'GudangAda',
    price: 'Rp 18K',
    category: 'Sembako',
    priority: 'high'
  },
  {
    id: '4',
    name: 'Teh Kotak 250ml',
    sku: 'TEH-004',
    stock: 48,
    stockPercent: 60,
    prediction: '7 hari lagi',
    recommendation: '24 pcs',
    supplier: 'Mitra Toko',
    price: 'Rp 5K',
    category: 'Minuman',
    priority: 'medium'
  },
  {
    id: '5',
    name: 'Indomie Goreng',
    sku: 'MIE-005',
    stock: 120,
    stockPercent: 80,
    prediction: '12 hari lagi',
    recommendation: '100 pcs',
    supplier: 'GudangAda',
    price: 'Rp 3.5K',
    category: 'Sembako',
    priority: 'low'
  }
];

export default function PrediksiRestok() {
  const [activeTab, setActiveTab] = useState('semua');
  const [category, setCategory] = useState('semua');
  const [supplier, setSupplier] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const getStockColor = (percent: number) => {
    if (percent <= 10) return '#ef4444';
    if (percent <= 30) return '#f59e0b';
    return '#10b981';
  };

  const getStockGradient = (percent: number) => {
    if (percent <= 10) return 'linear-gradient(90deg, #ef4444, #dc2626)';
    if (percent <= 30) return 'linear-gradient(90deg, #f59e0b, #FFA500)';
    return 'linear-gradient(90deg, #10b981, #4f46e5)';
  };

  const tabs = [
    { id: 'semua', label: 'Semua Produk' },
    { id: 'hampir-habis', label: 'Hampir Habis' },
    { id: 'overstock', label: 'Overstock' },
    { id: 'prioritas', label: 'Prioritas Tinggi' }
  ];

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}
    >
      <Sidebar activePage="prediksi" />
      <Navbar />

      {/* Main Content */}
      <main className="ml-60" style={{ padding: "96px 40px 32px" }}>
        {/* Header */}
        <div
          className="rounded-2xl p-5 mb-6 flex items-center justify-between"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 225, 111, 0.5), rgba(152, 226, 253, 0.5))',
          }}
        >
          <h1 className="text-xl font-bold text-[#1A1A1B]">
            PREDIKSI RESTOK BERBASIS AI
          </h1>
          <div
            className="px-4 py-2 rounded-full text-xs font-bold text-[#1A1A1B]"
            style={{
              background: '#FFE16F',
              boxShadow: '0 4px 16px rgba(255, 225, 111, 0.4)'
            }}
          >
            AI-Powered
          </div>
        </div>

        {/* Filter Bar */}
        <div
          className="rounded-2xl p-4 mb-4 flex flex-wrap gap-5 items-center"
          style={{
            background: 'rgba(0, 0, 0, 0.02)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Category Filter */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-[#4B5563] mb-2">
              <FolderOpen size={12} />
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-[200px] h-10 px-3 rounded-2xl border text-sm text-[#4B5563] transition-all focus:outline-none focus:border-cyan-400"
              style={{
                background: 'rgba(0, 0, 0, 0.03)',
                borderColor: 'rgba(0, 0, 0, 0.1)'
              }}
            >
              <option value="semua">Semua</option>
              <option value="sembako">Sembako</option>
              <option value="minuman">Minuman</option>
              <option value="snack">Snack</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          <div className="h-10 w-px bg-white/10" />

          {/* Supplier Filter */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-[#4B5563] mb-2">
               Supplier
            </label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-[200px] h-10 px-3 rounded-2xl border text-sm text-[#4B5563] transition-all focus:outline-none focus:border-cyan-400"
              style={{
                background: 'rgba(0, 0, 0, 0.03)',
                borderColor: 'rgba(0, 0, 0, 0.1)'
              }}
            >
              <option value="semua">Semua</option>
              <option value="gudangada">GudangAda</option>
              <option value="mitra-toko">Mitra Toko</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          <div className="h-10 w-px bg-white/10" />

          {/* Search */}
          <div className="flex-1">
            <label className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-[#4B5563] mb-2">
              <Search size={12} />
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama produk..."
                className="w-full h-10 pl-10 pr-4 rounded-2xl border text-sm text-[#4B5563] placeholder-[#94a3b8] transition-all focus:outline-none focus:border-cyan-400"
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }}
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B5563]" />
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setCategory('semua');
              setSupplier('semua');
              setSearchQuery('');
            }}
            className="flex items-center gap-1 text-sm text-[#1A1A1B] hover:underline transition-all self-end mb-2"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-5 border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm font-bold transition-all ${
                activeTab === tab.id ? 'text-[#1A1A1B]' : 'text-[#4B5563]'
              }`}
              style={{
                borderBottom: activeTab === tab.id ? '3px solid #D1F07B' : '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderBottom = '2px solid rgba(0, 255, 255, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderBottom = '2px solid transparent';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Table */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className="text-[11px] font-bold text-[#475569] uppercase border-b"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <th className="text-left py-4 px-4">Produk</th>
                      <th className="text-left py-4 px-4">Stok Saat Ini</th>
                      <th className="text-left py-4 px-4">Prediksi Habis</th>
                      <th className="text-left py-4 px-4">Rekomendasi</th>
                      <th className="text-left py-4 px-4">Supplier</th>
                      <th className="text-left py-4 px-4">Harga</th>
                      <th className="text-left py-4 px-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b transition-all cursor-pointer"
                        style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                        whileHover={{
                          backgroundColor: 'rgba(255, 255, 255, 0.06)'
                        }}
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm font-bold text-[#0f172a]">{product.name}</p>
                            <p className="text-xs text-gray-500">({product.sku})</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm text-[#0f172a] mb-1">{product.stock} pcs</p>
                            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${product.stockPercent}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="h-full rounded-full"
                                style={{
                                  background: getStockGradient(product.stockPercent)
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className="text-sm font-bold"
                            style={{ color: product.stockPercent <= 20 ? '#ef4444' : '#475569' }}
                          >
                            {product.prediction}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-bold text-[#0f172a]">
                            {product.recommendation}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-cyan-400 hover:underline cursor-pointer">
                            {product.supplier}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-[#0f172a]">{product.price}</span>
                        </td>
                        <td className="py-4 px-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg text-xs font-bold text-[#1A1A1B]"
                            style={{
                              background: '#FFE16F',
                              boxShadow: '0 2px 8px rgba(255, 225, 111, 0.3)'
                            }}
                          >
                            Buat PO
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* AI Insight Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl p-6 sticky top-24"
              style={{
                background: 'rgba(0, 255, 127, 0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0, 255, 127, 0.3)'
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-bold text-[#0f172a]">💡 AI INSIGHT</h3>
                <span className="text-xl">🚀</span>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed mb-4">
                Permintaan beras diprediksi meningkat 30% dalam 2 minggu ke depan karena musim lebaran. Rekomendasi: tingkatkan stok 40% dari usual.
              </p>

              {/* Sparkline */}
              <div className="h-16 mt-4 relative">
                <svg width="100%" height="100%" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparklineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 0 50 Q 50 40, 100 30 T 200 10"
                    fill="none"
                    stroke="url(#sparklineGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              {/* Additional Insights */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#475569]">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>Akurasi prediksi: 94%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#475569]">
                  <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  <span>Confidence level: High</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#475569]">
                  <div className="w-2 h-2 rounded-full bg-[#4f46e5]" />
                  <span>Last updated: 2 jam lalu</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
