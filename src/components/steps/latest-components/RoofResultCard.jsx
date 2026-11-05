import { House, Sun, PanelsTopLeft, CheckCircle2, AlertTriangle, Ruler, Zap, Gauge, Info, ArrowUpRight,} from "lucide-react";
import SectionCard from "../steps-components/SectionCard";
import { formatNumber } from "../../../utils/charts/formatters";
import { Specification, SummaryItem, InstallationSummary } from "./Specification";


export default function RoofResultCard({ 
    solarResult = {} 
}) {



    const availableRoofArea = Number(solarResult?.available_roof_area_m2) || 0;
    const roofAreaSufficient = Number(solarResult?.roof_area_sufficient) === 1;
    
    const requiredSolarCapacity = Number(solarResult?.required_solar_capacity_watts) || 0;
    const recommendedPanelCount = Number(solarResult?.recommended_panel_count) || 0;
    const peakSunHours = Number(solarResult?.peak_sun_hours) || 0;

    const hasRoofArea = solarResult?.available_roof_area_m2 != null && availableRoofArea > 0;
    const hasRequiredCapacity = requiredSolarCapacity > 0;
    const hasPanelRecommendation = solarResult?.recommended_panel_count != null;

    const roofStatus = !hasRoofArea ? "Roof area unavailable" : roofAreaSufficient ? "Sufficient roof area" : "Insufficient roof area";

    const specifications = [
        {
            label: "Available Roof Area",
            value: hasRoofArea ? formatNumber(availableRoofArea, 2) : 0,
            unit: "m²",
            icon: House,
        },
        {
            label: "Required Panel Area",
            value: hasRoofArea ? formatNumber(solarResult?.required_panel_area, 2) : 0,
            unit: "m²",
            icon: Ruler,
        },
        {
            label: "Required Solar Capacity",
            value: hasRequiredCapacity ? formatNumber(requiredSolarCapacity, 2) : "—",
            unit: "W",
            icon: Zap,
        },
        {
            label: "Recommended Panels",
            value: hasPanelRecommendation ? formatNumber(recommendedPanelCount, 0) : "—",
            icon: PanelsTopLeft,
        },
        {
            label: "Peak Sun Hours",
            value: solarResult?.peak_sun_hours != null ? formatNumber(peakSunHours, 1) : "—",
            unit: "h/day",
            icon: Sun,
        },
    ];

    return (
        
        <SectionCard
            title="Roof Assessment"
            description="Review the calculated roof suitability and solar installation requirements."
            icon={House}
        >

            <div className="space-y-5">

                {/* Roof illustration and status */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50">
                    <div className="grid grid-cols-1 items-center gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-5">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                {!hasRoofArea ? (
                                    <Info size={18} className="shrink-0 text-amber-600" />
                                ) : roofAreaSufficient ? (
                                    <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                                ) : (
                                    <AlertTriangle size={18} className="shrink-0 text-amber-600" />
                                )}

                                <p className={`text-sm font-bold ${
                                    !hasRoofArea
                                        ? "text-amber-800"
                                        : roofAreaSufficient
                                            ? "text-emerald-800"
                                            : "text-amber-800"
                                }`}>
                                    {roofStatus}
                                </p>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {!hasRoofArea
                                    ? "No positive roof area is available in this assessment. Roof suitability cannot be confirmed until valid roof area data is recorded."
                                    : roofAreaSufficient
                                        ? "The calculated assessment indicates that the available roof area is sufficient for the proposed solar installation."
                                        : "The calculated assessment indicates that the available roof area is insufficient for the proposed solar installation."
                                }
                            </p>
                        </div>

                        {/* Decorative house illustration */}
                        <div className="flex justify-center sm:justify-end">
                            <div className="relative flex h-32 w-36 items-end justify-center">
                                <Sun
                                    size={34}
                                    className="absolute right-1 top-0 text-amber-400"
                                    strokeWidth={1.5}
                                />

                                <div className="absolute bottom-0 h-[72px] w-[100px] rounded-t-lg border-2 border-slate-300 bg-white shadow-sm">
                                    <div className="absolute bottom-0 left-3 h-9 w-6 rounded-t-sm border-2 border-sky-200 bg-sky-50">
                                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-sky-200" />
                                        <span className="absolute left-0 top-1/2 h-px w-full bg-sky-200" />
                                    </div>

                                    <div className="absolute bottom-0 right-3 h-12 w-7 rounded-t-md border-2 border-amber-200 bg-amber-50" />
                                </div>

                                <div className="absolute bottom-[65px] left-1/2 h-0 w-0 -translate-x-1/2 border-b-[44px] border-l-[65px] border-r-[65px] border-b-emerald-700 border-l-transparent border-r-transparent" />

                                <div className="absolute bottom-[81px] left-1/2 z-10 flex h-5 w-16 -translate-x-1/2 -rotate-[18deg] items-center justify-center rounded-sm border border-sky-300 bg-sky-800 shadow-sm">
                                    <span className="h-full w-px bg-sky-300" />
                                    <span className="absolute inset-x-0 top-1/2 h-px bg-sky-300" />
                                </div>

                                <div className="absolute bottom-0 h-1 w-32 rounded-full bg-emerald-200" />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Calculated values */}
                <div>
                    <h3 className="mb-3 text-sm font-bold text-slate-900">
                        Calculated Roof Results
                    </h3>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {specifications.map((specification) => (
                            <Specification
                                key={specification.label}
                                {...specification}
                            />
                        ))}
                    </div>
                </div>

              

                {/* Installation guidance */}
                <InstallationSummary
                    title="Roof Installation Summary"
                    description={!hasRoofArea
                        ? "The assessment contains no positive available roof area. Verify the roof assessment data before deciding whether the proposed panels can be installed. A qualified installer should confirm usable space, roof condition, shading, and mounting requirements."
                        : roofAreaSufficient
                            ? "The calculated roof area passes the current suitability check. Confirm usable panel space, structural condition, orientation, shading, access paths, and mounting requirements with a qualified installer."
                            : "The calculated roof area does not meet the current suitability check. Review the available roof space, panel layout, and alternative mounting options with a qualified solar installer."
                    }
                    detailsLabel="Roof Suitability"
                    detailsValue={roofStatus}
                />
            </div>

        </SectionCard>
    );
}