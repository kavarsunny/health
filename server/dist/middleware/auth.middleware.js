"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const ApiError_1 = require("../utils/ApiError");
const env_1 = require("../config/env");
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new ApiError_1.ApiError(401, 'Not authorized, no token');
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        const user = await db_1.default.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
        });
        if (!user) {
            throw new ApiError_1.ApiError(401, 'Not authorized, user not found');
        }
        req.user = { ...user, _id: user.id }; // Cast so TS accepts the shape in controllers
        next();
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            res.status(error.statusCode).json({ success: false, message: error.message });
        }
        else {
            res.status(401).json({ success: false, message: 'Not authorized' });
        }
    }
};
exports.protect = protect;
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ success: false, message: 'Not authorized as admin' });
    }
};
exports.admin = admin;
//# sourceMappingURL=auth.middleware.js.map