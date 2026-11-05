import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import AssessmentHeader from "../components/assessment/AssessmentHeader";
import { fetchAllAssessments } from "../services/components/solarAssessmentService";
import Error from "../components/common/Error";
import { AssessmentSkeleton } from "../components/view-assessments/ViewAssessmentSkeleton";

import useNavigation from "../contexts/NavigationProvider";
import useAssessments from "../hooks/pages/useAssessments";
import ViewAssessmentBody from "../components/view-assessments/ViewAssessmentBody";
import Sleep from "../utils/Sleep";



export default function ViewAssessmentsPage() {

    const navigate = useNavigate();

    const {setLoadingMessages, setShowLoaderApp, setPathname} = useNavigation();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setIsloading] = useState(true);
    const [page, setPage] = useState(1);


    const { hasDraft } = useAssessments();
    const path = hasDraft ? "/assessments-prompt" : "/assessments";

    const loadAssessments = useCallback(async () => {

        setIsloading(true);
        setError(null);


        try{


            const response = await fetchAllAssessments(page,3);

            setData(response ?? []);

            await Sleep(500);

        }catch(error){

            console.error("Error Fetching Assessments:", error)
            setError(error.message);

        }finally{

            setIsloading(false);
        }

    }, [page]);


    useEffect(() => {
        loadAssessments()
    }, [loadAssessments])
  
    return (

        <div className="min-h-screen bg-slate-50">

            <AssessmentHeader
                title="View Assessment"
                subtitle="Review your household assessment details, track its status, and access your solar sizing results."
                estimatedTime="Assessment Overview"
            />

            {loading ? (

                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <AssessmentSkeleton count={6} />
                </main>

            ) : error ? (

                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <Error
                        title="Failed to Load Assessments"
                        message="We couldn't retrieve your solar assessments. Please try again."
                        variant="card"
                        tone="error"
                        error={error}
                        onRetry={loadAssessments}
                        isRetrying={loading}
                        retryLabel="Reload Assessments"
                        className="max-w-none rounded-2xl border border-slate-200 bg-white shadow-sm"
                    />
                </main>

            ) : (
                <>
                    <ViewAssessmentBody
                        data={data}
                        page={page}
                        setPage={setPage}
                        setError={setError}
                        path={path}
                    />

                </>
            )}


                <Footer/>

        </div>

    );


}





