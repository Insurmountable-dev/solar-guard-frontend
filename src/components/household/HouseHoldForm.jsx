import React, {
    useState
} from "react";

import {
    createHousehold
} from "../../services/householdService";

import {
    createMeasurement
} from "../../services/measurementService";

export default function HouseholdForm({
    onSuccess,
    onCancel
}) {
    const [
        isSubmitting,
        setIsSubmitting
    ] = useState(false);

    const [
        error,
        setError
    ] = useState("");

    const [
        formData,
        setFormData
    ] = useState({
        household_name: "",
        house_type: "stone",
        building_type: "bungalow",
        number_of_floors: 1,
        number_of_rooms: "",
        number_of_occupants: "",
        county: "",
        town: "",
        area: "",
        has_grid_connection: true,
        has_existing_solar: false,

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

    const handleChange = (
        event
    ) => {
        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setFormData(
            previous => ({
                ...previous,
                [name]:
                    type === "checkbox"
                        ? checked
                        : value
            })
        );
    };

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        setError("");

        if (
            !formData.household_name ||
            !formData.house_type ||
            !formData.number_of_occupants
        ) {
            setError(
                "Please complete the required household fields."
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
            setError(
                "Please enter valid house dimensions."
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
            setError(
                "Please enter valid roof dimensions."
            );

            return;
        }

        try {
            setIsSubmitting(true);

            const floorArea =
                Number(
                    formData.floor_area
                ) ||
                Number(
                    formData.house_length
                ) *
                Number(
                    formData.house_width
                );

            const roofArea =
                Number(
                    formData.roof_area
                ) ||
                Number(
                    formData.roof_length
                ) *
                Number(
                    formData.roof_width
                );

            const householdResponse =
                await createHousehold({
                    household_name:
                        formData.household_name,

                    house_type:
                        formData.house_type,

                    building_type:
                        formData.building_type,

                    number_of_floors:
                        Number(
                            formData.number_of_floors
                        ),

                    number_of_rooms:
                        Number(
                            formData.number_of_rooms
                        ) || null,

                    number_of_occupants:
                        Number(
                            formData.number_of_occupants
                        ),

                    county:
                        formData.county,

                    town:
                        formData.town,

                    area:
                        formData.area,

                    has_grid_connection:
                        formData.has_grid_connection,

                    has_existing_solar:
                        formData.has_existing_solar
                });

            const householdId =
                householdResponse.household_id;

            if (!householdId) {
                throw new Error(
                    "Household was created but no household ID was returned."
                );
            }

            await createMeasurement({
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
                    floorArea,

                roof_length:
                    Number(
                        formData.roof_length
                    ),

                roof_width:
                    Number(
                        formData.roof_width
                    ),

                roof_area:
                    roofArea,

                roof_type:
                    formData.roof_type,

                roof_material:
                    formData.roof_material,

                roof_orientation:
                    formData.roof_orientation,

                shading_level:
                    formData.shading_level,

                measurement_method:
                    formData.measurement_method
            });

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {
            console.error(
                "Household creation error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to create household."
            );

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900">
                    Add Household
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Enter household information and roof measurements.
                </p>
            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                    <p className="text-sm font-medium text-rose-600">
                        {error}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <FormSection
                    title="Household Information"
                >

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <Input
                            label="Household Name"
                            name="household_name"
                            value={
                                formData.household_name
                            }
                            onChange={
                                handleChange
                            }
                            required
                            placeholder="e.g. Njoroge Family"
                        />

                        <Select
                            label="House Type"
                            name="house_type"
                            value={
                                formData.house_type
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                ["stone", "Stone"],
                                ["brick", "Brick"],
                                ["mud", "Mud"],
                                ["mabati", "Mabati"],
                                ["concrete", "Concrete"],
                                ["timber", "Timber"],
                                ["mixed", "Mixed"],
                                ["other", "Other"]
                            ]}
                        />

                        <Select
                            label="Building Type"
                            name="building_type"
                            value={
                                formData.building_type
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                ["bungalow", "Bungalow"],
                                ["maisonette", "Maisonette"],
                                ["apartment", "Apartment"],
                                ["storey", "Storey"],
                                ["flat", "Flat"],
                                ["duplex", "Duplex"],
                                ["townhouse", "Townhouse"],
                                ["other", "Other"]
                            ]}
                        />

                        <Input
                            label="Number of Floors"
                            name="number_of_floors"
                            type="number"
                            value={
                                formData.number_of_floors
                            }
                            onChange={
                                handleChange
                            }
                            min="1"
                        />

                        <Input
                            label="Number of Rooms"
                            name="number_of_rooms"
                            type="number"
                            value={
                                formData.number_of_rooms
                            }
                            onChange={
                                handleChange
                            }
                            min="1"
                        />

                        <Input
                            label="Number of Occupants"
                            name="number_of_occupants"
                            type="number"
                            value={
                                formData.number_of_occupants
                            }
                            onChange={
                                handleChange
                            }
                            min="1"
                            required
                        />

                        <Input
                            label="County"
                            name="county"
                            value={
                                formData.county
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <Input
                            label="Town"
                            name="town"
                            value={
                                formData.town
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                </FormSection>

                <FormSection
                    title="House Measurements"
                >

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                        <Input
                            label="House Length (m)"
                            name="house_length"
                            type="number"
                            value={
                                formData.house_length
                            }
                            onChange={
                                handleChange
                            }
                            min="0"
                            step="0.01"
                            required
                        />

                        <Input
                            label="House Width (m)"
                            name="house_width"
                            type="number"
                            value={
                                formData.house_width
                            }
                            onChange={
                                handleChange
                            }
                            min="0"
                            step="0.01"
                            required
                        />

                        <Input
                            label="Floor Area (m²)"
                            name="floor_area"
                            type="number"
                            value={
                                formData.floor_area
                            }
                            onChange={
                                handleChange
                            }
                            min="0"
                            step="0.01"
                            placeholder="Auto calculated"
                        />

                    </div>

                </FormSection>

                <FormSection
                    title="Roof Measurements"
                >

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                        <Input
                            label="Roof Length (m)"
                            name="roof_length"
                            type="number"
                            value={
                                formData.roof_length
                            }
                            onChange={
                                handleChange
                            }
                            min="0"
                            step="0.01"
                            required
                        />

                        <Input
                            label="Roof Width (m)"
                            name="roof_width"
                            type="number"
                            value={
                                formData.roof_width
                            }
                            onChange={
                                handleChange
                            }
                            min="0"
                            step="0.01"
                            required
                        />

                        <Input
                            label="Roof Area (m²)"
                            name="roof_area"
                            type="number"
                            value={
                                formData.roof_area
                            }
                            onChange={
                                handleChange
                            }
                            min="0"
                            step="0.01"
                            placeholder="Auto calculated"
                        />

                        <Select
                            label="Roof Type"
                            name="roof_type"
                            value={
                                formData.roof_type
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                ["flat", "Flat"],
                                ["gable", "Gable"],
                                ["hip", "Hip"],
                                ["mansard", "Mansard"],
                                ["shed", "Shed"],
                                ["other", "Other"]
                            ]}
                        />

                        <Select
                            label="Roof Material"
                            name="roof_material"
                            value={
                                formData.roof_material
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                ["mabati", "Mabati"],
                                ["tiles", "Tiles"],
                                ["concrete", "Concrete"],
                                ["other", "Other"]
                            ]}
                        />

                        <Select
                            label="Shading Level"
                            name="shading_level"
                            value={
                                formData.shading_level
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                ["none", "None"],
                                ["low", "Low"],
                                ["medium", "Medium"],
                                ["high", "High"]
                            ]}
                        />

                        <Select
                            label="Measurement Method"
                            name="measurement_method"
                            value={
                                formData.measurement_method
                            }
                            onChange={
                                handleChange
                            }
                            options={[
                                ["manual", "Manual"],
                                [
                                    "mobile_measurement",
                                    "Mobile Measurement"
                                ],
                                ["estimated", "Estimated"]
                            ]}
                        />

                        <Input
                            label="Roof Orientation"
                            name="roof_orientation"
                            value={
                                formData.roof_orientation
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. East-West"
                        />

                    </div>

                </FormSection>

                <FormSection
                    title="Solar Connection"
                >

                    <div className="flex flex-col gap-4 md:flex-row">

                        <Checkbox
                            label="Grid connection available"
                            name="has_grid_connection"
                            checked={
                                formData.has_grid_connection
                            }
                            onChange={
                                handleChange
                            }
                        />

                        <Checkbox
                            label="Existing solar system"
                            name="has_existing_solar"
                            checked={
                                formData.has_existing_solar
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </div>

                </FormSection>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">

                    <button
                        type="button"
                        onClick={
                            onCancel
                        }
                        disabled={
                            isSubmitting
                        }
                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
                        className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Saving Household..."
                            : "Save Household"}
                    </button>

                </div>

            </form>

        </div>
    );
}

function FormSection({
    title,
    children
}) {
    return (
        <section>

            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                {title}
            </h3>

            {children}

        </section>
    );
}

function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    required = false,
    min,
    step,
    placeholder
}) {
    return (
        <div>

            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                min={min}
                step={step}
                placeholder={placeholder}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

        </div>
    );
}

function Select({
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

function Checkbox({
    label,
    name,
    checked,
    onChange
}) {
    return (
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">

            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 accent-green-600"
            />

            <span className="text-sm font-medium text-slate-700">
                {label}
            </span>

        </label>
    );
}