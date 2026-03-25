"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const ApiError_1 = require("../utils/ApiError");
const env_1 = require("../config/env");
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_EXPIRES_IN });
};
const registerUser = async (name, email, password) => {
    const existingUser = await db_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new ApiError_1.ApiError(400, 'User already exists with this email');
    }
    const salt = await bcryptjs_1.default.genSalt(12);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    const user = await db_1.default.user.create({
        data: { name, email, password: hashedPassword },
    });
    const token = generateToken(user.id);
    return {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
    };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await db_1.default.user.findUnique({ where: { email } });
    if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
        throw new ApiError_1.ApiError(401, 'Invalid email or password');
    }
    const token = generateToken(user.id);
    return {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
    };
};
exports.loginUser = loginUser;
const getUserProfile = async (userId) => {
    const user = await db_1.default.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true }
    });
    if (!user) {
        throw new ApiError_1.ApiError(404, 'User not found');
    }
    return { ...user, _id: user.id };
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=auth.service.js.map