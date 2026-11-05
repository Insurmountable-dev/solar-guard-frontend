import { useState} from "react";
import { useAuth } from "../contexts/AuthProvider";
import useAssessments from "../hooks/pages/useAssessments";
import useAddAppliances from "../contexts/ApplianceProvider";
import useNavigation from "../contexts/NavigationProvider";
import AssessmentHeader from "../components/assessment/AssessmentHeader";
import AssessmentProgress from "../components/assessment/AssessmentProgress";
import AssessmentActions from "../components/assessment/AssessmentActions";
import StepsPage from "../components/steps/StepsPage";
import StepsProgress from "../components/steps/steps-components/StepProgress";
import ErrorCount from "../components/steps/steps-components/ErrorCount";
import ErrorModal from "../components/common/ErrorModal";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ConfirmDialog from "../components/common/ConfirmDialog";
import SuccessModal from "../components/common/SuccessModal";
import LatestActions from "../components/steps/latest-components/latestActions";


export default function AssessmentPage() {

    const [loader,setLoader] = useState(false);
    

    const { currentUser } = useAuth();

    const { attempted, errorCount, isAddingAppliances,  isEditingAppliance, setIsAddingAppliances } = useAddAppliances();

    const {
        hasResult,
        isLoadingResults,
        resultError,
        isContinueError,
        isSearching = false, 
        isQuickAddingAppliance = false, 
        isSearchingAddingAppliance = false,
        confirmReview,
        isCreatingAssessment,
        isAssessmentCreated,


        setIsSearching,
        setIsContinueError,
        setConfirmReview,
        setIsAssessmentCreated,
        setIsCreatingAssessment,
        

        continueErrors,
    } = useNavigation();

    const {
        currentStep,
        setCurrentStep,
        formData,
        handleChange,
        handleContinue,
        handleBack,
        handleSaveExit,
        handleCalculateResults,
        handleCreateAssessment,
        errors,
        filledFields,
        requiredFields,
        percent,
    } = useAssessments();




    if(isContinueError) {

        return (

            <ErrorModal 

                open={isContinueError}
                dismissible={continueErrors.dismissible}
                message={continueErrors.message}
                actionLabel={continueErrors.actionLabel}
                secondaryLabel={continueErrors.secondaryLabel}
                issues={continueErrors.issues}
                tag={continueErrors.tag}
                onAction = {continueErrors.onAction}
                onClose={continueErrors.onClose}

            />
        )
    };

    
    if(confirmReview) {


            return (
               <ConfirmDialog
                    isOpen={confirmReview}
                    isLoading={loader}
                    title="Ready to Calculate Your Solar Results?"
                    message="You're about to finalize your household solar assessment. Before proceeding, please ensure that your household details, roof measurements, and appliance information are accurate and complete. Once you confirm an assessment and the process begins, your assessment data will be saved to our system and the previous steps will no longer be editable through this assessment flow. Please review your information carefully before continuing."
                    confirmLabel="Create Assessment"
                    cancelLabel="Review My Details"
                    onCancel={() => setConfirmReview(false)}
                    onConfirm={handleCreateAssessment}
            />
            );
    };


    if(isCreatingAssessment) {


        return(
            <LoadingSpinner
                fullPage={true}
                loop={false}
                showProgress={true}
                messages={[
                    "Saving your household details...",
                    "Saving your house information...",
                    "Saving your roof measurements...",
                    "Saving your roof orientation...",
                    "Saving your roof shading details...",
                    "Saving your roofing material...",
                    "Saving your appliance details...",
                    "Saving your appliance quantities...",
                    "Saving your daily energy usage...",
                    "Saving your solar assessment...",
                    "Updating your assessment progress...",
                    "Securing your assessment data...",
                    "Organizing your household information...",
                    "Preparing your assessment data...",
                    "Making sure your information is up to date..."
                ]}
            />
        )
    };


    if(isAssessmentCreated) {

        return(
            <SuccessModal 
                open={isAssessmentCreated}
                message={"Assemment Created sucessfully Proceed To Calculate..."}
                buttonLabel="Proceed..."
                autoCloseMs={2000}
                onClose={() => {
                    setIsAssessmentCreated(false);
                }}
            />
        )
    };



 
    return (

        <div className="min-h-dvh bg-slate-50 text-slate-900">
           {!(isAddingAppliances || isEditingAppliance || isQuickAddingAppliance || isSearchingAddingAppliance) && (
                <AssessmentHeader
                    title = {(currentUser?.first_name)  ? `${currentUser.first_name}, let's size your solar system`  : "Let's size your solar system" }
                />
           )}

            <div className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 shadow-sm backdrop-blur-xl">

                <div className="mx-auto w-full max-w-[1440px]">

                    {!(isAddingAppliances || isEditingAppliance || isQuickAddingAppliance || isSearchingAddingAppliance) && (<AssessmentProgress currentStep={currentStep} />)}

                    {((isAddingAppliances || isEditingAppliance  || isQuickAddingAppliance || isSearchingAddingAppliance)|| currentStep <3) && (

                        <div className="border-t border-slate-200/50 px-3 py-2 sm:px-5 sm:py-2 lg:px-8 lg:py-1.5">

                            <div className="mx-auto flex w-full max-w-6xl flex-col gap-1.5 lg:gap-1">
                                <StepsProgress
                                    filledFields={filledFields}
                                    requiredFields={requiredFields}
                                    percent={percent}
                                />

                                <ErrorCount
                                    attempted={attempted}
                                    errorCount={errorCount}
                                />

                            </div>

                        </div>

                    )}

                </div>
            </div>

            <main className="w-full">
                <div className="mx-auto w-full max-w-6xl px-3 pb-8 pt-5 sm:px-5 sm:pb-10 sm:pt-7 lg:px-8 lg:pb-12 lg:pt-9">
                    <StepsPage
                        attempted={attempted}
                        currentStep={currentStep}
                        handleChange={handleChange}
                        isSearching={isSearching}
                        isSearchingAddingAppliance={isSearchingAddingAppliance}
                        isAddingAppliances={isAddingAppliances}
                        isEditingAppliance={isEditingAppliance}
                        isQuickAddingAppliance={isQuickAddingAppliance}
                        setIsSearching={setIsSearching}
                        setIsAddingAppliances={setIsAddingAppliances}
                        errors={errors}
                        formData={formData}
                    />

                 

                        <div className="mt-8 border-t border-slate-200 pt-5 sm:mt-10 sm:pt-6">

                         { !(isAddingAppliances || isEditingAppliance || isQuickAddingAppliance || isSearchingAddingAppliance || currentStep === 5)  && ( 

                            <AssessmentActions
                                onContinue={handleContinue}
                                onBack={handleBack}
                                onSaveExit={handleSaveExit}
                                backDisabled={currentStep === 1}
                                continueDisabled={currentStep >= 5}
                                continueLabel={"Continue"}
                            />
                        )}
                        
                         { (hasResult && currentStep === 5) && (
                            <LatestActions
                                    disabled ={resultError || isLoadingResults}
                                />
                        )}
                            
                        </div> 
                        
                    

                </div>
            </main>
        </div>

    );
}