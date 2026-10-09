import { useMemo } from "react";

import { mapAssessmentsToSolarSizing } from "../utils/solarSizing";
import { getChartMinWidth } from "../utils/charts/assessmentChart";


export function useSolarSizingData(assessments = []) {

    const data = useMemo(
        () => mapAssessmentsToSolarSizing(assessments),
        [assessments]
    );

    return {
        data,
        latest: data[data.length - 1] ?? null,
        minWidth: getChartMinWidth(data.length, 4, 110),
        isEmpty: data.length === 0
    };

}
