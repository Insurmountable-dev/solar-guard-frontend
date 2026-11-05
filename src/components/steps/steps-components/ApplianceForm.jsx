import SectionCard from "./SectionCard"
import ApplianceDetailsCard from "./ApplianceDetailsCard"


export default function ApplianceForm (){

    return (
        
        <SectionCard
            title="Your Appliances"
            description="Appliance details and usage"
            action={
                <Button variant="outline" size="md" icon={Plus}>
                    Add Appliance
                </Button>
            }
        >
                <ApplianceDetailsCard />

        </SectionCard>

    )
}