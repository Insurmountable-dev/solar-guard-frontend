import apiClient from "../../api/apiClient";


export const fetchHouseholdDetails = async (page, limit) => {

    const response = await apiClient("households/me/details",{
        params:{
            page,
            limit
        }
    });

    return response.data;

};


export const getAllHouseholdsDetails = async (householdId) => {

    const response = await apiClient("/households/",{
        params:{
            householdId
        }
    });


    return response.data;
};