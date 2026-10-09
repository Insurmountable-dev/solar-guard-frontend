import {
    createHousehold
} from "./householdService";

export const saveAssessmentHousehold = async (
    household
) => {
    const response =
        await createHousehold(
            household
        );

    const savedHousehold =
        response.data ||
        response.household ||
        response;

    const householdId =
        savedHousehold.household_id;

    if (!householdId) {
        throw new Error(
            "Household ID was not returned by the server."
        );
    }

    return {
        householdId,
        household: savedHousehold
    };
};