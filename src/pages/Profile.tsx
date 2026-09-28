import { profileSchema } from "@/schemas/authSchema";
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
                setProfile(response.user ?? response);
            } catch (error) {
                console.log(error);

            }

        }
        loadProfile();
    }, []);
    if (!profile) {
        return <p>Loading profile...</p>;
    }
    if (error) {
        return <p>{error}</p>;
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
            </div>


        </main >
    );
}
export default Profile;
