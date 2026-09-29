import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getServiceByIdOrSlug } from "@/service/authApi";

import Loader from "@/components/functional/Loader";
import type { IService } from "@/types/auth";

function ServiceDetails() {
    const { idOrSlug } = useParams<{ idOrSlug: string }>();
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const [service, setService] = useState<IService | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadService() {
            try {
                const data =
                    await getServiceByIdOrSlug(idOrSlug);

                setService(data);
            } catch (error: unknown) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadService();
    }, [idOrSlug]);
    if (!idOrSlug) {
        return <p>Invalid service URL.</p>;
    }

    if (isLoading) {
        return (
            <main className="mx-auto max-w-5xl px-6 py-12">
                <Loader />
            </main>
        );
    }

    if (error) {
        return (
            <main className=" flex flex-col mx-auto max-w-5xl px-6 py-12">
                <p className="text-red-600">{error}</p>

                <Link
                    to="/services"
                    className="mt-4 inline-block text-blue-600 hover:underline"
                >
                    Back to services
                </Link>
            </main>
        );
    }

    if (!service) {
        return (
            <main className="mx-auto max-w-5xl px-6 py-12">
                <p>Service not found.</p>
            </main>
        );
    }

    return (
        <main className=" flex flex-col mx-auto max-w-5xl px-6 py-12">
            <Link
                to="/services"
                className="text-blue-600 hover:underline"
            >
                ← Back to services
            </Link>

            <article className=" flex flex-col  mt-6 overflow-hidden rounded-2xl border bg-white shadow-lg">
                {service.image && (
                    <img
                        src={`${API_BASE_URL}/public/${service.image}`}
                        alt={service.title}
                        className="h-80 w-full object-cover"
                    />
                )}

                <div className=" flex flex-1 flex-col p-6 p-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                {service.title}
                            </h1>

                            <p className="mt-3 text-lg text-slate-600">
                                {service.shortDescription}
                            </p>
                        </div>

                        <span
                            className={
                                service.isActive
                                    ? "rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
                                    : "rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700"
                            }
                        >
                            {service.isActive
                                ? "Active"
                                : "Inactive"}
                        </span>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">
                                Price
                            </p>

                            <p className="mt-1 text-xl font-bold text-slate-900">
                                {service.price !== null &&
                                    service.price !== undefined
                                    ? `${service.currency || "USD"} ${service.price}`
                                    : "Not provided"}
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">
                                Display order
                            </p>

                            <p className="mt-1 text-xl font-bold text-slate-900">
                                {service.order ?? "N/A"}
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">
                                Slug
                            </p>

                            <p className="mt-1 break-words font-medium text-slate-900">
                                {service.slug}
                            </p>
                        </div>
                    </div>

                    <section className="mt-8">
                        <h2 className="text-xl font-semibold text-slate-900">
                            About this service
                        </h2>

                        <p className="mt-3 leading-7 text-slate-700">
                            {service.description}
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Technologies and tags
                        </h2>

                        {service.tags?.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-3 text-slate-500">
                                No tags available.
                            </p>
                        )}
                    </section>
                </div>
            </article>
        </main>
    );
}

export default ServiceDetails;