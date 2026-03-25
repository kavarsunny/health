import prisma from '../config/db';
import { ApiError } from '../utils/ApiError';
import { IShippingAddress } from '../types';

export const createOrder = async (
  userId: string,
  shippingAddress: IShippingAddress,
  paymentMethod: string
) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  });
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'Cart is empty');
  }

  const orderItemsData: any[] = [];
  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${item.product.name}`);
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
  const order = await prisma.$transaction(async (tx: any) => {
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

export const getUserOrders = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { items: true }
  });
  return orders.map((o: any) => ({ ...o, _id: o.id }));
};

export const getOrderById = async (orderId: string, userId: string, isAdmin: boolean) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, user: { select: { name: true, email: true } } }
  });
  if (!order) throw new ApiError(404, 'Order not found');
  if (!isAdmin && order.userId !== userId) {
    throw new ApiError(403, 'Not authorized');
  }
  return { ...order, _id: order.id };
};

export const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true } } }
  });
  return orders.map((o: any) => ({ ...o, _id: o.id }));
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const isDelivered = status === 'delivered';
  const deliveredAt = isDelivered ? new Date() : undefined;
  
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(isDelivered && { isDelivered: true, deliveredAt })
      },
      include: { items: true }
    });
    return { ...order, _id: order.id };
  } catch(error) {
    throw new ApiError(404, 'Order not found');
  }
};
