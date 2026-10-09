import { Check, Circle } from "lucide-react";
import {PASSWORD_RULES} from  "../../constants/passwordRules";



export const isPasswordValid = (value = "") =>PASSWORD_RULES.every((rule) => rule.test(value));
 
const getStrength = (passed, total) => {

    if (passed === total) return {
         label: "Strong",
         bar: "bg-emerald-500",
         text: "text-emerald-600" 
    };

    if (passed >= total - 1) return { 
        label: "Good",
        bar: "bg-lime-500",
        text: "text-lime-600"
    };

    if (passed >= 3) return {
        label: "Fair",
        bar: "bg-amber-500",
        text: "text-amber-600"
    };

    return { 
        label: "Weak",
        bar: "bg-rose-500",
        text: "text-rose-600"
    };
};


export default function PasswordRequirements({ password = "" }) {

    const results = PASSWORD_RULES.map((rule) => ({
        ...rule,
        passed: rule.test(password),
    }));

    const passedCount = results.filter((rule) => rule.passed).length;
    const total = results.length;
    const percent = (passedCount / total) * 100;
    const strength = getStrength(passedCount, total);
    const hasInput = password.length > 0;

    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                    Password requirements
                </span>
                <span className={`font-semibold ${hasInput ? strength.text : "text-slate-400"}`}>
                    {hasInput ? strength.label : `0 of ${total}`}
                </span>
            </div>

            <div
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={passedCount}
                aria-label="Password strength"
            >
                
            <div className={`h-full rounded-full transition-all duration-300 ${strength.bar}`} style={{ width: `${percent}%` }}/>
            </div>

            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                {results.map((rule) => (
                    <li
                        key={rule.id}
                        className={`flex items-center gap-2 text-sm transition-colors ${
                            rule.passed ? "text-emerald-600" : "text-slate-500"
                        }`}
                    >
                        {rule.passed ? (
                            <Check className="h-4 w-4 shrink-0" />
                        ) : (
                            <Circle className="h-4 w-4 shrink-0 text-slate-300" />
                        )}
                        {rule.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}