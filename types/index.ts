// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  inStock: boolean;
  tags: string[];
}

// Category types
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  productCount: number;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  language: string;
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Product: { productId: string };
  Category: { categoryId: string };
  Cart: undefined;
  Profile: undefined;
};

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
} 