import apiClient from "../api/apiClient";

export const getDashboard = async () => {

    const response = await apiClient.get("/dashboard/me");

    return response.data;
};


export const getEnergyConsumptionChartData = async() => {

    const response = await apiClient.get(`/charts/energy-consumption`);

    
    return response.data;
};


export const getApplianceUsageChartData  = async (page) => {

    const response = await apiClient.get("/charts/appliance-usage",{
        params:{
            page,
        }
    })

    return response.data

};


export const getSolarSizingChartData     = async () => {

    const response = apiClient.get("/charts/solar-sizing");

    return (await response).data;

};