import React, {
    useEffect,
    useState
} from "react";

import DashboardHeader from "./DashboardHeader";
import SummaryCard from "./SummaryCard";
import RecentAssessment from "./RecentAssessment";
import QuickActions from "./QuickActions";

import EnergyConsumptionChart from "./charts/EnergyConsumptionChart";
import ApplianceUsageChart from "./charts/ApplianceUsageChart";
import SolarSizingChart from "./charts/SolarSizingChart";

import { getDashboard } from "../../services/dashboardService";

export default function DashboardPage({
    onNavigate
}) {
    const [
        dashboardData,
        setDashboardData
    ] = useState({
        households: [],
        applianceCount: 0,
        assessmentCount: 0,
        completedResultCount: 0,
        latestAssessment: null,
        applianceEnergy: []
    });

    const [
        isLoading,
        setIsLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");

    useEffect(() => {

        const loadDashboardData =
            async () => {

                try {

                    setIsLoading(true);
                    setError("");

                    const data =
                        await getDashboard();

                    setDashboardData(
                        data
                    );

                } catch (error) {

                    console.error(
                        "Dashboard data error:",
                        error
                    );

                    setError(
                        error.response?.data?.message ||
                        "Failed to load dashboard data."
                    );

                } finally {

                    setIsLoading(false);

                }
            };

        loadDashboardData();

    }, []);

    const {
        households = [],
        applianceCount = 0,
        assessmentCount = 0,
        completedResultCount = 0,
        latestAssessment = null,
        applianceEnergy = []
    } = dashboardData;

    return (
        <div className="min-h-screen bg-slate-50">

            <DashboardHeader />

            <main className="mx-auto max-w-7xl px-6 py-8">

                <div className="mb-8">

                    <h1 className="text-2xl font-bold text-slate-900">
                        Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Monitor your household energy and solar assessments.
                    </p>

                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">

                        <p className="text-sm font-medium text-rose-600">
                            {error}
                        </p>

                    </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <SummaryCard
                        title="Households"
                        value={
                            isLoading
                                ? "..."
                                : households.length
                        }
                        description="Your registered households"
                        onClick={() =>
                            onNavigate(
                                "households"
                            )
                        }
                    />

                    <SummaryCard
                        title="Appliances"
                        value={
                            isLoading
                                ? "..."
                                : applianceCount
                        }
                        description="Household appliances"
                        onClick={() =>
                            onNavigate(
                                "appliances"
                            )
                        }
                    />

                    <SummaryCard
                        title="Assessments"
                        value={
                            isLoading
                                ? "..."
                                : assessmentCount
                        }
                        description="Solar assessments"
                        onClick={() =>
                            onNavigate(
                                "assessments"
                            )
                        }
                    />

                    <SummaryCard
                        title="Results"
                        value={
                            isLoading
                                ? "..."
                                : completedResultCount
                        }
                        description="Completed calculations"
                        onClick={() =>
                            onNavigate(
                                "assessments"
                            )
                        }
                    />

                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

                    <div className="lg:col-span-2">

                        <RecentAssessment
                            assessment={
                                latestAssessment
                            }
                            onClick={() =>
                                onNavigate(
                                    "assessments"
                                )
                            }
                        />

                    </div>

                    <div>

                        <QuickActions
                            onNewAssessment={() =>
                                onNavigate(
                                    "assessments"
                                )
                            }
                            onHousehold={() =>
                                onNavigate(
                                    "households"
                                )
                            }
                            onAppliances={() =>
                                onNavigate(
                                    "appliances"
                                )
                            }
                            onAssessments={() =>
                                onNavigate(
                                    "assessments"
                                )
                            }
                        />

                    </div>

                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

                    <ClickableChart
                        title="Energy Consumption"
                        onClick={() =>
                            onNavigate(
                                "assessments"
                            )
                        }
                    >
                        <EnergyConsumptionChart
                            assessment={
                                latestAssessment
                            }
                        />
                    </ClickableChart>

                    <ClickableChart
                        title="Appliance Usage"
                        onClick={() =>
                            onNavigate(
                                "appliances"
                            )
                        }
                    >
                        <ApplianceUsageChart
                            data={
                                applianceEnergy
                            }
                        />
                    </ClickableChart>

                </div>

                <div className="mt-8">

                    <ClickableChart
                        title="Solar Sizing"
                        onClick={() =>
                            onNavigate(
                                "assessments"
                            )
                        }
                    >
                        <SolarSizingChart
                            assessment={
                                latestAssessment
                            }
                        />
                    </ClickableChart>

                </div>

            </main>

        </div>
    );
}

function ClickableChart({
    title,
    onClick,
    children
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full rounded-2xl text-left transition hover:-translate-y-0.5"
            aria-label={`Open ${title}`}
        >
            <div className="pointer-events-none transition group-hover:shadow-lg">
                {children}
            </div>
        </button>
    );
}