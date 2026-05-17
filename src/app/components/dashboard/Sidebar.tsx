import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import RestockAILogo from '../brand/RestockAILogo';

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

interface SidebarProps {
  activePage?: string;
}

export default function Sidebar({ activePage = 'dashboard' }: SidebarProps) {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { icon: '🧠', label: 'Prediksi Restok', path: '/dashboard/prediksi' },
    { icon: '💡', label: 'Rekomendasi AI', path: '/dashboard/rekomendasi' },
    { icon: '📦', label: 'Produk', path: '/dashboard/produk' },
    { icon: '📊', label: 'Inventori', path: '/dashboard/inventori' },
    { icon: '🛒', label: 'Pembelian', path: '/dashboard/pembelian' },
    { icon: '🏪', label: 'Supplier Terbaik', path: '/dashboard/supplier' },
    { icon: '💰', label: 'Penjualan', path: '/dashboard/penjualan' },
    { icon: '📰', label: 'Berita UMKM', path: '/dashboard/berita' },
    { icon: '👥', label: 'Komunitas', path: '/dashboard/komunitas' },
    { icon: '📈', label: 'Laporan', path: '/dashboard/laporan' },
    { icon: '🔌', label: 'Integrasi', path: '/dashboard/integrasi' },
    { icon: '⚙️', label: 'Pengaturan', path: '/dashboard/pengaturan' }
  ];

  const getPageId = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1];
  };

  return (
    <aside
      className="fixed left-0 top-0 w-60 h-screen border-r overflow-y-auto"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Logo */}
        <div className="mb-10">
          <RestockAILogo size={36} showWordmark wordmarkColor="light" />
        </div>

        {/* Nav Items */}
        <nav className="space-y-2 flex-1">
          {navItems.map((item, index) => {
            const isActive = activePage === getPageId(item.path) || (activePage === 'dashboard' && item.path === '/dashboard');

            return (
              <motion.button
                key={index}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.02 }}
                className={`w-full px-4 py-3 rounded-xl text-sm flex items-center gap-3 transition-all ${
                  isActive ? 'font-bold text-white' : 'text-[#E8E8E8]'
                }`}
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, #4A1063, #8B4BBE)',
                        borderLeft: '3px solid #00FF7F',
                        boxShadow: '0 4px 16px rgba(74, 16, 99, 0.3)'
                      }
                    : {}
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.border = 'none';
                  }
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto">
          <div className="h-px bg-white/10 mb-4" />

          {/* Upgrade Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/pricing')}
            className="w-full h-11 rounded-xl font-bold text-sm text-[#0F0F0F] mb-4"
            style={{
              background: 'linear-gradient(135deg, #F5E04A, #FFD700)',
              boxShadow: '0 4px 16px rgba(245, 224, 74, 0.3)'
            }}
          >
            Upgrade ke Pro
          </motion.button>

          {/* User Profile */}
          <motion.div
            onClick={() => navigate('/dashboard/pengaturan')}
            whileHover={{ opacity: 0.85 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)' }}
            >
              TB
            </div>
            <div>
              <p className="text-xs font-bold text-white">Toko Berkah</p>
              <p className="text-[10px] text-[#E8E8E8]">Pemilik</p>
            </div>
          </motion.div>
        </div>
      </div>
    </aside>
  );
}
