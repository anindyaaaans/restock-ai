import { motion } from 'motion/react';

interface KPICardProps {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
  subtitle: string;
  valueColor?: string;
  isDanger?: boolean;
}

export default function KPICard({
  icon,
  iconBg,
  label,
  value,
  subtitle,
  valueColor,
  isDanger
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl p-6 border transition-all"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(12px)',
        borderColor: isDanger ? 'rgba(255, 0, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)',
        minHeight: '140px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isDanger ? 'rgba(255, 0, 255, 0.6)' : 'rgba(0, 255, 255, 0.6)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.boxShadow = isDanger
          ? '0 8px 32px rgba(255, 0, 255, 0.2)'
          : '0 8px 32px rgba(0, 255, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isDanger ? 'rgba(255, 0, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
        e.currentTarget.style.boxShadow = 'none';
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
        <span className="text-[10px] text-[#E8E8E8] uppercase tracking-wider">
          {label}
        </span>
      </div>

      {/* Value */}
      <div className="mt-auto">
        <h3
          className="text-3xl font-bold mb-1"
          style={
            valueColor
              ? { color: valueColor }
              : {
                  background: 'linear-gradient(135deg, #00FF7F, #00FFFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }
          }
        >
          {value}
        </h3>
        <p className={`text-xs ${isDanger ? 'text-[#FF00FF]' : 'text-[#E8E8E8]'}`}>
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}
