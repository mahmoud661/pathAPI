export interface PutUserDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  position?: string;
  level?: string;
  country?: string;
  is_email_confirmed?: boolean;
  profile_image?: Buffer | null;
  is_editor?: boolean;
}
