import { ProfileDTO } from '../../domain/DTOs/user/ProfileDTO';
import { IUserRepo } from '../../domain/IRepo/IUserRepo';
import { CustomError } from '../exception/customError';
import { toGet } from '../utils/userMapping';

export class ProfileService {
  constructor(private _repo: IUserRepo) {}

  async getProfile(userId: number) {
    const user = await this._repo.getById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return toGet(user);
  }

  async updateProfile(userId: number, profileData: ProfileDTO) {
    if (!Object.keys(profileData).length) {
      throw new CustomError('No data provided for update', 400);
    }

    const user = await this._repo.update(userId, profileData);
    return toGet(user);
  }
}