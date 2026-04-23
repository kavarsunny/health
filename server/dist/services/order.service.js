"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getAllOrders = exports.getOrderById = exports.getUserOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const ApiError_1 = require("../utils/ApiError");
const createOrder = async (userId, shippingAddress, paymentMethod) => {
    const cart = await Cart_1.default.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0)
        throw new ApiError_1.ApiError(400, 'Cart is empty');
    const orderItems = [];
    for (const item of cart.items) {
        const product = item.product;
        if (product.stock < item.quantity) {
            throw new ApiError_1.ApiError(400, `Insufficient stock for ${product.name}`);
        }
        orderItems.push({
            product: product._id,
            name: product.name,
            quantity: item.quantity,
            price: product.price,
            image: product.image || '',
        });
    }
    const itemsPrice = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const taxPrice = Math.round(itemsPrice * 0.18 * 100) / 100;
    const totalPrice = Math.round((itemsPrice + shippingPrice + taxPrice) * 100) / 100;
    const order = await Order_1.default.create({
        user: userId,
        items: orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    });
    // Decrement stock
    for (const item of cart.items) {
        await Product_1.default.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
    }
    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    return { ...order.toObject(), _id: order._id };
};
exports.createOrder = createOrder;
const getUserOrders = async (userId) => {
    const orders = await Order_1.default.find({ user: userId }).sort({ createdAt: -1 });
    return orders.map(o => ({ ...o.toObject(), _id: o._id }));
};
exports.getUserOrders = getUserOrders;
const getOrderById = async (orderId, userId, isAdmin) => {
    const order = await Order_1.default.findById(orderId).populate('user', 'name email');
    if (!order)
        throw new ApiError_1.ApiError(404, 'Order not found');
    if (!isAdmin && order.user.toString() !== userId)
        throw new ApiError_1.ApiError(403, 'Not authorized');
    return { ...order.toObject(), _id: order._id };
};
exports.getOrderById = getOrderById;
const getAllOrders = async () => {
    const orders = await Order_1.default.find().sort({ createdAt: -1 }).populate('user', 'name');
    return orders.map(o => ({ ...o.toObject(), _id: o._id }));
};
exports.getAllOrders = getAllOrders;
const updateOrderStatus = async (orderId, status) => {
    const updateData = { status };
    if (status === 'delivered') {
        updateData.isDelivered = true;
        updateData.deliveredAt = new Date();
    }
    const order = await Order_1.default.findByIdAndUpdate(orderId, updateData, { new: true });
    if (!order)
        throw new ApiError_1.ApiError(404, 'Order not found');
    return { ...order.toObject(), _id: order._id };
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=order.service.js.map