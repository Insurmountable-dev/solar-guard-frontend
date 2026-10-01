import React from "react";

import HouseholdCard from "./HouseholdCard";

export default function HouseholdList({
    households = [],
    isLoading = false,
    onViewDetails,
    onAssess
}) {
    if (isLoading) {
        return (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <p className="text-sm text-slate-500">
                    Loading your households...
                </p>
            </div>
        );
    }

    if (households.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h2 className="text-lg font-semibold text-slate-900">
                    No households yet
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Add a household to begin your solar assessment.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {households.map((household) => (
                <HouseholdCard
                    key={household.household_id}
                    household={household}
                    onViewDetails={onViewDetails}
                    onAssess={onAssess}
                />
            ))}
        </div>
    );
}