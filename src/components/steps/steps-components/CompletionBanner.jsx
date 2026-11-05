import { GridTexture, PanelGlows, CornerTicks } from "../review-components/DecorativeComponents"
import { ClipboardCheck, CheckCircle2 } from "lucide-react";

export default function CompletionBanner ({
    title,
    description,
}) {

    return (

        <div className="relative flex min-w-0 items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 p-5 text-white shadow-[0_20px_40px_-20px_rgba(16,185,129,0.8)] sm:items-center sm:gap-5 sm:p-7">

                <GridTexture />
                <PanelGlows />
                <CornerTicks />

                <div aria-hidden="true" className="relative flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                    <span className="absolute inset-0 rounded-2xl bg-white/20 motion-safe:animate-ping [animation-duration:2.5s]" />
                    <span className="relative flex h-full w-full items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] ring-4 ring-white/25">
                        <ClipboardCheck size={26} strokeWidth={2.5} />
                    </span>
                </div>

                <div className="relative min-w-0 flex-1">
                    <h3 className="text-lg font-black tracking-tight sm:text-2xl">
                        {title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-emerald-50/90 sm:text-sm">
                       {description}
                    </p>
                </div>

                <CheckCircle2
                    size={22}
                    className="relative mt-1 shrink-0 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] sm:mt-0"
                    aria-hidden="true"
                />

            </div>
    )
}