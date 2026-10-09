import { Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// import AppliancePage from "./components/appliance/AppliancePage";
// import AssessmentPage from "./components/assessment/AssessmentPage";
// import HouseholdPage from "./components/household/HouseholdPage";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route path="/households" element={<HouseholdPage />} />
        <Route path="/appliances" element={<AppliancePage />} />
        <Route path="/assessments" element={<AssessmentPage />} /> */}
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Routes>
  );
}