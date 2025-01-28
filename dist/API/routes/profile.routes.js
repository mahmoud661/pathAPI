"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const profile_service_1 = require("../../application/service/profile.service");
const UserRepo_1 = require("../../infrastructure/repos/UserRepo");
const auth_guard_1 = require("../middlewares/auth.guard");
const dataRestriction_guard_1 = __importDefault(require("../middlewares/dataRestriction.guard"));
const router = (0, express_1.Router)();
const userRepo = UserRepo_1.UserRepo.instance;
const profileService = new profile_service_1.ProfileService(userRepo);
const controller = new profile_controller_1.ProfileController(profileService);
router.get('/', (0, dataRestriction_guard_1.default)('id', 'is_email_confirmed', 'is_editor'), (0, auth_guard_1.authenticate)(), controller.getProfile.bind(controller));
router.put('/', (0, dataRestriction_guard_1.default)('id', 'email', 'password', 'is_email_confirmed', 'is_editor'), (0, auth_guard_1.authenticate)(), controller.updateProfile.bind(controller));
exports.default = router;
//# sourceMappingURL=profile.routes.js.map