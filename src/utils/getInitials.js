
export const getInitials = (user) => {

    const first    = user?.first_name?.[0] ?? "";
    const last     = user?.last_name?.[0] ?? "";
    const initials = `${first}${last}`.toUpperCase();

    return initials || user?.email?.[0]?.toUpperCase() || "?";
};
