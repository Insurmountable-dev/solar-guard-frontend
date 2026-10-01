import apiClient from "./apiClient";

export const getMyHouseholds = async () => {
    const response = await apiClient.get(
        "/households/me"
    );

    return response.data;
};

export const getHouseholdById = async (
    householdId
) => {
    const response = await apiClient.get(
        `/households/${householdId}`
    );

    return response.data;
};

export const createHousehold = async (
    householdData
) => {
    const response = await apiClient.post(
        "/households",
        householdData
    );

    return response.data;
};