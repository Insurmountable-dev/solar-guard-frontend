import apiClient from "../api/apiClient";

export const getApplianceReferences =
    async () => {
        const response =
            await apiClient.get("appliance-reference");

        return response.data;
    };