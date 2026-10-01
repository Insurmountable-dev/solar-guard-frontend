import React from "react";

export default function HouseholdHeader({
    onNavigate,
    onAddHousehold
}) {
    return (
        <div className="mb-8 flex items-center justify-between">

            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    My Households
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage the households used for your solar assessments.
                </p>
            </div>

            <div className="flex gap-3">

                <button
                    type="button"
                    onClick={() =>
                        onNavigate("dashboard")
                    }
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    Dashboard
                </button>

                <button
                    type="button"
                    onClick={onAddHousehold}
                    className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    + Add Household
                </button>

            </div>

        </div>
    );
}