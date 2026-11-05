import { BatteryCharging, Zap, Gauge, Layers3, ShieldCheck, Factory, Activity, CheckCircle2, Clock, BatteryFull,} from "lucide-react";
import SectionCard from "../steps-components/SectionCard";
import { formatNumber } from "../../../utils/charts/formatters";
import { InstallationSummary, Specification, SummaryItem } from "./Specification";
import EmptyState from "../../common/EmptyState";

export default function BatteryCard({
    solarResult,
    battery = null,


}) {


     if(!battery) {
    
            return (
                <EmptyState
                    title="Battery Unavailable"
                    description="No recommended battery is available for this assessment."
                    icon={BatteryCharging}
                    variant="danger"
                    animated={false}
                />
            )
    
        }

    const hasBatteryDetails = Object.values(battery).some((value) => {

        return ( value !== null &&  value !== undefined &&  value !== "" )
    });

 

    const batteryCount = Number(solarResult?.recommended_battery_count) || 0;
    const batteryEnergyCapacity = Number(battery?.energy_capacity_kwh) || 0;
    const batteryDepthOfDischarge = Number(battery?.depth_of_discharge_percent) || 0;
    const batteryEfficiencyPercent = Number(battery?.efficiency_percent) || 0;
    const batteryNominalVoltage = Number(battery?.nominal_voltage_v) || 0;
    const batteryCapacityAh = Number(battery?.capacity_ah) || 0;
    const batteryCycleLife = Number(battery?.cycle_life) || 0;
    const batteryWarrantyYears = Number(battery?.warranty_years) || 0;

    const usableCapacity = batteryEnergyCapacity * (batteryDepthOfDischarge / 100) * (batteryEfficiencyPercent / 100) * batteryCount;
    const totalCapacity = batteryEnergyCapacity * batteryCount;


    const requiredCapacity = Number(solarResult?.required_battery_capacity_kwh) || 0;
    const hasRequiredCapacity = requiredCapacity > 0;
    const hasSufficientCapacity = (hasRequiredCapacity) && (usableCapacity >= requiredCapacity);

    const capacityDifference = usableCapacity - requiredCapacity;


    const specifications = [

        {
            label: "Battery Type",
            value: (battery?.battery_type) ? battery.battery_type.replaceAll("_", " ").toUpperCase()  : "—",
            icon: BatteryCharging,
        },
        {
            label: "Energy Capacity",
            value: formatNumber(batteryEnergyCapacity),
            unit: "kWh",
            icon: Zap,
        },
        {
            label: "Nominal Voltage",
            value: formatNumber(batteryNominalVoltage, 0),
            unit: "V",
            icon: Activity,
        },
        {
            label: "Battery Capacity",
            value: formatNumber(batteryCapacityAh, 0),
            unit: "Ah",
            icon: Gauge,
        },
        {
            label: "Depth of Discharge",
            value: formatNumber(batteryDepthOfDischarge,0),
            unit: "%",
            icon: Layers3,
        },
        {
            label: "Battery Efficiency",
            value: formatNumber(batteryEfficiencyPercent, 0),
            unit: "%",
            icon: Activity,
        },
        {
            label: "Cycle Life",
            value:(battery?.cycle_life != null) ? formatNumber(batteryCycleLife, 0): "—",
            unit: "cycles",
            icon: Clock,
        },
        {
            label: "Warranty",
            value:(battery?.warranty_years != null )? formatNumber(batteryWarrantyYears, 0)  : "—",
            unit: "years",
            icon: ShieldCheck,
        },
    ];


    return (
        
        <SectionCard
            title="Recommended Battery"
            description="Battery details and specifications for your solar installation"
            icon={BatteryCharging}
            status={hasBatteryDetails ? "completed" : "pending"}
            contentClassName="flex flex-col gap-5"
        >

            {/* Battery identity */}
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
                            <BatteryCharging
                                size={30}
                                strokeWidth={1.6}
                            />
                        </span>

                        <div className="min-w-0 pt-1">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                                Energy storage
                            </p>

                            <h3 className="mt-1 break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
                                {battery?.manufacturer || "Manufacturer unavailable"}
                            </h3>

                            <p className="mt-1 break-words text-sm text-emerald-100/75">
                                {battery?.model || "Battery model unavailable"}
                            </p>
                        </div>
                    </div>

                    <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
                        <CheckCircle2 size={14} />
                        Recommended
                    </span>
                </div>

                <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <SummaryItem
                        label="Required Battery Capacity"
                        value={ formatNumber(requiredCapacity) || "—"}
                        unit="kWh"
                    />

                    <SummaryItem
                        label="Recommended Batteries"
                        value={formatNumber(solarResult?.recommended_battery_count, 0)}
                        unit="batteries"
                    />

                  <SummaryItem
                        label="Total Nominal Energy"
                        formula="(energy Capacity x recommended batteries)"
                        value={formatNumber(totalCapacity) ?? "—"}
                        unit="kWh"
                   />
                </div>
            </div>

            {/* Battery specifications */}
            <div>
                <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                        <Activity size={17} />
                    </span>

                    <div>
                        <h4 className="text-sm font-bold text-slate-900">
                            Battery Specifications
                        </h4>

                        <p className="text-xs text-slate-500">
                            Electrical characteristics and expected lifespan
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

            {/* Usable capacity */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

                <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-slate-200">
                        <BatteryFull size={20} />
                    </span>

                    <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900">
                            Estimated Usable Capacity
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            Estimated energy available after accounting
                            for depth of discharge and battery efficiency.
                        </p>
                    </div>

                    <p className="shrink-0 text-lg font-bold text-emerald-700 sm:text-xl">
                        {usableCapacity !== null ? `${formatNumber(usableCapacity)} kWh` : "—"}
                    </p>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                        style={{
                            width:`${Math.min(100, Math.max(0, (usableCapacity / totalCapacity) * 100))}%`
                        }}
                    />
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                       {batteryCount} {batteryCount === 1 ? "battery" : "batteries"} recommended
                    </span>

                    <span>
                        {`${formatNumber(battery?.depth_of_discharge_percent, 0)}% Depth Of Discharge` ?? "DoD unavailable"}

                        {` ·${formatNumber(battery?.efficiency_percent, 0)}% Battery Efficiency` ?? ""}
                    </span>
                </div>

                {/* Capacity assessment */}
                {hasRequiredCapacity && usableCapacity !== null && (

                    <div
                        className={`mt-4 flex items-start gap-2 rounded-xl border p-3 ${
                            hasSufficientCapacity
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-amber-200 bg-amber-50 text-amber-800"
                        }`}
                    >
                        {hasSufficientCapacity ? (<CheckCircle2 size={18} className="mt-0.5 shrink-0"/>) : (<Activity size={18} className="mt-0.5 shrink-0"/>)}

                        <div>
                            <p className="text-sm font-semibold">
                                {hasSufficientCapacity
                                    ? "Estimated capacity meets the requirement"
                                    : "Estimated capacity is below the requirement"}
                            </p>

                            <p className="mt-1 text-xs leading-5">
                                {hasSufficientCapacity
                                    ? `${formatNumber(capacityDifference)} kWh estimated capacity above the required capacity.`
                                    : `${formatNumber(Math.abs(capacityDifference))} kWh of additional battery energy capacity may be needed to reach the required battery capacity.`
                                }
                            </p>
                        </div>
                    </div>
                )}

            </div>

            {/* Installation summary */}
          <InstallationSummary
            title="Battery Installation Summary"
            description="Confirm battery configuration, system voltage, inverter compatibility, and installation requirements with a qualified solar installer before purchasing equipment."
            manufacturer={battery?.manufacturer}
            detailsLabel="Required Capacity"
            detailsValue={solarResult?.required_battery_capacity_kwh}
            detailsUnit="kWh"
        />     

        </SectionCard>
    );
}