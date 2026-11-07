import React, { useState } from 'react';
import { ArrowDown, Sparkles, Layers, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

interface HeroProps {
  onScrollToRack: () => void;
  onOpenCombineStudio: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToRack,
  onOpenCombineStudio,
  onOpenChat,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800"
    >
      {/* Background Interactive Ambient Spotlight */}
      <div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Ticker Notice Bar */}
        <div className="mb-6 overflow-hidden rounded-xl bg-neutral-900/80 border border-neutral-800 py-2 px-4">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                CANLI OUTLET ALANI:
              </span>
              <span className="hidden sm:inline">
                Şaban Bey × Riko × Azak Tasfiye Sezonu Başladı!
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">%65'e Varan İndirimler</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-300 hidden md:inline">Kapıda Ödeme & Değişim Garantisi</span>
            </div>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & High-Energy CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
              <span>Özel Tasarım Outlet & Kombin Mağazası</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08] font-display">
              SOKAK MODASI VE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                LÜKS OUTLETİN
              </span>{' '}
              BULUŞMA NOKTASI.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              Azak ve Riko’nun ikonik sokak parçaları, Şaban Outlet güvencesiyle tek platformda. 
              Aşağı kaydırarak <strong className="text-white font-semibold">sallanan askılık vitrinindeki</strong> giysileri incele veya kendi kombinini stüdyomuzda oluştur.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onScrollToRack}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl shadow-[0_8px_24px_rgba(245,158,11,0.25)] hover:shadow-[0_12px_28px_rgba(245,158,11,0.35)] transition-all group"
              >
                <Sparkles className="w-4 h-4 text-neutral-950" />
                <span>Askılığa İn (Canlı Animasyon)</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCombineStudio}
                className="flex items-center gap-2 px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl border border-neutral-700 hover:border-neutral-500 transition-all"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Kombin Stüdyosu (-%20)</span>
              </button>

              <button
                onClick={onOpenChat}
                className="flex items-center gap-2 px-4 py-3.5 text-xs text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <span>Yapay Zeka Stiliste Sor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80 max-w-lg">
              <div>
                <span className="text-xl sm:text-2xl font-black text-white block tabular-nums">
                  %65
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                  Outlet İndirimi
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-amber-400 block tabular-nums">
                  480 GSM
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                  Ağır Fransız Kumaş
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white block tabular-nums">
                  24 Saat
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                  Hızlı Kargolama
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showroom Collage */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 transition-transform duration-500 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
              }}
            >
              <img
                src="/src/assets/images/hero_outlet_fashion_1794076319385.jpg"
                alt="Şaban Outlet & Riko Showroom"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover filter brightness-95 contrast-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              {/* Floating Parallax Tag 1 */}
              <div
                className="absolute top-4 left-4 p-2.5 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 shadow-lg flex items-center gap-2.5 transition-transform duration-300"
                style={{
                  transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <div>
                  <span className="text-xs font-bold text-white block">Mağaza Stokları Güncel</span>
                  <span className="text-[10px] text-neutral-400">Şaban Outlet Kadıköy Showroom</span>
                </div>
              </div>

              {/* Floating Parallax Tag 2 */}
              <div
                className="absolute bottom-4 right-4 p-3 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-amber-500/40 shadow-xl max-w-xs transition-transform duration-300"
                style={{
                  transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
                }}
              >
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Orijinal Outlet Güvencesi</span>
                </div>
                <p className="text-[11px] text-neutral-300">
                  Her ürün dikiş, kumaş ve etiket kontrolünden geçirilerek paketlenir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
