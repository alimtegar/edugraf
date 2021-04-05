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
    bgColor = 'pink-500',
    bgColorOn = 'pink-600',
    textColor = 'white',
    textColorOn = 'white',
    w = 'full',
    h = 12,
    borderR = 'lg',
    shadow = 'default',
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
            xhover:bg-${bgColorOn}
            active:bg-${bgColorOn}
            text-${textColor}
            text-sm
            hover:text-${textColorOn}
            active:text-${textColorOn}
            font-bold
            rounded-${borderR}
            shadow-${shadow}
            focus:outline-none
        `}
        {...props}
    >
        {isPing && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${bgColor} opacity-75`}></span>
        )}
        <span className="relative z-10">
            {children}
        </span>
    </button>
);

export default Button;