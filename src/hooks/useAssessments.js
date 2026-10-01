import {
    useState
} from "react";

import {
    createAssessment,
    getMyAssessments,
    getAssessmentsByHousehold,
    getAssessmentById,
    getAssessmentAppliances,
    getAssessmentResult,
    calculateSolarSystem
} from "../services/assessmentService";

export default function useAssessments() {
    const [
        assessment,
        setAssessment
    ] = useState(null);

    const [
        assessments,
        setAssessments
    ] = useState([]);

    const [
        assessmentAppliances,
        setAssessmentAppliances
    ] = useState([]);

    const [
        assessmentResult,
        setAssessmentResult
    ] = useState(null);

    const [
        calculation,
        setCalculation
    ] = useState(null);

    const [
        isLoading,
        setIsLoading
    ] = useState(false);

    const [
        error,
        setError
    ] = useState("");

    const startAssessment = async (
        householdId
    ) => {
        try {
            setIsLoading(true);
            setError("");

            const data =
                await createAssessment({
                    household_id:
                        householdId,
                    assessment_status:
                        "draft"
                });

            setAssessment(data);

            return data;

        } catch (error) {
            console.error(
                "Create assessment error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to create solar assessment."
            );

            return null;

        } finally {
            setIsLoading(false);
        }
    };

    const loadMyAssessments = async () => {
        try {
            setIsLoading(true);
            setError("");

            const data =
                await getMyAssessments();

            setAssessments(
                data.assessments || []
            );

            return data;

        } catch (error) {
            console.error(
                "Assessment loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load assessments."
            );

            return null;

        } finally {
            setIsLoading(false);
        }
    };

    const loadHouseholdAssessments =
        async (
            householdId
        ) => {
            try {
                setIsLoading(true);
                setError("");

                const data =
                    await getAssessmentsByHousehold(
                        householdId
                    );

                setAssessments(
                    data.assessments || []
                );

                return data;

            } catch (error) {
                console.error(
                    "Household assessment loading error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load assessments."
                );

                return null;

            } finally {
                setIsLoading(false);
            }
        };

    const loadAssessmentById =
        async (
            assessmentId
        ) => {
            try {
                setIsLoading(true);
                setError("");

                const data =
                    await getAssessmentById(
                        assessmentId
                    );

                setAssessment(data);

                return data;

            } catch (error) {
                console.error(
                    "Assessment details error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load assessment."
                );

                return null;

            } finally {
                setIsLoading(false);
            }
        };

    const loadAssessmentAppliances =
        async (
            assessmentId
        ) => {
            try {
                const data =
                    await getAssessmentAppliances(
                        assessmentId
                    );

                setAssessmentAppliances(
                    data.assessment_appliances ||
                    data.appliances ||
                    []
                );

                return data;

            } catch (error) {
                console.error(
                    "Assessment appliances error:",
                    error
                );

                return null;
            }
        };

    const loadAssessmentResult =
        async (
            assessmentId
        ) => {
            try {
                const data =
                    await getAssessmentResult(
                        assessmentId
                    );

                setAssessmentResult(
                    data.result ||
                    data
                );

                return data;

            } catch (error) {
                console.error(
                    "Assessment result error:",
                    error
                );

                return null;
            }
        };

    const runCalculation =
        async (
            householdId,
            assessmentId
        ) => {
            try {
                setIsLoading(true);
                setError("");

                const data =
                    await calculateSolarSystem(
                        householdId,
                        assessmentId
                    );

                setCalculation(
                    data
                );

                return data;

            } catch (error) {
                console.error(
                    "Solar calculation error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Solar calculation failed."
                );

                return null;

            } finally {
                setIsLoading(false);
            }
        };

    return {
        assessment,
        assessments,
        assessmentAppliances,
        assessmentResult,
        calculation,
        isLoading,
        error,
        startAssessment,
        loadMyAssessments,
        loadHouseholdAssessments,
        loadAssessmentById,
        loadAssessmentAppliances,
        loadAssessmentResult,
        runCalculation
    };
}