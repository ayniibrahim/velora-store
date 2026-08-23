export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: 'women' | 'men' | 'outerwear' | 'knitwear' | 'leather' | 'shoes' | 'accessories' | 'beauty';
  subcategory: string;
  collection?: string;
  images: string[];
  description: string;
  details: string[];
  fabricCare: string[];
  shippingInfo: string[];
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  completeTheLookIds?: string[];
  reviews?: ProductReview[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  image: string;
  tagline: string;
  description: string;
  itemCount: number;
}

export interface CollectionInfo {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  season: string;
  image: string;
  description: string;
}

export interface CartItem {
  id: string; // product.id + '-' + color + '-' + size
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  readTime: string;
  category: string;
  date: string;
  image: string;
  author: string;
  authorRole: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  status: 'Confirmed' | 'Processing' | 'Shipped';
}

export type PageRoute = 
  | 'home'
  | 'shop'
  | 'product'
  | 'categories'
  | 'collections'
  | 'about'
  | 'journal'
  | 'contact'
  | 'faq'
  | 'shipping'
  | 'privacy'
  | 'terms'
  | 'login'
  | 'signup'
  | 'admin';

export type UserRole = 'customer' | 'admin';

export interface AppUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface FilterState {
  category: string;
  subcategory: string;
  size: string;
  color: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'recommended' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  search: string;
  onlySale: boolean;
  onlyNew: boolean;
}
