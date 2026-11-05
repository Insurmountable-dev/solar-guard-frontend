import { Users, Ruler, Plug, ClipboardCheck, Zap, Check } from "lucide-react";

const steps = [
    { number: 1, title: "Household", icon: Users },
    { number: 2, title: "Roof", icon: Ruler },
    { number: 3, title: "Appliances", icon: Plug },
    { number: 4, title: "Review", icon: ClipboardCheck },
    { number: 5, title: "Results", icon: Zap },
];

export default function AssessmentProgress({ currentStep = 1 }) {
    const activeStep = Math.min(
        steps.length,
        Math.max(1, Number(currentStep) || 1),
    );
    const progressPercent = ((activeStep - 1) / (steps.length - 1)) * 100;

    return (
        <nav
            aria-label="Assessment steps"
            className="w-full border-b border-slate-100 bg-white/90 px-2 py-3 backdrop-blur sm:px-5 sm:py-4"
        >
            <p className="sr-only">
                Step {activeStep} of {steps.length}: {steps[activeStep - 1].title}
            </p>

            <ol className="relative grid grid-cols-5">
                {/* Track */}
                <div
                    aria-hidden="true"
                    className="absolute left-[10%] right-[10%] top-[14px] h-1 overflow-hidden rounded-full bg-slate-100 sm:top-[18px]"
                >
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 transition-[width] duration-500 ease-out motion-reduce:transition-none"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                {steps.map((step) => {
                    const Icon = step.icon;
                    const active = activeStep === step.number;
                    const complete = activeStep > step.number;

                    return (
                        <li
                            key={step.number}
                            aria-current={active ? "step" : undefined}
                            className="relative z-10 flex min-w-0 flex-col items-center"
                        >
                            <div className="relative">
                                {/* Soft pulse behind the active step */}
                                {active && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 rounded-full bg-emerald-400/40 motion-safe:animate-ping"
                                    />
                                )}

                                <div
                                    className={[
                                        "relative flex h-[30px] w-[30px] shrink-0 items-center justify-center",
                                        "rounded-full transition-all duration-300 sm:h-[38px] sm:w-[38px]",
                                        active
                                            ? "scale-105 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-300/60 ring-4 ring-emerald-100"
                                            : complete
                                              ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-200"
                                              : "border-2 border-slate-200 bg-white text-slate-400",
                                    ].join(" ")}
                                >
                                    {complete ? (
                                        <Check
                                            size={16}
                                            strokeWidth={3}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Icon
                                            size={15}
                                            strokeWidth={2.25}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                            </div>

                            <span
                                className={[
                                    "mt-1.5 w-full truncate px-0.5 text-center",
                                    "text-[9px] leading-tight tracking-wide transition-colors duration-300",
                                    "sm:mt-2 sm:text-xs",
                                    active
                                        ? "font-bold text-emerald-700"
                                        : complete
                                          ? "font-semibold text-emerald-600"
                                          : "font-medium text-slate-400",
                                ].join(" ")}
                            >
                                {step.title}
                            </span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}