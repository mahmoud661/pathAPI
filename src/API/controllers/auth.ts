import { config } from '../../config';
import { GetUserDTO } from '../../domain/DTOs/user/GetUserDTO';
import { PostUserDTO } from '../../domain/DTOs/user/PostUserDTO';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { UserService } from '../../application/service/user.service';
import CustomError from '../../application/exception/customError';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import PostmarkSender from '../../infrastructure/emailSender/postmarkSender';
import Token from '../../application/types/token';

class AuthController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response): Promise<any> {
    const postUser: PostUserDTO = req.body;
    let user: GetUserDTO;
    try {
      user = await this.userService.register(postUser);
    } catch (error: Error | any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json({ message: 'Server Error' });
      return;
    }

    const confirmToken = sign(
      {
        user: { id: user.id, email: user.email },
        tokenType: Token.CONFIRM_TOKEN,
        isEditor: user.is_editor,
      },
      config.jwtSecret,
      { expiresIn: '1d' },
    );

    const accessToken = sign(
      {
        user: { id: user.id, email: user.email },
        tokenType: Token.ACCESS_TOKEN,
        isEditor: user.is_editor,
      },
      config.jwtSecret,
      { expiresIn: '5d' },
    );

    PostmarkSender.instance.confirmEmail(
      user.first_name,
      user.email,
      config.devpathUrl + '/confirm-email?token=' + confirmToken,
    );

    res.status(201).send({ success: true, token: accessToken });
  }
  async login(req: AuthenticatedRequest, res: Response) {
    res.send('login');
  }
  async requestPasswordRecovery(req: AuthenticatedRequest, res: Response) {
    res.send('request-password-recovery');
  }
  async changePassword(req: AuthenticatedRequest, res: Response) {
    res.send('change-password');
  }
  async confirmEmail(req: AuthenticatedRequest, res: Response) {
    res.send('confirm-email');
  }
}

export default AuthController;
