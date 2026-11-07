export type Category = 'ceket' | 'hoodie' | 'pantolon' | 'kombin' | 'tisort' | 'ayakkabi';
export type Brand = 'Şaban Outlet' | 'Riko Collection' | 'Azak Vintage' | 'Azak & Riko Studio';
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type HangerType = 'wood' | 'brass' | 'chrome' | 'leather';

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  originalPrice: number;
  outletPrice: number;
  discountPercent: number;
  sizes: Size[];
  inStock: boolean;
  stockCount: number;
  image: string;
  description: string;
  fabric: string;
  color: string;
  rating: number;
  reviewCount: number;
  hangerType: HangerType;
  isFeaturedOnRack?: boolean;
  isDailyDeal?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: Size;
  quantity: number;
}

export interface CombineSlots {
  top?: Product;
  bottom?: Product;
  outerwear?: Product;
  shoes?: Product;
}

export interface SignatureLook {
  id: string;
  title: string;
  description: string;
  stylist: string;
  image: string;
  items: Product[];
  specialDiscountPercent: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  thinking?: string;
  suggestedProductIds?: string[];
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  notes?: string;
  paymentMethod: 'kapida_odeme' | 'kredi_karti';
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customer: CheckoutFormData;
  status: 'Hazırlanıyor' | 'Kargoya Verildi' | 'Teslim Edildi';
}
