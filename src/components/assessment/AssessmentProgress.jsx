import React from "react";

const steps = [
    {
        number: 1,
        title: "Household"
    },
    {
        number: 2,
        title: "Roof Details"
    },
    {
        number: 3,
        title: "Appliances"
    },
    {
        number: 4,
        title: "Review"
    },
    {
        number: 5,
        title: "Results"
    }
];

export default function AssessmentProgress({
    currentStep
}) {
    return (
        <div className="mb-8">

            <div className="flex items-center justify-between">

                {steps.map((step, index) => (
                    <React.Fragment
                        key={step.number}
                    >

                        <div className="flex flex-col items-center">

                            <div
                                className={`
                                    flex h-10 w-10 items-center justify-center
                                    rounded-full text-sm font-semibold
                                    transition
                                    ${
                                        currentStep >= step.number
                                            ? "bg-green-600 text-white"
                                            : "bg-slate-200 text-slate-500"
                                    }
                                `}
                            >
                                {step.number}
                            </div>

                            <span
                                className={`
                                    mt-2 hidden text-xs font-medium sm:block
                                    ${
                                        currentStep >= step.number
                                            ? "text-green-600"
                                            : "text-slate-500"
                                    }
                                `}
                            >
                                {step.title}
                            </span>

                        </div>

                        {index < steps.length - 1 && (
                            <div
                                className={`
                                    mx-2 h-1 flex-1 rounded
                                    ${
                                        currentStep > step.number
                                            ? "bg-green-600"
                                            : "bg-slate-200"
                                    }
                                `}
                            />
                        )}

                    </React.Fragment>
                ))}

            </div>

        </div>
    );
}