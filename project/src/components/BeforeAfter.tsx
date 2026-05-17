import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

function ComparisonSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseDown = () => setDragging(true);
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) updatePos(e.clientX); };
  const onMouseUp = () => setDragging(false);

  const onTouchStart = () => setDragging(true);
  const onTouchMove = (e: React.TouchEvent) => { if (dragging) updatePos(e.touches[0].clientX); };
  const onTouchEnd = () => setDragging(false);

  useEffect(() => {
    const handleUp = () => setDragging(false);
    window.addEventListener('mouseup', handleUp);
    return () => window.removeEventListener('mouseup', handleUp);
  }, []);

  const triggerGlitch = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 400);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl select-none"
      style={{
        paddingBottom: '56.25%',
        cursor: dragging ? 'ew-resize' : 'col-resize',
        boxShadow: '0 0 30px rgba(168,85,247,0.15), 0 20px 40px rgba(0,0,0,0.5)',
        border: '1px solid rgba(168,85,247,0.2)',
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={(e) => { updatePos(e.clientX); triggerGlitch(); }}
    >
      <div className="absolute inset-0">
        <img src={before} alt="Before" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(100,80,80,0.4), rgba(60,40,40,0.2))' }} />
      </div>

      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={after} alt="After" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(76,29,149,0.2), transparent)' }} />
      </div>

      {glitching && (
        <>
          <div className="absolute top-0 bottom-0 w-8 pointer-events-none z-20" style={{ left: `calc(${pos}% - 16px)`, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)', filter: 'blur(2px)' }} />
          <div className="absolute top-0 bottom-0 w-1 pointer-events-none z-20 opacity-80" style={{ left: `${pos}%`, background: 'linear-gradient(180deg, #f472b6, #a855f7, #22d3ee)', boxShadow: '0 0 10px #a855f7', transform: `translateX(-50%) translateX(${Math.random() * 4 - 2}px)` }} />
        </>
      )}

      <div className="absolute top-0 bottom-0 w-0.5 z-10 pointer-events-none" style={{ left: `${pos}%`, transform: 'translateX(-50%)', background: 'linear-gradient(180deg, transparent, #a855f7 20%, #c084fc 50%, #a855f7 80%, transparent)', boxShadow: '0 0 8px rgba(168,85,247,0.6)' }} />

      <div className="absolute top-1/2 z-20 flex items-center justify-center" style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }} onMouseDown={onMouseDown} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/60" style={{ background: 'rgba(10,5,20,0.85)', boxShadow: '0 0 20px rgba(168,85,247,0.5)', cursor: 'ew-resize' }}>
          <div className="flex gap-0.5"><div className="w-0.5 h-3 bg-purple-400 rounded-full" /><div className="w-0.5 h-3 bg-purple-400 rounded-full" /></div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10"><span className="px-2.5 py-1 text-xs font-mono-custom font-bold rounded tracking-widest" style={{ background: 'rgba(60,20,20,0.8)', border: '1px solid rgba(244,114,182,0.3)', color: '#f472b6', backdropFilter: 'blur(8px)' }}>BEFORE</span></div>
      <div className="absolute bottom-4 right-4 z-10"><span className="px-2.5 py-1 text-xs font-mono-custom font-bold rounded tracking-widest" style={{ background: 'rgba(30,10,60,0.8)', border: '1px solid rgba(168,85,247,0.4)', color: '#c084fc', backdropFilter: 'blur(8px)' }}>AFTER</span></div>
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10"><span className="px-3 py-1 text-xs font-mono-custom text-gray-300 rounded-full tracking-wider" style={{ background: 'rgba(5,5,5,0.7)', border: '1px solid rgba(168,85,247,0.2)', backdropFilter: 'blur(8px)' }}>{label}</span></div>
    </div>
  );
}

interface ComparisonItem {
  label: string;
  before: string;
  after: string;
}

export default function BeforeAfter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [comparisons, setComparisons] = useState<ComparisonItem[]>([]);

  useEffect(() => {
    // Учитываем монорепозиторий и подтягиваем .json файлы
    const modules = import.meta.glob('/project/src/content/before-after/*.json', { eager: true });
    const loadedCards = Object.values(modules).map((module: any) => module.default || module) as ComparisonItem[];
    setComparisons(loadedCards);
  }, []);

  return (
    <section id="before-after" className="py-24 bg-[#0b0b12] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px opacity-20" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed 30%, #a855f7 50%, #7c3aed 70%, transparent)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed)' }} />
            <span className="text-xs font-mono-custom text-purple-500 tracking-widest uppercase">Transformation</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4">
            Before <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #f472b6)' }}>/</span> After
          </h2>
          <p className="text-gray-500 max-w-lg">Drag the slider to see how a professional redesign transforms click-through potential.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {comparisons.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }}>
              <ComparisonSlider before={item.before} after={item.after} label={item.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
