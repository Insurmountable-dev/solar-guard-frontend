import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Sleep from "../../utils/Sleep";
import { deleteDraft } from "../../services/pages/draftService";


export default  function useFinishAssessment () {

    const [showFinishModal, setShowFinishModal] = useState(false);
    const [isFinishingAssessment, setIsFinishingAssessment] = useState(false);
    const [showFinishSuccess, setShowFinishSuccess] = useState(false);


    const navigate = useNavigate();


    const handleFinishAssessment = async() => {

        setIsFinishingAssessment(true);

        try{

            await deleteDraft();

            await Sleep(1200);

        }catch(error){

            console.error("Error Finishing Assessment:", error);

        }finally{

            setShowFinishModal(false);
            setIsFinishingAssessment(false);
            setShowFinishSuccess(true);
        }

    }
 

    return {
        showFinishModal,
        isFinishingAssessment,
        showFinishSuccess,

        setShowFinishModal,
        setIsFinishingAssessment,
        setShowFinishSuccess,


        handleFinishAssessment,
        navigate

     }

};