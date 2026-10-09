import React, {
    useEffect,
    useState
} from "react";

import HouseholdHeader from "./HouseholdHeader";
import HouseholdList from "./HouseholdList";
import HouseholdDetails from "./HouseholdDetails";

import {
    getMyHouseholds,
    getHouseholdById
} from "../../services/householdService";


export default function HouseholdPage({
    onNavigate
}) {

    const [
        households,
        setHouseholds
    ] = useState([]);


    const [
        selectedHousehold,
        setSelectedHousehold
    ] = useState(null);


    const [
        isLoading,
        setIsLoading
    ] = useState(true);


    const [
        detailsLoading,
        setDetailsLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const loadHouseholds = async () => {

        try {

            setIsLoading(
                true
            );

            setError("");


            const response =
                await getMyHouseholds();


            const data =
                response?.households ??
                response ??
                [];


            setHouseholds(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load households:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load households."
            );

        } finally {

            setIsLoading(
                false
            );

        }

    };


    useEffect(() => {

        loadHouseholds();

    }, []);


    const handleViewHousehold = async (
        householdId
    ) => {

        try {

            setDetailsLoading(
                true
            );

            setError("");


            const response =
                await getHouseholdById(
                    householdId
                );


            const data =
                response?.household ??
                response;


            setSelectedHousehold(
                data
            );

        } catch (error) {

            console.error(
                "Failed to load household details:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load household details."
            );

        } finally {

            setDetailsLoading(
                false
            );

        }

    };


    const handleViewAppliances = (
        householdId
    ) => {

        onNavigate(
            "appliances",
            {
                householdId,
                startAssessment: false
            }
        );

    };


    const handleViewAssessments = (
        householdId
    ) => {

        onNavigate(
            "assessments",
            {
                householdId,
                startAssessment: false
            }
        );

    };


    const handleStartAssessment = (
        householdId
    ) => {

        onNavigate(
            "assessments",
            {
                householdId,
                startAssessment: true
            }
        );

    };


    const handleStartNewAssessment = () => {

        onNavigate(
            "assessments",
            {
                householdId: null,
                startAssessment: true
            }
        );

    };


    return (
        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-8">

                <HouseholdHeader
                    onNavigate={
                        onNavigate
                    }
                    onStartAssessment={
                        handleStartNewAssessment
                    }
                />


                {error && (

                    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                        <p className="text-sm font-medium text-rose-600">
                            {error}
                        </p>

                    </div>

                )}


                <HouseholdList
                    households={
                        households
                    }
                    isLoading={
                        isLoading
                    }
                    onViewDetails={
                        handleViewHousehold
                    }
                    onViewAppliances={
                        handleViewAppliances
                    }
                    onViewAssessments={
                        handleViewAssessments
                    }
                    onAssess={
                        handleStartAssessment
                    }
                />


                {selectedHousehold && (

                    <div className="mt-8">

                        <HouseholdDetails
                            household={
                                selectedHousehold
                            }
                            isLoading={
                                detailsLoading
                            }
                            onBack={() =>
                                setSelectedHousehold(
                                    null
                                )
                            }
                            onViewAppliances={
                                handleViewAppliances
                            }
                            onViewAssessments={
                                handleViewAssessments
                            }
                            onStartAssessment={
                                handleStartAssessment
                            }
                        />

                    </div>

                )}

            </div>

        </div>
    );

}