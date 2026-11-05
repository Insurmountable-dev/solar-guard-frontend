import apiClient from "../../api/apiClient";


export  const fetchLatestAssesment = async () => {

    const response = await apiClient("/solar-assessments/latest");

    return response.data;

};

export const  fetchLatestResults = async () => {

    const response =  await apiClient.get("/solar-assessment-results/latest-results"); 


    return response.data;

};


export const fetchResults = async (householdId = null,  assessmentId = null) => {

    const response = await apiClient(`/solar-assessment-results/household/${householdId}/assessment/${assessmentId}`)

    return response.data;

};


export const fetchAllAssessments = async (page = 1, limit = 6)=> {

    const response = await apiClient.get("/solar-assessments/",{
        params:{
            page,
            limit,
        }
    })

    return response.data
}