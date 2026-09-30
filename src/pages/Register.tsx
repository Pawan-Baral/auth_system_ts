import { useState } from "react";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "@/service/authApi";
import { registerSchema } from "@/schemas/authSchema";
import type { IRegisterValues } from "@/types/auth";

export default function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const formik = useFormik<IRegisterValues>({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },

        validationSchema: registerSchema,

        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await registerUser(values);

                toast.success(
                    response.message || "Account created successfully"
                );

                navigate("/login", { replace: true });
            } catch (error: unknown) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unable to create your account";

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
                className="w-full max-w-lg rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-premium-md sm:p-8"
            >
                <div className="text-center">
                    <p className="font-semibold uppercase tracking-widest text-secondary">
                        Get started
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-heading">
                        Create an account
                    </h1>

                    <p className="mt-3 text-muted">
                        Join us and start using our services.
                    </p>
                </div>

                <div className="mt-8 space-y-5">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="mb-2 block font-medium text-heading"
                        >
                            Full name
                        </label>

                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Your full name"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-11 w-full rounded-lg border border-border-strong bg-surface-base px-3 text-main outline-none focus:border-primary"
                        />

                        {formik.touched.fullName &&
                            formik.errors.fullName && (
                                <p className="mt-1 text-sm text-error">
                                    {formik.errors.fullName}
                                </p>
                            )}
                    </div>

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
                            htmlFor="phone"
                            className="mb-2 block font-medium text-heading"
                        >
                            Phone
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="9800000000"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="h-11 w-full rounded-lg border border-border-strong bg-surface-base px-3 text-main outline-none focus:border-primary"
                        />

                        {formik.touched.phone &&
                            formik.errors.phone && (
                                <p className="mt-1 text-sm text-error">
                                    {formik.errors.phone}
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
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Create a password"
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

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block font-medium text-heading"
                        >
                            Confirm password
                        </label>

                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Repeat your password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="h-11 w-full rounded-lg border border-border-strong bg-surface-base px-3 pr-12 text-main outline-none focus:border-primary"
                            />

                            <button
                                type="button"
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (current) => !current
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>

                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <p className="mt-1 text-sm text-error">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="h-11 w-full rounded-lg bg-primary font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {formik.isSubmitting
                            ? "Creating account..."
                            : "Create account"}
                    </button>

                    <p className="text-center text-sm text-muted">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-primary hover:text-primary-hover hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </main>
    );
}