import { Search, Sparkles, ArrowUpRight } from "lucide-react";
import Button from "../../common/Button";
import useAddAppliances from "../../../contexts/ApplianceProvider";
import Sleep from "../../../utils/Sleep";


export default function ApplianceSearchBanner({setIsSearching}) {

    const {setAdd} = useAddAppliances();


    return (

        <Button
                type="button" 
                variant="primary"
                onClick={async() => {

                    setAdd(true);
                    await Sleep(1200)
                    setIsSearching(true);
                    setAdd(false);
                    
                }} 
                classname="group relative isolate w-full overflow-hidden rounded-3xl text-left transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 active:translate-y-0 motion-reduce:transition-none"
        >
            {/* Outer glow */}
            <div className="absolute -inset-1 -z-10 rounded-[1.7rem] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 opacity-40 blur-xl transition duration-500 group-hover:opacity-80" />

            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 px-5 py-6 shadow-[0_18px_45px_-15px_rgba(5,150,105,0.65)] sm:px-8 sm:py-8 lg:px-10">
               
                {/* Corner light */}
                <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-400/25 blur-3xl transition-colors duration-500 group-hover:bg-emerald-300/35" />

                {/* Fine grid texture, fades out toward the bottom */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

                {/* Shine sweep on hover */}
                <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100 motion-reduce:hidden" />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                        {/* Icon */}
                        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-emerald-500 to-teal-600 text-white shadow-[0_8px_25px_rgba(16,185,129,0.5)] ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
                            <Search size={32} strokeWidth={2.5} />
                            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-950 bg-amber-400 text-slate-950 shadow-lg">
                                <Sparkles size={14} strokeWidth={2.5} />
                            </span>
                        </div>

                        {/* Text */}
                        <div className="min-w-0">
                            <h2 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                                Find Your Appliances
                            </h2>
                            <p className="mt-1.5 max-w-md text-sm leading-6 text-emerald-100/75 sm:text-base">
                                Search our library and build your household energy profile.
                            </p>
                        </div>
                    </div>

                    {/* Action */}
                    <div className="flex shrink-0 items-center justify-between gap-3 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 px-5 py-4 text-white shadow-[0_8px_25px_rgba(16,185,129,0.35)] ring-1 ring-white/30 transition-shadow duration-300 group-hover:shadow-[0_0_35px_rgba(52,211,153,0.6)] sm:justify-center sm:px-6">
                        <span className="text-base font-extrabold">Search now</span>
                        <ArrowUpRight
                            size={24}
                            strokeWidth={2.5}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </div>
                    
                </div>

            </div>

        </Button>

    );
}