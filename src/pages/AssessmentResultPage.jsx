import { ClipboardList,RefreshCw,CheckCircle2} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { fetchResults } from "../services/components/solarAssessmentService";
import ResultsSkeleton from "../components/results/ResultsSkeleton";
import AssessmentResultsHeader from "../components/results/AssessmentResultsHeader";
import ContactButton from "../components/common/ContactButton";
import SectionCard from "../components/steps/steps-components/SectionCard";
import SunPath from "../components/steps/latest-components/SunPath";
import SolarPanelCard from "../components/steps/latest-components/SolarPanel";
import BatteryCard from "../components/steps/latest-components/BatteryCard";
import InverterCard from "../components/steps/latest-components/InverterCard";
import RoofResultCard from "../components/steps/latest-components/RoofResultCard";
import Error from "../components/common/Error";
import useOnlineStatus from "../hooks/useOnlineStatus";
import EmptyState from "../components/common/EmptyState";
import useDownloadAssessment from "../hooks/components/useDownloadAssessment";
import Footer from "../components/footer/Footer";

export default function AssessmentResultPage() {

    const navigate = useNavigate();
    const {state} = useLocation();
    const isOnline = useOnlineStatus();



    const [solarResult, setSolarResult] = useState(null);
    const [inverter, setInverter] = useState(null);
    const [battery, setBattery] = useState(null);
    const [panel, setPanel] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");


    const {downloadAssessment, isDownloading,downloadError} = useDownloadAssessment(setError);

    if(!state) {

        return(
           <>
            <Error
                variant="card"
                tone="error"
                error={"Error Passing Data Return To Households"}
                onRetry={() => navigate("/households")}
                retryLabel="Go Back To Households Page"
             />
             <Footer/>
           </>
        )
    };

    const {assessment_id, household_id, household_name, created_at, updated_at, path} = state


   const loadResults = useCallback(async () => {

    setIsLoading(true);
    setError("");

    setSolarResult(null);
    setInverter(null);
    setBattery(null);
    setPanel(null);

    try {

        const data = await fetchResults(household_id, assessment_id);

        setSolarResult(data?.results ?? null);
        setInverter(data?.inverter ?? null);
        setBattery(data?.battery ?? null);
        setPanel(data?.solarPanel ?? null);

    } catch (error) {

        console.error("Error Fetching Results:", error);  

        setError(error.message || "Failed to fetch assessment results.");

    } finally {

        setIsLoading(false);

    }

}, [household_id, assessment_id]);


    useEffect(() => {
        loadResults();
    },[loadResults])



    const readings = [
        {
            label: "Daily Energy",
            value: Number(solarResult?.total_daily_energy_kwh ?? 0),
            unit: "kWh/day",
            description: "Estimated daily household energy consumption.",
        },
        {
            label: "Peak Load",
            value: Number(solarResult?.peak_load_watts ?? 0) / 1000,
            unit: "kW",
            description: "Estimated maximum simultaneous power demand.",
        },
        {
            label: "Peak Sun Hours",
            value: Number(solarResult?.peak_sun_hours ?? 0),
            unit: "hours/day",
            description: "Equivalent hours of peak sunlight available daily.",
        },
        {
            label: "Required Solar Capacity",
            value: Number(solarResult?.required_solar_capacity_watts ?? 0) / 1000,
            unit: "kW",
            description: "Estimated solar panel capacity required for your household.",
        },
        {
            label: "Required Battery Capacity",
            value: Number(solarResult?.required_battery_capacity_kwh ?? 0),
            unit: "kWh",
            description: "Estimated battery storage capacity required.",
        },
        {
            label: "Required Inverter Capacity",
            value: Number(solarResult?.required_inverter_capacity_watts ?? 0) / 1000,
            unit: "kW",
            description: "Estimated inverter capacity required to support your loads.",
        },
    ];

    return (


        <main className="min-h-screen bg-slate-50/70">

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* Page header */}
                <AssessmentResultsHeader
                    householdName={household_name}
                    createdAt={created_at}
                    updatedAt={updated_at}
                    onBack={() => navigate(path)}
                    onDownload={() => downloadAssessment(household_id, assessment_id)} 
                    isDownloading={isDownloading}
                />


                {/* Loading */}
                {isLoading && (<ResultsSkeleton />) }

                {/* Error */}
                {(!isLoading && (error || downloadError)) && (
                    
                    <Error
                        variant="card"
                        tone="error"
                        error={error || downloadError}
                        action={<ContactButton/>}
                        onRetry={downloadError ? downloadAssessment : loadResults}
                        offline = {!isOnline}
                        retryLabel={downloadError ? "Download Results" : "loadResults"}
                    />
                )}

                {/* No saved result */}
                {(!isLoading && !(error || downloadError) && !solarResult) && (

                    <EmptyState
                        title="Results Are Unavailable"
                        description="We couldn't find the solar assessment results for this household. Please try refreshing or recalculate your assessment if the problem persists."
                        icon={ClipboardList}
                        variant="danger"
                        animated={false}
                        action={
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                <RefreshCw size={16} />
                                Refresh Results
                            </button>
                        }
                    />

                )}

                {/* Assessment result content */}
                {(!isLoading && !(error || downloadError) && solarResult )&& (

                    <SectionCard
                        title="Assessment Completed"
                        status={solarResult?.assessment_status}
                        description="Your solar system, sized for your home"
                        icon={CheckCircle2}
                        className="flex flex-col gap-5"
                    >

                        <SunPath values={readings} />

                        <SolarPanelCard
                            solarResult={solarResult}
                            panel={panel}
                        />

                        <BatteryCard
                            battery={battery}
                            solarResult={solarResult}
                        />

                        <InverterCard
                            solarResult={solarResult}
                            inverter={inverter}
                        />

                        <RoofResultCard solarResult={solarResult} />
                    </SectionCard>

                )}

            </div>

        </main>
      
    );
}
