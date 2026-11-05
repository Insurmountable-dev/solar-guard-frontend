import { LayoutDashboard, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useNavigation from "../../../contexts/NavigationProvider";

export default function LatestActions({
    disabled
}) {

    const navigate = useNavigate();

    const {setShowFinishModal} = useNavigation();

    return (

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

            <button
                type="button"
                onClick={() => navigate("/dashboard")}
                disabled={disabled}
                className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <LayoutDashboard size={18} aria-hidden="true" className="text-slate-500 transition group-hover:text-slate-800" />
                Back to dashboard
            </button>
 
            <button
                type="button"
                onClick={() =>setShowFinishModal(true)}
                disabled={disabled}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/30 transition hover:bg-amber-300 hover:shadow-amber-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
            >
                    <CheckCircle2 size={18} aria-hidden="true" />
                        Finish assessment
                    <ArrowRight
                        size={18}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
            </button>
        </div>
    );
}