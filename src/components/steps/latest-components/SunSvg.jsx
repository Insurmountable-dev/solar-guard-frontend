export default  function SunSvg () {

    return(

          <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
                        
                        {/* Outer atmospheric arc */}
                        <path
                            d="M 24 155 A 136 136 0 0 1 296 155"
                            stroke="#93C5FD"
                            strokeOpacity="0.15"
                            strokeWidth="1.5"
                            strokeDasharray="4 7"
                        />

                        {/* Main sun path */}
                        <path
                            d="M 43 155 A 117 117 0 0 1 277 155"
                            stroke="#BFDBFE"
                            strokeOpacity="0.25"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        {/* Highlighted solar arc */}
                        <path
                            d="M 43 155 A 117 117 0 0 1 277 155"
                            stroke="#FCD34D"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="190 368"
                        />

                        {/* Horizon */}
                        <path
                            d="M 12 155 H 308"
                            stroke="#BFDBFE"
                            strokeOpacity="0.4"
                            strokeWidth="1.5"
                        />

                        {/* Ground glow */}
                        <ellipse
                            cx="160"
                            cy="155"
                            rx="82"
                            ry="7"
                            fill="#FBBF24"
                            fillOpacity="0.08"
                        />

                        {/* Sun rays */}
                        {Array.from({ length: 12 }, (_, index) => {
                            const angle = (index * 30 * Math.PI) / 180;
                            const innerRadius = 29;
                            const outerRadius = 37;

                            return (
                                <line
                                    key={index}
                                    x1={160 + Math.cos(angle) * innerRadius}
                                    y1={83 + Math.sin(angle) * innerRadius}
                                    x2={160 + Math.cos(angle) * outerRadius}
                                    y2={83 + Math.sin(angle) * outerRadius}
                                    stroke="#FCD34D"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    opacity="0.75"
                                />
                            );
                        })}
        </svg>

    )
}