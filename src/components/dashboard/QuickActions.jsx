import React from "react";
import {
    Plus,
    Home,
    Plug,
    ClipboardList
} from "lucide-react";

export default function QuickActions({
    onNewAssessment,
    onHousehold,
    onAppliances,
    onAssessments
}) {
    const actions = [
        {
            label: "New Assessment",
            description: "Calculate a solar system",
            icon: Plus,
            onClick: onNewAssessment
        },
        {
            label: "Household",
            description: "Manage household details",
            icon: Home,
            onClick: onHousehold
        },
        {
            label: "Appliances",
            description: "Manage energy appliances",
            icon: Plug,
            onClick: onAppliances
        },
        {
            label: "Assessments",
            description: "View previous assessments",
            icon: ClipboardList,
            onClick: onAssessments
        }
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                    Quick Actions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Quickly access Solar Guard features.
                </p>
            </div>

            <div className="space-y-3">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={action.label}
                            type="button"
                            onClick={action.onClick}
                            className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition-colors hover:border-emerald-200 hover:bg-emerald-50"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                                <Icon className="h-5 w-5 text-emerald-600" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    {action.label}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                    {action.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}