"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.approveFarmer = exports.getPendingFarmers = exports.getAllFarmers = exports.getAllUsers = exports.getUserProfile = exports.loginUser = exports.registerFarmer = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const FarmerProfile_1 = __importDefault(require("../models/FarmerProfile"));
const ApiError_1 = require("../utils/ApiError");
const env_1 = require("../config/env");
const generateToken = (id) => {
    try {
        if (!env_1.env.JWT_SECRET) {
            console.error('JWT_SECRET IS MISSING');
            throw new Error('JWT_SECRET is not defined');
        }
        return jsonwebtoken_1.default.sign({ id }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_EXPIRES_IN });
    }
    catch (err) {
        console.error('TOKEN GENERATION FAILED:', err.message);
        throw err;
    }
};
const registerUser = async (name, email, phone, password, city, pincode) => {
    if (!email && !phone)
        throw new ApiError_1.ApiError(400, 'Email or Phone is required');
    if (email) {
        const existing = await User_1.default.findOne({ email });
        if (existing)
            throw new ApiError_1.ApiError(400, 'User already exists with this email');
    }
    if (phone) {
        const existing = await User_1.default.findOne({ phone });
        if (existing)
            throw new ApiError_1.ApiError(400, 'User already exists with this phone number');
    }
    const hashedPassword = password ? await bcryptjs_1.default.hash(password, 12) : undefined;
    const address = city && pincode ? `${city}, ${pincode}` : undefined;
    const user = await User_1.default.create({ name, email, phone, password: hashedPassword, address });
    const token = generateToken(user._id.toString());
    return { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, token };
};
exports.registerUser = registerUser;
const registerFarmer = async (data) => {
    const { name, email, phone, password, ...profileData } = data;
    if (!phone)
        throw new ApiError_1.ApiError(400, 'Phone is required for Farmer Registration');
    const existing = await User_1.default.findOne({ phone });
    if (existing)
        throw new ApiError_1.ApiError(400, 'User already exists with this phone number');
    const hashedPassword = password ? await bcryptjs_1.default.hash(password, 12) : undefined;
    const user = await User_1.default.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role: 'farmer'
    });
    const farmerProfile = await FarmerProfile_1.default.create({
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
exports.registerFarmer = registerFarmer;
const loginUser = async (emailOrPhone, password) => {
    console.log(`Login attempt for: ${emailOrPhone}`);
    // Find by email OR phone
    const user = await User_1.default.findOne({
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });
    if (!user) {
        console.log('Login failed: User not found in database');
        throw new ApiError_1.ApiError(401, 'Invalid credentials');
    }
    if (password && user.password) {
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        console.log(`Password match: ${isMatch}`);
        if (!isMatch) {
            console.log('Login failed: Password mismatch');
            throw new ApiError_1.ApiError(401, 'Invalid credentials');
        }
    }
    else if (!user.password && password) {
        // If user has no password (e.g. OTP based) but password is provided
        throw new ApiError_1.ApiError(401, 'Invalid credentials');
    }
    const token = generateToken(user._id.toString());
    console.log(`Login success for ${user.email || user.phone}, role: ${user.role}`);
    return { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, token };
};
exports.loginUser = loginUser;
const getUserProfile = async (userId) => {
    const user = await User_1.default.findById(userId).select('-password');
    if (!user)
        throw new ApiError_1.ApiError(404, 'User not found');
    return user;
};
exports.getUserProfile = getUserProfile;
const getAllUsers = async () => {
    return await User_1.default.find({}).select('-password').sort({ createdAt: -1 });
};
exports.getAllUsers = getAllUsers;
const getAllFarmers = async () => {
    return await User_1.default.find({ role: 'farmer' }).select('-password').sort({ createdAt: -1 });
};
exports.getAllFarmers = getAllFarmers;
const getPendingFarmers = async () => {
    return await FarmerProfile_1.default.find({ status: 'Pending' }).populate('user', '-password').sort({ createdAt: -1 });
};
exports.getPendingFarmers = getPendingFarmers;
const approveFarmer = async (profileId) => {
    const profile = await FarmerProfile_1.default.findByIdAndUpdate(profileId, { status: 'Approved' }, { new: true });
    if (!profile)
        throw new ApiError_1.ApiError(404, 'Farmer profile not found');
    return profile;
};
exports.approveFarmer = approveFarmer;
const updateUserRole = async (userId, role) => {
    const user = await User_1.default.findById(userId);
    if (!user)
        throw new ApiError_1.ApiError(404, 'User not found');
    user.role = role;
    await user.save();
    return user;
};
exports.updateUserRole = updateUserRole;
const deleteUser = async (userId) => {
    const user = await User_1.default.findByIdAndDelete(userId);
    if (!user)
        throw new ApiError_1.ApiError(404, 'User not found');
    return user;
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=auth.service.js.map