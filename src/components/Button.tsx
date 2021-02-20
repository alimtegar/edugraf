import { ButtonHTMLAttributes } from 'react';

// Types
import ButtonProps from '../types/ButtonProps';

const Button = ({ children, width, height, borderRadius = 'lg', borderWidth = 2, ...props }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button 
        className={`
            w-${width}
            h-${height}
            bg-black
            hover:bg-gray-700
            active:bg-gray-700
            text-white
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

export default Button;