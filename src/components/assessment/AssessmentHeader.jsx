import { Home, Sun, Clock, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import   Button from "../common/Button";

export default function AssessmentHeader({
    title = "Let's size your solar system",
    subtitle = "Answer a few quick questions about your home and the way you use power. We'll recommend the system that fits.",
    estimatedTime = "About 5 minutes",
}) {

    const navigate = useNavigate();

    return (

        
        <header className="relative isolate w-full max-w-full overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700">

            {/* Decorative layer: its own clipping box so nothing can widen the page */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">

                {/* Sun glow, decorative */}
                <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
                <div className="absolute -right-10 -top-12 h-52 w-52 rounded-full border border-amber-200/20" />
                <div className="absolute -right-2 top-0 h-36 w-36 rounded-full border border-amber-200/30" />
                <Sun
                    className="absolute right-6 top-6 h-20 w-20 text-amber-300 sm:right-16 sm:top-8 sm:h-28 sm:w-28"
                    strokeWidth={1.25}
                />

            </div>

            {/* Extra bottom padding leaves room for the progress card to overlap */}
            <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-4 sm:px-6 sm:pb-24 sm:pt-6">

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    aria-label="Back to homepage"
                    className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-white/10 py-1 pl-1 pr-4 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 ring-1 ring-inset ring-white/25 backdrop-blur-md transition duration-200 hover:bg-white/20 hover:ring-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 active:scale-95 motion-reduce:transition-none sm:h-12 sm:gap-3 sm:pr-5"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm transition duration-200 group-hover:-translate-x-0.5 group-hover:bg-amber-300 group-hover:text-emerald-900 motion-reduce:transition-none sm:h-10 sm:w-10">
                    <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>

                    <span className="sm:hidden">Home</span>
                    <span className="hidden sm:inline">Back to home</span>
                    
                </button>

                <div className="mt-8 min-w-0 max-w-2xl sm:mt-10">

                    <h1 className="break-words text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{title}</h1>

                    <p className="mt-3 text-base leading-relaxed text-emerald-50/80">{subtitle}</p>

                    <div className="mt-6 flex flex-wrap items-center gap-2">

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20">
                            <Clock className="h-3.5 w-3.5 text-amber-300" />
                            {estimatedTime}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20">
                            <Save className="h-3.5 w-3.5 text-amber-300" />
                            Save and finish later
                        </span>

                    </div>

                </div>

            </div>

        </header>

    );

}