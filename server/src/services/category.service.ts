import prisma from '../config/db';
import { ApiError } from '../utils/ApiError';

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
  return categories.map(c => ({ ...c, _id: c.id }));
};

export const createCategory = async (name: string, description: string) => {
  const exists = await prisma.category.findUnique({ where: { name } });
  if (exists) throw new ApiError(400, 'Category already exists');
  const cat = await prisma.category.create({ data: { name, description } });
  return { ...cat, _id: cat.id };
};

export const deleteCategory = async (id: string) => {
  try {
    const category = await prisma.category.delete({ where: { id } });
    return { ...category, _id: category.id };
  } catch(error) {
    throw new ApiError(404, 'Category not found');
  }
};
