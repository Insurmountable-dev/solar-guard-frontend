import React, { useState } from "react";

import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";

export default function App() {
    const [currentView, setCurrentView] = useState("login");
    const [currentUser, setCurrentUser] = useState(null);

    const handleLoginSuccess = (userData) => {
        setCurrentUser(userData);
        setCurrentView("dashboard");
    };

    const handleRegisterSuccess = (userData) => {
        setCurrentUser(userData);
        setCurrentView("dashboard");
    };

    if (currentView === "register") {
        return (
            <RegisterPage
                onSuccess={handleRegisterSuccess}
                onLogin={() => setCurrentView("login")}
            />
        );
    }

    if (currentView === "dashboard") {
        return (
            <div className="min-h-screen bg-slate-50">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">
                                Solar Guard
                            </h1>

                            <p className="text-xs text-slate-500">
                                System Sizing & Assessment
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setCurrentUser(null);
                                setCurrentView("login");
                            }}
                            className="text-sm font-medium text-slate-500 hover:text-emerald-600"
                        >
                            Log out
                        </button>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-6 py-10">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Welcome to Solar Guard
                    </h2>

                    <p className="mt-2 text-slate-500">
                        {currentUser?.first_name
                            ? `Welcome, ${currentUser.first_name}.`
                            : "Your solar assessment dashboard will appear here."}
                    </p>
                </main>
            </div>
        );
    }

    return (
        <LoginPage
            onSuccess={handleLoginSuccess}
            onRegister={() => setCurrentView("register")}
            onForgotPassword={() => {
                alert("Password reset flow coming soon.");
            }}
        />
    );
}