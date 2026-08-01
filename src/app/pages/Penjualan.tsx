import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { Download, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Calendar, Receipt, Package, DollarSign, Smartphone, Landmark, Banknote, CreditCard } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, defs, linearGradient, stop,
} from 'recharts';

// ─── Data ────────────────────────────────────────────────────────────────────

const summaryCards = [
  { icon: <Calendar size={20} color="#F59E0B" />, bg: 'rgba(255,215,0,0.15)',    label: 'HARI INI',        value: 'Rp 2.45M',  sub: '↑ 12.4% vs kemarin' },
  { icon: <Receipt size={20} color="#06B6D4" />, bg: 'rgba(0,255,255,0.15)',    label: 'TRANSAKSI',       value: '84',         sub: '↑ 8 transaksi vs kemarin' },
  { icon: <Package size={20} color="#0EA5E9" />, bg: 'rgba(152, 226, 253,0.2)',    label: 'PRODUK TERJUAL',  value: '312 pcs',    sub: 'dari 48 SKU berbeda' },
  { icon: <DollarSign size={20} color="#10B981" />, bg: 'rgba(0,255,127,0.15)',    label: 'AVG TRANSAKSI',   value: 'Rp 29.2K',  sub: 'Per transaksi hari ini' },
];

type TxStatus = 'lunas' | 'pending' | 'refund';

interface Transaction {
  id: string;
  no: number;
  datetime: string;
  time: string;
  txid: string;
  produk: string;
  qty: string;
  harga: string;
  total: string;
  sumber: string;
  status: TxStatus;
  payment: string;
  notes: string;
}

const transactions: Transaction[] = [
  { id: 't1',  no: 1,  datetime: '31 Mei 2024', time: '14:32', txid: 'TRX-20240531-001', produk: 'Beras Premium 5kg',  qty: '3 pcs',  harga: 'Rp 55.000', total: 'Rp 165.000', sumber: 'Moka POS', status: 'lunas',   payment: 'QRIS',     notes: '' },
  { id: 't2',  no: 2,  datetime: '31 Mei 2024', time: '14:28', txid: 'TRX-20240531-002', produk: 'Minyak Goreng 2L',   qty: '2 pcs',  harga: 'Rp 45.000', total: 'Rp 90.000',  sumber: 'Moka POS', status: 'lunas',   payment: 'Transfer', notes: '' },
  { id: 't3',  no: 3,  datetime: '31 Mei 2024', time: '14:15', txid: 'TRX-20240531-003', produk: 'Kopi Sachet 10x',    qty: '5 pcs',  harga: 'Rp 20.000', total: 'Rp 100.000', sumber: 'Manual',   status: 'lunas',   payment: 'Tunai',    notes: 'Pelanggan langganan' },
  { id: 't4',  no: 4,  datetime: '31 Mei 2024', time: '13:55', txid: 'TRX-20240531-004', produk: 'Gula Pasir 1kg',     qty: '4 pcs',  harga: 'Rp 14.000', total: 'Rp 56.000',  sumber: 'Majoo',    status: 'pending', payment: 'Transfer', notes: 'Menunggu konfirmasi bank' },
  { id: 't5',  no: 5,  datetime: '31 Mei 2024', time: '13:40', txid: 'TRX-20240531-005', produk: 'Teh Celup 25s',      qty: '10 pcs', harga: 'Rp 12.000', total: 'Rp 120.000', sumber: 'Moka POS', status: 'lunas',   payment: 'QRIS',     notes: '' },
  { id: 't6',  no: 6,  datetime: '31 Mei 2024', time: '13:21', txid: 'TRX-20240531-006', produk: 'Aqua 600ml',         qty: '12 pcs', harga: 'Rp 4.000',  total: 'Rp 48.000',  sumber: 'Manual',   status: 'lunas',   payment: 'Tunai',    notes: '' },
  { id: 't7',  no: 7,  datetime: '31 Mei 2024', time: '12:58', txid: 'TRX-20240531-007', produk: 'Indomie Goreng',     qty: '8 pcs',  harga: 'Rp 4.500',  total: 'Rp 36.000',  sumber: 'Moka POS', status: 'lunas',   payment: 'Tunai',    notes: '' },
  { id: 't8',  no: 8,  datetime: '31 Mei 2024', time: '12:44', txid: 'TRX-20240531-008', produk: 'Rinso 900g',         qty: '2 pcs',  harga: 'Rp 28.000', total: 'Rp 56.000',  sumber: 'Majoo',    status: 'refund',  payment: 'Transfer', notes: 'Produk rusak saat diterima' },
  { id: 't9',  no: 9,  datetime: '31 Mei 2024', time: '12:30', txid: 'TRX-20240531-009', produk: 'Kopi Sachet 10x',    qty: '3 pcs',  harga: 'Rp 20.000', total: 'Rp 60.000',  sumber: 'Moka POS', status: 'lunas',   payment: 'QRIS',     notes: '' },
  { id: 't10', no: 10, datetime: '31 Mei 2024', time: '11:55', txid: 'TRX-20240531-010', produk: 'Beras Premium 5kg',  qty: '5 pcs',  harga: 'Rp 55.000', total: 'Rp 275.000', sumber: 'Moka POS', status: 'lunas',   payment: 'Transfer', notes: '' },
];

const chartData = [
  { day: '01/05', value: 1200000 }, { day: '05/05', value: 1850000 },
  { day: '08/05', value: 1450000 }, { day: '10/05', value: 2100000 },
  { day: '12/05', value: 1750000 }, { day: '15/05', value: 2300000 },
  { day: '17/05', value: 1900000 }, { day: '19/05', value: 2150000 },
  { day: '21/05', value: 1650000 }, { day: '23/05', value: 2400000 },
  { day: '25/05', value: 2050000 }, { day: '27/05', value: 1800000 },
  { day: '29/05', value: 2250000 }, { day: '31/05', value: 2450000 },
];

const DATE_TABS = ['Hari Ini', '7 Hari', '30 Hari', 'Custom'];

const STATUS_CONFIG: Record<TxStatus, { label: string; bg: string }> = {
  lunas:   { label: 'Lunas',   bg: 'rgba(0,255,127,0.15)' },
  pending: { label: 'Pending', bg: 'rgba(255,215,0,0.15)' },
  refund:  { label: 'Refund',  bg: 'rgba(231,50,32,0.15)' },
};

const PAYMENT_ICON: Record<string, typeof Smartphone> = { QRIS: Smartphone, Transfer: Landmark, Tunai: Banknote };

function formatRp(v: number) {
  if (v >= 1_000_000) return `Rp ${(v / 1_000_000).toFixed(2)}M`;
  return `Rp ${(v / 1000).toFixed(0)}K`;
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: {value: number}[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border px-3 py-2 text-xs" style={{ background: '#ffffff', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', borderColor: 'rgba(0, 0, 0, 0.08)', color: '#1A1A1B' }}>
      <p className="font-bold mb-1">{label}</p>
      <p style={{ color: '#1A1A1B' }}>{formatRp(payload[0].value)}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Penjualan() {
  const [activeTab, setActiveTab] = useState('Hari Ini');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 28;

  const toggleRow = (id: string) => setExpandedRow((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen w-full" style={{ background: '#f8fafc' }}>
      <Sidebar activePage="penjualan" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 32px' }}>

        {/* ── Header ── */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#1A1A1B]">Penjualan</h1>
            <span
              className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(0,255,127,0.15)', color: '#1A1A1B' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
              Disinkron dari Moka
            </span>
          </div>
          <p className="text-[13px] mt-1" style={{ color: '#1A1A1B' }}>Riwayat transaksi penjualan dari sistem POS</p>
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {summaryCards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="rounded-2xl border p-5"
              style={{
                background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ background: c.bg }}>
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase font-bold mb-1" style={{ color: '#1A1A1B', letterSpacing: '0.06em' }}>{c.label}</p>
                  <p className="text-2xl font-bold text-[#1A1A1B] leading-none mb-1">{c.value}</p>
                  <p className="text-[12px]" style={{ color: '#1A1A1B' }}>{c.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Filter & Date Bar ── */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            {/* Date pill */}
            <div
              className="px-4 h-9 rounded-2xl border flex items-center text-[12px] text-[#1A1A1B] gap-2 cursor-pointer"
              style={{
                background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                backdropFilter: 'blur(10px)',
                borderColor: 'rgba(0, 0, 0, 0.08)',
              }}
            >
              <Calendar size={14} />
              01 Mei 2024 — 31 Mei 2024
            </div>

            {/* Tab chips */}
            <div className="flex items-center gap-1.5">
              {DATE_TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <motion.button
                    key={tab}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab)}
                    className="px-3 text-xs font-semibold rounded-2xl border transition-all"
                    style={{
                      height: 32,
                      background: isActive ? 'linear-gradient(135deg, #FFE16F, #98E2FD)' : 'transparent',
                      borderColor: isActive ? 'transparent' : 'rgba(0, 0, 0, 0.08)',
                      color: '#1A1A1B',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = '#98E2FD'; e.currentTarget.style.color = '#1A1A1B'; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; e.currentTarget.style.color = '#1A1A1B'; } }}
                  >
                    {tab}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Export buttons */}
          <div className="flex items-center gap-2">
            {['Export CSV', 'Export PDF'].map((label) => (
              <motion.button
                key={label}
                whileHover={{ borderColor: '#1A1A1B', color: '#1A1A1B' }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-3 text-xs text-[#1A1A1B] border rounded-lg transition-colors"
                style={{
                  height: 36,
                  background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  cursor: 'pointer',
                }}
              >
                <Download size={13} /> {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Sales Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4 rounded-2xl border overflow-hidden"
          style={{
            background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Header */}
          <div
            className="grid items-center text-[11px] font-bold uppercase"
            style={{
              gridTemplateColumns: '40px 130px 160px 1fr 70px 110px 110px 110px 90px',
              padding: '14px 20px',
              background: '#f8fafc',
              color: '#1A1A1B',
              letterSpacing: '0.06em',
            }}
          >
            {['No.', 'Tgl & Waktu', 'ID Transaksi', 'Produk', 'Qty', 'Harga Satuan', 'Total', 'Sumber', 'Status'].map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {transactions.map((tx, idx) => {
            const isExpanded = expandedRow === tx.id;
            const dimmed = tx.status === 'refund';
            const st = STATUS_CONFIG[tx.status];

            return (
              <div key={tx.id}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 + idx * 0.03 }}
                  onClick={() => toggleRow(tx.id)}
                  className="grid items-center border-t cursor-pointer transition-colors"
                  style={{
                    gridTemplateColumns: '40px 130px 160px 1fr 70px 110px 110px 110px 90px',
                    padding: '14px 20px',
                    borderColor: 'rgba(0, 0, 0, 0.03)',
                    opacity: dimmed ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  {/* No */}
                  <span className="text-[12px]" style={{ color: '#1A1A1B' }}>{tx.no}</span>

                  {/* Datetime */}
                  <div>
                    <p className="text-[12px] text-[#1A1A1B]">{tx.datetime}</p>
                    <p className="text-[11px]" style={{ color: '#1A1A1B' }}>{tx.time}</p>
                  </div>

                  {/* TX ID */}
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: '#1A1A1B', cursor: 'pointer' }}
                    title={tx.txid}
                  >
                    {tx.txid}
                  </span>

                  {/* Produk */}
                  <span className="text-[13px] font-bold text-[#1A1A1B] truncate pr-2">{tx.produk}</span>

                  {/* Qty */}
                  <span className="text-[12px] text-[#1A1A1B]">{tx.qty}</span>

                  {/* Harga Satuan */}
                  <span className="text-[12px] text-[#1A1A1B]">{tx.harga}</span>

                  {/* Total */}
                  <span className="text-[13px] font-bold text-[#1A1A1B]">{tx.total}</span>

                  {/* Sumber */}
                  <span>
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-2xl border"
                      style={{
                        background: 'rgba(152, 226, 253,0.2)',
                        borderColor: 'rgba(152, 226, 253,0.35)',
                        color: '#1A1A1B',
                      }}
                    >
                      {tx.sumber}
                    </span>
                  </span>

                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full"
                      style={{ background: st.bg, color: '#1A1A1B' }}
                    >
                      {st.label}
                    </span>
                    {isExpanded ? <ChevronUp size={12} color="#8A8A8A" /> : <ChevronDown size={12} color="#8A8A8A" />}
                  </div>
                </motion.div>

                {/* Expanded detail */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="expand"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        className="flex items-center gap-8 border-t border-l-2"
                        style={{
                          padding: '12px 20px 12px 40px',
                          borderTopColor: 'rgba(0, 0, 0, 0.03)',
                          borderLeftColor: '#1A1A1B',
                          background: 'rgba(0,255,255,0.03)',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {(() => {
                            const PaymentIcon = PAYMENT_ICON[tx.payment] ?? CreditCard;
                            return <PaymentIcon size={16} className="text-[#1A1A1B]" />;
                          })()}
                          <div>
                            <p className="text-[10px]" style={{ color: '#1A1A1B' }}>Pembayaran</p>
                            <p className="text-[12px] font-semibold text-[#1A1A1B]">{tx.payment}</p>
                          </div>
                        </div>
                        {tx.notes && (
                          <div>
                            <p className="text-[10px]" style={{ color: '#1A1A1B' }}>Catatan</p>
                            <p className="text-[12px] text-[#1A1A1B]">{tx.notes}</p>
                          </div>
                        )}
                        <button
                          className="text-[12px] font-semibold ml-auto"
                          style={{ color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          Lihat Detail Lengkap →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Pagination */}
          <div
            className="flex items-center justify-between border-t"
            style={{ padding: '14px 20px', borderColor: 'rgba(0, 0, 0, 0.03)' }}
          >
            <span className="text-[12px]" style={{ color: '#1A1A1B' }}>Menampilkan 1–10 dari 273 transaksi</span>

            <div className="flex items-center gap-1.5">
              <PagBtn onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} icon={<ChevronLeft size={13} />} />
              {[1, 2, 3].map((n) => (
                <PagBtn key={n} label={String(n)} active={currentPage === n} onClick={() => setCurrentPage(n)} />
              ))}
              <span className="text-xs px-1" style={{ color: '#1A1A1B' }}>...</span>
              <PagBtn label={String(totalPages)} active={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)} />
              <PagBtn onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} icon={<ChevronRight size={13} />} />
            </div>
          </div>
        </motion.div>

        {/* ── Sales Chart ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-6 rounded-2xl border"
          style={{
            background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(0, 0, 0, 0.05)',
            padding: 24,
          }}
        >
          <h2 className="text-sm font-bold text-[#1A1A1B] mb-5">Trend Penjualan Harian</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barSize={18}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#98E2FD" />
                  <stop offset="100%" stopColor="#FFE16F" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(0, 0, 0, 0.03)" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#8A8A8A', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
                tick={{ fill: '#8A8A8A', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }} />
              <Bar dataKey="value" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="h-10" />
      </main>
    </div>
  );
}

// ─── Pagination Button ────────────────────────────────────────────────────────

function PagBtn({ label, active, onClick, icon }: { label?: string; active?: boolean; onClick: () => void; icon?: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ borderColor: active ? 'transparent' : '#98E2FD', color: '#1A1A1B' }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border text-[#1A1A1B] transition-all"
      style={{
        background: active ? 'linear-gradient(135deg, #FFE16F, #98E2FD)' : 'rgba(0, 0, 0, 0.03)',
        borderColor: active ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
    >
      {icon ?? label}
    </motion.button>
  );
}
