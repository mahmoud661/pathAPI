import Router from 'express';
import notEmpty from '../middlewares/notEmpty';
import AuthController from '../controllers/auth';
import { UserRepo } from '../../infrastructure/repos/UserRepo';
import { UserService } from '../../application/service/user.service';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import { authMiddleware } from '../middlewares/authentication';
import Token from '../../application/types/token';

const router = Router();

// TODO: Automate this injection
// Dependency Injection
const repo = UserRepo.instance;
const userService = new UserService(repo);
const controller = new AuthController(userService);

router.post(
  '/register',
  notEmpty('firstName', 'lastName', 'email', 'password'),
  (req, res) => controller.register(req, res),
);

router.post('/login', notEmpty('email', 'password'), (req, res) => {
  res.send('login');
});

router.post('/request-password-recovery', notEmpty('email'), (req, res) => {
  res.send('request-password-recovery');
});

router.post('/change-password', notEmpty('newPassword'), (req, res) => {
  res.send('change-password');
});

router.post(
  '/confirm-email',
  authMiddleware(Token.CONFIRM_TOKEN), // Only allow confirm tokens
  (req, res) => {
    const user = req.user;
    const tokenType = req.tokenType;
    const isEditor = req.isEditor;
    res.json({ message: 'Email confirmed!', user, tokenType, isEditor });
  },
);

export default router;
