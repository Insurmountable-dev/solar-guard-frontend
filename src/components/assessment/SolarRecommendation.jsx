import React from "react";

import {
    Sun,
    Battery,
    Zap,
    CheckCircle,
    Ruler
} from "lucide-react";

export default function SolarRecommendation({
    result
}) {
    if (!result) {
        return null;
    }

    const panelCount =
        Number(
            result.recommended_panel_count || 0
        );

    const batteryCount =
        Number(
            result.recommended_battery_count || 0
        );

    const inverterCount =
        Number(
            result.recommended_inverter_count || 0
        );

    const roofSufficient =
        Number(
            result.roof_area_sufficient
        ) === 1;

    return (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                    <CheckCircle
                        size={22}
                        className="text-green-600"
                    />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Solar Recommendation
                    </h2>

                    <p className="text-sm text-slate-500">
                        Recommended system based on the assessment calculation.
                    </p>
                </div>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <RecommendationCard
                    icon={
                        <Sun size={21} />
                    }
                    title="Solar Panels"
                    value={
                        `${panelCount} panel${panelCount === 1 ? "" : "s"}`
                    }
                    detail={
                        result.recommended_panel_id
                            ? `Panel ID: ${result.recommended_panel_id}`
                            : "No panel selected"
                    }
                />

                <RecommendationCard
                    icon={
                        <Battery size={21} />
                    }
                    title="Battery"
                    value={
                        `${batteryCount} unit${batteryCount === 1 ? "" : "s"}`
                    }
                    detail={
                        result.recommended_battery_id
                            ? `Battery ID: ${result.recommended_battery_id}`
                            : "No battery selected"
                    }
                />

                <RecommendationCard
                    icon={
                        <Zap size={21} />
                    }
                    title="Inverter"
                    value={
                        `${inverterCount} unit${inverterCount === 1 ? "" : "s"}`
                    }
                    detail={
                        result.recommended_inverter_id
                            ? `Inverter ID: ${result.recommended_inverter_id}`
                            : "No inverter selected"
                    }
                />

            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

                <Metric
                    label="Daily Energy"
                    value={
                        `${Number(
                            result.total_daily_energy_kwh || 0
                        ).toFixed(2)} kWh`
                    }
                />

                <Metric
                    label="Peak Load"
                    value={
                        `${Number(
                            result.peak_load_watts || 0
                        ).toFixed(0)} W`
                    }
                />

                <Metric
                    label="System Efficiency"
                    value={
                        `${Number(
                            result.system_efficiency_percent || 0
                        ).toFixed(0)}%`
                    }
                />

            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">

                <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                        <Ruler size={20} />
                    </div>

                    <div>

                        <h3 className="font-semibold text-slate-900">
                            Roof Capacity
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                            Available roof area:{" "}
                            <strong>
                                {Number(
                                    result.available_roof_area_m2 || 0
                                ).toFixed(2)}{" "}
                                m²
                            </strong>
                        </p>

                        <p className="text-sm text-slate-600">
                            Required panel area:{" "}
                            <strong>
                                {Number(
                                    result.required_panel_area_m2 || 0
                                ).toFixed(2)}{" "}
                                m²
                            </strong>
                        </p>

                        <p
                            className={`mt-3 text-sm font-semibold ${
                                roofSufficient
                                    ? "text-green-600"
                                    : "text-rose-600"
                            }`}
                        >
                            {roofSufficient
                                ? "✓ Roof area is sufficient for the recommended panels."
                                : "⚠ Roof area is not sufficient for the recommended panels."}
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

function RecommendationCard({
    icon,
    title,
    value,
    detail
}) {
    return (
        <div className="rounded-xl border border-slate-200 p-5">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    {icon}
                </div>

                <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {title}
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                        {value}
                    </p>

                </div>

            </div>

            <p className="mt-4 text-xs text-slate-500">
                {detail}
            </p>

        </div>
    );
}

function Metric({
    label,
    value
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
                {value}
            </p>

        </div>
    );
}