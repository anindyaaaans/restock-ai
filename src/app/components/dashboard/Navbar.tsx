import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router';
import RestockAILogo from '../brand/RestockAILogo';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav
      className="fixed top-0 right-0 left-60 h-16 z-40 border-b flex items-center justify-between px-10"
      style={{
        background: 'rgba(15, 15, 15, 0.85)',
        backdropFilter: 'blur(15px)',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <span className="text-white">Toko Berkah</span>
      </div>

      {/* Center Section - Date Range */}
      <div
        className="px-4 h-10 rounded-full border flex items-center text-sm text-[#E8E8E8]"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}
      >
        01-30 Mei 2024
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button
          onClick={() => navigate('/dashboard/search')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate('/dashboard/notifikasi')}
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
        >
          <Bell size={20} />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF00FF]" />
        </button>

        {/* User Avatar */}
        <button
          onClick={() => navigate('/dashboard/pengaturan')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm transition-opacity hover:opacity-80"
          style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)', border: 'none', cursor: 'pointer' }}
        >
          TB
        </button>
      </div>
    </nav>
  );
}
