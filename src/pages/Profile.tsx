
import { getProfile } from "@/service/authApi";
import type { IUser } from "@/types/auth";
import { useEffect, useState } from "react";


function Profile() {
    const [profile, setProfile] = useState<IUser | null>(null);
    const [error, setError] = useState<string | null>(null);
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
    if (!profile) {
        return <p>Loading profile...</p>;
    }
    return (
        <main className="">
            <h1 className="p-4 m-4 text-bold bg-slate-100">Profile</h1>
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    {profile.fullName}
                </h1>

                <p className="text-slate-500">
                    {profile.email}
                </p>
                <p className="text-slate-500">
                    {profile.phone}
                </p>
            </div>


        </main >
    );
}
export default Profile;
