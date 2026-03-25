"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getAllOrders = exports.getOrderById = exports.getUserOrders = exports.createOrder = void 0;
const db_1 = __importDefault(require("../config/db"));
const ApiError_1 = require("../utils/ApiError");
const createOrder = async (userId, shippingAddress, paymentMethod) => {
    const cart = await db_1.default.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } }
    });
    if (!cart || cart.items.length === 0) {
        throw new ApiError_1.ApiError(400, 'Cart is empty');
    }
    const orderItemsData = [];
    for (const item of cart.items) {
        if (item.product.stock < item.quantity) {
            throw new ApiError_1.ApiError(400, `Insufficient stock for ${item.product.name}`);
        }
        orderItemsData.push({
            productId: item.productId,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            image: item.product.image,
        });
    }
    const itemsPrice = orderItemsData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const taxPrice = Math.round(itemsPrice * 0.18 * 100) / 100;
    const totalPrice = Math.round((itemsPrice + shippingPrice + taxPrice) * 100) / 100;
    // Transaction for atomic operations
    const order = await db_1.default.$transaction(async (tx) => {
        // 1. Create order and order items
        const createdOrder = await tx.order.create({
            data: {
                userId,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                shippingFullName: shippingAddress.fullName,
                shippingAddress: shippingAddress.address,
                shippingCity: shippingAddress.city,
                shippingPostalCode: shippingAddress.postalCode,
                shippingCountry: shippingAddress.country,
                items: {
                    create: orderItemsData,
                }
            },
            include: { items: true }
        });
        // 2. Decrement product stock
        for (const item of cart.items) {
            await tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } }
            });
        }
        // 3. Clear the cart
        await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
        await tx.cart.update({ where: { id: cart.id }, data: { totalPrice: 0 } });
        return createdOrder;
    });
    return { ...order, _id: order.id };
};
exports.createOrder = createOrder;
const getUserOrders = async (userId) => {
    const orders = await db_1.default.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: { items: true }
    });
    return orders.map((o) => ({ ...o, _id: o.id }));
};
exports.getUserOrders = getUserOrders;
const getOrderById = async (orderId, userId, isAdmin) => {
    const order = await db_1.default.order.findUnique({
        where: { id: orderId },
        include: { items: true, user: { select: { name: true, email: true } } }
    });
    if (!order)
        throw new ApiError_1.ApiError(404, 'Order not found');
    if (!isAdmin && order.userId !== userId) {
        throw new ApiError_1.ApiError(403, 'Not authorized');
    }
    return { ...order, _id: order.id };
};
exports.getOrderById = getOrderById;
const getAllOrders = async () => {
    const orders = await db_1.default.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } }
    });
    return orders.map((o) => ({ ...o, _id: o.id }));
};
exports.getAllOrders = getAllOrders;
const updateOrderStatus = async (orderId, status) => {
    const isDelivered = status === 'delivered';
    const deliveredAt = isDelivered ? new Date() : undefined;
    try {
        const order = await db_1.default.order.update({
            where: { id: orderId },
            data: {
                status,
                ...(isDelivered && { isDelivered: true, deliveredAt })
            },
            include: { items: true }
        });
        return { ...order, _id: order.id };
    }
    catch (error) {
        throw new ApiError_1.ApiError(404, 'Order not found');
    }
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=order.service.js.map