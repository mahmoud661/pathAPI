import { IUser } from '../../domain/entities/IUser';
import { GetUserDTO } from '../../domain/DTOs/user/GetUserDTO';

export function toGet(user: IUser): GetUserDTO {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    position: user.position,
    level: user.level,
    country: user.country,
    is_email_confirmed: user.is_email_confirmed,
    profile_image: user.profile_image,
    is_editor: user.is_editor,
    created_at: user.created_at,
  } as GetUserDTO;
}
