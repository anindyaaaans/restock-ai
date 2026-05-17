import { motion } from 'motion/react';
import RestockAIMascot from './brand/RestockAIMascot';

export default function FloatingRobot() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 320, height: 380 }}>
      {/* Ambient glow behind mascot */}
      <div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          background: 'radial-gradient(circle, rgba(0,212,200,0.18) 0%, rgba(74,16,99,0.3) 50%, transparent 80%)',
          filter: 'blur(32px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Floating mascot */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <RestockAIMascot size={220} expression="waving" />
      </motion.div>

      {/* Floating stat bubbles */}
      <motion.div
        animate={{ y: [0, -8, 0], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute right-2 top-16 rounded-2xl border px-3 py-2 text-xs font-bold text-white"
        style={{
          background: 'rgba(0,212,200,0.15)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(0,212,200,0.35)',
          boxShadow: '0 4px 16px rgba(0,212,200,0.2)',
        }}
      >
        <span style={{ color: '#00d4c8' }}>↑ 30%</span> Prediksi akurat
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute left-0 top-28 rounded-2xl border px-3 py-2 text-xs font-bold text-white"
        style={{
          background: 'rgba(74,16,99,0.4)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(139,75,190,0.4)',
          boxShadow: '0 4px 16px rgba(74,16,99,0.3)',
        }}
      >
        📦 Stok optimal
      </motion.div>

      <motion.div
        animate={{ y: [0, -9, 0], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        className="absolute right-0 bottom-24 rounded-2xl border px-3 py-2 text-xs font-bold"
        style={{
          background: 'rgba(0,255,127,0.12)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(0,255,127,0.35)',
          color: '#00FF7F',
          boxShadow: '0 4px 16px rgba(0,255,127,0.15)',
        }}
      >
        ✓ Zero stockout
      </motion.div>

      {/* Ground shadow */}
      <motion.div
        animate={{ scaleX: [1, 0.85, 1], opacity: [0.3, 0.18, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 rounded-full"
        style={{
          width: 140,
          height: 18,
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 80%)',
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
}
