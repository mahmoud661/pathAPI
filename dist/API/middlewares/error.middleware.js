"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../../application/exception/customError");
const consoleLogger_1 = __importDefault(require("../../infrastructure/logger/consoleLogger"));
const serverError_1 = require("../../application/exception/serverError");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof customError_1.CustomError) {
        consoleLogger_1.default.Error(err, err.path);
        res.status(err.statusCode).json({
            status: 'error',
            success: false,
            message: err.message,
        });
        return;
    }
    else if (err instanceof serverError_1.ServerError) {
        consoleLogger_1.default.Error(err, err.path);
    }
    consoleLogger_1.default.Error(err, 'errorMiddleware');
    res.status(500).json({
        status: 'error',
        success: false,
        message: 'Something went wrong. Please try again later.',
    });
    return;
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map