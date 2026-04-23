import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import * as authService from '../services/auth.service';
import { AuthRequest } from '../types';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, password, city, pincode } = req.body;
  const data = await authService.registerUser(name, email, phone, password, city, pincode);
  res.status(201).json(new ApiResponse(true, 'User registered successfully', data));
});

export const registerFarmer = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.registerFarmer(req.body);
  res.status(201).json(new ApiResponse(true, 'Farmer profile submitted successfully. Pending Admin approval.', data));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, phone, password } = req.body;
  const loginIdentifier = email || phone;
  const data = await authService.loginUser(loginIdentifier, password);
  res.json(new ApiResponse(true, 'Login successful', data));
});

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await authService.getUserProfile(req.user!._id as string);
  res.json(new ApiResponse(true, 'Profile retrieved', data));
});

export const getPendingFarmers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await authService.getPendingFarmers();
  res.json(new ApiResponse(true, 'Pending farmers retrieved', data));
});

export const approveFarmer = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const data = await authService.approveFarmer(id as string);
  res.json(new ApiResponse(true, 'Farmer approved successfully', data));
});

export const getAllUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await authService.getAllUsers();
  res.json(new ApiResponse(true, 'Users retrieved', data));
});

export const getAllFarmers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await authService.getAllFarmers();
  res.json(new ApiResponse(true, 'Farmers retrieved', data));
});

export const updateUserRole = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const data = await authService.updateUserRole(id as string, role);
  res.json(new ApiResponse(true, 'User role updated', data));
});

export const deleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  await authService.deleteUser(id as string);
  res.json(new ApiResponse(true, 'User deleted successfully', null));
});
