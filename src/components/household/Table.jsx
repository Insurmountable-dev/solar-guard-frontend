

export default  function Table ({
    details,
    cols = [],
    rows = []
}) {

        console.log(rows);

    return(
        
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

             <div className="grid grid-cols-2 gap-3 border-b border-slate-100 p-5 sm:grid-cols-2">

                {details.map((d, i) => {

                    return(
                         <div  key={`${d.name} + ${i}`} className={`rounded-xl bg-${d?.bg} p-4`}>
                            <p className={`text-xs text-${d?.text}`}>{d?.name}</p>
                            <p className={`mt-2 text-2xl font-bold text-${d?.text}`}>{d?.value}</p>
                        </div>
                    )

                })}

            </div>

            <div className="overflow-x-auto">

                <table className="w-full min-w-[850px] text-left">

                    <thead className="bg-slate-50 text-xs tracking-wide text-slate-500">
                        <tr>

                          {cols.map((col, i) => {

                            return(
                                <th key={`${col} + ${i}` } className="px-6 py-4 font-semibold">
                                    {col}
                                </th>
                            )
                          })}

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 text-sm">

                        {rows.map((r, i) => (

                            <tr key={`${i}`} className="hover:bg-slate-50">

                                {r.map((ro, j) => (

                                    <td key={`${i}-${j}`} className="px-6 py-4 font-semibold">

                                        {ro === "essential" ? (

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                Essential
                                            </span>

                                        ) : ro === "not-essential" ? (

                                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                                                Not Essential
                                            </span>

                                        ) : (ro)}

                                    </td>
                                ))}

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </section> 
    );

}