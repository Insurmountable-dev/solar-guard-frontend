export const validateRegisterForm = (formData) => {

    const errors = {};

    if (!formData.first_name.trim())                              {errors.first_name = "First name is required";};
    if (!formData.last_name.trim())                               {errors.last_name = "Last name is required";};
    
    if (!formData.email.trim())                                   {errors.email = "Email is required";} 
    else if (!/\S+@\S+\.\S+/.test(formData.email))                {errors.email = "Enter a valid email address";}

    if (!formData.password)                                       {errors.password = "Password is required";} 
    else if (formData.password.length < 6)                        {errors.password = "Password must be at least 6 characters";}
    else if (!/[A-Z]/.test(formData.password))                    {errors.password = "Password must contain at least one uppercase letter";}
    else if (!/[a-z]/.test(formData.password))                    {errors.password = "Password must contain at least one lowercase letter";}
    else if (!/[0-9]/.test(formData.password))                    {errors.password = "Password must contain at least one number";}
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password))   {errors.password = "Password must contain at least one special character";}

    if (!formData.confirm_password) {errors.confirm_password = "Please confirm your password";}
    else if (formData.password !== formData.confirm_password) {errors.confirm_password = "Passwords do not match";}

    return errors;
};

export const validateHouseholdForm = (formData) => {

    const errors = {};

    const isBlank = (value) =>{
        
        return value === undefined || value === null || String(value).trim() === "";

    }

    // Required text fields
    if (isBlank(formData.household_name)) {
        errors.household_name = "Household name is required";
    } else if (formData.household_name.trim().length < 4) {
        errors.household_name = "Household name must be at least 4 characters";
    } else if (formData.household_name.trim().length > 100) {
        errors.household_name = "Household name must be 100 characters or less";
    }

    if (isBlank(formData.house_type)) {
        errors.house_type = "Please select a house type";
    }

    if (isBlank(formData.building_type)) {
        errors.building_type = "Please select a building type";
    }

    if (isBlank(formData.county)) {
        errors.county = "County is required";
    }

    if (isBlank(formData.town)) {
        errors.town = "Town is required";
    }

    // if (isBlank(formData.area)) {
    //     errors.area = "Area is required";
    // }

    const floors = Number(formData.number_of_floors);

    if (!Number.isInteger(floors) || floors < 1) {
        errors.number_of_floors = "Enter at least 1 floor";
    } else if (floors > 100) {
        errors.number_of_floors = "Number of floors seems too high";
    }

    const rooms = Number(formData.number_of_rooms);

    if (!Number.isInteger(rooms) || rooms < 1) {
        errors.number_of_rooms = "Enter at least 1 room";
    } else if (rooms > 200) {
        errors.number_of_rooms = "Number of rooms seems too high";
    }

    const occupants = Number(formData.number_of_occupants);

    if (!Number.isInteger(occupants) || occupants < 1) {
        errors.number_of_occupants = "Enter at least 1 occupant";
    } else if (occupants > 100) {
        errors.number_of_occupants = "Number of occupants seems too high";
    }

    // Boolean toggles
    if (typeof formData.has_grid_connection !== "boolean") {
        errors.has_grid_connection = "Grid connection must be Yes or No";
    }

    if (typeof formData.has_existing_solar !== "boolean") {
        errors.has_existing_solar = "Existing solar must be Yes or No";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        noOfErrors:Object.keys(errors).length
    };
};

export const validateMeasurements = (formData) => {

    const errors = {};

    // House Length
    if (String(formData.house_length).trim() === "") {
        errors.house_length = "Please Insert House Length";
    } else if (Number(formData.house_length) <= 0) {
        errors.house_length = "House Length Must Be Greater Than Zero";
    } else if (!Number.isFinite(Number(formData.house_length))) {
        errors.house_length = "Please Enter a Valid House Length";
    }

    // House Width
    if (String(formData.house_width).trim() === "") {
        errors.house_width = "Please Insert House Width";
    } else if (!Number.isFinite(Number(formData.house_width))) {
        errors.house_width = "Please Enter a Valid House Width";
    } else if (Number(formData.house_width) <= 0) {
        errors.house_width = "House Width Must Be Greater Than Zero";
    }

    // Roof Length
    if (String(formData.roof_length).trim() === "") {
        errors.roof_length = "Please Insert Roof Length";
    } else if (!Number.isFinite(Number(formData.roof_length))) {
        errors.roof_length = "Please Enter a Valid Roof Length";
    } else if (Number(formData.roof_length) <= 0) {
        errors.roof_length = "Roof Length Must Be Greater Than Zero";
    }

    // Roof Width
    if (String(formData.roof_width).trim() === "") {
        errors.roof_width = "Please Insert Roof Width";
    } else if (!Number.isFinite(Number(formData.roof_width))) {
        errors.roof_width = "Please Enter a Valid Roof Width";
    } else if (Number(formData.roof_width) <= 0) {
        errors.roof_width = "Roof Width Must Be Greater Than Zero";
    }

    // Roof Type
    if (String(formData.roof_type).trim() === "") {
        errors.roof_type = "Please Select Roof Type";
    }

    // Roof Material
    if (String(formData.roof_material).trim() === "") {
        errors.roof_material = "Please Select Roof Material";
    }

    // Roof Orientation
    if (String(formData.roof_orientation).trim() === "") {
        errors.roof_orientation = "Please Select Roof Orientation";
    }

    // Shading Level
    if (String(formData.shading_level).trim() === "") {
        errors.shading_level = "Please Select Shading Level";
    }

    // Measurement Method
    if (String(formData.measurement_method).trim() === "") {
        errors.measurement_method = "Please Select Measurement Method";
    }

    return {
        errors,
        isValid:Object.keys(errors).length === 0,
        noOfErrors:Object.keys(errors).length

    };
};


export const validateAppliancesForm = (formData) => {

    const errors = {};

    if (!formData.appliance_name.trim()) {
        errors.appliance_name = "Appliance name is required";
    };

    if (!formData.appliance_category) {
        errors.appliance_category = "Appliance category is required";
    }

    if (!formData.quantity || Number(formData.quantity) < 1) {
        errors.quantity = "Quantity must be at least 1";
    }

    if (!formData.power_rating_watts || Number(formData.power_rating_watts) <= 0) {
        errors.power_rating_watts = "Power rating must be greater than 0";
    }

    if (formData.hours_per_day === "" || Number(formData.hours_per_day) <= 0 ) {
        errors.hours_per_day = "Hours per day must be greater than 0";
    }else if(Number(formData.hours_per_day) > 24 ){
            errors.hours_per_day = "A day has only 24 hours Invalid"
    }

    if ( formData.days_per_week === "" || Number(formData.days_per_week) < 1 || Number(formData.days_per_week) > 7) {
        errors.days_per_week = "Days per week must be between 1 and 7";
    };

   

    return {
        isValid: Object.keys(errors).length === 0,
        noOfErrors:Object.keys(errors).length,
        errors,
    };
};