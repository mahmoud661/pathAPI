"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode, path) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.name = this.constructor.name;
        this.path = path;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=customError.js.map