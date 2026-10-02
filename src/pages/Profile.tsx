
import { profileSchema } from "@/schemas/authSchema";
import { getProfile, updateProfile } from "@/service/authApi";
import type { IProfile, IUser } from "@/types/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import type { FormikProps } from "formik";


function Profile() {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeForm, setActiveForm] = useState<"profile" | null>(null);
    const Formik = useFormik<IProfile>({
        enableReinitialize: true,

        initialValues: {
            fullName: profile?.fullName || "",
            email: profile?.email || "",
            phone: profile?.phone || "",
        },
        validationSchema: profileSchema,

        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await updateProfile(values);

                if (!profile) return;

                const updatedUser = {
                    ...profile,
                    ...values,
                };

                setProfile(updatedUser);
                localStorage.setItem("user", JSON.stringify(updateProfile));
                setActiveForm(null);
                toast.success(response?.message || "Profile updated Successfully");

            } catch (error: unknown) {
                const message = (error instanceof Error ? error.message : "Unable to update the profile");
                setError(message);
                console.log("Unable to update the profile");
            }
            finally {
                setSubmitting(false);
            }
        }
    })
    useEffect(() => {

        async function loadProfile() {

            try {
                const response = await getProfile();
                console.log(response);
                setProfile(response);
            } catch (error: unknown) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load profile"
                );
            }

        }
        loadProfile();
    }, []);
    function cancelFormEditing() {
        Formik.resetForm();
        setActiveForm(null);
    }
    if (error) {
        return (
            <p className="text-red-600">
                {error}
            </p>
        );
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (


        <main className="min-h-screen bg-surface-base px-6 py-14 text-main">
            <div className="mx-auto max-w-3xl">
                {activeForm === null && (
                    <>
                        <div className="mb-8">
                            <p className="font-semibold uppercase tracking-widest text-secondary">Account</p>
                            <h1 className="mt-3 text-4xl font-bold !text-primary">My Profile</h1>
                            <p className="mt-3 text-muted">
                                View and manage your personal information.
                            </p>
                        </div>

                        <section className="rounded-2xl border border-border-subtle bg-surface-card  p-6 shadow-premium-md sm:p-8">
                            <div className="flex flex-col gap-5 border-b border-border-subtle p-6 sm:flex-row sm:items-center">
                                <div className=" flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                                    {profile.fullName
                                        .split(" ")
                                        .map((name) => name[0])
                                        .join("")
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </div>
                                <div>

                                    <h2 className="text-2xl font-bold !text-primary ">
                                        {profile.fullName}
                                    </h2>

                                    <p className="mt-1 text-muted">
                                        {profile.email}
                                    </p>
                                    <p className="mt-1 text-muted">
                                        {profile.phone}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="rounded-lg border border-border-strong bg-surface-base p-4">
                                    <p className="text-sm text-muted">Full Name</p>
                                    <p className="mt-1 font-medium text-heading">{profile.fullName}</p>
                                </div>
                            </div>
                            <div className="rounded-lg border border-border-subtle bg-surface-base p-4">
                                <p className="text-sm text-muted">Email</p>
                                <p className="mt-1 font-medium text-heading">
                                    {profile.email}
                                </p>
                            </div>

                            <div className="rounded-lg border border-border-subtle bg-surface-base p-4">
                                <p className="text-sm text-muted">Phone</p>
                                <p className="mt-1 font-medium text-heading">
                                    {profile.phone}
                                </p>
                            </div>

                            <div className="rounded-lg border border-border-subtle bg-surface-base p-4">
                                <p className="text-sm text-muted">Role</p>
                                <p className="mt-1 font-medium text-heading">
                                    {profile.role}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveForm("profile")}
                                className="mt-8 rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary-hover"
                            >
                                Edit Profile
                            </button>
                        </section>

                        {/* existing profile header, details, and Edit button */}
                    </>
                )}


                {activeForm === "profile" && (
                    <form
                        onSubmit={Formik.handleSubmit}
                        className="space-y-5"
                    >
                        <h2 className="text-2xl font-bold !text-primary">
                            Edit profile
                        </h2>

                        <ProfileInput
                            formik={Formik}
                            name="fullName"
                            label="Full name"
                        />

                        <ProfileInput
                            formik={Formik}
                            name="email"
                            label="Email"
                            type="email"
                        />

                        <ProfileInput
                            formik={Formik}
                            name="phone"
                            label="Phone"
                            type="tel"
                        />

                        <div className="flex flex-wrap gap-3 pt-3">
                            <button
                                type="submit"
                                disabled={Formik.isSubmitting}
                                className="rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
                            >
                                {Formik.isSubmitting
                                    ? "Saving..."
                                    : "Save changes"}
                            </button>

                            <button
                                type="button"
                                onClick={cancelFormEditing}
                                className="rounded-lg bg-surface-base px-5 py-3 font-semibold text-heading hover:bg-border-subtle"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>


        </main >
    )
}
export default Profile;

interface ProfileInputProps {
    formik: FormikProps<IProfile>;
    name: keyof IProfile;
    label: string;
    type?: string;
}

function ProfileInput({ formik, name, label, type = "text" }: ProfileInputProps) {
    const hasError = formik.touched[name] && formik.errors[name];
    return (
        <div>
            <label htmlFor={name} className="font-medium text-muted">{label}</label>

            <input
                id={name}
                name={name}
                type={type}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full rounded-md border border-border-strong bg-surface-base p-2 outline-none focus:border-border-strong"
            />
            {hasError && (
                <p className="mt-1 text-sm text-error">{formik.errors[name]}</p>
            )}
        </div>
    )
}

