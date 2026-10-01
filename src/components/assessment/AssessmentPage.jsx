import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Plus
} from "lucide-react";

import AssessmentList from "./AssessmentList";
import AssessmentDetails from "./AssessmentDetails";

import {
    getMyAssessments,
    createAssessment
} from "../../services/assessmentService";

import {
    getMyHouseholds
} from "../../services/householdService";

export default function AssessmentPage({
    onNavigate,
    initialAssessment
}) {

    const [
        assessments,
        setAssessments
    ] = useState([]);

    const [
        households,
        setHouseholds
    ] = useState([]);

    const [
        selectedAssessment,
        setSelectedAssessment
    ] = useState(
        initialAssessment || null
    );

    const [
        showForm,
        setShowForm
    ] = useState(false);

    const [
        householdId,
        setHouseholdId
    ] = useState("");

    const [
        isLoading,
        setIsLoading
    ] = useState(true);

    const [
        isSubmitting,
        setIsSubmitting
    ] = useState(false);

    const [
        error,
        setError
    ] = useState("");

    const loadData = async () => {
        try {
            setIsLoading(true);
            setError("");

            const [
                assessmentData,
                householdData
            ] = await Promise.all([
                getMyAssessments(),
                getMyHouseholds()
            ]);

            setAssessments(
                assessmentData.assessments || []
            );

            setHouseholds(
                householdData.households || []
            );

        } catch (error) {
            console.error(
                "Assessment loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load assessments."
            );

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (initialAssessment) {
            setSelectedAssessment(
                initialAssessment
            );
        }
    }, [initialAssessment]);

    const handleCreateAssessment = async (
        event
    ) => {
        event.preventDefault();

        setError("");

        if (!householdId) {
            setError(
                "Please select a household."
            );
            return;
        }

        try {
            setIsSubmitting(true);

            const data =
                await createAssessment({
                    household_id:
                        Number(
                            householdId
                        ),
                    assessment_status:
                        "draft"
                });

            const assessment =
                data.assessment ||
                data;

            setShowForm(false);
            setHouseholdId("");

            setSelectedAssessment(
                assessment
            );

            await loadData();

        } catch (error) {
            console.error(
                "Assessment creation error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to create assessment."
            );

        } finally {
            setIsSubmitting(false);
        }
    };

    const handleViewAssessment = (
        assessment
    ) => {
        setSelectedAssessment(
            assessment
        );
    };

    if (selectedAssessment) {
        return (
            <AssessmentDetails
                assessment={
                    selectedAssessment
                }
                onBack={() =>
                    setSelectedAssessment(
                        null
                    )
                }
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            <main className="mx-auto max-w-7xl px-6 py-8">

                <button
                    type="button"
                    onClick={() =>
                        onNavigate("dashboard")
                    }
                    className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                >
                    <ArrowLeft size={18} />
                    Dashboard
                </button>

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Solar Assessments
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Create and manage household solar assessments.
                        </p>
                    </div>

                    {!showForm && (
                        <button
                            type="button"
                            onClick={() =>
                                setShowForm(
                                    true
                                )
                            }
                            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            <Plus size={18} />
                            New Assessment
                        </button>
                    )}

                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                        <p className="text-sm font-medium text-rose-600">
                            {error}
                        </p>
                    </div>
                )}

                {showForm && (
                    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-slate-900">
                                Start New Assessment
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Select the household you want to assess.
                            </p>
                        </div>

                        <form
                            onSubmit={
                                handleCreateAssessment
                            }
                        >

                            <label className="text-sm font-medium text-slate-700">
                                Household
                            </label>

                            <select
                                value={
                                    householdId
                                }
                                onChange={
                                    event =>
                                        setHouseholdId(
                                            event.target.value
                                        )
                                }
                                required
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            >

                                <option value="">
                                    Select household
                                </option>

                                {households.map(
                                    household => (
                                        <option
                                            key={
                                                household.household_id
                                            }
                                            value={
                                                household.household_id
                                            }
                                        >
                                            {
                                                household.household_name ||
                                                `Household ${household.household_id}`
                                            }
                                        </option>
                                    )
                                )}

                            </select>

                            <div className="mt-5 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowForm(
                                            false
                                        )
                                    }
                                    disabled={
                                        isSubmitting
                                    }
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        isSubmitting
                                    }
                                    className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                                >
                                    {isSubmitting
                                        ? "Creating..."
                                        : "Create Assessment"}
                                </button>

                            </div>

                        </form>

                    </div>
                )}

                <AssessmentList
                    assessments={
                        assessments
                    }
                    isLoading={
                        isLoading
                    }
                    onViewAssessment={
                        handleViewAssessment
                    }
                />

            </main>

        </div>
    );
}