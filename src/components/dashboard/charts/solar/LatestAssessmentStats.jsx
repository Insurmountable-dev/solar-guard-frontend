import { Sun, BatteryCharging, Zap, Cpu } from "lucide-react";
import StatTile from "../shared/StatTile";


export default function LatestAssessmentStats({ latest }) {


    return (

        <div className="mt-6">

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Latest:{" "}
                <span className="normal-case tracking-normal text-slate-600">
                    {latest.householdName ? latest.householdName : ""}
                </span>
            </p>


            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                <StatTile
                    icon={Sun}
                    label="Peak sun hours"
                    value={latest.peakSunHours ? Number(latest.peakSunHours).toFixed(2) : 0}
                    unit="h/day"
                    tone="bg-amber-100 text-amber-600"
                />


                <StatTile
                    icon={BatteryCharging}
                    label="Battery capacity"
                    value={latest.batteryCapacity ? Number(latest.batteryCapacity).toFixed(2) : 0}
                    unit="kWh"
                    tone="bg-teal-100 text-teal-600"
                />


                <StatTile
                    icon={Zap}
                    label="Solar capacity"
                    value={latest.solarCapacity ? Number(latest.solarCapacity).toFixed(2) :0}
                    unit="kW"
                    tone="bg-indigo-100 text-indigo-600"
                />

                <StatTile
                    icon={Cpu}
                    label="Inverter Capacity"
                    value={latest.solarCapacity ? Number(latest.inverterCapacity).toFixed(2) : 0}
                    unit="kW"
                    tone="bg-orange-100 text-red-600"
                />

            </div>

        </div>

    );

}
