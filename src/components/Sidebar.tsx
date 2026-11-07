import React from 'react';
import { CATEGORIES, BRANDS } from '../data/products';
import {
  Tag,
  Sparkles,
  Layers,
  Bot,
  Filter,
  Search,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  selectedBrand: string;
  onSelectBrand: (brandId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCombineStudio: () => void;
  onOpenChat: () => void;
  onScrollToRack: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  searchQuery,
  onSearchChange,
  onOpenCombineStudio,
  onOpenChat,
  onScrollToRack,
  isOpenMobile,
  onCloseMobile,
  cartItemCount,
  onOpenCart,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 sm:w-80 bg-neutral-950 border-r border-neutral-800 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white font-display">
                ŞABAN <span className="text-amber-500">OUTLET</span>
              </span>
            </div>
            <p className="text-[11px] font-mono tracking-wider text-neutral-400 mt-0.5 uppercase">
              Riko & Azak Kombin Stüdyosu
            </p>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 lg:hidden"
            aria-label="Menüyü kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-7" style={{ scrollbarWidth: 'thin' }}>
          {/* Live Search */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
              Ürün & Model Ara
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Ceket, hoodie, kargo..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-hidden focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Special Quick Action Cards */}
          <div className="space-y-2">
            <button
              onClick={() => {
                onScrollToRack();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700/60 hover:border-amber-500/60 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Askılık Vitrini</span>
                  <span className="text-[10px] text-neutral-400">Canlı Sallanan Askılar</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                ANİMASYON
              </span>
            </button>

            <button
              onClick={() => {
                onOpenCombineStudio();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700/60 hover:border-amber-500/60 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Kombin Stüdyosu</span>
                  <span className="text-[10px] text-neutral-400">Azak & Riko Fit Builder</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                -%20 FIRSAT
              </span>
            </button>

            <button
              onClick={() => {
                onOpenChat();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700/60 hover:border-amber-500/60 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Gemini AI Stilist</span>
                  <span className="text-[10px] text-neutral-400">Kişisel Moda Asistanı</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                ONLINE
              </span>
            </button>
          </div>

          {/* Categories List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Kategoriler
              </span>
              <Tag className="w-3.5 h-3.5 text-neutral-500" />
            </div>

            <nav className="space-y-1">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      onSelectCategory(category.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all text-left ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-neutral-950/20 text-neutral-950 font-bold'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Brand Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Marka & Koleksiyon
              </span>
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            </div>

            <div className="space-y-1">
              {BRANDS.map((brand) => {
                const isSelected = selectedBrand === brand.id;
                return (
                  <button
                    key={brand.id}
                    onClick={() => {
                      onSelectBrand(brand.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors text-left ${
                      isSelected
                        ? 'text-amber-400 bg-amber-500/10 font-semibold'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                    }`}
                  >
                    <span>{brand.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Store Trust Badges */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-[11px] text-neutral-400">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>1.500 TL Üzeri Ücretsiz Kargo</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Kapıda Nakit / Kredi Kartı ile Ödeme</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>14 Gün Koşulsuz Outlet Değişim</span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer with Cart Preview */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950">
          <button
            onClick={() => {
              onOpenCart();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Sepeti Görüntüle</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-neutral-950 text-amber-400 flex items-center justify-center text-[10px] font-bold">
              {cartItemCount}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
