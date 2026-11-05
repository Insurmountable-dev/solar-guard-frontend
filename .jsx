import { Sun, Sunrise, Zap, BatteryCharging, PanelsTopLeft, Gauge, House, CheckCircle2, AlertTriangle, ArrowRight, LayoutDashboard, Activity, Ruler, CircleOff } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchLatestResults } from "../../services/components/latestAssessmentService";

export default function Step5Results({result = {}, onNavigate, onFinish }) {

    const [solarResult, setSolarResult] = useState({});

    useEffect(() => {

        async function getResults () {

            try{

                const data = await fetchLatestResults();


                setSolarResult(data);

            }catch(error){

                console.error("Error Fetching Results", error);


            }

        };

        getResults();

    },[]) 


    return (

        <div className="mx-auto w-full max-w-5xl space-y-12 pb-6">

            {/* ═════════ HERO ═════════ */}
            <header className="relative overflow-hidden rounded-[2rem] bg-emerald-950 text-white shadow-2xl shadow-emerald-950/30">

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-400/25 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
                />

                <div className="relative grid items-center gap-8 p-7 sm:p-10 md:grid-cols-[1.1fr_1fr]">

                    <div className="min-w-0">
                        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-amber-300 ring-1 ring-white/15">
                            <CheckCircle2 size={15} aria-hidden="true" />
                            Assessment complete
                        </p>

                        <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                            Your solar system,
                            <br />
                            sized for your home.
                        </h1>

                        <p className="mt-4 max-w-md text-sm leading-6 text-emerald-100/80 sm:text-base">
                            We worked out what your household uses each day and matched it with the panels,
                            inverter and battery below.
                        </p>

                        <p className="mt-5 text-sm text-emerald-100/60">
                            Assessment #{result.assessment_id}
                        </p>
                    </div>

                    <div className="mx-auto w-full max-w-sm">
                        <div
                            className="relative mx-auto h-[170px] w-full max-w-sm overflow-hidden"
                            role="img"
                            aria-label="Sun travelling across the sky"
                        >
                            {/* Dotted sun path */}
                            <div className="absolute left-1/2 top-[20px] h-[260px] w-[260px] -translate-x-1/2 rounded-full border-2 border-dashed border-white/15" />

                            {/* Highlighted part of the arc */}
                            <div
                                className="absolute left-[18%] top-[30px] h-[260px] w-[260px] rounded-full border-t-4 border-amber-300/80"
                                style={{
                                    clipPath: "inset(0 0 50% 0)",
                                    transform: "rotate(-38deg)",
                                    transformOrigin: "center center",
                                }}
                            />

                            {/* Sun glow */}
                            <div className="absolute left-[62.5%] top-[10px] -translate-x-1/2">
                                <div className="absolute inset-0 scale-150 rounded-full bg-amber-400/20 blur-xl" />
                                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/15">
                                    <Sun
                                        size={36}
                                        strokeWidth={1.6}
                                        className="text-amber-300"
                                    />
                                </div>
                            </div>

                            {/* Horizon */}
                            <div className="absolute inset-x-0 bottom-5 h-px bg-white/20" />

                            {/* Horizon markers */}
                            <Sunrise
                                size={20}
                                strokeWidth={1.5}
                                className="absolute bottom-0 left-5 text-amber-300"
                            />
                            <Sun
                                size={18}
                                strokeWidth={1.5}
                                className="absolute bottom-0 right-5 text-emerald-100/60"
                            />
                        </div>

                        <p className="-mt-6 text-center">
                            <span className="text-6xl font-semibold tabular-nums tracking-tight text-amber-300">
                                daily Enrgy Kwh
                            </span>
                            <span className="ml-1.5 text-lg text-emerald-100/80">kWh a day</span>
                        </p>
                    </div>
                </div>

                {/* energy chain */}
                <div className="relative border-t border-white/15 bg-black/15 px-5 py-5 sm:px-10 sm:py-6">
                    <ol className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">

                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
                                <PanelsTopLeft size={18} aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-xs text-emerald-100/65">Solar array</p>
                                <p className="text-lg font-semibold tabular-nums">
                                    {(result.required_solar_capacity_watts)} W
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
                                <Gauge size={18} aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-xs text-emerald-100/65">Inverter</p>
                                <p className="text-lg font-semibold tabular-nums">
                                    {(result.required_inverter_capacity_watts)} W
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
                                <BatteryCharging size={18} aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-xs text-emerald-100/65">Battery storage</p>
                                <p className="text-lg font-semibold tabular-nums">
                                    {(result.required_battery_capacity_kwh, 1)} kWh
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                                <House size={18} aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-xs text-emerald-100/65">Peak home load</p>
                                <p className="text-lg font-semibold tabular-nums">
                                    {(result.peak_load_watts)} W
                                </p>
                            </div>
                        </li>
                    </ol>
                </div>
            </header>

            {/* ═════════ ENERGY NEEDS ═════════ */}
            <section>
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                        What your household needs
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        Your estimated daily energy use and the electrical load the system has to carry.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-white p-5 ring-1 ring-emerald-100">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                            <Activity size={18} aria-hidden="true" />
                        </span>
                        <p className="mt-4 text-sm text-slate-500">Daily energy</p>
                        <p className="mt-0.5 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                            {(result.total_daily_energy_kwh, 2)}
                            <span className="ml-1 text-base font-normal text-slate-500">kWh</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            {(result.total_daily_energy_wh)} Wh used per day
                        </p>
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-white p-5 ring-1 ring-sky-100">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white">
                            <Zap size={18} aria-hidden="true" />
                        </span>
                        <p className="mt-4 text-sm text-slate-500">Peak load</p>
                        <p className="mt-0.5 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                            {(result.peak_load_watts)}
                            <span className="ml-1 text-base font-normal text-slate-500">W</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">Highest estimated load running at once</p>
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-white p-5 ring-1 ring-amber-100">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
                            <Sun size={18} aria-hidden="true" />
                        </span>
                        <p className="mt-4 text-sm text-slate-500">Peak sun hours</p>
                        <p className="mt-0.5 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                            {(result.peak_sun_hours, 1)}
                            <span className="ml-1 text-base font-normal text-slate-500">h</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">Daily sunlight used for sizing</p>
                    </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                    These figures assume a system efficiency of{" "}
                    <span className="font-semibold text-slate-800">{(efficiencyPct, 0)}%</span>
                    . Real performance depends on installation, equipment, shading and operating conditions.
                </p>
            </section>

            {/* ═════════ RECOMMENDED SYSTEM ═════════ */}
            <section>
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Your recommended system
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        Components picked from your solar reference database to match what your home needs.
                    </p>
                </div>

                <div className="space-y-5">

                    {/* ── Panels ── */}
                    <article className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200">
                        <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-200" />

                        <div className="p-5 sm:p-7">
                            <div className="flex flex-wrap items-start justify-between gap-5">

                                <div className="flex items-center gap-4">
                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                                        <PanelsTopLeft size={26} aria-hidden="true" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">Solar panels</p>
                                        {hasPanel ? (
                                            <p className="text-xl font-semibold tracking-tight text-slate-900">
                                                panel.manufacturer panel.model
                                            </p>
                                        ) : (
                                            <p className="text-xl font-semibold tracking-tight text-slate-400">
                                                No suitable panel available
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {hasPanel ? (
                                    <p className="text-right">
                                        <span className="text-5xl font-semibold tabular-nums tracking-tight text-slate-900">
                                            panel.panel_count
                                        </span>
                                        <span className="ml-2 text-sm text-slate-500">
                                            panel.panel_count === 1 ? "panel" : "panels"
                                        </span>
                                    </p>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                                        <CircleOff size={14} aria-hidden="true" />
                                        Unavailable
                                    </span>
                                )}
                            </div>

                            {/* {false && (
                                <>
                                    <div className="mt-6">
                                        <div className="flex items-baseline justify-between text-sm">
                                            <span className="text-slate-500">Array output vs capacity needed</span>
                                            <span className="font-semibold tabular-nums text-slate-900">
                                                {(panel.total_panel_capacity_watts)} W
                                                <span className="font-normal text-slate-400">
                                                    {" "}/ {(result.required_solar_capacity_watts)} W
                                                </span>
                                            </span>
                                        </div>
                                        <div
                                            className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
                                            role="progressbar"
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-valuenow={Math.min(panelCover ?? 0, 100)}
                                            aria-label="Panel array output compared with capacity needed"
                                        >
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                                                style={{ width: `${Math.min(panelCover ?? 0, 100)}%` }}
                                            />
                                        </div>
                                        {panelCover !== null && (
                                            <p className="mt-1.5 text-xs text-slate-500">
                                                Covers {panelCover}% of the solar capacity your home needs
                                            </p>
                                        )}
                                    </div>

                                    <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Rated power</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(panel.rated_power_watts)} W
                                            </dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Panels</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(panel.panel_count)}
                                            </dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Array output</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(panel.total_panel_capacity_watts)} W
                                            </dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Capacity needed</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(result.required_solar_capacity_watts)} W
                                            </dd>
                                        </div>
                                    </dl>
                                </>
                            )} */}

                        </div>
                    </article>

                    {/* ── Inverter ── */}
                    <article className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200">
                        <div className="h-1.5 bg-gradient-to-r from-sky-500 to-sky-200" />

                        <div className="p-5 sm:p-7">
                            <div className="flex flex-wrap items-start justify-between gap-5">

                                <div className="flex items-center gap-4">
                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                                        <Gauge size={26} aria-hidden="true" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">Inverter</p>
                                        {hasInverter ? (
                                            <>
                                                <p className="text-xl font-semibold tracking-tight text-slate-900">
                                                    inverter.manufacturer inverter.model
                                                </p>
                                                <p className="text-sm text-slate-500">inverter.inverter_type</p>
                                            </>
                                        ) : (
                                            <p className="text-xl font-semibold tracking-tight text-slate-400">
                                                No suitable inverter available
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {hasInverter ? (
                                    <p className="text-right">
                                        <span className="text-5xl font-semibold tabular-nums tracking-tight text-slate-900">
                                            inverter.inverter_count
                                        </span>
                                        <span className="ml-2 text-sm text-slate-500">
                                            inverter.inverter_count === 1 ? "inverter" : "inverters"
                                        </span>
                                    </p>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                                        <CircleOff size={14} aria-hidden="true" />
                                        Unavailable
                                    </span>
                                )}
                            </div>

                            {/* {hasInverter && (
                                <>
                                    <div className="mt-6">
                                        <div className="flex items-baseline justify-between text-sm">
                                            <span className="text-slate-500">Rated power vs capacity needed</span>
                                            <span className="font-semibold tabular-nums text-slate-900">
                                                {(inverterTotalWatts)} W
                                                <span className="font-normal text-slate-400">
                                                    {" "}/ {(result.required_inverter_capacity_watts)} W
                                                </span>
                                            </span>
                                        </div>
                                        <div
                                            className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
                                            role="progressbar"
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-valuenow={Math.min(inverterCover ?? 0, 100)}
                                            aria-label="Inverter rated power compared with capacity needed"
                                        >
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600"
                                                style={{ width: `${Math.min(inverterCover ?? 0, 100)}%` }}
                                            />
                                        </div>
                                        {inverterCover !== null && (
                                            <p className="mt-1.5 text-xs text-slate-500">
                                                Handles {inverterCover}% of the capacity your home needs, safety margin included
                                            </p>
                                        )}
                                    </div>

                                    <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Type</dt>
                                            <dd className="mt-0.5 text-base font-semibold text-slate-900">
                                                {inverter.inverter_type}
                                            </dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Rated power</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(inverter.rated_power_watts)} W
                                            </dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Maximum surge</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(inverter.maximum_surge_watts)} W
                                            </dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Maximum PV input</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(inverter.maximum_pv_input_watts)} W
                                            </dd>
                                        </div>
                                    </dl>
                                </>
                            )} */}

                        </div>

                    </article>

                    {/* ── Battery ── */}
                    {/* <article className=
                    "overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200">
                        <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-200" />

                        <div className="p-5 sm:p-7">
                            <div className="flex flex-wrap items-start justify-between gap-5">

                                <div className="flex items-center gap-4">
                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                                        <BatteryCharging size={26} aria-hidden="true" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">Battery</p>
                                        {hasBattery ? (
                                            <>
                                                <p className="text-xl font-semibold tracking-tight text-slate-900">
                                                    {battery.manufacturer} {battery.model}
                                                </p>
                                                <p className="text-sm text-slate-500">{battery.battery_type}</p>
                                            </>
                                        ) : (
                                            <p className="text-xl font-semibold tracking-tight text-slate-400">
                                                No suitable battery available
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {hasBattery ? (
                                    <p className="text-right">
                                        <span className="text-5xl font-semibold tabular-nums tracking-tight text-slate-900">
                                            {(battery.battery_count)}
                                        </span>
                                        <span className="ml-2 text-sm text-slate-500">
                                            {battery.battery_count === 1 ? "battery" : "batteries"}
                                        </span>
                                    </p>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                                        <CircleOff size={14} aria-hidden="true" />
                                        Unavailable
                                    </span>
                                )}
                            </div>

                            {hasBattery && (
                                <>
                                    <div className="mt-6">
                                        <div className="flex items-baseline justify-between text-sm">
                                            <span className="text-slate-500">Usable storage vs storage needed</span>
                                            <span className="font-semibold tabular-nums text-slate-900">
                                                {(battery.total_usable_capacity_kwh, 2)} kWh
                                                <span className="font-normal text-slate-400">
                                                    {" "}/ {(result.required_battery_capacity_kwh, 2)} kWh
                                                </span>
                                            </span>
                                        </div>
                                        <div
                                            className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
                                            role="progressbar"
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                            aria-valuenow={Math.min(batteryCover ?? 0, 100)}
                                            aria-label="Battery usable storage compared with storage needed"
                                        >
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                                                style={{ width: `${Math.min(batteryCover ?? 0, 100)}%` }}
                                            />
                                        </div>
                                        {batteryCover !== null && (
                                            <p className="mt-1.5 text-xs text-slate-500">
                                                Covers {batteryCover}% of the storage your home needs
                                            </p>
                                        )}
                                    </div>

                                    <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Type</dt>
                                            <dd className="mt-0.5 text-base font-semibold text-slate-900">
                                                {battery.battery_type}
                                            </dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Unit capacity</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(battery.energy_capacity_kwh, 2)} kWh
                                            </dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Depth of discharge</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(battery.depth_of_discharge_percent, 0)}%
                                            </dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                                            <dt className="text-xs text-slate-500">Usable per unit</dt>
                                            <dd className="mt-0.5 text-base font-semibold tabular-nums text-slate-900">
                                                {(battery.usable_capacity_kwh, 2)} kWh
                                            </dd>
                                        </div>
                                    </dl>
                                </>
                            )}
                        </div>
                    </article> */}
                </div>
            </section>

            {/* ═════════ ROOF ═════════ */}
            {/* <section>
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Will it fit on your roof?
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        The area your panels need, compared with the roof space you have.
                    </p>
                </div>

                <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-200 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-5">

                        <div className="flex items-center gap-4">
                            <span
                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ${
                                    !roofKnown
                                        ? "bg-slate-50 text-slate-500 ring-slate-200"
                                        : roofOk
                                        ? "bg-emerald-50 text-emerald-600 ring-emerald-100"
                                        : "bg-amber-50 text-amber-600 ring-amber-100"
                                }`}
                            >
                                {!roofKnown ? (
                                    <Ruler size={26} aria-hidden="true" />
                                ) : roofOk ? (
                                    <House size={26} aria-hidden="true" />
                                ) : (
                                    <AlertTriangle size={26} aria-hidden="true" />
                                )}
                            </span>

                            <div>
                                <p
                                    className={`text-xl font-semibold tracking-tight ${
                                        !roofKnown ? "text-slate-700" : roofOk ? "text-emerald-800" : "text-amber-800"
                                    }`}
                                >
                                    {!roofKnown
                                        ? "No panels to place yet"
                                        : roofOk
                                        ? "Your roof has enough space"
                                        : "Your roof may be too small"}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {!roofKnown
                                        ? "Roof fit is checked once a suitable panel is available."
                                        : roofOk
                                        ? "Your panels fit with room to spare."
                                        : "Confirm your measurements before finalizing your installation."}
                                </p>
                            </div>
                        </div>

                        {roofUsage !== null && (
                            <p className="text-right">
                                <span className="text-5xl font-semibold tabular-nums tracking-tight text-slate-900">
                                    {(roofUsage, 0)}%
                                </span>
                                <span className="ml-2 text-sm text-slate-500">of roof used</span>
                            </p>
                        )}
                    </div>

                    {roofUsage !== null && (
                        <div
                            className="mt-6 h-4 w-full overflow-hidden rounded-full bg-slate-100"
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(roofFill)}
                            aria-label="Share of available roof area needed for panels"
                        >
                            <div
                                className={`h-full rounded-full ${
                                    roofOk
                                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                                        : "bg-gradient-to-r from-amber-400 to-amber-500"
                                }`}
                                style={{ width: `${roofFill}%` }}
                            />
                        </div>
                    )}

                    <dl className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <dt className="text-xs text-slate-500">Required panel area</dt>
                            <dd className="mt-0.5 text-lg font-semibold tabular-nums text-slate-900">
                                {(result.required_panel_area_m2, 1)} m²
                            </dd>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <dt className="text-xs text-slate-500">Available roof area</dt>
                            <dd className="mt-0.5 text-lg font-semibold tabular-nums text-slate-900">
                                {(result.available_roof_area_m2, 1)} m²
                            </dd>
                        </div>
                    </dl>
                </div>
            </section> */}``

            {/* ═════════ ACTIONS ═════════ */}
           

        </div>

    );
}