import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sparkles } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';

interface POSCard {
  id: string;
  name: string;
  description: string;
  logoFile: string;
  isPopular?: boolean;
}

export default function OnboardingStep3() {
  const navigate = useNavigate();
  const [selectedPOS, setSelectedPOS] = useState<string | null>(null);

  const posCards: POSCard[] = [
    {
      id: 'moka',
      name: 'Moka',
      description: 'Sinkronisasi penjualan otomatis dari Moka',
      logoFile: '/logos/logo moka.png',
      isPopular: true
    },
    {
      id: 'majoo',
      name: 'Majoo',
      description: 'Integrasi dengan Majoo POS',
      logoFile: '/logos/logo majoo.jpeg'
    },
    {
      id: 'olsera',
      name: 'Olsera',
      description: 'Koneksi otomatis ke Olsera',
      logoFile: '/logos/logo olsera.jpeg'
    }
  ];

  const handleConnect = (posId: string) => {
    setSelectedPOS(posId);
    // Simulate connection
    setTimeout(() => {
      navigate('/onboarding/success');
    }, 1000);
  };

  const handleSkip = () => {
    navigate('/onboarding/success');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #0F0F0F 0%, #2a0f4a 100%)',
              'linear-gradient(135deg, #2a0f4a 0%, #0F0F0F 100%)',
              'linear-gradient(135deg, #0F0F0F 0%, #2a0f4a 100%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Shapes */}
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8B4BBE, transparent)' }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[900px]"
      >
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={3} />

        {/* Form Card */}
        <div
          className="rounded-3xl p-12 border"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-3">
            Hubungkan Sistem POS Anda
          </h1>
          <p className="text-sm text-[#E8E8E8] mb-10">
            Langkah 3 dari 3 - Pilih POS yang Anda gunakan atau lewati dulu
          </p>

          {/* Integration Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {posCards.map((pos) => (
              <motion.div
                key={pos.id}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl p-7 border transition-all cursor-pointer flex flex-col"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(10px)',
                  borderColor: selectedPOS === pos.id ? 'rgba(0, 255, 127, 0.8)' : 'rgba(255, 255, 255, 0.15)',
                  height: '280px',
                  boxShadow: selectedPOS === pos.id ? '0 12px 32px rgba(0, 255, 127, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedPOS !== pos.id) {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.6)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPOS !== pos.id) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Popular Badge */}
                {pos.isPopular && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #FF00FF, #00FFFF)' }}
                  >
                    Popular
                  </div>
                )}

                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{ background: '#fff', padding: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}
                  >
                    <img
                      src={pos.logoFile}
                      alt={pos.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold mb-3 text-center">
                  {pos.name}
                </h3>

                {/* Description */}
                <p className="text-[#E8E8E8] text-xs leading-relaxed text-center mb-auto">
                  {pos.description}
                </p>

                {/* Button */}
                <motion.button
                  type="button"
                  onClick={() => handleConnect(pos.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-11 rounded-xl font-bold text-sm transition-all mt-6"
                  style={{
                    background: 'linear-gradient(135deg, #00FF7F, #00FFFF)',
                    color: '#0F0F0F',
                    boxShadow: '0 4px 16px rgba(0, 255, 127, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 255, 127, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 255, 127, 0.3)';
                  }}
                >
                  {selectedPOS === pos.id ? 'Menghubungkan...' : 'Hubungkan'}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Note Section */}
          <div
            className="rounded-2xl p-5 border flex gap-3 mb-10"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="text-xl flex-shrink-0">💡</div>
            <p className="text-xs text-[#E8E8E8] italic leading-relaxed">
              POS kami tidak ada di daftar? Tidak masalah! Anda bisa menambahkan data stok secara manual di dashboard.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleSkip}
              className="w-full text-sm text-cyan-400 hover:underline transition-all py-2"
            >
              Lewati Untuk Sekarang
            </button>

            <button
              type="button"
              onClick={() => navigate('/onboarding/step2')}
              className="w-full h-12 rounded-xl border text-sm font-medium text-cyan-400 transition-all hover:border-cyan-400"
              style={{
                background: 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }}
            >
              Kembali
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
