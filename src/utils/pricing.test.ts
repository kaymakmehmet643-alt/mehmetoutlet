import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCartTotals, calculateCombineBundle, validateCheckoutForm } from './pricing';
import { Product, CartItem } from '../types';

const mockProductA: Product = {
  id: 'prod-1',
  name: 'Vintage Bomber Ceket',
  brand: 'Şaban Outlet',
  category: 'ceket',
  originalPrice: 3500,
  outletPrice: 1250,
  discountPercent: 64,
  sizes: ['M', 'L', 'XL'],
  inStock: true,
  stockCount: 4,
  image: '/src/assets/images/rack_bomber_jacket_1794076319208.jpg',
  description: 'Hakiki eskitme deri detaylı bomber ceket',
  fabric: '%100 Deri ve Yün Kırpıntı',
  color: 'Kahve Eskitme',
  rating: 4.9,
  reviewCount: 38,
  hangerType: 'wood',
};

const mockProductB: Product = {
  id: 'prod-2',
  name: 'Oversized Kargo Pantolon',
  brand: 'Riko Collection',
  category: 'pantolon',
  originalPrice: 1800,
  outletPrice: 650,
  discountPercent: 63,
  sizes: ['S', 'M', 'L'],
  inStock: true,
  stockCount: 8,
  image: '/src/assets/images/rack_cargo_pants_1794076320645.jpg',
  description: 'Teknik kargo cep detaylı pantolon',
  fabric: '%100 Pamuk Ripstop',
  color: 'Haki Askeri',
  rating: 4.8,
  reviewCount: 22,
  hangerType: 'chrome',
};

test('calculateCartTotals calculates subtotal and standard shipping fee under threshold', () => {
  const items: CartItem[] = [
    { product: mockProductB, selectedSize: 'M', quantity: 1 }
  ];
  const res = calculateCartTotals(items);
  assert.equal(res.subtotal, 650);
  assert.equal(res.shippingFee, 79.9);
  assert.equal(res.total, 729.9);
  assert.equal(res.itemCount, 1);
});

test('calculateCartTotals grants free shipping when exceeding 1500 TL threshold', () => {
  const items: CartItem[] = [
    { product: mockProductA, selectedSize: 'L', quantity: 1 }, // 1250
    { product: mockProductB, selectedSize: 'M', quantity: 1 }, // 650 -> Total 1900
  ];
  const res = calculateCartTotals(items);
  assert.equal(res.subtotal, 1900);
  assert.equal(res.shippingFee, 0); // Free shipping
  assert.equal(res.total, 1900);
  assert.equal(res.itemCount, 2);
});

test('calculateCartTotals applies promo code OUTLET2026 correctly', () => {
  const items: CartItem[] = [
    { product: mockProductA, selectedSize: 'L', quantity: 1 } // 1250
  ];
  const res = calculateCartTotals(items, 'OUTLET2026');
  // 15% discount on 1250 = 187.5
  assert.equal(res.discount, 187.5);
  // 1250 - 187.5 + 79.90 = 1142.4
  assert.equal(res.total, 1142.4);
});

test('calculateCombineBundle provides tiered bundle discounts for 2 and 3 items', () => {
  const twoItemsBundle = calculateCombineBundle([mockProductA, mockProductB]);
  // Total outlet = 1250 + 650 = 1900. 12% discount = 228
  assert.equal(twoItemsBundle.bundleDiscountPercent, 12);
  assert.equal(twoItemsBundle.bundlePrice, 1900 - 228);

  const threeItemsBundle = calculateCombineBundle([mockProductA, mockProductB, mockProductA]);
  assert.equal(threeItemsBundle.bundleDiscountPercent, 20);
});

test('validateCheckoutForm identifies missing fields correctly', () => {
  const invalid = validateCheckoutForm({});
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.address);

  const valid = validateCheckoutForm({
    fullName: 'Mehmet Kaymak',
    phone: '05551234567',
    city: 'İstanbul',
    district: 'Kadıköy',
    address: 'Moda Caddesi No:42 Daire:5',
    paymentMethod: 'kapida_odeme'
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
