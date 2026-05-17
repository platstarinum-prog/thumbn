import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const categories = ['All', 'Gaming', 'Tech', 'Finance', 'Lifestyle', 'Education'];

// --- Описываем интерфейс данных для карточки портфолио ---
interface WorkItem {
  label?: string; // На всякий случай, если Decap CMS использует заголовок как label
  title: string;
  category: string;
  views: string;
  img: string;
  accent: string;
}

// --- Компонент отдельной карточки (Твой 3D-tilt и RGB-эффекты) ---
function ThumbnailCard({ work, index }: { work: WorkItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 12, y: -x * 12 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      ref={cardRef}
      className="thumb-card glass-card rounded-xl overflow-hidden group"
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? `0 0 30px ${work.accent}40, 0 0 60px ${work.accent}20, 0 20px 40px rgba(0,0,0,0.6)`
          : '0 4px 20px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-hover
    >
      {/* Image container — 16:9 aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <img
          src={work.img}
          alt={work.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Scanline overlay */}
        <div className="scanline-overlay" />

        {/* RGB split overlay on hover */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(244,114,182,0.08) 0%, transparent 30%),
                linear-gradient(180deg, rgba(34,211,238,0.06) 0%, transparent 30%)
              `,
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.3) 100%)' }}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm"
              style={{ background: `${work.accent}30` }}
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-30">
          <span
            className="px-2.5 py-1 text-xs font-mono-custom font-semibold rounded tracking-wider"
            style={{
              background: `${work.accent}25`,
              border: `1px solid ${work.accent}50`,
              color: work.accent,
            }}
          >
            {work.category}
          </span>
        </div>

        {/* Glow border on hover */}
        <div
          className="absolute inset-0 rounded-t-xl pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 0 1px ${work.accent}60` }}
        />
      </div>

      {/* Card footer */}
      <div className="p-4 bg-[#0b0b12]/80">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-100 group-hover:text-white transition-colors truncate pr-4">
            {work.title}
          </h3>
          <span className="text-xs text-gray-500 whitespace-nowrap font-mono-custom">{work.views}</span>
        </div>
      </div>
    </motion.div>
  );
}

// --- Главный экспортируемый компонент Портфолио ---
export default function Portfolio() {
  const [active, setActive] = useState('All');
  const [works, setWorks] = useState<WorkItem[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    // Автоматически затягиваем все JSON файлы из папки карточек портфолио.
    // ⚠️ ВАЖНО: Укажи здесь точный путь к папке, которая прописана в folder твоего config.yml!
    const modules = import.meta.glob('/src/content/selected_works/*.json', { eager: true });
    
    const loadedWorks = Object.values(modules).map((module: any) => {
      return module.default || module;
    }) as WorkItem[];

    setWorks(loadedWorks);
  }, []);

  // Фильтрация работает уже по динамическому стейту
  const filtered = active === 'All' ? works : works.filter((w) => w.category === active);

  return (
    <section id="portfolio" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }}
      />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse #7c3aed, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed)' }} />
            <span className="text-xs font-mono-custom text-purple-500 tracking-widest uppercase">Portfolio</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4">
            Selected <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #c084fc)' }}>Works</span>
          </h2>
          <p className="text-gray-500 max-w-lg">Thumbnails designed to maximize click-through rate and hook viewers from the first glance.</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-300"
              style={
                active === cat
                  ? {
                      background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                      color: 'white',
                      boxShadow: '0 0 20px rgba(124,58,237,0.4)',
                    }
                  : {
                      background: 'rgba(18,18,26,0.7)',
                      color: '#9ca3af',
                      border: '1px solid rgba(168,85,247,0.15)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((work, i) => (
              <ThumbnailCard key={i} work={work} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
