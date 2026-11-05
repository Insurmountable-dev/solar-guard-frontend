import   ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { AppliancesProvider } from "./contexts/ApplianceProvider";
import { NavigationProvider } from "./contexts/NavigationProvider";

import "./index.css";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(

    <StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <NavigationProvider >

                    <AppliancesProvider>

                        <App />

                    </AppliancesProvider>

                </NavigationProvider>

            </AuthProvider>

        </BrowserRouter>

    </StrictMode>

);