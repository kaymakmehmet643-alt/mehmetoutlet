import React from 'react';
import { ShoppingBag, Menu, Sparkles, Bot, Layers, Sun, Moon, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
  onScrollToRack: () => void;
  onOpenCombineStudio: () => void;
  onOpenChat: () => void;
  onScrollToCatalog: () => void;
  onScrollToShowroom: () => void;
  onOpenAdmin: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenMobileMenu,
  onScrollToRack,
  onOpenCombineStudio,
  onOpenChat,
  onScrollToCatalog,
  onScrollToShowroom,
  onOpenAdmin,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element brand wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a
            href="/"
            className="text-lg sm:text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap shrink-0 font-display flex items-center gap-2"
          >
            <span>ŞABAN</span>
            <span className="text-amber-500">OUTLET</span>
          </a>
        </div>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
          <button
            onClick={onScrollToRack}
            className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Askılık Vitrini</span>
          </button>

          <button
            onClick={onOpenCombineStudio}
            className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Kombin Atölyesi</span>
          </button>

          <button
            onClick={onScrollToCatalog}
            className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Outlet Fırsatlar</span>
          </button>

          <button
            onClick={onScrollToShowroom}
            className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Showroom & Harita</span>
          </button>

          <button
            onClick={onOpenChat}
            className="hover:text-amber-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Stilist</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Theme Toggle + Admin Panel + Cart) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-amber-500 transition-colors"
            title={isDarkMode ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
            aria-label="Tema rengi değiştir"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* Admin Panel Link */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 text-xs font-bold rounded-xl transition-colors"
            title="Yönetim Paneli"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-500" />
            <span>Yönetim</span>
          </button>

          {/* Primary Cart CTA */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0"
            aria-label={`Sepetinizde ${cartItemCount} ürün var`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Sepet</span>
            <span className="w-5 h-5 rounded-full bg-neutral-950 text-amber-400 flex items-center justify-center text-[10px] font-black">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
