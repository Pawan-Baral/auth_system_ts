import { registerUser } from "@/service/authApi";
import type { IRegisterValues } from "@/types/auth";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    async function handleRegistration(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event?.currentTarget);
        const registerData: IRegisterValues = {
            fullName: formData.get("fullName") as string,
            phone: formData.get("phone") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,

        };
        try {
            const response = await registerUser(registerData);
            navigate("/login");
            console.log(response);

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <main className='flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8'>
                <form onSubmit={handleRegistration}
                    className="flex w-full max-w-lg flex-col gap-5 rounded-2xl border border-slate-200 bg-red-300 p-6 shadow-lg">
                    <div className="mb-1 text-center">
                        <h1 className="text-3xl font-bold tracking-tighter text-slate-900">Create an account</h1>
                        <p className="text-md text-slate-500">Sign up to get started.</p>
                    </div>

                    <div className="flex flex-row items-center gap-4">
                        <label htmlFor="name" className="w-20 text-sm font-medium text-slate-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="fullName"
                            type="text"
                            placeholder="Sachin Yadav"
                            className="h-11 flex-1 rounded-md bg-white px-3 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-4">
                        <label htmlFor="email" className="w-20 text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Sachin.yadav@yahoo.com"
                            className="h-11 flex-1 rounded-md bg-white px-3 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-4">
                        <label htmlFor="phone" className="w-20 text-sm font-medium text-slate-700">
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 234 567 890"
                            className="h-11 flex-1 rounded-md bg-white px-3 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex flex-row items-center gap-4">
                        <label htmlFor="password" className="w-20 text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            className="h-11 flex-1 rounded-md bg-white px-3 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <label htmlFor="confirmPassword" className="w-20 text-sm font-medium text-slate-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Create a password"
                            className="h-11 flex-1 rounded-md bg-white px-3 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <button className="h-11 w-full rounded-md bg-indigo-950 text-white transition hover:-translate-y-1 hover:bg-blue-700">
                        Sign up
                    </button>
                </form>
            </main>
        </div>
    )
}

export default Register;