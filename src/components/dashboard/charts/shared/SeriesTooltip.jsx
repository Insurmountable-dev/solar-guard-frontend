import { formatNumber } from "../../../../utils/charts/formatters";

// Tooltip for grouped charts: one row per series
export default function SeriesTooltip({ active, payload, series, unit, digits = 2 }) {

    if (!active || !payload || !payload.length) return null;
    const item = payload[0].payload;

    return (

        <div className="rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur">

            <p className="max-w-[220px] truncate text-sm font-semibold text-slate-900">{item.name} </p>


            <div className="mt-2 space-y-1.5">

                {series.map((s) => (

                    <div key={s.key} className="flex items-center justify-between gap-6">

                        <span className="flex items-center gap-2 text-xs text-slate-500">

                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }}/>

                            {s.label}
                        </span>

                        <span className="text-sm font-bold tabular-nums text-slate-900">
                            {formatNumber(item[s.key], digits)} {unit}
                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

};
