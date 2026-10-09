import React from "react";


export default function AverageLegend({ color, label }) {

    return (

        <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">

            <span
                className="inline-block h-0 w-5 border-t-2 border-dashed"
                style={{ borderColor: color }}
            />

            {label}

        </p>

    );

}
