import React from "react";

export default function PreviousAssessments({
    assessments = [],
    onViewAssessment
}) {
    if (assessments.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                    Previous Assessments
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    No previous assessments available.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Previous Assessments
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Review your previous solar assessments.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {assessments.map((assessment) => {
                    const result = assessment.result;

                    const energy =
                        result?.energy || {};

                    const solar =
                        result?.solar || {};

                    const panel =
                        result?.panel || {};

                    const battery =
                        result?.battery || {};

                    const inverter =
                        result?.inverter || {};

                    const assessmentInfo =
                        result?.assessment || {};

                    const dailyEnergy =
                        energy.daily_energy_kwh;

                    const peakLoad =
                        energy.peak_load_watts;

                    const solarCapacity =
                        solar.required_capacity_watts;

                    const peakSunHours =
                        solar.peak_sun_hours;

                    const batteryCapacity =
                        battery.required_capacity_kwh;

                    const panelQuantity =
                        panel.quantity;

                    const batteryQuantity =
                        battery.quantity;

                    const inverterQuantity =
                        inverter.quantity;

                    const calculationDate =
                        assessmentInfo.calculation_date ||
                        assessment.updated_at ||
                        assessment.created_at;

                    return (
                        <div
                            key={assessment.assessment_id}
                            className="rounded-xl border border-slate-200 p-5"
                        >
                            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        {assessment.household_name ||
                                            "Household Assessment"}
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Assessment #
                                        {assessment.assessment_id}
                                    </p>

                                    {calculationDate && (
                                        <p className="mt-1 text-xs text-slate-400">
                                            {new Date(
                                                calculationDate
                                            ).toLocaleString()}
                                        </p>
                                    )}
                                </div>

                                <span
                                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                        assessment.assessment_status ===
                                        "completed"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-amber-100 text-amber-700"
                                    }`}
                                >
                                    {assessment.assessment_status}
                                </span>
                            </div>

                            {result ? (
                                <>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                        <Metric
                                            label="Daily Energy"
                                            value={
                                                dailyEnergy != null
                                                    ? `${Number(
                                                          dailyEnergy
                                                      ).toFixed(2)} kWh`
                                                    : "Unavailable"
                                            }
                                        />

                                        <Metric
                                            label="Peak Load"
                                            value={
                                                peakLoad != null
                                                    ? `${Number(
                                                          peakLoad
                                                      ).toLocaleString()} W`
                                                    : "Unavailable"
                                            }
                                        />

                                        <Metric
                                            label="Solar Required"
                                            value={
                                                solarCapacity != null
                                                    ? `${Number(
                                                          solarCapacity
                                                      ).toLocaleString()} W`
                                                    : "Unavailable"
                                            }
                                        />

                                        <Metric
                                            label="Peak Sun Hours"
                                            value={
                                                peakSunHours != null
                                                    ? `${Number(
                                                          peakSunHours
                                                      ).toFixed(2)} h/day`
                                                    : "Unavailable"
                                            }
                                        />

                                        <Metric
                                            label="Battery Required"
                                            value={
                                                batteryCapacity != null
                                                    ? `${Number(
                                                          batteryCapacity
                                                      ).toFixed(2)} kWh`
                                                    : "Unavailable"
                                            }
                                        />

                                        <Metric
                                            label="Panel Quantity"
                                            value={
                                                panelQuantity != null
                                                    ? `${panelQuantity}`
                                                    : "Unavailable"
                                            }
                                        />

                                        <Metric
                                            label="Battery Quantity"
                                            value={
                                                batteryQuantity != null
                                                    ? `${batteryQuantity}`
                                                    : "Unavailable"
                                            }
                                        />

                                        <Metric
                                            label="Inverter Quantity"
                                            value={
                                                inverterQuantity != null
                                                    ? `${inverterQuantity}`
                                                    : "Unavailable"
                                            }
                                        />
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-3">
                                        {panel.manufacturer &&
                                            panel.model && (
                                                <div className="rounded-lg bg-slate-50 px-4 py-3">
                                                    <p className="text-xs font-medium text-slate-500">
                                                        Recommended Panel
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                                        {panel.manufacturer}{" "}
                                                        {panel.model}
                                                    </p>
                                                </div>
                                            )}

                                        {battery.manufacturer &&
                                            battery.model && (
                                                <div className="rounded-lg bg-slate-50 px-4 py-3">
                                                    <p className="text-xs font-medium text-slate-500">
                                                        Recommended Battery
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                                        {battery.manufacturer}{" "}
                                                        {battery.model}
                                                    </p>
                                                </div>
                                            )}

                                        {inverter.manufacturer &&
                                            inverter.model && (
                                                <div className="rounded-lg bg-slate-50 px-4 py-3">
                                                    <p className="text-xs font-medium text-slate-500">
                                                        Recommended Inverter
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                                        {inverter.manufacturer}{" "}
                                                        {inverter.model}
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                </>
                            ) : (
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-sm text-slate-500">
                                        No calculation result is available
                                        for this assessment.
                                    </p>
                                </div>
                            )}

                            {onViewAssessment && (
                                <div className="mt-5">
                                    {/* <button
                                        type="button"
                                        onClick={() =>
                                            onViewAssessment(
                                                assessment.assessment_id
                                            )
                                        }
                                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        View Assessment
                                    </button> */}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Metric({
    label,
    value
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
                {value}
            </p>
        </div>
    );
}