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
  X,
  LayoutDashboard,
  MapPin,
  Sun,
  Moon
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
  onScrollToShowroom: () => void;
  onOpenAdmin: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  cartItemCount: number;
  onOpenCart: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
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
  onScrollToShowroom,
  onOpenAdmin,
  isOpenMobile,
  onCloseMobile,
  cartItemCount,
  onOpenCart,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 sm:w-80 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col z-50 transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white font-display">
                ŞABAN <span className="text-amber-500">OUTLET</span>
              </span>
            </div>
            <p className="text-[11px] font-mono tracking-wider text-neutral-500 dark:text-neutral-400 mt-0.5 uppercase">
              Riko & Azak Kombin Stüdyosu
            </p>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-amber-500"
              aria-label="Tema değiştir"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              aria-label="Menüyü kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6" style={{ scrollbarWidth: 'thin' }}>
          {/* Live Search */}
          <div>
            <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
              Ürün & Model Ara
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Ceket, hoodie, kargo..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Action Navigation Cards */}
          <div className="space-y-2">
            <button
              onClick={() => {
                onScrollToRack();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/60 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white block">Askılık Vitrini</span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Canlı Sallanan Askılar</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                ANİMASYON
              </span>
            </button>

            <button
              onClick={() => {
                onOpenCombineStudio();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/60 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white block">Kombin Stüdyosu</span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Azak & Riko Fit Builder</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                -%20 FIRSAT
              </span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/60 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white block">Yönetim Paneli</span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Ürün & Sipariş Yönet</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
                PANEL
              </span>
            </button>

            <button
              onClick={() => {
                onScrollToShowroom();
                onCloseMobile();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/60 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white block">Moda Showroom & Harita</span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Kadıköy Mağazamız</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                AÇIK
              </span>
            </button>
          </div>

          {/* Categories List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Kategoriler
              </span>
              <Tag className="w-3.5 h-3.5 text-neutral-400" />
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
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-neutral-950/20 text-neutral-950 font-bold'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
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
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Marka & Koleksiyon
              </span>
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
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
                        ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span>{brand.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Store Trust Badges */}
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2 text-[11px] text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-amber-500" />
              <span>1.500 TL Üzeri Ücretsiz Kargo</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Kapıda Nakit / Kredi Kartı ile Ödeme</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
              <span>14 Gün Koşulsuz Outlet Değişim</span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer with Cart Preview */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <button
            onClick={() => {
              onOpenCart();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-between py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
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
