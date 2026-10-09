import { useNavigate } from "react-router-dom";
import {Sun, ShieldCheck, ArrowLeft} from "lucide-react";
import RegisterForm from "../components/auth/RegisterForm";
import AuthHeader from "../components/auth/AuthHeader";
import AuthBrandPanel from "../components/auth/AuthBrandPanel";



export default function RegisterPage() {

    const navigate = useNavigate();

    const handleRegisterSuccess = (authData) => {

        console.log("Registration successful:", authData);

        navigate("/login");

    };


    return (
        <div className="min-h-screen bg-slate-50">

            <AuthHeader/>

            <main className="px-4 py-10 sm:px-6">

                <div className="mx-auto max-w-5xl">

                    <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">

                           <AuthBrandPanel mode = "register" />


                        <div className="p-6 sm:p-10">

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
                            >

                                <ArrowLeft
                                    className="h-4 w-4"
                                />

                                Back to login

                            </button>


                            <div className="mb-8">

                                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Create your account
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Enter your details to get started with
                                    Solar Guard.
                                </p>

                            </div>


                            <RegisterForm
                                onSuccess = {handleRegisterSuccess}
                                navigate  = {navigate}
                            />

                        </div>

                    </div>


                    <p className="mt-6 text-center text-xs text-slate-400">
                        Solar Guard • Solar System Sizing & Assessment
                    </p>

                </div>

            </main>

        </div>
    );

}