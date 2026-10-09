import { formatNumber } from "../../../../utils/charts/formatters";


export default function ApplianceTooltip({ active, payload, stats }) {

    if (!active || !payload || !payload.length) return null;

    const item = payload[0].payload;

    console.log(item);

    return (

        <div className="rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur">

            <p className="max-w-[220px] truncate text-sm font-semibold text-slate-900">
                {item.name}
            </p>


            <p className="mt-1 text-xl font-bold tabular-nums text-teal-600">
                {formatNumber(item.dailyEnergy, 2)}
                <span className="ml-1 text-sm font-medium text-slate-500">
                    kWh / day
                </span>
            </p>


            <p className="mt-0.5 text-xs text-slate-500">
                {((item.dailyEnergy / stats.totalEnergyPerDay) * 100).toFixed(2)} % of total
            </p>


            {/* <p className="mt-1.5 border-t border-slate-100 pt-1.5 text-xs text-slate-500">
                
            </p> */}

        </div>

    );

}
