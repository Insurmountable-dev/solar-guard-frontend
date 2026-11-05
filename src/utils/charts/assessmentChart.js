// Let many bars scroll sideways instead of squashing them
export function getChartMinWidth(barCount, barLimit = 5, pxPerBar = 84) {

    if (barCount > barLimit) {
        return barCount * pxPerBar;
    };


    return null;

};