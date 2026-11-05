import { Zap, ArrowDown, ArrowUp, Gauge, Languages } from 'lucide-react';
import { formatPower } from '../../../utils/charts/formatters';

const toNumber = (value) =>
    value === null || value === undefined || value === '' ? NaN : Number(value);

const BAR_COUNT = 24;

function Description({ code, label, text }) {

    return (

        <div className="flex gap-3">

            <span className="mt-0.5 flex h-6 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 font-mono text-[10px] font-extrabold tracking-wider text-emerald-700 ring-1 ring-emerald-100">
                {code}
            </span>

            <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
                <p className="mt-0.5 text-sm leading-6 text-slate-600">{text}</p>
            </div>

        </div>

    );
}

function Reading({ icon: Icon, label, value }) {

    return (

        <div className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-xl bg-white/10 px-3 py-2.5 ring-1 ring-inset ring-white/15 backdrop-blur-sm">

            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100/80">
                <Icon size={12} className="shrink-0" />
                {label}
            </div>

            <p className="truncate font-mono text-sm font-bold tabular-nums text-white sm:text-base">{value}</p>

        </div>

    );
}

export default function ApplianceCard({ ap, onSelect }) {

    const name = ap.appliance_name_en;
    const min = toNumber(ap.minimum_power_watts);
    const max = toNumber(ap.maximum_power_watts);
    const typical = toNumber(ap.typical_power_watts);

    const hasRange = Number.isFinite(min) && Number.isFinite(max) && Number.isFinite(typical) && max > min;
    const typicalPosition = hasRange ? Math.min(100, Math.max(0, ((typical - min) / (max - min)) * 100)) : 0;
    const filledBars = Math.max(1, Math.round((typicalPosition / 100) * BAR_COUNT));

    const isClickable = typeof onSelect === 'function';

    return (

        <article
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}

            onClick={isClickable ? () => onSelect() : undefined}

            onKeyDown={isClickable ? (e) => {

                if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect();
                    }
                }

            : undefined

            }
            className={`group relative grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 md:grid-cols-[1fr_20rem] ${
                isClickable
                    ? 'cursor-pointer hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.99]'
                    : ''
            }`}
        >

            {/* ───────── Left: identity + descriptions ───────── */}
            <div className="relative flex min-w-0 flex-col gap-6 p-5 sm:p-7">

                {/* soft corner glow */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-emerald-100/60 blur-3xl"
                />

                {/* Identity */}
                <div className="relative flex items-start gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,0.9)] sm:h-16 sm:w-16">
                        <Zap size={26} strokeWidth={2.5} />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2">

                        <div className="flex flex-wrap items-center gap-2">

                            {ap.appliance_category && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-700 ring-1 ring-emerald-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    {ap.appliance_category}
                                </span>
                            )}

                            {ap.reference_id !== undefined && ap.reference_id !== null && (
                                <span className="font-mono text-[10px] font-bold tracking-widest text-slate-400">
                                    REF·{String(ap.reference_id).padStart(3, '0')}
                                </span>
                            )}

                        </div>

                        <h3 className="text-2xl font-black leading-none tracking-tight text-slate-900 sm:text-3xl">
                            {name ?? 'Appliance'}
                        </h3>

                        {ap.appliance_name_sw && (
                            <p className="flex items-center gap-2 text-sm text-slate-500">
                                <Languages size={15} className="shrink-0 text-emerald-600" />
                                <span>Local name</span>
                                <span className="truncate rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-700">
                                    {ap.appliance_name_sw}
                                </span>
                            </p>
                        )}

                    </div>

                </div>

                {/* Descriptions */}
                {(ap.description_en || ap.description_sw) && (
                    <div className="relative flex flex-col gap-4 border-t border-dashed border-slate-200 pt-5">

                        {ap.description_en && (
                            <Description code="EN" label="English" text={ap.description_en} />
                        )}

                        {ap.description_sw && (
                            <Description code="SW" label="Kiswahili" text={ap.description_sw} />
                        )}

                    </div>
                )}

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

                {/* Hero readout */}
                <div className="relative flex flex-col gap-1.5">

                    <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-emerald-100">
                        <Gauge size={14} className="shrink-0" />
                        Typical draw
                        <span aria-hidden="true" className="relative ml-auto flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                        </span>
                    </div>

                    <p className="truncate font-mono text-4xl font-black leading-none tracking-tight tabular-nums sm:text-5xl">
                        {formatPower(ap.typical_power_watts)}
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
                                                ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                                                : filled
                                                ? 'bg-white/70'
                                                : 'bg-white/15'
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

                {/* Min / Max readings */}
                <div className="relative flex gap-2.5">
                    <Reading icon={ArrowDown} label="Min" value={formatPower(ap.minimum_power_watts)} />
                    <Reading icon={ArrowUp} label="Max" value={formatPower(ap.maximum_power_watts)} />
                </div>

            </div>

        </article>

    );
};