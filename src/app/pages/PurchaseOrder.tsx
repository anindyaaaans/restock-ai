import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import POStatusIndicator from '../components/po/POStatusIndicator';
import { X, Calendar, ChevronRight, ShieldCheck, Clock, Zap } from 'lucide-react';

interface RecommendedProduct {
  id: string;
  name: string;
  currentStock: number;
  recommendedQty: number;
  pricePerUnit: number;
  category: string;
}

interface POItem {
  id: string;
  name: string;
  qty: number;
  pricePerUnit: number;
}

const mockRecommendations: RecommendedProduct[] = [
  {
    id: '1',
    name: 'Beras Premium 5kg',
    currentStock: 12,
    recommendedQty: 50,
    pricePerUnit: 185000,
    category: 'Sembako'
  },
  {
    id: '2',
    name: 'Minyak Goreng 2L',
    currentStock: 5,
    recommendedQty: 30,
    pricePerUnit: 42000,
    category: 'Sembako'
  },
  {
    id: '3',
    name: 'Gula Pasir 1kg',
    currentStock: 3,
    recommendedQty: 20,
    pricePerUnit: 18000,
    category: 'Sembako'
  },
  {
    id: '4',
    name: 'Teh Kotak 250ml',
    currentStock: 48,
    recommendedQty: 24,
    pricePerUnit: 5000,
    category: 'Minuman'
  },
  {
    id: '5',
    name: 'Indomie Goreng',
    currentStock: 85,
    recommendedQty: 100,
    pricePerUnit: 3500,
    category: 'Sembako'
  }
];

// ─── Financing helpers ────────────────────────────────────────────────────────

const RATE_MONTHLY = 0.015; // 1.5% flat/month

function monthlyInstallment(principal: number, months: number): number {
  if (months === 1) return principal * (1 + RATE_MONTHLY);
  const r = RATE_MONTHLY;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `Rp ${(n / 1_000).toFixed(0)}K`;
  return `Rp ${n.toFixed(0)}`;
}

// ─── Financing Banner ─────────────────────────────────────────────────────────

function FinancingBanner({ totalPO }: { totalPO: number }) {
  const [visible, setVisible]   = useState(true);
  const [tenor, setTenor]       = useState(3);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied]   = useState(false);

  const tenorOptions = [1, 3, 6];
  const monthly      = monthlyInstallment(totalPO, tenor);
  const totalRepay   = monthly * tenor;
  const interest     = totalRepay - totalPO;
  const eligible     = totalPO >= 500_000;

  const handleApply = async () => {
    setApplying(true);
    await new Promise((r) => setTimeout(r, 1400));
    setApplying(false);
    setApplied(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="financing-banner"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl overflow-hidden mb-6"
          style={{
            background: 'linear-gradient(135deg, #071a2e 0%, #0d2233 50%, #0a1f1a 100%)',
            border: '1px solid rgba(0,200,160,0.3)',
            boxShadow: '0 4px 32px rgba(0,180,140,0.08)',
          }}
        >
          {/* ── Top accent line ── */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, #00C8A0, #00FFCC, #4A1063)' }} />

          <div className="flex items-stretch" style={{ padding: '20px 24px', gap: 0 }}>

            {/* ── LEFT: Branding + headline ── */}
            <div className="flex flex-col justify-center" style={{ flex: '0 0 260px', paddingRight: 24, borderRight: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Co-brand logos */}
              <div className="flex items-center" style={{ gap: 10, marginBottom: 12 }}>
                <div
                  className="flex items-center justify-center font-bold text-white"
                  style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#4A1063,#8B4BBE)', fontSize: 11 }}
                >
                  R
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}>×</span>
                <img
                  src="/logos/logo modalku.png"
                  alt="Modalku"
                  style={{ height: 24, objectFit: 'contain', filter: 'brightness(1.1)' }}
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    (el.nextSibling as HTMLElement).style.display = 'flex';
                  }}
                />
                <div
                  className="items-center justify-center font-bold"
                  style={{ display: 'none', height: 24, padding: '0 8px', background: 'rgba(0,200,160,0.2)', borderRadius: 6, fontSize: 11, color: '#00C8A0' }}
                >
                  Modalku
                </div>
              </div>

              <p className="font-bold text-white" style={{ fontSize: 14, lineHeight: 1.4 }}>
                Butuh modal restock? <span style={{ color: '#00FFCC' }}>Ajukan sekarang</span>
              </p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 6, lineHeight: 1.5 }}>
                Pembiayaan inventaris berbasis data prediksi AI RestockAI. Proses 1 hari kerja, tanpa agunan.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap" style={{ gap: 6, marginTop: 12 }}>
                {[
                  { icon: <ShieldCheck size={10} />, text: 'OJK Terdaftar' },
                  { icon: <Zap size={10} />,         text: 'Cair 1 Hari' },
                  { icon: <Clock size={10} />,        text: 'Bunga 1.5%/bln' },
                ].map((b) => (
                  <span
                    key={b.text}
                    className="flex items-center font-medium"
                    style={{ gap: 4, fontSize: 10, color: '#00C8A0', background: 'rgba(0,200,160,0.1)', border: '1px solid rgba(0,200,160,0.2)', borderRadius: 20, padding: '3px 8px' }}
                  >
                    {b.icon}{b.text}
                  </span>
                ))}
              </div>
            </div>

            {/* ── CENTER: Tenor selector + calculation ── */}
            <div className="flex flex-col justify-center" style={{ flex: 1, padding: '0 24px', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
              {/* PO amount */}
              <div className="flex items-baseline" style={{ gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Total PO:</span>
                <span className="font-bold text-white" style={{ fontSize: 18 }}>{fmt(totalPO)}</span>
                {eligible && (
                  <span style={{ fontSize: 10, color: '#00FF7F', background: 'rgba(0,255,127,0.12)', borderRadius: 20, padding: '2px 8px', fontWeight: 700 }}>
                    ✓ Memenuhi Syarat
                  </span>
                )}
              </div>

              {/* Tenor chips */}
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, fontWeight: 700 }}>
                  Pilih Tenor
                </p>
                <div className="flex" style={{ gap: 8 }}>
                  {tenorOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTenor(t)}
                      style={{
                        height: 36,
                        padding: '0 16px',
                        borderRadius: 10,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.18s',
                        background: tenor === t ? 'linear-gradient(135deg,#00947A,#00C8A0)' : 'rgba(255,255,255,0.05)',
                        border: tenor === t ? 'none' : '1px solid rgba(255,255,255,0.12)',
                        color: tenor === t ? '#0F0F0F' : 'rgba(255,255,255,0.55)',
                        boxShadow: tenor === t ? '0 4px 12px rgba(0,200,160,0.35)' : 'none',
                      }}
                    >
                      {t} Bulan
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation breakdown */}
              <div
                className="flex"
                style={{ gap: 20, padding: '12px 16px', background: 'rgba(0,200,160,0.06)', borderRadius: 10, border: '1px solid rgba(0,200,160,0.12)' }}
              >
                {[
                  { label: 'Cicilan/Bulan', value: fmt(monthly), color: '#00FFCC', big: true },
                  { label: `Total Bayar (${tenor} bln)`, value: fmt(totalRepay), color: '#fff' },
                  { label: 'Bunga Total', value: fmt(interest), color: 'rgba(255,255,255,0.45)' },
                ].map((stat) => (
                  <div key={stat.label} style={{ flex: 1 }}>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{stat.label}</p>
                    <p className="font-bold" style={{ fontSize: stat.big ? 15 : 13, color: stat.color }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
                *Simulasi. Bunga flat 1.5%/bulan. Syarat & ketentuan berlaku.
              </p>
            </div>

            {/* ── RIGHT: Eligibility + CTA ── */}
            <div className="flex flex-col justify-between" style={{ flex: '0 0 220px', paddingLeft: 24 }}>
              {/* Eligibility from AI data */}
              <div
                style={{ background: 'rgba(0,255,127,0.06)', border: '1px solid rgba(0,255,127,0.15)', borderRadius: 10, padding: '10px 12px', marginBottom: 16 }}
              >
                <p style={{ fontSize: 10, color: '#00FF7F', fontWeight: 700, marginBottom: 4 }}>🧠 AI Pre-screening</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                  Berdasarkan 6 bulan riwayat transaksi, skor kredit Anda <span style={{ color: '#00FF7F', fontWeight: 700 }}>Sangat Baik</span>.
                </p>
                <div className="flex items-center" style={{ gap: 6, marginTop: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '82%' }}
                      transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                      style={{ height: '100%', background: 'linear-gradient(90deg,#00FF7F,#00FFCC)', borderRadius: 4 }}
                    />
                  </div>
                  <span style={{ fontSize: 10, color: '#00FF7F', fontWeight: 700 }}>82/100</span>
                </div>
              </div>

              {/* CTA */}
              {!applied ? (
                <motion.button
                  whileHover={!applying ? { boxShadow: '0 0 24px rgba(0,200,160,0.5)' } : {}}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleApply}
                  disabled={applying || !eligible}
                  className="w-full font-bold flex items-center justify-center"
                  style={{
                    height: 44,
                    borderRadius: 12,
                    fontSize: 13,
                    cursor: eligible ? 'pointer' : 'not-allowed',
                    background: eligible
                      ? 'linear-gradient(135deg,#00947A,#00C8A0)'
                      : 'rgba(255,255,255,0.08)',
                    border: 'none',
                    color: eligible ? '#0F0F0F' : '#555',
                    gap: 6,
                    transition: 'all 0.2s',
                    opacity: applying ? 0.7 : 1,
                  }}
                >
                  {applying ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block' }}
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    <>Ajukan Pembiayaan <ChevronRight size={14} /></>
                  )}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                  style={{ padding: '10px 0', gap: 6 }}
                >
                  <span style={{ fontSize: 22 }}>🎉</span>
                  <p className="font-bold text-white text-center" style={{ fontSize: 13 }}>Pengajuan Terkirim!</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                    Tim Modalku akan menghubungi dalam 1 hari kerja.
                  </p>
                </motion.div>
              )}

              {/* Learn more */}
              {!applied && (
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'rgba(0,200,160,0.7)', marginTop: 8, textAlign: 'center' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#00C8A0'; e.currentTarget.style.textDecoration = 'underline'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,200,160,0.7)'; e.currentTarget.style.textDecoration = 'none'; }}
                >
                  Pelajari Syarat & Ketentuan →
                </button>
              )}
            </div>

          </div>

          {/* ── Dismiss button ── */}
          <button
            onClick={() => setVisible(false)}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: 24,
              height: 24,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={12} color="#8A8A8A" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PurchaseOrder() {
  const [supplier, setSupplier] = useState('GudangAda');
  const [deliveryDate, setDeliveryDate] = useState('30 Mei 2024');
  const [notes, setNotes] = useState('');
  const [poItems, setPOItems] = useState<POItem[]>([
    { id: '1', name: 'Beras Premium 5kg', qty: 50, pricePerUnit: 185000 },
    { id: '2', name: 'Minyak Goreng 2L', qty: 30, pricePerUnit: 42000 },
    { id: '3', name: 'Gula Pasir 1kg', qty: 20, pricePerUnit: 18000 }
  ]);

  const formatCurrency = (value: number) => {
    return `Rp ${(value / 1000).toFixed(2)}K`;
  };

  const formatCurrencyLarge = (value: number) => {
    if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(2)}M`;
    }
    return `Rp ${(value / 1000).toFixed(0)}K`;
  };

  const updateQty = (id: string, newQty: number) => {
    setPOItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, newQty) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setPOItems((items) => items.filter((item) => item.id !== id));
  };

  const addItemFromRecommendation = (rec: RecommendedProduct) => {
    const exists = poItems.find((item) => item.id === rec.id);
    if (!exists) {
      setPOItems([
        ...poItems,
        {
          id: rec.id,
          name: rec.name,
          qty: rec.recommendedQty,
          pricePerUnit: rec.pricePerUnit
        }
      ]);
    }
  };

  const totalRecommendation = mockRecommendations.reduce(
    (sum, rec) => sum + rec.recommendedQty * rec.pricePerUnit,
    0
  );

  const totalPO = poItems.reduce(
    (sum, item) => sum + item.qty * item.pricePerUnit,
    0
  );

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: 'linear-gradient(180deg, #0F0F0F 0%, #1a0f2e 100%)'
      }}
    >
      <Sidebar activePage="pembelian" />
      <Navbar />

      {/* Main Content */}
      <main className="ml-60" style={{ padding: "96px 40px 32px" }}>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white mb-4">
            ONE-CLICK RESTOCK & PURCHASE ORDER
          </h1>
          <POStatusIndicator currentStep={1} />
        </div>

        {/* Financing Banner — reactive to totalPO */}
        <div style={{ position: 'relative' }}>
          <FinancingBanner totalPO={totalPO} />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT PANEL - AI Recommendations */}
          <div
            className="rounded-2xl p-7 border flex flex-col"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <h2 className="text-sm font-bold text-white mb-2">
              📌 REKOMENDASI RESTOK AI
            </h2>
            <p className="text-xs text-[#E8E8E8] mb-5">
              Produk yang perlu direstock berdasarkan prediksi
            </p>

            {/* Recommendation List */}
            <div className="space-y-0 mb-6 overflow-y-auto max-h-96">
              {mockRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => addItemFromRecommendation(rec)}
                  className="py-3 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 px-2 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white">
                        {rec.name}
                      </h4>
                      <p className="text-[10px] text-[#E8E8E8] mt-1">
                        Stok: {rec.currentStock} pcs
                      </p>
                    </div>
                    <div
                      className="px-2 py-1 rounded-full text-[10px] font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #F5E04A, #FFD700)',
                        color: '#0F0F0F'
                      }}
                    >
                      {rec.recommendedQty} pcs
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-white">
                      {formatCurrency(rec.pricePerUnit)}/pcs
                    </span>
                    <span className="font-bold text-white">
                      {formatCurrencyLarge(rec.recommendedQty * rec.pricePerUnit)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Recommendation */}
            <div
              className="mt-auto p-4 rounded-xl border"
              style={{
                background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                borderColor: '#00FF7F',
                boxShadow: '0 8px 24px rgba(74, 16, 99, 0.4)'
              }}
            >
              <p className="text-xs text-white mb-1">Total Rekomendasi:</p>
              <p className="text-xl font-bold text-white">
                {formatCurrencyLarge(totalRecommendation)}
              </p>
            </div>
          </div>

          {/* RIGHT PANEL - Draft PO Form */}
          <div
            className="rounded-2xl p-7 border flex flex-col"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <h2 className="text-sm font-bold text-white mb-6">📋 DRAFT PO</h2>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              {/* Supplier */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#E8E8E8] mb-2">
                  Pilih Supplier
                </label>
                <select
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border text-sm text-[#E8E8E8] transition-all focus:outline-none focus:border-cyan-400"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <option value="GudangAda">GudangAda</option>
                  <option value="Mitra Toko">Mitra Toko</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#E8E8E8] mb-2">
                  Tanggal Pengiriman
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full h-11 px-4 pr-10 rounded-xl border text-sm text-[#E8E8E8] transition-all focus:outline-none focus:border-cyan-400"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                  />
                  <Calendar
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#E8E8E8] mb-2">
                  Catatan (Opsional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan khusus untuk supplier..."
                  className="w-full h-20 px-4 py-3 rounded-xl border text-sm text-[#E8E8E8] placeholder-white/50 resize-none transition-all focus:outline-none focus:border-cyan-400"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                />
              </div>
            </div>

            {/* PO Items Table */}
            <div
              className="rounded-xl p-4 mb-6 overflow-x-auto"
              style={{
                background: 'rgba(255, 255, 255, 0.04)'
              }}
            >
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-[#E8E8E8] border-b border-white/10">
                    <th className="text-left pb-2">Produk</th>
                    <th className="text-center pb-2">Qty</th>
                    <th className="text-right pb-2">Harga</th>
                    <th className="text-right pb-2">Subtotal</th>
                    <th className="text-center pb-2">Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {poItems.map((item) => (
                    <motion.tr
                      key={item.id}
                      layout
                      className="border-b border-white/5 hover:bg-white/5 transition-all"
                    >
                      <td className="py-3 text-white font-bold">{item.name}</td>
                      <td className="py-3 text-center">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            updateQty(item.id, parseInt(e.target.value) || 1)
                          }
                          className="w-16 h-8 px-2 text-center rounded-lg border text-white bg-white/5 focus:outline-none focus:border-cyan-400"
                          style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                          min="1"
                        />
                      </td>
                      <td className="py-3 text-right text-white">
                        {formatCurrency(item.pricePerUnit)}
                      </td>
                      <td className="py-3 text-right text-white font-bold">
                        {formatCurrencyLarge(item.qty * item.pricePerUnit)}
                      </td>
                      <td className="py-3 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:text-red-500 transition-colors"
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total & Actions */}
            <div className="mt-auto">
              <div className="h-px bg-white/10 mb-4" />

              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-[#E8E8E8]">Total:</span>
                <span className="text-xl font-bold text-white">
                  {formatCurrencyLarge(totalPO)}
                </span>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 rounded-xl font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                    boxShadow: '0 4px 16px rgba(74, 16, 99, 0.4)'
                  }}
                >
                  Kirim ke Supplier
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-11 rounded-xl border font-bold text-cyan-400 transition-all"
                  style={{
                    background: 'transparent',
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  Simpan Draft
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
