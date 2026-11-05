import { MapPin } from "lucide-react";
import { formatDate } from "../../utils/charts/formatters";

export default function HouseholdProfileHeader({
    household,
    appliances,
}) {

    if (!household) return null;

    const { 
        household_name,
        number_of_occupants, 
        number_of_floors, 
        number_of_rooms,
        area,
        town,
        county,
        created_at,
        assessment_status,
    } = household;

    const stats = [
        {
            label: "Occupants",
            value: number_of_occupants ?? 0,
            description: "People",
        },
        {
            label: "Appliances",
            value: Number(appliances?.length) ?? 0,
            description: "Registered items",
        },
        {
            label: "Floors",
            value:number_of_floors ?? 0,
            description: "Building levels",
        },
        {
            label: "Rooms",
            value: number_of_rooms ?? 0,
            description: "Total rooms",
        },
    ];

    const location = [county, (town || area )].filter(Boolean).join(", ");

    return (

        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 p-6 text-white shadow-lg sm:p-8">
            
            <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 right-40 h-64 w-64 rounded-full bg-white/10" />

            <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                            Household Profile
                        </span>

                        <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-100">
                            {assessment_status}
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold sm:text-4xl">
                        {household_name}
                    </h2>

                    {location && (
                        <p className="mt-3 flex items-center gap-2 text-sm text-blue-100">
                            <MapPin size={16} />
                            {location}
                        </p>
                    )}

                    <p className="mt-5 text-sm text-blue-100">
                        Created on {formatDate(created_at)}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:min-w-[300px]">

                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
                        >
                            <p className="text-xs text-blue-100">
                                {stat.label}
                            </p>

                            <p className="mt-2 text-3xl font-bold">
                                {stat.value}
                            </p>

                            <p className="mt-1 text-xs text-blue-100">
                                {stat.description}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}