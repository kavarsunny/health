import Product from '../models/Product';
import { ApiError } from '../utils/ApiError';

export const getAllProducts = async (query: any) => {
  const { keyword, category, minPrice, maxPrice, page = 1, limit = 12 } = query;

  const filter: any = {};
  if (keyword) {
    filter.$or = [
      { name:        { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
  ]);

  return {
    products,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    total,
  };
};

export const getProductById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};

export const createProduct = async (data: any) => {
  const product = await Product.create({
    name:        data.name,
    description: data.description,
    price:       data.price,
    image:       data.image || '',
    category:    data.category,
    brand:       data.brand || '',
    stock:       data.stock || 0,
    farmerName:  data.farmerName || '',
    mrp:         data.mrp,
  });
  return product;
};

export const updateProduct = async (id: string, data: any) => {
  const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};
