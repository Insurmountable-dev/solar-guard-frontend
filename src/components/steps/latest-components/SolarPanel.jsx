import {Sun,Zap,Gauge,Ruler,Weight,ShieldCheck,Factory,Layers3,Activity,CheckCircle2,PanelsTopLeft} from "lucide-react";
import SectionCard from "../steps-components/SectionCard";
import { formatNumber } from "../../../utils/charts/formatters";
import { Specification, SummaryItem } from "./Specification";
import { InstallationSummary } from "./Specification";
import EmptyState from "../../common/EmptyState";



export default function SolarPanelCard({
    solarResult,
    panel = null
}) {

    if(!panel){

        return(
            <EmptyState
                title="Solar Panel Unavailable"
                description="No recommended solar panel is available for this assessment."
                icon={PanelsTopLeft}
                variant="danger"
                animated={false}
            />
        )
    }

    const hasPanelDetails = Object.values(panel).some((value) => value !== null && value !== undefined && value !== "");


    const specifications = [
        {
            label: "Panel Type",
            value: panel?.panel_type || "—",
            icon: Layers3,
        },
        {
            label: "Rated Power",
            value: formatNumber(panel?.rated_power_watts),
            unit: "W",
            icon: Zap,
        },
        {
            label: "Efficiency",
            value: formatNumber(panel?.efficiency_percent),
            unit: "%",
            icon: Gauge,
        },
        {
            label: "Voltage",
            value: formatNumber(panel?.voltage_v),
            unit: "V",
            icon: Activity,
        },
        {
            label: "Current",
            value: formatNumber(panel?.current_a),
            unit: "A",
            icon: Activity,
        },
        {
            label: "Length",
            value: formatNumber(panel?.length_m),
            unit: "m",
            icon: Ruler,
        },
        {
            label: "Width",
            value: formatNumber(panel?.width_m),
            unit: "m",
            icon: Ruler,
        },
        {
            label: "Weight",
            value: formatNumber(panel?.weight_kg),
            unit: "kg",
            icon: Weight,
        },
        {
            label: "Warranty",
            value: formatNumber(panel?.warranty_years, 0),
            unit: "years",
            icon: ShieldCheck,
        },
    ];

    return (

        <SectionCard
            title="Recommended Solar Panel"
            description="Panel details and specifications for your solar installation"
            icon={Sun}
            status={hasPanelDetails ? "completed" : "pending"}
            contentClassName="flex flex-col gap-5"
        >

            {/* Panel identity */}
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
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-amber-300 shadow-lg backdrop-blur-sm sm:h-16 sm:w-16">
                            <Sun size={30} strokeWidth={1.6} />
                        </span>

                        <div className="min-w-0 pt-1">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                                Solar equipment
                            </p>

                            <h3 className="mt-1 break-words text-xl font-bold tracking-tight text-white sm:text-2xl">
                                {panel?.manufacturer ?? "Manufacturer Unvailable.."}
                            </h3>

                            <p className="mt-1 break-words text-sm text-emerald-100/75">
                                {panel?.model}
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
                        label="Required Solar Capacity"
                        value={formatNumber(solarResult?.required_solar_capacity_watts || 0)}
                        unit="W"
                    />

                    <SummaryItem
                        label="Recommended Panels"
                        value={formatNumber(solarResult?.recommended_panel_count, 0)}
                        unit="panels"
                    />

                    <SummaryItem
                        label="Panel Rated Power"
                        value={panel?.rated_power_watts != null
                                ? formatNumber(panel?.rated_power_watts )
                                : "—"
                        }
                        unit={panel?.rated_power_watts != null ? "W each" : ""}
                    />
                </div>
            </div>

            {/* Panel specifications */}
            <div>
                <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                        <Activity size={17} />
                    </span>

                    <div>
                        <h4 className="text-sm font-bold text-slate-900">
                            Panel Specifications
                        </h4>

                        <p className="text-xs text-slate-500">
                            Technical and physical characteristics
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

            {/* Installation summary */}
            <InstallationSummary
                title="Solar Panel Installation Summary"
                description="Confirm panel quantity, total array capacity, roof suitability, orientation, shading, and mounting requirements with a qualified solar installer."
                manufacturer={panel?.manufacturer}
                detailsLabel="Required Solar Capacity"
                detailsValue={solarResult?.required_solar_capacity_watts}
                detailsUnit="W"
            />

        </SectionCard>
    );
}
