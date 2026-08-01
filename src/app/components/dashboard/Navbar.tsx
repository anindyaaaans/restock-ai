import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 right-0 left-60 h-16 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-8">
        <span className="text-[#1A1A1B] font-semibold text-lg">Toko Berkah</span>
      </div>

      <div className="px-5 h-10 rounded-full bg-slate-50 border border-gray-100 flex items-center text-sm text-[#4B5563] font-medium">
        01-30 Mei 2024
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard/search')}
          className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-[#4B5563] hover:text-[#1A1A1B] hover:bg-[#FFFBEB] hover:border-indigo-200 transition-colors shadow-sm"
        >
          <Search size={18} />
        </button>

        <button
          onClick={() => navigate('/dashboard/notifikasi')}
          className="relative w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-[#4B5563] hover:text-[#1A1A1B] hover:bg-[#FFFBEB] hover:border-indigo-200 transition-colors shadow-sm"
        >
          <Bell size={18} />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white" />
        </button>

        <button
          onClick={() => navigate('/dashboard/pengaturan')}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#1A1A1B] font-bold text-sm bg-[#FFE16F] hover:bg-[#E8CD65] transition-colors shadow-sm border border-gray-100 ml-2"
        >
          TB
        </button>
      </div>
    </nav>
  );
}
