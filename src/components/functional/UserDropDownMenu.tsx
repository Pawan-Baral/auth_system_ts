
import { Button } from "@/components/ui/button"
import {
    UserRound,
    LayoutDashboard,
    ShieldCheck,
    LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/service/authApi";
import { useAuth } from "@/providers/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "react-toastify";

export default function UserDropdownMenu() {
    const navigate = useNavigate();
    const { isAdmin, user, endSession } = useAuth();
    const initials =
        user?.fullName
            ?.trim()
            .split(/\s+/)
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";
    async function handleLogout() {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.message);
        } finally {
            endSession();
            navigate("/login", { replace: true });
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-semibold text-primary shadow-sm transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        {initials}
                    </Button>
                }
            />

            <DropdownMenuContent

                className="w-60 bg-white"
            >
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">
                                {user.fullName}
                            </span>

                            <span className="text-xs font-normal text-slate-500">
                                {user.email}
                            </span>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="transition-colors hover:bg-slate-100 hover:text-blue-700"
                        onClick={() => navigate("/profile")}
                    >
                        <UserRound className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="transition-colors hover:bg-slate-100 hover:text-blue-700"
                        onClick={() => navigate("/dashboard")}
                    >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </DropdownMenuItem>

                    {isAdmin && (
                        <DropdownMenuItem
                            className="transition-colors hover:bg-slate-100 hover:text-blue-700"
                            onClick={() => navigate("/admin")}
                        >
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Admin Dashboard
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="transition-colors hover:bg-slate-100 hover:text-red-700"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>)
}
