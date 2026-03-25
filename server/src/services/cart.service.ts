import Cart from '../models/Cart';
import Product from '../models/Product';
import { ApiError } from '../utils/ApiError';

export const getCart = async (userId: string) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
  }
  return { ...cart.toObject(), _id: cart._id };
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found');
  if (product.stock < quantity) throw new ApiError(400, 'Insufficient stock');

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
  }

  const existingIdx = cart.items.findIndex(
    (i: any) => i.product.toString() === productId
  );

  if (existingIdx > -1) {
    cart.items[existingIdx].quantity = quantity;
    cart.items[existingIdx].price = product.price;
  } else {
    cart.items.push({ product: productId as any, quantity, price: product.price });
  }

  cart.totalPrice = cart.items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  await cart.save();

  const populated = await Cart.findById(cart._id).populate('items.product');
  return { ...populated!.toObject(), _id: populated!._id };
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, 'Cart not found');

  cart.items = cart.items.filter((i: any) => i.product.toString() !== productId) as any;
  cart.totalPrice = cart.items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  await cart.save();

  const populated = await Cart.findById(cart._id).populate('items.product');
  return { ...populated!.toObject(), _id: populated!._id };
};

export const clearCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;

  cart.items = [] as any;
  cart.totalPrice = 0;
  await cart.save();
  return { ...cart.toObject(), _id: cart._id };
};
