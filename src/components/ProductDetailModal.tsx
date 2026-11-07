import React, { useState } from 'react';
import { Product, Size } from '../types';
import { formatCurrency } from '../utils/pricing';
import {
  X,
  ShoppingBag,
  Layers,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  AlertTriangle
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: Size, quantity: number) => void;
  onAddToCombine: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onAddToCombine,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/90 dark:bg-neutral-900/80 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white border border-neutral-200 dark:border-neutral-700/60 shadow-xs"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image on Hanger Backdrop */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 text-xs font-black bg-amber-500 text-neutral-950 rounded-lg shadow-md">
                -%{product.discountPercent} OUTLET FIRSATI
              </span>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand & Stock */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono tracking-wider text-amber-600 dark:text-amber-400 uppercase font-semibold">
                  {product.brand}
                </span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {product.stockCount <= 4 ? (
                    <span className="text-red-500 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Son {product.stockCount} adet!
                    </span>
                  ) : (
                    'Stokta Mevcut'
                  )}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {product.rating} ({product.reviewCount} Değerlendirme)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="text-2xl font-black text-amber-500 tabular-nums">
                  {formatCurrency(product.outletPrice)}
                </span>
                <span className="text-sm text-neutral-400 dark:text-neutral-500 line-through tabular-nums">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold ml-auto">
                  {formatCurrency(product.originalPrice - product.outletPrice)} Kazanç
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Fabric Details */}
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 mb-5 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
                <div>
                  <strong className="text-neutral-500 dark:text-neutral-400">Kumaş Dokusu:</strong> {product.fabric}
                </div>
                <div>
                  <strong className="text-neutral-500 dark:text-neutral-400">Renk:</strong> {product.color}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-2">
                  Beden Seçimi:
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                        selectedSize === size
                          ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-sm'
                          : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  disabled={addedToast}
                  className="py-3 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Sepete Eklendi!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Sepete Ekle</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    onAddToCombine(product);
                    onClose();
                  }}
                  className="py-3 px-4 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-semibold text-xs sm:text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Kombine Gönder</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="grid grid-cols-3 gap-2 text-[10px] text-neutral-500 dark:text-neutral-400 pt-2 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
                  <span>Hızlı Kargo</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
                  <span>%100 Orijinal</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
                  <span>Kolay Değişim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
