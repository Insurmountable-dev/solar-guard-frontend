import { useState } from "react";
import { registerUser } from "../services/authServices";
import { validateRegisterForm } from "../utils/validation";

const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    county: "",
    town: "",
    password: "",
    confirm_password: ""
};

export const useRegister = (onSuccess) => {
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

        const validationErrors = validateRegisterForm(formData);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsLoading(true);
        setServerError("");

        try {
            const {
                confirm_password,
                ...userData
            } = formData;

            const data = await registerUser(userData);

            if (onSuccess) {
                onSuccess(data);
            }
        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                error.message ||
                "Registration failed"
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