
import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";

function ConnectionStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };

    }, []);

    return (

        <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${
                isOnline
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
            }`}
        >
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}

            <span>{isOnline ? "Online" : "Offline"}</span>
            
        </div>
    );
}

export default ConnectionStatus;
