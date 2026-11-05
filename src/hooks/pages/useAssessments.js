import useNavigation from "../../contexts/NavigationProvider";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import   useAddAppliances  from "../../contexts/ApplianceProvider";
import   Sleep from "../../utils/Sleep"

import { createChangeHandler } from "../../utils/forms/createChangeHandler";
import { fetchDraft, createDraft, deleteDraft,updateDraft, updateCurrentStep} from "../../services/pages/draftService";
import { createAssessment } from "../../services/pages/assessmentService";

import {validateHouseholdForm, validateMeasurements,validateAppliancesForm} from "../../utils/auth/validation";
import {initialHouseholdFormData, initialMeasurementsFormData} from "../../constants/assessments";
import { calculateSolarRequirements } from "../../services/components/solarCalculation";

export default function useAssessments() {

    // Shared Data And Appliances Data
    const {
        attempted,
        setAttempted,
        errorCount,
        setErrorCount,
        setAppliancesErrors,
        setAppliancesFormData,
        appliancesFormData,
        initialAppliancesFormData,
        allAppliances,
        setAllAppliances,

        // Progress
        requiredFields,
        setRequiredFields,
        filledFields,
        setFilledFields,
        percent,
        setPercent,
        applianceRequired


    } = useAddAppliances();


    const{
        setAssessmentId,
        setHouseholdId,
        setIsCreatingAssessment,
        setIsContinueError, 
        setContinueErrors , 
        setIsSearching, 
        setConfirmReview,
        setIsAssessmentCreated,

    } = useNavigation();


    // Navigation
    const navigate = useNavigate();
    const location = useLocation();


    // Wizard Configuration
    const totalSteps = 5;


    // Draft State
    const [hasDraft, setHasDraft] = useState(false);
    const [draft, setDraft] = useState({});
    const [isDraftLoading, setIsDraftLoading] = useState(false);

    const [visible, setVisible] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [isDeletingDraft, setIsDeletingDraft] = useState(false);

    


    // Household And Measurements Form Data
    const [householdFormData, setHouseholdFormData] = useState(initialHouseholdFormData);
    const [measurementsFormData, setMeasurementsFormData] = useState(initialMeasurementsFormData);


    // Wizard State
    const [currentStep, setCurrentStep] = useState(1);


    // Validation State
    const [householdErrors, setHouseholdErrors] = useState({});
    const [measurementErrors, setMeasurementErrors] = useState({});

   

    // Load Draft Data Except Appliances Data
    useEffect(() => {

        let cancelled = false;

        async function loadDraft () {

            setIsDraftLoading(true);

            try{

                const data = await fetchDraft();

                if(cancelled) return;

                setDraft(data?.draft ?? false );
                setHasDraft(data?.hasDraft ?? null);

                setCurrentStep(data?.draft?.current_step ?? 1);

                setHouseholdFormData(data?.draft?.household_data ??  initialHouseholdFormData);
                setMeasurementsFormData(data?.draft?.measurement_data ?? initialMeasurementsFormData );

            }catch(error) {

                if(!cancelled) {
                    console.error("Unable To Fetch Draft Data ",error.message);
                };

            }finally{

                setIsDraftLoading(false);
            }
        }

        loadDraft();


        return () => {
            cancelled = true
        }

    

    },[]);


    // Load Step Progress 
    useEffect(() => {

        let filled   = 0;

        switch(currentStep) {

            case 1: {

                const required = Object.keys(initialHouseholdFormData).length - 3;
                const { noOfErrors } = validateHouseholdForm(householdFormData);

                filled = required - noOfErrors;

                const pct = required > 0 ? Math.round((filled / required) * 100) : 0;

                setFilledFields(filled);
                setRequiredFields(required);
                setPercent(pct);

                break;
            }

            case 2: {

                const required = Object.keys(initialMeasurementsFormData).length - 1;
                const { noOfErrors } = validateMeasurements(measurementsFormData);

                filled = required - noOfErrors;

                const pct = required > 0 ? Math.round((filled / required) * 100) : 0;

                setFilledFields(filled);
                setRequiredFields(required);
                setPercent(pct);

                break;
            }

            case 3: {

                setRequiredFields(applianceRequired);
            }

            default: {
                break;
            }
        }

    },[currentStep, householdFormData, measurementsFormData]);


    // Restore Draft Passed Through React Router Navigation State
    useEffect(() => {

        const savedDraft  = location.state?.draft;
        const resumeDraft = location.state?.resumeDraft;

        if (!resumeDraft || !savedDraft) {
            return;
        };

        setCurrentStep(savedDraft.current_step ?? 1);

        setHouseholdFormData({
            ...initialHouseholdFormData,
            ...(savedDraft.household_data ?? {})
        });

        setMeasurementsFormData({
            ...initialMeasurementsFormData,
            ...(savedDraft.measurements_data ?? {})
        });

        setAllAppliances([
            ...(savedDraft.appliances_data ?? [])
        ])

        setAttempted(false);
        setHouseholdErrors({});
        setMeasurementErrors({});
        setErrorCount(0);

        // Clear Navigation State To Prevent Restoring The Same Draft Again
        navigate(location.pathname, {
            replace: true,
            state: null,
        });

    }, [location.state, location.pathname, navigate]);


    // Reusable Form Change Handlers
    const handleHouseholdChange = createChangeHandler(setHouseholdFormData, () => setHouseholdErrors({}) );
    const handleMeasurementsChange = createChangeHandler( setMeasurementsFormData,() => setMeasurementErrors({}));


    // Validate Form Data After An Attempt
    useEffect(() => {

        if (!attempted) return;

        let result;

        switch (currentStep) {

            case 1:
                result = validateHouseholdForm(householdFormData);
                setHouseholdErrors(result.errors);
                break;

            case 2:
                result = validateMeasurements(measurementsFormData);
                setMeasurementErrors(result.errors);
                break;

            default:
                return;
        }

        setErrorCount(result.noOfErrors);

    }, [householdFormData, measurementsFormData, attempted, currentStep]);


    // Resume The Previously Saved Assessment
    const handlePreviousAssessment = async() => {

        if (!hasDraft || isDraftLoading || !draft) {
            return;
        }

        setIsDraftLoading(true);

        try {

            await Sleep(2000);

            navigate("/assessments", {
                state: {
                    resumeDraft:true,
                    draft,
                },
            });

        } catch (error) {

            console.error("Unable To Resume Previous Assessment", error);

        } finally {

            setIsDraftLoading(false);

        }

    };


    // Start A New Assessment
    const handleNewAssessment = async () => {

        setIsDeletingDraft(true);

        try {

            await deleteDraft();

            // Reset Current Step And Page Data 
            setCurrentStep(1);
            setHouseholdFormData(initialHouseholdFormData);
            setMeasurementsFormData(initialMeasurementsFormData);
            setAppliancesFormData(initialAppliancesFormData);
            setAllAppliances([]);

            setAttempted(false);
            setErrorCount(0);
            setHouseholdErrors({});
            setMeasurementErrors({});
            setAppliancesErrors({});

            await Sleep(3000);

            navigate("/assessments");

        } catch (error) {

            console.error("Unable To Delete Draft And Start A New Draft", error);

        }finally{
            setIsDeletingDraft(false);
        }

    };
 
   
     // Continue To The Next Step
    const handleContinue = async () => {

        switch (currentStep) {

            case 1: {

                try {

                    const {noOfErrors, isValid, errors,} = validateHouseholdForm(householdFormData);

                    setAttempted(true);
                    setErrorCount(noOfErrors);
                    setHouseholdErrors(errors);

                    if (!isValid) return;

                    setAttempted(false);

                    await createDraft({
                        current_step: currentStep + 1,
                        household_data:householdFormData,
                        measurement_data: measurementsFormData,
                        appliances_data:[]
                    });

                    setCurrentStep((step) => step + 1);

                } catch(error) {

                    console.error("Error Creating Assessment Draft:", error);

                }

                break;
            }

            case 2: {

                try {

                    const {noOfErrors,isValid,errors,} = validateMeasurements(measurementsFormData);

                    setAttempted(true);
                    setErrorCount(noOfErrors);
                    setMeasurementErrors(errors);

                    if (!isValid) return;

                    setAttempted(false);

                    await updateDraft({
                        current_step: currentStep + 1,
                        household_data:householdFormData,
                        measurement_data: measurementsFormData,
                    });

                    setCurrentStep((step) => step + 1);

                } catch(error) {

                    console.error("Error Updating Assessment Draft:", error);

                }

                break;
            }

            case 3: {

                try {

                        if (allAppliances.length <= 0) {

                            setContinueErrors({

                                title: "No Appliances Added",
                                message: "Please add at least one appliance to your household before continuing. This will help us calculate your energy needs and recommend a suitable solar system.",
                                issues: ["Your household has no appliances added yet."],
                                tag: "Action Required",
                                actionLabel: "Add An Appliance",
                                secondaryLabel: "Close",
                                dismissible: true,
                                onAction: () => {
                                    setIsContinueError(false);
                                    setIsSearching(true);
                                },

                                onClose: () => {
                                    setIsContinueError(false);
                                }

                            });

                            setIsContinueError(true);
                            return;

                          }

                    await updateCurrentStep(currentStep + 1);

                    setCurrentStep((step) => step + 1);

                } catch(error) {

                    console.error("Error Updating Current Assessment Step:", error);

                }

                break;
            }


            case 4: {
                    setConfirmReview(true);
                    break;
             };

            default:
                break;
        }

    };



    // Return To The Previous Wizard Step
    const handleBack = async() => {

        if (currentStep > 1) {

            setCurrentStep((step) => step - 1);

            try{

                await updateCurrentStep(currentStep - 1);

            }catch(error){
                
                console.error("Unable To Update The Step:", error);
            }

        }

    };


    // Save Form Data And Exit
    const handleSaveExit = () => {

        sessionStorage.setItem(
            "savedHouseholdFormData",
            JSON.stringify(householdFormData)
        );

        sessionStorage.setItem(
            "savedRoofMeasurements",
            JSON.stringify(measurementsFormData)
        );

        navigate("/dashboard");

    };


    const handleCreateAssessment = async () => {

            setConfirmReview(false);
            setIsCreatingAssessment(true);
            setCurrentStep((n) => n + 1);

            try{

                const data = await createAssessment();

                setAssessmentId(data.assessment_id);
                setHouseholdId(data.household_id);

                await updateCurrentStep(5);
                await Sleep(40000);

            }catch(error){

                console.error("Error Creating Assessment", error);

            }finally{

                setIsCreatingAssessment(false);
                setIsAssessmentCreated(true);

            }

    };


    const handleCalculateResults = async (householdId, assessmentId, setIsCalculating) => {

        setIsCalculating(true);

      try{

          await  calculateSolarRequirements(householdId, assessmentId);

      }catch(error){

        console.error("Error Calculating Results", error);


      }


    };
 

    // Return Values
    return {

        // Draft State
        hasDraft,
        draft,
        isDraftLoading,

        // UI
        visible,
        isOpen,
        isDeletingDraft,

        // Wizard State
        currentStep,
        totalSteps,
        setCurrentStep,

        // Navigation And Actions
        handleContinue,
        handleBack,
        handleSaveExit,
        handlePreviousAssessment,
        handleNewAssessment,
        handleCalculateResults,
        handleCreateAssessment,

        // Validation State
        attempted,
        errorCount,

        errors: {
            householdErrors,
            measurementErrors,
        },

        // Form Data
        formData: {
            householdFormData,
            measurementsFormData,
            appliancesFormData,
        },

        // Form Change Handlers
        handleChange: {
            handleHouseholdChange,
            handleMeasurementsChange,
        },

        // State Setters
        setAppliancesFormData,
        setVisible,
        setIsOpen,

        // Household Progress
        requiredFields,
        filledFields,
        percent,

    };

}
