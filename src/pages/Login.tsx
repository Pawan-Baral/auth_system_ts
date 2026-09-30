import { useState } from "react";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "@/service/authApi";
import { loginSchema } from "@/schemas/authSchema";
import type { ILoginValues } from "@/types/auth";
import { useAuth } from "@/providers/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { startSession } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik<ILoginValues>({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: loginSchema,

        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await loginUser(values);

                startSession(response);

                toast.success(
                    response.message || "Login successful"
                );

                navigate("/home", { replace: true });
            } catch (error: unknown) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unable to log in";

                toast.error(message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-surface-base px-4 py-8">
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-md rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-premium-md sm:p-8"
            >
                <div className="text-center">
                    <p className="font-semibold uppercase tracking-widest text-secondary">
                        Welcome back
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-heading">
                        Sign in to your account
                    </h1>

                    <p className="mt-3 text-muted">
                        Enter your details to continue.
                    </p>
                </div>

                <div className="mt-8 space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block font-medium text-heading"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-11 w-full rounded-lg border border-border-strong bg-surface-base px-3 text-main outline-none focus:border-primary"
                        />

                        {formik.touched.email &&
                            formik.errors.email && (
                                <p className="mt-1 text-sm text-error">
                                    {formik.errors.email}
                                </p>
                            )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block font-medium text-heading"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="h-11 w-full rounded-lg border border-border-strong bg-surface-base px-3 pr-12 text-main outline-none focus:border-primary"
                            />

                            <button
                                type="button"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                onClick={() =>
                                    setShowPassword((current) => !current)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>

                        {formik.touched.password &&
                            formik.errors.password && (
                                <p className="mt-1 text-sm text-error">
                                    {formik.errors.password}
                                </p>
                            )}
                    </div>

                    <div className="text-right">
                        <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-primary hover:text-primary-hover hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="h-11 w-full rounded-lg bg-primary font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {formik.isSubmitting
                            ? "Logging in..."
                            : "Log in"}
                    </button>

                    <p className="text-center text-sm text-muted">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-primary hover:text-primary-hover hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </form>
        </main>
    );
}