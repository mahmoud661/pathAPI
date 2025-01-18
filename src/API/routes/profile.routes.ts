import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { ProfileService } from '../../application/service/profile.service';
import { UserRepo } from '../../infrastructure/repos/UserRepo';
import { authenticate } from '../middlewares/authentication';

const router = Router();

const userRepo = UserRepo.instance;
const profileService = new ProfileService(userRepo);
const profileController = new ProfileController(profileService);

// Get user profile
router.get(
  '/',
  authenticate,
  profileController.getProfile
);

// Update user profile
router.put(
  '/',
  authenticate,
  profileController.updateProfile.bind(profileController)
);

export default router;