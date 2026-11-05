import {Sun, House, Zap, ShieldCheck, ArrowUp} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="border-t border-slate-200 bg-white">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand Section */}
                    <div className="lg:col-span-2">

                        <Link
                            to="/"
                            className="mb-4 inline-flex items-center gap-3"
                        >

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-md shadow-blue-200">

                                <Sun size={24} strokeWidth={2.2} />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                                    Solar <span className="text-blue-600">Guard</span>
                                </h2>

                                <p className="text-xs font-medium text-slate-500">
                                    Smarter Solar Solutions
                                </p>

                            </div>

                        </Link>

                        <p className="max-w-md text-sm leading-7 text-slate-500">
                            Solar Guard helps households understand their energy
                            consumption, assess their solar potential, and discover
                            suitable solar system requirements for a brighter,
                            more energy-efficient future.
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2">

                            <ShieldCheck
                                size={16}
                                className="text-blue-600"
                            />

                            <span className="text-xs font-medium text-blue-700">
                                Smarter energy planning for every home
                            </span>

                        </div>

                    </div>


                    {/* Platform Links */}
                    <div>

                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
                            Platform
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    to="/dashboard"
                                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/assessments"
                                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    Solar Assessment
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/households"
                                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    Households
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/appliances"
                                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                                >
                                    Appliances
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* Features */}
                    <div>

                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
                            What We Offer
                        </h3>

                        <ul className="space-y-4">

                            <li className="flex items-start gap-3">

                                <div className="mt-0.5 rounded-lg bg-blue-50 p-2">

                                    <Zap
                                        size={16}
                                        className="text-blue-600"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-slate-800">
                                        Energy Insights
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Understand your daily energy usage.
                                    </p>

                                </div>

                            </li>

                            <li className="flex items-start gap-3">

                                <div className="mt-0.5 rounded-lg bg-amber-50 p-2">

                                    <Sun
                                        size={16}
                                        className="text-amber-500"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-slate-800">
                                        Solar Sizing
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Explore suitable solar system capacities.
                                    </p>

                                </div>

                            </li>

                            <li className="flex items-start gap-3">

                                <div className="mt-0.5 rounded-lg bg-emerald-50 p-2">

                                    <House
                                        size={16}
                                        className="text-emerald-600"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-slate-800">
                                        Household Planning
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Plan around your household's needs.
                                    </p>

                                </div>

                            </li>

                        </ul>

                    </div>

                </div>


                {/* Footer Divider */}
                <div className="my-10 border-t border-slate-100" />


                {/* Footer Bottom */}
                <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

                    <div className="text-center sm:text-left">

                        <p className="text-sm text-slate-500">
                            © {currentYear} Solar Guard. All rights reserved.
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Built for smarter solar energy planning in Kenya.
                        </p>

                    </div>


                    {/* Footer Actions */}
                    <div className="flex items-center gap-4">

                        <span className="hidden text-xs text-slate-400 sm:inline">
                            Powering a brighter future
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                })
                            }
                            aria-label="Back to top"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >

                            <ArrowUp size={18} />

                        </button>

                    </div>

                </div>

            </div>

        </footer>

    );

}