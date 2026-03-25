import prisma from '../config/db';
import { ApiError } from '../utils/ApiError';
import { Prisma } from '@prisma/client';

export const getAllProducts = async (query: any) => {
  const { keyword, category, minPrice, maxPrice, page = 1, limit = 12 } = query;

  const filter: Prisma.ProductWhereInput = {};
  if (keyword) {
    filter.OR = [
      { name: { contains: keyword, mode: 'insensitive' } },
      { description: { contains: keyword, mode: 'insensitive' } },
    ];
  }
  if (category) filter.category = category;
  
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.gte = Number(minPrice);
    if (maxPrice) filter.price.lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  
  const [total, products] = await Promise.all([
    prisma.product.count({ where: filter }),
    prisma.product.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
      skip,
      take: Number(limit),
      include: {
        reviews: true,
      }
    })
  ]);

  return {
    products: products.map(p => ({ ...p, _id: p.id })),
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    total,
  };
};

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { reviews: true }
  });
  if (!product) throw new ApiError(404, 'Product not found');
  return { ...product, _id: product.id };
};

export const createProduct = async (data: any) => {
  // Use native MongoDB client to bypass Prisma's P2031 replica set requirement
  const { MongoClient } = require('mongodb');
  const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/ecommerce';
  
  // Extract database name from uri (e.g. 'ecommerce' from 'mongodb://localhost:27017/ecommerce')
  const dbName = uri.split('/').pop()?.split('?')[0] || 'ecommerce';
  
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  
  const productData = {
    name: data.name,
    description: data.description,
    price: data.price,
    image: data.image,
    category: data.category,
    brand: data.brand,
    stock: data.stock || 0,
    rating: data.rating || 0,
    numReviews: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection('Product').insertOne(productData);
  await client.close();

  return { ...productData, id: result.insertedId.toString(), _id: result.insertedId.toString() };
};

export const updateProduct = async (id: string, data: any) => {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        brand: data.brand,
        stock: data.stock,
      }
    });
    return { ...product, _id: product.id };
  } catch (error) {
    throw new ApiError(404, 'Product not found');
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const product = await prisma.product.delete({ where: { id } });
    return { ...product, _id: product.id };
  } catch (error) {
    throw new ApiError(404, 'Product not found');
  }
};
