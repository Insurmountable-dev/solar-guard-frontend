import {CloudSun, House, LightbulbIcon, Sun, Compass, Building, 
        Layers, DoorOpen, MapPin, Map, Navigation, Users, TriangleRight,
        Calendar, ClipboardList,
        CloudLightning
} from "lucide-react"

import { useNavigate } from "react-router-dom";
import useNavigation from "../../contexts/NavigationProvider";
import HouseholdProfileHeader from "./HouseholdProfileHeader";
import SummaryCard from "../dashboard/SummaryCard";
import SectionCard from "../steps/steps-components/SectionCard";
import AreaDisplay from "../steps/steps-components/AreaDisplay"
import { Specification } from "../steps/latest-components/Specification";
import { formatDate } from "../../utils/charts/formatters";
import AssessmentActions from "../assessment/AssessmentActions";
import {assessmentResultsMessages} from "../../constants/messages";
import Table from "../household/Table"


export default function HouseholdDetailsBody ({
    data = null
}) {

    const navigate = useNavigate();
    const {setLoadingMessages, setPathname, setShowLoaderApp, setNavigationData} = useNavigation();

    const household = data?.households
    const appliances = data?.appliances


    const has_grid_connection = household?.has_grid_connection === 1;
    const has_existing_solar  = household?.has_existing_solar === 1; 


    const totalAppliances = appliances.reduce((total, ap) => {
        return  total + Number(ap.quantity) 
    }, 0);

    const essentialAppliances = appliances.filter((ap) => ap.is_essential === 1).length;

    const nonEssentialAppliances = Number(appliances.length) - essentialAppliances;

    const specifications = [
        {
            icon: House,
            label: "Household Name",
            value: household?.household_name ?? "Your Household",
        },
        {
            icon: Building,
            label: "Building Type",
            value: household?.building_type,
        },
        {
            icon: Layers,
            label: "Number of Floors",
            value: Number(household?.number_of_floors) ?? "-",
        },
        {
            icon: DoorOpen,
            label: "Number of Rooms",
            value: Number(household?.number_of_rooms) ?? "-",
        },
        {
            icon: Users,
            label: "Occupants",
            value:Number(household?.number_of_occupants) ?? "-",
        },
        {
            icon: Map,
            label: "County",
            value: household?.county,
        },
        {
            icon: MapPin,
            label: "Town",
            value: household?.town,
        },
        {
            icon: Navigation,
            label: "Area",
            value: household?.area,
        },
    
    ];

    const measurements = [
        {
            name:"House Length",
            value:Number(household?.house_length) ?? "-",
            unit:"m",
            color:"slate-700",
            bg:"bg-slate-50"
        },
        {
            name:"House Width",
            value:Number(household?.house_width) ?? "-",
            unit:"m",
            color:"slate-700",
            bg:"bg-slate-50"
        },
        {
            name:"Roof Length",
            value:Number(household?.roof_length) ?? "-",
            unit:"m",
            color:"blue-600",
            bg:"bg-blue-50"
        },  
        {
            name:"Roof Width",
            value:Number(household?.roof_width) ?? "-",
            unit:"m",
            color:"blue-600",
            bg:"bg-blue-50"
        },
        
    ];

    const roof = [
    {
        icon: House,
        label: "Roof Type",
        value: household?.roof_type ?? "-",
    },
    {
        icon: Layers,
        label: "Roof Material",
        value: household?.roof_material ?? "-",
    },
    {
        icon: Compass,
        label: "Roof Orientation",
        value: household?.roof_orientation ?? "-",
    },
    {
        icon: CloudSun,
        label: "Shading Level",
        value: household?.shading_level ?? "-",
    },
    {
        icon: ClipboardList,
        label: "Measurement Method",
        value: household?.measurement_method ?? "-",
    },
    {
        icon: Calendar,
        label: "Measured On",
        value: formatDate(household?.created_at) ?? "-",
    },
    ];

    const details = [
        {
            name:"Total Appliances",
            value:totalAppliances,
            text:"green-700",
            bg:"green-50"
        },
        {
            name:"Total Appliances Types",
            value:appliances.length,
            text:"green-700",
            bg:"green-50"
        },
        {
            name:"Essential Appliances Types",
            value:essentialAppliances,
            text:"blue-700",
            bg:"blue-50"
        },
        {
            name:"Non Essential Appliances Types",
            value:nonEssentialAppliances,
            text:"amber-700",
            bg:"amber-50"
        }
    ];


    const rows = appliances.map(({ 
        appliance_id, 
        household_id, 
        created_at, 
        updated_at,
        is_essential, 
        ...remaining 
    }) =>{

       const essential = is_essential === 1 ? "essential" : "not-essential"
       const array =  Object.values(remaining)
       array.push(essential);

       return array;
    });


    return(

    <>
        <HouseholdProfileHeader
            household={household}
            appliances={appliances}
        />

        <div className="grid grid-cols-1 gap-3  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">

            <SummaryCard 
                    title="Building Type"
                    icon={House}
                    value={household?.building_type ?? "-"}
                    description="Type of residential building"
                    variant="text"
            />

                <SummaryCard 
                    title="Grid Connection"
                    icon={LightbulbIcon}
                    value={has_grid_connection ? "Connected" : "Not Connected"}
                    description={has_grid_connection ? "Main Electricity Available" : "Main Electricit Unavailable"}
                    variant="text"
            />

                <SummaryCard 
                    title="Existing Solar"
                    icon={Sun}
                    value={has_existing_solar ? "Installed" : "Not Installed"}
                    description={has_existing_solar ? "Solar System Available" : "No Existing Solar System"}
                    variant="text"
            />

                <SummaryCard 
                    title="Roof Shading"
                    icon={CloudSun}
                    value={household?.shading_level ?? "-"}
                    description="How much shade falls on the roof"
                    variant="text"
            />

        </div>


        <SectionCard
            icon={House}
            title="Household Information"
            description={"General Household And Building Information"}
        >
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">

            {specifications.map((sp, i) => {

                return (
                    <Specification
                        key={sp.label}
                        icon={sp.icon}
                        label={sp.label}
                        value={sp.value}
                    />
                )
            })}

        </div>

        </SectionCard>


        <SectionCard
            title="Roof & House Measurements"
            icon={TriangleRight}
            description="Physical dimensions and roof characteristics"
        >
            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
                {measurements.map((m) => {
                    return (
                        <div key={m.name} className={`rounded-xl ${m.bg} p-4`}>
                            <p className={`text-xs ${m.color}`}>
                                {m.name}
                            </p>

                            <p className={`mt-2 text-2xl font-bold text-${m.color}`}>
                                {m.value.toFixed(2)}
                                <span className="text-sm font-medium">
                                    {" "}{m.unit}
                                </span>
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                <AreaDisplay
                    label="House Area"
                    length={household?.house_length}
                    width={household?.house_width}
                    unit="m"
                />

                <AreaDisplay
                    label="Roof Area"
                    length={household?.roof_length}
                    width={household?.roof_width}
                    unit="m"
                />
            </div>

            <div className="px-5 pb-3">
                <h3 className="text-base font-semibold text-slate-800">
                    Roof Details
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Roof structure, material and environmental characteristics.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-2 p-5 pt-2 sm:grid-cols-2">
                {roof.map((r) => (
                    <Specification
                        key={r.label}
                        icon={r.icon}
                        label={r.label}
                        value={r.value}
                    />
                ))}
            </div>

        </SectionCard>

       
        <SectionCard
            icon={CloudLightning}
            title={"Household Appliances"}
            description={"All Appliances Registered Uder This Household"}
        >

            <Table
                title={"Household Appliances"}
                description={"All appliances registered under this household."}
                details={details}
                cols={["Appliance Name", "Appliance Category", "Quantity", "Power Rating In Watts (w)", "Hours Used Per Days", "Days Used Per Week", "Is Essential"]}
                rows ={rows}
            />

        </SectionCard>

        <AssessmentActions
            continueLabel={"View Results"}
            backLabel="Back To Dashboard"
            onBack={() => navigate("/dashboard")}
            onContinue={() => {
                setNavigationData({
                    assessment_id:household?.assessment_id,
                    household_id:household?.household_id,
                    household_name:household?.household_name,
                    created_at:household?.created_at,
                    updated_at:household?.updated_at,
                    path:(`/households/${household?.household_id}`)
                })
                setLoadingMessages(assessmentResultsMessages);
                setShowLoaderApp(true);
                setPathname("/assessment-results");
            }}
        />

    </>

    )

}