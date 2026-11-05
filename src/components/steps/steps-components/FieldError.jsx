import { AlertCircle } from "lucide-react";

export default function FieldError({ message }) {
    if (!message) return null;

    return (
        <p
            role="alert"
            className="mt-1.5 flex items-start gap-1.5 text-xs font-medium leading-4 text-rose-600"
        >
            <AlertCircle
                size={13}
                strokeWidth={2.5}
                className="mt-px shrink-0"
                aria-hidden="true"
            />
            <span className="min-w-0">{message}</span>
        </p>
    );
}