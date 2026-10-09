import React from "react";

import {
    KENYA_COUNTIES
} from "../../data/kenyaCounties";

export default function Step1Household({
    data,
    onChange,
    onNext,
    onBack,
    onSaveExit,
    isSaving = false
}) {
    const handleChange = (
        event
    ) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;

        onChange({
            ...data,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-6">

                <h2 className="text-xl font-bold text-slate-900">
                    Household Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Tell us about the household.
                </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Household Name
                    </label>

                    <input
                        type="text"
                        name="household_name"
                        value={
                            data.household_name
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="My Home"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        House Type
                    </label>

                    <select
                        name="house_type"
                        value={
                            data.house_type
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    >
                        <option value="stone">
                            Stone
                        </option>

                        <option value="brick">
                            Brick
                        </option>

                        <option value="mud">
                            Mud
                        </option>

                        <option value="mabati">
                            Mabati
                        </option>

                        <option value="concrete">
                            Concrete
                        </option>

                        <option value="timber">
                            Timber
                        </option>

                        <option value="mixed">
                            Mixed
                        </option>

                        <option value="other">
                            Other
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Building Type
                    </label>

                    <select
                        name="building_type"
                        value={
                            data.building_type
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    >
                        <option value="bungalow">
                            Bungalow
                        </option>

                        <option value="maisonette">
                            Maisonette
                        </option>

                        <option value="apartment">
                            Apartment
                        </option>

                        <option value="storey">
                            Storey
                        </option>

                        <option value="flat">
                            Flat
                        </option>

                        <option value="duplex">
                            Duplex
                        </option>

                        <option value="townhouse">
                            Townhouse
                        </option>

                        <option value="other">
                            Other
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Number of Floors
                    </label>

                    <input
                        type="number"
                        min="1"
                        name="number_of_floors"
                        value={
                            data.number_of_floors
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Number of Rooms
                    </label>

                    <input
                        type="number"
                        min="1"
                        name="number_of_rooms"
                        value={
                            data.number_of_rooms
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Number of Occupants
                    </label>

                    <input
                        type="number"
                        min="1"
                        name="number_of_occupants"
                        value={
                            data.number_of_occupants
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        County
                    </label>

                    <select
                        name="county"
                        value={
                            data.county
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    >
                        <option value="">
                            Select county
                        </option>

                        {KENYA_COUNTIES.map(
                            county => (
                                <option
                                    key={county}
                                    value={county}
                                >
                                    {county}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Town
                    </label>

                    <input
                        type="text"
                        name="town"
                        value={
                            data.town
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Area / Estate
                    </label>

                    <input
                        type="text"
                        name="area"
                        value={
                            data.area
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />
                </div>

                <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">

                    <input
                        type="checkbox"
                        name="has_grid_connection"
                        checked={
                            data.has_grid_connection
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <span>
                        Has grid connection
                    </span>

                </label>

                <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">

                    <input
                        type="checkbox"
                        name="has_existing_solar"
                        checked={
                            data.has_existing_solar
                        }
                        onChange={
                            handleChange
                        }
                    />

                    <span>
                        Has existing solar
                    </span>

                </label>

            </div>

            <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">

                <button
                    type="button"
                    onClick={
                        onBack
                    }
                    disabled={
                        isSaving
                    }
                    className="rounded-xl border border-slate-300 px-5 py-3"
                >
                    Back
                </button>

                <div className="flex gap-3">

                    <button
                        type="button"
                        onClick={
                            onSaveExit
                        }
                        disabled={
                            isSaving
                        }
                        className="rounded-xl border border-green-600 px-5 py-3 text-green-600"
                    >
                        Save & Exit
                    </button>

                    <button
                        type="button"
                        onClick={
                            onNext
                        }
                        disabled={
                            isSaving
                        }
                        className="rounded-xl bg-green-600 px-6 py-3 text-white"
                    >
                        {isSaving
                            ? "Saving..."
                            : "Continue →"}
                    </button>

                </div>

            </div>

        </div>
    );
}