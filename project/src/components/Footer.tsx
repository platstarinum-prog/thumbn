import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 bg-[#050505] border-t border-purple-950/40">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-500" fill="currentColor" />
          <span className="font-mono-custom text-sm text-gray-600 font-bold tracking-widest uppercase">THUMBCRAFT</span>
        </div>
        <p className="text-xs text-gray-700 font-mono-custom tracking-wider">
          &copy; {new Date().getFullYear()} &mdash; Thumbnails that convert.
        </p>
        <div
          className="w-24 h-px opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, #a855f7, transparent)' }}
        />
      </div>
    </footer>
  );
}
