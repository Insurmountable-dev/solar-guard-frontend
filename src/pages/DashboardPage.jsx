import {useEffect,useState} from "react";
import useAssessments from "../hooks/pages/useAssessments";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentAssessment from "../components/dashboard/RecentAssessment";
import QuickActions from "../components/dashboard/QuickActions";
import StartAssessmentCard from "../components/dashboard/StartAssessmentCard";

// Charts
import EnergyConsumptionChart from "../components/dashboard/charts/energy/EnergyConsumptionChart";
import ApplianceUsageChart from "../components/dashboard/charts/appliance/ApplianceUsageChart";
import SolarSizingChart from "../components/dashboard/charts/solar/SolarSizingChart";

import {Home, Plug, ClipboardList,Sun} from "lucide-react";
import { getDashboard } from "../services/pages/dashBoardService";
import Loader from "../components/ui/Loader";
import Sleep from "../utils/Sleep";
import Footer from "../components/footer/Footer";


export default function DashboardPage({onNavigate}) {

    const [dashboard, setDashboard]  = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { hasDraft } = useAssessments();
    const path = hasDraft ? "/assessments-prompt" : "/assessments";


    // Fetch Dashboard Data
    useEffect(() => {

        async function loadDashboardData(){

            try{

                const response = await getDashboard();
                setDashboard(response);
                setError("");

                await Sleep(1800);

            }catch(error){

                setError(error.message || "Failed To Load Dashboard Data");
                console.error("Error Fetching Dashboard Details", error);

            }finally{

                setIsLoading(false);

            };

        };

        loadDashboardData();

    },[]);


    return (

        <div className="min-h-screen bg-slate-50">

            <DashboardHeader
                isLoading = {isLoading}
            />

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

                {/* Dashboard Introduction */}
                <section className="mb-8">

                    <h1 className="text-2xl font-bold text-slate-900">
                        Solar Guard Dashboard
                    </h1>

                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                        Monitor your households, appliances, solar assessments,
                        and system requirements.
                    </p>

                </section>


                {/* Dashboard Error */}
                {error && (

                    <div
                        role="alert"
                        className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                    >

                        <p className="text-sm font-medium text-red-600">
                            {error}
                        </p>

                    </div>

                )}


                {/* Summary Cards */}
                <section
                    aria-label="Dashboard Summary"
                    className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >

                    <SummaryCard
                        title="Households"
                        value={isLoading ? <Loader/> : dashboard?.householdsCount}
                        description="Registered households"
                        icon={Home}
                    />

                    <SummaryCard
                        title="Appliances"
                        value={isLoading ? <Loader/> : dashboard?.applianceCount}
                        description="Household appliances"
                        icon={Plug}
                    />

                    <SummaryCard
                        title="Assessments"
                        value={isLoading ? <Loader/> : dashboard?.assessmentCount}
                        description="Solar assessments"
                        icon={ClipboardList}
                    />

                    <SummaryCard
                        title="Results"
                        value={isLoading ? <Loader/> : dashboard?.completedResultCount}
                        description="Completed results"
                        icon={Sun}
                    />

                </section>


                {/* Start Assessment */}
                <section className="mb-8">

                    <StartAssessmentCard
                        onClick={() => navigate(path)}
                        isLoading = {isLoading}
                    />

                </section>


                {/* Recent Assessment and Quick Actions */}
                <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

                    <RecentAssessment
                        assessment={dashboard?.latestAssessment}
                        isLoading={isLoading}
                        // onClick={openAssessmentHistory}
                    />

                    <QuickActions
                        navigate={navigate}
                        isLoading={isLoading}
                        path={path}
                    />

                </section>


                {/* Energy Overview */}
                <section className="mb-8">

                    <div className="mb-5">

                        <h2 className="text-lg font-bold text-slate-900">
                            Energy Overview
                        </h2>

                        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                            Review energy consumption and solar requirements
                            from your assessments.
                        </p>

                    </div>


                    {/* Energy Consumption Chart */}
                    <div className="mb-6 min-w-0 rounded-2xl">

                        <EnergyConsumptionChart/>

                    </div>


                    {/* Appliance Usage Chart */}
                    <div className="mb-6 min-w-0 rounded-2xl">

                        <ApplianceUsageChart/>

                    </div>


                    {/* Solar Sizing Chart */}
                    <div className="min-w-0 rounded-2xl">

                        <SolarSizingChart/>

                    </div>

                </section>

                

            </main>

            <Footer/>

        </div>

    );

};