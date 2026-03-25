import API from './axios';
import { ApiResponse, ICart } from '../types';

export const getCart = async () => {
  const { data } = await API.get<ApiResponse<ICart>>('/cart');
  return data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const { data } = await API.post<ApiResponse<ICart>>('/cart', { productId, quantity });
  return data;
};

export const removeFromCart = async (productId: string) => {
  const { data } = await API.delete<ApiResponse<ICart>>(`/cart/${productId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await API.delete<ApiResponse<ICart>>('/cart');
  return data;
};
