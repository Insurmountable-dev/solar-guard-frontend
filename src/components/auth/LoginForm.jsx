import { Link } from "react-router-dom";
import { Mail,Lock } from "lucide-react";
import Button from "../common/Button";
import InputField from "../common/inputField";
import { useLogin } from "../../hooks/auth/useLogin";

export default function LoginForm({ onSuccess}) {

    const {formData, errors, serverError, isLoading, handleChange, handleSubmit } = useLogin(onSuccess);

    return (

        <form onSubmit = {handleSubmit} className="space-y-5" >

            {/* Displays Sever Error If It Exists */}
            {serverError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                    <p className="text-sm font-medium text-rose-600">
                        {serverError}
                    </p>
                </div>
            )}

        
           <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                icon={Mail}
            />

            <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                icon={Lock}
            />


            {/* Forgot Password */}
            
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => {
                        alert("Forgot Password Coming Soon")
                    }}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                 Forgot password?
                </button>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
            >
                Sign In
            </Button>

            <div className="text-center">
                <p className="text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link to ="/register"
                        type="button"
                        className="font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                        Create an account
                    </Link>
                </p>
            </div>
        </form>
    );
}