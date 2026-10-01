import {
    useState
} from "react";

import {
    createMeasurement,
    getMeasurementByHousehold
} from "../services/measurementService";

export default function useMeasurements() {

    const [
        measurement,
        setMeasurement
    ] = useState(null);

    const [
        isLoading,
        setIsLoading
    ] = useState(false);

    const [
        error,
        setError
    ] = useState("");

    const loadMeasurement =
        async (
            householdId
        ) => {

            try {

                setIsLoading(true);
                setError("");

                const data =
                    await getMeasurementByHousehold(
                        householdId
                    );

                setMeasurement(
                    data.measurement ||
                    data
                );

                return (
                    data.measurement ||
                    data
                );

            } catch (error) {

                console.error(
                    "Measurement loading error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load measurement."
                );

                return null;

            } finally {

                setIsLoading(false);

            }
        };

    const saveMeasurement =
        async (
            measurementData
        ) => {

            try {

                setIsLoading(true);
                setError("");

                const data =
                    await createMeasurement(
                        measurementData
                    );

                const savedMeasurement =
                    data.measurement ||
                    data;

                setMeasurement(
                    savedMeasurement
                );

                return savedMeasurement;

            } catch (error) {

                console.error(
                    "Measurement saving error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to save measurement."
                );

                return null;

            } finally {

                setIsLoading(false);

            }
        };

    const clearMeasurement = () => {
        setMeasurement(null);
        setError("");
    };

    return {
        measurement,
        isLoading,
        error,
        loadMeasurement,
        saveMeasurement,
        clearMeasurement
    };
}