import React, { useState, useEffect } from 'react';
import { Product, CartItem, CombineSlots, Size, Order } from './types';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { ClothesRack } from './components/ClothesRack';
import { KombinStudio } from './components/KombinStudio';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { ShowroomMap } from './components/ShowroomMap';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { Bot, Layers, Sparkles, ShoppingBag, ArrowUp, LayoutDashboard } from 'lucide-react';

export default function App() {
  // Theme State (Dark / Light Mode)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saban_theme');
      if (saved) return saved === 'dark';
    }
    return true; // Default dark mode for luxury streetwear outlet vibe
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('saban_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('saban_theme', 'light');
    }
  }, [isDarkMode]);

  // Admin Panel Toggle
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Dynamic Products State (Editable via Admin Panel)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Navigation & Filtering State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return [
      {
        product: PRODUCTS[1], // 480 GSM Hoodie
        selectedSize: 'L',
        quantity: 1,
      },
    ];
  });
  const [promoCode, setPromoCode] = useState<string>('OUTLET2026');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [recentOrders, setRecentOrders] = useState<Order[]>([
    {
      id: 'SBN-918204',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      items: [
        { product: PRODUCTS[0], selectedSize: 'L', quantity: 1 },
        { product: PRODUCTS[2], selectedSize: 'M', quantity: 1 }
      ],
      customer: {
        fullName: 'Mehmet Ali Kaya',
        phone: '0532 444 11 22',
        city: 'İstanbul',
        district: 'Kadıköy',
        address: 'Caferağa Mah. Şevki Bey Sok. No:12 D:4',
        paymentMethod: 'kapida_odeme'
      },
      subtotal: 2180,
      discount: 327,
      shippingFee: 0,
      total: 1853,
      status: 'Hazırlanıyor'
    }
  ]);

  // Combine Studio State
  const [combineSlots, setCombineSlots] = useState<CombineSlots>({
    outerwear: PRODUCTS[0], // Bomber
    top: PRODUCTS[1], // Hoodie
    bottom: PRODUCTS[2], // Cargo
  });
  const [isCombineStudioModalOpen, setIsCombineStudioModalOpen] = useState<boolean>(false);

  // Modals & Chatbot State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Scroll listener for top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products based on selected criteria
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchFabric = product.fabric.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchBrand && !matchFabric) return false;
    }
    return true;
  });

  const selectedCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);
  const selectedCategoryName = selectedCategoryObj ? selectedCategoryObj.name : 'Tüm Ürünler';

  // Admin Product Mutations
  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setRecentOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, size: Size, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [...prev, { product, selectedSize: size, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  // Combine Handlers
  const handleUpdateCombineSlot = (slot: keyof CombineSlots, product?: Product) => {
    setCombineSlots((prev) => ({
      ...prev,
      [slot]: product,
    }));
  };

  const handleAddAllCombineToCart = (items: { product: Product; size: Size }[]) => {
    items.forEach((item) => {
      handleAddToCart(item.product, item.size, 1);
    });
    setIsCartOpen(true);
  };

  const handleAddToCombine = (product: Product) => {
    if (product.category === 'ceket') {
      handleUpdateCombineSlot('outerwear', product);
    } else if (product.category === 'hoodie' || product.category === 'tisort') {
      handleUpdateCombineSlot('top', product);
    } else if (product.category === 'pantolon') {
      handleUpdateCombineSlot('bottom', product);
    } else {
      handleUpdateCombineSlot('shoes', product);
    }

    const studioElement = document.getElementById('kombin-studio-section');
    if (studioElement) {
      studioElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSuccess = (order: Order) => {
    setRecentOrders((prev) => [order, ...prev]);
    setCartItems([]);
  };

  // Smooth scroll helpers
  const scrollToRack = () => {
    const el = document.getElementById('clothes-rack-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToShowroom = () => {
    const el = document.getElementById('showroom-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // If Admin Panel is opened, show full admin workspace
  if (isAdminOpen) {
    return (
      <AdminPanel
        products={products}
        orders={recentOrders}
        onUpdateProduct={handleUpdateProduct}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onCloseAdmin={() => setIsAdminOpen(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-black transition-colors duration-200">
      {/* Left Menu / Sidebar (Desktop Fixed, Mobile Drawer) */}
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCombineStudio={() => setIsCombineStudioModalOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onScrollToRack={scrollToRack}
        onScrollToShowroom={scrollToShowroom}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Main App Content Area (Pushed to right on desktop by sidebar width) */}
      <div className="flex-1 lg:pl-72 sm:lg:pl-80 flex flex-col min-w-0">
        {/* Top Sticky Navigation */}
        <Navbar
          cartItemCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onScrollToRack={scrollToRack}
          onOpenCombineStudio={() => setIsCombineStudioModalOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
          onScrollToCatalog={scrollToCatalog}
          onScrollToShowroom={scrollToShowroom}
          onOpenAdmin={() => setIsAdminOpen(true)}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        />

        {/* Hero Area with Parallax and Animations */}
        <Hero
          onScrollToRack={scrollToRack}
          onOpenCombineStudio={() => setIsCombineStudioModalOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
        />

        {/* 🌟 The Star Feature: Interactive Clothes Rack with Physical Swaying Hangers */}
        <ClothesRack
          products={products}
          onSelectProduct={setSelectedProduct}
          onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
          onAddToCombine={handleAddToCombine}
        />

        {/* Azak & Riko Combine Studio Section */}
        <KombinStudio
          combineSlots={combineSlots}
          onUpdateSlot={handleUpdateCombineSlot}
          onAddAllToCart={handleAddAllCombineToCart}
          onSelectProduct={setSelectedProduct}
        />

        {/* Full Filtered Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onSelectProduct={setSelectedProduct}
          onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
          onAddToCombine={handleAddToCombine}
          selectedCategoryName={selectedCategoryName}
        />

        {/* Kadıköy Moda Outlet Showroom & Interactive Vector Map */}
        <ShowroomMap />

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Action Button for Gemini AI Stylist */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900/90 dark:bg-neutral-900/90 hover:bg-neutral-800 text-white rounded-full border border-amber-500/40 shadow-xl backdrop-blur-md hover:border-amber-500 transition-all group"
        >
          <div className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold">AI Stil Danışmanı</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 bg-neutral-900/90 hover:bg-neutral-800 text-white rounded-full border border-neutral-700 shadow-xl backdrop-blur-md transition-all"
          aria-label="Yukarı çık"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToCombine={handleAddToCombine}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        promoCode={promoCode}
        onApplyPromoCode={setPromoCode}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        promoCode={promoCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Combine Studio Fullscreen Modal */}
      {isCombineStudioModalOpen && (
        <KombinStudio
          combineSlots={combineSlots}
          onUpdateSlot={handleUpdateCombineSlot}
          onAddAllToCart={handleAddAllCombineToCart}
          onSelectProduct={setSelectedProduct}
          isOpenModal={true}
          onCloseModal={() => setIsCombineStudioModalOpen(false)}
        />
      )}

      {/* Gemini AI Chatbot */}
      <GeminiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onScrollToRack={scrollToRack}
        onOpenCombineStudio={() => setIsCombineStudioModalOpen(true)}
      />
    </div>
  );
}
