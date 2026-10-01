import React from "react";
import { Sun, LogOut } from "lucide-react";

import Button from "../common/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardHeader() {
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
                        <Sun className="h-5 w-5 text-white" />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">
                            Solar Guard
                        </h1>

                        <p className="text-xs text-slate-500">
                            System Sizing & Assessment
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-slate-900">
                            {currentUser?.first_name}
                        </p>

                        <p className="text-xs text-slate-500">
                            {currentUser?.email}
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        icon={LogOut}
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                </div>
            </div>
        </header>
    );
}