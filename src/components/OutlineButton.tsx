import { ButtonHTMLAttributes } from 'react';

// Types
import ButtonProps from '../types/ButtonProps';

const OutlineButton = ({ children, width, height, borderRadius = 'lg', borderWidth = 2, ...props }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
        className={`
            w-${width}
            h-${height}
            bg-transparent
            hover:bg-gray-700
            active:bg-gray-700
            text-whitex
            text-sm
            font-bold
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