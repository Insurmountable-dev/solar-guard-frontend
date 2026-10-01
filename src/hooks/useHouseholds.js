import {
    useEffect,
    useState
} from "react";

import {
    getMyHouseholds,
    getHouseholdById
} from "../services/householdService";

export default function useHouseholds() {

    const [
        households,
        setHouseholds
    ] = useState([]);

    const [
        selectedHousehold,
        setSelectedHousehold
    ] = useState(null);

    const [
        isLoading,
        setIsLoading
    ] = useState(true);

    const [
        isLoadingDetails,
        setIsLoadingDetails
    ] = useState(false);

    const [
        error,
        setError
    ] = useState("");

    const loadHouseholds = async () => {
        try {
            setIsLoading(true);
            setError("");

            const data =
                await getMyHouseholds();

            setHouseholds(
                data.households || []
            );

        } catch (error) {
            console.error(
                "Household loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load households."
            );

        } finally {
            setIsLoading(false);
        }
    };

    const loadHouseholdDetails = async (
        householdId
    ) => {
        try {
            setIsLoadingDetails(true);
            setError("");

            const household =
                await getHouseholdById(
                    householdId
                );

            setSelectedHousehold(
                household.household ||
                household
            );

        } catch (error) {
            console.error(
                "Household details error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load household details."
            );

        } finally {
            setIsLoadingDetails(false);
        }
    };

    const clearSelectedHousehold = () => {
        setSelectedHousehold(null);
    };

    useEffect(() => {
        loadHouseholds();
    }, []);

    return {
        households,
        selectedHousehold,
        isLoading,
        isLoadingDetails,
        error,
        loadHouseholds,
        loadHouseholdDetails,
        clearSelectedHousehold
    };
}