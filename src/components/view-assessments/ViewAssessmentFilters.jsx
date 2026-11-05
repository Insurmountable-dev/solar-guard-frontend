import {Search} from "lucide-react"
import InputField from "../common/InputField"


export default function ViewAssessmentFilters({}) {

    return (

        <div className="flex flex-col gap-3 sm:flex-row">


            <InputField
                type="select"
                defaultValue= ""
                options={["Newest First", "Oldest First"]}
            />

        </div>

    );

}




