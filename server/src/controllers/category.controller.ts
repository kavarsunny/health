import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import * as categoryService from '../services/category.service';

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const data = await categoryService.getAllCategories();
  res.json(new ApiResponse(true, 'Categories retrieved', data));
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const data = await categoryService.createCategory(name, description);
  res.status(201).json(new ApiResponse(true, 'Category created', data));
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  await categoryService.deleteCategory(req.params.id as string);
  res.json(new ApiResponse(true, 'Category deleted', null));
});
