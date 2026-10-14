import { CheckCircle2 } from "lucide-react";

export default function SectionCard({ icon: Icon, title, description, required, complete, children }) {

    return (

        <section className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05),0_8px_24px_-12px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_40px_-16px_rgba(5,150,105,0.25)]">

            {/* Emerald accent edge */}
            <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-500 via-emerald-600 to-teal-600" />

            {/* Soft decorative glow, top-right */}
            <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl transition duration-300 group-hover:bg-emerald-500/10" />

            <header className="relative flex items-start gap-4 px-6 pb-5 pt-6 sm:px-8 sm:pt-7">

                {/* Gradient icon tile */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-600/20">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold tracking-tight text-slate-900">{title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-500">{description}</p>
                </div>

                {/* Status badge */}
                {complete ? (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 py-1 pl-2 pr-2.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Done
                    </span>
                ) : required ? (
                    <span className="shrink-0 rounded-full bg-amber-50 py-1 pl-2 pr-2.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        Required
                    </span>
                ) : (
                    <span className="shrink-0 rounded-full bg-slate-100 py-1 px-2.5 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-200">
                        Optional
                    </span>
                )}

            </header>

            {/* Content */}
            <div className="relative px-6 pb-6 sm:px-8 sm:pb-7">
                {children}
            </div>

        </section>
    );
}