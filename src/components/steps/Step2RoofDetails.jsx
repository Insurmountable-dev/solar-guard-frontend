import { Ruler, Home, Layers, Mountain, Compass, Sun } from "lucide-react";

import InputField from "../common/InputField.jsx";
import StepsHeader from "./steps-components/StepsHeader";
import SectionCard from "./steps-components/SectionCard";
import FieldError from "./steps-components/FieldError";
import AreaDisplay from "./steps-components/AreaDisplay";
import { mabatiMaterials } from "../../data/householdsData";
import { ROOF_TYPES, ROOF_ORIENTATIONS, SHADING_LEVELS,MEASUREMENT_METHODS} from "../../data/roofOptions";




export default function Step2RoofDetails({ attempted = false, errors = {}, formData = {}, handleChange, }) {



    return (

        <div className="mx-auto w-full min-w-0 max-w-5xl space-y-5 sm:space-y-6">

            {/* Step introduction */}
            <div className="min-w-0 space-y-4">
                <StepsHeader
                    title="Tell us about your roof"
                    description="Describe your roof, its dimensions, orientation and how much sunlight it receives so we can estimate the space available for solar panels."
                />
            </div>

            {/* House and roof measurements */}
            <section className="min-w-0">
                
                <SectionCard
                    icon={Ruler}
                    title="House measurements"
                    description="Enter the approximate dimensions of your house and roof."
                    required
                >
                    <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5">

                        <div className="min-w-0">
                            <InputField
                                label="House length (metres)"
                                name="house_length"
                                type="number"
                                min="0"
                                icon={Ruler}
                                required
                                placeholder="e.g.12.0"
                                value={formData.house_length ?? ""}
                                onChange={handleChange}
                                helperText="Measure the length of the house footprint from one exterior wall to the opposite end. If estimating, use large steps (1 large step ≈ 0.75 m)."                                  />

                            {attempted && (
                                <FieldError
                                    message={errors?.house_length}
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            <InputField
                                label="House width (metres)"
                                name="house_width"
                                type="number"
                                min="0"
                                icon={Ruler}
                                required
                                placeholder="e.g. 8.0"
                                value={formData.house_width ?? ""}
                                onChange={handleChange}
                                helperText="Measure the width of the house footprint from one exterior wall to the opposite side. If estimating, use large steps (1 large step ≈ 0.75 m)."                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.house_width}
                                />
                            )}
                        </div>

                        <div className="min-w-0 sm:col-span-2">
                            <AreaDisplay
                                label="Floor area"
                                length={formData.house_length}
                                width={formData.house_width}
                            />
                        </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-5">
                        <p className="mb-4 text-sm font-semibold text-slate-800">
                            Roof size
                        </p>

                        <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5">

                            <div className="min-w-0">
                                <InputField
                                    label="Roof length (metres)"
                                    name="roof_length"
                                    type="number"
                                    min="0"
                                    icon={Ruler}
                                    required
                                    placeholder="e.g. 12.5"
                                    value={formData.roof_length ?? ""}
                                    onChange={handleChange}
                                    helperText="Measure the length of the roof from one end to the other. If exact measurements are unavailable, estimate using steps (1 large step ≈ 0.75 m)."
                                />

                                {attempted && (
                                    <FieldError
                                        message={errors?.roof_length}
                                    />
                                )}
                            </div>

                            <div className="min-w-0">
                                <InputField
                                    label="Roof width (metres)"
                                    name="roof_width"
                                    type="number"
                                    min="0"
                                    icon={Ruler}
                                    required
                                    placeholder="e.g. 9.5"
                                    value={formData.roof_width ?? ""}
                                    onChange={handleChange}
                                    helperText="Measure the width of the roof from one side to the other, including the overhang. If estimating, count your steps (1 large step ≈ 0.75 m)."
                                />

                                {attempted && (
                                    <FieldError
                                        message={errors?.roof_width}
                                    />
                                )}
                            </div>

                            <div className="min-w-0 sm:col-span-2">
                                <AreaDisplay
                                    label="Roof area"
                                    length={formData.roof_length}
                                    width={formData.roof_width}
                                />
                            </div>
                        </div>
                    </div>
                </SectionCard>
            </section>

            {/* Roof type and material */}
            <section className="min-w-0">
                <SectionCard
                    icon={Mountain}
                    title="Roof type and material"
                    description="Select the roof construction and material currently installed."
                    required
                >
                    <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5">

                        <div className="min-w-0">
                            <InputField
                                label="Roof type"
                                name="roof_type"
                                type="select"
                                icon={Home}
                                required
                                placeholder="Select roof type"
                                options={ROOF_TYPES}
                                value={formData.roof_type ?? ""}
                                onChange={handleChange}
                                helperText="Select the shape or design of your roof."
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.roof_type}
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            <InputField
                                label="Roof material"
                                name="roof_material"
                                type="select"
                                options={mabatiMaterials}
                                icon={Layers}
                                required
                                placeholder="Select An Option"
                                value={formData.roof_material ?? ""}
                                onChange={handleChange}
                                helperText="Select the material your roof is made of, such as mabati or tiles."                                />

                            {attempted && (
                                <FieldError
                                    message={errors?.roof_material}
                                />
                            )}
                        </div>
                    </div>
                </SectionCard>
            </section>

            {/* Orientation and shading */}
            <section className="min-w-0">
                <SectionCard
                    icon={Compass}
                    title="Sunlight and roof orientation"
                    description="Help us understand the direction your roof faces and the shade it receives."
                    required
                >
                    <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5">

                        <div className="min-w-0">
                            <InputField
                                label="Roof orientation"
                                name="roof_orientation"
                                type="select"
                                icon={Compass}
                                required
                                placeholder="Select orientation"
                                options={ROOF_ORIENTATIONS}
                                value={formData.roof_orientation ?? ""}
                                onChange={handleChange}
                            />
                            {attempted && (
                                <FieldError
                                    message={errors?.roof_orientation}
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            <InputField
                                label="Shading level"
                                name="shading_level"
                                type="select"
                                icon={Sun}
                                required
                                placeholder="Select shading level"
                                options={SHADING_LEVELS}
                                value={formData.shading_level ?? ""}
                                onChange={handleChange}
                                helperText="How much shade covers your roof from trees or buildings."
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.shading_level}
                                />
                            )}
                        </div>
                    </div>
                </SectionCard>
            </section>

            {/* Measurement method */}
            <section className="min-w-0">
                <SectionCard
                    icon={Ruler}
                    title="Measurement method"
                    description="Tell us how you obtained these measurements."
                    required
                >
                    <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5">

                        <div className="min-w-0 sm:col-span-2">
                            <InputField
                                label="Measurement method"
                                name="measurement_method"
                                type="select"
                                icon={Ruler}
                                required
                                placeholder="Select measurement method"
                                options={MEASUREMENT_METHODS}
                                value={formData.measurement_method ?? ""}
                                onChange={handleChange}
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.measurement_method}
                                />
                            )}
                        </div>
                    </div>
                </SectionCard>
            </section>

      

        </div>
    );
}