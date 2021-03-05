type Props = {
    children: React.ReactNode,
    size: number,
};

const Frame = ({ children, size }: Props) => {
    return (
        <span className={`
            flex 
            justify-center 
            items-center 
            bg-white 
            text-7xl font-extrabold
            aspect-1
            w-${size} 
            rounded-xl 
            shadow-sm
        `}>
            {children}
        </span>
    );
};

export default Frame;