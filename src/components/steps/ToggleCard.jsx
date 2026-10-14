import InputField from "../common/inputField";



export default function ToggleCard({ name, checked, onChange, icon: Icon, title, description }) {
    return (

        <label
            className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-200 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 ${
                checked
                    ? "border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500"
                    : "border-slate-200 bg-white hover:border-slate-300"
            }`}
        >
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    checked ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                }`}
            >
                <Icon className="h-6 w-6" />
            </div>

            <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${checked ? "text-emerald-950" : "text-slate-900"}`}>{title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{description}</p>
            </div>

            <span
                aria-hidden="true"
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-emerald-600" : "bg-slate-300"}`}
            >
                <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                        checked ? "left-[22px]" : "left-0.5"
                    }`}
                />
            </span>

            <InputField
                type="checkbox"
                role="switch"
                name={name}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
        </label>

    );
}