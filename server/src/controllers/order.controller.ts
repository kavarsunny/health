import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import * as orderService from '../services/order.service';
import { AuthRequest } from '../types';

export const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { shippingAddress, paymentMethod } = req.body;
  const data = await orderService.createOrder(req.user!._id as string, shippingAddress, paymentMethod);
  res.status(201).json(new ApiResponse(true, 'Order placed successfully', data));
});

export const getMyOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await orderService.getUserOrders(req.user!._id as string);
  res.json(new ApiResponse(true, 'Orders retrieved', data));
});

export const getOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const isAdmin = req.user!.role === 'admin';
  const data = await orderService.getOrderById(req.params.id as string, req.user!._id as string, isAdmin);
  res.json(new ApiResponse(true, 'Order retrieved', data));
});

export const getAllOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await orderService.getAllOrders();
  res.json(new ApiResponse(true, 'All orders retrieved', data));
});

export const updateOrderStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = await orderService.updateOrderStatus(req.params.id as string, req.body.status);
  res.json(new ApiResponse(true, 'Order status updated', data));
});
