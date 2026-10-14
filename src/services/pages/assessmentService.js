import apiClient from "../../api/apiClient";


export const addHousehold = async ({householdData}) => {
  
    const response = await apiClient.post("/households", householdData);

    return response;
};