import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import FarmerProfile from '../models/FarmerProfile';
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

export const registerUser = async (name: string, email: string | undefined, phone: string | undefined, password?: string, city?: string, pincode?: string) => {
  if (!email && !phone) throw new ApiError(400, 'Email or Phone is required');
  
  if (email) {
    const existing = await User.findOne({ email });
    if (existing) throw new ApiError(400, 'User already exists with this email');
  }
  if (phone) {
    const existing = await User.findOne({ phone });
    if (existing) throw new ApiError(400, 'User already exists with this phone number');
  }

  const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;
  const address = city && pincode ? `${city}, ${pincode}` : undefined;
  const user = await User.create({ name, email, phone, password: hashedPassword, address });
  const token = generateToken(user._id.toString());

  return { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, token };
};

export const registerFarmer = async (data: any) => {
  const { name, email, phone, password, ...profileData } = data;
  if (!phone) throw new ApiError(400, 'Phone is required for Farmer Registration');

  const existing = await User.findOne({ phone });
  if (existing) throw new ApiError(400, 'User already exists with this phone number');

  const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;
  
  const user = await User.create({ 
    name, 
    email, 
    phone, 
    password: hashedPassword, 
    role: 'farmer' 
  });

  const farmerProfile = await FarmerProfile.create({
    user: user._id,
    ...profileData,
    status: 'Pending'
  });

  const token = generateToken(user._id.toString());

  return { 
    user: { _id: user._id, name: user.name, phone: user.phone, role: user.role },
    profile: farmerProfile,
    token 
  };
};

export const loginUser = async (emailOrPhone: string, password?: string) => {
  console.log(`Login attempt for: ${emailOrPhone}`);
  // Find by email OR phone
  const user = await User.findOne({ 
    $or: [ { email: emailOrPhone }, { phone: emailOrPhone } ] 
  });
  
  if (!user) {
    console.log('Login failed: User not found in database');
    throw new ApiError(401, 'Invalid credentials');
  }

  if (password && user.password) {
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match: ${isMatch}`);

    if (!isMatch) {
      console.log('Login failed: Password mismatch');
      throw new ApiError(401, 'Invalid credentials');
    }
  } else if (!user.password && password) {
    // If user has no password (e.g. OTP based) but password is provided
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken(user._id.toString());
  console.log(`Login success for ${user.email || user.phone}, role: ${user.role}`);
  return { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, token };
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

export const getPendingFarmers = async () => {
  return await FarmerProfile.find({ status: 'Pending' }).populate('user', '-password').sort({ createdAt: -1 });
};

export const approveFarmer = async (profileId: string) => {
  const profile = await FarmerProfile.findByIdAndUpdate(profileId, { status: 'Approved' }, { new: true });
  if (!profile) throw new ApiError(404, 'Farmer profile not found');
  return profile;
};

export const updateUserRole = async (userId: string, role: 'customer' | 'admin' | 'farmer' | 'superadmin') => {
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
