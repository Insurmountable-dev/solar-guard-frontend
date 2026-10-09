import { formatNumber } from "../../../../utils/charts/formatters";


export default function ApplianceStats({stats}) {

    console.log(stats);

    return (

        <div className="mb-5 grid grid-cols-2 gap-3">

            <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-medium text-slate-500"> Total per day</p>

                <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                    {stats.BiggestConsumerEnergy != null && formatNumber(stats.BiggestConsumerEnergy, 2)}                    
                    <span className="ml-1 text-sm font-medium text-slate-500">
                        kWh
                    </span>
                </p>

            </div>


            <div className="min-w-0 rounded-2xl bg-slate-50 p-4">

                <p className="text-xs font-medium text-slate-500">Biggest consumer</p>

              {stats.BiggestConsumer[0] &&  <p className="mt-1 truncate text-lg font-bold text-slate-900">{stats.BiggestConsumer[0]}</p>}

            <p className="text-xs text-slate-500 "> {formatNumber(stats.percentageUsed, 2)} % of daily use</p>

            </div>

            

       
        </div>

    );

}
