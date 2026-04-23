"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllFarmers = exports.getAllUsers = exports.approveFarmer = exports.getPendingFarmers = exports.getProfile = exports.login = exports.registerFarmer = exports.register = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiResponse_1 = require("../utils/ApiResponse");
const authService = __importStar(require("../services/auth.service"));
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, phone, password, city, pincode } = req.body;
    const data = await authService.registerUser(name, email, phone, password, city, pincode);
    res.status(201).json(new ApiResponse_1.ApiResponse(true, 'User registered successfully', data));
});
exports.registerFarmer = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await authService.registerFarmer(req.body);
    res.status(201).json(new ApiResponse_1.ApiResponse(true, 'Farmer profile submitted successfully. Pending Admin approval.', data));
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, phone, password } = req.body;
    const loginIdentifier = email || phone;
    const data = await authService.loginUser(loginIdentifier, password);
    res.json(new ApiResponse_1.ApiResponse(true, 'Login successful', data));
});
exports.getProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await authService.getUserProfile(req.user._id);
    res.json(new ApiResponse_1.ApiResponse(true, 'Profile retrieved', data));
});
exports.getPendingFarmers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await authService.getPendingFarmers();
    res.json(new ApiResponse_1.ApiResponse(true, 'Pending farmers retrieved', data));
});
exports.approveFarmer = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const data = await authService.approveFarmer(id);
    res.json(new ApiResponse_1.ApiResponse(true, 'Farmer approved successfully', data));
});
exports.getAllUsers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await authService.getAllUsers();
    res.json(new ApiResponse_1.ApiResponse(true, 'Users retrieved', data));
});
exports.getAllFarmers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await authService.getAllFarmers();
    res.json(new ApiResponse_1.ApiResponse(true, 'Farmers retrieved', data));
});
exports.updateUserRole = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const data = await authService.updateUserRole(id, role);
    res.json(new ApiResponse_1.ApiResponse(true, 'User role updated', data));
});
exports.deleteUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    await authService.deleteUser(id);
    res.json(new ApiResponse_1.ApiResponse(true, 'User deleted successfully', null));
});
//# sourceMappingURL=auth.controller.js.map