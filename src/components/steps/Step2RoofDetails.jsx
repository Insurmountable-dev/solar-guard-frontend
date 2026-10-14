import {
  Ruler,
  Home,
  Layers,
  Mountain,
  Compass,
  Sun,
  Ruler as MeasurementIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import InputField from "../common/inputField";
import SectionCard from "./SectionCard";
import FieldError from "./FieldError";

import {
  ROOF_TYPES,
  ROOF_ORIENTATIONS,
  SHADING_LEVELS,
} from "../../data/roofOptions";

/* ---------- Main component ---------- */

export default function Step2RoofDetails({
  attempted = false,
  errorCount = 0,
  requiredFields = 0,
  filledFields = 0,
  percent = 0,
  roofErrors = {},
  roofFormData = {},
  handleChange,
}) {
  const roofTypeOptions = ROOF_TYPES.map((type) => ({
    value: type,
    label: type,
  }));

  const orientationOptions = ROOF_ORIENTATIONS.map((orientation) => ({
    value: orientation.value,
    label: orientation.title,
  }));

  const shadingOptions = SHADING_LEVELS.map((level) => ({
    value: level.value,
    label: level.title,
  }));

  return (
    <div className="mx-auto w-full min-w-0 max-w-3xl">
      {attempted && errorCount > 0 && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {errorCount === 1
              ? "1 detail needs"
              : `${errorCount} details need`}{" "}
            your attention before you can continue. They are marked below.
          </p>
        </div>
      )}

      {/* Heading */}
      <div className="min-w-0">
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Tell us about your roof
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
          Describe your roof, its dimensions, orientation, and how much sunlight
          it receives. These details help us estimate the space available for
          your solar panels.
        </p>
      </div>

      {/* Step progress */}
      <div
        className="sticky top-[5rem] z-40 -mx-5 mb-10 mt-5 min-w-0 bg-white/95 px-5 py-3 shadow-sm backdrop-blur-sm sm:top-[5.5rem] sm:mx-0 sm:rounded-xl sm:border sm:border-slate-200 sm:bg-white/90 sm:px-5 sm:py-3.5"
        role="status"
        aria-live="polite"
      >
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-600">
          <span>
            {filledFields} of {requiredFields} required details filled
          </span>
          <span>{Number(percent || 0).toFixed(0)}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percent < 50
                ? "bg-red-600"
                : percent > 85
                  ? "bg-orange-300"
                  : "bg-emerald-600"
            }`}
            style={{
              width: `${Math.min(100, Math.max(0, Number(percent) || 0))}%`,
            }}
          />
        </div>
      </div>

      <div className="min-w-0 space-y-6">
        {/* Roof dimensions */}
        <SectionCard
          icon={Ruler}
          title="Roof measurements"
          description="Enter the approximate dimensions of your house and roof."
          required
        >
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="min-w-0">
              <InputField
                label="House length (metres)"
                name="house_length"
                type="number"
                icon={Ruler}
                required
                placeholder="e.g. 12"
                value={roofFormData.house_length ?? ""}
                onChange={handleChange}
                helperText="Length of the house footprint."
              />
              <FieldError message={roofErrors.house_length} />
            </div>

            <div className="min-w-0">
              <InputField
                label="House width (metres)"
                name="house_width"
                type="number"
                icon={Ruler}
                required
                placeholder="e.g. 8"
                value={roofFormData.house_width ?? ""}
                onChange={handleChange}
                helperText="Width of the house footprint."
              />
              <FieldError message={roofErrors.house_width} />
            </div>

            <div className="min-w-0 sm:col-span-2">
              <InputField
                label="Floor area (m²)"
                name="floor_area"
                type="number"
                icon={Home}
                placeholder="Calculated or measured floor area"
                value={roofFormData.floor_area ?? ""}
                onChange={handleChange}
                helperText="Optional if your system calculates this from length × width."
              />
              <FieldError message={roofErrors.floor_area} />
            </div>

            <div className="min-w-0">
              <InputField
                label="Roof length (metres)"
                name="roof_length"
                type="number"
                icon={Ruler}
                required
                placeholder="e.g. 14"
                value={roofFormData.roof_length ?? ""}
                onChange={handleChange}
              />
              <FieldError message={roofErrors.roof_length} />
            </div>

            <div className="min-w-0">
              <InputField
                label="Roof width (metres)"
                name="roof_width"
                type="number"
                icon={Ruler}
                required
                placeholder="e.g. 10"
                value={roofFormData.roof_width ?? ""}
                onChange={handleChange}
              />
              <FieldError message={roofErrors.roof_width} />
            </div>

            <div className="min-w-0 sm:col-span-2">
              <InputField
                label="Roof area (m²)"
                name="roof_area"
                type="number"
                icon={Layers}
                placeholder="Calculated or measured roof area"
                value={roofFormData.roof_area ?? ""}
                onChange={handleChange}
                helperText="Optional if your system calculates this from roof length × width."
              />
              <FieldError message={roofErrors.roof_area} />
            </div>
          </div>
        </SectionCard>

        {/* Roof type and material */}
        <SectionCard
          icon={Mountain}
          title="Roof type and material"
          description="Select the roof construction and material currently installed."
          required
        >
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="min-w-0 sm:col-span-2">
              <InputField
                label="Roof type"
                name="roof_type"
                type="select"
                icon={Home}
                required
                placeholder="Select roof type"
                options={roofTypeOptions}
                value={roofFormData.roof_type ?? ""}
                onChange={handleChange}
              />
              <FieldError message={roofErrors.roof_type} />
            </div>

            <div className="min-w-0 sm:col-span-2">
              <InputField
                label="Roof material"
                name="roof_material"
                icon={Layers}
                required
                placeholder="e.g. Mabati, concrete, clay tiles"
                value={roofFormData.roof_material ?? ""}
                onChange={handleChange}
                helperText="Enter the actual material, if known."
              />
              <FieldError message={roofErrors.roof_material} />
            </div>
          </div>
        </SectionCard>

        {/* Orientation and shading */}
        <SectionCard
          icon={Compass}
          title="Sunlight and roof orientation"
          description="Help us understand the direction your roof faces and the shade it receives."
          required
        >
          <div className="grid min-w-0 grid-cols-1 gap-5">
            <div className="min-w-0">
              <InputField
                label="Roof orientation"
                name="roof_orientation"
                type="select"
                icon={Compass}
                required
                placeholder="Select orientation"
                options={orientationOptions}
                value={roofFormData.roof_orientation ?? ""}
                onChange={handleChange}
              />
              <FieldError message={roofErrors.roof_orientation} />
            </div>

            <div className="min-w-0">
              <InputField
                label="Shading level"
                name="shading_level"
                type="select"
                icon={Sun}
                required
                placeholder="Select shading level"
                options={shadingOptions}
                value={roofFormData.shading_level ?? ""}
                onChange={handleChange}
              />
              <FieldError message={roofErrors.shading_level} />
            </div>
          </div>
        </SectionCard>

        {/* Measurement method */}
        <SectionCard
          icon={MeasurementIcon}
          title="Measurement method"
          description="Tell us how you obtained these measurements."
        >
          <div className="min-w-0">
            <InputField
              label="Measurement method"
              name="measurement_method"
              type="select"
              icon={Ruler}
              required
              placeholder="Select measurement method"
              options={[
                { value: "manual", label: "Manual measurement" },
                { value: "estimated", label: "Estimated dimensions" },
                { value: "satellite", label: "Satellite / map estimate" },
                { value: "professional", label: "Professional assessment" },
              ]}
              value={roofFormData.measurement_method ?? ""}
              onChange={handleChange}
            />
            <FieldError message={roofErrors.measurement_method} />
          </div>
        </SectionCard>
      </div>

      {attempted && errorCount > 0 && (
        <div
          role="alert"
          className="mb-6 mt-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Please review the highlighted fields above before continuing.
          </p>
        </div>
      )}
    </div>
  );
}