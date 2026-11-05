import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import FieldError from "./FieldError";

export default function CountStepper({ name, label, icon: Icon, hint, value, onChange, error, min = 0, max = 999, }) {

    const [n, setN] = useState(Number(value) || 0);
    const clamp = (v) => Math.min(max, Math.max(min, v));


    // Keep local state in sync with the parent (allows "" while typing)
    useEffect(() => {
        setN(value === "" ? "" : Number(value) || 0);
    }, [value]);

    const handleChange = (newValue) => {
        setN(newValue);
        onChange(name, newValue);
    };

    const current = Number(n) || 0;

    const stepBtn =
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-150 " +
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 " +
        "active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:active:scale-100 sm:h-10 sm:w-10";

    return (

        <div className="min-w-0">
            <label
                htmlFor={name}
                className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
                {Icon && (
                    <span
                        aria-hidden="true"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700"
                    >
                        <Icon size={14} strokeWidth={2.25} />
                    </span>
                )}
                <span className="truncate">{label}</span>
            </label>

            <div
                className={`flex items-center justify-between rounded-xl border bg-white p-1.5 transition-all duration-200 ${
                    error
                        ? "border-rose-300 ring-2 ring-rose-100"
                        : "border-slate-200 hover:border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/15"
                }`}
            >
                <button
                    type="button"
                    onClick={() => handleChange(clamp(current - 1))}
                    disabled={current <= min}
                    aria-label={`Decrease ${label.toLowerCase()}`}
                    className={`${stepBtn} bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800`}
                >
                    <Minus size={16} strokeWidth={2.75} aria-hidden="true" />
                </button>

                <input
                    id={name}
                    name={name}
                    type="number"
                    inputMode="numeric"
                    min={min}
                    max={max}
                    value={n}
                    aria-invalid={error ? "true" : undefined}
                    onChange={(e) => {
                        const inputValue = e.target.value;

                        if (inputValue === "") {
                            setN("");
                            onChange(name, "");
                            return;
                        }

                        handleChange(clamp(parseInt(inputValue, 10) || 0));
                    }}

                    onBlur={() => {
                        if (n === "" || Number(n) < min) {
                            handleChange(min);
                        }
                    }}

                    className="w-14 min-w-0 bg-transparent text-center text-lg font-bold tabular-nums text-slate-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                    type="button"
                    onClick={() => handleChange(clamp(current + 1))}
                    disabled={current >= max}
                    aria-label={`Increase ${label.toLowerCase()}`}
                    className={`${stepBtn} bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-200 hover:from-emerald-600 hover:to-teal-700`}
                >
                    <Plus size={16} strokeWidth={2.75} aria-hidden="true" />
                </button>
            </div>

            {hint && !error && (
                <p className="mt-1.5 px-0.5 text-[11px] leading-4 text-slate-500 sm:text-xs">{hint}</p>
            )}

            <FieldError message={error} />
        </div>

    );
}