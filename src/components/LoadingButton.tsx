import classNames from "classnames";

// Types
type Props = {
    w?: number | string,
    h?: number | string,
    borderR?: string,
    shadow?: string,
};

const LoadingButton = ({
    w = 'full',
    h = 12,
    borderR = 'full',
    shadow = 'none',
}: Props) => (
    <button
        className={classNames('flex justify-center items-center bg-gray-200 font-bold', {
            [`w-${w}`]: !!w,
            [`h-${h}`]: !!h,
            [`rounded-${borderR}`]: !!borderR,
            [`shadow-${shadow}`]: !!shadow,
        })}
        disabled
    >
        <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </button>
);

export default LoadingButton;