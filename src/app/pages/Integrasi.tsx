import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';

interface Integration {
  id: string;
  name: string;
  description: string;
  logoFile: string;
  logoBg: string;
  connected: boolean;
  lastSync?: string;
  category: string;
}

const integrations: Integration[] = [
  // POS
  {
    id: 'moka',
    name: 'Moka',
    description: 'Sinkronisasi penjualan otomatis dari Moka POS secara real-time',
    logoFile: '/logos/logo moka.png',
    logoBg: '#fff',
    connected: true,
    lastSync: '10 menit lalu',
    category: 'pos'
  },
  {
    id: 'majoo',
    name: 'Majoo',
    description: 'Integrasi dengan Majoo POS untuk sinkronisasi data transaksi',
    logoFile: '/logos/logo majoo.jpeg',
    logoBg: '#fff',
    connected: false,
    category: 'pos'
  },
  {
    id: 'olsera',
    name: 'Olsera',
    description: 'Hubungkan Olsera POS untuk manajemen stok yang terintegrasi',
    logoFile: '/logos/logo olsera.jpeg',
    logoBg: '#fff',
    connected: false,
    category: 'pos'
  },
  // Akuntansi
  {
    id: 'jurnal',
    name: 'Jurnal',
    description: 'Sinkronisasi laporan keuangan otomatis dengan Jurnal.id',
    logoFile: '/logos/logo jurnal.png',
    logoBg: '#fff',
    connected: false,
    category: 'akuntansi'
  },
  {
    id: 'accurate',
    name: 'Accurate',
    description: 'Integrasi dengan Accurate Online untuk pembukuan bisnis Anda',
    logoFile: '/logos/logo accurate.webp',
    logoBg: '#fff',
    connected: false,
    category: 'akuntansi'
  },
  // Supplier & Logistik
  {
    id: 'gudangada',
    name: 'GudangAda',
    description: 'Pesan stok langsung ke supplier lewat platform GudangAda',
    logoFile: '/logos/logo gudangada.png',
    logoBg: '#fff',
    connected: false,
    category: 'logistik'
  },
  {
    id: 'deliveree',
    name: 'Deliveree',
    description: 'Atur pengiriman barang dengan armada Deliveree secara mudah',
    logoFile: '/logos/logo Deliveree.png',
    logoBg: '#fff',
    connected: false,
    category: 'logistik'
  },
  {
    id: 'jntcargo',
    name: 'J&T Cargo',
    description: 'Lacak dan kelola pengiriman kargo J&T secara terintegrasi',
    logoFile: '/logos/logo J&T Cargo.png',
    logoBg: '#fff',
    connected: false,
    category: 'logistik'
  },
  // Fintech
  {
    id: 'modalku',
    name: 'Modalku',
    description: 'Akses modal usaha fleksibel lewat platform pinjaman Modalku',
    logoFile: '/logos/logo modalku.png',
    logoBg: '#fff',
    connected: false,
    category: 'fintech'
  }
];

const categories = [
  { id: 'pos', label: '📱 SISTEM POS' },
  { id: 'akuntansi', label: '📊 SOFTWARE AKUNTANSI' },
  { id: 'logistik', label: '🚚 SUPPLIER & LOGISTIK' },
  { id: 'fintech', label: '💰 FINTECH & LENDING' }
];

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export default function Integrasi() {
  const [connectionState, setConnectionState] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map((i) => [i.id, i.connected]))
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const handleToggle = async (integration: Integration) => {
    setLoadingId(integration.id);
    await new Promise((r) => setTimeout(r, 800));
    const wasConnected = connectionState[integration.id];
    setConnectionState((prev) => ({ ...prev, [integration.id]: !prev[integration.id] }));
    setLoadingId(null);
    if (wasConnected) {
      showToast(`${integration.name} berhasil diputuskan`, 'error');
    } else {
      showToast(`${integration.name} berhasil terhubung!`, 'success');
    }
  };

  const connectedCount = Object.values(connectionState).filter(Boolean).length;

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: 'linear-gradient(180deg, #0F0F0F 0%, #1a0f2e 100%)' }}
    >
      <Sidebar activePage="integrasi" />
      <Navbar />

      {/* Toast Notifications */}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              className="px-5 py-3 rounded-xl text-sm font-bold text-white shadow-xl"
              style={{
                background:
                  toast.type === 'success'
                    ? 'linear-gradient(135deg, rgba(0,200,100,0.95), rgba(0,255,127,0.85))'
                    : 'linear-gradient(135deg, rgba(230,50,32,0.95), rgba(255,80,60,0.85))',
                backdropFilter: 'blur(12px)',
                boxShadow:
                  toast.type === 'success'
                    ? '0 8px 24px rgba(0,255,127,0.3)'
                    : '0 8px 24px rgba(230,50,32,0.3)'
              }}
            >
              {toast.type === 'success' ? '✓' : '✕'} {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <main className="ml-60" style={{ padding: '96px 40px 32px' }}>
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-white">INTEGRASI & KONEKSI</h1>
            <p className="text-sm text-[#E8E8E8] mt-1">
              Hubungkan RestockAI dengan tools bisnis Anda
            </p>
          </div>

          {/* Summary Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 rounded-full border text-sm font-bold"
            style={{
              background: 'rgba(0,255,127,0.12)',
              borderColor: 'rgba(0,255,127,0.4)',
              color: '#00FF7F'
            }}
          >
            {connectedCount} dari {integrations.length} terhubung
          </motion.div>
        </div>

        {/* Category Sections */}
        {categories.map((category, catIndex) => {
          const categoryIntegrations = integrations.filter((i) => i.category === category.id);
          return (
            <div key={category.id}>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: catIndex * 0.08 }}
                className="text-sm font-bold text-white"
                style={{ marginTop: catIndex === 0 ? 32 : 36, marginBottom: 12 }}
              >
                {category.label}
              </motion.p>

              <div
                className="grid gap-5"
                style={{
                  gridTemplateColumns: 'repeat(3, 1fr)'
                }}
              >
                {categoryIntegrations.map((integration, idx) => (
                  <IntegrationCard
                    key={integration.id}
                    integration={integration}
                    isConnected={connectionState[integration.id]}
                    isLoading={loadingId === integration.id}
                    onToggle={() => handleToggle(integration)}
                    delay={catIndex * 0.08 + idx * 0.06}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Bottom spacing */}
        <div className="h-10" />
      </main>
    </div>
  );
}

interface CardProps {
  integration: Integration;
  isConnected: boolean;
  isLoading: boolean;
  onToggle: () => void;
  delay: number;
}

function IntegrationCard({ integration, isConnected, isLoading, onToggle, delay }: CardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ translateY: -4 }}
      className="relative border rounded-2xl flex flex-col cursor-pointer"
      style={{
        height: 260,
        padding: 24,
        background: isConnected
          ? `rgba(0, 255, 127, 0.08)`
          : 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(12px)',
        borderColor: hovered
          ? '#00FFFF'
          : isConnected
          ? 'rgba(0, 255, 127, 0.35)'
          : 'rgba(255, 255, 255, 0.15)',
        boxShadow: hovered
          ? '0 12px 32px rgba(0, 255, 255, 0.2)'
          : isConnected
          ? '0 4px 16px rgba(0, 255, 127, 0.08)'
          : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Status Badge — top right */}
      <div className="absolute top-5 right-5">
        {isConnected ? (
          <span
            className="text-[10px] font-bold text-white px-3 py-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #00C853, #00FF7F)',
              boxShadow: '0 0 10px rgba(0, 255, 127, 0.5)'
            }}
          >
            ✓ Terhubung
          </span>
        ) : (
          <span
            className="text-[10px] font-bold text-[#E8E8E8] px-3 py-1 rounded-full"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            Tidak Terhubung
          </span>
        )}
      </div>

      {/* Logo */}
      <div
        className="w-[60px] h-[60px] rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{
          background: integration.logoBg,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          padding: 6,
        }}
      >
        <img
          src={integration.logoFile}
          alt={integration.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-white mt-4">{integration.name}</h3>

      {/* Description */}
      <p
        className="text-xs text-[#E8E8E8] mt-1"
        style={{ lineHeight: 1.5 }}
      >
        {integration.description}
      </p>

      {/* Last sync */}
      {isConnected && (
        <p className="text-[10px] text-[#E8E8E8] mt-2">
          Sinkronisasi terakhir: {integration.lastSync ?? 'baru saja'}
        </p>
      )}

      {/* Action Button — pushed to bottom */}
      <div className="mt-auto">
        {isConnected ? (
          <motion.button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            whileHover={{ boxShadow: '0 0 16px rgba(230, 50, 32, 0.5)' }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
            className="w-full h-10 rounded-xl text-sm font-bold border transition-all"
            style={{
              background: 'transparent',
              borderColor: '#E63220',
              color: '#E63220'
            }}
          >
            {isLoading ? <SpinnerIcon /> : 'Disconnect'}
          </motion.button>
        ) : (
          <motion.button
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139, 75, 190, 0.6)' }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full h-10 rounded-xl text-sm font-bold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #4A1063, #8B4BBE)'
            }}
          >
            {isLoading ? <SpinnerIcon /> : 'Hubungkan'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin mx-auto"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="25 10"
        strokeLinecap="round"
      />
    </svg>
  );
}
