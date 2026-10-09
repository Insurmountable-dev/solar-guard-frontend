import { useEffect, useRef, useState } from "react";
import { Sun, LogOut, ChevronDown } from "lucide-react";
import ConfirmDialog from "../common/ConfirmDialog";
import { useAuth } from "../../contexts/AuthProvider";
import { getInitials } from "../../utils/getInitials";




export default function DashboardHeader() {

    const {currentUser, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const menuRef = useRef(null);


    // Close the dropdown on outside click or Escape
    useEffect(() => {

        if (!menuOpen) return;

        const handleClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [menuOpen]);


    const openLogoutConfirm = () => {
        setMenuOpen(false);
        setConfirmOpen(true);
    };


    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            await logout();
        } finally {
            setIsLoggingOut(false);
            setConfirmOpen(false);
        }

    };

    const displayName = currentUser?.first_name || "there";

    return (

        <>
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
                            <Sun className="h-5 w-5 text-white" />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold leading-tight text-slate-900">Solar Guard</h1>
                            <p className="hidden text-xs text-slate-500 sm:block">System Sizing & Assessment</p>

                        </div>

                    </div>


                    <div ref={menuRef} className="relative">

                        <button
                            type="button"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            className="flex items-center gap-3 rounded-xl p-1.5 pr-2 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                                {getInitials(currentUser)}
                            </div>


                            <div className="hidden text-left sm:block">

                                <p className="text-sm font-semibold leading-tight text-slate-900">
                                    Hi, {displayName}
                                </p>

                                <p className="max-w-[180px] truncate text-xs text-slate-500">
                                    {currentUser?.email}
                                </p>

                            </div>


                            <ChevronDown
                                className={`h-4 w-4 text-slate-400 transition-transform ${
                                    menuOpen ? "rotate-180" : ""
                                }`}
                            />

                        </button>

                        {menuOpen && (

                            <div
                                role="menu"
                                className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
                            >

                                <div className="border-b border-slate-100 px-4 py-3">

                                    <p className="text-sm font-semibold text-slate-900">
                                        {currentUser?.first_name} {currentUser?.last_name}
                                    </p>

                                    <p className="truncate text-xs text-slate-500">
                                        {currentUser?.email}
                                    </p>

                                </div>


                                <div className="p-1.5">

                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={openLogoutConfirm}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Log out
                                    </button>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </header>


            <ConfirmDialog
                isOpen={confirmOpen}
                icon={LogOut}
                variant="danger"
                title="Log out of Solar Guard?"
                message="You will need to sign in again to continue your assessment."
                confirmLabel="Log out"
                cancelLabel="Stay signed in"
                loadingLabel="Logging out..."
                isLoading={isLoggingOut}
                onConfirm={handleLogout}
                onCancel={() => setConfirmOpen(false)}
            />

        </>

    );

}