import React from "react";

import {
    Calculator,
    Sun,
    Battery,
    Zap
} from "lucide-react";

export default function SolarCalculation({
    calculation,
    isLoading,
    onCalculate
}) {
    return (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">

                        <Calculator
                            size={22}
                            className="text-amber-600"
                        />

                    </div>

                    <div>

                        <h2 className="text-lg font-bold text-slate-900">
                            Solar System Calculation
                        </h2>

                        <p className="text-sm text-slate-500">
                            Calculate the household's solar energy requirements.
                        </p>

                    </div>

                </div>

                <button
                    type="button"
                    onClick={onCalculate}
                    disabled={isLoading}
                    className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading
                        ? "Calculating..."
                        : "Calculate Solar System"}
                </button>

            </div>

            {!calculation ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">

                    <Calculator
                        size={30}
                        className="mx-auto text-slate-400"
                    />

                    <p className="mt-3 text-sm text-slate-500">
                        Run the calculation to determine the required solar system size.
                    </p>

                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    <CalculationCard
                        icon={
                            <Sun size={20} />
                        }
                        label="Solar Capacity"
                        value={
                            `${Number(
                                calculation.required_solar_capacity_watts ||
                                calculation.solar_capacity_watts ||
                                0
                            ).toFixed(0)} W`
                        }
                    />

                    <CalculationCard
                        icon={
                            <Battery size={20} />
                        }
                        label="Battery Capacity"
                        value={
                            `${Number(
                                calculation.required_battery_capacity_kwh ||
                                0
                            ).toFixed(2)} kWh`
                        }
                    />

                    <CalculationCard
                        icon={
                            <Zap size={20} />
                        }
                        label="Inverter Capacity"
                        value={
                            `${Number(
                                calculation.required_inverter_capacity_watts ||
                                0
                            ).toFixed(0)} W`
                        }
                    />

                </div>
            )}

        </section>
    );
}

function CalculationCard({
    icon,
    label,
    value
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm">
                    {icon}
                </div>

                <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {label}
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
}