type Props = {
    bgColor?: string,
    title?: string,
    value?: number,
};

const StagesChartBar = ({ bgColor, title, value }: Props) => (
    <div className="text-center px-1" style={{
        width: `${1 / 8 * 100}%`,
    }}>

        <div className="relative flex justify-center items-end bg-gray-500 bg-opacity-10 w-full h-40 rounded-lg overflow-hidden">
            {bgColor && value && (
                <>
                    <div
                        className={`bg-${bgColor} text-white w-full rounded-lg`}
                        style={{
                            height: `${value}%`,
                        }}
                    >
                    </div>
                    <span className={`absolute top-0 font-semibold text-xs text-${value > 90 ? 'white' : 'gray-500'} w-full text-center p-2`}>
                        {value}
                    </span>
                </>
            )}
        </div>
        {title && (<span className="font-semibold text-xs">{title}</span>)}
    </div>
);

export default StagesChartBar;