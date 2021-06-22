import { ButtonHTMLAttributes } from 'react';

type Props = {
    bgColor?: string,
    bgColorOn?: string,
    textColor?: string,
    textColorOn?: string,
    w?: number | string,
    h?: number | string,
    borderR?: string,
    shadow?: string,
    center?: boolean,
    isPing?: boolean,
};

const Button = ({
    children,
    bgColor = 'gradient-to-tl from-blue-500 to-blue-400',
    bgColorOn = 'gradient-to-tl from-blue-500 to-blue-400',
    textColor = 'white',
    textColorOn = 'white',
    w = 'full',
    h = 12,
    borderR = 'full',
    shadow = 'none',
    center = false,
    isPing = false,
    ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={`
            ${center ? 'flex justify-center items-center' : ''}
            relative
            w-${w}
            h-${h}
            bg-${bgColor}
            active:bg-${bgColorOn}
            hover:bg-${bgColorOn}
            text-${textColor}
            active:text-${textColorOn}
            hover:text-${textColorOn}
            font-extrabold
            rounded-${borderR}
            shadow-${shadow}
            focus:outline-none
        `}
        {...props}
    >
        {isPing && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${bgColor} opacity-75`}></span>
        )}
        {isPing ? (
            <span className="relative z-10">{children}</span>
        ) : children}
    </button>
);

export default Button;