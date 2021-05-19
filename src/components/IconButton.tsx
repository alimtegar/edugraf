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
    isPing?: boolean,
};

const IconButton = ({
    icon,
    iconSize = 11,
    iconBgColor = 'secondary',
    iconBgColorOn = 'secondary-on',
    iconTextColor = 'white',
    iconTextColorOn = 'white',
    iconShadow = 'md',
    title,
    description,
    borderR = 'xl',
    shadow = 'default',
    isPing = false,
    ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={`
            group
            flex 
            items-center 
            bg-white 
            text-gray-700 
            p-2
            rounded-${borderR}
            shadow-${shadow}
            focus:outline-none
        `}
        {...props}
    >
        <div className={`
            relative
            flex 
            justify-center 
            items-center 
            bg-${iconBgColor}
            group-active:bg-${iconBgColorOn}
            group-hover:bg-${iconBgColorOn}
            text-${iconTextColor}
            group-active:text-${iconTextColorOn}
            group-hover:text-${iconTextColorOn}
            text-xl 
            font-extrabold 
            w-${iconSize}
            h-${iconSize}
            mr-4 
            rounded-full
        `}>
            {isPing && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${iconBgColor} opacity-75`}></span>
            )}
            <span className="relative z-10">
                {icon}
            </span>
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