import { useNavigate } from 'react-router';
import RestockAILogo from './brand/RestockAILogo';

interface NavbarProps {
  onGetStarted?: () => void;
}

export default function Navbar({ onGetStarted }: NavbarProps) {
  const navigate = useNavigate();

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-100 bg-white/90"
         style={{ backdropFilter: 'blur(10px)' }}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <RestockAILogo size={34} showWordmark wordmarkColor="light" />

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('fitur')} className="text-[#1A1A1B] text-sm hover:text-[#1A1A1B] transition-colors bg-transparent border-none cursor-pointer">Fitur</button>
          <button onClick={() => scrollTo('reviews')} className="text-[#1A1A1B] text-sm hover:text-[#1A1A1B] transition-colors bg-transparent border-none cursor-pointer">Reviews</button>
          <button onClick={() => scrollTo('harga')} className="text-[#1A1A1B] text-sm hover:text-[#1A1A1B] transition-colors bg-transparent border-none cursor-pointer">Harga</button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGetStarted}
            className="hidden sm:block px-6 h-10 border border-indigo-600 text-[#1A1A1B] rounded-full text-[#1A1A1B] text-sm font-medium hover:bg-[#FFFBEB] transition-all cursor-pointer">
            Masuk
          </button>
          <button
            onClick={onGetStarted}
            className="px-6 h-10 rounded-full text-[#1A1A1B] text-sm font-medium transition-all hover:scale-105 cursor-pointer"
            style={{ background: '#FFE16F' }}>
            Mulai Gratis
          </button>
        </div>
      </div>
    </nav>
  );
}
