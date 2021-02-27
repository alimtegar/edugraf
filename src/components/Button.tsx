import { ButtonHTMLAttributes } from 'react';

// Types
import ButtonProps from '../types/ButtonProps';

const Button = ({ 
    children, 
    bgColor = 'red-500', 
    bgColorOn = 'red-600',
    // borderColor = 'red-500', 
    // borderColorOn = 'green-600',
    textColor = 'white', 
    textColorOn = 'white',
    w, 
    h, 
    borderR = 'lg', 
    borderW = 2, 
    center = false, 
    ...props 
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
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