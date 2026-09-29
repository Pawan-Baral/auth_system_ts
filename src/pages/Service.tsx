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
        <main className="mx-auto max-w-6xl flex flex-col px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold">Our Services</h1>

            {services.length === 0 ? (
                <p className="text-gray-500">No services available.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <article
                            key={service.id || index}
                            className="flex flex-col overflow-hidden transition hover:-translate-y-1 rounded-xl border bg-white shadow-sm"
                        >
                            {service.image && (
                                <img
                                    src={`${API_BASE_URL}/public/${service.image}`}
                                    alt={service.title}
                                    className="h-48 w-full object-cover"
                                />
                            )}

                            <div className="p-6 flex flex-1 flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {service.title}
                                    </h2>

                                    <p className="mt-3 text-gray-600">
                                        {service.shortDescription || service.description}
                                    </p>

                                    {service.price !== undefined && (
                                        <p className="mt-4 font-semibold">
                                            {service.currency || "$"} {service.price}
                                        </p>
                                    )}

                                    {service.isActive !== undefined && (
                                        <p
                                            className={
                                                service.isActive
                                                    ? "mt-2 font-semibold text-green-600"
                                                    : "mt-2 font-semibold text-red-600"
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
                                                    className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Link
                                    to={`/services/${service.id}`}
                                    className="mt-5 inline-block text-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    View details
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}