"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("../../application/types/token"));
const consoleLogger_1 = __importDefault(require("../../infrastructure/logger/consoleLogger"));
const tokens_1 = require("../utils/tokens");
function allowedTokens(...allowedTokens) {
    return (req, res, next) => {
        const { tokenType } = req;
        if (!allowedTokens.length)
            allowedTokens = [token_1.default.ACCESS_TOKEN];
        if (!allowedTokens.includes(tokenType)) {
            consoleLogger_1.default.Warn(`request refused, ${(0, tokens_1.getTokenName)(tokenType)} type is not allowed`, 'allowedTokens middleware');
            res.status(401).json({ success: false, message: 'Not authorized.' });
            return;
        }
        next();
    };
}
exports.default = allowedTokens;
//# sourceMappingURL=allowedTokens.guard.js.map