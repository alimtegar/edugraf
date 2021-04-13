type Props = {
    children: React.ReactNode,
    size: number | string,
    textSize: string,
    rounded: string,
};

const CharacterFrame = ({ children, size, textSize, rounded }: Props) => {
    return (
        <span className={`
            flex 
            justify-center 
            items-center 
            bg-white 
            text-${textSize}
            text-gray-700
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

export default CharacterFrame;