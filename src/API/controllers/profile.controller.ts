import { Response, NextFunction } from 'express';
import { ProfileService } from '../../application/service/profile.service';
import AuthenticatedRequest from '../types/AuthenticatedRequest';
import { CustomError } from '../../application/exception/customError';

export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const profile = await this.profileService.getProfile(req.user.id);
      res.status(200).json({ success: true, profile });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.id) {
        throw new CustomError('Not authenticated', 401);
      }

      const profile = await this.profileService.updateProfile(req.user.id, req.body);
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      next(error);
    }
  }
}