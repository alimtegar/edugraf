import classNames from 'classnames';

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
    subIcon?: boolean | string | JSX.Element,
    subIconSize?: number,
    subIconBgColor?: string,
    subIconTextColor?: string,
    title: string,
    description?: string,
    borderR?: string,
    shadow?: string,
    isPing?: boolean,
};

const IconButton = ({
    icon,
    iconSize = 12,
    iconBgColor = 'blue-50',
    iconBgColorOn = 'blue-50',
    iconTextColor = 'blue-500',
    iconTextColorOn = 'blue-500',
    iconShadow = 'none',
    subIcon = false,
    subIconSize = 10,
    subIconBgColor = 'gray-200',
    subIconTextColor = 'gray-400',
    title,
    description,
    borderR = 'xl',
    shadow = 'default',
    isPing = false,
    ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={classNames('group flex items-center bg-white text-gray-700 p-2 focus:outline-none', {
            [`rounded-${borderR}`]: borderR,
            [`shadow-${shadow}`]: shadow,
        })}
        {...props}
    >
        <div className={classNames('relative flex justify-center items-center text-xl font-extrabold mr-4 rounded-full', {
            [`bg-${iconBgColor}`]: iconBgColor,
            [`group-active:bg-${iconBgColorOn}`]: iconBgColorOn,
            [`group-hover:bg-${iconBgColorOn}`]: iconBgColorOn,
            [`text-${iconTextColor}`]: iconTextColor,
            [`group-active:text-${iconTextColorOn}`]: iconTextColorOn,
            [`group-hover:text-${iconTextColorOn}`]: iconTextColorOn,
            [`w-${iconSize}`]: iconSize,
            [`h-${iconSize}`]: iconSize,
        })}>
            {isPing && (
                <span className={classNames('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', {
                    [`bg-${iconBgColor}`]: iconBgColor,
                })}></span>
            )}
            <span className="relative z-10">
                {icon}
            </span>
        </div>
        <div className="flex flex-col text-left mr-auto">
            <h3 className="font-bold leading-none">
                {title}
            </h3>
            {description && (
                <span className="font-semibold text-xs text-gray-500">
                    {description}
                </span>
            )}
        </div>
        <span className="mr-2">
            {subIcon}
        </span>
    </button >
);

export default IconButton;