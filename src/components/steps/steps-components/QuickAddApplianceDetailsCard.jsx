import { formatPower } from "../../../utils/charts/formatters";
import { Info, Zap, Languages, Gauge, Layers3, CookingPot, ArrowDown, ArrowUp } from "lucide-react";
import useNavigation from "../../../contexts/NavigationProvider";

const toNumber = (value) => value === null || value === undefined || value === "" ? NaN : Number(value);

const BAR_COUNT = 24;

function Description({ code, label, text }) {

    return (

        <div className="flex gap-3">

            <span className="mt-0.5 flex h-6 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 font-mono text-[10px] font-extrabold tracking-wider text-emerald-700 ring-1 ring-emerald-100">
                {code}
            </span>

            <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
            </div>

        </div>

    );
}

function Reading({ icon: Icon, label, value, note }) {

    return (

        <div className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-xl bg-white/10 px-3 py-2.5 ring-1 ring-inset ring-white/15 backdrop-blur-sm">

            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-100/80">
                <Icon size={12} className="shrink-0" />
                <span className="truncate">{label}</span>
            </div>

            <p className="truncate font-mono text-sm font-bold tabular-nums text-white sm:text-base">{value}</p>

            <p className="truncate text-[10px] text-emerald-100/70">{note}</p>

        </div>

    );
}

export default function QuickAddApplianceDetailsCard() {

    const {
        selectedQuickApplianceToAdd = 0, 
        applianceReferences = [], 
        isQuickAddingAppliance , 
        isSearchingAddingAppliance, 
        selectedSearchingApplianceToAdd = 0,
        result
    } = useNavigation();

  


    const selectedAppliance =  isQuickAddingAppliance 
                                ? applianceReferences?.[selectedQuickApplianceToAdd] ?? null 
                                : result?.[selectedSearchingApplianceToAdd] ?? null


    if (!(isQuickAddingAppliance || isSearchingAddingAppliance)) return null;
    if (!selectedAppliance) return null;

    const min = toNumber(selectedAppliance.minimum_power_watts);
    const max = toNumber(selectedAppliance.maximum_power_watts);
    const typical = toNumber(selectedAppliance.typical_power_watts);

    const hasRange = Number.isFinite(min) && Number.isFinite(max) && Number.isFinite(typical) && max > min;
    const typicalPosition = hasRange ? Math.min(100, Math.max(0, ((typical - min) / (max - min)) * 100)) : 0;
    const filledBars = Math.max(1, Math.round((typicalPosition / 100) * BAR_COUNT));

    return (

        <div className="relative grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm md:grid-cols-[1fr_19rem]">

            {/* ───────── Left: identity + descriptions ───────── */}
            <div className="relative flex min-w-0 flex-col gap-6 bg-gradient-to-br from-white via-emerald-50/40 to-white p-5 sm:p-7">

                {/* Decorative top accent line */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
                />

                {/* Decorative soft glow */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl"
                />

                {/* Header */}
                <div className="relative flex items-start gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,0.9)] sm:h-16 sm:w-16">
                        <Info size={26} strokeWidth={2.5} />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2">

                        <div className="flex flex-wrap items-center gap-2">

                            <p className="font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] text-emerald-700">
                                Appliance Reference
                            </p>

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200">
                                <CookingPot size={12} />
                                {selectedAppliance.appliance_category}
                            </span>

                        </div>

                        <h3 className="text-2xl font-black leading-none tracking-tight text-slate-900 sm:text-3xl">
                            {selectedAppliance.appliance_name_en}
                        </h3>

                    </div>

                </div>

                {/* Appliance names */}
                <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <div className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 pl-4 transition-all duration-200 hover:border-emerald-300 hover:shadow-[0_8px_20px_-12px_rgba(16,185,129,0.5)]">

                        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-400 opacity-60 transition-opacity duration-200 group-hover:opacity-100" />

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 font-mono text-[10px] font-extrabold tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                            EN
                        </span>

                        <div className="min-w-0">

                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                English Name
                            </p>

                            <p className="mt-0.5 truncate text-sm font-bold text-slate-800">
                                {selectedAppliance.appliance_name_en || "Not available"}
                            </p>

                        </div>

                    </div>

                    <div className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 pl-4 transition-all duration-200 hover:border-emerald-300 hover:shadow-[0_8px_20px_-12px_rgba(16,185,129,0.5)]">

                        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-teal-400 to-emerald-400 opacity-60 transition-opacity duration-200 group-hover:opacity-100" />

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                            <Languages size={17} />
                        </span>

                        <div className="min-w-0">

                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Name in Kiswahili
                            </p>

                            <p className="mt-0.5 truncate font-mono text-sm font-bold text-slate-800">
                                {selectedAppliance.appliance_name_sw || "Not available"}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Descriptions */}
                <div className="relative flex flex-col gap-4 border-t border-dashed border-slate-200 pt-5">

                    <Description
                        code="EN"
                        label="About this Appliance"
                        text={selectedAppliance.description_en || "No English description available."}
                    />

                    <Description
                        code="SW"
                        label="Maelezo kwa Kiswahili"
                        text={selectedAppliance.description_sw || "Hakuna maelezo yanayopatikana."}
                    />

                </div>

                {/* Reference Metadata */}
                <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-emerald-100 pt-4">

                    <div className="flex items-center gap-2.5">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                            <Layers3 size={15} />
                        </div>

                        <div>

                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Category
                            </p>

                            <p className="text-xs font-bold text-slate-700">
                                {selectedAppliance.appliance_category || "Uncategorized"}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* ───────── Right: power panel ───────── */}
            <div className="relative flex flex-col justify-between gap-6 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 p-5 text-white sm:p-7">

                {/* decorative layers */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px]"
                />
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-emerald-300/30 blur-3xl"
                />
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-teal-300/20 blur-3xl"
                />

                {/* Section label */}
                <div className="relative flex items-center justify-between gap-2">

                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">
                        Power Specifications
                    </p>

                    <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-100/80">
                        <Zap size={13} />
                        Electrical Load
                    </span>

                </div>

                {/* Hero readout: Typical Power */}
                <div className="relative flex flex-col gap-1.5">

                    <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                        <Gauge size={14} className="shrink-0" />
                        Typical Power
                        <span aria-hidden="true" className="relative ml-auto flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                        </span>
                    </div>

                    <p className="truncate font-mono text-4xl font-black leading-none tracking-tight tabular-nums sm:text-5xl">
                        {formatPower(selectedAppliance.typical_power_watts)}
                    </p>

                    <p className="text-xs text-emerald-100/80">
                        Expected operating power
                    </p>

                </div>

                {/* Equalizer meter */}
                {hasRange && (
                    <div className="relative flex flex-col gap-2" aria-hidden="true">

                        <div className="flex h-10 items-end gap-[3px]">
                            {Array.from({ length: BAR_COUNT }).map((_, i) => {
                                const filled = i < filledBars;
                                const isTip = i === filledBars - 1;

                                return (
                                    <span
                                        key={i}
                                        className={`flex-1 rounded-full transition-all duration-300 ${
                                            isTip
                                                ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                                                : filled
                                                ? "bg-white/70"
                                                : "bg-white/15"
                                        }`}
                                        style={{ height: `${28 + (i / (BAR_COUNT - 1)) * 72}%` }}
                                    />
                                );
                            })}
                        </div>

                        <div className="flex justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-100/80">
                            <span>Min</span>
                            <span>Max</span>
                        </div>

                    </div>
                )}

                {/* Minimum / Maximum */}
                <div className="relative flex gap-2.5">

                    <Reading
                        icon={ArrowDown}
                        label="Minimum Power"
                        value={formatPower(selectedAppliance.minimum_power_watts)}
                        note="Lower reference value"
                    />

                    <Reading
                        icon={ArrowUp}
                        label="Maximum Power"
                        value={formatPower(selectedAppliance.maximum_power_watts)}
                        note="Upper reference value"
                    />

                </div>

            </div>

        </div>

    );

}