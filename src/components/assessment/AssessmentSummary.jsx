import React from "react";

import {
    Home,
    Users,
    CalendarDays,
    ClipboardCheck
} from "lucide-react";

export default function AssessmentSummary({
    assessment
}) {
    return (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">

                <h2 className="text-lg font-bold text-slate-900">
                    Assessment Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Basic information about this solar assessment.
                </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

                <SummaryCard
                    icon={
                        <ClipboardCheck size={20} />
                    }
                    label="Assessment"
                    value={
                        `#${assessment.assessment_id}`
                    }
                />

                <SummaryCard
                    icon={
                        <Home size={20} />
                    }
                    label="Household"
                    value={
                        assessment.household_name ||
                        `Household ${assessment.household_id}`
                    }
                />

                <SummaryCard
                    icon={
                        <CalendarDays size={20} />
                    }
                    label="Created"
                    value={
                        assessment.created_at
                            ? new Date(
                                assessment.created_at
                            ).toLocaleDateString()
                            : "Unknown"
                    }
                />

                <SummaryCard
                    icon={
                        <Users size={20} />
                    }
                    label="Status"
                    value={
                        assessment.assessment_status ||
                        "draft"
                    }
                />

            </div>

        </section>
    );
}

function SummaryCard({
    icon,
    label,
    value
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-4">

            <div className="flex items-center gap-3">

                <div className="text-green-600">
                    {icon}
                </div>

                <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {label}
                    </p>

                    <p className="mt-1 font-semibold capitalize text-slate-900">
                        {value}
                    </p>

                </div>

            </div>

        </div>
    );
}