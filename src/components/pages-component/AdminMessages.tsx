import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AdminSidebar from "@/components/functional/AdminSidebar";
import {
    deleteContact,
    getAdminMessages,
    getContactStats,
    markContactRead,
} from "@/service/authApi";
import type {
    IContactMessage,
    IContactStats,
} from "@/types/auth";

export default function AdminMessages() {
    const [messages, setMessages] = useState<IContactMessage[]>([]);
    const [stats, setStats] = useState<IContactStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMessages() {
            try {
                const [messageData, statsData] =
                    await Promise.all([
                        getAdminMessages(),
                        getContactStats(),
                    ]);

                setMessages(messageData);
                setStats(statsData);
            } catch (error: unknown) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unable to load messages";

                setError(message);
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadMessages();
    }, []);

    async function handleToggleRead(message: IContactMessage) {
        try {
            await markContactRead(
                message.id,
                !message.isRead
            );

            setMessages((currentMessages) =>
                currentMessages.map((currentMessage) =>
                    currentMessage.id === message.id
                        ? {
                            ...currentMessage,
                            isRead: !currentMessage.isRead,
                        }
                        : currentMessage
                )
            );

            toast.success(
                message.isRead
                    ? "Message marked as unread"
                    : "Message marked as read"
            );
        } catch (error: unknown) {
            const messageText =
                error instanceof Error
                    ? error.message
                    : "Unable to update message";

            toast.error(messageText);
        }
    }

    async function handleDelete(message: IContactMessage) {
        const confirmed = window.confirm(
            "Delete this contact message?"
        );

        if (!confirmed) return;

        try {
            await deleteContact(message.id);

            setMessages((currentMessages) =>
                currentMessages.filter(
                    (currentMessage) =>
                        currentMessage.id !== message.id
                )
            );

            toast.success("Message deleted");
        } catch (error: unknown) {
            const messageText =
                error instanceof Error
                    ? error.message
                    : "Unable to delete message";

            toast.error(messageText);
        }
    }

    return (
        <div className="min-h-screen bg-surface-base text-main">
            <AdminSidebar />

            <main className="min-h-screen px-6 py-14 transition-all md:pl-28">
                <div className="mx-auto max-w-7xl">
                    <p className="font-semibold uppercase tracking-widest text-secondary">
                        Administration
                    </p>

                    <h1 className="mt-3 text-4xl font-bold !text-primary">
                        Messages
                    </h1>

                    <p className="mt-3 text-muted">
                        Review and manage contact submissions.
                    </p>

                    {stats && (
                        <div className="mt-8 grid gap-5 sm:grid-cols-3">
                            <StatCard
                                label="Total"
                                value={stats.total}
                            />

                            <StatCard
                                label="Unread"
                                value={stats.unread}
                            />

                            <StatCard
                                label="Read"
                                value={stats.read}
                            />
                        </div>
                    )}

                    {isLoading && (
                        <p className="mt-8 text-muted">
                            Loading messages...
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
                                                Sender
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-heading">
                                                Subject
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-heading">
                                                Message
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-heading">
                                                Status
                                            </th>

                                            <th className="px-6 py-4 text-sm font-semibold text-heading">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {messages.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-6 py-10 text-center text-muted"
                                                >
                                                    No messages found.
                                                </td>
                                            </tr>
                                        ) : (
                                            messages.map((message) => (
                                                <tr
                                                    key={message.id}
                                                    className="border-b border-border-subtle align-top last:border-b-0 hover:bg-primary-light"
                                                >
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium text-heading">
                                                            {message.name}
                                                        </p>

                                                        <p className="text-sm text-muted">
                                                            {message.email}
                                                        </p>

                                                        <p className="text-sm text-muted">
                                                            {message.phone}
                                                        </p>
                                                    </td>

                                                    <td className="px-6 py-4 font-medium text-heading">
                                                        {message.subject}
                                                    </td>

                                                    <td className="max-w-sm px-6 py-4 text-muted">
                                                        {message.message}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={
                                                                message.isRead
                                                                    ? "rounded-full bg-secondary-light px-3 py-1 text-sm font-semibold text-secondary"
                                                                    : "rounded-full bg-primary-light px-3 py-1 text-sm font-semibold text-primary"
                                                            }
                                                        >
                                                            {message.isRead
                                                                ? "Read"
                                                                : "Unread"}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleToggleRead(
                                                                        message
                                                                    )
                                                                }
                                                                className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
                                                            >
                                                                {message.isRead
                                                                    ? "Mark unread"
                                                                    : "Mark read"}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        message
                                                                    )
                                                                }
                                                                className="rounded-lg bg-error px-3 py-2 text-sm font-semibold text-white hover:bg-error/80"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
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

function StatCard({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <section className="rounded-2xl border border-border-subtle bg-surface-card p-5 shadow-premium-sm">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 text-3xl font-bold !text-primary">
                {value}
            </p>
        </section>
    );
}