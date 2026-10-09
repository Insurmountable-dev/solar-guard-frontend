import React from "react";

import {
    X,
    Home,
    Building2,
    Users,
    MapPin,
    Layers,
    DoorOpen,
    Zap,
    Sun
} from "lucide-react";

export default function HouseholdDetails({
    household,
    isLoading,
    onClose
}) {
    if (!household && !isLoading) {
        return null;
    }

    return (
        <div className="mb-8">

            {isLoading && (
                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-green-600" />

                    <p className="text-sm text-slate-500">
                        Loading household details...
                    </p>

                </div>
            )}

            {!isLoading && household && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between bg-slate-900 px-6 py-5">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
                                Household Details
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-white">
                                {household.household_name ||
                                    "My Household"}
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
                        >
                            <X
                                size={20}
                            />
                        </button>

                    </div>

                    <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">

                        <DetailItem
                            icon={Home}
                            label="House Type"
                            value={formatValue(
                                household.house_type
                            )}
                        />

                        <DetailItem
                            icon={Building2}
                            label="Building Type"
                            value={formatValue(
                                household.building_type
                            )}
                        />

                        <DetailItem
                            icon={Layers}
                            label="Floors"
                            value={
                                household.number_of_floors ??
                                "Not specified"
                            }
                        />

                        <DetailItem
                            icon={DoorOpen}
                            label="Rooms"
                            value={
                                household.number_of_rooms ??
                                "Not specified"
                            }
                        />

                        <DetailItem
                            icon={Users}
                            label="Occupants"
                            value={
                                household.number_of_occupants ??
                                "Not specified"
                            }
                        />

                        <DetailItem
                            icon={MapPin}
                            label="Location"
                            value={getLocation(
                                household
                            )}
                        />

                        <DetailItem
                            icon={Zap}
                            label="Grid Connection"
                            value={
                                household.has_grid_connection
                                    ? "Available"
                                    : "Not Available"
                            }
                        />

                        <DetailItem
                            icon={Sun}
                            label="Existing Solar"
                            value={
                                household.has_existing_solar
                                    ? "Yes"
                                    : "No"
                            }
                        />

                        <DetailItem
                            icon={MapPin}
                            label="Area"
                            value={
                                household.area ||
                                "Not specified"
                            }
                        />

                    </div>

                </div>
            )}

        </div>
    );
}

function DetailItem({
    icon: Icon,
    label,
    value
}) {
    return (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <Icon
                        size={18}
                        className="text-green-600"
                    />
                </div>

                <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        {label}
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
}

function formatValue(
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