import {useState, useEffect} from "react";
import { Zap, Clock, CalendarDays, Hash, Plus, ChevronLeft, FileBracesCorner, PlusCircle, Pencil, Info, Factory, Languages } from "lucide-react";
import useAddAppliances from "../../../contexts/ApplianceProvider";
import { getAppliancesCategories} from "../../../services/pages/appliancesService";
import SuccessModal from "../../common/SuccessModal";
import ToggleCard from "./ToggleCard";
import FieldError from "./FieldError";
import Button from "../../common/Button";
import InputField from "../../common/InputField";
import SectionCard from "./SectionCard";
import ConfirmDialog from "../../common/ConfirmDialog";
import QuickAddApplianceDetailsCard from "./QuickAddApplianceDetailsCard";
import useNavigation from "../../../contexts/NavigationProvider";

export default function ApplianceDetailsCard({ setIsAddingAppliances }) {


    const[applianceCategories, setApplianceCategories] = useState([]);


    const { isQuickAddingAppliance, setIsQuickAddingAppliance, isSearchingAddingAppliance, setIsSearchingAddingAppliance, setIsSearching } = useNavigation();


    const days = [1, 2, 3, 4, 5, 6, 7];


    const {

        setAttempted,
        appliancesFormData: formData,
        appliancesErrors: errors,
        handleAppliancesChange: handleChange,
        validateUserApplianceDetails,
        showModal,
        isLoading,
        setShowModal,
        setShowSuccess,
        showSuccess,
        handleAddApplianceConfirmModal,
        handleEditingApplianceConfirmModal,
        isEditingAppliance,
        setIsEditingAppliance,
        setAppliancesFormData,
        initialAppliancesFormData,

    } = useAddAppliances();


        // Load Category Data
        useEffect(() => {
    
            async function loadCategories () {
    
                try {
    
                    const data = await getAppliancesCategories();
                    setApplianceCategories(data.allCategories);
    
                } catch (error) {
                    console.error("Error Fetching Categories", error);
                }
    
            }
    
            loadCategories();
    
        }, []);


    const estimatedDailyEnergy = (Number(formData?.power_rating_watts) * Number(formData.hours_per_day)) / 1000;



    if (showModal) {

        return (
            <ConfirmDialog
                title={isEditingAppliance ? "Edit Appliance ?" : "Add Appliance ?"}
                message={isEditingAppliance ? "Are you sure you want to save the changes to this appliance?" : "Are you sure you want to add this appliance to your household assessment?"}
                confirmLabel={isEditingAppliance ? "Edit Appliance" : "Add Appliance"}
                cancelLabel="Cancel"
                icon={isEditingAppliance ? Pencil : PlusCircle}
                isOpen={showModal}
                onConfirm={isEditingAppliance ? handleEditingApplianceConfirmModal : handleAddApplianceConfirmModal}
                onCancel={() => setShowModal(false)}
                isLoading={isLoading}
                variant={"primary"}
            />
        );
    };


    if (showSuccess) {

        return (
            <SuccessModal
                open={showSuccess}
                title={isEditingAppliance ? "Appliance Edited" : "Appliance added"}
                message={`Your appliance has been ${isEditingAppliance ? "edited" : "added"}. We'll use it to size your solar system.`}
                buttonLabel="Continue"
                onClose={() => {

                    setShowSuccess(false);

                    if (isEditingAppliance) {
                        setIsEditingAppliance(false);
                    };

                    if (isQuickAddingAppliance) {
                        setIsQuickAddingAppliance(false);
                    };

                    if(isSearchingAddingAppliance) {
                        setIsSearchingAddingAppliance(false);
                        setIsSearching(false);
                    };

                }}

                autoCloseMs={2000}
            />
        )

    }

    return (

        <SectionCard

            title="Appliance Details"
            description="Enter the appliance specifications and how often you use it."
            required
            action={
                <Button
                    type="button"
                    aria-label="Go back"
                    variant="outline"
                    onClick={() => {

                        if (isQuickAddingAppliance) {
                            setIsQuickAddingAppliance(false);
                            setAppliancesFormData(initialAppliancesFormData);
                            setAttempted(false);
                            return;
                        };

                        if (isEditingAppliance) {
                            setIsEditingAppliance(false);
                            setAppliancesFormData(initialAppliancesFormData);
                            setAttempted(false);
                            return;
                        };

                        if(isSearchingAddingAppliance) {
                            setIsSearchingAddingAppliance(false);
                            setIsSearching(true);
                            setAppliancesFormData(initialAppliancesFormData);
                            setAttempted(false);
                            return;
                        }

                        setIsAddingAppliances(false);
                    }}
                    classname="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-200 bg-white text-emerald-700 shadow-[0_8px_20px_-8px_rgba(16,185,129,0.6)] transition-all duration-200 hover:-translate-x-0.5 hover:border-emerald-400 hover:bg-emerald-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 active:scale-90 active:border-emerald-500 active:bg-gradient-to-br active:from-emerald-400 active:to-teal-500 active:text-white sm:h-11 sm:w-11"
                >
                    <ChevronLeft
                        size={22}
                        strokeWidth={2.75}
                        className="transition-transform duration-200 group-hover:-translate-x-0.5 group-active:-translate-x-1"
                    />
                </Button>
            }

        >

            <div className="flex flex-col gap-6 sm:gap-8">

                <QuickAddApplianceDetailsCard />

                <div className="flex flex-col gap-5 sm:gap-6">

                    {/* ───────── Fields panel ───────── */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-emerald-50/30 to-white p-4 shadow-sm sm:p-6">

                        {/* decorative top accent line */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
                        />

                        {/* decorative glow */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl"
                        />

                        {/* decorative left rail */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-emerald-400 via-teal-400 to-transparent"
                        />

                        <div className="relative grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7">

                            <div className="flex min-w-0 flex-col gap-1.5">
                                <InputField
                                    label="Appliance Name"
                                    name="appliance_name"
                                    type="text"
                                    value={formData?.appliance_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Refrigerator"
                                    icon={Zap}
                                />
                                <FieldError message={errors?.appliance_name} />
                            </div>

                            <div className="flex min-w-0 flex-col gap-1.5">
                                <InputField
                                    label="Select A Category"
                                    name="appliance_category"
                                    type="select"
                                    value={formData?.appliance_category}
                                    onChange={handleChange}
                                    options={applianceCategories}
                                    placeholder="Select a category"
                                />
                                <FieldError message={errors?.appliance_category} />
                            </div>

                            <div className="flex min-w-0 flex-col gap-1.5">
                                <InputField
                                    label="Power Rating (Watts)"
                                    name="power_rating_watts"
                                    type="number"
                                    value={formData?.power_rating_watts}
                                    onChange={handleChange}
                                    min={0}
                                    placeholder="e.g. 150"
                                    icon={Zap}
                                />
                                <FieldError message={errors?.power_rating_watts} />
                            </div>

                            <div className="flex min-w-0 flex-col gap-1.5">
                                <InputField
                                    label="Quantity"
                                    name="quantity"
                                    type="number"
                                    value={formData?.quantity}
                                    onChange={handleChange}
                                    min={1}
                                    placeholder="e.g. 2"
                                    icon={Hash}
                                />
                                <FieldError message={errors?.quantity} />
                            </div>

                            <div className="flex min-w-0 flex-col gap-1.5">
                                <InputField
                                    label="Hours Used Per Day"
                                    name="hours_per_day"
                                    type="number"
                                    value={formData?.hours_per_day}
                                    onChange={handleChange}
                                    min={0}
                                    max={24}
                                    placeholder="e.g. 8"
                                    icon={Clock}
                                />
                                <FieldError message={errors?.hours_per_day} />
                            </div>

                            <div className="flex min-w-0 flex-col gap-1.5">
                                <InputField
                                    label="Days Used Per Week"
                                    name="days_per_week"
                                    type="select"
                                    value={formData?.days_per_week}
                                    onChange={handleChange}
                                    options={days}
                                    placeholder="Select days"
                                    icon={CalendarDays}
                                />
                                <FieldError message={errors?.days_per_week} />
                            </div>

                        </div>

                    </div>

                    {/* ───────── Essential toggle panel ───────── */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:shadow-[0_12px_28px_-16px_rgba(16,185,129,0.55)] sm:p-4">

                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500"
                        />

                        <div className="relative flex min-w-0 flex-col gap-1.5 pl-2">
                            <ToggleCard
                                name="is_essential"
                                value={formData?.is_essential}
                                onChange={handleChange}
                                checked={formData?.is_essential}
                                icon={Zap}
                                title="Essential Appliance"
                                description="Is this appliance essential for your household?"
                            />
                            <FieldError message={errors?.is_essential} />
                        </div>

                    </div>

                    {/* ───────── Energy readout panel ───────── */}
                    <div className="relative flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 p-5 text-white shadow-[0_20px_40px_-20px_rgba(16,185,129,0.8)] sm:gap-5 sm:p-7">

                        {/* decorative grid */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px]"
                        />

                        {/* decorative glows */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-emerald-300/30 blur-3xl"
                        />
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-teal-300/20 blur-3xl"
                        />

                        {/* decorative corner ticks */}
                        <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 border-l-2 border-t-2 border-white/40" />
                        <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r-2 border-t-2 border-white/40" />
                        <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b-2 border-l-2 border-white/40" />
                        <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-2.5 w-2.5 border-b-2 border-r-2 border-white/40" />

                        {/* icon badge with ring */}
                        <div aria-hidden="true" className="relative flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                            <span className="absolute inset-0 rounded-2xl bg-white/20 motion-safe:animate-ping [animation-duration:2.5s]" />
                            <span className="relative flex h-full w-full items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] ring-4 ring-white/25">
                                <Zap size={26} strokeWidth={2.5} />
                            </span>
                        </div>

                        <div className="relative flex min-w-0 flex-col gap-1.5">

                            <p className="truncate font-mono text-3xl font-black leading-none tracking-tight tabular-nums sm:text-4xl">
                                {Number.isFinite(estimatedDailyEnergy) ? `${estimatedDailyEnergy.toFixed(2)} kWh/day` : "N/A"}
                            </p>

                            <p className="text-xs text-emerald-100/90 sm:text-sm">Calculated from power rating and usage.</p>

                        </div>

                        {/* live dot */}
                        <span aria-hidden="true" className="absolute right-5 top-5 flex h-2 w-2 sm:right-6 sm:top-6">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                        </span>

                    </div>

                    {/* ───────── Footer ───────── */}
                    <div className="relative flex justify-end pt-6">

                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                        />

                        <Button
                            type="button"
                            icon={Plus}
                            onClick={validateUserApplianceDetails}
                            className="w-full shadow-[0_14px_28px_-12px_rgba(16,185,129,0.75)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto"
                        >
                            {isEditingAppliance ? "Edit Appliance" : "Add Appliance"}
                        </Button>

                    </div>

                </div>

            </div>

        </SectionCard>

    );
};
