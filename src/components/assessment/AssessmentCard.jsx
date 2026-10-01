import React from "react";

import {
    ClipboardCheck,
    Home,
    CalendarDays,
    Eye
} from "lucide-react";

export default function AssessmentCard({
    assessment,
    onViewAssessment
}) {

    const status =
        assessment.assessment_status ||
        "draft";

    const statusClasses = {
        draft:
            "bg-amber-50 text-amber-700",

        completed:
            "bg-green-50 text-green-700",

        reviewed:
            "bg-blue-50 text-blue-700"
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="mb-5 flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">

                    <ClipboardCheck
                        size={22}
                        className="text-green-600"
                    />

                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        statusClasses[status] ||
                        "bg-slate-100 text-slate-600"
                    }`}
                >
                    {status}
                </span>

            </div>

            <h2 className="text-lg font-bold text-slate-900">
                Assessment #{assessment.assessment_id}
            </h2>

            <div className="mt-5 space-y-3">

                <div className="flex items-center gap-3">

                    <Home
                        size={17}
                        className="text-slate-400"
                    />

                    <span className="text-sm text-slate-600">
                        {assessment.household_name ||
                            `Household ${assessment.household_id}`}
                    </span>

                </div>

                <div className="flex items-center gap-3">

                    <CalendarDays
                        size={17}
                        className="text-slate-400"
                    />

                    <span className="text-sm text-slate-600">
                        {assessment.created_at
                            ? new Date(
                                assessment.created_at
                            ).toLocaleDateString()
                            : "Date unavailable"}
                    </span>

                </div>

            </div>

            <button
                type="button"
                onClick={() =>
                    onViewAssessment(
                        assessment
                    )
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >

                <Eye size={17} />

                View Assessment

            </button>

        </div>
    );
}