"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.addToCart = exports.getCart = void 0;
const db_1 = __importDefault(require("../config/db"));
const ApiError_1 = require("../utils/ApiError");
const getCart = async (userId) => {
    let cart = await db_1.default.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } }
    });
    if (!cart) {
        cart = await db_1.default.cart.create({
            data: { userId },
            include: { items: { include: { product: true } } }
        });
    }
    return { ...cart, _id: cart.id };
};
exports.getCart = getCart;
const addToCart = async (userId, productId, quantity) => {
    const product = await db_1.default.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new ApiError_1.ApiError(404, 'Product not found');
    if (product.stock < quantity)
        throw new ApiError_1.ApiError(400, 'Insufficient stock');
    let cart = await db_1.default.cart.findUnique({ where: { userId }, include: { items: true } });
    if (!cart) {
        cart = await db_1.default.cart.create({ data: { userId }, include: { items: true } });
    }
    const existingItem = await db_1.default.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId } }
    });
    if (existingItem) {
        await db_1.default.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity, price: product.price }
        });
    }
    else {
        await db_1.default.cartItem.create({
            data: { cartId: cart.id, productId, quantity, price: product.price }
        });
    }
    // Recalculate total
    const updatedCart = await db_1.default.cart.findUnique({
        where: { id: cart.id },
        include: { items: true }
    });
    const totalPrice = updatedCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalCart = await db_1.default.cart.update({
        where: { id: cart.id },
        data: { totalPrice },
        include: { items: { include: { product: true } } }
    });
    return { ...finalCart, _id: finalCart.id };
};
exports.addToCart = addToCart;
const removeFromCart = async (userId, productId) => {
    const cart = await db_1.default.cart.findUnique({ where: { userId } });
    if (!cart)
        throw new ApiError_1.ApiError(404, 'Cart not found');
    await db_1.default.cartItem.deleteMany({
        where: { cartId: cart.id, productId }
    });
    // Recalculate total
    const updatedCart = await db_1.default.cart.findUnique({ where: { id: cart.id }, include: { items: true } });
    const totalPrice = updatedCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalCart = await db_1.default.cart.update({
        where: { id: cart.id },
        data: { totalPrice },
        include: { items: { include: { product: true } } }
    });
    return { ...finalCart, _id: finalCart.id };
};
exports.removeFromCart = removeFromCart;
const clearCart = async (userId) => {
    const cart = await db_1.default.cart.findUnique({ where: { userId } });
    if (cart) {
        await db_1.default.cartItem.deleteMany({ where: { cartId: cart.id } });
        const finalCart = await db_1.default.cart.update({
            where: { id: cart.id },
            data: { totalPrice: 0 },
            include: { items: { include: { product: true } } }
        });
        return { ...finalCart, _id: finalCart.id };
    }
    return null;
};
exports.clearCart = clearCart;
//# sourceMappingURL=cart.service.js.map