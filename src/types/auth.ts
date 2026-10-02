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
export interface ProfileResponse extends IUser { }
export interface IService {
    id: string;
    slug?: string;
    title: string;
    shortDescription?: string;
    description: string;
    price?: number;
    icon?: string;
    image?: string;
    currency?: string;
    isActive?: boolean;
    tags?: string[];
    order?: number;

}
export interface IContact {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}
export interface IContactResponse {
    message: string;
}
export type AdminActiveSection = "overview" | "messages" | "services" | "users";
export interface IProfile {
    fullName: string;
    email: string;
    phone: string;
    id?: string;
    role?: string;
    password?: string;
    resetToken?: string;
    resetTokenExpiry?: string;
}
export interface IChangePasswordValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export interface IContactMessage extends IContact {
    id: string;
    isRead: boolean;
    createdAt?: string;
}

export interface IContactStats {
    total: number;
    read: number;
    unread: number;
}
export interface IServicePayload {
    title: string;
    shortDescription: string;
    description: string;
    price: number;
    currency: string;
    image?: string | File | null;
    isActive: boolean;
    tags: string[];
}