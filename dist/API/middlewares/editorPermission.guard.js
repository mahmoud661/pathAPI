"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorPermission = void 0;
const consoleLogger_1 = __importDefault(require("../../infrastructure/logger/consoleLogger"));
const editorPermission = (req, res, next) => {
    const { isEditor } = req;
    if (!isEditor) {
        res
            .status(401)
            .json({ message: 'Not authorized, you do not have permission.' });
        consoleLogger_1.default.Warn('request refused, requester is not an editor', 'editorPermission guard');
        return;
    }
    next();
};
exports.editorPermission = editorPermission;
//# sourceMappingURL=editorPermission.guard.js.map