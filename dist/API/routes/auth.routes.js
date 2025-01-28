"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_guard_1 = __importDefault(require("../middlewares/data.guard"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const UserRepo_1 = require("../../infrastructure/repos/UserRepo");
const user_service_1 = require("../../application/service/user.service");
const auth_guard_1 = require("../middlewares/auth.guard");
const router = (0, express_1.default)();
// TODO: Automate this injection
// Dependency Injection
const repo = UserRepo_1.UserRepo.instance;
const userService = new user_service_1.UserService(repo);
const controller = new auth_controller_1.default(userService);
router.post('/register', (0, data_guard_1.default)('first_name', 'last_name', 'email', 'password'), controller.register);
router.post('/login', (0, data_guard_1.default)('email', 'password'), controller.login);
router.post('/request-password-recovery', (0, data_guard_1.default)('email'), controller.requestPasswordRecovery);
router.post('/change-password', (0, data_guard_1.default)('password'), (0, auth_guard_1.authenticate)(), controller.changePassword);
router.post('/confirm-email', (0, auth_guard_1.authenticate)(), controller.confirmEmail);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map