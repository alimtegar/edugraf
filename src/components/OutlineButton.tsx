import { ButtonHTMLAttributes } from 'react';

// Types
import ButtonProps from '../types/ButtonProps';

const OutlineButton = ({ 
    children, 
    bgColor = 'transparent', 
    bgColorOn = 'green-500',
    borderColor = 'green-500', 
    borderColorOn = 'green-500',
    textColor = 'green-500', 
    textColorOn = 'white',
    w, 
    h, 
    borderR = 'lg', 
    borderW = 3, 
    center = false, 
    ...props 
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
        className={`
            ${center ? 'flex justify-center items-center' : ''}
            w-${w}
            h-${h}
            bg-${bgColor}
            hover:bg-${bgColorOn}
            active:bg-${bgColorOn}
            text-${textColor}
            hover:text-${textColorOn}
            active:text-${textColorOn}
            font-extrabold
            border-${borderColor}
            hover:border-${borderColorOn}
            active:border-${borderColorOn}
            border-${borderW}
            rounded-${borderR}
            focus:outline-none
        `}
        {...props}
    >
        {children}
    </button>
);

export default OutlineButton;