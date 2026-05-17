import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ChevronDown } from 'lucide-react';
import RestockAILogo from '../components/brand/RestockAILogo';

// ─── Data ────────────────────────────────────────────────────────────────────

const features: { label: string; starter: string | boolean; growth: string | boolean; pro: string | boolean }[] = [
  { label: 'Jumlah SKU',              starter: '100 SKU',      growth: '500 SKU',      pro: 'Unlimited' },
  { label: 'Outlet / Cabang',         starter: '1 outlet',     growth: '3 outlet',     pro: 'Unlimited' },
  { label: 'Prediksi permintaan',     starter: 'Dasar',        growth: 'Advanced + AI', pro: 'Premium + ML' },
  { label: 'Dashboard real-time',     starter: true,           growth: true,           pro: true },
  { label: 'Integrasi POS',          starter: false,          growth: true,           pro: true },
  { label: 'Sinkronisasi supplier',   starter: false,          growth: true,           pro: true },
  { label: 'Integrasi logistik',      starter: false,          growth: false,          pro: true },
  { label: 'Inventory financing',     starter: false,          growth: false,          pro: true },
  { label: 'Custom dashboard',        starter: false,          growth: false,          pro: true },
  { label: 'API access',              starter: false,          growth: false,          pro: true },
  { label: 'Support',                 starter: 'Email',        growth: 'Chat + Email', pro: '24/7 Priority' },
  { label: 'Account manager',         starter: false,          growth: false,          pro: true },
];

const faqs = [
  {
    q: 'Apakah ada biaya setup atau biaya tersembunyi?',
    a: 'Tidak ada biaya setup. Harga yang Anda lihat adalah harga sebenarnya, tanpa charge tambahan. Anda hanya membayar langganan bulanan sesuai paket yang dipilih.'
  },
  {
    q: 'Bagaimana cara upgrade atau downgrade paket?',
    a: 'Anda bisa upgrade kapan saja langsung dari dashboard. Perubahan berlaku di siklus tagihan berikutnya. Downgrade juga bisa dilakukan kapan saja tanpa penalti.'
  },
  {
    q: 'Apakah ada masa trial gratis?',
    a: 'Ya! Paket Starter bisa digunakan gratis selama 14 hari tanpa perlu kartu kredit. Setelah trial berakhir, Anda bisa lanjut dengan Starter berbayar atau upgrade ke Growth/Pro.'
  },
  {
    q: 'Bagaimana keamanan data bisnis saya?',
    a: 'Data Anda dienkripsi end-to-end menggunakan standar AES-256. Server kami berada di Indonesia dan memenuhi standar keamanan ISO 27001. Kami tidak pernah menjual data Anda ke pihak ketiga.'
  }
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(0,255,127,0.15)" />
      <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="#00FF7F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.06)" />
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="#666" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TableCell({ value }: { value: string | boolean }) {
  if (value === true) return (
    <div className="flex justify-center">
      <CheckIcon size={18} />
    </div>
  );
  if (value === false) return (
    <div className="flex justify-center">
      <XIcon size={18} />
    </div>
  );
  return <span className="text-[13px] text-[#E8E8E8] text-center block">{value}</span>;
}

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="border-b"
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left gap-4"
      >
        <span className="text-sm font-bold text-white">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={18} className="text-white" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-[13px] text-[#E8E8E8] pb-5" style={{ lineHeight: 1.7 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, #0F0F0F 0%, #2a0f4a 100%)' }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            top: -100, left: '20%',
            background: 'radial-gradient(circle, rgba(74,16,99,0.35) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            bottom: 200, right: '10%',
            background: 'radial-gradient(circle, rgba(0,255,127,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── Top Nav ── */}
        <nav
          className="flex justify-between items-center px-10 h-16 border-b sticky top-0"
          style={{
            background: 'rgba(15,15,15,0.85)',
            backdropFilter: 'blur(15px)',
            borderColor: 'rgba(255,255,255,0.1)',
            zIndex: 50
          }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="hover:opacity-80 transition-opacity"
          >
            <RestockAILogo size={30} showWordmark wordmarkColor="light" />
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-[#E8E8E8] hover:text-white transition-colors"
            >
              ← Kembali ke Dashboard
            </button>
          </div>
        </nav>

        {/* ── Header ── */}
        <section style={{ padding: '60px 40px 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
            style={{ maxWidth: 900, margin: '0 auto' }}
          >
            <div
              className="inline-block text-xs font-bold px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(245,224,74,0.15)',
                border: '1px solid rgba(245,224,74,0.4)',
                color: '#F5E04A',
                letterSpacing: '0.08em'
              }}
            >
              💎 HARGA TRANSPARAN, TANPA KEJUTAN
            </div>
            <h1
              className="font-bold text-white"
              style={{ fontSize: 40, lineHeight: 1.2, marginBottom: 12 }}
            >
              Pilih Paket Terbaik untuk<br />Bisnis Anda
            </h1>
            <p style={{ fontSize: 18, color: '#E8E8E8' }}>
              Mulai gratis, upgrade kapan saja. Tidak ada komitmen jangka panjang.
            </p>
          </motion.div>
        </section>

        {/* ── Pricing Cards ── */}
        <section style={{ padding: '0 40px' }}>
          <div
            className="grid items-center"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              maxWidth: 1100,
              margin: '0 auto'
            }}
          >
            {/* STARTER */}
            <PricingCard
              delay={0}
              title="Starter"
              price="Rp 99K"
              priceGradient="linear-gradient(135deg, #00FF7F, #00FFFF)"
              subtitle="Untuk UMKM pemula"
              features={[
                { label: 'Hingga 100 SKU', ok: true },
                { label: 'Prediksi permintaan dasar', ok: true },
                { label: 'Dashboard stok real-time', ok: true },
                { label: '1 outlet', ok: true },
                { label: 'Email support', ok: true },
                { label: 'Integrasi supplier', ok: false },
                { label: 'Inventory financing', ok: false },
              ]}
              buttonLabel="Mulai Gratis"
              buttonStyle={{
                background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                color: '#fff'
              }}
              onAction={() => navigate('/onboarding')}
            />

            {/* GROWTH — featured */}
            <PricingCard
              delay={0.1}
              title="Growth"
              price="Rp 199K"
              priceGradient="linear-gradient(135deg, #FF00FF, #00FFFF)"
              subtitle="Untuk bisnis berkembang"
              featured
              features={[
                { label: 'Hingga 500 SKU', ok: true },
                { label: 'Prediksi permintaan advanced + AI', ok: true },
                { label: 'Dashboard analytics lengkap', ok: true },
                { label: '3 outlet / cabang', ok: true },
                { label: 'Integrasi POS (Moka, Majoo, Olsera)', ok: true },
                { label: 'Sinkronisasi supplier otomatis', ok: true },
                { label: 'Chat + email support', ok: true },
                { label: 'Inventory financing', ok: false },
              ]}
              buttonLabel="Upgrade Sekarang"
              buttonStyle={{
                background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                color: '#fff'
              }}
              onAction={() => navigate('/onboarding')}
            />

            {/* PRO */}
            <PricingCard
              delay={0.2}
              title="Pro"
              price="Rp 399K"
              priceGradient={null}
              subtitle="Untuk enterprise & distributor"
              features={[
                { label: 'Unlimited SKU', ok: true },
                { label: 'Prediksi permintaan premium + ML model', ok: true },
                { label: 'Custom dashboard & laporan', ok: true },
                { label: 'Unlimited outlet / cabang', ok: true },
                { label: 'Semua integrasi supplier & logistik', ok: true },
                { label: 'Inventory financing dengan bank partner', ok: true },
                { label: 'Dedicated account manager', ok: true },
                { label: 'API access untuk custom integration', ok: true },
                { label: 'Priority 24/7 support', ok: true },
              ]}
              buttonLabel="Hubungi Sales"
              buttonStyle={{
                background: 'linear-gradient(135deg, #F5C897, #FFE5B4)',
                color: '#0F0F0F'
              }}
              onAction={() => {}}
            />
          </div>
        </section>

        {/* ── Feature Comparison ── */}
        <section style={{ padding: '80px 40px 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: 1100, margin: '0 auto' }}
          >
            <h2 className="text-center font-bold text-white mb-6" style={{ fontSize: 18, letterSpacing: '0.04em' }}>
              PERBANDINGAN FITUR LENGKAP
            </h2>

            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.12)'
              }}
            >
              {/* Table Header */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  background: 'rgba(255,255,255,0.08)',
                  padding: '14px 24px'
                }}
              >
                {['FITUR', 'STARTER', 'GROWTH', 'PRO'].map((h, i) => (
                  <span
                    key={h}
                    className="text-xs font-bold text-[#E8E8E8]"
                    style={{
                      letterSpacing: '0.08em',
                      textAlign: i === 0 ? 'left' : 'center'
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              {features.map((row, idx) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="grid border-t transition-colors"
                  style={{
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    padding: '13px 24px',
                    borderColor: 'rgba(255,255,255,0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span className="text-[13px] font-semibold text-white">{row.label}</span>
                  <TableCell value={row.starter} />
                  <TableCell value={row.growth} />
                  <TableCell value={row.pro} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: '80px 40px 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            <h2 className="text-center font-bold text-white mb-8" style={{ fontSize: 18, letterSpacing: '0.04em' }}>
              PERTANYAAN YANG SERING DIAJUKAN
            </h2>

            <div
              className="rounded-2xl border px-8"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(255,255,255,0.12)'
              }}
            >
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} defaultOpen={i === 0} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{ padding: '80px 40px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl text-center"
            style={{
              maxWidth: 800,
              margin: '0 auto',
              padding: '60px 40px',
              background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
              boxShadow: '0 20px 60px rgba(74,16,99,0.5)'
            }}
          >
            <h2 className="font-bold text-white mb-3" style={{ fontSize: 24 }}>
              Siap mengembangkan bisnis Anda dengan RestockAI?
            </h2>
            <p className="text-[#E8E8E8] text-sm mb-8" style={{ lineHeight: 1.7 }}>
              Bergabung dengan 2.000+ UMKM Indonesia yang sudah menggunakan RestockAI<br />
              untuk mengelola stok lebih cerdas.
            </p>
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 0 32px rgba(245,224,74,0.6)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/onboarding')}
              className="font-bold"
              style={{
                height: 52,
                width: 280,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #F5E04A, #FFD700)',
                color: '#0F0F0F',
                fontSize: 16,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Daftar Sekarang — Gratis
            </motion.button>
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <footer className="text-center pb-10" style={{ marginTop: -20 }}>
          <p className="text-xs text-[#E8E8E8]">
            © 2024 RestockAI. Made with ❤️ for Indonesian entrepreneurs.
          </p>
        </footer>

      </div>
    </div>
  );
}

// ─── Pricing Card Component ───────────────────────────────────────────────────

interface FeatureRow { label: string; ok: boolean }

interface PricingCardProps {
  delay: number;
  title: string;
  price: string;
  priceGradient: string | null;
  subtitle: string;
  featured?: boolean;
  features: FeatureRow[];
  buttonLabel: string;
  buttonStyle: React.CSSProperties;
  onAction: () => void;
}

function PricingCard({
  delay, title, price, priceGradient, subtitle,
  featured = false, features, buttonLabel, buttonStyle, onAction
}: PricingCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: featured ? 1.07 : 1.03 }}
      className="relative flex flex-col rounded-[20px] border"
      style={{
        padding: 32,
        background: featured ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        borderWidth: featured ? 2 : 1,
        borderColor: hovered
          ? '#00FFFF'
          : featured
          ? '#00FF7F'
          : 'rgba(255,255,255,0.15)',
        boxShadow: hovered
          ? '0 16px 48px rgba(0,255,255,0.2)'
          : featured
          ? '0 8px 40px rgba(0,255,127,0.2)'
          : 'none',
        zIndex: featured ? 2 : 1,
        marginTop: featured ? -16 : 0,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      {/* Popular badge */}
      {featured && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -14 }}>
          <span
            className="text-[11px] font-bold px-4 py-1.5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #F5E04A, #FFD700)',
              color: '#0F0F0F',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap'
            }}
          >
            ⭐ PALING POPULER
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-white" style={{ marginTop: featured ? 12 : 0, marginBottom: 8 }}>
        {title}
      </h3>

      {/* Price */}
      <div className="flex items-end gap-1 mb-1">
        <span
          className="font-bold"
          style={{
            fontSize: 40,
            lineHeight: 1,
            background: priceGradient ?? undefined,
            WebkitBackgroundClip: priceGradient ? 'text' : undefined,
            WebkitTextFillColor: priceGradient ? 'transparent' : undefined,
            color: priceGradient ? undefined : '#fff'
          }}
        >
          {price}
        </span>
        <span className="text-sm text-[#E8E8E8] mb-1">/bulan</span>
      </div>

      {/* Subtitle */}
      <p className="text-[13px] text-[#E8E8E8]" style={{ marginBottom: 24 }}>
        {subtitle}
      </p>

      {/* Feature list */}
      <ul className="flex flex-col gap-3 flex-1" style={{ marginBottom: 32 }}>
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            {f.ok ? <CheckIcon /> : <XIcon />}
            <span
              className="text-[13px]"
              style={{
                color: f.ok ? '#fff' : '#666',
                textDecoration: f.ok ? undefined : 'line-through'
              }}
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(139,75,190,0.5)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onAction}
        className="w-full font-bold rounded-xl border-0"
        style={{
          height: 44,
          fontSize: 14,
          cursor: 'pointer',
          ...buttonStyle
        }}
      >
        {buttonLabel}
      </motion.button>
    </motion.div>
  );
}
