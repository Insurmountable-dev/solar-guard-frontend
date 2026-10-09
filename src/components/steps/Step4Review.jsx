import React from "react";

export default function Step4Review({
    household,
    measurement,
    appliances,
    onBack,
    onNext,
    onSaveExit,
    isSaving = false
}) {
    const totalDailyEnergy =
        appliances.reduce(
            (
                total,
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
                    total +
                    quantity *
                        power *
                        hours *
                        (days / 7)
                );

            },
            0
        );

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-8">

                <h2 className="text-xl font-bold text-slate-900">
                    Review Assessment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Review the information before creating the solar assessment.
                </p>

            </div>

            <div className="space-y-6">

                <section className="rounded-2xl border border-slate-200 p-5">

                    <h3 className="mb-4 font-bold text-slate-900">
                        Household
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <ReviewItem
                            label="Household"
                            value={
                                household.household_name
                            }
                        />

                        <ReviewItem
                            label="House Type"
                            value={
                                household.house_type
                            }
                        />

                        <ReviewItem
                            label="Building Type"
                            value={
                                household.building_type
                            }
                        />

                        <ReviewItem
                            label="Floors"
                            value={
                                household.number_of_floors
                            }
                        />

                        <ReviewItem
                            label="Rooms"
                            value={
                                household.number_of_rooms
                            }
                        />

                        <ReviewItem
                            label="Occupants"
                            value={
                                household.number_of_occupants
                            }
                        />

                        <ReviewItem
                            label="County"
                            value={
                                household.county
                            }
                        />

                        <ReviewItem
                            label="Town"
                            value={
                                household.town
                            }
                        />

                        <ReviewItem
                            label="Area"
                            value={
                                household.area
                            }
                        />

                    </div>

                </section>

                <section className="rounded-2xl border border-slate-200 p-5">

                    <h3 className="mb-4 font-bold text-slate-900">
                        Roof
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <ReviewItem
                            label="House Dimensions"
                            value={`${measurement.house_length}m × ${measurement.house_width}m`}
                        />

                        <ReviewItem
                            label="Floor Area"
                            value={`${measurement.floor_area} m²`}
                        />

                        <ReviewItem
                            label="Roof Dimensions"
                            value={`${measurement.roof_length}m × ${measurement.roof_width}m`}
                        />

                        <ReviewItem
                            label="Roof Area"
                            value={`${measurement.roof_area} m²`}
                        />

                        <ReviewItem
                            label="Roof Type"
                            value={
                                measurement.roof_type
                            }
                        />

                        <ReviewItem
                            label="Roof Material"
                            value={
                                measurement.roof_material
                            }
                        />

                        <ReviewItem
                            label="Orientation"
                            value={
                                measurement.roof_orientation
                            }
                        />

                        <ReviewItem
                            label="Shading"
                            value={
                                measurement.shading_level
                            }
                        />

                    </div>

                </section>

                <section className="rounded-2xl border border-slate-200 p-5">

                    <div className="mb-4 flex items-center justify-between">

                        <h3 className="font-bold text-slate-900">
                            Appliances
                        </h3>

                        <span className="text-sm font-semibold text-slate-500">
                            {appliances.length} appliance(s)
                        </span>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-left text-sm">

                            <thead>

                                <tr className="border-b border-slate-200">

                                    <th className="px-3 py-3">
                                        Appliance
                                    </th>

                                    <th className="px-3 py-3">
                                        Qty
                                    </th>

                                    <th className="px-3 py-3">
                                        Power
                                    </th>

                                    <th className="px-3 py-3">
                                        Hours
                                    </th>

                                    <th className="px-3 py-3">
                                        Daily Energy
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {appliances.map(
                                    (
                                        appliance,
                                        index
                                    ) => {

                                        const energy =
                                            (
                                                Number(
                                                    appliance.quantity
                                                ) || 0
                                            ) *
                                            (
                                                Number(
                                                    appliance.power_rating_watts
                                                ) || 0
                                            ) *
                                            (
                                                Number(
                                                    appliance.hours_per_day
                                                ) || 0
                                            ) *
                                            (
                                                (
                                                    Number(
                                                        appliance.days_per_week
                                                    ) || 0
                                                ) /
                                                7
                                            );

                                        return (
                                            <tr
                                                key={
                                                    index
                                                }
                                                className="border-b border-slate-100"
                                            >

                                                <td className="px-3 py-3 font-medium">
                                                    {
                                                        appliance.appliance_name
                                                    }
                                                </td>

                                                <td className="px-3 py-3">
                                                    {
                                                        appliance.quantity
                                                    }
                                                </td>

                                                <td className="px-3 py-3">
                                                    {
                                                        appliance.power_rating_watts
                                                    }{" "}
                                                    W
                                                </td>

                                                <td className="px-3 py-3">
                                                    {
                                                        appliance.hours_per_day
                                                    }{" "}
                                                    h
                                                </td>

                                                <td className="px-3 py-3">
                                                    {energy.toFixed(
                                                        2
                                                    )}{" "}
                                                    Wh
                                                </td>

                                            </tr>
                                        );
                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                    <div className="mt-5 rounded-xl bg-green-50 p-4">

                        <p className="text-sm text-green-700">
                            Estimated Daily Energy
                        </p>

                        <p className="text-2xl font-bold text-green-800">
                            {totalDailyEnergy.toFixed(
                                2
                            )}{" "}
                            Wh/day
                        </p>

                    </div>

                </section>

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
                    className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700"
                >
                    ← Back
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
                        className="rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-600"
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
                        className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"
                    >
                        {isSaving
                            ? "Creating..."
                            : "Create Assessment →"}
                    </button>

                </div>

            </div>

        </div>
    );
}

function ReviewItem({
    label,
    value
}) {
    return (
        <div>
            <p className="text-xs font-medium uppercase text-slate-400">
                {label}
            </p>

            <p className="mt-1 font-medium capitalize text-slate-800">
                {value || "Not provided"}
            </p>
        </div>
    );
}