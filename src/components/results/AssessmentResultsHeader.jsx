import { ArrowLeft, Sun, Home, CalendarDays, RefreshCw, CheckCircle2, Download } from "lucide-react";
import { formatDate } from "../../utils/charts/formatters";


function MetaChip({ icon: Icon, label, value }) {

    return (

        <div className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3.5 py-2.5 ring-1 ring-inset ring-white/15 backdrop-blur-sm">

            <Icon size={16} className="shrink-0 text-emerald-200" />

            <div className="min-w-0 leading-tight">

                <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-100/70">
                    {label}
                </p>

                <p className="truncate text-sm font-semibold text-white">
                    {value}
                </p>

            </div>

        </div>

    );

}


export default function AssessmentResultsHeader({
    title = "Assessment Results",
    householdName = "Your household",
    backLabel = "Back To Asessments",
    label = "Assessment",
    description = `Your household solar sizing and equipment recommendations.`,
    createdAt  = 0,
    updatedAt = 0,
    onBack = 0,
    onDownload,
    isDownloading = false,
}) {

    return (

        <header className="mb-8">

            {/* Back Link */}
            <button
                type="button"
                onClick={onBack}
                className="group mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-700"
            >
                <ArrowLeft size={17} className="transition group-hover:-translate-x-1" />
                {backLabel}
            </button>


            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-6 shadow-xl shadow-emerald-900/15 sm:p-8">

                {/* Decorative background */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">

                    <Sun size={260} strokeWidth={1} className="absolute -right-12 -top-16 text-white/10" />

                    <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
                    <div className="absolute -bottom-12 -left-4 h-40 w-40 rounded-full border border-white/10" />
                    <div className="absolute right-1/3 top-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />

                </div>


                <div className="relative">

                    {/* Top Row: Brand and Status */}
                    <div className="flex flex-wrap items-center justify-between gap-3">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                                <Sun size={23} />
                            </div>

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-100">
                                Solar Guard
                            </p>

                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-300/20 px-3 py-1.5 text-xs font-semibold text-emerald-50 ring-1 ring-inset ring-emerald-200/40">
                            <CheckCircle2 size={14} />
                            {label} complete
                        </span>

                    </div>


                    {/* Title */}
                    <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                        <div className="min-w-0">

                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                {title}
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/85 sm:text-base">
                                {description}
                            </p>

                        </div>

                        {onDownload && (

                            <button
                                type="button"
                                onClick={onDownload}
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                            >
                                <Download size={16} />
                               {isDownloading ? " Downloading report....." : "Generate pdf Report"}
                            </button>

                        )}

                    </div>


                    {/* Meta Chips */}
                    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">

                        <MetaChip icon={Home} label="Household" value={householdName} />
                        <MetaChip icon={CalendarDays} label="Created" value={formatDate(createdAt)} />
                        <MetaChip icon={RefreshCw} label="Last updated" value={formatDate(updatedAt)} />

                    </div>

                </div>

            </div>

        </header>

    );

};