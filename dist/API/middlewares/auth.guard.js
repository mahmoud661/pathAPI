"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const consoleLogger_1 = __importDefault(require("../../infrastructure/logger/consoleLogger"));
const authenticate = (isRequired = true) => (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        if (isRequired) {
            res.status(401).json({ message: 'Not authorized, token not found' });
            consoleLogger_1.default.Info('request refused, token not found', 'authenticate middleware');
            return;
        }
        else {
            req.user = null;
            req.isEditor = false;
        }
        next();
        return;
    }
    try {
        const jwtSecret = config_1.config.jwtSecret;
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!decoded || !decoded.user) {
            consoleLogger_1.default.Info('request refused, userId not exist in the token', 'authenticate middleware');
            res.status(401).json({ message: 'Not authorized, userId not found' });
            return;
        }
        req.user = decoded.user;
        req.tokenType = decoded.tokenType;
        req.isEditor = decoded.isEditor;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
        consoleLogger_1.default.Info('request refused, invalid token', 'authenticate middleware');
        return;
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.guard.js.map