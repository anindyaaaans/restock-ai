import { motion } from 'motion/react';

interface KPICardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  subtitle: string;
  bg: string;
  borderColor: string;
}

export default function KPICard({
  icon,
  iconBg,
  label,
  value,
  subtitle,
  bg,
  borderColor,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl p-6 border transition-all"
      style={{
        background: bg,
        backdropFilter: 'blur(12px)',
        borderColor,
        minHeight: '140px'
      }}
    >
      <div className="flex justify-between items-start mb-4">
        {/* Icon */}
        <div
          className="w-15 h-15 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: iconBg }}
        >
          {icon}
        </div>

        {/* Label */}
        <span className="text-[10px] text-[#4B5563] uppercase tracking-wider">
          {label}
        </span>
      </div>

      {/* Value */}
      <div className="mt-auto">
        <h3
          className="text-3xl font-bold mb-1"
          style={{ color: '#1A1A1B' }}
        >
          {value}
        </h3>
        <p className="text-xs text-[#4B5563]">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}
