import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#05050a] border-t border-white/5 py-8 mt-20 font-mono-custom">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-cyan-400" fill="currentColor" />
          <span className="glitch-text text-xl font-bold tracking-widest text-white">SMOKY</span>
          <span className="text-xs text-white/20">|</span>
          <p className="text-xs tracking-wider text-gray-500 uppercase">
            YOUTUBE CTR LABORATORY &copy; {new Date().getFullYear()}
          </p>
        </div>

        <div
          className="hidden md:block w-32 h-px opacity-20"
          style={{ background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)' }}
        />

        <div className="text-xs tracking-widest text-gray-600 hover:text-white/40 transition-colors">
          DEVELOPED BY <span class="text-white/40 font-bold">KRVTSV CORP</span> //{' '}
          <a 
            href="#" 
            className="underline hover:text-cyan-400 transition-colors ml-1"
          >
            MY_PORTFOLIO_SITE
          </a>
        </div>

      </div>
    </footer>
  );
}
