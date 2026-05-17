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
            ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-purple-900/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="relative">
              <Zap className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" fill="currentColor" />
              <div className="absolute inset-0 blur-sm bg-purple-500 opacity-40 group-hover:opacity-70 transition-opacity rounded-full" />
            </div>
            <span className="font-mono-custom text-white font-bold tracking-widest text-sm uppercase">
              THUMBCRAFT
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleLink(l.href)}
                className="text-sm text-gray-400 hover:text-purple-300 transition-colors duration-300 font-medium tracking-wider uppercase relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => handleLink('#contact')}
              className="px-5 py-2 text-sm font-semibold text-white border border-purple-500/50 rounded-full hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              Hire Me
            </button>
          </nav>

          <button
            className="md:hidden text-gray-300 hover:text-purple-400 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-5 right-6 text-gray-400 hover:text-purple-400"
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
                className="text-3xl font-bold text-gray-200 hover:text-purple-300 transition-colors tracking-widest uppercase"
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.08 }}
              onClick={() => handleLink('#contact')}
              className="mt-4 px-8 py-3 text-lg font-semibold text-white border border-purple-500/60 rounded-full hover:bg-purple-500/15 transition-all"
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
