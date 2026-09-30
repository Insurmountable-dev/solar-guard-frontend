import React from "react";
import { Sun, ShieldCheck } from "lucide-react";

import LoginForm from "./LoginForm";

export default function LoginPage({
    onSuccess,
    onRegister,
    onForgotPassword
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
                            <Sun className="h-5 w-5 text-white" />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-slate-900">
                                Solar Guard
                            </h1>

                            <p className="text-xs text-slate-500">
                                System Sizing & Assessment
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="px-4 py-10 sm:px-6">
                <div className="mx-auto max-w-5xl">
                    <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
                        <div className="hidden bg-slate-900 p-10 lg:flex lg:flex-col lg:justify-between">
                            <div>
                                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">
                                    <ShieldCheck className="h-6 w-6 text-white" />
                                </div>

                                <h2 className="max-w-md text-3xl font-bold leading-tight text-white">
                                    Manage your solar assessment in one place.
                                </h2>

                                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                                    Sign in to continue your household
                                    assessment, review your energy usage,
                                    and work with your solar system results.
                                </p>
                            </div>

                            <div className="mt-10 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Household assessment
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Energy consumption analysis
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Solar system sizing
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center p-6 sm:p-10">
                            <div className="w-full">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                        Welcome back
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Sign in to continue to Solar Guard.
                                    </p>
                                </div>

                                <LoginForm
                                    onSuccess={onSuccess}
                                    onRegister={onRegister}
                                    onForgotPassword={onForgotPassword}
                                />
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-slate-400">
                        Solar Guard • Solar System Sizing & Assessment
                    </p>
                </div>
            </main>
        </div>
    );
}