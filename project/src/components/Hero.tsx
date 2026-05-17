import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${6 + Math.random() * 8}s`,
  size: Math.random() > 0.5 ? 2 : 1,
}));

export default function Hero() {
  const scrollToPortfolio = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 ambient-glow"
          style={{
            background: 'radial-gradient(circle, #4c1d95 0%, #2e1065 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 ambient-glow"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, #1e1b4b 40%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '3s',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-10"
          style={{
            background: 'radial-gradient(ellipse, #6d28d9 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-purple-400 opacity-0"
            style={{
              left: p.left,
              bottom: '-10px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `particle-drift ${p.duration} ${p.delay} linear infinite`,
              boxShadow: `0 0 4px rgba(168,85,247,0.8)`,
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono-custom text-purple-400 border border-purple-800/50 rounded-full bg-purple-950/30 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Available for work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight"
        >
          <span className="glitch-text relative inline-block" data-text="THUMBNAILS">
            THUMBNAILS
          </span>
          <br />
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #7c3aed 70%, #f472b6 100%)',
            }}>
              THAT GET
            </span>
          </span>
          <br />
          <span className="relative inline-block text-white glow-text">
            CLICKS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Custom YouTube thumbnail design with cinematic composition
          and modern editing style. Built to stop the scroll.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToPortfolio}
            className="group relative px-8 py-4 font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 0 30px rgba(124,58,237,0.5)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-4 h-4" fill="currentColor" />
              View Work
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button
            onClick={scrollToContact}
            className="group px-8 py-4 font-semibold text-purple-300 border border-purple-600/40 rounded-full hover:border-purple-400 hover:text-white hover:bg-purple-500/10 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
          >
            Contact
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-600 font-mono-custom tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-purple-600" />
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { value: '200+', label: 'Thumbnails Made' },
            { value: '50+', label: 'Happy Clients' },
            { value: '40M+', label: 'Views Generated' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-purple-300 glow-text font-mono-custom">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
