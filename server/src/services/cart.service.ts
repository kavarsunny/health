import prisma from '../config/db';
import { ApiError } from '../utils/ApiError';

export const getCart = async (userId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: { include: { product: true } } }
    });
  }
  return { ...cart, _id: cart.id };
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new ApiError(404, 'Product not found');
  if (product.stock < quantity) throw new ApiError(400, 'Insufficient stock');

  let cart = await prisma.cart.findUnique({ where: { userId }, include: { items: true } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId }, include: { items: true } });
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } }
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity, price: product.price }
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity, price: product.price }
    });
  }

  // Recalculate total
  const updatedCart = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: true }
  });
  
  const totalPrice = updatedCart!.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  const finalCart = await prisma.cart.update({
    where: { id: cart.id },
    data: { totalPrice },
    include: { items: { include: { product: true } } }
  });

  return { ...finalCart, _id: finalCart.id };
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId }});
  if (!cart) throw new ApiError(404, 'Cart not found');

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId }
  });

  // Recalculate total
  const updatedCart = await prisma.cart.findUnique({ where: { id: cart.id }, include: { items: true } });
  const totalPrice = updatedCart!.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  const finalCart = await prisma.cart.update({
    where: { id: cart.id },
    data: { totalPrice },
    include: { items: { include: { product: true } } }
  });

  return { ...finalCart, _id: finalCart.id };
};

export const clearCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    const finalCart = await prisma.cart.update({
      where: { id: cart.id },
      data: { totalPrice: 0 },
      include: { items: { include: { product: true } } }
    });
    return { ...finalCart, _id: finalCart.id };
  }
  return null;
};
