import axios from "axios";

import type { ILoginValues, IServicePayload, IChangePasswordValues, IContactMessage, IContactStats, ILoginResponse, IRegisterValues, IRegisterResponse, IUser, ProfileResponse, IContact, IService, IContactResponse, IProfile } from "@/types/auth";
//https://auth.durlavparajuli.com.np/ 
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
api.interceptors.request.use(
    (config) => {
        // Example: Automatically attach a JWT authorization token from localStorage
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(
            `Sending ${(config.method ?? "request").toUpperCase()} request to ${config.url}`
        );
        return config; // You MUST return the config object, otherwise the request hangs
    },

);

export async function loginUser(values: ILoginValues): Promise<ILoginResponse> {
    const response = await api.post<ILoginResponse>("/api/auth/login", values);
    return response.data;

}
export async function registerUser(values: IRegisterValues): Promise<IRegisterResponse> {
    const response = await api.post<IRegisterResponse>("/api/auth/register", values);
    return response.data;

}
export async function getProfile(): Promise<ProfileResponse> {
    const response = await api.get<ProfileResponse>(
        "/api/profile"
    );

    return response.data;
}
export async function getServices() {
    const response = await api.get(
        "/api/services"
    );


    return response.data;
}
export async function submitContact(contactData: IContact): Promise<{ message: string }> {
    const response = await api.post<IContactResponse>(
        "/api/contact", contactData
    );

    return response.data;
}
export async function logoutUser() {
    const response = await api.post(
        "/api/auth/logout",
    );

    return response.data;
}
export async function getServiceByIdOrSlug(idOrSlug: string): Promise<IService> {
    const response = await api.get(`/api/services/${idOrSlug}`)
    return response.data;

}
export async function updateProfile(updatedProfileData: IProfile) {
    const response = await api.patch("api/profile", updatedProfileData);
    return response.data;
}
export async function changePassword(values: IChangePasswordValues): Promise<{ message: string }> {
    const response = await api.patch<{ message: string }>(
        "/api/profile/change-password",
        values
    );

    return response.data;
}
export async function getAdminUsers(): Promise<IUser[]> {
    const response = await api.get<IUser[]>("/api/admin/users");
    return response.data;
}
export async function getAdminMessages(): Promise<
    IContactMessage[]
> {
    const response = await api.get<IContactMessage[]>(
        "/api/contact"
    );

    return response.data;
}

export async function getContactStats(): Promise<IContactStats> {
    const response = await api.get<IContactStats>(
        "/api/contact/stats"
    );

    return response.data;
}

export async function markContactRead(
    id: string,
    isRead: boolean
): Promise<{ message: string }> {
    const response = await api.patch<{ message: string }>(
        `/api/contact/${id}/read`,
        { isRead }
    );

    return response.data;
}

export async function deleteContact(
    id: string
): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(
        `/api/contact/${id}`
    );

    return response.data;
}
export async function createService(
    data: FormData
): Promise<IService> {
    const response = await api.post<IService>(
        "/api/services",
        data
    );

    return response.data;
}

export async function updateService(
    id: string,
    data: FormData
): Promise<IService> {
    const response = await api.patch<IService>(
        `/api/services/${id}`,
        data
    );

    return response.data;
}

export async function deleteService(
    id: string
): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(
        `/api/services/${id}`
    );

    return response.data;
}

