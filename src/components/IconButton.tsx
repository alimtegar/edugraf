// Types
import { ButtonHTMLAttributes } from 'react';

type Props = {
    icon: string | JSX.Element,
    iconSize?: number,
    iconBgColor?: string,
    iconBgColorOn?: string,
    iconTextColor?: string,
    iconTextColorOn?: string,
    iconShadow?: string,
    title: string,
    description?: string,
    borderR?: string,
    shadow?: string,
};

const IconButton = ({
    icon,
    iconSize = 11,
    iconBgColor = 'pink-500',
    iconBgColorOn = 'pink-600',
    iconTextColor = 'white',
    iconTextColorOn = 'white',
    iconShadow = 'md',
    title,
    description,
    borderR = 'lg',
    shadow = 'default',
    ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={`
            group
            flex 
            items-center 
            bg-white 
            text-blue-900 
            p-2
            rounded-${borderR}
            shadow-${shadow}
            focus:outline-none
        `}
        {...props}
    >
        <div className={`
            flex 
            justify-center 
            items-center 
            bg-${iconBgColor}
            group-active:bg-${iconBgColorOn}
            text-${iconTextColor}
            group-active:text-${iconTextColorOn}
            text-xl 
            font-extrabold 
            w-${iconSize}
            h-${iconSize}
            mr-4 
            rounded-${borderR} 
            shadow-${iconShadow}
        `}>
            {icon}
        </div>
        <div className="flex flex-col mr-auto">
            <h3 className="text-sm font-bold leading-none">
                {title}
            </h3>
            {description && (
                <span className="text-xs font-semibold">
                    {description}
                </span>
            )}
        </div>
    </button>
);

export default IconButton;