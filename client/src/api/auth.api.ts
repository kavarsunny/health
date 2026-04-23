import API from './axios';
import { ApiResponse, IUser } from '../types';

export const registerUser = async (name: string, email: string, phone: string, password?: string, city?: string, pincode?: string) => {
  const { data } = await API.post<ApiResponse<IUser>>('/auth/register', { name, email, phone, password, city, pincode });
  return data;
};

export const registerFarmer = async (farmerData: any) => {
  const { data } = await API.post<ApiResponse<any>>('/auth/register-farmer', farmerData);
  return data;
};

export const loginUser = async (emailOrPhone: string, password?: string) => {
  const isEmail = emailOrPhone.includes('@');
  const payload = isEmail ? { email: emailOrPhone, password } : { phone: emailOrPhone, password };
  const { data } = await API.post<ApiResponse<IUser>>('/auth/login', payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await API.get<ApiResponse<IUser>>('/auth/profile');
  return data;
};
export const getAllUsers = async () => {
  const { data } = await API.get<ApiResponse<IUser[]>>('/auth/users');
  return data;
};

export const getAllFarmers = async () => {
  const { data } = await API.get<ApiResponse<IUser[]>>('/auth/farmers');
  return data;
};

export const getPendingFarmers = async () => {
  const { data } = await API.get<ApiResponse<any[]>>('/auth/farmers/pending');
  return data;
};

export const approveFarmer = async (farmerId: string) => {
  const { data } = await API.patch<ApiResponse<any>>(`/auth/farmers/${farmerId}/approve`);
  return data;
};

export const updateUserRole = async (userId: string, role: string) => {
  const { data } = await API.patch<ApiResponse<IUser>>(`/auth/users/${userId}/role`, { role });
  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await API.delete<ApiResponse<null>>(`/auth/users/${userId}`);
  return data;
};
