import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import RestockAILogo from '../brand/RestockAILogo';
import { Home, BrainCircuit, Lightbulb, Package, BarChart2, ShoppingCart, Store, DollarSign, Newspaper, Users, LineChart, Plug, Settings } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface SidebarProps {
  activePage?: string;
}

export default function Sidebar({ activePage = 'dashboard' }: SidebarProps) {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { icon: <Home size={18} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <BrainCircuit size={18} />, label: 'Prediksi Restock', path: '/dashboard/prediksi' },
    { icon: <Lightbulb size={18} />, label: 'Restock Intelligence', path: '/dashboard/rekomendasi' },
    { icon: <Package size={18} />, label: 'Produk', path: '/dashboard/produk' },
    { icon: <BarChart2 size={18} />, label: 'Inventori', path: '/dashboard/inventori' },
    { icon: <ShoppingCart size={18} />, label: 'Pembelian', path: '/dashboard/pembelian' },
    { icon: <Store size={18} />, label: 'Supplier Terbaik', path: '/dashboard/supplier' },
    { icon: <DollarSign size={18} />, label: 'Penjualan', path: '/dashboard/penjualan' },
    { icon: <Newspaper size={18} />, label: 'Berita UMKM', path: '/dashboard/berita' },
    { icon: <Users size={18} />, label: 'Komunitas', path: '/dashboard/komunitas' },
    { icon: <LineChart size={18} />, label: 'Laporan', path: '/dashboard/laporan' },
    { icon: <Plug size={18} />, label: 'Integrasi', path: '/dashboard/integrasi' },
    { icon: <Settings size={18} />, label: 'Pengaturan', path: '/dashboard/pengaturan' }
  ];

  const getPageId = (path: string) => {
    const segments = path.split('/');
    return segments[segments.length - 1];
  };

  return (
    <aside className="fixed left-0 top-0 w-60 h-screen bg-white border-r border-gray-100 overflow-y-auto z-50 shadow-[4px_0_24px_-2px_rgba(0,0,0,0.02)]">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-10 flex items-center gap-2">
          {/* Logo container */}
          <RestockAILogo size={36} showWordmark={false} />
          <span className="font-bold text-xl text-[#1A1A1B] tracking-tight">Restock AI</span>
        </div>

        <nav className="space-y-1 flex-1">
          {navItems.map((item, index) => {
            const isActive = activePage === getPageId(item.path) || (activePage === 'dashboard' && item.path === '/dashboard');
            return (
              <motion.button
                key={index}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-4 py-3 rounded-full text-sm flex items-center gap-3 transition-all ${
                  isActive 
                    ? 'font-bold bg-[#FFFBEB] text-[#1A1A1B] shadow-sm ring-1 ring-indigo-500/10' 
                    : 'text-[#4B5563] font-medium hover:bg-slate-50 hover:text-[#1A1A1B]'
                }`}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="truncate whitespace-nowrap">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <div className="h-px bg-slate-100 mb-6" />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/pricing')}
            className="w-full h-11 rounded-full font-bold text-sm text-[#1A1A1B] mb-6 transition-all"
            style={{
              background: '#FFE16F',
              boxShadow: '0 4px 16px rgba(255, 225, 111, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 225, 111, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 225, 111, 0.3)';
            }}
          >
            Upgrade ke Pro
          </motion.button>

          <motion.div
            onClick={() => navigate('/dashboard/pengaturan')}
            whileHover={{ opacity: 0.8 }}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-full hover:bg-slate-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#1A1A1B] font-bold text-sm bg-[#FFE16F] flex-shrink-0 shadow-sm">
              TB
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-[#1A1A1B]">Toko Berkah</p>
              <p className="text-xs text-[#4B5563]">Pemilik</p>
            </div>
          </motion.div>
        </div>
      </div>
    </aside>
  );
}
