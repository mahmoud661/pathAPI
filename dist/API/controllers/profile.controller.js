"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const customError_1 = require("../../application/exception/customError");
class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfile(req, res, next) {
        try {
            const profile = await this.profileService.getProfile(req.user.id);
            res.status(200).json({ success: true, profile });
        }
        catch (error) {
            next(error);
        }
    }
    async updateProfile(req, res, next) {
        try {
            if (!req.user?.id) {
                throw new customError_1.CustomError('Not authenticated', 401);
            }
            const profile = await this.profileService.updateProfile(req.user.id, req.body);
            res.status(200).json({ success: true, data: profile });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map