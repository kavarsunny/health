"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.approveProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const ApiError_1 = require("../utils/ApiError");
const getAllProducts = async (query) => {
    const { keyword, category, minPrice, maxPrice, page = 1, limit = 12 } = query;
    const filter = {};
    if (keyword) {
        filter.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
        ];
    }
    if (category)
        filter.category = category;
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice)
            filter.price.$gte = Number(minPrice);
        if (maxPrice)
            filter.price.$lte = Number(maxPrice);
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [total, products] = await Promise.all([
        Product_1.default.countDocuments(filter),
        Product_1.default.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    ]);
    return {
        products,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        total,
    };
};
exports.getAllProducts = getAllProducts;
const getProductById = async (id) => {
    const product = await Product_1.default.findById(id);
    if (!product)
        throw new ApiError_1.ApiError(404, 'Product not found');
    return product;
};
exports.getProductById = getProductById;
const createProduct = async (data) => {
    const product = await Product_1.default.create({
        farmer: data.farmerId,
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images || [],
        category: data.category,
        brand: data.brand || '',
        stock: data.stock || 0,
        status: 'Pending',
    });
    return product;
};
exports.createProduct = createProduct;
const updateProduct = async (id, data) => {
    const product = await Product_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!product)
        throw new ApiError_1.ApiError(404, 'Product not found');
    return product;
};
exports.updateProduct = updateProduct;
const approveProduct = async (id) => {
    const product = await Product_1.default.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
    if (!product)
        throw new ApiError_1.ApiError(404, 'Product not found');
    return product;
};
exports.approveProduct = approveProduct;
const deleteProduct = async (id) => {
    const product = await Product_1.default.findByIdAndDelete(id);
    if (!product)
        throw new ApiError_1.ApiError(404, 'Product not found');
    return product;
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.service.js.map