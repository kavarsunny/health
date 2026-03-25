import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import * as cartService from '../services/cart.service';
import { AuthRequest } from '../types';

export const getCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await cartService.getCart(req.user!._id as string);
  res.json(new ApiResponse(true, 'Cart retrieved', data));
});

export const addToCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { productId, quantity } = req.body;
  const data = await cartService.addToCart(req.user!._id as string, productId, quantity);
  res.json(new ApiResponse(true, 'Item added to cart', data));
});

export const removeFromCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await cartService.removeFromCart(req.user!._id as string, req.params.productId as string);
  res.json(new ApiResponse(true, 'Item removed from cart', data));
});

export const clearCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await cartService.clearCart(req.user!._id as string);
  res.json(new ApiResponse(true, 'Cart cleared', data));
});
