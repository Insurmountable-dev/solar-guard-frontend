import React from "react";

export default function Step2RoofDetails({
    data,
    onChange,
    onNext,
    onBack,
    onSaveExit,
    isSaving = false
}) {
    const handleChange = (
        event
    ) => {
        const {
            name,
            value
        } = event.target;

        onChange({
            ...data,
            [name]: value
        });
    };

    const calculateFloorArea = () => {
        const length =
            Number(data.house_length);

        const width =
            Number(data.house_width);

        if (
            length > 0 &&
            width > 0
        ) {
            return (
                length * width
            ).toFixed(2);
        }

        return "";
    };

    const calculateRoofArea = () => {
        const length =
            Number(data.roof_length);

        const width =
            Number(data.roof_width);

        if (
            length > 0 &&
            width > 0
        ) {
            return (
                length * width
            ).toFixed(2);
        }

        return "";
    };

    const handleContinue = () => {
        const updatedData = {
            ...data,
            floor_area:
                data.floor_area ||
                calculateFloorArea(),
            roof_area:
                data.roof_area ||
                calculateRoofArea()
        };

        onNext(updatedData);
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-8">

                <h2 className="text-xl font-bold text-slate-900">
                    Roof Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Provide the dimensions and characteristics of the house and roof.
                </p>

            </div>

            <div className="space-y-8">

                <section>

                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                        House Dimensions
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                House Length (m)
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="house_length"
                                value={
                                    data.house_length
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="12"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                House Width (m)
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="house_width"
                                value={
                                    data.house_width
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="10"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Floor Area (m²)
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="floor_area"
                                value={
                                    data.floor_area ||
                                    calculateFloorArea()
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                    </div>

                </section>

                <section>

                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                        Roof Dimensions
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Roof Length (m)
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="roof_length"
                                value={
                                    data.roof_length
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="13"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Roof Width (m)
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="roof_width"
                                value={
                                    data.roof_width
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="11"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Roof Area (m²)
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="roof_area"
                                value={
                                    data.roof_area ||
                                    calculateRoofArea()
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                    </div>

                </section>

                <section>

                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                        Roof Characteristics
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Roof Type
                            </label>

                            <select
                                name="roof_type"
                                value={
                                    data.roof_type
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            >
                                <option value="flat">
                                    Flat
                                </option>

                                <option value="gable">
                                    Gable
                                </option>

                                <option value="hip">
                                    Hip
                                </option>

                                <option value="mansard">
                                    Mansard
                                </option>

                                <option value="shed">
                                    Shed
                                </option>

                                <option value="other">
                                    Other
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Roof Material
                            </label>

                            <select
                                name="roof_material"
                                value={
                                    data.roof_material
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            >
                                <option value="mabati">
                                    Mabati
                                </option>

                                <option value="tiles">
                                    Tiles
                                </option>

                                <option value="concrete">
                                    Concrete
                                </option>

                                <option value="other">
                                    Other
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Roof Orientation
                            </label>

                            <select
                                name="roof_orientation"
                                value={
                                    data.roof_orientation
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            >
                                <option value="north-south">
                                    North-South
                                </option>

                                <option value="east-west">
                                    East-West
                                </option>

                                <option value="north">
                                    North
                                </option>

                                <option value="south">
                                    South
                                </option>

                                <option value="east">
                                    East
                                </option>

                                <option value="west">
                                    West
                                </option>

                                <option value="other">
                                    Other
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Shading Level
                            </label>

                            <select
                                name="shading_level"
                                value={
                                    data.shading_level
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            >
                                <option value="none">
                                    None
                                </option>

                                <option value="low">
                                    Low
                                </option>

                                <option value="medium">
                                    Medium
                                </option>

                                <option value="high">
                                    High
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Measurement Method
                            </label>

                            <select
                                name="measurement_method"
                                value={
                                    data.measurement_method
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            >
                                <option value="manual">
                                    Manual
                                </option>

                                <option value="mobile_measurement">
                                    Mobile Measurement
                                </option>

                                <option value="estimated">
                                    Estimated
                                </option>
                            </select>
                        </div>

                    </div>

                </section>

            </div>

            <div className="mt-8 flex justify-between border-t border-slate-200 pt-6">

                <button
                    type="button"
                    onClick={
                        onBack
                    }
                    disabled={
                        isSaving
                    }
                    className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700"
                >
                    ← Back
                </button>

                <div className="flex gap-3">

                    <button
                        type="button"
                        onClick={
                            onSaveExit
                        }
                        disabled={
                            isSaving
                        }
                        className="rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-600"
                    >
                        Save & Exit
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleContinue
                        }
                        disabled={
                            isSaving
                        }
                        className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"
                    >
                        {isSaving
                            ? "Saving..."
                            : "Continue →"}
                    </button>

                </div>

            </div>

        </div>
    );
}