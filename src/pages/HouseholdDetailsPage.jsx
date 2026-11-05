import { ArrowLeft} from "lucide-react";
import {useState, useEffect, useCallback} from "react";
import { useParams, useNavigate } from "react-router-dom";
import HouseholdDetailsBody from "../components/household/HouseholdDetailsBody";

import { getAllHouseholdsDetails } from "../services/pages/householdsService";
import Footer from "../components/footer/Footer"
import HouseholdLoadingDetailsPage from "../components/household/HouseholdLoadingDetailsState";
import Error from "../components/common/Error";
import ContactButton from "../components/common/ContactButton";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button"
import Sleep from "../utils/Sleep";

export default function HouseholdDetailsPage() {

    const {household_id}= useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAllHouseholdsDetails = useCallback(async () => {

        setLoading(true);
        setError(false);
        setData(null);

        try{

            const response = await getAllHouseholdsDetails(household_id);
            setData(response);

        }catch(error){

            console.error("Error Loading Household Details:", error);

            setError(error.message || "Error Loading Household Details");


        }finally{

            await Sleep(1200);
            setLoading(false);

        }

    }, []);


    useEffect(() => {
        loadAllHouseholdsDetails();
    },[]);


    return (
        
    <>
        <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

            <Button
                type="button"
                variant = "outline"
                onClick={() => navigate("/households")}
                className="group mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-700"
            >
                <ArrowLeft size={17} className="transition group-hover:-translate-x-1" />
                 Back Households
            </Button>


            {(loading) && (
                <HouseholdLoadingDetailsPage/>
            )}

            {!loading && error && (
                    <Error
                        title="Unable to Load Household Details"
                        message="We couldn't retrieve the household details. Please try again."
                        variant="card"
                        tone="error"
                        error={error}
                        onRetry={() => loadAllHouseholdsDetails(household_id)}
                        retryLabel="Try Again"
                        action={<ContactButton/>}
                    />
               
            )}


            {!loading && !error && !data && (
                    <EmptyState
                        title="Household Not Found"
                        description="We couldn't find the household details you're looking for. It may have been deleted or is no longer available."
                        variant="danger"
                        animated={true}
                        action={<ContactButton/>}
                    />
            )}

            {(!loading && !error && data) && (
                <HouseholdDetailsBody
                    data={data}
                />
            )}


        </main>
           
        {(loading || error || !data ) && ( <Footer/> )}

        </>

    );
}

