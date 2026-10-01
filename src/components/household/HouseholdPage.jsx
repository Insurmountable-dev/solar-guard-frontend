import React, {
    useState
} from "react";

import HouseholdHeader from "./HouseHolderHeader";
import HouseholdDetails from "./HouseHoldDetails";
import HouseholdList from "./HouseholdList";
import HouseholdForm from "./HouseholdForm";

import useHouseholds from "../../hooks/useHouseholds";
import useAssessments from "../../hooks/useAssessments";

export default function HouseholdPage({
    onNavigate,
    onAssessmentCreated
}) {

    const [
        showForm,
        setShowForm
    ] = useState(false);

    const {
        households,
        selectedHousehold,
        isLoading,
        isLoadingDetails,
        error,
        loadHouseholdDetails,
        clearSelectedHousehold,
        loadHouseholds
    } = useHouseholds();

    const {
        startAssessment,
        isLoading: isAssessmentLoading,
        error: assessmentError
    } = useAssessments();

    const handleHouseholdCreated = () => {
        setShowForm(false);
        loadHouseholds();
    };

    const handleViewDetails = (
        householdId
    ) => {
        loadHouseholdDetails(
            householdId
        );
    };

    const handleAssess = async (
        householdId
    ) => {
        const data = await startAssessment(
            householdId
        );

        if (
            data &&
            onAssessmentCreated
        ) {
            onAssessmentCreated(
                data
            );
        }
    };

    const displayError =
        error ||
        assessmentError;

    return (
        <div className="min-h-screen bg-slate-50">

            <main className="mx-auto max-w-7xl px-6 py-8">

                <HouseholdHeader
                    onNavigate={
                        onNavigate
                    }
                    onAddHousehold={() =>
                        setShowForm(true)
                    }
                />

                {displayError && (
                    <ErrorMessage
                        message={
                            displayError
                        }
                    />
                )}

                {showForm && (
                    <HouseholdForm
                        onSuccess={
                            handleHouseholdCreated
                        }
                        onCancel={() =>
                            setShowForm(false)
                        }
                    />
                )}

                <HouseholdDetails
                    household={
                        selectedHousehold
                    }
                    isLoading={
                        isLoadingDetails
                    }
                    onClose={
                        clearSelectedHousehold
                    }
                />

                <HouseholdList
                    households={
                        households
                    }
                    isLoading={
                        isLoading ||
                        isAssessmentLoading
                    }
                    onViewDetails={
                        handleViewDetails
                    }
                    onAssess={
                        handleAssess
                    }
                />

            </main>

        </div>
    );
}

function ErrorMessage({
    message
}) {
    return (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

            <p className="text-sm font-medium text-rose-600">
                {message}
            </p>

        </div>
    );
}