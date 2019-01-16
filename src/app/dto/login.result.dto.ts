export interface LoginResultDto {
    success: boolean;
    errors: string[];
    token: string;
    userName: string;
}
