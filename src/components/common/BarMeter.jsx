


export default function BarMeter ({bars, max, value }) {

    const percent = (max > 0) ? (Math.max(4, (value / max) * 100 ))  : 0;
    const filledBars = Math.max( 1, Math.round( ( percent / 100 ) * bars) );


    const loaders = Array.from({
        length:bars
    });


    return (

    <div aria-hidden="true" className="relative flex h-8 items-end gap-[3px]">

        {loaders.map((elem, i) => {

            const filled = i < filledBars

            const isTip = i === (filledBars - 1)
            

            return (

            <span
                key={i}
                className={`flex-1 rounded-full transition-all duration-300 ${
                    isTip
                        ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                        : filled
                        ? "bg-white/85"
                        : "bg-white/10"
                }`}
                style={{ height: `${25 + (i / bars) * 80}%` }}
            />
    
            )
        })}
     
    </div>

    )

}