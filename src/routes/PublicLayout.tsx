
import { Outlet, } from "react-router-dom";
import Navbar from "@/pages/Navbar";
import Footer from "@/pages/Footer";

function PublicLayout() {


    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default PublicLayout;