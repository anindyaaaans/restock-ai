import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Bell, PackageX, CalendarClock, Sparkles, CheckCircle2, Tag, type LucideIcon } from 'lucide-react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertType = 'stockout' | 'expiry' | 'ai' | 'po' | 'promo';

interface Notification {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  fullMessage: string;
  timestamp: string;
  actionLabel: string;
  actionPath?: string;
  fields: { label: string; value: string }[];
  read: boolean;
  category: 'stockout' | 'expiry' | 'ai' | 'po';
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<AlertType, { color: '#1A1A1B'; bg: string; icon: LucideIcon }> = {
  stockout: { color: '#1A1A1B', bg: 'rgba(255,0,127,0.18)',   icon: PackageX },
  expiry:   { color: '#1A1A1B', bg: 'rgba(245,224,74,0.18)',  icon: CalendarClock },
  ai:       { color: '#1A1A1B', bg: 'rgba(0,255,255,0.18)',   icon: Sparkles },
  po:       { color: '#1A1A1B', bg: 'rgba(0,255,127,0.18)',   icon: CheckCircle2 },
  promo:    { color: '#1A1A1B', bg: 'rgba(245,200,150,0.18)', icon: Tag },
};

const TABS = [
  { id: 'all',      label: 'Semua' },
  { id: 'stockout', label: 'Stockout' },
  { id: 'expiry',   label: 'Kadaluarsa' },
  { id: 'ai',       label: 'AI Insight' },
  { id: 'po',       label: 'PO Update' },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'stockout',
    category: 'stockout',
    title: ' Beras Premium Habis',
    description: 'Stok Beras Premium 5kg sudah habis. Silakan Optimalkan Segera.',
    fullMessage: 'Stok Beras Premium 5kg sudah habis sejak 10 menit lalu. Silakan lakukan Optimalkan Segera untuk menghindari kehilangan penjualan. Produk ini termasuk top-seller dengan rata-rata 45 pcs terjual per hari.',
    timestamp: '10 menit lalu',
    actionLabel: 'Tindak Lanjut →',
    fields: [
      { label: 'Produk',        value: 'Beras Premium 5kg' },
      { label: 'SKU',           value: 'BRS-001' },
      { label: 'Last stock',    value: '0 pcs' },
      { label: 'Waktu notif',   value: '10 menit lalu' },
    ],
    read: false,
  },
  {
    id: 'n2',
    type: 'expiry',
    category: 'expiry',
    title: ' Gula Pasir Akan Kadaluarsa',
    description: 'Gula Pasir 1kg akan kadaluarsa dalam 3 hari. Pertimbangkan untuk diskon/promo.',
    fullMessage: 'Gula Pasir 1kg (SKU: GUL-003) akan melewati tanggal kadaluarsa pada 20 Mei 2024. Tersisa 48 pcs di gudang. Disarankan untuk menjalankan promo flash sale atau bundle untuk menghabiskan stok sebelum kadaluarsa.',
    timestamp: '2 jam lalu',
    actionLabel: 'Tindak Lanjut →',
    fields: [
      { label: 'Produk',          value: 'Gula Pasir 1kg' },
      { label: 'SKU',             value: 'GUL-003' },
      { label: 'Sisa stok',       value: '48 pcs' },
      { label: 'Kadaluarsa',      value: '20 Mei 2024 (3 hari lagi)' },
    ],
    read: false,
  },
  {
    id: 'n3',
    type: 'ai',
    category: 'ai',
    title: ' Rekomendasi: Tingkatkan Stok Beras',
    description: 'Berdasarkan prediksi AI, permintaan beras meningkat 30% minggu depan.',
    fullMessage: 'Model prediksi AI mendeteksi pola musiman dan tren kenaikan permintaan untuk Beras Premium 5kg. Diperkirakan permintaan akan naik 30% pada minggu depan (17–23 Mei). Disarankan menambah stok minimal 150 pcs sebelum tanggal 16 Mei.',
    timestamp: '4 jam lalu',
    actionLabel: 'Lihat Prediksi →',
    actionPath: '/dashboard/prediksi',
    fields: [
      { label: 'Produk',            value: 'Beras Premium 5kg' },
      { label: 'Prediksi demand',   value: '+30% (minggu depan)' },
      { label: 'Rekomendasi stok',  value: '150 pcs tambahan' },
      { label: 'Deadline restok',   value: '16 Mei 2024' },
    ],
    read: false,
  },
  {
    id: 'n4',
    type: 'po',
    category: 'po',
    title: 'PO Dikonfirmasi Supplier',
    description: 'PO-2024-05-001 untuk Beras dan Minyak sudah dikonfirmasi. Pengiriman 30 Mei.',
    fullMessage: 'Purchase Order PO-2024-05-001 telah dikonfirmasi oleh PT Sumber Makmur. Order meliputi Beras Premium 5kg (200 pcs) dan Minyak Goreng 2L (100 pcs). Estimasi tiba di gudang: 30 Mei 2024.',
    timestamp: '1 hari lalu',
    actionLabel: 'Lihat PO →',
    actionPath: '/dashboard/pembelian',
    fields: [
      { label: 'Nomor PO',    value: 'PO-2024-05-001' },
      { label: 'Supplier',    value: 'PT Sumber Makmur' },
      { label: 'Total item',  value: '2 produk, 300 pcs' },
      { label: 'Estimasi tiba', value: '30 Mei 2024' },
    ],
    read: true,
  },
  {
    id: 'n5',
    type: 'stockout',
    category: 'stockout',
    title: ' Minyak Goreng Hampir Habis',
    description: 'Stok Minyak Goreng 2L tersisa 5 pcs. Perkiraan habis dalam 2 hari.',
    fullMessage: 'Stok Minyak Goreng 2L (SKU: MYK-002) saat ini tersisa 5 pcs. Berdasarkan rata-rata penjualan harian 3 pcs, diperkirakan stok akan habis dalam 2 hari. Segera buat Purchase Order ke supplier.',
    timestamp: '5 jam lalu',
    actionLabel: 'Tindak Lanjut →',
    fields: [
      { label: 'Produk',        value: 'Minyak Goreng 2L' },
      { label: 'SKU',           value: 'MYK-002' },
      { label: 'Sisa stok',     value: '5 pcs' },
      { label: 'Est. habis',    value: '2 hari lagi' },
    ],
    read: false,
  },
  {
    id: 'n6',
    type: 'ai',
    category: 'ai',
    title: ' Insight: Penjualan Indomie Turun',
    description: 'Penjualan Indomie Goreng turun 15% dalam 2 minggu terakhir.',
    fullMessage: 'AI mendeteksi penurunan penjualan Indomie Goreng sebesar 15% selama 2 minggu terakhir. Kemungkinan penyebab: harga kompetitor lebih rendah atau perubahan preferensi pelanggan. Disarankan untuk meninjau harga jual atau membuat bundling promo.',
    timestamp: '1 hari lalu',
    actionLabel: 'Lihat Analitik →',
    actionPath: '/dashboard/laporan',
    fields: [
      { label: 'Produk',        value: 'Indomie Goreng' },
      { label: 'SKU',           value: 'MIE-005' },
      { label: 'Penurunan',     value: '-15% (2 minggu)' },
      { label: 'Rekomendasi',   value: 'Review harga / promo' },
    ],
    read: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function NotifItem({
  notif,
  selected,
  onClick,
}: {
  notif: Notification;
  selected: boolean;
  onClick: () => void;
}) {
  const cfg = TYPE_CONFIG[notif.type];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex gap-3 cursor-pointer border-b relative"
      style={{
        padding: '16px 24px',
        borderBottomColor: 'rgba(0, 0, 0, 0.03)',
        borderLeftWidth: 3,
        borderLeftStyle: 'solid',
        borderLeftColor: selected ? cfg.color : hovered ? cfg.color + '88' : 'transparent',
        background: selected
          ? 'rgba(255,255,255,0.07)'
          : hovered
          ? 'rgba(0, 0, 0, 0.03)'
          : 'transparent',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Unread dot */}
      {!notif.read && (
        <div
          className="absolute right-5 top-5 w-2 h-2 rounded-full"
          style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
        />
      )}

      {/* Icon circle */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: cfg.bg }}
      >
        <cfg.icon size={18} color={cfg.color} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2 mb-1">
          <p className="text-[13px] font-bold text-[#1A1A1B] leading-snug">{notif.title}</p>
          <span className="text-[10px] text-[#4B5563] whitespace-nowrap flex-shrink-0">
            {notif.timestamp}
          </span>
        </div>
        <p className="text-[12px] text-[#4B5563]" style={{ lineHeight: 1.5 }}>
          {notif.description}
        </p>
        <button
          className="text-[11px] font-bold mt-1.5"
          style={{ color: '#1A1A1B' }}
        >
          {notif.actionLabel}
        </button>
      </div>
    </motion.div>
  );
}

function DetailPanel({ notif }: { notif: Notification | null }) {
  const navigate = useNavigate();
  const cfg = notif ? TYPE_CONFIG[notif.type] : null;

  return (
    <AnimatePresence mode="wait">
      {notif && cfg ? (
        <motion.div
          key={notif.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col h-full"
        >
          {/* Large icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: cfg.bg, boxShadow: `0 4px 20px ${cfg.color}33` }}
          >
            <cfg.icon size={26} color={cfg.color} />
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-[#1A1A1B] mb-3" style={{ lineHeight: 1.3 }}>
            {notif.title}
          </h2>

          {/* Full message */}
          <p className="text-[13px] text-[#4B5563]" style={{ lineHeight: 1.7 }}>
            {notif.fullMessage}
          </p>

          {/* Divider */}
          <div className="my-6 h-px" style={{ background: 'rgba(0, 0, 0, 0.05)' }} />

          {/* Detail fields */}
          <div className="flex flex-col gap-3">
            {notif.fields.map((f) => (
              <div key={f.label} className="flex justify-between items-center">
                <span className="text-[12px] text-[#4B5563]">{f.label}</span>
                <span className="text-[12px] font-semibold text-[#1A1A1B] text-right ml-4">{f.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-auto pt-6 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255, 225, 111,0.6)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => notif.actionPath && navigate(notif.actionPath)}
              className="w-full font-bold text-sm text-[#1A1A1B] rounded-full"
              style={{
                height: 44,
                background: '#FFE16F',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Buat PO Sekarang
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: `0 0 16px ${cfg.color}44` }}
              whileTap={{ scale: 0.97 }}
              onClick={() => notif.actionPath && navigate(notif.actionPath)}
              className="w-full font-bold text-sm rounded-full"
              style={{
                height: 40,
                background: 'transparent',
                border: '1px solid #98E2FD',
                color: '#1A1A1B',
                cursor: 'pointer',
              }}
            >
              Lihat Produk
            </motion.button>
          </div>

          {/* Timestamp */}
          <p className="text-[10px] text-[#4B5563] text-center mt-4">{notif.timestamp}</p>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center h-full text-center"
          style={{ padding: '60px 20px' }}
        >
          <Bell size={44} className="mb-4 text-[#4B5563]" />
          <p className="text-sm text-[#4B5563]" style={{ lineHeight: 1.6 }}>
            Pilih notifikasi dari kiri<br />untuk melihat detail
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Notifikasi() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>('n1');
  const [readIds, setReadIds] = useState<Set<string>>(
    new Set(NOTIFICATIONS.filter((n) => n.read).map((n) => n.id))
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setReadIds((prev) => new Set([...prev, id]));
  };

  const filtered = NOTIFICATIONS.filter((n) => {
    if (activeTab === 'all') return true;
    return n.category === activeTab;
  });

  const selectedNotif = NOTIFICATIONS.find((n) => n.id === selectedId) ?? null;
  const unreadCount = NOTIFICATIONS.filter((n) => !readIds.has(n.id)).length;

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: '#f8fafc' }}
    >
      <Sidebar activePage="notifikasi" />
      <Navbar />

      <main className="ml-60" style={{ padding: '96px 40px 32px' }}>
        {/* Page header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1B]">NOTIFIKASI & ALERT</h1>
            <p className="text-sm text-[#4B5563] mt-1">Pantau semua alert dan insight bisnis Anda</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-2 rounded-2xl border text-sm font-bold"
            style={{
              background: 'rgba(255,0,127,0.12)',
              borderColor: 'rgba(255,0,127,0.4)',
              color: '#1A1A1B',
            }}
          >
            {unreadCount} belum dibaca
          </motion.div>
        </div>

        {/* Split layout */}
        <div className="flex gap-5" style={{ height: 'calc(100vh - 200px)' }}>

          {/* ── LEFT: Notification List ── */}
          <div
            className="flex flex-col rounded-[20px] border overflow-hidden"
            style={{
              width: '65%',
              flexShrink: 0,
              background: '#ffffff', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Sticky header */}
            <div
              className="flex-shrink-0 border-b"
              style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}
            >
              <div style={{ padding: '20px 24px 16px' }}>
                <p className="text-sm font-bold text-[#1A1A1B]">PUSAT NOTIFIKASI</p>
                <p className="text-[12px] text-[#4B5563] mt-0.5">{unreadCount} notifikasi baru</p>
              </div>

              {/* Filter tabs */}
              <div
                className="flex border-b"
                style={{
                  padding: '0 24px',
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                  gap: 0,
                }}
              >
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="text-[13px] font-bold pb-3 mr-6 transition-all"
                      style={{
                        color: '#1A1A1B',
                        background: 'none',
                        border: 'none',
                        borderBottom: isActive ? '3px solid #D1F07B' : '3px solid transparent',
                        cursor: 'pointer',
                        paddingBottom: 12,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.borderBottomColor = '#98E2FD88';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.borderBottomColor = 'transparent';
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              <AnimatePresence initial={false}>
                {filtered.length > 0 ? (
                  filtered.map((notif, i) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <NotifItem
                        notif={{ ...notif, read: readIds.has(notif.id) }}
                        selected={selectedId === notif.id}
                        onClick={() => handleSelect(notif.id)}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <Bell size={36} className="mb-3 text-[#1A1A1B]" />
                    <p className="text-sm text-[#4B5563]">Tidak ada notifikasi di kategori ini</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT: Detail Panel ── */}
          <div
            className="flex-1 rounded-[20px] border overflow-y-auto"
            style={{
              background: '#f8fafc',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(0, 0, 0, 0.08)',
              padding: 28,
              scrollbarWidth: 'none',
            }}
          >
            <DetailPanel notif={selectedNotif} />
          </div>

        </div>
      </main>
    </div>
  );
}
