import React from "react";

import ApplianceCard from "./ApplianceCard";


export default function ApplianceList({
    appliances = [],
    isLoading = false
}) {

    if (isLoading) {

        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                <p className="text-sm text-slate-500">
                    Loading your appliances...
                </p>

            </div>
        );

    }


    if (appliances.length === 0) {

        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                <div className="mx-auto max-w-md">

                    <h2 className="text-lg font-bold text-slate-900">
                        No appliances yet
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Add appliances to your households so Solar Guard can calculate your daily energy consumption and solar system requirements.
                    </p>

                </div>

            </div>
        );

    }


    return (
        <div>

            <div className="mb-5 flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-bold text-slate-900">
                        Your Appliances
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {appliances.length} appliance
                        {appliances.length !== 1
                            ? "s"
                            : ""}{" "}
                        registered
                    </p>

                </div>

            </div>


            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {appliances.map(
                    appliance => (

                        <ApplianceCard
                            key={
                                appliance.appliance_id
                            }
                            appliance={
                                appliance
                            }
                        />

                    )
                )}

            </div>

        </div>
    );
}