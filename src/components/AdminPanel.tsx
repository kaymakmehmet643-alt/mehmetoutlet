import React, { useState } from 'react';
import { Product, Order, Category, Brand, Size, HangerType } from '../types';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/products';
import { calculateAdminStats, updateProductPriceAndDiscount } from '../utils/admin';
import { formatCurrency } from '../utils/pricing';
import {
  Package,
  Layers,
  ShoppingBag,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  TrendingUp,
  Truck,
  ShieldCheck,
  Search,
  ExternalLink,
  Store,
  Sparkles,
  Sun,
  Moon,
  MapPin,
  Phone,
  Clock
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onCloseAdmin: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  orders,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onCloseAdmin,
  isDarkMode,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'settings'>('products');
  const [searchFilter, setSearchFilter] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  
  // Categories management state
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Add/Edit Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    brand: 'Şaban Outlet',
    category: 'ceket',
    originalPrice: 2500,
    outletPrice: 990,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 10,
    fabric: '%100 Pamuk Dokuma',
    color: 'Siyah',
    description: '',
    image: '/src/assets/images/rack_streetwear_hoodie_1794076319083.jpg',
    hangerType: 'wood',
    isFeaturedOnRack: true,
    isDailyDeal: false,
  });

  const stats = calculateAdminStats(products, orders);

  const filteredProducts = products.filter(p => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      id: `prod-${Date.now()}`,
      name: '',
      brand: 'Şaban Outlet',
      category: 'ceket',
      originalPrice: 2500,
      outletPrice: 990,
      discountPercent: 60,
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      stockCount: 10,
      fabric: '%100 Pamuk Dokuma',
      color: 'Siyah',
      description: 'Yeni sezon outlet parçası.',
      image: '/src/assets/images/rack_bomber_jacket_1794076319208.jpg',
      hangerType: 'wood',
      rating: 5.0,
      reviewCount: 1,
      isFeaturedOnRack: true,
      isDailyDeal: false,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({ ...product });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.outletPrice) return;

    const priceCalc = updateProductPriceAndDiscount(
      Number(productForm.originalPrice || 2000),
      Number(productForm.outletPrice || 1000)
    );

    const savedProduct: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: productForm.name || 'Yeni Outlet Ürünü',
      brand: (productForm.brand as Brand) || 'Şaban Outlet',
      category: (productForm.category as Category) || 'ceket',
      originalPrice: priceCalc.originalPrice,
      outletPrice: priceCalc.outletPrice,
      discountPercent: priceCalc.discountPercent,
      sizes: (productForm.sizes as Size[]) || ['S', 'M', 'L', 'XL'],
      inStock: (productForm.stockCount || 0) > 0,
      stockCount: Number(productForm.stockCount || 5),
      fabric: productForm.fabric || '%100 Pamuk',
      color: productForm.color || 'Standart',
      description: productForm.description || '',
      image: productForm.image || '/src/assets/images/rack_streetwear_hoodie_1794076319083.jpg',
      hangerType: (productForm.hangerType as HangerType) || 'wood',
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      isFeaturedOnRack: Boolean(productForm.isFeaturedOnRack),
      isDailyDeal: Boolean(productForm.isDailyDeal),
    };

    if (editingProduct) {
      onUpdateProduct(savedProduct);
    } else {
      onAddProduct(savedProduct);
    }

    setIsProductModalOpen(false);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newId = newCategoryName.trim().toLowerCase().replace(/\s+/g, '-');
    setCategories(prev => [
      ...prev,
      { id: newId, name: newCategoryName.trim(), count: 0 },
    ]);
    setNewCategoryName('');
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-black">
            ŞB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-neutral-900 dark:text-white">
                ŞABAN OUTLET YÖNETİM PANELİ
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                CANLI YÖNETİCİ
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Ürün ekleme, fiyat/stok yönetimi, kategoriler ve sipariş takibi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-amber-500 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Aydınlık / Karanlık Mod Değiştir"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            <span className="hidden sm:inline">{isDarkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}</span>
          </button>

          {/* Return to Storefront */}
          <button
            onClick={onCloseAdmin}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-sm transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>Mağazaya Dön</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium block">
                Toplam Satış Cirosu
              </span>
              <span className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums mt-1 block">
                {formatCurrency(stats.totalSales)}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium block">
                Gelen Müşteri Siparişleri
              </span>
              <span className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums mt-1 block">
                {stats.totalOrders} Adet
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium block">
                Yayındaki Outlet Ürünleri
              </span>
              <span className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums mt-1 block">
                {stats.totalProducts} Model
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium block">
                Toplam Depo Stok Adedi
              </span>
              <span className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums mt-1 block">
                {stats.totalStockUnits} Parça
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          {[
            { id: 'products', label: 'Ürün Yönetimi', icon: Package, count: products.length },
            { id: 'categories', label: 'Kategori Yönetimi', icon: Layers, count: categories.length },
            { id: 'orders', label: 'Müşteri Siparişleri', icon: ShoppingBag, count: orders.length },
            { id: 'settings', label: 'Mağaza & Harita Bilgileri', icon: MapPin },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Ürün adı, marka veya kategori ile ara..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-sm transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Outlet Ürünü Ekle</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-600 dark:text-neutral-300">
                  <thead className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase font-mono tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Ürün</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Marka</th>
                      <th className="py-3 px-4">Outlet Fiyatı</th>
                      <th className="py-3 px-4">İndirim</th>
                      <th className="py-3 px-4">Stok</th>
                      <th className="py-3 px-4">Askılık Vitrini</th>
                      <th className="py-3 px-4 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-12 rounded-lg object-cover bg-neutral-200 dark:bg-neutral-800 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-neutral-900 dark:text-white block line-clamp-1">
                              {product.name}
                            </span>
                            <span className="text-[10px] text-neutral-400">{product.fabric}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 font-medium">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-neutral-900 dark:text-neutral-200">
                          {product.brand}
                        </td>
                        <td className="py-3 px-4 font-bold text-neutral-900 dark:text-white font-mono tabular-nums">
                          {formatCurrency(product.outletPrice)}
                        </td>
                        <td className="py-3 px-4 font-bold text-amber-500">
                          -%{product.discountPercent}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-mono tabular-nums font-bold ${
                            product.stockCount <= 3 ? 'text-red-500' : 'text-emerald-500'
                          }`}>
                            {product.stockCount} adet
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            product.isFeaturedOnRack
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400'
                          }`}>
                            {product.isFeaturedOnRack ? 'Sallanan Askıda' : 'Katalogda'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-amber-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            title="Düzenle"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`"${product.name}" ürününü silmek istediğinize emin misiniz?`)) {
                                onDeleteProduct(product.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Categories Management */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Add Category Form */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Yeni Kategori Ekle</h3>
              <p className="text-xs text-neutral-500">
                Sol menüde ve ürün filtrelerinde görünecek yeni bir kategori tanımlayın.
              </p>
              <form onSubmit={handleAddCategory} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Kategori Adı *</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Ör: Rüzgarlık & Yağmurluk"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newCategoryName.trim()}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Kategoriyi Kaydet
                </button>
              </form>
            </div>

            {/* Existing Categories List */}
            <div className="md:col-span-2 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Mevcut Kategoriler ({categories.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((cat, idx) => (
                  <div
                    key={cat.id || idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
                  >
                    <div>
                      <span className="font-bold text-xs text-neutral-900 dark:text-white block">{cat.name}</span>
                      <span className="text-[10px] font-mono text-neutral-400">ID: {cat.id}</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-mono">
                      {products.filter(p => p.category === cat.id).length} Ürün
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                {['all', 'Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi'].map(st => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      orderFilter === st
                        ? 'bg-amber-500 text-neutral-950'
                        : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    {st === 'all' ? 'Tüm Siparişler' : st}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 text-xs">
                Henüz bu durumda bir sipariş bulunmuyor.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                      <div>
                        <span className="font-mono font-bold text-xs text-amber-500 mr-2">
                          #{order.id}
                        </span>
                        <span className="font-bold text-neutral-900 dark:text-white text-sm">
                          {order.customer.fullName}
                        </span>
                        <span className="text-xs text-neutral-400 ml-2">
                          · {order.customer.phone} · {order.customer.city} / {order.customer.district}
                        </span>
                      </div>

                      {/* Status Dropdown/Toggle */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400">Durum:</span>
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                          className="bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs font-bold rounded-lg px-2.5 py-1 text-neutral-900 dark:text-white focus:outline-hidden"
                        >
                          <option value="Hazırlanıyor">Hazırlanıyor</option>
                          <option value="Kargoya Verildi">Kargoya Verildi</option>
                          <option value="Teslim Edildi">Teslim Edildi</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <strong className="text-neutral-400 block mb-1">Açık Teslimat Adresi:</strong>
                        <p className="text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-950 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
                          {order.customer.address}
                        </p>
                      </div>

                      <div>
                        <strong className="text-neutral-400 block mb-1">Sipariş Edilen Ürünler:</strong>
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-neutral-700 dark:text-neutral-300">
                              <span>{item.quantity}x {item.product.name} ({item.selectedSize})</span>
                              <span className="font-mono">{formatCurrency(item.product.outletPrice * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-neutral-50 dark:bg-neutral-950 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
                        <div>
                          <span className="text-neutral-400 block text-[11px]">Ödeme Şekli:</span>
                          <span className="font-bold text-amber-500">
                            {order.customer.paymentMethod === 'kapida_odeme' ? 'Kapıda Nakit / Kart' : 'Online Kart'}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-baseline">
                          <span className="font-semibold text-neutral-500">Tahsilat:</span>
                          <span className="text-base font-black text-neutral-900 dark:text-white tabular-nums">
                            {formatCurrency(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Store & Map Settings */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Showroom & Konum Bilgileri</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-500 block mb-1">Fiziksel Mağaza Adresi</label>
                  <input
                    type="text"
                    defaultValue="Caferağa Mah. Moda Cad. No:42 Kadıköy / İstanbul"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-500 block mb-1">Müşteri Destek Telefonu</label>
                  <input
                    type="text"
                    defaultValue="0850 304 72 26"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-500 block mb-1">Ziyaret Saatleri</label>
                  <input
                    type="text"
                    defaultValue="Haftanın her günü 10:00 - 21:00"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500" />
                <span>Kargo & E-Ticaret Kuralları</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-500 block mb-1">Ücretsiz Kargo Barajı (TL)</label>
                  <input
                    type="number"
                    defaultValue={1500}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 text-neutral-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-neutral-500 block mb-1">Aktif Kupon Kodu</label>
                  <input
                    type="text"
                    defaultValue="OUTLET2026 (%15 İndirim)"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 text-neutral-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-8">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                {editingProduct ? 'Ürünü Düzenle' : 'Yeni Outlet Ürünü Ekle'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Ürün Adı *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Ör: Vintage Deri Bomber Ceket"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Marka</label>
                  <select
                    value={productForm.brand || 'Şaban Outlet'}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value as any })}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2"
                  >
                    <option value="Şaban Outlet">Şaban Outlet</option>
                    <option value="Riko Collection">Riko Collection</option>
                    <option value="Azak Vintage">Azak Vintage</option>
                    <option value="Azak & Riko Studio">Azak & Riko Studio</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Kategori</label>
                  <select
                    value={productForm.category || 'ceket'}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2"
                  >
                    <option value="ceket">Ceket & Mont</option>
                    <option value="hoodie">Sweatshirt & Hoodie</option>
                    <option value="pantolon">Kargo & Jean</option>
                    <option value="tisort">Tişört & Üst Giyim</option>
                    <option value="ayakkabi">Sneaker & Ayakkabı</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Askı Tipi (Fizik Animasyonu)</label>
                  <select
                    value={productForm.hangerType || 'wood'}
                    onChange={(e) => setProductForm({ ...productForm, hangerType: e.target.value as any })}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2"
                  >
                    <option value="wood">Ceviz Ahşap Askı</option>
                    <option value="brass">Pirinç Metal Askı</option>
                    <option value="chrome">Krom Çelik Askı</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Normal Liste Fiyatı (TL) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.originalPrice || 2000}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Outlet Satış Fiyatı (TL) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.outletPrice || 890}
                    onChange={(e) => setProductForm({ ...productForm, outletPrice: Number(e.target.value) })}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 font-mono text-amber-500 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Stok Adedi *</label>
                  <input
                    type="number"
                    required
                    value={productForm.stockCount || 5}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Kumaş Dokusu</label>
                  <input
                    type="text"
                    value={productForm.fabric || ''}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                    placeholder="Ör: 480 GSM Fransız Pamuk"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Ürün Açıklaması</label>
                <textarea
                  rows={2}
                  value={productForm.description || ''}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Kalıp, dikiş ve tasarım detayları..."
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeaturedOnRack}
                    onChange={(e) => setProductForm({ ...productForm, isFeaturedOnRack: e.target.checked })}
                    className="rounded text-amber-500"
                  />
                  <span>Sallanan Askılık Vitrininde Göster</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isDailyDeal}
                    onChange={(e) => setProductForm({ ...productForm, isDailyDeal: e.target.checked })}
                    className="rounded text-amber-500"
                  />
                  <span>Flaş Fırsat Ürünü Olarak İşaretle</span>
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl shadow-xs"
                >
                  Kaydet & Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
