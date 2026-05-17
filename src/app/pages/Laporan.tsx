import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { FileDown, Calendar, TrendingUp, TrendingDown, Wallet, Leaf } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend, ReferenceLine,
} from 'recharts';

const salesTrendData = [
  { week: 'Week 1', value: 1800000 },
  { week: 'Week 2', value: 2200000 },
  { week: 'Week 3', value: 1900000 },
  { week: 'Week 4', value: 2450000 },
  { week: 'Week 5', value: 2100000 }
];

const topProductsData = [
  { name: 'Beras Premium', qty: 850 },
  { name: 'Minyak Goreng', qty: 720 },
  { name: 'Gula Pasir', qty: 680 },
  { name: 'Teh Kotak', qty: 540 },
  { name: 'Indomie', qty: 520 },
  { name: 'Aqua 600ml', qty: 480 },
  { name: 'Kopi ABC', qty: 420 },
  { name: 'Chitato', qty: 380 },
  { name: 'Susu Ultra', qty: 320 },
  { name: 'Roti Tawar', qty: 280 }
];

const categoryData = [
  { name: 'Sembako', value: 45, color: '#F5C897' },
  { name: 'Minuman', value: 25, color: '#00FFFF' },
  { name: 'Snack', value: 20, color: '#F5E04A' },
  { name: 'Lainnya', value: 10, color: '#888888' }
];

// ─── Cash Flow Impact Data ────────────────────────────────────────────────────

const cashFlowTrendData = [
  { month: 'Des\'23', sebelum: 28.5,  sesudah: 28.5,  label: 'Mulai pakai RestockAI' },
  { month: 'Jan\'24', sebelum: 26.2,  sesudah: 29.8  },
  { month: 'Feb\'24', sebelum: 24.8,  sesudah: 32.1  },
  { month: 'Mar\'24', sebelum: 25.1,  sesudah: 34.7  },
  { month: 'Apr\'24', sebelum: 23.9,  sesudah: 37.2  },
  { month: 'Mei\'24', sebelum: 24.3,  sesudah: 41.8  },
];

const breakdownItems = [
  {
    id: 'b1',
    label: 'Modal Bebas dari Overstock',
    desc: '17 produk overstock dioptimasi AI',
    value: 8_400_000,
    pct: 60,
    color: '#00FF7F',
    bg: 'rgba(0,255,127,0.12)',
    icon: '📦',
  },
  {
    id: 'b2',
    label: 'Pendapatan Diselamatkan (Stockout)',
    desc: '23 potensi stockout dicegah bulan ini',
    value: 3_200_000,
    pct: 23,
    color: '#00FFFF',
    bg: 'rgba(0,255,255,0.1)',
    icon: '🛒',
  },
  {
    id: 'b3',
    label: 'Penghematan dari Supplier Terbaik',
    desc: 'GudangAda 18% lebih murah vs sebelumnya',
    value: 2_340_000,
    pct: 17,
    color: '#FFD700',
    bg: 'rgba(255,215,0,0.1)',
    icon: '🏪',
  },
];

const TOTAL_IMPACT = breakdownItems.reduce((s, b) => s + b.value, 0);

export default function Laporan() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(180deg, #0F0F0F 0%, #1a0f2e 100%)'
      }}
    >
      <Sidebar activePage="laporan" />
      <Navbar />

      {/* Main Content */}
      <main className="ml-60" style={{ padding: "96px 40px 32px" }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">LAPORAN & ANALYTICS</h1>

          <div className="flex items-center gap-3">
            {/* Date Range Picker */}
            <div
              className="px-4 h-11 rounded-full border flex items-center gap-2 text-sm text-[#E8E8E8] cursor-pointer transition-all hover:border-cyan-400"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <Calendar size={16} />
              <span>01 Mei 2024 - 31 Mei 2024</span>
            </div>

            {/* Export Buttons */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:border-cyan-400"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              title="Export PDF"
            >
              <FileDown size={18} className="text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:border-cyan-400"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              title="Export Excel"
            >
              <span className="text-lg">📊</span>
            </motion.button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Metric 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 border"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <p className="text-[10px] text-[#E8E8E8] uppercase mb-2">
              Penjualan Bulan Ini
            </p>
            <h3 className="text-2xl font-bold text-white mb-1">Rp 2.45M</h3>
            <p className="text-xs text-[#00FF7F]">↑ 12.4%</p>
          </motion.div>

          {/* Metric 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-6 border"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <p className="text-[10px] text-[#E8E8E8] uppercase mb-2">
              Produk Terlaris
            </p>
            <h3 className="text-xl font-bold text-white mb-1">
              Beras Premium 🏆
            </h3>
            <p className="text-xs text-[#E8E8E8]">850 pcs</p>
          </motion.div>

          {/* Metric 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 border"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <p className="text-[10px] text-[#E8E8E8] uppercase mb-2">
              Perputaran Inventori
            </p>
            <h3 className="text-2xl font-bold text-white mb-1">4.6x 🔄</h3>
            <p className="text-xs text-[#E8E8E8]">Inventory turnover</p>
          </motion.div>

          {/* Metric 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-6 border"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <p className="text-[10px] text-[#E8E8E8] uppercase mb-2">
              Limbah Dicegah
            </p>
            <h3 className="text-2xl font-bold text-[#00FF7F] mb-1">12 pcs ♻️</h3>
            <p className="text-xs text-[#E8E8E8]">Produk kadaluarsa</p>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-7 border"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <h3 className="text-sm font-bold text-white uppercase mb-6">
              Penjualan Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesTrendData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A1063" />
                    <stop offset="100%" stopColor="#8B4BBE" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis dataKey="week" stroke="#E8E8E8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#E8E8E8" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => `Rp ${(value / 1000000).toFixed(2)}M`}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Products Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-7 border"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <h3 className="text-sm font-bold text-white uppercase mb-6">
              Top 10 Produk Terlaris
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProductsData} layout="vertical">
                <defs>
                  <linearGradient id="productBarGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F5C897" />
                    <stop offset="100%" stopColor="#FFE5B4" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis type="number" stroke="#E8E8E8" style={{ fontSize: '12px' }} />
                <YAxis dataKey="name" type="category" stroke="#E8E8E8" style={{ fontSize: '11px' }} width={100} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => `${value} pcs`}
                />
                <Bar dataKey="qty" fill="url(#productBarGradient)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl p-7 border"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <h3 className="text-sm font-bold text-white uppercase mb-6">
              Kategori Terlaris
            </h3>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-3 mt-4 w-full">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span className="text-xs text-[#E8E8E8]">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sustainability Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl p-7 border"
            style={{
              background: 'rgba(0, 255, 127, 0.08)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(0, 255, 127, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 255, 127, 0.1)'
            }}
          >
            <h3 className="text-sm font-bold text-white mb-6">
              📊 DAMPAK SUSTAINABILITY
            </h3>

            <div className="space-y-6">
              {/* Metric 1 */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-bold text-[#00FF7F] mb-1">
                    12 pcs
                  </h4>
                  <p className="text-xs text-[#E8E8E8] leading-relaxed">
                    Produk kadaluarsa yang dihindari
                  </p>
                </div>
                <span className="text-xl">♻️</span>
              </div>

              {/* Metric 2 */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-bold text-[#00FF7F] mb-1">
                    8.5 kg CO2
                  </h4>
                  <p className="text-xs text-[#E8E8E8] leading-relaxed">
                    Pengurangan emisi logistik
                  </p>
                </div>
                <span className="text-xl">🌱</span>
              </div>

              {/* Metric 3 */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-bold text-[#00FF7F] mb-1">
                    60% lebih cepat
                  </h4>
                  <p className="text-xs text-[#E8E8E8] leading-relaxed">
                    Dibanding manual inventory check
                  </p>
                </div>
                <span className="text-xl">⚡</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Dampak ke Arus Kas ─────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mt-6"
        >
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-5">
            <Wallet size={18} className="text-[#00FF7F]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">
              Dampak ke Arus Kas
            </h2>
            <span
              className="px-3 py-0.5 rounded-full text-[11px] font-bold"
              style={{
                background: 'rgba(0,255,127,0.15)',
                color: '#00FF7F',
                border: '1px solid rgba(0,255,127,0.35)',
              }}
            >
              ✓ Cost-Efficient Value Proposition
            </span>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {/* Modal Tertahan */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: 'rgba(0,255,127,0.07)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(0,255,127,0.25)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={14} style={{ color: '#00FF7F' }} />
                <p className="text-[10px] uppercase text-[#E8E8E8] tracking-wider">Modal Tertahan (Overstock)</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#00FF7F' }}>
                Rp 8,4 Jt
              </p>
              <p className="text-[11px] text-[#E8E8E8] mt-1">dibebaskan bulan ini</p>
            </div>

            {/* Kehilangan Stockout */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: 'rgba(0,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(0,255,255,0.25)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} style={{ color: '#00FFFF' }} />
                <p className="text-[10px] uppercase text-[#E8E8E8] tracking-wider">Kehilangan Stockout</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#00FFFF' }}>
                Rp 3,2 Jt
              </p>
              <p className="text-[11px] text-[#E8E8E8] mt-1">pendapatan diselamatkan</p>
            </div>

            {/* Penghematan Supplier */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: 'rgba(255,215,0,0.07)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,215,0,0.25)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Leaf size={14} style={{ color: '#FFD700' }} />
                <p className="text-[10px] uppercase text-[#E8E8E8] tracking-wider">Penghematan Supplier</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>
                Rp 2,34 Jt
              </p>
              <p className="text-[11px] text-[#E8E8E8] mt-1">vs harga supplier lama</p>
            </div>

            {/* Total Net Impact */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: 'linear-gradient(135deg, rgba(74,16,99,0.5), rgba(139,75,190,0.3))',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(139,75,190,0.5)',
                boxShadow: '0 0 24px rgba(139,75,190,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} style={{ color: '#FF00FF' }} />
                <p className="text-[10px] uppercase text-[#E8E8E8] tracking-wider">Total Net Impact</p>
              </div>
              <p className="text-2xl font-bold text-white">
                Rp {(TOTAL_IMPACT / 1_000_000).toFixed(2)} Jt
              </p>
              <p className="text-[11px] mt-1" style={{ color: '#FF00FF' }}>
                +46.8% arus kas vs Des'23
              </p>
            </div>
          </div>

          {/* Chart + Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Before / After Line Chart */}
            <div
              className="lg:col-span-3 rounded-2xl p-6 border"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.12)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Tren Arus Kas Bebas (Juta Rp)
                </h4>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5 text-[#888]">
                    <span className="inline-block w-5 h-0.5 bg-[#888] rounded" />
                    Sebelum RestockAI
                  </span>
                  <span className="flex items-center gap-1.5 text-[#00FF7F]">
                    <span className="inline-block w-5 h-0.5 bg-[#00FF7F] rounded" />
                    Sesudah RestockAI
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={cashFlowTrendData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" stroke="#888" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#888" tick={{ fontSize: 11 }} domain={[20, 45]} unit=" Jt" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15,15,15,0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: 12,
                    }}
                    formatter={(val: number) => [`Rp ${val} Jt`, undefined]}
                  />
                  <ReferenceLine x="Des'23" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" label={{ value: 'Mulai', fill: '#aaa', fontSize: 10 }} />
                  <Line
                    type="monotone"
                    dataKey="sebelum"
                    stroke="#555"
                    strokeWidth={2}
                    dot={{ fill: '#555', r: 3 }}
                    strokeDasharray="5 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="sesudah"
                    stroke="#00FF7F"
                    strokeWidth={2.5}
                    dot={{ fill: '#00FF7F', r: 4 }}
                    activeDot={{ r: 6, stroke: '#00FF7F', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown Bars */}
            <div
              className="lg:col-span-2 rounded-2xl p-6 border"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.12)',
              }}
            >
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5">
                Rincian Dampak
              </h4>

              <div className="space-y-5">
                {breakdownItems.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-end mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.icon}</span>
                        <div>
                          <p className="text-[11px] font-semibold text-white leading-tight">{item.label}</p>
                          <p className="text-[10px] text-[#888] mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className="text-sm font-bold" style={{ color: item.color }}>
                          Rp {(item.value / 1_000_000).toFixed(1)}Jt
                        </p>
                        <p className="text-[10px] text-[#888]">{item.pct}%</p>
                      </div>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.08)' }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div
                className="mt-6 pt-4 border-t flex justify-between items-center"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <span className="text-xs text-[#E8E8E8] uppercase tracking-wider">Total</span>
                <span className="text-base font-bold text-white">
                  Rp {(TOTAL_IMPACT / 1_000_000).toFixed(2)} Jt
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
