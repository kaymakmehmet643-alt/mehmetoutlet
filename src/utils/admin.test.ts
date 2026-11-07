import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAdminStats, updateProductPriceAndDiscount, filterOrdersByStatus } from './admin';
import { Product, Order } from '../types';

const mockProductList: Product[] = [
  {
    id: 'p1',
    name: 'Deri Ceket',
    brand: 'Şaban Outlet',
    category: 'ceket',
    originalPrice: 4000,
    outletPrice: 1500,
    discountPercent: 63,
    sizes: ['M', 'L'],
    inStock: true,
    stockCount: 5,
    image: '',
    description: '',
    fabric: '',
    color: '',
    rating: 5,
    reviewCount: 1,
    hangerType: 'wood',
  },
  {
    id: 'p2',
    name: 'Kargo Pantolon',
    brand: 'Azak Vintage',
    category: 'pantolon',
    originalPrice: 2000,
    outletPrice: 800,
    discountPercent: 60,
    sizes: ['M'],
    inStock: true,
    stockCount: 10,
    image: '',
    description: '',
    fabric: '',
    color: '',
    rating: 5,
    reviewCount: 1,
    hangerType: 'chrome',
  },
];

const mockOrderList: Order[] = [
  {
    id: 'ORD-1',
    createdAt: new Date().toISOString(),
    items: [],
    subtotal: 1500,
    discount: 0,
    shippingFee: 0,
    total: 1500,
    customer: {
      fullName: 'Ali Demir',
      phone: '05551234567',
      city: 'İstanbul',
      district: 'Kadıköy',
      address: 'Moda Cad No 5',
      paymentMethod: 'kapida_odeme',
    },
    status: 'Hazırlanıyor',
  },
  {
    id: 'ORD-2',
    createdAt: new Date().toISOString(),
    items: [],
    subtotal: 800,
    discount: 0,
    shippingFee: 79.9,
    total: 879.9,
    customer: {
      fullName: 'Veli Can',
      phone: '05559876543',
      city: 'İzmir',
      district: 'Alsancak',
      address: 'Kordon Boyu No 10',
      paymentMethod: 'kredi_karti',
    },
    status: 'Kargoya Verildi',
  },
];

test('calculateAdminStats computes total sales and stock accurately', () => {
  const stats = calculateAdminStats(mockProductList, mockOrderList);
  assert.equal(stats.totalProducts, 2);
  assert.equal(stats.totalStockUnits, 15);
  assert.equal(stats.totalOrders, 2);
  assert.equal(stats.totalSales, Math.round(1500 + 879.9));
  assert.equal(stats.averageOrderValue, Math.round((1500 + 879.9) / 2));
});

test('updateProductPriceAndDiscount recalculates discount percent correctly', () => {
  const res = updateProductPriceAndDiscount(2000, 500);
  // (2000 - 500) / 2000 = 75%
  assert.equal(res.discountPercent, 75);
  assert.equal(res.outletPrice, 500);
  assert.equal(res.originalPrice, 2000);
});

test('filterOrdersByStatus filters orders by fulfillment status', () => {
  const pending = filterOrdersByStatus(mockOrderList, 'Hazırlanıyor');
  assert.equal(pending.length, 1);
  assert.equal(pending[0].id, 'ORD-1');

  const all = filterOrdersByStatus(mockOrderList, 'all');
  assert.equal(all.length, 2);
});
