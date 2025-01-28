"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenName = exports.generateRecovery = exports.generateConfirm = exports.generateAccess = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const token_1 = __importDefault(require("../../application/types/token"));
const config_1 = require("../../config");
const generateAccess = (id, email, isEditor) => {
    const accessToken = (0, jsonwebtoken_1.sign)({
        user: { id, email },
        tokenType: token_1.default.ACCESS_TOKEN,
        isEditor: isEditor,
    }, config_1.config.jwtSecret, { expiresIn: '5d' });
    return accessToken;
};
exports.generateAccess = generateAccess;
const generateConfirm = (id, email, isEditor) => {
    const confirmToken = (0, jsonwebtoken_1.sign)({
        user: { id, email },
        tokenType: token_1.default.CONFIRM_TOKEN,
        isEditor: isEditor,
    }, config_1.config.jwtSecret, { expiresIn: '1d' });
    return confirmToken;
};
exports.generateConfirm = generateConfirm;
const generateRecovery = (id, email, isEditor) => {
    const recoveryToken = (0, jsonwebtoken_1.sign)({
        user: { id, email },
        tokenType: token_1.default.RECOVERY_TOKEN,
        isEditor: isEditor,
    }, config_1.config.jwtSecret, { expiresIn: '1d' });
    return recoveryToken;
};
exports.generateRecovery = generateRecovery;
/**
 * Returns the name of the token based on its type.
 *
 * @param {Token} tokenType - The type of the token.
 * @returns {string} The name of the token type, such as 'Access', 'Email Confirm', or 'Password Recovery'.
 *                   Returns 'Unknown Type' if the type is not recognized.
 */
const getTokenName = (tokenType) => {
    switch (tokenType) {
        case token_1.default.ACCESS_TOKEN:
            return 'Access';
        case token_1.default.CONFIRM_TOKEN:
            return 'Email Confirm';
        case token_1.default.RECOVERY_TOKEN:
            return 'Password Recovery';
        default:
            return 'Unknown Type';
    }
};
exports.getTokenName = getTokenName;
//# sourceMappingURL=tokens.js.map