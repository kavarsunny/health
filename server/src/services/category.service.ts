import Category from '../models/Category';
import { ApiError } from '../utils/ApiError';

export const getAllCategories = async () => {
  return await Category.find().sort({ name: 1 });
};

export const createCategory = async (name: string, description: string) => {
  const exists = await Category.findOne({ name });
  if (exists) throw new ApiError(400, 'Category already exists');
  return await Category.create({ name, description });
};

export const deleteCategory = async (id: string) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(404, 'Category not found');
  return category;
};
