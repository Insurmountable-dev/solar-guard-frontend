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