import { motion } from 'motion/react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import KPICard from '../components/dashboard/KPICard';
import DemandChart from '../components/dashboard/DemandChart';
import StockStatusChart from '../components/dashboard/StockStatusChart';
import RecommendationTable from '../components/dashboard/RecommendationTable';
import { Package, DollarSign, AlertTriangle, TrendingUp, Recycle, Leaf, Droplets, Box } from 'lucide-react';

const esgMetrics = [
  {
    icon: <Recycle size={20} />,
    value: '12 pcs',
    label: 'Produk Terselamatkan',
    desc: 'Kadaluarsa dicegah AI bulan ini',
    color: '#1A1A1B',
    bg: 'rgba(0,255,127,0.1)',
    border: 'rgba(0,255,127,0.25)',
  },
  {
    icon: <Leaf size={20} />,
    value: '8.5 kg',
    label: 'CO₂ Dikurangi',
    desc: 'Dari optimasi frekuensi order',
    color: '#1A1A1B',
    bg: 'rgba(0,255,255,0.08)',
    border: 'rgba(0,255,255,0.2)',
  },
  {
    icon: <Droplets size={20} />,
    value: '340 L',
    label: 'Air Dihemat',
    desc: 'Produksi barang terbuang dihindari',
    color: '#1A1A1B',
    bg: 'rgba(79,195,247,0.08)',
    border: 'rgba(79,195,247,0.2)',
  },
  {
    icon: <Box size={20} />,
    value: 'Rp 2.1 Jt',
    label: 'Nilai Pemborosan Ditekan',
    desc: 'Overstock + kadaluarsa bulan ini',
    color: '#1A1A1B',
    bg: 'rgba(255,215,0,0.08)',
    border: 'rgba(255,215,0,0.2)',
  },
];


export default function Dashboard() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}
    >
      <Sidebar activePage="dashboard" />
      <Navbar />

      {/* Main Content */}
      <main className="ml-60" style={{ padding: "96px 40px 32px" }}>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <KPICard
            icon={<Package size={28} />}
            iconBg="rgba(255, 225, 111, 0.3)"
            bg="rgba(255, 225, 111, 0.08)"
            borderColor="rgba(255, 225, 111, 0.3)"
            label="Total Produk"
            value="1.248"
            subtitle="+23 produk baru"
          />
          <KPICard
            icon={<DollarSign size={28} />}
            iconBg="rgba(152, 226, 253, 0.35)"
            bg="rgba(152, 226, 253, 0.08)"
            borderColor="rgba(152, 226, 253, 0.3)"
            label="Nilai Stok"
            value="Rp 48.25M"
            subtitle="Total inventory"
          />
          <KPICard
            icon={<AlertTriangle size={28} />}
            iconBg="rgba(255, 107, 107, 0.25)"
            bg="rgba(255, 107, 107, 0.07)"
            borderColor="rgba(255, 107, 107, 0.25)"
            label="Prediksi Stockout"
            value="23 Produk"
            subtitle="⚠ Peringatan"
          />
          <KPICard
            icon={<TrendingUp size={28} />}
            iconBg="rgba(209, 240, 123, 0.4)"
            bg="rgba(209, 240, 123, 0.1)"
            borderColor="rgba(209, 240, 123, 0.35)"
            label="Overstock"
            value="17 Produk"
            subtitle="Perlu dioptimalkan"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          <DemandChart />
          <StockStatusChart />
        </div>

        {/* Recommendation Table */}
        <div className="mb-10">
          <RecommendationTable />
        </div>

        {/* Bottom Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 border"
            style={{
              background: 'rgba(255, 225, 111, 0.08)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 225, 111, 0.3)'
            }}
          >
            <p className="text-[10px] text-[#4B5563] uppercase mb-2">
              Penjualan Bulan Ini
            </p>
            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-1">Rp 2.45M</h3>
            <p className="text-xs text-[#4B5563]">Estimasi dari rata-rata penjualan harian</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-6 border"
            style={{
              background: 'rgba(209, 240, 123, 0.1)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(209, 240, 123, 0.35)'
            }}
          >
            <p className="text-[10px] text-[#4B5563] uppercase mb-2">
              Laba Kotor
            </p>
            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-1">Rp 980K</h3>
            <p className="text-xs text-[#4B5563]">Estimasi laba kotor bulanan</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6 border"
            style={{
              background: 'rgba(152, 226, 253, 0.08)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(152, 226, 253, 0.3)'
            }}
          >
            <p className="text-[10px] text-[#4B5563] uppercase mb-2">
              Gross Margin
            </p>
            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-1">40%</h3>
            <p className="text-xs text-[#4B5563]">Rata-rata margin tertimbang</p>
          </motion.div>
        </div>
        {/* ─── Sustainability Widget ─────────────────────────────────────── */}
        <SustainabilityWidget />
      </main>
    </div>
  );
}

function SustainabilityWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border overflow-hidden"
      style={{
        background: 'rgba(0,255,127,0.04)',
        backdropFilter: 'blur(16px)',
        borderColor: 'rgba(0,255,127,0.2)',
        boxShadow: '0 0 48px rgba(0,255,127,0.06)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-7 py-5 border-b"
        style={{ borderColor: 'rgba(0,255,127,0.15)' }}
      >
        <Leaf size={20} color="#22C55E" />
        <div>
          <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-widest">
            Sustainability Score
          </h3>
          <p className="text-[11px] text-[#4B5563] mt-0.5">
            Dampak lingkungan dari operasional toko bulan ini
          </p>
        </div>
        <span
          className="ml-2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: 'rgba(0,255,127,0.15)',
            color: '#1A1A1B',
            border: '1px solid rgba(0,255,127,0.35)',
          }}
        >
          ESG Ready
        </span>
      </div>

      {/* Body */}
      <div className="p-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {esgMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl p-5 border flex flex-col gap-2"
              style={{ background: m.bg, borderColor: m.border }}
            >
              <span className="text-2xl">{m.icon}</span>
              <p className="text-xl font-bold" style={{ color: m.color }}>
                {m.value}
              </p>
              <div>
                <p className="text-xs font-semibold text-[#0f172a] leading-tight">
                  {m.label}
                </p>
                <p className="text-[10px] text-[#4B5563] mt-0.5 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ESG Score Bar */}
        <div className="mt-6 flex items-center gap-5">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] text-[#4B5563] uppercase tracking-wider">ESG Score Toko Berkah</span>
              <span className="text-xs font-bold" style={{ color: '#1A1A1B' }}>78 / 100</span>
            </div>
            <div className="h-2.5 rounded-2xl overflow-hidden" style={{ background: 'rgba(0, 0, 0, 0.04)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #D1F07B, #98E2FD)' }}
              />
            </div>
          </div>
          <div
            className="px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(0,255,127,0.15)', color: '#1A1A1B', border: '1px solid rgba(0,255,127,0.3)' }}
          >
            ↑ +6 poin dari bulan lalu
          </div>
        </div>
      </div>
    </motion.div>
  );
}
