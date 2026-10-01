import React, {
    useEffect,
    useState
} from "react";

import {
    ArrowLeft,
    ClipboardCheck,
    Ruler
} from "lucide-react";

import useAssessments from "../../hooks/useAssessments";
import useMeasurements from "../../hooks/useMeasurements";

import AssessmentSummary from "./AssessmentSummary";
import AssessmentAppliances from "./AssessmentAppliances";
import SolarCalculation from "./SolarCalculation";
import SolarRecommendation from "./SolarRecommendation";
import RoofMeasurementForm from "./RoofMeasurementForm";

export default function AssessmentDetails({
    assessment,
    onBack
}) {
    const {
        assessment: loadedAssessment,
        assessmentAppliances,
        assessmentResult,
        calculation,
        isLoading,
        error,
        loadAssessmentById,
        loadAssessmentAppliances,
        loadAssessmentResult,
        runCalculation
    } = useAssessments();

    const {
        measurement,
        loadMeasurement
    } = useMeasurements();

    const [
        showMeasurement,
        setShowMeasurement
    ] = useState(false);

    useEffect(() => {
        if (!assessment?.assessment_id) {
            return;
        }

        const id =
            assessment.assessment_id;

        loadAssessmentById(id);
        loadAssessmentAppliances(id);
        loadAssessmentResult(id);
    }, [
        assessment?.assessment_id
    ]);

    const currentAssessment =
        loadedAssessment ||
        assessment;

    useEffect(() => {
        if (!currentAssessment?.household_id) {
            return;
        }

        loadMeasurement(
            currentAssessment.household_id
        );
    }, [
        currentAssessment?.household_id
    ]);

    const handleCalculate = async () => {
        if (!currentAssessment) {
            return;
        }

        await runCalculation(
            currentAssessment.household_id,
            currentAssessment.assessment_id
        );

        await loadAssessmentResult(
            currentAssessment.assessment_id
        );
    };

    if (!currentAssessment) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50">

            <main className="mx-auto max-w-7xl px-6 py-8">

                <button
                    type="button"
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                    <ArrowLeft size={18} />
                    Back to Assessments
                </button>

                <div className="mb-8 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                            <ClipboardCheck
                                size={25}
                                className="text-green-600"
                            />
                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-slate-900">
                                Solar Assessment
                            </h1>

                            <p className="text-sm text-slate-500">
                                Assessment #
                                {currentAssessment.assessment_id}
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setShowMeasurement(
                                previous =>
                                    !previous
                            )
                        }
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                        <Ruler size={18} />

                        {showMeasurement
                            ? "Hide Measurements"
                            : "Roof Measurements"}
                    </button>

                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                        <p className="text-sm font-medium text-rose-600">
                            {error}
                        </p>

                    </div>
                )}

                {showMeasurement && (
                    <RoofMeasurementForm
                        householdId={
                            currentAssessment.household_id
                        }
                        onSuccess={() => {
                            setShowMeasurement(
                                false
                            );

                            loadMeasurement(
                                currentAssessment.household_id
                            );
                        }}
                        onCancel={() =>
                            setShowMeasurement(
                                false
                            )
                        }
                    />
                )}

                {!showMeasurement &&
                    measurement && (
                        <MeasurementSummary
                            measurement={
                                measurement
                            }
                            onEdit={() =>
                                setShowMeasurement(
                                    true
                                )
                            }
                        />
                    )}

                <AssessmentSummary
                    assessment={
                        currentAssessment
                    }
                />

                <AssessmentAppliances
                    appliances={
                        assessmentAppliances
                    }
                />

                <SolarCalculation
                    calculation={
                        calculation
                    }
                    isLoading={
                        isLoading
                    }
                    onCalculate={
                        handleCalculate
                    }
                />

                {assessmentResult && (
                    <SolarRecommendation
                        result={
                            assessmentResult
                        }
                    />
                )}

            </main>

        </div>
    );
}

function MeasurementSummary({
    measurement,
    onEdit
}) {
    return (
        <section className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6">

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-lg font-bold text-green-900">
                        Roof Measurements
                    </h2>

                    <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-4">

                        <Info
                            label="House"
                            value={`${measurement.house_length}m × ${measurement.house_width}m`}
                        />

                        <Info
                            label="Floor Area"
                            value={`${measurement.floor_area} m²`}
                        />

                        <Info
                            label="Roof"
                            value={`${measurement.roof_length}m × ${measurement.roof_width}m`}
                        />

                        <Info
                            label="Roof Area"
                            value={`${measurement.roof_area} m²`}
                        />

                        <Info
                            label="Roof Type"
                            value={measurement.roof_type}
                        />

                        <Info
                            label="Material"
                            value={measurement.roof_material}
                        />

                        <Info
                            label="Orientation"
                            value={
                                measurement.roof_orientation ||
                                "Not specified"
                            }
                        />

                        <Info
                            label="Shading"
                            value={measurement.shading_level}
                        />

                    </div>

                </div>

                <button
                    type="button"
                    onClick={onEdit}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
                >
                    Edit
                </button>

            </div>

        </section>
    );
}

function Info({
    label,
    value
}) {
    return (
        <div>

            <p className="text-xs font-medium uppercase tracking-wide text-green-600">
                {label}
            </p>

            <p className="mt-1 font-semibold capitalize text-green-900">
                {value || "Not specified"}
            </p>

        </div>
    );
}