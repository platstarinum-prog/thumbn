import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const links = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Before/After', href: '#before-after' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#030305]/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Логотип: Новый бренд SMOKY */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="relative">
              <Zap className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="currentColor" />
              <div className="absolute inset-0 blur-sm bg-cyan-500 opacity-40 group-hover:opacity-70 transition-opacity rounded-full" />
            </div>
            <span className="font-mono-custom text-white font-bold tracking-widest text-lg uppercase glitch-text">
              SMOKY
            </span>
          </a>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleLink(l.href)}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-medium tracking-wider uppercase relative group font-mono-custom"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => handleLink('#contact')}
              className="px-5 py-2 text-xs font-bold font-mono-custom text-white border border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] uppercase tracking-widest"
            >
              Get CTR
            </button>
          </nav>

          {/* Бургер для мобилок */}
          <button
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Мобильное меню в полный экран */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#030305]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-5 right-6 text-gray-400 hover:text-cyan-400"
              onClick={() => setOpen(false)}
            >
              <X className="w-7 h-7" />
            </button>
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleLink(l.href)}
                className="text-3xl font-bold text-gray-200 hover:text-cyan-400 transition-colors tracking-widest uppercase font-mono-custom"
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.08 }}
              onClick={() => handleLink('#contact')}
              className="mt-4 px-8 py-3 text-sm font-bold font-mono-custom text-white border border-cyan-500/60 hover:bg-cyan-500/15 transition-all uppercase tracking-widest"
            >
              Get CTR
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
