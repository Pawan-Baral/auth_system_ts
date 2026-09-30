import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import { useEffect, useState } from "react";
import { getServices } from "@/service/authApi";
import type { IService } from "@/types/auth";
import Loader from "@/components/functional/Loader";
import { toast } from "react-toastify";
import { Check } from 'lucide-react';

const API_BASE_URL =
    import.meta.env.VITE_API_URL;

export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [services, setServices] = useState<IService[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadServices() {
            try {
                const data = await getServices();

                setServices(data);
            } catch (error: unknown) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unable to load services";

                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        }

        loadServices();
    }, []);
    const customerValues = [
        {
            title: "Clear communication",
            description:
                "We keep every step understandable, visible, and aligned with your goals.",
        },
        {
            title: "Reliable delivery",
            description:
                "We focus on maintainable solutions that are designed to grow with your business.",
        },
        {
            title: "Customer-first support",
            description:
                "Your feedback matters before, during, and after the project is delivered.",
        },
    ];

    return (
        <main className="min-h-screen bg-surface-base text-main">
            <section className="relative overflow-hidden  rounded-xl bg-primary px-6 py-18 text-white">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                    <div className="">
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                            Welcome, {user?.fullName || "Valued Guest"}
                        </span>

                        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                            Technology that helps your business move forward.
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                            We create practical digital solutions that are
                            reliable, understandable, and built around your needs.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/services"
                                className="rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-premium-md hover:text-white hover:bg-primary-hover"
                            >
                                Explore services
                            </Link>

                            <Link
                                to="/contact"
                                className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
                            >
                                Talk to us
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16">
                <div className="max-w-2xl">
                    <p className="font-semibold uppercase tracking-widest text-secondary">
                        Why choose us
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-heading">
                        Built around people, not just technology.
                    </h2>

                    <p className="mt-4 text-muted">
                        Our approach makes it easier to understand what we do and
                        how our services can help your organization.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {customerValues.map((value) => (
                        <article
                            key={value.title}
                            className="rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-premium-sm transition hover:-translate-y-1 hover:shadow-premium-md"
                        >
                            <Check className="text-secondary" />

                            <h3 className="mt-5 text-xl font-semibold text-heading">
                                {value.title}
                            </h3>

                            <p className="mt-3 leading-7 text-muted">
                                {value.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-16">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="font-semibold uppercase tracking-widest text-primary">
                            What we offer
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-heading">
                            Services designed for your next step.
                        </h2>
                    </div>

                    <Link
                        to="/services"
                        className="font-semibold text-primary hover:text-primary-hover"
                    >
                        View all services ➤
                    </Link>
                </div>

                {isLoading ? (
                    <div className="mt-10">
                        <Loader />
                    </div>
                ) : services.length === 0 ? (
                    <p className="mt-10 text-muted">
                        No services are available right now.
                    </p>
                ) : (
                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <article
                                key={service.id}
                                onClick={() =>
                                    navigate(`/services/${service.id}`)
                                }
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-premium-sm transition duration-300 hover:-translate-y-2 hover:border-border-accent hover:shadow-premium-lg"
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

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-heading">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 line-clamp-3 leading-7 text-muted">
                                        {service.shortDescription ||
                                            service.description}
                                    </p>

                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="font-semibold text-primary">
                                            {service.currency || "USD"}{" "}
                                            {service.price ?? "Contact us"}
                                        </span>

                                        <span className="text-sm font-semibold text-secondary">
                                            Details →
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}