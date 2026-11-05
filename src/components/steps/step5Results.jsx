import { CheckCircle2, SolarPanel, BatteryCharging, Zap, Gauge, Home, MapPin, AlertTriangle, Sun, Layers, Users,} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { fetchLatestResults } from "../../services/components/solarAssessmentService";
import SunPath from "./latest-components/SunPath";
// import EquipmentRow from "./latest-components/EquipmentRow";
import Error from "../common/Error";
import { LatestLoadingState } from "./latest-components/LoadingState";
import SectionCard from "./steps-components/SectionCard";
import CompletionBanner from "./steps-components/CompletionBanner";
import SolarPanelCard from "./latest-components/SolarPanel";
import BatteryCard from "./latest-components/BatteryCard";
import InverterCard from "./latest-components/InverterCard";
import RoofResultCard from "./latest-components/RoofResultCard";
import useNavigation from "../../contexts/NavigationProvider";
import ConfirmDialog from "../common/ConfirmDialog";
import SuccessModal from "../common/SuccessModal";




export default function Step5Results() {

    const [solarResult, setSolarResult] = useState(null);
    const [battery, setBattery] = useState({});
    const [inverter, setInverter] = useState({});
    const [panel, setPanel] = useState({});

    const {
           isLoadingResults, 
           resultError, 
           setIsLoadingResults, 
           setResultError,
           showFinishModal, 
           showFinishSuccess,
           setShowFinishModal, 
           setShowFinishSuccess,
           isFinishingAssessment, 
           handleFinishAssessment,
           setHasResult,
           navigate

    } = useNavigation();
   

    const loadResults = useCallback(async () => {
        try {
            setIsLoadingResults(true);
            setResultError("");

            const data = await fetchLatestResults();


            setSolarResult(data?.results ?? null);
            setPanel(data?.solarPanel);
            setBattery(data?.battery);
            setInverter(data?.inverter);
            setHasResult(Boolean(data?.hasResult && data?.results));

        } catch (err) {
            console.error("Error fetching results:", err);
            setResultError("Unable to load your latest solar assessment results.");
        } finally {
            setIsLoadingResults(false);
        }
    }, []);

    useEffect(() => {
        loadResults();
    }, [loadResults]);


   

    if (isLoadingResults) return <LatestLoadingState />;

    if (resultError) {
        return (
            <Error
                variant="card"
                tone="error"
                title="Unable to load assessment"
                message={resultError}
                error={resultError}
                onRetry={loadResults}
                retryLabel="Reload results"
                isRetrying={isLoadingResults}
            />
        );
    };

    if(showFinishModal){

        return (

          <ConfirmDialog
            isOpen={showFinishModal}
            variant="primary"
            title="Finish Your Solar Assessment?"
            message="Your solar assessment is complete, and your results and recommended solar equipment have been generated. You can access your results anytime from the Dashboard by navigating to Assessments. By finishing, your current assessment draft will be deleted. You can always start a new assessment whenever you need to assess another household or update your solar requirements. Thank You For Using Solar Guard!"
            confirmLabel="Finish Assessment"
            cancelLabel="Continue Reviewing"
            loadingLabel="Finishing Assessment..."
            isLoading={isFinishingAssessment}
            onCancel={() => {
                setShowFinishModal(false)
            }}
            onConfirm={handleFinishAssessment}
        />
        )
    };


    if(showFinishSuccess) {

        return (
          <SuccessModal
            open={showFinishSuccess}
            title="Assessment Completed Successfully!"
            message="Your solar assessment has been completed successfully. Your results and recommended solar equipment are available on your Dashboard under Assessments. Your assessment draft has been deleted, but you can start a new assessment whenever you need to."
            buttonLabel="Back to Dashboard"
            autoCloseMs={5000}
            onClose={() => {
                setShowFinishSuccess(false);
                navigate("/dashboard");
            }}
/>
        )
    }
    


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


        <SectionCard 

            title="Assessment Completed"
            status={solarResult?.assessment_status ?? "draft"}
            description="Your solar system, sized for your home"
            icon={CheckCircle2}
            className="flex flex-col gap-5"
        >

            <CompletionBanner
                title={`Household : ${solarResult?.household_name}`}
                description={"We worked out what your household uses each day and matched it with the panels, inverter and battery below"}
            />


            <SunPath
                values={readings}
            />

            <SolarPanelCard
                solarResult={solarResult}
                panel={panel ?? {}}
            />


           <BatteryCard
                battery={battery}
                solarResult={solarResult}
            />

            <InverterCard
                solarResult={solarResult}
                inverter={inverter}
            />

            <RoofResultCard 
                solarResult={solarResult}
            />


         
        </SectionCard>


    );
}