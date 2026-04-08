// ===== User Types =====
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'farmer' | 'superadmin';
  token: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

// ===== Product Types =====
export interface IReview {
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  numReviews: number;
  reviews: IReview[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
  products: IProduct[];
  product: IProduct | null;
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  total: number;
}

// ===== Cart Types =====
export interface ICartItem {
  product: string | IProduct;
  quantity: number;
  price: number;
}

export interface ICart {
  _id: string;
  user: string;
  items: ICartItem[];
  totalPrice: number;
}

export interface CartState {
  cart: ICart | null;
  loading: boolean;
  error: string | null;
}

// ===== Order Types =====
export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface IOrder {
  _id: string;
  user: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  orders: IOrder[];
  order: IOrder | null;
  allOrders: IOrder[];
  loading: boolean;
  error: string | null;
}

// ===== Category Types =====
export interface ICategory {
  _id: string;
  name: string;
  description: string;
}

// ===== API Response =====
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
