import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { Download, ChevronDown, User, Bell, Plug, CreditCard, Lock, Palette, Users, Database, HelpCircle, Laptop, Smartphone, History, Package, TrendingUp, Brain, Archive, MessageCircle, Mail, Phone, Crown, Building2, Receipt, BookOpen, Video, LineChart, Code, Eye, EyeOff, Check, X, Sparkles, Search } from 'lucide-react';
import React from 'react';

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Section = 'profil' | 'notifikasi' | 'integrasi' | 'billing' | 'keamanan' | 'tampilan' | 'tim' | 'data' | 'bantuan';

const NAV_ITEMS: { id: Section; icon: React.ReactNode; label: string; badge?: string }[] = [
  { id: 'profil',     icon: <User size={18} />, label: 'Profil Toko' },
  { id: 'notifikasi', icon: <Bell size={18} />, label: 'Notifikasi' },
  { id: 'integrasi',  icon: <Plug size={18} />, label: 'Integrasi POS' },
  { id: 'billing',    icon: <CreditCard size={18} />, label: 'Billing & Langganan' },
  { id: 'keamanan',   icon: <Lock size={18} />, label: 'Keamanan' },
  { id: 'tampilan',   icon: <Palette size={18} />, label: 'Tampilan' },
  { id: 'tim',        icon: <Users size={18} />, label: 'Tim & Akses', badge: 'PRO' },
  { id: 'data',       icon: <Database size={18} />, label: 'Data & Ekspor' },
  { id: 'bantuan',    icon: <HelpCircle size={18} />, label: 'Bantuan' },
];

const BILLING_HISTORY = [
  { date: '1 Mei 2024',  paket: 'Growth', jumlah: 'Rp 199.000', status: ' Lunas' },
  { date: '1 Apr 2024',  paket: 'Growth', jumlah: 'Rp 199.000', status: ' Lunas' },
  { date: '1 Mar 2024',  paket: 'Growth', jumlah: 'Rp 199.000', status: ' Lunas' },
  { date: '1 Feb 2024',  paket: 'Starter', jumlah: 'Rp 99.000', status: ' Lunas' },
];

// ─── Reusable ─────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 44,
  background: '#f8fafc',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 12,
  color: '#1A1A1B',
  fontSize: 13,
  padding: '0 14px',
  outline: 'none',
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase mb-1.5" style={{ color: '#1A1A1B', letterSpacing: '0.06em' }}>
      {children}
    </p>
  );
}

function Input({ value, onChange, placeholder, readOnly }: { value: string; onChange?: (v: string) => void; placeholder?: string; readOnly?: boolean }) {
  return (
    <input
      style={inputStyle}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={(e) => { if (!readOnly) e.currentTarget.style.borderColor = '#98E2FD'; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
    />
  );
}

function SaveBtn({ label = 'Simpan Perubahan' }: { label?: string }) {
  return (
    <div className="flex justify-end mt-6">
      <motion.button
        whileHover={{ boxShadow: '0 0 20px rgba(255, 225, 111,0.7)', scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="h-11 rounded-full text-sm font-bold text-[#1A1A1B] border-0"
        style={{ width: 180, background: '#FFE16F', cursor: 'pointer' }}
      >
        {label}
      </motion.button>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative flex-shrink-0 rounded-full transition-all"
      style={{
        width: 44, height: 24,
        background: on ? '#D1F07B' : 'rgba(0, 0, 0, 0.08)',
        border: 'none', cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ x: on ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-1 w-5 h-5 rounded-2xl bg-white"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
      />
    </button>
  );
}

function Divider() {
  return <div className="my-5" style={{ height: 1, background: 'rgba(0, 0, 0, 0.04)' }} />;
}

function ProgressBar({ label, current, max, color }: { label: string; current: number; max: number; color: '#1A1A1B'}) {
  const pct = Math.round((current / max) * 1000) / 10;
  const isNear = pct > 80;
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[13px] text-[#1A1A1B] font-medium">{label}</span>
        <span className="text-[11px] font-bold" style={{ color: '#1A1A1B'}}>{pct}%</span>
      </div>
      <div className="w-full rounded-2xl overflow-hidden" style={{ height: 6, background: 'rgba(0, 0, 0, 0.05)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[11px]" style={{ color: '#1A1A1B' }}>{current.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
    </div>
  );
}

// ─── Section: Profil Toko ─────────────────────────────────────────────────────

function ProfilSection() {
  const [nama, setNama] = useState('Toko Berkah');
  const [pemilik, setPemilik] = useState('Budi Santoso');
  const [email, setEmail] = useState('toko@berkah.com');
  const [hp, setHp] = useState('0812-3456-7890');
  const [alamat, setAlamat] = useState('Jl. Sudirman No. 45, Jakarta Selatan');
  const [kota, setKota] = useState('Jakarta');
  const [kodePos, setKodePos] = useState('12190');

  return (
    <div>
      <p className="text-sm font-bold text-[#1A1A1B] mb-5">Informasi Toko</p>

      {/* Logo upload */}
      <div className="flex items-center gap-5 mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-[#1A1A1B] font-bold text-2xl flex-shrink-0"
          style={{ background: '#FFE16F', boxShadow: '0 4px 16px rgba(255, 225, 111,0.4)' }}
        >
          TB
        </div>
        <div>
          <p className="text-base font-bold text-[#1A1A1B]">Toko Berkah</p>
          <p className="text-[12px] mb-2" style={{ color: '#1A1A1B' }}>Pemilik: Budi Santoso</p>
          <motion.button
            whileHover={{ bordercolor: '#1A1A1B', color: '#1A1A1B' }}
            whileTap={{ scale: 0.96 }}
            className="px-3 h-8 rounded-lg text-xs text-[#1A1A1B] border transition-colors"
            style={{ background: '#f8fafc', borderColor: 'rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
          >
            Ganti Logo
          </motion.button>
        </div>
      </div>

      <Divider />

      <div className="grid grid-cols-2 gap-4">
        <div><Label>Nama Toko</Label><Input value={nama} onChange={setNama} /></div>
        <div><Label>Nama Pemilik</Label><Input value={pemilik} onChange={setPemilik} /></div>
        <div><Label>Email</Label><Input value={email} onChange={setEmail} /></div>
        <div><Label>No. HP</Label><Input value={hp} onChange={setHp} /></div>
      </div>

      <div className="mt-4">
        <Label>Alamat Toko</Label>
        <textarea
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          style={{ ...inputStyle, height: 80, padding: '12px 14px', resize: 'none', lineHeight: 1.6 }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#98E2FD'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div><Label>Kota</Label><Input value={kota} onChange={setKota} /></div>
        <div><Label>Kode Pos</Label><Input value={kodePos} onChange={setKodePos} /></div>
      </div>

      <SaveBtn />
    </div>
  );
}

// ─── Section: Notifikasi ──────────────────────────────────────────────────────

function NotifikasiSection() {
  const [toggles, setToggles] = useState({
    stockout: true, expiry: true, ai: true, po: true, daily: false, weekly: false,
  });
  const [channels, setChannels] = useState({ inapp: true, email: true, wa: false });

  const toggle = (key: keyof typeof toggles) => setToggles((p) => ({ ...p, [key]: !p[key] }));

  const rows = [
    { key: 'stockout' as const, icon: null, title: 'Peringatan Stockout', sub: 'Notifikasi saat stok produk hampir habis' },
    { key: 'expiry'   as const, icon: null, title: 'Kadaluarsa Produk',   sub: 'Alert 3 hari sebelum produk kadaluarsa' },
    { key: 'ai'       as const, icon: null, title: 'Restock Intelligence',      sub: 'Saran harian dari sistem AI' },
    { key: 'po'       as const, icon: null, title: 'PO Dikonfirmasi',     sub: 'Notifikasi saat supplier konfirmasi PO' },
    { key: 'daily'    as const, icon: null, title: 'Laporan Harian',      sub: 'Ringkasan penjualan setiap pukul 21.00' },
    { key: 'weekly'   as const, icon: null, title: 'Weekly Report',       sub: 'Laporan mingguan via email' },
  ];

  return (
    <div>
      <p className="text-sm font-bold text-[#1A1A1B] mb-1">Preferensi Notifikasi</p>

      <div>
        {rows.map((row, i) => (
          <div
            key={row.key}
            className="flex items-center justify-between"
            style={{
              padding: '16px 0',
              borderBottom: i < rows.length - 1 ? '1px solid rgba(0, 0, 0, 0.03)' : 'none',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{row.icon}</span>
              <div>
                <p className="text-[13px] font-bold text-[#1A1A1B]">{row.title}</p>
                <p className="text-[12px]" style={{ color: '#1A1A1B' }}>{row.sub}</p>
              </div>
            </div>
            <Toggle on={toggles[row.key]} onChange={() => toggle(row.key)} />
          </div>
        ))}
      </div>

      <Divider />

      <p className="text-[13px] font-bold text-[#1A1A1B] mb-3">Kirim via</p>
      <div className="flex items-center gap-6">
        {[
          { key: 'inapp' as const, label: 'In-App' },
          { key: 'email' as const, label: 'Email' },
          { key: 'wa'    as const, label: 'WhatsApp', soon: true },
        ].map(({ key, label, soon }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={channels[key]}
              onChange={() => !soon && setChannels((p) => ({ ...p, [key]: !p[key] }))}
              className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
              disabled={soon}
            />
            <span className="text-[13px] text-[#1A1A1B]">{label}</span>
            {soon && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0, 0, 0, 0.05)', color: '#1A1A1B' }}>
                Segera hadir
              </span>
            )}
          </label>
        ))}
      </div>

      <SaveBtn />
    </div>
  );
}

// ─── Section: Billing ─────────────────────────────────────────────────────────

function BillingSection() {
  return (
    <div>
      <p className="text-sm font-bold text-[#1A1A1B] mb-5">Paket Langganan</p>

      {/* Current plan */}
      <div
        className="rounded-2xl p-5 flex items-center justify-between"
        style={{ background: '#FFE16F', boxShadow: '0 8px 32px rgba(255, 225, 111,0.4)' }}
      >
        <div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: '#FFE16F', color: '#1A1A1B', letterSpacing: '0.06em' }}
          >
            PAKET AKTIF
          </span>
          <p className="text-2xl font-bold text-[#1A1A1B] mt-2">Growth</p>
          <p className="text-sm text-[#1A1A1B] mt-0.5">Rp 199.000 / bulan</p>
          <p className="text-[11px] mt-1" style={{ color: '#1A1A1B' }}>
            Diperpanjang otomatis: 1 Juni 2024
          </p>
        </div>
        <motion.button
          whileHover={{ background: 'rgba(255,255,255,0.25)' }}
          whileTap={{ scale: 0.97 }}
          className="h-10 px-5 rounded-full text-sm font-bold text-[#1A1A1B] border-0"
          style={{ background: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer' }}
        >
          Kelola Langganan
        </motion.button>
      </div>

      {/* Usage */}
      <div className="mt-6">
        <p className="text-[13px] font-bold text-[#1A1A1B] mb-4">Penggunaan Bulan Ini</p>
        <ProgressBar label="SKU Aktif"  current={486}   max={500}    color="linear-gradient(90deg, #FFD700, #F5E04A)" />
        <ProgressBar label="Outlet"     current={2}     max={3}      color="linear-gradient(90deg, #D1F07B, #98E2FD)" />
        <ProgressBar label="API Calls"  current={8420}  max={10000}  color="linear-gradient(90deg, #FFD700, #FF9800)" />
      </div>

      {/* Upgrade CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between rounded-2xl p-4 mt-2"
        style={{ border: '1px solid #FFD700', background: 'rgba(255,215,0,0.05)' }}
      >
        <p className="text-[13px] text-[#1A1A1B] pr-4" style={{ lineHeight: 1.5 }}>
           Hampir mencapai batas SKU. Upgrade ke Pro untuk unlimited SKU.
        </p>
        <motion.button
          whileHover={{ boxShadow: '0 0 16px rgba(245,224,74,0.5)', scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="h-9 px-4 rounded-lg text-sm font-bold flex-shrink-0 border-0"
          style={{ background: '#FFE16F', color: '#1A1A1B', cursor: 'pointer' }}
        >
          Upgrade ke Pro
        </motion.button>
      </motion.div>

      {/* Billing history */}
      <div className="mt-6">
        <p className="text-[13px] font-bold text-[#1A1A1B] mb-3">Riwayat Pembayaran</p>
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}>
          <div
            className="grid text-[11px] font-bold uppercase"
            style={{
              gridTemplateColumns: '1fr 1fr 1fr 1fr 80px',
              padding: '11px 16px',
              background: '#f8fafc',
              color: '#1A1A1B',
              letterSpacing: '0.06em',
            }}
          >
            {['Tanggal', 'Paket', 'Jumlah', 'Status', 'Invoice'].map((h) => <span key={h}>{h}</span>)}
          </div>
          {BILLING_HISTORY.map((row, i) => (
            <div
              key={i}
              className="grid items-center border-t text-[12px]"
              style={{
                gridTemplateColumns: '1fr 1fr 1fr 1fr 80px',
                padding: '12px 16px',
                borderColor: 'rgba(0, 0, 0, 0.03)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ color: '#1A1A1B' }}>{row.date}</span>
              <span className="text-[#1A1A1B]">{row.paket}</span>
              <span className="text-[#1A1A1B] font-semibold">{row.jumlah}</span>
              <span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,255,127,0.15)', color: '#1A1A1B' }}>
                  {row.status}
                </span>
              </span>
              <button className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Download size={11} /> PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section: Integrasi POS ───────────────────────────────────────────────────

const NEW_POS = [
  {
    id: 'majoo',
    logo: '/logos/logo majoo.jpeg',
    name: 'Majoo',
    desc: 'POS populer untuk F&B & retail Indonesia',
  },
  {
    id: 'olsera',
    logo: '/logos/logo olsera.jpeg',
    name: 'Olsera',
    desc: 'Sistem kasir cloud untuk berbagai jenis usaha',
  },
  {
    id: 'iseller',
    logo: null,
    fallback: 'iS',
    fallbackGrad: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    name: 'iSeller',
    desc: 'Omnichannel POS untuk toko online & offline',
  },
];

function IntegrasiPOSSection() {
  const [syncOpen, setSyncOpen] = useState(true);
  const [syncToggles, setSyncToggles] = useState({
    daily: true, realtime: true, product: true, notif: true,
  });
  const toggleSync = (k: keyof typeof syncToggles) =>
    setSyncToggles((p) => ({ ...p, [k]: !p[k] }));

  const syncRows = [
    { key: 'daily'    as const, label: 'Sinkronisasi otomatis setiap hari' },
    { key: 'realtime' as const, label: 'Sinkronisasi transaksi real-time' },
    { key: 'product'  as const, label: 'Sinkronisasi data produk & harga' },
    { key: 'notif'    as const, label: 'Notifikasi jika sync gagal' },
  ];

  return (
    <div>
      {/* Header */}
      <p className="text-lg font-bold text-[#1A1A1B] mb-1">Integrasi POS</p>
      <p className="text-[13px] mb-6" style={{ color: '#1A1A1B' }}>
        Hubungkan sistem kasir Anda untuk sinkronisasi data otomatis
      </p>

      {/* Status Banner */}
      <div
        className="flex items-center justify-between rounded-[10px] mb-6"
        style={{
          padding: '14px 20px',
          background: 'rgba(0,255,127,0.08)',
          border: '1px solid rgba(0,255,127,0.25)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#D1F07B', boxShadow: '0 0 6px #D1F07B' }} />
          <span className="text-[13px] text-[#1A1A1B]">Moka POS terhubung dan aktif</span>
          <span className="text-[11px] ml-1" style={{ color: '#1A1A1B' }}>· Sinkronisasi terakhir: 5 menit lalu</span>
        </div>
        <button className="text-[12px] font-semibold transition-all" style={{ color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}>
          Lihat Log Sinkronisasi
        </button>
      </div>

      {/* Section 1 */}
      <p className="text-sm font-bold text-[#1A1A1B] mb-4">Sistem POS Terhubung</p>

      {/* Moka card */}
      <div
        className="flex items-center gap-4 rounded-full"
        style={{
          padding: 20,
          background: 'rgba(0,255,127,0.04)',
          border: '1px solid rgba(0,255,127,0.3)',
        }}
      >
        {/* Logo */}
        <div
          className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center"
          style={{ background: '#ffffff', padding: 4 }}
        >
          <img
            src="/logos/logo moka.png"
            alt="Moka"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-[#1A1A1B]">Moka POS</p>
          <p className="text-[11px] mt-0.5" style={{ color: '#1A1A1B' }}>Terhubung sejak 12 Maret 2024</p>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(0,255,127,0.15)', color: '#1A1A1B' }}> Aktif</span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(79,70,229,0.15)', color: '#1A1A1B' }}>Auto-sync ON</span>
            <span className="text-[11px]" style={{ color: '#1A1A1B' }}>847 transaksi disinkronkan</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ bordercolor: '#1A1A1B', color: '#1A1A1B' }}
            whileTap={{ scale: 0.96 }}
            className="px-4 h-9 rounded-lg text-xs text-[#1A1A1B] border transition-colors"
            style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer' }}
          >
            Pengaturan Sync
          </motion.button>
          <motion.button
            whileHover={{ borderColor: '#E63220', background: 'rgba(231,50,32,0.08)' }}
            whileTap={{ scale: 0.96 }}
            className="px-4 h-9 rounded-lg text-xs border transition-all"
            style={{ background: 'transparent', borderColor: 'rgba(231,50,32,0.5)', color: '#1A1A1B', cursor: 'pointer' }}
          >
            Putuskan Koneksi
          </motion.button>
        </div>
      </div>

      {/* Sync Settings expandable */}
      <div
        className="rounded-[10px] mt-3"
        style={{
          background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
          }}
      >
        {/* Header */}
        <button
          onClick={() => setSyncOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="text-[13px] font-bold text-[#1A1A1B]">Pengaturan Sinkronisasi</span>
          <motion.div animate={{ rotate: syncOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronDown size={16} className="text-[#1A1A1B]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {syncOpen && (
            <motion.div
              key="sync-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 20px 16px' }}>
                {syncRows.map((row, i) => (
                  <div
                    key={row.key}
                    className="flex items-center justify-between"
                    style={{
                      padding: '10px 0',
                      borderBottom: i < syncRows.length - 1 ? '1px solid rgba(0, 0, 0, 0.03)' : 'none',
                    }}
                  >
                    <span className="text-[13px] text-[#1A1A1B]">{row.label}</span>
                    <Toggle on={syncToggles[row.key]} onChange={() => toggleSync(row.key)} />
                  </div>
                ))}

                {/* Interval */}
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-[12px]" style={{ color: '#1A1A1B' }}>Interval sinkronisasi</span>
                  <select
                    className="rounded-lg text-sm text-[#1A1A1B] border"
                    style={{
                      height: 36,
                      width: 180,
                      background: '#f8fafc',
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                      padding: '0 12px',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#98E2FD'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; }}
                  >
                    <option style={{ background: '#1a1a2e' }}>Setiap 15 menit</option>
                    <option style={{ background: '#1a1a2e' }}>Setiap 30 menit</option>
                    <option style={{ background: '#1a1a2e' }}>Setiap 1 jam</option>
                    <option style={{ background: '#1a1a2e' }}>Manual saja</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 2 — Tambah integrasi baru */}
      <p className="text-sm font-bold text-[#1A1A1B] mt-8 mb-4">Tambah Integrasi POS Lain</p>

      <div className="grid grid-cols-3 gap-3.5">
        {NEW_POS.map((pos) => (
          <motion.div
            key={pos.id}
            whileHover={{ translateY: -2, bordercolor: '#1A1A1B' }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col rounded-2xl border"
            style={{
              padding: 18,
              background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
          >
            {/* Logo */}
            <div
              className="w-12 h-12 rounded-[10px] overflow-hidden flex-shrink-0 flex items-center justify-center bg-white"
              style={{
                boxShadow: pos.logo ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                padding: pos.logo ? 6 : 0,
              }}
            >
              {pos.logo ? (
                <img src={pos.logo} alt={pos.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-sm font-bold text-[#1A1A1B]">{(pos as any).fallback}</span>
              )}
            </div>

            {/* Name */}
            <p className="text-sm font-bold text-[#1A1A1B] mt-3">{pos.name}</p>

            {/* Desc */}
            <p className="text-[11px] mt-1 flex-1" style={{ color: '#1A1A1B', lineHeight: 1.5 }}>
              {pos.desc}
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ boxShadow: '0 0 16px rgba(255, 225, 111,0.5)', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full h-9 rounded-lg text-xs font-bold text-[#1A1A1B] mt-3 border-0"
              style={{ background: '#FFE16F', cursor: 'pointer' }}
              onClick={(e) => e.stopPropagation()}
            >
              Hubungkan
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Note */}
      <div
        className="rounded-[10px] mt-4"
        style={{
          padding: '14px 18px',
          background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
          }}
      >
        <p className="text-[12px] italic" style={{ color: '#1A1A1B', lineHeight: 1.6 }}>
           Tidak menemukan POS Anda? Hubungi kami di{''}
          <span style={{ color: '#1A1A1B' }}>support@restockai.id</span>{''}
          untuk request integrasi baru.
        </p>
      </div>
    </div>
  );
}

// ─── Section: Keamanan ────────────────────────────────────────────────────────

function KeamananSection() {
  const [showCurrent, setShowCurrent]   = useState(false);
  const [showNew, setShowNew]           = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [currentPw, setCurrentPw]       = useState('');
  const [newPw, setNewPw]               = useState('');
  const [confirmPw, setConfirmPw]       = useState('');
  const [twoFA, setTwoFA]               = useState(false);
  const [twoFAMethod, setTwoFAMethod]   = useState<'app' | 'sms'>('app');

  const strength = (() => {
    if (!newPw) return null;
    if (newPw.length < 6) return { pct: 25, label: 'Lemah', color: '#1A1A1B' };
    if (newPw.length < 10) return { pct: 60, label: 'Sedang', color: '#1A1A1B' };
    return { pct: 100, label: 'Kuat', color: '#1A1A1B' };
  })();

  const passwordsMatch = confirmPw.length > 0 && confirmPw === newPw;

  const focusStyle = (isFocused: boolean): React.CSSProperties => ({
    width: '100%',
    height: 44,
    background: '#f8fafc',
    border: `1px solid ${isFocused ? '#98E2FD' : 'rgba(255,255,255,0.12)'}`,
    boxShadow: isFocused ? '0 0 0 3px rgba(0,255,255,0.12)' : 'none',
    borderRadius: 12,
    color: '#1A1A1B',
    fontSize: 13,
    padding: '0 44px 0 14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  const sessions = [
    {
      icon: <Laptop size={20} color="#10B981" />, iconBg: 'rgba(16,185,129,0.15)',
      device: 'Chrome · MacBook Pro', location: 'Jakarta, Indonesia · Aktif sekarang',
      ip: '182.23.45.67', current: true,
    },
    {
      icon: <Smartphone size={20} color="#0EA5E9" />, iconBg: 'rgba(152, 226, 253,0.15)',
      device: 'Chrome · iPhone 14', location: 'Jakarta · 2 jam lalu',
      ip: '182.23.45.89', current: false,
    },
    {
      icon: <Laptop size={20} color="#F59E0B" />, iconBg: 'rgba(245,158,11,0.15)',
      device: 'Firefox · Windows 11', location: 'Bandung, Indonesia · 3 hari lalu',
      ip: '180.244.12.34', current: false,
    },
  ];

  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div>
      {/* Header */}
      <p className="text-lg font-bold text-[#1A1A1B] mb-1">Keamanan Akun</p>
      <p className="text-[13px] mb-6" style={{ color: '#1A1A1B' }}>
        Kelola kata sandi dan keamanan akun Anda
      </p>

      {/* ── Section 1: Ubah Kata Sandi ── */}
      <div
        className="rounded-3xl"style={{ padding: 24,
          background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
          backdropFilter: 'blur(12px)',
          }}
      >
        <p className="text-sm font-bold text-[#1A1A1B] mb-5">Ubah Kata Sandi</p>

        <div className="flex flex-col gap-4">
          {/* Current password */}
          <div>
            <Label>Kata Sandi Saat Ini</Label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                style={focusStyle(focusedField === 'current')}
                onFocus={() => setFocusedField('current')}
                onBlur={() => setFocusedField(null)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[18px] transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1B', lineHeight: 1 }}
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div>
            <Label>Kata Sandi Baru</Label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                style={focusStyle(focusedField === 'new')}
                onFocus={() => setFocusedField('new')}
                onBlur={() => setFocusedField(null)}
                placeholder="Min. 8 karakter"
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[18px] transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1B', lineHeight: 1 }}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Strength bar */}
            {strength && (
              <div className="mt-2">
                <div className="w-full rounded-2xl overflow-hidden" style={{ height: 4, background: 'rgba(0, 0, 0, 0.05)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${strength.pct}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${strength.color}99, ${strength.color})` }}
                  />
                </div>
                <p className="text-[10px] mt-1 font-semibold" style={{ color: '#1A1A1B'}}>
                  Kekuatan: {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <Label>Konfirmasi Kata Sandi Baru</Label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                style={{
                  ...focusStyle(focusedField === 'confirm'),
                  borderColor: confirmPw.length > 0
                    ? (passwordsMatch ? '#D1F07B' : '#E63220')
                    : focusedField === 'confirm' ? '#98E2FD' : 'rgba(255,255,255,0.12)',
                }}
                onFocus={() => setFocusedField('confirm')}
                onBlur={() => setFocusedField(null)}
                placeholder="Ulangi kata sandi baru"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[18px]"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1B', lineHeight: 1 }}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPw.length > 0 && (
              <p className="text-[10px] mt-1.5 flex items-center gap-1 font-semibold" style={{ color: '#1A1A1B'}}>
                {passwordsMatch ? <Check size={12} /> : <X size={12} />}
                {passwordsMatch ? 'Kata sandi cocok' : 'Kata sandi tidak cocok'}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <motion.button
            whileHover={{ boxShadow: '0 0 20px rgba(255, 225, 111,0.7)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-11 rounded-full text-sm font-bold text-[#1A1A1B] border-0"
            style={{ width: 200, background: '#FFE16F', cursor: 'pointer' }}
          >
            Perbarui Kata Sandi
          </motion.button>
        </div>
      </div>

      {/* ── Section 2: 2FA ── */}
      <div
        className="rounded-3xl mt-7"style={{ padding: 24,
          background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
          backdropFilter: 'blur(12px)',
          }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[#1A1A1B]">Autentikasi Dua Faktor (2FA)</p>
            <p className="text-[12px] mt-1" style={{ color: '#1A1A1B' }}>
              Tambahkan lapisan keamanan ekstra ke akun Anda
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Toggle on={twoFA} onChange={() => setTwoFA((v) => !v)} />
            <span className="text-[11px]" style={{ color: '#1A1A1B' }}>{twoFA ? 'Aktif' : 'Nonaktif'}</span>
          </div>
        </div>

        {/* Method options */}
        <AnimatePresence>
          {twoFA && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="flex flex-col gap-3 mt-5">
                {[
                  { id: 'app' as const, icon: <Smartphone size={20} color="#98E2FD" />, label: 'Google Authenticator', sub: 'Gunakan app authenticator untuk kode OTP' },
                  { id: 'sms' as const, icon: <MessageCircle size={20} color="#98E2FD" />, label: 'SMS / WhatsApp',       sub: 'Terima kode via SMS ke nomor Anda' },
                ].map((opt) => {
                  const active = twoFAMethod === opt.id;
                  return (
                    <motion.div
                      key={opt.id}
                      onClick={() => setTwoFAMethod(opt.id)}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-center gap-3 rounded-[10px] cursor-pointer border transition-all"
                      style={{
                        padding: 16,
                        background: active ? 'rgba(0,255,255,0.06)' : 'rgba(0, 0, 0, 0.02)',
                        borderColor: active ? '#98E2FD' : 'rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      {/* Radio */}
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                        style={{ borderColor: active ? '#98E2FD' : 'rgba(255,255,255,0.3)' }}
                      >
                        {active && <div className="w-2 h-2 rounded-full" style={{ background: '#98E2FD' }} />}
                      </div>
                      <span className="text-xl leading-none">{opt.icon}</span>
                      <div>
                        <p className="text-[13px] font-bold text-[#1A1A1B]">{opt.label}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: '#1A1A1B' }}>{opt.sub}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Section 3: Sesi Aktif ── */}
      <div
        className="rounded-3xl mt-7"style={{ padding: 24,
          background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
          backdropFilter: 'blur(12px)',
          }}
      >
        <p className="text-sm font-bold text-[#1A1A1B]">Sesi Aktif</p>
        <p className="text-[12px] mt-1 mb-4" style={{ color: '#1A1A1B' }}>
          Perangkat yang sedang login ke akun Anda
        </p>

        {sessions.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3.5"
            style={{
              padding: '14px 0',
              borderBottom: i < sessions.length - 1 ? '1px solid rgba(0, 0, 0, 0.03)' : 'none',
            }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: s.iconBg }}
            >
              {s.icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-[#1A1A1B]">{s.device}</p>
              <p className="text-[11px] mt-0.5" style={{ color: '#1A1A1B' }}>{s.location}</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: '#1A1A1B' }}>IP: {s.ip}</p>
            </div>

            {/* Badge or action */}
            {s.current ? (
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full flex-shrink-0"
                style={{ background: 'rgba(0,255,127,0.15)', color: '#1A1A1B' }}
              >
                Perangkat Ini
              </span>
            ) : (
              <motion.button
                whileHover={{ borderColor: '#E63220', background: 'rgba(231,50,32,0.08)' }}
                whileTap={{ scale: 0.95 }}
                className="h-8 px-3 rounded-lg text-[11px] border transition-all flex-shrink-0"
                style={{
                  background: 'transparent',
                  borderColor: 'rgba(231,50,32,0.4)',
                  color: '#1A1A1B',
                  cursor: 'pointer',
                }}
              >
                Keluarkan
              </motion.button>
            )}
          </div>
        ))}

        {/* Footer */}
        <div className="mt-2">
          <button
            className="text-[12px] font-semibold transition-all"
            style={{ color: '#1A1A1B', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
          >
            Keluarkan Semua Sesi Lain
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Tampilan ────────────────────────────────────────────────────────

const ACCENT_COLORS = [
  { id: 'purple', grad: 'linear-gradient(135deg, #FFE16F, #98E2FD)' },
  { id: 'green',  grad: 'linear-gradient(135deg, #1D9E75, #D1F07B)' },
  { id: 'blue',   grad: 'linear-gradient(135deg, #0066FF, #98E2FD)' },
  { id: 'pink',   grad: 'linear-gradient(135deg, #FF6B6B, #1A1A1B)' },
  { id: 'gold',   grad: 'linear-gradient(135deg, #FFD700, #F5E04A)' },
  { id: 'orange', grad: 'linear-gradient(135deg, #FF7700, #FFB84D)' },
];

function ThemeCard({
  active, onClick, label, sub, children,
}: {
  active: boolean; onClick: () => void; label: string; sub: string; children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.98 }}
      className="relative flex-1 rounded-2xl cursor-pointer"
      style={{
        padding: 14,
        border: `${active ? 2 : 1}px solid ${active ? '#98E2FD' : hovered ? '#98E2FD88' : 'rgba(255,255,255,0.12)'}`,
        background: active ? 'rgba(0,255,255,0.05)' : 'rgba(0, 0, 0, 0.02)',
        transition: 'all 0.2s ease',
      }}
    >
      {active && (
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-[#1A1A1B] z-10"
          style={{ background: '#98E2FD' }}
        >
          
        </div>
      )}
      <div className="w-full rounded-lg overflow-hidden" style={{ height: 90 }}>
        {children}
      </div>
      <p className="text-[13px] font-bold text-[#1A1A1B] text-center mt-2.5">{label}</p>
      <p className="text-[11px] text-center mt-0.5" style={{ color: '#1A1A1B'}}>{sub}</p>
    </motion.div>
  );
}

function TampilanSection() {
  const [theme, setTheme]       = useState<'dark' | 'light' | 'auto'>('dark');
  const [accent, setAccent]     = useState('purple');
  const [density, setDensity]   = useState<'kompak' | 'normal' | 'lega'>('normal');
  const [sidebarWidth, setSidebarWidth] = useState(210);
  const [sidebarToggles, setSidebarToggles] = useState({
    collapsed: false, labels: true, shortcuts: false,
  });
  const toggleSidebar = (k: keyof typeof sidebarToggles) =>
    setSidebarToggles((p) => ({ ...p, [k]: !p[k] }));

  const densityOptions: { id: 'kompak' | 'normal' | 'lega'; label: string }[] = [
    { id: 'kompak', label: 'Kompak' },
    { id: 'normal', label: 'Normal' },
    { id: 'lega',   label: 'Lega'   },
  ];

  const rowHeights = { kompak: 'h-5', normal: 'h-7', lega: 'h-9' };

  return (
    <div>
      <p className="text-lg font-bold text-[#1A1A1B] mb-1">Tampilan</p>
      <p className="text-[13px] mb-6" style={{ color: '#1A1A1B' }}>
        Kustomisasi tampilan dan preferensi visual aplikasi
      </p>

      {/* ── Section 1: Tema ── */}
      <div className="rounded-3xl"style={{ padding: 24, background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', }}>
        <p className="text-sm font-bold text-[#1A1A1B] mb-5">Tema Aplikasi</p>

        <div className="flex gap-3.5">
          {/* Dark */}
          <ThemeCard active={theme === 'dark'} onClick={() => setTheme('dark')} label="Dark Mode" sub="Tema aktif saat ini">
            <div className="w-full h-full flex" style={{ background: '#ffffff' }}>
              <div className="w-8 h-full" style={{ background: '#1a1a2e' }} />
              <div className="flex-1 flex flex-col gap-1.5 p-2">
                <div className="w-full h-2.5 rounded" style={{ background: '#1a1a2e' }} />
                <div className="flex gap-1.5 flex-1">
                  <div className="flex-1 rounded" style={{ background: '#1a1a2e' }} />
                  <div className="flex-1 rounded" style={{ background: '#1a1a2e' }} />
                </div>
              </div>
            </div>
          </ThemeCard>

          {/* Light */}
          <ThemeCard active={theme === 'light'} onClick={() => setTheme('light')} label="Light Mode" sub="Terang & bersih">
            <div className="w-full h-full flex" style={{ background: '#F5F5F5' }}>
              <div className="w-8 h-full" style={{ background: '#ffffff', borderRight: '1px solid #E5E5E5' }} />
              <div className="flex-1 flex flex-col gap-1.5 p-2">
                <div className="w-full h-2.5 rounded" style={{ background: '#ffffff', border: '1px solid #E5E5E5' }} />
                <div className="flex gap-1.5 flex-1">
                  <div className="flex-1 rounded" style={{ background: '#E0E0E0' }} />
                  <div className="flex-1 rounded" style={{ background: '#E0E0E0' }} />
                </div>
              </div>
            </div>
          </ThemeCard>

          {/* Auto */}
          <ThemeCard active={theme === 'auto'} onClick={() => setTheme('auto')} label="Ikuti Sistem" sub="Sesuai OS device">
            <div className="w-full h-full relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: '#ffffff' }} />
              <div
                className="absolute inset-0"
                style={{ background: '#F5F5F5', clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }}
              />
              <div className="absolute inset-0 flex">
                <div className="w-8 h-full" style={{ background: '#1a1a2e' }} />
                <div className="flex-1" />
              </div>
            </div>
          </ThemeCard>
        </div>
      </div>

      {/* ── Section 2: Warna Aksen ── */}
      <div className="rounded-3xl mt-6"style={{ padding: 24, background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', }}>
        <p className="text-sm font-bold text-[#1A1A1B] mb-1">Warna Aksen</p>
        <p className="text-[12px] mb-5" style={{ color: '#1A1A1B' }}>
          Pilih warna utama untuk tombol dan elemen aktif
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          {ACCENT_COLORS.map((c) => {
            const isActive = accent === c.id;
            return (
              <motion.button
                key={c.id}
                onClick={() => setAccent(c.id)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl border-2 transition-all"
                style={{
                  width: 40, height: 40,
                  background: c.grad,
                  borderColor: isActive ? '#1A1A1B' : 'transparent',
                  boxShadow: isActive ? '0 0 0 3px rgba(0,255,255,0.5)' : 'none',
                  cursor: 'pointer',
                }}
              />
            );
          })}

          <motion.button
            whileHover={{ color: '#1A1A1B' }}
            className="flex items-center gap-1 text-[12px] font-semibold ml-1 border-0"
            style={{ color: '#1A1A1B', background: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
          >
            + Kustom
          </motion.button>
        </div>
      </div>

      {/* ── Section 3: Sidebar ── */}
      <div className="rounded-3xl mt-6"style={{ padding: 24, background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', }}>
        <p className="text-sm font-bold text-[#1A1A1B] mb-4">Preferensi Sidebar</p>

        {[
          { key: 'collapsed' as const,  label: 'Sidebar collapsed by default' },
          { key: 'labels'    as const,  label: 'Tampilkan label text di sidebar' },
          { key: 'shortcuts' as const,  label: 'Tampilkan shortcut keyboard' },
        ].map((row, i, arr) => (
          <div
            key={row.key}
            className="flex items-center justify-between"
            style={{ padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(0, 0, 0, 0.03)' : 'none' }}
          >
            <span className="text-[13px] text-[#1A1A1B]">{row.label}</span>
            <Toggle on={sidebarToggles[row.key]} onChange={() => toggleSidebar(row.key)} />
          </div>
        ))}

        {/* Slider */}
        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase mb-3" style={{ color: '#1A1A1B', letterSpacing: '0.06em' }}>Lebar Sidebar</p>
          <div className="relative">
            <input
              type="range"
              min={180}
              max={280}
              value={sidebarWidth}
              onChange={(e) => setSidebarWidth(Number(e.target.value))}
              className="w-full"
              style={{
                accentColor: '#98E2FD',
                height: 6,
                cursor: 'pointer',
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-[11px]" style={{ color: '#1A1A1B' }}>180px</span>
              <span className="text-[11px] font-bold" style={{ color: '#1A1A1B' }}>{sidebarWidth}px</span>
              <span className="text-[11px]" style={{ color: '#1A1A1B' }}>280px</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: Kerapatan ── */}
      <div className="rounded-3xl mt-6"style={{ padding: 24, background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', }}>
        <p className="text-sm font-bold text-[#1A1A1B] mb-4">Kerapatan Tampilan</p>

        {/* Segmented control */}
        <div
          className="flex rounded-[10px] overflow-hidden border"
          style={{ borderColor: 'rgba(255,255,255,0.12)' }}
        >
          {densityOptions.map((opt, i) => {
            const isActive = density === opt.id;
            return (
              <motion.button
                key={opt.id}
                onClick={() => setDensity(opt.id)}
                whileTap={{ scale: 0.97 }}
                className="flex-1 text-[12px] font-semibold text-center transition-all border-0"
                style={{
                  height: 40,
                  background: isActive ? 'linear-gradient(135deg, #FFE16F, #98E2FD)' : 'transparent',
                  color: '#1A1A1B',
                  fontWeight: isActive ? 700 : 400,
                  borderRight: i < densityOptions.length - 1 ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
                  cursor: 'pointer',
                }}
              >
                {opt.label}
              </motion.button>
            );
          })}
        </div>

        {/* Preview */}
        <div className="mt-4">
          <p className="text-[11px] uppercase font-bold mb-2" style={{ color: '#1A1A1B', letterSpacing: '0.06em' }}>Preview:</p>
          <div
            className="rounded-lg flex flex-col gap-1.5"
            style={{ padding: 12, background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', }}
          >
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                layout
                animate={{ height: density === 'kompak' ? 20 : density === 'normal' ? 32 : 44 }}
                transition={{ duration: 0.25 }}
                className="w-full rounded flex items-center gap-2"
                style={{ background: '#f8fafc', padding: '0 10px' }}
              >
                <div className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: n === 1 ? '#D1F07B' : n === 2 ? '#FFD700' : '#1A1A1B' }} />
                <div className="flex-1 h-1.5 rounded" style={{ background: 'rgba(0, 0, 0, 0.08)' }} />
                <div className="w-12 h-1.5 rounded" style={{ background: 'rgba(0, 0, 0, 0.05)' }} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <motion.button
            whileHover={{ boxShadow: '0 0 20px rgba(255, 225, 111,0.7)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-11 rounded-full text-sm font-bold text-[#1A1A1B] border-0"
            style={{ width: 180, background: '#FFE16F', cursor: 'pointer' }}
          >
            Simpan Preferensi
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── Section: Tim & Akses ─────────────────────────────────────────────────────

const ROLES = [
  {
    icon: <Crown size={20} color="#0EA5E9" />, name: 'Pemilik', border: '#98E2FD', count: '1 orang', locked: false,
    sub: 'Akses penuh ke semua fitur dan pengaturan',
    perms: [
      { label: 'Dashboard', ok: true },
      { label: 'Inventori', ok: true },
      { label: 'Keuangan',  ok: true },
      { label: 'Pengaturan',ok: true },
      { label: 'Tim',       ok: true },
    ],
  },
  {
    icon: <Building2 size={20} color="#F59E0B" />, name: 'Manajer', border: 'rgba(255,215,0,0.5)', count: '0 orang', locked: true,
    sub: 'Akses ke semua fitur kecuali pengaturan billing',
    perms: [
      { label: 'Dashboard', ok: true },
      { label: 'Inventori', ok: true },
      { label: 'Keuangan',  ok: true },
      { label: 'Pengaturan',ok: false },
      { label: 'Tim',       ok: false },
    ],
  },
  {
    icon: <Receipt size={20} color="#F59E0B" />, name: 'Kasir', border: 'rgba(255,215,0,0.5)', count: '0 orang', locked: true,
    sub: 'Hanya bisa input transaksi dan lihat produk',
    perms: [
      { label: 'Dashboard', ok: true },
      { label: 'Inventori', ok: true },
      { label: 'Keuangan',  ok: false },
      { label: 'Pengaturan',ok: false },
      { label: 'Tim',       ok: false },
    ],
  },
];

function TimAksesSection() {
  const navigate = useNavigate();

  const tableHeader = ['NAMA', 'EMAIL', 'PERAN', 'AKSES', 'BERGABUNG', 'AKSI'];
  const colTemplate = '1.8fr 1.6fr 100px 130px 100px 60px';

  return (
    <div>
      {/* ── Upgrade Banner ── */}
      <div
        className="flex items-center justify-between rounded-2xl mb-6"
        style={{ padding: 20, background: '#FFE16F', boxShadow: '0 8px 32px rgba(255, 225, 111,0.4)' }}
      >
        <div>
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full mb-2"
            style={{ background: 'rgba(255,215,0,0.2)', color: '#1A1A1B', border: '1px solid rgba(255,215,0,0.3)', letterSpacing: '0.07em' }}
          >
            <Sparkles size={11} />
            PRO FEATURE
          </span>
          <p className="text-lg font-bold text-[#1A1A1B]">Kelola Akses Tim Anda</p>
          <p className="text-[13px] mt-1" style={{ color: '#1A1A1B' }}>
            Upgrade ke Pro untuk menambahkan anggota tim dan mengatur hak akses
          </p>
        </div>
        <motion.button
          whileHover={{ boxShadow: '0 0 24px rgba(245,224,74,0.6)', scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/pricing')}
          className="font-bold border-0 flex-shrink-0"
          style={{
            height: 48, minWidth: 160, borderRadius: 12, padding: '0 24px',
            background: '#FFE16F',
            color: '#1A1A1B', fontSize: 14, cursor: 'pointer',
          }}
        >
          Upgrade ke Pro
        </motion.button>
      </div>

      {/* ── Section 1: Anggota Tim ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-[#1A1A1B]">Anggota Tim</p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs font-bold text-[#1A1A1B] border-0"
          style={{ background: '#FFE16F', opacity: 0.55, cursor: 'not-allowed' }}
        >
          <Lock size={13} />
          Undang Anggota
        </motion.button>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', borderColor: 'rgba(0, 0, 0, 0.05)' }}>
        {/* Table header */}
        <div
          className="grid text-[11px] font-bold uppercase"
          style={{ gridTemplateColumns: colTemplate, padding: '12px 20px', background: '#f8fafc', color: '#1A1A1B', letterSpacing: '0.06em', gap: 8 }}
        >
          {tableHeader.map((h) => <span key={h}>{h}</span>)}
        </div>

        {/* Row 1 — Owner */}
        <div
          className="grid items-center border-t"
          style={{ gridTemplateColumns: colTemplate, padding: '16px 20px', borderColor: 'rgba(0, 0, 0, 0.03)', gap: 8 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          {/* Avatar + name */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#1A1A1B] flex-shrink-0"
              style={{ background: '#FFE16F' }}>BS</div>
            <div>
              <p className="text-[13px] font-bold text-[#1A1A1B] leading-tight">
                Budi Santoso <span className="text-[11px] font-normal" style={{ color: '#1A1A1B' }}>(Anda)</span>
              </p>
            </div>
          </div>
          {/* Email */}
          <span className="text-[12px]" style={{ color: '#1A1A1B' }}>budi@berkah.com</span>
          {/* Role */}
          <span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(152, 226, 253,0.2)', color: '#1A1A1B' }}>Pemilik</span>
          </span>
          {/* Access */}
          <span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,255,127,0.1)', color: '#1A1A1B' }}>Semua Akses</span>
          </span>
          {/* Joined */}
          <span className="text-[11px]" style={{ color: '#1A1A1B' }}>12 Jan 2024</span>
          {/* Actions */}
          <span className="text-[11px]" style={{ color: '#1A1A1B' }}>—</span>
        </div>

        {/* Rows 2 & 3 — Locked/blurred */}
        {[
          { initials: '??', role: 'Kasir',    access: 'Terbatas' },
          { initials: '??', role: 'Manajer',  access: 'Terbatas' },
        ].map((row, i) => (
          <div
            key={i}
            className="grid items-center border-t relative"
            style={{ gridTemplateColumns: colTemplate, padding: '16px 20px', borderColor: 'rgba(0, 0, 0, 0.03)', gap: 8, filter: 'blur(2.5px)', opacity: 0.45, userSelect: 'none' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl border-2 border-dashed flex items-center justify-center text-xs font-bold"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#1A1A1B', background: '#f8fafc' }}>??</div>
              <div className="w-24 h-3 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
            </div>
            <div className="w-32 h-3 rounded" style={{ background: 'rgba(0, 0, 0, 0.04)' }} />
            <span><span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,215,0,0.15)', color: '#1A1A1B' }}>{row.role}</span></span>
            <span><span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(0, 0, 0, 0.04)', color: '#1A1A1B' }}>{row.access}</span></span>
            <div className="w-16 h-3 rounded" style={{ background: 'rgba(0, 0, 0, 0.04)' }} />
            <Lock size={16} />
          </div>
        ))}

        {/* Footer */}
        <div className="border-t px-5 py-3" style={{ borderColor: 'rgba(0, 0, 0, 0.03)' }}>
          <p className="text-[12px] italic" style={{ color: '#1A1A1B' }}>
            Tambahkan hingga 10 anggota tim dengan paket Pro
          </p>
        </div>
      </div>

      {/* ── Section 2: Peran & Izin ── */}
      <p className="text-sm font-bold text-[#1A1A1B] mt-7 mb-4">Peran & Izin Akses</p>

      <div className="flex flex-col gap-3">
        {ROLES.map((role) => (
          <div
            key={role.name}
            className="rounded-[10px] border-l-[3px]"
            style={{
              padding: 16,
              background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
              backdropFilter: 'blur(10px)',
              border: `1px solid rgba(0, 0, 0, 0.04)`,
              borderLeft: `3px solid ${role.border}`,
              opacity: role.locked ? 0.72 : 1,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{role.icon}</span>
                <span className="text-[13px] font-bold text-[#1A1A1B]">{role.name}</span>
                {role.locked && (
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#FFE16F', color: '#1A1A1B', letterSpacing: '0.04em' }}>
                    PRO
                  </span>
                )}
              </div>
              <span className="text-[11px]" style={{ color: '#1A1A1B' }}>{role.count}</span>
            </div>

            {/* Sub */}
            <p className="text-[11px] mt-1.5" style={{ color: '#1A1A1B' }}>{role.sub}</p>

            {/* Permission pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {role.perms.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full"
                  style={{
                    background: p.ok ? 'rgba(0, 0, 0, 0.04)' : 'rgba(0, 0, 0, 0.02)',
                    color: '#1A1A1B',
                    textDecoration: p.ok ? 'none' : 'line-through',
                  }}
                >
                  {!p.ok && <X size={10} />}
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Data & Ekspor ───────────────────────────────────────────────────

const EXPORT_ROWS = [
  { icon: <Package size={20} color="#0EA5E9" />, iconBg: 'rgba(152, 226, 253,0.15)', title: 'Data Produk',      sub: '1.248 produk · SKU, harga, kategori, stok', format: 'CSV',  pro: false },
  { icon: <TrendingUp size={20} color="#10B981" />, iconBg: 'rgba(16,185,129,0.15)',   title: 'Data Penjualan',   sub: '847 transaksi · Jan–Mei 2024',              format: 'XLSX', pro: false },
  { icon: <Brain size={20} color="#06B6D4" />, iconBg: 'rgba(0,255,255,0.12)',   title: 'Laporan Prediksi AI', sub: 'Forecasting & rekomendasi 30 hari terakhir', format: 'PDF', pro: false },
  { icon: <History size={20} color="#F59E0B" />, iconBg: 'rgba(245,158,11,0.15)',   title: 'Histori Inventori', sub: 'Pergerakan stok 12 bulan terakhir',        format: 'CSV',  pro: false },
  { icon: <Archive size={20} color="#EAB308" />, iconBg: 'rgba(255,215,0,0.15)',  title: 'Ekspor Semua Data', sub: 'Backup lengkap seluruh data toko',         format: 'ZIP',  pro: true  },
];

const BACKUP_HISTORY = [
  { label: 'Backup · 30 Mei 2024, 00:05', size: '48.2 MB' },
  { label: 'Backup · 29 Mei 2024, 00:05', size: '47.8 MB' },
  { label: 'Backup · 28 Mei 2024, 00:05', size: '47.1 MB' },
];

const DANGER_ROWS = [
  {
    title: 'Hapus Semua Data Penjualan',
    sub: 'Hapus histori transaksi. Produk & stok tetap aman.',
    btnLabel: 'Hapus Data',
    bold: false,
  },
  {
    title: 'Reset Semua Inventori ke 0',
    sub: 'Set semua stok produk menjadi 0.',
    btnLabel: 'Reset Stok',
    bold: false,
  },
  {
    title: 'Hapus Akun Permanen',
    sub: 'Seluruh data, akun, dan langganan akan dihapus selamanya.',
    btnLabel: 'Hapus Akun',
    bold: true,
  },
];

function DataEksporSection() {
  const [formats, setFormats] = useState<Record<string, string>>(
    Object.fromEntries(EXPORT_ROWS.map((r) => [r.title, r.format]))
  );
  const setFmt = (title: string, val: string) =>
    setFormats((p) => ({ ...p, [title]: val }));

  const selectStyle: React.CSSProperties = {
    height: 32, width: 70,
    background: '#f8fafc',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6, color: '#1A1A1B', fontSize: 11,
    padding: '0 8px', outline: 'none', cursor: 'pointer',
    appearance: 'none' as const,
  };

  const dateInputStyle: React.CSSProperties = {
    height: 36, width: 140,
    background: '#f8fafc',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12, color: '#1A1A1B', fontSize: 12,
    padding: '0 12px', outline: 'none',
  };

  return (
    <div>
      <p className="text-lg font-bold text-[#1A1A1B] mb-1">Data & Ekspor</p>
      <p className="text-[13px] mb-6" style={{ color: '#1A1A1B' }}>
        Unduh, kelola, dan backup data bisnis Anda
      </p>

      {/* ── Section 1: Ekspor Data ── */}
      <div className="rounded-3xl"style={{ padding: 24, background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', }}>
        <p className="text-sm font-bold text-[#1A1A1B] mb-5">Ekspor Data</p>

        <div className="flex flex-col gap-3">
          {EXPORT_ROWS.map((row) => (
            <motion.div
              key={row.title}
              whileHover={!row.pro ? { borderColor: '#98E2FD44' } : {}}
              className="flex items-center justify-between rounded-[10px] border transition-all"
              style={{
                padding: '14px 16px',
                background: row.pro ? 'rgba(255,215,0,0.04)' : 'rgba(0, 0, 0, 0.02)',
                borderColor: row.pro ? 'rgba(255,215,0,0.25)' : 'rgba(0, 0, 0, 0.04)',
                borderLeft: row.pro ? '3px solid #FFD700' : undefined,
              }}
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: row.iconBg }}>
                  {row.icon}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1A1A1B]">{row.title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#1A1A1B' }}>{row.sub}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {row.pro && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full mr-1"
                    style={{ background: '#FFE16F', color: '#1A1A1B', letterSpacing: '0.04em' }}>
                    PRO
                  </span>
                )}

                {/* Format select */}
                <div className="relative">
                  <select
                    value={formats[row.title]}
                    onChange={(e) => setFmt(row.title, e.target.value)}
                    style={{ ...selectStyle, opacity: row.pro ? 0.45 : 1 }}
                    disabled={row.pro}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#98E2FD'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  >
                    {['CSV', 'XLSX', 'PDF', 'ZIP'].map((f) => (
                      <option key={f} value={f} style={{ background: '#1a1a2e' }}>{f}</option>
                    ))}
                  </select>
                </div>

                <motion.button
                  whileHover={!row.pro ? { boxShadow: '0 0 14px rgba(255, 225, 111,0.6)', scale: 1.04 } : {}}
                  whileTap={!row.pro ? { scale: 0.96 } : {}}
                  className="text-[11px] font-bold text-[#1A1A1B] rounded-[6px] border-0"
                  style={{
                    height: 32, width: 72,
                    background: '#FFE16F',
                    opacity: row.pro ? 0.45 : 1,
                    cursor: row.pro ? 'not-allowed' : 'pointer',
                  }}
                >
                  Ekspor
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Date range filter */}
        <div className="flex items-center gap-3 mt-5 flex-wrap">
          <span className="text-[12px]" style={{ color: '#1A1A1B' }}>Rentang Waktu:</span>
          <input
            type="text"
            defaultValue="01 Jan 2024"
            style={dateInputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#98E2FD'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          />
          <span style={{ color: '#1A1A1B' }}>—</span>
          <input
            type="text"
            defaultValue="31 Mei 2024"
            style={dateInputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#98E2FD'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          />
          <button
            className="text-[12px] font-semibold border-0"
            style={{ color: '#1A1A1B', background: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
          >
            Terapkan
          </button>
        </div>
      </div>

      {/* ── Section 2: Backup & Restore ── */}
      <div className="rounded-3xl mt-7"style={{ padding: 24, background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', }}>
        <p className="text-sm font-bold text-[#1A1A1B] mb-1">Backup & Restore</p>
        <p className="text-[12px] mb-5" style={{ color: '#1A1A1B' }}>
          Backup otomatis dilakukan setiap hari pukul 00.00
        </p>

        {/* Last backup */}
        <div
          className="flex items-center justify-between rounded-[10px] mb-5"
          style={{ padding: '14px 16px', background: 'rgba(0,255,127,0.06)', border: '1px solid rgba(0,255,127,0.2)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#D1F07B', boxShadow: '0 0 6px #D1F07B' }} />
            <span className="text-[13px] text-[#1A1A1B]">Backup terakhir: <strong>Hari ini, 00:05 WIB</strong></span>
          </div>
          <motion.button
            whileHover={{ bordercolor: '#1A1A1B', color: '#1A1A1B' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs text-[#1A1A1B] border transition-colors"
            style={{ background: '#f8fafc', borderColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer' }}
          >
            <Download size={12} /> Unduh Backup Terakhir
          </motion.button>
        </div>

        {/* History */}
        {BACKUP_HISTORY.map((b, i) => (
          <div
            key={i}
            className="flex items-center justify-between"
            style={{
              padding: '12px 0',
              borderBottom: i < BACKUP_HISTORY.length - 1 ? '1px solid rgba(0, 0, 0, 0.03)' : 'none',
            }}
          >
            <span className="text-[12px]" style={{ color: '#1A1A1B' }}>{b.label}</span>
            <span className="text-[12px]" style={{ color: '#1A1A1B' }}>{b.size}</span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold" style={{ color: '#1A1A1B' }}> Selesai</span>
              <button
                className="text-[11px] font-semibold border-0"
                style={{ color: '#1A1A1B', background: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                Unduh
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-5">
          <motion.button
            whileHover={{ boxShadow: '0 0 20px rgba(255, 225, 111,0.7)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-11 rounded-full text-sm font-bold text-[#1A1A1B] border-0"
            style={{ minWidth: 200, padding: '0 24px', background: '#FFE16F', cursor: 'pointer' }}
          >
            Buat Backup Sekarang
          </motion.button>
        </div>
      </div>

      {/* ── Section 3: Hapus Data (Danger Zone) ── */}
      <div
        className="rounded-3xl mt-7"style={{ padding: 24, background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(231,50,32,0.3)' }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: '#1A1A1B' }}> Zona Berbahaya</p>
        <p className="text-[12px]" style={{ color: '#1A1A1B' }}>
          Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan
        </p>

        <div className="my-4" style={{ height: 1, background: 'rgba(231,50,32,0.2)' }} />

        <div className="flex flex-col gap-0">
          {DANGER_ROWS.map((row, i) => (
            <div
              key={row.title}
              className="flex items-center justify-between"
              style={{
                padding: '14px 0',
                borderBottom: i < DANGER_ROWS.length - 1 ? '1px solid rgba(231,50,32,0.1)' : 'none',
              }}
            >
              <div className="pr-6">
                <p className="text-[13px] text-[#1A1A1B]" style={{ fontWeight: row.bold ? 700 : 500 }}>{row.title}</p>
                <p className="text-[11px] mt-0.5" style={{ color: row.isDanger ? '#1A1A1B' : '#8A8A8A' }}>{row.sub}</p>
              </div>
              <motion.button
                whileHover={{ background: row.bold ? 'rgba(231,50,32,0.25)' : 'rgba(231,50,32,0.1)', borderColor: '#E63220' }}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 h-9 px-4 rounded-lg text-[12px] border transition-all"
                style={{
                  background: row.bold ? 'rgba(231,50,32,0.15)' : 'transparent',
                  borderColor: '#E63220',
                  color: '#1A1A1B',
                  fontWeight: row.bold ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {row.btnLabel}
              </motion.button>
            </div>
          ))}
        </div>

        <p className="text-[11px] italic mt-4" style={{ color: '#1A1A1B' }}>
          Semua tindakan memerlukan konfirmasi kata sandi sebelum dieksekusi.
        </p>
      </div>
    </div>
  );
}

// ─── Section: Bantuan ────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Bagaimana cara menghubungkan sistem POS saya?',
    a: 'Masuk ke Pengaturan → Integrasi POS, lalu pilih sistem POS Anda (Moka, Majoo, atau Olsera). Klik "Hubungkan" dan ikuti langkah autentikasi. Data akan tersinkronisasi otomatis dalam 5 menit.',
  },
  { q: 'Mengapa prediksi AI saya tidak akurat?', a: null },
  { q: 'Bagaimana cara mengekspor data inventori?', a: null },
  { q: 'Apa perbedaan paket Starter, Growth, dan Pro?', a: null },
  { q: 'Bagaimana cara menambahkan anggota tim?', a: null },
];

const DOC_ROWS = [
  { icon: <BookOpen size={20} color="#4B5563" />, title: 'Panduan Memulai Restock AI',          meta: '10 menit baca', soon: false },
  { icon: <Video size={20} color="#4B5563" />, title: 'Video Tutorial: Setup Integrasi POS', meta: '5 menit video', soon: false },
  { icon: <LineChart size={20} color="#4B5563" />, title: 'Cara Membaca Laporan Prediksi AI',    meta: '8 menit baca', soon: false },
  { icon: <Code size={20} color="#4B5563" />, title: 'API Documentation untuk Developer',   meta: 'Teknis',        soon: false },
  { icon: <Smartphone size={20} color="#4B5563" />, title: 'Panduan Aplikasi Mobile Restock AI',   meta: 'Segera hadir',  soon: true  },
];

function BantuanSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  return (
    <div>
      <p className="text-lg font-bold text-[#1A1A1B] mb-1">Bantuan & Dukungan</p>
      <p className="text-[13px] mb-6" style={{ color: '#1A1A1B' }}>
        Temukan jawaban dan hubungi tim support kami
      </p>

      {/* ── Search bar ── */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#1A1A1B' }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari artikel bantuan..."
          className="w-full text-sm text-[#1A1A1B] placeholder-[#94a3b8] rounded-2xl border transition-all focus:outline-none"
          style={{
            height: 52,
            paddingLeft: 52,
            paddingRight: 88,
            background: '#f8fafc',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255,255,255,0.12)',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#98E2FD'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.15)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
        />
        <motion.button
          whileHover={{ boxShadow: '0 0 14px rgba(255, 225, 111,0.6)' }}
          whileTap={{ scale: 0.96 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-4 rounded-lg text-xs font-bold text-[#1A1A1B] border-0"
          style={{ background: '#FFE16F', cursor: 'pointer' }}
        >
          Cari
        </motion.button>
      </div>

      {/* ── Section 1: FAQ ── */}
      <p className="text-sm font-bold text-[#1A1A1B] mt-7 mb-4">Pertanyaan yang Sering Ditanya</p>

      <div className="rounded-2xl border overflow-hidden" style={{ background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', borderColor: 'rgba(0, 0, 0, 0.05)' }}>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? '1px solid rgba(0, 0, 0, 0.03)' : 'none' }}>
              <button
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="w-full flex items-center justify-between text-left transition-colors"
                style={{
                  padding: '18px 20px',
                  background: isOpen ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                }}
                onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="text-[13px] font-bold text-[#1A1A1B] pr-4">{item.q}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ flexShrink: 0 }}
                >
                  <ChevronDown size={16} color={isOpen ? '#1A1A1B' : '#8A8A8A'} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && item.a && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 20px 18px' }}>
                      <p className="text-[13px]" style={{ color: '#1A1A1B', lineHeight: 1.7 }}>{item.a}</p>
                      <button
                        className="text-[12px] font-semibold mt-2 border-0"
                        style={{ color: '#1A1A1B', background: 'none', cursor: 'pointer' }}
                        onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
                      >
                        Lihat panduan lengkap →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── Section 2: Kontak Support ── */}
      <p className="text-sm font-bold text-[#1A1A1B] mt-7 mb-4">Hubungi Kami</p>

      <div className="grid grid-cols-3 gap-3.5">
        {/* Live Chat */}
        <SupportCard
          icon={<MessageCircle size={20} color="#06B6D4" />} iconBg="rgba(0,255,255,0.12)"
          title="Live Chat" sub="Response dalam 2 menit"
          statusDot="#D1F07B" statusText="Online sekarang"
          btnLabel="Mulai Chat"
          btnStyle={{ background: '#FFE16F' }}
        />
        {/* Telepon */}
        <SupportCard
          icon={<Phone size={20} color="#10B981" />} iconBg="rgba(16,185,129,0.15)"
          title="Telepon Prioritas" sub="Bebas pulsa 24/7"
          statusDot="#D1F07B" statusText="0800-1234-5678"
          btnLabel="Hubungi Sekarang"
          btnStyle={{ background: '#25D366' }}
        />
        {/* Email */}
        <SupportCard
          icon={<Mail size={20} color="#0EA5E9" />} iconBg="rgba(152, 226, 253,0.15)"
          title="Email Support" sub="Response dalam 24 jam"
          statusDot="#8A8A8A" statusText="support@restockai.id"
          btnLabel="Kirim Email"
          btnStyle={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(0, 0, 0, 0.08)' }}
        />
      </div>

      {/* ── Section 3: Dokumentasi ── */}
      <p className="text-sm font-bold text-[#1A1A1B] mt-7 mb-4">Dokumentasi & Panduan</p>

      <div className="flex flex-col gap-2">
        {DOC_ROWS.map((row, i) => (
          <motion.div
            key={i}
            whileHover={{ bordercolor: '#1A1A1B', background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)' }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center gap-3 rounded-[10px] border cursor-pointer transition-all"
            style={{
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(0, 0, 0, 0.04)',
            }}
          >
            <span className="text-xl flex-shrink-0">{row.icon}</span>
            <span className="text-[13px] text-[#1A1A1B] flex-1">{row.title}</span>
            {row.soon ? (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: '#FFE16F', color: '#1A1A1B' }}>
                Soon
              </span>
            ) : (
              <span className="text-[11px] flex-shrink-0" style={{ color: '#1A1A1B' }}>{row.meta}</span>
            )}
            <span className="text-[14px] ml-1 flex-shrink-0" style={{ color: '#1A1A1B' }}>→</span>
          </motion.div>
        ))}
      </div>

      {/* ── Version Info ── */}
      <div
        className="flex items-center justify-between rounded-[10px] mt-7"
        style={{ padding: '16px 20px', background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', }}
      >
        <span className="text-[11px]" style={{ color: '#1A1A1B' }}>
          Restock AI v1.0.4 · Terakhir diperbarui: 28 Mei 2024
        </span>
        <motion.button
          whileHover={{ bordercolor: '#1A1A1B', color: '#1A1A1B' }}
          whileTap={{ scale: 0.96 }}
          className="h-8 px-3 rounded-lg text-[11px] text-[#1A1A1B] border transition-colors"
          style={{ background: '#f8fafc', borderColor: 'rgba(0, 0, 0, 0.08)', cursor: 'pointer' }}
        >
          Cek Update
        </motion.button>
      </div>
    </div>
  );
}

function SupportCard({
  icon, iconBg, title, sub, statusDot, statusText, btnLabel, btnStyle,
}: {
  icon: React.ReactNode; iconBg: string; title: string; sub: string;
  statusDot: string; statusText: string; btnLabel: string;
  btnStyle?: React.CSSProperties;
}) {
  return (
    <motion.div
      whileHover={{ translateY: -2, bordercolor: '#1A1A1B' }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center text-center rounded-2xl border cursor-pointer transition-all"
      style={{
        padding: 20,
        background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl" style={{ background: iconBg }}>
        {icon}
      </div>
      <p className="text-sm font-bold text-[#1A1A1B] mt-3">{title}</p>
      <p className="text-[11px] mt-1" style={{ color: '#1A1A1B' }}>{sub}</p>
      <div className="flex items-center gap-1.5 mt-1.5">
        <div className="w-2 h-2 rounded-full" style={{ background: statusDot, boxShadow: statusDot !== '#8A8A8A' ? `0 0 5px ${statusDot}` : 'none' }} />
        <span className="text-[10px]" style={{ color: '#1A1A1B' !== '#8A8A8A' ? statusDot : '#8A8A8A' }}>{statusText}</span>
      </div>
      <motion.button
        whileHover={{ opacity: 0.9, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full h-10 rounded-lg text-xs font-bold text-[#1A1A1B] mt-4 border-0"
        style={{ cursor: 'pointer', ...btnStyle }}
      >
        {btnLabel}
      </motion.button>
    </motion.div>
  );
}

// ─── Placeholder sections ─────────────────────────────────────────────────────

function PlaceholderSection({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-sm font-bold text-[#1A1A1B] mb-1">{label}</p>
      <p className="text-xs" style={{ color: '#1A1A1B' }}>Segera hadir di versi berikutnya</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Pengaturan() {
  const [activeSection, setActiveSection] = useState<Section>('profil');

  const renderContent = () => {
    switch (activeSection) {
      case 'profil':     return <ProfilSection />;
      case 'notifikasi': return <NotifikasiSection />;
      case 'integrasi':  return <IntegrasiPOSSection />;
      case 'keamanan':   return <KeamananSection />;
      case 'tampilan':   return <TampilanSection />;
      case 'tim':        return <TimAksesSection />;
      case 'data':       return <DataEksporSection />;
      case 'bantuan':    return <BantuanSection />;
      case 'billing':    return <BillingSection />;
      default:
        const item = NAV_ITEMS.find((n) => n.id === activeSection);
        return <PlaceholderSection icon={item?.icon ?? ''} label={item?.label ?? ''} />;
    }
  };

  const sectionTitle = NAV_ITEMS.find((n) => n.id === activeSection)?.label ?? '';

  return (
    <div className="min-h-screen w-full" style={{ background: '#f8fafc' }}>
      <Sidebar activePage="pengaturan" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 32px' }}>
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1B]">Pengaturan</h1>
          <p className="text-[13px] mt-1" style={{ color: '#1A1A1B' }}>Kelola preferensi dan konfigurasi akun Anda</p>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-5 mt-6">

          {/* ── Left Nav ── */}
          <div
            className="flex-shrink-0 rounded-3xl"
            style={{
              width: 220,
              background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
              backdropFilter: 'blur(12px)',
              padding: 8,
              alignSelf: 'flex-start',
              position: 'sticky',
              top: 88,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center gap-3 rounded-lg text-left border-l-[3px] transition-all"
                  style={{
                    height: 44,
                    padding: '0 14px',
                    background: isActive ? 'linear-gradient(135deg, #FFE16F, #98E2FD)' : 'transparent',
                    borderLeftColor: isActive ? '#D1F07B' : 'transparent',
                    color: '#1A1A1B',
                    fontWeight: isActive ? 700 : 400,
                    fontSize: 13,
                    border: 'none',
                    borderLeft: isActive ? '3px solid #D1F07B' : '3px solid transparent',
                    cursor: 'pointer',
                    marginBottom: 2,
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: '#FFE16F', color: '#1A1A1B', letterSpacing: '0.04em' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ── Right Content ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl border"
                style={{
                  background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                  padding: 28,
                  minHeight: 500,
                }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="h-10" />
      </main>
    </div>
  );
}
