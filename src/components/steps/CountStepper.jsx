import { Minus, Plus } from "lucide-react";
import FieldError from "./FieldError";
import { useState, useEffect } from "react";

export default function CountStepper({ name, label, icon: Icon, hint, value, onChange, error }) {

    const [n, setN] = useState(Number(value) || 0);

    useEffect(() => {

        setN((value === "") ? "" : Number(value) || 0);

    }, [value]);

    const handleChange = (newValue) => {
        setN(newValue);
        onChange(name, newValue);
    };

    return (

        <div>
            <label htmlFor={name} className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Icon className="h-4 w-4 text-slate-400" />
                {label}
            </label>

            <div
                className={`flex items-center justify-between rounded-xl border bg-white p-1.5 transition ${
                    error
                        ? "border-rose-300 ring-1 ring-rose-200"
                        : "border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20"
                }`}
            >
                <button
                    type="button"
                    onClick={() => handleChange(Math.max(0, (Number(n) || 0) - 1))}
                    disabled={Number(n) <= 0}
                    aria-label={`Decrease ${label.toLowerCase()}`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                    <Minus className="h-4 w-4" />
                </button>

                <input
                    id={name}
                    name={name}
                    type="number"
                    inputMode="numeric"
                    min="1"
                    value={n}
                    onChange={(e) => {
                        const inputValue = e.target.value;

                        if (inputValue === "") {
                            setN("");
                            onChange(name, "");
                            return;
                        }

                        handleChange(Math.max(0, parseInt(inputValue, 10) || 0));
                    }}
                    onBlur={() => {
                        if (n === "" || Number(n) < 0) {
                            handleChange(0);
                        }
                    }}
                    className="w-14 bg-transparent text-center text-lg font-semibold text-slate-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                    type="button"
                    onClick={() => handleChange((Number(n) || 0) + 1)}
                    aria-label={`Increase ${label.toLowerCase()}`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            {hint && !error && (
                <p className="mt-1.5 text-xs text-slate-500">
                    {hint}
                </p>
            )}

            <FieldError message={error} />
        </div>

    );
}