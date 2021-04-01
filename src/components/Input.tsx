// Types
import { InputHTMLAttributes } from 'react';

type Props = {
    borderColorOn?: string,
    label: string
};

const Input = ({ borderColorOn = 'pink-500', label, id, ...props }: Props & InputHTMLAttributes<HTMLInputElement>) => (
    <div className="relative">
        <label htmlFor={id} className="bg-white absolute top-0 transform -translate-y-1/2 inline-flex ml-4 p-1 text-sm font-bold">{label}</label>
        <input 
            className={`
                w-full 
                h-14 
                p-4 
                border-2 
                focus:border-${borderColorOn}
                rounded-lg  
                focus:outline-none
            `}
            id={id} 
            {...props} />
    </div>
);

export default Input;