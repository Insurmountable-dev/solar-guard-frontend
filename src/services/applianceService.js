import apiClient from "./apiClient";


export const getMyAppliances = async () => {

    const response =
        await apiClient.get(
            "/appliances"
        );

    return response.data;

};


export const createAppliance = async (
    applianceData
) => {

    const response =
        await apiClient.post(
            "/appliances",
            applianceData
        );

    return response.data;

};


export const getApplianceById = async (
    applianceId
) => {

    const response =
        await apiClient.get(
            `/appliances/${applianceId}`
        );

    return response.data;

};


export const getAppliancesByHousehold = async (
    householdId
) => {

    const response =
        await apiClient.get(
            `/appliances/household/${householdId}`
        );

    return response.data;

};