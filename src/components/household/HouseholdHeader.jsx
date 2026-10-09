import React from "react";

import {
    ArrowLeft,
    Plus
} from "lucide-react";


export default function HouseholdHeader({
    onNavigate,
    onStartAssessment
}) {

    return (
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

                <h1 className="text-3xl font-bold text-slate-900">
                    My Households
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    View your registered households and
                    start solar assessments.
                </p>

            </div>


            <div className="flex flex-wrap gap-3">

                <button
                    type="button"
                    onClick={() =>
                        onNavigate(
                            "dashboard"
                        )
                    }
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >

                    <ArrowLeft
                        size={17}
                    />

                    Dashboard

                </button>


                <button
                    type="button"
                    onClick={
                        onStartAssessment
                    }
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                >

                    <Plus
                        size={18}
                    />

                    Start Assessment

                </button>

            </div>

        </div>
    );

}