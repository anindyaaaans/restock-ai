import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import ProgressIndicator from './ProgressIndicator';

export default function OnboardingStep1() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [email, setEmail] = useState('budi.santoso@gmail.com');
  const [password, setPassword] = useState('Password123!');
  const [confirmPassword, setConfirmPassword] = useState('Password123!');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding/step2');
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
        <ProgressIndicator currentStep={1} />

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
            Buat Akun RestockAI
          </h1>
          <p className="text-sm text-[#E8E8E8] mb-8">
            Langkah 1 dari 3
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
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

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full h-12 px-4 pr-12 rounded-xl border text-sm text-[#E8E8E8] placeholder-white/50 transition-all focus:outline-none focus:border-cyan-400"
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00FF7F] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  className="w-full h-12 px-4 pr-12 rounded-xl border text-sm text-[#E8E8E8] placeholder-white/50 transition-all focus:outline-none focus:border-cyan-400"
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
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00FF7F] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-3 mt-5">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-[18px] h-[18px] rounded border cursor-pointer"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  accentColor: '#00FF7F'
                }}
              />
              <label htmlFor="terms" className="text-xs text-[#E8E8E8] cursor-pointer">
                Saya setuju dengan{' '}
                <a href="#" className="text-cyan-400 hover:underline">
                  Syarat & Ketentuan
                </a>
              </label>
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
              Lanjut ke Profil
            </motion.button>

            {/* Login Link */}
            <div className="text-center mt-3">
              <a href="#" className="text-sm text-cyan-400 hover:opacity-80 transition-opacity">
                Sudah punya akun? Masuk
              </a>
            </div>
          </form>
        </div>

        {/* Mascot */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -right-32 bottom-0 w-32 h-32"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full opacity-40 blur-2xl"
                 style={{ background: 'radial-gradient(circle, rgba(138, 75, 190, 0.6), transparent)' }} />
            <div className="text-7xl">🤖</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
