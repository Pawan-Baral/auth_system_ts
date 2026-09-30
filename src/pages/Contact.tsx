import { useFormik } from "formik";
import { toast } from "react-toastify";
import { submitContact } from "@/service/authApi";
import { contactSchema } from "@/schemas/authSchema";
import type { IContact } from "@/types/auth";

const initialValues: IContact = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

export default function Contact() {
    const formik = useFormik<IContact>({
        initialValues,
        validationSchema: contactSchema,

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await submitContact(values);

                toast.success(
                    response.message || "Message sent successfully"
                );

                resetForm();
            } catch (error: unknown) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Unable to send your message";

                toast.error(message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const getError = (field: keyof IContact) => {
        return formik.touched[field] && formik.errors[field]
            ? formik.errors[field]
            : null;
    };

    return (
        <main className="min-h-screen bg-surface-base px-6 py-14 text-main">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
                <section className="flex flex-col justify-center">
                    <p className="font-semibold uppercase tracking-widest text-secondary">
                        Get in touch
                    </p>

                    <h1 className="mt-4 text-4xl font-bold text-heading">
                        Lets talk about your project
                    </h1>

                    <p className="my-5 max-w-xl leading-7 text-muted">
                        Have a question or need help choosing a service?
                        Send us a message and our team will get back to you.
                    </p>

                    <div className="mt-8 rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-premium-sm">
                        <h2 className="text-xl font-semibold text-heading">
                            We value our customers
                        </h2>

                        <p className="mt-2 leading-7 text-muted">
                            Your feedback and questions help us provide better
                            solutions and support.
                        </p>
                    </div>
                </section>

                <form
                    onSubmit={formik.handleSubmit}
                    className="rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-premium-md sm:p-8"
                >
                    <h2 className="text-2xl font-bold text-heading">
                        Contact us
                    </h2>

                    <div className="mt-6 space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block font-medium text-heading"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full rounded-lg border border-border-strong bg-surface-base px-4 py-3 outline-none focus:border-primary"
                                placeholder="Your name"
                            />

                            {getError("name") && (
                                <p className="mt-1 text-sm text-error">
                                    {getError("name")}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block font-medium text-heading"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full rounded-lg border border-border-strong bg-surface-base px-4 py-3 outline-none focus:border-primary"
                                placeholder="you@example.com"
                            />

                            {getError("email") && (
                                <p className="mt-1 text-sm text-error">
                                    {getError("email")}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 block font-medium text-heading"
                            >
                                Phone
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full rounded-lg border border-border-strong bg-surface-base px-4 py-3 outline-none focus:border-primary"
                                placeholder="Your phone number"
                            />

                            {getError("phone") && (
                                <p className="mt-1 text-sm text-error">
                                    {getError("phone")}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="mb-2 block font-medium text-heading"
                            >
                                Subject
                            </label>

                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                value={formik.values.subject}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full rounded-lg border border-border-strong bg-surface-base px-4 py-3 outline-none focus:border-primary"
                                placeholder="What can we help with?"
                            />

                            {getError("subject") && (
                                <p className="mt-1 text-sm text-error">
                                    {getError("subject")}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="mb-2 block font-medium text-heading"
                            >
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full resize-none rounded-lg border border-border-strong bg-surface-base px-4 py-3 outline-none focus:border-primary"
                                placeholder="Write your message..."
                            />

                            {getError("message") && (
                                <p className="mt-1 text-sm text-error">
                                    {getError("message")}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {formik.isSubmitting
                                ? "Sending..."
                                : "Send message"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}