import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis,CartesianGrid, Tooltip, ReferenceLine,LabelList} from "recharts";
import MetricTooltip from "./MetricTooltip";
import ValueLabel from "./ValueLabel";
import { shorten } from "../../../../utils/charts/formatters";


export default function MetricBarChart({data,metric,average,minWidth,showAverage = false}) {

    console.log(data);

    // Unique per metric so two charts on one page never share a gradient
    const gradientId = `gradient-${metric.id}`;

    return (
    
        <div className="overflow-x-auto hide-scrollbar-mobile [&_svg.recharts-surface]:outline-none">        
        
            <div style={{ minWidth }} className="h-72">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        barCategoryGap="20%"
                        margin={{ top: 24, right: 8, left: -8, bottom: 0 }}
                        accessibilityLayer={false}
                        tabIndex={-1}
                    >

                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%"   stopColor={metric.colors.from} />
                                <stop offset="100%" stopColor={metric.colors.to} />
                            </linearGradient>
                        </defs>


                        <CartesianGrid
                            vertical ={false}
                            strokeDasharray="4 2"
                            stroke="#cbd5e1"
                            strokeOpacity={0.7}
                        />


                        <XAxis
                            dataKey="chartName"
                            tickFormatter={(v) => shorten(v)}
                            interval={0}
                            axisLine={true}
                            tickLine={true}
                            tickMargin={12}
                            tick={{
                                 fill: "#475569", 
                                 fontSize: 12, 
                                 fontWeight:500
                            }}
                        />


                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            width={50}
                            tick={{ 
                                fill: "#005de8",
                                fontSize: 12 
                            }}
                            label={{
                                value: metric.unit,
                                position: "insideTopLeft",
                                offset:0,
                                dx:20,
                                dy:-22,
                                fill: "#5019e6",
                                fontSize: 11,
                                fontWeight:500
                            }}
                        />


                        <Tooltip
                            content={<MetricTooltip metric={metric} />}
                            cursor={{ fill: "#f1f5f9", opacity: 0.8, radius: 12 }}
                        />


                        {showAverage && (

                            <ReferenceLine
                                y={average}
                                stroke={metric.colors.line}
                                strokeDasharray="5 5"
                                strokeWidth={1.5}
                            />

                        )}


                        <Bar
                            dataKey={metric.valueKey}
                            name={`${metric.title} (${metric.unit})`}
                            fill={`url(#${gradientId})`}
                            maxBarSize={64}
                            radius={[12, 12, 4, 4]}
                            animationDuration={900}
                            animationEasing="ease-out"
                        >
                            <LabelList
                                dataKey={metric.valueKey}
                                content={<ValueLabel format={metric.format} />}
                            />
                        </Bar>

                    </BarChart>


                </ResponsiveContainer>

            </div>

        </div>

    );

}
