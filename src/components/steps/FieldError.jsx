import { AlertCircle } from "lucide-react";

export default function FieldError({ message }) {

    if (!message) return null;
    return (
        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {message} 
        </p>
    );
    
};