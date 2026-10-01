import React from "react";

import {
    Zap,
    Clock,
    CheckCircle
} from "lucide-react";

export default function AssessmentAppliances({
    appliances = []
}) {
    const totalEnergy = appliances.reduce(
        (total, appliance) =>
            total +
            Number(
                appliance.daily_energy_wh || 0
            ),
        0
    );

    return (
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Appliance Energy Usage
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Appliances included in this solar assessment.
                    </p>
                </div>

                <div className="rounded-xl bg-green-50 px-4 py-3 text-right">
                    <p className="text-xs font-medium text-green-600">
                        Daily Energy
                    </p>

                    <p className="text-lg font-bold text-green-700">
                        {(totalEnergy / 1000).toFixed(2)} kWh
                    </p>
                </div>

            </div>

            {appliances.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                    <Zap
                        size={28}
                        className="mx-auto text-slate-400"
                    />

                    <p className="mt-3 text-sm text-slate-500">
                        No appliances have been added to this assessment.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px] text-left">

                        <thead>
                            <tr className="border-b border-slate-200">

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Appliance
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Quantity
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Power
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Usage
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Daily Energy
                                </th>

                                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Essential
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {appliances.map(
                                appliance => (
                                    <tr
                                        key={
                                            appliance.assessment_appliance_id
                                        }
                                        className="border-b border-slate-100 last:border-0"
                                    >

                                        <td className="px-4 py-4">

                                            <p className="font-semibold text-slate-900">
                                                {
                                                    appliance.appliance_name
                                                }
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                {
                                                    appliance.appliance_category ||
                                                    "General"
                                                }
                                            </p>

                                        </td>

                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            {
                                                appliance.quantity
                                            }
                                        </td>

                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            {
                                                appliance.power_rating_watts
                                            }{" "}
                                            W
                                        </td>

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-2 text-sm text-slate-600">

                                                <Clock
                                                    size={15}
                                                    className="text-slate-400"
                                                />

                                                {
                                                    appliance.hours_per_day
                                                }{" "}
                                                hrs/day

                                            </div>

                                        </td>

                                        <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                                            {
                                                Number(
                                                    appliance.daily_energy_wh ||
                                                    0
                                                ).toFixed(0)
                                            }{" "}
                                            Wh
                                        </td>

                                        <td className="px-4 py-4">

                                            {Number(
                                                appliance.is_essential
                                            ) === 1 ? (
                                                <CheckCircle
                                                    size={18}
                                                    className="text-green-600"
                                                />
                                            ) : (
                                                <span className="text-xs text-slate-400">
                                                    No
                                                </span>
                                            )}

                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>
            )}

        </section>
    );
}