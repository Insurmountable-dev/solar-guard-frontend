import React from "react";

export default function HouseholdCard({
    household,
    onViewDetails,
    onAssess
}) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        {household.household_name ||
                            `Household ${household.household_id}`}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {household.county || "County not specified"}
                    </p>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {household.house_type}
                </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs text-slate-500">
                        Building
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                        {household.building_type ||
                            "Not specified"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-500">
                        Occupants
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                        {household.number_of_occupants}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-500">
                        Rooms
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                        {household.number_of_rooms || 0}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-500">
                        Floors
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                        {household.number_of_floors || 1}
                    </p>
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    type="button"
                    onClick={() =>
                        onViewDetails(household.household_id)
                    }
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    View Details
                </button>

                <button
                    type="button"
                    onClick={() =>
                        onAssess(household.household_id)
                    }
                    className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    Assess
                </button>
            </div>
        </div>
    );
}