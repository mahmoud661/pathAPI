import Router from 'express';
import notEmpty from '../middlewares/notEmpty';
import AuthController from '../controllers/auth';
import { UserRepo } from '../../infrastructure/repos/UserRepo';
import { UserService } from '../../application/service/user.service';
import { authenticate } from '../middlewares/authentication';

const router = Router();

// TODO: Automate this injection
// Dependency Injection
const repo = UserRepo.instance;
const userService = new UserService(repo);
const controller = new AuthController(userService);

router.post(
  '/register',
  notEmpty('first_name', 'last_name', 'email', 'password'),
  controller.register,
);

router.post('/login', notEmpty('email', 'password'), controller.login);

router.post(
  '/request-password-recovery',
  notEmpty('email'),
  controller.requestPasswordRecovery,
);

router.post(
  '/change-password',
  notEmpty('password'),
  authenticate,
  controller.changePassword,
);

router.post('/confirm-email', authenticate, controller.confirmEmail);

export default router;
