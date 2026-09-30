import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices, } from "@/service/authApi";
import type { IService } from "@/types/auth";
import Loader from "@/components/functional/Loader";
import { toast } from "react-toastify";

export default function Services() {
    const [services, setServices] = useState<IService[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        async function loadServices() {
            try {
                const data = await getServices();
                console.log("Services:", data);
                await delay(1500);
                setServices(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Something went wrong with services";
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        }

        loadServices();
    }, []);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-6xl px-6 py-12 text-center">
                <p className="text-red-600 font-semibold">{error}</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface-base px-6 py-14 text-main">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 max-w-2xl">
                    <p className="font-semibold uppercase tracking-widest text-secondary">
                        What we offer
                    </p>

                    <h1 className="text-4xl  font-bold text-heading">
                        Services built around your goals
                    </h1>
                </div>

                {services.length === 0 ? (
                    <p className="rounded-xl border border-border-subtle bg-surface-card p-8 text-center text-muted"></p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <article
                                key={service.id || index}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-premium-sm transition duration-300 hover:-translate-y-2 hover:border-border-accent hover:shadow-premium-lg"
                            >
                                {service.image && (
                                    <div className="overflow-hidden">
                                        <img
                                            src={`${API_BASE_URL}/public/${service.image}`}
                                            alt={service.title}
                                            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                <div className="p-6 flex flex-1 flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-heading">
                                            {service.title}
                                        </h2>

                                        <p className="mt-3 leading-7 text-muted">
                                            {service.shortDescription || service.description}
                                        </p>

                                        {service.price !== undefined && (
                                            <p className="mt-4 font-semibold text-primary">
                                                {service.currency || "$"} {service.price}
                                            </p>
                                        )}

                                        {service.isActive !== undefined && (
                                            <p
                                                className={
                                                    service.isActive
                                                        ? "mt-3 inline-block rounded-full bg-success-light px-3 py-1 text-sm font-semibold text-success"
                                                        : "mt-3 inline-block rounded-full bg-error-light px-3 py-1 text-sm font-semibold text-error"
                                                }
                                            >
                                                {service.isActive ? "Active" : "Inactive"}
                                            </p>
                                        )}

                                        {service.tags && service.tags.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {service.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        to={`/services/${service.id}`}
                                        className="mt-6 inline-block rounded-xl bg-primary px-4 py-3 text-center font-semibold text-white hover:bg-primary-hover"
                                    >
                                        View details
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main >
    );
}