"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    console.error('Unhandled Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    const error = new ApiError_1.ApiError(404, `Not found - ${req.originalUrl}`);
    next(error);
};
exports.notFound = notFound;
//# sourceMappingURL=error.middleware.js.map