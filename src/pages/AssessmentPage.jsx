import {useEffect,useState} from "react";
import {useAuth} from "../contexts/AuthProvider";
import useAssessments from "../hooks/pages/useAssessments"

import AssessmentProgress from "../components/assessment/AssessmentProgress";
import AssessmentHeader from "../components/assessment/AssessmentHeader";
import AssessmentActions from "../components/assessment/AssessmentActions"; // NEW

import StepsPage from "../components/steps/StepsPage";


export default function AssessmentPage() {

    const  { currentUser } = useAuth();
    const  [ isSaving, setIsSaving ] = useState(false);

    const { 
           currentStep,
           errorCount,
           attempted,
           filledFields,
           requiredFields,
           percent,
           handleContinue,
           handleChange,
           handleBack,
           handleSaveExit,
           householdFormData,
           householdErrors

    } = useAssessments();

    const firstName = currentUser?.first_name;

    return (

    <div className="min-h-screen overflow-x-clip bg-slate-50">

            <AssessmentHeader
                title={firstName? `${firstName}, let's size your solar system`: "Let's size your solar system"}
            />

            <main className="relative z-10 mx-auto max-w-6xl px-4 pb-28 sm:px-6">

                <div className="sticky top-0 z-30 -mx-4 bg-slate-50/95 px-4 py-3 shadow-sm backdrop-blur-sm sm:-mx-6 sm:px-6">
                    <AssessmentProgress currentStep={currentStep} />
                </div>

                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

                        <StepsPage 
                            attempted = {attempted}
                            currentStep={currentStep}
                            errorCount={errorCount}
                            requiredFields={requiredFields}
                            filledFields={filledFields}
                            percent={percent}
                            handleChange={handleChange}
                            householdErrors={householdErrors}
                            householdFormData={householdFormData}
                        />

                </section>

            </main>

            {/* NEW: one shared bar for every step */}
            <AssessmentActions
                onContinue={handleContinue}
                onBack={handleBack}
                onSaveExit={handleSaveExit}
                isSaving={isSaving}
                backDisabled={currentStep === 1}
                continueLabel={currentStep === 4 ? "Calculate" : "Continue"}
            />

        </div>

    );
}