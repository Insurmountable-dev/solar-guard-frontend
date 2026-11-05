import apiClient from "../../api/apiClient";


export const createAssessment = async() => {

    const response = await apiClient.post("/work-flow");

    return response.data;

};


export const fetchSolarAssessments = async () => {

    const response = await apiClient("/solar-assessments");

    return response.data;
    
};