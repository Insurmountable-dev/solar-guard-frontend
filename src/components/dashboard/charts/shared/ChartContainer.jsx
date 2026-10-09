import { Home, ChevronLeft, ChevronRight } from "lucide-react";

export default function ChartContainer({title, subtitle, actions, onPrev, onNext, prevDisabled = false, nextDisabled = false, navLabel,  glow = "bg-green-100/70", household, children,}) {
   
    const showNav = Boolean(onPrev || onNext);
    const navBtn = "inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600";



   return (

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)] sm:p-7">
            
             <div aria-hidden="true" className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl ${glow}`}/>


            <div className="relative">

                <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-start">

                    <div className="min-w-0 sm:col-start-1">

                        <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h3>
                        {subtitle && (<p className="mt-1 text-sm text-slate-500">{subtitle}</p>)}

                    </div>

                    {household && (

                        <div className="flex justify-center sm:col-start-2 sm:self-center">

                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 py-1.5 pl-1.5 pr-3.5 text-sm font-semibold text-emerald-800 shadow-sm">

                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                                    <Home className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                                </span>
                                {household}

                            </span>
                        </div>

                    )}


                    {(showNav || actions) && (

                        <div className="flex shrink-0 items-center gap-2 sm:col-start-3 sm:justify-self-end">

                            {showNav && (
                                <>
                                    <button
                                        type="button"
                                        onClick={onPrev}
                                        disabled={prevDisabled || !onPrev}
                                        aria-label="Previous"
                                        className={navBtn}
                                    >
                                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />

                                    </button>

                                    {navLabel && (

                                        <span className="min-w-[5rem] text-center text-sm font-medium text-slate-600">
                                            {navLabel}
                                        </span>

                                    )}

                                    <button
                                        type="button"
                                        onClick={onNext}
                                        disabled={nextDisabled || !onNext}
                                        aria-label="Next"
                                        className={navBtn}
                                    >

                                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                        
                                    </button>
                                </>
                            )}

                            {actions}

                        </div>

                    )}


                </div>

                <div className="mt-5">{children}</div>
            </div>

        </div>

    );
}