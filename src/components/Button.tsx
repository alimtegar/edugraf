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
};

const Button = ({ 
    children, 
    bgColor = 'red-500', 
    bgColorOn = 'red-600',
    textColor = 'white', 
    textColorOn = 'white',
    w, 
    h, 
    borderR = 'lg', 
    center = false, 
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
            hover:text-${textColorOn}
            active:text-${textColorOn}
            font-extrabold
            rounded-${borderR}
            focus:outline-none
        `}
        {...props}
    >
        {children}
    </button>
);

export default Button;