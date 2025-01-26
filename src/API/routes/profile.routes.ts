import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { ProfileService } from '../../application/service/profile.service';
import { UserRepo } from '../../infrastructure/repos/UserRepo';
import { authenticate } from '../middlewares/auth.guard';

const router = Router();

const userRepo = UserRepo.instance;
const profileService = new ProfileService(userRepo);
const controller = new ProfileController(profileService);

router.get(
  '/',
  authenticate(),
  controller.getProfile.bind(controller)
);

router.put(
  '/',
  authenticate(),
  controller.updateProfile.bind(controller)
);

export default router;