import React from "react";
import {
    Mail,
    Lock
} from "lucide-react";

import InputField from "../common/InputField";
import Button from "../common/Button";
import { useLogin } from "../../hooks/useLogin";

export default function LoginForm({
    onSuccess,
    onRegister,
    onForgotPassword
}) {
    const {
        formData,
        errors,
        serverError,
        isLoading,
        handleChange,
        handleSubmit
    } = useLogin(onSuccess);

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
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
                placeholder="you@example.com"
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

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onForgotPassword}
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
                    <button
                        type="button"
                        onClick={onRegister}
                        className="font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                        Create an account
                    </button>
                </p>
            </div>
        </form>
    );
}