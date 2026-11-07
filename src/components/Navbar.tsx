import React from 'react';
import { ShoppingBag, Menu, Sparkles, Bot, Layers } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
  onScrollToRack: () => void;
  onOpenCombineStudio: () => void;
  onOpenChat: () => void;
  onScrollToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenMobileMenu,
  onScrollToRack,
  onOpenCombineStudio,
  onOpenChat,
  onScrollToCatalog,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element brand wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a
            href="/"
            className="text-lg sm:text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 font-display flex items-center gap-2"
          >
            <span>ŞABAN</span>
            <span className="text-amber-500">OUTLET</span>
          </a>
        </div>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-neutral-300">
          <button
            onClick={onScrollToRack}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Askılık Vitrini</span>
          </button>

          <button
            onClick={onOpenCombineStudio}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Azak & Riko Kombin</span>
          </button>

          <button
            onClick={onScrollToCatalog}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Outlet Katalog</span>
          </button>

          <button
            onClick={onOpenChat}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Stil Danışmanı</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-colors whitespace-nowrap shrink-0"
            aria-label={`Sepetinizde ${cartItemCount} ürün var`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Sepet</span>
            <span className="w-5 h-5 rounded-full bg-neutral-950 text-amber-400 flex items-center justify-center text-[10px] font-black">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
