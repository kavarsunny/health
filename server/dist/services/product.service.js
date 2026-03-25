"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const db_1 = __importDefault(require("../config/db"));
const ApiError_1 = require("../utils/ApiError");
const getAllProducts = async (query) => {
    const { keyword, category, minPrice, maxPrice, page = 1, limit = 12 } = query;
    const filter = {};
    if (keyword) {
        filter.OR = [
            { name: { contains: keyword, mode: 'insensitive' } },
            { description: { contains: keyword, mode: 'insensitive' } },
        ];
    }
    if (category)
        filter.category = category;
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice)
            filter.price.gte = Number(minPrice);
        if (maxPrice)
            filter.price.lte = Number(maxPrice);
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [total, products] = await Promise.all([
        db_1.default.product.count({ where: filter }),
        db_1.default.product.findMany({
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
exports.getAllProducts = getAllProducts;
const getProductById = async (id) => {
    const product = await db_1.default.product.findUnique({
        where: { id },
        include: { reviews: true }
    });
    if (!product)
        throw new ApiError_1.ApiError(404, 'Product not found');
    return { ...product, _id: product.id };
};
exports.getProductById = getProductById;
const createProduct = async (data) => {
    const product = await db_1.default.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            category: data.category,
            brand: data.brand,
            stock: data.stock || 0,
            rating: data.rating || 0,
        }
    });
    return { ...product, _id: product.id };
};
exports.createProduct = createProduct;
const updateProduct = async (id, data) => {
    try {
        const product = await db_1.default.product.update({
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
    }
    catch (error) {
        throw new ApiError_1.ApiError(404, 'Product not found');
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    try {
        const product = await db_1.default.product.delete({ where: { id } });
        return { ...product, _id: product.id };
    }
    catch (error) {
        throw new ApiError_1.ApiError(404, 'Product not found');
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.service.js.map