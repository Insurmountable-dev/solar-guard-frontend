import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
import  SeriesTooltip from "../shared/SeriesTooltip";
import { shorten } from "../../../../utils/charts/formatters";


export default function SolarSizingBars({ data, series, minWidth }) {

    console.log(minWidth);

    return (

        <div className="overflow-x-auto">

            <div style={{ minWidth }} className="h-72 w-full sm:h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data ={data}
                        barCategoryGap="22%"
                        barGap={6}
                        margin={{ top: 12, right: 8, left: -8, bottom: 0 }}
                        accessibilityLayer={false}
                        tabIndex={-1}
                    >

                        <defs>
                            {series.map((s) => (
                                <linearGradient key={s.id} id={s.id} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={s.from} />
                                    <stop offset="100%" stopColor={s.to} />
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
                            dataKey="chartName"
                            tickFormatter={(v) => shorten(v)}
                            interval={0}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={12}
                            tick={{ fill: "#475569", fontSize: 12, fontWeight: 500 }}
                        />


                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            width={44}
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                            label={{
                                value: "kW",
                                position: "insideTopLeft",
                                offset:16,
                                dy: -30,
                                fill: "#94a3b8",
                                fontSize: 11
                            }}
                        />


                        <Tooltip
                            content={<SeriesTooltip series={series} unit="kW" />}
                            cursor={{ fill: "#f1f5f9", opacity: 0.8, radius: 12 }}
                        />


                        {series.map((s) => (

                            <Bar
                                key={s.key}
                                dataKey={s.key}
                                name={`${s.label} (kW)`}
                                fill={`url(#${s.id})`}
                                maxBarSize={44}
                                radius={[10, 10, 3, 3]}
                                animationDuration={900}
                                animationEasing="ease-out"
                            />

                        ))}

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}
