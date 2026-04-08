import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';

const generateToken = (id: string): string => {
  try {
    if (!env.JWT_SECRET) {
      console.error('JWT_SECRET IS MISSING');
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions);
  } catch (err: any) {
    console.error('TOKEN GENERATION FAILED:', err.message);
    throw err;
  }
};

export const registerUser = async (name: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, 'User already exists with this email');

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword });
  const token = generateToken(user._id.toString());

  return { _id: user._id, name: user.name, email: user.email, role: user.role, token };
};

export const loginUser = async (email: string, password: string) => {
  console.log(`Login attempt for: ${email}`);
  const user = await User.findOne({ email });
  
  if (!user) {
    console.log('Login failed: User not found in database');
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(`Password match: ${isMatch}`);

  if (!isMatch) {
    console.log('Login failed: Password mismatch');
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user._id.toString());
  console.log(`Login success for ${user.email}, role: ${user.role}`);
  return { _id: user._id, name: user.name, email: user.email, role: user.role, token };
};

export const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};
export const getAllUsers = async () => {
  return await User.find({}).select('-password').sort({ createdAt: -1 });
};

export const getAllFarmers = async () => {
  return await User.find({ role: 'farmer' }).select('-password').sort({ createdAt: -1 });
};

export const updateUserRole = async (userId: string, role: 'user' | 'admin' | 'farmer' | 'superadmin') => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');
  
  user.role = role;
  await user.save();
  return user;
};

export const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};
