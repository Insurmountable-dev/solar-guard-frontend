import {useState} from "react";
import { useContext } from "react";
import { NavigationContext } from "./CreateContext";
import useFinishAssessment from "../hooks/components/useFinishAssessment";



export function NavigationProvider({children}) {
    


    // Handle App Loading Spinner
    const [loadingMessages, setLoadingMessages] = useState([]);
    const [showLoaderApp, setShowLoaderApp] = useState(false);
    const [pathname, setPathname] = useState("/dashboard");
    const [navigationData, setNavigationData] = useState(null);
    

    
    // Handle Continue Errors

    const [isContinueError , setIsContinueError] = useState(false);

    const [continueErrors, setContinueErrors] = useState({

            title:"hi",
            message:"Whats no hap",
            issues:["1","2"],
            tag:"tag",
            actionLabel:"Add An Appliance",
            secondaryLabel:"Sec",
            dismissible:true,
            onAction:null,
            onClose:() => {
                setIsContinueError(false);
            }
    });


    // Handle Quick Add Appliances
    const [applianceReferences, setApplianceReferences] = useState([]);
    const [isQuickAddingAppliance, setIsQuickAddingAppliance] = useState(false);
    const [selectedQuickApplianceToAdd, setSelectedQuickApplianceToAdd] = useState(0);

    // Handle Is Searching And Adding Of Appliances
    const [result, setResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchingAddingAppliance, setIsSearchingAddingAppliance] = useState(false);
    const [selectedSearchingApplianceToAdd, setSelectedSearchingApplianceToAdd] = useState(false);


    // Handle Create Asessments
    const [confirmReview, setConfirmReview] = useState(false);
    const [isCreatingAssessment, setIsCreatingAssessment] = useState(false);
    const [isAssessmentCreated, setIsAssessmentCreated] = useState(false);


    //Calculating results
    const [isCalculating, setIsCalculating] = useState(false);
    const [hasResult, setHasResult] = useState(false);   
    const [assessmentId, setAssessmentId] = useState(null);
    const [householdId, setHouseholdId] = useState(null);


    // Handle Step 5
     const [isLoadingResults, setIsLoadingResults] = useState(true);
     const [resultError, setResultError] = useState("");

     const object = useFinishAssessment();



    return (

        <NavigationContext.Provider 

            value ={{

                // Handle App Loading Spinner
                showLoaderApp,
                loadingMessages,
                pathname,
                navigationData,
                
                setLoadingMessages,
                setShowLoaderApp,
                setPathname,
                setNavigationData,

                // Handle Continue Error
                continueErrors,
                isContinueError,

                setContinueErrors,
                setIsContinueError,

                // Handle Quick Add Appliances
                applianceReferences,
                isQuickAddingAppliance,
                selectedQuickApplianceToAdd,


                setApplianceReferences,
                setSelectedQuickApplianceToAdd,
                setIsQuickAddingAppliance,


                // Handle Is Searching And Adding Of Appliances
                result,
                isSearching,
                isSearchingAddingAppliance,
                selectedSearchingApplianceToAdd,


                setResult,
                setIsSearching,
                setIsSearchingAddingAppliance,
                setSelectedSearchingApplianceToAdd,


                // Handle Creating Assessment
                confirmReview,
                isCreatingAssessment,
                isAssessmentCreated,

                setIsAssessmentCreated,
                setIsCreatingAssessment,
                setConfirmReview,


                // Calculating Results
                isCalculating,
                hasResult,
                assessmentId,
                householdId,

                setHasResult,
                setIsCalculating,
                setAssessmentId,
                setHouseholdId,

                // handle Result Step 5
                ...object,
                isLoadingResults,
                resultError,

                setIsLoadingResults,
                setResultError
            }}

         >
            {children}
        </NavigationContext.Provider>
    )
}



export default function useNavigation () {

    return useContext(NavigationContext);

};