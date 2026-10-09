import { useEffect,useState } from "react";
import ChartContainer from "../shared/ChartContainer";
import ChartLoadingState from "../shared/ChartLoadingState";
import ChartEmptyState from "../shared/ChartEmptyState";
import MetricStats from "./MetricStats";
import MetricBarChart from "./MetricBarChart";
import AverageLegend from "./AverageLegend";
import {getEnergyConsumptionChartData} from "../../../../services/dashBoardService";
import { getChartMinWidth } from "../../../../utils/charts/assessmentChart";


export default function MetricChart({metric,completedAssessments = [], headerAction = null }) {


    const [data,setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [minWidth, setMinWidth] = useState(null);

    useEffect(() => {

        async function loadEnergyConsumptionChartData() {

            try {
                const response = await getEnergyConsumptionChartData();

                setData(response);

                setMinWidth(getChartMinWidth(response?.data?.length));

            } catch (error) {

                console.error("Error Fetching The Energy Consumption Data", error);

            } finally {

                setIsLoading(false);

            }
        }

        loadEnergyConsumptionChartData();

    }, []);


    const renderBody = () => {

        if (isLoading) {
            return <ChartLoadingState />
        };

        if (data.data.length === 0) {

            return (
                <ChartEmptyState
                    icon={metric.icon}
                    iconClass={metric.colors.text}
                    softClass={metric.colors.soft}
                    title={metric.empty.title}
                    message={metric.empty.message}
                />
            );

        };

        return (

            <>

                <MetricStats
                    metric  = {metric}
                    average = {data?.average_per_day}
                    highest = {data?.highest}
                />


                <MetricBarChart
                    data        = {data?.data}
                    metric      = {metric}
                    average     = {data.average_per_day}
                    minWidth    = {minWidth}
                    showAverage = {(data?.data.length > 1) ? true:false}
                />


                {data?.data.length > 1 && (
                    <AverageLegend
                        color={metric.colors.line}
                        label={metric.legend}
                    />
                )}

            </>

        );

    };

    return (

        <ChartContainer
            title={metric.title}
            subtitle={metric.subtitle}
            actions={headerAction}
        >
            {renderBody()}
        </ChartContainer>

    );

};
