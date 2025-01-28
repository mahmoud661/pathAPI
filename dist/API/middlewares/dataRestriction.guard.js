"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consoleLogger_1 = __importDefault(require("../../infrastructure/logger/consoleLogger"));
function doNotAllow(...keys) {
    return (req, res, next) => {
        const { body } = req;
        for (const key of keys) {
            if (body[key]) {
                consoleLogger_1.default.Error(`request refused, ${key} is restricted`, 'Data Restriction middleware');
                res
                    .status(423)
                    .json({
                    message: `${key} is restricted, you cannot post or update it.`,
                });
                return;
            }
        }
        next();
    };
}
exports.default = doNotAllow;
//# sourceMappingURL=dataRestriction.guard.js.map