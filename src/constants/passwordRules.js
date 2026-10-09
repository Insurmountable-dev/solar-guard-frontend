
export const PASSWORD_RULES = [
    {
        id: "length",
        label: "At least 6 characters",
        test: (value) => value.length >= 6,
    },
    {
        id: "uppercase",
        label: "One uppercase letter (A-Z)",
        test: (value) => /[A-Z]/.test(value),
    },
    {
        id: "lowercase",
        label: "One lowercase letter (a-z)",
        test: (value) => /[a-z]/.test(value),
    },
    {
        id: "number",
        label: "One number (0-9)",
        test: (value) => /[0-9]/.test(value),
    },
    {
        id: "special",
        label: "One special character (!@#$%...)",
        test: (value) => /[^A-Za-z0-9]/.test(value),
    },
];