import {
    useCallback,
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
    ] = useState(null);

    const loadHouseholds = useCallback(
        async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data =
                    await getMyHouseholds();

                setHouseholds(
                    Array.isArray(data)
                        ? data
                        : data.households || []
                );
            } catch (error) {
                console.error(
                    "Failed to load households:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load households."
                );
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const loadHouseholdDetails =
        useCallback(
            async (householdId) => {
                try {
                    setIsLoadingDetails(true);
                    setError(null);

                    const data =
                        await getHouseholdById(
                            householdId
                        );

                    setSelectedHousehold(
                        data.household ||
                        data
                    );
                } catch (error) {
                    console.error(
                        "Failed to load household details:",
                        error
                    );

                    setError(
                        error.response?.data?.message ||
                        "Failed to load household details."
                    );
                } finally {
                    setIsLoadingDetails(false);
                }
            },
            []
        );

    const clearSelectedHousehold =
        useCallback(() => {
            setSelectedHousehold(null);
        }, []);

    useEffect(() => {
        loadHouseholds();
    }, [loadHouseholds]);

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