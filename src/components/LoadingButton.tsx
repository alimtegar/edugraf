type Props = {
    w?: number | string,
    h?: number | string,
    borderR?: string,
};

const LoadingButton = ({ 
    w = 'full', 
    h = 12, 
    borderR = 'lg'
}: Props) => (
    <button
        className={`
            bg-gray-200 
            text-gray-500 
            font-bold 
            w-${w}
            h-${h}
            rounded-${borderR}
        `}
        disabled
    >
        Tunggu...
    </button>
);

export default LoadingButton;