import { Plus, ArrowLeft, House } from "lucide-react";
import {useState,useEffect, useCallback} from "react"
import { fetchHouseholdDetails } from "../services/pages/householdsService"
import { assessmentMessages } from "../constants/messages";

import AssessmentHeader from "../components/assessment/AssessmentHeader";
import Footer from "../components/footer/Footer";
import Error from "../components/common/Error";
import HouseholdBody from "../components/household/HouseholdBody";
import HouseholdLoadingState from "../components/household/HouseholdLoadingState";
import ContactButton from "../components/common/ContactButton";
import useOnlineStatus from "../hooks/useOnlineStatus";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import useNavigation from "../contexts/NavigationProvider";
import useAssessments from "../hooks/pages/useAssessments";
import Sleep from "../utils/Sleep";

export default function HouseholdsPages () {

    const [data, setData] = useState(null);
    const {isOnline} = useOnlineStatus();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);

    const {setLoadingMessages, setPathname, setShowLoaderApp} = useNavigation();
    const {hasDraft} = useAssessments();

    const path = hasDraft ? "/assessments-prompt" : "/assessments"

    const loadHouseholds = useCallback(async() => {

        setIsLoading(true);
        setError(null);
        setData(null);

        try{

            const response = await fetchHouseholdDetails(page , limit);

            setData(response);


        }catch(error){

            console.error("Error Fetching Household Details", error);  

            setError(error.message);


        }finally{

            await Sleep(1200);
            setIsLoading(false);

        };

    },[page]);


    useEffect(() => {
        loadHouseholds();
    },[loadHouseholds])



    return (
        
        <div className="min-h-screen bg-slate-50">

            <AssessmentHeader
                title="Household Details"
                subtitle="View household information, measurements, appliances and solar assessment."
                estimatedTime="Household Overview"
            />

            {(isLoading) && (

                <HouseholdLoadingState/>

            )}

            {(!isLoading && error) && (
                <Error
                    title="Unable to Load Household Details"
                    message="We couldn't retrieve the household information. Please check your connection and try again."
                    variant="card"
                    tone="error"
                    error={error}
                    offline={isOnline}
                    action={<ContactButton />}
                    retryLabel="Refresh"
                    onRetry={loadHouseholds}
                />
            )}

            {(!isLoading && !error && !(data?.households)) && (

                <EmptyState
                    title="Household Not Found"
                    description="We couldn't find the household details you're looking for. It may have been removed, or the household information is currently unavailable."
                    icon={House}
                    variant="default"
                    animated
                    action={
                        <Button
                            icon={Plus}
                            variant="primary"
                            onClick={() => {
                                setLoadingMessages(assessmentMessages);
                                setPathname(path);
                                setShowLoaderApp(true);
                            }}
                        >
                            Start An Assessment
                        </Button>
                    }
                />
            )}

            {(!isLoading  &&  !error && (data?.households)) && (

                    <HouseholdBody
                        data={data}
                        setError={setError}
                        setPage={setPage}
                        page={page}
                    />

            )}


            <Footer/>

        </div>

    )

}