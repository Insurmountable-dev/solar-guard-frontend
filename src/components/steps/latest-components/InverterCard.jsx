import { Gauge, Activity, ShieldCheck, CheckCircle2, PlugZap, Zap, Cable, Sun, Power, CircuitBoard } from "lucide-react";
import SectionCard from "../steps-components/SectionCard";
import { formatNumber } from "../../../utils/charts/formatters";
import { InstallationSummary, Specification, SummaryItem } from "./Specification";
import EmptyState from "../../common/EmptyState";

export default function InverterCard({
    solarResult,
    inverter = null,
}) {

    if(!inverter) {

        return (
            <EmptyState
                title="Inverter Unavailable"
                description="No recommended inverter is available for this assessment."
                icon={Zap}
                variant="danger"
                animated={false}
            />  
        )

    };


    const hasInverterDetails = Boolean(inverter?.manufacturer || inverter?.model || inverter?.rated_power_watts != null);

    const inverterRatedPower = Number(inverter?.rated_power_watts) || 0;
    const inverterMaximumSurge = Number(inverter?.maximum_surge_watts) || 0;
    const inverterInputVoltageMin = Number(inverter?.input_voltage_min_v) || 0;
    const inverterInputVoltageMax = Number(inverter?.input_voltage_max_v) || 0;
    const inverterOutputVoltage = Number(inverter?.output_voltage_v) || 0;
    const inverterEfficiency = Number(inverter?.efficiency_percent) || 0;
    const inverterMpptCount = Number(inverter?.mppt_count) || 0;
    const inverterMaximumPvInput = Number(inverter?.maximum_pv_input_watts) || 0;
    const inverterWarrantyYears = Number(inverter?.warranty_years) || 0;

    const inverterCount = solarResult?.recommended_inverter_count != null ? Math.max(0, Number(solarResult.recommended_inverter_count) || 0) : (hasInverterDetails ? 1 : 0);
    const totalRatedPower = inverterRatedPower * inverterCount;
    const requiredCapacity = Number(solarResult?.required_inverter_capacity_watts ?? solarResult?.peak_load_watts) || 0;


    const hasRequiredCapacity = requiredCapacity > 0;
    const hasRatedPower = totalRatedPower > 0;
    const hasSufficientCapacity = hasRequiredCapacity && hasRatedPower && totalRatedPower >= requiredCapacity;
    const capacityDifference = totalRatedPower - requiredCapacity;

    const capacityUtilization = totalRatedPower > 0 && hasRequiredCapacity ? Math.min(100, Math.max(0, (requiredCapacity / totalRatedPower) * 100)) : 0;

    const specifications = [
    {
        label: "Inverter Type",
        value: (inverter?.inverter_type) ? inverter.inverter_type.replaceAll("_", " ").toUpperCase() : "—",
        icon: CircuitBoard,
    },
    {
        label: "Rated Power",
        value: (inverter?.rated_power_watts != null) ? formatNumber(inverterRatedPower, 0) : "—",
        unit: "W",
        icon: Zap,
    },
    {
        label: "Maximum Surge Power",
        value: (inverter?.maximum_surge_watts != null )? formatNumber(inverterMaximumSurge, 0) : "—",
        unit: "W",
        icon: Power,
    },
    {
        label: "Input Voltage Range",
        value: (inverter?.input_voltage_min_v != null && inverter?.input_voltage_max_v != null ) ? `${formatNumber(inverterInputVoltageMin, 0)}–${formatNumber(inverterInputVoltageMax, 0)}` : "—",
        unit: "V",
        icon: Cable,
    },
    {
        label: "Output Voltage",
        value:(inverter?.output_voltage_v != null ) ? formatNumber(inverterOutputVoltage, 0) : "—",
        unit: "V",
        icon: PlugZap,
    },
    {
        label: "Efficiency",
        value: (inverter?.efficiency_percent != null )? formatNumber(inverterEfficiency, 0) : "—",
        unit: "%",
        icon: Activity,
    },
    {
        label: "MPPT Count",
        value:( inverter?.mppt_count != null) ? formatNumber(inverterMpptCount, 0) : "—",
        icon: Sun,
    },
    {
        label: "Maximum PV Input",
        value:( inverter?.maximum_pv_input_watts != null )? formatNumber(inverterMaximumPvInput, 0) : "—",
        unit: "W",
        icon: Gauge,
    },
    {
        label: "Warranty",
        value: (inverter?.warranty_years != null )? formatNumber(inverterWarrantyYears, 0) : "—",
        unit: "years",
        icon: ShieldCheck,
    },
];

    return (
        <SectionCard
            title="Recommended Inverter"
            description="Inverter details and specifications for your solar installation"
            icon={PlugZap}
            status={hasInverterDetails ? "completed" : "pending"}
            contentClassName="flex flex-col gap-5"
        >
            {/* Inverter identity */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#103d2b] via-[#164e36] to-[#226747] p-5 sm:p-6">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full border-[28px] border-white/[0.05]"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full border-[30px] border-emerald-300/[0.06]"
                />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-emerald-200 shadow-lg backdrop-blur-sm sm:h-16 sm:w-16">
                            <PlugZap size={30} strokeWidth={1.6} />
                        </span>

                        <div className="min-w-0 pt-1">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                                Power conversion
                            </p>

                            <h3 className="mt-1 break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
                                {inverter?.manufacturer || "Manufacturer unavailable"}
                            </h3>

                            <p className="mt-1 break-words text-sm text-emerald-100/75">
                                {inverter?.model || "Inverter model unavailable"}
                            </p>
                        </div>
                    </div>

                    <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
                        {hasInverterDetails ? <CheckCircle2 size={14} /> : <Activity size={14} />}
                        {hasInverterDetails ? "Recommended" : "Details unavailable"}
                    </span>
                </div>

                <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <SummaryItem
                        label="Required Inverter Capacity"
                        value={hasRequiredCapacity ? formatNumber(requiredCapacity, 0) : "—"}
                        unit="W"
                    />

                    <SummaryItem
                        label="Recommended Inverters"
                        value={solarResult?.recommended_inverter_count != null ? formatNumber(inverterCount, 0) : (hasInverterDetails ? formatNumber(inverterCount, 0) : "—")}
                        unit="inverters"
                    />

                    <SummaryItem
                        label="Total Rated Power"
                        formula="Rated power × recommended quantity"
                        value={hasRatedPower ? formatNumber(totalRatedPower, 0) : "—"}
                        unit="W"
                    />
                </div>
            </div>

            {/* Inverter specifications */}
            <div>
                <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                        <Activity size={17} />
                    </span>

                    <div>
                        <h4 className="text-sm font-bold text-slate-900">
                            Inverter Specifications
                        </h4>

                        <p className="text-xs text-slate-500">
                            Electrical characteristics and power conversion
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {specifications.map((specification) => (
                        <Specification
                            key={specification.label}
                            icon={specification.icon}
                            label={specification.label}
                            value={specification.value}
                            unit={specification.unit}
                        />
                    ))}
                </div>
            </div>

            {/* Inverter capacity assessment */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-slate-200">
                        <Gauge size={20} />
                    </span>

                    <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900">
                            Inverter Capacity Assessment
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            Compares the combined rated inverter power with
                            the calculated inverter capacity requirement.
                            Surge loads and equipment compatibility must
                            also be considered.
                        </p>
                    </div>

                    <p className="shrink-0 text-lg font-bold text-emerald-700 sm:text-xl">
                        {hasRequiredCapacity && hasRatedPower ? `${formatNumber(capacityUtilization, 1)}%` : "—"}
                    </p>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                        style={{
                            width: `${capacityUtilization}%`,
                        }}
                    />
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                        Total rated power: {hasRatedPower ? formatNumber(totalRatedPower, 0) : "—"} W
                    </span>

                    <span>
                        Efficiency: {inverter?.efficiency_percent != null ? `${formatNumber(inverterEfficiency, 0)}%` : "—"}
                    </span>
                </div>

                {hasRequiredCapacity && hasRatedPower && (
                    <div
                        className={`mt-4 flex items-start gap-2 rounded-xl border p-3 ${
                            hasSufficientCapacity
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-amber-200 bg-amber-50 text-amber-800"
                        }`}
                    >
                        {hasSufficientCapacity ? (
                            <CheckCircle2
                                size={18}
                                className="mt-0.5 shrink-0"
                            />
                        ) : (
                            <Activity
                                size={18}
                                className="mt-0.5 shrink-0"
                            />
                        )}

                        <div>
                            <p className="text-sm font-semibold">
                                {hasSufficientCapacity
                                    ? "Rated power meets the calculated requirement"
                                    : "Rated power is below the calculated requirement"}
                            </p>

                            <p className="mt-1 text-xs leading-5">
                                {hasSufficientCapacity
                                    ? `${formatNumber(capacityDifference, 0)} W of rated power above the calculated requirement.`
                                    : `${formatNumber(Math.abs(capacityDifference), 0)} W of additional rated inverter power may be needed.`}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Installation summary */}

            <InstallationSummary
            title="Inverter Installation Summary"
            description="Confirm inverter capacity, battery compatibility, PV input limits, and electrical protection requirements before installation."
            manufacturer={inverter?.manufacturer}
            detailsLabel="Required Inverter Capacity"
            detailsValue={hasRequiredCapacity ? formatNumber(requiredCapacity, 0) : "Unavailable"}
            detailsUnit="W"
/>
          
        </SectionCard>
    );
}