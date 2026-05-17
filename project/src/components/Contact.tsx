import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Instagram, MessageSquare, Mail, ArrowRight } from 'lucide-react';

// Чистый SVG для TikTok, так как в Lucide его нет по дефолту
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.7 4.16 1.12 1.11 2.7 1.68 4.25 1.75v3.92c-1.72-.04-3.41-.63-4.75-1.72-.11-.08-.2-.17-.3-.26v6.62c.04 2.11-.55 4.31-2.04 5.84-1.6 1.74-4.13 2.51-6.43 2.11-2.48-.35-4.74-2.19-5.46-4.63-1.01-3.14.7-6.73 3.84-7.65 1.16-.36 2.41-.29 3.52.2v4.06c-.84-.45-1.89-.52-2.75-.07-.98.48-1.55 1.59-1.42 2.68.1 1.05.97 1.93 2.02 2.01 1.04.14 2.14-.42 2.57-1.37.24-.46.32-.99.3-1.51V0h4.35z"/>
  </svg>
);

const channels = [
  {
    icon: (props: any) => <Send {...props} />,
    label: 'Telegram',
    handle: '@lenz1o',
    href: 'https://t.me/lenz1o',
    accent: '#38bdf8', // Голубой под ТГ
    description: 'Fastest response — usually within hours',
  },
  {
    icon: (props: any) => <Instagram {...props} />,
    label: 'Instagram',
    handle: 'smoky.psd',
    href: 'https://instagram.com/smoky.psd',
    accent: '#f472b6', // Розовый
    description: 'DM for designs, source files and previews',
  },
  {
    icon: (props: any) => <TikTokIcon {...props} />,
    label: 'TikTok',
    handle: 'flamezcs',
    href: 'https://www.tiktok.com/@flamezcs',
    accent: '#22d3ee', // Бирюза
    description: 'Check out recent edits and content examples',
  },
  {
    icon: (props: any) => <MessageSquare {...props} />,
    label: 'Discord',
    handle: 'smoky.psd_9843',
    href: 'https://discord.com/users/928014524128538624', // Либо '#' если просто как инфо
    accent: '#a855f7', // Фиолетовый
    description: 'Available for text or voice chat discussions',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-24 bg-[#0b0b12] relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed 30%, #a855f7 50%, #7c3aed 70%, transparent)' }}
      />
      <div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, #7c3aed, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Заголовок */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed)' }} />
            <span className="text-xs font-mono-custom text-purple-500 tracking-widest uppercase">Contact</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, #7c3aed)' }} />
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Make Something <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #f472b6)' }}>Epic</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Ready to take your project to the next level? Drop me a line on any preferred platform.
          </p>
        </motion.div>

        {/* Сетка контактов во всю ширину */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {channels.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `0 0 25px ${ch.accent}20, inset 0 0 12px ${ch.accent}15`,
                  borderColor: ch.accent
                }}
                className="flex items-center gap-5 p-5 glass-card rounded-xl border border-white/5 bg-[#050505]/40 backdrop-blur-md group transition-colors duration-300"
                style={{
                  border: `1px solid rgba(168,85,247,0.08)`,
                }}
                data-hover
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${ch.accent}12`,
                    border: `1px solid ${ch.accent}30`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: ch.accent }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-white block mb-0.5">{ch.label}</span>
                  <div className="font-mono-custom text-sm mb-1 font-medium" style={{ color: ch.accent }}>
                    {ch.handle}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{ch.description}</div>
                </div>

                <ArrowRight
                  className="w-4 h-4 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                />
              </motion.a>
            );
          })}
        </div>

        {/* Плашка снизу */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-5 mt-6 max-w-3xl mx-auto text-center sm:text-left"
          style={{ border: '1px solid rgba(168,85,247,0.08)' }}
        >
          <p className="text-xs text-gray-500 leading-relaxed">
            ⚡ Typical response time is <span className="text-purple-400 font-semibold">2–6 hours</span>. 
            Feel free to include reference links, your YouTube channel, and a brief description of what you need when reaching out.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
