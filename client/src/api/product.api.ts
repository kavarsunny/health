import API from './axios';
import { ApiResponse, IProduct } from '../types';

interface ProductsResponse {
  products: IProduct[];
  page: number;
  totalPages: number;
  total: number;
}

export const getProducts = async (params?: Record<string, string>) => {
  const { data } = await API.get<ApiResponse<ProductsResponse>>('/products', { params });
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await API.get<ApiResponse<IProduct>>(`/products/${id}`);
  return data;
};

export const createProduct = async (product: Partial<IProduct>) => {
  const { data } = await API.post<ApiResponse<IProduct>>('/products', product);
  return data;
};

export const updateProduct = async (id: string, product: Partial<IProduct>) => {
  const { data } = await API.put<ApiResponse<IProduct>>(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await API.delete<ApiResponse<null>>(`/products/${id}`);
  return data;
};
