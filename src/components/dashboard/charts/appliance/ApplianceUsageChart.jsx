import {useState, useEffect} from "react";6
import { Plug } from "lucide-react";
import ChartContainer from "../shared/ChartContainer";
import ChartLoadingState from "../shared/ChartLoadingState";
import ChartEmptyState from "../shared/ChartEmptyState";

import ApplianceStats from "./ApplianceStats";
import ApplianceBars from "./ApplianceBars";

import { getApplianceUsageChartData } from "../../../../services/dashBoardService";



export default function ApplianceUsageChart() {


    const [page, setPage] = useState(1);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading ] = useState(true);


    useEffect(() => {


        async function loadApplianceUsageChart () {

            try {

                setIsLoading(true);
                const response = await getApplianceUsageChartData(page);
                setData(response);

                console.log(response);

            }catch(error){

                console.error("Failed To Fetch Appliance Usage Data",error);

            }finally{

                setIsLoading(false);

            }

        };


        loadApplianceUsageChart();

    },[page]);



    const renderBody = () => {

        if (isLoading) {
            return <ChartLoadingState />;
        };

        if (data?.data?.length === 0) {


            return (
                <ChartEmptyState
                    icon={Plug}
                    iconClass="text-teal-600"
                    softClass="bg-teal-50"
                    title="No appliances added yet"
                    message="Add appliances to see which ones use the most energy."
                />
            );

        };

        const chartHeight = Math.max(240, data?.data?.length * 48 + 16);


        return (

            <>

                <ApplianceStats
                        stats = {data?.stats}
                />

                <ApplianceBars
                         data   = {data} 
                         height = {chartHeight}
                />

            </>

        );

    };


    return (

        <ChartContainer
            title="Appliance Usage Per Household"
            subtitle="Estimated daily energy use, ranked from highest to lowest."
            glow="bg-teal-100/70"
            household={data?.householdName}
            onPrev={() => setPage(prev => prev - 1)}
            onNext={() => setPage(prev => prev + 1)}
            prevDisabled={page === 1}
            nextDisabled={page === data?.pagination?.totalPages}
            navLabel={`Household ${page}`}
            
        >
            {renderBody()}
        </ChartContainer>

    );

}
