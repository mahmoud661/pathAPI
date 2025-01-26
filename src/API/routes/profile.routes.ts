import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { ProfileService } from '../../application/service/profile.service';
import { UserRepo } from '../../infrastructure/repos/UserRepo';
import { authenticate } from '../middlewares/auth.guard';
import doNotAllow from '../middlewares/dataRestriction.guard';

const router = Router();

const userRepo = UserRepo.instance;
const profileService = new ProfileService(userRepo);
const controller = new ProfileController(profileService);

router.get(
  '/',
  doNotAllow('id', 'is_email_confirmed', 'is_editor'),
  authenticate(),
  controller.getProfile.bind(controller)
);

router.put(
  '/',
  doNotAllow('id', 'email', 'password', 'is_email_confirmed', 'is_editor'),
  authenticate(),
  controller.updateProfile.bind(controller)
);

export default router;