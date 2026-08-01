import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ChevronDown, Gem, Heart, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import ReviewCard from '../components/ReviewCard';
import FloatingRobot from '../components/FloatingRobot';

// ─── Pricing data ─────────────────────────────────────────────────────────────

const pricingFeatures: { label: string; starter: string | boolean; growth: string | boolean; pro: string | boolean }[] = [
  { label: 'Jumlah SKU',              starter: '100 SKU',      growth: '500 SKU',      pro: 'Unlimited' },
  { label: 'Outlet / Cabang',         starter: '1 outlet',     growth: '3 outlet',     pro: 'Unlimited' },
  { label: 'Prediksi permintaan',     starter: 'Dasar',        growth: 'Advanced + AI', pro: 'Premium + ML' },
  { label: 'Dashboard real-time',     starter: true,           growth: true,           pro: true },
  { label: 'Integrasi POS',           starter: false,          growth: true,           pro: true },
  { label: 'Sinkronisasi supplier',   starter: false,          growth: true,           pro: true },
  { label: 'Integrasi logistik',      starter: false,          growth: false,          pro: true },
  { label: 'Inventory financing',     starter: false,          growth: false,          pro: true },
  { label: 'Custom dashboard',        starter: false,          growth: false,          pro: true },
  { label: 'API access',              starter: false,          growth: false,          pro: true },
  { label: 'Support',                 starter: 'Email',        growth: 'Chat + Email', pro: '24/7 Priority' },
  { label: 'Account manager',         starter: false,          growth: false,          pro: true },
];

const faqs = [
  { q: 'Apakah ada biaya setup atau biaya tersembunyi?', a: 'Tidak ada biaya setup. Harga yang Anda lihat adalah harga sebenarnya, tanpa charge tambahan. Anda hanya membayar langganan bulanan sesuai paket yang dipilih.' },
  { q: 'Bagaimana cara upgrade atau downgrade paket?', a: 'Anda bisa upgrade kapan saja langsung dari dashboard. Perubahan berlaku di siklus tagihan berikutnya. Downgrade juga bisa dilakukan kapan saja tanpa penalti.' },
  { q: 'Apakah ada masa trial gratis?', a: 'Ya! Paket Starter bisa digunakan gratis selama 14 hari tanpa perlu kartu kredit. Setelah trial berakhir, Anda bisa lanjut dengan Starter berbayar atau upgrade ke Growth/Pro.' },
  { q: 'Bagaimana keamanan data bisnis saya?', a: 'Data Anda dienkripsi end-to-end menggunakan standar AES-256. Server kami berada di Indonesia dan memenuhi standar keamanan ISO 27001. Kami tidak pernah menjual data Anda ke pihak ketiga.' },
];

// ─── Pricing sub-components ───────────────────────────────────────────────────

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(0,255,127,0.15)" />
      <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="#D1F07B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(0, 0, 0, 0.03)" />
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="#666" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TableCell({ value }: { value: string | boolean }) {
  if (value === true) return <div className="flex justify-center"><CheckIcon size={18} /></div>;
  if (value === false) return <div className="flex justify-center"><XIcon size={18} /></div>;
  return <span className="text-[13px] text-[#4B5563] text-center block">{value}</span>;
}

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b" style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-5 text-left gap-4">
        <span className="text-sm font-bold text-[#1A1A1B]">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={18} className="text-[#1A1A1B]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="c" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
            <p className="text-[13px] text-[#4B5563] pb-5" style={{ lineHeight: 1.7 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FeatureRow { label: string; ok: boolean }
interface PricingCardProps {
  delay: number; title: string; price: string; priceGradient: string | null;
  subtitle: string; featured?: boolean; features: FeatureRow[];
  buttonLabel: string; buttonStyle: React.CSSProperties; onAction: () => void;
}

function PricingCard({ delay, title, price, priceGradient, subtitle, featured = false, features, buttonLabel, buttonStyle, onAction }: PricingCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: featured ? 1.07 : 1.03 }}
      className="relative flex flex-col rounded-[20px] border"
      style={{
        padding: 32,
        background: featured ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        backdropFilter: 'blur(12px)',
        borderWidth: featured ? 2 : 1,
        borderColor: hovered ? '#98E2FD' : featured ? '#D1F07B' : 'rgba(0, 0, 0, 0.08)',
        boxShadow: hovered ? '0 16px 48px rgba(0,255,255,0.2)' : featured ? '0 8px 40px rgba(0,255,127,0.2)' : 'none',
        zIndex: featured ? 2 : 1,
        marginTop: featured ? -16 : 0,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {featured && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -14 }}>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-4 py-1.5 rounded-full" style={{ background: '#FFE16F', color: '#1A1A1B', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            <Star size={12} fill="#1A1A1B" />
            PALING POPULER
          </span>
        </div>
      )}
      <h3 className="text-xl font-bold text-[#1A1A1B]" style={{ marginTop: featured ? 12 : 0, marginBottom: 8 }}>{title}</h3>
      <div className="flex items-end gap-1 mb-1">
        <span className="font-bold" style={{ fontSize: 40, lineHeight: 1, background: priceGradient ?? undefined, WebkitBackgroundClip: priceGradient ? 'text' : undefined, WebkitTextFillColor: priceGradient ? 'transparent' : undefined, color: '#1A1A1B' }}>
          {price}
        </span>
        <span className="text-sm text-[#4B5563] mb-1">/bulan</span>
      </div>
      <p className="text-[13px] text-[#4B5563]" style={{ marginBottom: 24 }}>{subtitle}</p>
      <ul className="flex flex-col gap-3 flex-1" style={{ marginBottom: 32 }}>
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            {f.ok ? <CheckIcon /> : <XIcon />}
            <span className="text-[13px]" style={{ color: '#1A1A1B', textDecoration: f.ok ? undefined : 'line-through' }}>{f.label}</span>
          </li>
        ))}
      </ul>
      <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(152, 226, 253,0.5)' }} whileTap={{ scale: 0.97 }} onClick={onAction} className="w-full font-bold rounded-2xl border-0" style={{ height: 44, fontSize: 14, cursor: 'pointer', ...buttonStyle }}>
        {buttonLabel}
      </motion.button>
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '',
      title: 'Predict Smart',
      description: 'Algoritma AI yang memprediksi demand produk dengan akurasi tinggi berdasarkan data historis dan tren pasar.'
    },
    {
      icon: '',
      title: 'Manage Smart',
      description: 'Dashboard real-time untuk monitoring stok, tracking inventory, dan mendapat insights bisnis yang actionable.'
    },
    {
      icon: '',
      title: 'Restock Insight',
      description: 'Notifikasi otomatis dan rekomendasi pemesanan untuk memastikan stok selalu optimal tanpa overstock.'
    },
    {
      icon: '',
      title: 'Grow Smarter',
      description: 'Analytics mendalam untuk memahami performa produk, customer behavior, dan peluang pertumbuhan bisnis.'
    }
  ];

  const reviews = [
    {
      name: 'Budi Santoso',
      role: 'Owner, Toko Elektronik Jakarta',
      review: 'Restock AI sangat membantu bisnis saya! Sekarang stok selalu optimal, ga ada lagi barang numpuk atau kehabisan. Profit meningkat 30% dalam 3 bulan!',
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
    <div className="min-h-screen w-full overflow-x-hidden relative bg-slate-50">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #FFFFFF 0%, #f1f5f9 100%)',
              'linear-gradient(135deg, #f1f5f9 0%, #FFFFFF 100%)',
              'linear-gradient(135deg, #FFFFFF 0%, #f1f5f9 100%)',
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
          style={{ background: 'radial-gradient(circle, #98E2FD, transparent)' }}
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
          style={{ background: 'radial-gradient(circle, #98E2FD, transparent)' }}
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
                    background: 'linear-gradient(135deg, #D1F07B, #98E2FD, #1A1A1B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  SMART INVENTORY. SMARTER GROWTH.
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg text-[#4B5563] mb-10 leading-relaxed"
                >
                  AI-powered inventory intelligence yang menganalisis cerita di balik stok Anda untuk bisnis yang lebih efisien & menguntungkan.
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
                    className="px-8 h-14 rounded-2xl font-bold text-[#1A1A1B] min-w-[200px]"
                    style={{
                      background: '#FFE16F',
                      boxShadow: '0 8px 32px rgba(245, 224, 74, 0.4)'
                    }}
                  >
                    Mulai Gratis Sekarang
                  </motion.button>

                  <motion.a
                    href="https://youtu.be/04854XqcfCY?si=Q8YkpgNGvRugTWMz"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 h-14 rounded-2xl font-bold text-[#1A1A1B] min-w-[160px] border flex items-center justify-center"
                    style={{
                      background: 'rgba(0, 0, 0, 0.05)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      textDecoration: 'none'
                    }}
                  >
                    Lihat Demo
                  </motion.a>
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
              <h2 className="text-4xl font-bold mb-4 text-[#1A1A1B]">
                Dipercaya oleh Ribuan Entrepreneur
              </h2>
              <p className="text-[#4B5563] text-lg">
                Lihat apa kata mereka tentang Restock AI
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

        {/* ── Harga ── */}
        <section id="harga" className="py-20 px-6">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(245,224,74,0.15)', border: '1px solid rgba(245,224,74,0.4)', color: '#1A1A1B', letterSpacing: '0.08em' }}>
                <Gem size={14} />
                HARGA TRANSPARAN, TANPA KEJUTAN
              </div>
              <h2 className="font-bold text-[#1A1A1B] mb-3" style={{ fontSize: 36, lineHeight: 1.2 }}>Pilih Paket Terbaik untuk<br />Bisnis Anda</h2>
              <p style={{ fontSize: 18, color: '#1A1A1B' }}>Mulai gratis, upgrade kapan saja. Tidak ada komitmen jangka panjang.</p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid items-center mb-16" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              <PricingCard
                delay={0} title="Starter" price="Rp 99K" priceGradient={null} subtitle="Untuk UMKM pemula"
                features={[
                  { label: 'Hingga 100 SKU', ok: true }, { label: 'Prediksi permintaan dasar', ok: true },
                  { label: 'Dashboard stok real-time', ok: true }, { label: '1 outlet', ok: true },
                  { label: 'Email support', ok: true }, { label: 'Integrasi supplier', ok: false }, { label: 'Inventory financing', ok: false },
                ]}
                buttonLabel="Mulai Gratis" buttonStyle={{ background: '#FFE16F', color: '#1A1A1B' }}
                onAction={() => navigate('/onboarding')}
              />
              <PricingCard
                delay={0.1} title="Growth" price="Rp 199K" priceGradient={null} subtitle="Untuk bisnis berkembang" featured
                features={[
                  { label: 'Hingga 500 SKU', ok: true }, { label: 'Prediksi permintaan advanced + AI', ok: true },
                  { label: 'Dashboard analytics lengkap', ok: true }, { label: '3 outlet / cabang', ok: true },
                  { label: 'Integrasi POS (Moka, Majoo, Olsera)', ok: true }, { label: 'Sinkronisasi supplier otomatis', ok: true },
                  { label: 'Chat + email support', ok: true }, { label: 'Inventory financing', ok: false },
                ]}
                buttonLabel="Upgrade Sekarang" buttonStyle={{ background: '#FFE16F', color: '#1A1A1B' }}
                onAction={() => navigate('/onboarding')}
              />
              <PricingCard
                delay={0.2} title="Pro" price="Rp 399K" priceGradient={null} subtitle="Untuk enterprise & distributor"
                features={[
                  { label: 'Unlimited SKU', ok: true }, { label: 'Prediksi permintaan premium + ML model', ok: true },
                  { label: 'Custom dashboard & laporan', ok: true }, { label: 'Unlimited outlet / cabang', ok: true },
                  { label: 'Semua integrasi supplier & logistik', ok: true }, { label: 'Inventory financing dengan bank partner', ok: true },
                  { label: 'Dedicated account manager', ok: true }, { label: 'API access untuk custom integration', ok: true },
                  { label: 'Priority 24/7 support', ok: true },
                ]}
                buttonLabel="Hubungi Sales" buttonStyle={{ background: 'linear-gradient(135deg, #F5C897, #FFE5B4)', color: '#1A1A1B' }}
                onAction={() => {}}
              />
            </div>

            {/* Feature Comparison */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
              <h3 className="text-center font-bold text-[#1A1A1B] mb-6" style={{ fontSize: 18, letterSpacing: '0.04em' }}>PERBANDINGAN FITUR LENGKAP</h3>
              <div className="rounded-2xl overflow-hidden border" style={{ background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.12)' }}>
                <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', background: 'rgba(0, 0, 0, 0.04)', padding: '14px 24px' }}>
                  {['FITUR', 'STARTER', 'GROWTH', 'PRO'].map((h, i) => (
                    <span key={h} className="text-xs font-bold text-[#4B5563]" style={{ letterSpacing: '0.08em', textAlign: i === 0 ? 'left' : 'center' }}>{h}</span>
                  ))}
                </div>
                {pricingFeatures.map((row, idx) => (
                  <motion.div key={row.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.04 }}
                    className="grid border-t" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '13px 24px', borderColor: 'rgba(0, 0, 0, 0.04)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span className="text-[13px] font-semibold text-[#1A1A1B]">{row.label}</span>
                    <TableCell value={row.starter} />
                    <TableCell value={row.growth} />
                    <TableCell value={row.pro} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16" style={{ maxWidth: 800, margin: '0 auto 64px' }}>
              <h3 className="text-center font-bold text-[#1A1A1B] mb-8" style={{ fontSize: 18, letterSpacing: '0.04em' }}>PERTANYAAN YANG SERING DIAJUKAN</h3>
              <div className="rounded-2xl border px-8" style={{ background: '#ffffff', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.12)' }}>
                {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} defaultOpen={i === 0} />)}
              </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-2xl text-center" style={{ maxWidth: 800, margin: '0 auto', padding: '60px 40px', background: '#FFE16F', boxShadow: '0 20px 60px rgba(255, 225, 111,0.5)' }}
            >
              <h2 className="font-bold text-[#1A1A1B] mb-3" style={{ fontSize: 24 }}>Siap mengembangkan bisnis Anda dengan Restock AI?</h2>
              <p className="text-[#4B5563] text-sm mb-8" style={{ lineHeight: 1.7 }}>
                Bergabung dengan 2.000+ UMKM Indonesia yang sudah menggunakan Restock AI<br />untuk mengelola stok lebih cerdas.
              </p>
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 12px 24px rgba(26,26,27,0.3)' }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/onboarding')} className="font-bold"
                style={{ height: 52, width: 280, borderRadius: 12, background: '#1A1A1B', color: '#FFE16F', fontSize: 16, border: 'none', cursor: 'pointer' }}
              >
                Daftar Sekarang — Gratis
              </motion.button>
            </motion.div>

          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="h-px bg-white/10 mb-6" />
            <p className="flex items-center justify-center gap-1 text-center text-[#4B5563] text-sm">
              © 2024 Restock AI. Made with <Heart size={12} fill="currentColor" /> for Indonesian entrepreneurs.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
