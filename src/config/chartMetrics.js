import { Zap } from "lucide-react";
import { formatNumber, formatPower } from "../utils/charts/formatters";


// Single-value bar charts are configured here (used by MetricChart).
// Class names are written out in full so Tailwind can detect them.
export const CHART_METRICS = {

    energy: {

        id: "energy",
        tabLabel: "Energy",
        title: "Energy consumption",
        subtitle: "Daily energy used by each assessed household.",
        icon: Zap,

        valueKey:"dailyEnergy",
        unit:"kWh",
        tooltipUnit:"kWh / day",
        format:(value, dp) => formatNumber(value,dp),

        averageLabel:"Average ",
        highestLabel:"Highest ",
        legend:"Average across assessments",

        colors: {
            from:"#4ade80",
            to:"#16a34a",
            line:"#f59e0b",
            text:"text-green-600",
            soft:"bg-green-50"
        },

        tooltipExtra:(item) => (item.solarCapacity > 0) ? {
            
           label: "Solar needed",
           value: formatPower(item.solarCapacity)

         } : null,
        
        empty: {
            title: "No assessment data yet",
            message: "Complete an assessment to see how much energy each household uses per day."
        }
    }

};
