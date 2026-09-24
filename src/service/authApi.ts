import axios from "axios";

import type { ILoginValues, ILoginResponse, IRegisterValues, IRegisterResponse, IUser } from "@/types/auth";
//https://auth.durlavparajuli.com.np/ 
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export async function loginUser(values: ILoginValues): Promise<ILoginResponse> {
    const response = await api.post<ILoginResponse>("/api/auth/login", values);
    return response.data;

}
export async function registerUser(values: IRegisterValues): Promise<IRegisterResponse> {
    const response = await api.post<IRegisterResponse>("/api/auth/register", values);
    return response.data;

}
export async function getProfile(): Promise<IUser> {
    const response = await api.get<IUser>(
        "/api/profile"
    );

    return response.data;
}
