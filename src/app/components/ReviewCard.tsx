import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
  delay?: number;
}

export default function ReviewCard({ name, role, review, rating, avatar, delay = 0 }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl border border-gray-100 bg-white/5 hover:border-cyan-400/50 transition-all"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-[#4B5563]'}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
        "{review}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-[#1A1A1B] font-bold">
          {avatar}
        </div>
        <div>
          <p className="text-[#1A1A1B] font-bold text-sm">{name}</p>
          <p className="text-[#4B5563] text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
