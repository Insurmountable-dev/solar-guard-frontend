import Metric from "./Metric";
import { Sun } from "lucide-react";
import { statusStyles } from "../../constants/styles";
import { SkeletonCard } from "../ui/Skeleton";



const RecentAssessment = ({assessment, isLoading, onClick}) => {

    if (isLoading) {
        return <SkeletonCard/>;
    };



  if (!assessment) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">Recent Solar Assessment</h2>

            <p className="mt-1 text-sm text-slate-500">
                Your latest completed solar assessment will appear here.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Sun  className="h-6 w-6 text-green-600"/>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-700"> No completed assessment yet</p>

                <p className="mt-1 max-w-xs text-xs text-slate-500">
                    Once an assessment is completed, the results will show up here.
                </p>

                {onClick && (
                    <button
                        type="button"
                        onClick={onClick}
                        className="mt-5 inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        View Assessments
                    </button>
                )}

            </div>

        </div>
    );
}

    const householdName  =  assessment?.household_name ||  "Household assessment";
    const assessmentDate =  new Date(assessment.updated_at || assessment.created_at).toLocaleDateString();

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between gap-4">

                <div>

                    <h2 className="text-lg font-semibold text-slate-900"> Recent Solar Assessment</h2>

                    <p className="mt-1 text-sm text-slate-500">{householdName}</p>

                    {assessmentDate && (
                        <p className="mt-1 text-xs text-slate-400">
                            {assessmentDate}
                        </p>
                    )}

                </div>

            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[assessment.assessment_status?.toLowerCase()] ?? "bg-gray-100 text-gray-700" }`}>
                {assessment.assessment_status}
            </span>

            </div>


            <div className="mt-6 grid grid-cols-2 gap-4">

                <Metric  
                    label="Daily Energy"
                    value={`${Number(assessment.total_daily_energy_kwh || 0).toFixed(2)} kWh`}
                />

                <Metric 
                    label="Peak Load" 
                    value={`${Math.round(Number(assessment.peak_load_watts|| 0)).toLocaleString()} W`}
                />

                <Metric
                    label=" Recommended Solar"
                    value={`${Math.round(Number(assessment.required_solar_capacity_watts || 0)).toLocaleString()} W`}
                />

                <Metric
                    label="Recommended Battery"
                    value={`${Number(assessment.required_battery_capacity_kwh || 0).toFixed(2)} kWh`}
                />

                <Metric 
                    label = "Recommended Inverter"
                    value = {`${Math.round(Number(assessment.required_inverter_capacity_watts || 0)).toLocaleString()} W`}
                />

                 <Metric 
                    label = "Available Roof Area"
                    value = {` ${Number(assessment.available_roof_area_m2 || 0)} m²`}
                />

                 <Metric 
                    label = "Required Panel Area"
                    value = {` ${Number(assessment.required_panel_area_m2 || 0)} m²`}
                />

                 <Metric 
                    label = "Recommended Panels"
                    value = {` ${Number(assessment.recommended_panel_count|| 0)} `}
                />



            </div>


            {onClick && (
                <button
                    type="button"
                    onClick={onClick}
                    className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    View Assessment
                </button>
            )}

        </div>
    );
};


export default RecentAssessment;