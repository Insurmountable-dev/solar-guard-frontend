import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {searchApplianceReference} from "../../services/pages/appliancesService";



export default function useSearch() {

    const navigate = useNavigate();
    const location = useLocation();

    // Query State
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");


    return{
        isSearching,
        setIsSearching,

        navigate,
        query,
        setQuery,
    }

};