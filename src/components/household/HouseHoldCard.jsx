import {House, MapPin, Users, DoorOpen, Layers, Sun, Zap, ArrowUpRight, CalendarDays, RefreshCw} from "lucide-react";
import { formatDate } from "../../utils/charts/formatters";

export default function HouseholdCard({
    household,
    onViewDetails,
}) {

    return (

        <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">

            {/* Card Header */}
            <div className="flex items-start justify-between gap-4">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <House size={23} strokeWidth={2} />
                    </div>

                    <div className="min-w-0">

                        <h3 className="truncate text-base font-bold text-slate-900">
                            {household?.household_name ?? "Your Household"}
                        </h3>

                        <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500">
                            <MapPin size={12} className="shrink-0 text-slate-400" />
                            <span className="truncate capitalize">
                                 {household?.county}, {household?.area || household?.town} 
                            </span>
                        </p>

                    </div>

                </div>

                {/* Assessment Status */}
                <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                    {household?.assessment_status ?? "......"}
                </span>

            </div>


            {/* Energy Status */}
            <div className="mt-5 grid grid-cols-2 gap-3">

                {/* Existing Solar */}
                <div
                    className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${
                        household?.has_existing_solar
                            ? "border-amber-200 bg-amber-50"
                            : "border-slate-200 bg-slate-50"
                    }`}
                >

                    <Sun
                        size={20}
                        className={
                            household?.has_existing_solar
                                ? "shrink-0 text-amber-500"
                                : "shrink-0 text-slate-400"
                        }
                    />

                    <div className="min-w-0">

                        <p className="text-xs text-slate-500">
                            Existing Solar
                        </p>

                        <p className="text-sm font-bold text-slate-900">
                            {household?.has_existing_solar ? "Yes" : "No"}
                        </p>

                    </div>

                </div>

                {/* Grid Connection */}
                <div
                    className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${
                        household?.has_grid_connection
                            ? "border-emerald-200 bg-emerald-50"
                            : "border-slate-200 bg-slate-50"
                    }`}
                >

                    <Zap
                        size={20}
                        className={
                            household?.has_grid_connection
                                ? "shrink-0 text-emerald-600"
                                : "shrink-0 text-slate-400"
                        }
                    />

                    <div className="min-w-0">

                        <p className="text-xs text-slate-500">
                            Grid Power
                        </p>

                        <p className="text-sm font-bold text-slate-900">
                            {household?.has_grid_connection ? "Connected" : "None"}
                        </p>

                    </div>

                </div>

            </div>


            {/* Household Stats */}
            <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 rounded-xl border border-slate-100 py-3">

                <div className="flex flex-col items-center gap-1">
                    <Users size={16} className="text-slate-400" />
                    <p className="text-base font-bold text-slate-900">
                        {household?.number_of_occupants ?? "-"}
                    </p>
                    <p className="text-xs text-slate-400">Occupants</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <DoorOpen size={16} className="text-slate-400" />
                    <p className="text-base font-bold text-slate-900">
                        {household?.number_of_rooms ?? "-"}
                    </p>
                    <p className="text-xs text-slate-400">Rooms</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <Layers size={16} className="text-slate-400" />
                    <p className="text-base font-bold text-slate-900">
                        {household?.number_of_floors ?? "-"}
                    </p>
                    <p className="text-xs text-slate-400">Floors</p>
                </div>

            </div>


            {/* Property Tags */}
            <div className="mt-4 flex flex-wrap gap-2">

                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
                    {household?.house_type?.replace(/_/g, " ")}
                </span>

                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
                    {household?.building_type?.replace(/_/g, " ")}
                </span>

            </div>

               {/* Dates */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                    <div className="min-w-0 rounded-xl border border-slate-100 p-3">

                        <div className="flex items-center gap-1.5 text-slate-400">
                            <CalendarDays size={14} />
                            <span className="text-[11px] font-medium">
                                Created
                            </span>
                        </div>

                        <p className="mt-2 truncate text-xs font-semibold text-slate-700">
                            {formatDate(household?.created_at)}
                        </p>

                    </div>

                    <div className="min-w-0 rounded-xl border border-slate-100 p-3">

                        <div className="flex items-center gap-1.5 text-slate-400">
                            <RefreshCw size={14} />
                            <span className="text-[11px] font-medium">
                                Last updated
                            </span>
                        </div>

                        <p className="mt-2 truncate text-xs font-semibold text-slate-700">
                            {formatDate(household?.updated_at)}
                        </p>

                    </div>

                </div>


            {/* Footer Action */}
            <div className="mt-auto border-t border-slate-100 pt-4">

                <button
                    type="button"
                    onClick={() => onViewDetails?.(household)}
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    View Household Details

                    <ArrowUpRight
                        size={17}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                </button>

            </div>

        </article>

    );

}