import React, {
    useEffect,
    useState
} from "react";

import {
    useAuth
} from "./contexts/AuthContext";

import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";

import DashboardPage from "./components/dashboard/DashboardPage";
import HouseholdPage from "./components/household/HouseholdPage";
import AppliancePage from "./components/appliance/AppliancePage";
import AssessmentPage from "./components/assessment/AssessmentPage";


export default function App() {

    const {
        isAuthenticated,
        login
    } = useAuth();


    const [
        currentView,
        setCurrentView
    ] = useState(() => {

        return (
            sessionStorage.getItem(
                "solarGuardView"
            ) || "dashboard"
        );

    });


    const [
        currentAssessment,
        setCurrentAssessment
    ] = useState(null);


    useEffect(() => {

        sessionStorage.setItem(
            "solarGuardView",
            currentView
        );

    }, [currentView]);


    const navigate = (
        view
    ) => {

        setCurrentView(view);

    };


    const handleLoginSuccess = (
        authData
    ) => {

        console.log(
            "LOGIN SUCCESS:",
            authData
        );


        login(
            authData
        );


        setCurrentView(
            "dashboard"
        );

    };


    const handleRegisterSuccess = (
        authData
    ) => {

        login(
            authData
        );


        setCurrentView(
            "dashboard"
        );

    };


    const handleAssessmentCreated = (
        assessment
    ) => {

        setCurrentAssessment(
            assessment
        );


        setCurrentView(
            "assessments"
        );

    };


    if (!isAuthenticated) {

        if (
            currentView === "register"
        ) {

            return (
                <RegisterPage
                    onSuccess={
                        handleRegisterSuccess
                    }
                    onLogin={() =>
                        setCurrentView(
                            "login"
                        )
                    }
                />
            );

        }


        return (
            <LoginPage
                onSuccess={
                    handleLoginSuccess
                }
                onRegister={() =>
                    setCurrentView(
                        "register"
                    )
                }
                onForgotPassword={() => {
                    console.log(
                        "Forgot password clicked"
                    );
                }}
            />
        );

    }


    switch (currentView) {

        case "dashboard":

            return (
                <DashboardPage
                    onNavigate={
                        navigate
                    }
                />
            );


        case "households":

            return (
                <HouseholdPage
                    onNavigate={
                        navigate
                    }
                    onAssessmentCreated={
                        handleAssessmentCreated
                    }
                />
            );


        case "appliances":

            return (
                <AppliancePage
                    onNavigate={
                        navigate
                    }
                />
            );


        case "assessments":

            return (
                <AssessmentPage
                    onNavigate={
                        navigate
                    }
                    initialAssessment={
                        currentAssessment
                    }
                />
            );


        default:

            return (
                <DashboardPage
                    onNavigate={
                        navigate
                    }
                />
            );

    }

}