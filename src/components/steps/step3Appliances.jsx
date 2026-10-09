import React, {
    useState
} from "react";

import {
    ArrowLeft,
    Plus,
    Trash2
} from "lucide-react";


const createEmptyAppliance = () => ({
    appliance_name: "",
    appliance_category: "",
    quantity: 1,
    power_rating_watts: "",
    hours_per_day: "",
    days_per_week: 7,
    is_essential: false
});


export default function Step3Appliances({
    appliances,
    onChange,
    onNext,
    onBack,
    onSaveExit,
    isSaving
}) {

    const [
        error,
        setError
    ] = useState("");


    const addAppliance = () => {

        onChange([
            ...appliances,
            createEmptyAppliance()
        ]);

    };


    const removeAppliance = (
        index
    ) => {

        const updatedAppliances =
            appliances.filter(
                (_, applianceIndex) =>
                    applianceIndex !== index
            );

        onChange(
            updatedAppliances
        );

    };


    const updateAppliance = (
        index,
        field,
        value
    ) => {

        const updatedAppliances =
            appliances.map(
                (
                    appliance,
                    applianceIndex
                ) => {

                    if (
                        applianceIndex !==
                        index
                    ) {
                        return appliance;
                    }

                    return {
                        ...appliance,
                        [field]: value
                    };
                }
            );

        onChange(
            updatedAppliances
        );

    };


    const calculateDailyEnergy = (
        appliance
    ) => {

        const quantity =
            Number(
                appliance.quantity
            ) || 0;

        const power =
            Number(
                appliance.power_rating_watts
            ) || 0;

        const hours =
            Number(
                appliance.hours_per_day
            ) || 0;

        const days =
            Number(
                appliance.days_per_week
            ) || 0;

        return (
            quantity *
            power *
            hours *
            (days / 7)
        );

    };


    const handleContinue = () => {

        setError("");


        if (
            appliances.length === 0
        ) {
            setError(
                "Add at least one appliance before continuing."
            );

            return;
        }


        for (
            let index = 0;
            index < appliances.length;
            index++
        ) {

            const appliance =
                appliances[index];


            if (
                !appliance.appliance_name
                    ?.trim()
            ) {
                setError(
                    `Enter the name of appliance ${index + 1}.`
                );

                return;
            }


            if (
                !appliance.power_rating_watts ||
                Number(
                    appliance.power_rating_watts
                ) <= 0
            ) {
                setError(
                    `Enter a valid power rating for ${appliance.appliance_name}.`
                );

                return;
            }


            if (
                appliance.hours_per_day ===
                    "" ||
                Number(
                    appliance.hours_per_day
                ) < 0
            ) {
                setError(
                    `Enter the hours per day for ${appliance.appliance_name}.`
                );

                return;
            }


            if (
                appliance.quantity ===
                    "" ||
                Number(
                    appliance.quantity
                ) <= 0
            ) {
                setError(
                    `Enter a valid quantity for ${appliance.appliance_name}.`
                );

                return;
            }

        }


        onNext();

    };


    const totalDailyEnergy =
        appliances.reduce(
            (
                total,
                appliance
            ) =>
                total +
                calculateDailyEnergy(
                    appliance
                ),
            0
        );


    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-8">

                <h2 className="text-2xl font-bold text-slate-900">
                    Your Appliances
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Enter the appliances used in your household and their typical daily usage.
                </p>

            </div>


            {error && (

                <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                    <p className="text-sm font-medium text-rose-600">
                        {error}
                    </p>

                </div>

            )}


            <div className="space-y-6">

                {appliances.map(
                    (
                        appliance,
                        index
                    ) => (

                        <div
                            key={index}
                            className="rounded-2xl border border-slate-200 p-5"
                        >

                            <div className="mb-5 flex items-center justify-between">

                                <h3 className="font-semibold text-slate-900">
                                    Appliance {index + 1}
                                </h3>


                                {appliances.length > 1 && (

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeAppliance(
                                                index
                                            )
                                        }
                                        className="flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-700"
                                    >

                                        <Trash2
                                            size={17}
                                        />

                                        Remove

                                    </button>

                                )}

                            </div>


                            <div className="grid gap-5 md:grid-cols-2">

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Appliance name
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            appliance.appliance_name
                                        }
                                        onChange={(event) =>
                                            updateAppliance(
                                                index,
                                                "appliance_name",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. Television"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            appliance.appliance_category
                                        }
                                        onChange={(event) =>
                                            updateAppliance(
                                                index,
                                                "appliance_category",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. Kitchen"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            appliance.quantity
                                        }
                                        onChange={(event) =>
                                            updateAppliance(
                                                index,
                                                "quantity",
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Power rating (Watts)
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            appliance.power_rating_watts
                                        }
                                        onChange={(event) =>
                                            updateAppliance(
                                                index,
                                                "power_rating_watts",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. 100"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Hours per day
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        max="24"
                                        step="0.5"
                                        value={
                                            appliance.hours_per_day
                                        }
                                        onChange={(event) =>
                                            updateAppliance(
                                                index,
                                                "hours_per_day",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. 5"
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Days per week
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        max="7"
                                        value={
                                            appliance.days_per_week
                                        }
                                        onChange={(event) =>
                                            updateAppliance(
                                                index,
                                                "days_per_week",
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                                    />

                                </div>

                            </div>


                            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

                                <label className="flex items-center gap-3 text-sm font-medium text-slate-700">

                                    <input
                                        type="checkbox"
                                        checked={
                                            appliance.is_essential
                                        }
                                        onChange={(event) =>
                                            updateAppliance(
                                                index,
                                                "is_essential",
                                                event.target.checked
                                            )
                                        }
                                        className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                                    />

                                    Essential appliance

                                </label>


                                <p className="text-sm font-semibold text-slate-700">

                                    {calculateDailyEnergy(
                                        appliance
                                    ).toFixed(0)}

                                    {" "}Wh/day

                                </p>

                            </div>

                        </div>

                    )
                )}

            </div>


            <button
                type="button"
                onClick={addAppliance}
                className="mt-6 flex items-center gap-2 rounded-xl border border-green-600 px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >

                <Plus size={18} />

                Add Appliance

            </button>


            {appliances.length > 0 && (

                <div className="mt-6 rounded-xl bg-green-50 px-5 py-4">

                    <div className="flex items-center justify-between">

                        <span className="text-sm font-medium text-slate-700">
                            Estimated daily energy
                        </span>

                        <span className="text-lg font-bold text-green-700">

                            {totalDailyEnergy.toFixed(0)}
                            {" "}Wh/day

                        </span>

                    </div>

                </div>

            )}


            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    <ArrowLeft size={18} />

                    Back

                </button>


                <div className="flex flex-col gap-3 sm:flex-row">

                    <button
                        type="button"
                        onClick={onSaveExit}
                        disabled={isSaving}
                        className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSaving
                            ? "Saving..."
                            : "Save & Exit"}
                    </button>


                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={isSaving}
                        className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {isSaving
                            ? "Saving..."
                            : "Continue"}

                    </button>

                </div>

            </div>

        </div>
    );
}