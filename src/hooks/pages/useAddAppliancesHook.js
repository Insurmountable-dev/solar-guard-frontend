import {useState, useEffect} from "react";
import { updateAppliances } from "../../services/pages/appliancesService";
import { createChangeHandler } from "../../utils/forms/createChangeHandler";
import { initialAppliancesFormData, initialHouseholdFormData } from "../../constants/assessments";
import { validateAppliancesForm } from "../../utils/auth/validation";
import { fetchDraft, createDraft, deleteDraft,updateDraft, updateCurrentStep} from "../../services/pages/draftService";
import useNavigation from "../../contexts/NavigationProvider";

import Sleep from "../../utils/Sleep";


export default function useAddAppliancesHook() {

    const{isQuickAddingAppliance, setIsQuickAddingAppliance, isSearchingAddingAppliance, setIsSearchingAddingAppliances} = useNavigation([]);

    // Universal
    const [errorCount, setErrorCount] = useState(0);
    const [attempted, setAttempted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

        // Progress
        const [requiredFields, setRequiredFields] = useState(0);
        const [filledFields, setFilledFields] = useState(0);
        const [percent, setPercent] = useState(0);


    // Initialize the modal state from sessionStorage to preserve its visibility after a browser refresh.
    const[isAddingAppliances, setIsAddingAppliances] = useState(() => {
        return sessionStorage.getItem("solarGuardIsAddingAppliances") === "true";
    });

    const[appliancesFormData, setAppliancesFormData] = useState(initialAppliancesFormData);
    const[appliancesErrors, setAppliancesErrors] = useState({});
    const[allAppliances, setAllAppliances] = useState([]);

    // States for Deleting An Appliance
    const [applianceToDelete, setApplianceToDelete] = useState(null);
    const [isDeletingAppliance, setIsDeletingAppliance] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [applianceIsDeleted, setApplianceIsDeleted] = useState(false);


    // Editing Appliance

    const[isEditingAppliance, setIsEditingAppliance] = useState(false);
    const[selectedApplianceToEdit, setSelectedApplianceToEdit] = useState(null);



    // Show Ui
    const[showModal, setShowModal] = useState(false);
    const[showSuccess, setShowSuccess] = useState(false);
    const[add, setAdd] = useState(false);



    // No of Appliance Form Data Required Fields
    const applianceRequired = Object.keys(initialAppliancesFormData).length - 7;





    // Save the modal visibility whenever its state changes.
    useEffect(() => {
        sessionStorage.setItem("solarGuardIsAddingAppliances", String(isAddingAppliances));
    }, [isAddingAppliances]);



    // Validate form data after an attempt
    useEffect (() => {

        setAppliancesErrors({});


        if(!attempted  || !(isAddingAppliances || isEditingAppliance || isQuickAddingAppliance || isSearchingAddingAppliance)) return;

        setErrorCount(0);

        const {errors, noOfErrors} = validateAppliancesForm(appliancesFormData);

        setAppliancesErrors(errors);
        setErrorCount(noOfErrors);

    },[appliancesFormData,attempted, isAddingAppliances, isEditingAppliance, isQuickAddingAppliance, isSearchingAddingAppliance]);


    // Load Step Progress 
    useEffect(() => {


        if ( !(isAddingAppliances || isEditingAppliance || isQuickAddingAppliance || isSearchingAddingAppliance)) return;

        const { noOfErrors } = validateAppliancesForm(appliancesFormData);

        const filled = applianceRequired - noOfErrors;

        const pct = applianceRequired > 0 ? Math.round((filled / applianceRequired) * 100) : 0;

        setFilledFields(filled);
        setPercent(pct);
        setRequiredFields(applianceRequired);

    }, [appliancesFormData, isAddingAppliances, isEditingAppliance, applianceRequired, isQuickAddingAppliance, isSearchingAddingAppliance]);



    const handleAppliancesChange = createChangeHandler(setAppliancesFormData, () => setAppliancesErrors({}));
    

    const validateUserApplianceDetails = async () => {

        setErrorCount(0);

        const{errors, isValid, noOfErrors} = validateAppliancesForm(appliancesFormData);

        if(!isValid){
            setAttempted(true);
            setAppliancesErrors(errors);
            setErrorCount(noOfErrors);
            return;
        };

        
        setAttempted(false);
        setShowModal(true);
        
    };


   const handleAddApplianceConfirmModal = async () => {

    const updatedAppliances = [
          ...allAppliances,
        { ...appliancesFormData }
    ];

    setIsLoading(true);

        try {

            await updateAppliances(updatedAppliances);
            setAllAppliances(updatedAppliances);
            setAppliancesFormData(initialAppliancesFormData);

            setShowModal(false);
            setShowSuccess(true);

            await Sleep(1200);

        } catch(error) {

            console.error("Error Updating Household Data", error.message);

        } finally {

            setIsLoading(false);

        }

   };


   const handleEditingApplianceConfirmModal = async () =>{

       setIsLoading(true);

       allAppliances[selectedApplianceToEdit]  = appliancesFormData;

        try{

            await updateAppliances(allAppliances);

            setAppliancesFormData(initialAppliancesFormData);

             setShowModal(false);
             setShowSuccess(true);

            await Sleep(1200);

        }catch(error){

            console.error("Error Editing Appliance:", error);

        }finally{ 

            setIsLoading(false);

        }

   };



    const deleteAppliance = async () => {

            try {

                setIsDeletingAppliance(true);

                const updatedAppliances = allAppliances.filter((elem,i) => i !== applianceToDelete);

                await updateAppliances(updatedAppliances);

                setAllAppliances(updatedAppliances);

                await Sleep(2000);

                setApplianceToDelete(null);

            } catch(error) {

                console.error("Error Deleting Appliance", error.message);

            } finally {

                setApplianceIsDeleted(true);
                setIsDeletingAppliance(false);
                setConfirmDelete(false);

            }

    };


    

        return {
            // Form Data
            initialAppliancesFormData,
            allAppliances,
            appliancesFormData,
            appliancesErrors,

            // Appliances List
            allAppliances,
            setAllAppliances,

            // Validation
            attempted,
            errorCount,

            // UI State
            isAddingAppliances,
            isLoading,
            showModal,
            showSuccess,
            add,
            setAdd,

            // Appliance delete
            isDeletingAppliance,
            applianceToDelete,
            setApplianceToDelete,
            confirmDelete,
            setConfirmDelete,
            applianceIsDeleted,
            setApplianceIsDeleted,

            // editing An Appliance
            isEditingAppliance,
            setIsEditingAppliance,
            setSelectedApplianceToEdit,


          
          
            // State Setters
            setAppliancesFormData,
            setAllAppliances,
            setIsAddingAppliances,
            setAttempted,
            setErrorCount,
            setShowModal,
            setShowSuccess,
            setAppliancesErrors,

            // Event Handlers
            handleAppliancesChange,
            validateUserApplianceDetails,
            handleAddApplianceConfirmModal,
            handleEditingApplianceConfirmModal,
            deleteAppliance,


            // Progress
            applianceRequired,
            requiredFields,
            setRequiredFields,
            filledFields,
            setFilledFields,
            percent,
            setPercent
        };
}