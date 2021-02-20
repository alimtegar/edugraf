import { ButtonHTMLAttributes } from 'react';

// Types
import ButtonProps from '../types/ButtonProps';

const OutlineButton = ({ children, width, height, borderRadius = 'lg', borderWidth = 2, center = false, ...props }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
        className={`
            ${center ? 'flex justify-center items-center' : ''}
            w-${width}
            h-${height}
            bg-transparent
            hover:bg-gray-700
            active:bg-gray-700
            text-whitex
            font-extrabold
            border-black
            border-${borderWidth}
            rounded-${borderRadius}
            focus:outline-none
        `}
        {...props}
    >
        {children}
    </button>
);

export default OutlineButton;