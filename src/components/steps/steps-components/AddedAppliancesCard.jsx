import { X, Zap, PackagePlus, ChevronRight } from "lucide-react";
import EmptyState from "../../common/EmptyState";
import Button from "../../common/Button";
import Sleep from "../../../utils/Sleep";
import useAddAppliances from "../../../contexts/ApplianceProvider";


export function AddedApplianceChip({
    name = "",
    onClick,
    onRemove
}) {
    return (

        <div className="group relative flex w-full items-center gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1.5 pl-4 pr-1.5 text-sm font-medium shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_10px_22px_-12px_rgba(16,185,129,0.6)] active:scale-[0.99] active:bg-emerald-50">

            {/* left accent rail */}
            <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
            />

            <div
                onClick={onClick}
                className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-xl py-1.5 pr-2 transition-colors duration-200"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 transition-all duration-200 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-teal-500 group-hover:text-white group-hover:ring-transparent">
                    <Zap className="h-4 w-4 transition-transform duration-200 group-active:scale-125" />
                </div>

                <span className="min-w-0 flex-1 truncate text-sm font-bold tracking-tight text-slate-800">
                    {name}
                </span>

                <ChevronRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-emerald-500"
                />
            </div>

            <span aria-hidden="true" className="h-6 w-px shrink-0 bg-slate-200" />

            <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove ${name}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 active:scale-75 active:bg-red-100 active:text-red-600"
            >
                <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
        </div>

    );
}

export function AddedAppliancesCard({ total, children }) {


    const { setAdd, setIsAddingAppliances } = useAddAppliances();

    return (

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

            {/* decorative top accent + glow */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-100/70 blur-3xl"
            />

            {/* Header */}
            <div className="relative mb-5 flex items-center justify-between gap-3 border-b border-dashed border-slate-200 pb-5">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,0.9)]">
                        <Zap className="h-5 w-5" strokeWidth={2.5} />
                    </div>

                    <div className="min-w-0">

                        <h3 className="text-base font-black tracking-tight text-slate-900 sm:text-lg">
                            Added Appliances
                        </h3>

                        <p className="mt-0.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
                            Click on an appliance to edit its details.
                        </p>

                    </div>

                </div>

                {/* counter readout */}
                <div className="relative flex min-w-[3.75rem] shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white px-3 py-2 shadow-[0_8px_20px_-12px_rgba(16,185,129,0.7)]">

                    <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-300 via-emerald-500 to-teal-400"
                    />

                    <span className="font-mono text-2xl font-black leading-none tabular-nums text-emerald-700">
                        {total}
                    </span>

                    <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                        Added
                    </span>

                </div>

            </div>


            <div className="relative flex flex-col gap-3">
                {(total <= 0) ?
                    <EmptyState
                        title="Add Appliance First"
                        action={
                            <Button
                                type="button"
                                variant="primary"
                                onClick={async () => {
                                    setAdd(true);

                                    await Sleep(1200);

                                    setIsAddingAppliances(true);
                                    setAdd(false);

                                }}
                            >
                                Add Appliance
                            </Button>

                        }
                    />
                    : children
                }

            </div>

        </div>

    );
}