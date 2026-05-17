import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import ReviewCard from '../components/ReviewCard';
import FloatingRobot from '../components/FloatingRobot';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🧠',
      title: 'Predict Smart',
      description: 'Algoritma AI yang memprediksi demand produk dengan akurasi tinggi berdasarkan data historis dan tren pasar.'
    },
    {
      icon: '📦',
      title: 'Manage Smart',
      description: 'Dashboard real-time untuk monitoring stok, tracking inventory, dan mendapat insights bisnis yang actionable.'
    },
    {
      icon: '🚀',
      title: 'Restock Smart',
      description: 'Notifikasi otomatis dan rekomendasi pemesanan untuk memastikan stok selalu optimal tanpa overstock.'
    },
    {
      icon: '📈',
      title: 'Grow Smarter',
      description: 'Analytics mendalam untuk memahami performa produk, customer behavior, dan peluang pertumbuhan bisnis.'
    }
  ];

  const reviews = [
    {
      name: 'Budi Santoso',
      role: 'Owner, Toko Elektronik Jakarta',
      review: 'RestockAI sangat membantu bisnis saya! Sekarang stok selalu optimal, ga ada lagi barang numpuk atau kehabisan. Profit meningkat 30% dalam 3 bulan!',
      rating: 5,
      avatar: 'BS'
    },
    {
      name: 'Siti Nurhaliza',
      role: 'Founder, Fashion Brand Bandung',
      review: 'Prediksi AI-nya akurat banget. Saya bisa tahu produk mana yang bakal laku dan kapan harus restock. Dashboard-nya juga gampang dipahami.',
      rating: 5,
      avatar: 'SN'
    },
    {
      name: 'Andi Wijaya',
      role: 'Owner, Minimarket Chain',
      review: 'Game changer untuk bisnis retail! Automation-nya bikin kerja lebih efisien. Tim saya bisa fokus ke customer service instead of manual inventory.',
      rating: 5,
      avatar: 'AW'
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-[#0F0F0F]">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #0F0F0F 0%, #1a0f2e 100%)',
              'linear-gradient(135deg, #1a0f2e 0%, #0F0F0F 100%)',
              'linear-gradient(135deg, #0F0F0F 0%, #1a0f2e 100%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8B4BBE, transparent)' }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00FFFF, transparent)' }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar onGetStarted={() => navigate('/onboarding')} />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <div className="flex-1 max-w-3xl">
                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-bold mb-6"
                  style={{
                    fontSize: '3.5rem',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(135deg, #00FF7F, #00FFFF, #FF00FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Prediksi Stok. Stok Optimal. Bisnis Makin Maksimal.
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg text-[#E8E8E8] mb-10 leading-relaxed"
                >
                  AI-powered inventory management yang transform bisnis UMKM Indonesia menjadi lebih efisien & menguntungkan.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/onboarding')}
                    className="px-8 h-14 rounded-2xl font-bold text-[#0F0F0F] min-w-[200px]"
                    style={{
                      background: 'linear-gradient(135deg, #F5E04A, #FFD700)',
                      boxShadow: '0 8px 32px rgba(245, 224, 74, 0.4)'
                    }}
                  >
                    Mulai Gratis Sekarang
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 h-14 rounded-2xl font-bold text-white min-w-[160px] border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    Lihat Demo
                  </motion.button>
                </motion.div>
              </div>

              {/* Right - Floating Robot */}
              <div className="flex-shrink-0">
                <FloatingRobot />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="fitur" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* User Reviews Section */}
        <section id="reviews" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-white">
                Dipercaya oleh Ribuan Entrepreneur
              </h2>
              <p className="text-gray-400 text-lg">
                Lihat apa kata mereka tentang RestockAI
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  name={review.name}
                  role={review.role}
                  review={review.review}
                  rating={review.rating}
                  avatar={review.avatar}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="h-px bg-white/10 mb-6" />
            <p className="text-center text-[#E8E8E8] text-sm">
              © 2024 RestockAI. Made with ❤️ for Indonesian entrepreneurs.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
