import { TrendingUp } from "lucide-react";

export default function SummaryCard({
    title,
    value,
    description,
    icon: Icon = TrendingUp,
    variant = "number",
}) {
    const valueStyles = {
        number: "text-3xl font-bold tabular-nums text-slate-900",
        label: "text-sm font-medium text-slate-600 leading-relaxed",
    };

    const isEmpty = value === null || value === undefined || value === "";

    /* ---------- TEXT VARIANT: redesigned ---------- */
    if (variant === "text") {
        return (
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50/70 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/60">

                {/* Soft glow in the corner */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-200/40 blur-3xl transition duration-500 group-hover:bg-emerald-300/50"
                />

                <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold tracking-wide text-emerald-700">
                            {title}
                        </p>

                        <p
                            className={`mt-3 break-words ${
                                isEmpty
                                    ? "text-base font-medium italic text-slate-400"
                                    : "text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-2xl"
                            }`}
                        >
                            {isEmpty ? "Not provided" : value}
                        </p>

                        {description && (
                            <p className="mt-3 max-w-prose border-t border-emerald-100 pt-3 text-sm leading-relaxed text-slate-500">
                                {description}
                            </p>
                        )}
                    </div>

                    {Icon && (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200 ring-4 ring-emerald-50 transition duration-300 group-hover:scale-105 group-hover:-rotate-3">
                            <Icon size={22} />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /* ---------- NUMBER + LABEL VARIANTS: unchanged ---------- */
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className={`mt-3 break-words ${valueStyles[variant] || valueStyles.number}`}>
                        {value ?? "Not provided"}
                    </p>

                    {description && (
                        <p className="mt-2 text-xs leading-relaxed text-slate-400">
                            {description}
                        </p>
                    )}
                </div>

                {Icon && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Icon size={21} />
                    </div>
                )}
            </div>
        </div>
    );
}