import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import { Download, ChevronDown } from 'lucide-react';

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Section = 'profil' | 'notifikasi' | 'integrasi' | 'billing' | 'keamanan' | 'tampilan' | 'tim' | 'data' | 'bantuan';

const NAV_ITEMS: { id: Section; icon: string; label: string; badge?: string }[] = [
  { id: 'profil',     icon: '👤', label: 'Profil Toko' },
  { id: 'notifikasi', icon: '🔔', label: 'Notifikasi' },
  { id: 'integrasi',  icon: '🔌', label: 'Integrasi POS' },
  { id: 'billing',    icon: '💳', label: 'Billing & Langganan' },
  { id: 'keamanan',   icon: '🔐', label: 'Keamanan' },
  { id: 'tampilan',   icon: '🎨', label: 'Tampilan' },
  { id: 'tim',        icon: '👥', label: 'Tim & Akses', badge: 'PRO' },
  { id: 'data',       icon: '📊', label: 'Data & Ekspor' },
  { id: 'bantuan',    icon: '❓', label: 'Bantuan' },
];

const BILLING_HISTORY = [
  { date: '1 Mei 2024',  paket: 'Growth', jumlah: 'Rp 199.000', status: '✓ Lunas' },
  { date: '1 Apr 2024',  paket: 'Growth', jumlah: 'Rp 199.000', status: '✓ Lunas' },
  { date: '1 Mar 2024',  paket: 'Growth', jumlah: 'Rp 199.000', status: '✓ Lunas' },
  { date: '1 Feb 2024',  paket: 'Starter', jumlah: 'Rp 99.000', status: '✓ Lunas' },
];

// ─── Reusable ─────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 44,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 10,
  color: '#fff',
  fontSize: 13,
  padding: '0 14px',
  outline: 'none',
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase mb-1.5" style={{ color: '#8A8A8A', letterSpacing: '0.06em' }}>
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
      onFocus={(e) => { if (!readOnly) e.currentTarget.style.borderColor = '#00FFFF'; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
    />
  );
}

function SaveBtn({ label = 'Simpan Perubahan' }: { label?: string }) {
  return (
    <div className="flex justify-end mt-6">
      <motion.button
        whileHover={{ boxShadow: '0 0 20px rgba(74,16,99,0.7)', scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="h-11 rounded-xl text-sm font-bold text-white border-0"
        style={{ width: 180, background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', cursor: 'pointer' }}
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
        background: on ? '#00FF7F' : 'rgba(255,255,255,0.15)',
        border: 'none', cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{ x: on ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-1 w-5 h-5 rounded-full bg-white"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
      />
    </button>
  );
}

function Divider() {
  return <div className="my-5" style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />;
}

function ProgressBar({ label, current, max, color }: { label: string; current: number; max: number; color: string }) {
  const pct = Math.round((current / max) * 1000) / 10;
  const isNear = pct > 80;
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[13px] text-white font-medium">{label}</span>
        <span className="text-[11px] font-bold" style={{ color: isNear ? '#FFD700' : '#8A8A8A' }}>{pct}%</span>
      </div>
      <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: 'rgba(255,255,255,0.1)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[11px]" style={{ color: '#8A8A8A' }}>{current.toLocaleString()} / {max.toLocaleString()}</span>
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
      <p className="text-sm font-bold text-white mb-5">Informasi Toko</p>

      {/* Logo upload */}
      <div className="flex items-center gap-5 mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', boxShadow: '0 4px 16px rgba(74,16,99,0.4)' }}
        >
          TB
        </div>
        <div>
          <p className="text-base font-bold text-white">Toko Berkah</p>
          <p className="text-[12px] mb-2" style={{ color: '#8A8A8A' }}>Pemilik: Budi Santoso</p>
          <motion.button
            whileHover={{ borderColor: '#00FFFF', color: '#00FFFF' }}
            whileTap={{ scale: 0.96 }}
            className="px-3 h-8 rounded-lg text-xs text-white border transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}
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
          onFocus={(e) => { e.currentTarget.style.borderColor = '#00FFFF'; }}
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
    { key: 'stockout' as const, icon: '🔴', title: 'Peringatan Stockout', sub: 'Notifikasi saat stok produk hampir habis' },
    { key: 'expiry'   as const, icon: '⏰', title: 'Kadaluarsa Produk',   sub: 'Alert 3 hari sebelum produk kadaluarsa' },
    { key: 'ai'       as const, icon: '🧠', title: 'Rekomendasi AI',      sub: 'Saran harian dari sistem AI' },
    { key: 'po'       as const, icon: '📦', title: 'PO Dikonfirmasi',     sub: 'Notifikasi saat supplier konfirmasi PO' },
    { key: 'daily'    as const, icon: '💰', title: 'Laporan Harian',      sub: 'Ringkasan penjualan setiap pukul 21.00' },
    { key: 'weekly'   as const, icon: '📊', title: 'Weekly Report',       sub: 'Laporan mingguan via email' },
  ];

  return (
    <div>
      <p className="text-sm font-bold text-white mb-1">Preferensi Notifikasi</p>

      <div>
        {rows.map((row, i) => (
          <div
            key={row.key}
            className="flex items-center justify-between"
            style={{
              padding: '16px 0',
              borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{row.icon}</span>
              <div>
                <p className="text-[13px] font-bold text-white">{row.title}</p>
                <p className="text-[12px]" style={{ color: '#8A8A8A' }}>{row.sub}</p>
              </div>
            </div>
            <Toggle on={toggles[row.key]} onChange={() => toggle(row.key)} />
          </div>
        ))}
      </div>

      <Divider />

      <p className="text-[13px] font-bold text-white mb-3">Kirim via</p>
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
            <span className="text-[13px] text-white">{label}</span>
            {soon && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: '#8A8A8A' }}>
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
      <p className="text-sm font-bold text-white mb-5">Paket Langganan</p>

      {/* Current plan */}
      <div
        className="rounded-xl p-5 flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', boxShadow: '0 8px 32px rgba(74,16,99,0.4)' }}
      >
        <div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: 'linear-gradient(135deg, #F5E04A, #FFD700)', color: '#0F0F0F', letterSpacing: '0.06em' }}
          >
            PAKET AKTIF
          </span>
          <p className="text-2xl font-bold text-white mt-2">Growth</p>
          <p className="text-sm text-white mt-0.5">Rp 199.000 / bulan</p>
          <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Diperpanjang otomatis: 1 Juni 2024
          </p>
        </div>
        <motion.button
          whileHover={{ background: 'rgba(255,255,255,0.25)' }}
          whileTap={{ scale: 0.97 }}
          className="h-10 px-5 rounded-xl text-sm font-bold text-white border-0"
          style={{ background: 'rgba(255,255,255,0.15)', cursor: 'pointer' }}
        >
          Kelola Langganan
        </motion.button>
      </div>

      {/* Usage */}
      <div className="mt-6">
        <p className="text-[13px] font-bold text-white mb-4">Penggunaan Bulan Ini</p>
        <ProgressBar label="SKU Aktif"  current={486}   max={500}    color="linear-gradient(90deg, #FFD700, #F5E04A)" />
        <ProgressBar label="Outlet"     current={2}     max={3}      color="linear-gradient(90deg, #00FF7F, #00FFFF)" />
        <ProgressBar label="API Calls"  current={8420}  max={10000}  color="linear-gradient(90deg, #FFD700, #FF9800)" />
      </div>

      {/* Upgrade CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between rounded-xl p-4 mt-2"
        style={{ border: '1px solid #FFD700', background: 'rgba(255,215,0,0.05)' }}
      >
        <p className="text-[13px] text-white pr-4" style={{ lineHeight: 1.5 }}>
          💡 Hampir mencapai batas SKU. Upgrade ke Pro untuk unlimited SKU.
        </p>
        <motion.button
          whileHover={{ boxShadow: '0 0 16px rgba(245,224,74,0.5)', scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="h-9 px-4 rounded-lg text-sm font-bold flex-shrink-0 border-0"
          style={{ background: 'linear-gradient(135deg, #F5E04A, #FFD700)', color: '#0F0F0F', cursor: 'pointer' }}
        >
          Upgrade ke Pro
        </motion.button>
      </motion.div>

      {/* Billing history */}
      <div className="mt-6">
        <p className="text-[13px] font-bold text-white mb-3">Riwayat Pembayaran</p>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div
            className="grid text-[11px] font-bold uppercase"
            style={{
              gridTemplateColumns: '1fr 1fr 1fr 1fr 80px',
              padding: '11px 16px',
              background: 'rgba(255,255,255,0.06)',
              color: '#8A8A8A',
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
                borderColor: 'rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ color: '#8A8A8A' }}>{row.date}</span>
              <span className="text-white">{row.paket}</span>
              <span className="text-white font-semibold">{row.jumlah}</span>
              <span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,255,127,0.15)', color: '#00FF7F' }}>
                  {row.status}
                </span>
              </span>
              <button className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: '#00FFFF', background: 'none', border: 'none', cursor: 'pointer' }}>
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
    fallbackGrad: 'linear-gradient(135deg, #8B4BBE, #4A1063)',
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
      <p className="text-lg font-bold text-white mb-1">Integrasi POS</p>
      <p className="text-[13px] mb-6" style={{ color: '#8A8A8A' }}>
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
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#00FF7F', boxShadow: '0 0 6px #00FF7F' }} />
          <span className="text-[13px] text-white">Moka POS terhubung dan aktif</span>
          <span className="text-[11px] ml-1" style={{ color: '#8A8A8A' }}>· Sinkronisasi terakhir: 5 menit lalu</span>
        </div>
        <button className="text-[12px] font-semibold transition-all" style={{ color: '#00FFFF', background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}>
          Lihat Log Sinkronisasi
        </button>
      </div>

      {/* Section 1 */}
      <p className="text-sm font-bold text-white mb-4">Sistem POS Terhubung</p>

      {/* Moka card */}
      <div
        className="flex items-center gap-4 rounded-xl"
        style={{
          padding: 20,
          background: 'rgba(0,255,127,0.04)',
          border: '1px solid rgba(0,255,127,0.3)',
        }}
      >
        {/* Logo */}
        <div
          className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
          style={{ background: '#fff', padding: 4 }}
        >
          <img src="/logos/logo moka.png" alt="Moka" className="w-full h-full object-contain" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-white">Moka POS</p>
          <p className="text-[11px] mt-0.5" style={{ color: '#8A8A8A' }}>Terhubung sejak 12 Maret 2024</p>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(0,255,127,0.15)', color: '#00FF7F' }}>✓ Aktif</span>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(0,255,255,0.1)', color: '#00FFFF' }}>Auto-sync ON</span>
            <span className="text-[11px]" style={{ color: '#8A8A8A' }}>847 transaksi disinkronkan</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <motion.button
            whileHover={{ borderColor: '#00FFFF', color: '#00FFFF' }}
            whileTap={{ scale: 0.96 }}
            className="px-4 h-9 rounded-lg text-xs text-white border transition-colors"
            style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', cursor: 'pointer' }}
          >
            Pengaturan Sync
          </motion.button>
          <motion.button
            whileHover={{ borderColor: '#E63220', background: 'rgba(231,50,32,0.08)' }}
            whileTap={{ scale: 0.96 }}
            className="px-4 h-9 rounded-lg text-xs border transition-all"
            style={{ background: 'transparent', borderColor: 'rgba(231,50,32,0.5)', color: '#E63220', cursor: 'pointer' }}
          >
            Putuskan Koneksi
          </motion.button>
        </div>
      </div>

      {/* Sync Settings expandable */}
      <div
        className="rounded-[10px] mt-3"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Header */}
        <button
          onClick={() => setSyncOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="text-[13px] font-bold text-white">Pengaturan Sinkronisasi</span>
          <motion.div animate={{ rotate: syncOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronDown size={16} className="text-white" />
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
                      borderBottom: i < syncRows.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <span className="text-[13px] text-white">{row.label}</span>
                    <Toggle on={syncToggles[row.key]} onChange={() => toggleSync(row.key)} />
                  </div>
                ))}

                {/* Interval */}
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-[12px]" style={{ color: '#8A8A8A' }}>Interval sinkronisasi</span>
                  <select
                    className="rounded-lg text-sm text-white border"
                    style={{
                      height: 36,
                      width: 180,
                      background: 'rgba(255,255,255,0.06)',
                      borderColor: 'rgba(255,255,255,0.15)',
                      padding: '0 12px',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#00FFFF'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
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
      <p className="text-sm font-bold text-white mt-8 mb-4">Tambah Integrasi POS Lain</p>

      <div className="grid grid-cols-3 gap-3.5">
        {NEW_POS.map((pos) => (
          <motion.div
            key={pos.id}
            whileHover={{ translateY: -2, borderColor: '#00FFFF' }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col rounded-xl border"
            style={{
              padding: 18,
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
          >
            {/* Logo */}
            <div
              className="w-12 h-12 rounded-[10px] overflow-hidden flex-shrink-0 flex items-center justify-center"
              style={{
                background: pos.logo ? '#fff' : (pos as any).fallbackGrad,
                padding: pos.logo ? 4 : 0,
              }}
            >
              {pos.logo ? (
                <img src={pos.logo} alt={pos.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-sm font-bold text-white">{(pos as any).fallback}</span>
              )}
            </div>

            {/* Name */}
            <p className="text-sm font-bold text-white mt-3">{pos.name}</p>

            {/* Desc */}
            <p className="text-[11px] mt-1 flex-1" style={{ color: '#8A8A8A', lineHeight: 1.5 }}>
              {pos.desc}
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ boxShadow: '0 0 16px rgba(74,16,99,0.5)', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full h-9 rounded-lg text-xs font-bold text-white mt-3 border-0"
              style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', cursor: 'pointer' }}
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
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <p className="text-[12px] italic" style={{ color: '#8A8A8A', lineHeight: 1.6 }}>
          💡 Tidak menemukan POS Anda? Hubungi kami di{' '}
          <span style={{ color: '#00FFFF' }}>support@restockai.id</span>{' '}
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
    if (newPw.length < 6) return { pct: 25, label: 'Lemah', color: '#E63220' };
    if (newPw.length < 10) return { pct: 60, label: 'Sedang', color: '#FFD700' };
    return { pct: 100, label: 'Kuat', color: '#00FF7F' };
  })();

  const passwordsMatch = confirmPw.length > 0 && confirmPw === newPw;

  const focusStyle = (isFocused: boolean): React.CSSProperties => ({
    width: '100%',
    height: 44,
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${isFocused ? '#00FFFF' : 'rgba(255,255,255,0.12)'}`,
    boxShadow: isFocused ? '0 0 0 3px rgba(0,255,255,0.12)' : 'none',
    borderRadius: 10,
    color: '#fff',
    fontSize: 13,
    padding: '0 44px 0 14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  const sessions = [
    {
      icon: '💻', iconBg: 'rgba(0,255,127,0.12)',
      device: 'Chrome · MacBook Pro', location: 'Jakarta, Indonesia · Aktif sekarang',
      ip: '182.23.45.67', current: true,
    },
    {
      icon: '📱', iconBg: 'rgba(139,75,190,0.15)',
      device: 'Chrome · iPhone 14', location: 'Jakarta · 2 jam lalu',
      ip: '182.23.45.89', current: false,
    },
    {
      icon: '💻', iconBg: 'rgba(255,215,0,0.12)',
      device: 'Firefox · Windows 11', location: 'Bandung, Indonesia · 3 hari lalu',
      ip: '180.244.12.34', current: false,
    },
  ];

  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div>
      {/* Header */}
      <p className="text-lg font-bold text-white mb-1">Keamanan Akun</p>
      <p className="text-[13px] mb-6" style={{ color: '#8A8A8A' }}>
        Kelola kata sandi dan keamanan akun Anda
      </p>

      {/* ── Section 1: Ubah Kata Sandi ── */}
      <div
        className="rounded-xl"
        style={{
          padding: 24,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <p className="text-sm font-bold text-white mb-5">Ubah Kata Sandi</p>

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
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: showCurrent ? '#00FFFF' : '#8A8A8A', lineHeight: 1 }}
              >
                {showCurrent ? '🙈' : '👁️'}
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
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: showNew ? '#00FFFF' : '#8A8A8A', lineHeight: 1 }}
              >
                {showNew ? '🙈' : '👁️'}
              </button>
            </div>
            {/* Strength bar */}
            {strength && (
              <div className="mt-2">
                <div className="w-full rounded-full overflow-hidden" style={{ height: 4, background: 'rgba(255,255,255,0.1)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${strength.pct}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${strength.color}99, ${strength.color})` }}
                  />
                </div>
                <p className="text-[10px] mt-1 font-semibold" style={{ color: strength.color }}>
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
                    ? (passwordsMatch ? '#00FF7F' : '#E63220')
                    : focusedField === 'confirm' ? '#00FFFF' : 'rgba(255,255,255,0.12)',
                }}
                onFocus={() => setFocusedField('confirm')}
                onBlur={() => setFocusedField(null)}
                placeholder="Ulangi kata sandi baru"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[18px]"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: showConfirm ? '#00FFFF' : '#8A8A8A', lineHeight: 1 }}
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
            {confirmPw.length > 0 && (
              <p className="text-[10px] mt-1.5 flex items-center gap-1 font-semibold" style={{ color: passwordsMatch ? '#00FF7F' : '#E63220' }}>
                {passwordsMatch ? '✓ Kata sandi cocok' : '✕ Kata sandi tidak cocok'}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <motion.button
            whileHover={{ boxShadow: '0 0 20px rgba(74,16,99,0.7)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-11 rounded-xl text-sm font-bold text-white border-0"
            style={{ width: 200, background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', cursor: 'pointer' }}
          >
            Perbarui Kata Sandi
          </motion.button>
        </div>
      </div>

      {/* ── Section 2: 2FA ── */}
      <div
        className="rounded-xl mt-7"
        style={{
          padding: 24,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white">Autentikasi Dua Faktor (2FA)</p>
            <p className="text-[12px] mt-1" style={{ color: '#8A8A8A' }}>
              Tambahkan lapisan keamanan ekstra ke akun Anda
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Toggle on={twoFA} onChange={() => setTwoFA((v) => !v)} />
            <span className="text-[11px]" style={{ color: '#8A8A8A' }}>{twoFA ? 'Aktif' : 'Nonaktif'}</span>
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
                  { id: 'app' as const, icon: '📱', label: 'Google Authenticator', sub: 'Gunakan app authenticator untuk kode OTP' },
                  { id: 'sms' as const, icon: '💬', label: 'SMS / WhatsApp',       sub: 'Terima kode via SMS ke nomor Anda' },
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
                        background: active ? 'rgba(0,255,255,0.06)' : 'rgba(255,255,255,0.04)',
                        borderColor: active ? '#00FFFF' : 'rgba(255,255,255,0.1)',
                      }}
                    >
                      {/* Radio */}
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2"
                        style={{ borderColor: active ? '#00FFFF' : 'rgba(255,255,255,0.3)' }}
                      >
                        {active && <div className="w-2 h-2 rounded-full" style={{ background: '#00FFFF' }} />}
                      </div>
                      <span className="text-xl leading-none">{opt.icon}</span>
                      <div>
                        <p className="text-[13px] font-bold text-white">{opt.label}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: '#8A8A8A' }}>{opt.sub}</p>
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
        className="rounded-xl mt-7"
        style={{
          padding: 24,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <p className="text-sm font-bold text-white">Sesi Aktif</p>
        <p className="text-[12px] mt-1 mb-4" style={{ color: '#8A8A8A' }}>
          Perangkat yang sedang login ke akun Anda
        </p>

        {sessions.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3.5"
            style={{
              padding: '14px 0',
              borderBottom: i < sessions.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
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
              <p className="text-[13px] font-bold text-white">{s.device}</p>
              <p className="text-[11px] mt-0.5" style={{ color: '#8A8A8A' }}>{s.location}</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: '#8A8A8A' }}>IP: {s.ip}</p>
            </div>

            {/* Badge or action */}
            {s.current ? (
              <span
                className="text-[10px] font-bold px-3 py-1 rounded-full flex-shrink-0"
                style={{ background: 'rgba(0,255,127,0.15)', color: '#00FF7F' }}
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
                  color: '#E63220',
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
            style={{ color: '#E63220', background: 'none', border: 'none', cursor: 'pointer' }}
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
  { id: 'purple', grad: 'linear-gradient(135deg, #4A1063, #8B4BBE)' },
  { id: 'green',  grad: 'linear-gradient(135deg, #1D9E75, #00FF7F)' },
  { id: 'blue',   grad: 'linear-gradient(135deg, #0066FF, #00FFFF)' },
  { id: 'pink',   grad: 'linear-gradient(135deg, #FF6B6B, #FF00FF)' },
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
      className="relative flex-1 rounded-xl cursor-pointer"
      style={{
        padding: 14,
        border: `${active ? 2 : 1}px solid ${active ? '#00FFFF' : hovered ? '#00FFFF88' : 'rgba(255,255,255,0.12)'}`,
        background: active ? 'rgba(0,255,255,0.05)' : 'rgba(255,255,255,0.04)',
        transition: 'all 0.2s ease',
      }}
    >
      {active && (
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white z-10"
          style={{ background: '#00FFFF' }}
        >
          ✓
        </div>
      )}
      <div className="w-full rounded-lg overflow-hidden" style={{ height: 90 }}>
        {children}
      </div>
      <p className="text-[13px] font-bold text-white text-center mt-2.5">{label}</p>
      <p className="text-[11px] text-center mt-0.5" style={{ color: active ? '#00FFFF' : '#8A8A8A' }}>{sub}</p>
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
      <p className="text-lg font-bold text-white mb-1">Tampilan</p>
      <p className="text-[13px] mb-6" style={{ color: '#8A8A8A' }}>
        Kustomisasi tampilan dan preferensi visual aplikasi
      </p>

      {/* ── Section 1: Tema ── */}
      <div className="rounded-xl" style={{ padding: 24, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-sm font-bold text-white mb-5">Tema Aplikasi</p>

        <div className="flex gap-3.5">
          {/* Dark */}
          <ThemeCard active={theme === 'dark'} onClick={() => setTheme('dark')} label="Dark Mode" sub="Tema aktif saat ini">
            <div className="w-full h-full flex" style={{ background: '#0F0F0F' }}>
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
              <div className="w-8 h-full" style={{ background: '#FFFFFF', borderRight: '1px solid #E5E5E5' }} />
              <div className="flex-1 flex flex-col gap-1.5 p-2">
                <div className="w-full h-2.5 rounded" style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }} />
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
              <div className="absolute inset-0" style={{ background: '#0F0F0F' }} />
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
      <div className="rounded-xl mt-6" style={{ padding: 24, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-sm font-bold text-white mb-1">Warna Aksen</p>
        <p className="text-[12px] mb-5" style={{ color: '#8A8A8A' }}>
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
                className="rounded-full border-2 transition-all"
                style={{
                  width: 40, height: 40,
                  background: c.grad,
                  borderColor: isActive ? '#fff' : 'transparent',
                  boxShadow: isActive ? '0 0 0 3px rgba(0,255,255,0.5)' : 'none',
                  cursor: 'pointer',
                }}
              />
            );
          })}

          <motion.button
            whileHover={{ color: '#00FFFF' }}
            className="flex items-center gap-1 text-[12px] font-semibold ml-1 border-0"
            style={{ color: '#00FFFF', background: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
          >
            + Kustom
          </motion.button>
        </div>
      </div>

      {/* ── Section 3: Sidebar ── */}
      <div className="rounded-xl mt-6" style={{ padding: 24, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-sm font-bold text-white mb-4">Preferensi Sidebar</p>

        {[
          { key: 'collapsed' as const,  label: 'Sidebar collapsed by default' },
          { key: 'labels'    as const,  label: 'Tampilkan label text di sidebar' },
          { key: 'shortcuts' as const,  label: 'Tampilkan shortcut keyboard' },
        ].map((row, i, arr) => (
          <div
            key={row.key}
            className="flex items-center justify-between"
            style={{ padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
          >
            <span className="text-[13px] text-white">{row.label}</span>
            <Toggle on={sidebarToggles[row.key]} onChange={() => toggleSidebar(row.key)} />
          </div>
        ))}

        {/* Slider */}
        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase mb-3" style={{ color: '#8A8A8A', letterSpacing: '0.06em' }}>Lebar Sidebar</p>
          <div className="relative">
            <input
              type="range"
              min={180}
              max={280}
              value={sidebarWidth}
              onChange={(e) => setSidebarWidth(Number(e.target.value))}
              className="w-full"
              style={{
                accentColor: '#8B4BBE',
                height: 6,
                cursor: 'pointer',
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-[11px]" style={{ color: '#8A8A8A' }}>180px</span>
              <span className="text-[11px] font-bold" style={{ color: '#FFD700' }}>{sidebarWidth}px</span>
              <span className="text-[11px]" style={{ color: '#8A8A8A' }}>280px</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: Kerapatan ── */}
      <div className="rounded-xl mt-6" style={{ padding: 24, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-sm font-bold text-white mb-4">Kerapatan Tampilan</p>

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
                  background: isActive ? 'linear-gradient(135deg, #4A1063, #8B4BBE)' : 'transparent',
                  color: isActive ? '#fff' : '#8A8A8A',
                  fontWeight: isActive ? 700 : 400,
                  borderRight: i < densityOptions.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
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
          <p className="text-[11px] uppercase font-bold mb-2" style={{ color: '#8A8A8A', letterSpacing: '0.06em' }}>Preview:</p>
          <div
            className="rounded-lg flex flex-col gap-1.5"
            style={{ padding: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                layout
                animate={{ height: density === 'kompak' ? 20 : density === 'normal' ? 32 : 44 }}
                transition={{ duration: 0.25 }}
                className="w-full rounded flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.06)', padding: '0 10px' }}
              >
                <div className="rounded-full flex-shrink-0" style={{ width: 8, height: 8, background: n === 1 ? '#00FF7F' : n === 2 ? '#FFD700' : '#FF00FF' }} />
                <div className="flex-1 h-1.5 rounded" style={{ background: 'rgba(255,255,255,0.15)' }} />
                <div className="w-12 h-1.5 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <motion.button
            whileHover={{ boxShadow: '0 0 20px rgba(74,16,99,0.7)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-11 rounded-xl text-sm font-bold text-white border-0"
            style={{ width: 180, background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', cursor: 'pointer' }}
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
    icon: '👑', name: 'Pemilik', border: '#8B4BBE', count: '1 orang', locked: false,
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
    icon: '🏢', name: 'Manajer', border: 'rgba(255,215,0,0.5)', count: '0 orang', locked: true,
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
    icon: '🧾', name: 'Kasir', border: 'rgba(255,215,0,0.5)', count: '0 orang', locked: true,
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
        className="flex items-center justify-between rounded-xl mb-6"
        style={{ padding: 20, background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', boxShadow: '0 8px 32px rgba(74,16,99,0.4)' }}
      >
        <div>
          <span
            className="inline-block text-[10px] font-bold uppercase px-2.5 py-1 rounded-full mb-2"
            style={{ background: 'rgba(255,215,0,0.2)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.3)', letterSpacing: '0.07em' }}
          >
            ✨ PRO FEATURE
          </span>
          <p className="text-lg font-bold text-white">Kelola Akses Tim Anda</p>
          <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Upgrade ke Pro untuk menambahkan anggota tim dan mengatur hak akses
          </p>
        </div>
        <motion.button
          whileHover={{ boxShadow: '0 0 24px rgba(245,224,74,0.6)', scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/pricing')}
          className="font-bold border-0 flex-shrink-0"
          style={{
            height: 48, minWidth: 160, borderRadius: 10, padding: '0 24px',
            background: 'linear-gradient(135deg, #F5E04A, #FFD700)',
            color: '#0F0F0F', fontSize: 14, cursor: 'pointer',
          }}
        >
          Upgrade ke Pro
        </motion.button>
      </div>

      {/* ── Section 1: Anggota Tim ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-white">Anggota Tim</p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs font-bold text-white border-0"
          style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', opacity: 0.55, cursor: 'not-allowed' }}
        >
          🔒 Undang Anggota
        </motion.button>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.1)' }}>
        {/* Table header */}
        <div
          className="grid text-[11px] font-bold uppercase"
          style={{ gridTemplateColumns: colTemplate, padding: '12px 20px', background: 'rgba(255,255,255,0.06)', color: '#8A8A8A', letterSpacing: '0.06em', gap: 8 }}
        >
          {tableHeader.map((h) => <span key={h}>{h}</span>)}
        </div>

        {/* Row 1 — Owner */}
        <div
          className="grid items-center border-t"
          style={{ gridTemplateColumns: colTemplate, padding: '16px 20px', borderColor: 'rgba(255,255,255,0.06)', gap: 8 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          {/* Avatar + name */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)' }}>BS</div>
            <div>
              <p className="text-[13px] font-bold text-white leading-tight">
                Budi Santoso <span className="text-[11px] font-normal" style={{ color: '#8A8A8A' }}>(Anda)</span>
              </p>
            </div>
          </div>
          {/* Email */}
          <span className="text-[12px]" style={{ color: '#8A8A8A' }}>budi@berkah.com</span>
          {/* Role */}
          <span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(139,75,190,0.2)', color: '#C084FC' }}>Pemilik</span>
          </span>
          {/* Access */}
          <span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,255,127,0.1)', color: '#00FF7F' }}>Semua Akses</span>
          </span>
          {/* Joined */}
          <span className="text-[11px]" style={{ color: '#8A8A8A' }}>12 Jan 2024</span>
          {/* Actions */}
          <span className="text-[11px]" style={{ color: '#8A8A8A' }}>—</span>
        </div>

        {/* Rows 2 & 3 — Locked/blurred */}
        {[
          { initials: '??', role: 'Kasir',    access: 'Terbatas' },
          { initials: '??', role: 'Manajer',  access: 'Terbatas' },
        ].map((row, i) => (
          <div
            key={i}
            className="grid items-center border-t relative"
            style={{ gridTemplateColumns: colTemplate, padding: '16px 20px', borderColor: 'rgba(255,255,255,0.06)', gap: 8, filter: 'blur(2.5px)', opacity: 0.45, userSelect: 'none' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full border-2 border-dashed flex items-center justify-center text-xs font-bold"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#8A8A8A', background: 'rgba(255,255,255,0.06)' }}>??</div>
              <div className="w-24 h-3 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
            </div>
            <div className="w-32 h-3 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span><span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700' }}>{row.role}</span></span>
            <span><span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', color: '#8A8A8A' }}>{row.access}</span></span>
            <div className="w-16 h-3 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <span className="text-base">🔒</span>
          </div>
        ))}

        {/* Footer */}
        <div className="border-t px-5 py-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-[12px] italic" style={{ color: '#8A8A8A' }}>
            Tambahkan hingga 10 anggota tim dengan paket Pro
          </p>
        </div>
      </div>

      {/* ── Section 2: Peran & Izin ── */}
      <p className="text-sm font-bold text-white mt-7 mb-4">Peran & Izin Akses</p>

      <div className="flex flex-col gap-3">
        {ROLES.map((role) => (
          <div
            key={role.name}
            className="rounded-[10px] border-l-[3px]"
            style={{
              padding: 16,
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(10px)',
              border: `1px solid rgba(255,255,255,0.08)`,
              borderLeft: `3px solid ${role.border}`,
              opacity: role.locked ? 0.72 : 1,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{role.icon}</span>
                <span className="text-[13px] font-bold text-white">{role.name}</span>
                {role.locked && (
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, #F5E04A, #FFD700)', color: '#0F0F0F', letterSpacing: '0.04em' }}>
                    PRO
                  </span>
                )}
              </div>
              <span className="text-[11px]" style={{ color: '#8A8A8A' }}>{role.count}</span>
            </div>

            {/* Sub */}
            <p className="text-[11px] mt-1.5" style={{ color: '#8A8A8A' }}>{role.sub}</p>

            {/* Permission pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {role.perms.map((p) => (
                <span
                  key={p.label}
                  className="text-[10px] px-2.5 py-0.5 rounded-full"
                  style={{
                    background: p.ok ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                    color: p.ok ? '#fff' : '#666',
                    textDecoration: p.ok ? 'none' : 'line-through',
                  }}
                >
                  {p.ok ? '✓' : '✗'} {p.label}
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
  { icon: '📦', iconBg: 'rgba(139,75,190,0.15)', title: 'Data Produk',      sub: '1.248 produk · SKU, harga, kategori, stok', format: 'CSV',  pro: false },
  { icon: '💰', iconBg: 'rgba(0,255,127,0.12)',   title: 'Data Penjualan',   sub: '847 transaksi · Jan–Mei 2024',              format: 'XLSX', pro: false },
  { icon: '🧠', iconBg: 'rgba(0,255,255,0.12)',   title: 'Laporan Prediksi AI', sub: 'Forecasting & rekomendasi 30 hari terakhir', format: 'PDF', pro: false },
  { icon: '📊', iconBg: 'rgba(255,215,0,0.12)',   title: 'Histori Inventori', sub: 'Pergerakan stok 12 bulan terakhir',        format: 'CSV',  pro: false },
  { icon: '🗂️', iconBg: 'rgba(255,215,0,0.15)',  title: 'Ekspor Semua Data', sub: 'Backup lengkap seluruh data toko',         format: 'ZIP',  pro: true  },
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
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6, color: '#fff', fontSize: 11,
    padding: '0 8px', outline: 'none', cursor: 'pointer',
    appearance: 'none' as const,
  };

  const dateInputStyle: React.CSSProperties = {
    height: 36, width: 140,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 8, color: '#fff', fontSize: 12,
    padding: '0 12px', outline: 'none',
  };

  return (
    <div>
      <p className="text-lg font-bold text-white mb-1">Data & Ekspor</p>
      <p className="text-[13px] mb-6" style={{ color: '#8A8A8A' }}>
        Unduh, kelola, dan backup data bisnis Anda
      </p>

      {/* ── Section 1: Ekspor Data ── */}
      <div className="rounded-xl" style={{ padding: 24, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-sm font-bold text-white mb-5">Ekspor Data</p>

        <div className="flex flex-col gap-3">
          {EXPORT_ROWS.map((row) => (
            <motion.div
              key={row.title}
              whileHover={!row.pro ? { borderColor: '#00FFFF44' } : {}}
              className="flex items-center justify-between rounded-[10px] border transition-all"
              style={{
                padding: '14px 16px',
                background: row.pro ? 'rgba(255,215,0,0.04)' : 'rgba(255,255,255,0.04)',
                borderColor: row.pro ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.08)',
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
                  <p className="text-[13px] font-bold text-white">{row.title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#8A8A8A' }}>{row.sub}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {row.pro && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full mr-1"
                    style={{ background: 'linear-gradient(135deg, #F5E04A, #FFD700)', color: '#0F0F0F', letterSpacing: '0.04em' }}>
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
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#00FFFF'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  >
                    {['CSV', 'XLSX', 'PDF', 'ZIP'].map((f) => (
                      <option key={f} value={f} style={{ background: '#1a1a2e' }}>{f}</option>
                    ))}
                  </select>
                </div>

                <motion.button
                  whileHover={!row.pro ? { boxShadow: '0 0 14px rgba(74,16,99,0.6)', scale: 1.04 } : {}}
                  whileTap={!row.pro ? { scale: 0.96 } : {}}
                  className="text-[11px] font-bold text-white rounded-[6px] border-0"
                  style={{
                    height: 32, width: 72,
                    background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
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
          <span className="text-[12px]" style={{ color: '#8A8A8A' }}>Rentang Waktu:</span>
          <input
            type="text"
            defaultValue="01 Jan 2024"
            style={dateInputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#00FFFF'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          />
          <span style={{ color: '#8A8A8A' }}>—</span>
          <input
            type="text"
            defaultValue="31 Mei 2024"
            style={dateInputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#00FFFF'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          />
          <button
            className="text-[12px] font-semibold border-0"
            style={{ color: '#00FFFF', background: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
          >
            Terapkan
          </button>
        </div>
      </div>

      {/* ── Section 2: Backup & Restore ── */}
      <div className="rounded-xl mt-7" style={{ padding: 24, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-sm font-bold text-white mb-1">Backup & Restore</p>
        <p className="text-[12px] mb-5" style={{ color: '#8A8A8A' }}>
          Backup otomatis dilakukan setiap hari pukul 00.00
        </p>

        {/* Last backup */}
        <div
          className="flex items-center justify-between rounded-[10px] mb-5"
          style={{ padding: '14px 16px', background: 'rgba(0,255,127,0.06)', border: '1px solid rgba(0,255,127,0.2)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#00FF7F', boxShadow: '0 0 6px #00FF7F' }} />
            <span className="text-[13px] text-white">Backup terakhir: <strong>Hari ini, 00:05 WIB</strong></span>
          </div>
          <motion.button
            whileHover={{ borderColor: '#00FFFF', color: '#00FFFF' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs text-white border transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', cursor: 'pointer' }}
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
              borderBottom: i < BACKUP_HISTORY.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <span className="text-[12px]" style={{ color: '#8A8A8A' }}>{b.label}</span>
            <span className="text-[12px]" style={{ color: '#8A8A8A' }}>{b.size}</span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold" style={{ color: '#00FF7F' }}>✓ Selesai</span>
              <button
                className="text-[11px] font-semibold border-0"
                style={{ color: '#00FFFF', background: 'none', cursor: 'pointer' }}
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
            whileHover={{ boxShadow: '0 0 20px rgba(74,16,99,0.7)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-11 rounded-xl text-sm font-bold text-white border-0"
            style={{ minWidth: 200, padding: '0 24px', background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', cursor: 'pointer' }}
          >
            Buat Backup Sekarang
          </motion.button>
        </div>
      </div>

      {/* ── Section 3: Hapus Data (Danger Zone) ── */}
      <div
        className="rounded-xl mt-7"
        style={{ padding: 24, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(231,50,32,0.3)' }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: '#E63220' }}>⚠️ Zona Berbahaya</p>
        <p className="text-[12px]" style={{ color: 'rgba(231,50,32,0.7)' }}>
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
                <p className="text-[13px] text-white" style={{ fontWeight: row.bold ? 700 : 500 }}>{row.title}</p>
                <p className="text-[11px] mt-0.5" style={{ color: row.bold ? 'rgba(231,50,32,0.7)' : '#8A8A8A' }}>{row.sub}</p>
              </div>
              <motion.button
                whileHover={{ background: row.bold ? 'rgba(231,50,32,0.25)' : 'rgba(231,50,32,0.1)', borderColor: '#E63220' }}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 h-9 px-4 rounded-lg text-[12px] border transition-all"
                style={{
                  background: row.bold ? 'rgba(231,50,32,0.15)' : 'transparent',
                  borderColor: '#E63220',
                  color: '#E63220',
                  fontWeight: row.bold ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {row.btnLabel}
              </motion.button>
            </div>
          ))}
        </div>

        <p className="text-[11px] italic mt-4" style={{ color: '#8A8A8A' }}>
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
  { icon: '📚', title: 'Panduan Memulai RestockAI',          meta: '10 menit baca', soon: false },
  { icon: '🎥', title: 'Video Tutorial: Setup Integrasi POS', meta: '5 menit video', soon: false },
  { icon: '📊', title: 'Cara Membaca Laporan Prediksi AI',    meta: '8 menit baca', soon: false },
  { icon: '🔌', title: 'API Documentation untuk Developer',   meta: 'Teknis',        soon: false },
  { icon: '📱', title: 'Panduan Aplikasi Mobile RestockAI',   meta: 'Segera hadir',  soon: true  },
];

function BantuanSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  return (
    <div>
      <p className="text-lg font-bold text-white mb-1">Bantuan & Dukungan</p>
      <p className="text-[13px] mb-6" style={{ color: '#8A8A8A' }}>
        Temukan jawaban dan hubungi tim support kami
      </p>

      {/* ── Search bar ── */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none">🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari artikel bantuan..."
          className="w-full text-sm text-white placeholder-white/30 rounded-xl border transition-all focus:outline-none"
          style={{
            height: 52,
            paddingLeft: 52,
            paddingRight: 88,
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255,255,255,0.12)',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#00FFFF'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,255,0.1)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}
        />
        <motion.button
          whileHover={{ boxShadow: '0 0 14px rgba(74,16,99,0.6)' }}
          whileTap={{ scale: 0.96 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-4 rounded-lg text-xs font-bold text-white border-0"
          style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', cursor: 'pointer' }}
        >
          Cari
        </motion.button>
      </div>

      {/* ── Section 1: FAQ ── */}
      <p className="text-sm font-bold text-white mt-7 mb-4">Pertanyaan yang Sering Ditanya</p>

      <div className="rounded-xl border overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.1)' }}>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <button
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="w-full flex items-center justify-between text-left transition-colors"
                style={{
                  padding: '18px 20px',
                  background: isOpen ? 'rgba(255,255,255,0.04)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                }}
                onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = 'transparent'; }}
              >
                <span className="text-[13px] font-bold text-white pr-4">{item.q}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ flexShrink: 0 }}
                >
                  <ChevronDown size={16} color={isOpen ? '#fff' : '#8A8A8A'} />
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
                      <p className="text-[13px]" style={{ color: '#8A8A8A', lineHeight: 1.7 }}>{item.a}</p>
                      <button
                        className="text-[12px] font-semibold mt-2 border-0"
                        style={{ color: '#00FFFF', background: 'none', cursor: 'pointer' }}
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
      <p className="text-sm font-bold text-white mt-7 mb-4">Hubungi Kami</p>

      <div className="grid grid-cols-3 gap-3.5">
        {/* Live Chat */}
        <SupportCard
          icon="💬" iconBg="rgba(0,255,255,0.12)"
          title="Live Chat" sub="Response dalam 2 menit"
          statusDot="#00FF7F" statusText="Online sekarang"
          btnLabel="Mulai Chat"
          btnStyle={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)' }}
        />
        {/* WhatsApp */}
        <SupportCard
          icon="📱" iconBg="rgba(0,255,127,0.12)"
          title="WhatsApp" sub="Response dalam 1 jam"
          statusDot="#00FF7F" statusText="Senin–Sabtu, 08.00–21.00"
          btnLabel="Chat WhatsApp"
          btnStyle={{ background: '#25D366' }}
        />
        {/* Email */}
        <SupportCard
          icon="✉️" iconBg="rgba(139,75,190,0.15)"
          title="Email Support" sub="Response dalam 24 jam"
          statusDot="#8A8A8A" statusText="support@restockai.id"
          btnLabel="Kirim Email"
          btnStyle={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
        />
      </div>

      {/* ── Section 3: Dokumentasi ── */}
      <p className="text-sm font-bold text-white mt-7 mb-4">Dokumentasi & Panduan</p>

      <div className="flex flex-col gap-2">
        {DOC_ROWS.map((row, i) => (
          <motion.div
            key={i}
            whileHover={{ borderColor: '#00FFFF', background: 'rgba(255,255,255,0.04)' }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center gap-3 rounded-[10px] border cursor-pointer transition-all"
            style={{
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-xl flex-shrink-0">{row.icon}</span>
            <span className="text-[13px] text-white flex-1">{row.title}</span>
            {row.soon ? (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #F5E04A, #FFD700)', color: '#0F0F0F' }}>
                Soon
              </span>
            ) : (
              <span className="text-[11px] flex-shrink-0" style={{ color: '#8A8A8A' }}>{row.meta}</span>
            )}
            <span className="text-[14px] ml-1 flex-shrink-0" style={{ color: '#8A8A8A' }}>→</span>
          </motion.div>
        ))}
      </div>

      {/* ── Version Info ── */}
      <div
        className="flex items-center justify-between rounded-[10px] mt-7"
        style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <span className="text-[11px]" style={{ color: '#8A8A8A' }}>
          RestockAI v1.0.4 · Terakhir diperbarui: 28 Mei 2024
        </span>
        <motion.button
          whileHover={{ borderColor: '#00FFFF', color: '#00FFFF' }}
          whileTap={{ scale: 0.96 }}
          className="h-8 px-3 rounded-lg text-[11px] text-white border transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', cursor: 'pointer' }}
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
  icon: string; iconBg: string; title: string; sub: string;
  statusDot: string; statusText: string; btnLabel: string;
  btnStyle: React.CSSProperties;
}) {
  return (
    <motion.div
      whileHover={{ translateY: -2, borderColor: '#00FFFF' }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center text-center rounded-xl border cursor-pointer transition-all"
      style={{
        padding: 20,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: iconBg }}>
        {icon}
      </div>
      <p className="text-sm font-bold text-white mt-3">{title}</p>
      <p className="text-[11px] mt-1" style={{ color: '#8A8A8A' }}>{sub}</p>
      <div className="flex items-center gap-1.5 mt-1.5">
        <div className="w-2 h-2 rounded-full" style={{ background: statusDot, boxShadow: statusDot !== '#8A8A8A' ? `0 0 5px ${statusDot}` : 'none' }} />
        <span className="text-[10px]" style={{ color: statusDot !== '#8A8A8A' ? statusDot : '#8A8A8A' }}>{statusText}</span>
      </div>
      <motion.button
        whileHover={{ opacity: 0.9, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full h-10 rounded-lg text-xs font-bold text-white mt-4 border-0"
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
      <p className="text-sm font-bold text-white mb-1">{label}</p>
      <p className="text-xs" style={{ color: '#8A8A8A' }}>Segera hadir di versi berikutnya</p>
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
        return <PlaceholderSection icon={item?.icon ?? '⚙️'} label={item?.label ?? ''} />;
    }
  };

  const sectionTitle = NAV_ITEMS.find((n) => n.id === activeSection)?.label ?? '';

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(180deg, #0F0F0F 0%, #1a0f2e 100%)' }}>
      <Sidebar activePage="pengaturan" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 32px' }}>
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-white">Pengaturan</h1>
          <p className="text-[13px] mt-1" style={{ color: '#8A8A8A' }}>Kelola preferensi dan konfigurasi akun Anda</p>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-5 mt-6">

          {/* ── Left Nav ── */}
          <div
            className="flex-shrink-0 rounded-xl"
            style={{
              width: 220,
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
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
                    background: isActive ? 'linear-gradient(135deg, #4A1063, #8B4BBE)' : 'transparent',
                    borderLeftColor: isActive ? '#00FF7F' : 'transparent',
                    color: isActive ? '#fff' : '#8A8A8A',
                    fontWeight: isActive ? 700 : 400,
                    fontSize: 13,
                    border: 'none',
                    borderLeft: isActive ? '3px solid #00FF7F' : '3px solid transparent',
                    cursor: 'pointer',
                    marginBottom: 2,
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #F5E04A, #FFD700)', color: '#0F0F0F', letterSpacing: '0.04em' }}
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
                className="rounded-xl border"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(255,255,255,0.1)',
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
