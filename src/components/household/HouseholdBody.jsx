import {House,Users,ClipboardCheck} from "lucide-react";

import Pagination from "../common/Pagination";
import SummaryCard from "../dashboard/SummaryCard";
import HouseholdCard from "./HouseholdCard";
import useNavigation from "../../contexts/NavigationProvider";
import { householdMessages } from "../../constants/messages";

export default function HouseholdBody({ 
    data = null ,
    setError,
    page,
    setPage
}) {


    const {setLoadingMessages, setShowLoaderApp, setPathname} = useNavigation();

    const households = data?.households
    
    if(!Array.isArray(households)) setError("Error fetching Household Details....");



    return (

        <main className="min-h-screen bg-slate-50/50">

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                {/* Page Heading */}
                <section className="pb-8">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                Your Households
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                View and manage your registered households.
                            </p>

                        </div>

                    </div>

                </section>


                {/* Divider: Heading / Summary */}
                <hr className="border-t border-slate-200" />


                {/* Summary Cards */}
                <section className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 lg:grid-cols-2">

                    <SummaryCard
                        title="Total Households"
                        description="Your registered households"
                        icon={House}
                        value={Number(data?.totalHouseholds) || "Unavailable.."}
                    />

                    <SummaryCard
                        title="Total Occupants"
                        description="People across all households"
                        icon={Users}
                        value={Number(data?.totalOccupants) || "-"}
                    />

                </section>


                {/* Divider: Summary / Households */}
                <hr className="border-t border-slate-200" />


                {/* Household Section */}
                <section className="space-y-8 pt-8">

                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="text-sm font-semibold text-slate-700">
                                Total Pages : {data?.totalPages}
                        </h2>

                        <span className="text-xs text-slate-400">
                            {households?.length}{" "}
                            {households?.length === 1 ? "record" : "records"}
                        </span>
                    </div>

                    {/* Household Cards */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {households.map((household) => (

                            <HouseholdCard
                                key={household.household_id}
                                household={household}
                                onViewDetails={() => {
                                        setLoadingMessages(householdMessages);
                                        setPathname(`households/${household.household_id}`)
                                        setShowLoaderApp(true);
                                }}
                            />

                        ))}

                    </div>


                    {/* Divider: Households / Pagination */}
                    <hr className="border-t border-slate-200" />


                    {/* Pagination */}
                    <div>

                        <Pagination 
                            setPage={setPage}
                            page={page}
                            totalPages={data?.totalPages || 1}
                        />

                    </div>

                </section>

            </div>

        </main>

    );

}