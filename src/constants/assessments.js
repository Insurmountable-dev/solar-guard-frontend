export const initialHouseholdFormData = {
    household_name: "",
    house_type: "",
    building_type: "",
    number_of_floors:"",
    number_of_rooms:"",
    number_of_occupants:"",
    county: "",
    town: "",
    area: "",
    has_grid_connection: true,
    has_existing_solar: false,
};

export const initialMeasurementsFormData = {
    household_id: "",
    house_length: "",
    house_width: "",
    roof_length: "",
    roof_width: "",
    roof_type: "",
    roof_material: "",
    roof_orientation: "",
    shading_level: "",
    measurement_method: "",
};


export const initialAppliancesFormData = {
    household_id:"",
    appliance_name:"",
    manufacturer:"",
    appliance_category:"",
    quantity:"",
    power_rating_watts:"",
    hours_per_day:"",
    days_per_week:"",
    is_essential:true,

    // Extras
    description_en:"hello",
    description_sw:"Habari",
    typical_power_watts:55,
    minimum_power_watts:10,
    maximum_power_watts:100,

};