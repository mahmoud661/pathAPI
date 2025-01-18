export interface ProfileDTO {
  first_name?: string;
  last_name?: string;
  position?: string;
  level?: string;
  country?: string;
  profile_image?: Buffer | null;
}