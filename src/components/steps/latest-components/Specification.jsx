import { Factory } from "lucide-react";

export function Specification({
    icon: Icon,
    label,
    value,
    unit = "",
}) {
    
    const hasValue = value !== null && value !== undefined &&value !== "";

    return (
        <div className="group flex min-w-0 items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 transition-colors duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 sm:p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-800">
                <Icon
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
            </span>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium leading-5 text-slate-500">
                    {label}
                </p>

                <p className="mt-0.5 break-words text-sm font-semibold text-slate-900 sm:text-base">
                    {hasValue ? value : "—"}

                    {hasValue && unit && (
                        <span className="ml-1 text-xs font-medium text-slate-500">
                            {unit}
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
}

export function SummaryItem({ label, value, unit = "", formula }) {
    return (

    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.06] p-4">

        <p className="text-xs font-medium text-emerald-100/70">
            {label}
        </p>

        {formula && (
            <p className="mt-1 text-xs font-medium text-white/50">
                {formula}
            </p>
        )}

        <p className="mt-2 break-words text-2xl font-bold tracking-tight text-white tabular-nums sm:text-3xl">
            {value ?? "—"}

            {unit && (
                <span className="ml-1.5 text-sm font-medium text-emerald-200">
                    {unit}
                </span>
            )}
        </p>

    </div>

    );
}


export function InstallationSummary({
    title = "Installation Summary",
    description = "Confirm equipment compatibility and installation requirements with a qualified solar installer before purchasing equipment.",
    manufacturer,
    detailsLabel = "Required Capacity",
    detailsValue,
    detailsUnit = "",
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-slate-200">
                    <Factory size={19} />
                </span>

                <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900">
                        {title}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                        {description}
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
               { manufacturer && (
                    <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200/80">
                        <p className="text-xs text-slate-500">
                            Manufacturer
                        </p>

                        <p className="mt-1 break-words text-sm font-bold text-slate-900">
                            {manufacturer || "Not provided"}
                        </p>
                    </div>
               )}

                <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200/80">
                    <p className="text-xs text-slate-500">
                        {detailsLabel}
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                        {detailsValue != null && detailsValue !== ""
                            ? `${detailsValue}${detailsUnit ? ` ${detailsUnit}` : ""}`
                            : "Unavailable"}
                    </p>
                </div>
            </div>
        </div>
    );
}