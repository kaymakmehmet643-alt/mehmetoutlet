import React, { useState } from 'react';
import { Product, CombineSlots, Size, SignatureLook } from '../types';
import { SIGNATURE_LOOKS, PRODUCTS } from '../data/products';
import { calculateCombineBundle, formatCurrency } from '../utils/pricing';
import {
  Layers,
  Sparkles,
  ShoppingBag,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  X
} from 'lucide-react';

interface KombinStudioProps {
  combineSlots: CombineSlots;
  onUpdateSlot: (slot: keyof CombineSlots, product?: Product) => void;
  onAddAllToCart: (items: { product: Product; size: Size }[]) => void;
  onSelectProduct: (product: Product) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const KombinStudio: React.FC<KombinStudioProps> = ({
  combineSlots,
  onUpdateSlot,
  onAddAllToCart,
  onSelectProduct,
  isOpenModal,
  onCloseModal,
}) => {
  const [activePickerSlot, setActivePickerSlot] = useState<keyof CombineSlots | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, Size>>({});

  // Active items in the combine
  const activeItems: Product[] = Object.values(combineSlots).filter(Boolean) as Product[];
  const bundleCalculation = calculateCombineBundle(activeItems);

  const handleApplySignatureLook = (look: SignatureLook) => {
    // Clear slots first
    onUpdateSlot('outerwear', undefined);
    onUpdateSlot('top', undefined);
    onUpdateSlot('bottom', undefined);
    onUpdateSlot('shoes', undefined);

    look.items.forEach(item => {
      if (item.category === 'ceket') {
        onUpdateSlot('outerwear', item);
      } else if (item.category === 'hoodie' || item.category === 'tisort') {
        onUpdateSlot('top', item);
      } else if (item.category === 'pantolon') {
        onUpdateSlot('bottom', item);
      } else if (item.category === 'ayakkabi') {
        onUpdateSlot('shoes', item);
      }
    });
  };

  const handleAddBundleToCart = () => {
    if (activeItems.length === 0) return;
    const itemsToAdd = activeItems.map(item => ({
      product: item,
      size: selectedSizes[item.id] || item.sizes[0],
    }));
    onAddAllToCart(itemsToAdd);
    if (onCloseModal) onCloseModal();
  };

  // Filter products matching the slot being picked
  const getSlotCandidates = (slot: keyof CombineSlots): Product[] => {
    switch (slot) {
      case 'outerwear':
        return PRODUCTS.filter(p => p.category === 'ceket');
      case 'top':
        return PRODUCTS.filter(p => p.category === 'hoodie' || p.category === 'tisort');
      case 'bottom':
        return PRODUCTS.filter(p => p.category === 'pantolon');
      case 'shoes':
        return PRODUCTS.filter(p => p.category === 'ayakkabi' || p.category === 'ceket');
      default:
        return PRODUCTS;
    }
  };

  const content = (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Azak & Riko Kombin Atölyesi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Kendi Outlet Kombinini Oluştur, Ekstra %20 İndirim Kazan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Üst, alt ve dış giyim parçalarını seçip eşleştir. 2 parçada %12, 3 ve üzeri parçada net %20 sepet indirimi anında uygulanır.
          </p>
        </div>

        {activeItems.length > 0 && (
          <button
            onClick={() => {
              onUpdateSlot('outerwear', undefined);
              onUpdateSlot('top', undefined);
              onUpdateSlot('bottom', undefined);
              onUpdateSlot('shoes', undefined);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-700 self-start md:self-auto transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Kombini Sıfırla</span>
          </button>
        )}
      </div>

      {/* Signature Pre-Made Looks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Hazır Azak & Riko İmza Kombinleri</span>
          </h3>
          <span className="text-xs text-neutral-500">Tek tıkla yükle</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SIGNATURE_LOOKS.map(look => (
            <div
              key={look.id}
              className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                    Ekstra -%{look.specialDiscountPercent} İndirim
                  </span>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {look.stylist}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  {look.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                  {look.description}
                </p>

                {/* Thumbnails */}
                <div className="flex gap-2 mt-3">
                  {look.items.map(item => (
                    <div key={item.id} className="w-12 h-14 rounded-lg overflow-hidden bg-neutral-950 border border-neutral-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleApplySignatureLook(look)}
                className="mt-4 w-full py-2 px-3 bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5"
              >
                <span>Bu Kombini Yükle</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* The 4-Slot Combine Canvas & Pricing Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 4 Interactive Slots */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Slot 1: Dış Giyim / Ceket */}
          <SlotCard
            title="Dış Giyim (Ceket / Palto)"
            product={combineSlots.outerwear}
            onSelect={() => setActivePickerSlot('outerwear')}
            onRemove={() => onUpdateSlot('outerwear', undefined)}
            selectedSize={selectedSizes[combineSlots.outerwear?.id || ''] || combineSlots.outerwear?.sizes[0]}
            onSizeChange={(size) => {
              if (combineSlots.outerwear) {
                setSelectedSizes(prev => ({ ...prev, [combineSlots.outerwear!.id]: size }));
              }
            }}
          />

          {/* Slot 2: Üst Giyim / Hoodie */}
          <SlotCard
            title="Üst Giyim (Hoodie / Tişört)"
            product={combineSlots.top}
            onSelect={() => setActivePickerSlot('top')}
            onRemove={() => onUpdateSlot('top', undefined)}
            selectedSize={selectedSizes[combineSlots.top?.id || ''] || combineSlots.top?.sizes[0]}
            onSizeChange={(size) => {
              if (combineSlots.top) {
                setSelectedSizes(prev => ({ ...prev, [combineSlots.top!.id]: size }));
              }
            }}
          />

          {/* Slot 3: Alt Giyim / Pantolon */}
          <SlotCard
            title="Alt Giyim (Kargo / Jean)"
            product={combineSlots.bottom}
            onSelect={() => setActivePickerSlot('bottom')}
            onRemove={() => onUpdateSlot('bottom', undefined)}
            selectedSize={selectedSizes[combineSlots.bottom?.id || ''] || combineSlots.bottom?.sizes[0]}
            onSizeChange={(size) => {
              if (combineSlots.bottom) {
                setSelectedSizes(prev => ({ ...prev, [combineSlots.bottom!.id]: size }));
              }
            }}
          />

          {/* Slot 4: Ayakkabı / Tamamlayıcı */}
          <SlotCard
            title="Ayakkabı & Tamamlayıcı"
            product={combineSlots.shoes}
            onSelect={() => setActivePickerSlot('shoes')}
            onRemove={() => onUpdateSlot('shoes', undefined)}
            selectedSize={selectedSizes[combineSlots.shoes?.id || ''] || combineSlots.shoes?.sizes[0]}
            onSizeChange={(size) => {
              if (combineSlots.shoes) {
                setSelectedSizes(prev => ({ ...prev, [combineSlots.shoes!.id]: size }));
              }
            }}
          />
        </div>

        {/* Right: Live Bundle Summary Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="font-bold text-white text-base">Kombin Özeti</h3>
            <span className="text-xs font-mono text-neutral-400">
              {activeItems.length} Parça Seçildi
            </span>
          </div>

          {activeItems.length === 0 ? (
            <div className="py-8 text-center text-neutral-500 text-xs">
              Soldaki slotlardan parçaları seçerek kombininizi hazırlayın.
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2 text-xs">
                {activeItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-neutral-300">
                    <span className="truncate pr-2">{item.name}</span>
                    <span className="font-mono tabular-nums shrink-0">{formatCurrency(item.outletPrice)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Mağaza Normal Fiyatı:</span>
                  <span className="line-through tabular-nums">{formatCurrency(bundleCalculation.originalSum)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Outlet Liste Fiyatı:</span>
                  <span className="tabular-nums">{formatCurrency(bundleCalculation.outletSum)}</span>
                </div>
                {bundleCalculation.bundleDiscountPercent > 0 && (
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Kombin Ekstra İndirimi (%{bundleCalculation.bundleDiscountPercent}):</span>
                    <span className="tabular-nums">-{formatCurrency(bundleCalculation.bundleDiscountAmount)}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-neutral-400 block">Kombin Toplam Fiyatı:</span>
                  <span className="text-xs text-emerald-400 font-semibold">
                    Toplam {formatCurrency(bundleCalculation.originalSum - bundleCalculation.bundlePrice)} tasarruf!
                  </span>
                </div>
                <span className="text-2xl font-black text-white tabular-nums">
                  {formatCurrency(bundleCalculation.bundlePrice)}
                </span>
              </div>

              <button
                onClick={handleAddBundleToCart}
                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tüm Kombini Sepete Ekle</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Selection Modal Drawer for a specific slot */}
      {activePickerSlot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">
                  Parça Seçimi: {activePickerSlot.toUpperCase()}
                </h3>
                <span className="text-xs text-neutral-400">Kombin için bir ürün belirleyin</span>
              </div>
              <button
                onClick={() => setActivePickerSlot(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getSlotCandidates(activePickerSlot).map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onUpdateSlot(activePickerSlot, product);
                    setActivePickerSlot(null);
                  }}
                  className="flex gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500 cursor-pointer transition-all group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover rounded-lg bg-neutral-900 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-amber-400 font-mono uppercase block">{product.brand}</span>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-400 line-clamp-1">{product.name}</h4>
                      <span className="text-[11px] text-neutral-400">{product.fabric}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-white tabular-nums">{formatCurrency(product.outletPrice)}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold">Seç</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-5xl p-6 sm:p-8 my-8 relative shadow-2xl">
          <button
            onClick={onCloseModal}
            className="absolute top-6 right-6 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800"
            aria-label="Kombin stüdyosunu kapat"
          >
            <X className="w-5 h-5" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="kombin-studio-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {content}
    </section>
  );
};

interface SlotCardProps {
  title: string;
  product?: Product;
  onSelect: () => void;
  onRemove: () => void;
  selectedSize?: Size;
  onSizeChange: (size: Size) => void;
}

const SlotCard: React.FC<SlotCardProps> = ({
  title,
  product,
  onSelect,
  onRemove,
  selectedSize,
  onSizeChange,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between min-h-[220px]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{title}</span>
        {product && (
          <button
            onClick={onRemove}
            className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
            title="Kombinden kaldır"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {product ? (
        <div className="flex gap-4 items-center">
          <div className="w-20 h-24 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-700 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase">{product.brand}</span>
            <h4 className="text-xs font-bold text-white line-clamp-1">{product.name}</h4>
            <div className="text-xs font-bold text-white tabular-nums mt-1">
              {formatCurrency(product.outletPrice)}
            </div>

            {/* Size choice */}
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-neutral-400">Beden:</span>
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => onSizeChange(size)}
                  className={`px-1.5 py-0.5 text-[10px] font-semibold rounded border ${
                    selectedSize === size
                      ? 'bg-amber-500 text-black border-amber-500'
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={onSelect}
          className="flex-1 border-2 border-dashed border-neutral-800 hover:border-amber-500/60 rounded-xl flex flex-col items-center justify-center p-4 text-neutral-500 hover:text-amber-400 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-800 group-hover:bg-amber-500/20 flex items-center justify-center mb-2 transition-colors">
            <Plus className="w-5 h-5 text-neutral-400 group-hover:text-amber-400" />
          </div>
          <span className="text-xs font-semibold">Parça Ekle</span>
        </button>
      )}
    </div>
  );
};
