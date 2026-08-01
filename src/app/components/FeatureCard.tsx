import { motion } from 'motion/react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-8 rounded-2xl border border-gray-100 hover:border-cyan-400/50 transition-all bg-white/5"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      {/* Icon Background Glow */}
      <div className="absolute top-8 left-8 w-16 h-16 rounded-full opacity-30"
           style={{ background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3), transparent)' }} />

      {/* Icon */}
      <div className="relative text-5xl mb-4" style={{
        background: 'linear-gradient(135deg, #98E2FD, #1A1A1B)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-[#1A1A1B] font-bold mb-3">{title}</h3>
      <p className="text-[#4B5563] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
