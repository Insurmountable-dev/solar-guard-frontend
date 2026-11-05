import {useState} from "react";
import { useContext } from "react";
import   useAddAppliancesHook from "../hooks/pages/useAddAppliancesHook";
import { AppliancesContext } from "./CreateContext";


export function AppliancesProvider({ children }) {



    const appliances = useAddAppliancesHook();



    return (
        <AppliancesContext.Provider 
            value={appliances}
        >
            {children}
        </AppliancesContext.Provider>
    );

}


export default function useAddAppliances() {

    return useContext(AppliancesContext);

}