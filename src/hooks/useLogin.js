import { useState } from "react";
import { loginUser } from "../services/authService";

const initialFormData = {
    email: "",
    password: ""
};

export const useLogin = (onSuccess) => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));

        setErrors((current) => ({
            ...current,
            [name]: ""
        }));

        setServerError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = "Email is required";
        }

        if (!formData.password) {
            validationErrors.password = "Password is required";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsLoading(true);
        setServerError("");

        try {
            const data = await loginUser(formData);

            if (onSuccess) {
                onSuccess(data);
            }
        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        serverError,
        isLoading,
        handleChange,
        handleSubmit
    };
};