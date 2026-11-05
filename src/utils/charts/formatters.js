export const formatNumber = (n, maxDigits = 11) =>{

   return Number(n).toLocaleString(undefined, {
        maximumFractionDigits: maxDigits
    });

};

export const formatKwh = (n) => formatNumber(n);

export const formatPower = (value) => {
    
    if (value === null || value === undefined || value === "") return "N/A";

    return `${Number(value).toLocaleString("en-KE")} W`;

};

export const shorten = (text, max = 11) => {

    const value = String(text ?? "");

    return value.length > max ? `${value.slice(0, max - 1)}…` : value;

};


export const formatDate = (date) => {

    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-KE", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

};