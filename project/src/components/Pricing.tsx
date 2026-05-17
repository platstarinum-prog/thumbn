import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Zap, Package, Repeat } from 'lucide-react';

const plans = [
  {
    icon: Zap,
    name: 'One Thumbnail',
    price: '$35',
    period: 'per thumbnail',
    description: 'Perfect for testing the quality before committing to a larger package.',
    features: [
      'Custom cinematic design',
      '2 revision rounds',
      '48h delivery',
      'Source file included',
      'Commercial license',
    ],
    accent: '#a855f7',
    popular: false,
  },
  {
    icon: Package,
    name: 'Pack of 3',
    price: '$89',
    period: 'per pack',
    description: 'The most popular choice for creators who want consistent branding.',
    features: [
      'Everything in One',
      '3 custom thumbnails',
      'Consistent style guide',
      'Priority delivery (36h)',
      'Unlimited revisions',
      'Brand kit included',
    ],
    accent: '#c084fc',
    popular: true,
  },
  {
    icon: Repeat,
    name: 'Monthly Work',
    price: '$249',
    period: 'per month',
    description: 'For serious creators who publish regularly and need constant quality.',
    features: [
      'Everything in Pack',
      'Up to 10 thumbnails',
      'Dedicated support',
      'Same-day delivery',
      'A/B test variants',
      'Analytics consulting',
    ],
    accent: '#f472b6',
    popular: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 bg-[#050505] relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed 30%, #a855f7 50%, #7c3aed 70%, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, #4c1d95, transparent 70%)',
          filter: 'blur(60px)',
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
            <span className="text-xs font-mono-custom text-purple-500 tracking-widest uppercase">Pricing</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4">
            Transparent <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #c084fc)' }}>Rates</span>
          </h2>
          <p className="text-gray-500 max-w-lg">No hidden fees, no surprises. Pick the plan that fits your workflow.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group"
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="px-4 py-1 text-xs font-mono-custom font-bold rounded-full tracking-widest whitespace-nowrap"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                        color: 'white',
                        boxShadow: '0 0 20px rgba(124,58,237,0.5)',
                      }}
                    >
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div
                  className="glass-card rounded-2xl p-8 h-full flex flex-col transition-all duration-400 group-hover:translate-y-[-4px]"
                  style={{
                    border: plan.popular
                      ? `1px solid ${plan.accent}50`
                      : '1px solid rgba(168,85,247,0.12)',
                    boxShadow: plan.popular
                      ? `0 0 30px ${plan.accent}25, 0 0 60px ${plan.accent}10`
                      : '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="mb-6">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{
                        background: `${plan.accent}18`,
                        border: `1px solid ${plan.accent}35`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: plan.accent }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="mb-7">
                    <span className="text-4xl font-bold text-white font-mono-custom" style={{ textShadow: `0 0 20px ${plan.accent}50` }}>
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-gray-400">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${plan.accent}20`, border: `1px solid ${plan.accent}40` }}
                        >
                          <Check className="w-2.5 h-2.5" style={{ color: plan.accent }} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToContact}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={
                      plan.popular
                        ? {
                            background: `linear-gradient(135deg, #7c3aed, ${plan.accent})`,
                            color: 'white',
                            boxShadow: `0 0 25px ${plan.accent}40`,
                          }
                        : {
                            background: 'transparent',
                            color: plan.accent,
                            border: `1px solid ${plan.accent}40`,
                          }
                    }
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
