import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { SkeletonCard } from "../components/ui/Skeleton";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useNavigation from "../contexts/NavigationProvider";
import { useNavigate } from "react-router-dom";
import Sleep from "../utils/Sleep";

export default function ProtectedRoute() {

    const navigate = useNavigate();

    const { isAuthenticated, isLoading } = useAuth();
    const {showLoaderApp, loadingMessages, pathname, setShowLoaderApp, navigationData} = useNavigation();



    if (isLoading) {
        return;
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    };

    if(showLoaderApp) {

        return  (    
           <>
                <LoadingSpinner
                    fullPage
                    size="md"
                    messages={loadingMessages}
                    interval={1500}
                    autoClose
                    closeDelay={500}
                    onClose={async() => {
                        navigate(pathname, {
                            state:navigationData
                        })

                        await Sleep(1000);
                        setShowLoaderApp(false)

                    }}
                />

                <Outlet/>
                
            </>
        )

    };

    return <Outlet/>;
};