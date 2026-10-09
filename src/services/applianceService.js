import apiClient from "../api/apiClient";


export const getMyAppliances = async () => {

        const response = await apiClient.get("/appliances");
        return response.data;
};

export const getHouseholdAppliances = async ( householdId) => {

        const response = await apiClient.get(`/appliances/household/${householdId}`);
        return response.data;
};


export const getApplianceById = async (applianceId) => {

        const response = await apiClient.get(`/appliances/${applianceId}`);
        return response.data;
};


export const createAppliance = async (applianceData) => {

        const response = await apiClient.post("/appliances", applianceData);
        return response.data;
};


export const createAppliances = async (householdId, appliances) => {

        let applianceList = [];


        if (Array.isArray(appliances)) {

            applianceList = appliances;

        } else if (Array.isArray(appliances?.appliances)
        ) {

            applianceList = appliances.appliances;

        } else {

            throw new Error("Appliances must be an array.");

        }


        if (applianceList.length === 0) {

            throw new Error("Please add at least one appliance.");

        }

        const createdAppliances = [];

        for (const appliance of applianceList) {

            const applianceData = {

                household_id:Number(householdId),

                appliance_name:
                    appliance.appliance_name
                        ?.trim(),

                appliance_category:
                    appliance.appliance_category
                        ?.trim() || null,

                quantity:
                    Number(
                        appliance.quantity
                    ) || 1,

                power_rating_watts:
                    Number(
                        appliance.power_rating_watts
                    ),

                hours_per_day:
                    Number(
                        appliance.hours_per_day
                    ),

                days_per_week:
                    Number(
                        appliance.days_per_week
                    ) || 7,

                is_essential:
                    appliance.is_essential
                        ? 1
                        : 0

            };


            if (
                !applianceData.appliance_name
            ) {

                throw new Error(
                    "Every appliance must have a name."
                );

            }


            if (
                !applianceData.power_rating_watts ||
                applianceData.power_rating_watts <= 0
            ) {

                throw new Error(
                    `Invalid power rating for ${applianceData.appliance_name}.`
                );

            }


            if (
                applianceData.hours_per_day < 0 ||
                applianceData.hours_per_day > 24
            ) {

                throw new Error(
                    `Invalid hours per day for ${applianceData.appliance_name}.`
                );

            }


            const response =
                await createAppliance(
                    applianceData
                );


            createdAppliances.push(
                response
            );

        }


        return {
            success: true,
            appliances:
                createdAppliances
        };

};


export const updateAppliance = async (applianceId, applianceData) =>  {

        const response = await apiClient.put(`/appliances/${applianceId}`,applianceData);

        return response.data;
};


export const deleteAppliance = async (applianceId) => {

        const response = await apiClient.delete(`/appliances/${applianceId}`);
        return response.data;
};