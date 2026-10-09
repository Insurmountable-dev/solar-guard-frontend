import React from "react";


export default function ValueLabel({ x, y, width, value, format }) {

    if (!value) return null;

    return (

        <text
            x={x + width / 2}
            y={y - 8}
            textAnchor="middle"
            fill="#0f172a"
            fontSize={12}
            fontWeight={700}
        >
            {format(value)}
        </text>

    );

}
