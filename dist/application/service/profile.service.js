"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const customError_1 = require("../exception/customError");
const userMapping_1 = require("../utils/userMapping");
class ProfileService {
    constructor(_repo) {
        this._repo = _repo;
    }
    async getProfile(userId) {
        const user = await this._repo.getById(userId);
        if (!user) {
            throw new customError_1.CustomError('User not found', 404);
        }
        return (0, userMapping_1.toGet)(user);
    }
    async updateProfile(userId, profileData) {
        if (!Object.keys(profileData).length) {
            throw new customError_1.CustomError('No data provided for update', 400);
        }
        const user = await this._repo.update(userId, profileData);
        return (0, userMapping_1.toGet)(user);
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map