

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import UserDropdownMenu from "@/components/functional/UserDropdownMenu";
export default function Navbar() {
    const { user } = useAuth();
    const navigate = useNavigate();


    return (<>

        <div className="sticky top-0 z-50 flex h-16 items-center justify-between bg-white px-4 sm:px-6  bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
            <div className="flex items-center gap-2">
                <Link to="/home">
                    <img
                        src="/authentication-system-logo.svg"
                        alt="Auth System"
                        className="h-10 w-10"
                    />
                </Link>
                <span className="font-semibold text-white">
                    Auth System
                </span>

            </div>
            <nav className="hidden md:block ">
                <ul className="flex items-center   gap-6 list-none">

                    <li> <Link to="/home" className="text-slate-200 transition-colors hover:text-white" >Home</Link></li>
                    <li> <Link to="/services" className="text-slate-200 transition-colors hover:text-white"  >Services</Link></li>
                    <li><Link to="/contact" className="text-slate-200 transition-colors hover:text-white" >Contact</Link></li>
                </ul>
            </nav>
            <div className="flex items-center justify-self-end gap-3">
                {user ? (
                    <UserDropdownMenu />

                ) : (
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Log in
                    </button>
                )}
            </div>
        </div>
    </>);
}
