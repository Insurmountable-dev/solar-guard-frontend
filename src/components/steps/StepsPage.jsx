import ApplianceSearch from "../../pages/ApplianceSearch";
import ApplianceDetailsCard from "./steps-components/ApplianceDetailsCard";
import Step1Household from "./Step1Household";
import Step2RoofDetails from "./Step2RoofDetails";
import Step3Appliances from "./step3Appliances";
import Step4Review from "./Step4Review";
import Step5Results from "./step5Results";
import LatestAssessment from "./LatestAssessment";
import useNavigation from "../../contexts/NavigationProvider";


export default function StepsPage({ 
    formData = {},
    currentStep = 1, 
    handleChange = {}, 
    errors = {}, 
    attempted = false,
    isSearching = false,
    isSearchingAddingAppliance = false,
    isAddingAppliances = false,
    isEditingAppliance = false,
    isQuickAddingAppliance = false,
    setIsAddingAppliances,
    setIsSearching,
}) {



    const { handleHouseholdChange,  handleMeasurementsChange} = handleChange;
    const { householdFormData = {}, measurementsFormData = {}} = formData;
    const { householdErrors = {},   measurementErrors = {}} = errors;

    const {hasResult} = useNavigation();

    switch (currentStep) {
        case 1:
            return (
                <Step1Household
                    formData={householdFormData}
                    handleChange={handleHouseholdChange}
                    errors={householdErrors}
                    attempted={attempted}
                />
            );

        case 2:
            return (
                <Step2RoofDetails
                    formData={measurementsFormData}
                    handleChange={handleMeasurementsChange}
                    errors={measurementErrors}
                    attempted={attempted}
                />
            );

        case 3:
            return(
                
                isSearching ?

                    <ApplianceSearch />
                    
                : (isAddingAppliances  || isEditingAppliance || isQuickAddingAppliance || isSearchingAddingAppliance) ?

                    <ApplianceDetailsCard
                        setIsAddingAppliances={setIsAddingAppliances}
                    />
                :
                    <Step3Appliances 
                        setIsSearching={setIsSearching}
                        setIsAddingAppliances={setIsAddingAppliances}
                    />
            );

        case 4:

            return(
                <Step4Review/>
            );

        case 5:

            return(
                hasResult ?

                    <Step5Results />
                :  
                    <LatestAssessment />
            );

        default:
            return (
                <section className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Solar Guard assessment</p>
                    <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">Step {currentStep}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">This step's form component still needs to be implemented.</p>
                </section>
            );
    }
}
