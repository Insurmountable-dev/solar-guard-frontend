import { AlertTriangle, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import ApplianceIcon from "./ApplianceIcon"
import useAddAppliances from "../../../contexts/ApplianceProvider";
import { searchApplianceReference } from "../../../services/pages/appliancesService";
import EmptyState from "../../common/EmptyState"
import Sleep from "../../../utils/Sleep";
import useNavigation from "../../../contexts/NavigationProvider";


const searchTerm = "Refrigerator, Television, Air Conditioner, Washing Machine, Microwave, Fan, Lighting";

export default function AppliancePresetCard() {


    const [quickAppliances, setQuickAppliances] = useState([]);
    const { setIsAddingAppliances, setAppliancesFormData, setAttempted, setAdd } = useAddAppliances();
    const { setApplianceReferences, setSelectedQuickApplianceToAdd, setIsQuickAddingAppliance } = useNavigation([]);




    // Fetch Common Appliances Data From Appliances Reference

    useEffect(() => {

        async function fetchCommonAppliances() {

            try {

                const data = await searchApplianceReference(searchTerm);

                setQuickAppliances(data.references)
                setApplianceReferences(data.applianceReferences);

            } catch (error) {

                console.error("Error Fetching Common Appliances", error);

            }

        };


        fetchCommonAppliances();

    }, []);

    if ((quickAppliances.length <= 0 ?? !quickAppliances)) {

        return (

            <EmptyState
                icon={AlertTriangle}
                title="No Common Appliances Available"
                description="Unable to display common appliances at the moment. Please refresh again shortly....."
                variant="danger"
            />

        )
    }

    return (

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">

            {quickAppliances.map((ap, i) => {

                return (
                    <button
                        key={i}
                        type="button"
                        className="group relative isolate flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white px-3 pb-5 pt-9 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_18px_36px_-16px_rgba(16,185,129,0.55)] focus:border-emerald-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 active:scale-[0.97] active:border-emerald-500 sm:px-4 sm:pb-6"
                        onClick={async () => {


                            setAttempted(false);
                            setAppliancesFormData(ap);
                            setSelectedQuickApplianceToAdd(i);

                            setAdd(true);
                            await Sleep(1200);
                            setIsQuickAddingAppliance(true);

                            setAdd(false);

                        }}
                    >

                        {/* hover wash */}
                        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100" />

                        {/* top accent line */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
                        />

                        {/* soft glow behind the icon */}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1/2 top-6 -z-10 h-24 w-24 -translate-x-1/2 rounded-full bg-emerald-200/0 blur-2xl transition-colors duration-300 group-hover:bg-emerald-200/60 group-focus:bg-emerald-200/60"
                        />

                        {/* index readout */}
                        <span
                            aria-hidden="true"
                            className="absolute left-3 top-3 font-mono text-[10px] font-bold tracking-widest text-slate-300 transition-colors duration-300 group-hover:text-emerald-500 group-focus:text-emerald-500"
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* add indicator */}
                        <span
                            aria-hidden="true"
                            className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all duration-300 group-hover:rotate-90 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_6px_14px_-4px_rgba(16,185,129,0.8)] group-focus:rotate-90 group-focus:bg-emerald-500 group-focus:text-white"
                        >
                            <Plus size={14} strokeWidth={3} />
                        </span>

                        {/* icon badge with outer ring */}
                        <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center">

                            <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-full border border-dashed border-emerald-200 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 group-hover:border-emerald-400 group-focus:rotate-90 group-focus:scale-110"
                            />

                            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-teal-500 group-hover:text-white group-hover:ring-emerald-300 group-focus:bg-gradient-to-br group-focus:from-emerald-400 group-focus:to-teal-500 group-focus:text-white group-focus:ring-emerald-300">
                                <ApplianceIcon
                                    name={ap.appliance_name}
                                />
                            </span>

                        </span>

                        {/* name */}
                        <span className="w-full truncate text-sm font-bold tracking-tight text-slate-700 transition-colors duration-300 group-hover:text-emerald-700 group-focus:text-emerald-700">
                            {ap.appliance_name}
                        </span>

                        {/* baseline that fills on hover */}
                        <span
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-400 to-teal-500 transition-transform duration-500 group-hover:scale-x-100 group-focus:scale-x-100 group-active:scale-x-100"
                        />

                    </button>

                )
            })}


        </div>

    );
}