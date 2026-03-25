import { Request } from 'express';
import { User, Product, Category, Order, Cart, OrderItem, CartItem, Review } from '@prisma/client';

export type IUser = User;
export type IProduct = Product;
export type ICategory = Category;
export type IOrder = Order;
export type IOrderItem = OrderItem;
export type ICartItem = CartItem;
export type ICart = Cart;
export type IReview = Review;




export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// Auth Request
export interface AuthRequest extends Request {
  user?: Omit<IUser, 'password'> & { _id?: string };
}
