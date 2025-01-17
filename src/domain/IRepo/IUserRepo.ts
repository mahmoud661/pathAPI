import { PostUserDTO } from '../DTOs/user/PostUserDTO';
import { PutUserDTO } from '../DTOs/user/PutUserDTO';
import { IUser } from '../entities/IUser';

export interface IUserRepo {
  create(user: PostUserDTO): Promise<IUser>;
  update(id: number, user: PutUserDTO): Promise<IUser>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
}
