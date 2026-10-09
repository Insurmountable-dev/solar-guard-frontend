export const formatNumber = (n, maxDigits = 11) =>{

   return Number(n).toLocaleString(undefined, {
        maximumFractionDigits: maxDigits
    });

};


export const formatKwh = (n) => formatNumber(n);


export const formatPower = (watts) => {

    const n = Number(watts) || 0;

    if (n >= 1000) return `${(n / 1000).toFixed(2).replace(/\.?0+$/, "")} kW`;

    return `${Math.round(n)} W`;

};


export const shorten = (text, max = 11) => {

    const value = String(text ?? "");

    return value.length > max ? `${value.slice(0, max - 1)}…` : value;

};
