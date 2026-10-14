import { useState, useEffect } from "react";
import { initialHouseholdFormData } from "../../constants/assessments";
import { validateHouseholdForm } from "../../utils/auth/validation";


export default function useAssessments() {

    const [currentStep, setCurrentStep] = useState(1);
    const [attempted, setAttempted] = useState(false);
    const [errorCount, setErrorCount] = useState(0);
    const [householdFormData, setHouseholdFormData] = useState(initialHouseholdFormData);
    const [householdErrors, setHouseholdErrors] = useState({});


    const requiredFields = Object.keys(initialHouseholdFormData).length - 3
    const filledFields   = Object.values(householdFormData).filter((h) => 
        h !== null &&
        h !== undefined &&
        h !== 0 &&
        String(h).trim() !== ""
    ).length - 2

    const percent = (filledFields / requiredFields) * 100


    useEffect(() => {

    const { noOfErrors, errors } = validateHouseholdForm(householdFormData);
    // Only show validation errors after the user attempts to continue
    if (attempted) {
        setErrorCount(noOfErrors);
        setHouseholdErrors(errors);
    }
    }, [householdFormData, attempted]);


    const handleChange = (event_or_name,newValue) => {

        setHouseholdErrors({});

        if(typeof(event_or_name) === 'string'){

            setHouseholdFormData((prev) => ({
                ...prev,
                [event_or_name]:newValue
            }));

            return
        };

        const event = event_or_name

        const { name, value, type, checked } = event.target;

        setHouseholdFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleContinue = () =>{


       const {noOfErrors, isValid, errors} = validateHouseholdForm(householdFormData);
        
       setHouseholdErrors(errors);
       setErrorCount(noOfErrors);
       setAttempted(true);


       if(!isValid) return;

       sessionStorage.setItem("householdAssessment",JSON.stringify(householdFormData));

      if (currentStep < 5) {
        setCurrentStep((n) => n + 1);
      }

    };

    const handleBack = () => {

        if (currentStep > 1) {

            const previousStep = currentStep - 1;
            setCurrentStep(previousStep);

            switch (previousStep) {
                case 1: {
                    const savedData = sessionStorage.getItem("householdAssessment");
                    savedData && setHouseholdFormData(JSON.parse(savedData))
                    break;
                }
                case 2:{
                    
                    break;
                }

                default:
                    break;
            }
        }
    };

    const handleSaveExit = () => {
        alert("Coming Soon ....")
    }




    return {
        attempted,
        currentStep,
        errorCount,
        requiredFields,
        filledFields,
        percent,
        handleChange,
        handleContinue,
        handleBack,
        handleSaveExit,

        householdFormData,
        householdErrors


    };

}