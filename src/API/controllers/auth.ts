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
        next(new CustomError(error.message, 500, 'authController.register()'));
      }
      return;
    }

    const confirmToken = generateConfirm(
      user.id,
      user.email,
      isEditor(user.email),
    );
    const accessToken = generateAccess(user.id, user.email, false);

    // TODO: Comment Out when sender is working
    // PostmarkSender.instance.confirmEmail(
    //   user.first_name,
    //   user.email,
    //   config.devpathUrl + '/confirm-email?token=' + confirmToken,
    // );

    res
      .status(201) // TODO: Remove emailCTA from res
      .send({
        success: true,
        token: accessToken,
        emailCTA: `localhost:5178/confirm-email?token=${confirmToken}`,
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
        next(new CustomError(error.message, 500, 'authController.register()'));
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
        next(new CustomError(error.message, 500, 'authController.register()'));
      }
      return;
    }
    const token = generateRecovery(user.id, user.email, user.is_editor);

    // TODO: sender.resetPassword not implemented, comment out ASAP
    // const sendingResult = PostmarkSender.instance.resetPassword(
    //   user.first_name,
    //   user.email,
    //   config.devpathUrl + '/password-recovery?token=' + token,
    // );
    // TODO: remove token from the response.
    res
      .status(200)
      .send({
        success: true,
        emailCTA: `localhost:5178/password-recovery?token=${token}`,
      });
  }
  async changePassword(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { password, oldPassword, user, tokenType } = req.body;
    let updatedUser;
    if (tokenType === Token.RECOVERY_TOKEN && password) {
      updatedUser = await AuthController.userService.updatePassword(
        user.id,
        password,
      );
    } else if (password && oldPassword && password === oldPassword) {
      updatedUser = await AuthController.userService.updatePassword(
        user.id,
        password,
      );
    }
    if (!updatedUser) throw new CustomError('Password not match', 400);

    // TODO: why to not send alert for the user?
    const accessToken = generateAccess(
      updatedUser.id,
      updatedUser.email,
      updatedUser.is_editor,
    );
    res.status(200).send({ success: true, token: accessToken });
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
    const accessToken = generateAccess(
      updatedUser.id,
      updatedUser.email,
      updatedUser.is_editor,
    );
    res.status(200).send({ success: true, token: accessToken });
  }
}

export default AuthController;
