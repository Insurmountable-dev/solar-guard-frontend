export const formatHouseholdValue = (
    value,
    fallback = "Not specified"
) => {
    return value || fallback;
};

export const formatBooleanValue = (
    value
) => {
    return value ? "Yes" : "No";
};

export const formatHouseType = (
    houseType
) => {
    if (!houseType) {
        return "Not specified";
    }

    return houseType
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
        );
};

export const formatBuildingType = (
    buildingType
) => {
    if (!buildingType) {
        return "Not specified";
    }

    return buildingType
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
        );
};