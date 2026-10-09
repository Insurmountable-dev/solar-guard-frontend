import {useState, useEffect} from "react";
import { getSolarSizingChartData } from "../../../../services/dashBoardService";

import { Sun } from "lucide-react";
import ChartContainer from "../shared/ChartContainer";
import ChartEmptyState from "../shared/ChartEmptyState";
import SeriesLegend from "../shared/SeriesLegend";
import SolarSizingBars from "./SolarSizingBars";
import LatestAssessmentStats from "./LatestAssessmentStats";
import { SOLAR_SERIES } from "../../../../config/solarSeries";

import { getChartMinWidth } from "../../../../utils/charts/assessmentChart";


export default function SolarSizingChart() {



        const [data, setData] = useState([]);

        useEffect(() => {

            async function loadSolarSizingData () {

              try { 
                
                const response = await getSolarSizingChartData();

                setData(response.data);

                console.log(response);

              }catch(error){

                console.error("Error Fetching Solar Sizing Data", error);

              }

            };


            loadSolarSizingData();

        },[]);


        const completedData = data.filter((d) => d.resultId !== null);

        const minWidth = getChartMinWidth(completedData?.length, 4, 110);
        const latest   = completedData[completedData?.length - 1] ?? null


    return (

        <ChartContainer
            title="Solar system sizing"
            subtitle="Peak electrical load compared with the solar capacity each household needs."
            glow="bg-amber-200/40"
        >

            {data?.length === 0 ? (

                <ChartEmptyState
                    icon={Sun}
                    iconClass="text-amber-500"
                    softClass="bg-amber-50"
                    heightClass="h-64"
                    title="No completed assessments yet"
                    message="Finish a solar assessment to compare your peak load with the solar capacity you need."
                />

            ) : (

                <>
                    <SeriesLegend series={SOLAR_SERIES} />
                    <SolarSizingBars
                        data     ={completedData}
                        series   ={SOLAR_SERIES}
                        minWidth ={minWidth}
                    />

                    <LatestAssessmentStats 
                        latest={latest} 
                    />

                </>

            )}

        </ChartContainer>

    );

}
