import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ChevronDown, Check } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';

export default function OnboardingStep2() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState('Toko Berkah');
  const [businessType, setBusinessType] = useState('Minimarket');
  const [isBusinessTypeOpen, setIsBusinessTypeOpen] = useState(false);
  const [skuCount, setSkuCount] = useState(250);
  const [city, setCity] = useState('Jakarta');
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [revenue, setRevenue] = useState('50,000,000');

  const businessTypes = ['Sembako', 'Minimarket', 'Fashion', 'F&B', 'Grosir', 'Lainnya'];
  const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang', 'Yogyakarta', 'Lainnya'];

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setRevenue(formatted);
  };

  const getSkuLabel = (value: number) => {
    if (value < 100) return '<100';
    if (value <= 500) return '100-500';
    return '500+';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding/step3');
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
        className="relative z-10 w-full max-w-[500px]"
      >
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} />

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
            Profil Bisnis Anda
          </h1>
          <p className="text-sm text-[#4B5563] mb-8">
            Langkah 2 dari 3
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name Field */}
            <div>
              <label className="block text-xs font-medium text-[#1A1A1B] uppercase tracking-wider mb-2">
                Nama Toko
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Toko Berkah"
                className="w-full h-12 px-4 rounded-2xl border text-sm text-[#4B5563] placeholder-white/50 transition-all focus:outline-none focus:border-cyan-400"
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  borderColor: 'rgba(0, 0, 0, 0.1)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(0, 255, 255, 0.8)';
                  e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(0, 0, 0, 0.04)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'rgba(0, 0, 0, 0.03)';
                }}
              />
            </div>

            {/* Business Type - Custom Dropdown */}
            <div className="relative">
              <label className="block text-xs font-medium text-[#1A1A1B] uppercase tracking-wider mb-2">
                Jenis Usaha
              </label>
              <button
                type="button"
                onClick={() => setIsBusinessTypeOpen(!isBusinessTypeOpen)}
                className="w-full h-12 px-4 rounded-2xl border text-sm text-[#4B5563] flex items-center justify-between transition-all hover:border-cyan-400"
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  borderColor: isBusinessTypeOpen ? 'rgba(0, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.1)',
                  boxShadow: isBusinessTypeOpen ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none'
                }}
              >
                <span>{businessType || 'Pilih jenis...'}</span>
                <ChevronDown size={18} className="text-[#1A1A1B]" />
              </button>

              {isBusinessTypeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-20"
                  style={{
                    background: '#ffffff',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  {businessTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setBusinessType(type);
                        setIsBusinessTypeOpen(false);
                      }}
                      className="w-full h-10 px-4 text-sm text-[#4B5563] flex items-center justify-between transition-all hover:bg-gradient-to-r hover:from-[#FFE16F] hover:to-[#98E2FD]"
                    >
                      <span>{type}</span>
                      {businessType === type && <Check size={16} className="text-[#1A1A1B]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* SKU Count - Interactive Slider */}
            <div>
              <label className="block text-xs font-medium text-[#1A1A1B] uppercase tracking-wider mb-2">
                Jumlah Produk (SKU)
              </label>

              {/* Current Value Display */}
              <div className="mb-4 text-center">
                <span className="text-2xl font-bold text-[#1A1A1B]">
                  {skuCount} SKU
                </span>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="600"
                  value={skuCount}
                  onChange={(e) => setSkuCount(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #D1F07B 0%, #D1F07B ${(skuCount / 600) * 100}%, rgba(0, 0, 0, 0.05) ${(skuCount / 600) * 100}%, rgba(0, 0, 0, 0.05) 100%)`,
                  }}
                />

                {/* Tick Marks */}
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-xs text-[#4B5563]">&lt;100</span>
                  <span className="text-xs text-[#4B5563]">100-500</span>
                  <span className="text-xs text-[#4B5563]">500+</span>
                </div>
              </div>
            </div>

            {/* City Dropdown */}
            <div className="relative">
              <label className="block text-xs font-medium text-[#1A1A1B] uppercase tracking-wider mb-2">
                Kota / Kabupaten
              </label>
              <button
                type="button"
                onClick={() => setIsCityOpen(!isCityOpen)}
                className="w-full h-12 px-4 rounded-2xl border text-sm text-[#4B5563] flex items-center justify-between transition-all hover:border-cyan-400"
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  borderColor: isCityOpen ? 'rgba(0, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.1)',
                  boxShadow: isCityOpen ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none'
                }}
              >
                <span>{city || 'Pilih kota...'}</span>
                <ChevronDown size={18} className="text-[#1A1A1B]" />
              </button>

              {isCityOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-20"
                  style={{
                    background: '#ffffff',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  {cities.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCity(c);
                        setIsCityOpen(false);
                      }}
                      className="w-full h-10 px-4 text-sm text-[#4B5563] flex items-center justify-between transition-all hover:bg-gradient-to-r hover:from-[#FFE16F] hover:to-[#98E2FD]"
                    >
                      <span>{c}</span>
                      {city === c && <Check size={16} className="text-[#1A1A1B]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Revenue - Optional */}
            <div>
              <label className="block text-xs font-medium text-[#1A1A1B] uppercase tracking-wider mb-2">
                Estimasi Omzet Bulanan (Opsional)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#4B5563]">Rp.</span>
                <input
                  type="text"
                  value={revenue}
                  onChange={handleRevenueChange}
                  placeholder="e.g., 50,000,000"
                  className="w-full h-12 pl-12 pr-4 rounded-2xl border text-sm text-[#4B5563] placeholder-white/50 transition-all focus:outline-none focus:border-cyan-400"
                  style={{
                    background: 'rgba(0, 0, 0, 0.03)',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(0, 255, 255, 0.8)';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(0, 0, 0, 0.04)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(0, 0, 0, 0.03)';
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 rounded-full font-bold text-[#1A1A1B] mt-8 cursor-pointer transition-all"
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
              Lanjut ke Integrasi
            </motion.button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate('/onboarding')}
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
          </form>
        </div>
      </motion.div>

      {/* Custom Slider Styles */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFE16F, #98E2FD);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 255, 127, 0.5);
          transition: all 0.2s;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 20px rgba(0, 255, 127, 0.8);
          transform: scale(1.1);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFE16F, #98E2FD);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(0, 255, 127, 0.5);
          transition: all 0.2s;
        }

        input[type="range"]::-moz-range-thumb:hover {
          box-shadow: 0 0 20px rgba(0, 255, 127, 0.8);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
