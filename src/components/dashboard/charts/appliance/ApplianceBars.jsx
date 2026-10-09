import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip,Cell,LabelList} from "recharts";
import ApplianceTooltip from "./ApplianceTooltip";
import { formatNumber, shorten } from "../../../../utils/charts/formatters";


// Ranked horizontal bars: names stay readable on small screens
export default function ApplianceBars({ data, height }) {


    return (

        <div style={{ height }}>

            <ResponsiveContainer width="100%" height="100%">

                <BarChart
                    data   = { data.data }
                    layout  = "vertical"
                    barCategoryGap="28%"
                    margin={{
                         top: 4,
                         right: 64, 
                         left: 0, 
                         bottom: 4 
                    }}
                    accessibilityLayer={false}
                    tabIndex={-1}
                >

                    <defs>

                        <linearGradient id="applianceTop" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#2dd4bf" />
                            <stop offset="100%" stopColor="#0d9488" />
                        </linearGradient>

                        <linearGradient id="applianceRest" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#99f6e4" />
                            <stop offset="100%" stopColor="#5eead4" />
                        </linearGradient>

                    </defs>


                    <XAxis 
                        type="number" 
                        hide
                    />


                    <YAxis
                        type="category"
                        dataKey="chartName"
                        width={110}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => shorten(v, 16)}
                        tick={{ fill: "#334155", fontSize: 12, fontWeight: 500 }}
                    />


                    <Tooltip
                        content={
                            <ApplianceTooltip stats = {data.stats}
                        />}
                        cursor={{ fill: "#f1f5f9", opacity: 0.8, radius: 10 }}
                    />


                    <Bar
                        dataKey="dailyEnergy"
                        name="Daily energy (kWh)"
                        maxBarSize={28}
                        radius={[4, 12, 12, 4]}
                        background={{ fill: "#f8fafc", radius: 12 }}
                        animationDuration={900}
                        animationEasing="ease-out"
                    >

                        {data.data.map((row, i) => (
                            <Cell
                                key={`${row.name}-${i}`}
                                fill={i === 0 ? "url(#applianceTop)" : "url(#applianceRest)"}
                            />
                        ))}


                        <LabelList
                            dataKey="dailyEnergy"
                            position="right"
                            formatter={(v) => `${formatNumber(v, 2)} kWh`}
                            style={{ fill: "#0f172a", fontSize: 12, fontWeight: 700 }}
                        />

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}
