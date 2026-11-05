import apiClient from "../../api/apiClient";


export const fetchDraft = async() => {

    const  response = await apiClient.get("/drafts/");

    return response.data;
};

export const createDraft = async (draftData) => {
    
    const response = await apiClient.post("/drafts/",draftData);

    return response.data;

};

export const updateDraft = async (draftData) => {

    const response = await apiClient.put("/drafts/",draftData);

    return response.data;

};

export const updateAppliancesData = async(appliancesData) => {

    const response = await apiClient.get("/drafts/appliances-data", appliancesData);

    return response.data;

};

export const deleteDraft = async () => {

    const response = await apiClient.delete("/drafts/");

    return response.data;
};

export const updateCurrentStep = async (current_step) => {


    const response  = await apiClient.patch("/drafts/current-step",{
        current_step,
    });


    return response.data;

};

