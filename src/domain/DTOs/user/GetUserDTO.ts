export interface GetUserDTO {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    position?: string;
    level?: string;
    country?: string;
    is_email_confirmed: boolean;
    profile_image?: Buffer | null;
    is_editor:boolean;
}