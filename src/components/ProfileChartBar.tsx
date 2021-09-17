type Props = {
    bgColor?: string,
    title?: string,
    value?: number,
    width?: string,
};

const ProfileChartBar = ({ bgColor, title, value, width = `${1 / 8 * 100}%`, }: Props) => (
    <div className="w-full h-9 relative flex justify-start items-center bg-gray-500 bg-opacity-10 text-right rounded-lg overflow-hidden">
        {bgColor && value !== undefined && (
            <>
                <div
                    className={`bg-${bgColor} text-white h-full rounded-lg`}
                    style={{
                        width: value ? `${value * 100}%` : 3,
                    }}
                >
                </div>
                <span className={`absolute right-0 font-semibold text-xs text-${value > 0.9 ? 'white' : 'gray-500'} w-full p-2`}>
                    {value * 100}%
                </span>
            </>
        )}
    </div>
);

export default ProfileChartBar;