
import {useState, useEffect} from "react";
import useAddAppliances from "../contexts/ApplianceProvider";
import useNavigation from "../contexts/NavigationProvider";
import Sleep from "../utils/Sleep";
import ApplianceSearchHeader from '../components/steps/steps-components/ApplianceSearchHeader';
import EmptySearchState from "../components/steps/steps-components/EmptySearchState"
import { searchApplianceReference } from '../services/pages/appliancesService';
import ApplianceCard from "../components/steps/steps-components/ApplianceCard";
import { SUGGESTIONS } from "../constants/applianceSuggestions";


export default function ApplianceSearch() {

    const[query, setQuery] = useState("");
    const[formAppliance, setFormAppliance] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const[isClearingSearch, setIsClearingSearch] = useState(false);
    const[searchError, setSearchError] = useState(false);
    const[retryKey, setRetryKey] = useState(0);


    const{
        result,
        setResult,
        setIsSearching, 
        setIsSearchingAddingAppliance, 
        setSelectedSearchingApplianceToAdd 
    
    } = useNavigation();


    const{setAdd, setAppliancesFormData} = useAddAppliances();



    // Loading The Queried Data
    useEffect(() => {

        const trimmedQuery = query.trim();

        if (trimmedQuery === "") {

            setResult([]);
            setFormAppliance([]);
            setSearchError(false);
            setIsLoading(false);

            return;

        }

        let isActive = true;

        async function fetchQuery() {

            setIsLoading(true);
            setSearchError(false);

            try {

                const data = await searchApplianceReference(trimmedQuery);

                if (!isActive) return;

                setResult(
                    Array.isArray(data?.applianceReferences)
                        ? data.applianceReferences
                        : []
                );

                setFormAppliance(
                    Array.isArray(data?.references)
                        ? data.references
                        : []
                );

            } catch(error) {

                if (!isActive) return;

                console.error("Error Fetching Data", error);

                setResult([]);
                setFormAppliance([]);
                setSearchError(true);

            } finally {

                if (isActive) {
                    setIsLoading(false);
                }

            }

        }


        fetchQuery();

        return () => {
            isActive = false;
        };

    }, [query, retryKey]);


    // Pair Each Search Result With Its Corresponding Form Data
    const matchingAppliances = result.map((ap, index) => ({appliance: ap,formData: formAppliance[index], index})).filter(({formData}) => formData != null);

    return (

        <div className="fixed inset-0 z-[9999] flex h-dvh w-full flex-col overflow-x-hidden bg-slate-50">

            {/* Search Header */}
            <ApplianceSearchHeader
                result={result}
                query={query}
                setQuery={setQuery}
            />


            {/* Search Content */}
            <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">

                <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-8 pt-5 sm:px-6 sm:pt-7 lg:px-8">

                    {/* Results Summary */}
                    <div className="mb-5 flex flex-col gap-2 border-b border-slate-200 pb-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">

                            <p className="text-sm font-semibold text-slate-800">
                                {isLoading ? "Searching appliances..." : "Appliance Results"}
                            </p>

                            {!isLoading && !searchError && (
                                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-2 text-xs font-bold tabular-nums text-emerald-600">
                                    {result.length} {result.length === 1 ? "appliance" : "appliances"}
                                </span>
                            )}

                        </div>

                        {query.trim() && (
                            <p className="break-words text-xs leading-relaxed text-slate-500 sm:text-right sm:text-sm">

                                Results for{" "}

                                <span className="font-semibold text-slate-700">
                                    "{query.trim()}"
                                </span>

                            </p>
                        )}

                    </div>


                    {/* Loading State */}
                    {isLoading && (

                        <div
                            role="status"
                            aria-live="polite"
                            className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center shadow-sm"
                        >

                            <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

                            <div className="space-y-1">

                                <p className="text-sm font-bold text-slate-800">
                                    Finding Appliances
                                </p>

                                <p className="text-sm leading-relaxed text-slate-500">
                                    Please wait while we search for matching appliances.
                                </p>

                            </div>

                        </div>

                    )}


                    {/* Search Error */}
                    {!isLoading && searchError && (

                        <div
                            role="alert"
                            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-10 text-center"
                        >

                            <p className="text-sm font-bold text-red-800">
                                Unable to Load Appliances
                            </p>

                            <p className="max-w-md text-sm leading-relaxed text-red-700/80">
                                We're sorry, but we couldn't retrieve the appliance search results. Please try again.
                            </p>

                            <button
                                type="button"
                                onClick={() => setRetryKey(current => current + 1)}
                                className="mt-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                            >
                                Try Again
                            </button>

                        </div>

                    )}


                    {/* Appliance Results */}
                    {!isLoading && !searchError && matchingAppliances.length > 0 && (

                        <div className="flex flex-col gap-4 sm:gap-5">

                            {result.map((ap,i) => {

                               return (

                                    <div
                                        key={ap.reference_id ?? ap.id ?? i}
                                        className="w-full min-w-0"
                                    >

                                        <ApplianceCard
                                            ap={ap}
                                            onSelect={async  ()=>{

                                                setAdd(true);

                                                setSelectedSearchingApplianceToAdd(i);
                                                setAppliancesFormData(formAppliance[i]);
                                                setIsSearching(false);

                                                await Sleep(1200);

                                                setIsSearchingAddingAppliance(true);

                                                setAdd(false);

                                            }}
                                        />

                                    </div>

                                )

                            })}

                        </div>

                    )}


                    {/* No Matching Form Data */}
                    { (!isLoading &&  !searchError &&  result.length > 0 &&  matchingAppliances.length === 0) && (

                            <div
                                role="status"
                                className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-8 text-center"
                            >

                                <p className="text-sm font-bold text-amber-800">
                                    Appliance Data Unavailable
                                </p>

                                <p className="mt-2 text-sm leading-relaxed text-amber-700">
                                    We found matching appliances, but their form data could not be prepared. Please try searching again.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setRetryKey(current => current + 1)}
                                    className="mt-4 rounded-lg border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                >
                                    Try Again
                                </button>

                            </div>

                    )}


                    {/* Empty State */}
                    { (!isLoading && !searchError && result.length === 0 && formAppliance.length === 0)  && (

                            <div className="flex min-h-[300px] flex-col justify-center sm:min-h-[360px]">

                                <EmptySearchState
                                    suggestions={SUGGESTIONS}
                                    isLoading={isClearingSearch}
                                    onSuggestionClick={(s) =>setQuery(s)}

                                    onAction={async() => {

                                        setIsClearingSearch(true);
                                        await Sleep(1200);
                                        setResult([]);
                                        setFormAppliance([]);
                                        setQuery("");
                                        setIsClearingSearch(false);

                                    }}



                                />

                            </div>

                    )}

                </div>

            </main>

        </div>

    );

}
