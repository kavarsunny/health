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
exports.updateOrderStatus = exports.getAllOrders = exports.getOrder = exports.getMyOrders = exports.createOrder = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiResponse_1 = require("../utils/ApiResponse");
const orderService = __importStar(require("../services/order.service"));
exports.createOrder = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { shippingAddress, paymentMethod } = req.body;
    const data = await orderService.createOrder(req.user._id, shippingAddress, paymentMethod);
    res.status(201).json(new ApiResponse_1.ApiResponse(true, 'Order placed successfully', data));
});
exports.getMyOrders = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await orderService.getUserOrders(req.user._id);
    res.json(new ApiResponse_1.ApiResponse(true, 'Orders retrieved', data));
});
exports.getOrder = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const isAdmin = req.user.role === 'admin';
    const data = await orderService.getOrderById(req.params.id, req.user._id, isAdmin);
    res.json(new ApiResponse_1.ApiResponse(true, 'Order retrieved', data));
});
exports.getAllOrders = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await orderService.getAllOrders();
    res.json(new ApiResponse_1.ApiResponse(true, 'All orders retrieved', data));
});
exports.updateOrderStatus = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.json(new ApiResponse_1.ApiResponse(true, 'Order status updated', data));
});
//# sourceMappingURL=order.controller.js.map