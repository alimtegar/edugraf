// Types
import { ButtonHTMLAttributes } from 'react';

type Props = {
    bgColor?: string,
    bgColorOn?: string,
    textColor?: string,
    textColorOn?: string,
    w: number | string,
    h: number | string,
    borderR?: string,
    center?: boolean,
    shadow?: string,
};

const ButtonComponent = ({
    children,
    bgColor = 'pink-500',
    bgColorOn = 'pink-600',
    textColor = 'white',
    textColorOn = 'white',
    w,
    h,
    borderR = 'full',
    center = false,
    shadow = 'none',
    ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={`
            ${center ? 'flex justify-center items-center' : ''}
            w-${w}
            h-${h}
            bg-${bgColor}
            xhover:bg-${bgColorOn}
            active:bg-${bgColorOn}
            text-${textColor}
            text-sm
            hover:text-${textColorOn}
            active:text-${textColorOn}
            font-extrabold
            rounded-${borderR}
            shadow-${shadow}
            focus:outline-none
        `}
        {...props}
    >
        {children}
    </button>
);

export default ButtonComponent;