import API from './axios';
import { ApiResponse, IUser } from '../types';

export const registerUser = async (name: string, email: string, password: string) => {
  const { data } = await API.post<ApiResponse<IUser>>('/auth/register', { name, email, password });
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await API.post<ApiResponse<IUser>>('/auth/login', { email, password });
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

export const updateUserRole = async (userId: string, role: string) => {
  const { data } = await API.patch<ApiResponse<IUser>>(`/auth/users/${userId}/role`, { role });
  return data;
};

export const deleteUser = async (userId: string) => {
  const { data } = await API.delete<ApiResponse<null>>(`/auth/users/${userId}`);
  return data;
};
