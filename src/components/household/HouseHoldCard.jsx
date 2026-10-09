import React from "react";

import {
    Building2,
    MapPin,
    Users,
    Home,
    ArrowRight,
    Calculator,
    Plug,
    ClipboardList
} from "lucide-react";

export default function HouseholdCard({
    household,
    onViewDetails,
    onViewAppliances,
    onViewAssessments,
    onAssess
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="bg-gradient-to-r from-green-600 to-green-700 p-5">

                <div className="flex items-start justify-between">

                    <div>
                        <h2 className="text-lg font-bold text-white">
                            {household.household_name ||
                                "My Household"}
                        </h2>

                        <p className="mt-1 text-sm text-green-100">
                            Household #
                            {household.household_id}
                        </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                        <Home
                            size={22}
                            className="text-white"
                        />
                    </div>

                </div>

            </div>

            <div className="space-y-4 p-5">

                <InfoRow
                    icon={Building2}
                    label="House"
                    value={formatHouseType(
                        household.house_type
                    )}
                />

                <InfoRow
                    icon={Building2}
                    label="Building"
                    value={formatBuildingType(
                        household.building_type
                    )}
                />

                <InfoRow
                    icon={Users}
                    label="Occupants"
                    value={
                        household.number_of_occupants ??
                        "Not specified"
                    }
                />

                <InfoRow
                    icon={MapPin}
                    label="Location"
                    value={
                        getLocation(
                            household
                        )
                    }
                />

                <button
                    type="button"
                    onClick={() =>
                        onViewDetails(
                            household.household_id
                        )
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    View Household

                    <ArrowRight
                        size={16}
                    />
                </button>

                <div className="grid grid-cols-2 gap-3">

                    <button
                        type="button"
                        onClick={() =>
                            onViewAppliances(
                                household.household_id
                            )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                    >
                        <Plug
                            size={16}
                        />

                        Appliances
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onViewAssessments(
                                household.household_id
                            )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                        <ClipboardList
                            size={16}
                        />

                        Assessments
                    </button>

                </div>

                <button
                    type="button"
                    onClick={() =>
                        onAssess(
                            household.household_id
                        )
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    <Calculator
                        size={16}
                    />

                    Start Assessment
                </button>

            </div>

        </div>
    );
}

function InfoRow({
    icon: Icon,
    label,
    value
}) {
    return (
        <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">

                <Icon
                    size={17}
                    className="text-slate-500"
                />

            </div>

            <div className="min-w-0">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    {label}
                </p>

                <p className="truncate text-sm font-semibold text-slate-700">
                    {value}
                </p>

            </div>

        </div>
    );
}

function formatHouseType(
    value
) {
    if (!value) {
        return "Not specified";
    }

    return value
        .replaceAll("_", " ")
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );
}

function formatBuildingType(
    value
) {
    if (!value) {
        return "Not specified";
    }

    return value
        .replaceAll("_", " ")
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );
}

function getLocation(
    household
) {
    const parts = [
        household.town,
        household.county
    ].filter(Boolean);

    if (!parts.length) {
        return "Not specified";
    }

    return parts.join(", ");
}