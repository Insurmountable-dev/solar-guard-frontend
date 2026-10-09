import React from "react";

import HouseholdCard from "./HouseholdCard";

export default function HouseholdList({
    households = [],
    isLoading = false,
    onViewDetails,
    onViewAppliances,
    onViewAssessments,
    onAssess
}) {
    if (isLoading) {
        return (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-green-600" />

                <p className="text-sm text-slate-500">
                    Loading your households...
                </p>

            </div>
        );
    }

    if (!households.length) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">

                    <span className="text-2xl">
                        🏠
                    </span>

                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-900">
                    No households available
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    You do not have a household yet.
                    Start a new assessment to create
                    your first household.
                </p>

            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {households.map(
                (household) => (
                    <HouseholdCard
                        key={
                            household.household_id
                        }
                        household={
                            household
                        }
                        onViewDetails={
                            onViewDetails
                        }
                        onViewAppliances={
                            onViewAppliances
                        }
                        onViewAssessments={
                            onViewAssessments
                        }
                        onAssess={
                            onAssess
                        }
                    />
                )
            )}

        </div>
    );
}