import React from "react";

import {
    formatHouseholdValue,
    formatBooleanValue,
    formatHouseType,
    formatBuildingType
} from "../../utils/householdUtils";

export default function HouseholdDetails({
    household,
    isLoading,
    onClose
}) {
    if (!household) {
        return null;
    }

    return (
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Household Details
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Complete household information.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    Close
                </button>

            </div>

            {isLoading ? (
                <p className="text-sm text-slate-500">
                    Loading household details...
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    <Detail
                        label="Household Name"
                        value={formatHouseholdValue(
                            household.household_name
                        )}
                    />

                    <Detail
                        label="House Type"
                        value={formatHouseType(
                            household.house_type
                        )}
                    />

                    <Detail
                        label="Building Type"
                        value={formatBuildingType(
                            household.building_type
                        )}
                    />

                    <Detail
                        label="Floors"
                        value={formatHouseholdValue(
                            household.number_of_floors
                        )}
                    />

                    <Detail
                        label="Rooms"
                        value={formatHouseholdValue(
                            household.number_of_rooms
                        )}
                    />

                    <Detail
                        label="Occupants"
                        value={formatHouseholdValue(
                            household.number_of_occupants
                        )}
                    />

                    <Detail
                        label="County"
                        value={formatHouseholdValue(
                            household.county
                        )}
                    />

                    <Detail
                        label="Town"
                        value={formatHouseholdValue(
                            household.town
                        )}
                    />

                    <Detail
                        label="Area"
                        value={formatHouseholdValue(
                            household.area
                        )}
                    />

                    <Detail
                        label="Grid Connection"
                        value={formatBooleanValue(
                            household.has_grid_connection
                        )}
                    />

                    <Detail
                        label="Existing Solar"
                        value={formatBooleanValue(
                            household.has_existing_solar
                        )}
                    />

                </div>
            )}

        </div>
    );
}

function Detail({
    label,
    value
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
                {value}
            </p>

        </div>
    );
}