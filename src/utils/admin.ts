import { Product, Order } from '../types';

export interface AdminStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalStockUnits: number;
  averageOrderValue: number;
}

export function calculateAdminStats(products: Product[], orders: Order[]): AdminStats {
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalStockUnits = products.reduce((sum, p) => sum + p.stockCount, 0);
  const averageOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

  return {
    totalSales: Math.round(totalSales),
    totalOrders,
    totalProducts,
    totalStockUnits,
    averageOrderValue,
  };
}

export function updateProductPriceAndDiscount(
  originalPrice: number,
  outletPrice: number
): { discountPercent: number; outletPrice: number; originalPrice: number } {
  const safeOriginal = Math.max(1, originalPrice);
  const safeOutlet = Math.min(safeOriginal, Math.max(0, outletPrice));
  const discountPercent = Math.round(((safeOriginal - safeOutlet) / safeOriginal) * 100);

  return {
    originalPrice: safeOriginal,
    outletPrice: safeOutlet,
    discountPercent,
  };
}

export function filterOrdersByStatus(orders: Order[], status?: string): Order[] {
  if (!status || status === 'all') return orders;
  return orders.filter(o => o.status === status);
}
