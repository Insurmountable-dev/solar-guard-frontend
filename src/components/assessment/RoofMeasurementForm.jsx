import React, {
    useEffect,
    useState
} from "react";

import {
    Ruler,
    Save,
    X
} from "lucide-react";

import useMeasurements from "../../hooks/useMeasurements";

export default function RoofMeasurementForm({
    householdId,
    onSuccess,
    onCancel
}) {

    const {
        measurement,
        isLoading,
        error,
        loadMeasurement,
        saveMeasurement
    } = useMeasurements();

    const [
        formData,
        setFormData
    ] = useState({
        house_length: "",
        house_width: "",
        floor_area: "",
        roof_length: "",
        roof_width: "",
        roof_area: "",
        roof_type: "gable",
        roof_material: "mabati",
        roof_orientation: "",
        shading_level: "low",
        measurement_method: "manual"
    });

    const [
        formError,
        setFormError
    ] = useState("");

    useEffect(() => {

        if (!householdId) {
            return;
        }

        loadMeasurement(
            householdId
        );

    }, [
        householdId
    ]);

    useEffect(() => {

        if (!measurement) {
            return;
        }

        setFormData({
            house_length:
                measurement.house_length || "",

            house_width:
                measurement.house_width || "",

            floor_area:
                measurement.floor_area || "",

            roof_length:
                measurement.roof_length || "",

            roof_width:
                measurement.roof_width || "",

            roof_area:
                measurement.roof_area || "",

            roof_type:
                measurement.roof_type ||
                "gable",

            roof_material:
                measurement.roof_material ||
                "mabati",

            roof_orientation:
                measurement.roof_orientation ||
                "",

            shading_level:
                measurement.shading_level ||
                "low",

            measurement_method:
                measurement.measurement_method ||
                "manual"
        });

    }, [
        measurement
    ]);

    const handleChange = (
        event
    ) => {

        const {
            name,
            value
        } = event.target;

        setFormData(
            previous => ({
                ...previous,
                [name]: value
            })
        );

    };

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        setFormError("");

        if (!householdId) {
            setFormError(
                "Household is required."
            );

            return;
        }

        if (
            Number(
                formData.house_length
            ) <= 0 ||
            Number(
                formData.house_width
            ) <= 0
        ) {
            setFormError(
                "Enter valid house dimensions."
            );

            return;
        }

        if (
            Number(
                formData.roof_length
            ) <= 0 ||
            Number(
                formData.roof_width
            ) <= 0
        ) {
            setFormError(
                "Enter valid roof dimensions."
            );

            return;
        }

        const calculatedFloorArea =
            Number(
                formData.house_length
            ) *
            Number(
                formData.house_width
            );

        const calculatedRoofArea =
            Number(
                formData.roof_length
            ) *
            Number(
                formData.roof_width
            );

        const saved =
            await saveMeasurement({
                household_id:
                    Number(
                        householdId
                    ),

                house_length:
                    Number(
                        formData.house_length
                    ),

                house_width:
                    Number(
                        formData.house_width
                    ),

                floor_area:
                    Number(
                        formData.floor_area ||
                        calculatedFloorArea
                    ),

                roof_length:
                    Number(
                        formData.roof_length
                    ),

                roof_width:
                    Number(
                        formData.roof_width
                    ),

                roof_area:
                    Number(
                        formData.roof_area ||
                        calculatedRoofArea
                    ),

                roof_type:
                    formData.roof_type,

                roof_material:
                    formData.roof_material,

                roof_orientation:
                    formData.roof_orientation.trim(),

                shading_level:
                    formData.shading_level,

                measurement_method:
                    formData.measurement_method
            });

        if (saved && onSuccess) {
            onSuccess(saved);
        }

    };

    return (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">

                        <Ruler
                            size={22}
                            className="text-green-600"
                        />

                    </div>

                    <div>

                        <h2 className="text-lg font-bold text-slate-900">
                            Roof Measurements
                        </h2>

                        <p className="text-sm text-slate-500">
                            Enter dimensions used to determine available solar panel space.
                        </p>

                    </div>

                </div>

            </div>

            {(formError || error) && (
                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                    <p className="text-sm font-medium text-rose-600">
                        {formError || error}
                    </p>

                </div>
            )}

            <form
                onSubmit={
                    handleSubmit
                }
                className="space-y-6"
            >

                <div>

                    <h3 className="mb-4 text-sm font-bold text-slate-900">
                        House Dimensions
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                        <NumberField
                            label="House Length (m)"
                            name="house_length"
                            value={
                                formData.house_length
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. 12"
                        />

                        <NumberField
                            label="House Width (m)"
                            name="house_width"
                            value={
                                formData.house_width
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. 8"
                        />

                        <NumberField
                            label="Floor Area (m²)"
                            name="floor_area"
                            value={
                                formData.floor_area
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Auto calculated"
                        />

                    </div>

                </div>

                <div>

                    <h3 className="mb-4 text-sm font-bold text-slate-900">
                        Roof Dimensions
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                        <NumberField
                            label="Roof Length (m)"
                            name="roof_length"
                            value={
                                formData.roof_length
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. 13"
                        />

                        <NumberField
                            label="Roof Width (m)"
                            name="roof_width"
                            value={
                                formData.roof_width
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. 9"
                        />

                        <NumberField
                            label="Roof Area (m²)"
                            name="roof_area"
                            value={
                                formData.roof_area
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Auto calculated"
                        />

                    </div>

                </div>

                <div>

                    <h3 className="mb-4 text-sm font-bold text-slate-900">
                        Roof Information
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <SelectField
                            label="Roof Type"
                            name="roof_type"
                            value={
                                formData.roof_type
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                [
                                    "flat",
                                    "Flat"
                                ],
                                [
                                    "gable",
                                    "Gable"
                                ],
                                [
                                    "hip",
                                    "Hip"
                                ],
                                [
                                    "mansard",
                                    "Mansard"
                                ],
                                [
                                    "shed",
                                    "Shed"
                                ],
                                [
                                    "other",
                                    "Other"
                                ]
                            ]}
                        />

                        <SelectField
                            label="Roof Material"
                            name="roof_material"
                            value={
                                formData.roof_material
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                [
                                    "mabati",
                                    "Mabati"
                                ],
                                [
                                    "tiles",
                                    "Tiles"
                                ],
                                [
                                    "concrete",
                                    "Concrete"
                                ],
                                [
                                    "other",
                                    "Other"
                                ]
                            ]}
                        />

                        <SelectField
                            label="Shading Level"
                            name="shading_level"
                            value={
                                formData.shading_level
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                [
                                    "none",
                                    "None"
                                ],
                                [
                                    "low",
                                    "Low"
                                ],
                                [
                                    "medium",
                                    "Medium"
                                ],
                                [
                                    "high",
                                    "High"
                                ]
                            ]}
                        />

                        <SelectField
                            label="Measurement Method"
                            name="measurement_method"
                            value={
                                formData.measurement_method
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                [
                                    "manual",
                                    "Manual"
                                ],
                                [
                                    "mobile_measurement",
                                    "Mobile Measurement"
                                ],
                                [
                                    "estimated",
                                    "Estimated"
                                ]
                            ]}
                        />

                        <div className="md:col-span-2">

                            <label className="text-sm font-medium text-slate-700">
                                Roof Orientation
                            </label>

                            <input
                                type="text"
                                name="roof_orientation"
                                value={
                                    formData.roof_orientation
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. East-West"
                                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />

                        </div>

                    </div>

                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                    <button
                        type="button"
                        onClick={
                            onCancel
                        }
                        disabled={
                            isLoading
                        }
                        className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        <X size={17} />
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={
                            isLoading
                        }
                        className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save size={17} />

                        {isLoading
                            ? "Saving..."
                            : "Save Measurements"}
                    </button>

                </div>

            </form>

        </section>
    );
}

function NumberField({
    label,
    name,
    value,
    onChange,
    placeholder
}) {
    return (
        <div>

            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                min="0"
                step="0.01"
                placeholder={placeholder}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

        </div>
    );
}

function SelectField({
    label,
    name,
    value,
    onChange,
    options
}) {
    return (
        <div>

            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >

                {options.map(
                    option => (
                        <option
                            key={
                                option[0]
                            }
                            value={
                                option[0]
                            }
                        >
                            {
                                option[1]
                            }
                        </option>
                    )
                )}

            </select>

        </div>
    );
}