import { Sun, Sunrise, Sunset, Zap } from "lucide-react";
import SunSvg from "./SunSvg";

export default function SunPath({
     values = []
}) {

    return (
        <section className="relative isolate overflow-hidden mt-12 rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-6 py-8 text-white shadow-2xl sm:px-8">

            {/* Background atmosphere */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"/>
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"/>

            <div className="relative">

                {/* Heading */}
                <div className="flex items-center justify-between gap-4">

                    <div>

                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200/70">Solar energy</p>
                        <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">Your daily sunlight</h2>

                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-blue-200">
                        <Zap size={21} />
                    </div>

                </div>

                {/* Sun path illustration */}
                <div className="relative mx-auto mt-7 h-44 w-full max-w-sm overflow-hidden" role="img" aria-label="Illustration of the sun travelling across the sky">
                  
                      <SunSvg/>
                  

                    {/* Sun glow — background is limited to the sun */}
                    <div className="absolute left-1/2 top-[55px] -translate-x-1/2">

                        <div
                            aria-hidden="true"
                            className="absolute -inset-5 rounded-full bg-amber-400/20 blur-2xl"
                        />

                        <div className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full border border-amber-200/40 bg-gradient-to-br from-amber-200/30 to-orange-400/20 shadow-[0_0_35px_rgba(251,191,36,0.18)]">
                            <Sun
                                size={35}
                                strokeWidth={1.5}
                                className="text-amber-300"
                            />
                        </div>
                    </div>

                    {/* Sunrise marker */}
                    <div className="absolute bottom-0 left-2 flex items-center gap-2 text-blue-200/80">
                        <Sunrise size={19} strokeWidth={1.6} />
                        <span className="text-xs">Sunrise</span>
                    </div>

                    {/* Sunset marker */}
                    <div className="absolute bottom-0 right-2 flex items-center gap-2 text-blue-200/80">
                        <span className="text-xs">Sunset</span>
                        <Sunset size={19} strokeWidth={1.6} />
                    </div>
                </div>

                {/* Daily energy display */}
               
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {values.map((v, index) => (

                            <div key={v.label ?? index} className="mt-5 min-w-0 rounded-2xl border border-white/10 bg-white/5 p-5">
                                
                                <p className="text-sm text-blue-100/65"> {v.label} </p>

                                <div className="mt-2 flex flex-wrap items-baseline gap-x-2">

                                    <span className="text-4xl font-semibold tracking-tight text-white tabular-nums sm:text-5xl">
                                        {Number(v.value ?? dailyEnergy).toFixed(2)}
                                    </span>

                                    <span className="text-lg font-medium text-amber-300">
                                        {v.unit ?? "kWh/day"}
                                    </span>

                                </div>

                                <p className="mt-3 text-sm leading-6 text-blue-100/65">

                                    {v.description ?? "A clearer picture of your household's energy needs, helping guide your solar system sizing."}

                                </p>

                            </div>
                        ))}

            </section>

               

            </div>

        </section>
    );
}