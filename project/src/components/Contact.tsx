import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, MessageCircle, Hash, Mail, ArrowRight } from 'lucide-react';

const channels = [
  {
    icon: Send,
    label: 'Telegram',
    handle: '@thumbcraft_design',
    href: 'https://t.me/thumbcraft_design',
    accent: '#22d3ee',
    description: 'Fastest response — usually within hours',
  },
  {
    icon: Hash,
    label: 'Discord',
    handle: 'thumbcraft#0001',
    href: '#',
    accent: '#a855f7',
    description: 'Join the server to discuss your project',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'hello@thumbcraft.design',
    href: 'mailto:hello@thumbcraft.design',
    accent: '#f472b6',
    description: 'For detailed briefs and contracts',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', channel: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', channel: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-[#0b0b12] relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed 30%, #a855f7 50%, #7c3aed 70%, transparent)' }}
      />
      <div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #4c1d95, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed)' }} />
            <span className="text-xs font-mono-custom text-purple-500 tracking-widest uppercase">Contact</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #f472b6)' }}>Work</span>
          </h2>
          <p className="text-gray-500 max-w-lg">Ready to take your thumbnails to the next level? Reach out through any channel.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {channels.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <motion.a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-5 p-5 glass-card rounded-xl group hover:translate-x-1 transition-transform duration-300"
                  style={{
                    border: `1px solid rgba(168,85,247,0.1)`,
                  }}
                  data-hover
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${ch.accent}18`,
                      border: `1px solid ${ch.accent}35`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: ch.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">{ch.label}</span>
                    </div>
                    <div className="font-mono-custom text-sm mb-1" style={{ color: ch.accent }}>{ch.handle}</div>
                    <div className="text-xs text-gray-600">{ch.description}</div>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                  />
                </motion.a>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass-card rounded-xl p-5 mt-6"
              style={{ border: '1px solid rgba(168,85,247,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-gray-300">Typical response time</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                I respond within <span className="text-purple-400">2–6 hours</span> on weekdays.
                Feel free to include your YouTube channel link and a brief description of your style when reaching out.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: quick message form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-5"
              style={{ border: '1px solid rgba(168,85,247,0.15)' }}
            >
              <h3 className="text-lg font-bold text-white mb-1">Quick Message</h3>
              <p className="text-xs text-gray-500 mb-2">I'll get back to you within 24 hours.</p>

              <div>
                <label className="block text-xs font-mono-custom text-gray-500 tracking-widest uppercase mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name or channel"
                  className="w-full bg-[#050505]/70 border border-purple-900/30 rounded-lg px-4 py-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-custom text-gray-500 tracking-widest uppercase mb-2">Channel / Link</label>
                <input
                  type="text"
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  placeholder="youtube.com/yourchannel"
                  className="w-full bg-[#050505]/70 border border-purple-900/30 rounded-lg px-4 py-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-custom text-gray-500 tracking-widest uppercase mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, niche, and style preferences..."
                  rows={4}
                  className="w-full bg-[#050505]/70 border border-purple-900/30 rounded-lg px-4 py-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                style={{
                  background: submitted
                    ? 'linear-gradient(135deg, #059669, #10b981)'
                    : 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  boxShadow: submitted
                    ? '0 0 25px rgba(5,150,105,0.4)'
                    : '0 0 25px rgba(124,58,237,0.4)',
                }}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
