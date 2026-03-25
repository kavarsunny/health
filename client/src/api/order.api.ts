import API from './axios';
import { ApiResponse, IOrder, IShippingAddress } from '../types';

export const createOrder = async (shippingAddress: IShippingAddress, paymentMethod: string) => {
  const { data } = await API.post<ApiResponse<IOrder>>('/orders', { shippingAddress, paymentMethod });
  return data;
};

export const getMyOrders = async () => {
  const { data } = await API.get<ApiResponse<IOrder[]>>('/orders');
  return data;
};

export const getOrderById = async (id: string) => {
  const { data } = await API.get<ApiResponse<IOrder>>(`/orders/${id}`);
  return data;
};

export const getAllOrders = async () => {
  const { data } = await API.get<ApiResponse<IOrder[]>>('/orders/all');
  return data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const { data } = await API.put<ApiResponse<IOrder>>(`/orders/${id}/status`, { status });
  return data;
};
