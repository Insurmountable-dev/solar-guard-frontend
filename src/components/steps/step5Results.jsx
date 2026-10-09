import React from "react";

export default function Step5Results({
    result,
    onFinish,
    onNavigate
}) {
    console.log("STEP 5 RAW RESULT:", result);

    const normalizeResult = (result) => {
        if (!result) {
            return {};
        }

        /*
         * Already formatted API result.
         */
        if (
            result.energy ||
            result.solar ||
            result.panel ||
            result.battery ||
            result.inverter ||
            result.roof
        ) {
            return result;
        }

        /*
         * Flat calculation result.
         */
        return {
            assessment: {
                assessment_id:
                    result.assessment_id,

                result_id:
                    result.result_id,

                calculation_date:
                    result.calculation_date
            },

            energy: {
                daily_energy_wh:
                    Number(
                        result.total_daily_energy_wh
                    ) || 0,

                daily_energy_kwh:
                    Number(
                        result.total_daily_energy_kwh
                    ) || 0,

                peak_load_watts:
                    Number(
                        result.peak_load_watts
                    ) || 0
            },

            solar: {
                required_capacity_watts:
                    Number(
                        result.required_solar_capacity_watts
                    ) || 0,

                peak_sun_hours:
                    Number(
                        result.peak_sun_hours
                    ) || 0,

                system_efficiency_percent:
                    Number(
                        result.system_efficiency
                    ) * 100 || 0
            },

            panel: {
                panel_id:
                    result.selected_panel?.panel_id ||
                    null,

                manufacturer:
                    result.selected_panel?.manufacturer ||
                    null,

                model:
                    result.selected_panel?.model ||
                    null,

                type:
                    result.selected_panel?.panel_type ||
                    null,

                rated_power_watts:
                    Number(
                        result.selected_panel
                            ?.rated_power_watts
                    ) || 0,

                efficiency_percent:
                    Number(
                        result.selected_panel
                            ?.efficiency_percent
                    ) || 0,

                quantity:
                    Number(
                        result.selected_panel
                            ?.panel_count
                    ) || 0,

                status:
                    result.selected_panel?.status ||
                    "Unavailable"
            },

            battery: {
                battery_id:
                    result.selected_battery?.battery_id ||
                    null,

                manufacturer:
                    result.selected_battery?.manufacturer ||
                    null,

                model:
                    result.selected_battery?.model ||
                    null,

                type:
                    result.selected_battery?.battery_type ||
                    null,

                energy_capacity_kwh:
                    Number(
                        result.selected_battery
                            ?.energy_capacity_kwh
                    ) || 0,

                depth_of_discharge_percent:
                    Number(
                        result.selected_battery
                            ?.depth_of_discharge_percent
                    ) || 0,

                efficiency_percent:
                    Number(
                        result.selected_battery
                            ?.efficiency_percent
                    ) || 0,

                quantity:
                    Number(
                        result.selected_battery
                            ?.battery_count
                    ) || 0,

                required_capacity_kwh:
                    Number(
                        result.required_battery_capacity_kwh
                    ) || 0,

                status:
                    result.selected_battery?.status ||
                    "Unavailable"
            },

            inverter: {
                inverter_id:
                    result.selected_inverter?.inverter_id ||
                    null,

                manufacturer:
                    result.selected_inverter?.manufacturer ||
                    null,

                model:
                    result.selected_inverter?.model ||
                    null,

                type:
                    result.selected_inverter?.inverter_type ||
                    null,

                rated_power_watts:
                    Number(
                        result.selected_inverter
                            ?.rated_power_watts
                    ) || 0,

                maximum_surge_watts:
                    Number(
                        result.selected_inverter
                            ?.maximum_surge_watts
                    ) || 0,

                maximum_pv_input_watts:
                    Number(
                        result.selected_inverter
                            ?.maximum_pv_input_watts
                    ) || 0,

                efficiency_percent:
                    Number(
                        result.selected_inverter
                            ?.efficiency_percent
                    ) || 0,

                required_capacity_watts:
                    Number(
                        result.required_inverter_capacity_watts
                    ) || 0,

                quantity:
                    Number(
                        result.selected_inverter
                            ?.inverter_count
                    ) || 0,

                status:
                    result.selected_inverter?.status ||
                    "Unavailable"
            },

            roof: {
                available_area_m2:
                    Number(
                        result.available_roof_area_m2
                    ) || 0,

                required_panel_area_m2:
                    Number(
                        result.required_panel_area_m2
                    ) || 0,

                sufficient:
                    Boolean(
                        result.roof_area_sufficient
                    )
            }
        };
    };

    const data = normalizeResult(result);

    console.log(
        "STEP 5 NORMALIZED RESULT:",
        data
    );

    const assessment =
        data.assessment || {};

    const energy =
        data.energy || {};

    const solar =
        data.solar || {};

    const panel =
        data.panel || {};

    const battery =
        data.battery || {};

    const inverter =
        data.inverter || {};

    const roof =
        data.roof || {};

    const hasValue = (value) => {
        return (
            value !== null &&
            value !== undefined &&
            value !== ""
        );
    };

    const formatNumber = (
        value,
        decimals = 2
    ) => {
        if (
            value === null ||
            value === undefined ||
            Number.isNaN(Number(value))
        ) {
            return "N/A";
        }

        return Number(value).toLocaleString(
            undefined,
            {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }
        );
    };

    const formatWatts = (value) => {
        if (!hasValue(value)) {
            return "N/A";
        }

        const watts = Number(value);

        if (watts >= 1000) {
            return `${formatNumber(
                watts / 1000
            )} kW`;
        }

        return `${formatNumber(
            watts
        )} W`;
    };

    const getStatusClasses = (
        status
    ) => {
        if (
            String(status)
                .toLowerCase() ===
            "available"
        ) {
            return "border-emerald-200 bg-emerald-50 text-emerald-700";
        }

        return "border-amber-200 bg-amber-50 text-amber-700";
    };

    const handleFinish = () => {
        console.log(
            "STEP 5 FINISH CLICKED"
        );

        if (onFinish) {
            onFinish();
            return;
        }

        if (onNavigate) {
            onNavigate("dashboard");
        }
    };

    /*
     * Only show the unavailable state if there is
     * genuinely no calculation result at all.
     */
    const hasCalculation =
        Object.keys(data).length > 0 &&
        (
            hasValue(
                energy.daily_energy_kwh
            ) ||
            hasValue(
                solar.required_capacity_watts
            ) ||
            hasValue(
                energy.peak_load_watts
            )
        );

    if (!hasCalculation) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
                        <span className="text-2xl">
                            ⚠️
                        </span>
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-slate-900">
                        Assessment Result Unavailable
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                        No calculation result was
                        returned for this assessment.
                    </p>

                    <button
                        type="button"
                        onClick={handleFinish}
                        className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <p className="text-sm font-medium text-emerald-600">
                    Step 5 of 5
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900">
                    Solar Assessment Results
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Your household energy requirements
                    and recommended solar system sizing.
                </p>

                {hasValue(
                    assessment.assessment_id
                ) && (
                    <p className="mt-2 text-xs text-slate-400">
                        Assessment #
                        {assessment.assessment_id}
                    </p>
                )}
            </div>

            {/* Energy Summary */}
            <div>
                <h2 className="mb-3 text-lg font-bold text-slate-900">
                    Energy Requirements
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Daily Energy
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {formatNumber(
                                energy.daily_energy_kwh
                            )}{" "}
                            kWh
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            {formatNumber(
                                energy.daily_energy_wh,
                                0
                            )} Wh/day
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Peak Load
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {formatWatts(
                                energy.peak_load_watts
                            )}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Maximum estimated load
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Peak Sun Hours
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {formatNumber(
                                solar.peak_sun_hours
                            )}{" "}
                            h/day
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Used for solar sizing
                        </p>
                    </div>

                </div>
            </div>

            {/* Solar System Sizing */}
            <div>
                <h2 className="mb-3 text-lg font-bold text-slate-900">
                    Solar System Sizing
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <p className="text-sm font-medium text-emerald-700">
                            Required Solar Capacity
                        </p>

                        <p className="mt-2 text-2xl font-bold text-emerald-900">
                            {formatWatts(
                                solar.required_capacity_watts
                            )}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-sm font-medium text-slate-500">
                            Required Battery
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {formatNumber(
                                battery.required_capacity_kwh
                            )}{" "}
                            kWh
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-sm font-medium text-slate-500">
                            Required Inverter
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {formatWatts(
                                inverter.required_capacity_watts
                            )}
                        </p>
                    </div>

                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-600">
                        System efficiency:{" "}
                        <span className="font-semibold text-slate-900">
                            {formatNumber(
                                solar.system_efficiency_percent
                            )}
                            %
                        </span>
                    </p>
                </div>
            </div>

            {/* Recommended Panel */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Recommended Solar Panel
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Panel selected from the solar reference database.
                        </p>
                    </div>

                    <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            panel.status
                        )}`}
                    >
                        {panel.status}
                    </span>

                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div>
                        <p className="text-xs text-slate-400">
                            Manufacturer
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {panel.manufacturer ||
                                "Unavailable"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Model
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {panel.model ||
                                "Unavailable"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Rated Power
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {hasValue(
                                panel.rated_power_watts
                            )
                                ? `${formatNumber(
                                      panel.rated_power_watts,
                                      0
                                  )} W`
                                : "N/A"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Quantity
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {panel.quantity || "N/A"}
                        </p>
                    </div>

                </div>
            </div>

            {/* Battery */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Recommended Battery
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Battery selected from the solar reference database.
                        </p>
                    </div>

                    <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            battery.status
                        )}`}
                    >
                        {battery.status}
                    </span>

                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div>
                        <p className="text-xs text-slate-400">
                            Manufacturer
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {battery.manufacturer ||
                                "Unavailable"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Model
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {battery.model ||
                                "Unavailable"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Capacity
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {hasValue(
                                battery.energy_capacity_kwh
                            )
                                ? `${formatNumber(
                                      battery.energy_capacity_kwh
                                  )} kWh`
                                : "N/A"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Quantity
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                            {battery.quantity || "N/A"}
                        </p>
                    </div>

                </div>
            </div>

            {/* Inverter */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Recommended Inverter
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Inverter selection based on the calculated load.
                        </p>
                    </div>

                    <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            inverter.status
                        )}`}
                    >
                        {inverter.status}
                    </span>

                </div>

                {String(
                    inverter.status
                ).toLowerCase() ===
                    "unavailable" ? (
                    <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-sm font-semibold text-amber-800">
                            No suitable inverter is currently available.
                        </p>

                        <p className="mt-1 text-sm text-amber-700">
                            Required inverter capacity:{" "}
                            <span className="font-semibold">
                                {formatWatts(
                                    inverter.required_capacity_watts
                                )}
                            </span>
                        </p>

                        <p className="mt-1 text-xs text-amber-600">
                            You can add a suitable inverter
                            to the solar reference database
                            later.
                        </p>
                    </div>
                ) : (
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        <div>
                            <p className="text-xs text-slate-400">
                                Manufacturer
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {inverter.manufacturer ||
                                    "Unavailable"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">
                                Model
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {inverter.model ||
                                    "Unavailable"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">
                                Rated Power
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {formatWatts(
                                    inverter.rated_power_watts
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-400">
                                Quantity
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                                {inverter.quantity ||
                                    "N/A"}
                            </p>
                        </div>

                    </div>
                )}

            </div>

            {/* Roof */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Roof Requirements
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Available roof space compared with the
                        required panel area.
                    </p>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div>
                        <p className="text-xs text-slate-400">
                            Available Roof Area
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                            {formatNumber(
                                roof.available_area_m2
                            )}{" "}
                            m²
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Required Panel Area
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                            {formatNumber(
                                roof.required_panel_area_m2
                            )}{" "}
                            m²
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">
                            Roof Status
                        </p>

                        <p
                            className={`mt-1 text-lg font-bold ${
                                roof.sufficient
                                    ? "text-emerald-600"
                                    : "text-rose-600"
                            }`}
                        >
                            {roof.sufficient
                                ? "Sufficient"
                                : "Insufficient"}
                        </p>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">

                <button
                    type="button"
                    onClick={() =>
                        onNavigate &&
                        onNavigate("dashboard")
                    }
                    className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    Back to Dashboard
                </button>

                <button
                    type="button"
                    onClick={handleFinish}
                    className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    Finish Assessment
                </button>

            </div>

        </div>
    );
}