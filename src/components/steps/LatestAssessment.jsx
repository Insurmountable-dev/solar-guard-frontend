import { CalendarDays, Clock3, Home, ArrowRight, Calculator, Loader2,} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchLatestAssesment } from "../../services/components/solarAssessmentService";
import { formatDate } from "../../utils/charts/formatters";
import SectionCard from "./steps-components/SectionCard";
import SunPath from "./latest-components/SunPath";
import LoadingState from "./latest-components/LoadingState";
import Error from "../common/Error";
import { DateStat } from "../common/stats";
import Button from "../common/Button";
import useNavigation from "../../contexts/NavigationProvider";
import useAssessments from "../../hooks/pages/useAssessments";
import LoadingSpinner from "../common/LoadingSpinner";
import SuccessModal from "../common/SuccessModal";
import { calculateMessages } from "../../constants/messages";


const STAGES = [

    { key: "draft", label: "Draft", x: 24, y: 76 },
    { key: "completed", label: "Calculated", x: 150, y: 30 },
    { key: "reviewed", label: "Reviewed", x: 276, y: 76 },

]


export default function LatestAssessment() {


    const [latestAssessment, setLatestAssessment] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {isCalculating, setIsCalculating, setHasResult} = useNavigation();
    const {handleCalculateResults} = useAssessments();


    useEffect(() => {

        let cancelled = false;

        async function getLatestAssessment() {

            try {

                const data = await fetchLatestAssesment();

                if (cancelled) return;


                setLatestAssessment(data.latestAssessment ?? null);
                setHasResult(data?.hasResult);

            } catch (error) {

                if (cancelled) return;

                console.error("error fetching latest assessment Results Page:",error);
                setError(error);

            } finally {

                if (!cancelled) setLoading(false);

            }
        };

        getLatestAssessment();

        return () => {
            cancelled = true;
        };

    }, []);


    if (!loading && !latestAssessment && !error) return null;

    if(isCalculating) {

        return (

            <LoadingSpinner
                fullPage
                showProgress
                autoClose
                onClose={() => {
                    setIsCalculating(false);
                    setShowSuccess(true);
                }}
                loop = {false}
                messages={calculateMessages}

            />

        )
    };

    if(showSuccess) {

        return (

            <SuccessModal
                open={showSuccess}
                title="Solar Assessment Completed Successfully!"
                autoCloseMs={3000}
                buttonLabel="View Results"
                onClose={() =>{
                    setShowSuccess(false);
                    setHasResult(true)
                }}
            />
        )
    };

    const status = (latestAssessment?.assessment_status ?? "draft").toLowerCase();
    const isDraft = status === "draft";

  
    return (

        <SectionCard
            title={latestAssessment?.household_name ?? "Latest assessment"}
            description="Continue your latest assessment and discover the right solar system for your household."
            status={latestAssessment?.assessment_status}
            icon={Home}
        >

            {loading ? (
                <LoadingState />
            ) : error ? (

               <Error
                title="We couldn't load your latest assessment"
                message="Check your connection and try again."
                error={error}
              />

            ) : (

                <div className="space-y-5 p-5 sm:p-6">

                    {/* Hero: where this assessment is on its journey */}

                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-amber-50/70 via-emerald-50/40 to-white px-4 pb-1 pt-4 ring-1 ring-emerald-900/5 sm:px-6">
                   
                        <p className="text-sm font-semibold text-gray-900">Your solar recommendations are waiting</p>
                        <p className="mt-1 max-w-md text-sm leading-5 text-gray-600">Calculate your household's energy needs to see the panels, batteries and inverter capacity we recommend.</p>
                        <div className="mx-auto mt-2 max-w-md">
                            <SunPath/>
                        </div>
                    </div>

                    {/* Dates */}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-gray-100">

                        <DateStat
                            icon={CalendarDays}
                            label="Date created"
                            value={formatDate(latestAssessment?.created_at)}
                        />
                        <DateStat
                            icon={Clock3}
                            label="Last updated"
                            value={formatDate(latestAssessment?.updated_at)}
                        />

                    </div>

                    {/* Primary action */}

                    <Button
                        type="button"
                        variant = "primary"
                        onClick={() => handleCalculateResults(latestAssessment?.household_id , latestAssessment?.assessment_id, setIsCalculating)}
                        disabled={isCalculating}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-700 px-4 py-3.5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/20 transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                    >

                    {isCalculating ? (
                        <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                                aria-hidden="true"
                            />
                            Calculating Your Results...
                        </>

                    ) : (

                        <>
                            <Calculator
                                size={18}
                                aria-hidden="true"
                            />
                            Calculate Your Results
                        </>

                    )}
            
                    </Button>

                </div>
            )}
        </SectionCard>
    );
}