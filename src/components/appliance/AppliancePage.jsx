import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Calculator,
    Home,
    Plug
} from "lucide-react";

import ApplianceList from "./ApplianceList";

import {
    getHouseholdAppliances
} from "../../services/applianceService";


export default function AppliancePage({
    onNavigate,
    householdId
}) {

    const [
        appliances,
        setAppliances
    ] = useState([]);


    const [
        isLoading,
        setIsLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const loadAppliances = async () => {

        if (
            !householdId
        ) {

            setAppliances([]);

            return;

        }


        try {

            setIsLoading(
                true
            );

            setError("");


            const response =
                await getHouseholdAppliances(
                    householdId
                );


            const data =
                response?.appliances ??
                response ??
                [];


            setAppliances(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load appliances:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load appliances."
            );

        } finally {

            setIsLoading(
                false
            );

        }

    };


    useEffect(() => {

        loadAppliances();

    }, [
        householdId
    ]);


    const handleStartAssessment = () => {

        onNavigate(
            "assessments",
            {
                householdId,
                startAssessment: true
            }
        );

    };


    if (
        !householdId
    ) {

        return (
            <div className="min-h-screen bg-slate-50">

                <div className="mx-auto max-w-7xl px-6 py-8">

                    <button
                        type="button"
                        onClick={() =>
                            onNavigate(
                                "households"
                            )
                        }
                        className="mb-8 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Back to Households

                    </button>


                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                        <Home
                            className="mx-auto mb-4 text-slate-400"
                            size={42}
                        />

                        <h2 className="text-xl font-bold text-slate-900">
                            No Household Selected
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                            Select a household before viewing
                            its appliances.
                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                onNavigate(
                                    "households"
                                )
                            }
                            className="mt-6 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                        >
                            View Households
                        </button>

                    </div>

                </div>

            </div>
        );

    }


    return (
        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-8">

                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>

                        <button
                            type="button"
                            onClick={() =>
                                onNavigate(
                                    "households"
                                )
                            }
                            className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                        >

                            <ArrowLeft
                                size={18}
                            />

                            Back to Households

                        </button>


                        <div className="flex items-center gap-3">

                            <div className="rounded-xl bg-green-100 p-3">

                                <Plug
                                    size={24}
                                    className="text-green-700"
                                />

                            </div>


                            <div>

                                <h1 className="text-2xl font-bold text-slate-900">
                                    Household Appliances
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Household #{householdId}
                                </p>

                            </div>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={
                            handleStartAssessment
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
                    >

                        <Calculator
                            size={18}
                        />

                        Start Assessment

                    </button>

                </div>


                {error && (

                    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                        <p className="text-sm font-medium text-rose-600">
                            {error}
                        </p>

                    </div>

                )}


                <ApplianceList
                    appliances={
                        appliances
                    }
                    isLoading={
                        isLoading
                    }
                />


                {!isLoading &&
                    appliances.length === 0 && (

                        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

                            <Plug
                                className="mx-auto mb-4 text-slate-400"
                                size={42}
                            />

                            <h2 className="text-lg font-bold text-slate-900">
                                No Appliances Yet
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                Appliances are added during
                                the solar assessment process.
                            </p>


                            <button
                                type="button"
                                onClick={
                                    handleStartAssessment
                                }
                                className="mt-6 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
                            >
                                Start Assessment
                            </button>

                        </div>

                    )}

            </div>

        </div>
    );

}