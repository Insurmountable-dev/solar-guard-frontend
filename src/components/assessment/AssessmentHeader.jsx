
import { Home, Sun, Clock, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AssessmentHeader({
    title = "Let's size your solar system",
    subtitle = "Answer a few quick questions about your home and the way you use power. We'll recommend the system that fits.",
    estimatedTime = "About 5 minutes",
}) {
    const navigate = useNavigate();


    return (
        <header className="relative isolate w-full overflow-hidden bg-emerald-950 text-white">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-emerald-700/60 sm:h-80 sm:w-80" />

                <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-emerald-700/40 sm:h-64 sm:w-64" />

                <div className="absolute right-6 top-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-800/80 text-amber-300 sm:right-12 sm:top-10 sm:h-20 sm:w-20">
                    <Sun
                        className="h-8 w-8 sm:h-11 sm:w-11"
                        strokeWidth={1.5}
                    />
                </div>
            </div>

            <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-7 pt-4 sm:px-7 sm:pb-9 sm:pt-6 lg:px-8 lg:pb-10">


                <button
                    type="button"
                    onClick={() => navigate("/", { replace: false })}
                    aria-label="Back to homepage"
                    className="group inline-flex min-h-11 items-center gap-3 rounded-xl border border-white/25 bg-white/10 py-1 pl-1.5 pr-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:border-amber-300/70 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 active:bg-white/30 sm:pr-5"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-800 transition-colors duration-200 group-hover:bg-amber-300 group-hover:text-emerald-950 sm:h-10 sm:w-10">
                        <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>

                    <span>Back to home</span>
                </button>


                <div className="mt-7 max-w-2xl sm:mt-9">

                    <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                        Solar Guard
                    </div>

                    <h1 className="max-w-xl break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                        {title}
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-100/85 sm:mt-4 sm:text-base sm:leading-7">
                        {subtitle}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">

                        <div className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-emerald-50 sm:text-sm">
                            <Clock className="h-4 w-4 shrink-0 text-amber-300" />
                            <span>{estimatedTime}</span>
                        </div>

                        <div className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-emerald-50 sm:text-sm">
                            <Save className="h-4 w-4 shrink-0 text-amber-300" />
                            <span>Save and finish later</span>
                        </div>

                    </div>

                </div>

            </div>

        </header>
    );
}
