import { ClipboardList, Plus, ArrowRight} from "lucide-react";
import AssessmentCard from "./AssessmentCard";
import EmptyState from "../common/EmptyState";
import Pagination from "../common/Pagination";
import ViewAssessmentFilters from "./ViewAssessmentFilters";
import useNavigation from "../../contexts/NavigationProvider";
import useAssessments from "../../hooks/pages/useAssessments";
import { calculateMessages } from "../../constants/messages";

export default function ViewAssessmentBody ({
    data =  {},
    page,
    setPage,
    path
}) {

    const {setShowLoaderApp, setLoadingMessages, setPathname, setNavigationData} = useNavigation();
    const {handleCalculateResults} = useAssessments();

    const assessments = data?.assessments ?? [];


    return (

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

           {/* Section Header */}
            <div className="mb-8 space-y-6">

                {/* Header Content */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Title and Description */}
                    <div className="min-w-0">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                Solar Guard
                            </p>
                        </div>

                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                            My Assessments
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                            Manage your household assessments, track their progress, and
                            access your solar sizing results in one place.
                        </p>
                    </div>

                    {/* Assessment Summary */}
                    <div className="flex flex-wrap items-center gap-3">

                        {/* Assessment Count */}
                        <div className="flex min-w-[150px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm shadow-slate-200/40">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                <ClipboardList size={21} strokeWidth={1.8} />
                            </div>

                            <div>
                                <p className="text-2xl font-extrabold leading-none tracking-tight text-slate-900">
                                    {data?.totalAssessments ?? 0}
                                </p>

                                <p className="mt-1.5 text-xs font-medium text-slate-500">
                                    Total Assessments
                                </p>
                            </div>
                        </div>

                    </div>
                    
                </div>

                {/* Filters Section */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 sm:p-5">
                    <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-sm font-bold text-slate-800">
                                Your Assessments
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Filter and find the assessments you need.
                            </p>
                        </div>

                        <span className="text-xs font-medium text-slate-400">
                            Showing {assessments.length} of {data?.totalAssessments ?? 0}
                        </span>
                    </div>

                    <ViewAssessmentFilters />
                </div>

            </div>

            {/* Assessment Content */}
            {assessments.length > 0 ? (

                <section aria-label="Your solar assessments">

                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="text-sm font-semibold text-slate-700">
                            All assessments
                        </h2>

                        <span className="text-xs text-slate-400">
                            {assessments.length}{" "}
                            {assessments.length === 1 ? "record" : "records"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">

                        {assessments.map((ass) => (
                            <AssessmentCard
                                key={ass.assessment_id}
                                assessmentId={ass.assessment_id}
                                status={ass.assessment_status}
                                householdName={ass.household_name}
                                createdAt={ass.created_at}
                                updatedAt={ass.updated_at}
                                onCalculate={() =>{
                                    setLoadingMessages(calculateMessages);
                                    handleCalculateResults(ass.household_id, ass.assessment_id, setShowLoaderApp);
                                }}

                                onViewResults={() => {
                                    setPathname("assessment-results",{
                                        name:"Kevin"
                                    });
                                    setNavigationData({
                                        ...ass,
                                        path:"/view-assessments"
                                    });
                                    setLoadingMessages(["Loading your assessment results..."]);
                                    setShowLoaderApp(true);
                                }}
                            />
                        ))}

                    </div>

                </section>

            ) : (

                <section
                    aria-label="No assessments"
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8"
                >
                    <EmptyState
                        title="No Assessments Yet"
                        description="Start by adding your household details and appliances. Solar Guard will help you estimate your energy needs and identify suitable solar equipment."
                        icon={ClipboardList}
                        animated={true}
                        variant="default"
                        action={
                            <button
                                type="button"
                                onClick={() => {
                                    setPathname(path);
                                    setLoadingMessages([
                                        "Preparing your assessment...",
                                        "Setting up your workspace...",
                                        "Getting everything ready...",
                                    ]);
                                    setShowLoaderApp(true);
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                            >
                                <Plus size={18} />
                                Start Assessment
                                <ArrowRight size={16} />
                            </button>
                        }
                    />
                </section>

            )}

            {/* Pagination */}
            {assessments.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-5">
                    <Pagination 
                        page ={page}
                        setPage={setPage}
                        totalPages ={data?.totalPages}
                    
                    />
                </div>
            )}

        </main>
        
        )
}
        
