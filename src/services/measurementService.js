import apiClient from "./apiClient";

export const createMeasurement = async (
    measurementData
) => {
    const response =
        await apiClient.post(
            "/measurements",
            measurementData
        );

    return response.data;
};

export const getMeasurementByHousehold = async (
    householdId
) => {
    const response =
        await apiClient.get(
            `/measurements/household/${householdId}`
        );

    return response.data;
};

export const getMeasurementById = async (
    measurementId
) => {
    const response =
        await apiClient.get(
            `/measurements/${measurementId}`
        );

    return response.data;
};