import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { SkeletonCard } from "../components/ui/Skeleton";

export default function ProtectedRoute() {

    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <SkeletonCard/>;
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    };

    return <Outlet/>;
};