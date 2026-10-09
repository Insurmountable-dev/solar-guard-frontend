

export default function MetricTooltip({ active, payload, metric }) {

    if (!active || !payload || !payload.length) return null;

    const item = payload[0].payload;

    const extra = metric.tooltipExtra?.(item);

    return (

        <div className="rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur">

            <p className="max-w-[200px] truncate text-sm font-semibold text-slate-900">
                {item.name}
            </p>


            <p className={`mt-1 text-xl font-bold tabular-nums ${metric.colors.text}`}>
                {metric.format(item[metric.valueKey])}
                <span className="ml-1 text-sm font-medium text-slate-500">
                    {metric.tooltipUnit}
                </span>
            </p>


            {extra && (

                <p className="mt-0.5 text-xs text-slate-500">
                    {extra.label}:{" "}
                    <span className="font-semibold text-slate-700">
                        {extra.value}
                    </span>
                </p>

            )}

        </div>

    );

}
