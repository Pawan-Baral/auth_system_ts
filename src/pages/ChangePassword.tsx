import { useState } from "react";
import { useFormik } from "formik";
import type { FormikProps } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { changePassword } from "@/service/authApi";
import { changePasswordSchema } from "@/schemas/authSchema";
import type { IChangePasswordValues } from "@/types/auth";

export default function ChangePassword() {
    const navigate = useNavigate();

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const formik = useFormik<IChangePasswordValues>({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },

        validationSchema: changePasswordSchema,

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await changePassword(values);

                toast.success(
                    response.message ||
                    "Password changed successfully"
                );

                resetForm();
                navigate("/profile");
            } catch (error: unknown) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unable to change password";

                toast.error(message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <main className="min-h-screen bg-surface-base px-6 py-14 text-main">
            <div className="mx-auto max-w-xl">
                <p className="font-semibold uppercase tracking-widest text-secondary">
                    Security
                </p>

                <h1 className="mt-3 text-4xl font-bold !text-primary">
                    Change password
                </h1>

                <p className="mt-3 text-muted">
                    Choose a strong password to keep your account secure.
                </p>

                <form
                    onSubmit={formik.handleSubmit}
                    className="mt-8 space-y-5 rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-premium-md sm:p-8"
                >
                    <PasswordField
                        formik={formik}
                        name="currentPassword"
                        label="Current password"
                        showPassword={showCurrentPassword}
                        onToggle={() =>
                            setShowCurrentPassword(
                                (current) => !current
                            )
                        }
                    />

                    <PasswordField
                        formik={formik}
                        name="newPassword"
                        label="New password"
                        showPassword={showNewPassword}
                        onToggle={() =>
                            setShowNewPassword(
                                (current) => !current
                            )
                        }
                    />

                    <PasswordField
                        formik={formik}
                        name="confirmPassword"
                        label="Confirm new password"
                        showPassword={showConfirmPassword}
                        onToggle={() =>
                            setShowConfirmPassword(
                                (current) => !current
                            )
                        }
                    />

                    <div className="flex flex-wrap gap-3 pt-3">
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {formik.isSubmitting
                                ? "Saving..."
                                : "Change password"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="rounded-lg bg-surface-base px-5 py-3 font-semibold text-heading transition hover:bg-border-subtle"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

interface PasswordFieldProps {
    formik: FormikProps<IChangePasswordValues>;
    name: keyof IChangePasswordValues;
    label: string;
    showPassword: boolean;
    onToggle: () => void;
}

function PasswordField({
    formik,
    name,
    label,
    showPassword,
    onToggle,
}: PasswordFieldProps) {
    const hasError =
        formik.touched[name] && formik.errors[name];

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block font-medium text-heading"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="h-11 w-full rounded-lg border border-border-strong bg-surface-base px-3 pr-12 text-main outline-none focus:border-primary"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                >
                    {showPassword ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                </button>
            </div>

            {hasError && (
                <p className="mt-1 text-sm text-error">
                    {String(formik.errors[name])}
                </p>
            )}
        </div>
    );
}