type Props = {
    children: React.ReactNode,
    size: number | string,
    textSize: string,
    p?: number,
    rounded: string,
    aspect?: number | string | boolean,
};

const CharacterFrame = ({ children, size, textSize, p = 0, rounded, aspect = 1 }: Props) => {
    return (
        <span className={`
            flex 
            justify-center 
            items-center 
            bg-white 
            text-${textSize}
            text-gray-700
            font-extrabold
            ${aspect ? `aspect-${aspect}` : `p-${p} w-auto`}
            h-${size} 
            rounded-${rounded}
            shadow-default
        `}>
            {children}
        </span>
    );
};

export default CharacterFrame;