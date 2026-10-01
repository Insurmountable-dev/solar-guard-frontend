import React from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function EnergyConsumptionChart({
    assessment
}) {
    const data = assessment
        ? [
            {
                name: "Daily Energy",
                value: Number(
                    assessment.total_daily_energy_kwh ||
                    assessment.daily_energy_kwh ||
                    0
                )
            },
            {
                name: "Solar Required",
                value: Number(
                    assessment.required_solar_capacity_watts ||
                    assessment.solar_capacity_watts ||
                    0
                ) / 1000
            },
            {
                name: "Battery",
                value: Number(
                    assessment.required_battery_capacity_kwh ||
                    0
                )
            }
        ]
        : [];

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                    Energy Consumption
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Household energy and solar requirements.
                </p>
            </div>

            {data.length === 0 ? (
                <div className="flex h-72 items-center justify-center rounded-xl bg-slate-50">
                    <p className="text-sm text-slate-500">
                        No assessment data available.
                    </p>
                </div>
            ) : (
                <div className="h-72">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <LineChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                            />

                            <XAxis
                                dataKey="name"
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12
                                }}
                            />

                            <YAxis
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12
                                }}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow:
                                        "0 8px 20px rgba(0,0,0,0.08)"
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#16a34a"
                                strokeWidth={4}
                                dot={{
                                    r: 6,
                                    fill: "#16a34a",
                                    stroke: "#ffffff",
                                    strokeWidth: 2
                                }}
                                activeDot={{
                                    r: 8
                                }}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

        </section>
    );
}