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
        className="relative z-10 w-full max-w-[500px]"
      >
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} />

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
            Profil Bisnis Anda
          </h1>
          <p className="text-sm text-[#E8E8E8] mb-8">
            Langkah 2 dari 3
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name Field */}
            <div>
              <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                Nama Toko
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., Toko Berkah"
                className="w-full h-12 px-4 rounded-xl border text-sm text-[#E8E8E8] placeholder-white/50 transition-all focus:outline-none focus:border-cyan-400"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(0, 255, 255, 0.8)';
                  e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
            </div>

            {/* Business Type - Custom Dropdown */}
            <div className="relative">
              <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                Jenis Usaha
              </label>
              <button
                type="button"
                onClick={() => setIsBusinessTypeOpen(!isBusinessTypeOpen)}
                className="w-full h-12 px-4 rounded-xl border text-sm text-[#E8E8E8] flex items-center justify-between transition-all hover:border-cyan-400"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: isBusinessTypeOpen ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: isBusinessTypeOpen ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none'
                }}
              >
                <span>{businessType || 'Pilih jenis...'}</span>
                <ChevronDown size={18} className="text-cyan-400" />
              </button>

              {isBusinessTypeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl border overflow-hidden z-20"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
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
                      className="w-full h-10 px-4 text-sm text-[#E8E8E8] flex items-center justify-between transition-all hover:bg-gradient-to-r hover:from-[#4A1063] hover:to-[#8B4BBE]"
                    >
                      <span>{type}</span>
                      {businessType === type && <Check size={16} className="text-cyan-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* SKU Count - Interactive Slider */}
            <div>
              <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                Jumlah Produk (SKU)
              </label>

              {/* Current Value Display */}
              <div className="mb-4 text-center">
                <span
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #00FF7F, #00FFFF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
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
                    background: `linear-gradient(to right, #00FF7F 0%, #00FF7F ${(skuCount / 600) * 100}%, rgba(255, 255, 255, 0.1) ${(skuCount / 600) * 100}%, rgba(255, 255, 255, 0.1) 100%)`,
                  }}
                />

                {/* Tick Marks */}
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-xs text-gray-400">&lt;100</span>
                  <span className="text-xs text-gray-400">100-500</span>
                  <span className="text-xs text-gray-400">500+</span>
                </div>
              </div>
            </div>

            {/* City Dropdown */}
            <div className="relative">
              <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                Kota / Kabupaten
              </label>
              <button
                type="button"
                onClick={() => setIsCityOpen(!isCityOpen)}
                className="w-full h-12 px-4 rounded-xl border text-sm text-[#E8E8E8] flex items-center justify-between transition-all hover:border-cyan-400"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderColor: isCityOpen ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: isCityOpen ? '0 0 20px rgba(0, 255, 255, 0.2)' : 'none'
                }}
              >
                <span>{city || 'Pilih kota...'}</span>
                <ChevronDown size={18} className="text-cyan-400" />
              </button>

              {isCityOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl border overflow-hidden z-20"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
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
                      className="w-full h-10 px-4 text-sm text-[#E8E8E8] flex items-center justify-between transition-all hover:bg-gradient-to-r hover:from-[#4A1063] hover:to-[#8B4BBE]"
                    >
                      <span>{c}</span>
                      {city === c && <Check size={16} className="text-cyan-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Revenue - Optional */}
            <div>
              <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                Estimasi Omzet Bulanan (Opsional)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">Rp.</span>
                <input
                  type="text"
                  value={revenue}
                  onChange={handleRevenueChange}
                  placeholder="e.g., 50,000,000"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border text-sm text-[#E8E8E8] placeholder-white/50 transition-all focus:outline-none focus:border-cyan-400"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(0, 255, 255, 0.8)';
                    e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 rounded-xl font-bold text-white mt-8 cursor-pointer transition-all"
              style={{
                background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                boxShadow: '0 4px 16px rgba(74, 16, 99, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(74, 16, 99, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(74, 16, 99, 0.3)';
              }}
            >
              Lanjut ke Integrasi
            </motion.button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate('/onboarding')}
              className="w-full h-12 rounded-xl border text-sm font-medium text-cyan-400 transition-all hover:border-cyan-400"
              style={{
                background: 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }}
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
          background: linear-gradient(135deg, #4A1063, #8B4BBE);
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
          background: linear-gradient(135deg, #4A1063, #8B4BBE);
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
