export type Category = 'horlogerie' | 'parfumerie' | 'leatherware' | 'joaillerie' | 'optique';

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  materialName: string;
  roughness: number;
  metalness: number;
  previewColor: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  frenchName: string;
  subtitle: string;
  category: Category;
  price: number;
  edition: 'NEW OBJECTS' | 'ICONS' | 'LIMITED' | 'ARCHIVE';
  limitedCount?: number;
  description: string;
  craftsmanship: string;
  origin: string;
  dimensions: string;
  weight: string;
  details: string[];
  variants: ProductVariant[];
  modelType: 'watch' | 'perfume' | 'handbag' | 'ring' | 'sunglasses';
  modelScale?: number;
  featured?: boolean;
  accentColor: string;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  embossingText?: string;
  isGiftWrapped?: boolean;
  giftMessage?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    country: string;
  };
  deliveryMethod: 'Concierge Courier' | 'Armored Vault Express' | 'White-Glove Hand Delivery';
  certificateToken: string;
  status: 'In Atelier Assembly' | 'Shipped via Armored Transport' | 'Delivered';
}
