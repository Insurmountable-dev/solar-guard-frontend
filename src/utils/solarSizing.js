import { unwrapResult } from "./assessmentResult";


// Completed assessments only, with watts converted to kW
export const mapAssessmentsToSolarSizing = (assessments = []) =>
    assessments
        .filter((assessment) => assessment && assessment.result)
        .map((assessment) => {

            const result = unwrapResult(assessment);
            const energy = result.energy || {};
            const solar = result.solar || {};
            const battery = result.battery || {};

            return {
                name:
                    assessment.household_name ||
                    `Assessment ${assessment.assessment_id}`,

                peakLoad: (Number(energy.peak_load_watts) || 0) / 1000,

                solarCapacity:
                    (Number(solar.required_capacity_watts) || 0) / 1000,

                batteryCapacity: Number(battery.required_capacity_kwh) || 0,

                peakSunHours: Number(solar.peak_sun_hours) || 0
            };

        });
