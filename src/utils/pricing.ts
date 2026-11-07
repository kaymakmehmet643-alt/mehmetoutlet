import { CartItem, Product, CheckoutFormData } from '../types';

export const FREE_SHIPPING_THRESHOLD = 1500;
export const STANDARD_SHIPPING_FEE = 79.90;

export interface CartCalculationResult {
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  savingsTotal: number;
  itemCount: number;
}

/**
 * Calculates cart totals including item sums, promo discounts, and free shipping rules.
 */
export function calculateCartTotals(
  items: CartItem[],
  promoCode?: string
): CartCalculationResult {
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.outletPrice * item.quantity,
    0
  );

  const originalTotal = items.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );

  let discount = 0;
  if (promoCode) {
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'OUTLET2026') {
      discount = subtotal * 0.15; // 15% extra discount
    } else if (cleanCode === 'RIKO10') {
      discount = subtotal * 0.10; // 10% extra discount
    } else if (cleanCode === 'SABAN50') {
      discount = Math.min(subtotal * 0.20, 200); // 20% capped at 200 TL
    }
  }

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const total = items.length === 0 ? 0 : discountedSubtotal + shippingFee;
  const savingsTotal = Math.max(0, (originalTotal - subtotal) + discount);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    shippingFee: Math.round(shippingFee * 100) / 100,
    total: Math.round(total * 100) / 100,
    savingsTotal: Math.round(savingsTotal * 100) / 100,
    itemCount,
  };
}

/**
 * Formats a number to Turkish Lira currency representation.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculates bundle/combine package savings when buying full sets.
 */
export function calculateCombineBundle(items: Product[]): {
  originalSum: number;
  outletSum: number;
  bundlePrice: number;
  bundleDiscountAmount: number;
  bundleDiscountPercent: number;
} {
  const originalSum = items.reduce((sum, p) => sum + p.originalPrice, 0);
  const outletSum = items.reduce((sum, p) => sum + p.outletPrice, 0);
  
  // Buying 2 or more combined items gives an additional 15% bundle discount
  const bundleDiscountPercent = items.length >= 3 ? 20 : items.length === 2 ? 12 : 0;
  const bundleDiscountAmount = (outletSum * bundleDiscountPercent) / 100;
  const bundlePrice = outletSum - bundleDiscountAmount;

  return {
    originalSum: Math.round(originalSum),
    outletSum: Math.round(outletSum),
    bundlePrice: Math.round(bundlePrice),
    bundleDiscountAmount: Math.round(bundleDiscountAmount),
    bundleDiscountPercent,
  };
}

/**
 * Validates checkout form data before creating an order.
 */
export function validateCheckoutForm(form: Partial<CheckoutFormData>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!form.fullName || form.fullName.trim().length < 3) {
    errors.fullName = 'Lütfen adınızı ve soyadınızı eksiksiz girin.';
  }

  const cleanPhone = (form.phone || '').replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    errors.phone = 'Geçerli bir telefon numarası girin (en az 10 hane).';
  }

  if (!form.city || form.city.trim().length < 2) {
    errors.city = 'Lütfen il seçiniz.';
  }

  if (!form.district || form.district.trim().length < 2) {
    errors.district = 'Lütfen ilçe giriniz.';
  }

  if (!form.address || form.address.trim().length < 10) {
    errors.address = 'Lütfen en az 10 karakterden oluşan açık teslimat adresi girin.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
