import apiClient from "./apiClient";

export const createAssessment = async (
    assessmentData
) => {
    const response = await apiClient.post(
        "/solar-assessments",
        assessmentData
    );

    return response.data;
};

export const getMyAssessments = async () => {
    const response = await apiClient.get(
        "/solar-assessments"
    );

    return response.data;
};

export const getAssessmentsByHousehold = async (
    householdId
) => {
    const response = await apiClient.get(
        `/solar-assessments/household/${householdId}`
    );

    return response.data;
};

export const getAssessmentById = async (
    assessmentId
) => {
    const response = await apiClient.get(
        `/solar-assessments/${assessmentId}`
    );

    return response.data;
};

export const updateAssessmentStatus = async (
    assessmentId,
    assessmentStatus
) => {
    const response = await apiClient.patch(
        `/solar-assessments/${assessmentId}/status`,
        {
            assessment_status:
                assessmentStatus
        }
    );

    return response.data;
};

export const getAssessmentAppliances = async (
    assessmentId
) => {
    const response = await apiClient.get(
        `/assessment-appliances/assessment/${assessmentId}`
    );

    return response.data;
};

export const getAssessmentResult = async (
    assessmentId
) => {
    const response = await apiClient.get(
        `/solar-assessment-results/assessment/${assessmentId}`
    );

    return response.data;
};

export const calculateSolarSystem = async (
    householdId,
    assessmentId
) => {
    const response = await apiClient.get(
        `/solar-calculations/household/${householdId}/assessment/${assessmentId}`
    );

    return response.data;
};