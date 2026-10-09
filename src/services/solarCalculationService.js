import apiClient from "../api/apiClient";

export const calculateSolarSystem = async (
    householdId,
    assessmentId
) => {
    const response =
        await apiClient.get(
            `/solar-calculations/household/${householdId}/assessment/${assessmentId}`
        );

    return response.data;
};