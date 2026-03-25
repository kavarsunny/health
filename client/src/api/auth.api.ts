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
