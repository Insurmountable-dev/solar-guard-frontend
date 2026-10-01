import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList
} from "recharts";

/* ---------- helpers ---------- */

const formatPower = (watts) => {
    const n = Number(watts) || 0;
    if (n >= 1000) {
        const kw = n / 1000;
        return `${kw % 1 === 0 ? kw : kw.toFixed(2).replace(/0$/, "")} kW`;
    }
    return `${Math.round(n)} W`;
};

const formatAxis = (watts) =>
    watts >= 1000 ? `${watts / 1000}k` : `${watts}`;

const SERIES = [
    {
        key: "Solar",
        label: "Solar array",
        hint: "Panel capacity needed",
        from: "#fcd34d",
        to: "#f59e0b",
        solid: "#f59e0b"
    },
    {
        key: "Inverter",
        label: "Inverter",
        hint: "Conversion capacity needed",
        from: "#818cf8",
        to: "#4f46e5",
        solid: "#4f46e5"
    },
    {
        key: "Peak Load",
        label: "Peak load",
        hint: "Highest demand at one time",
        from: "#5eead4",
        to: "#0d9488",
        solid: "#0d9488"
    }
];

/* ---------- custom pieces ---------- */

function ChartTooltip({ active, payload }) {
    if (!active || !payload || !payload.length) return null;

    const item = payload[0].payload;
    const meta = SERIES.find((s) => s.key === item.name);

    return (
        <div className="rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
            <div className="flex items-center gap-2">
                <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: meta.solid }}
                />
                <span className="text-sm font-semibold text-slate-900">
                    {meta.label}
                </span>
            </div>

            <p className="mt-1 text-xl font-bold tabular-nums text-slate-900">
                {item.value.toLocaleString()} W
            </p>

            <p className="text-xs text-slate-500">{meta.hint}</p>
        </div>
    );
}

function ValueLabel({ x, y, width, value }) {
    if (!value) return null;

    return (
        <text
            x={x + width / 2}
            y={y - 10}
            textAnchor="middle"
            fill="#0f172a"
            fontSize={13}
            fontWeight={700}
        >
            {formatPower(value)}
        </text>
    );
}

function SunIcon() {
    return (
        <svg
            viewBox="0 0 48 48"
            className="h-12 w-12 text-amber-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <circle cx="24" cy="24" r="8" />
            <path d="M24 5v6M24 37v6M5 24h6M37 24h6M10.6 10.6l4.2 4.2M33.2 33.2l4.2 4.2M10.6 37.4l4.2-4.2M33.2 14.8l4.2-4.2" />
        </svg>
    );
}

/* ---------- component ---------- */

export default function SolarSizingChart({ assessment }) {
    const data = assessment
        ? [
            {
                name: "Solar",
                value: Number(
                    assessment.required_solar_capacity_watts ||
                    assessment.solar_capacity_watts ||
                    0
                )
            },
            {
                name: "Inverter",
                value: Number(
                    assessment.required_inverter_capacity_watts || 0
                )
            },
            {
                name: "Peak Load",
                value: Number(assessment.peak_load_watts || 0)
            }
        ]
        : [];

    const solar = data[0]?.value || 0;
    const inverter = data[1]?.value || 0;
    const peak = data[2]?.value || 0;

    const solarRatio = peak > 0 ? solar / peak : null;
    const inverterHeadroom =
        peak > 0 ? Math.round(((inverter - peak) / peak) * 100) : null;

    const hasData = data.length > 0 && data.some((d) => d.value > 0);

    return (
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] sm:p-8">
            {/* soft glow in the corner, the one decorative touch */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl"
            />

            <div className="relative mb-8">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    Solar system sizing
                </h2>
                <p className="mt-1 max-w-md text-sm text-slate-500">
                    What your system needs to supply, compared with the
                    power you use at your busiest moment.
                </p>
            </div>

            {!hasData ? (
                <div className="relative flex h-72 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70">
                    <SunIcon />
                    <p className="text-sm font-medium text-slate-700">
                        No sizing data yet
                    </p>
                    <p className="text-xs text-slate-500">
                        Complete the assessment to see your system sizing.
                    </p>
                </div>
            ) : (
                <>
                    <div className="relative h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                barCategoryGap="22%"
                                margin={{
                                    top: 30,
                                    right: 8,
                                    left: -8,
                                    bottom: 0
                                }}
                            >
                                <defs>
                                    {SERIES.map((s) => (
                                        <linearGradient
                                            key={s.key}
                                            id={`grad-${s.key.replace(" ", "")}`}
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor={s.from}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor={s.to}
                                            />
                                        </linearGradient>
                                    ))}
                                </defs>

                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="2 6"
                                    stroke="#cbd5e1"
                                    strokeOpacity={0.7}
                                />

                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={12}
                                    tick={{
                                        fill: "#334155",
                                        fontSize: 13,
                                        fontWeight: 600
                                    }}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={formatAxis}
                                    width={48}
                                    tick={{
                                        fill: "#94a3b8",
                                        fontSize: 12
                                    }}
                                    label={{
                                        value: "kW",
                                        position: "insideTopLeft",
                                        offset: 14,
                                        dy: -28,
                                        fill: "#94a3b8",
                                        fontSize: 11
                                    }}
                                />

                                <Tooltip
                                    content={<ChartTooltip />}
                                    cursor={{
                                        fill: "#f1f5f9",
                                        opacity: 0.8,
                                        radius: 12
                                    }}
                                />

                                <Bar
                                    dataKey="value"
                                    maxBarSize={88}
                                    radius={[14, 14, 4, 4]}
                                    animationDuration={900}
                                    animationEasing="ease-out"
                                >
                                    {data.map((entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={`url(#grad-${entry.name.replace(" ", "")})`}
                                        />
                                    ))}

                                    <LabelList
                                        dataKey="value"
                                        content={<ValueLabel />}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* readout under the chart */}
                    <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
                        {SERIES.map((s, i) => (
                            <div
                                key={s.key}
                                className="rounded-2xl bg-slate-50 p-4"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="h-2.5 w-2.5 rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, ${s.from}, ${s.to})`
                                        }}
                                    />
                                    <span className="text-sm font-medium text-slate-600">
                                        {s.label}
                                    </span>
                                </div>

                                <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900">
                                    {formatPower(data[i].value)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {(solarRatio !== null || inverterHeadroom !== null) && (
                        <div className="relative mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                            {solarRatio !== null && (
                                <p>
                                    Solar covers your peak load{" "}
                                    <span className="font-semibold text-slate-800">
                                        {solarRatio.toFixed(1)}×
                                    </span>
                                </p>
                            )}

                            {inverterHeadroom !== null && (
                                <p>
                                    Inverter headroom over peak{" "}
                                    <span
                                        className={`font-semibold ${
                                            inverterHeadroom < 0
                                                ? "text-rose-600"
                                                : "text-slate-800"
                                        }`}
                                    >
                                        {inverterHeadroom > 0 ? "+" : ""}
                                        {inverterHeadroom}%
                                    </span>
                                </p>
                            )}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}