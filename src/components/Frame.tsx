type Props = {
    children: React.ReactNode,
    size: number | string,
    textSize: string,
    rounded: string,
};

const Frame = ({ children, size, textSize, rounded }: Props) => {
    return (
        <span className={`
            flex 
            justify-center 
            items-center 
            bg-white 
            text-${textSize}
            text-gray-900
            font-extrabold
            aspect-1
            w-${size} 
            rounded-${rounded}
            shadow-default
        `}>
            {children}
        </span>
    );
};

export default Frame;

// 7xl 
// xl