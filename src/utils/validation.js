export const validateRegisterForm = (formData) => {
    const errors = {};

    if (!formData.first_name.trim()) {
        errors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
        errors.last_name = "Last name is required";
    }

    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Enter a valid email address";
    }

    if (!formData.password) {
        errors.password = "Password is required";
    } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirm_password) {
        errors.confirm_password = "Please confirm your password";
    } else if (
        formData.password !== formData.confirm_password
    ) {
        errors.confirm_password = "Passwords do not match";
    }

    return errors;
};