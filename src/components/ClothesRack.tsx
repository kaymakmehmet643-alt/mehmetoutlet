import React, { useState, useRef, useEffect } from 'react';
import { Product, Size } from '../types';
import { formatCurrency } from '../utils/pricing';
import { Eye, ShoppingBag, Sparkles, ChevronLeft, ChevronRight, Volume2, VolumeX, Layers } from 'lucide-react';

interface ClothesRackProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: Size) => void;
  onAddToCombine: (product: Product) => void;
}

export const ClothesRack: React.FC<ClothesRackProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onAddToCombine,
}) => {
  const rackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tiltAngles, setTiltAngles] = useState<Record<string, number>>({});
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const lastMouseX = useRef<number>(0);
  const [quickSize, setQuickSize] = useState<Record<string, Size>>({});

  // Filter products for the rack
  const rackProducts = products.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  // Hanger physics: calculate sway based on cursor distance and velocity
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rackRef.current) return;
    const rackRect = rackRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const deltaX = mouseX - lastMouseX.current;
    lastMouseX.current = mouseX;

    const newAngles: Record<string, number> = {};
    const cards = rackRef.current.querySelectorAll<HTMLDivElement>('[data-hanger-id]');

    cards.forEach((card) => {
      const id = card.getAttribute('data-hanger-id');
      if (!id) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = mouseX - cardCenter;

      if (Math.abs(distance) < 220) {
        // Closer cards swing more, influenced by cursor direction and velocity
        const swayFactor = (1 - Math.abs(distance) / 220);
        const impulse = Math.min(Math.max(deltaX * 0.45, -12), 12);
        const staticAngle = (distance > 0 ? -1 : 1) * swayFactor * 7;
        const totalAngle = Math.min(Math.max(staticAngle + impulse * swayFactor, -18), 18);
        newAngles[id] = totalAngle;
      } else {
        newAngles[id] = 0;
      }
    });

    setTiltAngles(prev => ({ ...prev, ...newAngles }));
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setTiltAngles({});
  };

  const scrollRack = (direction: 'left' | 'right') => {
    if (rackRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      rackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Play subtle visual/audio feedback when brushing past hangers
  const playHangerChime = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // AudioContext muted or not permitted
    }
  };

  return (
    <section id="clothes-rack-section" className="relative py-12 px-4 sm:px-6 lg:px-8 bg-neutral-900/60 border-y border-neutral-800">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>İnteraktif Askılık Vitrini</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-400">Canlı Fizik Motoru</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Askı Askı Outlet Ürünleri
          </h2>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">
            Fareyi askıların üzerinde gezdirerek kıyafetleri salla, dilediğin parçayı askıdan indirip kombinle veya sepete at.
          </p>
        </div>

        {/* Filter Tabs & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 bg-neutral-800/80 rounded-xl border border-neutral-700/60">
            {[
              { id: 'all', label: 'Tüm Askılar' },
              { id: 'ceket', label: 'Ceket & Palto' },
              { id: 'hoodie', label: 'Hoodie' },
              { id: 'pantolon', label: 'Pantolon' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeCategory === tab.id
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-neutral-800/80 border-neutral-700 text-neutral-400 hover:text-neutral-200'
            }`}
            title={soundEnabled ? 'Askı sesleri açık' : 'Askı seslerini aç'}
            aria-label="Askı ses efekti geçişi"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollRack('left')}
              className="p-2 bg-neutral-800/80 hover:bg-neutral-700 text-white rounded-xl border border-neutral-700 transition-colors"
              aria-label="Askılığı sola kaydır"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollRack('right')}
              className="p-2 bg-neutral-800/80 hover:bg-neutral-700 text-white rounded-xl border border-neutral-700 transition-colors"
              aria-label="Askılığı sağa kaydır"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Industrial Rail Structure */}
      <div className="max-w-7xl mx-auto relative">
        {/* Metal Pipe / Rail Top Bar */}
        <div className="relative h-12 w-full flex items-center">
          {/* Wall Flange Left */}
          <div className="absolute -left-3 top-2 w-6 h-8 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-sm border border-neutral-600 shadow-md flex items-center justify-center z-20">
            <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-500" />
          </div>

          {/* Steel Pipe Bar with Metallic Sheen */}
          <div className="w-full h-4 bg-gradient-to-b from-neutral-400 via-neutral-200 to-neutral-600 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.6)] border-t border-white/40 relative">
            {/* Pipe reflection line */}
            <div className="absolute top-[2px] left-0 right-0 h-[1.5px] bg-white/60 rounded-full" />
          </div>

          {/* Wall Flange Right */}
          <div className="absolute -right-3 top-2 w-6 h-8 bg-gradient-to-l from-neutral-800 to-neutral-700 rounded-sm border border-neutral-600 shadow-md flex items-center justify-center z-20">
            <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-500" />
          </div>
        </div>

        {/* Clothes Hanger Rail Scrollable Container */}
        <div
          ref={rackRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex gap-6 overflow-x-auto pb-8 pt-1 px-4 scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'thin' }}
        >
          {rackProducts.map((product) => {
            const isHovered = hoveredId === product.id;
            const rawAngle = tiltAngles[product.id] || 0;
            // When directly hovered, straighten the card gently to 0 for effortless reading and clicking
            const angle = isHovered ? rawAngle * 0.15 : rawAngle;
            const selectedSize = quickSize[product.id] || product.sizes[0];

            return (
              <div
                key={product.id}
                data-hanger-id={product.id}
                onMouseEnter={() => {
                  setHoveredId(product.id);
                  playHangerChime();
                }}
                className="flex-shrink-0 w-72 sm:w-80 snap-center flex flex-col items-center group relative select-none"
                style={{
                  perspective: '1000px',
                }}
              >
                {/* Physical Hanger Assembly */}
                <div
                  className="w-full flex flex-col items-center transition-transform duration-200 ease-out origin-top"
                  style={{
                    transform: `rotate(${angle}deg) ${isHovered ? 'scale(1.03) translateY(-6px)' : ''}`,
                    transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  }}
                >
                  {/* Metal Hook Loop over the pipe */}
                  <div className="relative -mt-4 w-7 h-10 flex flex-col items-center z-10">
                    <svg
                      viewBox="0 0 24 32"
                      className="w-7 h-10 drop-shadow-md"
                      fill="none"
                      stroke={product.hangerType === 'brass' ? '#eab308' : product.hangerType === 'wood' ? '#d97706' : '#cbd5e1'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      {/* Curved Hook grabbing the rail */}
                      <path d="M 8 4 A 7 7 0 0 1 18 10 C 18 16 12 18 12 24 L 12 30" />
                      <circle cx="8" cy="4" r="1.5" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Hanger Shoulder Bar (Wooden, Brass, Chrome) */}
                  <div className="relative -mt-1 w-56 h-6 flex items-center justify-center z-10">
                    {product.hangerType === 'wood' ? (
                      <div className="w-full h-4 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 rounded-full border border-amber-700/50 shadow-md relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)]" />
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono tracking-widest text-amber-200/50 uppercase">
                          {product.brand.split(' ')[0]}
                        </span>
                      </div>
                    ) : product.hangerType === 'brass' ? (
                      <div className="w-full h-3 bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-700 rounded-full border border-amber-300/60 shadow-md flex items-center justify-center">
                        <span className="text-[7px] font-mono tracking-wider text-amber-950 font-bold uppercase">
                          RIKO STUDIO
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-3 bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-500 rounded-full border border-white/60 shadow-md flex items-center justify-center">
                        <span className="text-[7px] font-mono tracking-wider text-neutral-800 font-bold uppercase">
                          AZAK OUTLET
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Clothing Card Attached to Hanger */}
                  <div
                    className={`mt-1 w-full bg-neutral-900 rounded-2xl border transition-all duration-200 overflow-hidden shadow-xl ${
                      isHovered
                        ? 'border-amber-500/80 shadow-[0_12px_32px_rgba(245,158,11,0.2)]'
                        : 'border-neutral-800'
                    }`}
                  >
                    {/* Clothing Image Viewport */}
                    <div className="relative aspect-[3/4] w-full bg-neutral-950 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Stock & Discount Tag */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500 text-neutral-950 rounded-md shadow-md">
                          -%{product.discountPercent} OUTLET
                        </span>
                        {product.stockCount <= 3 && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-500/90 text-white rounded-md">
                            Son {product.stockCount} Adet!
                          </span>
                        )}
                      </div>

                      {/* Brand Label */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-1 text-[10px] font-mono tracking-wider bg-black/70 backdrop-blur-md text-neutral-300 rounded-md border border-white/10">
                          {product.brand}
                        </span>
                      </div>

                      {/* Interactive Hover Action Overlay */}
                      <div
                        className={`absolute inset-0 bg-neutral-950/75 backdrop-blur-xs flex flex-col justify-end p-4 transition-opacity duration-200 ${
                          isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
                          {product.description}
                        </p>

                        {/* Size Quick Select */}
                        <div className="mb-3">
                          <span className="text-[11px] text-neutral-400 block mb-1 font-medium">Beden Seçin:</span>
                          <div className="flex gap-1.5 flex-wrap">
                            {product.sizes.map(size => (
                              <button
                                key={size}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuickSize(prev => ({ ...prev, [product.id]: size }));
                                }}
                                className={`px-2 py-1 text-xs font-semibold rounded border transition-colors ${
                                  selectedSize === size
                                    ? 'bg-amber-500 text-black border-amber-500'
                                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onAddToCart(product, selectedSize)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Sepete At</span>
                          </button>
                          <button
                            onClick={() => onAddToCombine(product)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl border border-neutral-600 transition-colors"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>Kombinle</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Content */}
                    <div className="p-4 bg-neutral-900 border-t border-neutral-800/80">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                          {product.name}
                        </h3>
                      </div>

                      <div className="text-[11px] text-neutral-400 mb-2 flex items-center gap-2">
                        <span>{product.fabric}</span>
                      </div>

                      {/* Pricing Row */}
                      <div className="flex items-baseline justify-between pt-1 border-t border-neutral-800/50">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-white tabular-nums">
                            {formatCurrency(product.outletPrice)}
                          </span>
                          <span className="text-xs text-neutral-500 line-through tabular-nums">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        </div>

                        <button
                          onClick={() => onSelectProduct(product)}
                          className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>İncele</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
