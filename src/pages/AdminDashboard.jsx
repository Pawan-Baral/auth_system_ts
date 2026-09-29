import React, { useState } from 'react'


import AdminSidebar from "@/components/functional/AdminSidebar";

function AdminDashboard() {
    return (
        <div className="min-h-screen bg-surface">


            <main className="min-h-screen pl-16 p-8">
                <h1 className="text-3xl font-bold text-main">
                    Admin Dashboard
                </h1>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <section className="rounded-xl bg-white p-6 shadow">
                        <h2 className="font-semibold">
                            Total Users
                        </h2>
                        <p className="mt-3 text-3xl font-bold">
                            120
                        </p>
                    </section>

                    <section className="rounded-xl bg-white p-6 shadow">
                        <h2 className="font-semibold">
                            Messages
                        </h2>
                        <p className="mt-3 text-3xl font-bold">
                            24
                        </p>
                    </section>

                    <section className="rounded-xl bg-white p-6 shadow">
                        <h2 className="font-semibold">
                            Services
                        </h2>
                        <p className="mt-3 text-3xl font-bold">
                            18
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;