import React, { useState } from "react";
import RegisterPage from "./components/auth/RegisterPage";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);

    const handleRegisterSuccess = (userData) => {
        setCurrentUser(userData);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {currentUser ? (
                <div className="flex min-h-screen items-center justify-center px-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Account Created
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Welcome to Solar Guard.
                        </p>
                    </div>
                </div>
            ) : (
                <RegisterPage
                    onSuccess={handleRegisterSuccess}
                    onLogin={() => {
                        console.log("Login page coming next");
                    }}
                />
            )}
        </div>
    );
}