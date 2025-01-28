"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../../application/exception/customError");
const token_1 = __importDefault(require("../../application/types/token"));
const tokens_1 = require("../utils/tokens");
const roleDetermine_1 = require("../../application/utils/roleDetermine");
const config_1 = require("../../config");
const serverError_1 = require("../../application/exception/serverError");
class AuthController {
    constructor(_userService) {
        this._userService = _userService;
        AuthController.userService = _userService;
    }
    async register(req, res, next) {
        const postUser = {
            ...req.body,
            email: req.body.email.toLowerCase(),
        };
        let user;
        try {
            user = await AuthController.userService.register(postUser);
        }
        catch (error) {
            if (error instanceof customError_1.CustomError) {
                next(error);
            }
            else {
                next(new serverError_1.ServerError(error.message, 500, 'authController.register()'));
            }
            return;
        }
        const confirmToken = (0, tokens_1.generateConfirm)(user.id, user.email, (0, roleDetermine_1.isEditor)(user.email));
        const token = (0, tokens_1.generateAccess)(user.id, user.email, false);
        const emailCTA = `${config_1.config.devPathUrl}/confirm-email?token=${confirmToken}`;
        // PostmarkSender.instance.confirmEmail(
        //   user.first_name,
        //   user.email,
        //   emailCTA,
        // );
        res.status(201).send({
            success: true,
            token,
            emailCTA, // TODO: remove this when sender is working
        });
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        let user;
        try {
            user = await AuthController.userService.login(email?.toLowerCase(), password);
        }
        catch (error) {
            if (error instanceof customError_1.CustomError) {
                next(error);
            }
            else {
                next(new serverError_1.ServerError(error.message, 500, 'authController.register()'));
            }
            return;
        }
        const accessToken = (0, tokens_1.generateAccess)(user.id, user.email, user.is_editor);
        res.status(200).send({ success: true, token: accessToken });
    }
    async requestPasswordRecovery(req, res, next) {
        const { email } = req.body;
        let user;
        try {
            user = await AuthController.userService.requestRecovery(email);
        }
        catch (error) {
            if (error instanceof customError_1.CustomError) {
                next(error);
            }
            else {
                next(new serverError_1.ServerError(error.message, 500, 'authController.register()'));
            }
            return;
        }
        const token = (0, tokens_1.generateRecovery)(user.id, user.email, user.is_editor);
        const emailCTA = `${config_1.config.devPathUrl}/password-recovery?token=${token}`;
        // TODO: sender.resetPassword not implemented, comment out ASAP
        // const sendingResult = PostmarkSender.instance.resetPassword(
        //   user.first_name,
        //   user.email,
        //   emailCTA,
        // );
        // TODO: remove token from the response.
        res.status(200).send({
            success: true,
            emailCTA, // TODO: Remove this when sender is working
        });
    }
    async changePassword(req, res, next) {
        const { user, tokenType } = req;
        const { password, oldPassword } = req.body;
        let updatedUser;
        try {
            if (tokenType === token_1.default.RECOVERY_TOKEN && password) {
                updatedUser = await AuthController.userService.updatePassword(user.id, password);
            }
            else if (password && oldPassword) {
                updatedUser = await AuthController.userService.updatePassword(user.id, password, oldPassword);
            }
            if (!updatedUser) {
                throw new customError_1.CustomError('Invalid request, there are missing fields.', 400);
            }
        }
        catch (error) {
            next(error);
            return;
        }
        // TODO: why to not send alert for the user?
        const token = (0, tokens_1.generateAccess)(updatedUser.id, updatedUser.email, updatedUser.is_editor);
        res.status(200).send({ success: true, token });
    }
    async confirmEmail(req, res, next) {
        const { user, tokenType, isEditor } = req;
        if (tokenType !== token_1.default.CONFIRM_TOKEN) {
            throw new customError_1.CustomError('Invalid token', 401);
        }
        const updatedUser = await AuthController.userService.confirmEmail(user.id, isEditor);
        const token = (0, tokens_1.generateAccess)(updatedUser.id, updatedUser.email, updatedUser.is_editor);
        res.status(200).send({ success: true, token });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map