import React, { useState } from 'react';
import { CartItem } from '../types';
import { calculateCartTotals, formatCurrency, FREE_SHIPPING_THRESHOLD } from '../utils/pricing';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Truck,
  Tag,
  ShieldCheck
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: () => void;
  promoCode: string;
  onApplyPromoCode: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  promoCode,
  onApplyPromoCode,
}) => {
  const [promoInput, setPromoInput] = useState(promoCode);
  const totals = calculateCartTotals(items, promoCode);

  const freeShippingProgress = Math.min(
    100,
    Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-white">Alışveriş Sepeti</h2>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">{totals.itemCount} adet ürün</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
              aria-label="Sepeti kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 text-xs">
            <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300 mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-amber-500" />
                {totals.shippingFee === 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Tebrikler! Kargo Ücretsiz</span>
                ) : (
                  <span>
                    Ücretsiz kargoya <strong className="text-amber-500">{formatCurrency(remainingForFreeShipping)}</strong> kaldı
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">%{freeShippingProgress}</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: 'thin' }}>
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 mx-auto flex items-center justify-center text-neutral-400 dark:text-neutral-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-300">Sepetiniz Boş</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Askılıktan veya kombin stüdyosundan dilediğiniz outlet parçalarını ekleyin.
                </p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${idx}`}
                  className="flex gap-3.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800/80 group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-22 object-cover rounded-lg bg-neutral-200 dark:bg-neutral-950 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase">
                          {item.product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-0.5"
                          title="Ürünü sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h4>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                          Beden: {item.selectedSize}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60 mt-1">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-neutral-950">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Adet azalt"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Adet artır"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Price */}
                      <div className="text-right">
                        <div className="text-xs font-bold text-neutral-900 dark:text-white tabular-nums">
                          {formatCurrency(item.product.outletPrice * item.quantity)}
                        </div>
                        <div className="text-[10px] text-neutral-400 dark:text-neutral-500 line-through tabular-nums">
                          {formatCurrency(item.product.originalPrice * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-4">
              {/* Promo Code Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="İndirim Kodu (OUTLET2026)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-neutral-200 uppercase placeholder:normal-case placeholder-neutral-400 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <button
                  onClick={() => onApplyPromoCode(promoInput)}
                  className="px-3 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 transition-colors"
                >
                  Uygula
                </button>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between">
                  <span>Ara Toplam:</span>
                  <span className="font-mono tabular-nums text-neutral-900 dark:text-neutral-200">
                    {formatCurrency(totals.subtotal)}
                  </span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-amber-600 dark:text-amber-400 font-semibold">
                    <span>Kupon İndirimi ({promoCode}):</span>
                    <span className="font-mono tabular-nums">-{formatCurrency(totals.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Kargo Ücreti:</span>
                  <span className="font-mono tabular-nums text-neutral-900 dark:text-neutral-200">
                    {totals.shippingFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ÜCRETSİZ</span>
                    ) : (
                      formatCurrency(totals.shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                  <span>Toplam Tasarrufunuz:</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(totals.savingsTotal)}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200 dark:border-neutral-800 text-base font-bold text-neutral-900 dark:text-white">
                  <span>Ödenecek Tutar:</span>
                  <span className="text-xl text-amber-500 font-black tabular-nums">
                    {formatCurrency(totals.total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl shadow-[0_4px_24px_rgba(245,158,11,0.25)] transition-all flex items-center justify-center gap-2"
              >
                <span>Siparişi Tamamla</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Kapıda Nakit / Kredi Kartı ile Güvenli Alışveriş</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
