import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { ApiError } from '../utils/ApiError';
import { IShippingAddress } from '../types';

export const createOrder = async (
  userId: string,
  shippingAddress: IShippingAddress,
  paymentMethod: string
) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0) throw new ApiError(400, 'Cart is empty');

  const orderItems: any[] = [];
  for (const item of cart.items as any[]) {
    const product = item.product;
    if (product.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${product.name}`);
    }
    orderItems.push({
      product:  product._id,
      name:     product.name,
      quantity: item.quantity,
      price:    product.price,
      image:    product.image || '',
    });
  }

  const itemsPrice    = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const taxPrice      = Math.round(itemsPrice * 0.18 * 100) / 100;
  const totalPrice    = Math.round((itemsPrice + shippingPrice + taxPrice) * 100) / 100;

  const order = await Order.create({
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
  for (const item of cart.items as any[]) {
    await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
  }

  // Clear cart
  cart.items = [] as any;
  cart.totalPrice = 0;
  await cart.save();

  return { ...order.toObject(), _id: order._id };
};

export const getUserOrders = async (userId: string) => {
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  return orders.map(o => ({ ...o.toObject(), _id: o._id }));
};

export const getOrderById = async (orderId: string, userId: string, isAdmin: boolean) => {
  const order = await Order.findById(orderId).populate('user', 'name email');
  if (!order) throw new ApiError(404, 'Order not found');
  if (!isAdmin && order.user.toString() !== userId) throw new ApiError(403, 'Not authorized');
  return { ...order.toObject(), _id: order._id };
};

export const getAllOrders = async () => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name');
  return orders.map(o => ({ ...o.toObject(), _id: o._id }));
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const updateData: any = { status };
  if (status === 'delivered') {
    updateData.isDelivered = true;
    updateData.deliveredAt = new Date();
  }
  const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
  if (!order) throw new ApiError(404, 'Order not found');
  return { ...order.toObject(), _id: order._id };
};
