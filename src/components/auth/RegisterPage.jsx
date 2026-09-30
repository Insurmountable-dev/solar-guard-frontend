import React from "react";
import { Sun, ShieldCheck, ArrowLeft } from "lucide-react";

import RegisterForm from "./RegisterForm";

export default function RegisterPage({
    onSuccess,
    onLogin
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
                                    Plan your solar system with confidence.
                                </h2>

                                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                                    Create your Solar Guard account and begin
                                    your household assessment, energy analysis,
                                    and solar system sizing journey.
                                </p>
                            </div>

                            <div className="mt-10">
                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Household assessment
                                </div>

                                <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Energy consumption analysis
                                </div>

                                <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Solar system sizing
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-10">
                            <button
                                type="button"
                                onClick={onLogin}
                                className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to login
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Create your account
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Enter your details to get started with
                                    Solar Guard.
                                </p>
                            </div>

                            <RegisterForm
                                onSuccess={onSuccess}
                                onLogin={onLogin}
                            />
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