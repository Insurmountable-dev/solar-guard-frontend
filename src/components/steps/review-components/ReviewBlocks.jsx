import { Pencil, Clock,Plug } from "lucide-react";
import { LiveDot,GridTexture,PanelGlows,CornerTicks } from "./DecorativeComponents";
import ApplianceIcon from "../steps-components/ApplianceIcon";
import BarMeter from "../../common/BarMeter";


const getDailyEnergyInWatts = (appliance) => {
    
    return (
        ( Number(appliance.power_rating_watts) || 0)*
        ( Number(appliance.quantity) || 0) *
        ( Number(appliance.hours_per_day) || 0)
    )

};


const formatNumber = (value) => new Intl.NumberFormat("en-KE").format(value);



/* ───────────────────────── Building blocks ───────────────────────── */

export function SummaryItem({ icon: Icon, label, value, description }) {
    return (
        <div className="group relative flex min-w-0 items-start gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3.5 pl-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_10px_24px_-14px_rgba(16,185,129,0.55)]">

            {/* left accent rail */}
            <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
            />

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 transition-all duration-200 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-teal-500 group-hover:text-white group-hover:ring-transparent">
                <Icon size={18} aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
                <p className="mt-1 break-words text-sm font-bold text-slate-800">
                    {value}
                </p>

                {description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};




export function SectionHeading({ title, count, onEdit, editLabel = "Edit" }) {
    return (
        <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">

                <span aria-hidden="true" className="h-5 w-1 shrink-0 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />

                <h3 className="truncate text-base font-black tracking-tight text-slate-900 sm:text-lg">
                    {title}
                </h3>

                {count !== undefined && (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-xs font-extrabold tabular-nums text-emerald-700">
                        {count}
                    </span>
                )}
            </div>

            {onEdit && (
                <button
                    type="button"
                    onClick={onEdit}
                    className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-[0_8px_18px_-10px_rgba(16,185,129,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95"
                >
                    <Pencil size={13} aria-hidden="true" className="transition-transform duration-200 group-hover:-rotate-12" />
                    {editLabel}
                </button>
            )}
        </div>
    );
};





export function StatusPill({ active, icon: Icon, activeLabel, inactiveLabel }) {

    return (
        <span
            className={[
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold ring-1 transition-colors",
                active
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-slate-50 text-slate-500 ring-slate-200",
            ].join(" ")}
        >
            <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                    active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" : "bg-slate-300"
                }`}
            />
            <Icon size={14} aria-hidden="true" />
            {active ? activeLabel : inactiveLabel}
        </span>
    );
};






export function StatTile({ label, value, highlight = false, className = "" }) {

    return (
        <div
            className={`relative overflow-hidden rounded-2xl border p-4 text-center ${
                highlight
                    ? "border-emerald-300 bg-gradient-to-b from-emerald-50 to-white shadow-[0_8px_20px_-12px_rgba(16,185,129,0.7)]"
                    : "border-slate-200 bg-slate-50/70"
            } ${className}`}
        >
            {highlight && (
                <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-300 via-emerald-500 to-teal-400"
                />
            )}

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {label}
            </p>

            <p className={`mt-1.5 font-mono text-2xl font-black tabular-nums ${highlight ? "text-emerald-700" : "text-slate-900"}`}>
                {value}
            </p>
        </div>
    );

};





export function MetricCard({ icon: Icon, label, value, unit, description, hero = false }) {

    if (hero) {
        return (
            <div className="relative flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 p-5 text-white shadow-[0_20px_40px_-20px_rgba(16,185,129,0.8)] sm:col-span-2 sm:gap-5 sm:p-7">

                <GridTexture />
                <PanelGlows />
                <CornerTicks />

                <div aria-hidden="true" className="relative flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                    <span className="absolute inset-0 rounded-2xl bg-white/20 motion-safe:animate-ping [animation-duration:2.5s]" />
                    <span className="relative flex h-full w-full items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] ring-4 ring-white/25">
                        <Icon size={26} strokeWidth={2.5} />
                    </span>
                </div>

                <div className="relative min-w-0 flex-1">

                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-emerald-100">
                        {label}
                    </p>

                    <p className="mt-1.5 break-words font-mono text-4xl font-black leading-none tracking-tight tabular-nums sm:text-5xl">
                        {value}
                        {unit && (
                            <span className="ml-2 text-base font-bold text-emerald-100/90 sm:text-lg">
                                {unit}
                            </span>
                        )}
                    </p>

                    {description && (
                        <p className="mt-2 text-xs text-emerald-100/90 sm:text-sm">
                            {description}
                        </p>
                    )}
                </div>

                <LiveDot className="absolute right-5 top-5 sm:right-6 sm:top-6" />
            </div>
        );
    }

    return (



        <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_14px_30px_-16px_rgba(16,185,129,0.55)] sm:p-5">

            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-200/0 blur-2xl transition-colors duration-300 group-hover:bg-emerald-200/50"
            />

            <div className="relative flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 transition-all duration-200 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-teal-500 group-hover:text-white group-hover:ring-transparent">
                    <Icon size={17} aria-hidden="true" />
                </span>

                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                    {label}
                </p>
            </div>

            <p className="relative mt-4 break-words font-mono text-2xl font-black tabular-nums tracking-tight text-slate-900 sm:text-3xl">
                {value}
                {unit && (
                    <span className="ml-1.5 text-sm font-bold text-emerald-600">
                        {unit}
                    </span>
                )}
            </p>

            {description && (
                <p className="relative mt-1.5 text-xs leading-relaxed text-slate-500">
                    {description}
                </p>
            )}

            {/* baseline that fills on hover */}
            <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-emerald-400 to-teal-500 transition-transform duration-500 group-hover:scale-x-100"
            />
        </div>



    );
};







export function ApplianceRow({ appliance, index, maxEnergy }) {

    const dailyEnergy = getDailyEnergyInWatts(appliance);

    return (

        <div className="group relative grid min-w-0 grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.45)] sm:grid-cols-[1fr_12.5rem]">

            {/* ───────── Left: identity ───────── */}
            <div className="relative flex min-w-0 items-center gap-3.5 p-4 pl-5 sm:gap-4 sm:p-5 sm:pl-6">

                {/* left accent rail */}
                <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
                />

                {/* soft corner glow */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-emerald-100/60 blur-3xl"
                />

                {/* index readout */}
                <span
                    aria-hidden="true"
                    className="absolute right-4 top-3 font-mono text-[10px] font-bold tracking-widest text-slate-300 transition-colors duration-300 group-hover:text-emerald-400"
                >
                    {String(index + 1).padStart(2, "0")}

                </span>

                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-teal-500 group-hover:text-white group-hover:shadow-[0_10px_24px_-10px_rgba(16,185,129,0.9)] group-hover:ring-transparent sm:h-16 sm:w-16">
                    <ApplianceIcon name={appliance?.appliance_name} />
                </span>

                <div className="relative min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2 pr-6">
                        <p className="text-base font-black tracking-tight text-slate-900 sm:text-lg">
                            {appliance?.appliance_name}
                        </p>

                        {appliance.is_essential && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
                                Essential
                            </span>
                        )}
                    </div>

                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        {appliance.appliance_category} ·{" "}

                        {appliance.quantity} unit
                        {appliance.quantity === 1 ? "" : "s"}{" "}

                        · <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono font-bold text-slate-700">{appliance.power_rating_watts} W</span> each
                    </p>

                    <p className="mt-2 flex items-center text-xs text-slate-500">
                        <Clock size={12} className="mr-1.5 inline text-emerald-600" aria-hidden="true" />
                        {appliance.hours_per_day} h/day ·{" "}
                        {appliance.days_per_week} days per week
                    </p>

                </div>
            </div>

            {/* ───────── Right: energy panel ───────── */}
            <div className="relative flex min-w-0 flex-col justify-between gap-4 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 p-4 text-white sm:p-5">

                {/* decorative grid */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px]"
                />

                {/* decorative glows */}
                <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/30 blur-3xl" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-teal-300/20 blur-3xl" />

                {/* corner ticks */}
                <span aria-hidden="true" className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l-2 border-t-2 border-white/40" />
                <span aria-hidden="true" className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r-2 border-t-2 border-white/40" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b-2 border-l-2 border-white/40" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b-2 border-r-2 border-white/40" />

                {/* readout */}
                <div className="relative flex items-end justify-between gap-2 sm:flex-col sm:items-start sm:justify-start sm:gap-1">

                    <p className="truncate font-mono text-3xl font-black leading-none tracking-tight tabular-nums sm:text-4xl">
                        {(dailyEnergy / 1000).toFixed(2)}
                    </p>

                    <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                        kWh/day
                        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60 motion-reduce:animate-none" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                        </span>
                    </p>

                </div>

             

                <BarMeter 
                    bars={15}
                    value={dailyEnergy / 1000}
                    max={maxEnergy}
                />

            </div>

        </div>
    );
};