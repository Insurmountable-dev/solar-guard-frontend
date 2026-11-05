import { Check } from "lucide-react";

export default function ToggleCard({ name, checked = false, onChange, icon: Icon, title, description }) {

    return (

        <label className="block cursor-pointer">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="peer sr-only" 
            />


            
            <div
                className={[
                    "flex min-w-0 items-center gap-3 rounded-xl border-2 p-3 transition-all duration-200",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500 peer-focus-visible:ring-offset-2",
                    checked ? "border-emerald-500 bg-emerald-50/70 shadow-sm shadow-emerald-100" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                
                ].join(" ")}
            >



                {Icon && (
                    <span
                        aria-hidden="true"
                        className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                            checked
                                ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                                : "bg-slate-100 text-slate-500",
                        ].join(" ")}
                    >
                        <Icon size={17} strokeWidth={2.25} />
                    </span>
                )}

                <div className="min-w-0 flex-1">
                    <p
                        className={[
                            "truncate text-sm font-semibold",
                            checked ? "text-emerald-900" : "text-slate-800",
                        ].join(" ")}
                    >
                        {title}
                    </p>
                    {description && (
                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500 sm:text-xs">
                            {description}
                        </p>
                    )}
                </div>

                <span
                    aria-hidden="true"
                    className={[
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                        checked
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white text-transparent",
                    ].join(" ")}
                >
                    <Check size={12} strokeWidth={3.5} />
                </span>

            </div>

        </label>

    );
}