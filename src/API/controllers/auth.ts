import { GetUserDTO } from '../../domain/DTOs/user/GetUserDTO';
import { PostUserDTO } from '../../domain/DTOs/user/PostUserDTO';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../../application/service/user.service';
import { CustomError } from '../../application/exception/customError';
import Token from '../../application/types/token';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import {
  generateAccess,
  generateConfirm,
  generateRecovery,
} from '../utils/tokens';
import { isEditor } from '../../application/utils/roleDetermine';
import Logger from '../../infrastructure/logger/consoleLogger';
import { config } from '../../config';
import { ServerError } from '../../application/exception/serverError';
import { getTokenType } from '../middlewares/authentication';

class AuthController {
  static userService: UserService;
  constructor(private _userService: UserService) {
    AuthController.userService = _userService;
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const postUser: PostUserDTO = req.body;
    let user: GetUserDTO;
    try {
      user = await AuthController.userService.register(postUser);
    } catch (error: Error | any) {
      if (error instanceof CustomError) {
        next(error);
      } else {
        next(new ServerError(error.message, 500, 'authController.register()'));
      }
      return;
    }

    const confirmToken = generateConfirm(
      user.id,
      user.email,
      isEditor(user.email),
    );
    const token = generateAccess(user.id, user.email, false);
    const emailCTA = `${config.devPathUrl}/confirm-email?token=${confirmToken}`;
    // TODO: Comment Out when sender is working
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
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    let user;
    try {
      user = await AuthController.userService.login(email, password);
    } catch (error: Error | any) {
      if (error instanceof CustomError) {
        next(error);
      } else {
        next(new ServerError(error.message, 500, 'authController.register()'));
      }
      return;
    }

    const accessToken = generateAccess(user.id, user.email, false);
    res.status(200).send({ success: true, token: accessToken });
  }
  async requestPasswordRecovery(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { email } = req.body;
    let user;
    try {
      user = await AuthController.userService.requestRecovery(email);
    } catch (error: Error | any) {
      if (error instanceof CustomError) {
        next(error);
      } else {
        next(new ServerError(error.message, 500, 'authController.register()'));
      }
      return;
    }
    const token = generateRecovery(user.id, user.email, user.is_editor);
    const emailCTA = `${config.devPathUrl}/password-recovery?token=${token}`;
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
  async changePassword(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user, tokenType } = req;
    const { password, oldPassword } = req.body;
    let updatedUser;
    try {
      if (tokenType === Token.RECOVERY_TOKEN && password) {
        updatedUser = await AuthController.userService.updatePassword(
          user.id,
          password,
        );
      } else if (password && oldPassword) {
        updatedUser = await AuthController.userService.updatePassword(
          user.id,
          password,
          oldPassword,
        );
      }
      if (!updatedUser) {
        throw new CustomError(
          'Invalid request, there are missing fields.',
          400,
        );
      }
    } catch (error: Error | any) {
      next(error);
      return;
    }

    // TODO: why to not send alert for the user?
    const token = generateAccess(
      updatedUser.id,
      updatedUser.email,
      updatedUser.is_editor,
    );
    res.status(200).send({ success: true, token });
  }
  async confirmEmail(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user, tokenType, isEditor } = req;
    if (tokenType !== Token.CONFIRM_TOKEN) {
      throw new CustomError('Invalid token', 401);
    }
    const updatedUser = await AuthController.userService.confirmEmail(
      user.id,
      isEditor!,
    );
    const token = generateAccess(
      updatedUser.id,
      updatedUser.email,
      updatedUser.is_editor,
    );
    res.status(200).send({ success: true, token });
  }
}

export default AuthController;
