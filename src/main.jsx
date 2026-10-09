import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider";
import "./index.css";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(

    <StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <App />

            </AuthProvider>

        </BrowserRouter>

    </StrictMode>

);