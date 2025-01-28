"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consoleLogger_1 = __importDefault(require("../../infrastructure/logger/consoleLogger"));
function notEmpty(...keys) {
    return (req, res, next) => {
        const { body } = req;
        for (const key of keys) {
            if (!body[key]) {
                consoleLogger_1.default.Error(`request refused, ${key} is required`, 'notEmpty middleware');
                res.status(400).json({ message: `${key} is required` });
                return;
            }
        }
        next();
    };
}
exports.default = notEmpty;
//# sourceMappingURL=data.guard.js.map