"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const customError_1 = require("../exception/customError");
const userMapping_1 = require("../utils/userMapping");
const bcrypt_1 = require("bcrypt");
class UserService {
    constructor(_repo) {
        this._repo = _repo;
    }
    async register(postUser) {
        if (!this.passwordValidator(postUser.password)) {
            throw new customError_1.CustomError('Password is not strong enough', 400);
        }
        if (await this._repo.getByEmail(postUser.email)) {
            throw new customError_1.CustomError('Email already exists, try to login', 400);
        }
        postUser.password = await (0, bcrypt_1.hash)(postUser.password, 10);
        return (0, userMapping_1.toGet)(await this._repo.create(postUser));
    }
    async login(email, password) {
        const user = await this._repo.getByEmail(email);
        if (!user) {
            throw new customError_1.CustomError('Invalid credentials', 401);
        }
        const isPasswordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordMatch) {
            throw new customError_1.CustomError('Invalid credentials', 401);
        }
        if (!user.is_email_confirmed) {
            const TEN_MINUTES_IN_MS = 1000 * 60 * 60 * 3.1;
            const timeSinceCreation = new Date().getTime() - new Date(user.created_at).getTime();
            if (timeSinceCreation > TEN_MINUTES_IN_MS) {
                throw new customError_1.CustomError('User not confirmed', 451);
            }
        }
        return (0, userMapping_1.toGet)(user);
    }
    async confirmEmail(id, isEditor) {
        const putUser = {
            is_email_confirmed: true,
            is_editor: isEditor,
        };
        return (0, userMapping_1.toGet)(await this._repo.update(id, putUser));
    }
    async updatePassword(id, password, oldPassword) {
        if (!this.passwordValidator(password)) {
            throw new customError_1.CustomError('Password is not strong enough', 400);
        }
        if (oldPassword) {
            const user = await this._repo.getById(id);
            const isPasswordMatch = await (0, bcrypt_1.compare)(oldPassword, user.password);
            if (!isPasswordMatch) {
                throw new customError_1.CustomError('Invalid credentials', 401);
            }
        }
        const putUser = {
            password: await (0, bcrypt_1.hash)(password, 10),
        };
        return (0, userMapping_1.toGet)(await this._repo.update(id, putUser));
    }
    async getByEmail(email) {
        const user = await this._repo.getByEmail(email);
        if (!user) {
            throw new customError_1.CustomError('User not found', 400);
        }
        return (0, userMapping_1.toGet)(user);
    }
    async requestRecovery(email) {
        const user = await this._repo.getByEmail(email);
        if (!user) {
            throw new customError_1.CustomError('User not found', 400);
        }
        if (!user.is_email_confirmed) {
            throw new customError_1.CustomError("You'r email is not confirmed, you cannot request password recovery.", 400);
        }
        return (0, userMapping_1.toGet)(user);
    }
    passwordValidator(password) {
        const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$');
        return true; // TODO: fix it later
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map