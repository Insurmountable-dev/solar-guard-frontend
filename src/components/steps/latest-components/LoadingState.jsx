import { useEffect, useState } from "react";
import { Sun, Zap } from "lucide-react";

const STEPS = [
    "Preparing your household data",
    "Calculating your daily energy needs",
    "Sizing your solar panels and battery",
    "Finalising your solar assessment",
];

export function LatestLoadingState() {

    const [step, setStep] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setStep((current) => (current + 1) % STEPS.length);

        }, 2200);

        return () => clearInterval(interval);


    }, []);

    return (

        <div role="status" aria-live="polite" className="mx-auto w-full max-w-5xl">

            <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-6 py-12 text-center text-white shadow-2xl sm:px-10">

                {/* Background glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl"
                />

                <div className="relative">

                    {/* Animated sun */}
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center">

                        <div
                            aria-hidden="true"
                            className="absolute inset-0 animate-pulse rounded-full bg-amber-400/15 blur-xl motion-reduce:animate-none"
                        />

                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200/20 bg-amber-300/10">
                            <Sun
                                size={38}
                                strokeWidth={1.4}
                                className="animate-spin text-amber-300 motion-reduce:animate-none"
                                style={{ animationDuration: "8s" }}
                            />
                        </div>
                    </div>

                    {/* Heading */}
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200/70">
                        Solar Guard
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                        Sizing your solar system
                    </h2>

                    <p className="mt-3 text-sm text-blue-100/65">
                        Please wait while we prepare your assessment results.
                    </p>

                    {/* Current step */}
                    <div className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">

                        <Zap
                            size={19}
                            className="shrink-0 text-amber-300"
                        />

                        <p
                            key={step}
                            className="text-sm font-medium text-blue-50"
                        >
                            {STEPS[step]}...
                        </p>

                    </div>

                    {/* Progress indicators */}
                    <div
                        className="mt-6 flex justify-center gap-2"
                        aria-hidden="true"
                    >
                        {STEPS.map((_, index) => (
                            <span
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    index === step
                                        ? "w-8 bg-amber-300"
                                        : "w-2 bg-blue-200/25"
                                }`}
                            />
                        ))}

                    </div>

                </div>
            </div>
        </div>
    );
};



export default function LoadingState() {

    return (
        
        <div className="animate-pulse space-y-5 p-5 sm:p-6" aria-busy="true">
            <div className="h-28 rounded-2xl bg-emerald-50/70" />
            <div className="flex gap-4">
                <div className="h-10 flex-1 rounded-xl bg-gray-100" />
                <div className="h-10 flex-1 rounded-xl bg-gray-100" />
            </div>
            <div className="h-12 rounded-xl bg-gray-100" />
        </div>
    );

};
