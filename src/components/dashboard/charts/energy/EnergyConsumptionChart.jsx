import MetricChart from "./MetricChart";
import { CHART_METRICS } from "../../../../config/chartMetrics";


export default function EnergyConsumptionChart(props) {

    return (
        <MetricChart 
                metric = {CHART_METRICS.energy} 
                {...props} 
        />
    );

}
