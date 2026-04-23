"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.addToCart = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const ApiError_1 = require("../utils/ApiError");
const getCart = async (userId) => {
    let cart = await Cart_1.default.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        cart = await Cart_1.default.create({ user: userId, items: [], totalPrice: 0 });
    }
    return { ...cart.toObject(), _id: cart._id };
};
exports.getCart = getCart;
const addToCart = async (userId, productId, quantity) => {
    const product = await Product_1.default.findById(productId);
    if (!product)
        throw new ApiError_1.ApiError(404, 'Product not found');
    if (product.stock < quantity)
        throw new ApiError_1.ApiError(400, 'Insufficient stock');
    let cart = await Cart_1.default.findOne({ user: userId });
    if (!cart) {
        cart = await Cart_1.default.create({ user: userId, items: [], totalPrice: 0 });
    }
    const existingIdx = cart.items.findIndex((i) => i.product.toString() === productId);
    if (existingIdx > -1) {
        cart.items[existingIdx].quantity = quantity;
        cart.items[existingIdx].price = product.price;
    }
    else {
        cart.items.push({ product: productId, quantity, price: product.price });
    }
    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    const populated = await Cart_1.default.findById(cart._id).populate('items.product');
    return { ...populated.toObject(), _id: populated._id };
};
exports.addToCart = addToCart;
const removeFromCart = async (userId, productId) => {
    const cart = await Cart_1.default.findOne({ user: userId });
    if (!cart)
        throw new ApiError_1.ApiError(404, 'Cart not found');
    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await cart.save();
    const populated = await Cart_1.default.findById(cart._id).populate('items.product');
    return { ...populated.toObject(), _id: populated._id };
};
exports.removeFromCart = removeFromCart;
const clearCart = async (userId) => {
    const cart = await Cart_1.default.findOne({ user: userId });
    if (!cart)
        return null;
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    return { ...cart.toObject(), _id: cart._id };
};
exports.clearCart = clearCart;
//# sourceMappingURL=cart.service.js.map