type Props = {
    color?: string,
    active: number,
    count: number | undefined,
}

const Stepper = ({ color = 'gradient-to-tl from-blue-500 to-blue-400', active = 0, count = 0 }: Props) => {
    return (
        <div className="relative px-4">
            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-500 bg-opacity-10">
                <div style={{ width: `${active / count * 100}%` }} className={`flex bg-${color} rounded-full`} />
            </div>
        </div>
    );
};

export default Stepper;