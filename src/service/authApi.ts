import axios from "axios";

import type { ILoginValues, ILoginResponse, IRegisterValues, IRegisterResponse, IUser, ProfileResponse, IContact, IService, IContactResponse } from "@/types/auth";
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


