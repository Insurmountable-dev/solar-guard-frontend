import React from "react";
import { Sun, Battery, Zap, Gauge } from "lucide-react";

export default function RecentAssessment({
    assessment = null
}) {
    if (!assessment) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Recent Solar Assessment
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Your latest solar system assessment will appear here.
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 px-5 py-8 text-center">
                    <Sun className="mx-auto h-8 w-8 text-emerald-500" />

                    <p className="mt-3 text-sm font-medium text-slate-700">
                        No assessment available
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Create your first assessment to see the results.
                    </p>
                </div>
            </div>
        );
    }

    const results = [
        {
            label: "Daily Energy",
            value: `${assessment.dailyEnergy ?? 0} kWh`,
            icon: Sun
        },
        {
            label: "Peak Load",
            value: `${assessment.peakLoad ?? 0} W`,
            icon: Gauge
        },
        {
            label: "Solar Required",
            value: `${assessment.solarRequired ?? 0} W`,
            icon: Zap
        },
        {
            label: "Battery",
            value: `${assessment.batteryCapacity ?? 0} kWh`,
            icon: Battery
        }
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Recent Solar Assessment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {assessment.householdName || "Household assessment"}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {results.map((result) => {
                    const Icon = result.icon;

                    return (
                        <div
                            key={result.label}
                            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-emerald-600" />

                                <span className="text-xs font-medium text-slate-500">
                                    {result.label}
                                </span>
                            </div>

                            <p className="mt-2 text-lg font-bold text-slate-900">
                                {result.value}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}