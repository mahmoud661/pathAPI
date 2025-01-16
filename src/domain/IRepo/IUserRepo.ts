import { PostUserDTO } from '../DTOs/user/PostUserDTO';
import { IUser } from '../entities/IUser';

export interface IUserRepo {
  create(user: PostUserDTO, isEditor: boolean): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
}
