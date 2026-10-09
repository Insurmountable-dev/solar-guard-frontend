import React, {useEffect,
useState
} from "react";

import {
    useAuth
} from "../../contexts/AuthProvider";

import AssessmentProgress from "./AssessmentProgress";

import Step1Household from "../steps/Step1Household";
import Step2RoofDetails from "../steps/Step2RoofDetails";
import Step3Appliances from "../steps/step3Appliances";
import Step4Review from "../steps/Step4Review";
import Step5Results from "../steps/step5Results";

import {
    saveHousehold,
    saveMeasurement,
    saveAppliances,
    saveAssessment,
    calculateAssessment,
    getAssessmentsByHousehold,
    getAssessmentResult,
    getAssessmentById,
    getAssessmentAppliances
} from "../../services/assessmentService";


const initialHousehold = {
    household_name: "",
    house_type: "stone",
    building_type: "bungalow",
    number_of_floors: 1,
    number_of_rooms: "",
    number_of_occupants: "",
    county: "",
    town: "",
    area: "",
    has_grid_connection: true,
    has_existing_solar: false
};


const initialMeasurement = {
    house_length: "",
    house_width: "",
    floor_area: "",
    roof_length: "",
    roof_width: "",
    roof_area: "",
    roof_type: "gable",
    roof_material: "mabati",
    roof_orientation: "east-west",
    shading_level: "low",
    measurement_method: "manual"
};


export default function AssessmentPage({
    onNavigate,
    initialAssessment,
    householdId: selectedHouseholdId
}) {

    const {
        currentUser
    } = useAuth();


    /*
    |--------------------------------------------------------------------------
    | MODE
    |--------------------------------------------------------------------------
    */

    const [
        mode,
        setMode
    ] = useState(
        initialAssessment ||
        selectedHouseholdId
            ? "history"
            : "new"
    );


    /*
    |--------------------------------------------------------------------------
    | ASSESSMENT HISTORY
    |--------------------------------------------------------------------------
    */

    const [
        assessments,
        setAssessments
    ] = useState([]);


    const [
        selectedAssessment,
        setSelectedAssessment
    ] = useState(
        initialAssessment || null
    );


    const [
        historyLoading,
        setHistoryLoading
    ] = useState(false);


    const [
        historyError,
        setHistoryError
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | DRAFT STORAGE
    |--------------------------------------------------------------------------
    */

    const assessmentStorageKey =
        currentUser?.user_id
            ? `solarGuardAssessmentDraft_${currentUser.user_id}`
            : null;


    const getSavedDraft = () => {

        if (!currentUser?.user_id) {
            return null;
        }

        const savedDraft =
            sessionStorage.getItem(
                `solarGuardAssessmentDraft_${currentUser.user_id}`
            );

        if (!savedDraft) {
            return null;
        }

        try {

            return JSON.parse(
                savedDraft
            );

        } catch (error) {

            console.error(
                "Failed to restore assessment draft:",
                error
            );

            return null;

        }

    };


    const savedDraft =
        getSavedDraft();


    /*
    |--------------------------------------------------------------------------
    | WIZARD STATE
    |--------------------------------------------------------------------------
    */

    const [
        currentStep,
        setCurrentStep
    ] = useState(() => {

        if (selectedHouseholdId) {
            return 2;
        }

        return (
            savedDraft?.currentStep ||
            1
        );

    });


    const [
        household,
        setHousehold
    ] = useState(
        savedDraft?.household ||
        initialHousehold
    );


    const [
        householdId,
        setHouseholdId
    ] = useState(
        selectedHouseholdId ||
        savedDraft?.householdId ||
        null
    );


    const [
        measurement,
        setMeasurement
    ] = useState(
        savedDraft?.measurement ||
        initialMeasurement
    );


    const [
        appliances,
        setAppliances
    ] = useState(
        savedDraft?.appliances ||
        []
    );


    const [
        assessmentId,
        setAssessmentId
    ] = useState(
        initialAssessment?.assessment_id ||
        savedDraft?.assessmentId ||
        null
    );


    const [
        result,
        setResult
    ] = useState(
        savedDraft?.result ||
        null
    );


    const [
        isSaving,
        setIsSaving
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | LOAD ASSESSMENT HISTORY
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            mode !== "history" ||
            !selectedHouseholdId
        ) {
            return;
        }


        const loadAssessments =
            async () => {

                try {

                    setHistoryLoading(
                        true
                    );

                    setHistoryError("");


                    const response =
                        await getAssessmentsByHousehold(
                            selectedHouseholdId
                        );


                    const data =
                        Array.isArray(
                            response
                        )
                            ? response
                            : response.assessments ||
                              [];


                    setAssessments(
                        data
                    );

                } catch (error) {

                    console.error(
                        "Failed to load assessments:",
                        error
                    );

                    setHistoryError(
                        error.response?.data?.message ||
                        error.message ||
                        "Failed to load assessments."
                    );

                } finally {

                    setHistoryLoading(
                        false
                    );

                }

            };


        loadAssessments();

    }, [
        mode,
        selectedHouseholdId
    ]);


    /*
    |--------------------------------------------------------------------------
    | VIEW ASSESSMENT
    |--------------------------------------------------------------------------
    */

    const handleViewAssessment =
        async (
            assessment
        ) => {

            try {

                setHistoryError("");

                setHistoryLoading(
                    true
                );


                const [
                    assessmentDetails,
                    assessmentResult,
                    assessmentAppliances
                ] = await Promise.all([

                    getAssessmentById(
                        assessment.assessment_id
                    ),

                    getAssessmentResult(
                        assessment.assessment_id
                    ).catch(
                        () => null
                    ),

                    getAssessmentAppliances(
                        assessment.assessment_id
                    ).catch(
                        () => []
                    )

                ]);


                setSelectedAssessment({

                    ...assessmentDetails,

                    result:
                        assessmentResult?.result ||
                        assessmentResult ||
                        null,

                    appliances:
                        assessmentAppliances?.appliances ||
                        assessmentAppliances ||
                        []

                });

            } catch (error) {

                console.error(
                    "Failed to load assessment details:",
                    error
                );

                setHistoryError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to load assessment details."
                );

            } finally {

                setHistoryLoading(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | START NEW ASSESSMENT
    |--------------------------------------------------------------------------
    */

    const handleStartNewAssessment =
        () => {

            setMode(
                "new"
            );

            setSelectedAssessment(
                null
            );


            setCurrentStep(
                selectedHouseholdId
                    ? 2
                    : 1
            );


            setHouseholdId(
                selectedHouseholdId ||
                null
            );


            setHousehold(
                initialHousehold
            );


            setMeasurement(
                initialMeasurement
            );


            setAppliances(
                []
            );


            setAssessmentId(
                null
            );


            setResult(
                null
            );


            setError("");

        };


    /*
    |--------------------------------------------------------------------------
    | BACK TO HISTORY
    |--------------------------------------------------------------------------
    */

    const handleBackToHistory =
        () => {

            setSelectedAssessment(
                null
            );

            setMode(
                "history"
            );

            setHistoryError("");

        };


    /*
    |--------------------------------------------------------------------------
    | AUTOMATIC DRAFT SAVE
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            !assessmentStorageKey ||
            mode !== "new"
        ) {
            return;
        }


        const draft = {

            currentStep,

            household,

            householdId,

            measurement,

            appliances,

            assessmentId,

            result

        };


        sessionStorage.setItem(
            assessmentStorageKey,
            JSON.stringify(
                draft
            )
        );

    }, [
        assessmentStorageKey,
        mode,
        currentStep,
        household,
        householdId,
        measurement,
        appliances,
        assessmentId,
        result
    ]);


    /*
    |--------------------------------------------------------------------------
    | STEP 1
    |--------------------------------------------------------------------------
    */

    const handleStep1Next =
        async () => {

            setError("");

            try {

                setIsSaving(
                    true
                );


                const savedHousehold =
                    await saveHousehold(
                        household
                    );


                const id =
                    savedHousehold.household_id;


                setHouseholdId(
                    id
                );


                setCurrentStep(
                    2
                );

            } catch (error) {

                console.error(
                    "Step 1 error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to save household."
                );

            } finally {

                setIsSaving(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | STEP 2
    |--------------------------------------------------------------------------
    */

    const handleStep2Next =
        async (
            updatedMeasurement
        ) => {

            setError("");

            try {

                setIsSaving(
                    true
                );


                await saveMeasurement(
                    householdId,
                    updatedMeasurement
                );


                setMeasurement(
                    updatedMeasurement
                );


                setCurrentStep(
                    3
                );

            } catch (error) {

                console.error(
                    "Step 2 error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to save roof measurements."
                );

            } finally {

                setIsSaving(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | STEP 3
    |--------------------------------------------------------------------------
    */

    const handleStep3Next =
        async (
            updatedAppliances
        ) => {

            setError("");

            try {

                setIsSaving(
                    true
                );


                if (
                    !Array.isArray(
                        updatedAppliances
                    ) ||
                    updatedAppliances.length === 0
                ) {

                    throw new Error(
                        "Please add at least one appliance."
                    );

                }


                await saveAppliances(
                    householdId,
                    updatedAppliances
                );


                setAppliances(
                    updatedAppliances
                );


                setCurrentStep(
                    4
                );

            } catch (error) {

                console.error(
                    "Step 3 error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to save appliances."
                );

            } finally {

                setIsSaving(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | STEP 4
    |--------------------------------------------------------------------------
    | Save the assessment and immediately calculate it.
    |--------------------------------------------------------------------------
    */

    const handleStep4Next =
        async () => {

            setError("");

            try {

                setIsSaving(
                    true
                );


                /*
                 * Create the assessment first.
                 */
                const assessment =
                    await saveAssessment(
                        householdId
                    );


                const newAssessmentId =
                    assessment.assessment_id;


                setAssessmentId(
                    newAssessmentId
                );


                /*
                 * Calculate using the newly-created
                 * assessment ID.
                 */
                const calculation =
                    await calculateAssessment(
                        householdId,
                        newAssessmentId
                    );


                console.log(
                    "ASSESSMENT CALCULATION RESULT:",
                    calculation
                );


                /*
                 * Store the calculation result
                 * for Step 5.
                 */
                setResult(
                    calculation
                );


                /*
                 * Move to Step 5 only after
                 * calculation succeeds.
                 */
                setCurrentStep(
                    5
                );

            } catch (error) {

                console.error(
                    "Assessment calculation error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to calculate solar system."
                );

            } finally {

                setIsSaving(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | RECALCULATE
    |--------------------------------------------------------------------------
    */

    const handleCalculate =
        async () => {

            if (!householdId) {

                setError(
                    "Household information is missing."
                );

                return;

            }


            if (!assessmentId) {

                setError(
                    "Assessment information is missing."
                );

                return;

            }


            setError("");


            try {

                setIsSaving(
                    true
                );


                const calculation =
                    await calculateAssessment(
                        householdId,
                        assessmentId
                    );


                console.log(
                    "RECALCULATED ASSESSMENT:",
                    calculation
                );


                setResult(
                    calculation
                );

            } catch (error) {

                console.error(
                    "Recalculation error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to calculate solar system."
                );

            } finally {

                setIsSaving(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | BACK
    |--------------------------------------------------------------------------
    */

    const handleBack =
        () => {

            setError("");


            if (
                currentStep === 1
            ) {

                onNavigate(
                    "dashboard"
                );

                return;

            }


            setCurrentStep(
                step =>
                    step - 1
            );

        };


    /*
    |--------------------------------------------------------------------------
    | SAVE AND EXIT
    |--------------------------------------------------------------------------
    */

    const handleSaveExit =
        () => {

            onNavigate(
                "dashboard"
            );

        };


    /*
    |--------------------------------------------------------------------------
    | FINISH ASSESSMENT
    |--------------------------------------------------------------------------
    */

    const handleFinish =
        () => {

            console.log(
                "ASSESSMENT FINISHED"
            );


            /*
             * Remove the saved draft because
             * the assessment has been completed.
             */
            if (
                assessmentStorageKey
            ) {

                sessionStorage.removeItem(
                    assessmentStorageKey
                );

            }


            /*
             * Return to dashboard.
             */
            onNavigate(
                "dashboard"
            );

        };


    /*
    |--------------------------------------------------------------------------
    | NEW ASSESSMENT FROM RESULTS
    |--------------------------------------------------------------------------
    */

    const handleNewAssessment =
        () => {

            handleStartNewAssessment();

        };


    /*
    |--------------------------------------------------------------------------
    | HISTORY VIEW
    |--------------------------------------------------------------------------
    */

    if (
        mode === "history"
    ) {

        return (

            <div className="min-h-screen bg-slate-50">

                <main className="mx-auto max-w-6xl px-6 py-8">

                    <div className="mb-8 flex items-center justify-between">

                        <div>

                            <h1 className="text-2xl font-bold text-slate-900">
                                Assessment History
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Previous solar assessments for this household.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={
                                handleStartNewAssessment
                            }
                            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Start Assessment
                        </button>

                    </div>


                    {historyError && (

                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                            <p className="text-sm font-medium text-red-600">
                                {historyError}
                            </p>

                        </div>

                    )}


                    {historyLoading && (

                        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

                            <p className="text-sm text-slate-500">
                                Loading assessments...
                            </p>

                        </div>

                    )}


                    {!historyLoading &&
                        !selectedAssessment &&
                        assessments.length === 0 && (

                            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                                <h2 className="text-lg font-semibold text-slate-900">
                                    No assessments yet
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Start an assessment to calculate
                                    the solar requirements for this household.
                                </p>

                                <button
                                    type="button"
                                    onClick={
                                        handleStartNewAssessment
                                    }
                                    className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"
                                >
                                    Start Assessment
                                </button>

                            </div>

                        )}


                    {!historyLoading &&
                        !selectedAssessment &&
                        assessments.length > 0 && (

                            <div className="space-y-4">

                                {assessments.map(
                                    assessment => (

                                        <div
                                            key={
                                                assessment.assessment_id
                                            }
                                            className="rounded-2xl bg-white p-6 shadow-sm"
                                        >

                                            <div className="flex items-center justify-between">

                                                <div>

                                                    <h2 className="font-semibold text-slate-900">
                                                        Assessment #
                                                        {
                                                            assessment.assessment_id
                                                        }
                                                    </h2>

                                                    <p className="mt-1 text-sm text-slate-500">

                                                        {assessment.created_at
                                                            ? new Date(
                                                                assessment.created_at
                                                            ).toLocaleString()
                                                            : "Date unavailable"}

                                                    </p>

                                                </div>


                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">

                                                    {
                                                        assessment.assessment_status ||
                                                        "draft"
                                                    }

                                                </span>

                                            </div>


                                            <div className="mt-5 grid gap-4 sm:grid-cols-3">

                                                <div className="rounded-xl bg-slate-50 p-4">

                                                    <p className="text-xs text-slate-500">
                                                        Assessment ID
                                                    </p>

                                                    <p className="mt-1 font-semibold text-slate-900">
                                                        #
                                                        {
                                                            assessment.assessment_id
                                                        }
                                                    </p>

                                                </div>


                                                <div className="rounded-xl bg-slate-50 p-4">

                                                    <p className="text-xs text-slate-500">
                                                        Status
                                                    </p>

                                                    <p className="mt-1 font-semibold capitalize text-slate-900">
                                                        {
                                                            assessment.assessment_status ||
                                                            "draft"
                                                        }
                                                    </p>

                                                </div>


                                                <div className="rounded-xl bg-slate-50 p-4">

                                                    <p className="text-xs text-slate-500">
                                                        Household
                                                    </p>

                                                    <p className="mt-1 font-semibold text-slate-900">
                                                        #
                                                        {
                                                            selectedHouseholdId
                                                        }
                                                    </p>

                                                </div>

                                            </div>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleViewAssessment(
                                                        assessment
                                                    )
                                                }
                                                className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                            >
                                                View Results
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        )}


                    {selectedAssessment && (

                        <div className="space-y-6">

                            <button
                                type="button"
                                onClick={
                                    handleBackToHistory
                                }
                                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                            >
                                ← Back to Assessments
                            </button>


                            <div className="rounded-2xl bg-white p-6 shadow-sm">

                                <h2 className="text-xl font-bold text-slate-900">
                                    Assessment #
                                    {
                                        selectedAssessment.assessment_id
                                    }
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">

                                    {
                                        selectedAssessment.created_at
                                            ? new Date(
                                                selectedAssessment.created_at
                                            ).toLocaleString()
                                            : "Date unavailable"
                                    }

                                </p>


                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                                    <ResultCard
                                        title="Daily Energy"
                                        value={
                                            selectedAssessment.result?.total_daily_energy_kwh
                                                ? `${selectedAssessment.result.total_daily_energy_kwh} kWh`
                                                : "—"
                                        }
                                    />

                                    <ResultCard
                                        title="Peak Load"
                                        value={
                                            selectedAssessment.result?.peak_load_watts
                                                ? `${selectedAssessment.result.peak_load_watts} W`
                                                : "—"
                                        }
                                    />

                                    <ResultCard
                                        title="Solar Required"
                                        value={
                                            selectedAssessment.result?.required_solar_capacity_watts
                                                ? `${selectedAssessment.result.required_solar_capacity_watts} W`
                                                : "—"
                                        }
                                    />

                                    <ResultCard
                                        title="Battery"
                                        value={
                                            selectedAssessment.result?.required_battery_capacity_kwh
                                                ? `${selectedAssessment.result.required_battery_capacity_kwh} kWh`
                                                : "—"
                                        }
                                    />

                                </div>

                            </div>


                            <div className="rounded-2xl bg-white p-6 shadow-sm">

                                <h2 className="text-lg font-bold text-slate-900">
                                    Solar Recommendation
                                </h2>


                                <div className="mt-5 grid gap-4 md:grid-cols-3">

                                    <DetailCard
                                        title="Solar Panels"
                                        value={
                                            selectedAssessment.result?.selected_panel
                                                ? `${selectedAssessment.result.selected_panel.manufacturer} ${selectedAssessment.result.selected_panel.model}`
                                                : "—"
                                        }
                                    />

                                    <DetailCard
                                        title="Battery"
                                        value={
                                            selectedAssessment.result?.selected_battery
                                                ? `${selectedAssessment.result.selected_battery.manufacturer} ${selectedAssessment.result.selected_battery.model}`
                                                : "—"
                                        }
                                    />

                                    <DetailCard
                                        title="Inverter"
                                        value={
                                            selectedAssessment.result?.selected_inverter?.status ===
                                            "Unavailable"
                                                ? "Unavailable"
                                                : selectedAssessment.result?.selected_inverter
                                                    ? `${selectedAssessment.result.selected_inverter.manufacturer} ${selectedAssessment.result.selected_inverter.model}`
                                                    : "—"
                                        }
                                    />

                                </div>

                            </div>


                            <div className="rounded-2xl bg-white p-6 shadow-sm">

                                <h2 className="text-lg font-bold text-slate-900">
                                    Appliance Calculations
                                </h2>


                                {selectedAssessment.appliances?.length > 0 ? (

                                    <div className="mt-5 overflow-x-auto">

                                        <table className="w-full text-left text-sm">

                                            <thead>

                                                <tr className="border-b border-slate-200">

                                                    <th className="px-3 py-3">
                                                        Appliance
                                                    </th>

                                                    <th className="px-3 py-3">
                                                        Quantity
                                                    </th>

                                                    <th className="px-3 py-3">
                                                        Watts
                                                    </th>

                                                    <th className="px-3 py-3">
                                                        Hours
                                                    </th>

                                                    <th className="px-3 py-3">
                                                        Daily Energy
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {selectedAssessment.appliances.map(
                                                    appliance => (

                                                        <tr
                                                            key={
                                                                appliance.assessment_appliance_id ||
                                                                appliance.appliance_id
                                                            }
                                                            className="border-b border-slate-100"
                                                        >

                                                            <td className="px-3 py-3">
                                                                {
                                                                    appliance.appliance_name
                                                                }
                                                            </td>

                                                            <td className="px-3 py-3">
                                                                {
                                                                    appliance.quantity
                                                                }
                                                            </td>

                                                            <td className="px-3 py-3">
                                                                {
                                                                    appliance.power_rating_watts
                                                                }
                                                            </td>

                                                            <td className="px-3 py-3">
                                                                {
                                                                    appliance.hours_per_day
                                                                }
                                                            </td>

                                                            <td className="px-3 py-3">
                                                                {
                                                                    appliance.daily_energy_wh ||
                                                                    "—"
                                                                }
                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                ) : (

                                    <p className="mt-4 text-sm text-slate-500">
                                        No appliance calculation data available.
                                    </p>

                                )}

                            </div>


                            <div className="flex justify-end">

                                <button
                                    type="button"
                                    onClick={
                                        handleStartNewAssessment
                                    }
                                    className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    Start New Assessment
                                </button>

                            </div>

                        </div>

                    )}

                </main>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | ASSESSMENT WIZARD
    |--------------------------------------------------------------------------
    */

    return (

        <div className="min-h-screen bg-slate-50">

            <main className="mx-auto max-w-6xl px-6 py-8">

                <div className="mb-8">

                    <h1 className="text-2xl font-bold text-slate-900">
                        Solar Assessment
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Complete the assessment to determine
                        the appropriate solar system.
                    </p>

                </div>


                <AssessmentProgress
                    currentStep={
                        currentStep
                    }
                />


                {error && (

                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                        <p className="text-sm font-medium text-red-600">
                            {error}
                        </p>

                    </div>

                )}


                {currentStep === 1 && (

                    <Step1Household
                        data={
                            household
                        }
                        onChange={
                            setHousehold
                        }
                        onNext={
                            handleStep1Next
                        }
                        onBack={
                            handleBack
                        }
                        onSaveExit={
                            handleSaveExit
                        }
                        isSaving={
                            isSaving
                        }
                    />

                )}


                {currentStep === 2 && (

                    <Step2RoofDetails
                        data={
                            measurement
                        }
                        onChange={
                            setMeasurement
                        }
                        onNext={
                            handleStep2Next
                        }
                        onBack={
                            handleBack
                        }
                        onSaveExit={
                            handleSaveExit
                        }
                        isSaving={
                            isSaving
                        }
                    />

                )}


                {currentStep === 3 && (

                    <Step3Appliances
                        appliances={
                            appliances
                        }
                        onChange={
                            setAppliances
                        }
                        onNext={() =>
                            handleStep3Next(
                                appliances
                            )
                        }
                        onBack={
                            handleBack
                        }
                        onSaveExit={
                            handleSaveExit
                        }
                        isSaving={
                            isSaving
                        }
                    />

                )}


                {currentStep === 4 && (

                    <Step4Review
                        household={
                            household
                        }
                        measurement={
                            measurement
                        }
                        appliances={
                            appliances
                        }
                        householdId={
                            householdId
                        }
                        assessmentId={
                            assessmentId
                        }
                        onBack={
                            handleBack
                        }
                        onNext={
                            handleStep4Next
                        }
                        onSaveExit={
                            handleSaveExit
                        }
                        isSaving={
                            isSaving
                        }
                    />

                )}


                {currentStep === 5 && (

                    <Step5Results
                        household={
                            household
                        }
                        measurement={
                            measurement
                        }
                        appliances={
                            appliances
                        }
                        householdId={
                            householdId
                        }
                        assessmentId={
                            assessmentId
                        }
                        result={
                            result
                        }
                        onCalculate={
                            handleCalculate
                        }
                        onBack={
                            handleBack
                        }
                        onFinish={
                            handleFinish
                        }
                        onNavigate={
                            onNavigate
                        }
                        onDashboard={() =>
                            onNavigate(
                                "dashboard"
                            )
                        }
                        onNewAssessment={
                            handleNewAssessment
                        }
                        isSaving={
                            isSaving
                        }
                    />

                )}

            </main>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| RESULT CARD
|--------------------------------------------------------------------------
*/

function ResultCard({
    title,
    value
}) {

    return (

        <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs font-medium text-slate-500">
                {title}
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
                {value}
            </p>

        </div>

    );

}


/*
|--------------------------------------------------------------------------
| DETAIL CARD
|--------------------------------------------------------------------------
*/

function DetailCard({
    title,
    value
}) {

    return (

        <div className="rounded-xl border border-slate-200 p-4">

            <p className="text-xs font-medium text-slate-500">
                {title}
            </p>

            <p className="mt-2 font-semibold text-slate-900">
                {value}
            </p>

        </div>

    );

}