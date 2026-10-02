import { useEffect, useState } from "react";
import { toast } from "react-toastify";


import { getAdminUsers } from "@/service/authApi";
import type { IUser } from "@/types/auth";

export default function AdminUsers() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await getAdminUsers();
                setUsers(data);
            } catch (error: unknown) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unable to load users";

                setError(message);
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadUsers();
    }, []);

    return (
        <div className="min-h-screen bg-surface-base w-full text-main">


            <main className="min-h-screen px-6 py-14 transition-all md:pl-28">
                <div className="mx-auto max-w-7xl">
                    <p className="font-semibold uppercase tracking-widest text-secondary">
                        Administration
                    </p>

                    <h1 className="mt-3 text-4xl font-bold !text-primary">
                        Users
                    </h1>

                    <p className="mt-3 text-muted">
                        View and manage registered users.
                    </p>

                    {isLoading && (
                        <p className="mt-8 text-muted">
                            Loading users...
                        </p>
                    )}

                    {error && (
                        <p className="mt-8 rounded-lg bg-error-light p-4 text-error">
                            {error}
                        </p>
                    )}

                    {!isLoading && !error && (
                        <div className="mt-8 overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-premium-md">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead className="border-b border-border-subtle bg-surface-base">
                                        <tr>
                                            <th className="px-6 py-4 text-sm font-semibold text-heading">
                                                Name
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-heading">
                                                Email
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-heading">
                                                Phone
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-heading">
                                                Role
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-10 text-center text-muted"
                                                >
                                                    No users found.
                                                </td>
                                            </tr>
                                        ) : (
                                            users.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="border-b border-border-subtle last:border-b-0 hover:bg-primary-light"
                                                >
                                                    <td className="px-6 py-4 font-medium text-heading">
                                                        {user.fullName}
                                                    </td>

                                                    <td className="px-6 py-4 text-muted">
                                                        {user.email}
                                                    </td>

                                                    <td className="px-6 py-4 text-muted">
                                                        {user.phone}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={
                                                                user.role ===
                                                                    "admin"
                                                                    ? "rounded-full bg-primary-light px-3 py-1 text-sm font-semibold text-primary"
                                                                    : "rounded-full bg-secondary-light px-3 py-1 text-sm font-semibold text-secondary"
                                                            }
                                                        >
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}