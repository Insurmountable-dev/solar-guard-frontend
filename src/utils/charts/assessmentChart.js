import { unwrapResult } from "../assessmentResult";


export const mapAssessmentsToChartData = (assessments = []) =>
    assessments.map((assessment, index) => {

        const result = unwrapResult(assessment);
        const energy = result.energy || {};
        const solar = result.solar || {};

        return {
            name:
                assessment.household_name ||
                assessment.household?.household_name ||
                `Assessment ${index + 1}`,

            dailyEnergy: Number(energy.daily_energy_kwh) || 0,

            solarCapacity: Number(solar.required_capacity_watts) || 0
        };

    });


export const calculateMetricStats = (data, valueKey) => {

    if (!data.length) return null;

    const total = data.reduce((sum, item) => sum + item[valueKey], 0);

    const highest = data.reduce((a, b) =>
        b[valueKey] > a[valueKey] ? b : a
    );

    return { average: total / data.length, highest };

};


// Let many bars scroll sideways instead of squashing them
export function getChartMinWidth(barCount, barLimit = 5, pxPerBar = 84) {

    if (barCount > barLimit) {
        return barCount * pxPerBar;
    };


    return null;

};