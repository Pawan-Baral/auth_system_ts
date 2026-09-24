export type UserRole = "user" | "admin";

export interface IUser {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: UserRole;
    createdAt?: string;
    updatedAt?: string;


}
export interface ILoginValues {
    email: string;
    password: string;
}
export interface IRegisterValues {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;

}
export interface ILoginResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
export interface IRegisterResponse {
    message: string;
    user: IUser;
}