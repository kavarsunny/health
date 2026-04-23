import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import * as productService from '../services/product.service';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const data = await productService.getAllProducts(req.query);
  res.json(new ApiResponse(true, 'Products retrieved', data));
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const data = await productService.getProductById(req.params.id as string);
  res.json(new ApiResponse(true, 'Product retrieved', data));
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const data = await productService.createProduct(req.body);
  res.status(201).json(new ApiResponse(true, 'Product created', data));
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const data = await productService.updateProduct(req.params.id as string, req.body);
  res.json(new ApiResponse(true, 'Product updated', data));
});

export const approveProduct = asyncHandler(async (req: Request, res: Response) => {
  const data = await productService.approveProduct(req.params.id as string);
  res.json(new ApiResponse(true, 'Product approved successfully', data));
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  await productService.deleteProduct(req.params.id as string);
  res.json(new ApiResponse(true, 'Product deleted', null));
});
