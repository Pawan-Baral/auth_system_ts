import type { ReactNode } from "react";
import type { IUser, ILoginResponse, ILoginValues } from "@/types/auth";
import { createContext, useContext, useState } from "react";
interface AuthContextValue {
    user: IUser | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    startSession: (data: ILoginResponse) => void;
    endSession: () => void;

}
interface AuthProviderProps {
    children: ReactNode;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);



export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<IUser | null>(() => {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser) as IUser;
        } catch {
            localStorage.removeItem("user");
            return null;
        }

    });

    function startSession(data: ILoginResponse) {
        if (!data.user) {
            throw new Error("Login response does not contain a user")
        }
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

    }
    function endSession() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        setUser(null);
    }
    const contextValue: AuthContextValue = {
        user,
        isAuthenticated: Boolean(localStorage.getItem("accessToken")),
        isAdmin: user?.role === "admin",
        startSession,
        endSession,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be inside Auth Provider");
    }
    return context;
}