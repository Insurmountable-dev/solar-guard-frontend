import { Home, Tag, Hammer, Building2, Layers, DoorOpen, Users, Map, MapPin, Compass, Zap, Sun,} from "lucide-react";
import InputField from "../common/InputField";
import StepsHeader from "./steps-components/StepsHeader";
import ToggleCard from "./steps-components/ToggleCard";
import SectionCard from "./steps-components/SectionCard";
import CountStepper from "./steps-components/CountStepper";
import FieldError from "./steps-components/FieldError";
import {BUILDING_TYPES,HOUSE_TYPES,} from "../../data/householdsData";
import { KENYA_COUNTIES } from "../../data/kenyaCounties";


export default function Step1Household({ attempted = false, errors = {}, formData = {}, handleChange,}) {

 
    return (

        <div className="mx-auto w-full min-w-0 max-w-5xl space-y-5 sm:space-y-6">

            {/* Step introduction */}
            <div className="min-w-0">
                <StepsHeader
                    title="Tell us about your home"
                    description="Share a few details about your building, location and existing power supply so we can size a suitable solar system."
                />
            </div>

            {/* About the home */}
            <section className="min-w-0">
                <SectionCard
                    icon={Home}
                    title="About the home"
                    description="Start with the basic details of your household."
                    required
                >
                    <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5">

                        <div className="min-w-0 sm:col-span-2">
                            <InputField
                                label="Household name"
                                name="household_name"
                                icon={Tag}
                                required
                                placeholder="e.g. Main family home"
                                value={formData.household_name ?? ""}
                                onChange={handleChange}
                                helperText="Use a name that helps you identify this household later."
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.household_name}
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            <InputField
                                label="House type"
                                name="house_type"
                                type="select"
                                icon={Hammer}
                                placeholder="Select material"
                                options={HOUSE_TYPES}
                                value={formData.house_type ?? ""}
                                required
                                onChange={handleChange}
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.house_type}
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            <InputField
                                label="Building type"
                                name="building_type"
                                type="select"
                                icon={Building2}
                                placeholder="Select building type"
                                options={BUILDING_TYPES}
                                value={formData.building_type ?? ""}
                                required
                                onChange={handleChange}
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.building_type}
                                />
                            )}
                        </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-5">
                        <p className="mb-4 text-sm font-semibold text-slate-800">
                            Household size
                        </p>

                        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">

                            <div className="min-w-0">
                                <CountStepper
                                    name="number_of_floors"
                                    label="Floors"
                                    icon={Layers}
                                    value={formData.number_of_floors ?? 1}
                                    onChange={handleChange}
                                    error={attempted ? errors?.number_of_floors : undefined}
                                />
                            </div>

                            <div className="min-w-0">
                                <CountStepper
                                    name="number_of_rooms"
                                    label="Rooms"
                                    icon={DoorOpen}
                                    value={formData.number_of_rooms ?? 1}
                                    onChange={handleChange}
                                    error={attempted ? errors?.number_of_rooms : undefined}
                                />
                            </div>

                            <div className="min-w-0">
                                <CountStepper
                                    name="number_of_occupants"
                                    label="Residents"
                                    icon={Users}
                                    hint="People living here regularly"
                                    value={formData.number_of_occupants ?? 1}
                                    onChange={handleChange}
                                    error={attempted ? errors?.number_of_occupants : undefined}
                                />
                            </div>
                        </div>
                    </div>
                </SectionCard>
            </section>

            {/* Location */}
            <section className="min-w-0">
                <SectionCard
                    icon={MapPin}
                    title="Where is your home?"
                    description="Tell us where the property is located in Kenya."
                    required
                >
                    <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5">

                        <div className="min-w-0">
                            <InputField
                                label="County"
                                name="county"
                                type="select"
                                required
                                icon={Map}
                                placeholder="Select county"
                                options={KENYA_COUNTIES}
                                value={formData.county ?? ""}
                                onChange={handleChange}
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.county}
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            <InputField
                                label="Town or city"
                                name="town"
                                required
                                icon={MapPin}
                                placeholder="e.g. Nakuru"
                                value={formData.town ?? ""}
                                onChange={handleChange}
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.town}
                                />
                            )}
                        </div>

                        <div className="min-w-0 sm:col-span-2">
                            <InputField
                                label="Area, estate or village"
                                name="area"
                                icon={Compass}
                                placeholder="e.g. Milimani"
                                value={formData.area ?? ""}
                                onChange={handleChange}
                                helperText="Optional"
                            />
                        </div>
                    </div>
                </SectionCard>
            </section>

            {/* Current power setup */}
            <section className="min-w-0">
                <SectionCard
                    icon={Zap}
                    title="Current power setup"
                    description="Select the electricity and solar services your home currently has."
                >
                    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

                        <div className="min-w-0">
                            <ToggleCard
                                name="has_grid_connection"
                                checked={Boolean(formData.has_grid_connection)}
                                onChange={handleChange}
                                icon={Zap}
                                title="Grid connection"
                                description="Connected to mains electricity"
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.has_grid_connection}
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            <ToggleCard
                                name="has_existing_solar"
                                checked={Boolean(formData.has_existing_solar)}
                                onChange={handleChange}
                                icon={Sun}
                                title="Existing solar"
                                description="A solar system is already installed"
                            />

                            {attempted && (
                                <FieldError
                                    message={errors?.has_existing_solar}
                                />
                            )}
                        </div>
                    </div>
                </SectionCard>
            </section>

        </div>
        
    );
}
