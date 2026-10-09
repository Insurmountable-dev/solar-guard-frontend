

export default function MetricStats({ metric, average, highest }) {

 console.log(highest);
    return (

        <div className="mb-5 grid grid-cols-2 gap-3">

            <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-medium text-slate-500">
                    {metric.averageLabel}
                </p>

                <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                    {metric.format(average,2)}
                    <span className="ml-1 text-sm font-medium text-slate-500">
                        {metric.unit}
                    </span>
                </p>

            </div>


            <div className="min-w-0 rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-medium text-slate-500">
                    {metric.highestLabel}
                </p>

                <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                    {metric.format(highest.highestEnergy,2)}
                    <span className="ml-1 text-sm font-medium text-slate-500">
                        {metric.unit}
                    </span>
                </p>
                {
                    highest.highestName.map((name, i) => {
                        return <p key = {i} className="truncate text-xs text-slate-500">{name}</p>
                    })
                }

            </div>

        </div>

    );

}
