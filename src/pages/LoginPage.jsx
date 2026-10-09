import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import LoginForm from "../components/auth/LoginForm";
import AuthHeader from "../components/auth/AuthHeader";
import AuthBrandPanel from "../components/auth/AuthBrandPanel";
import { useAuth } from "../contexts/AuthProvider";



export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLoginSuccess = (authData) => {


        login(authData );
        navigate("/dashboard")

    };


    return (

        <div className="min-h-screen bg-slate-50">

            <AuthHeader/>

            <main className="px-4 py-10 sm:px-6">

                <div className="mx-auto max-w-5xl">

                    <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">

                     <AuthBrandPanel mode = "login" />


                        <div className="flex items-center p-6 sm:p-10">

                            <div className="w-full">

                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold tracking-tight text-slate-900"> Welcome back</h2>
                                    <p className="mt-2 text-sm text-slate-500"> Sign in to continue to Solar Guard.</p>
                                </div>

                                <LoginForm
                                    onSuccess    = {handleLoginSuccess}
                                    navigate     = {navigate}
                                />

                            </div>

                        </div>

                    </div>

                    <p className="mt-6 text-center text-xs text-slate-400">Solar Guard • Solar System Sizing & Assessment</p>

                </div>

            </main>

        </div>
    );

}