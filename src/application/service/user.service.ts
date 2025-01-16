import { PostUserDTO } from '../../domain/DTOs/user/PostUserDTO';
import { IUserRepo } from '../../domain/IRepo/IUserRepo';
import CustomError from '../exception/customError';
import { isEditor } from '../utils/roleDetermine';
import { toGet } from '../utils/userMapping';

export class UserService {
  constructor(private _repo: IUserRepo) {}

  async register(postUser: PostUserDTO) {
    if (!this.passwordValidator(postUser.password)) {
      throw new CustomError('Password is not strong enough', 400);
    }

    if (await this._repo.getByEmail(postUser.email)) {
      throw new CustomError('Email already exists, try to login', 400);
    }

    return toGet(await this._repo.create(postUser, isEditor(postUser.email)));
  }

  passwordValidator(password: string) {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
    );
    return password.match(regex);
  }
}
