import React from "react";

import AssessmentCard from "./AssessmentCard";

export default function AssessmentList({
    assessments = [],
    isLoading = false,
    onViewAssessment
}) {

    if (isLoading) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="text-sm text-slate-500">
                    Loading your assessments...
                </p>
            </div>
        );
    }

    if (assessments.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h2 className="text-lg font-bold text-slate-900">
                    No assessments yet
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Create an assessment to calculate the solar system requirements for a household.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {assessments.map(
                assessment => (
                    <AssessmentCard
                        key={
                            assessment.assessment_id
                        }
                        assessment={
                            assessment
                        }
                        onViewAssessment={
                            onViewAssessment
                        }
                    />
                )
            )}

        </div>
    );
}