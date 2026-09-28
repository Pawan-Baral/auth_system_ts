import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t bg-slate-900 text-white">
            <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
                <div>
                    <h2 className="text-xl font-bold">
                        Auth System
                    </h2>

                    <p className="mt-3 text-sm text-slate-300">
                        Secure authentication and reliable services.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">Quick links</h3>

                    <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
                        <Link to="/home" className="hover:text-white">
                            Home
                        </Link>

                        <Link to="/services" className="hover:text-white">
                            Services
                        </Link>

                        <Link to="/contact" className="hover:text-white">
                            Contact
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold">Contact</h3>

                    <p className="mt-3 text-sm text-slate-300">
                        Email: mycompany@business.com
                    </p>

                    <p className="text-sm text-slate-300">
                        Phone: +977 98019230500
                    </p>
                </div>
            </div>

            <div className="border-t border-slate-700 py-4 text-center text-sm text-slate-400">
                © {new Date().getFullYear()} Ghar Dailo. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;