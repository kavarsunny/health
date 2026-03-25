import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import * as authService from '../services/auth.service';
import { AuthRequest } from '../types';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const data = await authService.registerUser(name, email, password);
  res.status(201).json(new ApiResponse(true, 'User registered successfully', data));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await authService.loginUser(email, password);
  res.json(new ApiResponse(true, 'Login successful', data));
});

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await authService.getUserProfile(req.user!._id as string);
  res.json(new ApiResponse(true, 'Profile retrieved', data));
});
