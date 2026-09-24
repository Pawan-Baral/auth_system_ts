function Home() {
    return (
        <div>
            <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-6 py-10">
                <div className="mx-auto max-w-6xl space-y-12">
                    <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8  text-white shadow-xl">
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-left md:text-5xl">
                            Innovating the Digital Future
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-left text-blue-100 md:text-lg">
                            We are proud to deliver cutting-edge IT solutions designed to transform businesses.
                            From conceptual design to robust software deployment, global brands trust us to bring their vision to life.
                        </p>
                    </section>
                    <section>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                                Our Core Services
                            </h2>
                            <p className="mt-1 text-slate-600">
                                End-to-end digital expertise tailored for growing businesses.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Home;