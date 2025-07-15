"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Something went wrong',
        success: false,
        error: err,
    });
};
exports.globalErrorHandler = globalErrorHandler;
