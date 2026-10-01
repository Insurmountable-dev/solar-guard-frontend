import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    Plus
} from "lucide-react";

import ApplianceList from "./ApplianceList";
import ApplianceForm from "./ApplianceForm";

import {
    getMyAppliances
} from "../../services/applianceService";


export default function AppliancePage({
    onNavigate
}) {

    const [
        appliances,
        setAppliances
    ] = useState([]);


    const [
        isLoading,
        setIsLoading
    ] = useState(true);


    const [
        showForm,
        setShowForm
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const loadAppliances = async () => {

        try {

            setIsLoading(true);
            setError("");


            const data =
                await getMyAppliances();


            setAppliances(
                data.appliances || []
            );

        } catch (error) {

            console.error(
                "Appliance loading error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load appliances."
            );

        } finally {

            setIsLoading(false);

        }

    };


    useEffect(() => {

        loadAppliances();

    }, []);


    const handleApplianceCreated = async () => {

        setShowForm(false);

        await loadAppliances();

    };


    return (
        <div className="min-h-screen bg-slate-50">

            <main className="mx-auto max-w-7xl px-6 py-8">

                <button
                    type="button"
                    onClick={() =>
                        onNavigate("dashboard")
                    }
                    className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                >

                    <ArrowLeft size={18} />

                    Dashboard

                </button>


                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            My Appliances
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage appliances used to calculate household energy consumption.
                        </p>

                    </div>


                    {!showForm && (

                        <button
                            type="button"
                            onClick={() =>
                                setShowForm(true)
                            }
                            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                        >

                            <Plus size={18} />

                            Add Appliance

                        </button>

                    )}

                </div>


                {error && (

                    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                        <p className="text-sm font-medium text-rose-600">
                            {error}
                        </p>

                    </div>

                )}


                {showForm && (

                    <div className="mb-8">

                        <ApplianceForm
                            onSuccess={
                                handleApplianceCreated
                            }
                            onCancel={() =>
                                setShowForm(false)
                            }
                        />

                    </div>

                )}


                <ApplianceList
                    appliances={
                        appliances
                    }
                    isLoading={
                        isLoading
                    }
                />

            </main>

        </div>
    );
}