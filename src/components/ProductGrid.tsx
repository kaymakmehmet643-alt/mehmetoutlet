import React, { useState } from 'react';
import { Product, Size } from '../types';
import { formatCurrency } from '../utils/pricing';
import { ShoppingBag, Eye, Layers, Sparkles, Filter } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: Size) => void;
  onAddToCombine: (product: Product) => void;
  selectedCategoryName: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onAddToCombine,
  selectedCategoryName,
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, Size>>({});

  return (
    <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
            {selectedCategoryName} Koleksiyonu
          </h2>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 block">
            {products.length} outlet ürün listeleniyor · Orijinal garanti & kapıda ödeme
          </span>
        </div>

        <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <span>Tüm Fiyatlar KDV Dahildir</span>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-white dark:bg-neutral-900/40 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <Filter className="w-10 h-10 text-neutral-400 dark:text-neutral-600 mx-auto" />
          <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-300">Bu Kriterlere Uygun Ürün Bulunamadı</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Lütfen sol menüden farklı bir kategori seçin veya arama filtrenizi temizleyin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0];

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-700 hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image Frame */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/5] bg-neutral-100 dark:bg-neutral-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500 text-neutral-950 rounded-md shadow-md">
                      -%{product.discountPercent} OUTLET
                    </span>
                    {product.stockCount <= 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-500 text-white rounded-md">
                        Son {product.stockCount} Adet!
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-1 text-[10px] font-mono tracking-wider bg-black/70 backdrop-blur-md text-white rounded-md border border-white/10">
                      {product.brand}
                    </span>
                  </div>

                  {/* Quick Action Overlay on hover */}
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none sm:pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="p-2.5 bg-neutral-900/90 text-white rounded-xl hover:bg-white hover:text-black transition-colors shadow-lg"
                      title="Detaylı İncele"
                      aria-label="Ürün detayını aç"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCombine(product);
                      }}
                      className="p-2.5 bg-neutral-900/90 text-amber-400 rounded-xl hover:bg-amber-500 hover:text-black transition-colors shadow-lg"
                      title="Kombin Stüdyosuna Ekle"
                      aria-label="Kombine ekle"
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mb-1">
                      {product.brand}
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-sm text-neutral-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-2">
                      {product.fabric}
                    </div>
                  </div>

                  {/* Size Choices */}
                  <div>
                    <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 block mb-1">Beden Seç:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: size }))}
                          className={`px-2 py-0.5 text-xs font-semibold rounded border transition-colors ${
                            currentSize === size
                              ? 'bg-amber-500 text-neutral-950 border-amber-500'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Add Button */}
                  <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="text-base font-extrabold text-neutral-900 dark:text-white tabular-nums">
                        {formatCurrency(product.outletPrice)}
                      </div>
                      <div className="text-xs text-neutral-400 dark:text-neutral-500 line-through tabular-nums">
                        {formatCurrency(product.originalPrice)}
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(product, currentSize)}
                      className="flex items-center gap-1.5 py-2 px-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Sepete Ekle</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
