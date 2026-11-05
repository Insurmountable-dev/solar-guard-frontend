import { AlertCircle } from "lucide-react";

export default function ErrorCount({ attempted = false,errorCount = 0, text = "below"}) {
    
    const count = Math.max(0, Number(errorCount) || 0);

    if (!attempted || count <= 0) {
        return null;
    }

    return (
        <div
            role="alert"
            aria-live="assertive"
            className="flex min-w-0 mt-2 items-start gap-2.5 rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 to-white px-3 py-2 text-xs text-rose-800 shadow-sm shadow-rose-100/60 sm:items-center"
        >
            <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 ring-4 ring-rose-50 sm:h-7 sm:w-7"
            >
                <AlertCircle size={15} strokeWidth={2.25} />
            </span>

            <p className="min-w-0 leading-5">
                <span className="font-semibold text-rose-700">
                    {count} {count === 1 ? "error" : "errors"} found.
                </span>{" "}
                Please check the fields marked {text} before continuing.
            </p>
        </div>
    );
}