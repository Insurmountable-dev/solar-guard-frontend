
export default function SeriesLegend({ series }) {

    return (

        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2">

            {series.map((s) => (

                <span  key={s.key}  className="flex items-center gap-2 text-sm font-medium text-slate-600" >
                <span className="h-3 w-3 rounded-full" style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}/>
                  {s.label}
                </span>

            ))}

        </div>

    );

}
