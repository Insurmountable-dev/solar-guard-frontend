import apiClient from "../../api/apiClient";


export const searchApplianceReference = async (query) => {


    const response = await apiClient.get(`/appliance-references/search`,{
        params:{
            q:query
        }
    });

    return response.data;

};


export const getAppliancesCategories = async () => {

    const response = await apiClient.get("/appliances-categories/");

    return response.data;
};


export const updateAppliances = async (appliances_data) => {


    const response = await apiClient.patch("/drafts/appliances-data", appliances_data);

    return response.data;

}