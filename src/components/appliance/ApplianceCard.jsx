import React from "react";

import {
    Zap,
    Clock,
    CalendarDays,
    Home,
    CheckCircle2
} from "lucide-react";


export default function ApplianceCard({
    appliance
}) {

    const dailyEnergy =
        Number(
            appliance.power_rating_watts || 0
        ) *
        Number(
            appliance.quantity || 0
        ) *
        Number(
            appliance.hours_per_day || 0
        );


    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="mb-5 flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">

                    <Zap
                        size={22}
                        className="text-green-600"
                    />

                </div>


                {Boolean(
                    appliance.is_essential
                ) && (

                    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">

                        <CheckCircle2 size={13} />

                        Essential

                    </span>

                )}

            </div>


            <h2 className="text-lg font-bold text-slate-900">
                {appliance.appliance_name}
            </h2>


            <p className="mt-1 text-sm text-slate-500">
                {appliance.appliance_category ||
                    "General"}
            </p>


            <div className="mt-5 space-y-3">

                <div className="flex justify-between text-sm">

                    <span className="text-slate-500">
                        Quantity
                    </span>

                    <span className="font-semibold text-slate-900">
                        {appliance.quantity}
                    </span>

                </div>


                <div className="flex justify-between text-sm">

                    <span className="text-slate-500">
                        Power rating
                    </span>

                    <span className="font-semibold text-slate-900">
                        {Number(
                            appliance.power_rating_watts || 0
                        ).toFixed(0)} W
                    </span>

                </div>


                <div className="flex items-center justify-between text-sm">

                    <span className="flex items-center gap-2 text-slate-500">

                        <Clock size={15} />

                        Usage

                    </span>

                    <span className="font-semibold text-slate-900">
                        {Number(
                            appliance.hours_per_day || 0
                        ).toFixed(1)} hrs/day
                    </span>

                </div>


                <div className="flex items-center justify-between text-sm">

                    <span className="flex items-center gap-2 text-slate-500">

                        <CalendarDays size={15} />

                        Days

                    </span>

                    <span className="font-semibold text-slate-900">
                        {Number(
                            appliance.days_per_week || 0
                        ).toFixed(0)} days/week
                    </span>

                </div>


                {appliance.household_name && (

                    <div className="flex items-center justify-between text-sm">

                        <span className="flex items-center gap-2 text-slate-500">

                            <Home size={15} />

                            Household

                        </span>

                        <span className="max-w-[160px] truncate font-semibold text-slate-900">
                            {appliance.household_name}
                        </span>

                    </div>

                )}

            </div>


            <div className="mt-6 rounded-xl bg-slate-50 p-4">

                <p className="text-xs font-medium text-slate-500">
                    Estimated daily energy
                </p>

                <p className="mt-1 text-xl font-bold text-green-600">
                    {dailyEnergy.toFixed(0)} Wh
                </p>

            </div>

        </div>
    );
}