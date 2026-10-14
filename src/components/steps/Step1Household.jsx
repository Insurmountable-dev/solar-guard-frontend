import { Home, Tag, Hammer, Building2, Layers, DoorOpen, Users, Map, MapPin, Compass, Zap, Sun, Minus, Plus, AlertCircle, CheckCircle2,} from "lucide-react";

import InputField from "../common/inputField";
import ToggleCard from "./ToggleCard";
import SectionCard from "./SectionCard";
import CountStepper from "./CountStepper";
import FieldError from "./FieldError";

import { BUILDING_TYPES, HOUSE_TYPES } from "../../data/householdsData";
import { KENYA_COUNTIES } from "../../data/kenyaCounties";

/* ---------- Main component ---------- */

export default function Step1Household({
  attempted = false,
  errorCount,
  requiredFields,
  filledFields,
  percent,
  householdErrors = {},
  householdFormData = {},
  handleChange,
  isSaving = false,
}) {

  return (

    <div className="mx-auto w-full min-w-0 max-w-3xl">

      {attempted && errorCount > 0 && (

        <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800" >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {errorCount === 1 ? "1 detail needs" : `${errorCount} details need`}{" "}
            your attention before you can continue. They are marked below.
          </p>
        </div>

      )}

      <div className="min-w-0">

        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"> Tell us about your home</h2>
        <p className="mt-2 max-w-xl text-sm text-slate-500">
          A few details about the building and where it is let us size your
          solar system accurately. It takes about two minutes.
        </p>

      </div>

        <div 
            className="sticky top-[5rem] z-40 -mx-5 mt-5 mb-10 min-w-0 bg-white/95 px-5 py-3 shadow-sm backdrop-blur-sm sm:top-[5.5rem] sm:mx-0 sm:rounded-xl sm:border sm:border-slate-200 sm:bg-white/90 sm:px-5 sm:py-3.5"
            role="status"
            aria-live="polite"
        >

        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-600">
            <span>{filledFields} of {requiredFields} required details filled</span>
            <span>{percent.toFixed(2)}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
            className={`h-full rounded-full ${percent < 50 ? "bg-red-600": percent > 85 ? "bg-orange-300": "bg-emerald-600"} transition-all duration-500`}
            style={{ width: `${percent}%` }}
            />
        </div>

        </div>

      {/* Form sections */}
      <div className="min-w-0 space-y-6">

        {/* About the home */}
        <SectionCard
          icon={Home}
          title="About the home"
          description="The basics of the building."
          required
          // complete={homeDone}
        >
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">

            <div className="min-w-0 sm:col-span-2">
              <InputField
                label="Household name"
                name="household_name"
                icon={Tag}
                required
                placeholder="e.g. Main family home"
                value={householdFormData.household_name ?? ""}
                onChange={handleChange}
                helperText="A nickname so you can find this assessment later"
              />

              <FieldError message={householdErrors?.household_name} />
            </div>

            <div className="min-w-0">
              <InputField
                label="House type"
                name="house_type"
                type="select"
                icon={Hammer}
                placeholder="Select material"
                options={HOUSE_TYPES}
                value={householdFormData?.house_type ?? ""}
                required
                onChange={handleChange}
              />

              <FieldError message={householdErrors?.house_type} />
            </div>

            <div className="min-w-0">
              <InputField
                label="Building type"
                name="building_type"
                type="select"
                icon={Building2}
                placeholder="Select building"
                options={BUILDING_TYPES}
                value={householdFormData?.building_type ?? ""}
                required
                onChange={handleChange}
              />

              <FieldError message={householdErrors?.building_type} />
            </div>
          </div>

          <div className="mt-6 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-3">
            <CountStepper
              name="number_of_floors"
              label="Floors"
              icon={Layers}
              value={householdFormData?.number_of_floors}
              onChange={handleChange}
              error={householdErrors?.number_of_floors}
            />

            <CountStepper
              name="number_of_rooms"
              label="Rooms"
              icon={DoorOpen}
              value={householdFormData?.number_of_rooms}
              onChange={handleChange}
              error={householdErrors?.number_of_rooms}
            />

            <CountStepper
              name="number_of_occupants"
              label="Residents"
              icon={Users}
              hint="People who live here regularly"
              value={householdFormData?.number_of_occupants}
              onChange={handleChange}
              error={householdErrors?.number_of_occupants}
            />
          </div>
        </SectionCard>

        {/* Location */}
        <SectionCard
          icon={MapPin}
          title="Where it is"
          description="Your location tells us how much sunlight your roof gets."
          required
          // complete={locationDone}
        >
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">

            <div className="min-w-0">
              <InputField
                label="County"
                name="county"
                type="select"
                required
                icon={Map}
                placeholder="Select county"
                options={KENYA_COUNTIES}
                value={householdFormData?.county ?? ""}
                onChange={handleChange}
              />

              <FieldError message={householdErrors?.county} />
            </div>

            <div className="min-w-0">
              <InputField
                label="Town"
                name="town"
                required
                icon={MapPin}
                placeholder="e.g. Nakuru"
                value={householdFormData?.town ?? ""}
                onChange={handleChange}
              />

              <FieldError message={householdErrors?.town} />
            </div>

            <div className="min-w-0 sm:col-span-2">
              <InputField
                label="Area / Estate"
                name="area"
                icon={Compass}
                placeholder="e.g. Milimani"
                value={householdFormData?.area ?? ""}
                onChange={handleChange}
                helperText="Optional"
              />
            </div>
          </div>
        </SectionCard>

        {/* Power setup */}
        <SectionCard
          icon={Zap}
          title="Current power setup"
          description="Switch on anything that is already at the property. Leave both off if you have neither."
        >
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="min-w-0">
              <ToggleCard
                name="has_grid_connection"
                checked={!!householdFormData?.has_grid_connection}
                onChange={handleChange}
                icon={Zap}
                title="Grid connection"
                description="Connected to the main power grid"
              />

              <FieldError message={householdErrors?.has_grid_connection} />
            </div>

            <div className="min-w-0">
              <ToggleCard
                name="has_existing_solar"
                checked={!!householdFormData?.has_existing_solar}
                onChange={handleChange}
                icon={Sun}
                title="Existing solar"
                description="A solar system is already installed"
              />

              <FieldError message={householdErrors?.has_existing_solar} />
            </div>
          </div>
        </SectionCard>
      </div>

        {attempted && errorCount > 0 && (

        <div role="alert" className="mb-6 mt-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800" >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {errorCount === 1 ? "1 detail needs" : `${errorCount} details need`}{" "}
            your attention before you can continue. They are marked above.
          </p>
        </div>
        
      )}

    </div>

  );
}