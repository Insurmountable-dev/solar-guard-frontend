import React from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Lock
} from "lucide-react";

import InputField from "../common/InputField";
import Button from "../common/Button";
import { useRegister } from "../../hooks/useRegister";

export default function RegisterForm({
    onSuccess,
    onLogin
}) {
    const {
        formData,
        errors,
        serverError,
        isLoading,
        handleChange,
        handleSubmit
    } = useRegister(onSuccess);

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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                    label="First Name"
                    name="first_name"
                    placeholder="Enter your first name"
                    value={formData.first_name}
                    onChange={handleChange}
                    error={errors.first_name}
                    required
                    icon={User}
                />

                <InputField
                    label="Last Name"
                    name="last_name"
                    placeholder="Enter your last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    error={errors.last_name}
                    required
                    icon={User}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    label="Phone Number"
                    name="phone_number"
                    type="tel"
                    placeholder="e.g. 0712345678"
                    value={formData.phone_number}
                    onChange={handleChange}
                    icon={Phone}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                    label="County"
                    name="county"
                    placeholder="e.g. Uasin Gishu"
                    value={formData.county}
                    onChange={handleChange}
                    icon={MapPin}
                />

                <InputField
                    label="Town"
                    name="town"
                    placeholder="e.g. Eldoret"
                    value={formData.town}
                    onChange={handleChange}
                    icon={MapPin}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                    icon={Lock}
                />

                <InputField
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    error={errors.confirm_password}
                    required
                    icon={Lock}
                />
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full"
            >
                Create Account
            </Button>

            <div className="text-center">
                <p className="text-sm text-slate-500">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={onLogin}
                        className="font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </form>
    );
}