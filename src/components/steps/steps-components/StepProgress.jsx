import { CheckCircle2, ListChecks,Search } from "lucide-react";

export default function StepsProgress({ filledFields = 0, requiredFields = 0, percent = 0 }) {

    const progress = Math.min(100, Math.max(0, Number(percent) || 0));
    const filled = Math.max(0, Number(filledFields) || 0);
    const required = Math.max(0, Number(requiredFields) || 0);
    const done = progress >= 100;

    return (

        <div  className="min-w-0 w-full"  role="group"  aria-label="Current step completion" >


            <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                    <span
                        aria-hidden="true"
                        className={[
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 sm:h-8 sm:w-8",
                            done
                                ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-200"
                                : "bg-emerald-50 text-emerald-700",
                        ].join(" ")}
                    >
                        {done ? (
                            <CheckCircle2 size={16} strokeWidth={2.25} />
                        ) : (
                            <ListChecks size={16} strokeWidth={2.25} />
                        )}
                    </span>

                    <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-700 sm:text-sm">
                            {done ? "Step complete" : "Step completion"}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-slate-500 sm:text-xs">
                            {filled} of {required} required details completed
                        </p>
                    </div>
                </div>

                <span
                    className={[
                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums transition-colors duration-300 sm:text-sm",
                        done
                            ? "bg-emerald-600 text-white"
                            : "bg-emerald-50 text-emerald-800",
                    ].join(" ")}
                >
                    {Math.round(progress)}%
                </span>
            </div>

            <div  className="h-1.5 overflow-hidden rounded-full bg-slate-100 sm:h-2"  role="progressbar"  aria-label="Required details completed"  aria-valuemin={0}  aria-valuemax={100}  aria-valuenow={Math.round(progress)} >
               
                <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 transition-[width] duration-500 ease-out motion-reduce:transition-none"
                    style={{ width: `${progress}%` }}
                />

            </div>

           

        </div>

    );
}