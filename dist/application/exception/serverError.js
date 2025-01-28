"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(message, statusCode, path) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.name = this.constructor.name;
        this.path = path;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=serverError.js.map