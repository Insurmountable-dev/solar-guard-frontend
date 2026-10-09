import React from "react";


export default function StatTile({ icon: Icon, label, value, unit, tone }) {

    return (

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                <Icon size={20} />
            </div>


            <div className="min-w-0">

                <p className="text-xs font-medium text-slate-500">{label}</p>

                <p className="mt-0.5 text-xl font-bold tabular-nums text-slate-900">
                    {value}
                    <span className="ml-1 text-sm font-medium text-slate-500">{unit}</span>
                </p>

            </div>

        </div>

    );

}
