import React, {
    useEffect,
    useState
} from "react";

import {
    createAppliance
} from "../../services/applianceService";

import {
    getMyHouseholds
} from "../../services/householdService";


export default function ApplianceForm({
    onSuccess,
    onCancel
}) {

    const [
        households,
        setHouseholds
    ] = useState([]);


    const [
        formData,
        setFormData
    ] = useState({
        household_id: "",
        appliance_name: "",
        appliance_category: "",
        quantity: 1,
        power_rating_watts: "",
        hours_per_day: "",
        days_per_week: 7,
        is_essential: false
    });


    const [
        isLoading,
        setIsLoading
    ] = useState(true);


    const [
        isSubmitting,
        setIsSubmitting
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    useEffect(() => {

        const loadHouseholds = async () => {

            try {

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


        loadHouseholds();

    }, []);


    const handleChange = (
        event
    ) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;


        setFormData(
            previous => ({
                ...previous,

                [name]:
                    type === "checkbox"
                        ? checked
                        : value
            })
        );

    };


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        setError("");


        if (!formData.household_id) {

            setError(
                "Please select a household."
            );

            return;

        }


        if (!formData.appliance_name.trim()) {

            setError(
                "Please enter an appliance name."
            );

            return;

        }


        if (
            Number(formData.quantity) < 1
        ) {

            setError(
                "Quantity must be at least 1."
            );

            return;

        }


        if (
            Number(formData.power_rating_watts) <= 0
        ) {

            setError(
                "Power rating must be greater than 0."
            );

            return;

        }


        if (
            Number(formData.hours_per_day) <= 0 ||
            Number(formData.hours_per_day) > 24
        ) {

            setError(
                "Hours per day must be between 0 and 24."
            );

            return;

        }


        if (
            Number(formData.days_per_week) < 1 ||
            Number(formData.days_per_week) > 7
        ) {

            setError(
                "Days per week must be between 1 and 7."
            );

            return;

        }


        try {

            setIsSubmitting(true);


            await createAppliance({

                household_id:
                    Number(
                        formData.household_id
                    ),

                appliance_name:
                    formData.appliance_name.trim(),

                appliance_category:
                    formData.appliance_category ||
                    null,

                quantity:
                    Number(
                        formData.quantity
                    ),

                power_rating_watts:
                    Number(
                        formData.power_rating_watts
                    ),

                hours_per_day:
                    Number(
                        formData.hours_per_day
                    ),

                days_per_week:
                    Number(
                        formData.days_per_week
                    ),

                is_essential:
                    formData.is_essential
                        ? 1
                        : 0

            });


            onSuccess();

        } catch (error) {

            console.error(
                "Create appliance error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to create appliance."
            );

        } finally {

            setIsSubmitting(false);

        }

    };


    if (isLoading) {

        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                <p className="text-sm text-slate-500">
                    Loading households...
                </p>

            </div>
        );

    }


    if (households.length === 0) {

        return (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">

                <h2 className="text-lg font-bold text-amber-900">
                    No households available
                </h2>

                <p className="mt-2 text-sm text-amber-700">
                    Create a household before adding appliances.
                </p>


                {error && (

                    <p className="mt-3 text-sm font-medium text-rose-600">
                        {error}
                    </p>

                )}


                <button
                    type="button"
                    onClick={onCancel}
                    className="mt-5 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                >
                    Close
                </button>

            </div>
        );

    }


    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

                <h2 className="text-xl font-bold text-slate-900">
                    Add Appliance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Enter appliance information for energy calculations.
                </p>

            </div>


            {error && (

                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                    <p className="text-sm font-medium text-rose-600">
                        {error}
                    </p>

                </div>

            )}


            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            Household
                        </label>

                        <select
                            name="household_id"
                            value={
                                formData.household_id
                            }
                            onChange={
                                handleChange
                            }
                            required
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        >

                            <option value="">
                                Select household
                            </option>

                            {households.map(
                                household => (

                                    <option
                                        key={
                                            household.household_id
                                        }
                                        value={
                                            household.household_id
                                        }
                                    >
                                        {
                                            household.household_name ||
                                            `Household ${household.household_id}`
                                        }
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            Appliance Name
                        </label>

                        <input
                            type="text"
                            name="appliance_name"
                            value={
                                formData.appliance_name
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. Television"
                            required
                            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />

                    </div>


                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            Category
                        </label>

                        <select
                            name="appliance_category"
                            value={
                                formData.appliance_category
                            }
                            onChange={
                                handleChange
                            }
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        >

                            <option value="">
                                Select category
                            </option>

                            <option value="Lighting">
                                Lighting
                            </option>

                            <option value="Entertainment">
                                Entertainment
                            </option>

                            <option value="Kitchen">
                                Kitchen
                            </option>

                            <option value="Refrigeration">
                                Refrigeration
                            </option>

                            <option value="Heating">
                                Heating
                            </option>

                            <option value="Cooling">
                                Cooling
                            </option>

                            <option value="Laundry">
                                Laundry
                            </option>

                            <option value="Electronics">
                                Electronics
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            step="1"
                            value={
                                formData.quantity
                            }
                            onChange={
                                handleChange
                            }
                            required
                            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />

                    </div>


                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            Power Rating (Watts)
                        </label>

                        <input
                            type="number"
                            name="power_rating_watts"
                            min="1"
                            step="0.01"
                            value={
                                formData.power_rating_watts
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. 100"
                            required
                            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />

                    </div>


                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            Hours Per Day
                        </label>

                        <input
                            type="number"
                            name="hours_per_day"
                            min="0.1"
                            max="24"
                            step="0.1"
                            value={
                                formData.hours_per_day
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. 5"
                            required
                            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />

                    </div>


                    <div>

                        <label className="text-sm font-medium text-slate-700">
                            Days Per Week
                        </label>

                        <input
                            type="number"
                            name="days_per_week"
                            min="1"
                            max="7"
                            step="1"
                            value={
                                formData.days_per_week
                            }
                            onChange={
                                handleChange
                            }
                            required
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        />

                    </div>

                </div>


                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">

                    <input
                        type="checkbox"
                        name="is_essential"
                        checked={
                            formData.is_essential
                        }
                        onChange={
                            handleChange
                        }
                        className="h-4 w-4 accent-green-600"
                    />

                    <div>

                        <p className="text-sm font-semibold text-slate-700">
                            Essential appliance
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Used to identify important loads during solar sizing.
                        </p>

                    </div>

                </label>


                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Saving..."
                            : "Save Appliance"}
                    </button>

                </div>

            </form>

        </div>
    );
}