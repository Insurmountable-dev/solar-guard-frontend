import { ShieldCheck } from "lucide-react";
import {CONTENT, FEATURES} from "../../config/authBrandPanel";



export default function AuthBrandPanel({ mode = "login" }) {


    const { title, description } = CONTENT[mode] ?? CONTENT.login;

    return (

        <div className="hidden bg-slate-900 p-10 lg:flex lg:flex-col lg:justify-between">

            <div>
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">
                    <ShieldCheck className="h-6 w-6 text-white" />
                </div>

                <h2 className="max-w-md text-3xl font-bold leading-tight text-white">
                    {title}
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                    {description}
                </p>

            </div>

            <ul className="mt-10 space-y-3">

                {FEATURES.map((feature,i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        {feature}
                    </li>
                ))}

            </ul>
        </div>
    );
}

// Usage:
// <AuthBrandPanel mode="login" />
// <AuthBrandPanel mode="register" />