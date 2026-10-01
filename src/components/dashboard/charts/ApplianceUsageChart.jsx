import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

export default function ApplianceUsageChart({
    data = []
}) {
    const chartData = data.map(
        appliance => ({
            name:
                appliance.appliance_name ||
                "Appliance",
            energy:
                Number(
                    appliance.daily_energy_wh ||
                    appliance.energy_wh ||
                    0
                )
        })
    );

    const colors = [
        "#16a34a",
        "#2563eb",
        "#f59e0b",
        "#9333ea",
        "#ef4444",
        "#0891b2",
        "#db2777",
        "#65a30d"
    ];

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                    Appliance Usage
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Daily energy consumption by appliance.
                </p>
            </div>

            {chartData.length === 0 ? (
                <div className="flex h-72 items-center justify-center rounded-xl bg-slate-50">
                    <p className="text-sm text-slate-500">
                        No appliance data available.
                    </p>
                </div>
            ) : (
                <div className="h-72">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={chartData}
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
                                    fontSize: 11
                                }}
                                angle={-25}
                                textAnchor="end"
                                height={60}
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
                                formatter={value =>
                                    `${value} Wh`
                                }
                            />

                            <Bar
                                dataKey="energy"
                                radius={[
                                    8,
                                    8,
                                    0,
                                    0
                                ]}
                            >
                                {chartData.map(
                                    (
                                        entry,
                                        index
                                    ) => (
                                        <Cell
                                            key={
                                                entry.name
                                            }
                                            fill={
                                                colors[
                                                    index %
                                                    colors.length
                                                ]
                                            }
                                        />
                                    )
                                )}
                            </Bar>

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

        </section>
    );
}