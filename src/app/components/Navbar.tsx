import RestockAILogo from './brand/RestockAILogo';

interface NavbarProps {
  onGetStarted?: () => void;
}

export default function Navbar({ onGetStarted }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-[#0F0F0F]/80"
         style={{ backdropFilter: 'blur(10px)' }}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <RestockAILogo size={34} showWordmark wordmarkColor="light" />

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#fitur" className="text-white text-sm hover:text-cyan-400 transition-colors">Fitur</a>
          <a href="#reviews" className="text-white text-sm hover:text-cyan-400 transition-colors">Reviews</a>
          <a href="#harga" className="text-white text-sm hover:text-cyan-400 transition-colors">Harga</a>
          <a href="#blog" className="text-white text-sm hover:text-cyan-400 transition-colors">Blog</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block px-6 h-10 border border-white rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all">
            Masuk
          </button>
          <button
            onClick={onGetStarted}
            className="px-6 h-10 rounded-xl text-white text-sm font-medium transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #4A1063, #8B4BBE)' }}>
            Mulai Gratis
          </button>
        </div>
      </div>
    </nav>
  );
}
