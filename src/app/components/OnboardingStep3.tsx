import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sparkles } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';

interface POSCard {
  id: string;
  name: string;
  description: string;
  logoFile?: string;
  fallback?: string;
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
      fallback: 'MK',
      isPopular: true
    },
    {
      id: 'majoo',
      name: 'Majoo',
      description: 'Integrasi dengan Majoo POS',
      logoFile: '/logos/logo majoo.jpeg',
      fallback: 'MJ'
    },
    {
      id: 'olsera',
      name: 'Olsera',
      description: 'Koneksi otomatis ke Olsera',
      logoFile: '/logos/logo olsera.jpeg',
      fallback: 'OL'
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

        {/* Floating Shapes */}
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #98E2FD, transparent)' }}
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
          className="rounded-2xl p-12 border"
          style={{
            background: 'rgba(0, 0, 0, 0.04)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Title */}
          <h1 className="text-3xl font-bold text-[#1A1A1B] mb-3">
            Hubungkan Sistem POS Anda
          </h1>
          <p className="text-sm text-[#4B5563] mb-10">
            Langkah 3 dari 3 - Pilih POS yang Anda gunakan atau lewati dulu
          </p>

          {/* Integration Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {posCards.map((pos) => (
              <motion.div
                key={pos.id}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl p-7 border transition-all cursor-pointer flex flex-col"
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  backdropFilter: 'blur(10px)',
                  borderColor: selectedPOS === pos.id ? 'rgba(0, 255, 127, 0.8)' : 'rgba(0, 0, 0, 0.08)',
                  height: '280px',
                  boxShadow: selectedPOS === pos.id ? '0 12px 32px rgba(0, 255, 127, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedPOS !== pos.id) {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.6)';
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPOS !== pos.id) {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Popular Badge */}
                {pos.isPopular && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-[#1A1A1B]"
                    style={{ background: 'linear-gradient(135deg, #FFE16F, #98E2FD)' }}
                  >
                    Popular
                  </div>
                )}

                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{ background: '#ffffff', padding: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}
                  >
                    {pos.logoFile ? (
                      <img
                        src={pos.logoFile}
                        alt={pos.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <span className="text-lg font-bold text-[#1A1A1B]">{pos.fallback}</span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[#1A1A1B] font-bold mb-3 text-center">
                  {pos.name}
                </h3>

                {/* Description */}
                <p className="text-[#4B5563] text-xs leading-relaxed text-center mb-auto">
                  {pos.description}
                </p>

                {/* Button */}
                <motion.button
                  type="button"
                  onClick={() => handleConnect(pos.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-11 rounded-full font-bold text-sm transition-all mt-6"
                  style={{
                    background: 'linear-gradient(135deg, #98E2FD, #98E2FD)',
                    color: '#1A1A1B',
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
              background: 'rgba(0, 0, 0, 0.02)',
              borderColor: 'rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="text-xl flex-shrink-0"></div>
            <p className="text-xs text-[#4B5563] italic leading-relaxed">
              POS kami tidak ada di daftar? Tidak masalah! Anda bisa menambahkan data stok secara manual di dashboard.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <motion.button
              type="button"
              onClick={handleSkip}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 rounded-full font-bold text-sm text-[#1A1A1B] cursor-pointer transition-all"
              style={{
                background: '#FFE16F',
                boxShadow: '0 4px 16px rgba(255, 225, 111, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 225, 111, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 225, 111, 0.3)';
              }}
            >
              Lewati Untuk Sekarang
            </motion.button>

            <button
              type="button"
              onClick={() => navigate('/onboarding/step2')}
              className="w-full h-12 rounded-2xl border text-sm font-medium text-[#1A1A1B] transition-all"
              style={{
                background: 'transparent',
                borderColor: 'rgba(0, 0, 0, 0.15)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)'; }}
            >
              Kembali
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
