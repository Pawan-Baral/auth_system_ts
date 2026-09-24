import { loginUser } from "@/service/authApi";
import { useNavigate, } from "react-router-dom"
import type { ILoginValues } from "@/types/auth";
import type React from "react";
function Login() {
    const navigate = useNavigate();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event?.currentTarget);
        const loginData: ILoginValues = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        try {
            const response = await loginUser(loginData);
            navigate("/home", { replace: true });
            console.log(response);

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <main className='flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8'>
                <form onSubmit={handleLogin}
                    className="flex w-full max-w-lg flex-col gap-5 rounded-2xl border border-slate-200 bg-red-300 p-6 shadow-lg">
                    <div className="mb-1 text-center">
                        <h1 className="text-3xl font-bold  tracking-tighter text-slate-900">Welcome backs</h1>
                        <p className="text-md text-slate-500"> Sign in to continue to your account.</p>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <label htmlFor="email"
                            className="text-sm w-20 font-medium text-slate-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Sachin.yadav@yahoo.com"
                            className="h-11 flex-1 w-full bg-white rounded-md px-3 text-slate-900 placeholder:text-slate-400 "
                        />
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <label htmlFor="password" className="text-sm w-20 font-medium text-slate-700">
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="h-11 flex-1 w-full bg-white rounded-md px-3 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>
                    <button type="submit" className="h-11 w-full bg-blue-600 rounded-md text-white hover:bg-blue-700 transition hover:-translate-y-1">Log in </button>
                </form>

            </main>
        </div>
    )
}

export default Login;