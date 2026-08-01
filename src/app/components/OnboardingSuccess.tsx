import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sparkles, LayoutDashboard, Bell, TrendingUp } from 'lucide-react';
import RestockAIMascot from './brand/RestockAIMascot';
import RestockAILogo from './brand/RestockAILogo';

const beforeItems = [
  { text: 'Cek stok manual — 2–3 jam per hari' },
  { text: 'Kehabisan barang (stockout) 5–8x per bulan' },
  { text: 'Overstock tidak terdeteksi, modal tertahan' },
  { text: 'Beli dari supplier termahal tanpa tahu alternatif' },
  { text: 'Laporan dibuat manual di Excel' },
];

const afterItems = [
  { text: 'AI prediksi otomatis — 0 menit cek manual' },
  { text: '0 stockout — alert restock 7 hari lebih awal' },
  { text: '17 overstock terdeteksi, Rp 8.4 Jt dibebaskan' },
  { text: 'Hemat 18% dari Supplier Terbaik (GudangAda)' },
  { text: 'Laporan arus kas real-time, otomatis' },
];

export default function OnboardingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)',
              'linear-gradient(135deg, #E2E8F0 0%, #FFFFFF 100%)',
              'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Celebratory Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? '#D1F07B' : i % 3 === 1 ? '#98E2FD' : '#1A1A1B',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Success Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[840px]"
      >
        {/* Success Card */}
        <div
          className="rounded-2xl p-12 border text-center"
          style={{
            background: 'rgba(0, 0, 0, 0.04)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <RestockAILogo size={44} showWordmark wordmarkColor="light" />
          </div>

          {/* Mascot */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
            className="flex justify-center mb-4"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <RestockAIMascot size={140} expression="excited" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-[#1A1A1B] mb-4"
          >
            Selamat Datang di Restock AI!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[#4B5563] mb-8 leading-relaxed"
          >
            Akun Anda berhasil dibuat! Kami sedang menyinkronkan data inventory Anda dan menyiapkan dashboard prediksi AI.
          </motion.p>

          {/* Quick wins strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-3 mb-8 text-left"
          >
            {[
              { icon: Sparkles, text: 'AI analisis pola penjualan' },
              { icon: LayoutDashboard, text: 'Dashboard real-time aktif' },
              { icon: Bell, text: 'Notifikasi restock otomatis' },
              { icon: TrendingUp, text: 'Prediksi demand 30 hari' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-gray-100"
              >
                <item.icon size={20} className="text-[#1A1A1B]" />
                <span className="text-xs text-[#4B5563]">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="w-full h-14 rounded-full font-bold cursor-pointer transition-all"
            style={{
              background: '#FFE16F',
              color: '#1A1A1B',
              boxShadow: '0 8px 32px rgba(245, 224, 74, 0.4)'
            }}
          >
            Mulai Eksplorasi Dashboard →
          </motion.button>
        </div>

        {/* ─── Before / After ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-5 rounded-2xl border overflow-hidden"
          style={{
            background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Section label */}
          <div
            className="px-6 py-3 border-b flex items-center gap-2"
            style={{ borderColor: 'rgba(0, 0, 0, 0.04)' }}
          >
            <span className="text-[11px] uppercase tracking-widest text-[#4B5563] font-semibold">
              Dampak Nyata Restock AI untuk Toko Anda
            </span>
          </div>

          <div className="grid grid-cols-2">
            {/* Before */}
            <div
              className="p-6 border-r"
              style={{ borderColor: 'rgba(0, 0, 0, 0.04)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(255,80,80,0.2)', color: '#1A1A1B' }}
                >
                  ✕
                </span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#1A1A1B' }}>
                  Sebelum Restock AI
                </span>
              </div>
              <div className="space-y-3">
                {beforeItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + i * 0.07 }}
                    className="flex items-start gap-2.5"
                  >
                    <span className="mt-0.5 shrink-0 text-[#FF5050] text-sm">✕</span>
                    <span className="text-xs text-[#999] leading-relaxed">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="p-6" style={{ background: 'rgba(0,255,127,0.03)' }}>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(0,255,127,0.2)', color: '#1A1A1B' }}
                >
                  
                </span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#1A1A1B' }}>
                  Sesudah Restock AI
                </span>
              </div>
              <div className="space-y-3">
                {afterItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + i * 0.07 }}
                    className="flex items-start gap-2.5"
                  >
                    <span className="mt-0.5 shrink-0 text-sm" style={{ color: '#1A1A1B' }}></span>
                    <span className="text-xs text-[#4B5563] leading-relaxed">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div
            className="px-6 py-3 border-t flex items-center justify-between"
            style={{ borderColor: 'rgba(0, 0, 0, 0.04)', background: 'rgba(0,255,127,0.03)' }}
          >
            <span className="text-[10px] text-[#555]">
              Berdasarkan rata-rata pengguna aktif Restock AI bulan pertama
            </span>
            <span className="text-[11px] font-bold" style={{ color: '#1A1A1B' }}>
              +46% arus kas bebas 
            </span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
