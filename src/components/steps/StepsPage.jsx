
import Step1Household from "./Step1Household";
import Step2RoofDetails from "./Step2RoofDetails"

export default function StepsPage({
    currentStep,
    attempted,
    errorCount,
    requiredFields,
    filledFields,
    percent,
    handleChange,
    householdErrors={},
    householdFormData={}
}){

    let content ;


    switch(currentStep){
        case 1:
            content = <Step1Household
                attempted={attempted}
                errorCount={errorCount}
                requiredFields={requiredFields}
                filledFields={filledFields}
                percent={percent}
                householdErrors={householdErrors}
                householdFormData={householdFormData}
                handleChange={handleChange}
            />
            break;
        case 2:
            content = <Step2RoofDetails/>
            break;

    

    }





    return (
        <>
         {content}
        </>
    )
}