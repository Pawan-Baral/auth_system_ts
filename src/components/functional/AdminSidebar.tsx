import { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
    { label: "Overview", icon: "▣", path: "/admin" },
    { label: "Users", icon: "♙", path: "/admin/users" },
    { label: "Messages", icon: "✉", path: "/admin/messages" },
    { label: "Services", icon: "◈", path: "/admin/services" },
];

function AdminSidebar() {
    const [isExpanded, setIsExpanded] =
        useState(false);

    return (
        <aside
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={`fixed left-0 top-0 z-50 flex h-screen flex-col
                bg-slate-900 text-white shadow-xl
                transition-all duration-300
                ${isExpanded ? "w-64" : "w-16"}`}
        >
            <div className="flex h-16 items-center border-b border-slate-700 px-4">
                <span className="text-xl">☰</span>

                <span
                    className={`ml-4 whitespace-nowrap font-bold transition-opacity
                    ${isExpanded ? "opacity-100" : "opacity-0"}`}
                >
                    Admin Panel
                </span>
            </div>

            <nav className="mt-4 flex flex-col gap-2 px-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/admin"}
                        className={({ isActive }) =>
                            `flex h-11 items-center rounded-md px-3
                            transition-colors
                            ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-300 hover:bg-slate-700 hover:text-white"
                            }`
                        }
                    >
                        <span className="w-6 text-center text-lg">
                            {item.icon}
                        </span>

                        <span
                            className={`ml-4 whitespace-nowrap transition-opacity
                            ${isExpanded
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                        >
                            {item.label}
                        </span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default AdminSidebar;