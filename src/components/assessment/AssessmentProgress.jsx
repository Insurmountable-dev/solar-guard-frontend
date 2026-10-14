import React from "react";
import { Users, Ruler, Plug, ClipboardCheck, Zap, Check } from "lucide-react";

const steps = [
    { number: 1, title: "Household",    icon: Users          },
    { number: 2, title: "Roof Details", icon: Ruler          },
    { number: 3, title: "Appliances",   icon: Plug           },
    { number: 4, title: "Review",       icon: ClipboardCheck },
    { number: 5, title: "Results",      icon: Zap            },
];

export default function AssessmentProgress({ currentStep = 1 }) {

    const current = steps.find((step) => step.number === currentStep) || steps[0];

    return (

        <nav aria-label="Assessment progress" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-emerald-900/5 sm:px-8 sm:py-6">

            <ol className="flex items-start">

                {steps.map((step, index) => {

                    const isComplete = currentStep > step.number;
                    const isCurrent = currentStep === step.number;
                    const Icon = step.icon;

                    return (

                        <React.Fragment key={step.number}>

                            <li aria-current={isCurrent ? "step" : undefined} className="flex shrink-0 flex-col items-center text-center sm:w-24" >

                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 sm:h-11 sm:w-11 ${
                                        isComplete
                                            ? "bg-emerald-600 text-white"
                                            : isCurrent
                                            ? "border-2 border-emerald-600 bg-white text-emerald-700 ring-4 ring-emerald-100"
                                            : "bg-slate-100 text-slate-400"
                                    }`}
                                >
                                    {isComplete ? (<Check className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />) : (<Icon className="h-4 w-4 sm:h-5 sm:w-5" />)}
                                    
                                </div>

                                {/* Labels show from sm up; screen readers always get them */}
                                <span
                                    className={`sr-only text-sm leading-tight sm:not-sr-only sm:mt-2.5 ${
                                        isCurrent
                                            ? "font-semibold text-slate-900"
                                            : isComplete
                                            ? "font-medium text-emerald-700"
                                            : "font-medium text-slate-400"
                                    }`}
                                >
                                    {step.title}
                                </span>

                            </li>

                            {index < steps.length - 1 && (
                                <div className="mx-1.5 mt-4 h-1 flex-1 overflow-hidden rounded-full bg-slate-100 sm:mx-0 sm:mt-5">
                                    <div
                                        className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                                        style={{ width: isComplete ? "100%" : "0%" }}
                                    />
                                </div>
                            )}

                        </React.Fragment>

                    );

                })}

            </ol>

            {/* Mobile only: names the current step, since the labels are hidden */}
            <p className="mt-4 text-center text-sm sm:hidden">
                <span className="text-slate-500">
                    Step {current.number} of {steps.length}:{" "}
                </span>
                <span className="font-semibold text-slate-900">{current.title}</span>
            </p>

        </nav>

    );

}