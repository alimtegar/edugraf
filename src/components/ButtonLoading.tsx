type Props = {
    w?: number | string,
    h?: number | string,
    borderR?: string,
    center?: boolean,
};

const ButtonLoading = ({ w = 'full', h = '12', borderR = 'lg', center }: Props) => (
    <button
        className={`
            ${center ? 'flex justify-center items-center' : ''}
            bg-gray-200 
            text-gray-500 
            font-extrabold 
            w-${w}
            h-${h}
            rounded-${borderR}
        `}
        disabled
    >
        Tunggu...
    </button>
);

export default ButtonLoading;