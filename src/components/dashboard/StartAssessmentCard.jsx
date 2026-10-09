import { Sun, ArrowRight, Home, Plug, Gauge } from "lucide-react";

const STEPS = [
    { icon: Home, label: "Your home" },
    { icon: Plug, label: "Your appliances" },
    { icon: Gauge, label: "System size" }
];

function StartAssessmentCard({onClick}) {
    return (

        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            {/* soft glow in the corner */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-green-100 opacity-70 blur-3xl"/>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
                {/* icon + text */}
                <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 ring-8 ring-green-50/60 sm:h-16 sm:w-16">
                        <Sun size={30} strokeWidth={2}className="text-green-600"/>
                    </div>

                    <div className="min-w-0">

                        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"> Start your solar assessment</h2>

                        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
                            Tell us about your home and appliances so we can
                            calculate a suitable solar system for you.
                        </p>

                        <ul className="mt-4 flex flex-wrap gap-2">

                            {STEPS.map(({ icon: Icon, label }) => (
                                <li key={label}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                                 >
                                    <Icon size={14} className="text-green-600" />
                                    {label}
                                </li>
                            ))}

                        </ul>

                    </div>

                </div>

                {/* action: full width on mobile, natural width on desktop */}
                <button type="button" onClick={onClick} 
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-200 active:scale-[0.98] lg:w-auto lg:shrink-0"
                 >
                    Start assessment
                    <ArrowRight size={18}  className="transition-transform group-hover:translate-x-0.5"/>

                </button>

            </div>

        </div>
    );
}

export default StartAssessmentCard;