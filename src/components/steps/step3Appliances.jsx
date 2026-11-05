import { useEffect} from "react";
import { Plus, Info} from "lucide-react";
import { fetchDraft } from "../../services/pages/draftService";
import ApplianceSearchBanner from "./steps-components/ApplianceSearchBanner";
import AppliancePresetCard from "./steps-components/AppliancePresetCard";
import { AddedAppliancesCard, AddedApplianceChip } from "./steps-components/AddedAppliancesCard";
import StepsHeader from "./steps-components/StepsHeader";
import SectionCard from "./steps-components/SectionCard";
import LoadingSpinner from "../common/LoadingSpinner";
import Sleep from "../../utils/Sleep";
import useAddAppliances from "../../contexts/ApplianceProvider";
import ConfirmDialog from "../common/ConfirmDialog";
import SuccessModal from "../common/SuccessModal";

export default function Step3Appliances({setIsSearching, setIsAddingAppliances, setApplianceReferences}) {
    

    const { 

        add,
        setAdd,
        setAppliancesFormData,
        setAttempted,
        allAppliances, 
        setAllAppliances,
        deleteAppliance,
        isDeletingAppliance,
        setApplianceToDelete,
        confirmDelete,
        setConfirmDelete,
        applianceIsDeleted,
        setApplianceIsDeleted,
        setIsEditingAppliance,
        setSelectedApplianceToEdit,
    
    } = useAddAppliances();

    // Load All Appliances Data
    useEffect(() => {


        async function loadAllAppliances () {

            try{

                const data = await fetchDraft();


                setAllAppliances(data?.draft?.appliances_data ?? []);

            }catch(error) {

                    console.error("Unable To Fetch Draft Data ",error.message);

            }finally{

            }
        }

        loadAllAppliances();


    },[]);


    if(add) {

        return (
            <LoadingSpinner
                fullPage={true}
                size="lg"
                label="Just a moment while we get things ready."
            />
        )
    };

    if(confirmDelete)  {

        return (

            <ConfirmDialog
                isOpen={confirmDelete}
                title="Delete Appliance?"
                message="Are you sure you want to delete this appliance from your assessment? This action cannot be undone."
                confirmLabel="Yes, Delete"
                cancelLabel="Keep Appliance"
                loadingLabel="Deleting Appliance..."
                isLoading={isDeletingAppliance}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={deleteAppliance}
            />
        )
    };

    if(applianceIsDeleted){

        return (
            <SuccessModal
                open={applianceIsDeleted}
                message="Appliance Is Deleted..."
                onClose={()=>setApplianceIsDeleted(false)}
                autoCloseMs={2000}
            />
        )
    };

    return (

        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6">

            

            <StepsHeader
                title={"Household Appliances"}
                description={"Add and manage your household appliances to estimate daily energy consumption and determine the right solar system for your needs."}
            />

            <ApplianceSearchBanner
                setIsSearching={setIsSearching}
            />           


            
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-7 lg:gap-8">

                <div className="w-full space-y-7 lg:space-y-8">

                    <SectionCard
                        title="Quick Common Household Appliances"
                        description="Click on an appliance to add it to your household"
                    >
                        <AppliancePresetCard 
                            setApplianceReferences={setApplianceReferences}
                        />

                    </SectionCard>

                    
                    <SectionCard
                        title="Your Appliances"
                        description="Appliance details and usage"

                        navigate={async() => {

                            setAdd(true);
                            await Sleep(1200);
                            setIsAddingAppliances(true)
                            setAdd(false);
                        }}
                    >
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 px-5 py-10 text-center transition-colors hover:border-emerald-300 sm:py-14">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200">
                             <Plus size={32} strokeWidth={2.5} />
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-800">
                                Add Your Custom Appliances
                            </h3>

                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Start building your household appliance list to calculate your daily energy consumption and find the right solar system.
                            </p>

                        </div>  

                    </SectionCard>


                    <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                        <p className="text-sm leading-6 text-blue-800">
                            Check the appliance label or user manual for its power rating. Actual energy consumption may vary depending on how the appliance is used.
                        </p>
                    </div>

                    <AddedAppliancesCard total ={allAppliances.length} >

                        {allAppliances.map((ap, i) => {

                            return (

                                <AddedApplianceChip

                                        onClick={async ()=> {
                                            setAttempted(false);
                                            setAdd(true);
                                            setAppliancesFormData(ap);
                                            setSelectedApplianceToEdit(i);
                                            await Sleep(1300);
                                            setIsEditingAppliance(true);
                                            setAdd(false);

                                        }}

                                        key = {`${ap.appliance_name}-${ap.appliance_category}-${i}`}
                                        name = {ap.appliance_name}
                                        onRemove = {async() =>{

                                                setApplianceToDelete(i)
                                                setAdd(true);
                                                await Sleep(1100)
                                                setConfirmDelete(true);
                                                setAdd(false);
                                        }}
                                />
                            )
                        })

                        }
                    </AddedAppliancesCard>

            
                </div>


            </div>


        
        </div>

    );
}
