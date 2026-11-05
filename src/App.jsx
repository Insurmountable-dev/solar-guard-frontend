import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";
import AssessmentPage from "./pages/AssessmentPage";
import AssessmentDraftPrompt from "./components/assessment/AssessmentDraftPrompt";
import ViewAssessmentPage from "./pages/ViewAssessmentPage";
import HouseholdsPages from "./pages/HouseholdsPages";

import useSearch from "./hooks/pages/useSearch";


import ProtectedRoute from "./routes/ProtectedRoute";
import AssessmentResultPage from "./pages/AssessmentResultPage";
import HouseholdDetailsPage from "./pages/HouseholdDetailsPage";


export default function App() {

  const {isSearching} = useSearch();

  return (
    <Routes>
      
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

     <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assessments" element={<AssessmentPage/>} />
        <Route path="/assessments-prompt" element={<AssessmentDraftPrompt/>} />
        <Route path="/view-assessments" element={<ViewAssessmentPage/>} />
        <Route path="/assessment-results" element={<AssessmentResultPage/>} />
        <Route path ="/households" element={<HouseholdsPages/>} />
        <Route path ="/households/:household_id" element={<HouseholdDetailsPage/>} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Routes>
  );
  
}