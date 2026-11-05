import { Ruler, Home, Layers, Plug,Mountain, Compass, MapPin, Building2, Users,  DoorOpen, Zap, Sun, CheckCircle2,ClipboardCheck, BatteryCharging, PanelsTopLeft, Gauge, ArrowRight, Info,} from "lucide-react";
import StepsHeader from "./steps-components/StepsHeader";
import SectionCard from "./steps-components/SectionCard";
import {GridTexture,PanelGlows,CornerTicks } from "./review-components/DecorativeComponents";
import { SummaryItem, SectionHeading, StatusPill, StatTile, MetricCard, ApplianceRow} from "./review-components/ReviewBlocks";
import AreaDisplay from "./steps-components/AreaDisplay";
import { fetchDraft } from "../../services/pages/draftService";
import { useEffect, useState } from "react";


const formatNumber = (value) => new Intl.NumberFormat("en-KE").format(value);



/* ───────────────────────── Page ───────────────────────── */

export default function Step4Review() {

    const [draft, setDraft] = useState(null);

    // Fetch Draft Data For Review Page
    useEffect(() => {

        let cancelled = false;

        async function loadDraft () {

            try {

                const data = await fetchDraft();

                if (cancelled) return;

                setDraft(data?.draft ?? null);

            } catch (error) {

                if (!cancelled) {
                    console.error("Unable To Fetch Draft Data ", error.message);
                }

            }

        }

        loadDraft();

        return () => {
            cancelled = true;
        };

    }, []);


    const householdData = draft?.household_data ?? {}
    const measurementData = draft?.measurement_data ?? {}
    const appliancesData = draft?.appliances_data ?? [];



    const totalUnits = (appliancesData.reduce((total, appliance) => {

            return total + Number(appliance.quantity);

    }, 0)).toFixed(2);

    const dailyEnergy = ( appliancesData.reduce((total, ap) => {

            return total + ( Number(ap.quantity) * Number(ap.hours_per_day) * Number(ap.power_rating_watts))

     },0) / 1000 ).toFixed(2);

     const maxEnergy = Math.max(0, ...appliancesData.map((ap) => {

        return  ((Number(ap.quantity) * Number(ap.hours_per_day) * Number(ap.power_rating_watts))) / 1000;

     }));




    const essentialCount = appliancesData.filter((ap) => ap.is_essential === true).length


    return (

        <div className="mx-auto w-full min-w-0 max-w-5xl space-y-5 sm:space-y-6">

            {/* Introduction */}
            <StepsHeader
                title="Review your assessment"
                description="Take a moment to check your household details, roof information and appliance usage before calculating your solar requirements."
            />

            {/* Completion banner */}
            <div className="relative flex min-w-0 items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 p-5 text-white shadow-[0_20px_40px_-20px_rgba(16,185,129,0.8)] sm:items-center sm:gap-5 sm:p-7">

                <GridTexture />
                <PanelGlows />
                <CornerTicks />

                <div aria-hidden="true" className="relative flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                    <span className="absolute inset-0 rounded-2xl bg-white/20 motion-safe:animate-ping [animation-duration:2.5s]" />
                    <span className="relative flex h-full w-full items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] ring-4 ring-white/25">
                        <ClipboardCheck size={26} strokeWidth={2.5} />
                    </span>
                </div>

                <div className="relative min-w-0 flex-1">
                    <h3 className="text-lg font-black tracking-tight sm:text-2xl">
                        Your assessment is ready for review
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-emerald-50/90 sm:text-sm">
                        Check that your information reflects your home and
                        typical electricity usage. The sizing figures below
                        are illustrative sample values.
                    </p>
                </div>

                <CheckCircle2
                    size={22}
                    className="relative mt-1 shrink-0 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] sm:mt-0"
                    aria-hidden="true"
                />
            </div>

            {/* Household overview */}

            <section>

                <SectionCard
                    icon={Home}
                    title="Household details"
                    description="Your property and location information."
                >

                    <div className="space-y-5">

                        <SectionHeading
                            title={householdData?.household_name}
                            // onEdit={onEditHousehold}
                        />

                        <div className="flex flex-col gap-3 sm:gap-4">

                                <SummaryItem
                                    icon={Building2}
                                    label="House type"
                                    value={householdData?.house_type ?? "Not Recorded"}
                                />

                                <SummaryItem
                                    icon={Home}
                                    label="Building type"
                                    value={householdData?.building_type ?? "Not Recorded"}
                                />

                                <SummaryItem
                                    icon={MapPin}
                                    label="Location"
                                    value={`${householdData?.area}, ${householdData?.county}` ?? "Not Recorded"}
                                    description={householdData?.area}
                                />

                                <SummaryItem
                                    icon={Layers}
                                    label="Floors"
                                    value={householdData?.number_of_floors ?? "Not Recorded"}
                                />

                                <SummaryItem
                                    icon={DoorOpen}
                                    label="Rooms"
                                    value={householdData?.number_of_rooms ?? "Not Recorded"}
                                />

                                <SummaryItem
                                    icon={Users}
                                    label="Residents"
                                    value={householdData?.number_of_occupants}
                                />

                        </div>

                        <div className="flex flex-wrap gap-2 border-t border-dashed border-slate-200 pt-4">
                            <StatusPill
                                active={householdData?.has_grid_connection ?? false}
                                icon={Zap}
                                activeLabel="Grid connected"
                                inactiveLabel="No grid connection"
                            />

                            <StatusPill
                                active={householdData?.has_existing_solar ?? false}
                                icon={Sun}
                                activeLabel="Existing solar"
                                inactiveLabel="No existing solar"
                            />
                        </div>


                    </div>

                </SectionCard>


            </section>


   

            {/* Measurement overview */}
            <section>

                <SectionCard
                    icon={PanelsTopLeft}
                    title="Roof and installation details"
                    description="Information used to assess solar panel placement."
                >

                    <div className="space-y-5">

                        <SectionHeading
                            title="Roof information"
                            // onEdit={onEditRoof}
                        />

                        <div className="flex flex-col gap-3 sm:gap-4">

                            <SummaryItem
                                icon={Home}
                                label="Roof type"
                                value={measurementData?.roof_type}
                            />

                             <SummaryItem
                                icon={Layers}
                                label="Roof Material"
                                value={measurementData?.roof_material}
                            />


                            <SummaryItem
                                icon={Ruler}
                                label="House Length"
                                value={measurementData?.house_length}
                            />

                            <SummaryItem
                                icon={Ruler}
                                label="House Width"
                                value={measurementData?.house_width}
                            />

                            <AreaDisplay 
                                label={"House Area"}
                                length={measurementData?.house_length ?? 0}
                                width= {measurementData?.house_width ?? 0}
                            />

                            <SummaryItem
                                icon={Ruler}
                                label="Roof Length"
                                value={measurementData?.roof_length}
                            />

                            <SummaryItem
                                icon={Ruler}
                                label="Roof Width"
                                value={measurementData?.roof_width}
                            />

                            
                            <AreaDisplay 
                                label={"Roof Area"}
                                length={measurementData?.roof_length ?? 0}
                                width= {measurementData?.roof_width ?? 0}
                            />



                            <SummaryItem
                                icon={Sun}
                                label="Orientation"
                                value={measurementData?.roof_orientation}
                            />


                            <SummaryItem
                                icon={Sun}
                                label="Shading Level"
                                value={measurementData?.shading_level}
                            />


                              <SummaryItem
                                icon={Sun}
                                label="Measurement Method"
                                value={measurementData?.measurement_method}
                            />


                        </div>


                    </div>

                </SectionCard>

            </section>



            {/* Appliance summary */}

            <section>


                <SectionCard
                    icon={Plug}
                    title="Appliance summary"
                    description="Review the appliances and their typical daily usage."
                >


                    <div className="space-y-5">

                        <SectionHeading
                            title="Your appliances"
                            count={appliancesData?.length}
                            // onEdit={onEditAppliances}
                        />

                        {/* Appliance statistics */}

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                            <StatTile
                                label="Total units"
                                value={formatNumber(totalUnits)}
                                highlight
                            />

                            <StatTile
                                label="Appliance types"
                                value={appliancesData?.length}
                            />

                            <StatTile
                                label="Essential types"
                                value={essentialCount}
                                className="col-span-2 sm:col-span-1"
                            />

                        </div>

                        {/* Appliance list */}

                        <div className="flex flex-col gap-3 sm:gap-4">

                            {appliancesData.map((appliance, index) => (

                                <ApplianceRow
                                    key={`${appliance.name}-${index}`}
                                    appliance={appliance}
                                    index={index}
                                    maxEnergy={maxEnergy}
                                />

                            ))}

                        </div>

                        {appliancesData?.length === 0 && (

                            <p className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 p-5 text-center text-sm font-medium text-slate-500">
                                No appliances have been added.
                            </p>

                        )}

                    </div>


                </SectionCard>


            </section>

            {/* Solar sizing preview */}

                 <MetricCard
                    hero
                    icon={Zap}
                    label="Daily energy"
                    value={dailyEnergy}
                    unit="kWh/day"
                    description="Estimated energy consumption"
                />


            {/* Final confirmation */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-white via-emerald-50/40 to-white p-5 shadow-sm sm:p-6">

                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
                />
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-200/40 blur-3xl"
                />
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-emerald-400 via-teal-400 to-transparent"
                />

                <div className="relative flex items-center gap-4">

                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,0.9)] sm:h-14 sm:w-14">
                        <CheckCircle2 size={24} strokeWidth={2.5} aria-hidden="true" />
                    </span>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black tracking-tight text-slate-900 sm:text-lg">
                            Ready to calculate?
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                            Once your details are correct, click continue to
                            create an assessment for your home's solar requirements and
                            explore suitable equipment.
                        </p>
                    </div>

                   
                </div>
            </div>

        </div>

    );
}