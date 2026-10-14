import {useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentAssessment from "../components/dashboard/RecentAssessment";
import PreviousAssessments from "../components/dashboard/previousAssesments";
import QuickActions from "../components/dashboard/QuickActions";
import StartAssessmentCard from "../components/dashboard/StartAssessmentCard";

// Charts
import EnergyConsumptionChart from "../components/dashboard/charts/energy/EnergyConsumptionChart";
import ApplianceUsageChart from "../components/dashboard/charts/appliance/ApplianceUsageChart";
import SolarSizingChart from "../components/dashboard/charts/solar/SolarSizingChart";

import {Home, Plug, ClipboardList,Sun} from "lucide-react";
import { getDashboard } from "../services/dashBoardService";
import Loader from "../components/ui/Loader";



export default function DashboardPage({onNavigate}) {

    const [dashboard, setDashboard]  = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const  navigate = useNavigate();

    // Fetching Dash Board Data
    useEffect(() => {

        async function loadDashboardData(){

            try{
                
                const response = await getDashboard();
                setDashboard(response);
                setError("");

            }catch(error){

                setError(error.message || "Failed To Load ");
                console.error("Error Fetching Dashboard Details", error);

            }finally{
                setIsLoading(false);
            };

        };

        loadDashboardData();

    },[]);

    // console.log(dashboard);
    // console.log(isLoading);


    return (

        <div className="min-h-screen bg-slate-50">
            
            <DashboardHeader
                isLoading   = {isLoading} 
            />

        <main className="mx-auto max-w-7xl px-6 py-8">

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Solar Guard Dashboard</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Monitor your households, appliances,
                    solar assessments, and system requirements.
                </p>
            </div>


            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
            )}


            <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                <SummaryCard
                    title="Households"
                    value={isLoading ? <Loader/> :dashboard?.householdsCount}
                    description="Registered households"
                    icon={Home}
                    // onClick={openHouseholds}
                />

                <SummaryCard
                    title="Appliances"
                    value={isLoading ? <Loader/> :dashboard?.applianceCount}
                    description="Household appliances"
                    icon={Plug}
                    // onClick={openAppliances}
                />

                <SummaryCard
                    title="Assessments"
                    value={isLoading ? <Loader/> :dashboard?.assessmentCount}
                    description="Solar assessments"
                    icon={ClipboardList}
                    // onClick={openAssessmentHistory}
                />


                <SummaryCard
                    title="Results"
                    value={isLoading? <Loader/>:dashboard?.completedResultCount}
                    description="Completed results"
                    icon={Sun}
                    // onClick={openAssessmentHistory}
                />

            </section>


            <section className="mb-8">

                <StartAssessmentCard 
                    onClick={() => navigate("/assessments")}
                    isLoading  = {isLoading}
                />

            </section>


            <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

                <RecentAssessment
                    assessment={dashboard?.latestAssessment}
                    isLoading={isLoading}
                    // onClick={openAssessmentHistory}
                />


                <QuickActions
                     navigate  = {navigate}
                     isLoading = {isLoading}
                />

            </section>


            <section className="mb-8">

                <div className="mb-5">
                    <h2 className="text-lg font-bold text-slate-900"> Energy Overview </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Review energy consumption and solar
                        requirements from your assessments.
                    </p>
                </div>


                <div className="grid grid-cols-1 gap-6 ">

                    <button type="button"  className="rounded-2xl text-left">

                        <EnergyConsumptionChart/>

                    </button>


                    <button type="button"  className="rounded-2xl text-left">

                        <ApplianceUsageChart/>

                    </button>

                    <button type="button"  className="rounded-2xl text-left ">

                        <SolarSizingChart />

                    </button>

                </div>

            </section>


            <section>

                <PreviousAssessments
                    // assessments={completedAssessments}
                    // allAssessments={assessments}
                    isLoading={isLoading}
                  
                />

            </section>



        </main>

        </div>

    );
};